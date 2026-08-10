<template>
  <div class="">
    <div v-if="list[0] == ''" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../../assets/noExpense.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
        <div class="mt-5 text-base text-center font-semibold">No cost breakdown</div>
      </div>
    </div>

    <div v-else>
      <div class="mt-4">
        <div class="mb-1 sm:hidden block">Booking number: {{ order_no }}</div>
        <div class="mb-2 sm:hidden block">Invoice number: {{ invoiceData.invoice_no }}</div>
        <div class="bg-white dark:bg-darkMenu shadow-default rounded text-sm mb-28">
          <div class="flex p-3 bg-gray-200">
            <div class="w-1/5 hidden sm:block">Booking number</div>
            <div class="w-1/4 sm:w-1/5">Expense name</div>
            <!-- <div class="w-1/6">Remark</div> -->
            <div class="w-1/4 sm:w-1/5">Unit price</div>
            <div class="w-1/4 sm:w-1/5">Units</div>
            <div class="w-1/4 sm:w-1/5">Amount</div>
          </div>
          <div class="flex">
            <div class="w-1/5 p-3 hidden sm:block">
              <div>{{ order_no }}</div>
              <!-- <div class="my-3 p-3 bg-gray-200 rounded-md">
                <div>
                  <div>预计发货时间</div>
                  <div>2022-11-30</div>
                </div>
                <div class="mt-3">
                  <div>预计妥投时间</div>
                  <div>2022-11-30</div>
                </div>
              </div> -->
              <div class="mt-3">
                <div>Invoice number</div>
                <div>{{ invoiceData.invoice_no }}</div>
              </div>
            </div>
            <div class="w-full sm:w-4/5 px-2">
              <div v-for="(i,n) in list" :key="n" v-if="i.sum_price != 0 && i.sum_price !='0.00'"
                class="flex py-3 border-b border-gray-300 dark:border-darkLine">
                <div class="w-1/4 flex items-center">{{ i.name_e }}</div>
                <div class="w-1/4 flex items-center">
                  <div v-if="i.name_e != 'Value-Added Service Charge'">${{ i.price }}</div>
                  <div v-if="i.name_e == 'Value-Added Service Charge'">${{ discount.Preferentials }}</div>
                </div>
                <div class="w-1/4 flex items-center">{{ i.num }}</div>
                <div class="w-1/4 flex items-center flex-wrap">
                  <div v-if="i.name_e == 'Shipping Fee'" class="mr-3 my-1">${{ discount.super_freights }}</div>
                  <div v-if="i.name_e == 'Value-Added Service Charge'" class="mr-3 my-1">${{ i.sum_price }}</div>
                  <div v-if="i.name_e != 'Shipping Fee' && i.name_e != 'Value-Added Service Charge'">${{ i.sum_price }}</div>

                  <div v-if="i.name_e == 'Shipping Fee'"
                    class="my-1 text-gray-500 line-through">${{ i.sum_price }}</div>
                  <div v-if="i.name_e == 'Value-Added Service Charge'"
                    class="my-1 text-gray-500 line-through">${{ discount.Preferentials }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="payStatus==1" class="p-4">
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
              <div class="md:w-4/5 pr-3 text-right">Preferential:</div>
              <div class="md:w-1/5 pr-3">-${{ discount.super_freight }}</div>
            </div>
            <div v-show="couponS.id" class="flex justify-end">
              <div class="md:w-4/5 pr-3 text-right">Coupon:</div>
              <div class="md:w-1/5 pr-3">-${{ couponS.type_value }}</div>
            </div>
            <div class="flex justify-end">
              <div class="md:w-4/5 pr-3 text-right">Storage Expense:</div>
              <div class="md:w-1/5 pr-3">-${{ discount.Preferential }}</div>
            </div>
            <div class="flex justify-end text-xs text-gray-400">
              <div class="md:w-4/5 pr-3 text-right">Free Storage Date:</div>
              <div class="md:w-1/5 pr-3">{{ discount.free_storage_date }}</div>
            </div>
          </div>
          <div class="p-7 flex justify-end">
            <button class="btn" @click="download">Download Invoice</button>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 max-w-1400 w-totalsm sm:w-total py-2 px-3 bg-black rounded-t">
        <div class="flex justify-between items-center">
          <div>
            <div v-if=" discount.super_level == 'L1'" class="w-96 hidden sm:block">
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
              <div class="text-white">Amount payable:</div>
              <div class="text-red-500">${{total}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute w-900 bg-white p-5" style="top: -999999px;left: -999999px;">
      <div class="invoiceDownload">
        <!-- <div style="margin: 40px 0 0;">
          <img src="../../../assets/logo.png" style="width: 360px;" alt="">
        </div> -->
        
        <div class="info">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img src="../../../assets/cargosoonLogo1.png" class="h-10">
              <img src="../../../assets/cargosoonLogo2.png" class="ml-2 h-8" alt="" /> 
            </div>
            <div style="font-size: 50px;">INVOICE</div>
          </div>
          <div class="mb-5 flex flex-col items-center">
            <div class="text-3xl font-semibold">Cooperate Logistics Co.,Ltd</div>
            <div class="flex mt-4">
              <div>Songbai Road, Shiyan, Baoan, Shenzhen</div>
              <div class="ml-12">0755-28225927</div>
            </div>
            <div class="mt-2">Whatsapp 0086+18026909023</div>
          </div>

          <div>
            <div style="width: 50%;font-weight: 600;">BILL TO</div>
          </div>
          <div style="font-size: 14px;display: grid;grid-template-columns: repeat(2, minmax(0, 1fr));gap: 1rem;">
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">Company Name:</div>
              <div>{{ invoiceData.to_company }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">Weight:</div>
              <div>{{ invoiceData.weight }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">Bill of Lading No:</div>
              <div>{{ invoiceData.bl_no }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">Volume:</div>
              <div>{{ invoiceData.volume }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">POL:</div>
              <div>{{ invoiceData.pol }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">Packages:</div>
              <div>{{ invoiceData.num }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">POD:</div>
              <div>{{ invoiceData.pod }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">Chargeable weight/volume:</div>
              <div>{{ invoiceData.count_weight }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">ETD:</div>
              <div>{{ invoiceData.etd }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">Invoice number:</div>
              <div>{{ invoiceData.invoice_on }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">ETA:</div>
              <div>{{ invoiceData.eta }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">Email:</div>
              <div>{{ invoiceData.to_email }}</div>
            </div>
            <div class="col-span-1 flex">
              <div class="font-semibold mr-2">Container No:</div>
              <div>{{ invoiceData.cntr_no }}</div>
            </div>
          </div>
          <!-- <div style="font-weight: 600;">
            <div style="width: 50%;">{{ invoiceData.to_name }}</div>
            <div style="width: 50%;">{{ invoiceData.from_name }}</div>
          </div>
          <div>
            <div style="width: 50%;">{{ invoiceData.to_user }}</div>
            <div style="width: 50%;">{{ invoiceData.from_user }}</div>
          </div>
          <div>
            <div style="width: 50%;">{{ invoiceData.to_address }}</div>
            <div style="width: 50%;">{{ invoiceData.from_address }}</div>
          </div>
          <div>
            <div style="width: 50%;">{{ invoiceData.to_country }}</div>
            <div style="width: 50%;">{{ invoiceData.from_country }}</div>
          </div>
          <div>
            <div style="width: 50%;">{{ invoiceData.to_area }}</div>
            <div style="width: 50%;">{{ invoiceData.from_area }}</div>
          </div>
          <div>
            <div style="width: 50%;">{{ invoiceData.to_city }}</div>
            <div style="width: 50%;">{{ invoiceData.from_city }}</div>
          </div>
          <div>
            <div style="width: 50%;">{{ invoiceData.to_email }}</div>
            <div style="width: 50%;">{{ invoiceData.from_email }}</div>
          </div>
          <div style="padding-top: 30px;">
            <div style="width: 50%;display: flex;">
              <div>Invoice number:</div>
              <div>{{ invoiceData.invoice_no }}</div>
            </div>
            <div style="width: 50%;display: flex;">
              <div>Order number:</div>
              <div>{{ invoiceData.order_no }}</div>
            </div>
          </div>
          <div>
            <div style="width: 50%;display: flex;">
              <div>Invoice date:</div>
              <div>{{ invoiceData.invoice_time }}</div>
            </div>
            <div style="width: 50%;display: flex;">
              <div>Overdue date:</div>
              <div>{{ invoiceData.overdue_time }}</div>
            </div>
          </div> -->
          <div class="mt-6">
            <div class="text-sm w-full border border-gray-300">
              <div class="font-semibold grid grid-cols-4 bg-gray-100 border-b border-gray-300">
                <div class="col-span-1 p-3 border-r border-gray-300">Name of fee</div>
                <div class="col-span-1 p-3 border-r border-gray-300">Price(USD)</div>
                <div class="col-span-1 p-3 border-r border-gray-300">Quantity</div>
                <div class="col-span-1 p-3">Total Price(USD)</div>
              </div>
              <div v-for="(is,ns) in list" :key="ns" v-if="is.sum_price != 0 && is.sum_price !='0.00'"
                class="grid grid-cols-4 border-b border-gray-300">
                <div class="col-span-1 p-3 border-r border-gray-300">{{ is.name_e }}</div>
                <div class="col-span-1 p-3 border-r border-gray-300">
                  <div v-if="is.name_e != 'Value-Added Service Charge'">${{ is.price }}</div>
                  <div v-if="is.name_e == 'Value-Added Service Charge'">${{ discount.Preferentials }}</div>
                </div>
                <div class="col-span-1 p-3 border-r border-gray-300">{{ is.num }}</div>
                <div class="col-span-1 p-3 flex items-center flex-wrap">
                  <div v-if="is.name_e == 'Shipping Fee'" class="mr-3 my-1">${{ discount.super_freights }}</div>
                  <div v-if="is.name_e == 'Value-Added Service Charge'" class="mr-3 my-1">${{ is.sum_price }}</div>
                  <div v-if="is.name_e != 'Shipping Fee' && is.name_e != 'Value-Added Service Charge'">${{ is.sum_price }}</div>

                  <!-- <div v-if="is.name_e == 'Shipping Fee'"
                    class="my-1 text-gray-500 underline">${{ is.sum_price }}</div>
                  <div v-if="is.name_e == 'Value-Added Service Charge'"
                    class="my-1 text-gray-500 line-through">${{ discount.Preferentials }}</div> -->
                </div>
              </div>
              <div class="grid grid-cols-4">
                <div class="col-span-3 p-3 border-r border-gray-300">Total</div>
                <div class="col-span-1 p-3">${{ totals }}</div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex">
            <div class="font-semibold mr-2">Remarks:</div>
            <div>{{ invoiceData.remark }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOrderInfo,
  getCoupon,
  getStatus,
} from '@/api/order'
import htmlpdf from '@/utils/htmlpdf'
export default {
  name: 'ForwardExpense',
  props: {
    id: null,
    tab: ''
  },
  data() {
    return {
      list: [''],
      order_no: '',
      total: null,
      totals: null,
      invoiceData: {},
      discount: [],
      price: null,
      preference: null,
      Storage: null,
      showCoupon: false,
      couponsList: [],
      couponS: {},
      payStatus: 2,
    }
  },
  watch:{
    tab: {
      handler (val, oldVal) {
        if(val==5){
          this.getData()
        }
      }
    }
  },
  mounted(){
    
  },
  methods: {
    getData(){
      getOrderInfo({
        id: this.id,
        type: 6
      }).then((res)=>{
        // console.log(res)
        if(res.data.expenseData){
          this.list = res.data.expenseData
          let sf = ''
          let vs = ''
          for(let i=0; i<this.list.length; i++){
            if(this.list[i].name_e == 'Shipping Fee'){
              sf = this.list[i].sum_price
            }
            if(this.list[i].name_e == 'Value-Added Service Charge'){
              vs = this.list[i].sum_price
            }
          }
          this.Storage = vs
          this.discount = res.data.discount
          this.discount.super_freights = (Number(sf) - Number(this.discount.super_freight)).toFixed(2)
          this.discount.Preferentials = (Number(vs) + Number(this.discount.Preferential)).toFixed(2)
          this.preference = (Number(this.discount.super_freight) + Number(this.discount.Preferential)).toFixed(2)
          let a = 0
          for(let n = 0;n<this.list.length;n++){
            // if(this.list[n].name_e != 'Value-Added Service Charge'){
              a += Number(this.list[n].sum_price)
            // }
          }
          this.price = (Number(a)+Number(this.discount.Preferential)).toFixed(2)
          this.totals = (Number(this.price) - Number(this.preference)).toFixed(2)
          this.total = this.totals

          this.invoiceData = res.data.invoiceData
          this.order_no = this.invoiceData.order_no
          getStatus({ id: this.id }).then((rez)=>{
            this.payStatus = rez.data.payment_status
          })
          getCoupon({super_freight_coupon:this.totals}).then((req)=>{
            this.couponsList = req.data.useCoupon
          })
        }
      })
    },
    download(){
      htmlpdf.downloadPDF(".invoiceDownload","printHide", "invoice")
    },
    selectCoupon(item){
      this.couponS = item
      this.total = (Number(this.totals) - Number(item.type_value)).toFixed(2)
    }
  }
}
</script>

<style lang="postcss" scoped>
.btn{
  @apply py-2 px-6 bg-black hover:bg-gray-500 text-white rounded;
}

.info{
  padding: 30px;
  font-size: 16px;
  color: #222;
}

.info>div{
  display: flex;
  padding: 5px 0;
}
</style>