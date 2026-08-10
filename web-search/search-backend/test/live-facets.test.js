import test from 'node:test'
import assert from 'node:assert/strict'
import { buildLiveFacets, filterLiveProducts } from '../src/live-facets.js'

const products = [
  {
    offerId: 'headphone-1',
    source: '1688',
    priceInfo: { promotionPrice: 12.5 },
    minOrderQuantity: 1,
    monthSold: 3200,
    tradeScore: 4.8,
    repurchaseRate: '32%',
    isOnePsale: true,
    isShippingIncluded: true,
    invoiceInfo: { supportOnlineInvoice: true },
    productSimpleShippingInfo: { shippingTimeGuarantee: '48 hours' },
    sellerDataInfo: { tradeMedalLevel: 5, compositeServiceScore: 4.7 },
    topCategoryId: '10',
    secondCategoryId: '101',
    thirdCategoryId: '10101'
  },
  {
    offerId: 'headphone-2',
    source: '1688',
    priceInfo: { price: 36 },
    minOrderQuantity: 10,
    monthSold: 120,
    tradeScore: 3.6,
    repurchaseRate: 0.12,
    isOnePsale: false,
    productSimpleShippingInfo: { shippingTimeGuarantee: '7 days' },
    sellerDataInfo: { tradeMedalLevel: 2, compositeServiceScore: 3.8 },
    topCategoryId: '10',
    secondCategoryId: '101',
    thirdCategoryId: '10102'
  }
]

const details = [
  {
    offerId: 'headphone-1',
    source: '1688',
    productAttribute: [
      { attributeNameTrans: 'Bluetooth version', attributeValue: '5.4' },
      { attributeNameTrans: 'Waterproof rating', attributeValue: 'IPX5' }
    ]
  },
  {
    offerId: 'headphone-2',
    source: '1688',
    productAttribute: [
      { attributeNameTrans: 'Bluetooth version', attributeValue: '5.3' },
      { attributeNameTrans: 'Waterproof rating', attributeValue: 'IPX4' }
    ]
  }
]

test('builds live category, procurement and product-spec facets from arbitrary results', () => {
  const facets = buildLiveFacets(products, details, { totalMatches: 2000 })

  assert.equal(facets.summary.totalMatches, 2000)
  assert.equal(facets.summary.sampleSize, 2)
  assert.equal(facets.summary.moqUpTo1, 1)
  assert.equal(facets.summary.onePieceDropshipping, 1)
  assert.equal(facets.summary.dispatch48h, 1)
  assert.equal(facets.summary.tradeScore45, 1)
  assert.equal(facets.categories.find(category => category.categoryId === '101')?.count, 2)
  assert.deepEqual(
    facets.attributes.find(attribute => attribute.key === 'bluetooth version')?.values,
    [{ value: '5.3', count: 1 }, { value: '5.4', count: 1 }]
  )
})

test('filters a live result pool with multiple procurement conditions', () => {
  const filtered = filterLiveProducts(products, {
    maxSourcePrice: 20,
    maxMoq: 5,
    minTradeScore: 4.5,
    minRepurchaseRate: 20,
    onePieceDropshipping: true,
    shippingIncluded: true,
    onlineInvoice: true,
    dispatchGuarantee: '48h',
    attributes: {
      'Bluetooth version': ['5.4'],
      'Waterproof rating': ['IPX5']
    }
  }, details)

  assert.deepEqual(filtered.map(item => item.offerId), ['headphone-1'])
})

test('keeps a selected specification visible when it is outside the current detail sample', () => {
  const facets = buildLiveFacets(products, details, {
    selectedAttributes: {
      Model: ['Previously selected model']
    }
  })
  const selectedGroup = facets.attributes.find(attribute => attribute.key === 'model')

  assert.deepEqual(selectedGroup, {
    key: 'model',
    label: 'Model',
    values: [{ value: 'Previously selected model', count: 0 }]
  })
})
