<template>
  <div>
    <div v-if="list.length == 0" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../../assets/noQuo.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
        <div class="mt-5 text-base text-center font-semibold"></div>
      </div>
    </div>

    <div class="mt-4 p-4 rounded bg-white dark:bg-darkMenu" v-else>
      <div class="mb-6 font-semibold">Supplier List</div>
      <div v-for="(i,n) in list" :key="n" class="p-4 mb-4 bg-white dark:bg-darkMenu rounded shadow-default text-sm">
        <div class="flex justify-between">
          <div>
            <div class="flex py-1">
              <div class="w-52  font-semibold">Supplier Company Name</div>
              <div>{{i.name}}</div>
            </div>
            <div class="flex py-1">
              <div class="w-52  font-semibold">Supplier Contact</div>
              <div>{{i.contacts}}</div>
            </div>
            <div class="flex py-1">
              <div class="w-52  font-semibold">Supplier Telephone Number</div>
              <div>{{i.mobile}}</div>
            </div>
            <div class="flex py-1">
              <div class="w-52 font-semibold">Supplier Warehouse Address</div>
              <div>{{i.address}}</div>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <div class="bg-gray-500 text-white rounded px-2 py-1">Waiting for warehousing</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOrderInfo
} from '@/api/order'
export default {
  name: 'Supplier',
  props: {
    id: null,
    tab: ''
  },
  data() {
    return {
      list:[]
    }
  },
  watch:{
    tab: {
      handler (val, oldVal) {
        if(val==2){
          this.getData()
        }
      }
    }
  },
  mounted(){
    
  },
  methods:{
    getData(){
      getOrderInfo({
        id: this.id,
        type: 3
      }).then((res)=>{
        // console.log(res)
        this.list = res.data
        // if(res.data.length>0){
        //   this.list = res.data
        //   let a = 0
        //   for(let n = 0;n<this.list.length;n++){
        //     a += Number(this.list[n].sum_price)
        //   }
        //   this.total = a
        // }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.panel{
  @apply p-6 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default;
}
</style>