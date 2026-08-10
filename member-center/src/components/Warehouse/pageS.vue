<template>
  <div>
    <div class="mt-5 flex justify-center">
      <div @click="pageSearch(i)" v-for="(i,n) in pageArr" :key="'page'+n" :class="[pageNum == i ? 'text-orange border-orange' : 'border-gray-500 dark:border-darkLine dark:hover:border-orange']"
      class="m-1.5 w-10 h-10 text-center leading-10 border hover:border-orange rounded cursor-pointer">{{i}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageWarehouse',
  props: {
    // pageArr: [],
  },
  data() {
    return {
      pageTotal: 0,
      pageNum: 0,
      pageArr: [],
    }
  },
  mounted(){
    
  },
  methods:{
    pageCou(pageTotal, pageNum){
      this.pageTotal = pageTotal
      this.pageNum = pageNum
      let num = Math.ceil(pageTotal / 15)
      let arr = []
      for (var i=1; i<=num; i++){
        arr.push(i)
      }
      this.pageArr = arr
    },
    pageSearch(num){
      this.$emit('searchW', num)
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>