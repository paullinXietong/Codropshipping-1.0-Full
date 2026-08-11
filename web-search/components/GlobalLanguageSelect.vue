<template>
  <label class="global-language" data-no-translate :title="label">
    <span class="language-mark" aria-hidden="true">文</span>
    <select v-model="selected" :aria-label="label" @change="changeLanguage">
      <option v-for="language in languages" :key="language.value" :value="language.value">{{ language.label }}</option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

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
const labels: Record<string, string> = {
  'en-US': 'Site and listing language',
  'zh-CN': '网站与刊登语言',
  'es-ES': 'Idioma del sitio y publicación',
  'fr-FR': 'Langue du site et de publication',
  'de-DE': 'Website- und Angebotssprache',
  'pt-BR': 'Idioma do site e do anúncio',
  'ar-SA': 'لغة الموقع والإدراج',
  'ja-JP': 'サイトと出品の言語',
  'ko-KR': '사이트 및 등록 언어',
  'ru-RU': 'Язык сайта и публикации',
}
const label = computed(() => labels[selected.value] || labels['en-US'])

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
  applyLanguage(window.localStorage.getItem('cod_global_content_language') || 'en-US')
})
</script>

<style scoped>
.global-language { position: relative; display: inline-flex; flex: 0 0 auto; align-items: center; height: 40px; margin: 0 10px 0 2px; padding: 3px 7px 3px 4px; border: 1px solid rgba(61, 68, 65, .18); border-radius: 9px; background: rgba(255, 255, 255, .92); color: #252b27; font-size: 14px; font-weight: 700; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .72); }
.language-mark { width: 30px; height: 30px; display: grid; flex: 0 0 auto; place-items: center; border-radius: 7px; background: #fff0e9; color: #c94a1f; font-size: 14px; font-weight: 900; }
.global-language select { width: 108px; height: 32px; border: 0; outline: 0; background: transparent; padding: 0 4px 0 8px; color: #252b27; font: inherit; cursor: pointer; }
.global-language:focus-within { border-color: #d94f20; box-shadow: 0 0 0 3px rgba(217, 79, 32, .14); }
@media (max-width: 760px) { .global-language { margin-right: 4px; }.global-language select { width: 92px; }.language-mark { display: none; } }
</style>
