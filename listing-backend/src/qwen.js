const DEFAULT_TEXT_MODEL = 'qwen3.7-plus'
const DEFAULT_IMAGE_MODEL = 'qwen-image-2.0-pro'

export const IMAGE_STYLE_PROMPTS = {
  'studio-white': 'Create a marketplace-ready product photograph on a seamless pure white background. Isolate the sellable product shown in the reference image and remove promotional banners, surrounding text, factory context, warehouse context and unrelated objects. Preserve the exact product, proportions, color, texture, packaging and visible labels. Use a centered three-quarter view, clean diffused lighting and one soft realistic contact shadow. Do not add props, claims, logos, accessories or text.',
  'premium-studio': 'Create a premium minimalist studio photograph of the exact sellable product shown in the reference image. Preserve product shape, materials, color, packaging and visible labels. Use a light neutral-gray seamless backdrop, controlled diffused key light, refined highlights, generous negative space and a soft grounded shadow. The result should feel precise and understated. Remove banners, factory context, warehouse context and unrelated text. Do not add accessories, claims or new branding.',
  'natural-lifestyle': 'Create a natural lifestyle photograph featuring the exact sellable product shown in the reference image as the clear main subject. Preserve product shape, color, packaging, labels and scale. Place it in a realistic category-appropriate everyday setting with soft daylight and restrained supporting context. Keep the scene believable and uncluttered. Remove supplier banners and factory or warehouse context. Do not invent product functions, accessories, claims, logos or text.',
  'brand-editorial': 'Create an editorial ecommerce photograph of the exact sellable product shown in the reference image. Preserve product shape, color, texture, packaging and visible labels. Use one restrained muted-color backdrop, balanced asymmetric composition, crisp studio lighting and subtle depth. Remove supplier banners, factory context, warehouse context and unrelated text. Do not add slogans, typography, claims, accessories or new branding.',
}

function requiredConfig(name, value) {
  const normalized = String(value || '').trim()
  if (!normalized) throw new Error(`${name} is not configured`)
  return normalized
}

function trimTrailingSlash(value) {
  return String(value || '').replace(/\/+$/, '')
}

function wait(delay) { return new Promise((resolve) => setTimeout(resolve, delay)) }

async function fetchWithRetry(fetchImpl, url, options, attempts = 3) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetchImpl(url, options)
      if (response.ok || ![408, 429].includes(response.status) && response.status < 500) return response
      lastError = new Error(`Qwen request failed with status ${response.status}`)
    } catch (error) {
      lastError = error
    }
    if (attempt < attempts) await wait(300 * attempt)
  }
  throw new Error(`Qwen service could not be reached after ${attempts} attempts: ${lastError?.message || 'network error'}`)
}

function qwenConfig(overrides = {}) {
  return {
    apiKey: overrides.apiKey ?? process.env.QWEN_API_KEY,
    baseUrl: overrides.baseUrl ?? process.env.QWEN_BASE_URL,
    nativeBaseUrl: overrides.nativeBaseUrl ?? process.env.QWEN_NATIVE_BASE_URL,
    textModel: overrides.textModel ?? process.env.QWEN_TEXT_MODEL ?? DEFAULT_TEXT_MODEL,
    imageModel: overrides.imageModel ?? process.env.QWEN_IMAGE_MODEL ?? DEFAULT_IMAGE_MODEL,
  }
}

export function hasQwenTextConfig() {
  const config = qwenConfig()
  return Boolean(String(config.apiKey || '').trim() && String(config.baseUrl || '').trim())
}

export function hasQwenImageConfig() {
  const config = qwenConfig()
  return Boolean(String(config.apiKey || '').trim() && (String(config.nativeBaseUrl || '').trim() || String(config.baseUrl || '').trim()))
}

function parseJsonContent(content) {
  const raw = String(content || '').trim()
  if (!raw) throw new Error('AI returned an empty response')
  const unfenced = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  try {
    return JSON.parse(unfenced)
  } catch {
    const start = unfenced.indexOf('{')
    const end = unfenced.lastIndexOf('}')
    if (start >= 0 && end > start) return JSON.parse(unfenced.slice(start, end + 1))
    throw new Error('AI returned an invalid listing proposal')
  }
}

function normalizeText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

function textFromSupplierHtml(value) {
  let decoded = String(value || '')
  for (let pass = 0; pass < 2; pass += 1) {
    decoded = decoded
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&amp;/gi, '&')
  }
  return decoded
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<img\b[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 20000)
}

export function normalizeListingProposal(value) {
  const proposal = value && typeof value === 'object' ? value : {}
  const normalized = {
    title: normalizeText(proposal.title, 255),
    description: normalizeText(proposal.description, 50000),
    seoTitle: normalizeText(proposal.seoTitle, 70),
    seoDescription: normalizeText(proposal.seoDescription, 160),
  }
  if (!normalized.title || !normalized.description) throw new Error('AI proposal is missing the title or description')
  return normalized
}

function listingInput(source = {}, merchantContent = {}) {
  const variants = Array.isArray(source.variants) ? source.variants : Array.isArray(merchantContent.variants) ? merchantContent.variants : []
  return {
    supplierTitle: String(source.title || merchantContent.title || '').slice(0, 2000),
    supplierDescriptionText: textFromSupplierHtml(source.body_html || merchantContent.description || ''),
    productType: String(source.product_type || merchantContent.productType || '').slice(0, 500),
    variantNames: variants.slice(0, 100).map((item) => [item.title, item.option1, item.option2, item.option3].filter(Boolean).join(' / ')).filter(Boolean),
    existingSeoTitle: String(merchantContent.seoTitle || '').slice(0, 500),
    existingSeoDescription: String(merchantContent.seoDescription || '').slice(0, 1000),
  }
}

export async function createQwenListingProposal(input, options = {}) {
  const config = qwenConfig(options)
  const apiKey = requiredConfig('QWEN_API_KEY', config.apiKey)
  const baseUrl = trimTrailingSlash(requiredConfig('QWEN_BASE_URL', config.baseUrl))
  const fetchImpl = options.fetchImpl || fetch
  const targetLanguage = String(input.targetLanguage || 'en-US')
  const response = await fetchWithRetry(fetchImpl, `${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: String(config.textModel || DEFAULT_TEXT_MODEL),
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: [
            'You are a senior cross-border ecommerce localization editor.',
            'Return one JSON object only, with exactly these string keys: title, description, seoTitle, seoDescription.',
            'Translate and improve clarity for the requested locale while preserving every factual product detail.',
            'Never invent materials, certifications, dimensions, performance claims, warranties, discounts, scarcity, reviews or accessories.',
            'Never add health, nutrition, freshness, manufacturing-process, storage or usage claims unless those exact facts appear in the supplied title, description or variants.',
            'If supplierDescriptionText is empty, write a concise factual description using only the product category and available variant names or specifications. Do not fill missing facts with generic ecommerce claims.',
            'Keep variant names and visible brand names accurate. Do not mention the supplier or wholesale source.',
            'description must be clean, store-ready HTML using only p, h2, h3, ul, ol, li, strong and br tags.',
            'title must be at most 255 characters, seoTitle at most 70 characters, and seoDescription at most 160 characters.',
          ].join(' '),
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: 'Create a faithful localized ecommerce listing proposal for merchant review.',
            targetLanguage,
            product: listingInput(input.source, input.merchantContent),
          }),
        },
      ],
    }),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload?.error?.message || payload?.message || `Qwen text request failed with status ${response.status}`)
  return normalizeListingProposal(parseJsonContent(payload?.choices?.[0]?.message?.content))
}

export async function createQwenSiteTranslations(input, options = {}) {
  const config = qwenConfig(options)
  const apiKey = requiredConfig('QWEN_API_KEY', config.apiKey)
  const baseUrl = trimTrailingSlash(requiredConfig('QWEN_BASE_URL', config.baseUrl))
  const fetchImpl = options.fetchImpl || fetch
  const targetLanguage = String(input.targetLanguage || 'en-US')
  const texts = Array.isArray(input.texts)
    ? input.texts.map((value) => String(value || '').trim()).filter(Boolean).slice(0, 120)
    : []
  if (!texts.length) return []

  const response = await fetchWithRetry(fetchImpl, `${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: String(config.textModel || DEFAULT_TEXT_MODEL),
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: [
            'You translate user-facing ecommerce website text.',
            'Return one JSON object only with a translations array.',
            'Each translation must be an object with the exact input id and a text string: {"id":"t0","text":"..."}. Return every id exactly once.',
            'Translate into the requested locale, regardless of the source language.',
            'Preserve product facts, numbers, currency values, order numbers, model numbers, platform names, brand names and placeholders exactly.',
            'Do not add explanations, marketing claims, quotation marks or formatting.',
          ].join(' '),
        },
        {
          role: 'user',
          content: JSON.stringify({ targetLanguage, items: texts.map((text, index) => ({ id: `t${index}`, text })) }),
        },
      ],
    }),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload?.error?.message || payload?.message || `Qwen translation request failed with status ${response.status}`)
  const parsed = parseJsonContent(payload?.choices?.[0]?.message?.content)
  const translations = Array.isArray(parsed?.translations) ? parsed.translations : []
  if (translations.every((value) => typeof value === 'string')) {
    return texts.map((source, index) => normalizeText(translations[index] ?? source, Math.max(2000, source.length * 6)))
  }
  const byId = new Map(translations
    .filter((value) => value && typeof value === 'object' && typeof value.id === 'string')
    .map((value) => [value.id, value.text]))
  return texts.map((source, index) => normalizeText(byId.get(`t${index}`) ?? source, Math.max(2000, source.length * 6)))
}

function nativeBaseUrl(config) {
  if (String(config.nativeBaseUrl || '').trim()) return trimTrailingSlash(config.nativeBaseUrl)
  const compatible = trimTrailingSlash(requiredConfig('QWEN_BASE_URL', config.baseUrl))
  if (!/\/compatible-mode\/v1$/i.test(compatible)) {
    throw new Error('QWEN_NATIVE_BASE_URL is required for this Qwen workspace')
  }
  return compatible.replace(/\/compatible-mode\/v1$/i, '/api/v1')
}

function imageUrlFromResponse(payload) {
  const content = payload?.output?.choices?.[0]?.message?.content
  if (Array.isArray(content)) {
    const image = content.find((item) => item && typeof item === 'object' && item.image)
    if (image?.image) return String(image.image)
  }
  return String(payload?.output?.results?.[0]?.url || payload?.data?.[0]?.url || '').trim()
}

export async function createQwenStudioImage(input, options = {}) {
  const config = qwenConfig(options)
  const apiKey = requiredConfig('QWEN_API_KEY', config.apiKey)
  const fetchImpl = options.fetchImpl || fetch
  const sourceImageUrl = requiredConfig('sourceImageUrl', input.sourceImageUrl)
  const style = IMAGE_STYLE_PROMPTS[input.style] ? input.style : 'studio-white'
  const response = await fetchWithRetry(fetchImpl, `${nativeBaseUrl(config)}/services/aigc/multimodal-generation/generation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: String(config.imageModel || DEFAULT_IMAGE_MODEL),
      input: {
        messages: [{
          role: 'user',
          content: [
            { image: sourceImageUrl },
            {
              text: IMAGE_STYLE_PROMPTS[style],
            },
          ],
        }],
      },
      parameters: {
        n: 1,
        size: '1024*1024',
        prompt_extend: true,
        watermark: false,
        negative_prompt: 'wrong subject, factory equipment, warehouse, process document, promotional banner, extra products, changed packaging, altered label, fabricated logo, text overlay, watermark, collage',
      },
    }),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload?.message || payload?.code || `Qwen image request failed with status ${response.status}`)
  const imageUrl = imageUrlFromResponse(payload)
  if (!imageUrl) throw new Error('Qwen image request returned no image')
  return { imageUrl, provider: 'qwen', model: String(config.imageModel || DEFAULT_IMAGE_MODEL), style }
}
