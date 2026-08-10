<template>
  <div class="empty-state">
    <i :class="icon" aria-hidden="true"></i>
    <h3>{{ title }}</h3>
    <p>{{ copy }}</p>
    <router-link v-if="actionTo" :to="actionTo">{{ actionLabel }}<i class="el-icon-right" aria-hidden="true"></i></router-link>
  </div>
</template>

<script>
export default { name: 'EmptyState', props: { icon: { type: String, default: 'el-icon-box' }, title: { type: String, required: true }, copy: { type: String, required: true }, actionTo: { type: String, default: '' }, actionLabel: { type: String, default: '' } } }
</script>

<style scoped>
.empty-state { min-height: 190px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px; color: #6e776f; text-align: center; }.empty-state > i { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 11px; background: #edf2ec; color: #53705e; font-size: 23px; }.empty-state h3 { margin: 15px 0 6px; color: #303732; font-size: 17px; }.empty-state p { max-width: 430px; margin: 0; font-size: 14px; line-height: 1.5; }.empty-state a { min-height: 40px; display: inline-flex; align-items: center; gap: 7px; margin-top: 15px; color: #b34720; font-size: 14px; font-weight: 900; }
</style>
