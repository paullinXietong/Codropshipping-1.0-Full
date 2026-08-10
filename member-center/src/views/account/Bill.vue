<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="flex bg-white dark:bg-darkMenu rounded shadow-default">
          <div @click="istab = '0'" class="p-4 border-b-2 cursor-pointer flex"
            :class="[istab == '0' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>All Order</div>
            <div>(0)</div>
          </div>
          <div @click="istab = '1'" class="p-4 border-b-2 cursor-pointer flex"
            :class="[istab == '1' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Paid</div>
            <div>(0)</div>
          </div>
          <div @click="istab = '2'" class="p-4 border-b-2 cursor-pointer flex"
            :class="[istab == '2' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Default</div>
            <div>(0)</div>
          </div>
        </div>

        <div class="mt-4 p-4 bg-white dark:bg-darkMenu rounded shadow-default grid grid-cols-6 gap-3">
          <div class="col-span-6 xl:col-span-4 grid grid-cols-6 gap-3">
            <div class="col-span-6 md:col-span-3 flex items-center">
              <div class="w-32 pr-3 flex-shrink-0 text-right">Order NO.:</div>
              <input type="text" class="input h-10">
            </div>
            <div class="col-span-6 md:col-span-3 flex items-center">
              <div class="w-32 pr-3 flex-shrink-0 text-right">Bill type:</div>
              <input type="text" class="input h-10">
            </div>
            <!-- <div class="col-span-6 md:col-span-3 xl:col-span-2 flex items-center">
              <div class="w-32 pr-3 flex-shrink-0 text-right">Name of consignee:</div>
              <input type="text" class="input h-10">
            </div> -->
            <div class="col-span-6 md:col-span-3 flex items-center">
              <div class="w-32 pr-3 flex-shrink-0 text-right">Invoice date:</div>
              <input type="text" class="input h-10">
            </div>
            <div class="col-span-6 md:col-span-3 flex items-center">
              <div class="w-32 pr-3 flex-shrink-0 text-right">Invoice number:</div>
              <input type="text" class="input h-10">
            </div>
          </div>
          <div class="col-span-6 xl:col-span-2 flex items-end justify-end">
            <button class="py-2 px-4 rounded-md border dark:border-darkLine hover:bg-gray-300">Reset</button>
            <button class="py-2 px-4 rounded-md ml-3 bg-orange hover:bg-orange1 text-white">Search</button>
          </div>
        </div>

        <div class="mt-4">
          <div class="p-3 grid grid-cols-8 bg-gray-200 rounded-t">
            <div class="col-span-1">Transport type</div>
            <div class="col-span-1">Order NO.</div>
            <div class="col-span-1">Invoice number</div>
            <div class="col-span-1">Product Information</div>
            <div class="col-span-1">Origin&Destination</div>
            <div class="col-span-1">Invoice date</div>
            <div class="col-span-1">Order amount</div>
            <div class="col-span-1">Action</div>
          </div>
          <div v-show="list.length>0" class="p-3 grid grid-cols-8 border-b dark:border-darkLine bg-white dark:bg-darkMenu">
            <div class="col-span-1">Bill type</div>
            <div class="col-span-1">Order/ Storage NO.</div>
            <div class="col-span-1">Invoice number</div>
            <div class="col-span-1">Product Information</div>
            <div class="col-span-1">Origin&Destination</div>
            <div class="col-span-1">Invoice date</div>
            <div class="col-span-1">Order amount</div>
            <div class="col-span-1">Action</div>
          </div>
          <div v-show="list.length==0" class="py-6 flex flex-col justify-center items-center bg-white dark:bg-darkMenu">
            <img src="../../assets/warehouseNodata.png" class="w-52 h-52" alt="">
            <div>No data</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        istab: 0,
        list: [],
      }
    },
    created() {
      this.$emit('menu', 'Bill')
    },
    mounted() {
      
    },
    methods:{

    }
  }
  </script>

<style lang="postcss" scoped>

</style>