<template>
  <div class="workspace-shell" :class="{ 'nav-open': mobileOpen }" @keydown.esc="closeAllMenus">
    <button v-if="mobileOpen" class="nav-scrim" type="button" :aria-label="$t('common.close')" @click="mobileOpen = false"></button>
    <aside class="workspace-nav">
      <div class="brand-block">
        <a :href="storefrontUrl" class="brand-mark" aria-label="CoDropshipping">Co</a>
        <div><strong>CoDropshipping</strong><span>{{ $t('brand.workspace') }}</span></div>
      </div>

      <nav :aria-label="$t('nav.primary')">
        <router-link v-for="item in navigation" :key="item.key" :to="item.to" @click.native="mobileOpen = false">
          <i :class="item.icon" aria-hidden="true"></i><span>{{ $t(`nav.${item.key}`) }}</span>
        </router-link>
      </nav>

      <div class="nav-footer">
        <div class="sidebar-popover-anchor">
          <button class="help-trigger workspace-menu-trigger" type="button" :aria-expanded="supportOpen ? 'true' : 'false'" @click.stop="toggleSupport">
            <i class="el-icon-question" aria-hidden="true"></i><span>{{ $t('nav.help') }}</span><i :class="supportOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" aria-hidden="true"></i>
          </button>
          <div v-if="supportOpen" class="workspace-popover sidebar-popover support-popover">
            <div class="popover-heading"><strong>{{ $t('support.title') }}</strong><span>{{ $t('support.copy') }}</span></div>
            <router-link :to="{ path: '/main/issus', query: { from: $route.fullPath } }" @click.native="closeAllMenus"><i class="el-icon-chat-line-square"></i><span><strong>{{ $t('support.feedback') }}</strong><small>{{ $t('support.feedbackCopy') }}</small></span></router-link>
            <a href="https://codropshipping.com/contact" target="_blank" rel="noreferrer" @click="closeAllMenus"><i class="el-icon-service"></i><span><strong>{{ $t('support.contact') }}</strong><small>{{ $t('support.contactCopy') }}</small></span><i class="el-icon-top-right"></i></a>
          </div>
        </div>

        <div class="sidebar-popover-anchor">
          <button class="account-summary workspace-menu-trigger" type="button" :aria-expanded="sidebarAccountOpen ? 'true' : 'false'" @click.stop="toggleSidebarAccount">
            <span class="account-avatar">{{ initials }}</span>
            <span class="account-copy"><strong>{{ accountName }}</strong><span>{{ $t('header.account') }}</span></span>
            <i :class="sidebarAccountOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" aria-hidden="true"></i>
          </button>
          <div v-if="sidebarAccountOpen" class="workspace-popover sidebar-popover account-popover">
            <div class="popover-heading"><strong>{{ accountName }}</strong><span>{{ account.email || $t('header.accountFallback') }}</span></div>
            <router-link to="/account/profile" @click.native="closeAllMenus"><i class="el-icon-user"></i>{{ $t('account.profile') }}</router-link>
            <router-link to="/account/wallet" @click.native="closeAllMenus"><i class="el-icon-wallet"></i>{{ $t('account.wallet') }}</router-link>
            <router-link to="/account/changePassword" @click.native="closeAllMenus"><i class="el-icon-lock"></i>{{ $t('account.security') }}</router-link>
            <button type="button" class="logout-action" @click="logout"><i class="el-icon-switch-button"></i>{{ $t('header.logout') }}</button>
          </div>
        </div>
      </div>
    </aside>

    <div class="workspace-main">
      <header class="workspace-topbar">
        <div class="topbar-start"><button class="mobile-menu" type="button" :aria-label="$t('header.menu')" @click="mobileOpen = true"><i class="el-icon-menu" aria-hidden="true"></i></button></div>

        <div class="global-search">
          <form class="workspace-search" role="search" @submit.prevent="runGlobalSearch">
            <i class="el-icon-search" aria-hidden="true"></i>
            <input v-model.trim="searchQuery" type="search" :placeholder="$t('header.search')" :aria-label="$t('header.search')" @focus="searchOpen = true" />
            <button v-if="searchQuery" type="button" :aria-label="$t('search.clear')" @click="clearSearch"><i class="el-icon-close"></i></button>
            <kbd>Enter</kbd>
          </form>

          <section v-if="searchOpen" class="workspace-popover search-popover" :aria-label="$t('search.results')">
            <div v-if="searchLoading" class="search-loading"><span></span><span></span><span></span></div>
            <template v-else-if="searchPerformed">
              <div v-if="searchError" class="search-state error"><i class="el-icon-warning-outline"></i><span><strong>{{ $t('search.errorTitle') }}</strong><small>{{ searchError }}</small></span></div>
              <template v-else>
                <div v-if="productResults.length" class="result-group">
                  <div class="result-heading"><span>{{ $t('search.products') }}</span><router-link :to="{ path: '/account/ProductList', query: { q: searchQuery } }" @click.native="closeAllMenus">{{ $t('search.viewAll') }}</router-link></div>
                  <a v-for="product in productResults" :key="`product-${product.id}`" :href="productHref(product)" class="search-result" @click="closeAllMenus">
                    <span class="result-icon"><i class="el-icon-box"></i></span><span><strong>{{ product.subject }}</strong><small>{{ $t('search.productNumber', { value: product.goods_id || product.id }) }}</small></span><i class="el-icon-arrow-right"></i>
                  </a>
                </div>
                <div v-if="orderResults.length" class="result-group">
                  <div class="result-heading"><span>{{ $t('search.orders') }}</span><router-link :to="{ path: '/account/storeOrder', query: { q: searchQuery } }" @click.native="closeAllMenus">{{ $t('search.viewAll') }}</router-link></div>
                  <router-link v-for="order in orderResults" :key="`order-${order.id || order.order_number}`" :to="orderLink(order)" class="search-result" @click.native="closeAllMenus">
                    <span class="result-icon"><i class="el-icon-document"></i></span><span><strong>{{ orderName(order) }}</strong><small>{{ order.store_name || 'Shopify' }}</small></span><i class="el-icon-arrow-right"></i>
                  </router-link>
                </div>
                <div v-if="!productResults.length && !orderResults.length" class="search-state"><i class="el-icon-search"></i><span><strong>{{ $t('search.emptyTitle') }}</strong><small>{{ $t('search.emptyCopy') }}</small></span></div>
                <router-link class="tracking-action" :to="{ path: '/order/tracking', query: { q: searchQuery } }" @click.native="closeAllMenus"><i class="el-icon-location-outline"></i><span><strong>{{ $t('search.trackTitle') }}</strong><small>{{ $t('search.trackCopy', { value: searchQuery }) }}</small></span><i class="el-icon-arrow-right"></i></router-link>
              </template>
            </template>
            <div v-else class="search-guide">
              <span><i class="el-icon-box"></i>{{ $t('search.guideProducts') }}</span><span><i class="el-icon-document"></i>{{ $t('search.guideOrders') }}</span><span><i class="el-icon-location-outline"></i>{{ $t('search.guideTracking') }}</span>
            </div>
          </section>
        </div>

        <div class="topbar-actions">
          <GlobalLanguageSelect class="topbar-language" :show-label="false" />
          <div class="topbar-popover-anchor">
            <button class="topbar-icon workspace-menu-trigger" type="button" :aria-label="$t('header.notifications')" :aria-expanded="notificationOpen ? 'true' : 'false'" @click.stop="toggleNotifications">
              <i class="el-icon-bell" aria-hidden="true"></i><span v-if="unreadNotifications" class="notification-count">{{ unreadNotifications > 9 ? '9+' : unreadNotifications }}</span>
            </button>
            <section v-if="notificationOpen" class="workspace-popover topbar-popover notification-popover" :aria-label="$t('header.notifications')">
              <div class="popover-title"><div><strong>{{ $t('notifications.title') }}</strong><span>{{ $t('notifications.copy') }}</span></div><button type="button" :aria-label="$t('common.refresh')" :disabled="notificationLoading" @click="loadNotifications"><i :class="notificationLoading ? 'el-icon-loading' : 'el-icon-refresh'"></i></button></div>
              <div v-if="notificationLoading" class="notification-loading"><span></span><span></span></div>
              <div v-else-if="notificationError" class="notification-state"><i class="el-icon-warning-outline"></i><strong>{{ $t('notifications.error') }}</strong><button type="button" @click="loadNotifications">{{ $t('common.retry') }}</button></div>
              <div v-else-if="!notifications.length" class="notification-state"><i class="el-icon-bell"></i><strong>{{ $t('notifications.empty') }}</strong><span>{{ $t('notifications.emptyCopy') }}</span></div>
              <button v-else v-for="notice in notifications" :key="notice.id || notice.msg" class="notification-item" type="button" @click="openNotification(notice)"><span :class="['notice-icon', { unread: notice.is_read == 0 }]"><i class="el-icon-message"></i></span><span><strong>{{ notificationText(notice) }}</strong><small>{{ notice.created_at || notice.created_data || $t('notifications.recent') }}</small></span><i class="el-icon-arrow-right"></i></button>
            </section>
          </div>
          <div class="topbar-popover-anchor">
            <button class="topbar-avatar workspace-menu-trigger" type="button" :aria-label="$t('account.openMenu')" :aria-expanded="topAccountOpen ? 'true' : 'false'" @click.stop="toggleTopAccount">{{ initials }}</button>
            <div v-if="topAccountOpen" class="workspace-popover topbar-popover account-popover">
              <div class="popover-heading"><strong>{{ accountName }}</strong><span>{{ account.email || $t('header.accountFallback') }}</span></div>
              <router-link to="/account/profile" @click.native="closeAllMenus"><i class="el-icon-user"></i>{{ $t('account.profile') }}</router-link>
              <router-link to="/account/wallet" @click.native="closeAllMenus"><i class="el-icon-wallet"></i>{{ $t('account.wallet') }}</router-link>
              <router-link to="/account/changePassword" @click.native="closeAllMenus"><i class="el-icon-lock"></i>{{ $t('account.security') }}</router-link>
              <button type="button" class="logout-action" @click="logout"><i class="el-icon-switch-button"></i>{{ $t('header.logout') }}</button>
            </div>
          </div>
        </div>
      </header>
      <div class="workspace-content"><router-view /></div>
    </div>
  </div>
</template>

<script>
import GlobalLanguageSelect from '@/components/GlobalLanguageSelect.vue'
import { getGoods, getOrderList } from '@/api/dropshipping'
import { getNotice, setNotice } from '@/api/user'

export default {
  name: 'WorkspaceShell',
  components: { GlobalLanguageSelect },
  data() {
    return {
      mobileOpen: false, searchOpen: false, searchLoading: false, searchPerformed: false, searchQuery: '', searchError: '', productResults: [], orderResults: [],
      notificationOpen: false, notificationLoading: false, notificationError: '', notifications: [], topAccountOpen: false, sidebarAccountOpen: false, supportOpen: false,
      storefrontUrl: `${window.location.protocol}//${window.location.host.replace(':8083', ':3000')}`,
      navigation: [
        { key: 'overview', to: '/main/dashboard', icon: 'el-icon-s-home' }, { key: 'studio', to: '/workspace/studio', icon: 'el-icon-magic-stick' }, { key: 'products', to: '/account/ProductList', icon: 'el-icon-box' },
        { key: 'channels', to: '/account/Shopify', icon: 'el-icon-connection' }, { key: 'orders', to: '/workspace/orders', icon: 'el-icon-document' }, { key: 'fulfillment', to: '/workspace/fulfillment', icon: 'el-icon-truck' },
        { key: 'inventory', to: '/workspace/inventory', icon: 'el-icon-house' }, { key: 'finance', to: '/workspace/finance', icon: 'el-icon-wallet' }, { key: 'insights', to: '/workspace/insights', icon: 'el-icon-data-line' },
      ],
    }
  },
  computed: {
    account() { try { return JSON.parse(window.localStorage.getItem('userInfo') || '{}') } catch { return {} } },
    accountName() { return this.account.user_name || this.account.name || this.account.email || this.$t('header.accountFallback') },
    initials() { return String(this.accountName).split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'CO' },
    unreadNotifications() { return this.notifications.filter((item) => Number(item.is_read) === 0).length },
  },
  mounted() { document.addEventListener('click', this.handleDocumentClick); this.loadNotifications() },
  beforeDestroy() { document.removeEventListener('click', this.handleDocumentClick) },
  methods: {
    handleDocumentClick(event) { if (!event.target.closest('.workspace-popover') && !event.target.closest('.workspace-menu-trigger') && !event.target.closest('.workspace-search')) this.closeAllMenus() },
    closeAllMenus() { this.searchOpen = false; this.notificationOpen = false; this.topAccountOpen = false; this.sidebarAccountOpen = false; this.supportOpen = false },
    toggleSupport() { const next = !this.supportOpen; this.closeAllMenus(); this.supportOpen = next },
    toggleSidebarAccount() { const next = !this.sidebarAccountOpen; this.closeAllMenus(); this.sidebarAccountOpen = next },
    toggleTopAccount() { const next = !this.topAccountOpen; this.closeAllMenus(); this.topAccountOpen = next },
    toggleNotifications() { const next = !this.notificationOpen; this.closeAllMenus(); this.notificationOpen = next; if (next) this.loadNotifications() },
    clearSearch() { this.searchQuery = ''; this.searchPerformed = false; this.productResults = []; this.orderResults = []; this.searchError = ''; this.searchOpen = true },
    async runGlobalSearch() {
      if (!this.searchQuery) { this.searchOpen = true; this.searchPerformed = false; return }
      this.searchOpen = true; this.searchLoading = true; this.searchPerformed = true; this.searchError = ''
      const productRequest = getGoods(JSON.stringify({ subject: this.searchQuery, pageIndex: 1 }))
      const orderRequest = getOrderList({ order_number: this.searchQuery, local_order_status: '', store_type: '', store_id: '', pageCount: 6, pageIndex: 1 })
      const [products, orders] = await Promise.allSettled([productRequest, orderRequest])
      this.productResults = products.status === 'fulfilled' ? (products.value.data && products.value.data.list || []).slice(0, 4) : []
      this.orderResults = orders.status === 'fulfilled' ? (orders.value.data && orders.value.data.list || []).slice(0, 4) : []
      if (products.status === 'rejected' && orders.status === 'rejected') this.searchError = this.$t('search.errorCopy')
      this.searchLoading = false
    },
    productHref(product) { return `/productDetail?id=${encodeURIComponent(product.goods_id || product.id)}&source=${encodeURIComponent(product.source || 1)}` },
    orderName(order) { return order.order_number || order.shopify_order_number || order.store_order_number || this.$t('search.orderFallback') },
    orderLink(order) { return { path: '/account/storeOrderDetails', query: { id: order.id } } },
    async loadNotifications() {
      this.notificationLoading = true; this.notificationError = ''
      try { const response = await getNotice(); const data = response.data || {}; this.notifications = Array.isArray(data) ? data : Array.isArray(data.list) ? data.list : data.msg ? [data] : [] }
      catch (error) { this.notificationError = error.message || this.$t('notifications.error') }
      finally { this.notificationLoading = false }
    },
    notificationText(notice) { return notice.msg || notice.title || this.$t('notifications.fallback') },
    async openNotification(notice) {
      if (notice.id && notice.customer_id && notice.is_read == 0) { try { await setNotice({ customer_id: notice.customer_id, msg_id: notice.id, type: 1 }); this.$set(notice, 'is_read', 1) } catch {} }
      this.notificationOpen = false
      if (notice.msg_link === 'super') this.$router.push({ name: 'memberReview' })
      else if (notice.freightOrderId) this.$router.push(`/order/forwardingOrder/${notice.freightOrderId}`)
    },
    async logout() { try { await this.$store.dispatch('userLogout') } finally { this.$router.push('/login') } },
  },
}
</script>

<style scoped>
.workspace-shell{--accent:#e85524;--ink:#202522;--muted:#69706b;--line:#dfe3de;min-height:100dvh;display:grid;grid-template-columns:264px minmax(0,1fr);background:#f4f6f3;color:var(--ink);font-family:Arial,"PingFang SC","Microsoft YaHei",sans-serif;font-size:16px}.workspace-nav{position:sticky;top:0;z-index:40;height:100dvh;display:flex;flex-direction:column;padding:22px 16px 18px;border-right:1px solid #303630;background:#202521;color:#f5f7f4}.brand-block{min-height:58px;display:flex;align-items:center;gap:12px;padding:0 8px 19px;border-bottom:1px solid #343b35}.brand-mark{width:38px;height:38px;display:grid;place-items:center;flex:0 0 auto;border-radius:10px;background:var(--accent);color:#fff;font-size:15px;font-weight:900}.brand-block strong,.brand-block span{display:block}.brand-block strong{font-size:16px}.brand-block span{margin-top:3px;color:#aeb6af;font-size:13px}.workspace-nav nav{flex:1;display:grid;align-content:start;gap:5px;padding:22px 0;overflow-y:auto}.workspace-nav nav a{min-height:46px;display:flex;align-items:center;gap:13px;padding:0 13px;border-left:3px solid transparent;border-radius:8px;color:#c8cec9;font-weight:700}.workspace-nav nav a i{width:22px;color:#aeb6af;font-size:19px;text-align:center}.workspace-nav nav a:hover{background:#2a302b;color:#fff}.workspace-nav nav a.router-link-active{border-left-color:var(--accent);background:#343a35;color:#fff}.workspace-nav nav a.router-link-active i{color:#ff8a5f}.nav-footer{position:relative;border-top:1px solid #343b35;padding-top:10px}.sidebar-popover-anchor{position:relative}.help-trigger{width:100%;min-height:42px;display:grid;grid-template-columns:23px minmax(0,1fr) 18px;align-items:center;gap:8px;padding:0 10px;border:0;border-radius:8px;background:transparent;color:#c8cec9;font:inherit;font-weight:700;text-align:left;cursor:pointer}.help-trigger:hover{background:#2a302b;color:#fff}.account-summary{width:100%;margin-top:6px;display:grid;grid-template-columns:38px minmax(0,1fr) 18px;align-items:center;gap:10px;padding:10px;border:1px solid #3b423c;border-radius:10px;background:#282e29;color:#f5f7f4;font:inherit;text-align:left;cursor:pointer}.account-summary:hover{border-color:#525b53;background:#2d342e}.account-avatar,.topbar-avatar{display:grid;place-items:center;border-radius:9px;background:#f0eee7;color:#3a403b;font-size:13px;font-weight:900}.account-avatar{width:38px;height:38px}.account-copy strong,.account-copy span{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.account-copy strong{font-size:14px}.account-copy span{margin-top:3px;color:#aeb6af;font-size:12px}.workspace-main{min-width:0}.workspace-topbar{position:sticky;top:0;z-index:30;min-height:72px;display:grid;grid-template-columns:minmax(48px,1fr) minmax(340px,720px) minmax(max-content,1fr);align-items:center;gap:18px;padding:0 28px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.97)}.topbar-start{justify-self:start}.global-search{position:relative;width:100%;grid-column:2}.workspace-search{width:100%;height:44px;display:grid;grid-template-columns:20px minmax(0,1fr) auto auto;align-items:center;gap:9px;padding:0 11px 0 14px;border:1px solid #d9ded9;border-radius:9px;background:#f4f6f3}.workspace-search:focus-within{border-color:#e06b3c;box-shadow:0 0 0 3px rgba(232,85,36,.12)}.workspace-search>i{color:#7b837c}.workspace-search input{width:100%;border:0;outline:0;background:transparent;color:var(--ink);font:inherit}.workspace-search input::placeholder{color:#747c75}.workspace-search button{width:28px;height:28px;border:0;border-radius:6px;background:transparent;color:#687069;cursor:pointer}.workspace-search button:hover{background:#e7eae6}.workspace-search kbd{padding:4px 7px;border:1px solid #d6dbd6;border-bottom-width:2px;border-radius:6px;background:#fff;color:#7a827b;font:11px Arial}.topbar-actions{grid-column:3;justify-self:end;display:flex;align-items:center;gap:9px}.topbar-popover-anchor{position:relative}.topbar-icon,.mobile-menu,.topbar-avatar{width:42px;height:42px;border:1px solid #d9ded9;border-radius:9px;background:#fff;color:#424943;font-size:18px;cursor:pointer}.topbar-avatar{font-size:13px}.topbar-icon:hover,.topbar-avatar:hover,.mobile-menu:hover{border-color:#c0c8c0;background:#f6f7f5}.notification-count{position:absolute;top:-5px;right:-5px;min-width:19px;height:19px;padding:0 4px;display:grid;place-items:center;border:2px solid #fff;border-radius:999px;background:var(--accent);color:#fff;font-size:10px;font-weight:900}.mobile-menu{display:none}.workspace-content{min-height:calc(100dvh - 72px)}.nav-scrim{display:none}.workspace-popover{position:absolute;z-index:60;border:1px solid #d9ded9;border-radius:12px;background:#fff;color:#242b26;box-shadow:0 18px 50px rgba(30,42,33,.16)}.search-popover{top:52px;left:0;width:100%;max-height:min(620px,calc(100vh - 90px));overflow-y:auto;padding:10px}.search-guide{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.search-guide span{min-height:76px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border-radius:8px;background:#f6f7f5;color:#687168;font-size:12px;text-align:center}.search-guide i{color:#c04b20;font-size:18px}.search-loading,.notification-loading{display:grid;gap:9px;padding:12px}.search-loading span,.notification-loading span{height:44px;border-radius:8px;background:#eef1ed;animation:pulse 1.2s ease-in-out infinite}.result-group+.result-group{margin-top:9px;padding-top:9px;border-top:1px solid #e5e8e4}.result-heading{display:flex;justify-content:space-between;align-items:center;padding:7px 9px;color:#737b74;font-size:12px;font-weight:800}.result-heading a{color:#b6471d}.search-result,.tracking-action{display:grid;grid-template-columns:38px minmax(0,1fr) 18px;align-items:center;gap:10px;padding:9px;border-radius:8px;color:#2b332d}.search-result:hover,.tracking-action:hover{background:#f3f5f1}.search-result strong,.search-result small,.tracking-action strong,.tracking-action small{display:block}.search-result strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px}.search-result small,.tracking-action small{margin-top:3px;color:#798179;font-size:12px}.result-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:8px;background:#eef2ed;color:#59645b}.tracking-action{margin-top:9px;border-top:1px solid #e5e8e4;border-radius:0 0 8px 8px;color:#a9431d}.search-state{min-height:110px;display:flex;align-items:center;justify-content:center;gap:12px;padding:20px;text-align:left}.search-state>i{color:#bd4a20;font-size:24px}.search-state strong,.search-state small{display:block}.search-state small{margin-top:4px;color:#788078}.search-state.error{color:#8f3b31}.sidebar-popover{left:0;bottom:52px;width:232px;padding:8px}.support-popover{bottom:45px}.topbar-popover{top:50px;right:0;width:330px;padding:8px}.notification-popover{width:380px;max-height:520px;overflow-y:auto}.popover-heading{padding:10px 10px 12px;border-bottom:1px solid #e5e8e4}.popover-heading strong,.popover-heading span{display:block;overflow:hidden;text-overflow:ellipsis}.popover-heading span{margin-top:3px;color:#7b837c;font-size:12px}.account-popover>a,.account-popover>button,.support-popover>a{width:100%;min-height:43px;display:flex;align-items:center;gap:10px;padding:0 10px;border:0;border-radius:8px;background:transparent;color:#343c36;font:inherit;font-weight:700;text-align:left;cursor:pointer}.account-popover>a:hover,.account-popover>button:hover,.support-popover>a:hover{background:#f2f4f1;color:#a9431d}.account-popover i,.support-popover>a>i:first-child{width:20px;text-align:center}.support-popover>a{height:auto;padding-top:9px;padding-bottom:9px;display:grid;grid-template-columns:24px minmax(0,1fr) 18px}.support-popover>a strong,.support-popover>a small{display:block}.support-popover>a small{margin-top:3px;color:#7a827b;font-size:11px;font-weight:400}.logout-action{margin-top:5px;border-top:1px solid #e5e8e4!important;color:#9c3d34!important}.popover-title{display:flex;align-items:center;justify-content:space-between;padding:10px}.popover-title strong,.popover-title span{display:block}.popover-title span{margin-top:3px;color:#7b837c;font-size:12px}.popover-title button{width:34px;height:34px;border:0;border-radius:7px;background:#f2f4f1;color:#5b655d;cursor:pointer}.notification-state{min-height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;padding:24px;color:#737c74;text-align:center}.notification-state>i{color:#c04b20;font-size:23px}.notification-state button{border:0;background:transparent;color:#ad441e;font-weight:800}.notification-item{width:100%;min-height:66px;display:grid;grid-template-columns:38px minmax(0,1fr) 18px;align-items:center;gap:10px;padding:8px;border:0;border-top:1px solid #e7eae6;background:#fff;color:#303832;text-align:left;cursor:pointer}.notification-item:hover{background:#f5f7f4}.notification-item strong,.notification-item small{display:block}.notification-item strong{font-size:13px;line-height:1.4}.notification-item small{margin-top:4px;color:#7d857e;font-size:11px}.notice-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:8px;background:#edf0ec;color:#747d75}.notice-icon.unread{background:#fff0e8;color:#c04b20}@keyframes pulse{50%{opacity:.52}}@media(max-width:1180px){.workspace-topbar{grid-template-columns:auto minmax(260px,1fr) auto}.topbar-language{display:none}.global-search{grid-column:2}.topbar-actions{grid-column:3}}@media(max-width:980px){.workspace-shell{grid-template-columns:1fr}.workspace-nav{position:fixed;left:0;transform:translateX(-102%);width:274px;transition:transform .18s ease}.nav-open .workspace-nav{transform:translateX(0)}.nav-scrim{position:fixed;inset:0;z-index:35;display:block;border:0;background:rgba(20,25,21,.48)}.mobile-menu{display:block}.workspace-topbar{padding:0 18px}.topbar-start{display:block}}@media(max-width:650px){.workspace-topbar{grid-template-columns:auto minmax(0,1fr) auto;gap:8px;padding:0 10px}.workspace-search{grid-template-columns:18px minmax(0,1fr) auto}.workspace-search kbd{display:none}.workspace-search input{font-size:14px}.topbar-avatar{display:none}.notification-popover{position:fixed;top:64px;right:10px;left:10px;width:auto}.search-guide{grid-template-columns:1fr}.search-popover{position:fixed;top:64px;right:10px;left:10px;width:auto}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
</style>
