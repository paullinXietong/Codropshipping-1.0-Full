<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask" @click="closeModal"></div>
    <div ref="detailModal" class="modal opacity-20 bg-white dark:bg-darkMenu py-3 px-5 text-sm">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine pb-3">
        <div class="text-xl">View Details</div>
        <img id="closeImg"
             class="closeModal"
             @click="closeModal"
             src="../../assets/close.svg"
             alt="">
      </div>
      <div class="py-2 grid grid-cols-7 gap-3 border-b dark:border-darkLine font-semibold">
        <div class="col-span-4 sm:col-span-5">Freight Items</div>
        <!-- <div class="col-span-1">Notes</div> -->
        <div class="col-span-3 sm:col-span-2">Subtotal</div>
      </div>
      <div v-for="(i,n) in feeList" class="py-2 grid grid-cols-7 gap-3 border-b dark:border-darkLine">
        <div class="col-span-4 sm:col-span-5 flex items-center">{{ i.name_e }}</div>
        <!-- <div class="col-span-1 flex items-center"></div> -->
        <div class="col-span-3 sm:col-span-2 flex items-center">US${{ i.sum_price }}</div>
      </div>
      <!-- <div class="py-2 grid grid-cols-3 gap-3 border-b dark:border-darkLine">
        <div class="col-span-1">Freight Cost</div>
        <div class="col-span-1"></div>
        <div class="col-span-1">US$40.04</div>
      </div>
      <div class="py-2 grid grid-cols-3 gap-3 border-b dark:border-darkLine">
        <div class="col-span-1">Take Cost</div>
        <div class="col-span-1"></div>
        <div class="col-span-1">US$40.04</div>
      </div>
      <div class="py-2 grid grid-cols-3 gap-3 border-b dark:border-darkLine">
        <div class="col-span-1">Insurance Cost</div>
        <div class="col-span-1"></div>
        <div class="col-span-1">US$40.04</div>
      </div>
      <div class="py-2 grid grid-cols-3 gap-3 border-b dark:border-darkLine">
        <div class="col-span-1">Fracture Cost</div>
        <div class="col-span-1"></div>
        <div class="col-span-1">US$40.04</div>
      </div>
      <div class="py-2 grid grid-cols-3 gap-3 border-b dark:border-darkLine">
        <div class="col-span-1">Amount Cost</div>
        <div class="col-span-1"></div>
        <div class="col-span-1">US$40.04</div>
      </div> -->
      <div class="py-2 grid grid-cols-7 gap-3 text-base font-semibold">
        <div class="col-span-4 sm:col-span-5">Total</div>
        <!-- <div class="col-span-1"></div> -->
        <div class="col-span-3 sm:col-span-2">US${{ feeListTotal }}</div>
      </div>
    </div>
    <div class="h-full overflow-auto">
      <div class="breadcrumb px-1 max-w-1600 flex flex-col sm:flex-row sm:items-center justify-between">
        <div>Quote details</div>
        <div class="flex pt-3 md:pt-0 text-sm">
          <button @click="toBooking"
          class="w-60 sm:w-40 h-12 p-1 bg-orange hover:bg-orange1 text-white rounded-md">Get Price</button>
          <button @click="toCustomRFQ"
          class="ml-5 w-60 sm:w-40 h-12 p-1 bg-gray-300 hover:bg-gray-400 dark:text-gray-600 rounded-md">Custom RFQ</button>
        </div>
      </div>
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <!-- <div class="bg-white dark:bg-darkMenu mb-4 py-4 px-6 grid grid-cols-12 gap-4 rounded-md shadow-default">
          <div class="col-span-12 sm:col-span-4 flex flex-row sm:flex-col">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <img src="../../assets/quoteD.svg" class="w-6 h-7 mr-0 sm:mr-4 mb-2.5 sm:mb-0" alt="">
              <div class="w-1 sm:w-full h-6 sm:h-1 bg-blue-500"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Quote Request</div>
              <div>Requested on 2022-10-10</div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-4 flex flex-row sm:flex-col">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <img src="../../assets/quoteD.svg" class="w-6 h-7 mr-0 sm:mr-4 mb-2.5 sm:mb-0" alt="">
              <div class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300 dark:bg-gray-400"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Pricing</div>
              <div>Cargosoon to provide pricing in 24 to 48 hours</div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-4 flex flex-row sm:flex-col">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <img src="../../assets/quoteD1.svg" class="w-6 h-7 mr-0 sm:mr-4 mb-2.5 sm:mb-0" alt="">
              <div class="w-1 sm:w-full h-6 sm:h-1 bg-gray-400 hidden"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1 text-gray-300">Book</div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 col xl:col-span-6 bg-white dark:bg-darkMenu py-4 px-6 rounded-md shadow-default">
            <div class="px-2 py-1.5 font-semibold text-base border-b border-gray-300 dark:border-gray-500">
              Route
            </div>
            <div class="items">
              <div class="itemsTitle">Quote Name</div>
              <div class="col-span-12 sm:col-span-6">{{ list.offer_name }}</div>
            </div>
            <div class="items">
              <div class="itemsTitle">Origin</div>
              <div class="col-span-12 sm:col-span-6">{{ list.start }}</div>
            </div>
            <div class="items">
              <div class="itemsTitle">Destination</div>
              <div class="col-span-12 sm:col-span-6">{{ list.end }}</div>
            </div>
            <div class="items">
              <div class="itemsTitle">Destination Address</div>
              <div class="col-span-12 sm:col-span-6">{{ list.address_info }}</div>
            </div>
            <div class="items">
              <div class="itemsTitle">Address Type</div>
              <div class="col-span-12 sm:col-span-6">{{ list.address_type }}</div>
            </div>
            <div class="items">
              <div class="itemsTitle">Incoterms with supplier</div>
              <div class="col-span-12 sm:col-span-6">{{ list.trade_type }}</div>
            </div>
            <div class="items">
              <div class="itemsTitle">Shipping Method</div>
              <div class="col-span-12 sm:col-span-6">{{ list.transport_type }}</div>
            </div>
            <div class="items">
              <div class="itemsTitle">Optional information</div>
              <div class="col-span-12 sm:col-span-6">
                <div>Request Cargo Insurance via Cargosoon</div>
                <div>Need Cargosoon pickup service from supplier</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 col xl:col-span-6 bg-white dark:bg-darkMenu py-4 px-6 rounded-md shadow-default">
            <div class="px-2 py-1.5 font-semibold text-base border-b border-gray-300 dark:border-gray-500">
              Cargo Details
            </div>
            <div class="items">
              <div class="itemsTitle">Total Weight</div>
              <div class="col-span-12 sm:col-span-6">{{ list.weight }}</div>
            </div>
            <div class="items">
              <div class="itemsTitle">Total Volume</div>
              <div class="col-span-12 sm:col-span-6">{{ list.volume }}</div>
            </div>
            <div class="hidden sm:block mt-4" v-for="(item,index) in list.product_info" :key="index">
              <table class="w-full bg-gray-200 dark:bg-darkMain">
                <tr>
                  <td class="font-semibold">Name</td>
                  <td>{{ item.product_name }}</td>
                  <td class="font-semibold">Type</td>
                  <td>{{ item.pack_type }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Total</td>
                  <td>{{ item.num }}</td>
                  <td class="font-semibold">Weight</td>
                  <td>{{ item.single_box_weight }}</td>
                </tr>
                <tr v-show="item.single_box_volume != '0.00CBF' && item.single_box_volume != '0.00CBM'">
                  <td class="font-semibold" colspan="2">Volume</td>
                  <td colspan="2">{{ item.single_box_volume }}</td>
                </tr>
                <tr v-show="item.single_box_size != ''">
                  <td class="font-semibold" colspan="2">Size</td>
                  <td colspan="2">{{ item.single_box_size }}</td>
                </tr>
              </table>
            </div>
            <div class="block sm:hidden mt-4" v-for="(item,index) in list.product_info" :key="'n'+index">
              <table class="w-full bg-gray-200 dark:bg-darkMain">
                <tr>
                  <td class="font-semibold">Name</td>
                  <td>{{ item.product_name }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Type</td>
                  <td>{{ item.pack_type }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Total</td>
                  <td>{{ item.num }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Weight</td>
                  <td>{{ item.single_box_weight }}</td>
                </tr>
                <tr v-show="item.single_box_volume != '0.00CBF' && item.single_box_volume != '0.00CBM'">
                  <td class="font-semibold">Volume</td>
                  <td>{{ item.single_box_volume }}</td>
                </tr>
                <tr v-show="item.single_box_size != ''">
                  <td class="font-semibold">Size</td>
                  <td>{{ item.single_box_size }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div> -->
        <div class="panel">
          <div class="flex flex-col sm:flex-row justify-center sm:justify-start sm:items-center text-base mb-4">
            <div class="flex ">
              <div class="mr-2 font-semibold">Quote Name:</div>
              <div>{{ list.offer_name }}</div>
            </div>
            <div class="sm:ml-8 flex">
              <div class="bg-padding rounded text-sm py-1 px-5">Pending</div>
            </div>
          </div>
          <div class="px-2 sm:px-4 grid grid-cols-2 gap-3 text-sm">
            <div class="col-span-2 md:col-span-1 flex flex-col xl:flex-row">
              <div class="mr-2 font-semibold">Origin:</div>
              <div>{{ list.start }}</div>
            </div>
            <div class="col-span-2 md:col-span-1 flex flex-col xl:flex-row">
              <div class="mr-2 font-semibold">Destination:</div>
              <div>{{ list.end }}</div>
            </div>
            <div class="col-span-2 md:col-span-1 flex flex-col xl:flex-row">
              <div class="mr-2 font-semibold">Destination Address:</div>
              <div>{{ list.address_info }}</div>
            </div>
            <div class="col-span-2 md:col-span-1 flex flex-col xl:flex-row">
              <div class="mr-2 font-semibold">Address Type:</div>
              <div>{{ list.address_type }}</div>
            </div>
            <div class="col-span-2 md:col-span-1 flex flex-col xl:flex-row">
              <div class="mr-2 font-semibold">Incoterms with supplier:</div>
              <div>{{ list.trade_type }}</div>
            </div>
            <div class="col-span-2 md:col-span-1 flex flex-col xl:flex-row">
              <div class="mr-2 font-semibold">Shipping Method:</div>
              <div>{{ list.transport_type }}</div>
            </div>
            <div class="col-span-2 md:col-span-1 flex flex-col xl:flex-row">
              <div class="mr-2 font-semibold">Total Weight:</div>
              <div>{{ list.weight }}</div>
            </div>
            <div class="col-span-2 md:col-span-1 flex flex-col xl:flex-row">
              <div class="mr-2 font-semibold">Total Volume:</div>
              <div>{{ list.volume }}</div>
            </div>
            <div class="col-span-2 flex flex-col xl:flex-row">
              <div class="mr-2 font-semibold">Optional Information:</div>
              <div v-if="list.insurance != '否'">Request Cargo Insurance via Cargosoon</div>
              <div v-if="list.take_good != '否'">Need Cargosoon pickup service from supplier</div>
              <div v-if="list.insurance == '否' && list.take_good == '否'">N/A</div>
            </div>
          </div>
        </div>
        <quote-d :quoteDList="list.bill_project" @detailModal="detailModal"></quote-d>
      </div>
    </div>
  </div>
</template>

<script>
  import QuoteD from '@/components/Quote/QuoteD'
  import {
    quoteDetail
  } from '@/api/quote'
  export default {
    components: {
      QuoteD
    },
    data() {
      return {
        value: this.$route.params.id,
        list: [],
        feeList: [],
        feeListTotal: 0,
      }
    },
    created(){
      quoteDetail({id:this.value}).then((res)=>{
        // console.log(res)
        let rez = res.data
        for(let i=0;i<rez.bill_project.length;i++){
          let total = 0
          for(let n=0;n<rez.bill_project[i].fee_list.length;n++){
            total += Number(rez.bill_project[i].fee_list[n].sum_price)
          }
          rez.bill_project[i].total = total.toFixed(2)
        }
        this.list = rez
      })
      this.$emit('menu', 'quotePrice')
    },
    methods:{
      toBooking(){
        this.$router.push({
          name: 'shippingList',
        })
      },
      toCustomRFQ(){
        this.$router.push({
          name: 'quoteRequest',
        })
      },
      detailModal(e) {
        let that = this
        that.feeList = that.list.bill_project[e].fee_list
        that.feeListTotal = that.list.bill_project[e].total
        that.$refs.mask.style = 'display:block;'
        that.$refs.detailModal.style = 'display:block;'
        setTimeout(function () {
          that.$refs.mask.style = 'display:block;opacity:1;'
          that.$refs.detailModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        })
      },
      closeModal() {
        let that = this
        that.$refs.mask.style = 'display:block;'
        that.$refs.detailModal.style = 'display:block;'
        setTimeout(function () {
          that.$refs.mask.style = 'display:none;opacity:0;'
          that.$refs.detailModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        })
      }
    }
  }
  </script>

<style lang="postcss" scoped>
td{
  @apply w-1/4 p-2 border border-gray-400;
}

.items{
  @apply p-2.5 grid grid-cols-12 border-b border-gray-300 dark:border-gray-500;
}

.itemsTitle{
  @apply font-semibold col-span-12 sm:col-span-6;
}

.panel{
  @apply bg-white dark:bg-darkMenu mb-4 py-4 px-6 rounded-md shadow-default;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden translate-x-1/2 -translate-y-1/2 w-700 max-w-90% max-h-80% overflow-auto rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.closeModal {
  @apply w-7 h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded;
}
</style>
