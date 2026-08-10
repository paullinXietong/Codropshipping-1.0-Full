<template>
  <main class="feedback-page">
    <header class="page-heading">
      <div>
        <p class="eyebrow">{{ $t('feedback.eyebrow') }}</p>
        <h1>{{ $t('feedback.title') }}</h1>
        <p class="page-copy">{{ $t('feedback.subtitle') }}</p>
      </div>
      <a class="support-link" href="https://www.codropshipping.com/contact-us" target="_blank" rel="noopener noreferrer">
        <i class="el-icon-service" aria-hidden="true"></i>
        {{ $t('feedback.contactSupport') }}
      </a>
    </header>

    <section v-if="submitted" class="success-card" role="status">
      <span class="success-icon"><i class="el-icon-check" aria-hidden="true"></i></span>
      <div>
        <p class="eyebrow">{{ $t('feedback.successEyebrow') }}</p>
        <h2>{{ $t('feedback.successTitle') }}</h2>
        <p>{{ $t('feedback.successCopy') }}</p>
        <button type="button" class="primary-button" @click="resetForm">{{ $t('feedback.sendAnother') }}</button>
      </div>
    </section>

    <div v-else class="feedback-layout">
      <form class="feedback-form" @submit.prevent="submitFeedback">
        <section class="form-section">
          <div class="section-heading">
            <span class="step-number">1</span>
            <div>
              <h2>{{ $t('feedback.typeTitle') }}</h2>
              <p>{{ $t('feedback.typeCopy') }}</p>
            </div>
          </div>
          <div class="choice-grid" role="radiogroup" :aria-label="$t('feedback.typeTitle')">
            <button
              v-for="option in categories"
              :key="option.value"
              type="button"
              class="choice-card"
              :class="{ selected: form.category === option.value }"
              role="radio"
              :aria-checked="form.category === option.value ? 'true' : 'false'"
              @click="form.category = option.value"
            >
              <i :class="option.icon" aria-hidden="true"></i>
              <span>{{ $t(option.label) }}</span>
              <i v-if="form.category === option.value" class="el-icon-success selected-mark" aria-hidden="true"></i>
            </button>
          </div>
        </section>

        <section class="form-section">
          <div class="section-heading">
            <span class="step-number">2</span>
            <div>
              <h2>{{ $t('feedback.impactTitle') }}</h2>
              <p>{{ $t('feedback.impactCopy') }}</p>
            </div>
          </div>
          <div class="impact-options" role="radiogroup" :aria-label="$t('feedback.impactTitle')">
            <button
              v-for="option in impacts"
              :key="option.value"
              type="button"
              class="impact-option"
              :class="{ selected: form.severity === option.value }"
              role="radio"
              :aria-checked="form.severity === option.value ? 'true' : 'false'"
              @click="form.severity = option.value"
            >
              <span class="radio-dot"></span>
              <span><strong>{{ $t(option.label) }}</strong><small>{{ $t(option.copy) }}</small></span>
            </button>
          </div>
        </section>

        <section class="form-section">
          <div class="section-heading">
            <span class="step-number">3</span>
            <div>
              <h2>{{ $t('feedback.detailTitle') }}</h2>
              <p>{{ $t('feedback.detailCopy') }}</p>
            </div>
          </div>
          <label class="field-label" for="feedback-detail">{{ $t('feedback.detailLabel') }} <span>{{ $t('feedback.required') }}</span></label>
          <textarea
            id="feedback-detail"
            v-model.trim="form.detail"
            maxlength="2000"
            rows="7"
            :placeholder="$t('feedback.detailPlaceholder')"
            :aria-invalid="detailError ? 'true' : 'false'"
            @input="detailError = ''"
          ></textarea>
          <div class="field-footer">
            <span v-if="detailError" class="field-error" role="alert">{{ detailError }}</span>
            <span v-else>{{ $t('feedback.detailHint') }}</span>
            <span>{{ form.detail.length }}/2000</span>
          </div>

          <div class="upload-heading">
            <div>
              <label class="field-label">{{ $t('feedback.screenshotLabel') }} <em>{{ $t('feedback.optional') }}</em></label>
              <p>{{ $t('feedback.screenshotHint') }}</p>
            </div>
            <span>{{ form.images.length }}/4</span>
          </div>
          <div class="upload-list">
            <div v-for="(image, index) in form.images" :key="image" class="image-preview">
              <img :src="image" :alt="$t('feedback.screenshotAlt', { value: index + 1 })" />
              <button type="button" :aria-label="$t('feedback.removeImage')" @click="removeImage(index)"><i class="el-icon-close"></i></button>
            </div>
            <label v-if="form.images.length < 4" class="upload-control" :class="{ disabled: uploading }">
              <input ref="imageInput" type="file" accept="image/png,image/jpeg,image/webp" multiple :disabled="uploading" @change="uploadImages" />
              <i :class="uploading ? 'el-icon-loading' : 'el-icon-plus'" aria-hidden="true"></i>
              <span>{{ uploading ? $t('feedback.uploading') : $t('feedback.addScreenshot') }}</span>
            </label>
          </div>
          <p v-if="uploadError" class="field-error upload-error" role="alert">{{ uploadError }}</p>
        </section>

        <section class="submit-section">
          <div class="source-note">
            <i class="el-icon-link" aria-hidden="true"></i>
            <span><strong>{{ $t('feedback.sourceTitle') }}</strong><small>{{ sourcePage }}</small></span>
          </div>
          <div v-if="submitError" class="submit-error" role="alert"><i class="el-icon-warning-outline"></i>{{ submitError }}</div>
          <div class="submit-row">
            <p><i class="el-icon-lock" aria-hidden="true"></i>{{ $t('feedback.submitTrust') }}</p>
            <button type="submit" class="primary-button" :disabled="submitting || uploading">
              <i v-if="submitting" class="el-icon-loading" aria-hidden="true"></i>
              {{ submitting ? $t('feedback.submitting') : $t('feedback.submit') }}
            </button>
          </div>
        </section>
      </form>

      <aside class="feedback-aside">
        <section class="aside-card">
          <span class="aside-icon"><i class="el-icon-guide" aria-hidden="true"></i></span>
          <h2>{{ $t('feedback.helpTitle') }}</h2>
          <p>{{ $t('feedback.helpCopy') }}</p>
          <ol>
            <li><span>1</span>{{ $t('feedback.helpStep1') }}</li>
            <li><span>2</span>{{ $t('feedback.helpStep2') }}</li>
            <li><span>3</span>{{ $t('feedback.helpStep3') }}</li>
          </ol>
        </section>
        <section class="aside-card compact">
          <span class="aside-icon neutral"><i class="el-icon-message" aria-hidden="true"></i></span>
          <h2>{{ $t('feedback.replyTitle') }}</h2>
          <p>{{ $t('feedback.replyCopy') }}</p>
        </section>
      </aside>
    </div>

    <section class="history-section" aria-live="polite">
      <div class="history-heading">
        <div>
          <p class="eyebrow">{{ $t('feedback.historyEyebrow') }}</p>
          <h2>{{ $t('feedback.historyTitle') }}</h2>
          <p>{{ $t('feedback.historyCopy') }}</p>
        </div>
        <button type="button" class="text-button" :disabled="historyLoading" @click="fetchData"><i :class="historyLoading ? 'el-icon-loading' : 'el-icon-refresh'"></i>{{ $t('common.refresh') }}</button>
      </div>

      <div v-if="historyLoading" class="history-state"><i class="el-icon-loading"></i><span>{{ $t('feedback.historyLoading') }}</span></div>
      <div v-else-if="historyError" class="history-state error"><i class="el-icon-warning-outline"></i><span>{{ historyError }}</span><button type="button" @click="fetchData">{{ $t('common.retry') }}</button></div>
      <div v-else-if="feedbackList.length === 0" class="history-state"><i class="el-icon-chat-line-square"></i><span><strong>{{ $t('feedback.historyEmpty') }}</strong>{{ $t('feedback.historyEmptyCopy') }}</span></div>
      <div v-else class="history-list">
        <article v-for="(item,index) in feedbackList" :key="item.id || index" class="history-item">
          <div class="history-meta">
            <span class="status-pill"><i class="el-icon-time"></i>{{ $t('feedback.statusSubmitted') }}</span>
            <time>{{ item.create_time }}</time>
          </div>
          <p class="history-content">{{ item.content }}</p>
          <div v-if="item.images && item.images.length" class="history-images">
            <button v-for="image in item.images" :key="image" type="button" @click="openImg(image)"><img :src="image" :alt="$t('feedback.feedbackImage')" /></button>
          </div>
          <button type="button" class="comment-toggle" @click="toggleComments(index, item.id)"><i class="el-icon-chat-dot-round"></i>{{ $t('feedback.replies') }}<span v-if="item.comment_list && item.comment_list.length">{{ item.comment_list.length }}</span><i :class="isShow.includes(index) ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i></button>
          <div v-if="isShow.includes(index)" class="comment-panel">
            <div v-for="(comment,i) in item.comment_list" :key="i" class="comment-item">
              <strong>{{ comment.username || $t('feedback.supportTeam') }}</strong><time>{{ comment.create_time }}</time><p>{{ comment.content }}</p>
            </div>
            <div class="comment-compose">
              <textarea v-model.trim="item.sendContent" rows="2" maxlength="500" :placeholder="$t('feedback.replyPlaceholder')"></textarea>
              <button type="button" :disabled="!item.sendContent || item.commentSubmitting" @click="commit(item.id, index)">{{ item.commentSubmitting ? $t('feedback.sending') : $t('feedback.sendReply') }}</button>
            </div>
          </div>
        </article>
        <el-pagination v-if="total > 20" background layout="prev, pager, next" :total="total" :page-size="20" :current-page.sync="pageIndex" @current-change="fetchData" />
      </div>
    </section>
  </main>
</template>

<script>
import { feedbackSubmit, feedbackList, submitComment, getComment, ImgUpload } from '@/api/order'

export default {
  data() {
    return {
      form: { category: 'product', severity: 1, detail: '', images: [] },
      categories: [
        { value: 'product', icon: 'el-icon-monitor', label: 'feedback.typeProduct' },
        { value: 'listing', icon: 'el-icon-magic-stick', label: 'feedback.typeListing' },
        { value: 'channel', icon: 'el-icon-connection', label: 'feedback.typeChannel' },
        { value: 'operations', icon: 'el-icon-truck', label: 'feedback.typeOperations' },
        { value: 'billing', icon: 'el-icon-wallet', label: 'feedback.typeBilling' },
        { value: 'other', icon: 'el-icon-more', label: 'feedback.typeOther' },
      ],
      impacts: [
        { value: 1, label: 'feedback.impactSuggestion', copy: 'feedback.impactSuggestionCopy' },
        { value: 3, label: 'feedback.impactBlocked', copy: 'feedback.impactBlockedCopy' },
        { value: 5, label: 'feedback.impactUrgent', copy: 'feedback.impactUrgentCopy' },
      ],
      detailError: '', uploadError: '', submitError: '', submitting: false, uploading: false, submitted: false,
      feedbackList: [], total: 0, pageIndex: 1, isShow: [], historyLoading: false, historyError: '',
    }
  },
  computed: {
    sourcePage() {
      return this.$route.query.from || this.$t('feedback.sourceFallback')
    },
  },
  created() { this.$emit('menu', 'feedback') },
  mounted() { this.fetchData() },
  methods: {
    categoryLabel(value) {
      const option = this.categories.find(item => item.value === value)
      return option ? this.$t(option.label) : value
    },
    async uploadImages(event) {
      const files = Array.from(event.target.files || []).slice(0, 4 - this.form.images.length)
      event.target.value = ''
      if (!files.length) return
      const invalid = files.find(file => !['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024)
      if (invalid) { this.uploadError = this.$t('feedback.uploadInvalid'); return }
      this.uploadError = ''
      this.uploading = true
      try {
        for (const file of files) {
          const body = new FormData()
          body.append('file', file)
          const response = await ImgUpload(body)
          const path = response && response.data && response.data.path
          if (!path) throw new Error('upload_failed')
          this.form.images.push(path)
        }
      } catch (error) {
        this.uploadError = this.$t('feedback.uploadError')
      } finally { this.uploading = false }
    },
    removeImage(index) { this.form.images.splice(index, 1) },
    async submitFeedback() {
      if (this.form.detail.length < 10) { this.detailError = this.$t('feedback.detailError'); document.getElementById('feedback-detail')?.focus(); return }
      this.submitting = true
      this.submitError = ''
      try {
        const response = await feedbackSubmit({
          source: 1,
          type: this.sourcePage,
          content: `[${this.categoryLabel(this.form.category)}] ${this.form.detail}`,
          severity_level: this.form.severity,
          images: this.form.images,
        })
        if (!response || response.code !== 0) throw new Error(response && response.msg)
        this.submitted = true
        this.fetchData()
      } catch (error) {
        this.submitError = (error && error.message && error.message !== 'undefined') ? error.message : this.$t('feedback.submitError')
      } finally { this.submitting = false }
    },
    resetForm() {
      this.form = { category: 'product', severity: 1, detail: '', images: [] }
      this.detailError = ''; this.uploadError = ''; this.submitError = ''; this.submitted = false
    },
    openImg(image) { window.open(image, '_blank', 'noopener') },
    async commit(id, index) {
      const item = this.feedbackList[index]
      if (!item.sendContent || item.commentSubmitting) return
      this.$set(item, 'commentSubmitting', true)
      try {
        const response = await submitComment({ feedback_id: id, content: item.sendContent })
        if (!response || response.code !== 0) throw new Error()
        item.sendContent = ''
        await this.getItemComment(id, index)
      } catch (error) { this.$message.error(this.$t('feedback.replyError')) }
      finally { this.$set(item, 'commentSubmitting', false) }
    },
    async getItemComment(id, index) {
      try {
        const response = await getComment({ feedback_id: id, pageCount: 120 })
        this.$set(this.feedbackList[index], 'comment_list', response?.data?.data || [])
      } catch (error) { this.$message.error(this.$t('feedback.replyLoadError')) }
    },
    toggleComments(index, id) {
      const position = this.isShow.indexOf(index)
      if (position !== -1) this.isShow.splice(position, 1)
      else { this.isShow.push(index); this.getItemComment(id, index) }
    },
    async fetchData() {
      this.historyLoading = true
      this.historyError = ''
      try {
        const response = await feedbackList({ source: 1, pageIndex: this.pageIndex })
        const payload = response && response.data
        const records = Array.isArray(payload?.data) ? payload.data : []
        this.feedbackList = records.map(item => ({ ...item, comment_list: item.comment_list || [], sendContent: '', commentSubmitting: false }))
        this.total = Number(payload?.total || payload?.count || records.length)
      } catch (error) { this.historyError = this.$t('feedback.historyError') }
      finally { this.historyLoading = false }
    },
  },
}
</script>

<style scoped>
.feedback-page{max-width:1380px;margin:0 auto;padding:42px 38px 72px;color:#202620}.page-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;margin-bottom:30px}.eyebrow{margin:0 0 8px;color:#e8511b;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}.page-heading h1{margin:0;font-size:36px;line-height:1.15;letter-spacing:-.035em;font-weight:720}.page-copy{max-width:690px;margin:12px 0 0;color:#687168;font-size:16px;line-height:1.6}.support-link{display:inline-flex;align-items:center;gap:9px;min-height:44px;padding:0 16px;border:1px solid #d7ddd7;border-radius:10px;background:#fff;color:#313831;font-size:14px;font-weight:650;text-decoration:none;white-space:nowrap}.support-link:hover{border-color:#e8511b;color:#d84512}.feedback-layout{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:20px;align-items:start}.feedback-form,.aside-card,.history-section,.success-card{border:1px solid #dce1dc;border-radius:14px;background:#fff;box-shadow:0 10px 28px rgba(31,39,31,.045)}.form-section{padding:28px 30px;border-bottom:1px solid #e5e9e5}.section-heading{display:flex;align-items:flex-start;gap:14px;margin-bottom:22px}.section-heading h2,.aside-card h2,.history-heading h2,.success-card h2{margin:0;color:#232923;font-size:20px;line-height:1.3;font-weight:700}.section-heading p,.aside-card p,.history-heading p,.success-card p{margin:5px 0 0;color:#737c73;font-size:14px;line-height:1.55}.step-number{display:flex;align-items:center;justify-content:center;flex:0 0 28px;width:28px;height:28px;border-radius:8px;background:#fff0e9;color:#e8511b;font-size:13px;font-weight:800}.choice-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.choice-card{position:relative;display:flex;align-items:center;gap:10px;min-height:52px;padding:0 14px;border:1px solid #dce1dc;border-radius:10px;background:#fff;color:#414941;font:inherit;font-size:14px;font-weight:620;text-align:left;cursor:pointer}.choice-card>i:first-child{font-size:18px;color:#697269}.choice-card:hover{border-color:#f0a17f}.choice-card.selected{border-color:#e8511b;background:#fff8f4;color:#b93e13}.choice-card.selected>i:first-child{color:#e8511b}.selected-mark{position:absolute;right:12px;color:#e8511b}.impact-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border:1px solid #dce1dc;border-radius:10px;overflow:hidden}.impact-option{display:flex;align-items:flex-start;gap:10px;min-height:76px;padding:16px;border:0;border-right:1px solid #dce1dc;background:#fff;color:#303730;font:inherit;text-align:left;cursor:pointer}.impact-option:last-child{border-right:0}.impact-option.selected{background:#fff8f4}.radio-dot{flex:0 0 16px;width:16px;height:16px;margin-top:2px;border:1px solid #a7afa7;border-radius:50%;background:#fff}.impact-option.selected .radio-dot{border:5px solid #e8511b}.impact-option strong{display:block;font-size:14px}.impact-option small{display:block;margin-top:4px;color:#778077;font-size:12px;line-height:1.4}.field-label{display:block;margin-bottom:9px;color:#353c35;font-size:14px;font-weight:700}.field-label span{color:#e8511b;font-size:12px}.field-label em{color:#8a928a;font-size:12px;font-style:normal;font-weight:500}.feedback-form textarea{box-sizing:border-box;width:100%;padding:14px 16px;border:1px solid #cfd6cf;border-radius:10px;outline:none;background:#fff;color:#252c25;font:inherit;font-size:15px;line-height:1.6;resize:vertical;transition:border-color .15s,box-shadow .15s}.feedback-form textarea:focus,.comment-compose textarea:focus{border-color:#e8511b;box-shadow:0 0 0 3px rgba(232,81,27,.1)}.field-footer{display:flex;justify-content:space-between;gap:20px;min-height:22px;padding-top:6px;color:#899189;font-size:12px}.field-error{color:#bd3f2c}.upload-heading{display:flex;justify-content:space-between;align-items:flex-end;margin-top:24px}.upload-heading p{margin:0;color:#858d85;font-size:12px}.upload-heading>span{color:#858d85;font-size:12px}.upload-list{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}.image-preview,.upload-control{box-sizing:border-box;position:relative;width:112px;height:88px;border-radius:10px;overflow:hidden}.image-preview{border:1px solid #dce1dc}.image-preview img{width:100%;height:100%;object-fit:cover}.image-preview button{position:absolute;top:6px;right:6px;width:26px;height:26px;border:0;border-radius:7px;background:rgba(25,31,25,.78);color:#fff;cursor:pointer}.upload-control{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;border:1px dashed #bfc7bf;background:#fafbf9;color:#657065;font-size:12px;cursor:pointer}.upload-control:hover{border-color:#e8511b;color:#e8511b}.upload-control input{position:absolute;width:1px;height:1px;opacity:0}.upload-control i{font-size:20px}.upload-control.disabled{cursor:wait;opacity:.7}.upload-error{margin:8px 0 0;font-size:12px}.submit-section{padding:22px 30px}.source-note{display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border-radius:9px;background:#f4f6f3;color:#626b62}.source-note>i{margin-top:2px}.source-note strong,.source-note small{display:block}.source-note strong{font-size:12px}.source-note small{max-width:690px;margin-top:2px;overflow:hidden;color:#7b837b;font-size:12px;text-overflow:ellipsis;white-space:nowrap}.submit-error{display:flex;align-items:center;gap:8px;margin-top:12px;padding:11px 13px;border-radius:8px;background:#fff0ed;color:#b83f2c;font-size:13px}.submit-row{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:18px}.submit-row p{margin:0;color:#647064;font-size:12px}.submit-row p i{margin-right:6px;color:#2d7b52}.primary-button{min-height:44px;padding:0 20px;border:1px solid #e8511b;border-radius:9px;background:#e8511b;color:#fff;font:inherit;font-size:14px;font-weight:700;cursor:pointer}.primary-button:hover{background:#d84512}.primary-button:disabled{border-color:#efaa91;background:#efaa91;cursor:not-allowed}.feedback-aside{display:grid;gap:14px;position:sticky;top:92px}.aside-card{padding:24px}.aside-icon,.success-icon{display:flex;align-items:center;justify-content:center;width:40px;height:40px;margin-bottom:18px;border-radius:10px;background:#fff0e9;color:#e8511b;font-size:19px}.aside-icon.neutral{background:#eef2ed;color:#556055}.aside-card ol{display:grid;gap:14px;margin:22px 0 0;padding:20px 0 0;border-top:1px solid #e6e9e6;list-style:none}.aside-card li{display:flex;align-items:flex-start;gap:10px;color:#4d564d;font-size:13px;line-height:1.5}.aside-card li span{display:flex;align-items:center;justify-content:center;flex:0 0 22px;height:22px;border-radius:50%;background:#eef2ed;color:#626b62;font-size:11px;font-weight:700}.aside-card.compact{padding-bottom:22px}.history-section{margin-top:22px;padding:28px 30px}.history-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:20px}.history-heading p{margin-bottom:0}.text-button{display:inline-flex;align-items:center;gap:7px;padding:9px 12px;border:0;border-radius:8px;background:#f3f5f2;color:#4e584e;font:inherit;font-size:13px;font-weight:650;cursor:pointer}.history-state{display:flex;align-items:center;justify-content:center;gap:12px;min-height:150px;margin-top:22px;border-radius:10px;background:#f7f8f6;color:#768076;font-size:14px;text-align:left}.history-state>i{font-size:24px}.history-state span strong,.history-state span{display:block}.history-state span strong{margin-bottom:3px;color:#353d35}.history-state.error{color:#ad4637}.history-state button{border:0;background:transparent;color:#e8511b;font-weight:700;cursor:pointer}.history-list{display:grid;gap:12px;margin-top:22px}.history-item{padding:20px;border:1px solid #e0e5e0;border-radius:10px}.history-meta{display:flex;align-items:center;justify-content:space-between;color:#899189;font-size:12px}.status-pill{display:inline-flex;align-items:center;gap:6px;color:#397255}.history-content{margin:14px 0 0;color:#333b33;font-size:14px;line-height:1.7;white-space:pre-wrap}.history-images{display:flex;gap:8px;margin-top:12px}.history-images button{width:72px;height:58px;padding:0;border:1px solid #e0e5e0;border-radius:7px;overflow:hidden;background:#fff;cursor:pointer}.history-images img{width:100%;height:100%;object-fit:cover}.comment-toggle{display:flex;align-items:center;gap:7px;margin-top:14px;padding:8px 0 0;border:0;border-top:1px solid #edf0ed;width:100%;background:transparent;color:#626b62;font:inherit;font-size:12px;cursor:pointer}.comment-toggle .el-icon-arrow-down,.comment-toggle .el-icon-arrow-up{margin-left:auto}.comment-panel{margin-top:12px;padding:14px;border-radius:9px;background:#f7f8f6}.comment-item{padding:10px 0;border-bottom:1px solid #e3e7e3}.comment-item:first-child{padding-top:0}.comment-item strong{font-size:12px}.comment-item time{margin-left:8px;color:#8b938b;font-size:11px}.comment-item p{margin:5px 0 0;color:#4f584f;font-size:13px}.comment-compose{display:flex;align-items:flex-end;gap:10px;margin-top:12px}.comment-compose textarea{box-sizing:border-box;flex:1;padding:10px 12px;border:1px solid #d6dcd6;border-radius:8px;outline:0;background:#fff;font:inherit;font-size:13px;resize:vertical}.comment-compose button{min-height:38px;padding:0 14px;border:0;border-radius:8px;background:#263026;color:#fff;font:inherit;font-size:12px;font-weight:700;cursor:pointer}.comment-compose button:disabled{opacity:.45;cursor:not-allowed}.success-card{display:flex;align-items:flex-start;gap:20px;padding:34px;margin-bottom:22px}.success-card .success-icon{flex:0 0 46px;width:46px;height:46px;background:#e8f5ec;color:#28734b}.success-card .primary-button{margin-top:20px}
@media(max-width:1000px){.feedback-page{padding:30px 24px 60px}.feedback-layout{grid-template-columns:1fr}.feedback-aside{grid-template-columns:1fr 1fr;position:static}.choice-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:680px){.feedback-page{padding:24px 16px 48px}.page-heading{align-items:flex-start;flex-direction:column}.page-heading h1{font-size:30px}.feedback-form,.aside-card,.history-section,.success-card{border-radius:12px}.form-section,.submit-section,.history-section{padding:22px 18px}.choice-grid,.impact-options,.feedback-aside{grid-template-columns:1fr}.impact-options{display:grid;border:0;gap:8px}.impact-option{border:1px solid #dce1dc!important;border-radius:9px}.submit-row{align-items:stretch;flex-direction:column}.primary-button{width:100%}.history-heading{flex-direction:column}.comment-compose{align-items:stretch;flex-direction:column}}
</style>
