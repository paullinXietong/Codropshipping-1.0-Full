<template>
  <div>
    <div v-show="quoteList.length == 0" class="flex flex-col py-4 justify-center items-center">
      <img src="../../assets/noData.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
      <div class="mt-5 text-base text-center font-semibold">No booking request</div>
    </div>
    <div v-show="quoteList.length != 0" class="border-t border-gray-300 dark:border-gray-500">
      <router-link :to="'/main/quoteDetail/'+item.id"
        v-for="(item, index) in quoteList" :key="index">
        <div class="QuoteItem">
          <div class="w-full flex-shrink">
            <div class="flex flex-wrap">
              <div class="pr-2 font-semibold">{{ item.quotation_no }}</div>
              <div>{{ item.start }} to {{ item.end }},&nbsp;</div>
              <div>{{ item.weight }}, {{ item.volume }}</div>
            </div>
            <div class="flex items-center">
              <img src="" alt="">
              <div>{{ item.transport_name }}</div>
            </div>
          </div>
          <div class="mt-1 sm:mt-0 flex-shrink-0">
            <div :class="[item.status == 1 ? 'status1' : 'status2']">{{ statusList[item.status - 1] }}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuoteRequest",
  props: {
    quoteList: {},
  },
  data() {
    return {
      // list: this.quoteList.slice(0,4),
      statusList: ['Pending for Quotation','Have a Quotation']
    }
  },
};
</script>

<style lang="postcss" scoped>
.QuoteItem{
  @apply flex justify-between flex-wrap sm:flex-nowrap py-4 text-13 border-b border-gray-300 dark:border-gray-500 hover:bg-tableHover dark:hover:bg-darkLine cursor-pointer;
}

.status1{
  @apply py-0.5 px-1.5 text-white rounded bg-orange;
}

.status2{
  @apply py-0.5 px-1.5 text-white rounded bg-gray-500;
}
</style>
