<template>
  <main class="address-page" :aria-busy="loading || saving ? 'true' : 'false'">
    <header class="page-header">
      <div><p>{{ copy.eyebrow }}</p><h1>{{ copy.title }}</h1><span>{{ copy.subtitle }}</span></div>
      <button class="primary" type="button" @click="startCreate"><i class="el-icon-plus"></i>{{ copy.add }}</button>
    </header>

    <section v-if="notice" :class="['notice', noticeType]">{{ notice }}</section>
    <section v-if="loading" class="state"><i class="el-icon-loading"></i><h2>{{ copy.loading }}</h2></section>
    <section v-else-if="error" class="state error"><i class="el-icon-warning-outline"></i><h2>{{ copy.error }}</h2><p>{{ error }}</p><button type="button" @click="load">{{ copy.retry }}</button></section>
    <section v-else-if="!addresses.length" class="state"><i class="el-icon-location-outline"></i><h2>{{ copy.empty }}</h2><p>{{ copy.emptyCopy }}</p><button type="button" @click="startCreate">{{ copy.add }}</button></section>
    <section v-else class="address-grid">
      <article v-for="address in addresses" :key="address.id" :class="['address-card', { preferred: String(address.is_default) === '1' }]">
        <div class="card-heading"><span><strong>{{ address.address_name || copy.address }}</strong><small v-if="String(address.is_default) === '1'">{{ copy.default }}</small></span><i class="el-icon-location-outline"></i></div>
        <h2>{{ address.full_name }}</h2>
        <p>{{ addressLine(address) }}</p><p>{{ address.tel }}</p>
        <footer>
          <button v-if="String(address.is_default) !== '1'" type="button" :disabled="saving" @click="makeDefault(address)">{{ copy.makeDefault }}</button>
          <span v-else>{{ copy.checkoutDefault }}</span>
          <div><button type="button" @click="startEdit(address)">{{ copy.edit }}</button><button class="danger" type="button" :disabled="saving" @click="remove(address)">{{ copy.remove }}</button></div>
        </footer>
      </article>
    </section>

    <div v-if="editorOpen" class="modal-layer" role="presentation" @click.self="closeEditor">
      <section class="modal" role="dialog" aria-modal="true" :aria-label="editingId ? copy.editTitle : copy.addTitle">
        <header><div><p>{{ copy.eyebrow }}</p><h2>{{ editingId ? copy.editTitle : copy.addTitle }}</h2></div><button type="button" :aria-label="copy.close" @click="closeEditor"><i class="el-icon-close"></i></button></header>
        <form @submit.prevent="save">
          <div class="two"><label><span>{{ copy.company }} *</span><input v-model.trim="form.address_name" required /></label><label><span>{{ copy.recipient }} *</span><input v-model.trim="form.full_name" required /></label></div>
          <div class="two"><label><span>{{ copy.country }} *</span><select v-model="form.country" required @change="loadStates"><option value="" disabled>{{ copy.select }}</option><option v-for="country in countries" :key="countryCode(country)" :value="countryCode(country)">{{ countryName(country) }}</option></select></label><label><span>{{ copy.region }} *</span><select v-if="states.length" v-model="form.area" required><option value="" disabled>{{ copy.select }}</option><option v-for="state in states" :key="state.iso2 || state.name" :value="state.name || state.iso2">{{ state.name || state.iso2 }}</option></select><input v-else v-model.trim="form.area" required /></label></div>
          <div class="two"><label><span>{{ copy.city }} *</span><input v-model.trim="form.city" required /></label><label><span>{{ copy.postal }} *</span><input v-model.trim="form.zipcode" required /></label></div>
          <label><span>{{ copy.line1 }} *</span><input v-model.trim="form.address_one" required /></label>
          <label><span>{{ copy.line2 }}</span><input v-model.trim="form.address_two" /></label>
          <label><span>{{ copy.phone }} *</span><input v-model.trim="form.tel" type="tel" required /></label>
          <p v-if="formError" class="form-error">{{ formError }}</p>
          <footer><button class="secondary" type="button" :disabled="saving" @click="closeEditor">{{ copy.cancel }}</button><button class="primary" type="submit" :disabled="saving">{{ saving ? copy.saving : copy.save }}</button></footer>
        </form>
      </section>
    </div>
  </main>
</template>

<script>
import { reqAddress, reqCountries, reqDelAddress, reqEditAddress, reqGetAddress, reqStates, setDefaultAddress } from '@/api/address'
import { shipFromTo } from '@/api/shippingCost'

const emptyForm = () => ({ address_name: '', full_name: '', country: '', area: '', city: '', address_one: '', address_two: '', zipcode: '', tel: '', code_no: '' })
export default {
  name: 'WorkspaceAddresses',
  data() { return { loading: true, saving: false, error: '', notice: '', noticeType: 'success', addresses: [], countries: [], states: [], editorOpen: false, editingId: null, form: emptyForm(), formError: '' } },
  computed: {
    account() { try { return JSON.parse(localStorage.getItem('userInfo') || '{}') } catch { return {} } },
    chinese() { return String(this.$workspaceLocale?.locale || '').toLowerCase().startsWith('zh') },
    copy() { return this.chinese ? { eyebrow: '账户设置', title: '收货地址', subtitle: '采购下单与运费计算使用这些真实地址。发布到店铺不会使用这里的地址。', add: '添加地址', loading: '正在加载地址…', error: '地址暂时无法加载', retry: '重试', empty: '还没有收货地址', emptyCopy: '添加一个地址后即可完成采购结算。', address: '收货地址', default: '默认', makeDefault: '设为默认', checkoutDefault: '结算时优先使用', edit: '编辑', remove: '删除', editTitle: '编辑收货地址', addTitle: '添加收货地址', close: '关闭', company: '公司或地址名称', recipient: '收件人', country: '国家/地区', region: '省/州', city: '城市', postal: '邮编', line1: '详细地址', line2: '地址补充', phone: '联系电话', select: '请选择', cancel: '取消', save: '保存地址', saving: '正在保存…', saved: '地址已保存。', removed: '地址已删除。', defaulted: '默认地址已更新。', confirmRemove: '确定删除这个地址吗？', actionError: '操作失败，请稍后重试。' } : { eyebrow: 'Account settings', title: 'Shipping addresses', subtitle: 'These real addresses are used for sourcing checkout and shipping quotes. Store publishing does not use them.', add: 'Add address', loading: 'Loading addresses…', error: 'Addresses are temporarily unavailable', retry: 'Try again', empty: 'No shipping address yet', emptyCopy: 'Add an address to complete a sourcing checkout.', address: 'Shipping address', default: 'Default', makeDefault: 'Make default', checkoutDefault: 'Preferred at checkout', edit: 'Edit', remove: 'Remove', editTitle: 'Edit shipping address', addTitle: 'Add shipping address', close: 'Close', company: 'Company or address name', recipient: 'Recipient', country: 'Country or region', region: 'State or province', city: 'City', postal: 'Postal code', line1: 'Address line 1', line2: 'Address line 2', phone: 'Phone number', select: 'Select', cancel: 'Cancel', save: 'Save address', saving: 'Saving…', saved: 'Address saved.', removed: 'Address removed.', defaulted: 'Default address updated.', confirmRemove: 'Remove this address?', actionError: 'The action could not be completed. Try again.' } },
  },
  mounted() { this.load() },
  methods: {
    successful(response) { return response && (response.code === undefined || Number(response.code) === 0) },
    async load() { this.loading = true; this.error = ''; try { const [addressResult, countryResult, shippingResult] = await Promise.allSettled([reqGetAddress({ email: this.account.email }), reqCountries(), shipFromTo()]); if (addressResult.status === 'rejected') throw addressResult.reason; this.addresses = Array.isArray(addressResult.value?.data) ? addressResult.value.data : []; if (countryResult.status === 'fulfilled') this.countries = Array.isArray(countryResult.value?.data) ? countryResult.value.data : (countryResult.value?.data?.list || []); if (!this.countries.length && shippingResult.status === 'fulfilled') this.countries = shippingResult.value?.data?.endCountry || [] } catch (error) { this.error = error?.message || this.copy.actionError } finally { this.loading = false } },
    countryCode(country) { return country.code_two || country.iso2 || country.code || '' },
    countryName(country) { return country.en_nickname || country.name || country.zh_cn_nickname || this.countryCode(country) },
    addressLine(address) { return [address.address_two, address.address_one, address.city, address.area, address.zipcode, address.country_name || address.country].filter(Boolean).join(', ') },
    startCreate() { this.editingId = null; this.form = emptyForm(); this.states = []; this.formError = ''; this.editorOpen = true },
    async startEdit(address) { this.editingId = address.id; this.form = { ...emptyForm(), ...address, country: address.country || address.country_code || '' }; this.formError = ''; this.editorOpen = true; await this.loadStates() },
    closeEditor() { if (!this.saving) this.editorOpen = false },
    async loadStates() { this.states = []; if (!this.form.country) return; try { const countryCode = this.form.country === 'UK' ? 'GB' : this.form.country; const response = await reqStates({ country_code: countryCode }); this.states = Array.isArray(response?.data) ? response.data : (response?.data?.list || []) } catch {} },
    async save() { this.saving = true; this.formError = ''; try { const selectedCountry = this.countries.find((item) => this.countryCode(item) === this.form.country); const payload = { ...this.form, id: this.editingId || undefined, email: this.account.email, countryName: selectedCountry ? this.countryName(selectedCountry) : this.form.country }; const response = this.editingId ? await reqEditAddress(payload) : await reqAddress(payload); if (!this.successful(response)) throw new Error(response?.msg || this.copy.actionError); this.editorOpen = false; this.showNotice(this.copy.saved); await this.load() } catch (error) { this.formError = error?.message || this.copy.actionError } finally { this.saving = false } },
    async remove(address) { if (!window.confirm(this.copy.confirmRemove)) return; this.saving = true; try { const response = await reqDelAddress({ id: address.id }); if (!this.successful(response)) throw new Error(response?.msg || this.copy.actionError); this.showNotice(this.copy.removed); await this.load() } catch (error) { this.showNotice(error?.message || this.copy.actionError, 'error') } finally { this.saving = false } },
    async makeDefault(address) { this.saving = true; try { const response = await setDefaultAddress({ id: address.id }); if (!this.successful(response)) throw new Error(response?.msg || this.copy.actionError); this.showNotice(this.copy.defaulted); await this.load() } catch (error) { this.showNotice(error?.message || this.copy.actionError, 'error') } finally { this.saving = false } },
    showNotice(message, type = 'success') { this.notice = message; this.noticeType = type; window.setTimeout(() => { if (this.notice === message) this.notice = '' }, 4500) },
  },
}
</script>

<style scoped>
.address-page{max-width:1440px;margin:auto;padding:38px 34px 70px;color:#202722;font-size:16px}.page-header{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:25px}.page-header p,.modal header p{margin:0 0 7px;color:#b34720;font-size:13px;font-weight:900}.page-header h1{margin:0;font-size:38px;letter-spacing:-.035em}.page-header span{display:block;max-width:760px;margin-top:8px;color:#69716b;line-height:1.55}.primary,.secondary,.state button{min-height:43px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 17px;border-radius:8px;font:inherit;font-weight:800;cursor:pointer}.primary,.state button{border:0;background:#e45620;color:#fff}.secondary{border:1px solid #ccd3cc;background:#fff;color:#303832}.primary:disabled,.secondary:disabled{opacity:.55;cursor:not-allowed}.notice{margin-bottom:18px;padding:13px 15px;border-radius:8px;background:#e8f4ec;color:#266b48}.notice.error,.form-error{background:#fff0ec;color:#963d2b}.address-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.address-card{min-height:248px;display:flex;flex-direction:column;padding:22px;border:1px solid #dce2dc;border-radius:12px;background:#fff;box-shadow:0 12px 28px rgba(30,42,33,.04)}.address-card.preferred{border-color:#e5a88d;box-shadow:inset 0 3px #e45620}.card-heading{display:flex;align-items:flex-start;justify-content:space-between}.card-heading strong,.card-heading small{display:block}.card-heading small{width:max-content;margin-top:6px;padding:4px 7px;border-radius:999px;background:#e6f3ea;color:#286846;font-size:11px}.card-heading>i{color:#d34e1b;font-size:21px}.address-card h2{margin:22px 0 8px;font-size:20px}.address-card p{margin:3px 0;color:#626b64;line-height:1.5}.address-card footer{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:auto;padding-top:18px;border-top:1px solid #e5e8e5}.address-card footer button{border:0;background:transparent;color:#a8421c;font:inherit;font-size:13px;font-weight:800;cursor:pointer}.address-card footer span{color:#347255;font-size:12px;font-weight:800}.address-card footer div{display:flex;gap:9px}.address-card footer button.danger{color:#993d35}.state{min-height:410px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px;border:1px solid #dce2dc;border-radius:12px;background:#fff;text-align:center}.state>i{color:#d64e1b;font-size:30px}.state h2{margin:15px 0 5px}.state p{max-width:520px;margin:0 0 18px;color:#69716a}.state.error{color:#8c3c34}.modal-layer{position:fixed;inset:0;z-index:90;display:grid;place-items:center;padding:24px;background:rgba(18,24,20,.6)}.modal{width:min(760px,100%);max-height:calc(100vh - 48px);overflow:auto;border-radius:13px;background:#fff;box-shadow:0 28px 80px rgba(0,0,0,.24)}.modal>header{display:flex;align-items:flex-start;justify-content:space-between;padding:24px 26px 18px;border-bottom:1px solid #e1e6e1}.modal h2{margin:0;font-size:26px}.modal>header button{width:38px;height:38px;border:0;border-radius:8px;background:#f0f3ef;cursor:pointer}.modal form{display:grid;gap:15px;padding:24px 26px}.modal label{display:grid;gap:7px;color:#505a52;font-size:13px;font-weight:800}.modal input,.modal select{width:100%;height:44px;padding:0 12px;border:1px solid #ccd4cc;border-radius:8px;background:#fff;color:#262d28;font:inherit}.modal input:focus,.modal select:focus{outline:0;border-color:#df5521;box-shadow:0 0 0 3px rgba(223,85,33,.12)}.two{display:grid;grid-template-columns:1fr 1fr;gap:14px}.modal form>footer{display:flex;justify-content:flex-end;gap:9px;padding-top:6px}.form-error{margin:0;padding:11px;border-radius:8px;font-size:13px}@media(max-width:1100px){.address-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:700px){.address-page{padding:25px 16px 50px}.page-header{align-items:flex-start;flex-direction:column}.address-grid,.two{grid-template-columns:1fr}.modal-layer{padding:10px}.modal form,.modal>header{padding-left:18px;padding-right:18px}}
</style>
