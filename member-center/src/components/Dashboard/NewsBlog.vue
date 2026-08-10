<template>
  <div>
    <div v-show="newsBlogList.length == 0" class="flex flex-col py-4 justify-center items-center">
      <img src="../../assets/noNews.svg" class="md:w-60 md:h-52 w-44 h-44" alt="">
      <div class="mt-5 text-base text-center font-semibold">No News&Blog</div>
    </div>
    <div v-show="newsBlogList.length != 0">
      <div @click="toBlog(item.s_title)" class="text-13 border-t border-gray-300 dark:border-gray-500 py-4 hover:bg-tableHover dark:hover:bg-darkLine cursor-pointer"
        v-for="(item, index) in newsBlogList" :key="index">
        <div class="flex items-center">
          <img :src="item.img" class="w-70 h-70 rounded" alt="">
          <div class="w-newsBlog pl-2">
            <div>{{ item.publish_time }}</div>
            <div class="truncate font-semibold">{{ item.title }}</div>
            <div class="content">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsBlog",
  props: {
    newsBlogList: {},
  },
  data() {
    return {
      // list: [],
    }
  },
  methods: {
    toBlog(e){
      window.open('https://www.cargosoon.com/blog/' + e, '_blank')
    }
  }
};
</script>

<style lang="postcss" scoped>
.content{
  @apply overflow-hidden break-words;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
