<template>
  <main class="sales-desk" data-no-translate>
    <header class="desk-header">
      <a class="brand" href="/" aria-label="CoDropshipping home"><span>Co</span><strong>CoDropshipping</strong></a>
      <div class="header-copy"><span class="live-dot"></span><strong>客户动态在线</strong><small>每 15 秒刷新</small></div>
      <button class="quiet-button" type="button" @click="requestNotifications"><span aria-hidden="true">◌</span>{{ notificationLabel }}</button>
    </header>

    <section v-if="!authorized" class="access-panel">
      <div class="access-mark">Co</div>
      <p class="eyebrow">INTERNAL SALES</p>
      <h1>销售线索工作台</h1>
      <p>这里集中显示首次来访、再次回访和高意向动作。请输入内部访问密钥继续。</p>
      <form @submit.prevent="unlock">
        <input v-model.trim="tokenInput" type="password" autocomplete="current-password" placeholder="内部访问密钥" aria-label="内部访问密钥" />
        <button type="submit">进入工作台</button>
      </form>
      <small v-if="accessError" class="form-error">{{ accessError }}</small>
    </section>

    <template v-else>
      <section class="desk-intro">
        <div>
          <p class="eyebrow">SALES PRIORITY DESK</p>
          <h1>现在最值得跟进的客户</h1>
          <p>系统只提醒首次来访、再次回访和高意向动作，普通浏览保留在时间线中。</p>
        </div>
        <div class="refresh-wrap">
          <span v-if="lastUpdated">更新于 {{ relativeTime(lastUpdated) }}</span>
          <button class="primary-button" type="button" :disabled="loading" @click="loadAll">{{ loading ? '正在更新' : '立即刷新' }}</button>
        </div>
      </section>

      <section class="summary-grid" aria-label="线索摘要">
        <article><span>需要行动</span><strong>{{ summary.needsAction }}</strong><small>尚未进入跟进流程</small></article>
        <article class="hot"><span>高意向客户</span><strong>{{ summary.hot }}</strong><small>意向分达到 70</small></article>
        <article><span>24 小时内跟进</span><strong>{{ summary.followUps }}</strong><small>已设置跟进时间</small></article>
        <article><span>未读提醒</span><strong>{{ summary.unread }}</strong><small>首访、回访与关键动作</small></article>
      </section>

      <section v-if="error" class="error-banner"><strong>暂时无法更新客户动态</strong><span>{{ error }}</span><button type="button" @click="loadAll">重试</button></section>

      <section class="workbench">
        <aside class="lead-queue">
          <div class="queue-header">
            <div><strong>客户队列</strong><span>{{ filteredLeads.length }} 位客户</span></div>
            <select v-model="temperature" aria-label="按意向筛选">
              <option value="">全部意向</option><option value="hot">高意向</option><option value="warm">持续关注</option><option value="new">刚刚认识</option>
            </select>
          </div>
          <label class="queue-search"><span aria-hidden="true">⌕</span><input v-model.trim="query" type="search" placeholder="搜索姓名、邮箱或公司" /></label>
          <div v-if="loading && !leads.length" class="queue-state">正在整理最新客户动态…</div>
          <div v-else-if="!filteredLeads.length" class="queue-state">暂无符合条件的客户</div>
          <button v-for="lead in filteredLeads" :key="lead.id" type="button" class="lead-row" :class="{ active: selectedId === lead.id }" @click="selectLead(lead.id)">
            <span class="lead-avatar">{{ initials(lead.name) }}</span>
            <span class="lead-main"><strong>{{ lead.name }}</strong><small>{{ lead.latestReason }}</small><em>{{ relativeTime(lead.lastSeenAt) }} · 访问 {{ lead.visitCount }} 次</em></span>
            <span class="score" :class="lead.temperature">{{ lead.score }}</span>
          </button>
        </aside>

        <section class="lead-story">
          <div v-if="!selected" class="empty-detail"><span>↗</span><strong>选择一位客户查看行为</strong><p>销售会看到为什么值得联系，而不是面对一堆无法解释的数据。</p></div>
          <template v-else>
            <header class="story-header">
              <div class="customer-title"><span class="customer-avatar">{{ initials(selected.name) }}</span><div><p>{{ temperatureLabel(selected.temperature) }} · {{ selected.score }} 分</p><h2>{{ selected.name }}</h2><span>{{ selected.email || '匿名访客，等待登录或咨询后补全身份' }}</span></div></div>
              <span class="status-pill">{{ statusLabel(selected.status) }}</span>
            </header>

            <article class="reason-card">
              <div><span>建议现在跟进</span><h3>{{ selected.latestReason }}</h3><p>{{ recommendation(selected) }}</p></div>
              <button class="primary-button" type="button" @click="focusNote">记录跟进</button>
            </article>

            <div class="identity-strip">
              <span><small>首次出现</small><strong>{{ dateTime(selected.firstSeenAt) }}</strong></span>
              <span><small>最近出现</small><strong>{{ dateTime(selected.lastSeenAt) }}</strong></span>
              <span><small>累计动作</small><strong>{{ selected.eventCount }} 次</strong></span>
            </div>

            <div class="timeline-heading"><div><strong>客户行为时间线</strong><span>只记录页面与关键动作，不采集密码和输入内容</span></div></div>
            <div class="timeline">
              <article v-for="item in selected.timeline" :key="item.id" :class="item.type">
                <span class="timeline-icon">{{ item.type === 'note' ? '✎' : eventIcon(item.eventName) }}</span>
                <div v-if="item.type === 'note'"><strong>{{ item.author }} 添加了跟进记录</strong><p>{{ item.content }}</p><small>{{ dateTime(item.createdAt) }}</small></div>
                <div v-else><strong>{{ item.label }}</strong><p>{{ item.pageTitle || pathLabel(item.path) }}</p><small>{{ dateTime(item.createdAt) }}</small></div>
              </article>
            </div>
          </template>
        </section>

        <aside v-if="selected" class="follow-panel">
          <p class="eyebrow">NEXT ACTION</p><h2>安排下一步</h2><p>让任何接手的人都知道客户现在处于什么阶段。</p>
          <label><span>负责人</span><input v-model.trim="editing.owner" type="text" placeholder="输入销售姓名" /></label>
          <label><span>跟进状态</span><select v-model="editing.status"><option v-for="item in statuses" :key="item.value" :value="item.value">{{ item.label }}</option></select></label>
          <label><span>下次跟进</span><input v-model="editing.followUpAt" type="datetime-local" /></label>
          <button class="secondary-button" type="button" :disabled="saving" @click="saveLead">{{ saving ? '保存中' : '保存安排' }}</button>
          <small v-if="saveError" class="inline-error">{{ saveError }}</small>
          <div class="note-block">
            <label for="sales-note">本次跟进记录</label>
            <textarea id="sales-note" ref="noteInput" v-model.trim="note" rows="5" placeholder="例如：客户准备连接 Shopify，明天下午确认产品数量。"></textarea>
            <button class="primary-button" type="button" :disabled="!note || saving" @click="addNote">保存记录</button>
          </div>
          <small class="trust-copy">客户密码、Token 和聊天正文不会进入此页面。</small>
        </aside>
      </section>
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

definePageMeta({ layout: false })
useHead({ title: '销售线索工作台 - CoDropshipping' })

const tokenInput = ref('')
const authorized = ref(false)
const accessError = ref('')
const saveError = ref('')
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const leads = ref<any[]>([])
const selected = ref<any>(null)
const selectedId = ref('')
const query = ref('')
const temperature = ref('')
const note = ref('')
const noteInput = ref<HTMLTextAreaElement | null>(null)
const lastUpdated = ref('')
const summary = reactive({ total: 0, hot: 0, needsAction: 0, followUps: 0, unread: 0 })
const editing = reactive({ owner: '', status: 'new', followUpAt: '' })
const knownNotifications = new Set<string>()
let notificationsPrimed = false
let timer: number | undefined

const statuses = [
  { value: 'new', label: '新线索' }, { value: 'engaged', label: '持续关注' }, { value: 'qualified', label: '已确认需求' },
  { value: 'contacted', label: '已联系' }, { value: 'follow_up', label: '待再次跟进' }, { value: 'won', label: '已转化' }, { value: 'lost', label: '暂不跟进' },
]
const filteredLeads = computed(() => leads.value.filter((lead) => {
  const text = `${lead.name} ${lead.email} ${lead.company}`.toLowerCase()
  return (!query.value || text.includes(query.value.toLowerCase())) && (!temperature.value || lead.temperature === temperature.value)
}))
const notificationLabel = computed(() => typeof Notification !== 'undefined' && Notification.permission === 'granted' ? '浏览器提醒已开启' : '开启浏览器提醒')

function token() { return window.sessionStorage.getItem('cod_sales_token') || '' }
async function api(path: string, options: RequestInit = {}) {
  const response = await fetch(`/listing-api${path}`, { ...options, headers: { 'Content-Type': 'application/json', 'X-Sales-Token': token(), ...(options.headers || {}) } })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload?.error?.message || '请求失败')
  return payload.data
}
async function unlock() {
  accessError.value = ''
  if (!tokenInput.value) return
  window.sessionStorage.setItem('cod_sales_token', tokenInput.value)
  try { await loadAll(); authorized.value = true }
  catch (cause: any) { window.sessionStorage.removeItem('cod_sales_token'); accessError.value = cause.message || '密钥无效' }
}
async function loadAll() {
  loading.value = true; error.value = ''
  try {
    const [nextSummary, nextLeads, nextNotifications] = await Promise.all([api('/v1/sales/summary'), api('/v1/sales/leads'), api('/v1/sales/notifications')])
    Object.assign(summary, nextSummary); leads.value = nextLeads; lastUpdated.value = new Date().toISOString()
    if (notificationsPrimed && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      nextNotifications.filter((item: any) => !item.isRead && !knownNotifications.has(item.id)).slice(0, 3).forEach((item: any) => {
        new Notification(item.title, { body: item.message, tag: item.id })
      })
    }
    nextNotifications.forEach((item: any) => knownNotifications.add(item.id))
    notificationsPrimed = true
    if (!selectedId.value && nextLeads.length) selectedId.value = nextLeads[0].id
    if (selectedId.value) await loadDetail(selectedId.value)
  } catch (cause: any) { error.value = cause.message || '无法获取客户动态'; throw cause }
  finally { loading.value = false }
}
async function loadDetail(id: string) {
  selected.value = await api(`/v1/sales/leads/${encodeURIComponent(id)}`)
  editing.owner = selected.value.owner === '待分配' ? '' : selected.value.owner
  editing.status = selected.value.status
  editing.followUpAt = selected.value.followUpAt ? localInputTime(selected.value.followUpAt) : ''
}
async function selectLead(id: string) { selectedId.value = id; await loadDetail(id) }
async function saveLead() {
  if (!selected.value) return
  saveError.value = ''
  if (editing.status === 'follow_up' && !editing.followUpAt) { saveError.value = '选择“待再次跟进”时，请同时设置下次跟进时间。'; return }
  saving.value = true
  try {
    selected.value = await api(`/v1/sales/leads/${selected.value.id}`, { method: 'PATCH', body: JSON.stringify({ owner: editing.owner, status: editing.status, followUpAt: editing.followUpAt ? new Date(editing.followUpAt).toISOString() : null }) })
    await api(`/v1/sales/leads/${selected.value.id}/read`, { method: 'PATCH' })
    await loadAll()
  } finally { saving.value = false }
}
async function addNote() {
  if (!selected.value || !note.value) return
  saving.value = true
  try {
    selected.value = await api(`/v1/sales/leads/${selected.value.id}/notes`, { method: 'POST', body: JSON.stringify({ author: editing.owner || '销售团队', content: note.value }) })
    await api(`/v1/sales/leads/${selected.value.id}/read`, { method: 'PATCH' })
    note.value = ''; await loadAll()
  } finally { saving.value = false }
}
function focusNote() { nextTick(() => noteInput.value?.focus()) }
async function requestNotifications() { if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') await Notification.requestPermission() }
function initials(value: string) { return String(value || 'CO').split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() }
function statusLabel(value: string) { return statuses.find((item) => item.value === value)?.label || value }
function temperatureLabel(value: string) { return value === 'hot' ? '高意向' : value === 'warm' ? '持续关注' : '刚刚认识' }
function dateTime(value: string) { return value ? new Intl.DateTimeFormat('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value)) : '未设置' }
function localInputTime(value: string) { const date = new Date(value); return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16) }
function relativeTime(value: string) { if (!value) return ''; const minutes = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 60000)); return minutes < 1 ? '刚刚' : minutes < 60 ? `${minutes} 分钟前` : minutes < 1440 ? `${Math.floor(minutes / 60)} 小时前` : `${Math.floor(minutes / 1440)} 天前` }
function eventIcon(name: string) { return ['support_open', 'support_message'].includes(name) ? '◉' : ['ai_listing_start', 'publish_review'].includes(name) ? '✦' : name === 'checkout_start' ? '↗' : '•' }
function pathLabel(path: string) { if (!path) return '客户页面'; if (path.includes('productDetail')) return '商品详情'; if (path.includes('Publish')) return 'AI 刊登审核'; if (path.includes('checkout')) return '结账'; if (path.includes('orders')) return '订单'; return path.split('?')[0] }
function recommendation(lead: any) { if (lead.latestEvent === 'support_message') return '客户已主动发起咨询，优先由当前负责人直接回复。'; if (lead.latestEvent === 'checkout_start') return '客户已接近付款，确认库存、物流时效与付款阻碍。'; if (['ai_listing_start', 'publish_review'].includes(lead.latestEvent)) return '客户正在搭建商品库，确认目标店铺、刊登数量与期望上线时间。'; if (lead.visitCount > 1) return '客户再次回来，结合最近浏览页面询问当前采购或开店计划。'; return '首次来访窗口很短，建议用轻量问候确认客户正在寻找什么。' }

watch(selectedId, (id) => { const exists = leads.value.some((lead) => lead.id === id); if (!exists) selectedId.value = leads.value[0]?.id || '' })
onMounted(async () => {
  tokenInput.value = window.sessionStorage.getItem('cod_sales_token') || (import.meta.dev ? 'cod-sales-local' : '')
  if (tokenInput.value) await unlock()
  timer = window.setInterval(() => { if (authorized.value && !loading.value) loadAll().catch(() => {}) }, 15000)
})
onBeforeUnmount(() => { if (timer) window.clearInterval(timer) })
</script>

<style scoped>
:global(*){box-sizing:border-box}:global(body){margin:0;background:#f2f4f1;color:#202522;font-family:Inter,Arial,"PingFang SC","Microsoft YaHei",sans-serif}.sales-desk{--accent:#e85524;--ink:#202522;--muted:#6c756e;--line:#dce1dc;min-height:100vh;background:#f2f4f1}.desk-header{height:68px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 32px;border-bottom:1px solid var(--line);background:#fff}.brand{display:flex;align-items:center;gap:10px;color:var(--ink);text-decoration:none}.brand span,.access-mark{display:grid;place-items:center;width:37px;height:37px;border-radius:10px;background:var(--accent);color:#fff;font-size:14px;font-weight:900}.brand strong{font-size:16px}.header-copy{display:flex;align-items:center;gap:8px}.header-copy strong{font-size:14px}.header-copy small{color:var(--muted)}.live-dot{width:8px;height:8px;border-radius:50%;background:#2c8a62;box-shadow:0 0 0 4px #e1f2e9}.quiet-button{justify-self:end;min-height:40px;padding:0 14px;border:1px solid #d7ddd7;border-radius:9px;background:#fff;color:#3d4640;font:inherit;font-size:13px;font-weight:700;cursor:pointer}.quiet-button span{margin-right:7px;color:#2b8b61}.access-panel{width:min(520px,calc(100% - 40px));margin:13vh auto 0;padding:44px;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:0 24px 70px rgba(30,40,33,.09);text-align:center}.access-mark{margin:0 auto 22px;width:48px;height:48px}.eyebrow{margin:0 0 8px;color:#b34720;font-size:12px;font-weight:900;letter-spacing:.08em}.access-panel h1,.desk-intro h1{margin:0;color:var(--ink);font-size:34px;line-height:1.16;letter-spacing:-.03em}.access-panel>p{margin:14px auto 25px;color:var(--muted);font-size:15px;line-height:1.6}.access-panel form{display:grid;grid-template-columns:1fr auto;gap:8px}.access-panel input,.access-panel button{height:46px;border-radius:9px;font:inherit}.access-panel input{padding:0 13px;border:1px solid #d7ddd7}.access-panel button,.primary-button{border:1px solid var(--accent);background:var(--accent);color:#fff;font-weight:800;cursor:pointer}.access-panel button{padding:0 18px}.form-error{display:block;margin-top:12px;color:#a53d31}.desk-intro{max-width:1500px;margin:0 auto;padding:42px 32px 26px;display:flex;align-items:flex-end;justify-content:space-between;gap:24px}.desk-intro>div>p:last-child{margin:11px 0 0;color:var(--muted);font-size:15px}.refresh-wrap{display:flex;align-items:center;gap:12px;color:var(--muted);font-size:12px}.primary-button,.secondary-button{min-height:42px;padding:0 16px;border-radius:9px;font:inherit;font-size:14px;font-weight:800;cursor:pointer}.primary-button:disabled,.secondary-button:disabled{opacity:.55;cursor:wait}.summary-grid{max-width:1500px;margin:0 auto 20px;padding:0 32px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.summary-grid article{min-height:118px;padding:19px 20px;border:1px solid var(--line);border-radius:12px;background:#fff}.summary-grid article.hot{border-color:#edb69e;background:#fff8f4}.summary-grid span,.summary-grid small,.summary-grid strong{display:block}.summary-grid span{color:#555f58;font-size:13px;font-weight:800}.summary-grid strong{margin:9px 0 4px;font-size:29px;letter-spacing:-.03em}.summary-grid small{color:#7b837d}.error-banner{max-width:1436px;margin:0 auto 16px;padding:14px 16px;display:flex;align-items:center;gap:9px;border:1px solid #ecc5bd;border-radius:10px;background:#fff4f1;color:#873d32}.error-banner span{flex:1}.error-banner button{border:0;background:transparent;color:#a9431d;font-weight:800}.workbench{max-width:1436px;height:calc(100vh - 312px);min-height:600px;margin:0 auto 30px;display:grid;grid-template-columns:340px minmax(420px,1fr) 320px;border:1px solid var(--line);border-radius:14px;background:#fff;overflow:hidden;box-shadow:0 18px 55px rgba(27,39,31,.06)}.lead-queue{min-width:0;border-right:1px solid var(--line);overflow-y:auto}.queue-header{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:18px 18px 12px;background:#fff}.queue-header strong,.queue-header span{display:block}.queue-header strong{font-size:17px}.queue-header span{margin-top:3px;color:var(--muted);font-size:12px}.queue-header select{height:36px;border:1px solid #d8ddd8;border-radius:8px;background:#fff;color:#414942;font:inherit;font-size:12px}.queue-search{position:sticky;top:66px;z-index:2;margin:0 12px 10px;height:42px;display:flex;align-items:center;gap:8px;padding:0 11px;border:1px solid #dce1dc;border-radius:9px;background:#f4f6f3;color:#707972}.queue-search input{min-width:0;width:100%;border:0;outline:0;background:transparent;font:inherit;font-size:13px}.queue-state{padding:40px 18px;color:var(--muted);text-align:center}.lead-row{width:100%;min-height:98px;display:grid;grid-template-columns:42px minmax(0,1fr) 40px;align-items:center;gap:11px;padding:13px 14px;border:0;border-top:1px solid #edf0ec;background:#fff;color:var(--ink);text-align:left;cursor:pointer}.lead-row:hover{background:#f8f9f7}.lead-row.active{border-left:3px solid var(--accent);background:#fff7f2}.lead-avatar,.customer-avatar{display:grid;place-items:center;border-radius:10px;background:#e8ece7;color:#39433b;font-weight:900}.lead-avatar{width:42px;height:42px;font-size:12px}.lead-main strong,.lead-main small,.lead-main em{display:block}.lead-main strong{font-size:14px}.lead-main small{margin-top:5px;overflow:hidden;color:#4c564f;font-size:12px;font-style:normal;text-overflow:ellipsis;white-space:nowrap}.lead-main em{margin-top:5px;color:#838b84;font-size:11px;font-style:normal}.score{width:36px;height:30px;display:grid;place-items:center;border-radius:999px;background:#edf0ec;color:#58625b;font-size:12px;font-weight:900}.score.hot{background:#ffe9df;color:#bd481c}.score.warm{background:#fff4d7;color:#856416}.lead-story{min-width:0;padding:24px 26px;overflow-y:auto}.empty-detail{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted);text-align:center}.empty-detail>span{font-size:34px;color:#dd5b2d}.empty-detail strong{margin-top:13px;color:var(--ink);font-size:19px}.empty-detail p{max-width:350px;line-height:1.6}.story-header{display:flex;align-items:center;justify-content:space-between;gap:18px}.customer-title{display:flex;align-items:center;gap:13px}.customer-avatar{width:52px;height:52px;background:#263028;color:#fff;font-size:15px}.customer-title p{margin:0 0 3px;color:#bd4a20;font-size:12px;font-weight:900}.customer-title h2{margin:0;font-size:23px;letter-spacing:-.02em}.customer-title div>span{display:block;margin-top:5px;color:var(--muted);font-size:12px}.status-pill{padding:7px 10px;border:1px solid #c9ddcf;border-radius:999px;background:#edf8f1;color:#2d7452;font-size:12px;font-weight:800}.reason-card{margin:22px 0 15px;padding:19px 20px;display:flex;align-items:center;justify-content:space-between;gap:18px;border:1px solid #ecc5b1;border-radius:11px;background:#fff7f2}.reason-card span{color:#bd481c;font-size:12px;font-weight:900}.reason-card h3{margin:5px 0 6px;font-size:19px}.reason-card p{margin:0;color:#626c65;font-size:13px;line-height:1.5}.identity-strip{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line);border-radius:10px}.identity-strip>span{padding:14px 15px}.identity-strip>span+span{border-left:1px solid var(--line)}.identity-strip small,.identity-strip strong{display:block}.identity-strip small{color:#7c847e;font-size:11px}.identity-strip strong{margin-top:5px;font-size:13px}.timeline-heading{margin:25px 0 8px}.timeline-heading strong,.timeline-heading span{display:block}.timeline-heading strong{font-size:17px}.timeline-heading span{margin-top:5px;color:#7b847c;font-size:12px}.timeline article{display:grid;grid-template-columns:34px 1fr;gap:11px;padding:14px 0;border-top:1px solid #e6e9e5}.timeline-icon{width:31px;height:31px;display:grid;place-items:center;border-radius:8px;background:#eef1ed;color:#556158;font-weight:900}.timeline article.note .timeline-icon{background:#fff0e8;color:#b44720}.timeline strong{font-size:14px}.timeline p{margin:5px 0;color:#626c64;font-size:13px;line-height:1.5}.timeline small{color:#8a918b;font-size:11px}.follow-panel{padding:24px 20px;border-left:1px solid var(--line);background:#fafbf9;overflow-y:auto}.follow-panel h2{margin:0;font-size:22px}.follow-panel>p:not(.eyebrow){margin:8px 0 20px;color:var(--muted);font-size:13px;line-height:1.5}.follow-panel label>span,.note-block>label{display:block;margin:14px 0 7px;color:#48524b;font-size:12px;font-weight:800}.follow-panel input,.follow-panel select,.follow-panel textarea{width:100%;border:1px solid #d4dad4;border-radius:8px;background:#fff;color:var(--ink);font:inherit;font-size:13px}.follow-panel input,.follow-panel select{height:42px;padding:0 10px}.follow-panel textarea{padding:10px;line-height:1.5;resize:vertical}.secondary-button{width:100%;margin-top:14px;border:1px solid #cfd6d0;background:#fff;color:#3d4740}.note-block{margin-top:24px;padding-top:6px;border-top:1px solid var(--line)}.note-block .primary-button{width:100%;margin-top:9px}.trust-copy{display:block;margin-top:14px;color:#808881;font-size:11px;line-height:1.5}@media(max-width:1200px){.workbench{grid-template-columns:300px minmax(420px,1fr)}.follow-panel{grid-column:1/-1;border-top:1px solid var(--line);border-left:0}.workbench{height:auto;min-height:650px}.lead-queue,.lead-story{height:650px}.follow-panel{display:grid;grid-template-columns:repeat(3,1fr);gap:10px 14px}.follow-panel>.eyebrow,.follow-panel>h2,.follow-panel>p,.note-block,.trust-copy{grid-column:1/-1}.follow-panel .secondary-button{align-self:end}}@media(max-width:760px){.desk-header{grid-template-columns:1fr auto;padding:0 16px}.header-copy{display:none}.desk-intro{padding:28px 18px 20px;align-items:flex-start;flex-direction:column}.desk-intro h1,.access-panel h1{font-size:28px}.summary-grid{padding:0 18px;grid-template-columns:repeat(2,1fr)}.workbench{margin:0 12px 20px;display:block}.lead-queue,.lead-story{height:auto;max-height:none}.lead-queue{border-right:0}.lead-story{border-top:1px solid var(--line)}.follow-panel{display:block}.identity-strip{grid-template-columns:1fr}.identity-strip>span+span{border-top:1px solid var(--line);border-left:0}.access-panel{padding:30px 22px}.access-panel form{grid-template-columns:1fr}.refresh-wrap{width:100%;justify-content:space-between}}
.inline-error{display:block;margin-top:8px;color:#a43f32;font-size:11px;line-height:1.45}
</style>
