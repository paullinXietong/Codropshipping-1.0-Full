<template>
  <div>
    <div class="notice" v-for="(item, index) in noticeList" :key="index">
      <div class="flex justify-between items-start mb-2">
        <div class="text-base font-medium">{{ item.title }}</div>
        <div><input type="checkbox" v-model="item.toggle" /></div>
      </div>
      <div class="text-sm text-gray-500">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeItem",
  props: {
    noticeList: {},
  },
  data() {
    return {
      list: this.noticeList
    }
  }
};
</script>

<style lang="postcss" scoped>
input[type="checkbox"] {
  @apply appearance-none w-16 h-8 relative rounded-2xl cursor-pointer bg-gray-200;
}

input[type="checkbox"]:before {
  @apply absolute w-7 h-7 bg-white shadow-sm left-0.5 top-0.5 rounded-full origin-left duration-300 ease-out;
  content: "";
}

input[type="checkbox"]:after {
  @apply inline-block whitespace-nowrap text-white font-bold;
  text-indent: 12px;
  word-spacing: 4px;
  font: 14px/30px monospace;
}

input[type="checkbox"]:checked {
  @apply bg-switch;
}

input[type="checkbox"]:checked:before {
  left: 34px;
}

input[type="checkbox"]:checked:after {
  @apply text-black;
}

.notice{
  @apply p-5 mb-6 border-0 border-solid border-gray-300 bg-white dark:bg-darkMenu rounded shadow;
}
</style>
