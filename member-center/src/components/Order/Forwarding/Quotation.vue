<template>
  <div>
    <div v-if="list.length == 0" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../../assets/noQuo.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
        <div class="mt-5 text-base text-center font-semibold">Waiting for merchant to process request</div>
      </div>
    </div>

    <div v-else>
      <div class="mt-4" >
        <div class="mb-2 sm:hidden block">Booking number: {{ list.order_no }}</div>
        <div class="bg-white dark:bg-darkMenu shadow-default rounded text-sm mb-28">
          <div class="flex p-3 bg-gray-200">
            <div class="w-1/5 hidden sm:block">Booking number</div>
            <div class="w-1/4 sm:w-1/5">Fee iteam</div>
            <!-- <div class="w-1/6">Remark</div> -->
            <div class="w-1/4 sm:w-1/5">Unit price</div>
            <div class="w-1/4 sm:w-1/5">Units</div>
            <div class="w-1/4 sm:w-1/5">Amount</div>
          </div>
          <div class="flex">
            <div class="w-1/5 p-3 hidden sm:block">{{ list.order_no }}</div>
            <div class="w-full sm:w-4/5 px-2">
              <div class="flex py-3 border-b border-gray-300 dark:border-darkLine">
                <div class="w-1/4 flex items-center">Freight Fee</div>
                <div class="w-1/4 flex items-center">${{ list.freight }}</div>
                <div class="w-1/4 flex items-center">1</div>
                <div class="w-1/4 flex items-center flex-wrap">
                  <div class="mr-3 my-1">${{ list.lastPrice }}</div>
                  <div class="text-gray-500 my-1 line-through">${{ list.freight }}</div>
                </div>
              </div>
              <div class="flex py-3 border-b border-gray-300 dark:border-darkLine">
                <div class="w-1/4 flex items-center">Pickup Fee</div>
                <div class="w-1/4 flex items-center">${{ list.take_fee }}</div>
                <div class="w-1/4 flex items-center">1</div>
                <div class="w-1/4 flex items-center">${{ list.take_fee }}</div>
              </div>
              <div class="flex py-3 border-b border-gray-300 dark:border-darkLine">
                <div class="w-1/4 flex items-center">Product Surcharge</div>
                <div class="w-1/4 flex items-center">${{ list.product_fee }}</div>
                <!-- <div class="w-1/4 flex items-center">1</div> -->
                <div v-if="list.product_fee != '0.00'" class="w-1/4 flex items-center">1</div>
                <div v-if="list.product_fee == '0.00'" class="w-1/4 flex items-center">N/A</div>
                <div class="w-1/4 flex items-center">${{ list.product_fee }}</div>
              </div>
              <div class="flex py-3 border-b border-gray-300 dark:border-darkLine">
                <div class="w-1/4 flex items-center">Delivery Surcharge</div>
                <div class="w-1/4 flex items-center">${{ list.address_fee }}</div>
                <!-- <div class="w-1/4 flex items-center">1</div> -->
                <div v-if="list.address_fee != '0.00'" class="w-1/4 flex items-center">1</div>
                <div v-if="list.address_fee == '0.00'" class="w-1/4 flex items-center">N/A</div>
                <div class="w-1/4 flex items-center">${{ list.address_fee }}</div>
              </div>
              <div class="flex py-3 border-b border-gray-300 dark:border-darkLine">
                <div class="w-1/4 flex items-center">Insurance Expense</div>
                <div class="w-1/4 flex items-center">${{ list.insurance_fee }}</div>
                <!-- <div class="w-1/4 flex items-center">1</div> -->
                <div v-if="list.insurance_fee != 0" class="w-1/4 flex items-center">1</div>
                <div v-if="list.insurance_fee == 0" class="w-1/4 flex items-center">N/A</div>
                <div class="w-1/4 flex items-center">${{ list.insurance_fee }}</div>
              </div>
              <div class="flex py-3 border-b border-gray-300 dark:border-darkLine">
                <div class="w-1/4 flex items-center">Warehouse Charges</div>
                <div class="w-1/4 flex items-center">${{ list.preferential }}</div>
                <!-- <div class="w-1/4 flex items-center">1</div> -->
                <div v-if="list.preferential != 0" class="w-1/4 flex items-center">1</div>
                <div v-if="list.preferential == 0" class="w-1/4 flex items-center">N/A</div>
                <div class="w-1/4 flex items-center">${{ list.preferential }}</div>
              </div>
              <!-- <div v-for="(i,n) in list" :key="n"
                class="flex py-3 border-b border-gray-300 dark:border-darkLine">
                <div class="w-1/4">{{ i.en_name }}</div>
                <div class="w-1/4">{{ i.price }}</div>
                <div class="w-1/4">{{ i.num }}</div>
                <div class="w-1/4">{{ i.sum_price }}</div>
              </div> -->
            </div>
          </div>
          <div class="p-4">
            <div @click="showCoupon = !showCoupon" class="p-4 border-t border-b cursor-pointer flex items-center hover:bg-gray-300">
              <div>Coupon</div>
              <svg t="1691378384071" class="icon ml-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2286" width="22" height="22"><path d="M472.064 751.552 72.832 352.32c-22.08-22.08-22.08-57.792 0-79.872 22.016-22.016 57.792-22.08 79.872 0L512 631.744l359.296-359.296c22.016-22.016 57.792-22.08 79.872 0 22.08 22.08 22.016 57.792 0 79.872l-399.232 399.232C529.856 773.568 494.144 773.568 472.064 751.552z" fill="#7a7a7a" p-id="2287"></path></svg>
            </div>
            <div v-show="showCoupon">
              <div class="mt-5 p-2 grid grid-cols-12 gap-4 bg-white dark:bg-darkMain rounded">
                <div v-for="(item,index) in couponsList" :key="index" @click="selectCoupon(item)"
                  :class="[item.id == couponS.id? 'border-oranges' : 'border-transparent']"
                  class="col-span-12 md:col-span-4 2xl:col-span-3 shadow-default bg-white dark:bg-darkMenu cursor-pointer border hover:border-oranges">
                  <div class="pt-3 px-5 pb-5 text-sm relative">
                    <div class="text-xl font-semibold">${{ item.type_value }} OFF</div>
                    <div>For orders over ${{ item.min_price }}</div>
                    <!-- <div class="flex items-center">
                      <div>Code: {{ item.code }}</div>
                      <img src="../../assets/copy.svg" class="ml-1 w-4 h-4 cursor-pointer" @click="copyCode(item.code)" alt="">
                    </div> -->
                    <div class="border-r border-gray-300 dark:border-gray-900 bg-white dark:bg-darkMain absolute rounded-full"
                      style="left: -9px;bottom: -9px;width: 17px;height: 17px;">
                    </div>
                    <div class="border-l border-gray-300 dark:border-gray-900 bg-white dark:bg-darkMain absolute rounded-full"
                      style="right: -9px;bottom: -9px;width: 17px;height: 17px;">
                    </div>
                  </div>
                  <div class=" pt-2.5 px-5 pb-2 text-xs border-t border-dashed border-gray-300 dark:border-darkLine">
                    <div>{{ item.end_time }}</div>
                    <!-- <div class="flex">
                      <div class="flex-shrink-0 mr-1">Applies to</div>
                      <div v-if="item.product_type.length<6" class="flex flex-wrap">
                        <div class="mr-2" v-for="(i,n) in item.product_type" :key="n">
                          {{applies[i]}}
                        </div>
                      </div>
                      <div v-if="item.product_type.length==6">{{applies[0]}}</div>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="flex justify-center items-center">
                <svg t="1691378510320" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4406" width="22" height="22"><path d="M512 64C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64z m64 704c0 35.2-28.8 64-64 64s-64-28.8-64-64V480c0-35.2 28.8-64 64-64s64 28.8 64 64v288z m-64-416c-44.183 0-80-35.817-80-80s35.817-80 80-80 80 35.817 80 80-35.817 80-80 80z" p-id="4407" fill="#8a8a8a"></path></svg>
                <div>You can only use one coupon per order</div>
              </div>
            </div>
          </div>
          <div class="mt-10 pb-3 text-base">
            <div class="flex justify-end">
              <!-- <div class="w-4/6"></div> -->
              <div class="md:w-4/5 pr-3 text-right">Product Price:</div>
              <div class="md:w-1/5 pr-3">${{ price }}</div>
            </div>
            <div class="flex justify-end">
              <!-- <div class="w-4/6"></div> -->
              <div class="md:w-4/5 pr-3 text-right">Preferential:</div>
              <div class="md:w-1/5 pr-3">-${{ list.super_freight }}</div>
            </div>
            <div v-show="couponS.id" class="flex justify-end">
              <!-- <div class="w-4/6"></div> -->
              <div class="md:w-4/5 pr-3 text-right">Coupon:</div>
              <div class="md:w-1/5 pr-3">-${{couponS.type_value}}</div>
            </div>
          </div>
        </div>

      </div>

      <div class="absolute bottom-0 max-w-1400 w-totalsm sm:w-total py-2 px-3 bg-black rounded-t">
        <div class="flex justify-between items-center">
          <div>
            <div v-if="list.super_level == 'L1'" class="w-96 hidden sm:block">
              <router-link :to="{ name: 'member' }">
                <button class="py-1.5 px-4 rounded-md text-sm text-black font-medium" style="background-color: #feca72;">
                  Free L2 Membership Upgrade
                </button>
              </router-link>
              <div class="mt-1.5 text-white text-xs">Open L2 members can enjoy 15% off freight rates</div>
            </div>
          </div>
          <div class="w-full sm:w-96">
            <div class="flex justify-between text-lg font-semibold">
              <div class="text-white">Total:</div>
              <div class="text-red-500">${{total}}</div>
            </div>
            <div class="hidden sm:block text-white text-xs">This price is the expected quotation price, the actual price is subject to the data after warehousing.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOrderInfo,
  getCoupon
} from '@/api/order'
export default {
  name: 'ForwardQuotation',
  props: {
    id: null,
    tab: '',
    // total: null,
  },
  data() {
    return {
      list: [
        {
          created_data: '2022-12-15 10:19:22',
          en_name: 'insurance premium',
          enquiry_no: '',
          freight_id: '26',
          id: '252',
          name: '保险费',
          num: '20',
          price: '20.00',
          remark: '',
          sum_price: '400.00',
        },
        {
          created_data: '',
          en_name: 'a surcharge',
          enquiry_no: '',
          freight_id: '26',
          id: '251',
          name: '附加费',
          num: '1',
          price: '110.00',
          remark: '',
          sum_price: '110.00',
        },
        {
          created_data: '',
          en_name: 'Delivery fee',
          enquiry_no: '',
          freight_id: '26',
          id: '250',
          name: '派送费',
          num: '2',
          price: '125.00',
          remark: '',
          sum_price: '250.00',
        },
        {
          created_data: '',
          en_name: 'freight',
          enquiry_no: '',
          freight_id: '26',
          id: '249',
          name: '运费',
          num: '1',
          price: '200.00',
          remark: '',
          sum_price: '200.00',
        },
        {
          created_data: '',
          en_name: 'Customs clearance fee',
          enquiry_no: '',
          freight_id: '26',
          id: '248',
          name: 'Customs clearance fee',
          num: '2',
          price: '500.00',
          remark: '',
          sum_price: '1000.00',
        },
        {
          created_data: '',
          en_name: 'Pickup fee',
          enquiry_no: '',
          freight_id: '26',
          id: '247',
          name: '取货费',
          num: '2',
          price: '100.00',
          remark: '',
          sum_price: '200.00',
        },
      ],
      price: null,
      total: null,
      totals: null,
      showCoupon: false,
      couponsList: [],
      couponS: {},
    }
  },
  watch:{
    tab: {
      handler (val, oldVal) {
        if(val==1){
          this.getData()
        }
      }
    }
  },
  mounted(){

  },
  methods:{
    getData(){
      getOrderInfo({
        id: this.id,
        type: 2
      }).then((res)=>{
        // console.log(res)
        this.list = res.data
        this.list.lastPrice = (Number(this.list.freight) - Number(this.list.super_freight)).toFixed(2)
        this.price = (Number(this.list.address_fee)+Number(this.list.insurance_fee)+Number(this.list.preferential)+Number(this.list.product_fee)+Number(this.list.freight)+Number(this.list.take_fee)).toFixed(2)
        this.totals = (Number(this.price) - Number(this.list.super_freight)).toFixed(2)
        this.total = this.totals
        getCoupon({super_freight_coupon:this.list.super_freight_coupon}).then((req)=>{
          this.couponsList = req.data.useCoupon
        })
        // if(res.data.length>0){
        //   this.list = res.data
        //   let a = 0
        //   for(let n = 0;n<this.list.length;n++){
        //     a += Number(this.list[n].sum_price)
        //   }
        //   this.total = a
        // }
      })
    },
    selectCoupon(item){
      this.couponS = item
      this.total = (Number(this.totals) - Number(item.type_value)).toFixed(2)
    }
  }
}
</script>

<style lang="postcss" scoped>
.panel{
  @apply p-6 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default;
}
</style>