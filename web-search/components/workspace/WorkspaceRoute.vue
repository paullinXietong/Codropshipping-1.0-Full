<template>
  <WorkspaceLogin v-if="isAuthScreen" :mode="isSignup ? 'signup' : 'login'" />
  <WorkspaceShell v-else>
    <component :is="activeComponent" v-bind="componentProps" :key="componentKey" />
  </WorkspaceShell>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, watch } from 'vue'
import WorkspaceShell from '../../../member-center/src/views/workspace/WorkspaceShell.vue'
import WorkspaceLogin from './WorkspaceLogin.vue'

// Keep the workspace shell and authentication screen immediately available, then
// download each business module only when the customer opens that section.
const WorkspaceDashboard = defineAsyncComponent(() => import('../../../member-center/src/views/Dashboard.vue'))
const WorkspaceStudio = defineAsyncComponent(() => import('../../../member-center/src/views/workspace/Studio.vue'))
const WorkspaceProductLibrary = defineAsyncComponent(() => import('../../../member-center/src/views/account/Product.vue'))
const WorkspaceListing = defineAsyncComponent(() => import('../../../member-center/src/views/account/Publish.vue'))
const WorkspaceChannels = defineAsyncComponent(() => import('../../../member-center/src/views/account/Shopify.vue'))
const WorkspaceOrders = defineAsyncComponent(() => import('../../../member-center/src/views/workspace/Orders.vue'))
const WorkspaceOperations = defineAsyncComponent(() => import('../../../member-center/src/views/workspace/OperationsModule.vue'))
const WorkspaceCart = defineAsyncComponent(() => import('../../../member-center/src/views/workspace/Cart.vue'))
const WorkspaceCheckout = defineAsyncComponent(() => import('../../../member-center/src/views/workspace/Checkout.vue'))
const WorkspaceFeedback = defineAsyncComponent(() => import('./WorkspaceFeedback.vue'))
const WorkspaceAccount = defineAsyncComponent(() => import('./WorkspaceAccount.vue'))
const WorkspaceAddresses = defineAsyncComponent(() => import('./WorkspaceAddresses.vue'))
const WorkspaceShippingCalculator = defineAsyncComponent(() => import('./WorkspaceShippingCalculator.vue'))

const route = useRoute()
const normalizedPath = computed(() => route.path.replace(/^\/admin/, '') || '/')
const isLogin = computed(() => normalizedPath.value === '/login')
const isSignup = computed(() => normalizedPath.value.toLowerCase() === '/signup')
const isAuthScreen = computed(() => isLogin.value || isSignup.value)
const operationsModule = computed(() => {
  const match = normalizedPath.value.match(/^\/workspace\/(fulfillment|inventory|finance|insights)$/i)
  return match?.[1]?.toLowerCase() || ''
})

const activeComponent = computed(() => {
  const path = normalizedPath.value.toLowerCase()
  if (path === '/' || path === '/main/dashboard') return WorkspaceDashboard
  if (path === '/workspace/studio') return WorkspaceStudio
  if (path === '/account/productlist') return WorkspaceProductLibrary
  if (path === '/account/publish') return WorkspaceListing
  if (path === '/account/shopify' || path === '/shopifyverify' || path === '/shopifyverifyresult') return WorkspaceChannels
  if (path === '/workspace/orders' || path === '/workspace/sourcing-orders') return WorkspaceOrders
  if (operationsModule.value) return WorkspaceOperations
  if (path === '/workspace/cart' || path === '/account/cart') return WorkspaceCart
  if (path === '/workspace/checkout' || path === '/order') return WorkspaceCheckout
  if (path === '/account/shippingaddresses') return WorkspaceAddresses
  if (path === '/main/booking') return WorkspaceShippingCalculator
  if (path === '/main/issus') return WorkspaceFeedback
  if (path === '/account/changepassword') return WorkspaceAccount
  if (path === '/account/profile') return WorkspaceAccount
  if (path === '/account/wallet') return WorkspaceOperations
  return WorkspaceDashboard
})

const componentProps = computed(() => {
  if (activeComponent.value === WorkspaceOperations) return { moduleKey: operationsModule.value || 'finance' }
  if (activeComponent.value === WorkspaceAccount) return { security: normalizedPath.value.toLowerCase() === '/account/changepassword' }
  return {}
})
const componentKey = computed(() => `${normalizedPath.value}:${JSON.stringify(route.query)}`)

async function enforceSession() {
  if (!process.client) return
  const token = window.localStorage.getItem('TOKEN')
  if (!token && !isAuthScreen.value) {
    await navigateTo(`/admin/login?redirect=${encodeURIComponent(route.fullPath.replace(/^\/admin/, ''))}`, { replace: true })
  } else if (token && isAuthScreen.value) {
    const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/') ? route.query.redirect : '/main/dashboard'
    await navigateTo(redirect.startsWith('/admin') ? redirect : `/admin${redirect}`, { replace: true })
  }
}

onMounted(enforceSession)
watch(() => route.path, enforceSession)
</script>
