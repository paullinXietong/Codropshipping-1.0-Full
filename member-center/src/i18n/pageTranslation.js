import { getContentLanguage } from '@/utils/contentLanguage'

const supported = new Set(['en-US', 'zh-CN', 'es-ES', 'fr-FR', 'de-DE', 'pt-BR', 'ar-SA', 'ja-JP', 'ko-KR', 'ru-RU'])
const skipSelector = 'script,style,noscript,code,pre,textarea,iframe,.global-language,[data-no-translate]'
const translatedAttributes = ['placeholder', 'title', 'aria-label', 'alt']

function meaningful(value) {
  const text = String(value || '').trim()
  if (text.length < 2 || text.length > 2000) return false
  if (/^[\d\s.,:+\-–—/%$€£¥#()\[\]]+$/.test(text)) return false
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) || /^https?:\/\//i.test(text)) return false
  return /[A-Za-z\u00c0-\u024f\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af\u0400-\u04ff\u0600-\u06ff]/.test(text)
}

function needsEnglishTranslation(value) {
  return /[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af\u0400-\u04ff\u0600-\u06ff]/.test(value)
}

export function installWorkspacePageTranslation() {
  if (window.__codWorkspacePageTranslationInstalled) return
  window.__codWorkspacePageTranslationInstalled = true

  const originalText = new WeakMap()
  const originalAttributes = new WeakMap()
  const trackedText = new Set()
  const trackedElements = new Set()
  const cache = new Map()
  let locale = supported.has(getContentLanguage()) ? getContentLanguage() : 'en-US'
  let observer
  let timer
  let generation = 0
  let applying = false
  let translating = false
  let rerunRequested = false

  function observe() {
    observer && observer.observe(document.body, {
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: translatedAttributes,
      subtree: true,
    })
  }

  function originalForText(node) {
    if (!originalText.has(node)) {
      originalText.set(node, node.nodeValue || '')
      trackedText.add(node)
    }
    return originalText.get(node) || ''
  }

  function originalForAttribute(element, attribute) {
    let attributes = originalAttributes.get(element)
    if (!attributes) {
      attributes = new Map()
      originalAttributes.set(element, attributes)
      trackedElements.add(element)
    }
    if (!attributes.has(attribute)) attributes.set(attribute, element.getAttribute(attribute) || '')
    return attributes.get(attribute) || ''
  }

  function restore() {
    observer && observer.disconnect()
    applying = true
    trackedText.forEach((node) => {
      if (node.isConnected) node.nodeValue = originalText.get(node) || node.nodeValue
    })
    trackedElements.forEach((element) => {
      if (!element.isConnected) return
      ;(originalAttributes.get(element) || []).forEach((value, attribute) => element.setAttribute(attribute, value))
    })
    applying = false
    observe()
  }

  function collect() {
    const targets = []
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    let node = walker.nextNode()
    while (node) {
      const parent = node.parentElement
      if (parent && !parent.closest(skipSelector)) {
        const source = originalForText(node).trim()
        if (meaningful(source)) targets.push({ node, source })
      }
      node = walker.nextNode()
    }
    document.body.querySelectorAll('*').forEach((element) => {
      if (element.matches(skipSelector) || element.closest(skipSelector)) return
      translatedAttributes.forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return
        const source = originalForAttribute(element, attribute).trim()
        if (meaningful(source)) targets.push({ node: element, attribute, source })
      })
    })
    return locale === 'en-US' ? targets.filter((target) => needsEnglishTranslation(target.source)) : targets
  }

  function apply(targets, allowedSources) {
    observer && observer.disconnect()
    applying = true
    targets.forEach((target) => {
      if (!target.node.isConnected || (allowedSources && !allowedSources.has(target.source))) return
      const translated = cache.get(`${locale}\u0000${target.source}`)
      if (!translated) return
      if (target.attribute) target.node.setAttribute(target.attribute, translated)
      else {
        const original = originalForText(target.node)
        const leading = (original.match(/^\s*/) || [''])[0]
        const trailing = (original.match(/\s*$/) || [''])[0]
        target.node.nodeValue = `${leading}${translated}${trailing}`
      }
    })
    applying = false
    observe()
  }

  async function requestTranslations(texts, targetLanguage) {
    const token = window.localStorage.getItem('TOKEN') || ''
    const response = await fetch('/listing-api/v1/site-translations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token },
      body: JSON.stringify({ targetLanguage, texts }),
    })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(payload?.error?.message || 'Page translation failed')
    const translations = payload?.data?.translations
    if (!Array.isArray(translations) || translations.length !== texts.length) throw new Error('Page translation returned incomplete content')
    return translations.map((value) => String(value || ''))
  }

  async function translate() {
    if (translating) {
      rerunRequested = true
      return
    }
    translating = true
    const run = generation
    const targets = collect()
    const sources = [...new Set(targets.map((target) => target.source))]
    const missing = sources.filter((source) => !cache.has(`${locale}\u0000${source}`))
    try {
      for (let start = 0; start < missing.length; start += 30) {
        const batch = missing.slice(start, start + 30)
        const translated = await requestTranslations(batch, locale)
        if (run !== generation) return
        batch.forEach((source, index) => cache.set(`${locale}\u0000${source}`, translated[index] || source))
        apply(targets, new Set(batch))
      }
      if (run === generation) apply(targets)
    } catch (error) {
      window.dispatchEvent(new CustomEvent('cod-workspace-translation-error', { detail: error.message || 'Page translation failed' }))
      observe()
    } finally {
      translating = false
      if (rerunRequested) {
        rerunRequested = false
        schedule()
      }
    }
  }

  function schedule() {
    if (applying) return
    clearTimeout(timer)
    timer = setTimeout(translate, 350)
  }

  function start() {
    if (!document.body) return setTimeout(start, 0)
    observer = new MutationObserver((mutations) => {
      if (applying) return
      mutations.forEach((mutation) => {
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
      })
      schedule()
    })
    observe()
    window.addEventListener('cod-content-language-change', (event) => {
      const next = supported.has(event.detail) ? event.detail : 'en-US'
      generation += 1
      restore()
      cache.clear()
      locale = next
      schedule()
    })
    schedule()
  }

  start()
}
