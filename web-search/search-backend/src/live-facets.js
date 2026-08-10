function asNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function normalizedText(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 500)
}

function asBoolean(value) {
  return value === true || value === 1 || value === '1'
}

function normalizedPercent(value) {
  const raw = typeof value === 'string' ? value.replace('%', '') : value
  const number = asNumber(raw)
  if (number === null || number < 0) return null
  return number > 0 && number <= 1 ? number * 100 : number
}

export function liveProductKey(item = {}) {
  return `${item.offerId || item.id || ''}:${item.source || ''}`
}

export function liveProductPrice(item = {}) {
  return asNumber(
    item.priceInfo?.promotionPrice
    ?? item.priceInfo?.price
    ?? item.priceInfo?.jxhyPrice
    ?? item.priceInfo?.consignPrice
  )
}

function dispatchesWithin48Hours(item = {}) {
  const value = item.productSimpleShippingInfo?.shippingTimeGuarantee
  if (value === true || value === 1) return true
  const normalized = normalizedText(value)
  return normalized === '1'
    || normalized === 'true'
    || normalized.includes('48')
    || normalized.includes('shipin48hours')
}

function itemRepurchaseRate(item = {}) {
  return normalizedPercent(item.repurchaseRate ?? item.sellerDataInfo?.repeatPurchasePercent)
}

function itemServiceScore(item = {}) {
  return asNumber(item.sellerDataInfo?.compositeServiceScore)
}

function itemTradeMedalLevel(item = {}) {
  return asNumber(item.sellerDataInfo?.tradeMedalLevel)
}

function attributeValues(attribute = {}) {
  const raw = attribute.attributeValue
    ?? attribute.valueTrans
    ?? attribute.value
    ?? attribute.attributeValueTrans
    ?? attribute.values
  const values = Array.isArray(raw) ? raw : [raw]
  return values
    .flatMap((value) => {
      if (value && typeof value === 'object') {
        return [value.valueTrans ?? value.value ?? value.name ?? value.text]
      }
      return [value]
    })
    .map(value => String(value ?? '').trim())
    .filter(Boolean)
}

function detailAttributeMap(details = []) {
  const byProduct = new Map()
  details.forEach((detail) => {
    const productKey = liveProductKey(detail)
    const groups = new Map()
    const attributes = detail.productAttribute || detail.productAttributes || []
    attributes.forEach((attribute) => {
      const label = String(
        attribute.attributeNameTrans
        || attribute.attributeName
        || attribute.nameTrans
        || attribute.name
        || ''
      ).trim()
      const key = normalizedText(label)
      if (!key) return
      if (!groups.has(key)) groups.set(key, new Set())
      attributeValues(attribute).forEach(value => groups.get(key).add(normalizedText(value)))
    })
    byProduct.set(productKey, groups)
  })
  return byProduct
}

export function hasLiveFilters(filters = {}) {
  return [
    filters.minSourcePrice,
    filters.maxSourcePrice,
    filters.maxMoq,
    filters.minMonthlySales,
    filters.minTradeScore,
    filters.minServiceScore,
    filters.minRepurchaseRate,
    filters.minTradeMedalLevel
  ].some(value => value !== undefined && value !== null && value !== '')
    || filters.onePieceDropshipping === true
    || filters.shippingIncluded === true
    || filters.onlineInvoice === true
    || filters.dispatchGuarantee === '48h'
    || Object.values(filters.attributes || {}).some(values => Array.isArray(values) && values.length)
}

function passesMinimum(value, minimum) {
  const expected = asNumber(minimum)
  if (expected === null) return true
  const actual = asNumber(value)
  return actual !== null && actual >= expected
}

function passesMaximum(value, maximum) {
  const expected = asNumber(maximum)
  if (expected === null) return true
  const actual = asNumber(value)
  return actual !== null && actual <= expected
}

export function filterLiveProducts(items = [], filters = {}, details = []) {
  const attributesByProduct = detailAttributeMap(details)
  const selectedAttributes = Object.entries(filters.attributes || {})
    .map(([name, values]) => [
      normalizedText(name),
      new Set((Array.isArray(values) ? values : []).map(normalizedText).filter(Boolean))
    ])
    .filter(([, values]) => values.size)

  return items.filter((item) => {
    if (!passesMinimum(liveProductPrice(item), filters.minSourcePrice)) return false
    if (!passesMaximum(liveProductPrice(item), filters.maxSourcePrice)) return false
    if (!passesMaximum(item.minOrderQuantity, filters.maxMoq)) return false
    if (!passesMinimum(item.monthSold, filters.minMonthlySales)) return false
    if (!passesMinimum(item.tradeScore, filters.minTradeScore)) return false
    if (!passesMinimum(itemServiceScore(item), filters.minServiceScore)) return false
    if (!passesMinimum(itemRepurchaseRate(item), filters.minRepurchaseRate)) return false
    if (!passesMinimum(itemTradeMedalLevel(item), filters.minTradeMedalLevel)) return false
    if (filters.onePieceDropshipping === true && !asBoolean(item.isOnePsale)) return false
    if (filters.shippingIncluded === true && !asBoolean(item.isShippingIncluded)) return false
    if (filters.onlineInvoice === true && !asBoolean(item.invoiceInfo?.supportOnlineInvoice)) return false
    if (filters.dispatchGuarantee === '48h' && !dispatchesWithin48Hours(item)) return false

    if (selectedAttributes.length) {
      const productAttributes = attributesByProduct.get(liveProductKey(item))
      if (!productAttributes) return false
      const matches = selectedAttributes.every(([key, selectedValues]) => {
        const productValues = productAttributes.get(key)
        return productValues && [...selectedValues].some(value => productValues.has(value))
      })
      if (!matches) return false
    }
    return true
  })
}

function countAtMost(items, getter, maximum) {
  return items.filter(item => {
    const value = asNumber(getter(item))
    return value !== null && value <= maximum
  }).length
}

function countAtLeast(items, getter, minimum) {
  return items.filter(item => {
    const value = asNumber(getter(item))
    return value !== null && value >= minimum
  }).length
}

function buildAttributeFacets(details = [], selectedAttributes = {}) {
  const groups = new Map()
  details.forEach((detail) => {
    const productKey = liveProductKey(detail)
    const seenForProduct = new Set()
    const attributes = detail.productAttribute || detail.productAttributes || []
    attributes.forEach((attribute) => {
      const label = String(
        attribute.attributeNameTrans
        || attribute.attributeName
        || attribute.nameTrans
        || attribute.name
        || ''
      ).trim()
      const key = normalizedText(label)
      if (!key || !label) return
      if (!groups.has(key)) groups.set(key, { key, label, values: new Map() })
      const group = groups.get(key)
      attributeValues(attribute).forEach((value) => {
        const normalizedValue = normalizedText(value)
        const occurrenceKey = `${productKey}:${key}:${normalizedValue}`
        if (!normalizedValue || seenForProduct.has(occurrenceKey)) return
        seenForProduct.add(occurrenceKey)
        const current = group.values.get(normalizedValue) || { value, count: 0 }
        current.count += 1
        group.values.set(normalizedValue, current)
      })
    })
  })

  Object.entries(selectedAttributes || {}).forEach(([label, rawValues]) => {
    const key = normalizedText(label)
    const values = Array.isArray(rawValues) ? rawValues : []
    if (!key || !values.length) return
    if (!groups.has(key)) groups.set(key, { key, label, values: new Map(), selected: true })
    const group = groups.get(key)
    group.selected = true
    values.forEach((value) => {
      const normalizedValue = normalizedText(value)
      if (!normalizedValue) return
      const current = group.values.get(normalizedValue) || { value, count: 0 }
      current.selected = true
      group.values.set(normalizedValue, current)
    })
  })

  return [...groups.values()]
    .map(group => ({
      key: group.key,
      label: group.label,
      values: [...group.values.values()]
        .sort((a, b) => Number(Boolean(b.selected)) - Number(Boolean(a.selected)) || b.count - a.count || a.value.localeCompare(b.value))
        .slice(0, 10)
        .map(({ value, count }) => ({ value, count })),
      selected: Boolean(group.selected)
    }))
    .filter(group => group.values.length)
    .sort((a, b) => {
      if (a.selected !== b.selected) return Number(b.selected) - Number(a.selected)
      const aCoverage = a.values.reduce((sum, value) => sum + value.count, 0)
      const bCoverage = b.values.reduce((sum, value) => sum + value.count, 0)
      return bCoverage - aCoverage
    })
    .slice(0, 10)
    .map(({ selected, ...group }) => group)
}

function buildCategoryFacets(items = []) {
  const counts = new Map()
  items.forEach((item) => {
    ;[
      [item.topCategoryId, 1],
      [item.secondCategoryId, 2],
      [item.thirdCategoryId, 3]
    ].forEach(([categoryId, level]) => {
      const id = String(categoryId || '')
      if (!id) return
      const key = `${level}:${id}`
      const current = counts.get(key) || { categoryId: id, level, count: 0 }
      current.count += 1
      counts.set(key, current)
    })
  })
  return [...counts.values()]
    .sort((a, b) => b.level - a.level || b.count - a.count)
    .slice(0, 80)
}

export function buildLiveFacets(items = [], details = [], options = {}) {
  const prices = items.map(liveProductPrice).filter(value => value !== null)
  const moqs = items.map(item => asNumber(item.minOrderQuantity)).filter(value => value !== null)
  const source = options.source || 'live-sample'
  return {
    summary: {
      totalMatches: Number(options.totalMatches ?? items.length),
      sampleSize: items.length,
      minPrice: prices.length ? Math.min(...prices) : null,
      maxPrice: prices.length ? Math.max(...prices) : null,
      minMoq: moqs.length ? Math.min(...moqs) : null,
      maxMoq: moqs.length ? Math.max(...moqs) : null,
      moqUpTo1: countAtMost(items, item => item.minOrderQuantity, 1),
      moqUpTo5: countAtMost(items, item => item.minOrderQuantity, 5),
      moqUpTo10: countAtMost(items, item => item.minOrderQuantity, 10),
      moqUpTo50: countAtMost(items, item => item.minOrderQuantity, 50),
      onePieceDropshipping: items.filter(item => asBoolean(item.isOnePsale)).length,
      dispatch48h: items.filter(dispatchesWithin48Hours).length,
      shippingIncluded: items.filter(item => asBoolean(item.isShippingIncluded)).length,
      onlineInvoice: items.filter(item => asBoolean(item.invoiceInfo?.supportOnlineInvoice)).length,
      tradeScore3: countAtLeast(items, item => item.tradeScore, 3),
      tradeScore4: countAtLeast(items, item => item.tradeScore, 4),
      tradeScore45: countAtLeast(items, item => item.tradeScore, 4.5),
      repurchase20: countAtLeast(items, itemRepurchaseRate, 20)
    },
    categories: buildCategoryFacets(items),
    attributes: buildAttributeFacets(details, options.selectedAttributes),
    meta: {
      source,
      sampleSize: items.length,
      detailSampleSize: details.length,
      totalMatches: Number(options.totalMatches ?? items.length),
      filtersApplied: options.filtersApplied === true
    }
  }
}
