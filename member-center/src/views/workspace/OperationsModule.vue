<template>
  <main class="operations-page" :aria-busy="loading ? 'true' : 'false'">
    <header class="page-header">
      <div>
        <p class="page-kicker">{{ $t(`operations.${moduleKey}.kicker`) }}</p>
        <h1>{{ $t(`operations.${moduleKey}.title`) }}</h1>
        <p class="page-subtitle">{{ $t(`operations.${moduleKey}.subtitle`) }}</p>
      </div>
      <button class="secondary-action" type="button" :disabled="loading" @click="load">
        <i class="el-icon-refresh" aria-hidden="true"></i>
        {{ loading ? $t('common.refreshing') : $t('common.refresh') }}
      </button>
    </header>

    <section v-if="loading" class="loading-state" aria-live="polite">
      <div class="loading-line wide"></div>
      <div class="loading-line"></div>
      <div class="loading-grid"><span v-for="index in 4" :key="index"></span></div>
    </section>

    <template v-else>
      <div v-if="error" class="notice notice-error" role="alert">
        <i class="el-icon-warning-outline" aria-hidden="true"></i>
        <div><strong>{{ $t('operations.unavailableTitle') }}</strong><span>{{ $t('operations.unavailableCopy') }}</span></div>
        <button type="button" @click="load">{{ $t('common.retry') }}</button>
      </div>

      <section class="metric-strip" :aria-label="$t('operations.summary')">
        <article v-for="metric in metrics" :key="metric.label">
          <span>{{ metric.label }}</span>
          <strong>{{ metric.value }}</strong>
          <small>{{ metric.note }}</small>
        </article>
      </section>

      <template v-if="moduleKey === 'fulfillment'">
        <div class="primary-grid">
          <section class="work-panel action-panel">
            <div class="section-heading">
              <div><h2>{{ $t('operations.fulfillment.queueTitle') }}</h2><p>{{ $t('operations.fulfillment.queueCopy') }}</p></div>
              <span class="count-label">{{ exceptionOrders.length }}</span>
            </div>
            <div v-if="exceptionOrders.length" class="action-list">
              <button v-for="order in exceptionOrders.slice(0, 4)" :key="orderKey(order)" type="button" @click="selectOrder(order)">
                <span class="action-icon"><i class="el-icon-warning-outline" aria-hidden="true"></i></span>
                <span><strong>{{ orderNumber(order) }}</strong><small>{{ orderException(order) }}</small></span>
                <i class="el-icon-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
            <EmptyState v-else icon="el-icon-circle-check" :title="$t('operations.fulfillment.queueEmptyTitle')" :copy="$t('operations.fulfillment.queueEmptyCopy')" />
          </section>

          <section class="work-panel health-panel">
            <div class="section-heading"><div><h2>{{ $t('operations.fulfillment.healthTitle') }}</h2><p>{{ $t('operations.fulfillment.healthCopy') }}</p></div></div>
            <div class="health-list">
              <div><span><i class="el-icon-connection"></i>{{ $t('operations.storeConnection') }}</span><strong :class="stores.length ? 'good' : 'muted'">{{ stores.length ? $t('common.connected') : $t('common.notConnected') }}</strong></div>
              <div><span><i class="el-icon-document"></i>{{ $t('operations.fulfillment.syncedOrders') }}</span><strong>{{ orders.length }}</strong></div>
              <div><span><i class="el-icon-truck"></i>{{ $t('operations.fulfillment.activeShipments') }}</span><strong>{{ deliveries.length }}</strong></div>
            </div>
            <router-link class="text-action" :to="stores.length ? '/workspace/orders' : '/account/Shopify'">{{ stores.length ? $t('operations.fulfillment.openOrders') : $t('operations.connectStore') }}<i class="el-icon-right"></i></router-link>
          </section>
        </div>

        <section class="work-panel table-panel">
          <div class="section-heading table-heading">
            <div><h2>{{ $t('operations.fulfillment.listTitle') }}</h2><p>{{ $t('operations.fulfillment.listCopy') }}</p></div>
            <label class="search-control"><i class="el-icon-search"></i><input v-model.trim="query" type="search" :placeholder="$t('operations.searchOrders')" /></label>
          </div>
          <div v-if="filteredOrders.length" class="responsive-table">
            <table>
              <thead><tr><th>{{ $t('operations.order') }}</th><th>{{ $t('operations.channel') }}</th><th>{{ $t('operations.destination') }}</th><th>{{ $t('operations.status') }}</th><th>{{ $t('operations.shipping') }}</th><th>{{ $t('operations.nextAction') }}</th></tr></thead>
              <tbody><tr v-for="order in filteredOrders" :key="orderKey(order)"><td><button class="row-link" type="button" @click="selectOrder(order)">{{ orderNumber(order) }}</button><small>{{ orderCustomer(order) }}</small></td><td>{{ order.store_name || order.storeName || 'Shopify' }}</td><td>{{ orderDestination(order) }}</td><td><span class="status-badge">{{ orderStatus(order) }}</span></td><td>{{ order.shippingName || order.shipping_method || $t('operations.notAssigned') }}</td><td><button class="inline-action" type="button" @click="selectOrder(order)">{{ $t('operations.review') }}</button></td></tr></tbody>
            </table>
          </div>
          <EmptyState v-else icon="el-icon-box" :title="$t('operations.fulfillment.listEmptyTitle')" :copy="$t('operations.fulfillment.listEmptyCopy')" action-to="/workspace/orders" :action-label="$t('operations.fulfillment.openOrders')" />
        </section>
      </template>

      <template v-else-if="moduleKey === 'inventory'">
        <div class="primary-grid inventory-grid">
          <section class="work-panel recommendation-panel">
            <div class="section-heading"><div><h2>{{ $t('operations.inventory.riskTitle') }}</h2><p>{{ $t('operations.inventory.riskCopy') }}</p></div><span class="count-label">{{ lowStockItems.length }}</span></div>
            <div v-if="lowStockItems.length" class="risk-list">
              <div v-for="item in lowStockItems.slice(0, 4)" :key="inventoryKey(item)"><span class="product-monogram">{{ productInitial(item) }}</span><span><strong>{{ inventoryName(item) }}</strong><small>{{ $t('operations.inventory.remaining', { value: availableStock(item) }) }}</small></span><button type="button">{{ $t('operations.inventory.restock') }}</button></div>
            </div>
            <EmptyState v-else icon="el-icon-circle-check" :title="$t('operations.inventory.riskEmptyTitle')" :copy="$t('operations.inventory.riskEmptyCopy')" />
          </section>
          <section class="work-panel health-panel">
            <div class="section-heading"><div><h2>{{ $t('operations.inventory.syncTitle') }}</h2><p>{{ $t('operations.inventory.syncCopy') }}</p></div></div>
            <div class="health-list">
              <div><span><i class="el-icon-house"></i>{{ $t('operations.inventory.skuCount') }}</span><strong>{{ inventory.length }}</strong></div>
              <div><span><i class="el-icon-lock"></i>{{ $t('operations.inventory.reserved') }}</span><strong>{{ formatNumber(inventoryTotals.reserved) }}</strong></div>
              <div><span><i class="el-icon-refresh"></i>{{ $t('operations.inventory.syncStatus') }}</span><strong :class="inventory.length ? 'good' : 'muted'">{{ inventory.length ? $t('operations.upToDate') : $t('operations.waitingForData') }}</strong></div>
            </div>
            <router-link class="text-action" to="/account/ProductList">{{ $t('operations.openProducts') }}<i class="el-icon-right"></i></router-link>
          </section>
        </div>
        <section class="work-panel table-panel">
          <div class="section-heading table-heading"><div><h2>{{ $t('operations.inventory.listTitle') }}</h2><p>{{ $t('operations.inventory.listCopy') }}</p></div><label class="search-control"><i class="el-icon-search"></i><input v-model.trim="query" type="search" :placeholder="$t('operations.searchProducts')" /></label></div>
          <div v-if="filteredInventory.length" class="responsive-table"><table><thead><tr><th>{{ $t('operations.product') }}</th><th>SKU</th><th>{{ $t('operations.inventory.available') }}</th><th>{{ $t('operations.inventory.reserved') }}</th><th>{{ $t('operations.inventory.incoming') }}</th><th>{{ $t('operations.status') }}</th></tr></thead><tbody><tr v-for="item in filteredInventory" :key="inventoryKey(item)"><td><span class="product-cell"><span class="product-monogram">{{ productInitial(item) }}</span><span><strong>{{ inventoryName(item) }}</strong><small>{{ item.variant_name || item.attribute || '' }}</small></span></span></td><td>{{ item.sku || item.product_sku || '-' }}</td><td>{{ formatNumber(availableStock(item)) }}</td><td>{{ formatNumber(reservedStock(item)) }}</td><td>{{ formatNumber(incomingStock(item)) }}</td><td><span :class="['status-badge', { warning: availableStock(item) <= 5 }]">{{ availableStock(item) <= 5 ? $t('operations.inventory.lowStock') : $t('operations.inventory.inStock') }}</span></td></tr></tbody></table></div>
          <EmptyState v-else icon="el-icon-house" :title="$t('operations.inventory.listEmptyTitle')" :copy="$t('operations.inventory.listEmptyCopy')" action-to="/account/ProductList" :action-label="$t('operations.openProducts')" />
        </section>
      </template>

      <template v-else-if="moduleKey === 'finance'">
        <div class="primary-grid finance-grid">
          <section class="work-panel profit-panel">
            <div class="section-heading"><div><h2>{{ $t('operations.finance.profitTitle') }}</h2><p>{{ $t('operations.finance.profitCopy') }}</p></div></div>
            <div class="profit-equation"><div><span>{{ $t('operations.finance.income') }}</span><strong>{{ money(financeTotals.income) }}</strong></div><i class="el-icon-minus"></i><div><span>{{ $t('operations.finance.expense') }}</span><strong>{{ money(financeTotals.expense) }}</strong></div><i class="el-icon-right"></i><div class="net"><span>{{ $t('operations.finance.net') }}</span><strong>{{ money(financeTotals.net) }}</strong></div></div>
            <p class="panel-note">{{ wallet.length ? $t('operations.finance.calculationNote') : $t('operations.finance.noTransactionsNote') }}</p>
          </section>
          <section class="work-panel wallet-panel">
            <span>{{ $t('operations.finance.availableBalance') }}</span><strong>{{ money(balance) }}</strong><small>{{ $t('operations.finance.walletCopy') }}</small>
            <router-link class="primary-action" to="/account/wallet">{{ $t('operations.finance.openWallet') }}</router-link>
          </section>
        </div>
        <section class="work-panel table-panel">
          <div class="section-heading table-heading"><div><h2>{{ $t('operations.finance.transactionsTitle') }}</h2><p>{{ $t('operations.finance.transactionsCopy') }}</p></div><label class="search-control"><i class="el-icon-search"></i><input v-model.trim="query" type="search" :placeholder="$t('operations.finance.searchTransactions')" /></label></div>
          <div v-if="filteredTransactions.length" class="responsive-table"><table><thead><tr><th>{{ $t('operations.finance.transaction') }}</th><th>{{ $t('operations.finance.type') }}</th><th>{{ $t('operations.finance.amount') }}</th><th>{{ $t('operations.status') }}</th><th>{{ $t('operations.finance.time') }}</th></tr></thead><tbody><tr v-for="item in filteredTransactions" :key="transactionKey(item)"><td><strong>{{ item.bill_no || item.trade_no || '-' }}</strong><small>{{ item.trade_no || '' }}</small></td><td>{{ transactionType(item) }}</td><td :class="amountValue(item) >= 0 ? 'amount-positive' : 'amount-negative'">{{ signedMoney(amountValue(item)) }}</td><td><span class="status-badge">{{ transactionStatus(item) }}</span></td><td>{{ item.created_data || item.created_at || '-' }}</td></tr></tbody></table></div>
          <EmptyState v-else icon="el-icon-wallet" :title="$t('operations.finance.emptyTitle')" :copy="$t('operations.finance.emptyCopy')" action-to="/account/wallet" :action-label="$t('operations.finance.openWallet')" />
        </section>
      </template>

      <template v-else-if="moduleKey === 'insights'">
        <div class="primary-grid insight-grid">
          <section class="work-panel decision-panel">
            <div class="section-heading"><div><h2>{{ $t('operations.insights.actionsTitle') }}</h2><p>{{ $t('operations.insights.actionsCopy') }}</p></div></div>
            <div class="decision-list">
              <router-link v-for="item in insightActions" :key="item.title" :to="item.to"><span class="action-icon"><i :class="item.icon" aria-hidden="true"></i></span><span><strong>{{ item.title }}</strong><small>{{ item.copy }}</small></span><i class="el-icon-arrow-right" aria-hidden="true"></i></router-link>
            </div>
          </section>
          <section class="work-panel health-panel">
            <div class="section-heading"><div><h2>{{ $t('operations.insights.coverageTitle') }}</h2><p>{{ $t('operations.insights.coverageCopy') }}</p></div></div>
            <div class="health-list"><div><span><i class="el-icon-connection"></i>{{ $t('operations.insights.channels') }}</span><strong>{{ stores.length }}</strong></div><div><span><i class="el-icon-document"></i>{{ $t('operations.insights.orders') }}</span><strong>{{ orders.length }}</strong></div><div><span><i class="el-icon-house"></i>{{ $t('operations.insights.skus') }}</span><strong>{{ inventory.length }}</strong></div></div>
          </section>
        </div>
        <section class="work-panel insight-breakdown">
          <div class="section-heading"><div><h2>{{ $t('operations.insights.performanceTitle') }}</h2><p>{{ $t('operations.insights.performanceCopy') }}</p></div></div>
          <div class="breakdown-grid"><div><span>{{ $t('operations.insights.sales') }}</span><strong>{{ money(insightTotals.sales) }}</strong><small>{{ $t('operations.insights.fromSyncedOrders') }}</small></div><div><span>{{ $t('operations.insights.fulfilled') }}</span><strong>{{ insightTotals.fulfilled }}</strong><small>{{ $t('operations.insights.ordersCompleted') }}</small></div><div><span>{{ $t('operations.insights.inventoryRisk') }}</span><strong>{{ lowStockItems.length }}</strong><small>{{ $t('operations.insights.lowStockSkus') }}</small></div><div><span>{{ $t('operations.insights.walletActivity') }}</span><strong>{{ wallet.length }}</strong><small>{{ $t('operations.insights.transactionsRecorded') }}</small></div></div>
        </section>
      </template>
    </template>

    <aside v-if="selectedOrder" class="detail-drawer" aria-live="polite">
      <button class="drawer-close" type="button" :aria-label="$t('common.close')" @click="selectedOrder = null"><i class="el-icon-close"></i></button>
      <span class="drawer-label">{{ $t('operations.fulfillment.timelineTitle') }}</span>
      <h2>{{ orderNumber(selectedOrder) }}</h2>
      <p>{{ orderCustomer(selectedOrder) }} · {{ orderDestination(selectedOrder) }}</p>
      <ol class="timeline"><li class="done"><strong>{{ $t('operations.fulfillment.orderReceived') }}</strong><span>{{ $t('operations.fulfillment.orderReceivedCopy') }}</span></li><li :class="{ done: deliveries.length }"><strong>{{ $t('operations.fulfillment.sourcingConfirmed') }}</strong><span>{{ deliveries.length ? $t('operations.fulfillment.sourcingConfirmedCopy') : $t('operations.fulfillment.waitingConfirmation') }}</span></li><li><strong>{{ $t('operations.fulfillment.dispatched') }}</strong><span>{{ selectedOrder.shippingName || selectedOrder.shipping_method || $t('operations.notAssigned') }}</span></li><li><strong>{{ $t('operations.fulfillment.delivered') }}</strong><span>{{ $t('operations.fulfillment.waitingCarrier') }}</span></li></ol>
    </aside>
  </main>
</template>

<script>
import EmptyState from './components/EmptyState.vue'
import { getOrderList, getDeliveryOrderList } from '@/api/dropshipping'
import { get_stock_list, warehousehome } from '@/api/warehouse'
import { reqWallet } from '@/api/wallet'
import { storeList } from '@/api/user'

export default {
  name: 'OperationsModule',
  components: { EmptyState },
  props: { moduleKey: { type: String, required: true } },
  data() {
    return { loading: true, error: '', query: '', orders: [], deliveries: [], inventory: [], wallet: [], stores: [], balance: 0, warehouseSummary: {}, selectedOrder: null }
  },
  computed: {
    exceptionOrders() { return this.orders.filter((item) => item.exception_reason || item.error_message || Number(item.local_order_status) === 0) },
    lowStockItems() { return this.inventory.filter((item) => this.availableStock(item) <= 5) },
    inventoryTotals() { return this.inventory.reduce((sum, item) => ({ available: sum.available + this.availableStock(item), reserved: sum.reserved + this.reservedStock(item), incoming: sum.incoming + this.incomingStock(item) }), { available: 0, reserved: 0, incoming: 0 }) },
    financeTotals() { const values = this.wallet.map(this.amountValue); const income = values.filter((value) => value > 0).reduce((sum, value) => sum + value, 0); const expense = Math.abs(values.filter((value) => value < 0).reduce((sum, value) => sum + value, 0)); return { income, expense, net: income - expense } },
    insightTotals() { return { sales: this.orders.reduce((sum, item) => sum + this.number(item.total_amount || item.order_amount || item.total_price), 0), fulfilled: this.orders.filter((item) => [4, 5, 6].includes(Number(item.local_order_status))).length } },
    metrics() {
      if (this.moduleKey === 'fulfillment') return [
        { label: this.$t('operations.fulfillment.pending'), value: this.orders.length, note: this.$t('operations.fulfillment.pendingNote') },
        { label: this.$t('operations.fulfillment.processing'), value: this.deliveries.length, note: this.$t('operations.fulfillment.processingNote') },
        { label: this.$t('operations.fulfillment.exceptions'), value: this.exceptionOrders.length, note: this.$t('operations.fulfillment.exceptionsNote') },
        { label: this.$t('operations.fulfillment.connectedStores'), value: this.stores.length, note: this.$t('operations.fulfillment.connectedStoresNote') },
      ]
      if (this.moduleKey === 'inventory') return [
        { label: this.$t('operations.inventory.sellable'), value: this.formatNumber(this.inventoryTotals.available), note: this.$t('operations.inventory.units') },
        { label: this.$t('operations.inventory.lowStock'), value: this.lowStockItems.length, note: this.$t('operations.inventory.skusNeedAttention') },
        { label: this.$t('operations.inventory.reserved'), value: this.formatNumber(this.inventoryTotals.reserved), note: this.$t('operations.inventory.units') },
        { label: this.$t('operations.inventory.incoming'), value: this.formatNumber(this.inventoryTotals.incoming), note: this.$t('operations.inventory.units') },
      ]
      if (this.moduleKey === 'finance') return [
        { label: this.$t('operations.finance.availableBalance'), value: this.money(this.balance), note: this.$t('operations.finance.walletBalance') },
        { label: this.$t('operations.finance.income'), value: this.money(this.financeTotals.income), note: this.$t('operations.finance.recordedTransactions') },
        { label: this.$t('operations.finance.expense'), value: this.money(this.financeTotals.expense), note: this.$t('operations.finance.recordedTransactions') },
        { label: this.$t('operations.finance.net'), value: this.money(this.financeTotals.net), note: this.$t('operations.finance.estimatedNet') },
      ]
      return [
        { label: this.$t('operations.insights.orders'), value: this.orders.length, note: this.$t('operations.insights.syncedData') },
        { label: this.$t('operations.insights.sales'), value: this.money(this.insightTotals.sales), note: this.$t('operations.insights.syncedData') },
        { label: this.$t('operations.insights.channels'), value: this.stores.length, note: this.$t('operations.insights.connectedData') },
        { label: this.$t('operations.insights.inventoryRisk'), value: this.lowStockItems.length, note: this.$t('operations.insights.skusNeedAttention') },
      ]
    },
    filteredOrders() { const q = this.query.toLowerCase(); return this.orders.filter((item) => !q || [this.orderNumber(item), this.orderCustomer(item), this.orderDestination(item)].join(' ').toLowerCase().includes(q)).slice(0, 20) },
    filteredInventory() { const q = this.query.toLowerCase(); return this.inventory.filter((item) => !q || [this.inventoryName(item), item.sku, item.product_sku].join(' ').toLowerCase().includes(q)).slice(0, 30) },
    filteredTransactions() { const q = this.query.toLowerCase(); return this.wallet.filter((item) => !q || [item.bill_no, item.trade_no, this.transactionType(item)].join(' ').toLowerCase().includes(q)).slice(0, 30) },
    insightActions() {
      const actions = []
      if (!this.stores.length) actions.push({ icon: 'el-icon-connection', title: this.$t('operations.insights.connectTitle'), copy: this.$t('operations.insights.connectCopy'), to: '/account/Shopify' })
      if (!this.orders.length) actions.push({ icon: 'el-icon-refresh', title: this.$t('operations.insights.syncTitle'), copy: this.$t('operations.insights.syncCopy'), to: '/workspace/orders' })
      if (this.lowStockItems.length) actions.push({ icon: 'el-icon-house', title: this.$t('operations.insights.stockTitle'), copy: this.$t('operations.insights.stockCopy', { value: this.lowStockItems.length }), to: '/workspace/inventory' })
      if (!actions.length) actions.push({ icon: 'el-icon-circle-check', title: this.$t('operations.insights.clearTitle'), copy: this.$t('operations.insights.clearCopy'), to: '/main/dashboard' })
      return actions.slice(0, 3)
    },
  },
  watch: { moduleKey() { this.query = ''; this.selectedOrder = null; this.load() } },
  mounted() { this.load() },
  methods: {
    async load() {
      this.loading = true; this.error = ''; this.query = ''
      try {
        if (this.moduleKey === 'fulfillment') await this.loadFulfillment()
        else if (this.moduleKey === 'inventory') await this.loadInventory()
        else if (this.moduleKey === 'finance') await this.loadFinance()
        else if (this.moduleKey === 'insights') await this.loadInsights()
      } catch (error) { this.error = error?.message || 'unavailable' }
      finally { this.loading = false }
    },
    async settled(requests) { return Promise.all(requests.map((request) => Promise.resolve(request).catch(() => null))) },
    async loadFulfillment() { const [orders, deliveries, stores] = await this.settled([getOrderList({ order_number: '', local_order_status: 1, store_type: '', store_id: '', pageCount: 50, pageIndex: 1 }), getDeliveryOrderList({ order_number: '', status: 1 }), storeList()]); this.orders = orders?.data?.list || []; this.deliveries = deliveries?.data?.list || []; this.stores = stores?.data?.list || [] },
    async loadInventory() { const [stock, summary] = await this.settled([get_stock_list({ pageIndex: 1, pageCount: 50 }), warehousehome()]); this.inventory = stock?.data?.data || stock?.data?.list || []; this.warehouseSummary = summary?.data || {} },
    async loadFinance() { const response = await reqWallet().catch(() => null); this.wallet = response?.data?.data || []; this.balance = this.number(response?.data?.balance) },
    async loadInsights() { const [orders, wallet, stores, stock] = await this.settled([getOrderList({ order_number: '', local_order_status: 1, store_type: '', store_id: '', pageCount: 50, pageIndex: 1 }), reqWallet(), storeList(), get_stock_list({ pageIndex: 1, pageCount: 50 })]); this.orders = orders?.data?.list || []; this.wallet = wallet?.data?.data || []; this.balance = this.number(wallet?.data?.balance); this.stores = stores?.data?.list || []; this.inventory = stock?.data?.data || stock?.data?.list || [] },
    number(value) { const number = Number(String(value ?? 0).replace(/[^0-9.-]/g, '')); return Number.isFinite(number) ? number : 0 },
    money(value) { return new Intl.NumberFormat(this.$workspaceLocale.locale || 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(this.number(value)) },
    signedMoney(value) { const number = this.number(value); return `${number > 0 ? '+' : ''}${this.money(number)}` },
    formatNumber(value) { return new Intl.NumberFormat(this.$workspaceLocale.locale || 'en-US', { maximumFractionDigits: 0 }).format(this.number(value)) },
    orderKey(item) { return item.id || item.order_number || item.orderNumber || JSON.stringify(item).slice(0, 80) },
    orderNumber(item) { return item.order_number || item.orderNumber || item.shopify_order_number || this.$t('operations.unnamedOrder') },
    orderCustomer(item) { return item.addressee || item.customer_name || [item.first_name, item.last_name].filter(Boolean).join(' ') || this.$t('operations.customer') },
    orderDestination(item) { const address = item.address || {}; return address.country || item.country || item.shipping_country || '-' },
    orderStatus(item) { return item.status_name || item.local_order_status_name || this.$t('operations.fulfillment.awaitingReview') },
    orderException(item) { return item.exception_reason || item.error_message || this.$t('operations.fulfillment.reviewRequired') },
    selectOrder(item) { this.selectedOrder = item },
    inventoryKey(item) { return item.id || item.sku || item.product_sku || JSON.stringify(item).slice(0, 80) },
    inventoryName(item) { return item.product_name || item.goods_name || item.name || this.$t('operations.unnamedProduct') },
    productInitial(item) { return this.inventoryName(item).trim().slice(0, 1).toUpperCase() || 'C' },
    availableStock(item) { return this.number(item.available_quantity ?? item.inventory_num ?? item.stock ?? item.quantity) },
    reservedStock(item) { return this.number(item.reserved_quantity ?? item.lock_num ?? item.reserved) },
    incomingStock(item) { return this.number(item.incoming_quantity ?? item.inbound_num ?? item.incoming) },
    transactionKey(item) { return item.id || item.bill_no || item.trade_no || JSON.stringify(item).slice(0, 80) },
    amountValue(item) { return this.number(item.running_amount ?? item.amount) },
    transactionType(item) { return item.business_name || item.type_name || this.$t('operations.finance.walletActivity') },
    transactionStatus(item) { return item.status_name || (Number(item.bill_status) === 1 ? this.$t('operations.completed') : this.$t('operations.processing')) },
  },
}
</script>

<style scoped>
.operations-page { position: relative; max-width: 1480px; min-height: calc(100dvh - 72px); margin: 0 auto; padding: 38px 34px 64px; color: #202522; font-size: 16px; }
.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 26px; }.page-kicker { margin: 0 0 7px; color: #b34720; font-size: 13px; font-weight: 800; }.page-header h1 { margin: 0; font-size: clamp(30px, 3vw, 42px); line-height: 1.14; letter-spacing: -.035em; }.page-subtitle { max-width: 760px; margin: 10px 0 0; color: #626a63; font-size: 17px; line-height: 1.55; }
button, input { font: inherit; }.secondary-action, .primary-action { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 9px; font-weight: 800; white-space: nowrap; cursor: pointer; }.secondary-action { padding: 0 16px; border: 1px solid #cfd5cf; background: #fff; color: #343a35; }.secondary-action:hover { border-color: #e85524; color: #b34720; }.secondary-action:disabled { cursor: wait; opacity: .58; }.primary-action { padding: 0 18px; background: #d94f20; color: #fff; }.primary-action:hover { background: #be4218; }
.metric-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-bottom: 20px; border: 1px solid #dce1dc; border-radius: 12px; background: #fff; box-shadow: 0 14px 35px rgba(32, 45, 35, .045); }.metric-strip article { min-height: 128px; display: flex; flex-direction: column; justify-content: center; padding: 22px 24px; border-right: 1px solid #e2e6e2; }.metric-strip article:last-child { border-right: 0; }.metric-strip span { color: #667068; font-size: 14px; font-weight: 700; }.metric-strip strong { margin-top: 7px; color: #202522; font-size: 29px; letter-spacing: -.02em; }.metric-strip small { margin-top: 5px; color: #858d87; font-size: 13px; }
.primary-grid { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(320px, .8fr); gap: 20px; margin-bottom: 20px; }.work-panel { border: 1px solid #dce1dc; border-radius: 12px; background: #fff; box-shadow: 0 14px 35px rgba(32, 45, 35, .04); }.action-panel, .health-panel, .recommendation-panel, .profit-panel, .wallet-panel, .decision-panel { min-height: 310px; padding: 24px; }.section-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; }.section-heading h2 { margin: 0; font-size: 20px; line-height: 1.3; }.section-heading p { margin: 6px 0 0; color: #6d756e; font-size: 14px; line-height: 1.45; }.count-label { min-width: 34px; height: 30px; display: grid; place-items: center; border-radius: 8px; background: #f2f4f1; color: #4f5851; font-size: 14px; font-weight: 900; }
.action-list, .decision-list { margin-top: 18px; }.action-list button, .decision-list a { width: 100%; min-height: 67px; display: grid; grid-template-columns: 40px minmax(0, 1fr) 20px; align-items: center; gap: 12px; padding: 10px 8px; border: 0; border-bottom: 1px solid #e4e7e3; background: transparent; color: #2a302b; text-align: left; cursor: pointer; }.action-list button:last-child, .decision-list a:last-child { border-bottom: 0; }.action-list button:hover, .decision-list a:hover { color: #b34720; }.action-icon { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 9px; background: #fff0e9; color: #d94f20; font-size: 18px; }.action-list strong, .action-list small, .decision-list strong, .decision-list small { display: block; }.action-list strong, .decision-list strong { font-size: 15px; }.action-list small, .decision-list small { margin-top: 4px; color: #717a73; font-size: 13px; line-height: 1.35; }
.health-list { margin-top: 20px; }.health-list > div { min-height: 58px; display: flex; align-items: center; justify-content: space-between; gap: 14px; border-bottom: 1px solid #e4e7e3; }.health-list > div:last-child { border-bottom: 0; }.health-list span { display: flex; align-items: center; gap: 9px; color: #586159; font-size: 14px; }.health-list i { width: 20px; color: #7b847c; font-size: 17px; }.health-list strong { color: #303732; font-size: 14px; }.health-list strong.good { color: #25734e; }.health-list strong.muted { color: #8b928c; }.text-action { min-height: 42px; display: flex; align-items: center; justify-content: space-between; margin-top: 13px; border-top: 1px solid #e4e7e3; color: #b34720; font-size: 14px; font-weight: 800; }
.table-panel { overflow: hidden; }.table-heading { align-items: center; padding: 22px 24px; border-bottom: 1px solid #dfe4df; }.search-control { width: min(310px, 36vw); height: 42px; display: flex; align-items: center; gap: 9px; padding: 0 12px; border: 1px solid #d8ddd8; border-radius: 8px; background: #f6f8f5; }.search-control i { color: #747d75; }.search-control input { width: 100%; border: 0; outline: 0; background: transparent; color: #273029; }.search-control input::placeholder { color: #737c75; }.search-control:focus-within { border-color: #d94f20; box-shadow: 0 0 0 3px rgba(217, 79, 32, .12); }
.responsive-table { overflow-x: auto; }table { width: 100%; border-collapse: collapse; text-align: left; }th { height: 48px; padding: 0 18px; background: #f6f8f5; color: #6b746d; font-size: 12px; font-weight: 800; }td { min-height: 62px; padding: 16px 18px; border-top: 1px solid #e3e7e3; color: #3d463f; font-size: 14px; vertical-align: middle; }td strong, td small { display: block; }td small { margin-top: 4px; color: #7e867f; font-size: 12px; }.row-link, .inline-action { padding: 0; border: 0; background: transparent; color: #273029; font-weight: 800; cursor: pointer; }.row-link:hover, .inline-action { color: #b34720; }.status-badge { display: inline-flex; align-items: center; min-height: 27px; padding: 0 9px; border-radius: 7px; background: #e9f3ed; color: #2d704f; font-size: 12px; font-weight: 800; white-space: nowrap; }.status-badge.warning { background: #fff0e7; color: #a84520; }
.risk-list { margin-top: 18px; }.risk-list > div { min-height: 67px; display: grid; grid-template-columns: 42px minmax(0, 1fr) auto; align-items: center; gap: 12px; border-bottom: 1px solid #e4e7e3; }.risk-list > div:last-child { border-bottom: 0; }.risk-list strong, .risk-list small { display: block; }.risk-list small { margin-top: 4px; color: #747d76; }.risk-list button { min-height: 34px; padding: 0 11px; border: 1px solid #d6dbd6; border-radius: 7px; background: #fff; color: #a84520; font-weight: 800; }.product-monogram { width: 38px; height: 38px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 9px; background: #edf1ec; color: #4d574f; font-weight: 900; }.product-cell { display: flex; align-items: center; gap: 11px; min-width: 220px; }
.finance-grid { grid-template-columns: minmax(0, 1.6fr) minmax(280px, .7fr); }.profit-equation { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; gap: 16px; margin-top: 36px; }.profit-equation > div { min-width: 0; }.profit-equation span, .profit-equation strong { display: block; }.profit-equation span { color: #6a736c; font-size: 13px; }.profit-equation strong { margin-top: 8px; font-size: 25px; }.profit-equation .net { padding: 18px; border-radius: 10px; background: #edf5ef; }.profit-equation .net strong { color: #236c49; }.profit-equation > i { color: #9aa19b; }.panel-note { margin: 28px 0 0; color: #747c76; font-size: 13px; }.wallet-panel { display: flex; flex-direction: column; justify-content: center; background: #262d27; color: #f6f8f5; }.wallet-panel > span { color: #b7c0b8; font-size: 14px; }.wallet-panel > strong { margin: 10px 0; font-size: 34px; }.wallet-panel > small { color: #aab3ab; line-height: 1.45; }.wallet-panel .primary-action { align-self: flex-start; margin-top: 26px; }.amount-positive { color: #25734e; font-weight: 800; }.amount-negative { color: #a94322; font-weight: 800; }
.insight-breakdown { margin-top: 20px; padding: 24px; }.breakdown-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 22px; }.breakdown-grid > div { padding: 4px 22px 4px 0; border-right: 1px solid #e2e6e2; }.breakdown-grid > div:not(:first-child) { padding-left: 22px; }.breakdown-grid > div:last-child { border-right: 0; }.breakdown-grid span, .breakdown-grid strong, .breakdown-grid small { display: block; }.breakdown-grid span { color: #667068; font-size: 13px; font-weight: 700; }.breakdown-grid strong { margin: 9px 0 5px; font-size: 26px; }.breakdown-grid small { color: #858d87; font-size: 12px; }
.notice { min-height: 62px; display: grid; grid-template-columns: 26px minmax(0, 1fr) auto; align-items: center; gap: 12px; margin-bottom: 18px; padding: 12px 16px; border-radius: 10px; }.notice-error { border: 1px solid #efc9bb; background: #fff2ed; color: #883a20; }.notice strong, .notice span { display: block; }.notice span { margin-top: 3px; font-size: 13px; }.notice button { border: 0; background: transparent; color: inherit; font-weight: 900; cursor: pointer; }
.loading-state { padding: 34px; border: 1px solid #dce1dc; border-radius: 12px; background: #fff; }.loading-line { width: 38%; height: 18px; border-radius: 5px; background: #e9ede8; }.loading-line.wide { width: 62%; height: 30px; margin-bottom: 12px; }.loading-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 32px; }.loading-grid span { height: 118px; border-radius: 9px; background: #f0f3ef; }
.detail-drawer { position: fixed; top: 72px; right: 0; z-index: 25; width: min(430px, 100vw); height: calc(100dvh - 72px); padding: 32px; overflow-y: auto; border-left: 1px solid #d7ddd7; background: #fff; box-shadow: -18px 0 45px rgba(28, 39, 31, .12); }.drawer-close { position: absolute; top: 20px; right: 20px; width: 38px; height: 38px; border: 1px solid #d7ddd7; border-radius: 8px; background: #fff; cursor: pointer; }.drawer-label { color: #a84520; font-size: 13px; font-weight: 900; }.detail-drawer h2 { margin: 9px 48px 5px 0; font-size: 26px; }.detail-drawer > p { color: #727b73; }.timeline { margin: 34px 0 0; padding: 0; list-style: none; }.timeline li { position: relative; min-height: 92px; padding: 0 0 24px 36px; border-left: 2px solid #dce1dc; }.timeline li:last-child { border-left-color: transparent; }.timeline li::before { content: ''; position: absolute; top: 2px; left: -8px; width: 14px; height: 14px; border: 3px solid #fff; border-radius: 50%; background: #cbd1cb; box-shadow: 0 0 0 1px #cbd1cb; }.timeline li.done::before { background: #2b7a53; box-shadow: 0 0 0 1px #2b7a53; }.timeline strong, .timeline span { display: block; }.timeline span { margin-top: 6px; color: #737b74; font-size: 13px; line-height: 1.4; }
@media (max-width: 1100px) { .primary-grid { grid-template-columns: 1fr; }.metric-strip, .breakdown-grid { grid-template-columns: repeat(2, 1fr); }.metric-strip article:nth-child(2) { border-right: 0; }.metric-strip article:nth-child(-n+2) { border-bottom: 1px solid #e2e6e2; }.breakdown-grid > div:nth-child(2) { border-right: 0; }.breakdown-grid > div:nth-child(-n+2) { padding-bottom: 22px; }.breakdown-grid > div:nth-child(n+3) { padding-top: 22px; } }
@media (max-width: 700px) { .operations-page { padding: 25px 16px 48px; }.page-header { display: block; }.page-header h1 { font-size: 31px; }.page-subtitle { font-size: 16px; }.secondary-action { margin-top: 18px; }.metric-strip { grid-template-columns: 1fr; }.metric-strip article { min-height: 108px; border-right: 0; border-bottom: 1px solid #e2e6e2; }.metric-strip article:last-child { border-bottom: 0; }.table-heading { display: block; }.search-control { width: 100%; margin-top: 16px; }.profit-equation { grid-template-columns: 1fr; }.profit-equation > i { transform: rotate(90deg); }.breakdown-grid { grid-template-columns: 1fr; }.breakdown-grid > div, .breakdown-grid > div:not(:first-child) { padding: 16px 0; border-right: 0; border-bottom: 1px solid #e2e6e2; }.breakdown-grid > div:last-child { border-bottom: 0; }.detail-drawer { top: 0; height: 100dvh; }.loading-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; } }
</style>
