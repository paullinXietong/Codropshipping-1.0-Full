<template>
  <div class="w-full h-full p-5 relative">
    <!-- <div class="absolute bottom-0 z-10" style="width: calc(100% - 40px);">
      <div class="bg-white p-4 w-full shadow-default border rounded-t flex items-center justify-between text-sm">
        123
      </div>
    </div> -->

    <div v-if="type == '-2' || type == 1" class="absolute bottom-0 z-10" style="width: calc(100% - 40px);">
      <div class="bg-white p-4 w-full shadow-default border rounded-t flex items-center justify-end text-sm">
        <div class="flex flex-col items-end mr-10">
          <div class="text-lg font-bold" style="color: #d10000;">Amounts Due: ${{list.total_price_us}}</div>
          <div style="color: #787878;">The order amount is based on the submitted order.</div>
        </div>
        <button @click="toChat" v-show="type == '-2'" class="btn">Contact Sales</button>
        <button @click="toPay" v-show="type == 1" class="btn">Payments</button>
        <!-- <button class="btn" v-show="showLoading">
          <svg class="animate-spin mx-auto my-0.5 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"></circle>
            <path class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button> -->
      </div>
    </div>

    <div class="h-full overflow-y-auto pb-32 p-0.5">
      <div @click="toList" class="mb-4 flex items-center p-4 bg-white rounded-md shadow-default cursor-pointer">
        <img src="@/assets/arrowLeft.svg" class="w-7 mr-2" alt="">
        <div>Inventory Details</div>
      </div>
      <!-- <div class="p-4 rounded-md shadow-default bg-white grid grid-cols-3 gap-4">
        <div class="col-span-1">
          <div class="flex items-center">
            <div class="mr-6 flex-shrink-0">支付商品:</div>
            <div class="w-full bg-blue-500" style="height: 2px;"></div>
          </div>
          <div class="text-sm">xxxxxxx</div>
        </div>
        <div class="col-span-1">
          <div class="flex items-center">
            <div class="mr-6 flex-shrink-0">支付运费:</div>
            <div class="w-full bg-blue-500" style="height: 2px;"></div>
          </div>
          <div class="text-sm">xxxxxxx</div>
        </div>
        <div class="col-span-1">
          <div class="flex items-center">
            <div class="mr-6 flex-shrink-0">等待收货:</div>
            <div class="w-full bg-blue-500" style="height: 2px;"></div>
          </div>
          <div class="text-sm">xxxxxxx</div>
        </div>
      </div> -->

      <div class="mx-auto flex justify-between" style="max-width: 1200px;">
        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="steps bg-oranges">1</div>
          <div>Select Order</div>
        </div>
        <div class="w-full h-0.5 mt-3" :class="type>1?'bg-oranges':'bg-gray-300'"></div>
        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="steps" :class="type>1?'bg-oranges':'bg-gray-300'">2</div>
          <div>Pay For Products Fee</div>
        </div>
        <div class="w-full h-0.5 mt-3" :class="type>3?'bg-oranges':'bg-gray-300'"></div>
        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="steps" :class="type>3?'bg-oranges':'bg-gray-300'">3</div>
          <div>Pay For International Delivery Fee</div>
        </div>
        <div class="w-full h-0.5 mt-3" :class="type>6?'bg-oranges':'bg-gray-300'"></div>
        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="steps" :class="type>6?'bg-oranges':'bg-gray-300'">4</div>
          <div>Delivery</div>
        </div>
      </div>

      <div class="mt-4 p-4 rounded-md shadow-default bg-white grid grid-cols-12 gap-4">
        <div class="col-span-12" :class="[ispay ? 'sm:col-span-12' : 'sm:col-span-7']">
          <!-- <div class="grid grid-cols-9 gap-3 text-sm">
            <div class="col-span-3">Product</div>
            <div class="col-span-2 text-center">Qty</div>
            <div class="col-span-2 text-center">Price(USD)</div>
            <div class="col-span-2 text-right">Total(USD)</div>
          </div> -->
          <div v-if="type<4" v-for="(it,nt) in list.goods_list" :key="nt" class="pt-2 bg-white">
            <div class="flex justify-between">
              <div>Order</div>
              <div v-show="it.source==4" class="">Warehouse:{{ it.delivery_area_code_en }}</div>
            </div>

            <div
              v-for="(ix,nx) in it.sku_info"
              :key="nx"
              class="mt-3 text-sm"
            >
              <div class="flex">
                <img
                  :src="ix.image"
                  class="flex-shrink-0 w-20 h-20 rounded-md"
                  alt=""
                >
                <div
                  class="flex-1 text-sm pl-2"
                  style="width: calc(100% - 5rem);"
                >
                  <div class="mb-1 no-wrap">{{it.subject}}</div>
                  <div class="w-full bg-gray-50 no-wrap text-gray-500 mb-1">{{ix.sku_name}}</div>
                  <div class="flex justify-between">
                    <div class="col-span-2 flex items-center justify-center text-gray-500">
                      <i class="el-icon-close"></i>{{ix.num}}
                    </div>
                    <div class="col-span-2 flex items-center justify-end text-red-500 text-base">${{ix.total_price_us}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="type>3">
            <div v-for="(item,index) in list" :key="index+'nt'" :class="index>0?'pt-4':''">
              <div class="routeTitle text-sm">Order NO: {{item.order_number}}</div>
              <div v-for="(it,nt) in item.goods_list" :key="nt" class="pt-2 bg-white">
                <div class="flex justify-between">
                  <div>Order {{nt+1}}</div>
                  <div v-show="it.source==4" class="">Warehouse:{{ it.delivery_area_code_en }}</div>
                </div>

                <div
                  v-for="(ix,nx) in it.sku_info"
                  :key="nx"
                  class="mt-3 text-sm"
                >
                  <div class="flex">
                    <img
                      :src="ix.image"
                      class="flex-shrink-0 w-20 h-20 rounded-md"
                      alt=""
                    >
                    <div
                      class="flex-1 text-sm pl-2"
                      style="width: calc(100% - 5rem);"
                    >
                      <div class="mb-1 no-wrap">{{it.subject}}</div>
                      <div class="w-full bg-gray-50 no-wrap text-gray-500 mb-1">{{ix.sku_name}}</div>
                      <div class="flex justify-between">
                        <div class="col-span-2 flex items-center justify-center text-gray-500">
                          <i class="el-icon-close"></i>{{ix.num}}
                        </div>
                        <div class="col-span-2 flex items-center justify-end text-red-500 text-base">${{ix.total_price_us}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div v-for="(it,nt) in list.goods_list" :key="nt" class="pt-4 bg-white">
            <div class="flex">
              <img :src="it.image" class="mr-4 flex-shrink-0 w-20 h-20 rounded-md" alt="">
              <div class="w-full text-sm">{{it.subject}}</div>
            </div>
            <div class="mt-3 grid grid-cols-9 gap-3 text-sm">
              <div class="col-span-3 flex items-center">
                <div class="w-full bg-gray-50 p-2">{{it.sku_name}}</div>
              </div>
              <div class="col-span-2 flex items-center justify-center">{{it.num}}</div>
              <div class="col-span-2 flex items-center justify-center">{{it.price_us}}</div>
              <div class="col-span-2 flex items-center justify-end">{{it.total_price_us}}</div>
            </div>
          </div> -->
        </div>

        <div v-if="type=='1' || type=='-2'" class="col-span-12 sm:col-span-5">
          <div class="py-1 px-3 rounded-lg border border-oranges text-orange text-sm" style="background-color: #ffe4b2;">The freight rate is generated by AI</div>
          <div class="mt-4 p-4 rounded-lg border">
            <div class="flex justify-between">
              <div>Product Price</div>
              <div>${{list.goods_price_us}}</div>
            </div>
            <div class="mt-3 flex justify-between">
              <div>Procurement Cost</div>
              <div>${{list.purchase_fee}}</div>
            </div>
            <div class="mt-3 flex justify-between">
              <div>International Logistics</div>
              <div>{{list.shipping_fee>0?'$'+list.shipping_fee:'Calculation after arrival in warehouse'}}</div>
            </div>
            <div class="mt-3 flex justify-between">
              <div>Coupon</div>
              <div class="text-red-500">-${{list.coupon_price}}</div>
            </div>
            <!-- <div v-if="type=='-2'" class="mt-3 pt-3 border-t flex justify-between">
              <div>Shipping Costs</div>
              <div>--</div>
            </div>
            <div v-if="type=='1'" class="mt-3 pt-3 border-t flex justify-between">
              <div>Shipping Costs</div>
              <div>${{list.shipping_fee}}</div>
            </div> -->
            <div class="mt-3 pt-3 border-t flex justify-between">
              <div>Total Cost</div>
              <div class="font-semibold" style="color: #d10000;">${{list.total_price_us}}</div>
            </div>
          </div>
          <div class="p-2 text-sm" style="color: #787878;">The Specific Logistics Fee Is Subject to the Weighing of the Package to the Warehouse.</div>
        </div>
      </div>

      <div v-if="ispay" class="p-4 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default">
        <div v-if="type<4" class="grid grid-cols-8 text-sm">
          <div class="col-span-8 sm:col-span-4 xl:col-span-2">
            <div class="routeTitle">Order No.</div>
            <div class="p-2">{{list.order_number}}</div>
          </div>
          <div class="col-span-8 sm:col-span-4 xl:col-span-2">
            <div class="routeTitle">Product Price</div>
            <div class="p-2">${{list.goods_price_us}}</div>
          </div>
          <div class="col-span-8 sm:col-span-4 xl:col-span-2">
            <div class="routeTitle">Procurement Cost</div>
            <div class="p-2">${{list.purchase_fee}}</div>
          </div>
          <!-- <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Shipping Costs</div>
            <div class="p-2">${{list.shipping_fee}}</div>
          </div> -->
          <div class="col-span-8 sm:col-span-4 xl:col-span-2">
            <div class="routeTitle">Total Cost</div>
            <div class="p-2 font-semibold" style="color: #d10000;">${{list.total_price_us}}</div>
          </div>
        </div>
        <div v-if="type>3">
          <div v-for="(item,index) in list" :key="index+'nn'" :class="index>0?'pt-4':''" class="grid grid-cols-8 text-sm">
            <div class="col-span-8 sm:col-span-4 xl:col-span-2">
              <div class="routeTitle">Order No.</div>
              <div class="p-2">{{item.order_number}}</div>
            </div>
            <div class="col-span-8 sm:col-span-4 xl:col-span-2">
              <div class="routeTitle">Product Price</div>
              <div class="p-2">${{item.goods_price_us}}</div>
            </div>
            <div class="col-span-8 sm:col-span-4 xl:col-span-2">
              <div class="routeTitle">Procurement Cost</div>
              <div class="p-2">${{item.purchase_fee}}</div>
            </div>
            <!-- <div class="col-span-10 sm:col-span-5 xl:col-span-2">
              <div class="routeTitle">Shipping Costs</div>
              <div class="p-2">${{item.shipping_fee}}</div>
            </div> -->
            <div class="col-span-8 sm:col-span-4 xl:col-span-2">
              <div class="routeTitle">Total Cost</div>
              <div class="p-2 font-semibold" style="color: #d10000;">${{item.total_price_us}}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="type<4">
        <div v-if="list.address_info" class="p-4 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default">
          <div class="mb-4 font-semibold">Shipping to?</div>
          <div class="grid grid-cols-5 text-sm">
            <div class="col-span-5 sm:col-span-1">
              <div class="routeTitle">Destination Type</div>
              <div class="p-2">{{ DestinationType[list.address_info.address_type] }}</div>
            </div>
            <div class="col-span-5 sm:col-span-1">
              <div class="routeTitle">Country/Area</div>
              <div class="p-2">{{ list.address_info.country }}</div>
            </div>
            <div class="col-span-5 sm:col-span-1">
              <div class="routeTitle">State/Province</div>
              <div class="p-2">{{ list.address_info.area }}</div>
            </div>
            <div class="col-span-5 sm:col-span-1">
              <div class="routeTitle">City</div>
              <div class="p-2">{{ list.address_info.city }}</div>
            </div>
            <div class="col-span-5 sm:col-span-1">
              <div class="routeTitle">Postal Code</div>
              <div class="p-2">{{ list.address_info.zipcode }}</div>
            </div>
          </div>
          <div class="p-2 text-sm">
            <div class="flex mb-1">
              <div class="mr-2 w-32 font-medium">Company Name:</div>
              <div>{{ list.address_info.address_name }}</div>
            </div>
            <div class="flex mb-1">
              <div class="mr-2 w-32 font-medium">Full Name:</div>
              <div>{{ list.address_info.full_name }}</div>
            </div>
            <div class="flex mb-1">
              <div class="mr-2 w-32 font-medium">Phone Number:</div>
              <div>{{ list.address_info.tel }}</div>
            </div>
            <div class="flex mb-1">
              <div class="mr-2 w-32 font-medium">Address Line 1:</div>
              <div>{{ list.address_info.address_one }}</div>
            </div>
            <div class="flex mb-1">
              <div class="mr-2 w-32 font-medium">Address Line 2:</div>
              <div>{{ list.address_info.address_two }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="type>3" class="p-4 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default">
        <div class="mb-4 font-semibold">Shipping to?</div>
        <div class="grid grid-cols-5 text-sm">
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">Destination Type</div>
            <div class="p-2">{{ DestinationType[address_info.address_type] }}</div>
          </div>
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">Country/Area</div>
            <div class="p-2">{{ address_info.country }}</div>
          </div>
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">State/Province</div>
            <div class="p-2">{{ address_info.area }}</div>
          </div>
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">City</div>
            <div class="p-2">{{ address_info.city }}</div>
          </div>
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">Postal Code</div>
            <div class="p-2">{{ address_info.zipcode }}</div>
          </div>
        </div>
        <div class="p-2 text-sm">
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Company Name:</div>
            <div>{{ address_info.address_name }}</div>
          </div>
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Full Name:</div>
            <div>{{ address_info.full_name }}</div>
          </div>
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Phone Number:</div>
            <div>{{ address_info.tel }}</div>
          </div>
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Address Line 1:</div>
            <div>{{ address_info.address_one }}</div>
          </div>
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Address Line 2:</div>
            <div>{{ address_info.address_two }}</div>
          </div>
        </div>
      </div>

      <div v-show="type<4" class="p-4 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default">
        <div class="flex justify-between">
          <div class="font-semibold">International Delivery Fee Estimate</div>
          <router-link :to="{ name: 'shippingList' }" class="flex items-center hover:underline">
            <svg t="1761813196913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5837" width="20" height="20"><path d="M532.523781 653.790711h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255524v40.514118c0 11.184923 9.068552 20.255523 20.255524 20.255524h40.51207c11.186971 0 20.255523-9.0706 20.255524-20.255524V674.047259c0.001024-11.185947-9.067528-20.256547-20.255524-20.256548z m0-141.790711h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255523v40.512071c0 11.186971 9.068552 20.257571 20.255524 20.257571h40.51207c11.186971 0 20.255523-9.0706 20.255524-20.257571v-40.512071c0.001024-11.184923-9.067528-20.255523-20.255524-20.255523z m-182.302782 0h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255523v40.512071c0 11.186971 9.068552 20.257571 20.255524 20.257571h40.51207c11.184923 0 20.255523-9.0706 20.255524-20.257571v-40.512071c0-11.184923-9.0706-20.255523-20.255524-20.255523z m425.373158-384.862111H248.941335c-44.748908 0-81.023117 36.276257-81.023118 81.025165v607.674916c0 44.748908 36.274209 81.023117 81.023118 81.023118h526.652822c44.74686 0 81.023117-36.274209 81.023118-81.023118V208.164078c0.001024-44.749932-36.275233-81.026189-81.023118-81.026189z m40.512071 688.702129c0 22.374966-18.137105 40.512071-40.512071 40.512071H248.941335c-22.374966 0-40.512071-18.137105-40.512071-40.512071v-607.67594c0-22.374966 18.137105-40.512071 40.512071-40.512071h526.652822c22.374966 0 40.512071 18.137105 40.512071 40.512071v607.67594zM350.220999 653.790711h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255524v40.514118c0 11.184923 9.068552 20.255523 20.255524 20.255524h40.51207c11.184923 0 20.255523-9.0706 20.255524-20.255524V674.047259c0-11.185947-9.0706-20.256547-20.255524-20.256548z m364.605564-141.790711h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255523v40.512071c0 11.186971 9.068552 20.257571 20.255524 20.257571h40.51207c11.186971 0 20.255523-9.0706 20.255524-20.257571v-40.512071c0.001024-11.184923-9.067528-20.255523-20.255524-20.255523z m-20.255523-263.326923h-364.605564c-22.374966 0-40.512071 18.139152-40.512071 40.51207v81.025165c0 22.374966 18.137105 40.510023 40.512071 40.510023h364.605564c22.372918 0 40.512071-18.135057 40.512071-40.510023v-81.025165c0-22.372918-18.139152-40.512071-40.512071-40.51207z m0 121.537235h-364.605564v-81.023117h364.605564v81.023117z m20.255523 283.580399h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255524v40.514118c0 11.184923 9.068552 20.255523 20.255524 20.255524h40.51207c11.186971 0 20.255523-9.0706 20.255524-20.255524V674.047259c0.001024-11.185947-9.067528-20.256547-20.255524-20.256548z" fill="#8a8a8a" p-id="5838"></path></svg>
            International Shipping Calculator
          </router-link>
        </div>
        <!-- <div class="mt-4 grid grid-cols-4 gap-4">
          <div v-for="(i,n) in freightEstimate" class="col-span-1 p-3 border rounded">
            <div class="flex items-center">
              <img :src="i.product_img" class="w-12 h-12 rounded-full mr-3" alt="">
              <div>{{i.product_name_e}}</div>
            </div>
            <div class="py-1.5">{{i.aging_start}}-{{i.aging_end}} Business Days</div>
            <div class="text-red-500 font-semibold">US$ {{i.super_freight}}</div>
          </div>
        </div> -->
      </div>

      <div v-show="type>3" class="mt-4 p-4 bg-white rounded-md shadow-default">
        <div class="mb-3">Select Logistics</div>
        <div class="text-sm">{{transport_channel}} <span class="text-oranges font-semibold">${{shipping_fee}}</span></div>
      </div>

      <div v-show="type>3" class="mt-4 bg-white rounded-md shadow-default">
        <div class="pt-4 px-4">
          <div class="mb-3">Billing Info</div>
          <div class="mt-3 grid grid-cols-3 text-13">
            <div class="col-span-2 p-2 bg-gray-100">Fee Name</div>
            <div class="col-span-1 p-2 bg-gray-100">Price</div>
            <div class="col-span-2 p-2">Booking Fee</div>
            <div class="col-span-1 p-2">${{shipping_fee}}</div>
            <div class="col-span-2 p-2">Warehouse Out Charge</div>
            <div class="col-span-1 p-2">${{storageCharge}}</div>
          </div>
        </div>
        <div class="px-4 py-2 border-t grid grid-cols-3 text-13 font-semibold text-sm">
          <div class="col-span-2 p-2">Total Cost</div>
          <div class="col-span-1 p-2 text-red-500">${{totalCost}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    orderDetails
  } from '@/api/dropshipping'
  export default {
    data() {
      return {
        orderNo: '',
        list: {},
        DestinationType: ['Non-FBA Warehouse','FBA Address'],
        showLoading: false,
        ispay: true,
        freightEstimate: [],
        totalCost: 0,
        type: 0,
        transport_channel: '',
        shipping_fee: 0,
        storageCharge: 0,
        address_info: {},
      }
    },
    mounted() {
      this.orderNo = this.$route.query.id
      this.type = this.$route.query.type
      this.getData()
    },
    methods: {
      getData(){
        orderDetails({
          order_number: this.orderNo,
          status: this.type
        }).then((res)=>{
          this.list = res.data.order_info
          if(this.type<4){
            this.type = this.list.status
          }else{
            this.type = this.list[0].status
            this.transport_channel = res.data.transport_channel
            this.shipping_fee = res.data.shipping_fee
            this.storageCharge = res.data.storageCharge
            this.totalCost = (Number(this.shipping_fee) + Number(this.storageCharge)).toFixed(2)
            this.address_info = this.list[0].address_info
          }
          if(this.type=='1' || this.type=='-2'){
            this.ispay = false
          }
          
          // getFreightList({
          //   give_address_id: this.list.address_info.give_address_id,
          //   count_weight: this.list.total_weight
          // }).then((rez)=>{
          //   this.freightEstimate = rez.data
          // })
        })
      },
      toPay(){
        this.$router.push({
          name: 'orderPayment',
          params: {
            id: this.orderNo,
            cost: this.list.total_price_us
          },
        })
      },
      toChat(){
        this.$emit('openChat')
      },
      toList(){
        this.$router.push({
          path: `/account/orderList?type=${this.type}`,
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .routeTitle{
    @apply p-2 border-b border-gray-300 bg-gray-200;
  }

  .btn {
    @apply w-28 h-10 font-semibold border-0 text-white rounded bg-orange hover:bg-orange1 cursor-pointer;
  }

  .steps{
    margin-bottom: 5px;
    width: 30px;
    height: 30px;
    padding: 3px 10px;
    border-radius: 100%;
    color: #fff;
  }
</style>