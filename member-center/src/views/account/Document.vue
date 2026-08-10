<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="flex bg-white dark:bg-darkMenu rounded shadow-default">
          <div @click="istab = '0'" class="p-4 border-b-2 cursor-pointer flex"
            :class="[istab == '0' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>All</div>
            <div>(0)</div>
          </div>
          <div @click="istab = '1'" class="p-4 border-b-2 cursor-pointer flex"
            :class="[istab == '1' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Upload</div>
            <div>(0)</div>
          </div>
          <div @click="istab = '2'" class="p-4 border-b-2 cursor-pointer flex"
            :class="[istab == '2' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Received</div>
            <div>(0)</div>
          </div>
        </div>

        <div class="mt-4 p-4 bg-white dark:bg-darkMenu rounded shadow-default grid grid-cols-6 gap-3">
          <div class="col-span-6 md:col-span-3 xl:col-span-2 flex items-center">
            <div class="w-32 pr-3 flex-shrink-0 text-right">Order NO.:</div>
            <input type="text" class="input h-10">
          </div>
          <div class="col-span-6 md:col-span-3 xl:col-span-2 flex items-center">
            <div class="w-32 pr-3 flex-shrink-0 text-right">Document type:</div>
            <input type="text" class="input h-10">
          </div>
          <div class="col-span-6 md:col-span-3 xl:col-span-2 flex items-center">
            <div class="w-32 pr-3 flex-shrink-0 text-right">Document name:</div>
            <input type="text" class="input h-10">
          </div>
          <div class="col-span-6 md:col-span-3 xl:col-span-2 flex items-center">
            <div class="w-32 pr-3 flex-shrink-0 text-right">Date:</div>
            <input type="text" class="input h-10">
          </div>
          <div class="col-span-6 md:col-span-3 xl:col-span-2 flex items-center">
            
          </div>
          <div class="col-span-6 md:col-span-3 xl:col-span-2 flex items-center justify-end">
            <button class="py-2 px-4 rounded-md border dark:border-darkLine hover:bg-gray-300">Reset</button>
            <button class="py-2 px-4 rounded-md ml-3 bg-orange hover:bg-orange1 text-white">Search</button>
          </div>
        </div>

        <div class="mt-4 p-4 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="flex items-center justify-end">
            <button class="py-2 px-4 rounded-md border dark:border-darkLine hover:bg-gray-300">Exporting files</button>
            <button class="py-2 px-4 rounded-md ml-3 bg-orange hover:bg-orange1 text-white">Uploading files</button>
          </div>
          <div class="mt-3">
            <div class="p-3 grid grid-cols-6 bg-gray-200 rounded-t">
              <div class="col-span-1">Document type</div>
              <div class="col-span-1">Document name</div>
              <div class="col-span-1">Order/ Storage NO.</div>
              <div class="col-span-1">Uploader's name</div>
              <div class="col-span-1">Date</div>
              <div class="col-span-1">Action</div>
            </div>
            <div v-show="list.length>0" class="p-3 grid grid-cols-6 border-b dark:border-darkLine">
              <div class="col-span-1">Document type</div>
              <div class="col-span-1">Document name</div>
              <div class="col-span-1">Order/ Storage NO.</div>
              <div class="col-span-1">Uploader's name</div>
              <div class="col-span-1">Date</div>
              <div class="col-span-1">Action</div>
            </div>
            <div v-show="list.length==0" class="py-6 flex flex-col justify-center items-center">
              <img src="../../assets/warehouseNodata.png" class="w-52 h-52" alt="">
              <div>No data</div>
            </div>
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
        list: []
      }
    },
    created() {
      this.$emit('menu', 'Document')
    },
    mounted() {
      
    },
    methods:{

    }
  }
  </script>

<style lang="postcss" scoped>

</style>