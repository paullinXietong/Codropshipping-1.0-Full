export const contentLanguages = [
  { value: 'en-US', label: 'English' }, { value: 'zh-CN', label: '简体中文' },
  { value: 'es-ES', label: 'Español' }, { value: 'fr-FR', label: 'Français' },
  { value: 'de-DE', label: 'Deutsch' }, { value: 'pt-BR', label: 'Português' },
  { value: 'ar-SA', label: 'العربية' }, { value: 'ja-JP', label: '日本語' },
  { value: 'ko-KR', label: '한국어' }, { value: 'ru-RU', label: 'Русский' },
]

export function getContentLanguage() {
  if (!process.client) return 'en-US'
  const value = window.localStorage.getItem('cod_global_content_language') || 'en-US'
  return contentLanguages.some((item) => item.value === value) ? value : 'en-US'
}

export function setContentLanguage(value: string) {
  const safe = contentLanguages.some((item) => item.value === value) ? value : 'en-US'
  if (process.client) {
    window.localStorage.setItem('cod_global_content_language', safe)
    window.dispatchEvent(new CustomEvent('cod-content-language-change', { detail: safe }))
  }
  return safe
}
