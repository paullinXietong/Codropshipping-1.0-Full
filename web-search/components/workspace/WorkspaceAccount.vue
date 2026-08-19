<template>
  <main class="account-page">
    <header><p>{{ $t('account.eyebrow') }}</p><h1>{{ title }}</h1><span>{{ $t('account.subtitle') }}</span></header>
    <section>
      <dl>
        <div><dt>{{ $t('account.name') }}</dt><dd data-no-translate>{{ account.user_name || [account.first_name, account.last_name].filter(Boolean).join(' ') || '-' }}</dd></div>
        <div><dt>{{ $t('account.email') }}</dt><dd data-no-translate>{{ account.email || '-' }}</dd></div>
        <div><dt>{{ $t('account.id') }}</dt><dd data-no-translate>{{ account.id || '-' }}</dd></div>
        <div><dt>{{ $t('account.manager') }}</dt><dd data-no-translate>{{ account.manage?.englishname || account.manage?.name || $t('account.managerFallback') }}</dd></div>
      </dl>
      <p v-if="security">{{ $t('account.securityCopy') }}</p>
      <NuxtLink to="/admin/main/issus">{{ $t('account.contactSupport') }}</NuxtLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { translate } from '../../../member-center/src/i18n/workspace.js'
const props = defineProps<{ security?: boolean }>()
const title = computed(() => props.security ? translate('account.security') : translate('account.profile'))
const account = process.client ? JSON.parse(localStorage.getItem('userInfo') || '{}') : {}
</script>

<style scoped>.account-page{max-width:980px;margin:auto;padding:40px 34px;color:#202522}.account-page header p{margin:0;color:#b34720;font-weight:900}.account-page h1{margin:8px 0;font-size:40px}.account-page header span{color:#69716b}.account-page section{margin-top:25px;padding:26px;border:1px solid #dce1dc;border-radius:12px;background:#fff}.account-page dl{margin:0}.account-page dl>div{display:grid;grid-template-columns:180px 1fr;gap:18px;padding:15px 0;border-bottom:1px solid #e3e7e3}.account-page dt{color:#6f7871}.account-page dd{margin:0;font-weight:800}.account-page section p{color:#687169}.account-page a{display:inline-flex;margin-top:14px;color:#ae441d;font-weight:900}@media(max-width:600px){.account-page{padding:26px 16px}.account-page dl>div{grid-template-columns:1fr;gap:5px}}</style>
