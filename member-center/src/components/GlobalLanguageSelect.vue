<template>
  <label class="language-control">
    <span v-if="showLabel">{{ controlLabel }}</span>
    <select v-model="value" :aria-label="controlLabel" @change="changeLanguage">
      <option v-for="language in languages" :key="language.value" :value="language.value">
        {{ language.label }}
      </option>
    </select>
  </label>
</template>

<script>
import { contentLanguages, getContentLanguage, setContentLanguage } from '@/utils/contentLanguage'

export default {
  name: 'GlobalLanguageSelect',
  props: {
    showLabel: { type: Boolean, default: true },
  },
  data() {
    return { value: getContentLanguage(), languages: contentLanguages }
  },
  mounted() {
    this.value = getContentLanguage()
    window.addEventListener('cod-content-language-change', this.syncLanguage)
  },
  beforeDestroy() {
    window.removeEventListener('cod-content-language-change', this.syncLanguage)
  },
  computed: {
    controlLabel() {
      const labels = {
        'zh-CN': '网站与刊登语言',
        'es-ES': 'Idioma del sitio y publicación',
        'fr-FR': 'Langue du site et de publication',
        'de-DE': 'Website- und Angebotssprache',
        'pt-BR': 'Idioma do site e do anúncio',
        'ar-SA': 'لغة الموقع والإدراج',
        'ja-JP': 'サイトと出品の言語',
        'ko-KR': '사이트 및 상품 언어',
        'ru-RU': 'Язык сайта и карточки товара',
      }
      return labels[this.value] || 'Site and listing language'
    },
  },
  methods: {
    syncLanguage(event) {
      if (event.detail && event.detail !== this.value) this.value = event.detail
    },
    changeLanguage() {
      this.value = setContentLanguage(this.value)
      this.$emit('change', this.value)
    },
  },
}
</script>

<style scoped>
.language-control { display: flex; align-items: center; gap: 10px; color: #5d6673; font-size: 14px; font-weight: 600; }
.language-control select { min-width: 148px; height: 40px; padding: 0 34px 0 12px; border: 1px solid #d8dde5; border-radius: 8px; background: #fff; color: #1f252d; font: inherit; }
.language-control select:focus { outline: 3px solid rgba(232, 92, 32, .16); border-color: #e85c20; }
</style>
