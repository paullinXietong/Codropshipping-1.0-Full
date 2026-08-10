<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="pb-2 flex border-b dark:border-darkLine">
          <div>In storage</div>
          <div>/ Inbound details</div>
        </div>
        <div class="mt-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="p-3 border-b dark:border-darkLine text-base font-semibold">Basic Information</div>
          <div class="p-3">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-3 flex items-center">
                <div class="flex-shrink-0 w-32">Storage number:</div>
                <input class="input bg-gray-200" type="text" disabled>
              </div>
              <div class="col-span-3 flex items-center">
                <div class="flex-shrink-0 w-32">Storage time:</div>
                <input class="input bg-gray-200" type="text" disabled>
              </div>
              <div class="col-span-3 flex items-center">
                <div class="flex-shrink-0 w-32">State:</div>
                <input class="input bg-gray-200" type="text" disabled>
              </div>
              <div class="col-span-3 flex items-center">
                <div class="flex-shrink-0 w-32">Of Boxes:</div>
                <input class="input bg-gray-200" type="text" disabled>
              </div>
              <div class="col-span-3 flex items-center">
                <div class="flex-shrink-0 w-32">Total Weight:</div>
                <input class="input bg-gray-200" type="text" disabled>
              </div>
              <div class="col-span-3 flex items-center">
                <div class="flex-shrink-0 w-32">Total Volume:</div>
                <input class="input bg-gray-200" type="text" disabled>
              </div>
            </div>

            <div>
              <div class="mt-6 text-base font-semibold">Detailed list</div>
              <div class="mt-4 rounded-md overflow-hidden">
                <div class="px-2 py-3.5 grid grid-cols-9 bg-warehouseList dark:bg-darkLine">
                  <div class="col-span-1 flex items-center">Cargo photos</div>
                  <div class="col-span-1 flex items-center">Storage number</div>
                  <div class="col-span-1 flex items-center">Cargo Type</div>
                  <div class="col-span-1 flex items-center">Storage space</div>
                  <div class="col-span-1 flex items-center">Weight</div>
                  <div class="col-span-1 flex items-center">Volume</div>
                  <div class="col-span-1 flex items-center">Storage time</div>
                  <div class="col-span-1 flex items-center">Inbound Days</div>
                  <div class="col-span-1 flex items-center">Fee($)</div>
                </div>
                <div>
                  <div class="px-2 py-3.5 grid grid-cols-9 border-b dark:border-darkLine">
                    <div class="col-span-1 flex items-center">Cargo photos</div>
                    <div class="col-span-1 flex items-center">Storage number</div>
                    <div class="col-span-1 flex items-center">Cargo Type</div>
                    <div class="col-span-1 flex items-center">Storage space</div>
                    <div class="col-span-1 flex items-center">Weight</div>
                    <div class="col-span-1 flex items-center">Volume</div>
                    <div class="col-span-1 flex items-center">Storage time</div>
                    <div class="col-span-1 flex items-center">Inbound Days</div>
                    <div class="col-span-1 flex items-center">Fee($)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="p-3 text-base font-semibold">Close an account</div>
          <div class="p-3">
            <div class="grid grid-cols-6 gap-4">
              <div class="col-span-2 flex items-center">
                <div class="flex-shrink-0 mr-2">Number of billing boxes:</div>
                <input class="input bg-gray-200" type="text" disabled>
              </div>
              <div class="col-span-2 flex items-center">
                <div class="flex-shrink-0 mr-2">Costs incurred($):</div>
                <input class="input bg-gray-200" type="text" disabled>
              </div>
              <div class="col-span-3 flex items-center">
                <div class="flex-shrink-0 mr-2">Outbound Service:</div>
                <input class="input" type="text">
              </div>
              <div class="col-span-4 flex mt-2">
                <div class="flex-shrink-0 mr-2">Outbound Service Description:</div>
                <textarea rows="5" class="input resize-none"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="p-3 text-base font-semibold">Billing</div>
          <div class="p-3 flex">
            <div class="border-t border-l dark:border-darkLine">
              <div class="flex text-white" style="background-color: #2899B2;">
                <div class="border-r border-b py-3 px-5 w-52 dark:border-darkLine">Fee Name</div>
                <div class="border-r border-b py-3 px-5 w-52 dark:border-darkLine">Price</div>
              </div>
              <div class="flex">
                <div class="border-r border-b py-3 px-5 w-52 dark:border-darkLine">Warehouse rental fee</div>
                <div class="border-r border-b py-3 px-5 w-52 dark:border-darkLine">$200</div>
              </div>
              <div class="flex">
                <div class="border-r border-b py-3 px-5 w-52 dark:border-darkLine">Service fee</div>
                <div class="border-r border-b py-3 px-5 w-52 dark:border-darkLine">$200</div>
              </div>
              <div class="flex">
                <div class="border-r border-b py-3 px-5 w-52 dark:border-darkLine">Customs clearance fee</div>
                <div class="border-r border-b py-3 px-5 w-52 dark:border-darkLine">$200</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  // import {
  //   getList,
  //   getDetail,
  // } from '@/api/track'

  export default {
    data() {
      return {
        
      }
    },
    created() {
      this.$emit('menu', 'log_Warehouse')
    },
    mounted() {
      
    },
    methods:{

    }
  }
  </script>

<style lang="postcss" scoped>

</style>
