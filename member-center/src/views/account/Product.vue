<template>
  <main class="library-page">
    <header class="page-header">
      <div>
        <span class="eyebrow">{{ $t('products.eyebrow') }}</span>
        <h1>{{ $t('products.title') }}</h1>
        <p>{{ $t('products.subtitle') }}</p>
      </div>
      <a href="/productList" class="button button-primary">
        <i class="el-icon-search" aria-hidden="true"></i>
        {{ $t('products.find') }}
      </a>
    </header>

    <section class="summary-strip" aria-label="Product summary">
      <div><span>{{ $t('products.cod') }}</span><strong>{{ total }}</strong></div>
      <div><span>{{ $t('products.drafts') }}</span><strong>{{ drafts.length }}</strong></div>
      <div><span>{{ $t('products.listed') }}</span><strong>{{ countValue('count_2') }}</strong></div>
      <div><span>{{ $t('products.delisted') }}</span><strong>{{ countValue('count_3') }}</strong></div>
    </section>

    <nav class="library-tabs" :aria-label="$t('products.views')">
      <button v-for="tab in tabs" :key="tab.key" :class="{ active: activeTab === tab.key }" @click="changeTab(tab.key)">
        {{ tab.label }} <span>{{ tab.count }}</span>
      </button>
    </nav>

    <section v-if="activeTab === 'drafts'" class="content-panel">
      <div v-if="draftLoading" class="skeleton-list" aria-live="polite">
        <div v-for="index in 3" :key="index" class="skeleton-row"><span></span><div><i></i><i></i></div></div>
      </div>
      <div v-else-if="draftError" class="state-panel error-state">
        <i class="el-icon-warning-outline" aria-hidden="true"></i>
        <h2>{{ $t('products.errorTitle') }}</h2><p>{{ draftError }}</p>
        <button class="button button-secondary" @click="loadDrafts">{{ $t('common.retry') }}</button>
      </div>
      <div v-else-if="!drafts.length" class="state-panel">
        <div class="state-icon"><i class="el-icon-edit-outline" aria-hidden="true"></i></div>
        <h2>{{ $t('products.emptyTitle') }}</h2><p>{{ $t('products.emptyCopy') }}</p>
        <a href="/productList" class="text-action">{{ $t('products.browse') }} <i class="el-icon-right"></i></a>
      </div>
      <div v-else class="draft-list">
        <article v-for="draft in drafts" :key="draft.id" class="draft-card">
          <img v-if="draftImage(draft) && !imageErrors[draft.id]" :src="draftImage(draft)" :alt="draft.merchantContent.title || draft.sourceSnapshot.title" @error="markImageError(draft.id)" />
          <div v-else class="image-fallback" aria-hidden="true">Co</div>
          <div class="product-copy">
            <span class="source-label">{{ draft.mode === 'ai' ? $t('products.aiMode') : $t('products.manualMode') }}</span>
            <h2>{{ draft.merchantContent.title || draft.sourceSnapshot.title }}</h2>
            <p>{{ languageName(draft.targetLanguage) }} · {{ $t('common.updated', { value: formatDate(draft.updatedAt) }) }}</p>
          </div>
          <div class="draft-status"><span class="status success">{{ statusName(draft.status) }}</span><small>{{ $t('common.revision', { value: draft.revision }) }}</small></div>
          <router-link class="button button-secondary" :to="{ path: '/account/Publish', query: { draft: draft.id, mode: draft.mode, language: draft.targetLanguage } }">{{ $t('products.continue') }}</router-link>
        </article>
      </div>
    </section>

    <section v-else class="content-panel product-workspace">
      <form class="filter-bar" @submit.prevent="searchProducts(1)">
        <label class="search-field">
          <span>{{ $t('products.productName') }}</span>
          <div><i class="el-icon-search" aria-hidden="true"></i><input v-model.trim="filters.subject" type="search" :placeholder="$t('products.searchPlaceholder')" /></div>
        </label>
        <label><span>{{ $t('products.source') }}</span><select v-model="filters.source"><option :value="null">{{ $t('products.all') }}</option><option value="1">1688</option></select></label>
        <label><span>{{ $t('products.publishStatus') }}</span><select v-model="filters.push_status"><option :value="null">{{ $t('products.all') }}</option><option value="1">{{ $t('products.pushed') }}</option><option value="2">{{ $t('products.notPushed') }}</option><option value="3">{{ $t('products.pushing') }}</option></select></label>
        <label><span>{{ $t('products.inventoryStatus') }}</span><select v-model="filters.inventory_addition_status"><option :value="null">{{ $t('products.all') }}</option><option value="1">{{ $t('products.added') }}</option><option value="2">{{ $t('products.unadded') }}</option></select></label>
        <div class="filter-actions"><button type="submit" class="button button-dark">{{ $t('common.search') }}</button><button type="button" class="button button-quiet" @click="resetFilters">{{ $t('products.reset') }}</button></div>
      </form>

      <div v-if="selected.length" class="selection-bar" aria-live="polite">
        <div><strong>{{ $t('products.selected', { value: selected.length }) }}</strong><span>{{ $t('products.bulkTip') }}</span></div>
        <div class="selection-actions">
          <button class="button button-primary" @click="startListing"><i class="el-icon-magic-stick"></i>{{ $t('products.aiList') }}</button>
          <button class="button button-secondary" :disabled="actionLoading" @click="refreshSelected"><i class="el-icon-refresh"></i>{{ $t('products.refreshProduct') }}</button>
          <button class="button button-danger-quiet" @click="requestDelete(selected)"><i class="el-icon-delete"></i>{{ $t('products.delete') }}</button>
        </div>
      </div>

      <div class="list-heading">
        <div><h2>{{ activeListTitle }}</h2><p>{{ $t('products.realDataNote') }}</p></div>
        <label v-if="products.length" class="select-all"><input type="checkbox" :checked="allSelected" @change="toggleAll" /> {{ $t('products.selectPage') }}</label>
      </div>

      <div v-if="productLoading" class="skeleton-list" aria-live="polite">
        <div v-for="index in 4" :key="index" class="skeleton-row"><span></span><div><i></i><i></i></div></div>
      </div>
      <div v-else-if="productError" class="state-panel error-state">
        <i class="el-icon-warning-outline" aria-hidden="true"></i><h2>{{ $t('products.listErrorTitle') }}</h2><p>{{ productError }}</p>
        <button class="button button-secondary" @click="searchProducts(filters.pageIndex)">{{ $t('common.retry') }}</button>
      </div>
      <div v-else-if="!products.length" class="state-panel">
        <div class="state-icon"><i class="el-icon-box" aria-hidden="true"></i></div><h2>{{ $t('products.noProductsTitle') }}</h2><p>{{ $t('products.noProductsCopy') }}</p>
        <a href="/productList" class="text-action">{{ $t('products.browse') }} <i class="el-icon-right"></i></a>
      </div>
      <div v-else class="product-list">
        <article v-for="product in products" :key="product.id" class="product-row">
          <label class="row-check"><input v-model="selected" type="checkbox" :value="product" /><span class="sr-only">{{ $t('products.selectProduct', { value: product.subject }) }}</span></label>
          <div class="product-image-wrap">
            <img v-if="product.image && !imageErrors['product-' + product.id]" :src="product.image" :alt="product.subject" @error="markImageError('product-' + product.id)" />
            <div v-else class="image-fallback" aria-hidden="true">Co</div>
          </div>
          <div class="product-copy">
            <div class="row-labels"><span class="source-label">{{ product.source == 1 ? '1688' : $t('products.source') }}</span><span :class="['status', pushStatusClass(product.push_status)]">{{ pushStatus(product.push_status) }}</span></div>
            <a :href="`/productDetail?id=${product.goods_id}&source=${product.source}`" target="_blank" rel="noopener"><h3>{{ product.subject }}</h3></a>
            <p>{{ $t('products.productId', { value: product.goods_id || product.id }) }}<template v-if="product.store_list && product.store_list.length"> · {{ product.store_list[0].store_name }}</template></p>
          </div>
          <div class="row-metric"><span>{{ $t('products.costPrice') }}</span><strong>US ${{ product.min_usd }}<template v-if="product.max_usd != product.min_usd"> ~ {{ product.max_usd }}</template></strong></div>
          <div class="row-metric"><span>{{ $t('products.inventoryStatus') }}</span><strong :class="['status', product.inventory_addition_status == 1 ? 'success' : 'neutral']">{{ inventoryStatus(product.inventory_addition_status) }}</strong></div>
          <div class="row-actions">
            <button class="button button-primary" @click="startSingleListing(product)"><i class="el-icon-magic-stick"></i>{{ $t('products.aiList') }}</button>
            <button class="icon-button" :aria-label="$t('products.deleteProduct')" @click="requestDelete([product])"><i class="el-icon-delete"></i></button>
          </div>
        </article>
      </div>

      <footer v-if="products.length" class="pagination-bar">
        <span>{{ $t('products.totalProducts', { value: productTotal }) }}</span>
        <div><button class="icon-button" :disabled="filters.pageIndex <= 1" @click="searchProducts(filters.pageIndex - 1)"><i class="el-icon-arrow-left"></i></button><strong>{{ filters.pageIndex }}</strong><button class="icon-button" :disabled="filters.pageIndex * 50 >= productTotal" @click="searchProducts(filters.pageIndex + 1)"><i class="el-icon-arrow-right"></i></button></div>
      </footer>
    </section>

    <div v-if="storeDialog" class="modal-shell" role="dialog" aria-modal="true" :aria-label="$t('products.connectTitle')" @click.self="storeDialog = false">
      <section class="modal-card small"><button class="modal-close" @click="storeDialog = false"><i class="el-icon-close"></i></button><div class="modal-icon"><i class="el-icon-link"></i></div><h2>{{ $t('products.connectTitle') }}</h2><p>{{ $t('products.connectCopy') }}</p><div class="modal-actions"><button class="button button-quiet" @click="storeDialog = false">{{ $t('common.cancel') }}</button><button class="button button-primary" @click="toLink">{{ $t('products.connectStore') }}</button></div></section>
    </div>

    <div v-if="deleteDialog" class="modal-shell" role="dialog" aria-modal="true" :aria-label="$t('products.deleteTitle')" @click.self="closeDelete">
      <section class="modal-card small"><button class="modal-close" @click="closeDelete"><i class="el-icon-close"></i></button><div class="modal-icon danger"><i class="el-icon-delete"></i></div><h2>{{ $t('products.deleteTitle') }}</h2><p>{{ $t('products.deleteCopy', { value: pendingDelete.length }) }}</p><div class="modal-actions"><button class="button button-quiet" @click="closeDelete">{{ $t('common.cancel') }}</button><button class="button button-danger" :disabled="actionLoading" @click="confirmDelete">{{ $t('products.confirmDelete') }}</button></div></section>
    </div>

    <div v-if="batchModal" class="modal-shell" role="dialog" aria-modal="true" :aria-label="$t('products.batchTitle')" @click.self="batchModal = false">
      <section class="modal-card"><button class="modal-close" @click="batchModal = false"><i class="el-icon-close"></i></button><span class="eyebrow">{{ $t('products.batchEyebrow') }}</span><h2>{{ $t('products.batchTitle') }}</h2><p>{{ $t('products.batchCopy', { value: selected.length }) }}</p>
        <div class="modal-form">
          <label><span>{{ $t('products.salesChannel') }}</span><select v-model="batchForm.store_id"><option disabled value="">{{ $t('products.selectStore') }}</option><option v-for="store in linkList" :key="store.id" :value="store.id" :disabled="store.is_authorize == '2'">{{ store.store_name }}</option></select></label>
          <div class="form-grid"><label><span>{{ $t('products.priceRule') }}</span><select v-model="batchForm.markup_type"><option value="1">{{ $t('products.addition') }}</option><option value="2">{{ $t('products.multiplication') }}</option></select></label><label><span>{{ $t('products.priceValue') }}</span><input v-model.number="batchForm.markup_value" type="number" min="0" placeholder="0" /></label></div>
          <div class="form-grid"><label><span>{{ $t('products.origin') }}</span><input value="China" disabled /></label><label><span>{{ $t('products.sellingArea') }}</span><select v-model="batchForm.country"><option v-for="country in destinationList" :key="country.code_two" :value="country.code_two">{{ country.en_nickname }}</option></select></label></div>
          <p class="form-note">{{ $t('products.priceRuleNote') }}</p>
        </div>
        <div class="modal-actions"><button class="button button-quiet" @click="batchModal = false">{{ $t('common.cancel') }}</button><button class="button button-primary" :disabled="actionLoading || !batchForm.store_id" @click="batchPublish">{{ $t('products.confirmBatch') }}</button></div>
      </section>
    </div>
  </main>
</template>

<script>
import { getGoods, getNewGoods, deleteGoods, getRate, batchPushToShop } from '@/api/dropshipping'
import { getListingDrafts } from '@/api/listing'
import { storeList } from '@/api/user'
import { shipFromTo } from '@/api/shippingCost'
import { contentLanguages, getContentLanguage } from '@/utils/contentLanguage'

export default {
  data() {
    return {
      activeTab: 'products', drafts: [], products: [], selected: [], pendingDelete: [],
      draftLoading: true, productLoading: true, actionLoading: false, draftError: '', productError: '',
      count: [{}], total: 0, productTotal: 0, rate: 1, imageErrors: {},
      filters: { subject: this.$route.query.q || '', source: null, push_status: null, inventory_addition_status: null, pageIndex: 1 },
      linkList: [], destinationList: [], storeDialog: false, deleteDialog: false, batchModal: false,
      batchForm: { store_id: '', markup_type: '1', markup_value: '', country: 'US', source: 1, goods_info_id: [] },
    }
  },
  computed: {
    tabs() { return [{ key: 'products', label: this.$t('products.cod'), count: this.total }, { key: 'drafts', label: this.$t('products.drafts'), count: this.drafts.length }, { key: 'listed', label: this.$t('products.listed'), count: this.countValue('count_2') }, { key: 'delisted', label: this.$t('products.delisted'), count: this.countValue('count_3') }] },
    allSelected() { return this.products.length > 0 && this.products.every((item) => this.selected.some((selected) => selected.id === item.id)) },
    activeListTitle() { return this.activeTab === 'listed' ? this.$t('products.listedProducts') : this.activeTab === 'delisted' ? this.$t('products.delistedProducts') : this.$t('products.allProducts') },
  },
  created() { this.$emit('menu', 'Product') },
  mounted() { this.loadDrafts(); this.bootstrapProducts() },
  watch: { '$route.query.q'(value) { if (value !== undefined && value !== this.filters.subject) { this.filters.subject = value || ''; this.activeTab = 'products'; this.searchProducts(1) } } },
  methods: {
    async bootstrapProducts() {
      const results = await Promise.allSettled([getRate(), storeList(), shipFromTo()])
      if (results[0].status === 'fulfilled') this.rate = Number(results[0].value.data.exchange_rate) || 1
      if (results[1].status === 'fulfilled') this.linkList = results[1].value.data.list || []
      if (results[2].status === 'fulfilled') this.destinationList = results[2].value.data.endCountry || []
      this.searchProducts(1)
    },
    async loadDrafts() { this.draftLoading = true; this.draftError = ''; try { const response = await getListingDrafts(); this.drafts = response.data || [] } catch (error) { this.draftError = error.message || this.$t('products.errorFallback') } finally { this.draftLoading = false } },
    changeTab(tab) { this.activeTab = tab; this.selected = []; if (tab !== 'drafts') this.searchProducts(1) },
    async searchProducts(page = 1) {
      this.productLoading = true; this.productError = ''; this.filters.pageIndex = page
      const payload = { ...this.filters }
      if (this.activeTab === 'listed') payload.listing_status = 2
      if (this.activeTab === 'delisted') payload.listing_status = 3
      try {
        const response = await getGoods(JSON.stringify(payload)); const data = response.data || {}
        this.count = data.count || this.count; if (this.activeTab === 'products') this.total = Number(data.total || 0); this.productTotal = Number(data.total || 0)
        this.products = (data.list || []).map((item) => ({ ...item, min_usd: item.currency == '1' ? this.divide(item.min_price, this.rate) : item.min_price, max_usd: item.currency == '1' ? this.divide(item.max_price, this.rate) : item.max_price }))
        this.selected = []
      } catch (error) { this.products = []; this.productError = error.message || this.$t('products.listErrorFallback') }
      finally { this.productLoading = false }
    },
    resetFilters() { this.filters = { subject: '', source: null, push_status: null, inventory_addition_status: null, pageIndex: 1 }; this.searchProducts(1) },
    toggleAll(event) { this.selected = event.target.checked ? [...this.products] : [] },
    startListing() {
      if (!this.selected.length) return
      if (!this.linkList.length) { this.storeDialog = true; return }
      if (this.selected.length === 1) { this.startSingleListing(this.selected[0]); return }
      this.batchForm.goods_info_id = this.selected.map((item) => item.id); this.batchModal = true
    },
    startSingleListing(product) { this.$router.push({ path: '/account/Publish', query: { id: product.id, type: 1, source: product.source, mode: 'ai', language: getContentLanguage() } }) },
    async refreshSelected() { if (!this.selected.length) return; this.actionLoading = true; try { await getNewGoods({ ids: this.selected.map((item) => item.id) }); this.$message({ message: this.$t('products.refreshSuccess'), type: 'success', offset: 70 }); await this.searchProducts(1) } catch (error) { this.$message({ message: error.message || this.$t('products.actionError'), type: 'error', offset: 70 }) } finally { this.actionLoading = false } },
    requestDelete(items) { this.pendingDelete = [...items]; this.deleteDialog = true },
    closeDelete() { this.deleteDialog = false; this.pendingDelete = [] },
    async confirmDelete() { this.actionLoading = true; try { await deleteGoods({ ids: this.pendingDelete.map((item) => item.id) }); this.closeDelete(); this.$message({ message: this.$t('products.deleteSuccess'), type: 'success', offset: 70 }); await this.searchProducts(1) } catch (error) { this.$message({ message: error.message || this.$t('products.actionError'), type: 'error', offset: 70 }) } finally { this.actionLoading = false } },
    async batchPublish() { this.actionLoading = true; try { const response = await batchPushToShop(this.batchForm); this.$message({ message: this.$t('products.batchResult', { success: response.data.success, fail: response.data.fail }), type: response.data.fail ? 'warning' : 'success', offset: 70 }); this.batchModal = false; await this.searchProducts(1) } catch (error) { this.$message({ message: error.message || this.$t('products.actionError'), type: 'error', offset: 70 }) } finally { this.actionLoading = false } },
    toLink() { this.$router.push('/account/Shopify') },
    countValue(key) { return Number(this.count && this.count[0] && this.count[0][key] || 0) },
    pushStatus(value) { return ['', this.$t('products.pushed'), this.$t('products.notPushed'), this.$t('products.pushing')][Number(value)] || this.$t('products.unknown') },
    pushStatusClass(value) { return Number(value) === 1 ? 'success' : Number(value) === 3 ? 'warning' : 'neutral' },
    inventoryStatus(value) { return Number(value) === 1 ? this.$t('products.added') : this.$t('products.unadded') },
    divide(a, b) { const result = Number(a) / Number(b || 1); return Math.max(0.01, Math.round(result * 100) / 100) },
    draftImage(draft) { return (draft.sourceSnapshot && draft.sourceSnapshot.images && draft.sourceSnapshot.images[0]) || (draft.merchantContent && draft.merchantContent.images && draft.merchantContent.images.find((item) => item.selected !== false) || {}).url || '' },
    markImageError(id) { this.$set(this.imageErrors, id, true) },
    languageName(value) { const language = contentLanguages.find((item) => item.value === value); return language ? language.label : 'English' },
    statusName(value) { return ({ draft: this.$t('common.draft'), ai_processing: this.$t('common.aiProcessing'), ai_ready: this.$t('common.aiReady'), ready: this.$t('common.ready'), publishing: this.$t('common.publishing'), published: this.$t('common.published') })[value] || this.$t('common.draft') },
    formatDate(value) { return value ? new Intl.DateTimeFormat(this.$workspaceLocale.locale || 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value)) : '' },
  },
}
</script>

<style scoped>
.library-page{min-height:100%;padding:32px;background:#f5f6f3;color:#202720;font-size:16px}.page-header,.summary-strip,.library-tabs,.content-panel{max-width:1440px;margin-left:auto;margin-right:auto}.page-header{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:24px}.page-header h1{margin:5px 0 7px;font-size:34px;line-height:1.16;letter-spacing:-.03em}.page-header p{margin:0;color:#687168;line-height:1.55}.eyebrow,.source-label{color:#ad461e;font-size:13px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}.button{min-height:42px;padding:0 16px;border:1px solid transparent;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#fff;color:#29312b;font:inherit;font-weight:750;cursor:pointer;white-space:nowrap;transition:background-color .16s,border-color .16s,transform .16s}.button:disabled,.icon-button:disabled{opacity:.45;cursor:not-allowed}.button-primary{background:#ea5a1b;color:#fff}.button-primary:hover{background:#d94e13}.button-dark{background:#222b24;color:#fff}.button-secondary{border-color:#cbd2cb}.button-secondary:hover,.button-quiet:hover{background:#f0f2ee}.button-quiet{border-color:transparent;background:transparent}.button-danger{background:#b33b31;color:#fff}.button-danger-quiet{border-color:#e2c3bf;color:#9d382f}.summary-strip{display:grid;grid-template-columns:repeat(4,1fr);margin-bottom:4px;border:1px solid #dce1da;border-radius:12px;background:#fff}.summary-strip div{padding:16px 20px;border-right:1px solid #e5e8e3}.summary-strip div:last-child{border-right:0}.summary-strip span{display:block;color:#727a72;font-size:13px}.summary-strip strong{display:block;margin-top:4px;font-size:23px}.library-tabs{display:flex;gap:4px;margin-top:16px;border-bottom:1px solid #d8ddd7;overflow-x:auto}.library-tabs button{min-height:50px;padding:0 18px;border:0;border-bottom:3px solid transparent;background:transparent;color:#626c64;font:inherit;font-weight:750;cursor:pointer;white-space:nowrap}.library-tabs button.active{border-color:#ea5a1b;color:#202720}.library-tabs span{margin-left:6px;color:#8a928b}.content-panel{margin-top:18px}.product-workspace{border:1px solid #dce1da;border-radius:12px;background:#fff;overflow:hidden}.filter-bar{display:grid;grid-template-columns:minmax(260px,1.6fr) repeat(3,minmax(150px,1fr)) auto;gap:12px;padding:18px;border-bottom:1px solid #e3e7e1;background:#fafbf9}.filter-bar label>span,.modal-form label>span{display:block;margin-bottom:7px;color:#59625a;font-size:13px;font-weight:700}.filter-bar input,.filter-bar select,.modal-form input,.modal-form select{width:100%;height:42px;padding:0 12px;border:1px solid #cfd6cf;border-radius:8px;background:#fff;color:#252c27;font:inherit;outline:none}.filter-bar input:focus,.filter-bar select:focus,.modal-form input:focus,.modal-form select:focus{border-color:#ea5a1b;box-shadow:0 0 0 3px rgba(234,90,27,.12)}.search-field>div{position:relative}.search-field i{position:absolute;left:13px;top:13px;color:#7d867e}.search-field input{padding-left:38px}.filter-actions{display:flex;align-items:flex-end;gap:5px}.selection-bar{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:14px 18px;border-bottom:1px solid #e7d1c8;background:#fff5f0}.selection-bar strong,.selection-bar span{display:block}.selection-bar span{margin-top:2px;color:#786c66;font-size:13px}.selection-actions{display:flex;gap:8px;flex-wrap:wrap}.list-heading{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:20px 22px 14px}.list-heading h2{margin:0;font-size:21px}.list-heading p{margin:4px 0 0;color:#747d75;font-size:14px}.select-all{font-size:14px;font-weight:700}.select-all input,.row-check input{width:18px;height:18px;accent-color:#ea5a1b}.product-list,.draft-list{display:grid;gap:0}.product-row{display:grid;grid-template-columns:26px 86px minmax(300px,1.6fr) minmax(135px,.65fr) minmax(130px,.55fr) auto;align-items:center;gap:16px;padding:16px 22px;border-top:1px solid #e6e9e4}.product-row:hover{background:#fafbf9}.product-image-wrap,.draft-card>img,.image-fallback{width:86px;height:86px;border-radius:9px;background:#eef1ed}.product-image-wrap img,.draft-card>img{width:100%;height:100%;border-radius:9px;object-fit:cover}.image-fallback{display:grid;place-items:center;color:#bd4d20;font-size:20px;font-weight:900}.product-copy{min-width:0}.row-labels{display:flex;align-items:center;gap:8px;margin-bottom:5px}.product-copy h3,.product-copy h2{margin:0;color:#232a25;font-size:16px;line-height:1.42;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.product-copy a:hover h3{color:#c94b18}.product-copy p{margin:5px 0 0;color:#7a837b;font-size:13px}.status{display:inline-flex;width:max-content;padding:5px 8px;border-radius:999px;background:#eef0ed;color:#626a63;font-size:12px;font-weight:800}.status.success{background:#e4f3e9;color:#2e6846}.status.warning{background:#fff0dd;color:#9a5c16}.status.neutral{background:#eef0ed;color:#626a63}.row-metric span{display:block;margin-bottom:6px;color:#777f78;font-size:12px}.row-metric strong{font-size:15px}.row-actions{display:flex;align-items:center;gap:7px}.icon-button{width:42px;height:42px;border:1px solid #d2d8d1;border-radius:8px;background:#fff;color:#515a52;cursor:pointer}.pagination-bar{display:flex;justify-content:space-between;align-items:center;padding:16px 22px;border-top:1px solid #e4e8e2;color:#687169;font-size:14px}.pagination-bar>div{display:flex;align-items:center;gap:9px}.draft-list{gap:12px}.draft-card{display:grid;grid-template-columns:82px minmax(0,1fr) 130px auto;align-items:center;gap:18px;padding:16px;border:1px solid #dce1da;border-radius:12px;background:#fff}.draft-card>img,.draft-card .image-fallback{width:82px;height:82px}.draft-status{display:grid;gap:6px}.draft-status small{color:#788179}.state-panel{padding:70px 28px;border:1px solid #dce1da;border-radius:12px;background:#fff;text-align:center}.product-workspace .state-panel{border:0;border-radius:0}.state-panel h2{margin:14px 0 5px;font-size:20px}.state-panel p{margin:0 auto 16px;max-width:540px;color:#6e776f}.state-icon,.modal-icon{width:48px;height:48px;margin:auto;display:grid;place-items:center;border-radius:12px;background:#fff0e8;color:#d14e17;font-size:22px}.modal-icon.danger{background:#fae8e6;color:#a83831}.error-state{color:#923e35;background:#fff7f5}.error-state>i{font-size:28px}.text-action{color:#bc481a;font-weight:800}.skeleton-list{padding:0 22px}.skeleton-row{display:grid;grid-template-columns:86px 1fr;gap:18px;padding:16px 0;border-top:1px solid #edf0ec}.skeleton-row>span{width:86px;height:86px;border-radius:9px;background:#edf0ec}.skeleton-row div{padding-top:15px}.skeleton-row i{display:block;width:55%;height:13px;margin-bottom:15px;border-radius:5px;background:#edf0ec}.skeleton-row i:last-child{width:32%}.skeleton-row span,.skeleton-row i{animation:pulse 1.3s ease-in-out infinite}.modal-shell{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:24px;background:rgba(19,25,21,.62)}.modal-card{position:relative;width:min(700px,100%);max-height:calc(100vh - 48px);overflow:auto;padding:28px;border-radius:12px;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,.2)}.modal-card.small{width:min(480px,100%);text-align:center}.modal-card h2{margin:8px 0;font-size:25px}.modal-card p{color:#677068;line-height:1.55}.modal-close{position:absolute;top:16px;right:16px;width:38px;height:38px;border:0;border-radius:8px;background:#f1f3f0;cursor:pointer}.modal-form{display:grid;gap:17px;margin-top:22px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.form-note{margin:0;padding:12px;border-radius:8px;background:#f5f6f3;font-size:13px}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}.small .modal-actions{justify-content:center}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@keyframes pulse{50%{opacity:.5}}@media(max-width:1150px){.filter-bar{grid-template-columns:repeat(2,1fr)}.filter-actions{align-items:flex-end}.product-row{grid-template-columns:26px 80px minmax(260px,1fr) 130px auto}.product-row .row-metric:nth-of-type(2){display:none}.product-image-wrap{width:80px;height:80px}}@media(max-width:780px){.library-page{padding:20px}.page-header{align-items:flex-start;flex-direction:column}.page-header h1{font-size:29px}.summary-strip{grid-template-columns:repeat(2,1fr)}.summary-strip div:nth-child(2){border-right:0}.summary-strip div:nth-child(-n+2){border-bottom:1px solid #e5e8e3}.filter-bar{grid-template-columns:1fr}.filter-actions{align-items:center}.selection-bar{align-items:flex-start;flex-direction:column}.product-row{grid-template-columns:22px 68px 1fr;align-items:start;padding:15px}.product-image-wrap{width:68px;height:68px}.product-row .row-metric{display:none}.row-actions{grid-column:2/-1}.row-actions .button{flex:1}.list-heading{padding:18px 15px}.draft-card{grid-template-columns:68px 1fr}.draft-card>img,.draft-card .image-fallback{width:68px;height:68px}.draft-status{display:none}.draft-card>.button{grid-column:1/-1}.form-grid{grid-template-columns:1fr}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
</style>
