import { ElMessage } from 'element-plus'
import {
  installWorkspaceI18n,
  setWorkspaceLocale,
} from '../../member-center/src/i18n/workspace.js'

export default defineNuxtPlugin((nuxtApp) => {
  installWorkspaceI18n(nuxtApp.vueApp)
  const globals = nuxtApp.vueApp.config.globalProperties as Record<string, any>
  globals.$message = ElMessage
  globals.$set = (target: Record<string, any>, key: string, value: any) => {
    target[key] = value
    return value
  }

  const syncLocale = (locale?: string) => {
    setWorkspaceLocale(locale || window.localStorage.getItem('cod_global_content_language') || 'en-US')
  }
  syncLocale()
  window.addEventListener('cod-content-language-change', ((event: CustomEvent<string>) => syncLocale(event.detail)) as EventListener)
})
