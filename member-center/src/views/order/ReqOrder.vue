<template>
  <div class="w-full h-full relative">
    <div class="w-full max-w-1440 m-auto h-full p-3 sm:p-5 overflow-scroll text-menu dark:text-darkText">
      <request :shippingCost="shippingCost"></request>
    </div>
  </div>
</template>

<script>
  import Request from '@/components/Order/Forwarding/Request'
  export default {
    components: {
      Request
    },
    data() {
      return {
        shippingCost:{}
      }
    },
    created() {
      this.shippingCost = JSON.parse(localStorage.getItem('orderRouter'))
      // console.log(a)
    },
    methods:{
    }
  }
</script>

<style>
/* .tab {
  @apply flex justify-center items-center mx-1.5 px-5 py-3 text-sm cursor-pointer border-b-2 border-transparent hover:border-orange select-none;
}

.tabs{
  @apply text-orange border-orange;
} */
</style>