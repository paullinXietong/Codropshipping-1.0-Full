<template>
  <main class="today-page">
    <section class="today-intro">
      <p class="today-date">{{ localizedDate }}</p>
      <div class="intro-row">
        <div>
          <h1>{{ $t('overview.greetingFormat', { greeting, name: displayName }) }}</h1>
          <p>{{ decisionCards.length ? $t('overview.decisionSummary', { count: decisionCards.length }) : $t('overview.clearSummary') }}</p>
        </div>
        <a :href="storefrontUrl" class="top-action"><i class="el-icon-search" aria-hidden="true"></i>{{ $t('overview.openLibrary') }}</a>
      </div>
    </section>

    <div class="account-notice"><i class="el-icon-success" aria-hidden="true"></i><span>{{ $t('overview.realDataNotice') }}</span></div>

    <section v-if="loading" class="dashboard-loading" aria-live="polite">
      <div class="skeleton-line wide"></div><div class="skeleton-grid"><span></span><span></span><span></span></div>
    </section>

    <section v-else-if="error" class="dashboard-error">
      <div><strong>{{ $t('overview.errorTitle') }}</strong><p>{{ error }}</p></div>
      <button type="button" @click="load">{{ $t('common.retry') }}</button>
    </section>

    <template v-else>
      <div v-if="dataWarning" class="partial-warning">{{ $t('overview.partialData') }}</div>

      <section class="decision-section">
        <div class="section-title-row">
          <div><h2>{{ $t('overview.decisionQueue') }}</h2><p>{{ $t('overview.decisionQueueCopy') }}</p></div>
        </div>
        <div class="decision-grid">
          <article v-for="(item, index) in decisionCards" :key="item.key" :class="['decision-card', { priority: index === 0 }]">
            <span class="decision-icon"><i :class="item.icon" aria-hidden="true"></i></span>
            <div><small>{{ item.priority }}</small><strong>{{ item.title }}</strong><p>{{ item.copy }}</p></div>
            <a v-if="item.href" :href="item.href" :aria-label="item.title"><i class="el-icon-right" aria-hidden="true"></i></a>
            <router-link v-else :to="item.to" :aria-label="item.title"><i class="el-icon-right" aria-hidden="true"></i></router-link>
          </article>
        </div>
      </section>

      <section class="focus-grid">
        <article class="recommendation-card">
          <div class="recommendation-heading">
            <div>
              <p class="recommendation-label">{{ $t('overview.nextEyebrow') }}</p>
              <h2>{{ recommendationTitle }}</h2>
            </div>
            <span class="evidence-badge"><i class="el-icon-circle-check" aria-hidden="true"></i>{{ $t('overview.evidenceReady') }}</span>
          </div>
          <p class="recommendation-copy">{{ recommendationCopy }}</p>
          <div class="evidence-metrics">
            <div><strong>{{ drafts.length }}</strong><span>{{ $t('overview.draftMetric') }}</span></div>
            <div><strong>{{ connectedChannels.length }}</strong><span>{{ $t('overview.storeMetric') }}</span></div>
            <div><strong>{{ publishedCount }}</strong><span>{{ $t('overview.publishedMetric') }}</span></div>
            <div><strong class="milestone-value">{{ milestoneLabel }}</strong><span>{{ $t('overview.milestoneMetric') }}</span></div>
          </div>
          <div class="recommendation-actions">
            <router-link v-if="recommendationType === 'connect'" class="primary-button" to="/account/Shopify">{{ $t('overview.connectShopify') }}<i class="el-icon-right" aria-hidden="true"></i></router-link>
            <router-link v-else-if="recommendationType === 'review'" class="primary-button" :to="latestDraftRoute">{{ $t('overview.continueDraft') }}<i class="el-icon-right" aria-hidden="true"></i></router-link>
            <a v-else class="primary-button" :href="storefrontUrl">{{ $t('overview.findProducts') }}<i class="el-icon-right" aria-hidden="true"></i></a>
            <router-link v-if="recommendationType !== 'review' && latestDraft" class="secondary-button" :to="latestDraftRoute">{{ $t('overview.continueDraft') }}</router-link>
            <a v-else-if="recommendationType !== 'source'" class="secondary-button" :href="storefrontUrl">{{ $t('overview.findProducts') }}</a>
          </div>
          <p class="approval-note"><i class="el-icon-lock" aria-hidden="true"></i>{{ $t('overview.stepPublishCopy') }}</p>
        </article>

        <aside class="health-card">
          <div class="health-heading">
            <h2>{{ $t('overview.storeHealth') }}</h2>
            <span :class="['health-badge', { warning: !connectedChannels.length || reconnectChannels.length }]">
              {{ connectedChannels.length && !reconnectChannels.length ? $t('overview.healthy') : $t('overview.actionNeeded') }}
            </span>
          </div>
          <div class="health-row">
            <span class="health-icon"><i class="el-icon-user" aria-hidden="true"></i></span>
            <div><strong>{{ $t('overview.codAccount') }}</strong><p>{{ $t('overview.codAccountCopy') }}</p></div>
            <b>{{ $t('common.connected') }}</b>
          </div>
          <div class="health-row">
            <span class="health-icon"><i class="el-icon-connection" aria-hidden="true"></i></span>
            <div><strong>{{ $t('overview.storeConnection') }}</strong><p>{{ connectedChannels.length ? $t('overview.storeConnectedCopy', { count: connectedChannels.length }) : $t('overview.storeMissingCopy') }}</p></div>
            <b>{{ connectedChannels.length || $t('common.notConnected') }}</b>
          </div>
          <div class="health-row">
            <span class="health-icon"><i class="el-icon-finished" aria-hidden="true"></i></span>
            <div><strong>{{ $t('overview.reviewProtection') }}</strong><p>{{ $t('overview.reviewProtectionCopy') }}</p></div>
            <b>{{ $t('overview.enabled') }}</b>
          </div>
          <div class="health-row">
            <span class="health-icon"><i class="el-icon-document" aria-hidden="true"></i></span>
            <div><strong>{{ $t('overview.contentLanguage') }}</strong><p>{{ $t('overview.contentLanguageCopy') }}</p></div>
            <b>{{ languageName(currentLanguage) }}</b>
          </div>
          <div v-if="channels.length" class="connected-store-list">
            <div v-for="channel in channels" :key="channel.id">
              <span><strong>{{ channel.store_name || channel.shop_name || $t('common.connected') }}</strong><small>{{ channel.store_url || channel.shop_link }}</small></span>
              <b>{{ channel.is_authorize == 2 ? $t('common.reconnect') : $t('common.connected') }}</b>
            </div>
          </div>
          <router-link class="health-link" to="/account/Shopify">{{ $t('overview.openConnection') }}<i class="el-icon-right" aria-hidden="true"></i></router-link>
        </aside>
      </section>

      <section class="progress-panel">
        <div class="section-title-row">
          <div><h2>{{ $t('overview.currentProgress') }}</h2><p>{{ $t('overview.currentProgressCopy') }}</p></div>
        </div>
        <ol class="progress-grid">
          <li v-for="step in launchSteps" :key="step.key" :class="{ done: step.done }">
            <span><i :class="step.done ? 'el-icon-check' : 'el-icon-right'" aria-hidden="true"></i></span>
            <div><strong>{{ step.title }}</strong><p>{{ step.copy }}</p></div>
          </li>
        </ol>
      </section>

      <section class="week-panel">
        <div class="section-title-row">
          <div><h2>{{ $t('overview.thisWeek') }}</h2><p>{{ $t('overview.thisWeekCopy') }}</p></div>
          <router-link to="/account/ProductList">{{ $t('overview.viewAllWork') }}<i class="el-icon-right" aria-hidden="true"></i></router-link>
        </div>
        <div class="week-metrics">
          <div><strong>{{ weeklyDraftCount }}</strong><span>{{ $t('overview.weekDrafts') }}</span></div>
          <div><strong>{{ weeklyPublishedCount }}</strong><span>{{ $t('overview.weekPublished') }}</span></div>
          <div><strong>{{ connectedChannels.length }}</strong><span>{{ $t('overview.totalStores') }}</span></div>
          <div><strong class="milestone-value">{{ milestoneLabel }}</strong><span>{{ $t('overview.nextMilestone') }}</span></div>
        </div>
      </section>

      <section class="drafts-panel">
        <div class="section-title-row">
          <div><h2>{{ $t('overview.recent') }}</h2><p>{{ $t('products.subtitle') }}</p></div>
          <router-link to="/account/ProductList">{{ $t('overview.viewLibrary') }}<i class="el-icon-right" aria-hidden="true"></i></router-link>
        </div>
        <div v-if="drafts.length" class="draft-list">
          <article v-for="draft in drafts.slice(0, 6)" :key="draft.id" class="draft-row">
            <img v-if="draft.sourceSnapshot.images && draft.sourceSnapshot.images[0]" :src="draft.sourceSnapshot.images[0]" alt="" />
            <div v-else class="draft-image-fallback" aria-hidden="true">Co</div>
            <div class="draft-copy"><strong>{{ draft.merchantContent.title || draft.sourceSnapshot.title }}</strong><p>{{ languageName(draft.targetLanguage) }} · {{ $t('common.revision', { value: draft.revision }) }} · {{ draftDate(draft.updatedAt) }}</p></div>
            <span class="draft-status">{{ statusName(draft.status) }}</span>
            <router-link :to="draftRoute(draft)">{{ $t('common.continue') }}<i class="el-icon-right" aria-hidden="true"></i></router-link>
          </article>
        </div>
        <div v-else class="empty-state">
          <div><h3>{{ $t('overview.noDraft') }}</h3><p>{{ $t('overview.noDraftCopy') }}</p></div>
          <a :href="storefrontUrl">{{ $t('products.browse') }}</a>
        </div>
      </section>
    </template>
  </main>
</template>

<script>
import { getListingChannels, getListingDrafts } from '@/api/listing'
import { contentLanguages, getContentLanguage } from '@/utils/contentLanguage'

export default {
  data() {
    return {
      loading: true,
      error: '',
      dataWarning: false,
      drafts: [],
      channels: [],
      storefrontUrl: `${window.location.protocol}//${window.location.host.replace(':8083', ':3000')}`,
    }
  },
  computed: {
    currentLanguage() { return this.$workspaceLocale.locale || getContentLanguage() },
    account() {
      try { return JSON.parse(window.localStorage.getItem('userInfo') || '{}') } catch { return {} }
    },
    displayName() {
      const value = this.account.user_name || this.account.name || this.account.email || this.$t('header.accountFallback')
      const base = String(value).includes('@') ? String(value).split('@')[0].split(/[._-]/)[0] : String(value).split(/\s+/)[0]
      return base ? `${base.charAt(0).toUpperCase()}${base.slice(1)}` : this.$t('header.accountFallback')
    },
    localizedDate() {
      try { return new Intl.DateTimeFormat(this.currentLanguage, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()) }
      catch { return this.$t('overview.today') }
    },
    greeting() {
      const hour = new Date().getHours()
      return this.$t(hour < 12 ? 'overview.greetingMorning' : hour < 18 ? 'overview.greetingAfternoon' : 'overview.greetingEvening')
    },
    connectedChannels() { return this.channels.filter((channel) => channel.is_authorize != 2) },
    reconnectChannels() { return this.channels.filter((channel) => channel.is_authorize == 2) },
    publishedCount() { return this.drafts.filter((draft) => draft.status === 'published').length },
    reviewDrafts() { return this.drafts.filter((draft) => draft.status !== 'published') },
    latestDraft() { return this.reviewDrafts[0] || this.drafts[0] || null },
    latestDraftRoute() { return this.latestDraft ? this.draftRoute(this.latestDraft) : '/account/ProductList' },
    recommendationType() {
      if (!this.connectedChannels.length) return 'connect'
      if (this.reviewDrafts.length) return 'review'
      return 'source'
    },
    recommendationTitle() { return this.$t(`overview.recommend${this.capitalize(this.recommendationType)}Title`) },
    recommendationCopy() {
      return this.$t(`overview.recommend${this.capitalize(this.recommendationType)}Copy`, { count: this.drafts.length })
    },
    milestoneLabel() { return this.$t(`overview.milestone${this.capitalize(this.recommendationType)}`) },
    decisionCards() {
      const cards = []
      if (this.reconnectChannels.length) cards.push({ key: 'reconnect', icon: 'el-icon-warning-outline', priority: this.$t('overview.reconnectPriority'), title: this.$t('overview.reconnectDecision'), copy: this.$t('overview.reconnectDecisionCopy', { count: this.reconnectChannels.length }), to: '/account/Shopify' })
      else if (!this.connectedChannels.length) cards.push({ key: 'connect', icon: 'el-icon-connection', priority: this.$t('overview.connectPriority'), title: this.$t('overview.connectDecision'), copy: this.$t('overview.connectDecisionCopy'), to: '/account/Shopify' })
      if (this.reviewDrafts.length) cards.push({ key: 'review', icon: 'el-icon-document-checked', priority: this.$t('overview.reviewPriority'), title: this.$t('overview.reviewDecision'), copy: this.$t('overview.reviewDecisionCopy', { count: this.reviewDrafts.length }), to: this.latestDraftRoute })
      if (!this.drafts.length) cards.push({ key: 'source', icon: 'el-icon-search', priority: this.$t('overview.sourcePriority'), title: this.$t('overview.sourceDecision'), copy: this.$t('overview.sourceDecisionCopy'), href: this.storefrontUrl })
      return cards.slice(0, 3)
    },
    launchSteps() {
      return [
        { key: 'choose', done: Boolean(this.drafts.length), title: this.$t('overview.stepChoose'), copy: this.$t('overview.stepChooseCopy') },
        { key: 'prepare', done: Boolean(this.drafts.length), title: this.$t('overview.stepPrepare'), copy: this.$t('overview.stepPrepareCopy') },
        { key: 'connect', done: Boolean(this.connectedChannels.length), title: this.$t('overview.stepConnect'), copy: this.$t('overview.stepConnectCopy') },
        { key: 'publish', done: Boolean(this.publishedCount), title: this.$t('overview.stepPublish'), copy: this.$t('overview.stepPublishCopy') },
      ]
    },
    weeklyDraftCount() { return this.drafts.filter((draft) => this.isThisWeek(draft.createdAt)).length },
    weeklyPublishedCount() { return this.drafts.filter((draft) => draft.status === 'published' && this.isThisWeek(draft.updatedAt)).length },
  },
  created() { this.$emit('menu', 'dashboard') },
  mounted() { this.load() },
  methods: {
    async load() {
      this.loading = true
      this.error = ''
      this.dataWarning = false
      const [draftResult, channelResult] = await Promise.all([
        getListingDrafts().then((value) => ({ ok: true, value })).catch((error) => ({ ok: false, error })),
        getListingChannels().then((value) => ({ ok: true, value })).catch((error) => ({ ok: false, error })),
      ])
      if (draftResult.ok) this.drafts = draftResult.value.data || []
      if (channelResult.ok) this.channels = channelResult.value.data || []
      if (!draftResult.ok && !channelResult.ok) this.error = draftResult.error?.message || channelResult.error?.message || this.$t('overview.errorFallback')
      else if (!draftResult.ok || !channelResult.ok) this.dataWarning = true
      this.loading = false
    },
    capitalize(value) { return `${value.charAt(0).toUpperCase()}${value.slice(1)}` },
    languageName(value) { return contentLanguages.find((item) => item.value === value)?.label || contentLanguages[0].label },
    statusName(value) { return ({ draft: this.$t('common.draft'), ai_processing: this.$t('common.aiProcessing'), ai_ready: this.$t('common.aiReady'), ready: this.$t('common.ready'), publishing: this.$t('common.publishing'), published: this.$t('common.published') })[value] || this.$t('common.draft') },
    draftRoute(draft) { return { path: '/account/Publish', query: { draft: draft.id, mode: draft.mode, language: draft.targetLanguage } } },
    draftDate(value) {
      if (!value) return ''
      try { return this.$t('overview.updatedDraft', { value: new Intl.DateTimeFormat(this.currentLanguage, { month: 'short', day: 'numeric' }).format(new Date(value)) }) }
      catch { return '' }
    },
    isThisWeek(value) {
      if (!value) return false
      const date = new Date(value)
      const start = new Date()
      const day = (start.getDay() + 6) % 7
      start.setHours(0, 0, 0, 0)
      start.setDate(start.getDate() - day)
      return date >= start
    },
  },
}
</script>

<style scoped>
.today-page { min-height: 100%; padding: 34px; background: #f4f6f3; color: #202522; font-size: 16px; line-height: 1.55; }
.today-intro, .account-notice, .decision-section, .focus-grid, .progress-panel, .week-panel, .drafts-panel, .dashboard-loading, .dashboard-error, .partial-warning { width: min(1380px, 100%); margin-left: auto; margin-right: auto; }
.today-intro { padding: 4px 0 25px; }
.today-date { margin: 0 0 9px; color: #d85020; font-size: 15px; font-weight: 800; }
.intro-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 28px; }
.today-intro h1 { margin: 0; font-size: clamp(34px, 3.1vw, 46px); line-height: 1.1; letter-spacing: -.025em; font-weight: 650; }
.today-intro .intro-row p { margin: 10px 0 0; color: #68706a; font-size: 17px; }
.top-action, .primary-button, .secondary-button { min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 9px; border-radius: 9px; padding: 0 18px; font-weight: 800; white-space: nowrap; }
.top-action, .primary-button { border: 1px solid #d94f1d; background: #e45a27; color: #fff; }
.top-action:active, .primary-button:active, .secondary-button:active { transform: translateY(1px); }
.account-notice { display: flex; align-items: center; gap: 9px; min-height: 42px; margin-bottom: 28px; padding: 0 13px; border: 1px solid #dfe4df; border-radius: 9px; background: #f8faf7; color: #6b746d; font-size: 14px; }
.account-notice i, .approval-note i { color: #287654; }
.section-title-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 15px; }
.section-title-row h2 { margin: 0; font-size: 22px; font-weight: 650; }
.section-title-row p { margin: 3px 0 0; color: #717a73; font-size: 14px; }
.section-title-row > a, .health-link { color: #d84f1d; font-size: 14px; font-weight: 800; white-space: nowrap; }
.section-title-row > a i, .health-link i { margin-left: 7px; }
.decision-section { margin-bottom: 22px; }
.decision-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
.decision-card { min-height: 126px; display: grid; grid-template-columns: 42px minmax(0, 1fr) 32px; align-items: center; gap: 13px; padding: 18px; border: 1px solid #dce1dc; border-radius: 12px; background: #fff; box-shadow: 0 9px 24px rgba(41, 54, 44, .035); }
.decision-card.priority { border-color: #efb799; background: #fffaf7; }
.decision-icon, .health-icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 10px; background: #f0f3ef; color: #dd5524; font-size: 19px; }
.decision-card small, .decision-card strong, .decision-card p { display: block; }
.decision-card small { margin-bottom: 3px; color: #de5421; font-size: 13px; font-weight: 800; }
.decision-card strong { color: #29302b; font-size: 16px; }
.decision-card p { margin: 3px 0 0; color: #737b75; font-size: 13px; }
.decision-card > a { display: grid; place-items: center; width: 32px; height: 40px; color: #39423b; }
.focus-grid { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(320px, .75fr); gap: 14px; margin-bottom: 22px; }
.recommendation-card, .health-card, .progress-panel, .week-panel, .drafts-panel, .dashboard-loading, .dashboard-error { border: 1px solid #dce1dc; border-radius: 12px; background: #fff; box-shadow: 0 10px 28px rgba(40, 54, 43, .045); }
.recommendation-card { padding: 24px; }
.recommendation-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 22px; }
.recommendation-label { margin: 0 0 4px; color: #dc5422; font-size: 14px; font-weight: 800; }
.recommendation-heading h2 { margin: 0; max-width: 720px; font-size: 25px; line-height: 1.3; font-weight: 650; }
.evidence-badge, .health-badge, .draft-status { display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 10px; border: 1px solid #b7d6c3; border-radius: 999px; background: #edf7f0; color: #287250; font-size: 12px; font-weight: 800; white-space: nowrap; }
.recommendation-copy { max-width: 850px; margin: 18px 0; color: #667068; }
.evidence-metrics, .week-metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid #dfe4df; border-bottom: 1px solid #dfe4df; }
.evidence-metrics > div, .week-metrics > div { min-width: 0; padding: 16px 15px; border-right: 1px solid #dfe4df; }
.evidence-metrics > div:first-child, .week-metrics > div:first-child { padding-left: 0; }
.evidence-metrics > div:last-child, .week-metrics > div:last-child { border-right: 0; }
.evidence-metrics strong, .evidence-metrics span, .week-metrics strong, .week-metrics span { display: block; }
.evidence-metrics strong, .week-metrics strong { font-size: 24px; line-height: 1.2; }
.evidence-metrics span, .week-metrics span { margin-top: 4px; color: #7b837d; font-size: 13px; }
.milestone-value { overflow: hidden; text-overflow: ellipsis; font-size: 17px !important; white-space: nowrap; }
.recommendation-actions { display: flex; gap: 9px; margin-top: 18px; }
.secondary-button { border: 1px solid #cfd6cf; background: #fff; color: #343c36; }
.approval-note { margin: 13px 0 0; color: #287250; font-size: 13px; }
.health-card { padding: 20px; }
.health-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-bottom: 9px; }
.health-heading h2 { margin: 0; font-size: 20px; }
.health-badge.warning { border-color: #efc4ab; background: #fff3eb; color: #a34a25; }
.health-row { display: grid; grid-template-columns: 40px minmax(0, 1fr) auto; align-items: center; gap: 11px; padding: 14px 0; border-bottom: 1px solid #e1e5e1; }
.health-row strong, .health-row p { display: block; }
.health-row strong { font-size: 15px; }
.health-row p { margin: 2px 0 0; color: #7a827c; font-size: 12px; }
.health-row > b { color: #687169; font-size: 12px; text-align: right; }
.connected-store-list { margin-top: 10px; padding: 8px 11px; border-radius: 9px; background: #f5f7f4; }
.connected-store-list > div { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 7px 0; }
.connected-store-list span strong, .connected-store-list span small { display: block; }
.connected-store-list span small { color: #7d857e; }
.connected-store-list b { color: #287250; font-size: 12px; }
.health-link { display: flex; justify-content: space-between; padding-top: 15px; }
.progress-panel, .week-panel, .drafts-panel { padding: 22px; margin-bottom: 22px; }
.progress-grid { list-style: none; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; margin: 0; padding: 0; border: 1px solid #dfe4df; border-radius: 10px; overflow: hidden; }
.progress-grid li { min-height: 108px; display: grid; grid-template-columns: 34px minmax(0, 1fr); align-items: center; gap: 11px; padding: 16px; border-right: 1px solid #dfe4df; background: #fafbfa; }
.progress-grid li:last-child { border-right: 0; }
.progress-grid li > span { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; background: #e7eae7; color: #68716a; }
.progress-grid li.done > span { background: #e45a27; color: #fff; }
.progress-grid strong { display: block; font-size: 15px; }
.progress-grid p { margin: 3px 0 0; color: #7a827c; font-size: 12px; }
.week-metrics { border-right: 0; border-left: 0; }
.draft-list { border: 1px solid #dfe4df; border-radius: 10px; overflow: hidden; }
.draft-row { display: grid; grid-template-columns: 58px minmax(0, 1fr) 120px 100px; align-items: center; gap: 14px; padding: 12px 14px; border-bottom: 1px solid #e2e6e2; }
.draft-row:last-child { border-bottom: 0; }
.draft-row img, .draft-image-fallback { width: 58px; height: 58px; border-radius: 8px; object-fit: cover; background: #eef1ee; }
.draft-image-fallback { display: grid; place-items: center; color: #c44a1d; font-weight: 900; }
.draft-copy { min-width: 0; }
.draft-copy strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.draft-copy p { margin: 4px 0 0; color: #79817b; font-size: 13px; }
.draft-row > a { color: #d74f1d; font-size: 14px; font-weight: 800; text-align: right; white-space: nowrap; }
.draft-row > a i { margin-left: 5px; }
.empty-state { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 20px; border-radius: 10px; background: #f5f7f4; }
.empty-state h3 { margin: 0; font-size: 17px; }
.empty-state p { margin: 4px 0 0; color: #717a73; }
.empty-state a { color: #d74f1d; font-weight: 800; }
.dashboard-loading { padding: 25px; }
.skeleton-line, .skeleton-grid span { border-radius: 8px; background: linear-gradient(90deg, #edf0ed, #f8faf8, #edf0ed); background-size: 200% 100%; animation: loading 1.4s infinite; }
.skeleton-line { height: 24px; }.skeleton-line.wide { width: 42%; }.skeleton-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; }.skeleton-grid span { height: 120px; }
.dashboard-error { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px; color: #8e352d; background: #fff5f3; }
.dashboard-error p { margin: 4px 0 0; }.dashboard-error button { min-height: 40px; padding: 0 15px; border: 1px solid #b64a40; border-radius: 8px; background: #fff; color: #8e352d; font-weight: 800; }
.partial-warning { margin-bottom: 20px; padding: 12px 14px; border: 1px solid #edc6aa; border-radius: 9px; background: #fff7f0; color: #8d4a27; }
@keyframes loading { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .skeleton-line, .skeleton-grid span { animation: none; } * { transition: none !important; } }
@media (max-width: 1100px) { .focus-grid { grid-template-columns: 1fr; }.progress-grid { grid-template-columns: repeat(2, 1fr); }.progress-grid li:nth-child(2) { border-right: 0; }.progress-grid li:nth-child(-n+2) { border-bottom: 1px solid #dfe4df; } }
@media (max-width: 780px) { .today-page { padding: 20px; }.intro-row, .recommendation-heading, .section-title-row, .dashboard-error, .empty-state { align-items: flex-start; flex-direction: column; }.top-action { width: 100%; }.decision-grid, .skeleton-grid { grid-template-columns: 1fr; }.evidence-metrics, .week-metrics { grid-template-columns: repeat(2, 1fr); }.evidence-metrics > div:nth-child(2), .week-metrics > div:nth-child(2) { border-right: 0; }.evidence-metrics > div:nth-child(-n+2), .week-metrics > div:nth-child(-n+2) { border-bottom: 1px solid #dfe4df; }.evidence-metrics > div:nth-child(3), .week-metrics > div:nth-child(3) { padding-left: 0; }.progress-grid { grid-template-columns: 1fr; }.progress-grid li, .progress-grid li:nth-child(2) { border-right: 0; border-bottom: 1px solid #dfe4df; }.progress-grid li:last-child { border-bottom: 0; }.draft-row { grid-template-columns: 52px minmax(0, 1fr) auto; }.draft-row img, .draft-image-fallback { width: 52px; height: 52px; }.draft-status { display: none; }.recommendation-actions { flex-direction: column; }.recommendation-actions > a { width: 100%; }.today-intro h1 { font-size: 34px; } }
</style>
