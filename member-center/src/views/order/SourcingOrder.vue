<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="cancelModal" class="modal p-4 w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div>Are you sure you want to cancel this request?</div>
      <div class="mt-6 flex justify-end items-center text-sm">
        <div @click="closeModal" class="mr-5 hover:underline cursor-pointer">Cancel</div>
        <button @click="confirmCancel" class="py-1 px-4 text-white rounded bg-orange hover:bg-orange1">Save</button>
      </div>
    </div>
    <div ref="disputeModal" class="modal p-6 w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div>Any questions about the goods in this order?</div>
      <textarea cols="30" rows="6" v-model="disputeContent" class="input resize-none"></textarea>
      <div class="mt-6 flex justify-end items-center text-sm">
        <div @click="closeModal" class="mr-5 hover:underline cursor-pointer">Cancel</div>
        <button @click="confirmDispute" class="py-1 px-4 text-white rounded bg-orange hover:bg-orange1">Submit</button>
      </div>
    </div>
    <div ref="disputeSuccessModal" class="modal p-5 w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-end pb-3">
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="mb-6 flex flex-col items-center">
        <svg t="1676519430153" class="icon mb-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5034" width="70" height="70"><path d="M512 32C246.4 32 32 249.6 32 512s217.6 480 480 480 480-217.6 480-480S774.4 32 512 32z m268.8 380.8L496 697.6c-25.6 25.6-60.8 25.6-83.2 0L243.2 528c-25.6-25.6-25.6-60.8 0-83.2s60.8-25.6 83.2 0l128 128 240-240c25.6-25.6 60.8-25.6 83.2 0 25.6 19.2 25.6 54.4 3.2 80z" p-id="5035" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#75bb43"></path></svg>
        <div class="text-lg font-semibold">Submit successfully</div>
        <div class="text-center font-medium">Your dispute has been submitted and you will be contacted by our account manager within 24 hours.</div>
      </div>
    </div>
    <div ref="disputeCancelModal" class="modal p-4 w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div>Whether to cancel this order dispute?</div>
      <div class="mt-6 flex justify-end items-center text-sm">
        <div @click="closeModal" class="mr-5 hover:underline cursor-pointer">Cancel</div>
        <button @click="confirmDisputeCancel" class="py-1 px-4 text-white rounded bg-orange hover:bg-orange1">Save</button>
      </div>
    </div>

    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        
        <div class="hidden lg:flex flex-wrap text-xs">
          <div v-for="(i,n) in statusList" @click="chooseStatus(i.no)" style="margin: 1px;"
            :class="[statusItem == i.no ? 'border-oranges text-orange': 'border-white dark:border-darkMenu']"
            class="py-2 px-4 flex items-center border-b-2 hover:border-oranges bg-white dark:bg-darkMenu rounded-sm shadow-default cursor-pointer">
            <div>{{i.name}}</div>
            <div class="ml-2 px-1.5 rounded-full text-orange bg-menuSelect">{{i.quantity}}</div>
          </div>
        </div>

        <div class="mt-5  bg-white dark:bg-darkMenu shadow-default rounded-md grid grid-cols-6 gap-4 p-3">
          <div class="searchBar">
            <!-- <svg t="1673426719184" class="icon absolute top-3 left-1.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6587" width="20" height="20"><path d="M705 641.36l193.66 193.66c17.572 17.572 17.572 46.066 0 63.64-17.574 17.572-46.068 17.572-63.64 0l-193.66-193.66C585.972 747.044 516.9 772 442 772c-182.254 0-330-147.746-330-330S259.746 112 442 112s330 147.746 330 330c0 74.9-24.954 143.974-67 199.36zM442 682c132.548 0 240-107.452 240-240s-107.452-240-240-240-240 107.452-240 240 107.452 240 240 240z" fill="#7a7a7a" p-id="6588"></path></svg> -->
            <div class="searchTitle">Order/Tracking NO.:</div>
            <input v-model="search" type="text" class="input h-10">
          </div>
          <div class="searchBar">
            <div class="searchTitle">State selection:</div>
            <select name="status" class="select h-10" v-model="statusItem">
              <option class="hidden" value="null">Status</option>
              <!-- <option value="0">All</option> -->
              <option v-for="(item,index) in statusList" :value="item.no">{{ item.name }}</option>
            </select>
            <!-- <div ref="statusSelect" class="relative">
              <div class="Select" :class="[statusShow ? 'selectOpen' : '']"
                @click.stop="statusShow = !statusShow">
                {{ statusItem }}
                <img src="../../assets/down.svg" class="absolute right-1 top-3.5 w-5" alt="">
              </div>
              <select-search :selectList="statusList" :selectChecked="statusItem" :selectOpen="statusShow"
                @increment="f1" v-show="statusShow"></select-search>
            </div> -->
          </div>
          <div class="searchBar">
            <div class="searchTitle">Destination:</div>
            <div class="relative w-full">
              <input ref="toCountrys" @input="seCountry" @focus="seCountry"
                v-model="shippingTo" class="input h-10" type="text"
                autocomplete="new-password">
              <select-country
                ref="selectCountry"
                :selectList="destinationList"
                :selectChecked="destinationItem"
                :selectOpen="destinationShow"
                @increment="selectDestination"
                v-show="destinationShow"
              ></select-country>
            </div>
          </div>
          <div class="searchBar">
            <div class="searchTitle">Order creation:</div>
            <div class="flex-shrink-1 w-full sm:w-orderDate lg:w-full xl:w-orderDate flex items-center">
              <input ref="dateSelect" @click="dateSelect" type="date" class="input cursor-pointer" v-model="startDate">
              <div class="mx-1 flex-shrink-0">-</div>
              <input ref="dateSelects" @click="dateSelects" type="date" class="input cursor-pointer" v-model="endDate">
            </div>
          </div>
          <div class="searchBar">
            <div class="searchTitle">Type of transport:</div>
            <select name="status" class="select h-10" v-model="transportType">
              <option class="hidden" value="null">transportType</option>
              <!-- <option value="0">All</option> -->
              <option v-for="(item,index) in transportList" :value="item.no">{{ item.name }}</option>
            </select>
          </div>
          <div class="col-span-6 sm:col-span-3 lg:col-span-2 flex flex-row justify-end">
            <button @click="resetSearch" class="px-6 h-10 hover:bg-gray-300 border border-gray-300 dark:border-darkLine rounded-md">Reset</button>
            <button @click="searchData" class="ml-4 px-6 h-10 bg-orange hover:bg-orange1 text-white rounded-md">Search</button>
          </div>
          <!-- <div class="col-span-5 md:col-span-3 xl:col-span-2 flex">
            <router-link :to="'/main/booking'" class="w-full">
              <button class="h-42px w-full bg-gray-400 hover:bg-gray-500 text-white rounded-md font-semibold">Booking</button>
            </router-link>
          </div> -->
        </div>

        <div v-if="list.length == 0" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
          <div class="flex flex-col items-center">
            <img src="../../assets/noData.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
            <div class="mt-5 text-base text-center font-semibold">no orders</div>
          </div>
        </div>

        <div v-else class="hidden md:block mt-5 mb-28 pb-3 bg-white dark:bg-darkMenu shadow-default rounded-md">
          <div class="flex py-3 px-8 border-b border-gray-300 dark:border-darkLine">
            <div style="width: 20%;">Order NO.</div>
            <div style="width: 20%;">Origin</div>
            <div style="width: 20%;">Destination</div>
            <div style="width: 13.33%;">Details</div>
            <div style="width: 13.33%;">Date</div>
            <div style="width: 13.33%;">Action</div>
          </div>
          <div v-for="(i,n) in list" :key="n"
           class="hover:bg-gray-200 border-b border-gray-300 dark:border-darkLine">
            <router-link :to="{path:'/order/forwardingOrder/'+i.id,query:{boxId:i.box_id}}" class="flex py-3 px-8">
              <div style="width: 20%;">
                <div class="flex">
                  <span>{{ i.enquiry_no }}</span>
                  <svg t="1687226456954" @click.prevent="copyNo(i.enquiry_no)" class="icon copyicon ml-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2225" width="20" height="20"><path d="M793.4 241.8h-20.8V232c0-92.8-74.5-168.3-166-168.3h-376c-91.5 0-166 75.5-166 168.3v381.2c0 92.8 74.5 168.3 166 168.3h20.8v9.8c0 92.8 74.5 168.3 166 168.3h376c91.5 0 166-75.5 166-168.3V410.1c0-92.8-74.5-168.3-166-168.3z m-542 168.3v291.6h-20.8c-48.1 0-87.3-39.7-87.3-88.5V232c0-48.8 39.2-88.6 87.3-88.6h376c48.2 0 87.3 39.7 87.3 88.6v9.8H417.4c-91.5 0-166 75.5-166 168.3z m629.3 381.2c0 48.8-39.2 88.5-87.3 88.5h-376c-48.2 0-87.3-39.7-87.3-88.5V410.1c0-48.8 39.2-88.6 87.3-88.6h376c48.2 0 87.3 39.7 87.3 88.6v381.2z m-118-230.5h-118V441.2c0-21.9-17.7-39.9-39.3-39.9-21.6 0-39.3 17.9-39.3 39.9v119.6h-118c-21.6 0-39.3 18-39.3 39.9s17.7 39.9 39.3 39.9h118v119.6c0 21.9 17.7 39.9 39.3 39.9 21.6 0 39.3-17.9 39.3-39.9V640.5h118c21.6 0 39.3-17.9 39.3-39.9 0.1-21.9-17.6-39.8-39.3-39.8z" p-id="2226"></path></svg>
                </div>
                <div>{{ channel[i.transport_type - 1] }}</div>
              </div>
              <div style="width: 20%;">
                <div v-show="i.start_city != ''" class="pr-1">{{ i.start_city }},</div>
                <div class="text-gray-500">China</div>
              </div>
              <div style="width: 20%;">
                <div class="flex flex-wrap">  
                  <div v-show="i.give_city != ''">{{ i.give_city }}, </div>
                  <div v-show="i.give_area">{{ i.give_area }}, </div>
                  <div>{{ i.give_country }}</div>
                </div>
                <div class="pr-1 text-gray-500">{{i.give_zipcode}}</div>
              </div>
              <div class="text-13" style="width: 13.33%;">
                <!-- <div>{{ i.num }}ctns / {{ i.weight }}kg / {{ i.volume }}cbm</div> -->
                {{ i.details }}
              </div>
              <div style="width: 13.33%;">
                <div>{{ i.created_data }}</div>
              </div>
              <div class="flex justify-between items-center" style="width: 13.33%;">
                <!-- <div :class="[i.status < 6 ? 'bg-gray-500' : i.status == 7 ? 'bg-orange' : i.status == 9 ? 'bg-cancelColor' : 'bg-paidColor']"
                  class="py-1 px-2.5 text-white rounded">{{ statusList[i.status-1] }}</div> -->
                <div class="text-xs flex flex-col">
                  <div>
                    <div v-show="i.status == 40">In review</div>
                    <div v-show="i.status == 1">In process</div>
                    <div v-show="i.status == 2 && i.payment_status == 0" class="py-1 px-2.5 text-white rounded bg-orange">Pay now</div>
                    <div v-show="i.status == 7 && i.payment_status == 0" class="py-1 px-2.5 text-white rounded bg-orange">Pay now</div>
                    <div v-show="i.status == 2 && i.payment_status == 1" class="text-green-500">Payment successful</div>
                    <div v-show="i.status == 7 && i.payment_status == 1" class="py-1 px-2.5 text-white rounded bg-orange">Already in port</div>
                    <div v-show="i.status == 9" class="py-1 px-2.5 text-white rounded bg-orange">Confirm receipt</div>
                    <div v-show="i.status == 20" class="py-1 px-2.5 text-white rounded bg-orange">In dispute</div>
                    <div v-show="i.status == 30">Cancelled</div>

                    <!-- <div v-show="i.status == 1">In Review</div>
                    <div v-show="i.status == 2" class="text-blue-500">Pending Warehousing</div>
                    <div v-show="i.status == 3" class="py-1 px-2.5 text-white rounded bg-orange">View Cargo Details</div>
                    <div v-show="i.status == 4 || i.status == 5" class="py-1 px-2.5 text-white rounded bg-orange">Pay Now</div>
                    <div v-show="i.status == 6" class="text-green-500">Payment Successful</div>
                    <div v-show="i.status == 7" class="py-1 px-2.5 text-white rounded bg-orange">Shipped</div>
                    <div v-show="i.status == 8" class="py-1 px-2.5 text-white rounded bg-orange">Confirm Receipt</div>
                    <div v-show="i.status == 9">Completed</div>
                    <div v-show="i.status == 20" class="py-1 px-2.5 text-white rounded bg-orange">In dispute</div>
                    <div v-show="i.status == 30">Cancelled</div> -->
                  </div>
                  <div class="mt-2 underline">
                    <div v-show="i.status == 1 || i.status == 40" @click.prevent="cancelModalOpen(i.id)" class="hover:text-orange">Cancel</div>
                    <div v-show="i.status == 2 && i.payment_status == 0" @click.prevent="sendChat(i)"
                      class="flex items-center hover:text-orange">
                      <img class="w-4" src="../../assets/chatnow.png" alt="">
                      <div>Chat now</div>
                    </div>
                    <div v-show="i.status == 7 && i.payment_status == 0" @click.prevent="sendChat(i)"
                      class="flex items-center hover:text-orange">
                      <img class="w-4" src="../../assets/chatnow.png" alt="">
                      <div>Chat now</div>
                    </div>
                    <div v-show="i.status == 2 && i.payment_status == 1" @click.prevent="toDetail(i.id,5)" class="hover:text-orange">Download Invoice</div>
                    <div v-show="i.status == 7 && i.payment_status == 1" @click.prevent="toDetail(i.id,7)" class="hover:text-orange">View Cargo Tracking</div>
                    <div v-show="i.status == 9" @click.prevent="disputeOpen(i.id)" class="hover:text-orange">In dispute</div>
                    <div v-show="i.status == 20 || i.dispute == '1'" @click.prevent="disputeCancelOpen(i.id)" class="hover:text-orange">Cancellation of the dispute</div>

                    <!-- <div v-show="i.status == 1 || i.status == 2" @click.prevent="cancelModalOpen(i.id)" class="hover:text-orange">Cancelled</div>
                    <div v-show="i.status == 3 || i.status == 4 || i.status == 5" @click.prevent="sendChat(i)"
                      class="flex items-center hover:text-orange">
                      <img class="w-4" src="../../assets/chatnow.png" alt="">
                      <div>Chat now</div>
                    </div>
                    <div v-show="i.status == 6" @click.prevent="toDetail(i.id,5)" class="hover:text-orange">Download Invoice</div>
                    <div v-show="i.status == 7" @click.prevent="toDetail(i.id,7)" class="hover:text-orange">View Cargo Tracking</div>
                    <div v-show="i.status == 8" @click.prevent="disputeOpen(i.id)" class="hover:text-orange">In dispute</div>
                    <div v-show="i.status == 20 || i.dispute == '1'" @click.prevent="disputeCancelOpen(i.id)" class="hover:text-orange">Cancellation of the dispute</div> -->
                  </div>
                </div>
                <svg t="1669887217519" class="icon w-6 h-6 p-1 flex-shrink-0 fill-current text-svgColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6019" width="200" height="200"><path d="M271.94000029 147.34999971a49.32 49.32 0 0 1 0-70.70999942c19.91999971-19.50000029 52.2-19.50000029 72.11999971 0l407.99999971 399.98999971c19.91999971 19.53 19.91999971 51.21 0 70.74l-407.99999971 399.98999971c-19.91999971 19.50000029-52.2 19.50000029-72.11999971 0a49.32 49.32 0 0 1 0-70.70999942L643.87999971 512 271.94000029 147.34999971z" p-id="6020"></path></svg>
              </div>
            </router-link>
          </div>
        </div>

        <div class="block md:hidden mt-3 mb-32">
          <div v-for="(z,x) in list" :key="x"
            class="mt-2 p-3 bg-white dark:bg-darkMenu shadow-default rounded-md">
            <div class="relative">
              <div class="absolute top-0 right-0">{{ z.created_data }}</div>
              <div>{{ z.enquiry_no }}</div>
              <div>{{ channel[z.transport_type - 1] }}</div>
              <div class="flex my-1">
                <!-- <div :class="[z.status < 6 ? 'bg-gray-500' : z.status == 7 ? 'bg-orange' : z.status == 9 ? 'bg-cancelColor' : 'bg-paidColor']"
                  class="py-1 px-2.5 text-white rounded">{{ statusList[z.status-1] }}</div> -->
              </div>
              <div class="mt-2 relative">
                <router-link :to="{path:'/order/forwardingOrder/'+z.id,query:{boxId:z.box_id}}">
                  <button class="px-3 py-1 bg-orange hover:bg-orange1 text-white rounded-md ">View Details</button>
                </router-link>
                <img @click="z.show = !z.show"
                  src="../../assets/down1.svg" class="w-6 h-6 absolute bottom-0 right-0 cursor-pointer rounded-md hover:bg-gray-300" alt="">
              </div>
            </div>
            <div v-show="z.show" class="mt-3 border-t border-gray-300 dark:border-darkLine">
              <div class="py-1.5 border-b border-gray-300 dark:border-darkLine flex justify-between items-center">
                <div class="w-20 flex-shrink-0 font-medium">Origin</div>
                <div class=" text-right">
                  <div v-show="z.start_city != ''" class="pr-1">{{ z.start_city }},</div>
                  <div class="text-gray-500">China</div>
                </div>
              </div>
              <div class="py-1.5 border-b border-gray-300 dark:border-darkLine flex justify-between items-center">
                <div class="w-20 flex-shrink-0 font-medium">Destination</div>
                <div class="text-right">
                  <div class="flex justify-end flex-wrap">  
                    <div v-show="z.give_city != ''">{{ z.give_city }}, </div>
                    <div v-show="z.give_area">{{ z.give_area }}, </div>
                    <div>{{ z.give_country }}</div>
                  </div>
                </div>
              </div>
              <div class="py-1.5 border-b border-gray-300 dark:border-darkLine flex justify-between items-center">
                <div class="w-20 flex-shrink-0 font-medium">Details</div>
                <div class="text-13 text-right">
                  <div>{{ z.num }}ctns / {{ z.weight }}kg / {{ z.volume }}cbm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectCountry from '@/components/Order/Forwarding/OrderListCountry'
  // import SelectSearch from '@/components/SelectSearch'
  import {
    getOrderList,
    disputeOrder,
    cancelOrder
  } from '@/api/order'
  import {
    shipFromTo
  } from '@/api/shippingCost'

  export default {
    components: {
      SelectCountry
      // SelectSearch
    },
    data() {
      return {
        list: [],
        statusList: [
          // {name:'All order',no:'0',quantity:''},
          // {name:'In process',no:'1',quantity:''},
          // {name:'Pending warehousing',no:'2',quantity:''},
          // {name:'In storage',no:'3',quantity:''},
          // {name:'Awaiting payment',no:'4',quantity:''},
          // {name:'Payment review',no:'5',quantity:''},
          // {name:'Paid',no:'6',quantity:''},
          // {name:'To be shipped',no:'7',quantity:''},
          // {name:'Delivered',no:'8',quantity:''},
          // {name:'Completed',no:'9',quantity:''},
          // {name:'In dispute',no:'20',quantity:''},
          // {name:'Canceled',no:'30',quantity:''},
          {name:'In review',no:'40',quantity:''},
          {name:'In process',no:'1',quantity:''},
          {name:'Unpaid',no:'50',quantity:''},
          {name:'To be shipped',no:'2',quantity:''},
          {name:'To be received',no:'7',quantity:''},
          {name:'Completed',no:'9',quantity:''},
          {name:'In dispute',no:'20',quantity:''},
          {name:'Cancelled',no:'30',quantity:''},
        ],
        statusItem: 0,
        statusShow: false,
        search: '',
        channel: ['Sea Freight','Air Freight','Small Package','Express','Train Freight'],
        orderID: null,
        disputeContent: '',
        destinationList: [],
        // destinationItem: { zh_cn_nickname: '美国', code_two: 'US', en_nickname: 'United States' },
        destinationItem: {},
        destinationShow: false,
        shippingTo: '',
        startDate: null,
        endDate: null,
        transportType: '',
        transportList: [
          {name: 'Sea Freight', no: '1'},
          {name: 'Air Freight', no: '2'},
          {name: 'Small Package', no: '3'},
          {name: 'Express', no: '4'},
          {name: 'Train Freight', no: '5'}
        ],
      }
    },
    created() {
      this.$emit('menu', 'sourcingOrder')
      this.searchData()
      shipFromTo().then((res)=>{
        this.destinationList = res.data.endCountry
      })
    },
    mounted() {
      document.addEventListener(
        "click",
        this.even,
        true
      );
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
    },
    methods:{
      even(e){
        if (!this.$refs.toCountrys.contains(e.target)) {
          this.destinationShow = false;
        }
        // if (!this.$refs.statusSelect.contains(e.target)) {
        //   this.statusShow = false;
        // }
      },
      // f1(data, index, clickOne){
      //   this.statusItem = data
      //   this.statusShow = clickOne
      // },
      // searchNo(){
      //   this.searchData()
      // },
      // searchStatus(){
      //   this.search = ''
      //   this.searchData()
      // },
      resetSearch(){
        this.search = ''
        this.statusItem = 0
        this.destinationItem = {}
        this.shippingTo = ''
        this.startDate = ''
        this.endDate = ''
        this.transportType = ''
        this.searchData()
      },
      chooseStatus(no){
        // this.search = ''
        this.statusItem = no
        this.searchData()
      },
      searchData(){
        getOrderList({
          order_no: this.search,
          status: this.statusItem,
          country: this.destinationItem.code_two,
          from_time: this.startDate,
          to_time: this.endDate,
          transport_type: this.transportType,
        }).then((res)=>{
          res.data.data.forEach(item=>{
            Object.assign(item,{show:false})
          })
          this.list = res.data.data
          let st = res.data.statusCn[0]
          this.statusList[0].quantity = st.status_40
          this.statusList[1].quantity = st.status_1
          this.statusList[2].quantity = st.status_50
          this.statusList[3].quantity = st.status_2
          this.statusList[4].quantity = st.status_7
          this.statusList[5].quantity = st.status_9
          this.statusList[6].quantity = st.status_20
          this.statusList[7].quantity = st.status_30

          // this.statusList[0].quantity = st.status_0
          // this.statusList[1].quantity = st.status_1
          // this.statusList[2].quantity = st.status_2
          // this.statusList[3].quantity = st.status_3
          // this.statusList[4].quantity = st.status_4
          // this.statusList[5].quantity = st.status_5
          // this.statusList[6].quantity = st.status_6
          // this.statusList[7].quantity = st.status_7
          // this.statusList[8].quantity = st.status_8
          // this.statusList[9].quantity = st.status_9
          // this.statusList[10].quantity = st.status_20
          // this.statusList[11].quantity = st.status_30
        })
      },
      copyNo(e){
        var text = e
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text)
        } else {
          var textarea = document.createElement('textarea')
          document.body.appendChild(textarea)
          textarea.style.position = 'fixed'
          textarea.style.clip = 'rect(0 0 0 0)'
          textarea.style.top = '10px'
          textarea.value = text
          textarea.select()
          document.execCommand('copy', true)
          document.body.removeChild(textarea)
        }
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.cancelModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.disputeModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.disputeSuccessModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.disputeCancelModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      cancelModalOpen(id){
        this.orderID = id
        this.$refs.mask.style = 'display:block;'
        this.$refs.cancelModal.style = 'display:block;'
        setTimeout(()=>{
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.cancelModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        })
      },
      confirmCancel(){
        cancelOrder({
          id: this.orderID
        }).then((res)=>{
          this.closeModal()
          this.searchData()
        })
      },
      sendChat(item){
        localStorage.setItem("OrderItem",JSON.stringify(item))
        this.$emit('orderchat')
      },
      disputeOpen(id){
        this.orderID = id
        this.$refs.mask.style = 'display:block;'
        this.$refs.disputeModal.style = 'display:block;'
        setTimeout(()=>{
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.disputeModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        })
      },
      confirmDispute(){
        disputeOrder({
          id: this.orderID,
          dispute: this.disputeContent
        }).then((res)=>{
          this.disputeContent = ''
          this.searchData()
          this.$refs.disputeModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
          this.$refs.disputeSuccessModal.style = 'display:block;'
          setTimeout(()=>{
            this.$refs.disputeSuccessModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          })
        })
      },
      disputeCancelOpen(id){
        this.orderID = id
        this.$refs.mask.style = 'display:block;'
        this.$refs.disputeCancelModal.style = 'display:block;'
        setTimeout(()=>{
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.disputeCancelModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        })
      },
      confirmDisputeCancel(){
        disputeOrder({
          id: this.orderID,
          dispute: this.disputeContent
        }).then((res)=>{
          this.searchData()
          this.closeModal()
        })
      },
      toDetail(id,type){
        this.$router.push({
          path: '/order/forwardingOrder/'+id,
          query: {
            type: type
          },
        })
      },
      seCountry(){
        this.destinationShow = true
        this.$refs.selectCountry.Search(this.shippingTo)
      },
      selectDestination(data, show) {
        // console.log(data);
        this.shippingTo = data.en_nickname
        this.destinationItem = data
        this.destinationShow = false
      },
      dateSelect(){
        this.$refs.dateSelect.showPicker()
      },
      dateSelects(){
        this.$refs.dateSelects.showPicker()
      },
    }
  }
  </script>

<style lang="postcss" scoped>
.copyicon{
  fill: #7a7a7a;
}

.copyicon:hover{
  fill: #f39333;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}
/* .Select{
  @apply h-42px w-full bg-white hover:bg-selectOpen dark:bg-darkMain dark:border-darkMain border border-inputBorder rounded px-3 py-2 text-base cursor-pointer relative;
}

.selectOpen{
  @apply bg-selectOpen !important;
} */

.searchBar{
  @apply col-span-3 lg:col-span-2 flex items-start flex-col sm:items-center sm:flex-row lg:items-start lg:flex-col xl:items-center xl:flex-row;
}

.searchTitle{
  @apply flex-shrink-0 w-36 pr-2 text-left sm:text-right lg:text-left xl:text-right;
}
</style>
