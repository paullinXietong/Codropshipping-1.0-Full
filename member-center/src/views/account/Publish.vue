<template>
  <main class="listing-page">
    <div class="listing-header">
      <div>
        <button class="back-link" type="button" @click="$router.push('/account/ProductList')">{{ $t('listing.back') }}</button>
        <h1>{{ mode === 'ai' ? $t('listing.aiTitle') : $t('listing.manualTitle') }}</h1>
        <p>{{ $t('listing.subtitle') }}</p>
      </div>
    </div>

    <div v-if="loading" class="state-panel" aria-live="polite">
      <div class="skeleton title"></div>
      <div class="skeleton line"></div>
      <div class="skeleton line short"></div>
    </div>

    <section v-else-if="error" class="state-panel error-state">
      <h2>{{ $t('listing.openErrorTitle') }}</h2>
      <p>{{ error }}</p>
      <button class="secondary-button" type="button" @click="initialize">{{ $t('common.retry') }}</button>
    </section>

    <div v-else-if="draft" class="listing-layout">
      <div class="editor-column">
        <section class="section-block source-summary">
          <img v-if="primaryImage && !sourceImageError" :src="primaryImage" :alt="$t('listing.sourceAlt')" @error="sourceImageError = true" />
          <div v-else class="source-image-fallback" aria-hidden="true">Co</div>
          <div>
            <span class="section-label">{{ $t('listing.sourceProduct') }}</span>
            <h2>{{ draft.sourceSnapshot.title }}</h2>
            <p>{{ $t('listing.sourceNote', { id: draft.sourceProductId }) }}</p>
          </div>
        </section>

        <section class="section-block">
          <div class="section-heading compact">
            <div><span class="section-label">{{ $t('listing.storeContent') }}</span><h2>{{ $t('listing.titleDescription') }}</h2></div>
            <div class="content-heading-actions">
              <span class="save-status">{{ saveStatus }}</span>
              <button v-if="mode === 'ai' && aiUndoContent" class="text-action" type="button" :disabled="aiLoading" @click="undoAiContent">
                {{ $t('listing.aiUndo') }}
              </button>
              <button v-if="mode === 'ai'" class="ai-action-button" type="button" :disabled="aiLoading" @click="optimizeContent">
                <span aria-hidden="true">AI</span>
                {{ contentAiActionLabel }}
              </button>
            </div>
          </div>
          <div v-if="aiError" class="inline-message error-message content-ai-message">{{ aiError }}</div>
          <div v-else-if="aiUndoContent" class="inline-message success-message content-ai-message" aria-live="polite">{{ $t('listing.aiContentApplied') }}</div>
          <label class="field-label">{{ $t('listing.productTitle') }}
            <input v-model.trim="content.title" maxlength="255" type="text" />
            <span>{{ content.title.length }}/255</span>
          </label>
          <div class="description-heading">
            <strong>{{ $t('listing.productDescription') }}</strong>
            <div class="view-switch" role="group" :aria-label="$t('listing.descriptionView')">
              <button type="button" :class="{ active: descriptionView === 'preview' }" @click="descriptionView = 'preview'">{{ $t('listing.preview') }}</button>
              <button type="button" :class="{ active: descriptionView === 'edit' }" @click="descriptionView = 'edit'">{{ $t('listing.editHtml') }}</button>
            </div>
          </div>
          <iframe v-if="descriptionView === 'preview'" class="description-preview" :srcdoc="content.description" sandbox :title="$t('listing.descriptionPreview')"></iframe>
          <label v-else class="field-label compact-label">{{ $t('listing.htmlContent') }}
            <textarea v-model="content.description" rows="14" spellcheck="false"></textarea>
            <small>{{ $t('listing.htmlHelp') }}</small>
          </label>
        </section>

        <section class="section-block">
          <div class="section-heading compact">
            <div><span class="section-label">{{ $t('listing.media') }}</span><h2>{{ $t('listing.productImages') }}</h2><p>{{ $t('listing.imageIntro') }}</p></div>
            <label class="upload-button">{{ $t('listing.uploadImage') }}<input ref="imageUpload" type="file" accept="image/*" @change="uploadImage" /></label>
          </div>
          <div v-if="mode === 'ai'" class="media-ai-toolbar">
            <div class="media-ai-copy">
              <strong>{{ $t('listing.imageStyleTitle') }}</strong>
              <span>{{ aiReferenceImageUrl ? $t('listing.imageReferenceReady') : $t('listing.imageReferenceHelp') }}</span>
            </div>
            <div class="style-selector" role="group" :aria-label="$t('listing.imageStyleTitle')">
              <button
                v-for="style in aiImageStyles"
                :key="style.value"
                type="button"
                :class="['style-option', { active: aiImageStyle === style.value }]"
                :aria-pressed="aiImageStyle === style.value ? 'true' : 'false'"
                @click="selectAiImageStyle(style.value)"
              >
                <strong>{{ style.label }}</strong>
                <span>{{ style.description }}</span>
              </button>
            </div>
            <button class="ai-image-generate" type="button" :disabled="!aiReferenceImageUrl || studioImageLoading" @click="generateStudioImage()">
              {{ studioImageLoading ? $t('listing.studioCreating') : $t('listing.generateSelectedStyle', { style: selectedAiImageStyle.label }) }}
            </button>
          </div>
          <div v-if="content.images.length" class="image-grid">
            <article v-for="(image, index) in content.images" :key="`${image.url}-${index}`" :class="['image-card', { excluded: !image.selected, reference: aiReferenceImageUrl === image.url }]">
              <img :src="image.url" :alt="$t('listing.productImageAlt', { index: index + 1 })" />
              <div class="image-actions">
                <label><input v-model="image.selected" type="checkbox" /> {{ $t('listing.include') }}</label>
                <button type="button" @click="removeImage(index)">{{ $t('listing.remove') }}</button>
              </div>
              <button v-if="mode === 'ai' && image.origin !== 'ai'" class="reference-button" type="button" :disabled="studioImageLoading" @click="selectAiReference(image)">
                {{ aiReferenceImageUrl === image.url ? $t('listing.imageReferenceSelected') : $t('listing.imageUseReference') }}
              </button>
              <small>{{ image.origin === 'ai' ? $t('listing.originAiStyle', { style: imageStyleLabel(image.style) }) : image.origin === 'upload' ? $t('listing.originUpload') : $t('listing.originSupplier') }}</small>
            </article>
          </div>
          <div v-else class="empty-inline">{{ $t('listing.imageRequired') }}</div>
          <div v-if="mediaAiError" class="inline-message error-message">{{ mediaAiError }}</div>
          <p class="media-trust-copy">{{ $t('listing.imageTrust') }}</p>
        </section>

        <section class="section-block">
          <span class="section-label">{{ $t('listing.commercial') }}</span>
          <h2>{{ $t('listing.variantsHeading') }}</h2>
          <p class="section-copy">{{ $t('listing.variantsIntro') }}</p>
          <div class="variant-tools">
            <label>{{ $t('listing.searchVariants') }}<input v-model.trim="variantSearch" type="search" :placeholder="$t('listing.searchVariantsPlaceholder')" /></label>
            <div class="variant-actions">
              <span>{{ $t('listing.countOf', { visible: filteredVariants.length, total: content.variants.length }) }}</span>
              <button type="button" @click="setFilteredSelection(true)">{{ $t('listing.selectFiltered') }}</button>
              <button type="button" @click="setFilteredSelection(false)">{{ $t('listing.clearFiltered') }}</button>
            </div>
          </div>
          <div class="margin-tool">
            <label>{{ $t('listing.targetMargin') }} <span><input v-model.number="targetMargin" type="number" min="1" max="95" step="1" />%</span></label>
            <button type="button" @click="applyTargetMargin">{{ $t('listing.applyMargin') }}</button>
            <p>{{ $t('listing.marginHelp') }}</p>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>{{ $t('listing.use') }}</th><th>{{ $t('listing.variant') }}</th><th>{{ $t('listing.cost') }}</th><th>{{ $t('listing.sellingPrice') }}</th><th>{{ $t('listing.inventory') }}</th></tr></thead>
              <tbody>
                <tr v-for="(variant, index) in displayedVariants" :key="variant.id || variant.sku || index">
                  <td><input v-model="variant.selected" type="checkbox" :aria-label="$t('listing.useVariant', { index: index + 1 })" /></td>
                  <td><strong>{{ variantLabel(variant, index) }}</strong></td>
                  <td>{{ money(variant.cost_price || variant.costPrice || 0) }}</td>
                  <td><input v-model.number="variant.price" class="number-input" type="number" min="0" step="0.01" /></td>
                  <td><input v-model.number="variant.inventory_quantity" class="number-input" type="number" min="0" step="1" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button v-if="hasHiddenVariants" class="show-variants-button" type="button" @click="showAllVariants = !showAllVariants">
            {{ showAllVariants ? $t('listing.showFewer') : $t('listing.showAll', { count: filteredVariants.length }) }}
          </button>
          <div v-if="!filteredVariants.length" class="empty-inline">{{ $t('listing.noVariantMatch') }}</div>
        </section>

        <section class="section-block">
          <span class="section-label">{{ $t('listing.searchPreview') }}</span>
          <h2>SEO</h2>
          <label class="field-label">{{ $t('listing.seoTitle') }}<input v-model.trim="content.seoTitle" maxlength="70" type="text" /><span>{{ content.seoTitle.length }}/70</span></label>
          <label class="field-label">{{ $t('listing.seoDescription') }}<textarea v-model.trim="content.seoDescription" maxlength="160" rows="4"></textarea><span>{{ content.seoDescription.length }}/160</span></label>
        </section>
      </div>

      <aside class="review-column">
        <section class="review-panel">
          <span class="section-label">{{ $t('listing.finalReview') }}</span>
          <h2>{{ $t('listing.publishHeading') }}</h2>
          <div class="check-row"><span>{{ $t('listing.content') }}</span><strong>{{ contentReady ? $t('listing.ready') : $t('listing.needsReview') }}</strong></div>
          <div class="check-row"><span>{{ $t('listing.images') }}</span><strong>{{ $t('listing.selectedCount', { count: selectedImageCount }) }}</strong></div>
          <div class="check-row"><span>{{ $t('listing.variants') }}</span><strong>{{ $t('listing.selectedCount', { count: selectedVariantCount }) }}</strong></div>
          <label class="field-label">{{ $t('listing.salesChannel') }}
            <select v-model="selectedStoreId" @change="markDirty">
              <option value="">{{ $t('listing.selectStore') }}</option>
              <option v-for="store in stores" :key="store.id" :value="String(store.id)">{{ store.store_name || store.shop_name || store.store_url }}</option>
            </select>
          </label>
          <div v-if="!stores.length" class="inline-message">{{ $t('listing.noStore') }} <router-link :to="{ path: '/account/Shopify', query: { returnTo: $route.fullPath } }">{{ $t('listing.connectStore') }}</router-link></div>
          <label v-if="storehouseOptions.length > 1" class="field-label">{{ $t('listing.shippingOrigin') }}
            <select v-model="content.storehouse" @change="markDirty">
              <option v-for="option in storehouseOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
            <small class="field-help">{{ $t('listing.shippingOriginChoice') }}</small>
          </label>
          <div v-else class="auto-origin" aria-live="polite">
            <div>
              <span>{{ $t('listing.shippingOrigin') }}</span>
              <small>{{ $t('listing.shippingOriginAuto') }}</small>
            </div>
            <strong>{{ content.storehouse || $t('listing.shippingOriginRequired') }}</strong>
          </div>
          <button class="secondary-button full" type="button" :disabled="saving" @click="saveDraft">{{ saving ? $t('listing.saving') : $t('listing.saveDraft') }}</button>
          <button class="primary-button full" type="button" :disabled="!canPublish || publishing" @click="publishNow">{{ publishing ? $t('listing.publishing') : $t('listing.publishStore') }}</button>
          <p class="trust-copy">{{ $t('listing.publishTrust') }}</p>
          <div v-if="publishError" class="inline-message error-message">{{ publishError }}</div>
          <div v-if="published" class="inline-message success-message">{{ $t('listing.publishSuccess') }}</div>
        </section>
      </aside>
    </div>
  </main>
</template>

<script>
import { ImgUpload } from '@/api/order'
import {
  createListingDraft,
  getAiProposal,
  getListingDraft,
  getListingChannels,
  publishListingDraft,
  requestAiImageProposal,
  requestAiProposal,
  updateListingDraft,
} from '@/api/listing'
import { contentLanguages, getContentLanguage, setContentLanguage } from '@/utils/contentLanguage'

export default {
  data() {
    return {
      draft: null,
      content: { title: '', description: '', seoTitle: '', seoDescription: '', images: [], variants: [] },
      mode: this.$route.query.mode === 'manual' ? 'manual' : 'ai',
      targetLanguage: this.$route.query.language || getContentLanguage(),
      stores: [],
      storehouseOptions: [],
      selectedStoreId: '',
      loading: true,
      error: '',
      saving: false,
      saveState: 'notSaved',
      savedRevision: null,
      aiLoading: false,
      aiError: '',
      aiProposal: null,
      aiProposalRevision: null,
      aiUndoContent: null,
      aiUndoSaveState: null,
      publishing: false,
      publishError: '',
      published: false,
      hydrating: false,
      descriptionView: 'preview',
      variantSearch: '',
      showAllVariants: false,
      sourceImageError: false,
      studioImageLoading: false,
      mediaAiError: '',
      aiImageStyle: 'studio-white',
      aiReferenceImageUrl: '',
      autoImageAttempted: false,
      targetMargin: 45,
    }
  },
  computed: {
    languageLabel() { return contentLanguages.find((item) => item.value === this.targetLanguage)?.label || contentLanguages[0].label },
    saveStatus() {
      if (this.saveState === 'saved') return this.$t('listing.savedRevision', { revision: this.savedRevision })
      return this.$t(this.saveState === 'unsaved' ? 'listing.unsaved' : 'listing.notSaved')
    },
    aiProposalApplied() {
      if (!this.aiProposal) return false
      const fields = ['title', 'description', 'seoTitle', 'seoDescription'].filter((field) => this.aiProposal[field])
      return Boolean(fields.length && fields.every((field) => this.content[field] === this.aiProposal[field]))
    },
    contentAiActionLabel() {
      if (this.aiLoading) return this.$t('listing.aiOptimizingContent')
      if (this.aiUndoContent || this.aiProposalApplied) return this.$t('listing.aiGenerateAgain')
      return this.$t('listing.aiOptimizeContent')
    },
    aiImageStyles() {
      return [
        { value: 'studio-white', label: this.$t('listing.imageStyleWhite'), description: this.$t('listing.imageStyleWhiteHelp') },
        { value: 'premium-studio', label: this.$t('listing.imageStylePremium'), description: this.$t('listing.imageStylePremiumHelp') },
        { value: 'natural-lifestyle', label: this.$t('listing.imageStyleLifestyle'), description: this.$t('listing.imageStyleLifestyleHelp') },
        { value: 'brand-editorial', label: this.$t('listing.imageStyleBrand'), description: this.$t('listing.imageStyleBrandHelp') },
      ]
    },
    selectedAiImageStyle() { return this.aiImageStyles.find((style) => style.value === this.aiImageStyle) || this.aiImageStyles[0] },
    primaryImage() { return this.draft?.sourceSnapshot?.images?.[0] || this.content.images?.[0]?.url || '' },
    selectedImageCount() { return this.content.images.filter((item) => item.selected).length },
    selectedVariantCount() { return this.content.variants.filter((item) => item.selected !== false).length },
    filteredVariants() {
      const query = this.variantSearch.toLowerCase()
      if (!query) return this.content.variants
      return this.content.variants.filter((variant, index) => this.variantLabel(variant, index).toLowerCase().includes(query) || String(variant.sku || '').toLowerCase().includes(query))
    },
    displayedVariants() { return this.showAllVariants ? this.filteredVariants : this.filteredVariants.slice(0, 8) },
    hasHiddenVariants() { return this.filteredVariants.length > 8 },
    contentReady() { return Boolean(this.content.title && this.content.description) },
    warehouseReady() { return Boolean(this.content.storehouse) },
    canPublish() { return this.contentReady && this.selectedImageCount > 0 && this.selectedVariantCount > 0 && this.selectedStoreId && this.warehouseReady },
  },
  created() {
    this.$emit('menu', 'Product')
    this.$emit('hiddenChat', false)
    this.targetLanguage = setContentLanguage(this.targetLanguage)
  },
  mounted() {
    window.addEventListener('cod-content-language-change', this.handleGlobalLanguageChange)
    this.initialize()
  },
  beforeUnmount() {
    window.removeEventListener('cod-content-language-change', this.handleGlobalLanguageChange)
    this.$emit('hiddenChat', true)
  },
  methods: {
    async initialize() {
      this.loading = true
      this.error = ''
      let prepareImageAi = false
      try {
        let response
        if (this.$route.query.draft) {
          response = await getListingDraft(this.$route.query.draft)
        } else {
          if (!this.$route.query.id) throw new Error(this.$t('listing.chooseProduct'))
          response = await createListingDraft({
            sourceProductId: this.$route.query.id,
            sourceType: this.$route.query.source || '1',
            deliveryRegion: this.$route.query.region || '',
            mode: this.mode,
            targetLanguage: this.targetLanguage,
          })
          const createdDraft = this.responseData(response)
          if (this.$route.query.draft !== createdDraft.id) this.$router.replace({ query: { draft: createdDraft.id, mode: this.mode, language: this.targetLanguage } })
        }
        const loadedDraft = this.responseData(response)
        const languageNeedsSync = loadedDraft.targetLanguage !== this.targetLanguage
        this.hydrate(loadedDraft)
        if (languageNeedsSync) {
          this.aiProposal = null
          this.markDirty()
          await this.saveDraft()
        }
        const channels = await getListingChannels()
        const channelData = this.responseData(channels, [])
        this.stores = Array.isArray(channelData) ? channelData : []
        if (!this.selectedStoreId && this.stores.length === 1) this.selectedStoreId = String(this.stores[0].id)
        prepareImageAi = this.mode === 'ai' && Boolean(this.aiReferenceImageUrl)
      } catch (error) {
        this.error = this.localizeError(error, 'listing.serviceUnavailable')
      } finally {
        this.loading = false
        this.$nextTick(() => {
          if (prepareImageAi) this.prepareAutomaticImage()
        })
      }
    },
    responseData(response, fallback) {
      const data = response?.data ?? response
      if (data == null) {
        if (fallback !== undefined) return fallback
        throw new Error(this.$t('listing.incompleteResponse'))
      }
      return data
    },
    hydrate(draft) {
      this.hydrating = true
      this.draft = draft
      this.sourceImageError = false
      this.selectedStoreId = draft.selectedStoreId ? String(draft.selectedStoreId) : ''
      this.content = JSON.parse(JSON.stringify(draft.merchantContent || this.content))
      this.storehouseOptions = Array.isArray(draft.storehouseOptions) ? draft.storehouseOptions : []
      if (!this.content.storehouse && this.storehouseOptions.length) this.content.storehouse = this.storehouseOptions[0].value
      this.content.description = this.decodeHtml(this.content.description || '')
      this.content.images = (this.content.images || []).map((item) => typeof item === 'string' ? { url: item, selected: true, origin: 'source' } : item)
      const restoredImageProposals = Array.isArray(draft.aiImageProposals) ? draft.aiImageProposals : []
      restoredImageProposals.forEach((proposal) => {
        if (!proposal?.imageUrl || this.content.images.some((image) => image.url === proposal.imageUrl)) return
        this.content.images.push({
          url: proposal.imageUrl,
          selected: false,
          origin: 'ai',
          proposalId: proposal.id,
          sourceImageUrl: proposal.sourceImageUrl,
          style: proposal.style,
          persisted: proposal.persisted,
        })
      })
      this.content.variants = (this.content.variants || []).map((item) => ({ ...item, selected: item.selected !== false }))
      this.aiReferenceImageUrl = this.content.aiReferenceImageUrl || ''
      this.aiImageStyle = this.content.aiImageStyle || 'studio-white'
      if (this.mode === 'ai' && !this.aiReferenceImageUrl) {
        const restoredReference = restoredImageProposals.find((proposal) => proposal?.sourceImageUrl)?.sourceImageUrl
        const automaticReference = this.content.images.find((image) => image?.url === restoredReference)
          || this.content.images.find((image) => image?.url && image.origin !== 'ai')
        if (automaticReference) {
          this.aiReferenceImageUrl = automaticReference.url
          this.$set(this.content, 'aiReferenceImageUrl', automaticReference.url)
        }
      }
      if (Object.prototype.hasOwnProperty.call(draft, 'aiProposal')) {
        this.aiProposal = draft.aiProposal?.proposal || null
        this.aiProposalRevision = draft.aiProposal?.inputRevision || null
      }
      this.saveState = 'saved'
      this.savedRevision = draft.revision
      this.$nextTick(() => { this.hydrating = false })
    },
    markDirty() { this.saveState = 'unsaved' },
    async saveDraft() {
      this.saving = true
      try {
        const response = await updateListingDraft(this.draft.id, { merchantContent: this.content, targetLanguage: this.targetLanguage, selectedStoreId: this.selectedStoreId })
        const draft = this.responseData(response)
        this.hydrate(draft)
        return draft
      } catch (error) {
        this.$message.error(this.localizeError(error, 'listing.saveError'))
        throw error
      } finally { this.saving = false }
    },
    async optimizeContent() {
      if (this.aiLoading) return
      const proposalIsCurrent = this.aiProposal && this.saveState === 'saved' && Number(this.aiProposalRevision) === Number(this.savedRevision)
      if (proposalIsCurrent && !this.aiUndoContent && !this.aiProposalApplied) {
        this.applyAiProposal(this.aiProposal)
        return
      }
      await this.generateAi({ apply: true })
    },
    async generateAi({ apply = false } = {}) {
      if (!this.draft) return
      this.aiLoading = true
      this.aiError = ''
      try {
        if (this.saveState === 'unsaved') await this.saveDraft()
        const response = await requestAiProposal(this.draft.id)
        let proposalResponse = this.responseData(response)
        if (proposalResponse.status === 'processing') proposalResponse = await this.waitForAiProposal(proposalResponse.id)
        if (proposalResponse.status !== 'ready' || !proposalResponse.proposal) throw new Error(this.$t('listing.aiUnavailable'))
        this.aiProposal = proposalResponse.proposal
        this.aiProposalRevision = proposalResponse.inputRevision
        if (apply) this.applyAiProposal(this.aiProposal)
        return this.aiProposal
      } catch (error) {
        this.aiError = this.localizeError(error, 'listing.aiUnavailable')
      } finally { this.aiLoading = false }
    },
    async waitForAiProposal(proposalId) {
      const deadline = Date.now() + 240000
      while (Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 1800))
        const response = await getAiProposal(this.draft.id, proposalId)
        const proposal = this.responseData(response)
        if (proposal.status === 'ready') return proposal
        if (proposal.status === 'failed') throw new Error(this.$t('listing.aiUnavailable'))
      }
      throw new Error(this.$t('listing.aiUnavailable'))
    },
    applyAiProposal(proposal) {
      if (!proposal) return
      const fields = ['title', 'description', 'seoTitle', 'seoDescription']
      this.aiUndoContent = fields.reduce((snapshot, field) => ({ ...snapshot, [field]: this.content[field] || '' }), {})
      this.aiUndoSaveState = this.saveState
      fields.forEach((field) => {
        if (proposal[field]) this.$set(this.content, field, proposal[field])
      })
      this.descriptionView = 'preview'
      this.markDirty()
    },
    undoAiContent() {
      if (!this.aiUndoContent) return
      const restoreSaveState = this.aiUndoSaveState || 'unsaved'
      this.hydrating = true
      Object.entries(this.aiUndoContent).forEach(([field, value]) => this.$set(this.content, field, value))
      this.aiUndoContent = null
      this.saveState = restoreSaveState
      this.aiUndoSaveState = null
      this.$nextTick(() => {
        this.saveState = restoreSaveState
        this.hydrating = false
      })
    },
    async handleGlobalLanguageChange(event) {
      const language = event.detail
      if (!this.draft || !language || language === this.targetLanguage) return
      await this.changeLanguage(language)
    },
    async changeLanguage(language) {
      if (!language || language === this.targetLanguage) return
      this.targetLanguage = language
      const nextQuery = { ...this.$route.query, language }
      const navigation = this.$router.replace({ query: nextQuery })
      if (navigation && typeof navigation.catch === 'function') navigation.catch(() => {})
      this.aiError = ''
      this.markDirty()
      await this.saveDraft()
      this.aiProposal = null
      this.aiProposalRevision = null
      this.aiUndoContent = null
      this.aiUndoSaveState = null
      if (this.mode === 'ai') this.generateAi({ apply: false })
    },
    removeImage(index) {
      const [removed] = this.content.images.splice(index, 1)
      if (removed?.url === this.aiReferenceImageUrl) {
        this.aiReferenceImageUrl = ''
        this.$set(this.content, 'aiReferenceImageUrl', '')
      }
      this.markDirty()
    },
    selectAiImageStyle(style) {
      this.aiImageStyle = style
      this.$set(this.content, 'aiImageStyle', style)
      this.markDirty()
    },
    selectAiReference(image) {
      if (!image?.url || image.origin === 'ai') return
      const changed = this.aiReferenceImageUrl !== image.url
      this.aiReferenceImageUrl = image.url
      this.$set(this.content, 'aiReferenceImageUrl', image.url)
      this.aiImageStyle = 'studio-white'
      this.$set(this.content, 'aiImageStyle', 'studio-white')
      this.markDirty()
      if (changed && !this.hasAiImageProposal('studio-white', image.url)) this.generateStudioImage('studio-white')
    },
    prepareAutomaticImage() {
      if (this.autoImageAttempted || !this.aiReferenceImageUrl || this.hasAiImageProposal('studio-white', this.aiReferenceImageUrl)) return
      this.autoImageAttempted = true
      this.generateStudioImage('studio-white')
    },
    hasAiImageProposal(style, sourceImageUrl) {
      return this.content.images.some((image) => image.origin === 'ai' && image.style === style && image.sourceImageUrl === sourceImageUrl)
    },
    async generateStudioImage(style = this.aiImageStyle) {
      if (!this.aiReferenceImageUrl || this.studioImageLoading) return
      this.studioImageLoading = true
      this.mediaAiError = ''
      try {
        const response = await requestAiImageProposal(this.draft.id, { sourceImageUrl: this.aiReferenceImageUrl, style })
        const proposal = this.responseData(response)
        this.content.images.push({
          url: proposal.imageUrl,
          selected: false,
          origin: 'ai',
          proposalId: proposal.id,
          sourceImageUrl: this.aiReferenceImageUrl,
          style,
          persisted: proposal.persisted,
        })
        this.markDirty()
      } catch (error) {
        this.mediaAiError = this.localizeError(error, 'listing.imageAiUnavailable')
      } finally { this.studioImageLoading = false }
    },
    imageStyleLabel(style) { return this.aiImageStyles.find((item) => item.value === style)?.label || this.$t('listing.imageStyleAi') },
    setFilteredSelection(selected) { this.filteredVariants.forEach((variant) => { this.$set(variant, 'selected', selected) }); this.markDirty() },
    applyTargetMargin() {
      const margin = Number(this.targetMargin)
      if (!(margin > 0 && margin < 100)) { this.$message.error(this.$t('listing.marginError')); return }
      this.content.variants.filter((variant) => variant.selected !== false).forEach((variant) => {
        const cost = Number(variant.cost_price || variant.costPrice || 0)
        if (cost > 0) this.$set(variant, 'price', Math.ceil((cost / (1 - margin / 100)) * 100) / 100)
      })
      this.markDirty()
    },
    async uploadImage(event) {
      const file = event.target.files?.[0]
      if (!file) return
      const body = new FormData()
      body.append('file', file)
      try {
        const response = await ImgUpload(body)
        const uploadedImage = { url: response.data.path, selected: true, origin: 'upload' }
        this.content.images.push(uploadedImage)
        this.markDirty()
        if (this.mode === 'ai') this.selectAiReference(uploadedImage)
      } catch { this.$message.error(this.$t('listing.uploadError')) }
      event.target.value = ''
    },
    async publishNow() {
      this.publishError = ''
      this.published = false
      if (!this.warehouseReady) {
        this.publishError = this.$t('listing.shippingOriginRequired')
        return
      }
      this.publishing = true
      try {
        await this.saveDraft()
        await publishListingDraft(this.draft.id, { storeId: this.selectedStoreId })
        this.published = true
      } catch (error) { this.publishError = this.localizeError(error, 'listing.publishError') }
      finally { this.publishing = false }
    },
    variantLabel(variant, index) { return [variant.option1, variant.option2, variant.option3].filter(Boolean).join(' / ') || variant.title || this.$t('listing.variantFallback', { index: index + 1 }) },
    money(value) { return `US $${Number(value || 0).toFixed(2)}` },
    decodeHtml(value) { const element = document.createElement('textarea'); element.innerHTML = value || ''; return element.value },
    stripHtml(value) { const element = document.createElement('div'); element.innerHTML = value || ''; return element.textContent || '' },
    localizeError(error, fallbackKey) {
      const code = error?.code || ''
      const message = String(error?.message || error || '')
      if (code === 'AI_NOT_CONFIGURED' || /AI listing service is not configured/i.test(message)) {
        return this.$t('listing.aiNotConfigured', { language: this.languageLabel })
      }
      if (code === 'AI_IMAGE_NOT_CONFIGURED' || /AI image service is not configured/i.test(message)) {
        return this.$t('listing.imageAiNotConfigured')
      }
      if (code === 'AI_REQUEST_FAILED' || /Qwen service could not be reached|fetch failed/i.test(message)) {
        return this.$t('listing.aiUnavailable')
      }
      if (code === 'STOREHOUSE_REQUIRED' || /Please select the storehouse|Select a shipping origin/i.test(message)) {
        return this.$t('listing.shippingOriginRequired')
      }
      return message && !/\[object Object\]/.test(message) ? message : this.$t(fallbackKey)
    },
  },
  watch: {
    content: { deep: true, handler() { if (this.draft && !this.saving && !this.hydrating) this.markDirty() } },
  },
}
</script>

<style scoped>
.listing-page { min-height: 100%; padding: 30px; background: #f5f6f8; color: #1f252d; font-size: 16px; line-height: 1.55; }
.listing-header { max-width: 1440px; margin: 0 auto 26px; display: flex; justify-content: space-between; align-items: flex-end; gap: 28px; }
.listing-header h1 { margin: 8px 0 4px; font-size: 34px; line-height: 1.2; font-weight: 700; }
.listing-header p, .section-copy { margin: 0; color: #68717d; max-width: 760px; }
.back-link { border: 0; background: none; padding: 0; color: #bd4517; font-weight: 700; cursor: pointer; }
.listing-layout { max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 24px; align-items: start; }
.editor-column { display: grid; gap: 18px; }
.section-block, .review-panel, .state-panel { background: #fff; border: 1px solid #e0e4ea; border-radius: 12px; padding: 26px; box-shadow: 0 8px 24px rgba(31, 37, 45, .045); }
.source-summary { display: grid; grid-template-columns: 112px 1fr; gap: 22px; align-items: center; }
.source-summary img, .source-image-fallback { width: 112px; height: 112px; border-radius: 10px; background: #f0f1f3; }
.source-summary img { object-fit: cover; }
.source-image-fallback { display: grid; place-items: center; color: #bd4d20; font-size: 24px; font-weight: 900; }
.source-summary h2, .section-block h2, .review-panel h2 { margin: 4px 0 6px; font-size: 22px; line-height: 1.3; }
.source-summary p, .section-heading p { margin: 0; color: #68717d; }
.section-label { color: #8b3f20; font-size: 13px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
.section-heading { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; margin-bottom: 20px; }
.section-heading.compact { align-items: center; }
.field-label { display: grid; gap: 8px; margin-top: 20px; font-weight: 700; color: #333b45; }
.field-label > span { justify-self: end; color: #858e99; font-size: 12px; font-weight: 500; }
.field-label > .field-help { justify-self: start; color: #68717d; font-size: 13px; font-weight: 500; line-height: 1.45; }
.auto-origin { margin-top: 18px; padding: 15px 0; border-top: 1px solid #e1e5ea; border-bottom: 1px solid #e1e5ea; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.auto-origin div { display: grid; gap: 2px; }
.auto-origin span { color: #333b45; font-weight: 700; }
.auto-origin small { color: #68717d; font-size: 13px; }
.auto-origin strong { color: #35664c; text-align: right; white-space: nowrap; }
input[type='text'], input[type='number'], input[type='search'], textarea, select { width: 100%; border: 1px solid #cfd5dd; border-radius: 8px; background: #fff; color: #20262e; font: inherit; padding: 11px 12px; box-sizing: border-box; }
textarea { resize: vertical; min-height: 112px; }
input:focus, textarea:focus, select:focus { outline: 3px solid rgba(232, 92, 32, .15); border-color: #e85c20; }
.description-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 22px; color: #333b45; }
.view-switch { display: inline-flex; padding: 3px; border: 1px solid #d7dce3; border-radius: 9px; background: #f5f6f8; }
.view-switch button { min-height: 34px; border: 0; border-radius: 6px; padding: 0 13px; background: transparent; color: #5d6671; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer; }
.view-switch button.active { background: #fff; color: #9d3d17; box-shadow: 0 1px 4px rgba(35, 43, 52, .08); }
.description-preview { width: 100%; height: 440px; margin-top: 12px; border: 1px solid #dfe3e8; border-radius: 9px; background: #fff; }
.compact-label { margin-top: 12px; }
.compact-label small { color: #68717d; font-weight: 500; }
.primary-button, .secondary-button, .upload-button { min-height: 42px; border-radius: 8px; padding: 0 17px; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; cursor: pointer; white-space: nowrap; }
.primary-button { border: 1px solid #d85018; background: #e85c20; color: #fff; }
.secondary-button, .upload-button { border: 1px solid #cbd1d9; background: #fff; color: #343c46; }
.primary-button:active, .secondary-button:active { transform: translateY(1px); }
button:disabled { opacity: .48; cursor: not-allowed; transform: none; }
.full { width: 100%; margin-top: 12px; }
.content-heading-actions { display: flex; align-items: center; justify-content: flex-end; gap: 12px; flex-wrap: wrap; }
.ai-action-button { min-height: 40px; border: 1px solid #d5683b; border-radius: 8px; padding: 0 14px; display: inline-flex; align-items: center; gap: 8px; background: #fff7f3; color: #983b18; font: inherit; font-size: 14px; font-weight: 800; cursor: pointer; white-space: nowrap; }
.ai-action-button > span { min-width: 24px; height: 24px; border-radius: 6px; display: grid; place-items: center; background: #d95019; color: #fff; font-size: 11px; letter-spacing: .02em; }
.ai-action-button:active, .text-action:active, .ai-image-generate:active, .style-option:active, .reference-button:active { transform: translateY(1px); }
.text-action { border: 0; padding: 7px 2px; background: none; color: #5a6470; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.content-ai-message { margin: -2px 0 16px; }
.media-ai-toolbar { margin-bottom: 18px; padding: 16px; border: 1px solid #d9dee5; border-radius: 10px; background: #f7f8f9; }
.media-ai-copy { display: flex; align-items: baseline; justify-content: space-between; gap: 18px; margin-bottom: 12px; }
.media-ai-copy strong { color: #2f3741; }
.media-ai-copy span { color: #68717d; font-size: 13px; text-align: right; }
.style-selector { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.style-option { min-height: 72px; border: 1px solid #d7dce3; border-radius: 8px; padding: 10px; display: grid; align-content: center; gap: 3px; background: #fff; color: #343c46; text-align: left; font: inherit; cursor: pointer; }
.style-option strong { font-size: 14px; }
.style-option span { color: #707985; font-size: 12px; line-height: 1.35; }
.style-option.active { border-color: #d75a26; background: #fff7f3; box-shadow: inset 0 0 0 1px rgba(215, 90, 38, .18); }
.style-option.active strong { color: #983b18; }
.ai-image-generate { width: 100%; min-height: 40px; margin-top: 10px; border: 1px solid #d75a26; border-radius: 8px; background: #fff; color: #983b18; font: inherit; font-weight: 800; cursor: pointer; }
.image-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.image-card { border: 1px solid #dfe3e8; border-radius: 10px; overflow: hidden; background: #fff; }
.image-card.excluded { opacity: .55; }
.image-card.reference { border-color: #d75a26; box-shadow: 0 0 0 2px rgba(215, 90, 38, .12); }
.image-card img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
.image-actions { display: flex; justify-content: space-between; align-items: center; padding: 10px; gap: 8px; font-size: 13px; }
.image-actions label { display: flex; gap: 6px; align-items: center; font-weight: 700; }
.image-actions button { border: 0; background: none; color: #b33c30; cursor: pointer; }
.reference-button { width: calc(100% - 20px); min-height: 36px; margin: 0 10px 8px; border: 1px solid #d5dae1; border-radius: 7px; background: #fff; color: #9b3e1b; font: inherit; font-size: 13px; font-weight: 750; cursor: pointer; }
.image-card.reference .reference-button { border-color: #d75a26; background: #fff7f3; }
.image-card small { display: block; padding: 0 10px 10px; color: #7e8791; }
.media-trust-copy { margin: 12px 0 0; color: #68717d; font-size: 13px; }
.upload-button input { display: none; }
.table-wrap { margin-top: 18px; overflow: auto; border: 1px solid #e0e4e9; border-radius: 10px; }
.variant-tools { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; margin-top: 20px; padding: 14px; border-radius: 10px; background: #f6f7f8; }
.variant-tools > label { display: grid; gap: 6px; width: min(360px, 100%); color: #4a535e; font-weight: 700; }
.variant-actions { display: flex; align-items: center; justify-content: flex-end; gap: 9px; flex-wrap: wrap; }
.variant-actions span { margin-right: 4px; color: #69727e; font-size: 14px; }
.variant-actions button, .show-variants-button { min-height: 38px; border: 1px solid #cbd1d9; border-radius: 7px; padding: 0 13px; background: #fff; color: #3f4853; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer; }
.show-variants-button { width: 100%; margin-top: 10px; color: #a6431d; }
.margin-tool { display: grid; grid-template-columns: minmax(220px, 320px) auto 1fr; align-items: end; gap: 14px; margin-top: 12px; padding: 14px; border: 1px solid #e0e4e9; border-radius: 10px; }
.margin-tool label { display: grid; gap: 6px; color: #4a535e; font-weight: 700; }
.margin-tool label span { display: flex; align-items: center; gap: 8px; }
.margin-tool label input { width: 100px; }
.margin-tool button { min-height: 42px; border: 1px solid #c55224; border-radius: 8px; padding: 0 15px; background: #fff; color: #a13f19; font: inherit; font-weight: 750; cursor: pointer; white-space: nowrap; }
.margin-tool p { margin: 0; color: #69727e; font-size: 13px; }
table { width: 100%; border-collapse: collapse; min-width: 680px; }
th, td { padding: 13px; text-align: left; border-bottom: 1px solid #e8ebef; }
th { background: #f6f7f9; color: #616b77; font-size: 13px; }
tr:last-child td { border-bottom: 0; }
.number-input { min-width: 118px; }
.review-column { position: sticky; top: 24px; }
.check-row { display: flex; justify-content: space-between; gap: 14px; padding: 13px 0; border-bottom: 1px solid #e5e8ec; }
.check-row strong { color: #3d6450; }
.trust-copy { margin: 14px 0 0; color: #6e7782; font-size: 13px; }
.inline-message, .empty-inline { margin-top: 14px; border-radius: 8px; padding: 12px; background: #f1f3f5; color: #59636f; }
.error-message, .error-state { background: #fff4f2; color: #97382f; }
.success-message { background: #eff8f2; color: #35634a; }
.save-status { color: #68717d; font-size: 13px; }
.skeleton { background: linear-gradient(90deg, #eceff2, #f6f7f8, #eceff2); background-size: 200% 100%; animation: loading 1.4s infinite; border-radius: 6px; }
.skeleton.title { width: 42%; height: 30px; }
.skeleton.line { width: 100%; height: 16px; margin-top: 18px; }
.skeleton.short { width: 68%; }
@keyframes loading { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .skeleton { animation: none; } * { scroll-behavior: auto !important; transition: none !important; } }
@media (max-width: 1360px) { .listing-layout { grid-template-columns: 1fr; } .review-column { position: static; } .source-summary h2 { overflow-wrap: anywhere; } }
@media (max-width: 900px) { .margin-tool { grid-template-columns: 1fr; align-items: start; } .margin-tool button { justify-self: start; } .style-selector { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 760px) { .listing-page { padding: 18px; } .listing-header { align-items: flex-start; flex-direction: column; } .listing-header h1 { font-size: 28px; } .section-block, .review-panel { padding: 19px; } .source-summary { grid-template-columns: 82px 1fr; } .source-summary img, .source-image-fallback { width: 82px; height: 82px; } .source-summary h2 { overflow-wrap: anywhere; } .section-heading, .variant-tools, .description-heading, .media-ai-copy { align-items: flex-start; flex-direction: column; } .content-heading-actions { width: 100%; justify-content: space-between; } .ai-action-button { margin-left: auto; } .media-ai-copy span { text-align: left; } .image-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .style-selector { grid-template-columns: 1fr; } .view-switch { width: 100%; } .view-switch button { flex: 1; } .description-preview { height: 360px; } .variant-actions { justify-content: flex-start; } .margin-tool button { width: 100%; white-space: normal; } }
</style>
