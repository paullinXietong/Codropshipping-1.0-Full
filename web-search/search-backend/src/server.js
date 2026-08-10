import express from 'express'
import {
  databaseReady,
  importSupplierProfiles,
  initializeDatabase,
  queryFacets,
  queryProducts,
  storeProducts,
  upsertJob
} from './db.js'
import {
  enqueueDetailIndex,
  enqueueIndex,
  normalizeKeyword,
  queryHash,
  queryIndexState,
  queueState
} from './indexer.js'
import {
  buildLiveFacets,
  filterLiveProducts,
  hasLiveFilters,
  liveProductKey,
  liveProductPrice
} from './live-facets.js'
import { getProductDetail, searchUpstream } from './upstream.js'

const app = express()
const port = Number(process.env.PORT || 8788)
const publicLimit = Math.max(10, Number(process.env.PUBLIC_RATE_LIMIT_PER_MINUTE || 90))
const liveDetailSampleSize = Math.max(2, Math.min(Number(process.env.LIVE_DETAIL_SAMPLE_SIZE || 6), 12))
const liveAttributeScanSize = Math.max(liveDetailSampleSize, Math.min(Number(process.env.LIVE_ATTRIBUTE_SCAN_SIZE || 24), 40))
const liveFilterScanPages = Math.max(1, Math.min(Number(process.env.LIVE_FILTER_SCAN_PAGES || 3), 5))
const liveDetailConcurrency = Math.max(1, Math.min(Number(process.env.LIVE_DETAIL_CONCURRENCY || 4), 6))
const liveDetailCache = new Map()
const liveFacetCache = new Map()
const clients = new Map()
setInterval(() => {
  const cutoff = Date.now() - 120000
  clients.forEach((value, key) => {
    if (value.startedAt < cutoff) clients.delete(key)
  })
}, 60000).unref()

app.disable('x-powered-by')
app.use(express.json({ limit: '1mb' }))
app.use((request, response, next) => {
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.setHeader('Referrer-Policy', 'same-origin')
  next()
})

function rateLimit(request, response, next) {
  const key = request.ip || request.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const current = clients.get(key)
  if (!current || now - current.startedAt >= 60000) {
    clients.set(key, { startedAt: now, count: 1 })
    return next()
  }
  current.count += 1
  if (current.count > publicLimit) {
    response.setHeader('Retry-After', '60')
    return response.status(429).json({ error: 'Too many search requests. Please retry shortly.' })
  }
  return next()
}

function validateSearch(body) {
  const keyword = normalizeKeyword(body?.keyword)
  if (!keyword || keyword.length < 2) throw new Error('keyword must contain at least 2 characters')
  const page = Math.max(1, Math.min(Number(body?.page || 1), 500))
  const pageSize = Math.max(1, Math.min(Number(body?.pageSize || 20), 50))
  const categoryIds = Array.isArray(body?.filters?.categoryIds)
    ? [...new Set(body.filters.categoryIds.map(value => String(value).trim()).filter(Boolean))].slice(0, 10)
    : []
  const direction = String(body?.direction).toLowerCase() === 'asc' ? 'asc' : 'desc'
  const sortBy = ['relevance', 'price', 'monthSold'].includes(body?.sortBy) ? body.sortBy : 'relevance'
  return {
    keyword,
    page,
    pageSize,
    sortBy,
    direction,
    categoryIds: categoryIds.length ? categoryIds : [''],
    filters: { ...(body?.filters || {}), categoryIds }
  }
}

function upstreamSort(sortBy, direction) {
  if (sortBy === 'price') return { price: direction }
  if (sortBy === 'monthSold') return { monthSold: direction }
  return {}
}

function capabilityPayload(indexState, facets = {}) {
  const ready = indexState.complete && databaseReady()
  const liveReady = Number(facets?.meta?.sampleSize || 0) > 0
  const detailThreshold = Number(process.env.DETAIL_FILTER_COVERAGE_THRESHOLD || 0.9)
  const detailReady = ready && Number(indexState.detailCoverage || 0) >= detailThreshold
  const detailAvailable = Array.isArray(facets?.attributes) && facets.attributes.length > 0
  const readyCapability = (reason) => ({
    state: ready ? 'searchField' : 'liveSample',
    enabled: ready || liveReady,
    coverage: ready ? indexState.coverage : Number(facets?.meta?.sampleSize || 0),
    reason: ready
      ? ''
      : liveReady
        ? `Available now from ${facets.meta.sampleSize} live catalog matches`
        : reason
  })
  return {
    indexStatus: indexState.status,
    coverage: indexState.coverage,
    queue: indexState.queue || queueState(),
    filters: {
      categoryIds: { state: 'native', enabled: true, coverage: 1 },
      price: readyCapability('Preparing the complete result index'),
      moq: readyCapability('Preparing the complete result index'),
      monthlySales: readyCapability('Preparing the complete result index'),
      fulfillment: readyCapability('Preparing the complete result index'),
      supplierQuality: readyCapability('Preparing the complete result index'),
      productSpecs: {
        state: detailReady ? 'detailIndex' : 'liveSample',
        enabled: ready || liveReady,
        coverage: detailReady
          ? Number(indexState.detailCoverage || 0)
          : Number(facets?.meta?.detailSampleSize || 0),
        reason: detailReady || detailAvailable
          ? ''
          : liveReady
            ? 'Product details are loading for this live result set'
            : 'Category attributes have not reached the required coverage'
      },
      supplierYears: {
        state: 'missingSource',
        enabled: false,
        reason: 'Governed supplier profile data is not available'
      },
      responseTime: {
        state: 'missingSource',
        enabled: false,
        reason: 'Governed supplier profile data is not available'
      },
      oemOdm: {
        state: 'missingSource',
        enabled: false,
        reason: 'Governed supplier profile data is not available'
      }
    }
  }
}

function facetCacheKey(hashes) {
  return [...hashes].sort().join(':')
}

function trimLiveCaches() {
  while (liveDetailCache.size > 500) {
    liveDetailCache.delete(liveDetailCache.keys().next().value)
  }
  while (liveFacetCache.size > 100) {
    liveFacetCache.delete(liveFacetCache.keys().next().value)
  }
}

async function runInBatches(values, size, worker) {
  const results = []
  for (let start = 0; start < values.length; start += size) {
    const batch = values.slice(start, start + size)
    results.push(...await Promise.all(batch.map(worker)))
  }
  return results
}

async function loadLiveDetails(items, limit) {
  const candidates = items.slice(0, limit)
  const results = await runInBatches(candidates, liveDetailConcurrency, async (item) => {
    const key = liveProductKey(item)
    if (liveDetailCache.has(key)) return liveDetailCache.get(key)
    try {
      const upstreamDetail = await getProductDetail({ offerId: item.offerId || item.id, source: item.source || '' })
      const detail = {
        ...upstreamDetail,
        offerId: upstreamDetail?.offerId || upstreamDetail?.id || item.offerId || item.id,
        source: upstreamDetail?.source || item.source || ''
      }
      liveDetailCache.set(key, detail)
      trimLiveCaches()
      return detail
    } catch (error) {
      console.warn(`Live product detail unavailable for ${key}:`, error?.message || error)
      return null
    }
  })
  return results.filter(Boolean)
}

function sortLiveProducts(items, sortBy, direction) {
  if (sortBy === 'relevance') return items
  const multiplier = direction === 'asc' ? 1 : -1
  const getter = sortBy === 'price'
    ? liveProductPrice
    : item => Number(item.monthSold || 0)
  return [...items].sort((a, b) => (Number(getter(a) || 0) - Number(getter(b) || 0)) * multiplier)
}

async function fetchLiveResults(input, hashes) {
  const filtering = hasLiveFilters(input.filters)
  const results = await Promise.all(input.categoryIds.map(async (categoryId, index) => {
    const pages = filtering
      ? Array.from({ length: liveFilterScanPages }, (_, pageIndex) => pageIndex + 1)
      : [input.page]
    const requestPageSize = filtering ? 50 : input.pageSize
    const pageResults = await Promise.all(pages.map(async page => ({
      page,
      result: await searchUpstream({
        keyword: input.keyword,
        categoryId,
        page,
        pageSize: requestPageSize,
        sort: upstreamSort(input.sortBy, input.direction)
      })
    })))
    const firstResult = pageResults[0]?.result || { items: [], total: 0 }
    if (databaseReady()) {
      await Promise.all(pageResults.map(({ page, result }) => storeProducts({
          queryHash: hashes[index],
          keyword: input.keyword,
          categoryId,
          items: result.items,
          page,
          pageSize: requestPageSize
        })))
      await upsertJob({
        queryHash: hashes[index],
        keyword: input.keyword,
        categoryId,
        status: 'pending',
        indexedProducts: pageResults.reduce((sum, entry) => sum + entry.result.items.length, 0),
        expectedProducts: firstResult.total
      })
      enqueueIndex({ keyword: input.keyword, categoryId, hash: hashes[index] })
    }
    return {
      items: pageResults.flatMap(entry => entry.result.items),
      total: firstResult.total
    }
  }))
  const unique = new Map()
  results.forEach(result => result.items.forEach((item) => {
    const key = liveProductKey(item)
    if (!unique.has(key)) unique.set(key, item)
  }))
  const livePool = [...unique.values()]
  const detailLimit = input.filters.attributes
    ? liveAttributeScanSize
    : liveDetailSampleSize
  const details = await loadLiveDetails(livePool, detailLimit)
  const filtered = sortLiveProducts(
    filterLiveProducts(livePool, input.filters, details),
    input.sortBy,
    input.direction
  )
  const offset = filtering ? (input.page - 1) * input.pageSize : 0
  const items = filtering
    ? filtered.slice(offset, offset + input.pageSize)
    : filtered.slice(0, input.pageSize)
  const upstreamTotal = results.reduce((sum, result) => sum + result.total, 0)
  // Facet choices describe the available result pool, not only the rows left
  // after every active filter. Otherwise a zero-result combination turns all
  // controls into zero-count dead ends and users cannot adjust their choices.
  const facets = buildLiveFacets(livePool, details, {
    source: 'live-sample',
    totalMatches: upstreamTotal,
    filtersApplied: filtering,
    selectedAttributes: input.filters.attributes
  })
  liveFacetCache.set(facetCacheKey(hashes), facets)
  trimLiveCaches()
  return {
    items,
    total: filtering ? filtered.length : upstreamTotal,
    facets,
    filtersApplied: true
  }
}

app.get('/health', async (_request, response) => {
  response.json({
    status: 'ok',
    database: databaseReady() ? 'ready' : 'unavailable',
    service: 'codropshipping-search-api',
    queue: queueState()
  })
})

app.post('/v1/search', rateLimit, async (request, response) => {
  try {
    const input = validateSearch(request.body)
    const hashes = input.categoryIds.map(categoryId => queryHash(input.keyword, categoryId))
    let indexState = databaseReady()
      ? await queryIndexState(hashes)
      : { complete: false, status: 'not_started', coverage: 0, detailCoverage: 0, jobs: [] }

    let result
    let facets = { summary: {}, categories: [], attributes: [], meta: {} }
    if (indexState.complete) {
      if (Number(indexState.detailCoverage || 0) < Number(process.env.DETAIL_FILTER_COVERAGE_THRESHOLD || 0.9)) {
        hashes.forEach(hash => enqueueDetailIndex({ hash }))
      }
      result = await queryProducts({
        queryHashes: hashes,
        filters: input.filters,
        page: input.page,
        pageSize: input.pageSize,
        sortBy: input.sortBy,
        direction: input.direction
      })
      facets = await queryFacets({ queryHashes: hashes, filters: {} })
    } else {
      result = await fetchLiveResults(input, hashes)
      facets = result.facets
      if (databaseReady()) indexState = await queryIndexState(hashes)
    }

    response.json({
      data: {
        ...result,
        page: input.page,
        pageSize: input.pageSize,
        facets,
        filtersApplied: indexState.complete || result.filtersApplied === true,
        capabilities: capabilityPayload(indexState, facets)
      }
    })
  } catch (error) {
    const message = error?.message || 'Search failed'
    const status = /keyword must|invalid/i.test(message) ? 400 : 502
    response.status(status).json({ error: message })
  }
})

app.post('/v1/search/status', rateLimit, async (request, response) => {
  try {
    const input = validateSearch(request.body)
    const hashes = input.categoryIds.map(categoryId => queryHash(input.keyword, categoryId))
    const indexState = databaseReady()
      ? await queryIndexState(hashes)
      : { complete: false, status: 'not_started', coverage: 0, detailCoverage: 0, jobs: [] }
    const facets = indexState.complete
      ? await queryFacets({ queryHashes: hashes, filters: {} })
      : liveFacetCache.get(facetCacheKey(hashes))
        || { summary: {}, categories: [], attributes: [], meta: {} }

    response.json({
      data: {
        facets,
        capabilities: capabilityPayload(indexState, facets)
      }
    })
  } catch (error) {
    const message = error?.message || 'Search status failed'
    const status = /keyword must|invalid/i.test(message) ? 400 : 502
    response.status(status).json({ error: message })
  }
})

function requireAdmin(request, response, next) {
  const expected = process.env.SEARCH_ADMIN_TOKEN
  const provided = String(request.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!expected || provided !== expected) return response.status(401).json({ error: 'Unauthorized' })
  return next()
}

function validateProfiles(value) {
  if (!Array.isArray(value) || !value.length || value.length > 500) throw new Error('profiles must contain 1 to 500 records')
  return value.map((profile) => {
    if (!profile?.supplierKey || !profile?.sourceName) {
      throw new Error('Each profile requires supplierKey and sourceName')
    }
    return {
      ...profile,
      supplierKey: String(profile.supplierKey).slice(0, 255),
      sourceName: String(profile.sourceName).slice(0, 255)
    }
  })
}

app.post('/v1/admin/suppliers/import', requireAdmin, async (request, response) => {
  try {
    const profiles = validateProfiles(request.body?.profiles)
    const imported = await importSupplierProfiles(profiles)
    response.json({ data: { imported } })
  } catch (error) {
    response.status(400).json({ error: error?.message || 'Import failed' })
  }
})

app.use((_request, response) => response.status(404).json({ error: 'Not found' }))

async function connectDatabase() {
  try {
    await initializeDatabase()
    console.log('Search database ready')
  } catch (error) {
    console.error('Search database unavailable, proxy mode remains active:', error.message)
    setTimeout(connectDatabase, 30000).unref()
  }
}

connectDatabase()

app.listen(port, '0.0.0.0', () => {
  console.log(`Search API listening on ${port}`)
})
