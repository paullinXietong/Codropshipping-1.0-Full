<template><main class="support-surface" aria-label="Customer support"></main></template>

<script setup>
definePageMeta({ layout: false })
</script>

<style scoped>
.support-surface{min-height:100dvh;background:#f6f8f5}
:global(html),:global(body),:global(#__nuxt){height:100%;overflow:hidden;background:#f6f8f5}
:global(footer){display:none!important}
:global(#co-chatmini){display:none!important}
:global(#co-chatmodal){width:calc(100vw - 24px)!important;max-width:396px;box-shadow:none!important}
:global(.fixed.z-20:has(#co-chatmodal)){right:12px!important;bottom:12px!important;left:auto!important;top:auto!important}
</style>
