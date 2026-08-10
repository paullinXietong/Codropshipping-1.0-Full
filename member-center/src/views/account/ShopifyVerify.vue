<template>
  <div class="w-full h-full p-5 relative bg-white">
    <div class="h-full overflow-y-auto py-28 p-0.5">
      <div class="mt-16 flex justify-center">
        <div v-if="status == 1">
          <img src="../../assets/codropshipping.svg" class="h-24" alt="" />
          <div class="w-700 p-10 flex items-center rounded shadow-default">
            <img src="../../assets/shopifyLoading.png" class="w-60" alt="">
            <div class="">You are going to Co-Dropshipping. Please wait a few seconds.</div>
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
        <div v-if="status == 3" class="w-510 p-9 rounded border border-gray-200 shadow-default">
          <div class="text-xl">Welcome to Co-Dropshipping</div>
          <div class="text-base">Please log in or register a account to authorize.</div>
          <div class="mt-8 flex flex-col items-center">
            <button @click="tologin" class="w-96 px-2.5 py-3.5 mb-3.5 text-white bg-orange hover:bg-orange1 rounded-md font-semibold border-0 cursor-pointer">Log in</button>
            <div class="flex text-sm">
              <div class="mr-2.5">No account?</div>
              <div @click="tosignup" class="text-orange cursor-pointer hover:underline">Register here</div>
            </div>
          </div>
        </div>
        <div v-if="status == 4" class="w-510 p-9 rounded border border-gray-200 shadow-default">
          <div>The Shopify store is authorized to the account:</div>
          <div class="font-semibold">{{email}}</div>
          <div>Please log in to check it.</div>
          <div class="mt-8 flex justify-center">
            <button @click="tologins" class="w-52 px-2.5 py-3.5 mb-3.5 text-white bg-orange hover:bg-orange1 rounded-md font-semibold border-0 cursor-pointer">Log in</button>
          </div>
        </div>
        <div v-if="status == 5" class="w-510 p-9 rounded border border-gray-200 shadow-default">
          <div class="text-xl">Welcome to Co-Dropshipping</div>
          <div class="text-base">Please log in or register a account to authorize.</div>
          <div class="mt-6 bg-gray-50 p-5">
            <div class="text-sm">Please confirm the account you want to authorize:</div>
            <div class="font-semibold">{{email}}</div>
            <div class="mt-3 flex justify-end">
              <button @click="toAuthorize"
                class="w-40 px-2.5 py-2 text-white bg-orange hover:bg-orange1 rounded-md text-sm border-0 cursor-pointer">Authorize</button>
            </div>
          </div>
          <div class="mt-2.5 flex justify-between items-center text-sm">
            <div @click="tologin" class="text-orange cursor-pointer hover:underline">Another account</div>
            <div class="flex">
              <div class="mr-2.5">No account?</div>
              <div @click="tosignup" class="text-orange cursor-pointer hover:underline">Register here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { 
    shopifyVerify,
    bindStore
  } from '@/api/dropshipping'
  export default {
    data(){
      return {
        status: 0,
        countDown: 5,
        t: null,
        attrList: {},
        store_id: '',
        email: '',
      }
    },
    mounted(){
      this.attrList = this.$route.query
      this.getData()
    },
    destroyed() {  
      clearInterval(this.t)
    },
    methods:{
      getData(){
        if(JSON.stringify(this.$route.query) != "{}"){
          shopifyVerify(this.attrList).then((res)=>{
            this.store_id = res.data.store_id
            this.email = res.data.email
            if(res.data.type == 1){
              if(res.data.is_login == 0){
                if(res.data.is_authorize == 0){
                  this.status = 3
                }else{
                  this.status = 4
                }
              }else{
                if(res.data.is_authorize == 0){
                  this.status = 5
                }else{
                  if(res.data.user_info){
                    this.setCount()
                    this.status = 1
                    // this.$store.dispatch('shopifyLogin', res)
                    // localStorage.setItem(
                    //   'userInfo',
                    //   JSON.stringify(res.data.user_info)
                    // )
                    // localStorage.setItem(
                    //   'userId',
                    //   JSON.stringify(res.data.user_info.id)
                    // )
                    // localStorage.setItem(
                    //   'userImg',
                    //   JSON.stringify(res.data.user_info.img)
                    // )
                    // localStorage.setItem(
                    //   'first_name',
                    //   JSON.stringify(res.data.user_info.first_name)
                    // )
                    // localStorage.setItem(
                    //   'last_name',
                    //   JSON.stringify(res.data.user_info.last_name)
                    // )
                    // localStorage.setItem(
                    //   'customer_manage',
                    //   JSON.stringify(res.data.user_info.manage)
                    // )
                  }
                }
              }
            }else{
              if(res.data.is_login == 0){
                this.status = 4
              }else{
                if(res.data.is_self == 1){
                  this.setCount()
                  this.status = 1
                }else{
                  this.status = 4
                }
              }
            }
            // if(res.code == 0){
            //   if(res.data.id){
            //     this.setCount()
            //     this.status = 1
            //     this.$store.dispatch('shopifyLogin', res)
            //     localStorage.setItem(
            //       'userInfo',
            //       JSON.stringify(res.data)
            //     )
            //     localStorage.setItem(
            //       'userId',
            //       JSON.stringify(res.data.id)
            //     )
            //     localStorage.setItem(
            //       'userImg',
            //       JSON.stringify(res.data.img)
            //     )
            //     localStorage.setItem(
            //       'first_name',
            //       JSON.stringify(res.data.first_name)
            //     )
            //     localStorage.setItem(
            //       'last_name',
            //       JSON.stringify(res.data.last_name)
            //     )
            //     localStorage.setItem(
            //       'customer_manage',
            //       JSON.stringify(res.data.manage)
            //     )
            //   }else{
            //     // this.$router.push('/login')
            //     window.open('//' + this.$globalWeb,'_self')
            //   }
            // }else{
            //   this.status = 2
            // }
          })
        }else{
          this.$router.push('/')
        }
      },
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
      tologin(){
        this.$router.push({
          path: '/login',
          query: {
            store_id: this.store_id,
            from: 'shopifyAuth',
          },
        })
      },
      tologins(){
        this.$router.push({
          path: '/login',
          query: {
            store_id: this.store_id,
            from: 'shopifyAuth',
            email: this.email,
          },
        })
      },
      tosignup(){
        this.$router.push({
          path: '/signUp',
          query: {
            store_id: this.store_id,
            from: 'shopifyAuth',
          },
        })
      },
      toAuthorize(){
        bindStore({
          store_id: this.store_id
        }).then((res)=>{
          this.$router.push({
            path: '/ShopifyVerifyResult',
            query: {
              from: res.data.from,
              result: res.data.result
            },
          })
        })
      }
    }
  }
</script>
