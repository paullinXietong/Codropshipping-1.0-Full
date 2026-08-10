<template>
  <main class="orders-page" :aria-busy="loading ? 'true' : 'false'">
    <header class="page-header">
      <div>
        <p class="page-kicker">{{ $t('orders.kicker') }}</p>
        <h1>{{ $t('orders.title') }}</h1>
        <p class="page-subtitle">{{ $t('orders.subtitle') }}</p>
      </div>
      <div class="header-actions">
        <button class="secondary-action" type="button" :disabled="loading" @click="loadOrders(1)">
          <i class="el-icon-refresh" aria-hidden="true"></i>
          {{ loading ? $t('common.refreshing') : $t('common.refresh') }}
        </button>
        <button class="primary-action" type="button" :disabled="!authorizedStores.length || syncing" @click="openSync">
          <i class="el-icon-connection" aria-hidden="true"></i>
          {{ syncing ? $t('orders.syncing') : $t('orders.sync') }}
        </button>
      </div>
    </header>

    <section class="summary-strip" :aria-label="$t('orders.summary')">
      <article>
        <span>{{ $t('orders.currentQueue') }}</span>
        <strong>{{ formatNumber(total) }}</strong>
        <small>{{ activeStatus.label }}</small>
      </article>
      <article>
        <span>{{ $t('orders.connectedStores') }}</span>
        <strong>{{ formatNumber(authorizedStores.length) }}</strong>
        <small>{{ selectedStoreName }}</small>
      </article>
      <article>
        <span>{{ $t('orders.visibleOrders') }}</span>
        <strong>{{ formatNumber(orders.length) }}</strong>
        <small>{{ $t('orders.pageOf', { page, pages: totalPages }) }}</small>
      </article>
      <article>
        <span>{{ $t('orders.nextAction') }}</span>
        <strong class="summary-action">{{ nextActionLabel }}</strong>
        <small>{{ $t('orders.nextActionCopy') }}</small>
      </article>
    </section>

    <nav class="status-tabs" :aria-label="$t('orders.statusFilter')">
      <button
        v-for="status in statuses"
        :key="status.value"
        type="button"
        :class="{ active: selectedStatus === status.value }"
        :aria-current="selectedStatus === status.value ? 'page' : null"
        @click="selectStatus(status.value)"
      >
        {{ status.label }}
      </button>
    </nav>

    <section class="orders-panel">
      <div class="filter-bar">
        <label class="search-control">
          <span>{{ $t('orders.searchLabel') }}</span>
          <span class="input-shell">
            <i class="el-icon-search" aria-hidden="true"></i>
            <input v-model.trim="query" type="search" :placeholder="$t('orders.searchPlaceholder')" @keyup.enter="loadOrders(1)" />
          </span>
        </label>
        <label class="store-control">
          <span>{{ $t('orders.storeLabel') }}</span>
          <select v-model="selectedStoreId" @change="loadOrders(1)">
            <option value="">{{ $t('orders.allStores') }}</option>
            <option v-for="store in authorizedStores" :key="store.id" :value="String(store.id)">{{ storeName(store) }}</option>
          </select>
        </label>
        <button class="filter-action" type="button" :disabled="loading" @click="loadOrders(1)">{{ $t('common.search') }}</button>
        <button class="reset-action" type="button" :disabled="loading || (!query && !selectedStoreId)" @click="resetFilters">{{ $t('orders.reset') }}</button>
      </div>

      <div v-if="error" class="notice notice-error" role="alert">
        <i class="el-icon-warning-outline" aria-hidden="true"></i>
        <div><strong>{{ $t('orders.errorTitle') }}</strong><span>{{ error }}</span></div>
        <button type="button" @click="loadOrders(page)">{{ $t('common.retry') }}</button>
      </div>

      <div v-if="loading" class="order-skeleton" aria-live="polite">
        <span v-for="index in 6" :key="index"></span>
      </div>

      <div v-else-if="orders.length" class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{{ $t('orders.order') }}</th>
              <th>{{ $t('orders.items') }}</th>
              <th>{{ $t('orders.store') }}</th>
              <th>{{ $t('orders.customer') }}</th>
              <th>{{ $t('orders.cost') }}</th>
              <th>{{ $t('orders.shipping') }}</th>
              <th>{{ $t('orders.created') }}</th>
              <th class="action-column">{{ $t('orders.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="orderKey(order)">
              <td>
                <button class="order-number" type="button" @click="selectedOrder = order">{{ orderNumber(order) }}</button>
                <span class="status-badge">{{ activeStatus.label }}</span>
              </td>
              <td class="item-cell">
                <strong>{{ primaryItem(order) }}</strong>
                <small>{{ $t('orders.itemCount', { value: itemCount(order) }) }}</small>
              </td>
              <td>{{ order.store_name || order.storeName || $t('orders.shopify') }}</td>
              <td>
                <strong>{{ customerName(order) }}</strong>
                <small>{{ destination(order) }}</small>
              </td>
              <td>
                <strong>{{ money(productCost(order)) }}</strong>
                <small>{{ $t('orders.productCost') }}</small>
              </td>
              <td>
                <strong>{{ shippingName(order) }}</strong>
                <small>{{ money(shippingCost(order)) }}</small>
              </td>
              <td>{{ dateLabel(order) }}</td>
              <td class="action-column"><button class="review-action" type="button" @click="selectedOrder = order">{{ $t('orders.review') }}</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="empty-state">
        <i class="el-icon-document-checked" aria-hidden="true"></i>
        <h2>{{ $t('orders.emptyTitle') }}</h2>
        <p>{{ query || selectedStoreId ? $t('orders.emptyFilteredCopy') : $t('orders.emptyCopy') }}</p>
        <button v-if="query || selectedStoreId" class="secondary-action" type="button" @click="resetFilters">{{ $t('orders.clearFilters') }}</button>
        <button v-else class="primary-action" type="button" :disabled="!authorizedStores.length" @click="openSync">{{ $t('orders.sync') }}</button>
      </div>

      <footer v-if="orders.length" class="pagination-bar">
        <span>{{ $t('orders.resultCount', { value: total }) }}</span>
        <div>
          <button type="button" :disabled="page <= 1 || loading" :aria-label="$t('orders.previous')" @click="loadOrders(page - 1)"><i class="el-icon-arrow-left"></i></button>
          <strong>{{ page }} / {{ totalPages }}</strong>
          <button type="button" :disabled="page >= totalPages || loading" :aria-label="$t('orders.next')" @click="loadOrders(page + 1)"><i class="el-icon-arrow-right"></i></button>
        </div>
      </footer>
    </section>

    <div v-if="syncDialog" class="dialog-layer" role="presentation" @click.self="closeSync">
      <section class="sync-dialog" role="dialog" aria-modal="true" :aria-labelledby="'sync-orders-title'">
        <button class="dialog-close" type="button" :aria-label="$t('common.close')" @click="closeSync"><i class="el-icon-close"></i></button>
        <span class="dialog-label">{{ $t('orders.syncLabel') }}</span>
        <h2 id="sync-orders-title">{{ $t('orders.syncTitle') }}</h2>
        <p>{{ $t('orders.syncCopy') }}</p>
        <label>
          <span>{{ $t('orders.storeLabel') }}</span>
          <select v-model="syncStoreId">
            <option v-for="store in authorizedStores" :key="store.id" :value="String(store.id)">{{ storeName(store) }}</option>
          </select>
        </label>
        <div v-if="syncError" class="dialog-error" role="alert">{{ syncError }}</div>
        <div class="dialog-actions">
          <button class="secondary-action" type="button" :disabled="syncing" @click="closeSync">{{ $t('common.cancel') }}</button>
          <button class="primary-action" type="button" :disabled="!syncStoreId || syncing" @click="confirmSync">{{ syncing ? $t('orders.syncing') : $t('orders.confirmSync') }}</button>
        </div>
      </section>
    </div>

    <aside v-if="selectedOrder" class="order-drawer" aria-live="polite">
      <button class="drawer-close" type="button" :aria-label="$t('common.close')" @click="selectedOrder = null"><i class="el-icon-close"></i></button>
      <span class="drawer-label">{{ activeStatus.label }}</span>
      <h2>{{ orderNumber(selectedOrder) }}</h2>
      <p>{{ primaryItem(selectedOrder) }}</p>
      <dl>
        <div><dt>{{ $t('orders.store') }}</dt><dd>{{ selectedOrder.store_name || selectedOrder.storeName || $t('orders.shopify') }}</dd></div>
        <div><dt>{{ $t('orders.customer') }}</dt><dd>{{ customerName(selectedOrder) }}</dd></div>
        <div><dt>{{ $t('orders.destination') }}</dt><dd>{{ destination(selectedOrder) }}</dd></div>
        <div><dt>{{ $t('orders.productCost') }}</dt><dd>{{ money(productCost(selectedOrder)) }}</dd></div>
        <div><dt>{{ $t('orders.shippingCost') }}</dt><dd>{{ money(shippingCost(selectedOrder)) }}</dd></div>
        <div><dt>{{ $t('orders.shipping') }}</dt><dd>{{ shippingName(selectedOrder) }}</dd></div>
        <div><dt>{{ $t('orders.created') }}</dt><dd>{{ dateLabel(selectedOrder) }}</dd></div>
      </dl>
      <router-link class="drawer-action" to="/workspace/fulfillment">{{ $t('orders.openFulfillment') }}<i class="el-icon-right"></i></router-link>
    </aside>
  </main>
</template>

<script>
import { getOrderList, syncOrder } from '@/api/dropshipping'
import { storeList } from '@/api/user'

export default {
  name: 'WorkspaceOrders',
  data() {
    return {
      loading: true,
      syncing: false,
      error: '',
      syncError: '',
      orders: [],
      stores: [],
      total: 0,
      page: 1,
      pageSize: 20,
      selectedStatus: 1,
      selectedStoreId: '',
      syncStoreId: '',
      query: '',
      syncDialog: false,
      selectedOrder: null,
    }
  },
  computed: {
    statuses() {
      return [
        { value: 1, label: this.$t('orders.pending') },
        { value: 2, label: this.$t('orders.picking') },
        { value: 3, label: this.$t('orders.awaitingPayment') },
        { value: 4, label: this.$t('orders.paid') },
        { value: 5, label: this.$t('orders.dispatched') },
        { value: 6, label: this.$t('orders.completed') },
        { value: 7, label: this.$t('orders.cancelled') },
      ]
    },
    activeStatus() { return this.statuses.find((status) => status.value === this.selectedStatus) || this.statuses[0] },
    authorizedStores() { return this.stores.filter((store) => String(store.is_authorize || '') !== '2') },
    selectedStoreName() {
      if (!this.selectedStoreId) return this.authorizedStores.length ? this.$t('orders.allStores') : this.$t('common.notConnected')
      const store = this.authorizedStores.find((item) => String(item.id) === String(this.selectedStoreId))
      return store ? this.storeName(store) : this.$t('orders.allStores')
    },
    totalPages() { return Math.max(1, Math.ceil(this.total / this.pageSize)) },
    nextActionLabel() { return this.selectedStatus === 1 ? this.$t('orders.reviewOrders') : this.$t('orders.manageQueue') },
  },
  mounted() { this.initialize() },
  methods: {
    async initialize() {
      this.loading = true
      this.error = ''
      try {
        const stores = await storeList()
        this.stores = stores?.data?.list || []
        if (this.authorizedStores.length) this.syncStoreId = String(this.authorizedStores[0].id)
        await this.loadOrders(1, false)
      } catch (error) {
        this.error = error?.message || this.$t('orders.errorFallback')
      } finally {
        this.loading = false
      }
    },
    async loadOrders(page = 1, manageLoading = true) {
      if (manageLoading) this.loading = true
      this.error = ''
      this.selectedOrder = null
      try {
        const response = await getOrderList({
          order_number: this.query,
          local_order_status: this.selectedStatus,
          store_type: '',
          store_id: this.selectedStoreId,
          pageCount: this.pageSize,
          pageIndex: page,
        })
        this.orders = response?.data?.list || []
        this.total = Number(response?.data?.total || this.orders.length)
        this.page = page
      } catch (error) {
        this.orders = []
        this.total = 0
        this.error = error?.message || this.$t('orders.errorFallback')
      } finally {
        if (manageLoading) this.loading = false
      }
    },
    selectStatus(value) { this.selectedStatus = value; this.query = ''; this.loadOrders(1) },
    resetFilters() { this.query = ''; this.selectedStoreId = ''; this.loadOrders(1) },
    openSync() {
      if (!this.authorizedStores.length) return
      if (!this.syncStoreId) this.syncStoreId = String(this.authorizedStores[0].id)
      this.syncError = ''
      this.syncDialog = true
    },
    closeSync() { if (!this.syncing) this.syncDialog = false },
    async confirmSync() {
      if (!this.syncStoreId || this.syncing) return
      this.syncing = true
      this.syncError = ''
      try {
        const response = await syncOrder({ store_id: this.syncStoreId })
        if (String(response?.code) !== '0') throw new Error(response?.msg || this.$t('orders.syncError'))
        this.syncDialog = false
        this.selectedStoreId = this.syncStoreId
        await this.loadOrders(1)
      } catch (error) {
        this.syncError = error?.message || this.$t('orders.syncError')
      } finally {
        this.syncing = false
      }
    },
    storeName(store) { return store.store_name || store.shop_name || store.name || this.$t('orders.shopify') },
    orderKey(order) { return order.id || order.order_number || order.orderNumber || JSON.stringify(order).slice(0, 100) },
    orderNumber(order) { return order.order_number || order.orderNumber || order.shopify_order_number || this.$t('operations.unnamedOrder') },
    lineItems(order) { return Array.isArray(order.line_items) ? order.line_items : Array.isArray(order.items) ? order.items : [] },
    itemCount(order) { return this.lineItems(order).reduce((sum, item) => sum + Number(item.quantity || item.qty || 1), 0) || 1 },
    primaryItem(order) {
      const item = this.lineItems(order)[0] || {}
      return item.title || item.product_name || item.name || order.product_name || this.$t('orders.unnamedItem')
    },
    customerName(order) {
      const address = order.address || order.shipping_address || {}
      return order.addressee || order.customer_name || [address.firstName || address.first_name, address.lastName || address.last_name].filter(Boolean).join(' ') || this.$t('operations.customer')
    },
    destination(order) {
      const address = order.address || order.shipping_address || {}
      return [address.city || order.city, address.country || order.country || order.shipping_country].filter(Boolean).join(', ') || '-'
    },
    number(value) { const normalized = Number(String(value ?? 0).replace(/[^0-9.-]/g, '')); return Number.isFinite(normalized) ? normalized : 0 },
    productCost(order) { return this.number(order.product_cost ?? order.order_amount ?? order.total_amount ?? order.amount) },
    shippingCost(order) { return this.number(order.shipping_cost ?? order.freight ?? order.shipping_fee) },
    shippingName(order) {
      if (order.shippingName || order.shipping_method) return order.shippingName || order.shipping_method
      const methods = Array.isArray(order.shipping_method_list) ? order.shipping_method_list : []
      const method = methods.find((item) => String(item.id) === String(order.price_control_id))
      return method?.shipping_method || this.$t('operations.notAssigned')
    },
    money(value) { return new Intl.NumberFormat(this.$workspaceLocale.locale || 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(this.number(value)) },
    formatNumber(value) { return new Intl.NumberFormat(this.$workspaceLocale.locale || 'en-US', { maximumFractionDigits: 0 }).format(this.number(value)) },
    dateLabel(order) {
      const value = order.created_at || order.created_data || order.order_time || order.createdAt
      if (!value) return '-'
      const date = new Date(value)
      return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat(this.$workspaceLocale.locale || 'en-US', { dateStyle: 'medium' }).format(date)
    },
  },
}
</script>

<style scoped>
.orders-page { position: relative; max-width: 1480px; min-height: calc(100dvh - 72px); margin: 0 auto; padding: 36px 34px 64px; color: #202522; font-size: 16px; }
.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 28px; margin-bottom: 24px; }.page-kicker { margin: 0 0 7px; color: #b34720; font-size: 13px; font-weight: 800; }.page-header h1 { margin: 0; font-size: clamp(31px, 3vw, 42px); line-height: 1.14; letter-spacing: -.035em; }.page-subtitle { max-width: 730px; margin: 10px 0 0; color: #626a63; font-size: 17px; line-height: 1.55; }.header-actions { display: flex; gap: 10px; }
button, input, select { font: inherit; }.primary-action, .secondary-action, .filter-action, .reset-action { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 9px; font-weight: 800; white-space: nowrap; cursor: pointer; }.primary-action { padding: 0 17px; border: 1px solid #d94f20; background: #d94f20; color: #fff; }.primary-action:hover { background: #be4218; }.secondary-action { padding: 0 16px; border: 1px solid #cfd5cf; background: #fff; color: #343a35; }.secondary-action:hover { border-color: #d94f20; color: #a84520; }button:disabled { cursor: not-allowed; opacity: .5; }button:active:not(:disabled) { transform: translateY(1px); }
.summary-strip { display: grid; grid-template-columns: 1fr 1fr 1fr 1.25fr; margin-bottom: 20px; overflow: hidden; border: 1px solid #dce1dc; border-radius: 12px; background: #fff; box-shadow: 0 14px 35px rgba(32,45,35,.04); }.summary-strip article { min-height: 116px; display: flex; flex-direction: column; justify-content: center; padding: 20px 22px; border-right: 1px solid #e2e6e2; }.summary-strip article:last-child { border-right: 0; }.summary-strip span { color: #667068; font-size: 13px; font-weight: 700; }.summary-strip strong { margin-top: 7px; font-size: 28px; letter-spacing: -.02em; }.summary-strip .summary-action { font-size: 18px; }.summary-strip small { margin-top: 5px; color: #858d87; font-size: 12px; line-height: 1.35; }
.status-tabs { display: flex; gap: 4px; margin-bottom: 12px; overflow-x: auto; scrollbar-width: thin; }.status-tabs button { min-height: 40px; padding: 0 14px; border: 0; border-bottom: 2px solid transparent; background: transparent; color: #6b736c; font-size: 14px; font-weight: 750; white-space: nowrap; cursor: pointer; }.status-tabs button:hover { color: #a84520; }.status-tabs button.active { border-bottom-color: #d94f20; color: #a84520; }
.orders-panel { overflow: hidden; border: 1px solid #dce1dc; border-radius: 12px; background: #fff; box-shadow: 0 14px 35px rgba(32,45,35,.04); }.filter-bar { display: grid; grid-template-columns: minmax(260px,1fr) minmax(210px,.55fr) auto auto; align-items: end; gap: 12px; padding: 20px 22px; border-bottom: 1px solid #dfe4df; }.filter-bar label > span:first-child, .sync-dialog label > span { display: block; margin-bottom: 7px; color: #566058; font-size: 13px; font-weight: 800; }.input-shell { height: 42px; display: flex; align-items: center; gap: 9px; padding: 0 12px; border: 1px solid #d7ddd7; border-radius: 8px; background: #f6f8f5; }.input-shell i { color: #747d75; }.input-shell input { width: 100%; border: 0; outline: 0; background: transparent; color: #273029; }.input-shell:focus-within, select:focus { border-color: #d94f20; box-shadow: 0 0 0 3px rgba(217,79,32,.12); }.store-control select, .sync-dialog select { width: 100%; height: 42px; padding: 0 34px 0 11px; border: 1px solid #d7ddd7; border-radius: 8px; outline: 0; background: #fff; color: #273029; }.filter-action { padding: 0 18px; border: 1px solid #303832; background: #303832; color: #fff; }.reset-action { padding: 0 10px; border: 0; background: transparent; color: #6a736c; }
.notice { min-height: 62px; display: grid; grid-template-columns: 25px minmax(0,1fr) auto; align-items: center; gap: 12px; margin: 16px 20px 0; padding: 12px 15px; border-radius: 9px; }.notice-error { border: 1px solid #efc9bb; background: #fff2ed; color: #883a20; }.notice strong, .notice span { display: block; }.notice span { margin-top: 3px; font-size: 13px; }.notice button { border: 0; background: transparent; color: inherit; font-weight: 900; cursor: pointer; }
.order-skeleton { padding: 8px 22px 20px; }.order-skeleton span { height: 66px; display: block; margin-top: 12px; border-radius: 8px; background: linear-gradient(90deg,#f0f3ef 20%,#f7f9f6 38%,#f0f3ef 56%); background-size: 300% 100%; animation: shimmer 1.3s ease infinite; }@keyframes shimmer { to { background-position: -100% 0; } }
.table-wrap { overflow-x: auto; }table { width: 100%; min-width: 1080px; border-collapse: separate; border-spacing: 0; text-align: left; }th { height: 48px; padding: 0 16px; background: #f6f8f5; color: #626b64; font-size: 13px; font-weight: 800; }td { padding: 15px 16px; border-top: 1px solid #e3e7e3; background: #fff; color: #3d463f; font-size: 14px; vertical-align: middle; }td strong, td small { display: block; }td small { margin-top: 4px; color: #737d75; font-size: 12px; }.item-cell { min-width: 240px; max-width: 340px; }.item-cell strong { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 1.35; }.order-number, .review-action { padding: 0; border: 0; background: transparent; color: #a84520; font-size: 14px; font-weight: 850; cursor: pointer; }.status-badge { display: block; width: max-content; margin-top: 6px; padding: 3px 7px; border-radius: 6px; background: #edf4ef; color: #2c6d4e; font-size: 11px; font-weight: 800; }.action-column { position: sticky; right: 0; z-index: 1; width: 88px; min-width: 88px; background: #fff; text-align: right; box-shadow: -12px 0 18px -18px rgba(30,40,33,.55); }th.action-column { z-index: 2; background: #f6f8f5; }
.empty-state { min-height: 360px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; }.empty-state > i { color: #d94f20; font-size: 36px; }.empty-state h2 { margin: 17px 0 7px; font-size: 22px; }.empty-state p { max-width: 520px; margin: 0 0 21px; color: #6b746d; line-height: 1.5; }.pagination-bar { min-height: 62px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-top: 1px solid #dfe4df; color: #69726a; font-size: 13px; }.pagination-bar div { display: flex; align-items: center; gap: 13px; }.pagination-bar button { width: 36px; height: 36px; border: 1px solid #d5dbd5; border-radius: 8px; background: #fff; color: #3e4740; cursor: pointer; }.pagination-bar strong { min-width: 56px; color: #343c36; text-align: center; }
.dialog-layer { position: fixed; inset: 0; z-index: 40; display: grid; place-items: center; padding: 20px; background: rgba(24,31,26,.42); }.sync-dialog { position: relative; width: min(500px,100%); padding: 28px; border: 1px solid #d7ddd7; border-radius: 12px; background: #fff; box-shadow: 0 24px 70px rgba(24,31,26,.22); }.dialog-close, .drawer-close { position: absolute; top: 18px; right: 18px; width: 38px; height: 38px; border: 1px solid #d7ddd7; border-radius: 8px; background: #fff; color: #424b44; cursor: pointer; }.dialog-label, .drawer-label { color: #a84520; font-size: 13px; font-weight: 900; }.sync-dialog h2 { margin: 8px 48px 7px 0; font-size: 25px; }.sync-dialog > p { margin: 0 0 22px; color: #687169; line-height: 1.5; }.dialog-error { margin-top: 12px; padding: 10px 12px; border-radius: 8px; background: #fff0eb; color: #8d3c20; font-size: 13px; }.dialog-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; }
.order-drawer { position: fixed; top: 72px; right: 0; z-index: 30; width: min(430px,100vw); height: calc(100dvh - 72px); padding: 30px; overflow-y: auto; border-left: 1px solid #d7ddd7; background: #fff; box-shadow: -18px 0 45px rgba(28,39,31,.12); }.order-drawer h2 { margin: 9px 48px 5px 0; font-size: 26px; }.order-drawer > p { color: #687169; line-height: 1.45; }.order-drawer dl { margin: 28px 0 0; }.order-drawer dl > div { display: grid; grid-template-columns: 120px minmax(0,1fr); gap: 14px; padding: 14px 0; border-bottom: 1px solid #e3e7e3; }.order-drawer dt { color: #778078; font-size: 13px; }.order-drawer dd { margin: 0; color: #313a33; font-size: 14px; font-weight: 700; word-break: break-word; }.drawer-action { min-height: 46px; display: flex; align-items: center; justify-content: space-between; margin-top: 18px; color: #a84520; font-weight: 850; }
@media (max-width: 1100px) { .summary-strip { grid-template-columns: repeat(2,1fr); }.summary-strip article:nth-child(2) { border-right: 0; }.summary-strip article:nth-child(-n+2) { border-bottom: 1px solid #e2e6e2; }.filter-bar { grid-template-columns: 1fr 1fr auto; }.reset-action { grid-column: 1 / -1; justify-self: start; } }
@media (max-width: 720px) { .orders-page { padding: 25px 16px 48px; }.page-header { display: block; }.page-subtitle { font-size: 16px; }.header-actions { margin-top: 18px; }.summary-strip { grid-template-columns: 1fr; }.summary-strip article { min-height: 96px; border-right: 0; border-bottom: 1px solid #e2e6e2; }.summary-strip article:last-child { border-bottom: 0; }.filter-bar { grid-template-columns: 1fr; }.reset-action { grid-column: auto; }.order-drawer { top: 0; height: 100dvh; }.pagination-bar { align-items: flex-start; gap: 14px; padding: 15px 16px; }.dialog-actions { flex-direction: column-reverse; }.dialog-actions button { width: 100%; } }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; animation: none !important; transition: none !important; } }
table { min-width: 980px; }
</style>
