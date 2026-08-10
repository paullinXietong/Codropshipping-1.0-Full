function scalarId(value) {
  if (value == null || typeof value === 'object') return ''
  const normalized = String(value).trim()
  if (!normalized) return ''
  const gidMatch = normalized.match(/Product\/(\d+)$/i)
  return gidMatch ? gidMatch[1] : normalized
}

export function extractExternalProductId(value, depth = 0) {
  if (!value || depth > 5) return ''
  if (Array.isArray(value)) {
    for (const item of value) {
      const id = extractExternalProductId(item, depth + 1)
      if (id) return id
    }
    return ''
  }
  if (typeof value !== 'object') return ''
  const preferredKeys = ['shopify_product_id', 'shopifyProductId', 'shop_product_id', 'shopProductId', 'external_product_id', 'externalProductId', 'product_id', 'productId']
  for (const key of preferredKeys) {
    const id = scalarId(value[key])
    if (id) return id
  }
  for (const key of ['product', 'data', 'result', 'response', 'item']) {
    const id = extractExternalProductId(value[key], depth + 1)
    if (id) return id
  }
  return ''
}

export function matchingPublishedProduct(payload, title) {
  const list = payload?.data?.list || payload?.data?.data || payload?.list || []
  if (!Array.isArray(list)) return null
  const wanted = String(title || '').trim().toLowerCase()
  return list.find((item) => String(item.title || item.product_title || item.name || '').trim().toLowerCase() === wanted) || null
}
