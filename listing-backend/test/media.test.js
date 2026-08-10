import test from 'node:test'
import assert from 'node:assert/strict'
import { persistGeneratedImage } from '../src/media.js'

test('downloads a generated image and saves it through the existing CoD upload API', async () => {
  const requests = []
  const result = await persistGeneratedImage('https://temporary.test/result.png', 'customer-token', {
    codApiBaseUrl: 'https://cod.test/api/',
    fetchImpl: async (url, options = {}) => {
      requests.push({ url, options })
      if (requests.length === 1) {
        return {
          ok: true,
          status: 200,
          headers: { get: () => 'image/png' },
          arrayBuffer: async () => new Uint8Array([137, 80, 78, 71]).buffer,
        }
      }
      return { ok: true, status: 200, json: async () => ({ code: 0, data: { path: 'https://media.cod.test/permanent.png' } }) }
    },
  })
  assert.equal(result, 'https://media.cod.test/permanent.png')
  assert.equal(requests[1].url, 'https://cod.test/api/customer/api/order/freight/upload')
  assert.equal(requests[1].options.headers.token, 'customer-token')
  assert.ok(requests[1].options.body instanceof FormData)
})
