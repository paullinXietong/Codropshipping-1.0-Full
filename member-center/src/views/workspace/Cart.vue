<template>
  <main class="cart-page">
    <header class="page-heading">
      <div>
        <span class="eyebrow">{{ $t('cart.eyebrow') }}</span>
        <h1>{{ $t('cart.title') }}</h1>
        <p>{{ $t('cart.subtitle') }}</p>
      </div>
      <a class="secondary-action" :href="storefrontUrl"><i class="el-icon-back"></i>{{ $t('cart.continueShopping') }}</a>
    </header>

    <section v-if="!loading && !error && products.length" class="summary-grid" aria-label="Cart summary">
      <article><span>{{ $t('cart.items') }}</span><strong>{{ products.length }}</strong></article>
      <article><span>{{ $t('cart.units') }}</span><strong>{{ unitCount }}</strong></article>
      <article><span>{{ $t('cart.selected') }}</span><strong>{{ selectedIds.length }}</strong></article>
      <article class="summary-total"><span>{{ $t('cart.total') }}</span><strong>{{ money(selectedTotal) }}</strong></article>
    </section>

    <section v-if="!loading && !error && products.length" class="cart-toolbar">
      <form role="search" @submit.prevent="loadCart">
        <i class="el-icon-search"></i>
        <input v-model.trim="query" type="search" :placeholder="$t('cart.searchPlaceholder')" :aria-label="$t('cart.searchPlaceholder')" />
        <button class="toolbar-primary" type="submit">{{ $t('cart.search') }}</button>
        <button v-if="query" type="button" @click="clearSearch">{{ $t('cart.clear') }}</button>
      </form>
      <div class="toolbar-actions">
        <label><input type="checkbox" :checked="allSelected" @change="toggleAll($event.target.checked)" />{{ $t('cart.selectAll') }}</label>
        <button type="button" :disabled="!selectedIds.length" @click="deleteDialog = true"><i class="el-icon-delete"></i>{{ $t('cart.removeSelected') }}</button>
      </div>
    </section>

    <section v-if="loading" class="page-state" aria-live="polite">
      <span class="state-icon"><i class="el-icon-loading"></i></span><h2>{{ $t('cart.loading') }}</h2>
    </section>
    <section v-else-if="error" class="page-state error-state" role="alert">
      <span class="state-icon"><i class="el-icon-warning-outline"></i></span><h2>{{ $t('cart.errorTitle') }}</h2><p>{{ error }}</p><button class="primary-action" type="button" @click="initialize">{{ $t('cart.retry') }}</button>
    </section>
    <section v-else-if="!products.length" class="page-state">
      <span class="state-icon"><i class="el-icon-shopping-cart-full"></i></span><h2>{{ $t('cart.emptyTitle') }}</h2><p>{{ $t('cart.emptyCopy') }}</p><a class="primary-action" :href="storefrontUrl">{{ $t('cart.browse') }}</a>
    </section>

    <section v-else class="cart-list">
      <article v-for="product in products" :key="product.id || product.goods_id" class="product-card">
        <div class="product-heading">
          <label class="product-check">
            <input type="checkbox" :checked="productSelected(product)" :aria-label="$t('cart.selectProduct', { value: product.subject })" @change="toggleProduct(product, $event.target.checked)" />
          </label>
          <a :href="productHref(product)" class="product-image" target="_blank" rel="noopener"><img :src="product.image" :alt="product.subject" /></a>
          <div class="product-copy">
            <span class="source-label">{{ sourceLabel(product.source) }}</span>
            <a :href="productHref(product)" target="_blank" rel="noopener"><h2>{{ product.subject }}</h2></a>
            <small>#{{ product.goods_id || product.id }}</small>
          </div>
        </div>

        <div class="variant-header" aria-hidden="true"><span>{{ $t('cart.product') }}</span><span>{{ $t('cart.quantity') }}</span><span>{{ $t('cart.price') }}</span><span>{{ $t('cart.subtotal') }}</span></div>
        <div v-for="sku in product.sku_info" :key="sku.id" class="variant-row">
          <div class="variant-name">
            <input type="checkbox" :value="String(sku.id)" v-model="selectedIds" :aria-label="$t('cart.selectVariant', { value: variantName(sku) })" />
            <img v-if="sku.img" :src="sku.img" :alt="variantName(sku)" />
            <span>{{ variantName(sku) }}</span>
          </div>
          <label class="quantity-field">
            <span class="mobile-label">{{ $t('cart.quantity') }}</span>
            <input v-model.number="sku.num" type="number" min="1" step="1" :disabled="savingIds.includes(String(sku.id))" @change="saveQuantity(sku)" />
            <small v-if="savingIds.includes(String(sku.id))">{{ $t('cart.saving') }}</small>
          </label>
          <div><span class="mobile-label">{{ $t('cart.price') }}</span>{{ money(sku.usd) }}</div>
          <strong><span class="mobile-label">{{ $t('cart.subtotal') }}</span>{{ money(sku.usd * sku.num) }}</strong>
        </div>
      </article>
    </section>

    <footer v-if="!loading && !error && products.length" class="checkout-bar">
      <div><span>{{ $t('cart.total') }}</span><strong>{{ money(selectedTotal) }}</strong><small>{{ $t('cart.checkoutHint') }}</small></div>
      <button class="primary-action" type="button" :disabled="!selectedIds.length" @click="checkout">{{ $t('cart.checkout') }}<i class="el-icon-right"></i></button>
    </footer>
    <p v-if="actionMessage" class="action-message" role="alert">{{ actionMessage }}</p>

    <div v-if="deleteDialog" class="dialog-backdrop" @click.self="deleteDialog = false">
      <section class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="cart-delete-title">
        <span class="dialog-icon"><i class="el-icon-delete"></i></span>
        <h2 id="cart-delete-title">{{ $t('cart.deleteTitle') }}</h2>
        <p>{{ $t('cart.deleteCopy') }}</p>
        <div><button type="button" :disabled="deleting" @click="deleteDialog = false">{{ $t('cart.cancel') }}</button><button class="danger-action" type="button" :disabled="deleting" @click="confirmDelete">{{ deleting ? $t('cart.deleting') : $t('cart.confirmDelete') }}</button></div>
      </section>
    </div>
  </main>
</template>

<script>
import { deleteCart, editCart, getCart, getRate } from '@/api/dropshipping'

export default {
  name: 'WorkspaceCart',
  data() {
    return { loading: true, error: '', actionMessage: '', query: '', products: [], rate: 1, selectedIds: [], savingIds: [], deleteDialog: false, deleting: false, storefrontUrl: '/' }
  },
  computed: {
    allSkuIds() { return this.products.flatMap((product) => (product.sku_info || []).map((sku) => String(sku.id))) },
    allSelected() { return this.allSkuIds.length > 0 && this.selectedIds.length === this.allSkuIds.length },
    unitCount() { return this.products.reduce((total, product) => total + (product.sku_info || []).reduce((sum, sku) => sum + Number(sku.num || 0), 0), 0) },
    selectedTotal() {
      const selected = new Set(this.selectedIds)
      return this.products.reduce((total, product) => total + (product.sku_info || []).reduce((sum, sku) => selected.has(String(sku.id)) ? sum + Number(sku.usd || 0) * Number(sku.num || 0) : sum, 0), 0)
    },
  },
  mounted() { this.initialize() },
  methods: {
    async initialize() {
      this.loading = true; this.error = ''
      try {
        const rateResponse = await getRate()
        this.rate = Number(rateResponse?.data?.exchange_rate || 1)
        await this.loadCart()
      } catch (error) {
        this.error = error?.message || this.$t('cart.errorCopy')
      } finally { this.loading = false }
    },
    async loadCart() {
      this.loading = true; this.error = ''; this.actionMessage = ''
      try {
        const response = await getCart(JSON.stringify({ subject: this.query }))
        const list = Array.isArray(response?.data?.list) ? response.data.list : []
        this.products = list.map((product) => ({ ...product, sku_info: (product.sku_info || []).map((sku) => ({ ...sku, num: Math.max(1, Number(sku.num || 1)), usd: String(sku.currency) === '1' ? this.divide(sku.price, this.rate) : Number(sku.price || 0) })) }))
        this.selectedIds = this.selectedIds.filter((id) => this.allSkuIds.includes(String(id)))
      } catch (error) { this.error = error?.message || this.$t('cart.errorCopy') }
      finally { this.loading = false }
    },
    clearSearch() { this.query = ''; this.loadCart() },
    divide(value, rate) { return Math.max(0.01, Math.round((Number(value || 0) / Number(rate || 1)) * 100) / 100) },
    money(value) { return `$${Number(value || 0).toFixed(2)}` },
    variantName(sku) { return sku.sku_name || sku.name || `SKU ${sku.id}` },
    sourceLabel(source) { return String(source) === '5' ? 'Alibaba' : String(source) === '4' ? 'WestMonth' : '1688' },
    productHref(product) { return `/productDetail?id=${encodeURIComponent(product.goods_id || product.id)}&source=${encodeURIComponent(product.source || 1)}` },
    productSelected(product) { const ids = (product.sku_info || []).map((sku) => String(sku.id)); return ids.length > 0 && ids.every((id) => this.selectedIds.includes(id)) },
    toggleProduct(product, checked) {
      const ids = (product.sku_info || []).map((sku) => String(sku.id)); const next = new Set(this.selectedIds)
      ids.forEach((id) => checked ? next.add(id) : next.delete(id)); this.selectedIds = [...next]
    },
    toggleAll(checked) { this.selectedIds = checked ? [...this.allSkuIds] : [] },
    async saveQuantity(sku) {
      sku.num = Math.max(1, Math.floor(Number(sku.num || 1))); const id = String(sku.id); if (this.savingIds.includes(id)) return
      this.savingIds.push(id); this.actionMessage = ''
      try { await editCart(JSON.stringify({ cart_info_id: sku.id, num: sku.num })) }
      catch (error) { this.actionMessage = error?.message || this.$t('cart.errorCopy') }
      finally { this.savingIds = this.savingIds.filter((value) => value !== id) }
    },
    async confirmDelete() {
      if (!this.selectedIds.length || this.deleting) return
      this.deleting = true; this.actionMessage = ''
      try { await deleteCart(JSON.stringify({ cart_info_ids: this.selectedIds.join(',') })); this.deleteDialog = false; this.selectedIds = []; await this.loadCart() }
      catch (error) { this.actionMessage = error?.message || this.$t('cart.errorCopy') }
      finally { this.deleting = false }
    },
    checkout() {
      if (!this.selectedIds.length) { this.actionMessage = this.$t('cart.selectFirst'); return }
      this.$router.push({ path: '/order', query: { cartIds: this.selectedIds.join(',') } })
    },
  },
}
</script>

<style scoped>
.cart-page{max-width:1440px;margin:0 auto;padding:42px 40px 130px;color:#202522}.page-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:32px}.eyebrow{display:block;margin-bottom:9px;color:#d94f20;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.page-heading h1{margin:0;font-size:34px;line-height:1.15}.page-heading p{max-width:720px;margin:11px 0 0;color:#68716b;line-height:1.6}.secondary-action,.primary-action{min-height:44px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 18px;border:1px solid #cfd5cf;border-radius:9px;background:#fff;color:#252b27;font-weight:700}.primary-action{border-color:#e85524;background:#e85524;color:#fff}.summary-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin-top:30px;border:1px solid #dfe3de;border-radius:13px;background:#fff;overflow:hidden}.summary-grid article{min-height:106px;display:flex;flex-direction:column;justify-content:center;padding:22px 24px;border-right:1px solid #e5e8e4}.summary-grid article:last-child{border:0}.summary-grid span{color:#747c76;font-size:13px}.summary-grid strong{margin-top:7px;font-size:25px}.summary-total{background:#fff7f2}.summary-total strong{color:#d94f20}.cart-toolbar{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:18px 0;padding:14px 16px;border:1px solid #dfe3de;border-radius:11px;background:#fff}.cart-toolbar form{min-width:360px;display:flex;align-items:center;gap:9px}.cart-toolbar form i{color:#7b837d}.cart-toolbar input[type=search]{width:100%;height:40px;padding:0 10px;border:1px solid #d9ded9;border-radius:8px}.cart-toolbar button{min-height:38px;padding:0 13px;border:0;border-radius:7px;background:transparent;font-weight:700}.cart-toolbar .toolbar-primary{background:#262c28;color:#fff}.toolbar-actions{display:flex;align-items:center;gap:16px}.toolbar-actions label{display:flex;align-items:center;gap:8px;font-weight:700}.toolbar-actions button{border:1px solid #d9ded9}.toolbar-actions button:disabled,.primary-action:disabled{cursor:not-allowed;opacity:.45}.cart-list{display:grid;gap:16px}.product-card{border:1px solid #dfe3de;border-radius:13px;background:#fff;overflow:hidden}.product-heading{display:flex;align-items:center;gap:16px;padding:20px 22px}.product-check input,.variant-name input,.toolbar-actions input{width:17px;height:17px;accent-color:#e85524}.product-image{width:68px;height:68px;flex:0 0 auto;border:1px solid #ecefeb;border-radius:9px;overflow:hidden}.product-image img{width:100%;height:100%;object-fit:cover}.product-copy{min-width:0}.product-copy h2{max-width:900px;margin:5px 0 4px;color:#252a27;font-size:17px;line-height:1.4}.product-copy small{color:#7a827c}.source-label{display:inline-block;padding:3px 7px;border-radius:5px;background:#fff0e9;color:#c94a1f;font-size:11px;font-weight:800}.variant-header,.variant-row{display:grid;grid-template-columns:minmax(320px,1fr) 150px 130px 130px;align-items:center;gap:18px;padding:11px 22px}.variant-header{border-top:1px solid #e7eae7;border-bottom:1px solid #e7eae7;background:#f5f7f4;color:#737b75;font-size:12px;font-weight:700}.variant-row{min-height:76px;border-bottom:1px solid #edf0ed}.variant-row:last-child{border-bottom:0}.variant-name{display:flex;align-items:center;gap:11px;min-width:0}.variant-name img{width:40px;height:40px;border-radius:7px;object-fit:cover}.variant-name span{overflow:hidden;text-overflow:ellipsis}.quantity-field{display:flex;align-items:center;gap:8px}.quantity-field input{width:82px;height:38px;padding:0 8px;border:1px solid #d6dbd6;border-radius:7px}.quantity-field small{color:#778078;font-size:11px}.mobile-label{display:none}.checkout-bar{position:fixed;right:28px;bottom:24px;z-index:30;width:min(640px,calc(100vw - 320px));display:flex;align-items:center;justify-content:space-between;gap:28px;padding:18px 20px;border:1px solid #d7dcd7;border-radius:14px;background:rgba(255,255,255,.96);box-shadow:0 15px 40px rgba(31,39,33,.14);backdrop-filter:blur(12px)}.checkout-bar>div{display:grid;grid-template-columns:auto auto;align-items:baseline;gap:4px 12px}.checkout-bar span{color:#747d76;font-size:13px}.checkout-bar strong{color:#d94f20;font-size:23px}.checkout-bar small{grid-column:1/3;color:#747d76}.page-state{min-height:390px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:28px;padding:40px;border:1px solid #dfe3de;border-radius:14px;background:#fff;text-align:center}.state-icon{width:58px;height:58px;display:grid;place-items:center;border-radius:16px;background:#fff0e9;color:#d94f20;font-size:25px}.page-state h2{margin:18px 0 8px}.page-state p{max-width:520px;margin:0 0 20px;color:#6c756e}.error-state .state-icon{background:#fff3f0}.action-message{position:fixed;right:34px;bottom:112px;z-index:35;max-width:420px;padding:12px 16px;border:1px solid #f0b49e;border-radius:9px;background:#fff4ef;color:#a63d1b}.dialog-backdrop{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:20px;background:rgba(25,30,27,.46)}.confirm-dialog{width:min(430px,100%);padding:28px;border-radius:15px;background:#fff;box-shadow:0 30px 80px rgba(0,0,0,.25)}.dialog-icon{width:46px;height:46px;display:grid;place-items:center;border-radius:12px;background:#fff0ed;color:#cf3f22;font-size:20px}.confirm-dialog h2{margin:18px 0 8px}.confirm-dialog p{margin:0;color:#69716c;line-height:1.55}.confirm-dialog>div{display:flex;justify-content:flex-end;gap:10px;margin-top:24px}.confirm-dialog button{min-height:42px;padding:0 16px;border:1px solid #d8ddd8;border-radius:8px;background:#fff;font-weight:700}.confirm-dialog .danger-action{border-color:#c84125;background:#c84125;color:#fff}
@media(max-width:960px){.cart-page{padding:28px 20px 130px}.page-heading{flex-direction:column}.summary-grid{grid-template-columns:repeat(2,1fr)}.summary-grid article:nth-child(2){border-right:0}.summary-grid article:nth-child(-n+2){border-bottom:1px solid #e5e8e4}.cart-toolbar{align-items:stretch;flex-direction:column}.cart-toolbar form{min-width:0}.variant-header{display:none}.variant-row{grid-template-columns:1fr 1fr;padding:16px 20px}.variant-name{grid-column:1/3}.mobile-label{display:block;margin-bottom:3px;color:#7a827c;font-size:11px}.checkout-bar{left:20px;right:20px;width:auto}}@media(max-width:620px){.summary-grid{grid-template-columns:1fr}.summary-grid article{border-right:0;border-bottom:1px solid #e5e8e4!important}.product-heading{align-items:flex-start}.product-copy h2{font-size:15px}.variant-row{grid-template-columns:1fr}.variant-name{grid-column:1}.cart-toolbar form{display:grid;grid-template-columns:1fr auto}.cart-toolbar form i{display:none}.cart-toolbar form button:last-child{grid-column:1/3}.checkout-bar{align-items:stretch;flex-direction:column;gap:12px}.checkout-bar .primary-action{width:100%}}
</style>
