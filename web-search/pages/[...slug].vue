<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to) {
      const legacyWorkspacePrefixes = ['/main/', '/workspace/', '/account/', '/order/', '/warehouse/']
      if (legacyWorkspacePrefixes.some((prefix) => to.path.startsWith(prefix)) || to.path === '/login') {
        return navigateTo(`/admin${to.fullPath}`, { replace: true })
      }
      return navigateTo('/', { replace: true })
    }
  ]
})
</script>
