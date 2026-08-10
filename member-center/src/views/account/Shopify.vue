<template>
  <main class="channels-page">
    <header class="channels-header">
      <div><span class="eyebrow">{{ $t('channels.eyebrow') }}</span><h1>{{ $t('channels.title') }}</h1><p>{{ $t('channels.subtitle') }}</p></div>
    </header>

    <section class="shopify-primary">
      <div class="platform-name shopify-name">Shopify</div>
      <div><h2>{{ $t('channels.shopifyTitle') }}</h2><p>{{ $t('channels.shopifyCopy') }}</p></div>
      <button @click="connectShopify">{{ $t('channels.openShopify') }}</button>
    </section>

    <section v-if="shopifyStarted" class="authorization-next" aria-live="polite">
      <div><strong>{{ $t('channels.finishTitle') }}</strong><p>{{ $t('channels.finishCopy') }}</p></div>
      <button :disabled="loading" @click="loadStores">{{ loading ? $t('channels.checking') : $t('channels.check') }}</button>
    </section>

    <section class="other-channels">
      <article v-for="channel in channelOptions" :key="channel.type" class="channel-card">
        <span class="platform-name">{{ channel.name }}</span>
        <h2>{{ channel.name }}</h2>
        <p>{{ $t(channel.copyKey) }}</p>
        <button @click="openConnection(channel)">{{ $t('channels.connect', { name: channel.name }) }}</button>
      </article>
    </section>

    <section class="custom-channel">
      <div class="custom-channel-mark" aria-hidden="true"><i class="el-icon-connection"></i></div>
      <div class="custom-channel-copy">
        <span class="custom-label">{{ $t('channels.customLabel') }}</span>
        <h2>{{ $t('channels.customTitle') }}</h2>
        <p>{{ $t('channels.customCopy') }}</p>
        <div class="custom-capabilities" :aria-label="$t('channels.customScopeTitle')">
          <span><i class="el-icon-box"></i>{{ $t('channels.scopeProducts') }}</span>
          <span><i class="el-icon-document"></i>{{ $t('channels.scopeOrders') }}</span>
          <span><i class="el-icon-house"></i>{{ $t('channels.scopeInventory') }}</span>
          <span><i class="el-icon-truck"></i>{{ $t('channels.scopeFulfillment') }}</span>
        </div>
      </div>
      <button class="custom-channel-button" type="button" @click="openCustomConnection">
        {{ $t('channels.customAction') }}<i class="el-icon-right" aria-hidden="true"></i>
      </button>
    </section>

    <section class="connected-section">
      <div class="section-heading"><div><span class="eyebrow">{{ $t('channels.authorized') }}</span><h2>{{ $t('channels.realConnections') }}</h2></div><button class="refresh-button" :disabled="loading" @click="loadStores">{{ loading ? $t('common.refreshing') : $t('common.refresh') }}</button></div>
      <div v-if="error" class="inline-error">{{ error }}</div>
      <div v-else-if="loading" class="loading-state">{{ $t('channels.loading') }}</div>
      <div v-else-if="!stores.length" class="empty-state"><h3>{{ $t('channels.emptyTitle') }}</h3><p>{{ $t('channels.emptyCopy') }}</p></div>
      <div v-else class="store-table">
        <div v-for="store in stores" :key="store.id" class="store-row">
          <div><strong>{{ store.store_name || store.shop_name || channelName(store.store_type) }}</strong><p>{{ store.store_url || store.shop_link || $t('channels.storeUrlFallback') }}</p></div>
          <span>{{ channelName(store.store_type) }}</span>
          <span :class="['connection-status', { warning: store.is_authorize == 2 }]">{{ store.is_authorize == 2 ? $t('common.reconnect') : $t('common.connected') }}</span>
          <a v-if="store.store_url" :href="ensureHttps(store.store_url)" target="_blank" rel="noreferrer">{{ $t('channels.viewStore') }}</a>
          <a v-else-if="store.authorize_url" :href="store.authorize_url">{{ $t('channels.reconnect') }}</a>
          <span v-else></span>
        </div>
      </div>
      <router-link v-if="returnTo" class="return-link" :to="returnTo">{{ $t('channels.return') }}</router-link>
    </section>

    <el-dialog :title="$t('channels.dialogTitle', { name: selectedChannel.name || $t('nav.channels') })" :visible.sync="dialogVisible" width="min(520px, 92vw)" append-to-body>
      <div class="dialog-copy">{{ $t('channels.dialogCopy', { name: selectedChannel.name }) }}</div>
      <label v-if="selectedChannel.requiresName" class="dialog-field">{{ $t('channels.storeName') }}<input v-model.trim="connectionForm.name" type="text" :placeholder="$t('channels.storeNamePlaceholder')" /></label>
      <label v-if="selectedChannel.requiresUrl" class="dialog-field">{{ $t('channels.storeUrl') }}<input v-model.trim="connectionForm.url" type="url" :placeholder="$t('channels.storeUrlPlaceholder')" /></label>
      <label v-if="selectedChannel.type === 3" class="dialog-field">{{ $t('channels.region') }}<select v-model="connectionForm.authType"><option value="1">{{ $t('channels.us') }}</option><option value="2">{{ $t('channels.ukEu') }}</option></select></label>
      <div v-if="connectionError" class="inline-error">{{ connectionError }}</div>
      <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button><el-button type="primary" :loading="connecting" @click="confirmConnection">{{ $t('channels.continueAuth') }}</el-button></span>
    </el-dialog>

    <el-dialog :title="$t('channels.customDialogTitle')" :visible.sync="customDialogVisible" width="min(760px, 94vw)" append-to-body custom-class="custom-integration-dialog" @closed="resetCustomForm">
      <div v-if="customSubmitted" class="custom-success" role="status">
        <div class="custom-success-icon"><i class="el-icon-check"></i></div>
        <h2>{{ $t('channels.customSuccessTitle') }}</h2>
        <p>{{ $t('channels.customSuccessCopy') }}</p>
        <button type="button" class="custom-primary-button" @click="customDialogVisible = false">{{ $t('common.close') }}</button>
      </div>
      <form v-else class="custom-form" @submit.prevent="submitCustomConnection">
        <div class="custom-intro">
          <div><strong>{{ $t('channels.customIntroTitle') }}</strong><p>{{ $t('channels.customIntroCopy') }}</p></div>
          <span><i class="el-icon-lock"></i>{{ $t('channels.customSecurity') }}</span>
        </div>

        <div class="custom-form-grid">
          <label class="custom-field">
            <span>{{ $t('channels.customPlatformName') }}</span>
            <input v-model.trim="customForm.platformName" type="text" maxlength="80" :placeholder="$t('channels.customPlatformNamePlaceholder')" />
          </label>
          <label class="custom-field">
            <span>{{ $t('channels.customContactEmail') }}</span>
            <input v-model.trim="customForm.contactEmail" type="email" maxlength="120" placeholder="team@company.com" />
          </label>
          <label class="custom-field">
            <span>{{ $t('channels.customPlatformUrl') }}</span>
            <input v-model.trim="customForm.platformUrl" type="url" placeholder="https://platform.example.com" />
          </label>
          <label class="custom-field">
            <span>{{ $t('channels.customDocsUrl') }}</span>
            <input v-model.trim="customForm.docsUrl" type="url" placeholder="https://docs.example.com/api" />
          </label>
          <label class="custom-field">
            <span>{{ $t('channels.customAuthMethod') }}</span>
            <select v-model="customForm.authMethod">
              <option value="oauth2">OAuth 2.0</option>
              <option value="api-key">API Key</option>
              <option value="other">{{ $t('channels.customAuthOther') }}</option>
            </select>
          </label>
          <label class="custom-field">
            <span>{{ $t('channels.customSandbox') }}</span>
            <select v-model="customForm.sandbox">
              <option value="yes">{{ $t('channels.customSandboxYes') }}</option>
              <option value="no">{{ $t('channels.customSandboxNo') }}</option>
              <option value="unknown">{{ $t('channels.customSandboxUnknown') }}</option>
            </select>
          </label>
        </div>

        <fieldset class="custom-scope">
          <legend>{{ $t('channels.customScopeTitle') }}</legend>
          <p>{{ $t('channels.customScopeCopy') }}</p>
          <div class="scope-grid">
            <label v-for="scope in customScopes" :key="scope.value" :class="{ selected: customForm.scopes.includes(scope.value) }">
              <input v-model="customForm.scopes" type="checkbox" :value="scope.value" />
              <i :class="scope.icon" aria-hidden="true"></i>
              <span><strong>{{ $t(scope.label) }}</strong><small>{{ $t(scope.copy) }}</small></span>
            </label>
          </div>
        </fieldset>

        <label class="custom-field custom-notes">
          <span>{{ $t('channels.customNotes') }} <small>{{ $t('feedback.optional') }}</small></span>
          <textarea v-model.trim="customForm.notes" rows="3" maxlength="800" :placeholder="$t('channels.customNotesPlaceholder')"></textarea>
        </label>

        <div v-if="customFormError" class="inline-error" role="alert">{{ customFormError }}</div>
        <div class="custom-form-footer">
          <p><i class="el-icon-info"></i>{{ $t('channels.customReviewNote') }}</p>
          <div><button type="button" class="custom-secondary-button" @click="customDialogVisible = false">{{ $t('common.cancel') }}</button><button type="submit" class="custom-primary-button" :disabled="customSubmitting">{{ customSubmitting ? $t('channels.customSubmitting') : $t('channels.customSubmit') }}</button></div>
        </div>
      </form>
    </el-dialog>
  </main>
</template>

<script>
import { linkStore, storeList } from '@/api/user'
import { feedbackSubmit } from '@/api/order'

export default {
  data() {
    return {
      stores: [], loading: true, error: '', connecting: false, dialogVisible: false, connectionError: '', selectedChannel: {},
      shopifyStarted: false, returnTo: '', customDialogVisible: false, customSubmitting: false, customSubmitted: false, customFormError: '',
      connectionForm: { name: '', url: '', authType: '1' },
      customForm: { platformName: '', contactEmail: '', platformUrl: '', docsUrl: '', authMethod: 'oauth2', sandbox: 'unknown', scopes: ['products', 'orders'], notes: '' },
      customScopes: [
        { value: 'products', icon: 'el-icon-box', label: 'channels.scopeProducts', copy: 'channels.scopeProductsCopy' },
        { value: 'orders', icon: 'el-icon-document', label: 'channels.scopeOrders', copy: 'channels.scopeOrdersCopy' },
        { value: 'inventory', icon: 'el-icon-house', label: 'channels.scopeInventory', copy: 'channels.scopeInventoryCopy' },
        { value: 'fulfillment', icon: 'el-icon-truck', label: 'channels.scopeFulfillment', copy: 'channels.scopeFulfillmentCopy' },
      ],
      channelOptions: [
        { name: 'Amazon', type: 2, requiresName: true, requiresUrl: true, copyKey: 'channels.amazonCopy' },
        { name: 'TikTok Shop', type: 3, requiresName: false, requiresUrl: false, copyKey: 'channels.tiktokCopy' },
        { name: 'WooCommerce', type: 4, requiresName: false, requiresUrl: true, copyKey: 'channels.wooCopy' },
        { name: 'eBay', type: 5, requiresName: false, requiresUrl: false, copyKey: 'channels.ebayCopy' },
      ],
    }
  },
  created() { this.$emit('menu', 'Shopify') },
  mounted() { this.returnTo = String(this.$route.query.returnTo || ''); this.loadStores() },
  methods: {
    async loadStores() { this.loading = true; this.error = ''; try { const response = await storeList(); this.stores = response.data?.list || [] } catch (error) { this.error = error.message || this.$t('channels.errorUnavailable') } finally { this.loading = false } },
    connectShopify() {
      const opened = window.open('https://apps.shopify.com/codropshipping', '_blank')
      if (!opened) { this.error = this.$t('channels.errorPopup'); return }
      opened.opener = null
      this.shopifyStarted = true
    },
    openConnection(channel) { this.selectedChannel = channel; this.connectionForm = { name: '', url: '', authType: '1' }; this.connectionError = ''; this.dialogVisible = true },
    async confirmConnection() {
      if (this.selectedChannel.requiresName && !this.connectionForm.name) { this.connectionError = this.$t('channels.errorName'); return }
      if (this.selectedChannel.requiresUrl && !/^https?:\/\//i.test(this.connectionForm.url)) { this.connectionError = this.$t('channels.errorUrl'); return }
      this.connecting = true; this.connectionError = ''
      try {
        const payload = { store_type: this.selectedChannel.type }
        if (this.connectionForm.name) payload.shop_name = this.connectionForm.name
        if (this.connectionForm.url) payload.store_url = this.connectionForm.url
        if (this.selectedChannel.type === 3) payload.auth_type = this.connectionForm.authType
        const response = await linkStore(payload)
        if (response.code !== 0 || !response.data?.url) throw new Error(response.msg || this.$t('channels.errorAuthUrl'))
        window.location.assign(response.data.url)
      } catch (error) { this.connectionError = error.message || this.$t('channels.errorStart') }
      finally { this.connecting = false }
    },
    openCustomConnection() { this.customDialogVisible = true; this.customSubmitted = false; this.customFormError = '' },
    resetCustomForm() {
      this.customForm = { platformName: '', contactEmail: '', platformUrl: '', docsUrl: '', authMethod: 'oauth2', sandbox: 'unknown', scopes: ['products', 'orders'], notes: '' }
      this.customFormError = ''; this.customSubmitting = false; this.customSubmitted = false
    },
    validHttps(value) { return /^https:\/\/[^\s]+$/i.test(value) },
    async submitCustomConnection() {
      if (!this.customForm.platformName) { this.customFormError = this.$t('channels.customErrorName'); return }
      if (!/^\S+@\S+\.\S+$/.test(this.customForm.contactEmail)) { this.customFormError = this.$t('channels.customErrorEmail'); return }
      if (!this.validHttps(this.customForm.platformUrl)) { this.customFormError = this.$t('channels.customErrorPlatformUrl'); return }
      if (!this.validHttps(this.customForm.docsUrl)) { this.customFormError = this.$t('channels.customErrorDocsUrl'); return }
      if (!this.customForm.scopes.length) { this.customFormError = this.$t('channels.customErrorScope'); return }
      this.customSubmitting = true; this.customFormError = ''
      try {
        const lines = [
          `[Custom platform integration] ${this.customForm.platformName}`,
          `Contact: ${this.customForm.contactEmail}`,
          `Platform URL: ${this.customForm.platformUrl}`,
          `API docs: ${this.customForm.docsUrl}`,
          `Authentication: ${this.customForm.authMethod}`,
          `Sandbox: ${this.customForm.sandbox}`,
          `Required sync: ${this.customForm.scopes.join(', ')}`,
          this.customForm.notes ? `Notes: ${this.customForm.notes}` : '',
        ].filter(Boolean)
        const response = await feedbackSubmit({ source: 1, type: 'Sales Channels / Custom platform integration', content: lines.join('\n'), severity_level: 1, images: [] })
        if (!response || response.code !== 0) throw new Error(response && response.msg)
        this.customSubmitted = true
      } catch (error) { this.customFormError = (error && error.message && error.message !== 'undefined') ? error.message : this.$t('channels.customSubmitError') }
      finally { this.customSubmitting = false }
    },
    channelName(type) { return ({ 1: 'Shopify', 2: 'Amazon', 3: 'TikTok Shop', 4: 'WooCommerce', 5: 'eBay' })[Number(type)] || 'Sales channel' },
    ensureHttps(url) { return /^https:\/\//i.test(url) ? url : String(url).replace(/^http:\/\//i, 'https://').replace(/^(?!https:\/\/)/, 'https://') },
  },
}
</script>

<style scoped>
.channels-page { min-height: 100%; padding: 32px; background: #f5f6f8; color: #20262e; font-size: 16px; line-height: 1.5; }.channels-header, .shopify-primary, .authorization-next, .other-channels, .custom-channel, .connected-section { max-width: 1440px; margin: 0 auto 20px; }.channels-header h1 { margin: 6px 0; font-size: 34px; }.channels-header p, .shopify-primary p, .authorization-next p, .channel-card p, .custom-channel p, .store-row p, .empty-state p { margin: 0; color: #69727d; }.eyebrow { color: #91421f; font-size: 13px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
.shopify-primary { display: grid; grid-template-columns: 140px minmax(0, 1fr) auto; align-items: center; gap: 28px; padding: 26px; border: 1px solid #cad8bf; border-radius: 12px; background: #f8fbf5; }.shopify-primary h2, .channel-card h2, .connected-section h2 { margin: 4px 0 6px; font-size: 22px; }.platform-name { font-size: 17px; font-weight: 900; color: #343b44; }.shopify-name { font-size: 24px; color: #5b8e3e; }.shopify-primary button, .channel-card button { min-height: 42px; border: 1px solid #d65119; border-radius: 8px; padding: 0 10px; background: #e85c20; color: #fff; font-size: 14px; font-weight: 800; cursor: pointer; white-space: nowrap; }
.authorization-next { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 18px 22px; border: 1px solid #d7dde4; border-radius: 11px; background: #fff; }.authorization-next strong { display: block; margin-bottom: 4px; font-size: 17px; }.authorization-next button, .return-link { min-height: 40px; border: 1px solid #c55224; border-radius: 8px; padding: 0 15px; display: inline-flex; align-items: center; justify-content: center; background: #fff; color: #a13f19; font: inherit; font-weight: 800; cursor: pointer; white-space: nowrap; }
.other-channels { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }.channel-card { min-height: 238px; display: flex; flex-direction: column; align-items: flex-start; padding: 22px; border: 1px solid #dfe3e8; border-radius: 11px; background: #fff; }.channel-card p { flex: 1; margin-bottom: 20px; }.channel-card button { width: 100%; background: #fff; color: #b9471a; }
.custom-channel{display:grid;grid-template-columns:64px minmax(0,1fr) auto;align-items:center;gap:22px;padding:24px 26px;border:1px solid #d9d9d3;border-radius:12px;background:#252b26;color:#f7f8f5;box-shadow:0 12px 30px rgba(34,42,35,.08)}.custom-channel-mark{display:grid;place-items:center;width:58px;height:58px;border-radius:12px;background:#ef5a1c;color:#fff;font-size:25px}.custom-channel-copy h2{margin:4px 0 5px;font-size:22px}.custom-channel-copy p{max-width:720px!important;color:#bbc1ba!important}.custom-label{color:#ff9366;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase}.custom-capabilities{display:flex;flex-wrap:wrap;gap:14px;margin-top:14px;color:#d9ddd7;font-size:13px}.custom-capabilities span{display:inline-flex;align-items:center;gap:6px}.custom-capabilities i{color:#ff7b43}.custom-channel-button{min-height:44px;padding:0 17px;border:1px solid #ef5a1c;border-radius:8px;background:#ef5a1c;color:#fff;font:inherit;font-weight:800;white-space:nowrap;cursor:pointer}.custom-channel-button i{margin-left:8px}.custom-channel-button:hover,.custom-primary-button:hover{background:#d94d13}.custom-channel-button:active,.custom-primary-button:active,.custom-secondary-button:active{transform:translateY(1px)}
.connected-section { padding: 26px; border: 1px solid #dfe3e8; border-radius: 12px; background: #fff; }.section-heading { display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 18px; }.refresh-button { border: 1px solid #cbd1d8; border-radius: 7px; padding: 9px 14px; background: #fff; color: #3f4852; font-weight: 700; cursor: pointer; }.store-table { border: 1px solid #e1e5e9; border-radius: 9px; overflow: hidden; }.store-row { display: grid; grid-template-columns: minmax(0, 1fr) 130px 150px 90px; align-items: center; gap: 16px; padding: 15px; border-bottom: 1px solid #e7e9ec; }.store-row:last-child { border-bottom: 0; }.store-row a { color: #b9471a; font-weight: 800; }.connection-status { color: #356248; font-weight: 800; }.connection-status.warning { color: #9a4b26; }.empty-state, .loading-state { padding: 28px; border-radius: 9px; background: #f6f7f8; }.empty-state h3 { margin: 0 0 5px; }.return-link { margin-top: 18px; }.inline-error { margin: 12px 0; padding: 12px; border-radius: 8px; background: #fff0ed; color: #97382f; }.dialog-copy { margin-bottom: 18px; color: #69727d; }.dialog-field { display: grid; gap: 7px; margin-top: 16px; font-weight: 700; }.dialog-field input, .dialog-field select { height: 42px; border: 1px solid #cfd5dc; border-radius: 8px; padding: 0 11px; font: inherit; }
.custom-form{color:#252c27}.custom-intro{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:15px 17px;border-radius:10px;background:#f4f6f3}.custom-intro strong{display:block;font-size:16px}.custom-intro p{margin:4px 0 0;color:#697269;font-size:13px;line-height:1.5}.custom-intro>span{display:inline-flex;align-items:center;gap:7px;flex:0 0 auto;color:#397256;font-size:12px;font-weight:700}.custom-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}.custom-field{display:grid;gap:7px;color:#394039;font-size:13px;font-weight:700}.custom-field input,.custom-field select,.custom-field textarea{box-sizing:border-box;width:100%;border:1px solid #cfd6cf;border-radius:8px;background:#fff;color:#252c27;font:inherit;font-size:14px;outline:0}.custom-field input,.custom-field select{height:43px;padding:0 12px}.custom-field textarea{padding:11px 12px;line-height:1.5;resize:vertical}.custom-field input:focus,.custom-field select:focus,.custom-field textarea:focus{border-color:#e8511b;box-shadow:0 0 0 3px rgba(232,81,27,.1)}.custom-field>span small{color:#858e86;font-weight:500}.custom-scope{margin:22px 0 0;padding:0;border:0}.custom-scope legend{color:#303730;font-size:14px;font-weight:800}.custom-scope>p{margin:4px 0 12px;color:#788178;font-size:12px}.scope-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.scope-grid label{display:grid;grid-template-columns:18px 24px 1fr;align-items:start;gap:9px;padding:13px;border:1px solid #d9dfd9;border-radius:9px;background:#fff;cursor:pointer}.scope-grid label.selected{border-color:#e8511b;background:#fff8f4}.scope-grid input{width:16px;height:16px;margin:2px 0 0;accent-color:#e8511b}.scope-grid label>i{margin-top:2px;color:#6e786f;font-size:17px}.scope-grid label.selected>i{color:#e8511b}.scope-grid strong,.scope-grid small{display:block}.scope-grid strong{font-size:13px}.scope-grid small{margin-top:3px;color:#7a837b;font-size:11px;line-height:1.35}.custom-notes{margin-top:20px}.custom-form-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:22px;padding-top:18px;border-top:1px solid #e2e6e1}.custom-form-footer p{margin:0;color:#6f786f;font-size:12px}.custom-form-footer p i{margin-right:6px;color:#397256}.custom-form-footer>div{display:flex;gap:8px}.custom-primary-button,.custom-secondary-button{min-height:42px;padding:0 16px;border-radius:8px;font:inherit;font-size:14px;font-weight:800;white-space:nowrap;cursor:pointer}.custom-primary-button{border:1px solid #e8511b;background:#e8511b;color:#fff}.custom-primary-button:disabled{border-color:#efab93;background:#efab93;cursor:wait}.custom-secondary-button{border:1px solid #cfd6cf;background:#fff;color:#394139}.custom-success{padding:28px 16px 18px;text-align:center}.custom-success-icon{display:grid;place-items:center;width:52px;height:52px;margin:0 auto 18px;border-radius:12px;background:#e7f4eb;color:#2b754d;font-size:24px}.custom-success h2{margin:0;font-size:23px}.custom-success p{max-width:500px;margin:8px auto 22px;color:#697269;line-height:1.55}
@media (max-width: 1100px) { .other-channels { grid-template-columns: repeat(2, minmax(0, 1fr)); }.shopify-primary { grid-template-columns: 120px 1fr; }.shopify-primary button { grid-column: 2; justify-self: start; }.custom-channel{grid-template-columns:58px 1fr}.custom-channel-button{grid-column:2;justify-self:start} } @media (max-width: 720px) { .channels-page { padding: 18px; }.channels-header h1 { font-size: 28px; }.shopify-primary { grid-template-columns: 1fr; }.shopify-primary button { grid-column: 1; width: 100%; }.authorization-next { align-items: stretch; flex-direction: column; }.authorization-next button { width: 100%; }.other-channels { grid-template-columns: 1fr; }.channel-card { min-height: 0; }.custom-channel{grid-template-columns:1fr;padding:21px}.custom-channel-button{grid-column:1;width:100%}.custom-capabilities{display:grid;grid-template-columns:1fr 1fr}.custom-form-grid,.scope-grid{grid-template-columns:1fr}.custom-intro,.custom-form-footer{align-items:stretch;flex-direction:column}.custom-form-footer>div{display:grid;grid-template-columns:1fr 1fr}.store-row { grid-template-columns: 1fr auto; }.store-row > span:nth-of-type(1) { display: none; }.section-heading { align-items: flex-start; } }
</style>
