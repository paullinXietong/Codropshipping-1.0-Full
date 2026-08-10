<template>
  <main class="studio-page">
    <header><span>{{ $t('studio.eyebrow') }}</span><h1>{{ $t('studio.title') }}</h1><p>{{ $t('studio.subtitle') }}</p><a :href="storefrontUrl">{{ $t('studio.action') }}</a></header>
    <section class="control-note"><i class="el-icon-lock" aria-hidden="true"></i><div><h2>{{ $t('studio.ruleTitle') }}</h2><p>{{ $t('studio.ruleCopy') }}</p></div></section>
    <section class="workflow"><h2>{{ $t('studio.workflow') }}</h2><ol><li v-for="step in 4" :key="step"><span>{{ step }}</span><strong>{{ $t(`studio.step${step}`) }}</strong></li></ol></section>
  </main>
</template>
<script>
export default { data() { return { storefrontUrl: `${window.location.protocol}//${window.location.host.replace(':8083', ':3000')}` } } }
</script>
<style scoped>
.studio-page { max-width: 1440px; margin: 0 auto; padding: 44px 36px; color: #202522; font-size: 16px; }.studio-page header { min-height: 300px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 42px; border-radius: 14px; background: #222823; color: #fff; }.studio-page header span { color: #ff8a5f; font-size: 13px; font-weight: 900; letter-spacing: .05em; text-transform: uppercase; }.studio-page h1 { max-width: 760px; margin: 12px 0; font-size: clamp(34px, 4vw, 52px); line-height: 1.08; }.studio-page header p { max-width: 700px; margin: 0 0 26px; color: #c9d0ca; font-size: 18px; line-height: 1.6; }.studio-page header a { min-height: 48px; display: inline-flex; align-items: center; padding: 0 22px; border-radius: 8px; background: #e85524; color: #fff; font-weight: 900; }.control-note { display: flex; gap: 18px; margin: 22px 0; padding: 24px; border: 1px solid #d9ded9; border-radius: 12px; background: #fff; }.control-note i { color: #e85524; font-size: 26px; }.control-note h2, .control-note p { margin: 0; }.control-note p { margin-top: 6px; color: #626a63; }.workflow { padding: 30px; border: 1px solid #d9ded9; border-radius: 12px; background: #fff; }.workflow h2 { margin: 0 0 22px; font-size: 24px; }.workflow ol { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; list-style: none; margin: 0; padding: 0; }.workflow li { min-height: 130px; padding: 18px; border-left: 3px solid #e85524; background: #f3f5f2; }.workflow li span, .workflow li strong { display: block; }.workflow li span { color: #a94b29; font-size: 13px; font-weight: 900; }.workflow li strong { margin-top: 20px; line-height: 1.45; }
@media (max-width: 850px) { .studio-page { padding: 24px 18px; }.studio-page header { padding: 28px; }.workflow ol { grid-template-columns: 1fr 1fr; } } @media (max-width: 520px) { .workflow ol { grid-template-columns: 1fr; } }
</style>

