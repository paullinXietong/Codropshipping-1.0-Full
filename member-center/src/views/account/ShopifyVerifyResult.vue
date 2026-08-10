<template>
  <div class="w-full h-full p-5 relative bg-white">
    <div class="h-full overflow-y-auto py-28 p-0.5">
      <div class="mt-16 flex justify-center">
        <div v-if="status == 1">
          <img src="../../assets/codropshipping.svg" class="h-24" alt="" />
          <div class="w-700 p-10 flex items-center rounded shadow-default">
            <img src="../../assets/shopifyLoading.png" class="w-60" alt="">
            <div>
              <div class="text-xl mb-4">Successful authorization</div>
              <div class="">You are going to Co-Dropshipping. Please wait a few seconds.</div>
            </div>
          </div>
          <div class="mt-5 text-center text-gray-400 text-sm">Redirect to Co-Dropshipping homepage in ({{countDown}}) seconds.</div>
        </div>
        <div v-if="status == 2">
          <div class="py-2 px-28 flex items-center rounded-sm border bg-gray-100">
            <svg t="1726802261479" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6030" width="28" height="28"><path d="M512 298.666667a32 32 0 0 1 32 32v234.666666a32 32 0 0 1-64 0v-234.666666A32 32 0 0 1 512 298.666667zM544 682.666667a32 32 0 1 1-64 0 32 32 0 0 1 64 0z" fill="#8a8a8a" p-id="6031"></path><path d="M138.666667 512c0-206.186667 167.146667-373.333333 373.333333-373.333333S885.333333 305.813333 885.333333 512 718.186667 885.333333 512 885.333333 138.666667 718.186667 138.666667 512zM512 202.666667C341.162667 202.666667 202.666667 341.162667 202.666667 512S341.162667 821.333333 512 821.333333 821.333333 682.837333 821.333333 512 682.837333 202.666667 512 202.666667z" fill="#8a8a8a" p-id="6032"></path></svg>
            <div class="text-red-500">Shopify authorization failed!</div>
          </div>
          <div class="mt-10 flex justify-center">
            <router-link to="/">
              <button class="ml-5 py-1.5 px-6 border border-gray-400 hover:bg-gray-200 rounded-full">Visit home page</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        status: 0,
        countDown: 5,
      }
    },
    methods:{
      setCount(){
        this.t = setInterval(() => {
          if(this.countDown > 1){
            this.countDown -= 1
          }else{
            clearInterval(this.t)
            this.$router.push('/')
          }
        }, 1000)
      },
    },
    mounted(){
      if(this.$route.query.result == 1){
        this.setCount()
        this.status = 1
      }else{
        this.status = 2
      }
    },
  }
</script>