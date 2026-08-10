<template>
  <div>
    <div v-show="freightList.length == 0" class="flex flex-col py-4 justify-center items-center">
      <img src="../../assets/noTracking.svg" class="md:w-60 md:h-52 w-44 h-44" alt="">
      <div class="mt-5 text-base text-center font-semibold">No logistics information</div>
    </div>
    <div v-show="freightList.length != 0">
      <div class="hidden xl:block text-13 border-t border-gray-300 dark:border-gray-500 pt-4">
        <table class="table-auto text-center w-full">
          <tr>
            <th class="rounded-l">Shipment ID</th>
            <th>Destination</th>
            <th>Freight Method</th>
            <th class="rounded-r">Status</th>
          </tr>
          <tr @click="toShipping(item.id)" class="hover:bg-tableHover dark:hover:bg-darkLine cursor-pointer" v-for="(item, index) in freightList" :key="index">
            <td>{{ item.order_no }}</td>
            <td>{{ item.give_country_name }}</td>
            <td>{{ channel[item.transport_type - 1] }}</td>
            <td>
              <div :class="[item.status < 6 ? 'bg-gray-500' : item.status == 7 ? 'bg-orange' : item.status == 9 ? 'bg-cancelColor' : 'bg-paidColor']"
                class="px-1.5 py-1 rounded text-white">{{ statusList[item.status-1] }}</div>
            </td>
          </tr>
        </table>
      </div>
      <div class="block xl:hidden text-13">
        <div class="border-t border-gray-300 dark:border-gray-500 py-4 hover:bg-tableHover dark:hover:bg-darkLine cursor-pointer"
          v-for="(item, index) in freightList"
          :key="index">
          <div class="flex pb-0.5">
            <div class="w-28 font-semibold">Freight Name:</div>
            <div>{{ item.order_no }}</div>
          </div>
          <div class="flex pb-0.5">
            <div class="w-28 font-semibold">Destination:</div>
            <div>{{ item.give_area_name }},{{ item.give_country_two }}</div>
          </div>
          <div class="flex pb-0.5">
            <div class="w-28 font-semibold">Freight Method:</div>
            <div>{{ channel[item.transport_type - 1] }}</div>
          </div>
          <div class="flex">
            <div class="w-28 font-semibold">Status:</div>
            <div class="px-1.5 py-0.5 rounded bg-green-100">{{ statusList[item.status-1] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FreightList",
  props: {
    freightList: {},
  },
  data() {
    return {
      // list: this.freightList,
      statusList: ['In Review','Approved','In Storage','Awaiting Payment','Payment Review','Paid','Shipped','Delivered','Canceled'],
      channel: ['Sea Freight','Air Freight','Small Package','Express','Train Freight']
    }
  },
  methods: {
    toShipping(id){
      this.$router.push({
        path: '/order/forwardingOrder/' + id,
      })
    }
  }
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
