import test from 'node:test'
import assert from 'node:assert/strict'
import { extractExternalProductId, matchingPublishedProduct } from '../src/publish-result.js'

test('extracts Shopify product ids from direct and nested channel responses', () => {
  assert.equal(extractExternalProductId({ data: { product_id: 8033851670571 } }), '8033851670571')
  assert.equal(extractExternalProductId({ result: { shopifyProductId: 'gid://shopify/Product/8033851670571' } }), '8033851670571')
  assert.equal(extractExternalProductId({ code: '0', data: [] }), '')
})

test('finds the exact published title before recording an external id', () => {
  const payload = { data: { list: [{ title: 'Other', product_id: 1 }, { title: 'Reviewed title', shop_product_id: 99 }] } }
  const match = matchingPublishedProduct(payload, 'Reviewed title')
  assert.equal(extractExternalProductId(match), '99')
})
