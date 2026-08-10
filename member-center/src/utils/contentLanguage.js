export const contentLanguages = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '简体中文' },
  { value: 'es-ES', label: 'Español' },
  { value: 'fr-FR', label: 'Français' },
  { value: 'de-DE', label: 'Deutsch' },
  { value: 'pt-BR', label: 'Português' },
  { value: 'ar-SA', label: 'العربية' },
  { value: 'ja-JP', label: '日本語' },
  { value: 'ko-KR', label: '한국어' },
  { value: 'ru-RU', label: 'Русский' },
]

const key = 'cod_global_content_language'

export function getContentLanguage() {
  const value = localStorage.getItem(key)
  return contentLanguages.some((item) => item.value === value) ? value : 'en-US'
}

export function setContentLanguage(value) {
  const safeValue = contentLanguages.some((item) => item.value === value) ? value : 'en-US'
  localStorage.setItem(key, safeValue)
  document.cookie = `${key}=${encodeURIComponent(safeValue)};path=/;max-age=31536000;samesite=lax`
  document.documentElement.lang = safeValue
  document.documentElement.dir = safeValue === 'ar-SA' ? 'rtl' : 'ltr'
  import('@/i18n/workspace').then(({ setWorkspaceLocale }) => setWorkspaceLocale(safeValue))
  window.dispatchEvent(new CustomEvent('cod-content-language-change', { detail: safeValue }))
  return safeValue
}
