<template>
  <div>
    <div v-show="historyList.length == 0" class="flex flex-col py-4 justify-center items-center">
      <img src="../../assets/noQuote.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
      <div class="mt-5 text-base text-center font-semibold">No history</div>
    </div>
    <div v-show="historyList.length != 0">
      <div class="hidden xl:block text-13 border-t border-gray-300 dark:border-gray-500 pt-4">
        <table class="table-auto text-center w-full">
          <tr>
            <th class="rounded-l">Origin</th>
            <th>Destination</th>
            <th>Total Weight</th>
            <th class="rounded-r">Date</th>
          </tr>
          <tr class="hover:bg-tableHover dark:hover:bg-darkLine cursor-pointer" v-for="(item, index) in historyList" :key="index">
            <td>{{ item.shipping_from_en }}</td>
            <td>{{ item.shipping_to_en }}</td>
            <td>{{ item.weight }}{{ unit[item.weight_unit - 1] }}</td>
            <td>{{ item.created_data }}</td>
          </tr>
        </table>
      </div>
      <div class="block xl:hidden text-13">
        <div class="border-t border-gray-300 dark:border-gray-500 py-4 hover:bg-tableHover dark:hover:bg-darkLine cursor-pointer"
          v-for="(item, index) in historyList"
          :key="index">
          <div class="flex pb-0.5">
            <div class="w-28 font-semibold">Origin:</div>
            <div>{{ item.shipping_from_en }}</div>
          </div>
          <div class="flex pb-0.5">
            <div class="w-28 font-semibold">Destination:</div>
            <div>{{ item.shipping_to_en }}</div>
          </div>
          <div class="flex pb-0.5">
            <div class="w-28 font-semibold">Total Weight:</div>
            <div>{{ item.weight }}{{ unit[item.weight_unit - 1] }}</div>
          </div>
          <div class="flex">
            <div class="w-28 font-semibold">Date:</div>
            <div>{{ item.created_data }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryList",
  props: {
    historyList: {}
  },
  data() {
    return {
      // list: this.historyList,
      unit: ['KG','LB']
    }
  },
};
</script>

<style lang="postcss" scoped>
td {
  @apply border-b border-solid border-gray-300 dark:border-gray-500 py-2;
}

th {
  @apply font-semibold py-1.5 cursor-default border-b border-gray-400;
}
</style>
