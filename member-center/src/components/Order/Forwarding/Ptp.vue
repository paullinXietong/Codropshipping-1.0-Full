<template>
  <div class="mb-28">
    <div class="panel">
      <div class="mb-4 font-semibold">Route information</div>
      <div class="grid grid-cols-10 text-sm">
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Carrier</div>
          <div class="p-2">{{list.company}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Departure</div>
          <div class="p-2">{{list.start_port}},{{list.start_country}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Destination</div>
          <div class="p-2">{{list.end_port}},{{list.end_country}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Line</div>
          <div class="p-2">{{list.sea_line}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Vessel Name, Voyage No</div>
          <div class="p-2">{{list.ship_cn}}</div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="mb-4 font-semibold">Payment records</div>
      <div class="pt-3 grid grid-cols-10 text-sm">
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Time of payment</div>
          <div v-if="list.pay.payment_time" class="p-2">{{ list.pay.payment_time }}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Payment method</div>
          <div v-if="list.pay.payment_method" class="p-2">{{ list.pay.payment_method }}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Amount(USD)</div>
          <div v-if="list.pay.total_price" class="p-2">{{ list.pay.total_price }}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Status</div>
          <div v-if="list.pay.payment_status" class="p-2">{{ list.pay.payment_status }}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Action</div>
          <div class="p-2 flex flex-wrap">
            <button @click="toDetail(id,6)" v-if="list.pay.payment_status == '1'" class="mr-3 my-1 px-4 py-1.5 rounded bg-orange hover:bg-orange1 text-white">Pay now</button>
            <button @click="toDetail(id,5)" v-if="list.pay.invoice" class="my-1 px-4 py-1.5 rounded border border-gray-600 hover:bg-gray-300">Download invoice</button>
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="mb-4 font-semibold">Container records</div>
      <div class="grid grid-cols-10 text-sm">
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">EQ Type/Q'ty</div>
          <div class="p-2">{{list.box_good}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Total Weight(KG)</div>
          <div class="p-2">{{list.weight}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Total Volume(CBM)</div>
          <div class="p-2">{{list.volume}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Special Type(M)</div>
          <div class="p-2">{{list.box_volume}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Type of goods</div>
          <div class="p-2">{{productType[list.product_type]}}</div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="mb-4 font-semibold">B/L Info</div>
      <div class="grid grid-cols-10 text-sm">
        <!-- <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">B/L No.</div>
          <div class="p-2">{{list.}}</div>
        </div> -->
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">BILL of Lading#</div>
          <div class="p-2">{{issueType[list.issue_type]}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-8">
          <div class="routeTitle">Postal address</div>
          <div class="p-2">{{list.issue_address}}</div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="mb-4 font-semibold">Pickup information</div>
      <div class="grid grid-cols-10 text-sm">
        <div class="col-span-10 sm:col-span-5 xl:col-span-2 text-blue-500">
          <div v-show="list.take==1">Need to pick up</div>
          <div v-show="list.take==0">No need to pick up</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2 flex flex-wrap">
          <div class="mr-3">Supplier contact number:</div>
          <div class="text-blue-500">{{list.take_vendor_tel}}</div>
        </div>
        <div class="col-span-10 xl:col-span-6 flex flex-wrap">
          <div class="mr-3">Delivery time:</div>
          <div class="text-blue-500">{{list.delivery_time}}</div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="mb-4 font-semibold">Other Services</div>
      <div class="grid grid-cols-10 text-sm">
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Term of service</div>
          <div class="p-2">{{list.service_type}}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-8">
          <div class="routeTitle">Insurance Service</div>
          <div class="p-2">{{insuranceType[list.insurance]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getOrderInfo
  } from '@/api/order'
  export default {
    name: 'PtpDetails',
    props: {
      id: null,
      tab: '',
    },
    data() {
      return {
        list: {
          pay: {},
        },
        productType:['','General products','Special products'],
        issueType:['','OCEAN BILL OF LADING','SURRENDER.TLXRLS','SEA WAY BILL','','','Destination port release'],
        insuranceType:['No','Yes'],
      }
    },
    // watch:{
    //   tab: {
    //     handler (val, oldVal) {
    //       if(val==0){
    //         this.getData()
    //       }
    //     }
    //   },
    // },
    created(){
      if(this.id){
        this.getData()
      }
    },
    methods:{
      getData(){
        getOrderInfo({
          id: this.id,
          type: 1
        }).then((res)=>{
          this.list = res.data
        })
      },
      toDetail(id,type){
        console.log(id,type);
        // this.$router.push({
        //   path: '/order/forwardingOrder/'+id,
        //   query: {
        //     type: type
        //   },
        // })
        // setTimeout(()=>{
        //   this.$router.go(0)
        // },300)
      }
    }
  }
</script>

<style lang="postcss" scoped>
.panel{
  @apply p-6 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default;
}

.routeTitle{
  @apply p-2 border-b border-gray-300 bg-gray-200;
}
</style>