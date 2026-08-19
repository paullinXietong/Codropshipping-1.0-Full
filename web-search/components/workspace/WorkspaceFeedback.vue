<template>
  <main class="simple-page">
    <header><p>{{ $t('feedback.eyebrow') }}</p><h1>{{ $t('feedback.title') }}</h1><span>{{ $t('feedback.subtitle') }}</span></header>
    <div class="feedback-grid">
      <form class="panel" @submit.prevent="submit">
        <label><span>{{ $t('feedback.typeTitle') }}</span><select v-model="type"><option value="Product experience">{{ $t('feedback.typeProduct') }}</option><option value="AI and listing">{{ $t('feedback.typeListing') }}</option><option value="Store connection">{{ $t('feedback.typeChannel') }}</option><option value="Orders and fulfillment">{{ $t('feedback.typeOperations') }}</option><option value="Billing and wallet">{{ $t('feedback.typeBilling') }}</option><option value="Other">{{ $t('feedback.typeOther') }}</option></select></label>
        <label><span>{{ $t('feedback.impactTitle') }}</span><select v-model.number="severity"><option :value="1">{{ $t('feedback.impactSuggestion') }}</option><option :value="2">{{ $t('feedback.impactBlocked') }}</option><option :value="3">{{ $t('feedback.impactUrgent') }}</option></select></label>
        <label><span>{{ $t('feedback.detailLabel') }}</span><textarea v-model.trim="content" rows="8" required minlength="10" :placeholder="$t('feedback.detailPlaceholder')"></textarea><small>{{ $t('feedback.detailHint') }}</small></label>
        <div v-if="message" :class="['message',{error}]">{{ message }}</div>
        <button type="submit" :disabled="loading || content.length < 10">{{ loading ? $t('feedback.submitting') : $t('feedback.submit') }}</button>
      </form>
      <aside class="panel help"><h2>{{ $t('feedback.helpTitle') }}</h2><ol><li>{{ $t('feedback.helpStep1') }}</li><li>{{ $t('feedback.helpStep2') }}</li><li>{{ $t('feedback.helpStep3') }}</li></ol><NuxtLink to="/support">{{ $t('feedback.contactSupport') }}</NuxtLink></aside>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { feedbackSubmit } from '~/api/order'
import { translate } from '../../../member-center/src/i18n/workspace.js'
const route=useRoute(); const type=ref('Product experience'); const severity=ref(1); const content=ref(''); const loading=ref(false); const message=ref(''); const error=ref(false)
async function submit(){loading.value=true;message.value='';error.value=false;try{const response:any=await feedbackSubmit({source:1,type:type.value,content:`Page: ${route.query.from||route.fullPath}\n${content.value}`,severity_level:severity.value,images:[]});if(Number(response?.code)!==0)throw new Error(response?.msg||translate('feedback.submitError'));message.value=translate('feedback.successCopy');content.value=''}catch(cause:any){error.value=true;message.value=cause?.message||translate('feedback.submitError')}finally{loading.value=false}}
</script>
<style scoped>
.simple-page{max-width:1200px;margin:auto;padding:40px 34px 70px;color:#202522;font-size:16px}.simple-page header p{margin:0;color:#b34720;font-weight:900}.simple-page h1{margin:8px 0;font-size:40px;letter-spacing:-.03em}.simple-page header span{color:#667068}.feedback-grid{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:20px;margin-top:26px}.panel{padding:26px;border:1px solid #dce1dc;border-radius:12px;background:#fff}.panel label{display:grid;gap:8px;margin-bottom:18px;font-weight:800}.panel input,.panel select,.panel textarea{padding:11px;border:1px solid #cfd6cf;border-radius:8px;background:#fff;font:inherit}.panel small{color:#747d76;font-weight:400}.panel button,.panel a{min-height:44px;display:inline-flex;align-items:center;padding:0 17px;border:0;border-radius:8px;background:#d95020;color:#fff;font-weight:900}.message{margin:0 0 16px;padding:12px;border-radius:8px;background:#eaf4ed;color:#26704e}.message.error{background:#fff0ea;color:#943c20}.help h2{margin-top:0}.help ol{display:grid;gap:13px;padding-left:20px;color:#687169}.help a{margin-top:16px;background:#303832}@media(max-width:800px){.feedback-grid{grid-template-columns:1fr}.simple-page{padding:26px 16px}.simple-page h1{font-size:32px}}
</style>
