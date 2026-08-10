<template>
  <div class="noticeAlerts">
    <div :class="[type == 'success' ? 'successAlerts' : type == 'warn' ? 'warnAlerts' : 'errAlerts']">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "NoticeAlerts",
  props: {
    title: String,
    type: String,
  },
};
</script>


<style lang="postcss" scoped>
.noticeAlerts{
  @apply absolute right-1/2 max-w-90% transform translate-x-1/2 z-40;
}

.successAlerts{
  @apply p-3 text-15 rounded border-l-4 border-green-400 bg-green-50 text-green-600;
}

.warnAlerts{
  @apply p-3 text-15 rounded border-l-4 border-yellow-400 bg-yellow-50 text-yellow-600;
}

.errAlerts{
  @apply p-3 text-15 rounded border-l-4 border-red-400 bg-red-50 text-red-600;
}
</style>
