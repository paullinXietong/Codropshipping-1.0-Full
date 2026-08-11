import { defineNuxtPlugin } from '#app'
import { FAST_SITE_TRANSLATIONS } from '~/i18n/site-fast-translations'

type TranslationTarget = { node: Text | Element, attribute?: string, source: string, priority?: boolean }

const SUPPORTED = new Set(['en-US', 'zh-CN', 'es-ES', 'fr-FR', 'de-DE', 'pt-BR', 'ar-SA', 'ja-JP', 'ko-KR', 'ru-RU'])
const SKIP_SELECTOR = 'script,style,noscript,code,pre,textarea,.global-language,[data-no-translate]'
const TRANSLATABLE_ATTRIBUTE = ['placeholder', 'title', 'aria-label', 'alt']
const TRANSLATION_BATCH_SIZE = 10
const PRIORITY_TRANSLATION_BATCH_SIZE = 4
const TRANSLATION_REQUEST_TIMEOUT_MS = 75000

function meaningful(value: string) {
  const text = value.trim()
  if (text.length < 2 || text.length > 2000) return false
  if (/^[\d\s.,:+\-–—/%$€£¥#()\[\]]+$/.test(text)) return false
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) || /^https?:\/\//i.test(text)) return false
  return /[A-Za-z\u00c0-\u024f\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af\u0400-\u04ff\u0600-\u06ff]/.test(text)
}

function needsEnglishTranslation(value: string) {
  return /[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af\u0400-\u04ff\u0600-\u06ff]/.test(value)
}

export default defineNuxtPlugin((nuxtApp) => {
  const originalText = new WeakMap<Text, string>()
  const originalAttributes = new WeakMap<Element, Map<string, string>>()
  const trackedText = new Set<Text>()
  const trackedElements = new Set<Element>()
  const cache = new Map<string, string>()
  let locale = 'en-US'
  let generation = 0
  let applying = false
  let timer: ReturnType<typeof setTimeout> | undefined
  let observer: MutationObserver | undefined
  let translating = false
  let rerunRequested = false
  let activeController: AbortController | undefined
  let activeRunSources = new Set<string>()

  function observePage() {
    observer?.observe(document.body, {
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATABLE_ATTRIBUTE,
      subtree: true,
    })
  }

  function emitState(state: 'idle' | 'translating' | 'error', message = '') {
    window.dispatchEvent(new CustomEvent('cod-site-translation-state', { detail: { state, message } }))
  }

  function originalForText(node: Text) {
    if (!originalText.has(node)) {
      originalText.set(node, node.nodeValue || '')
      trackedText.add(node)
    }
    return originalText.get(node) || ''
  }

  function originalForAttribute(element: Element, attribute: string) {
    let attributes = originalAttributes.get(element)
    if (!attributes) {
      attributes = new Map()
      originalAttributes.set(element, attributes)
      trackedElements.add(element)
    }
    if (!attributes.has(attribute)) attributes.set(attribute, element.getAttribute(attribute) || '')
    return attributes.get(attribute) || ''
  }

  function restoreOriginals() {
    observer?.disconnect()
    applying = true
    for (const node of trackedText) {
      if (node.isConnected) node.nodeValue = originalText.get(node) || node.nodeValue
    }
    for (const element of trackedElements) {
      if (!element.isConnected) continue
      for (const [attribute, value] of originalAttributes.get(element) || []) element.setAttribute(attribute, value)
    }
    applying = false
    observePage()
  }

  function collect(root: ParentNode = document.body): TranslationTarget[] {
    const targets: TranslationTarget[] = []
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let node = walker.nextNode() as Text | null
    while (node) {
      const parent = node.parentElement
      if (parent && !parent.closest(SKIP_SELECTOR)) {
        const source = originalForText(node).trim()
        if (meaningful(source)) targets.push({ node, source, priority: Boolean(parent.closest('[data-translate-priority]')) })
      }
      node = walker.nextNode() as Text | null
    }
    const elements = root instanceof Element ? [root, ...root.querySelectorAll('*')] : [...root.querySelectorAll('*')]
    for (const element of elements) {
      if (element.matches(SKIP_SELECTOR) || element.closest(SKIP_SELECTOR)) continue
      for (const attribute of TRANSLATABLE_ATTRIBUTE) {
        if (!element.hasAttribute(attribute)) continue
        const source = originalForAttribute(element, attribute).trim()
        if (meaningful(source)) targets.push({ node: element, attribute, source, priority: Boolean(element.closest('[data-translate-priority]')) })
      }
    }
    return targets
  }

  async function requestTranslations(texts: string[], targetLocale: string, signal: AbortSignal) {
    const token = window.localStorage.getItem('TOKEN') || ''
    const requestController = new AbortController()
    const abortRequest = () => requestController.abort()
    signal.addEventListener('abort', abortRequest, { once: true })
    // Dynamic product titles and long variant names can take longer than UI
    // labels. The translation runs without blocking page interaction, so keep
    // the request alive long enough to receive and cache a complete batch.
    const timeout = window.setTimeout(abortRequest, TRANSLATION_REQUEST_TIMEOUT_MS)
    try {
      const response = await fetch('/listing-api/v1/site-translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({ targetLanguage: targetLocale, texts }),
        signal: requestController.signal,
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload?.error?.message || 'Page translation failed')
      const translations = payload?.data?.translations
      if (!Array.isArray(translations) || translations.length !== texts.length) throw new Error('Page translation returned incomplete content')
      return translations.map((value: unknown) => String(value || ''))
    } finally {
      window.clearTimeout(timeout)
      signal.removeEventListener('abort', abortRequest)
    }
  }

  function applyTargets(targets: TranslationTarget[], targetLocale: string, allowedSources?: Set<string>) {
    observer?.disconnect()
    applying = true
    for (const target of targets) {
      if (!target.node.isConnected || allowedSources && !allowedSources.has(target.source)) continue
      const translated = cache.get(`${targetLocale}\u0000${target.source}`) || target.source
      if (target.attribute && target.node instanceof Element) target.node.setAttribute(target.attribute, translated)
      else if (target.node instanceof Text) {
        const original = originalForText(target.node)
        const leading = original.match(/^\s*/)?.[0] || ''
        const trailing = original.match(/\s*$/)?.[0] || ''
        target.node.nodeValue = `${leading}${translated}${trailing}`
      }
    }
    applying = false
    observePage()
  }

  async function translate(root: ParentNode = document.body) {
    if (translating) {
      // Vue can mount action buttons while an earlier model request is still
      // running. Apply known UI translations immediately so late-rendered
      // controls never wait behind supplier descriptions or variant names.
      const pendingTargets = collect(root)
      const pendingFast = FAST_SITE_TRANSLATIONS[locale] || {}
      const pendingSources = new Set<string>()
      for (const target of pendingTargets) {
        if (!pendingFast[target.source]) continue
        cache.set(`${locale}\u0000${target.source}`, pendingFast[target.source])
        pendingSources.add(target.source)
      }
      if (pendingSources.size) applyTargets(pendingTargets, locale, pendingSources)
      // Product data arrives after the initial shell. Do not leave its title,
      // variants and availability waiting behind a long footer/model batch.
      // A priority request already in flight is allowed to finish so repeated
      // Vue mutations cannot continually restart the same work.
      const hasNewUntranslatedPriority = pendingTargets.some((target) => target.priority
        && !cache.has(`${locale}\u0000${target.source}`)
        && !pendingFast[target.source]
        && !activeRunSources.has(target.source))
      if (hasNewUntranslatedPriority) activeController?.abort()
      rerunRequested = true
      return
    }
    translating = true
    const run = generation
    const targetLocale = locale
    const controller = new AbortController()
    activeController = controller
    const collectedTargets = collect(root)
    // English is the default customer language, not a bypass. Translate only
    // supplier text that is visibly non-English so the UI stays fast while
    // 1688 titles and dynamic catalog content no longer remain Chinese.
    const targets = targetLocale === 'en-US'
      ? collectedTargets.filter((target) => needsEnglishTranslation(target.source))
      : collectedTargets
    const sources = [...new Set([...targets]
      .sort((left, right) => Number(Boolean(right.priority)) - Number(Boolean(left.priority)))
      .map((target) => target.source))]
    activeRunSources = new Set(sources)
    const fast = FAST_SITE_TRANSLATIONS[targetLocale] || {}
    for (const source of sources) {
      if (fast[source]) cache.set(`${targetLocale}\u0000${source}`, fast[source])
    }
    applyTargets(targets, targetLocale)
    const missing = sources.filter((source) => !cache.has(`${targetLocale}\u0000${source}`))
    if (!sources.length) {
      if (activeController === controller) activeController = undefined
      translating = false
      emitState('idle')
      if (rerunRequested) {
        rerunRequested = false
        schedule()
      }
      return
    }
    emitState('translating')
    try {
      const prioritySources = new Set(targets.filter((target) => target.priority).map((target) => target.source))
      const priorityMissing = missing.filter((source) => prioritySources.has(source))
      const standardMissing = missing.filter((source) => !prioritySources.has(source))
      const batches: string[][] = []
      for (let start = 0; start < priorityMissing.length; start += PRIORITY_TRANSLATION_BATCH_SIZE) {
        batches.push(priorityMissing.slice(start, start + PRIORITY_TRANSLATION_BATCH_SIZE))
      }
      for (let start = 0; start < standardMissing.length; start += TRANSLATION_BATCH_SIZE) {
        batches.push(standardMissing.slice(start, start + TRANSLATION_BATCH_SIZE))
      }
      for (const batch of batches) {
        const translations = await requestTranslations(batch, targetLocale, controller.signal)
        if (run !== generation || controller.signal.aborted) return
        batch.forEach((source, index) => cache.set(`${targetLocale}\u0000${source}`, translations[index] || source))
        // Apply each completed batch immediately. Large product grids keep
        // filling in progressively instead of holding the whole page until the
        // final model request finishes.
        applyTargets(targets, targetLocale, new Set(batch))
      }
      if (run !== generation || controller.signal.aborted) return
      applyTargets(targets, targetLocale)
      emitState('idle')
    } catch (error) {
      applying = false
      observePage()
      if (!controller.signal.aborted && run === generation) {
        emitState('error', error instanceof Error ? error.message : 'Page translation failed')
      }
    } finally {
      if (activeController === controller) activeController = undefined
      activeRunSources = new Set()
      translating = false
      if (rerunRequested) {
        rerunRequested = false
        schedule()
      }
    }
  }

  function schedule() {
    if (applying) return
    if (timer) clearTimeout(timer)
    // Storefront sections and product lists arrive asynchronously. Re-scan the
    // visible page as one unit so a late carousel update cannot replace the
    // initial full-page translation with a tiny subtree-only request.
    timer = setTimeout(() => translate(document.body), 400)
  }

  nuxtApp.hook('app:mounted', () => {
    locale = SUPPORTED.has(window.localStorage.getItem('cod_global_content_language') || '')
      ? window.localStorage.getItem('cod_global_content_language') || 'en-US'
      : 'en-US'
    observer = new MutationObserver((mutations) => {
      if (applying) return
      for (const mutation of mutations) {
        if (mutation.type === 'characterData' && mutation.target instanceof Text) {
          originalText.set(mutation.target, mutation.target.nodeValue || '')
          trackedText.add(mutation.target)
        }
        if (mutation.type === 'attributes' && mutation.target instanceof Element && mutation.attributeName) {
          let attributes = originalAttributes.get(mutation.target)
          if (!attributes) {
            attributes = new Map()
            originalAttributes.set(mutation.target, attributes)
            trackedElements.add(mutation.target)
          }
          attributes.set(mutation.attributeName, mutation.target.getAttribute(mutation.attributeName) || '')
        }
      }
      schedule()
    })
    observePage()
    window.addEventListener('cod-content-language-change', ((event: CustomEvent<string>) => {
      const next = SUPPORTED.has(event.detail) ? event.detail : 'en-US'
      if (next !== locale) {
        generation += 1
        activeController?.abort()
        rerunRequested = true
        restoreOriginals()
        cache.clear()
      }
      locale = next
      schedule()
    }) as EventListener)
    schedule()
  })
})
