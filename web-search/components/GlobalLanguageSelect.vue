<template>
  <label class="global-language" data-no-translate :title="label">
    <span class="language-mark" aria-hidden="true">文</span>
    <span v-if="statusText" class="language-status" aria-live="polite">{{ statusText }}</span>
    <i v-if="translationState === 'translating'" class="translation-spinner" aria-hidden="true"></i>
    <select v-model="selected" :aria-label="label" @change="changeLanguage">
      <option v-for="language in languages" :key="language.value" :value="language.value">{{ language.label }}</option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const languages = [
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
const selected = ref('en-US')
const translationState = ref('idle')
const labels: Record<string, { label: string, translating: string, error: string }> = {
  'en-US': { label: 'Site and listing language', translating: 'Translating page…', error: 'Translation unavailable' },
  'zh-CN': { label: '网站与刊登语言', translating: '正在翻译页面…', error: '页面翻译暂不可用' },
  'es-ES': { label: 'Idioma del sitio y publicación', translating: 'Traduciendo página…', error: 'Traducción no disponible' },
  'fr-FR': { label: 'Langue du site et de publication', translating: 'Traduction de la page…', error: 'Traduction indisponible' },
  'de-DE': { label: 'Website- und Angebotssprache', translating: 'Seite wird übersetzt…', error: 'Übersetzung nicht verfügbar' },
  'pt-BR': { label: 'Idioma do site e do anúncio', translating: 'Traduzindo página…', error: 'Tradução indisponível' },
  'ar-SA': { label: 'لغة الموقع والإدراج', translating: 'جارٍ ترجمة الصفحة…', error: 'الترجمة غير متاحة' },
  'ja-JP': { label: 'サイトと出品の言語', translating: 'ページを翻訳中…', error: '翻訳を利用できません' },
  'ko-KR': { label: '사이트 및 등록 언어', translating: '페이지 번역 중…', error: '번역을 사용할 수 없습니다' },
  'ru-RU': { label: 'Язык сайта и публикации', translating: 'Перевод страницы…', error: 'Перевод недоступен' },
}
const copy = computed(() => labels[selected.value] || labels['en-US'])
const label = computed(() => copy.value.label)
const statusText = computed(() => translationState.value === 'translating' ? copy.value.translating : translationState.value === 'error' ? copy.value.error : '')

function handleTranslationState(event: Event) {
  const detail = (event as CustomEvent<{ state: string, message?: string }>).detail || { state: 'idle' }
  translationState.value = detail.state
}

function applyLanguage(value: string) {
  const safeValue = languages.some((language) => language.value === value) ? value : 'en-US'
  selected.value = safeValue
  window.localStorage.setItem('cod_global_content_language', safeValue)
  document.cookie = `cod_global_content_language=${encodeURIComponent(safeValue)};path=/;max-age=31536000;samesite=lax`
  document.documentElement.lang = safeValue
  document.documentElement.dir = safeValue === 'ar-SA' ? 'rtl' : 'ltr'
  window.dispatchEvent(new CustomEvent('cod-content-language-change', { detail: safeValue }))
}

function changeLanguage() { applyLanguage(selected.value) }

onMounted(() => {
  window.addEventListener('cod-site-translation-state', handleTranslationState)
  applyLanguage(window.localStorage.getItem('cod_global_content_language') || 'en-US')
})
onBeforeUnmount(() => window.removeEventListener('cod-site-translation-state', handleTranslationState))
</script>

<style scoped>
.global-language { position: relative; display: inline-flex; flex: 0 0 auto; align-items: center; height: 40px; margin: 0 10px 0 2px; padding: 3px 7px 3px 4px; border: 1px solid rgba(61, 68, 65, .18); border-radius: 9px; background: rgba(255, 255, 255, .92); color: #252b27; font-size: 14px; font-weight: 700; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .72); }
.language-mark { width: 30px; height: 30px; display: grid; flex: 0 0 auto; place-items: center; border-radius: 7px; background: #fff0e9; color: #c94a1f; font-size: 14px; font-weight: 900; }
.language-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; }
.translation-spinner { width: 14px; height: 14px; margin-left: 6px; border: 2px solid #e3e6e3; border-top-color: #d94f20; border-radius: 50%; animation: spin .8s linear infinite; }
.global-language select { width: 108px; height: 32px; border: 0; outline: 0; background: transparent; padding: 0 4px 0 8px; color: #252b27; font: inherit; cursor: pointer; }
.global-language:focus-within { border-color: #d94f20; box-shadow: 0 0 0 3px rgba(217, 79, 32, .14); }
@media (max-width: 760px) { .global-language { margin-right: 4px; }.global-language select { width: 92px; }.language-mark { display: none; } }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
