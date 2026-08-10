<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="text-xl font-semibold">Become a Developer</div>
        <div class="mt-12 flex">
          <div class="w-510 p-4 bg-white">
            <div class="flex items-center">
              <img src="../../assets/cargosoonLogo1.png"
                class="h-8 mr-1 hidden sm:block"
                alt="" /> 
              <!-- <img src="../../assets/cargosoonLogo2.png"
                class="h-6"
                alt="" /> -->
              <div class="ml-3 text-base font-semibold">Codropshipping API</div>
            </div>
            <div class="mt-10 flex justify-center">
              <button class="w-40 p-2 border border-gray-300 bg-white rounded mr-8">Interface document</button>
              <button @click="applyDeveloper" 
                class="w-40 p-2 border-0 text-white rounded"
                :class="[info.status ? 'bg-gray-300 cursor-default' : 'bg-blue-500 hover:bg-blue-700']">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getOpenPlatformInfo,
    applyForDeveloper
  } from '@/api/user'
  export default {
    data() {
      return {
        info: {},
        type: ['', 'authorized', 'unauthorized']
      }
    },
    created() {
      this.$emit('menu', 'Developer')
    },
    mounted() {
      this.getData()
    },
    methods:{
      getData(){
        getOpenPlatformInfo().then((res)=>{
          this.info = res.data.open_platform_user_info
        })
      },
      applyDeveloper(){
        if(!this.info.status){
          applyForDeveloper().then((res)=>{
            this.getData()
          })
        }
      }
    }
  }
</script>