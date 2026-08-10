<template>
  <div class="mb-32">
    <div class="xl:block hidden">
      <div class="bg-white dark:bg-darkMenu shadow-default rounded-md grid grid-cols-12 p-3 mt-4">
        <div class="col-span-1">Name</div>
        <div class="col-span-1">Freight</div>
        <div class="col-span-1">From</div>
        <div class="col-span-1">To</div>
        <div class="col-span-1">Address Type</div>
        <div class="col-span-1">Cargo Details</div>
        <div class="col-span-1">Request Date</div>
        <div class="col-span-2">Status</div>
        <div class="col-span-2">Quote Time</div>
        <div class="col-span-1">Actions</div>
      </div>
      <div class="bg-white dark:bg-darkMenu shadow-default rounded-md grid grid-cols-12 p-3 mt-2" v-for="(item, index) in quoteList"
        :key="index">
        <div class="col-span-1 break-all">{{ item.quotation_no }}</div>
        <div class="col-span-1">
          <!-- <div class="flex flex-wrap">
            <div v-for="(i, d) in item.transport_name" :key="d" class="pr-2">{{ i }}</div>
          </div> -->
          {{item.transport_name}}
        </div>
        <div class="col-span-1">{{ item.start }}</div>
        <div class="col-span-1">{{ item.end }}</div>
        <div class="col-span-1">{{ item.address_type }}</div>
        <div class="col-span-1">
          <div class="flex flex-wrap">
            <div class="pr-2">{{ item.weight }}</div>
            <div class="pr-2">{{ item.volume }}</div>
            <!-- <div v-for="(i, d) in item.cargoDetails" :key="d" class="pr-2">{{ i }}</div> -->
          </div>
        </div>
        <div class="col-span-1">{{ item.take_good_time }}</div>
        <div class="col-span-2">
          <div class="flex">
            <div class="quotePadding">{{ statusList[item.status - 1] }}</div>
          </div>
        </div>
        <div class="col-span-2">{{ item.created_data }}</div>
        <div class="col-span-1">
          <router-link :to="'/main/quoteDetail/'+item.id">
            <button class="w-full bg-orange hover:bg-orange1 p-1.5 rounded-md text-white">View</button>
          </router-link>
          <div class="mt-2 flex justify-center">
            <div class="cursor-pointer hover:underline" @click="cancelQuote(item.id)">Cancel</div>
          </div>
        </div>
      </div>
    </div>
    <div class="block xl:hidden text-13 mt-4">
      <div v-for="(item, index) in quoteList" :key="index" class="bg-white dark:bg-darkMenu shadow-default rounded-md p-3 mt-2">
        <div>
          <div class="flex justify-between flex-col sm:flex-row">
            <div class="flex flex-wrap flex-col sm:flex-row pb-1 sm:pb-0">
              <div class="pr-3 font-semibold">{{ item.quotation_no }}</div>
              <div class="flex pr-3">
                <div>{{ item.start }}</div>
                <div class="px-1">to</div>
                <div>{{ item.end }}</div>
              </div>
              <div>{{ item.transport_name }}</div>
              <!-- <div class="flex flex-wrap">
                <div v-for="(i, d) in item.freight" :key="d" class="pr-2">{{ i }}</div>
              </div> -->
            </div>
            <div class="flex flex-shrink-0">
              <div class="quotePadding">{{ statusList[item.status - 1] }}</div>
            </div>
          </div>
          <div class="mt-2 flex justify-center items-center relative text-sm">
            <router-link :to="'/main/quoteDetail/'+item.id" class="mr-4">
              <button class="w-24 p-1.5 rounded-md text-white bg-orange hover:bg-orange1">View</button>
            </router-link>
            <button class="w-24 p-1.5 rounded-md text-white bg-gray-400 hover:bg-gray-500" @click="cancelQuote(item.id)">Cancel</button>
            <img src="../../assets/down1.svg" @click="item.show = !item.show"
              class="absolute top-2 right-0 w-6 h-6 cursor-pointer rounded-md hover:bg-gray-200" alt="">
          </div>
        </div>
        <div v-show="item.show" class="mt-3 pt-3 border-t border-gray-300 dark:border-darkLine">
          <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
            <div>Address Type</div>
            <div>{{ item.address_type }}</div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 dark:border-darkLine p-1">
            <div class=" flex-shrink-0">Cargo Details</div>
            <div class="flex flex-wrap justify-end">
              <!-- <div v-for="(i, d) in item.cargoDetails" :key="d" class="pl-2">{{ i }}</div> -->
              <div class="pl-2">{{ item.weight }}</div>
              <div class="pl-2">{{ item.volume }}</div>
            </div>
          </div>
          <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
            <div>Request Date</div>
            <div>{{ item.take_good_time }}</div>
          </div>
          <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
            <div>Quote Time</div>
            <div>{{ item.created_data }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuoteItem",
    props: {
      quoteList: {},
    },
    data() {
      return {
        // list: this.quoteList
        statusList: ['Pending for Quotation','Have a Quotation']
      }
    },
    methods: {
      cancelQuote(e){
        this.$emit('showRemoveModal', e)
      }
    }
  };
</script>

<style lang="postcss" scoped>
.quoteSuccess{
  @apply px-2 py-1 bg-padding rounded;
}

.quotePadding{
  @apply px-2 py-1 bg-padding rounded;
}
</style>