<template>
  <div class="bg-white dark:bg-darkMenu">
    <div class="flex-shrink-0 py-3 px-5 flex justify-between items-center border-b border-gray-300 dark:border-darkLine">
      <div class="font-medium">Contacts</div>
      <img v-show="chatSearch" @click="search"
        src="../../assets/chatSearch.svg" class="w-5 h-5 cursor-pointer" alt="">
      <div ref="search" v-show="!chatSearch" class="w-32 relative">
        <img @click="searchFocus" src="../../assets/chatSearch.svg" class="absolute top-0 left-1 w-5 h-5" alt="">
        <input ref="searchInput" type="text" class="input h-5 pl-7 py-0 text-sm">
      </div>
    </div>
    <div class="overflow-y-scroll h-full">
      <div @click="chatList" class="px-5 py-3 flex border-b border-gray-300 dark:border-darkLine hover:bg-gray-200 dark:hover:bg-darkLine">
        <div class="flex-shrink-0 relative">
          <!-- <img src="../../assets/accountManager.svg" class="w-14 h-14" alt=""> -->
          <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-white dark:bg-darkMain rounded-full flex justify-center items-center">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div class="w-full pl-4">
          <div class="py-1 flex justify-between items-center">
            <div>Joann</div>
            <div class="text-gray-500">14:23</div>
          </div>
          <div class="py-1 flex items-center">
            <div class="chatListContent">Yah, that sounds great</div>
            <div class="flex-shrink-0 bg-red-500 rounded-full w-3.5 h-3.5 text-xs text-white text-center"
            style="line-height: 1.1;">2</div>
          </div>
        </div>
      </div>
      <div @click="chatList" class="px-5 py-3 flex border-b border-gray-300 dark:border-darkLine hover:bg-gray-200 dark:hover:bg-darkLine">
        <div class="flex-shrink-0 relative">
          <!-- <img src="../../assets/accountManager.svg" class="w-14 h-14" alt=""> -->
          <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-white dark:bg-darkMain rounded-full flex justify-center items-center">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div class="w-full pl-4">
          <div class="py-1 flex justify-between items-center">
            <div>Joann</div>
            <div class="text-gray-500">14:23</div>
          </div>
          <div class="py-1 flex justify-between items-center">
            <div class="chatListContent">Yah, that sounds great</div>
            <div class="flex-shrink-0 bg-red-500 rounded-full w-3.5 h-3.5 text-xs text-white text-center"
            style="line-height: 1.1;">2</div>
          </div>
        </div>
      </div>
      <div @click="chatList" class="px-5 py-3 flex border-b border-gray-300 dark:border-darkLine hover:bg-gray-200 dark:hover:bg-darkLine">
        <div class="flex-shrink-0 relative">
          <!-- <img src="../../assets/accountManager.svg" class="w-14 h-14" alt=""> -->
          <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-white dark:bg-darkMain rounded-full flex justify-center items-center">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div class="w-full pl-4">
          <div class="py-1 flex justify-between items-center">
            <div>Joann</div>
            <div class="text-gray-500">14:23</div>
          </div>
          <div class="py-1 flex justify-between items-center">
            <div class="chatListContent">Yah, that sounds great</div>
            <div class="flex-shrink-0 bg-red-500 rounded-full w-3.5 h-3.5 text-xs text-white text-center"
            style="line-height: 1.1;">2</div>
          </div>
        </div>
      </div>
      <div @click="chatList" class="px-5 py-3 flex border-b border-gray-300 dark:border-darkLine hover:bg-gray-200 dark:hover:bg-darkLine">
        <div class="flex-shrink-0 relative">
          <!-- <img src="../../assets/accountManager.svg" class="w-14 h-14" alt=""> -->
          <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-white dark:bg-darkMain rounded-full flex justify-center items-center">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div class="w-full pl-4">
          <div class="py-1 flex justify-between items-center">
            <div>Joann</div>
            <div class="text-gray-500">14:23</div>
          </div>
          <div class="py-1 flex justify-between items-center">
            <div class="chatListContent">Yah, that sounds great</div>
            <div class="flex-shrink-0 bg-red-500 rounded-full w-3.5 h-3.5 text-xs text-white text-center"
            style="line-height: 1.1;">2</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChatList",
    props: {
      quoteList: {},
    },
    data() {
      return {
        // list: this.quoteList,
        chatSearch: true,
      }
    },
    mounted() {
      document.addEventListener(
        'click',
        this.even,
        true
      )
    },
    methods: {
      even(e){
        let search = this.$refs.search
        if (!search.contains(e.target)) {
          this.chatSearch = true
        }
      },
      search() {
        this.chatSearch = false
        setTimeout(()=>{
          this.$refs.searchInput.focus()
        },1)
      },
      searchFocus() {
        this.$refs.searchInput.focus()
      },
      chatList(){
        this.$emit('chatWith')
      }
    },
    destroyed() {  
      document.removeEventListener('click', this.even, true) 
    },
  };
</script>

<style lang="postcss" scoped>
.chatListContent {
  @apply w-full text-gray-500 overflow-hidden overflow-ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>