<template>
  <div>
    <!-- <div class="mt-4 grid grid-cols-12 gap-4 text-13">
    <div v-for="(item,index) in quoteDList" :key="index" class="col-span-12 md:col-span-6 xl:col-span-4 rounded-md shadow-default px-6 py-4 bg-white  dark:bg-darkMenu relative">
      <div class="font-semibold">{{item.promote}} business days</div>
      <div class=" text-gray-400">{{item.created_data}}</div>
      <div class="absolute top-4 right-0 py-1 px-5 border-t border-l border-b border-blue-500 text-blue-500 rounded-l-full text-15">{{item.offer_type}}</div>
      <div class="mt-3">
        <table class="table-auto text-center w-full cursor-default">
          <tr>
            <th class="rounded-l">Cost Types</th>
            <th class="rounded-r">Total Cost</th>
          </tr>
          <tr class="hover:bg-tableHover dark:hover:bg-darkLine">
            <td class="font-semibold">freight</td>
            <td>{{ item.freight }}</td>
          </tr>
          <tr class="hover:bg-tableHover dark:hover:bg-darkLine">
            <td class="font-semibold">take</td>
            <td>{{ item.take }}</td>
          </tr>
          <tr class="hover:bg-tableHover dark:hover:bg-darkLine">
            <td class="font-semibold">insurance</td>
            <td>{{ item.insurance }}</td>
          </tr>
          <tr class="hover:bg-tableHover dark:hover:bg-darkLine">
            <td class="font-semibold">fracture</td>
            <td>{{ item.fracture }}</td>
          </tr>
          <tr class="hover:bg-tableHover dark:hover:bg-darkLine">
            <td class="font-semibold">amount</td>
            <td>{{ item.amount }}</td>
          </tr>
        </table>
      </div>
      <div class="flex m-3">
        <div>Remarks:</div>
        <div>{{ item.remark }}</div>
      </div>
      <button class="w-full p-2 rounded-md bg-orange hover:bg-orange1 text-white text-sm font-semibold">Booking Now</button>
      <div class="mt-3 flex justify-end text-gray-400">
        <div>Validity:</div>
        <div>{{item.offer_time}}</div>
      </div>
    </div>
  </div> -->
    <div class="hidden md:block bg-white dark:bg-darkMenu mb-8 rounded-md shadow-default">
      <div>
        <div class="px-6 py-4 grid grid-cols-15 gap-1 font-semibold">
          <div class="col-span-2">Transit Time</div>
          <div class="col-span-2">Freight</div>
          <div class="col-span-2">Quotation Time</div>
          <div class="col-span-2">Validity Time</div>
          <div class="col-span-2">Estimated Quotation</div>
          <div class="col-span-2">Remarks</div>
          <div class="col-span-3 text-right">Operation</div>
        </div>
        <div v-for="(i,n) in quoteDList" :key="n"
          class="px-6 py-4 grid grid-cols-15 gap-1 border-t dark:border-darkLine hover:bg-gray-200 dark:hover:bg-gray-500">
          <div class="col-span-2 flex items-center">{{ i.promote }} Business Days</div>
          <div class="col-span-2 flex items-center">{{ i.offer_type }}</div>
          <div class="col-span-2 flex items-center">{{ i.created_data }}</div>
          <div class="col-span-2 flex items-center">{{ i.offer_time }}</div>
          <div class="col-span-2 flex items-center text-orange text-lg">${{ i.total }}</div>
          <div class="col-span-2 flex items-center">{{ i.remark }}</div>
          <div class="col-span-3 grid grid-cols-2 gap-2">
            <div class="col-span-2 2xl:col-span-1 flex justify-end">
              <button class="btn">Booking</button>
            </div>
            <div class="col-span-2 2xl:col-span-1 flex justify-end">
              <button @click="viewDetail(n)" class="btn1">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuoteD",
    props: {
      quoteDList: {},
    },
    data() {
      return {
        // list: this.quoteDList
      }
    },
    methods:{
      viewDetail(index){
        // console.log(index)
        this.$emit('detailModal',index)
      }
    }
  };
</script>

<style lang="postcss" scoped>
td {
  @apply border-0 border-solid border-gray-300 dark:border-gray-500 py-2;
}

th {
  @apply font-semibold py-1.5 border-b border-gray-400;
}

.btn{
  @apply w-full max-w-150 bg-orange hover:bg-orange1 py-2 text-white rounded;
}

.btn1{
  @apply w-full max-w-150 bg-white hover:bg-gray-300 py-2 border border-gray-300 rounded;
}
</style>