<template>
  <main class="login-screen">
    <section class="login-brand">
      <NuxtLink to="/" class="login-logo"><span>Co</span><strong>CoDropshipping</strong></NuxtLink>
      <div>
        <p>{{ $t('login.brand') }}</p><h1>{{ $t('login.brandTitle') }}</h1>
        <ul><li>{{ $t('login.benefitAccount') }}</li><li>{{ $t('login.benefitReview') }}</li><li>{{ $t('login.benefitStores') }}</li></ul>
      </div>
      <small>{{ $t('login.security') }}</small>
    </section>
    <section class="login-form-panel">
      <div class="login-toolbar"><GlobalLanguageSelect /><NuxtLink to="/">{{ $t('login.back') }}</NuxtLink></div>
      <form class="login-card" @submit.prevent="submit">
        <span class="login-kicker">{{ $t('login.eyebrow') }}</span>
        <h2>{{ $t(signupMode ? 'signup.title' : 'login.title') }}</h2>
        <p>{{ $t(signupMode ? 'signup.subtitle' : 'login.subtitle') }}</p>
        <label><span>{{ $t('login.email') }}</span><input v-model.trim="email" type="email" autocomplete="email" required placeholder="name@company.com" /></label>
        <label><span>{{ $t('login.password') }}</span><input v-model="password" type="password" :autocomplete="signupMode ? 'new-password' : 'current-password'" required :minlength="signupMode ? 6 : undefined" maxlength="18" :placeholder="$t('login.passwordPlaceholder')" /></label>
        <template v-if="signupMode">
          <label><span>{{ $t('signup.confirmPassword') }}</span><input v-model="confirmPassword" type="password" autocomplete="new-password" required minlength="6" maxlength="18" :placeholder="$t('signup.confirmPasswordPlaceholder')" /></label>
          <label><span>{{ $t('signup.whatsapp') }}</span><input v-model.trim="whatsapp" type="tel" autocomplete="tel" required :placeholder="$t('signup.whatsappPlaceholder')" /></label>
          <label><span>{{ $t('signup.code') }}</span><div class="verification-field"><input v-model.trim="verifyCode" required inputmode="numeric" :placeholder="$t('signup.codePlaceholder')" /><button type="button" :disabled="codeSending || countdown > 0 || !email" @click="sendCode">{{ countdown > 0 ? `${countdown}s` : codeSending ? $t('signup.codeSending') : $t('signup.codeSend') }}</button></div></label>
          <label><span>{{ $t('signup.referral') }}</span><input v-model.trim="referral" :placeholder="$t('signup.referralPlaceholder')" /></label>
          <label class="terms-check"><input v-model="accepted" type="checkbox" required /><span>{{ $t('signup.terms') }} <a href="https://www.cargosoon.com/terms" target="_blank" rel="noopener">{{ $t('signup.termsLink') }}</a> {{ $t('signup.and') }} <a href="https://www.cargosoon.com/privacy" target="_blank" rel="noopener">{{ $t('signup.privacyLink') }}</a></span></label>
        </template>
        <div v-if="error" class="login-error" role="alert">{{ error }}</div>
        <button type="submit" :disabled="loading || signupMode && !accepted">{{ loading ? $t(signupMode ? 'signup.submitting' : 'login.submitting') : $t(signupMode ? 'signup.submit' : 'login.submit') }}</button>
        <p v-if="signupMode" class="login-help">{{ $t('signup.existing') }} <NuxtLink to="/admin/login">{{ $t('signup.login') }}</NuxtLink></p>
        <p v-else class="login-help">{{ $t('login.new') }} <NuxtLink to="/admin/signUp">{{ $t('signup.submit') }}</NuxtLink></p>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { reqUserLogin, reqUserRegister, sendVerify } from '~/api/user'
import { translate } from '../../../member-center/src/i18n/workspace.js'

const props = withDefaults(defineProps<{ mode?: 'login' | 'signup' }>(), { mode: 'login' })
const route = useRoute()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const whatsapp = ref('')
const verifyCode = ref('')
const referral = ref('')
const accepted = ref(false)
const codeSending = ref(false)
const countdown = ref(0)
const loading = ref(false)
const error = ref('')
const signupMode = computed(() => props.mode === 'signup')

function devicePayload() {
  const ua = navigator.userAgent
  return { browser: /Chrome/i.test(ua) ? 'Chrome' : /Safari/i.test(ua) ? 'Safari' : 'Unknown', sys: /Mac/i.test(ua) ? 'Mac' : /Windows/i.test(ua) ? 'Windows' : 'Unknown', agent: ua, machine: `${window.screen.width}*${window.screen.height}`, language: navigator.language }
}

function destination() {
  const requested = typeof route.query.redirect === 'string' ? route.query.redirect : ''
  if (!requested.startsWith('/') || requested.startsWith('//')) return '/admin/main/dashboard'
  return requested.startsWith('/admin') ? requested : `/admin${requested}`
}

function saveSession(account: any) {
  window.localStorage.setItem('TOKEN', account.token)
  window.localStorage.setItem('userInfo', JSON.stringify(account))
  window.localStorage.setItem('userId', JSON.stringify(account.id))
  window.localStorage.setItem('userImg', JSON.stringify(account.img || ''))
  window.localStorage.setItem('first_name', JSON.stringify(account.first_name || ''))
  window.localStorage.setItem('last_name', JSON.stringify(account.last_name || ''))
  window.localStorage.setItem('customer_manage', JSON.stringify(account.manage || null))
}

async function submit() {
  loading.value = true; error.value = ''
  try {
    if (signupMode.value && password.value !== confirmPassword.value) throw new Error(translate('signup.passwordMismatch'))
    const response: any = signupMode.value
      ? await reqUserRegister({ email: email.value, password: password.value, confirm_password: confirmPassword.value, whatsapp: whatsapp.value, verify_code: verifyCode.value, invitation_code: referral.value, first_name: '', last_name: '', mobile: '', source: 4, register_way: 1 })
      : await reqUserLogin({ email: email.value, password: password.value, login_way: 1, check_way: 1, mobile: '', verify_code: '', whatsapp: '', ...devicePayload() })
    if (Number(response?.code) !== 0 || !response?.data?.token) throw new Error(response?.msg || translate(signupMode.value ? 'signup.invalid' : 'login.invalid'))
    saveSession(response.data)
    await navigateTo(destination(), { replace: true })
  } catch (cause: any) { error.value = cause?.message || translate(signupMode.value ? 'signup.unavailable' : 'login.unavailable') }
  finally { loading.value = false }
}

async function sendCode() {
  if (!email.value || codeSending.value || countdown.value) return
  codeSending.value = true; error.value = ''
  try {
    const response: any = await sendVerify({ source: 4, scene: 1, send_way: 1, email: email.value, mobile: '', whatsapp: whatsapp.value, code_no: '' })
    if (Number(response?.code) !== 0) throw new Error(response?.msg || translate('signup.codeError'))
    countdown.value = 60
    const timer = window.setInterval(() => { countdown.value -= 1; if (countdown.value <= 0) window.clearInterval(timer) }, 1000)
  } catch (cause: any) { error.value = cause?.message || translate('signup.codeError') }
  finally { codeSending.value = false }
}
</script>

<style scoped>
.login-screen{min-height:100dvh;display:grid;grid-template-columns:minmax(360px,.85fr) minmax(520px,1.15fr);background:#f5f7f4;color:#202522;font-family:Arial,"PingFang SC","Microsoft YaHei",sans-serif}.login-brand{display:flex;flex-direction:column;justify-content:space-between;padding:44px 54px;background:#202521;color:#f7f8f5}.login-logo{display:flex;align-items:center;gap:12px;color:#fff}.login-logo span{width:42px;height:42px;display:grid;place-items:center;border-radius:10px;background:#e85524;font-weight:900}.login-logo strong{font-size:18px}.login-brand>div{max-width:580px}.login-brand p{margin:0 0 14px;color:#ff8c62;font-weight:800}.login-brand h1{margin:0;font-size:clamp(36px,4.2vw,58px);line-height:1.04;letter-spacing:-.04em}.login-brand ul{display:grid;gap:13px;margin:34px 0 0;padding:0;list-style:none;color:#cbd2cc}.login-brand li{padding-left:21px;position:relative}.login-brand li:before{content:'✓';position:absolute;left:0;color:#ff8c62;font-weight:900}.login-brand small{color:#99a39b}.login-form-panel{display:grid;grid-template-rows:auto 1fr;padding:28px 42px;overflow:auto}.login-toolbar{display:flex;justify-content:flex-end;align-items:center;gap:18px}.login-toolbar a{color:#a8441e;font-weight:800}.login-card{width:min(510px,100%);align-self:center;justify-self:center;margin:30px 0;padding:38px;border:1px solid #dce1dc;border-radius:14px;background:#fff;box-shadow:0 18px 50px rgba(30,42,33,.08)}.login-kicker{color:#b34720;font-size:13px;font-weight:900}.login-card h2{margin:9px 0 7px;font-size:34px;letter-spacing:-.03em}.login-card>p{margin:0 0 24px;color:#687169}.login-card label{display:grid;gap:8px;margin-top:17px;color:#424b44;font-weight:800}.login-card input{height:48px;padding:0 13px;border:1px solid #cfd6cf;border-radius:9px;background:#fff;color:#222a24;font:inherit}.login-card input:focus{outline:3px solid rgba(232,85,36,.13);border-color:#e85524}.login-card>button{width:100%;height:48px;margin-top:22px;border:0;border-radius:9px;background:#da501f;color:#fff;font:inherit;font-weight:900;cursor:pointer}.login-card>button:disabled{opacity:.58;cursor:wait}.login-error{margin-top:16px;padding:12px;border-radius:8px;background:#fff0eb;color:#923b20}.login-help{margin-top:19px!important;font-size:13px}.login-help a,.terms-check a{color:#a8441e;font-weight:800}.verification-field{display:grid;grid-template-columns:minmax(0,1fr) 126px;gap:9px}.verification-field button{border:0;border-radius:9px;background:#303832;color:#fff;font-weight:800}.verification-field button:disabled{opacity:.5}.terms-check{grid-template-columns:18px 1fr!important;align-items:flex-start;font-size:13px!important;font-weight:500!important}.terms-check input{width:18px;height:18px;margin-top:1px;accent-color:#da501f}@media(max-width:850px){.login-screen{grid-template-columns:1fr}.login-brand{min-height:280px;padding:28px}.login-brand h1{font-size:34px}.login-brand ul,.login-brand small{display:none}.login-form-panel{padding:20px}.login-card{padding:26px}}@media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
