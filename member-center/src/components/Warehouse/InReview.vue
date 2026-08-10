<template>
  <div>
    <div ref="mask" class="mask"></div>
    <div ref="requestModal" class="modal w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div class="p-4 flex justify-between items-center border-b">
        <div class="text-lg">Request a space</div>
        <div @click="closeModal" class="p-1 rounded-md cursor-pointer hover:bg-gray-300">
          <svg t="1694572001574" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4920" width="22" height="22"><path d="M994.7136 174.08L174.148267 994.7136 29.218133 849.92 849.851733 29.2864z" fill="#7a7a7a" p-id="4921"></path><path d="M849.92 994.7136L29.2864 174.148267 174.08 29.218133l820.6336 820.565334z" fill="#7a7a7a" p-id="4922"></path></svg>
        </div>
      </div>
      <div class="p-4 border-b grid grid-cols-2 gap-4">
        <div class="col-span-1">
          <div class="mb-2">Warehouse Location</div>
          <select class="select h-10">
            <option value="1">1</option>
          </select>
        </div>
        <div class="col-span-1">
          <div class="mb-2">Number of suppliers</div>
          <input type="number" class="input h-10" placeholder="Number">
        </div>
        <div class="col-span-1">
          <div class="mb-2">Estimated time of entry</div>
          <input type="date" class="input h-10" placeholder="Select time">
        </div>
        <div class="col-span-1">
          <div class="mb-2">Of Boxes</div>
          <input type="number" class="input h-10" placeholder="Number">
        </div>
        <div class="col-span-1">
          <div class="mb-2">Total Weight(KG)</div>
          <input type="number" class="input h-10" placeholder="e.g.123">
        </div>
        <div class="col-span-1">
          <div class="mb-2">Total Volume(CBM)</div>
          <input type="text" class="input h-10" placeholder="e.g.100*50*30">
        </div>
        <div class="col-span-1">
          <div class="mb-2">Cargo Type</div>
          <input type="text" class="input h-10">
        </div>
        <div class="col-span-2">
          <div class="mb-2">Notes</div>
          <textarea rows="3" class="input resize-none" placeholder="e.g.Fill in the goods notes or what services are required"></textarea>
        </div>
      </div>
      <div class="p-4 flex justify-end items-center">
        <button @click="closeModal" class="mr-6 hover:underline">Cancel</button>
        <button @click="closeModal" class="py-2 px-4 rounded bg-orange hover:bg-orange1 text-white">Request</button>
      </div>
    </div>

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
      <div class="flex justify-end">
        <button @click="requestSpace" class="py-2 px-3 rounded bg-orange hover:bg-orange1 text-white">Request a space</button>
      </div>
      <div class="hidden mt-4 rounded-md overflow-hidden">
        <div class="px-2 py-3.5 grid grid-cols-9 bg-warehouseList dark:bg-darkLine">
          <div class="col-span-1 flex items-center">Storage number</div>
          <div class="col-span-1 flex items-center">Cargo Type</div>
          <div class="col-span-1 flex items-center">Total Weight</div>
          <div class="col-span-1 flex items-center">Total Volume</div>
          <div class="col-span-1 flex items-center">Of Boxes</div>
          <div class="col-span-1 flex items-center">Estimated time</div>
          <div class="col-span-1 flex items-center">Warehouse</div>
          <div class="col-span-1 flex items-center">Number of suppliers</div>
          <div class="col-span-1 flex items-center">Action</div>
        </div>
        <div>
          <div class="px-2 py-3.5 grid grid-cols-9 border-b dark:border-darkLine">
            <div class="col-span-1 flex items-center">Storage number</div>
            <div class="col-span-1 flex items-center">Cargo Type</div>
            <div class="col-span-1 flex items-center">Total Weight</div>
            <div class="col-span-1 flex items-center">Total Volume</div>
            <div class="col-span-1 flex items-center">Of Boxes</div>
            <div class="col-span-1 flex items-center">Estimated time</div>
            <div class="col-span-1 flex items-center">Warehouse</div>
            <div class="col-span-1 flex items-center">Number of suppliers</div>
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
    requestSpace(){
      this.$refs.mask.style = 'display:block;'
      this.$refs.requestModal.style = 'display:block;'
      setTimeout(()=> {
        this.$refs.mask.style = 'display:block;opacity:1;'
        this.$refs.requestModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      },1)
    },
    closeModal(){
      this.$refs.mask.style = 'display:none;opacity:0;'
      this.$refs.requestModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
    }
  }
}
</script>

<style lang="postcss" scoped>
.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}
</style>