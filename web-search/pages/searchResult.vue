<template>
  <main class="search-page">
    <div v-if="dataLoading" class="page-spinner" aria-label="Loading related products">
      <span></span>
    </div>

    <Teleport to="body">
      <div v-if="showRelated" class="modal-mask" @click.self="showRelated = false">
        <section class="related-modal" role="dialog" aria-modal="true" aria-label="Related products">
          <header class="modal-header">
            <div>
              <p class="eyebrow">VISUAL MATCH</p>
              <h2>Related products</h2>
            </div>
            <button class="icon-button" type="button" aria-label="Close related products" @click="showRelated = false">×</button>
          </header>
          <div class="related-grid">
            <article v-for="item in relatedList" :key="`${item.offerId}-${item.source}`" class="mini-card">
              <NuxtLink :to="detailLink(item)" target="_blank">
                <img :src="item.imageUrl" :alt="item.subjectTrans || item.subject" loading="lazy">
                <p>{{ item.subjectTrans || item.subject }}</p>
              </NuxtLink>
              <strong>US ${{ item.usd }}</strong>
              <button type="button" @click="chatNows(item)">Chat now</button>
            </article>
          </div>
        </section>
      </div>
    </Teleport>

    <div class="search-shell">
      <section v-if="searchImage && !keywordDisplay" class="image-search-context">
        <img :src="searchImage" alt="Uploaded product search">
        <div>
          <p class="eyebrow">IMAGE SEARCH</p>
          <strong>Products matching your image</strong>
        </div>
      </section>

      <section v-if="keywordDisplay" class="filter-console" @keydown.esc="activeMenu = ''">
        <div class="filter-topline">
          <div class="filter-buttons" role="group" aria-label="Product filters">
            <div class="filter-menu-wrap">
              <button
                type="button"
                class="filter-trigger category-trigger"
                :class="{ active: activeMenu === 'category', selected: categorySelectedCount > 0 }"
                :aria-expanded="activeMenu === 'category'"
                @click="toggleMenu('category')">
                Category
                <span v-if="categorySelectedCount" class="trigger-count">{{ categorySelectedCount }}</span>
                <span class="chevron">⌄</span>
              </button>
              <div v-if="activeMenu === 'category'" class="filter-popover category-popover">
                <div class="popover-heading">
                  <div>
                    <p class="eyebrow">MULTI-SELECT</p>
                    <strong>Product categories</strong>
                  </div>
                  <div class="heading-actions">
                    <span class="data-badge">{{ filterSourceShort }}</span>
                    <button v-if="categorySelectedCount" type="button" @click="clearCategories">Clear</button>
                  </div>
                </div>
                <div v-if="categoryGroups.length" class="category-groups">
                  <div v-for="group in categoryGroups" :key="group.id" class="category-group">
                    <p>{{ group.translateName }}</p>
                    <label v-for="child in group.children" :key="child.id" class="check-option">
                      <input
                        type="checkbox"
                        :checked="selectedCategoryIds.includes(String(child.categoryId))"
                        @change="toggleCategory(child)">
                      <span class="custom-check">✓</span>
                      <span>{{ child.translateName }}</span>
                      <small v-if="child.count">{{ formatCompactNumber(child.count) }}</small>
                    </label>
                  </div>
                </div>
                <p v-else-if="loading" class="popover-note">Matching categories from the full product catalog...</p>
                <p v-else class="popover-note">No matching product categories were found for this keyword.</p>
              </div>
            </div>

            <div v-for="definition in quickFilterDefinitions" :key="definition.id" class="filter-menu-wrap">
              <button
                type="button"
                class="filter-trigger"
                :class="{ active: activeMenu === definition.id, selected: menuSelected(definition.id) }"
                :title="capability(definition.capability).reason || ''"
                @click="toggleMenu(definition.id)">
                {{ definition.label }}
                <span v-if="menuSelected(definition.id)" class="selected-dot"></span>
                <span v-else-if="capability(definition.capability).state === 'liveSample'" class="live-dot"></span>
                <span class="chevron">⌄</span>
              </button>

              <div v-if="activeMenu === definition.id" class="filter-popover">
                <template v-if="definition.id === 'price'">
                  <div class="popover-heading">
                    <strong>Source price range</strong>
                    <span>{{ filterSourceShort }} · CNY</span>
                  </div>
                  <p class="facet-summary">{{ priceRangeSummary }}</p>
                  <div class="range-inputs">
                    <label>Min <input v-model.number="draftFilters.minSourcePrice" type="number" min="0" placeholder="0" @keyup.enter="applyDraftAndClose"></label>
                    <span>to</span>
                    <label>Max <input v-model.number="draftFilters.maxSourcePrice" type="number" min="0" placeholder="No limit" @keyup.enter="applyDraftAndClose"></label>
                  </div>
                  <button class="popover-apply" type="button" @click="applyDraftAndClose">Apply price</button>
                </template>

                <template v-else-if="definition.id === 'moq'">
                  <div class="popover-heading"><strong>Maximum MOQ</strong><span>{{ filterSourceShort }} · pieces</span></div>
                  <label v-for="option in moqOptions" :key="option.value" class="radio-option">
                    <input
                      type="checkbox"
                      :checked="Number(draftFilters.maxMoq) === option.value"
                      :disabled="option.count === 0"
                      @change="toggleExclusiveFilter('maxMoq', option.value)">
                    <span>Up to {{ option.value }}</span>
                    <small>{{ formatCompactNumber(option.count) }}</small>
                  </label>
                </template>

                <template v-else-if="definition.id === 'fulfillment'">
                  <div class="popover-heading"><strong>Fulfillment</strong><span>{{ filterSourceShort }}</span></div>
                  <label class="check-option">
                    <input
                      v-model="draftFilters.onePieceDropshipping"
                      type="checkbox"
                      :disabled="!facetAvailable('onePieceDropshipping')"
                      @change="commitDraft">
                    <span class="custom-check">✓</span><span>One-piece dropshipping</span>
                    <small>{{ facetCount('onePieceDropshipping') }}</small>
                  </label>
                  <label class="check-option">
                    <input
                      type="checkbox"
                      :checked="draftFilters.dispatchGuarantee === '48h'"
                      :disabled="!facetAvailable('dispatch48h')"
                      @change="setDispatchGuarantee">
                    <span class="custom-check">✓</span><span>48-hour dispatch guarantee</span>
                    <small>{{ facetCount('dispatch48h') }}</small>
                  </label>
                  <label class="check-option">
                    <input
                      v-model="draftFilters.shippingIncluded"
                      type="checkbox"
                      :disabled="!facetAvailable('shippingIncluded')"
                      @change="commitDraft">
                    <span class="custom-check">✓</span><span>Shipping included</span>
                    <small>{{ facetCount('shippingIncluded') }}</small>
                  </label>
                  <label class="check-option">
                    <input
                      v-model="draftFilters.onlineInvoice"
                      type="checkbox"
                      :disabled="!facetAvailable('onlineInvoice')"
                      @change="commitDraft">
                    <span class="custom-check">✓</span><span>Online invoice</span>
                    <small>{{ facetCount('onlineInvoice') }}</small>
                  </label>
                </template>

                <template v-else-if="definition.id === 'supplierQuality'">
                  <div class="popover-heading"><strong>Supplier quality</strong><span>{{ filterSourceShort }}</span></div>
                  <label v-for="option in tradeScoreOptions" :key="option.value" class="radio-option">
                    <input
                      type="checkbox"
                      :checked="Number(draftFilters.minTradeScore) === option.value"
                      :disabled="option.count === 0"
                      @change="toggleExclusiveFilter('minTradeScore', option.value)">
                    <span>Trade score {{ option.value }}+</span>
                    <small>{{ formatCompactNumber(option.count) }}</small>
                  </label>
                  <label class="field-label">
                    Minimum repurchase rate
                    <div class="suffix-input">
                      <input v-model.number="draftFilters.minRepurchaseRate" type="number" min="0" max="100" placeholder="0" @keyup.enter="applyDraftAndClose">
                      <span>%</span>
                    </div>
                  </label>
                  <button class="popover-apply" type="button" @click="applyDraftAndClose">Apply quality</button>
                </template>

                <template v-else>
                  <div class="popover-heading"><strong>Product specifications</strong><span>{{ filterSourceShort }}</span></div>
                  <div v-if="attributeFacets.length">
                    <div v-for="facet in attributeFacets" :key="facet.key" class="attribute-group">
                      <p>{{ facet.label }}</p>
                      <label v-for="value in facet.values" :key="value.value" class="check-option">
                        <input type="checkbox" :checked="attributeSelected(facet.key, value.value)" @change="toggleAttribute(facet.key, value.value)">
                        <span class="custom-check">✓</span>
                        <span>{{ value.value }} <small>{{ value.count }}</small></span>
                      </label>
                    </div>
                  </div>
                  <p v-else class="popover-note">Loading real category attributes from the current product details. Price, MOQ, fulfillment and supplier filters remain available now.</p>
                </template>
              </div>
            </div>

            <button type="button" class="filter-trigger all-filter-trigger" @click="showFilterDetails = !showFilterDetails">
              All filters
              <span class="chevron">{{ showFilterDetails ? '⌃' : '⌄' }}</span>
            </button>
          </div>

          <div class="index-status" :class="[capabilities.indexStatus, { 'live-ready': !hasFullIndex && Number(facetMeta.sampleSize || 0) > 0 }]">
            <span></span>
            <div>
              <strong>{{ indexStatusTitle }}</strong>
              <small>{{ indexStatusSubtitle }}</small>
            </div>
          </div>
        </div>

        <div v-if="selectedChips.length" class="selected-row">
          <span class="selected-label">Selected</span>
          <button v-for="chip in selectedChips" :key="chip.id" type="button" class="selected-chip" @click="removeChip(chip)">
            {{ chip.label }} <span>×</span>
          </button>
          <button type="button" class="clear-all" @click="clearAllFilters">Clear all</button>
        </div>
        <div v-else class="selected-row empty-selection">
          <span>No filters selected</span>
          <span>{{ filterDataNote }}</span>
        </div>

        <div v-if="showFilterDetails" class="capability-panel">
          <div>
            <p class="eyebrow">DATA COVERAGE</p>
            <strong>{{ filterSourceTitle }}</strong>
            <p>{{ filterDataNote }}</p>
          </div>
          <div class="capability-list">
            <span v-for="item in capabilitySummary" :key="item.label" :class="{ ready: item.enabled }">
              <i>{{ item.enabled ? '✓' : '…' }}</i>{{ item.label }}
            </span>
          </div>
        </div>
      </section>

      <section class="results-surface">
        <div v-if="loading" class="product-grid" aria-label="Loading products">
          <div v-for="idx in skeletonItems" :key="idx" class="skeleton-card">
            <span></span><i></i><i></i><i></i>
          </div>
        </div>

        <div v-else-if="productError" class="state-card error-state" role="alert">
          <strong>We could not load these products.</strong>
          <p>{{ productError }}</p>
          <button type="button" @click="fetchProducts(true)">Try again</button>
        </div>

        <div v-else-if="!productList.length" class="state-card">
          <strong>No products match all selected filters.</strong>
          <p>Remove one or more filters, or try a broader product keyword.</p>
          <button v-if="selectedChips.length" type="button" @click="clearAllFilters">Clear all filters</button>
        </div>

        <div v-else class="product-grid">
          <article v-for="item in productList" :key="`${item.offerId}-${item.source}`" class="procurement-card">
            <div class="product-media">
              <NuxtLink :to="detailLink(item)" target="_blank">
                <img :src="item.imageUrl" :alt="item.subjectTrans || item.subject" loading="lazy">
              </NuxtLink>
              <span v-if="item.isOnePsale" class="media-badge">1-piece dropship</span>
              <div class="media-actions">
                <button type="button" title="Find related products" aria-label="Find related products" @click="getRelated(item.offerId)">
                  <svg viewBox="0 0 24 24"><path d="m20 20-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" /></svg>
                </button>
                <button type="button" title="Add to my products" aria-label="Add to my products" @click="addProduct(item)">＋</button>
              </div>
            </div>

            <div class="card-body">
              <NuxtLink :to="detailLink(item)" target="_blank" class="product-title">{{ item.subjectTrans || item.subject }}</NuxtLink>
              <div class="price-line">
                <div><small>US $</small><strong>{{ item.usd }}</strong><span>/ piece</span></div>
                <img :src="alibabaIcon" alt="1688 source">
              </div>
              <div class="purchase-facts">
                <span><small>MOQ</small><strong>{{ item.minOrderQuantity || 1 }} pcs</strong></span>
                <span><small>Monthly sales</small><strong>{{ formatCompactNumber(item.monthSold || 0) }}</strong></span>
              </div>
              <div v-if="cardSignals(item).length" class="signal-row">
                <span v-for="signal in cardSignals(item)" :key="signal">{{ signal }}</span>
              </div>
              <div class="supplier-line">
                <span v-if="sellerIdentityLabel(item.sellerIdentities)">{{ sellerIdentityLabel(item.sellerIdentities) }}</span>
                <span v-if="item.tradeScore">Trade score {{ Number(item.tradeScore).toFixed(1) }}</span>
                <span v-if="normalizePercent(item.repurchaseRate)">Repurchase {{ normalizePercent(item.repurchaseRate) }}%</span>
              </div>
              <div class="card-actions">
                <button type="button" class="secondary-action" @click="addList(item)">List product</button>
                <button type="button" class="primary-action" @click="chatNows(item)">Chat now</button>
              </div>
            </div>
          </article>
        </div>

        <div v-if="totalNum > pageSize" class="pagination-wrap">
          <el-pagination
            :current-page="current"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalNum"
            @current-change="changePage" />
        </div>
      </section>
    </div>
    <BackTop />
  </main>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  addShopList,
  getCategory,
  getCountry,
  getDefault,
  getDetail,
  getProcurementSearchStatus,
  getProductRelatedRecommend,
  getRate,
  searchImg,
  searchKeyword,
  searchProcurementProducts
} from '~/services/api'
import {
  buildProductTaxonomyFilters,
  buildResultCategoryFilters,
  mergeCategoryFilterGroups,
  type ProductCategoryFacet,
  type ProductFilterOption,
  type ProductTaxonomyNode
} from '~/data/productTaxonomy'
import {
  cloneCapabilities,
  defaultCapabilities,
  dispatchLabel,
  formatCompactNumber,
  normalizePercent,
  productPrice,
  quickFilterDefinitions,
  sellerIdentityLabel,
  type ProcurementFilters,
  type ProcurementProduct,
  type SearchCapabilities
} from '~/data/procurementSearch'

useHead({
  title: 'Search Result - CoDropshipping',
  meta: [
    { name: 'description', content: 'Compare China wholesale products using procurement-ready price, MOQ, fulfillment and supplier signals.' },
    { name: 'referrer', content: 'no-referrer' }
  ]
})
definePageMeta({ layout: 'default' })

type AttributeFacet = {
  key: string
  label: string
  values: Array<{ value: string; count: number }>
}

type FacetSummary = Record<string, number | null | undefined>

type FacetMeta = {
  source?: 'full-index' | 'live-sample' | 'live-results'
  sampleSize?: number
  detailSampleSize?: number
  totalMatches?: number
  filtersApplied?: boolean
}

type Chip = {
  id: string
  label: string
  type: 'category' | 'filter' | 'attribute'
  key?: keyof ProcurementFilters | string
  value?: string
}

const route = useRoute()
const queryState = ref<Record<string, string>>({})
const productList = ref<ProcurementProduct[]>([])
const relatedList = ref<ProcurementProduct[]>([])
const categoryGroups = ref<any[]>([])
const keywordCategoryGroups = ref<any[]>([])
const selectedCategories = ref<ProductFilterOption[]>([])
const productError = ref('')
const loading = ref(true)
const dataLoading = ref(false)
const showRelated = ref(false)
const showFilterDetails = ref(false)
const activeMenu = ref('')
const rate = ref(1)
const current = ref(1)
const totalNum = ref(0)
const searchImage = ref('')
const sortKey = ref('relevance')
const backendMode = ref<'search-api' | 'fallback'>('search-api')
const capabilities = ref<SearchCapabilities>(cloneCapabilities(defaultCapabilities))
const attributeFacets = ref<AttributeFacet[]>([])
const categoryFacets = ref<ProductCategoryFacet[]>([])
const facetSummary = ref<FacetSummary>({})
const facetMeta = ref<FacetMeta>({})
const pageSize = 20
const skeletonItems = Array.from({ length: 15 }, (_, index) => index)
const actionRegion = ref('')
const chatProduct = inject<(() => void) | undefined>('chatProduct')
const draftFilters = reactive<ProcurementFilters>({ categoryIds: [] })
const appliedFilters = reactive<ProcurementFilters>({ categoryIds: [] })
let taxonomyCache: ProductTaxonomyNode[] | null = null
let requestSequence = 0
let autoApplyTimer: ReturnType<typeof setTimeout> | undefined
let indexPollTimer: ReturnType<typeof setTimeout> | undefined
const fallbackDetailCache = new Map<string, any>()

const alibabaIcon = new URL('@/assets/images/1688alibaba.svg', import.meta.url).href
const keywordDisplay = computed(() => queryState.value.keyword ? decodeURIComponent(queryState.value.keyword) : '')
const selectedCategoryIds = computed(() => selectedCategories.value.map(item => String(item.categoryId)))
const categorySelectedCount = computed(() => selectedCategories.value.length)
const hasFullIndex = computed(() => capabilities.value.indexStatus === 'complete' || facetMeta.value.source === 'full-index')
const filterSourceShort = computed(() => hasFullIndex.value ? 'Full database' : 'Live results')
const filterSourceTitle = computed(() => hasFullIndex.value ? 'Full database filters' : 'Live filters available now')
const filterDataNote = computed(() => {
  if (hasFullIndex.value) {
    return `Filtering ${formatCompactNumber(facetMeta.value.totalMatches || totalNum.value)} indexed matches with normalized category attributes.`
  }
  const sampleSize = Number(facetMeta.value.sampleSize || productList.value.length || 0)
  const detailSize = Number(facetMeta.value.detailSampleSize || 0)
  if (sampleSize) {
    return `Based on ${formatCompactNumber(sampleSize)} live matches${detailSize ? ` and ${detailSize} product details` : ''}. Full database indexing continues in the background.`
  }
  return 'Live product fields are loading. Every filter remains available.'
})
const indexStatusTitle = computed(() => {
  if (hasFullIndex.value) return 'Full-result filters ready'
  if (Number(facetMeta.value.sampleSize || 0)) return 'Live filters ready'
  if (capabilities.value.queue?.queryQueuePosition) {
    return `Filters queued · #${capabilities.value.queue.queryQueuePosition}`
  }
  return 'Loading live filters'
})
const indexStatusSubtitle = computed(() => {
  if (hasFullIndex.value) return `${formatCompactNumber(facetMeta.value.totalMatches || totalNum.value)} indexed matches`
  const sampleSize = Number(facetMeta.value.sampleSize || 0)
  const detailSize = Number(facetMeta.value.detailSampleSize || 0)
  if (sampleSize) return `${formatCompactNumber(sampleSize)} products · ${detailSize} details`
  return `${Math.round(capabilities.value.coverage * 100)}% full index`
})
const priceRangeSummary = computed(() => {
  const minimum = Number(facetSummary.value.minPrice)
  const maximum = Number(facetSummary.value.maxPrice)
  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) return 'Enter the purchasing price range you need.'
  return `Available range in this result set: CNY ${minimum.toFixed(2)} - ${maximum.toFixed(2)}`
})
const moqOptions = computed(() => [
  { value: 1, count: Number(facetSummary.value.moqUpTo1 || 0) },
  { value: 5, count: Number(facetSummary.value.moqUpTo5 || 0) },
  { value: 10, count: Number(facetSummary.value.moqUpTo10 || 0) },
  { value: 50, count: Number(facetSummary.value.moqUpTo50 || 0) }
])
const tradeScoreOptions = computed(() => [
  { value: 3, count: Number(facetSummary.value.tradeScore3 || 0) },
  { value: 4, count: Number(facetSummary.value.tradeScore4 || 0) },
  { value: 4.5, count: Number(facetSummary.value.tradeScore45 || 0) }
])
const capabilitySummary = computed(() => [
  { label: 'Category', enabled: true },
  { label: 'Price', enabled: capability('price').enabled },
  { label: 'MOQ', enabled: capability('moq').enabled },
  { label: 'Fulfillment', enabled: capability('fulfillment').enabled },
  { label: 'Supplier scores', enabled: capability('supplierQuality').enabled },
  { label: 'Product specs', enabled: capability('productSpecs').enabled }
])
const selectedChips = computed<Chip[]>(() => {
  const chips: Chip[] = selectedCategories.value.map(item => ({
    id: String(item.id),
    label: item.translateName,
    type: 'category',
    value: String(item.categoryId)
  }))
  if (appliedFilters.minSourcePrice !== undefined || appliedFilters.maxSourcePrice !== undefined) {
    chips.push({
      id: 'price',
      label: `CNY ${appliedFilters.minSourcePrice ?? 0} - ${appliedFilters.maxSourcePrice ?? 'any'}`,
      type: 'filter',
      key: 'price'
    })
  }
  if (appliedFilters.maxMoq) chips.push({ id: 'moq', label: `MOQ ≤ ${appliedFilters.maxMoq}`, type: 'filter', key: 'maxMoq' })
  if (appliedFilters.onePieceDropshipping) chips.push({ id: 'dropship', label: '1-piece dropship', type: 'filter', key: 'onePieceDropshipping' })
  if (appliedFilters.dispatchGuarantee) chips.push({ id: 'dispatch', label: '48h dispatch', type: 'filter', key: 'dispatchGuarantee' })
  if (appliedFilters.shippingIncluded) chips.push({ id: 'shipping', label: 'Shipping included', type: 'filter', key: 'shippingIncluded' })
  if (appliedFilters.onlineInvoice) chips.push({ id: 'invoice', label: 'Online invoice', type: 'filter', key: 'onlineInvoice' })
  if (appliedFilters.minTradeScore) chips.push({ id: 'trade', label: `Trade score ${appliedFilters.minTradeScore}+`, type: 'filter', key: 'minTradeScore' })
  if (appliedFilters.minRepurchaseRate) chips.push({ id: 'repurchase', label: `Repurchase ${appliedFilters.minRepurchaseRate}%+`, type: 'filter', key: 'minRepurchaseRate' })
  Object.entries(appliedFilters.attributes || {}).forEach(([key, values]) => {
    values.forEach(value => chips.push({ id: `attribute:${key}:${value}`, label: value, type: 'attribute', key, value }))
  })
  return chips
})

function capability(key: string) {
  return capabilities.value.filters[key] || { state: 'missingSource', enabled: false, reason: 'Not available yet' }
}

function facetCount(key: string) {
  return formatCompactNumber(Number(facetSummary.value[key] || 0))
}

function facetAvailable(key: string) {
  return Number(facetSummary.value[key] || 0) > 0
}

function applyFacetPayload(facets: any) {
  facetSummary.value = facets?.summary && typeof facets.summary === 'object' ? facets.summary : {}
  categoryFacets.value = Array.isArray(facets?.categories) ? facets.categories : []
  const previousAttributes = attributeFacets.value
  const nextAttributes: AttributeFacet[] = Array.isArray(facets?.attributes)
    ? facets.attributes.map((facet: AttributeFacet) => ({
        ...facet,
        values: Array.isArray(facet.values) ? [...facet.values] : []
      }))
    : []
  Object.entries(draftFilters.attributes || {}).forEach(([key, selectedValues]) => {
    const previousGroup = previousAttributes.find(group => group.key === key)
    let group = nextAttributes.find(candidate => candidate.key === key)
    if (!group) {
      group = {
        key,
        label: previousGroup?.label || key,
        values: []
      }
      nextAttributes.unshift(group)
    }
    selectedValues.forEach((value) => {
      if (group?.values.some(option => option.value === value)) return
      const previousValue = previousGroup?.values.find(option => option.value === value)
      group?.values.unshift(previousValue || { value, count: 0 })
    })
  })
  attributeFacets.value = nextAttributes
  facetMeta.value = facets?.meta && typeof facets.meta === 'object' ? facets.meta : {}
}

function syncQuery() {
  const next: Record<string, string> = {}
  Object.entries(route.query).forEach(([key, value]) => {
    const first = Array.isArray(value) ? value[0] : value
    if (first !== undefined && first !== null) next[key] = String(first)
  })
  queryState.value = next
}

function divide(value = 0, divisor = 1) {
  const result = Number(value) / Number(divisor || 1)
  return Math.max(Math.round(result * 100) / 100, 0.01)
}

function detailLink(item: ProcurementProduct) {
  return {
    path: '/productDetail',
    query: { id: item.offerId, source: item.source, keyword: queryState.value.keyword }
  }
}

function toggleMenu(id: string) {
  activeMenu.value = activeMenu.value === id ? '' : id
}

function menuSelected(id: string) {
  if (id === 'price') return appliedFilters.minSourcePrice !== undefined || appliedFilters.maxSourcePrice !== undefined
  if (id === 'moq') return Boolean(appliedFilters.maxMoq)
  if (id === 'fulfillment') {
    return Boolean(appliedFilters.onePieceDropshipping || appliedFilters.dispatchGuarantee || appliedFilters.shippingIncluded || appliedFilters.onlineInvoice)
  }
  if (id === 'supplierQuality') return Boolean(appliedFilters.minTradeScore || appliedFilters.minRepurchaseRate)
  if (id === 'productSpecs') return Boolean(Object.values(appliedFilters.attributes || {}).flat().length)
  return false
}

function scheduleApply() {
  if (autoApplyTimer) clearTimeout(autoApplyTimer)
  autoApplyTimer = setTimeout(() => {
    current.value = 1
    fetchProducts(true)
  }, 350)
}

function toggleCategory(item: ProductFilterOption) {
  const categoryId = String(item.categoryId)
  const exists = selectedCategoryIds.value.includes(categoryId)
  selectedCategories.value = exists
    ? selectedCategories.value.filter(selected => String(selected.categoryId) !== categoryId)
    : [...selectedCategories.value, item]
  draftFilters.categoryIds = selectedCategoryIds.value
  appliedFilters.categoryIds = selectedCategoryIds.value
  scheduleApply()
}

function clearCategories() {
  selectedCategories.value = []
  draftFilters.categoryIds = []
  appliedFilters.categoryIds = []
  scheduleApply()
}

function commitDraft() {
  Object.keys(appliedFilters).forEach((key) => {
    delete (appliedFilters as Record<string, unknown>)[key]
  })
  Object.assign(appliedFilters, JSON.parse(JSON.stringify(draftFilters)))
  appliedFilters.categoryIds = selectedCategoryIds.value
  current.value = 1
  scheduleApply()
}

function toggleExclusiveFilter(key: 'maxMoq' | 'minTradeScore', value: number) {
  if (Number(draftFilters[key]) === value) delete draftFilters[key]
  else draftFilters[key] = value
  commitDraft()
}

function applyDraftAndClose() {
  commitDraft()
  activeMenu.value = ''
}

function setDispatchGuarantee(event: Event) {
  draftFilters.dispatchGuarantee = (event.target as HTMLInputElement).checked ? '48h' : undefined
  commitDraft()
}

function attributeSelected(key: string, value: string) {
  return Boolean(draftFilters.attributes?.[key]?.includes(value))
}

function toggleAttribute(key: string, value: string) {
  const attributes = { ...(draftFilters.attributes || {}) }
  const values = new Set(attributes[key] || [])
  if (values.has(value)) values.delete(value)
  else values.add(value)
  attributes[key] = [...values]
  if (!attributes[key].length) delete attributes[key]
  draftFilters.attributes = attributes
  commitDraft()
}

function removeChip(chip: Chip) {
  if (chip.type === 'category') {
    selectedCategories.value = selectedCategories.value.filter(item => String(item.categoryId) !== chip.value)
  } else if (chip.type === 'attribute' && chip.key && chip.value) {
    toggleAttribute(String(chip.key), chip.value)
    return
  } else if (chip.key === 'price') {
    delete draftFilters.minSourcePrice
    delete draftFilters.maxSourcePrice
  } else if (chip.key) {
    delete (draftFilters as Record<string, unknown>)[chip.key]
  }
  draftFilters.categoryIds = selectedCategoryIds.value
  commitDraft()
}

function clearAllFilters() {
  selectedCategories.value = []
  Object.keys(draftFilters).forEach((key) => {
    if (key !== 'categoryIds') delete (draftFilters as Record<string, unknown>)[key]
  })
  draftFilters.categoryIds = []
  Object.keys(appliedFilters).forEach((key) => {
    if (key !== 'categoryIds') delete (appliedFilters as Record<string, unknown>)[key]
  })
  appliedFilters.categoryIds = []
  current.value = 1
  fetchProducts(true)
}

function changeSort() {
  current.value = 1
  fetchProducts(true)
}

function changePage(page: number) {
  current.value = page
  fetchProducts(true)
  if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

function sortPayload() {
  if (sortKey.value === 'monthSold_desc') return { monthSold: 'desc' }
  if (sortKey.value === 'price_asc') return { price: 'asc' }
  if (sortKey.value === 'price_desc') return { price: 'desc' }
  return {}
}

function searchApiSort() {
  const [sortBy, direction] = sortKey.value.split('_')
  return sortBy === 'relevance' ? { sortBy: 'relevance', direction: 'desc' } : { sortBy, direction }
}

function extractSearchResponse(res: any) {
  const responseData = res.data?.data
  const items = Array.isArray(responseData)
    ? responseData
    : Array.isArray(responseData?.data)
      ? responseData.data
      : []
  return {
    items,
    total: Array.isArray(responseData) ? items.length : Number(responseData?.totalRecords || items.length)
  }
}

function normalizeProducts(items: ProcurementProduct[]) {
  return items.map(item => ({
    ...item,
    usd: divide(productPrice(item), rate.value)
  }))
}

function normalizedFacetText(value: unknown) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 500)
}

function fallbackProductKey(item: Partial<ProcurementProduct>) {
  return `${item.offerId || item.id || ''}:${item.source || ''}`
}

function sourceBoolean(value: unknown) {
  return value === true || value === 1 || value === '1'
}

function is48HourDispatch(item: ProcurementProduct) {
  const guarantee = item.productSimpleShippingInfo?.shippingTimeGuarantee
  if (guarantee === true || guarantee === 1) return true
  const normalized = normalizedFacetText(guarantee)
  return normalized === 'true' || normalized === '1' || normalized.includes('48')
}

function fallbackAttributeValues(attribute: any) {
  const raw = attribute?.attributeValue
    ?? attribute?.valueTrans
    ?? attribute?.value
    ?? attribute?.attributeValueTrans
    ?? attribute?.values
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

async function loadFallbackDetails(items: ProcurementProduct[], limit: number) {
  const candidates = items.slice(0, limit)
  const details: any[] = []
  for (let start = 0; start < candidates.length; start += 4) {
    const batch = candidates.slice(start, start + 4)
    const results = await Promise.all(batch.map(async (item) => {
      const key = fallbackProductKey(item)
      if (fallbackDetailCache.has(key)) return fallbackDetailCache.get(key)
      try {
        const response = await getDetail({
          offerId: item.offerId,
          source: item.source || '',
          keyword: keywordDisplay.value
        })
        const payload = response.data?.data || response.data
        const detail = {
          ...payload,
          offerId: payload?.offerId || payload?.id || item.offerId,
          source: payload?.source || item.source || ''
        }
        fallbackDetailCache.set(key, detail)
        return detail
      } catch (error) {
        console.warn(`Product details unavailable for ${key}`, error)
        return null
      }
    }))
    details.push(...results.filter(Boolean))
  }
  while (fallbackDetailCache.size > 200) {
    fallbackDetailCache.delete(fallbackDetailCache.keys().next().value as string)
  }
  return details
}

function fallbackAttributeMap(details: any[]) {
  const products = new Map<string, Map<string, Set<string>>>()
  details.forEach((detail) => {
    const groups = new Map<string, Set<string>>()
    ;(detail.productAttribute || detail.productAttributes || []).forEach((attribute: any) => {
      const name = String(
        attribute.attributeNameTrans
        || attribute.attributeName
        || attribute.nameTrans
        || attribute.name
        || ''
      ).trim()
      const key = normalizedFacetText(name)
      if (!key) return
      if (!groups.has(key)) groups.set(key, new Set())
      fallbackAttributeValues(attribute).forEach(value => groups.get(key)?.add(normalizedFacetText(value)))
    })
    products.set(fallbackProductKey(detail), groups)
  })
  return products
}

function buildFallbackAttributeFacets(details: any[]): AttributeFacet[] {
  const groups = new Map<string, { key: string; label: string; values: Map<string, { value: string; count: number }> }>()
  details.forEach((detail) => {
    const productKey = fallbackProductKey(detail)
    const seen = new Set<string>()
    ;(detail.productAttribute || detail.productAttributes || []).forEach((attribute: any) => {
      const label = String(
        attribute.attributeNameTrans
        || attribute.attributeName
        || attribute.nameTrans
        || attribute.name
        || ''
      ).trim()
      const key = normalizedFacetText(label)
      if (!key) return
      if (!groups.has(key)) groups.set(key, { key, label, values: new Map() })
      fallbackAttributeValues(attribute).forEach((value) => {
        const normalizedValue = normalizedFacetText(value)
        const occurrence = `${productKey}:${key}:${normalizedValue}`
        if (!normalizedValue || seen.has(occurrence)) return
        seen.add(occurrence)
        const group = groups.get(key)!
        const currentValue = group.values.get(normalizedValue) || { value, count: 0 }
        currentValue.count += 1
        group.values.set(normalizedValue, currentValue)
      })
    })
  })
  return [...groups.values()]
    .map(group => ({
      key: group.key,
      label: group.label,
      values: [...group.values.values()]
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
        .slice(0, 10)
    }))
    .filter(group => group.values.length)
    .sort((a, b) => (
      b.values.reduce((sum, value) => sum + value.count, 0)
      - a.values.reduce((sum, value) => sum + value.count, 0)
    ))
    .slice(0, 10)
}

function hasFallbackFilters(filters: ProcurementFilters) {
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
    || Object.values(filters.attributes || {}).some(values => values.length)
}

function filterFallbackProducts(items: ProcurementProduct[], filters: ProcurementFilters, details: any[]) {
  const attributesByProduct = fallbackAttributeMap(details)
  const selectedAttributes = Object.entries(filters.attributes || {})
    .map(([name, values]) => [
      normalizedFacetText(name),
      new Set(values.map(normalizedFacetText).filter(Boolean))
    ] as const)
    .filter(([, values]) => values.size)
  const atLeast = (value: unknown, minimum: unknown) => {
    if (minimum === undefined || minimum === null || minimum === '') return true
    const actual = Number(value)
    const expected = Number(minimum)
    return Number.isFinite(actual) && Number.isFinite(expected) && actual >= expected
  }
  const atMost = (value: unknown, maximum: unknown) => {
    if (maximum === undefined || maximum === null || maximum === '') return true
    const actual = Number(value)
    const expected = Number(maximum)
    return Number.isFinite(actual) && Number.isFinite(expected) && actual <= expected
  }
  return items.filter((item) => {
    if (!atLeast(productPrice(item), filters.minSourcePrice)) return false
    if (!atMost(productPrice(item), filters.maxSourcePrice)) return false
    if (!atMost(item.minOrderQuantity, filters.maxMoq)) return false
    if (!atLeast(item.monthSold, filters.minMonthlySales)) return false
    if (!atLeast(item.tradeScore, filters.minTradeScore)) return false
    if (!atLeast(item.sellerDataInfo?.compositeServiceScore, filters.minServiceScore)) return false
    if (!atLeast(
      normalizePercent(item.repurchaseRate ?? item.sellerDataInfo?.repeatPurchasePercent),
      filters.minRepurchaseRate
    )) return false
    if (!atLeast(item.sellerDataInfo?.tradeMedalLevel, filters.minTradeMedalLevel)) return false
    if (filters.onePieceDropshipping === true && !sourceBoolean(item.isOnePsale)) return false
    if (filters.shippingIncluded === true && !sourceBoolean(item.isShippingIncluded)) return false
    if (filters.onlineInvoice === true && !sourceBoolean(item.invoiceInfo?.supportOnlineInvoice)) return false
    if (filters.dispatchGuarantee === '48h' && !is48HourDispatch(item)) return false
    if (selectedAttributes.length) {
      const productAttributes = attributesByProduct.get(fallbackProductKey(item))
      if (!productAttributes) return false
      const matches = selectedAttributes.every(([key, values]) => {
        const available = productAttributes.get(key)
        return available && [...values].some(value => available.has(value))
      })
      if (!matches) return false
    }
    return true
  })
}

function sortFallbackProducts(items: ProcurementProduct[]) {
  if (sortKey.value === 'relevance') return items
  const [field, direction] = sortKey.value.split('_')
  const multiplier = direction === 'asc' ? 1 : -1
  const getter = field === 'price'
    ? productPrice
    : (item: ProcurementProduct) => Number(item.monthSold || 0)
  return [...items].sort((a, b) => (getter(a) - getter(b)) * multiplier)
}

function buildVisibleFacetPayload(items: ProcurementProduct[], total: number, details: any[] = []) {
  const prices = items.map(productPrice).filter(value => Number.isFinite(value) && value > 0)
  const moqs = items.map(item => Number(item.minOrderQuantity)).filter(Number.isFinite)
  const categoryCounts = new Map<string, ProductCategoryFacet>()
  items.forEach((item) => {
    ;[
      [item.topCategoryId, 1],
      [item.secondCategoryId, 2],
      [item.thirdCategoryId, 3]
    ].forEach(([categoryId, level]) => {
      const id = String(categoryId || '')
      if (!id) return
      const key = `${level}:${id}`
      const current = categoryCounts.get(key) || { categoryId: id, level: Number(level), count: 0 }
      current.count = Number(current.count || 0) + 1
      categoryCounts.set(key, current)
    })
  })
  const atMost = (maximum: number) => moqs.filter(value => value <= maximum).length
  const atLeast = (getter: (item: ProcurementProduct) => number, minimum: number) => (
    items.filter(item => {
      const value = getter(item)
      return Number.isFinite(value) && value >= minimum
    }).length
  )
  return {
    summary: {
      totalMatches: total,
      sampleSize: items.length,
      minPrice: prices.length ? Math.min(...prices) : null,
      maxPrice: prices.length ? Math.max(...prices) : null,
      minMoq: moqs.length ? Math.min(...moqs) : null,
      maxMoq: moqs.length ? Math.max(...moqs) : null,
      moqUpTo1: atMost(1),
      moqUpTo5: atMost(5),
      moqUpTo10: atMost(10),
      moqUpTo50: atMost(50),
      onePieceDropshipping: items.filter(item => Boolean(item.isOnePsale)).length,
      dispatch48h: items.filter(is48HourDispatch).length,
      shippingIncluded: items.filter(item => Boolean(item.isShippingIncluded)).length,
      onlineInvoice: items.filter(item => Boolean(item.invoiceInfo?.supportOnlineInvoice)).length,
      tradeScore3: atLeast(item => Number(item.tradeScore), 3),
      tradeScore4: atLeast(item => Number(item.tradeScore), 4),
      tradeScore45: atLeast(item => Number(item.tradeScore), 4.5),
      repurchase20: atLeast(item => Number(normalizePercent(item.repurchaseRate ?? item.sellerDataInfo?.repeatPurchasePercent) || 0), 20)
    },
    categories: [...categoryCounts.values()],
    attributes: buildFallbackAttributeFacets(details),
    meta: {
      source: 'live-results',
      sampleSize: items.length,
      detailSampleSize: details.length,
      totalMatches: total,
      filtersApplied: false
    }
  }
}

function updateResultCategories(items: ProcurementProduct[]) {
  if (!taxonomyCache || selectedCategories.value.length) return
  const resultGroups = buildResultCategoryFilters(taxonomyCache, items, categoryFacets.value)
  categoryGroups.value = mergeCategoryFilterGroups(resultGroups, keywordCategoryGroups.value)
}

function clearIndexPoll() {
  if (indexPollTimer) clearTimeout(indexPollTimer)
  indexPollTimer = undefined
}

function scheduleIndexPoll(delay = 2500) {
  clearIndexPoll()
  if (
    !process.client
    || !keywordDisplay.value
    || backendMode.value !== 'search-api'
    || capabilities.value.indexStatus === 'complete'
    || capabilities.value.indexStatus === 'failed'
  ) return
  const keyword = keywordDisplay.value
  indexPollTimer = setTimeout(() => pollIndexStatus(keyword), delay)
}

async function pollIndexStatus(keyword: string) {
  if (keyword !== keywordDisplay.value) return
  try {
    const response = await getProcurementSearchStatus({
      keyword,
      page: 1,
      pageSize: 1,
      sortBy: 'relevance',
      direction: 'desc',
      filters: {
        ...JSON.parse(JSON.stringify(appliedFilters)),
        categoryIds: selectedCategoryIds.value.length
          ? selectedCategoryIds.value
          : (queryState.value.categoryId ? [queryState.value.categoryId] : [])
      }
    })
    if (keyword !== keywordDisplay.value) return
    const data = response.data?.data || response.data
    capabilities.value = cloneCapabilities(data?.capabilities)
    const receivedFacets = data?.facets
    if (
      receivedFacets?.meta?.source
      || Array.isArray(receivedFacets?.categories) && receivedFacets.categories.length
      || Array.isArray(receivedFacets?.attributes) && receivedFacets.attributes.length
    ) {
      applyFacetPayload(receivedFacets)
      updateResultCategories(productList.value)
    }
    scheduleIndexPoll()
  } catch (error) {
    console.warn('Search index status could not be refreshed', error)
    if (keyword === keywordDisplay.value) scheduleIndexPoll(5000)
  }
}

async function fetchFromSearchApi() {
  const ordering = searchApiSort()
  const response = await searchProcurementProducts({
    keyword: keywordDisplay.value,
    page: current.value,
    pageSize,
    sortBy: ordering.sortBy,
    direction: ordering.direction,
    filters: {
      ...JSON.parse(JSON.stringify(appliedFilters)),
      categoryIds: selectedCategoryIds.value.length
        ? selectedCategoryIds.value
        : (queryState.value.categoryId ? [queryState.value.categoryId] : [])
    }
  })
  const data = response.data?.data || response.data
  if (!Array.isArray(data?.items)) throw new Error('Invalid search API response')
  backendMode.value = 'search-api'
  capabilities.value = cloneCapabilities(data.capabilities)
  applyFacetPayload(data.facets)
  return { items: data.items, total: Number(data.total || 0) }
}

async function fetchFromUpstream() {
  backendMode.value = 'fallback'
  capabilities.value = cloneCapabilities({
    indexStatus: 'building',
    coverage: 0,
    filters: {
      categoryIds: { state: 'native', enabled: true },
      price: { state: 'liveSample', enabled: true, reason: 'Filtering the visible live catalog results' },
      moq: { state: 'liveSample', enabled: true, reason: 'Filtering the visible live catalog results' },
      monthlySales: { state: 'liveSample', enabled: true, reason: 'Filtering the visible live catalog results' },
      fulfillment: { state: 'liveSample', enabled: true, reason: 'Filtering the visible live catalog results' },
      supplierQuality: { state: 'liveSample', enabled: true, reason: 'Filtering the visible live catalog results' },
      productSpecs: { state: 'liveSample', enabled: true, reason: 'Using live product detail attributes' }
    }
  })
  const filtering = hasFallbackFilters(appliedFilters)
  const pages = filtering ? [1, 2, 3] : [current.value]
  const requestPageSize = filtering ? 50 : pageSize
  const categories = selectedCategories.value.length ? selectedCategories.value : [null]
  const payloads = categories.flatMap(category => pages.map(page => ({
    keyword: keywordDisplay.value,
    categoryId: category?.categoryId || queryState.value.categoryId,
    snId: '',
    filter: '',
    sort: sortPayload(),
    beginPage: page,
    pageSize: requestPageSize
  })))
  const responses = await Promise.all(payloads.map(payload => searchKeyword(payload)))
  const searches = responses.map((response, index) => {
    if (String(response.data?.code) === '-1') throw new Error(response.data?.msg || 'Product search failed')
    return { ...extractSearchResponse(response), page: payloads[index].beginPage }
  })
  const unique = new Map<string, ProcurementProduct>()
  searches.forEach(search => search.items.forEach((item: ProcurementProduct) => {
    const key = `${item.offerId}-${item.source || ''}`
    if (!unique.has(key)) unique.set(key, item)
  }))
  const livePool = [...unique.values()]
  const detailLimit = Object.values(appliedFilters.attributes || {}).some(values => values.length)
    ? 24
    : 6
  const details = await loadFallbackDetails(livePool, detailLimit)
  const filtered = sortFallbackProducts(filterFallbackProducts(livePool, appliedFilters, details))
  const offset = filtering ? (current.value - 1) * pageSize : 0
  const items = filtering
    ? filtered.slice(offset, offset + pageSize)
    : filtered.slice(0, pageSize)
  const upstreamTotal = searches
    .filter(search => search.page === pages[0])
    .reduce((sum, search) => sum + search.total, 0)
  const total = filtering ? filtered.length : upstreamTotal
  applyFacetPayload(buildVisibleFacetPayload(livePool, upstreamTotal, details))
  return {
    items,
    total
  }
}

async function fetchProducts(reset = false) {
  const requestId = ++requestSequence
  productError.value = ''
  if (!queryState.value.keyword && !queryState.value.imageId) {
    productList.value = []
    totalNum.value = 0
    loading.value = false
    return
  }
  if (reset) loading.value = true
  try {
    let result: { items: ProcurementProduct[]; total: number }
    if (queryState.value.keyword) {
      try {
        result = await fetchFromSearchApi()
      } catch (searchApiError) {
        console.warn('Search API unavailable, using live catalog', searchApiError)
        result = await fetchFromUpstream()
      }
    } else {
      const response = await searchImg({
        imageId: queryState.value.imageId,
        beginPage: current.value,
        pageSize,
        sort: sortPayload(),
        filter: ''
      })
      result = extractSearchResponse(response)
    }
    if (requestId !== requestSequence) return
    productList.value = normalizeProducts(result.items)
    updateResultCategories(result.items)
    totalNum.value = result.total
    searchImage.value = queryState.value.imageIdList || ''
    scheduleIndexPoll()
  } catch (error: any) {
    if (requestId !== requestSequence) return
    console.error('Failed to fetch products', error)
    productList.value = []
    totalNum.value = 0
    productError.value = error?.message || 'Please try the search again.'
  } finally {
    if (requestId === requestSequence) loading.value = false
  }
}

async function fetchCategories() {
  if (!queryState.value.keyword) {
    categoryGroups.value = []
    return
  }
  try {
    if (!taxonomyCache) {
      const response = await getCategory({})
      taxonomyCache = Array.isArray(response)
        ? response
        : Array.isArray(response.data?.data)
          ? response.data.data
          : []
    }
    keywordCategoryGroups.value = buildProductTaxonomyFilters(
      taxonomyCache || [],
      keywordDisplay.value,
      queryState.value.categoryId
    )
    categoryGroups.value = keywordCategoryGroups.value
  } catch (error) {
    console.warn('Product categories could not be loaded', error)
    categoryGroups.value = []
    keywordCategoryGroups.value = []
  }
}

async function loadRate() {
  try {
    const response = await getRate()
    rate.value = Number(response.data?.data?.exchange_rate || 1)
  } catch {
    rate.value = 1
  }
}

function initActionRegion() {
  Promise.all([getCountry({}), getDefault()])
    .then(([countryResponse, defaultResponse]) => {
      const countries = countryResponse.data?.data?.endCountry || []
      const defaultName = defaultResponse.data?.data?.name_en
      actionRegion.value = countries.find((country: any) => country.zh_cn_nickname === defaultName)?.code_two || ''
    })
    .catch(() => {
      actionRegion.value = ''
    })
}

function addList(item: ProcurementProduct) {
  if (process.client) window.open(`/admin/account/Publish?id=${item.offerId}&source=${item.source}`, '_blank')
}

function addProduct(item: ProcurementProduct) {
  if (!process.client) return
  addShopList({ source: item.source, goodsId: item.offerId, country_code: actionRegion.value })
    .then(() => window.open('/admin/account/ProductList', '_blank'))
}

function chatNows(item: ProcurementProduct) {
  if (!process.client) return
  localStorage.setItem('askProduct', JSON.stringify({ id: item.offerId, source: item.source }))
  chatProduct?.()
}

async function getRelated(offerId: string | number) {
  dataLoading.value = true
  try {
    const response = await getProductRelatedRecommend({ offerId, pageIndex: 1, pageCount: 10, type: 2 })
    relatedList.value = normalizeProducts(response.data?.data || [])
    showRelated.value = true
  } finally {
    dataLoading.value = false
  }
}

function cardSignals(item: ProcurementProduct) {
  return [
    dispatchLabel(item),
    item.invoiceInfo?.supportOnlineInvoice ? 'Invoice' : '',
    item.isShippingIncluded ? 'Shipping included' : ''
  ].filter(Boolean).slice(0, 3)
}

async function bootstrap() {
  loading.value = true
  await Promise.allSettled([loadRate(), fetchCategories()])
  if (queryState.value.keyword) searchImage.value = ''
  await fetchProducts(true)
}

onMounted(() => {
  syncQuery()
  bootstrap()
  initActionRegion()
})

watch(() => route.fullPath, () => {
  clearIndexPoll()
  syncQuery()
  selectedCategories.value = []
  facetSummary.value = {}
  facetMeta.value = {}
  attributeFacets.value = []
  categoryFacets.value = []
  Object.keys(draftFilters).forEach(key => key !== 'categoryIds' && delete (draftFilters as Record<string, unknown>)[key])
  Object.keys(appliedFilters).forEach(key => key !== 'categoryIds' && delete (appliedFilters as Record<string, unknown>)[key])
  draftFilters.categoryIds = []
  appliedFilters.categoryIds = []
  activeMenu.value = ''
  showFilterDetails.value = false
  current.value = 1
  sortKey.value = 'relevance'
  bootstrap()
})

onBeforeUnmount(() => {
  clearIndexPoll()
  if (autoApplyTimer) clearTimeout(autoApplyTimer)
})
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background: #f3f4f6;
  color: #202124;
}

.search-shell {
  width: min(1480px, calc(100% - 40px));
  margin: 0 auto;
  padding: 16px 0 48px;
}

.eyebrow {
  margin: 0 0 4px;
  color: #8c9098;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .12em;
}

.image-search-context,
.filter-console,
.results-surface {
  border: 1px solid #e3e5e8;
  background: #fff;
}

.image-search-context {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px 14px;
}

.image-search-context img {
  width: 56px;
  height: 56px;
  border-radius: 7px;
  object-fit: cover;
}

.filter-console {
  position: relative;
  z-index: 12;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(31, 35, 41, .05);
}

.filter-topline {
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 14px;
}

.filter-buttons {
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  gap: 7px;
}

.filter-menu-wrap {
  position: relative;
}

.filter-trigger {
  display: inline-flex;
  height: 35px;
  align-items: center;
  gap: 7px;
  border: 1px solid #d9dce1;
  border-radius: 7px;
  background: #fff;
  padding: 0 11px;
  color: #34373d;
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
}

.filter-trigger:hover:not(:disabled),
.filter-trigger.active {
  border-color: #ff7a2e;
  background: #fff8f3;
  color: #9b3c08;
}

.filter-trigger.selected {
  border-color: #ffc49d;
  background: #fff8f3;
}

.filter-trigger:disabled {
  cursor: not-allowed;
  border-style: dashed;
  background: #fafafa;
  color: #9da1a8;
}

.all-filter-trigger {
  background: #2b2d31;
  color: #fff;
}

.all-filter-trigger:hover {
  border-color: #2b2d31 !important;
  background: #111 !important;
  color: #fff !important;
}

.trigger-count {
  display: inline-flex;
  min-width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
  background: #ff6e1f;
  color: #fff;
  font-size: 10px;
}

.selected-dot,
.preparing-dot,
.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff6e1f;
}

.preparing-dot {
  background: #c8cbd0;
}

.live-dot {
  background: #2f9d68;
}

.chevron {
  color: #888d95;
  font-size: 12px;
}

.filter-popover {
  position: absolute;
  z-index: 30;
  top: calc(100% + 8px);
  left: 0;
  width: 300px;
  max-height: 420px;
  overflow: auto;
  border: 1px solid #dfe2e6;
  border-radius: 10px;
  background: #fff;
  padding: 14px;
  box-shadow: 0 18px 50px rgba(28, 32, 38, .16);
}

.category-popover {
  width: min(690px, calc(100vw - 56px));
}

.popover-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #eceef0;
  padding-bottom: 10px;
}

.popover-heading strong {
  font-size: 13px;
}

.popover-heading > span,
.popover-heading button {
  color: #858a92;
  font-size: 11px;
}

.heading-actions {
  display: flex;
  align-items: center;
  gap: 9px;
}

.data-badge {
  border: 1px solid #c9e5d5;
  border-radius: 5px;
  background: #f4fbf7;
  padding: 3px 6px;
  color: #25774f;
  font-size: 9px;
  font-weight: 750;
}

.facet-summary {
  margin: -3px 0 10px;
  color: #727780;
  font-size: 11px;
  line-height: 1.45;
}

.category-groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.category-group > p,
.attribute-group > p {
  margin: 0 0 8px;
  color: #656a72;
  font-size: 11px;
  font-weight: 750;
  text-transform: uppercase;
}

.check-option,
.radio-option {
  display: flex;
  min-height: 31px;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #3d4148;
  font-size: 12px;
}

.check-option input,
.radio-option input {
  position: absolute;
  opacity: 0;
}

.custom-check,
.radio-option::before {
  display: inline-flex;
  width: 17px;
  height: 17px;
  flex: 0 0 17px;
  align-items: center;
  justify-content: center;
  border: 1px solid #cbd0d6;
  border-radius: 4px;
  color: transparent;
  font-size: 10px;
}

.check-option input:checked + .custom-check {
  border-color: #ff6e1f;
  background: #ff6e1f;
  color: #fff;
}

.radio-option::before {
  content: '';
  border-radius: 50%;
}

.radio-option:has(input:checked)::before {
  border: 5px solid #ff6e1f;
}

.check-option:has(input:disabled),
.radio-option:has(input:disabled) {
  cursor: not-allowed;
  opacity: .48;
}

.check-option small {
  color: #a0a4aa;
}

.check-option > small,
.radio-option > small {
  margin-left: auto;
}

.range-inputs {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 8px;
}

.range-inputs label,
.field-label {
  color: #737880;
  font-size: 11px;
}

.range-inputs input,
.suffix-input input {
  width: 100%;
  height: 36px;
  margin-top: 5px;
  border: 1px solid #d8dce1;
  border-radius: 6px;
  padding: 0 9px;
  color: #282b30;
}

.suffix-input {
  position: relative;
}

.suffix-input span {
  position: absolute;
  right: 10px;
  bottom: 9px;
}

.popover-apply {
  width: 100%;
  height: 35px;
  margin-top: 12px;
  border-radius: 6px;
  background: #2b2d31;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.popover-note {
  margin: 0;
  color: #777c84;
  font-size: 12px;
  line-height: 1.5;
}

.attribute-group + .attribute-group {
  margin-top: 14px;
}

.index-status {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  color: #6d727a;
}

.index-status > span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f3ad33;
  box-shadow: 0 0 0 4px #fff4de;
}

.index-status.complete > span {
  background: #2f9d68;
  box-shadow: 0 0 0 4px #e7f6ee;
}

.index-status.live-ready > span {
  background: #2f9d68;
  box-shadow: 0 0 0 4px #e7f6ee;
}

.index-status div {
  display: grid;
}

.index-status strong {
  font-size: 11px;
}

.index-status small {
  font-size: 9px;
}

.selected-row {
  display: flex;
  min-height: 43px;
  align-items: center;
  gap: 7px;
  overflow-x: auto;
  border-top: 1px solid #eceef0;
  background: #fafafa;
  padding: 7px 14px;
}

.selected-label,
.empty-selection {
  color: #7c8189;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.selected-chip {
  display: inline-flex;
  height: 27px;
  flex: 0 0 auto;
  align-items: center;
  gap: 6px;
  border: 1px solid #ffcba9;
  border-radius: 6px;
  background: #fff;
  padding: 0 8px;
  color: #873a0d;
  font-size: 11px;
}

.selected-chip span {
  font-size: 15px;
}

.clear-all {
  flex: 0 0 auto;
  margin-left: 2px;
  color: #666b73;
  font-size: 11px;
  text-decoration: underline;
}

.empty-selection {
  justify-content: space-between;
}

.empty-selection span:last-child {
  color: #a3a7ad;
  font-weight: 500;
  text-transform: none;
}

.capability-panel {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 24px;
  border-top: 1px solid #e7e9ec;
  padding: 16px 18px;
}

.capability-panel p:last-child {
  margin: 5px 0 0;
  color: #858a92;
  font-size: 11px;
}

.capability-list {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 8px;
}

.capability-list span {
  display: inline-flex;
  height: 28px;
  align-items: center;
  gap: 6px;
  border: 1px dashed #cfd3d8;
  border-radius: 6px;
  padding: 0 9px;
  color: #8a8f96;
  font-size: 11px;
}

.capability-list span.ready {
  border-style: solid;
  border-color: #b9dfca;
  background: #f4fbf7;
  color: #25774f;
}

.capability-list i {
  font-style: normal;
  font-weight: 800;
}

.results-surface {
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.procurement-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e4e6e9;
  border-radius: 9px;
  background: #fff;
  transition: border-color .16s ease, box-shadow .16s ease, transform .16s ease;
}

.procurement-card:hover {
  z-index: 2;
  border-color: #ffc6a2;
  box-shadow: 0 10px 28px rgba(36, 39, 44, .1);
  transform: translateY(-2px);
}

.product-media {
  position: relative;
  aspect-ratio: 1 / .86;
  overflow: hidden;
  background: #f1f2f3;
}

.product-media a,
.product-media img {
  display: block;
  width: 100%;
  height: 100%;
}

.product-media img {
  object-fit: cover;
}

.media-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  border-radius: 4px;
  background: rgba(29, 32, 36, .86);
  padding: 4px 6px;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
}

.media-actions {
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: flex;
  gap: 5px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity .16s ease, transform .16s ease;
}

.procurement-card:hover .media-actions {
  opacity: 1;
  transform: translateY(0);
}

.media-actions button {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 6px;
  background: rgba(25, 27, 31, .9);
  color: #fff;
  font-size: 18px;
}

.media-actions svg {
  width: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
}

.card-body {
  padding: 10px;
}

.product-title {
  display: -webkit-box;
  min-height: 36px;
  overflow: hidden;
  color: #292c31;
  font-size: 12px;
  font-weight: 550;
  line-height: 18px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-title:hover {
  color: #e95d13;
}

.price-line {
  display: flex;
  min-height: 38px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.price-line div {
  display: flex;
  align-items: baseline;
  color: #f0442e;
}

.price-line small {
  margin-right: 3px;
  font-size: 9px;
  font-weight: 700;
}

.price-line strong {
  font-size: 18px;
  letter-spacing: -.03em;
}

.price-line span {
  margin-left: 3px;
  color: #9a9ea5;
  font-size: 9px;
}

.price-line img {
  width: 22px;
  height: 22px;
}

.purchase-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  overflow: hidden;
  border-radius: 5px;
  background: #e8eaed;
}

.purchase-facts span {
  display: grid;
  gap: 1px;
  background: #f6f7f8;
  padding: 6px 7px;
}

.purchase-facts small {
  color: #90949b;
  font-size: 8px;
  text-transform: uppercase;
}

.purchase-facts strong {
  color: #36393f;
  font-size: 10px;
}

.signal-row {
  display: flex;
  min-height: 26px;
  align-items: center;
  gap: 4px;
  overflow: hidden;
}

.signal-row span {
  flex: 0 0 auto;
  border-radius: 4px;
  background: #fff2e8;
  padding: 3px 5px;
  color: #a84915;
  font-size: 8px;
  font-weight: 650;
}

.supplier-line {
  display: flex;
  min-height: 27px;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  border-top: 1px solid #eef0f2;
  color: #7d828a;
  font-size: 8px;
  white-space: nowrap;
}

.supplier-line span + span::before {
  content: '•';
  margin-right: 8px;
  color: #c5c8cc;
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.card-actions button {
  height: 31px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
}

.secondary-action {
  border: 1px solid #d7dadd;
  background: #fff;
  color: #3b3e44;
}

.primary-action {
  background: #2c2e32;
  color: #fff;
}

.primary-action:hover {
  background: #ff6e1f;
}

.skeleton-card {
  height: 380px;
  border: 1px solid #eceef0;
  border-radius: 9px;
  padding: 10px;
}

.skeleton-card span,
.skeleton-card i {
  display: block;
  border-radius: 5px;
  background: linear-gradient(100deg, #eceef0 25%, #f8f8f8 38%, #eceef0 60%);
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite;
}

.skeleton-card span {
  height: 205px;
  margin: -10px -10px 12px;
}

.skeleton-card i {
  height: 13px;
  margin-bottom: 9px;
}

.skeleton-card i:nth-child(3) {
  width: 70%;
}

.skeleton-card i:last-child {
  height: 60px;
  margin-top: 14px;
}

@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}

.state-card {
  display: grid;
  min-height: 280px;
  place-content: center;
  justify-items: center;
  text-align: center;
}

.state-card strong {
  font-size: 18px;
}

.state-card p {
  margin: 8px 0 16px;
  color: #7d828a;
  font-size: 12px;
}

.state-card button {
  height: 36px;
  border-radius: 6px;
  background: #2c2e32;
  padding: 0 16px;
  color: #fff;
  font-size: 12px;
}

.error-state strong {
  color: #a6372c;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  padding: 24px 0 10px;
}

.modal-mask {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(22, 24, 28, .52);
  padding: 24px;
}

.related-modal {
  width: min(1160px, 96vw);
  max-height: 90vh;
  overflow: auto;
  border-radius: 12px;
  background: #fff;
  padding: 20px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
}

.icon-button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f1f2f3;
  font-size: 22px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.mini-card {
  border: 1px solid #e5e7e9;
  border-radius: 8px;
  padding: 8px;
}

.mini-card img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 5px;
  object-fit: cover;
}

.mini-card p {
  display: -webkit-box;
  min-height: 34px;
  margin: 8px 0;
  overflow: hidden;
  font-size: 11px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.mini-card strong {
  color: #f0442e;
  font-size: 13px;
}

.mini-card button {
  float: right;
  color: #e75d17;
  font-size: 10px;
}

.page-spinner {
  position: fixed;
  z-index: 110;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, .66);
}

.page-spinner span {
  width: 42px;
  height: 42px;
  border: 4px solid #eceef0;
  border-top-color: #ff6e1f;
  border-radius: 50%;
  animation: spin .8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1180px) {
  .product-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (max-width: 900px) {
  .search-shell { width: min(100% - 24px, 1480px); }
  .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .index-status { display: none; }
  .capability-panel { grid-template-columns: 1fr; }
  .related-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (max-width: 680px) {
  .search-shell { width: 100%; padding-top: 8px; }
  .filter-console,
  .results-surface { border-right: 0; border-left: 0; border-radius: 0; }
  .filter-topline { padding: 8px 10px; }
  .filter-buttons { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 2px; }
  .filter-popover { position: fixed; top: auto; right: 10px; bottom: 12px; left: 10px; width: auto; max-height: 65vh; }
  .category-popover { width: auto; }
  .category-groups { grid-template-columns: 1fr; }
  .empty-selection span:last-child { display: none; }
  .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
  .results-surface { padding: 7px; }
  .product-media { aspect-ratio: 1; }
  .purchase-facts { grid-template-columns: 1fr; }
  .purchase-facts span:last-child { display: none; }
  .supplier-line { display: none; }
  .card-actions { grid-template-columns: 1fr; }
  .secondary-action { display: none; }
  .related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
