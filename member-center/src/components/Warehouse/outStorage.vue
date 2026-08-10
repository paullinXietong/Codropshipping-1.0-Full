<template>
  <div>

    <!-- <div v-if="list.length == 0" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../../assets/noQuo.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
        <div class="mt-5 text-base text-center font-semibold"></div>
      </div>
    </div> -->


    <div class="mt-4 p-4 rounded bg-white dark:bg-darkMenu shadow-default grid grid-cols-7 gap-4">
      <div class="col-span-7 md:col-span-3 xl:col-span-2 flex items-center">
        <div class="w-32 xl:w-auto xl:mr-2 flex-shrink-0">Product Name:</div>
        <input type="text" class="input">
      </div>
      <div class="col-span-7 md:col-span-3 xl:col-span-2 flex items-center">
        <div class="w-32 xl:w-auto xl:mr-2 flex-shrink-0">Storage Number:</div>
        <input type="text" class="input">
      </div>
      <div class="col-span-7 md:col-span-3 xl:col-span-2 flex items-center">
        <div class="w-32 xl:w-auto xl:mr-2 flex-shrink-0">Warehouse:</div>
        <select class="select">
          <option value="0">shenzhen</option>
        </select>
      </div>
      <div class="col-span-7 md:col-span-2 xl:col-span-1 flex items-center justify-around">
        <button class="py-2 px-3 rounded hover:bg-gray-200 border border-gray-600">Reset</button>
        <button class="py-2 px-3 rounded bg-orange hover:bg-orange1 text-white">Search</button>
      </div>
    </div>

    <div class="mt-4 p-4 rounded bg-white dark:bg-darkMenu shadow-default">
      <div class="hidden mt-4 rounded-md overflow-hidden">
        <div class="px-2 py-3.5 grid grid-cols-9 bg-warehouseList dark:bg-darkLine">
          <div class="col-span-1 flex items-center">Cargo photos</div>
          <div class="col-span-1 flex items-center">Storage number</div>
          <div class="col-span-1 flex items-center">Outbound number</div>
          <div class="col-span-1 flex items-center">Cargo Type</div>
          <div class="col-span-1 flex items-center">Total Weight</div>
          <div class="col-span-1 flex items-center">Total Volume</div>
          <div class="col-span-1 flex items-center">Deposit Time</div>
          <div class="col-span-1 flex items-center">Fee($)</div>
          <div class="col-span-1 flex items-center">Action</div>
        </div>
        <div>
          <div class="px-2 py-3.5 grid grid-cols-9 border-b dark:border-darkLine">
            <div class="col-span-1 flex items-center">Cargo photos</div>
            <div class="col-span-1 flex items-center">Storage number</div>
            <div class="col-span-1 flex items-center">Outbound number</div>
            <div class="col-span-1 flex items-center">Cargo Type</div>
            <div class="col-span-1 flex items-center">Total Weight</div>
            <div class="col-span-1 flex items-center">Total Volume</div>
            <div class="col-span-1 flex items-center">Deposit Time</div>
            <div class="col-span-1 flex items-center">Fee($)</div>
            <div class="col-span-1 flex items-center">
              <button class="py-1.5 px-3 border border-gray-600 rounded-md hover:bg-gray-200">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <div class="py-6 flex flex-col justify-center items-center">
        <img src="../../assets/warehouseNodata.png" class="w-52 h-52" alt="">
        <div>No data</div>
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
  mounted(){
    
  },
  methods:{

  }
}
</script>

<style lang="postcss" scoped>

</style>