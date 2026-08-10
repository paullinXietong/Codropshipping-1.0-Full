<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="flex">
          <div @click="istab = '0'" class="p-2 border-b-2 cursor-pointer flex"
            :class="[istab == '0' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>In review</div>
            <div>(20)</div>
          </div>
          <div @click="istab = '1'" class="p-2 border-b-2 cursor-pointer flex"
            :class="[istab == '1' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>In storage</div>
            <div>(20)</div>
          </div>
          <div @click="istab = '2'" class="p-2 border-b-2 cursor-pointer flex"
            :class="[istab == '2' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Out of storage</div>
            <div>(20)</div>
          </div>
        </div>

        <review v-show="istab == '0'"></review>
        <storage v-show="istab == '1'"></storage>
        <out-storage v-show="istab == '2'"></out-storage>
      </div>
    </div>
  </div>
</template>

<script>
  import Review from '@/components/Warehouse/InReview'
  import Storage from '@/components/Warehouse/InStorage'
  import OutStorage from '@/components/Warehouse/OutStorage'
  // import {
  //   getList,
  //   getDetail,
  // } from '@/api/track'

  export default {
    components: {
      Review,
      Storage,
      OutStorage
    },
    data() {
      return {
        istab:'0',
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
