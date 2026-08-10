<template>
  <div class="w-full h-full p-5 relative">
    <div ref="mask" class="mask"></div>

    <div class="absolute bottom-0 z-10" style="width: calc(100% - 40px);">
      <div class="bg-white p-4 w-full shadow-default border rounded-t flex items-center justify-between text-sm">
        <div class="flex items-center">
          <!-- <label class="flex items-center cursor-pointer select-none">
            <input v-model="checkAll" @click="allProduct" type="checkbox" class="mr-2 w-4 h-4 cursor-pointer">
            <div>Select All</div>
          </label> -->
          <button @click="delAll" class="ml-10 py-1 px-4 border border-gray-300 rounded-2xl hover:bg-gray-200">Delete</button>
          <!-- <button class="ml-4 py-1 px-4 border border-gray-300 rounded-2xl hover:bg-gray-200">移入收藏夹</button> -->
        </div>
        <div class="flex items-center">
          <!-- <div class="mr-5">卖家数量 0</div>
          <div class="mr-5">货品种类 0</div> -->
          <div class="mr-5">Qty: {{totalNum}}</div>
          <div class="mr-5 font-semibold">Total: <span class="text-red-500">${{totalPrice}}</span></div>
          <button @click="toOrder" class="py-2 px-6 rounded-lg text-white bg-orange hover:bg-orange1">Submit</button>
        </div>
      </div>
    </div>

    <div class="h-full overflow-y-scroll">
      <div class="bg-white p-3">
        <div class="w-80">
          <div>Product Name</div>
          <div class="mt-1">
            <input v-model="searchArr.subject" type="text" class="input h-9 py-1 px-2" placeholder="">
          </div>
        </div>
        <div class="mt-3 flex select-none">
          <button @click="getData" class="w-24 py-1.5 text-white bg-blue-400 hover:bg-blue-500">Search</button>
          <button @click="reset" class="ml-4 w-24 py-1.5 border border-gray-300 hover:bg-gray-200">Reset</button>
        </div>
      </div>

      <div class="mt-3 pb-32">
        <div class="py-3 flex items-center text-sm" style="background-color: #ededee;">
          <div class="w-32 px-4 flex-shrink-0">
            <!-- <label class="flex items-center cursor-pointer select-none">
              <input v-model="checkAll" @click="allProduct" type="checkbox" class="mr-2 w-4 h-4 cursor-pointer">
              <div>Select All</div>
            </label> -->
          </div>
          <div class="px-4 w-full grid grid-cols-8 gap-3">
            <div class="col-span-3">Product</div>
            <div class="col-span-2 text-center">Qty</div>
            <div class="col-span-3 sm:col-span-2 text-center">Price(USD)</div>
            <div class="hidden sm:block col-span-1 text-right">Total(USD)</div>
          </div>
        </div>
        <!-- <div v-for="(i,n) in list" :key="n" class="p-4 bg-white mb-2 ">
          <div class="mb-3 flex items-center">
            <input type="checkbox" class="mr-4 w-4 h-4 cursor-pointer">
            <div>{{i.name}}</div>
          </div> -->
          <div v-for="(it,nt) in list" :key="nt" class="flex flex-col sm:flex-row p-4 bg-white mb-2">
            <div class="flex-shrink-0 flex">
              <input type="checkbox" @change="checkProduct(it)" :value="it.id" v-model="checkArr" class="flex-shrink-0 mr-4 mt-8 w-4 h-4 cursor-pointer">
              <img :src="it.image" class="mr-4 flex-shrink-0 w-20 h-20 rounded-md" alt="">
              <div class="block sm:hidden">
                <a :href="'https://codropshipping.com/productDetail?id='+it.goods_id+'&source='+it.source"
                  target="_blank" class="hover:underline">
                  <div class="productTitle">{{it.subject}}</div>
                </a>
              </div>
            </div>
            <div class="w-full">
              <a :href="'https://codropshipping.com/productDetail?id='+it.goods_id+'&source='+it.source"
                target="_blank" class="hover:underline">
                <div class="hidden sm:block text-sm">{{it.subject}}</div>
              </a>
              <div v-for="(ix,nx) in it.sku_info" :key="nx" class="mt-3 grid grid-cols-8 gap-3 text-sm">
                <div class="col-span-3 flex items-center">
                  <input type="checkbox" @change="checkSku(it,it.checkList)" :value="ix.id" v-model="it.checkList" class="flex-shrink-0 mr-3 w-4 h-4 cursor-pointer">
                  <!-- <img :src="ix.img" class="flex-shrink-0 mr-3 w-8 h-8 rounded" alt=""> -->
                  <div class="w-full bg-gray-50 p-2">
                    {{ix.sku_name}}
                  </div>
                </div>
                <div class="col-span-3 sm:col-span-2 flex justify-center items-center">
                  <el-input-number @change="setQty(ix)" v-model="ix.num" :precision="0" size="small" :min="1" :max="1000000"></el-input-number>
                </div>
                <div class="col-span-2 flex justify-center items-center">{{ix.usd}}</div>
                <div class="hidden col-span-1 sm:flex items-center justify-end">{{ix.total}}</div>
              </div>
              <button @click="selectMore(it.goods_id,it.source)" class="mt-4 py-1 px-4 border border-gray-300 rounded-2xl hover:bg-gray-200 text-sm">Pick another one</button>
            </div>
          </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getCart,
    deleteCart,
    editCart,
    getRate,
    getTourists
  } from '@/api/dropshipping'
  import uaParser from 'ua-parser-js'
  export default {
    data() {
      return {
        list: [],
        searchArr:{
          subject: '',
        },
        checkArr: [],
        checkAll: false,
        rate: 0,
        ruleForm: {
          browser: '',
          sys: '',
          agent: '',
          machine: '',
          language: '',
        },
        source: 1,
        totalNum: 0,
        totalPrice: 0,
      }
    },
    created() {
      this.$emit('menu', 'Cart')
    },
    mounted() {
      // console.log(this.$store.state.user.token,localStorage.getItem('Touriststoken'));
      if(!this.$store.state.user.token || this.$store.state.user.token=='undefined'){
        const ua = uaParser(navigator.userAgent)
        this.ruleForm.browser = ua.browser.name
        this.ruleForm.sys = ua.os.name + ua.os.version
        this.ruleForm.agent = ua.ua
        this.ruleForm.machine = window.screen.width + '*' + window.screen.height
        this.ruleForm.language = window.navigator.language
        if(localStorage.getItem('Touriststoken')){
          getRate().then((req)=>{
            this.rate = req.data.exchange_rate
            this.getData()
          })
        }else{
          getTourists(this.ruleForm).then((res)=>{
            localStorage.setItem('Touriststoken', res.data.token)
            getRate().then((req)=>{
              this.rate = req.data.exchange_rate
              this.getData()
            })
          })
        }
      }else{
        getRate().then((req)=>{
          this.rate = req.data.exchange_rate
          this.getData()
        })
      }
    },
    watch: {
      'checkArr':{
        handler(val,oldVal){
          if(this.checkArr.length == this.list.length){
            this.checkAll = true
          }else{
            this.checkAll = false
          }
          // console.log(val,oldVal);
          // let ar = oldVal.filter(item => !val.includes(item))
          // if(ar.length > 0){
          //   ar.forEach((item)=>{
          //     for(var i=0; i<this.list.length; i++){
          //       if(item == this.list[i].id){
          //         this.list[i].checkList = []
          //       }
          //     }
          //   })
          // }
          // let br = val.filter(item => !oldVal.includes(item))
          // if(br.length > 0){
          //   br.forEach((item)=>{
          //     for(var i=0; i<this.list.length; i++){
          //       if(item == this.list[i].id){
          //         for(var j=0; j<this.list[i].sku_info.length; j++){
          //           this.list[i].checkList.push(this.list[i].sku_info[j].id)
          //         }
          //       }
          //     }
          //   })
          // }
        }
      }
    },
    methods: {
      getData(){
        getCart(JSON.stringify(this.searchArr)).then((res)=>{
          this.list = res.data.list
          this.list.forEach((item)=>{
            item.checkList = []
            for(var i=0; i<item.sku_info.length; i++){
              // item.sku_info[i].check = false
              if(item.sku_info[i].currency == '1'){
                item.sku_info[i].usd = this.divide(item.sku_info[i].price, this.rate)
              }else{
                item.sku_info[i].usd = item.sku_info[i].price
              }
              item.sku_info[i].total = (Number(item.sku_info[i].num) * Number(item.sku_info[i].usd)).toFixed(2)
            }
          })
        })
      },
      reset(){
        this.checkArr = []
        this.totalNum = 0
        this.totalPrice = 0
        this.searchArr = {
          subject: '',
        }
        this.getData()
      },
      setQty(i){
        i.total = (Number(i.num) * Number(i.usd)).toFixed(2)
        let ids = {
          cart_info_id: i.id,
          num: i.num
        }
        editCart(JSON.stringify(ids)).then((res)=>{
          if(res.code != 0){
            this.$message({
              message: res.msg,
              offset: 70
            });
          }
          this.getData()
        })
      },
      checkProduct(item){
        if(this.checkArr.length==0){
          this.checkArr = []
          item.checkList = []
        }else{
          this.checkArr = [item.id]
          for(var i=0; i<this.list.length; i++){
            if(item.id == this.list[i].id){
              this.source = item.source
              this.list[i].checkList = []
              for(var j=0; j<this.list[i].sku_info.length; j++){
                this.list[i].checkList.push(this.list[i].sku_info[j].id)
              }
            }else{
              this.list[i].checkList = []
            }
          }
        }
        let list = item.checkList
        let total_num = 0
        let total_price = 0
        for(var n=0; n<list.length; n++){
          for(var m=0; m<item.sku_info.length; m++){
            if(list[n] == item.sku_info[m].id){
              total_num += Number(item.sku_info[m].num)
              total_price += Number(item.sku_info[m].total)
            }
          }
        }
        this.totalNum = total_num
        this.totalPrice = total_price.toFixed(2)
        // let ischeck = false
        // this.checkArr.forEach((i)=>{
        //   if(item.id == i.id){
        //     ischeck = true
        //   }
        // })
        // // console.log(item);
        // if(!ischeck){
        //   item.checkList = []
        // }
      },
      checkSku(item,list){
        if(list.length == item.sku_info.length){
          // this.checkArr.push(item.id)
          this.checkArr = [item.id]
        }else{
          // this.checkArr = this.checkArr.filter(i => i !== item.id)
          this.checkArr = []
        }
        for(var i=0; i<this.list.length; i++){
          if(item.id == this.list[i].id){
            this.source = item.source
          }else{
            this.list[i].checkList = []
          }
        }
        let total_num = 0
        let total_price = 0
        for(var n=0; n<list.length; n++){
          for(var m=0; m<item.sku_info.length; m++){
            if(list[n] == item.sku_info[m].id){
              total_num += Number(item.sku_info[m].num)
              total_price += Number(item.sku_info[m].total)
            }
          }
        }
        this.totalNum = total_num
        this.totalPrice = total_price.toFixed(2)
        // console.log(this.checkArr);
      },
      allProduct(){
        if(!this.checkAll){
          let arr = []
          this.list.forEach((item)=>{
            arr.push(item.id)
          })
          this.checkArr = arr
        }else{
          this.checkArr = []
          this.list.forEach((item)=>{
            item.checkList = []
          })
        }
      },
      selectMore(id,source){
        window.open("//" + this.$globalWeb +"/productDetail?id="+id+'&source='+source,"_blank");
      },
      delAll(){
        let delId = []
        this.list.forEach((item)=>{
          delId = [...delId, ...item.checkList]
        })
        if(delId.length == 0){
          this.$message({
            message: 'Please check at least one item',
            offset: 70
          });
        }else{
          let ids = {
            cart_info_ids: delId.join(",")
          }
          deleteCart(JSON.stringify(ids)).then((res)=>{
            this.reset()
          })
        }
        // console.log(delId);
      },
      divide(num1, num2) {
        const result = (num1 * 100) / (num2 * 100);
        if(Math.round(result * 100) / 100>0){
          return Math.round(result * 100) / 100;
        }
        return 0.01;
      },
      toOrder(){
        let delId = []
        this.list.forEach((item)=>{
          delId = [...delId, ...item.checkList]
        })
        if(delId.length > 0){
          let ids = delId.join(",")
          // console.log(ids);
          this.$router.push({
            path: '/order?cartIds=' + ids + '&source=' + this.source,
          })
        }else{
          this.$message({
            message: 'Please check at least one item',
            offset: 70
          });
        }
      }
    }
  }
</script>

<style scoped lang="postcss">
  .productTitle {
    @apply text-sm break-words overflow-hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>

<style>
  /* input[type="checkbox"]:not(:checked) {
    border: 1px solid #aaa;
  } */
  .el-input-number__decrease,.el-input-number__increase{
    background: #F9FAFB !important;
  }

  
</style>