<template><main class="module-page"><header><span>{{ $t('brand.workspace') }}</span><h1>{{ title }}</h1><p>{{ copy }}</p></header><section><i class="el-icon-data-analysis" aria-hidden="true"></i><h2>{{ $t('modules.emptyTitle') }}</h2><p>{{ $t('modules.emptyCopy') }}</p><router-link to="/main/dashboard">{{ $t('modules.back') }}</router-link></section></main></template>
<script>
export default { props: { moduleKey: { type: String, required: true } }, computed: { title() { return this.$t(`modules.${this.moduleKey}Title`) }, copy() { return this.$t(`modules.${this.moduleKey}Copy`) } } }
</script>
<style scoped>
.module-page { max-width: 1440px; margin: 0 auto; padding: 44px 36px; color: #202522; font-size: 16px; }.module-page header span { color: #a94825; font-size: 13px; font-weight: 900; letter-spacing: .05em; text-transform: uppercase; }.module-page h1 { margin: 8px 0; font-size: 40px; }.module-page header p { max-width: 720px; margin: 0; color: #626a63; font-size: 18px; line-height: 1.6; }.module-page section { min-height: 320px; margin-top: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 35px; border: 1px solid #d9ded9; border-radius: 12px; background: #fff; text-align: center; }.module-page section i { color: #e85524; font-size: 34px; }.module-page section h2 { margin: 18px 0 7px; }.module-page section p { max-width: 560px; margin: 0; color: #687069; }.module-page section a { margin-top: 22px; color: #b34720; font-weight: 900; }
@media (max-width: 700px) { .module-page { padding: 26px 18px; }.module-page h1 { font-size: 32px; } }
</style>

