<template>
  <main class="wallet-page">
    <header class="page-header">
      <div><span class="eyebrow">{{ $t('wallet.eyebrow') }}</span><h1>{{ $t('wallet.title') }}</h1><p>{{ $t('wallet.subtitle') }}</p></div>
      <button class="button button-secondary" :disabled="loading" @click="loadWallet">
        <i :class="loading ? 'el-icon-loading' : 'el-icon-refresh'" aria-hidden="true"></i>{{ loading ? $t('common.refreshing') : $t('common.refresh') }}
      </button>
    </header>

    <section class="wallet-overview">
      <article class="balance-card">
        <div class="balance-top"><span>{{ $t('wallet.availableBalance') }}</span><i class="el-icon-wallet" aria-hidden="true"></i></div>
        <strong>{{ money(balance) }}</strong>
        <p>{{ $t('wallet.balanceCopy') }}</p>
        <div class="balance-actions">
          <router-link :to="{ name: 'walletTopup' }" class="button button-primary"><i class="el-icon-plus"></i>{{ $t('wallet.topUp') }}</router-link>
          <button class="button button-light" @click="openWithdraw"><i class="el-icon-download"></i>{{ $t('wallet.withdraw') }}</button>
        </div>
      </article>
      <article class="metric-card"><div class="metric-icon income"><i class="el-icon-top-right"></i></div><span>{{ $t('wallet.moneyIn') }}</span><strong>{{ money(moneyIn) }}</strong><p>{{ $t('wallet.moneyInCopy') }}</p></article>
      <article class="metric-card"><div class="metric-icon expense"><i class="el-icon-bottom-left"></i></div><span>{{ $t('wallet.moneyOut') }}</span><strong>{{ money(moneyOut) }}</strong><p>{{ $t('wallet.moneyOutCopy') }}</p></article>
      <article class="metric-card"><div class="metric-icon"><i class="el-icon-tickets"></i></div><span>{{ $t('wallet.transactions') }}</span><strong>{{ list.length }}</strong><p>{{ $t('wallet.transactionsCopy') }}</p></article>
    </section>

    <section class="transactions-panel">
      <div class="panel-heading"><div><h2>{{ $t('wallet.historyTitle') }}</h2><p>{{ $t('wallet.historyCopy') }}</p></div><button class="filter-toggle" @click="filtersOpen = !filtersOpen"><i class="el-icon-s-operation"></i>{{ $t('wallet.filters') }}<i :class="filtersOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i></button></div>

      <form v-show="filtersOpen" class="filter-bar" @submit.prevent="searchWallet">
        <label><span>{{ $t('wallet.from') }}</span><input v-model="search.from_time" type="date" max="2999-12-31" /></label>
        <label><span>{{ $t('wallet.to') }}</span><input v-model="search.to_time" type="date" max="2999-12-31" /></label>
        <label><span>{{ $t('wallet.paymentMethod') }}</span><select v-model="search.payment_method"><option :value="null">{{ $t('wallet.all') }}</option><option v-for="(item,index) in paymentMethods" :key="item" :value="index+1">{{ item }}</option></select></label>
        <label><span>{{ $t('wallet.transactionType') }}</span><select v-model="search.business_type"><option :value="null">{{ $t('wallet.all') }}</option><option v-for="(item,index) in businessTypes" :key="item" :value="index+1">{{ item }}</option></select></label>
        <label><span>{{ $t('wallet.status') }}</span><select v-model="search.status"><option :value="null">{{ $t('wallet.all') }}</option><option v-for="(item,index) in statuses" :key="item" :value="index">{{ item }}</option></select></label>
        <label class="transaction-search"><span>{{ $t('wallet.paymentId') }}</span><div><i class="el-icon-search"></i><input v-model.trim="search.payment_id" type="search" :placeholder="$t('wallet.searchPlaceholder')" /></div></label>
        <div class="filter-actions"><button class="button button-dark" type="submit">{{ $t('common.search') }}</button><button class="button button-quiet" type="button" @click="resetSearch">{{ $t('wallet.reset') }}</button></div>
      </form>

      <div v-if="loading" class="table-skeleton" aria-live="polite"><div v-for="index in 5" :key="index"><span></span><span></span><span></span><span></span></div></div>
      <div v-else-if="error" class="state-panel error-state"><i class="el-icon-warning-outline"></i><h3>{{ $t('wallet.errorTitle') }}</h3><p>{{ error }}</p><button class="button button-secondary" @click="loadWallet">{{ $t('common.retry') }}</button></div>
      <div v-else-if="!list.length" class="state-panel"><div class="state-icon"><i class="el-icon-document"></i></div><h3>{{ $t('wallet.emptyTitle') }}</h3><p>{{ $t('wallet.emptyCopy') }}</p></div>
      <div v-else class="transaction-table-wrap">
        <table class="transaction-table">
          <thead><tr><th>{{ $t('wallet.transaction') }}</th><th>{{ $t('wallet.paymentMethod') }}</th><th>{{ $t('wallet.transactionType') }}</th><th>{{ $t('wallet.amount') }}</th><th>{{ $t('wallet.status') }}</th><th>{{ $t('wallet.time') }}</th></tr></thead>
          <tbody><tr v-for="(item,index) in list" :key="item.bill_no || index"><td><strong>{{ item.bill_no || $t('wallet.noId') }}</strong><small>{{ item.trade_no || $t('wallet.noTradeId') }}</small></td><td>{{ paymentMethods[item.payment_method-1] || $t('wallet.unknown') }}</td><td>{{ businessTypes[item.business_type-1] || $t('wallet.unknown') }}</td><td :class="amountClass(item)">{{ signedMoney(item) }}</td><td><span :class="['status-pill', statusClass(item.bill_status)]">{{ statuses[item.bill_status] || $t('wallet.unknown') }}</span></td><td>{{ item.created_data || '' }}</td></tr></tbody>
        </table>
      </div>
    </section>

    <div v-if="withdrawOpen" class="modal-shell" role="dialog" aria-modal="true" :aria-label="$t('wallet.withdrawTitle')" @click.self="closeWithdraw">
      <section class="withdraw-modal">
        <button class="modal-close" :aria-label="$t('common.close')" @click="closeWithdraw"><i class="el-icon-close"></i></button>
        <span class="eyebrow">{{ $t('wallet.secureWithdrawal') }}</span><h2>{{ $t('wallet.withdrawTitle') }}</h2><p class="modal-copy">{{ $t('wallet.withdrawCopy') }}</p>
        <div class="withdraw-balance"><span>{{ $t('wallet.availableBalance') }}</span><strong>{{ money(balance) }}</strong></div>
        <form @submit.prevent="submitWithdraw">
          <label><span>{{ $t('wallet.withdrawAmount') }}</span><div class="money-input"><b>$</b><input ref="withdrawAmount" v-model="withdrawAmount" inputmode="decimal" :placeholder="$t('wallet.amountPlaceholder')" @input="cleanAmount" @blur="calculateWithdrawal" /></div><small>{{ $t('wallet.withdrawLimit', { value: money(balance) }) }}</small></label>
          <div class="calculation-row"><div><span>{{ $t('wallet.processingFee') }}</span><strong>{{ money(fee) }}</strong></div><i class="el-icon-right"></i><div><span>{{ $t('wallet.paypalReceives') }}</span><strong>{{ money(netWithdraw) }}</strong></div></div>
          <label><span>{{ $t('wallet.withdrawMethod') }}</span><div class="method-box"><strong>PayPal</strong><small>{{ email }}</small></div></label>
          <label><span>{{ $t('wallet.verificationCode') }}</span><div class="code-input"><input v-model.trim="verifyCode" maxlength="12" :placeholder="$t('wallet.codePlaceholder')" /><button type="button" :disabled="sendingCode || !email" @click="sendVerification">{{ sendingCode ? $t('wallet.sending') : $t('wallet.sendCode') }}</button></div></label>
          <p v-if="withdrawMessage" :class="['form-message', withdrawError ? 'error' : 'success']">{{ withdrawMessage }}</p>
          <p class="safety-note"><i class="el-icon-lock"></i>{{ $t('wallet.safetyNote') }}</p>
          <div class="modal-actions"><button type="button" class="button button-quiet" @click="closeWithdraw">{{ $t('common.cancel') }}</button><button type="submit" class="button button-primary" :disabled="submittingWithdraw">{{ submittingWithdraw ? $t('wallet.submitting') : $t('wallet.confirmWithdraw') }}</button></div>
        </form>
      </section>
    </div>
  </main>
</template>

<script>
import { reqWallet, walletVerification, walletWithdraw } from '@/api/wallet'

export default {
  data() {
    return {
      email: '', balance: 0, list: [], loading: true, error: '', filtersOpen: false,
      search: { from_time: '', to_time: '', payment_method: null, business_type: null, status: null, payment_id: '' },
      withdrawOpen: false, withdrawAmount: '', fee: 0, netWithdraw: 0, verifyCode: '', sendingCode: false, submittingWithdraw: false, withdrawMessage: '', withdrawError: false,
    }
  },
  computed: {
    paymentMethods() { return [this.$t('wallet.creditCard'), this.$t('wallet.accountBalance'), 'PayPal', this.$t('wallet.system'), this.$t('wallet.wireTransfer'), 'Payoneer'] },
    businessTypes() { return [this.$t('wallet.refund'), this.$t('wallet.accountTopUp'), this.$t('wallet.manualCredit'), this.$t('wallet.affiliateCommission'), this.$t('wallet.order'), this.$t('wallet.accountWithdrawal')] },
    statuses() { return [this.$t('wallet.inProgress'), this.$t('wallet.success'), this.$t('wallet.failed')] },
    moneyIn() { return this.list.reduce((sum,item) => sum + (this.isOutflow(item) ? 0 : Math.abs(Number(item.running_amount) || 0)), 0) },
    moneyOut() { return this.list.reduce((sum,item) => sum + (this.isOutflow(item) ? Math.abs(Number(item.running_amount) || 0) : 0), 0) },
  },
  created() { this.$emit('menu', 'wallet'); this.readAccount(); this.loadWallet() },
  methods: {
    readAccount() { try { const user = JSON.parse(localStorage.getItem('userInfo') || '{}'); this.email = user.email || '' } catch { this.email = '' } },
    async loadWallet(params) { this.loading = true; this.error = ''; try { const response = await reqWallet(params); const payload = response.data || {}; this.list = (payload.data || []).map((item) => ({ ...item })); this.balance = Number(payload.balance || 0) } catch (error) { this.list = []; this.error = error.message || this.$t('wallet.errorFallback') } finally { this.loading = false } },
    searchWallet() { if (this.search.from_time && this.search.to_time && this.search.from_time > this.search.to_time) { const from = this.search.from_time; this.search.from_time = this.search.to_time; this.search.to_time = from } this.loadWallet(this.search) },
    resetSearch() { this.search = { from_time: '', to_time: '', payment_method: null, business_type: null, status: null, payment_id: '' }; this.loadWallet() },
    money(value) { return new Intl.NumberFormat(this.$workspaceLocale.locale || 'en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value) || 0) },
    isOutflow(item) { return Number(item.running_amount) < 0 || [5,6].includes(Number(item.business_type)) },
    signedMoney(item) { const amount = Math.abs(Number(item.running_amount) || 0); return `${this.isOutflow(item) ? '-' : '+'}${this.money(amount)}` },
    amountClass(item) { return this.isOutflow(item) ? 'amount-out' : 'amount-in' },
    statusClass(value) { return Number(value) === 1 ? 'success' : Number(value) === 2 ? 'failed' : 'progress' },
    openWithdraw() { this.withdrawOpen = true; this.withdrawMessage = ''; this.withdrawError = false; this.$nextTick(() => this.$refs.withdrawAmount && this.$refs.withdrawAmount.focus()) },
    closeWithdraw() { if (this.submittingWithdraw) return; this.withdrawOpen = false; this.withdrawAmount = ''; this.fee = 0; this.netWithdraw = 0; this.verifyCode = ''; this.withdrawMessage = ''; this.withdrawError = false },
    cleanAmount() { this.withdrawAmount = String(this.withdrawAmount).replace(/[^\d.]/g,'').replace(/^\./,'').replace(/\.{2,}/g,'.').replace('.', '#').replace(/\./g,'').replace('#','.').replace(/(\.\d{2}).*/, '$1'); this.calculateWithdrawal() },
    calculateWithdrawal() { const amount = Math.min(Number(this.withdrawAmount) || 0, Number(this.balance) || 0); if (amount !== Number(this.withdrawAmount || 0)) this.withdrawAmount = amount ? amount.toFixed(2) : ''; this.fee = amount > 0 ? Math.min(amount, amount * 0.03 + 0.30) : 0; this.netWithdraw = Math.max(0, amount - this.fee) },
    async sendVerification() { this.sendingCode = true; this.withdrawMessage = ''; try { const response = await walletVerification({ email: this.email }); if (response.code == 0) { this.withdrawError = false; this.withdrawMessage = this.$t('wallet.codeSent') } else { this.withdrawError = true; this.withdrawMessage = response.msg || this.$t('wallet.codeError') } } catch (error) { this.withdrawError = true; this.withdrawMessage = error.message || this.$t('wallet.codeError') } finally { this.sendingCode = false } },
    async submitWithdraw() {
      this.calculateWithdrawal(); this.withdrawMessage = ''
      if (!(Number(this.withdrawAmount) > 0) || Number(this.withdrawAmount) > Number(this.balance)) { this.withdrawError = true; this.withdrawMessage = this.$t('wallet.amountError'); return }
      if (!this.verifyCode) { this.withdrawError = true; this.withdrawMessage = this.$t('wallet.verificationRequired'); return }
      this.submittingWithdraw = true
      try { const response = await walletWithdraw({ running_amount: this.withdrawAmount, verify_code: this.verifyCode }); if (response.code == 0) { this.$message({ message: this.$t('wallet.withdrawSubmitted'), type: 'success', offset: 70 }); this.submittingWithdraw = false; this.closeWithdraw(); await this.loadWallet() } else { this.withdrawError = true; this.withdrawMessage = response.msg || this.$t('wallet.withdrawError') } } catch (error) { this.withdrawError = true; this.withdrawMessage = error.message || this.$t('wallet.withdrawError') } finally { this.submittingWithdraw = false }
    },
  },
}
</script>

<style scoped>
.wallet-page{min-height:100%;padding:32px;background:#f5f6f3;color:#202720;font-size:16px}.page-header,.wallet-overview,.transactions-panel{max-width:1440px;margin-left:auto;margin-right:auto}.page-header{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:24px}.page-header h1{margin:5px 0 7px;font-size:34px;line-height:1.16;letter-spacing:-.03em}.page-header p{margin:0;color:#687168;line-height:1.55}.eyebrow{color:#ad461e;font-size:13px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}.button{min-height:42px;padding:0 16px;border:1px solid transparent;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#fff;color:#29312b;font:inherit;font-weight:750;cursor:pointer;white-space:nowrap;transition:background-color .16s,border-color .16s}.button:disabled{opacity:.5;cursor:not-allowed}.button-primary{background:#ea5a1b;color:#fff}.button-primary:hover{background:#d94e13}.button-secondary{border-color:#cbd2cb}.button-secondary:hover,.button-quiet:hover{background:#eff2ed}.button-dark{background:#222b24;color:#fff}.button-quiet{border-color:transparent;background:transparent}.button-light{border-color:rgba(255,255,255,.26);background:rgba(255,255,255,.08);color:#fff}.wallet-overview{display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:14px;margin-bottom:18px}.balance-card,.metric-card{min-height:220px;padding:22px;border:1px solid #dce1da;border-radius:12px;background:#fff}.balance-card{background:#202a22;color:#fff}.balance-top{display:flex;justify-content:space-between;color:#c9d2ca}.balance-top i{font-size:24px}.balance-card>strong{display:block;margin-top:17px;font-size:38px;letter-spacing:-.035em}.balance-card>p{margin:7px 0 26px;color:#bac5bc;font-size:14px}.balance-actions{display:flex;gap:9px}.metric-card{display:flex;flex-direction:column}.metric-icon{width:42px;height:42px;margin-bottom:21px;display:grid;place-items:center;border-radius:10px;background:#fff0e8;color:#d14e17;font-size:18px}.metric-icon.income{background:#e5f3e9;color:#31704b}.metric-icon.expense{background:#f8e9e7;color:#a3453e}.metric-card>span{color:#6d766e;font-size:13px}.metric-card>strong{margin-top:7px;font-size:26px}.metric-card>p{margin:auto 0 0;color:#858d86;font-size:13px;line-height:1.45}.transactions-panel{border:1px solid #dce1da;border-radius:12px;background:#fff;overflow:hidden}.panel-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px}.panel-heading h2{margin:0;font-size:22px}.panel-heading p{margin:5px 0 0;color:#737c74;font-size:14px}.filter-toggle{height:40px;padding:0 12px;display:flex;align-items:center;gap:8px;border:1px solid #d2d8d1;border-radius:8px;background:#fff;color:#343c36;font:inherit;font-weight:700;cursor:pointer}.filter-bar{display:grid;grid-template-columns:repeat(2,minmax(135px,.7fr)) repeat(3,minmax(145px,.85fr)) minmax(210px,1.2fr) auto;gap:11px;padding:17px 22px;border-top:1px solid #e5e8e3;border-bottom:1px solid #e5e8e3;background:#fafbf9}.filter-bar label>span,.withdraw-modal label>span{display:block;margin-bottom:7px;color:#5d665e;font-size:13px;font-weight:700}.filter-bar input,.filter-bar select,.withdraw-modal input{width:100%;height:42px;padding:0 11px;border:1px solid #cfd6cf;border-radius:8px;background:#fff;color:#252c27;font:inherit;outline:none}.filter-bar input:focus,.filter-bar select:focus,.withdraw-modal input:focus{border-color:#ea5a1b;box-shadow:0 0 0 3px rgba(234,90,27,.12)}.transaction-search>div{position:relative}.transaction-search i{position:absolute;top:13px;left:13px;color:#7c857d}.transaction-search input{padding-left:37px}.filter-actions{display:flex;align-items:flex-end;gap:4px}.transaction-table-wrap{overflow-x:auto}.transaction-table{width:100%;border-collapse:collapse;min-width:900px}.transaction-table th{padding:13px 18px;background:#f5f6f3;color:#6d756e;font-size:12px;font-weight:800;text-align:left;text-transform:uppercase;letter-spacing:.035em}.transaction-table td{padding:16px 18px;border-top:1px solid #e7eae6;color:#454d46}.transaction-table td:first-child strong,.transaction-table td:first-child small{display:block}.transaction-table td:first-child small{margin-top:4px;color:#858d86;font-size:12px}.amount-in{color:#2f6b48!important;font-weight:800}.amount-out{color:#993f38!important;font-weight:800}.status-pill{display:inline-flex;padding:5px 9px;border-radius:999px;font-size:12px;font-weight:800}.status-pill.success{background:#e4f3e9;color:#2e6846}.status-pill.failed{background:#fae9e7;color:#994039}.status-pill.progress{background:#fff0dd;color:#955c19}.state-panel{padding:68px 28px;border-top:1px solid #e6e9e4;text-align:center}.state-panel h3{margin:14px 0 5px;font-size:20px}.state-panel p{margin:0 auto 15px;max-width:530px;color:#6f7870}.state-icon{width:48px;height:48px;margin:auto;display:grid;place-items:center;border-radius:12px;background:#fff0e8;color:#d14e17;font-size:22px}.error-state{background:#fff7f5;color:#923e35}.error-state>i{font-size:28px}.table-skeleton{padding:0 22px}.table-skeleton div{display:grid;grid-template-columns:1.3fr repeat(3,1fr);gap:30px;padding:20px 0;border-top:1px solid #edf0ec}.table-skeleton span{height:13px;border-radius:5px;background:#edf0ec;animation:pulse 1.3s ease-in-out infinite}.modal-shell{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:24px;background:rgba(19,25,21,.64)}.withdraw-modal{position:relative;width:min(580px,100%);max-height:calc(100vh - 48px);overflow:auto;padding:28px;border-radius:12px;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,.22)}.withdraw-modal h2{margin:7px 0;font-size:27px}.modal-copy{margin:0 0 20px;color:#687169;line-height:1.55}.modal-close{position:absolute;top:16px;right:16px;width:38px;height:38px;border:0;border-radius:8px;background:#f1f3f0;cursor:pointer}.withdraw-balance{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding:16px;border-radius:10px;background:#202a22;color:#d7ddd8}.withdraw-balance strong{color:#fff;font-size:22px}.withdraw-modal form{display:grid;gap:18px}.money-input{position:relative}.money-input b{position:absolute;left:13px;top:11px}.money-input input{padding-left:29px}.withdraw-modal label>small{display:block;margin-top:6px;color:#7d857e;font-size:12px}.calculation-row{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;padding:14px;border-radius:10px;background:#f5f6f3}.calculation-row div span,.calculation-row div strong{display:block}.calculation-row div span{color:#747c75;font-size:12px}.calculation-row div strong{margin-top:4px}.method-box{display:flex;justify-content:space-between;align-items:center;padding:13px;border:1px solid #d5dad4;border-radius:8px}.method-box small{color:#788079}.code-input{display:grid;grid-template-columns:1fr auto;gap:8px}.code-input button{padding:0 13px;border:1px solid #cbd2cb;border-radius:8px;background:#f5f6f3;color:#384139;font:inherit;font-weight:700;cursor:pointer}.code-input button:disabled{opacity:.5;cursor:not-allowed}.safety-note{margin:0;padding:11px;border-radius:8px;background:#eaf4ed;color:#356649;font-size:13px}.safety-note i{margin-right:7px}.form-message{margin:0;padding:11px;border-radius:8px;font-size:13px}.form-message.success{background:#eaf4ed;color:#356649}.form-message.error{background:#fff0ee;color:#963f37}.modal-actions{display:flex;justify-content:flex-end;gap:8px}.eyebrow,.withdraw-modal h2,.withdraw-modal>p,.withdraw-balance,.withdraw-modal form{position:relative}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden}@keyframes pulse{50%{opacity:.5}}@media(max-width:1150px){.wallet-overview{grid-template-columns:repeat(2,1fr)}.filter-bar{grid-template-columns:repeat(3,1fr)}.filter-actions{align-items:flex-end}}@media(max-width:760px){.wallet-page{padding:20px}.page-header{align-items:flex-start;flex-direction:column}.page-header h1{font-size:29px}.wallet-overview{grid-template-columns:1fr}.balance-card,.metric-card{min-height:190px}.panel-heading{align-items:flex-start}.filter-bar{grid-template-columns:1fr}.filter-actions{align-items:center}.balance-actions{flex-wrap:wrap}.calculation-row{grid-template-columns:1fr}.calculation-row>i{transform:rotate(90deg)}.code-input{grid-template-columns:1fr}.modal-actions{flex-direction:column-reverse}.modal-actions .button{width:100%}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
</style>
