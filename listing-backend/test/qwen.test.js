import test from 'node:test'
import assert from 'node:assert/strict'
import { createQwenListingProposal, createQwenSiteTranslations, createQwenStudioImage, IMAGE_STYLE_PROMPTS, normalizeListingProposal } from '../src/qwen.js'

function jsonResponse(payload, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => payload }
}

test('normalizes and enforces Shopify listing field limits', () => {
  const proposal = normalizeListingProposal({
    title: `  ${'A'.repeat(300)}  `,
    description: '<p>Accurate description</p>',
    seoTitle: 'S'.repeat(100),
    seoDescription: 'D'.repeat(200),
  })
  assert.equal(proposal.title.length, 255)
  assert.equal(proposal.seoTitle.length, 70)
  assert.equal(proposal.seoDescription.length, 160)
})

test('parses a fenced Qwen JSON listing proposal', async () => {
  let request
  const proposal = await createQwenListingProposal({ targetLanguage: 'zh-CN', source: { title: 'Pet bowl' } }, {
    apiKey: 'test-key',
    baseUrl: 'https://example.test/compatible-mode/v1/',
    textModel: 'qwen-test',
    fetchImpl: async (url, options) => {
      request = { url, options }
      return jsonResponse({ choices: [{ message: { content: '```json\n{"title":"宠物碗","description":"<p>商品描述</p>","seoTitle":"宠物碗","seoDescription":"便携宠物碗"}\n```' } }] })
    },
  })
  assert.equal(request.url, 'https://example.test/compatible-mode/v1/chat/completions')
  const requestBody = JSON.parse(request.options.body)
  assert.equal(requestBody.model, 'qwen-test')
  assert.match(requestBody.messages[0].content, /Do not fill missing facts/)
  assert.equal(proposal.title, '宠物碗')
})

test('retries a transient Qwen network failure before returning a proposal', async () => {
  let attempts = 0
  const proposal = await createQwenListingProposal({ targetLanguage: 'en-US', source: { title: 'Pet bowl' } }, {
    apiKey: 'test-key',
    baseUrl: 'https://example.test/compatible-mode/v1',
    fetchImpl: async () => {
      attempts += 1
      if (attempts === 1) throw new TypeError('fetch failed')
      return jsonResponse({ choices: [{ message: { content: '{"title":"Travel Pet Bowl","description":"<p>Portable pet bowl.</p>","seoTitle":"Travel Pet Bowl","seoDescription":"A portable pet bowl for travel."}' } }] })
    },
  })
  assert.equal(attempts, 2)
  assert.equal(proposal.title, 'Travel Pet Bowl')
})

test('removes image-only supplier markup before sending product facts to Qwen', async () => {
  let requestBody
  await createQwenListingProposal({
    targetLanguage: 'zh-CN',
    source: {
      title: 'Pet bowl',
      body_html: '&lt;div&gt;&lt;img src=&quot;https://images.test/detail.jpg&quot;/&gt;&lt;/div&gt;',
      variants: [{ title: 'Blue / 500 ml' }],
    },
  }, {
    apiKey: 'test-key',
    baseUrl: 'https://example.test/compatible-mode/v1',
    fetchImpl: async (_url, options) => {
      requestBody = JSON.parse(options.body)
      return jsonResponse({ choices: [{ message: { content: '{"title":"宠物碗","description":"<p>蓝色 500 ml</p>","seoTitle":"宠物碗","seoDescription":"蓝色 500 ml 宠物碗"}' } }] })
    },
  })
  const product = JSON.parse(requestBody.messages[1].content).product
  assert.equal(product.supplierDescriptionText, '')
  assert.deepEqual(product.variantNames, ['Blue / 500 ml'])
})

test('translates site content in the same order without exposing provider output', async () => {
  let requestBody
  const translations = await createQwenSiteTranslations({
    targetLanguage: 'zh-CN',
    texts: ['Search products', 'US $19.99', 'Publish to store'],
  }, {
    apiKey: 'test-key',
    baseUrl: 'https://example.test/compatible-mode/v1',
    fetchImpl: async (_url, options) => {
      requestBody = JSON.parse(options.body)
      return jsonResponse({ choices: [{ message: { content: '{"translations":[{"id":"t2","text":"发布到店铺"},{"id":"t0","text":"搜索商品"},{"id":"t1","text":"US $19.99"}]}' } }] })
    },
  })
  assert.equal(requestBody.temperature, 0)
  assert.match(requestBody.messages[0].content, /exact input id/)
  assert.deepEqual(JSON.parse(requestBody.messages[1].content).items[0], { id: 't0', text: 'Search products' })
  assert.deepEqual(translations, ['搜索商品', 'US $19.99', '发布到店铺'])
})

test('uses the Qwen native multimodal endpoint for studio images', async () => {
  let request
  const result = await createQwenStudioImage({ sourceImageUrl: 'https://images.test/source.jpg' }, {
    apiKey: 'test-key',
    baseUrl: 'https://workspace.test/compatible-mode/v1',
    imageModel: 'qwen-image-test',
    fetchImpl: async (url, options) => {
      request = { url, options }
      return jsonResponse({ output: { choices: [{ message: { content: [{ image: 'https://images.test/result.png' }] } }] } })
    },
  })
  assert.equal(request.url, 'https://workspace.test/api/v1/services/aigc/multimodal-generation/generation')
  const requestBody = JSON.parse(request.options.body)
  assert.equal(requestBody.model, 'qwen-image-test')
  assert.match(requestBody.input.messages[0].content[1].text, /seamless pure white background/)
  assert.equal(result.imageUrl, 'https://images.test/result.png')
})

test('each supported image style has a distinct product-safe prompt', async () => {
  assert.deepEqual(Object.keys(IMAGE_STYLE_PROMPTS), ['studio-white', 'premium-studio', 'natural-lifestyle', 'brand-editorial'])
  assert.equal(new Set(Object.values(IMAGE_STYLE_PROMPTS)).size, 4)
  for (const prompt of Object.values(IMAGE_STYLE_PROMPTS)) {
    assert.match(prompt, /exact sellable product|sellable product/)
    assert.match(prompt, /factory/)
  }
})
