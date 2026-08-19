<template><span class="sr-only">Opening workspace</span></template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: () => navigateTo('/admin/main/dashboard', { replace: true }),
})
</script>

<style scoped>.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}</style>
