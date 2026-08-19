<template>
  <NuxtLayout>
    <NuxtPage />
    <FooterBar v-if="!applicationPage" />
    <ChatMini v-if="!applicationPage" ref="chatModal"/>
  </NuxtLayout>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
const chatModal = ref(null)
const route = useRoute()
const applicationPage = computed(() => route.path.startsWith('/internal/') || route.path.startsWith('/admin'))

function getChat(){
  chatModal.value?.chatPro()
}

function openChat(){
  chatModal.value?.chatPanelOpen()
}

provide('chatProduct', getChat)
provide('chatModal', openChat)
</script>
