<template>
  <div>
    <hover-tips ref="tooltip"
                :target="target"
                :maxWidth="240">
      <div v-if="content">{{ content }}</div>
      <div v-if="indemnity" class="flex justify-end">
        <div class="text-blue-500 cursor-pointer" @click="indemnityOpen">More></div>
      </div>
    </hover-tips>
    <div v-show="shippingList.length==0"
    class="mb-4 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../assets/noShipCost.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
        <div class="mt-5 text-base text-center font-semibold">No results</div>
      </div>
    </div>
    <div v-show="shippingList.length>0" class="mb-4 bg-white hover:shadow-xxx dark:bg-darkMenu shadow-default rounded-md relative"
      v-for="(item, index) in shippingList" :key="index">
      <!-- <div @click="indemnityOpen" class="z-10 md:hidden absolute top-4 right-6 my-1 text-gray-500 flex items-center cursor-pointer">
        <div>Statement of indemnity</div>
        <img src="../../assets/help.svg" class="w-4 h-4 ml-1" alt="">
      </div> -->
      <div class="z-10 md:hidden absolute top-3 right-4 text-gray-500 text-xs flex flex-col items-end">
        <div v-if="item.product_name == '美森限时达'" class="flex items-center cursor-pointer"
          @mouseenter="onShowTip3($event)"
          @mouseleave="onHideTip">
          <div>Delayed payout 0.14USD/kg/natural day</div>
          <img src="../../assets/help.svg" class="w-4 h-4 ml-1" alt="">
        </div>
        <div class="mt-1 flex items-center cursor-pointer"
          @mouseenter="onShowTip2($event)"
          @mouseleave="onHideTip">
          <div>Compensation for Loss</div>
          <img src="../../assets/help.svg" class="w-4 h-4 ml-1" alt="">
        </div>
      </div>
      <div class="hidden py-4 px-6 border-b border-dashed text-gray-500 md:flex items-center justify-between">
        <div class="flex items-center">
          <div>{{ from }}</div>
          <svg t="1677146143206" class="mx-4 icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5192" width="28" height="28"><path d="M724.627 277.241l-45.254 45.255 157.504 157.504L64 480l0 64 772.879 0-157.506 157.506 45.254 45.255 234.761-234.76z" p-id="5193" fill="#7a7a7a"></path></svg>
          <div class="flex">
            <div v-if="toType == 1" class="mr-1">{{ to }} |</div>
            <div>{{ to_zipcode }}</div>
          </div>
        </div>
        <div class="flex flex-wrap justify-end text-13">
          <div class="flex items-center cursor-pointer"
            @mouseenter="onShowTip2($event)"
            @mouseleave="onHideTip">
            <svg t="1683857564205" class="icon mr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3162" width="16" height="16"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m345.344 334.848l-399.36 414.464a44.288 44.288 0 0 1-67.84 5.12 43.264 43.264 0 0 1-3.328-5.12l-220.16-228.096a47.36 47.36 0 0 1 0-65.28 43.264 43.264 0 0 1 62.72 0l192.768 199.936L793.6 269.824a43.264 43.264 0 0 1 62.72 0 47.36 47.36 0 0 1 1.024 65.024z" p-id="3163" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#0581f2"></path></svg>
            <div>Compensation for Loss</div>
          </div>
          <div v-if="item.product_name == '美森限时达'" class="ml-4 flex items-center cursor-pointer"
            @mouseenter="onShowTip3($event)"
            @mouseleave="onHideTip">
            <svg t="1683857564205" class="icon mr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3162" width="16" height="16"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m345.344 334.848l-399.36 414.464a44.288 44.288 0 0 1-67.84 5.12 43.264 43.264 0 0 1-3.328-5.12l-220.16-228.096a47.36 47.36 0 0 1 0-65.28 43.264 43.264 0 0 1 62.72 0l192.768 199.936L793.6 269.824a43.264 43.264 0 0 1 62.72 0 47.36 47.36 0 0 1 1.024 65.024z" p-id="3163" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#0581f2"></path></svg>
            <div>Delayed payout 0.14USD/kg/natural day</div>
          </div>
        </div>
        <!-- <div @click="indemnityOpen" class="flex-shrink-0 w-44 text-gray-500 flex items-center cursor-pointer">
          <div>Statement of indemnity</div>
          <img src="../../assets/help.svg" class="w-4 h-4 ml-1" alt="">
        </div> -->
      </div>
      <div class="p-3 flex relative">
        <div class="flex flex-shrink w-full flex-col md:flex-row">
          <img :src="item.product_img" class="w-24 h-24 m-3 rounded-full" alt="">
          <div class="flex flex-shrink justify-between flex-col md:flex-row mt-3 md:mt-0 w-full px-2 md:px-5">
            <div class="md:w-1/5 my-1 flex flex-row md:flex-col items-center md:items-start">
              <div class="text-gray-400 mb-3 text-13 hidden md:block">Shipping Method</div>
              <div class="mb-0 md:mb-1 font-semibold text-15">{{ item.product_name_e }}</div>
              <div v-show="item.product_label[0] != ''" class="flex ml-3 md:ml-0">
                <div class="py-1 px-2 rounded bg-gray-200">{{ item.product_label[0] }}</div>
              </div>    
            </div>
            <div class="md:w-1/5 my-1 flex flex-row md:flex-col items-center md:items-start">
              <div class="text-gray-400 mb-3 text-13 hidden md:block">Voyage Time</div>
              <div class="mb-0 md:mb-1 font-semibold text-15">{{ item.aging_start }}-{{ item.aging_end }} Business Days</div>
              <div class="ml-3 md:ml-0">(Door to Door)</div>  
            </div>
            <div class="md:w-1/5 my-1 flex flex-row md:flex-col">
              <div class="text-black md:text-gray-400 md:mb-3 text-sm md:text-13">Tax</div>
              <div class="md:mb-1 text-15 ml-3 md:ml-0 font-semibold">{{ included[item.tax] }}</div> 
            </div>
            <div class="md:w-1/5 my-1 flex flex-row md:flex-col items-center md:items-start">
              <div class="text-black md:text-gray-400 md:mb-3 text-sm md:text-13 flex">
                <div>Estimated Costs</div>
                <img src="../../assets/help.svg"
                   class="w-4 h-4 ml-1 cursor-pointer"
                   @mouseenter="onShowTip($event)"
                   @mouseleave="onHideTip"
                   alt="">
              </div>
              <div class="md:mb-1 text-15 ml-3 md:ml-0 text-xl font-semibold">USD {{ item.freight }}</div> 
            </div>
            <div class="md:w-1/5 my-1 flex items-center md:justify-end">
              <button @click="toBooking(item)"
              class="w-44 rounded-md p-2 bg-white hover:bg-gray-200 border border-gray-400">Booking Now</button>
            </div>
          </div>
        </div>
        <!-- <div class="flex-shrink-0 w-56 pl-7 pr-3 border-l border-gray-300 dark:border-darkLine hidden md:block">
          <div class="text-gray-400 mb-1">Estimated Costs</div>
          <div class="text-xl font-semibold ">USD {{ item.freight }}</div>
          <div v-if="item.take_fee != 0" class="mb-2.5">Include Pickup Fee</div>
          <div v-if="item.take_fee == 0" class="mb-2.5">Not Include Pickup Fee</div>
          <div>
            <button @click="toBooking(item)"
              class="w-44 rounded-md p-2 bg-white hover:bg-gray-200 border border-gray-400">Booking Now</button>
          </div>
        </div> -->
        <!-- <div class="absolute top-2.5 right-3.5 block md:hidden">
          <div class="text-gray-400 mb-1 text-right">Estimated Costs</div>
          <div class="text-lg font-semibold text-right">USD {{ item.freight }}</div>
          <div v-if="item.take_fee != 0" class="text-right mb-2.5">Include Pickup Fee</div>
          <div v-if="item.take_fee == 0" class="text-right mb-2.5">Not Include Pickup Fee</div>
          <div>
            <button @click="toBooking(item)" class="w-32 rounded-md p-1.5 bg-white hover:bg-gray-200 border border-gray-400">Booking Now</button>
          </div>
        </div> -->
      </div>
      <div class="py-3.5 px-6 border-t border-dashed text-sm flex flex-wrap justify-between items-center">
        <div class="flex py-0.5">
          <div>Additional Cost</div>
          <img src="../../assets/help.svg"
                   class="w-4 h-4 ml-1 cursor-pointer"
                   @mouseenter="onShowTip1($event)"
                   @mouseleave="onHideTip"
                   alt="">
          <div>: N/A</div>
        </div>
        <div class="py-0.5">Unit Price: USD {{ item.add_unit_price }}/KG</div>
        <div class="flex py-0.5">
          <div class="mr-2">Pickup Fee:</div>
          <div v-if="item.take_fee != 0">USD{{ item.take_fee }}</div>
          <div v-if="item.take_fee == 0">N/A</div>
        </div>
      </div>
      <!-- <div class="p-3 flex justify-center items-center cursor-pointer select-none" @click="item.show = !item.show">
        <div>View details</div>
        <img src="../../assets/down.svg" class="w-5 h-5" alt="">
      </div> -->
      <!-- <div v-show="item.show" class="mt-2.5 mx-2 md:mx-3 border-t border-gray-300 dark:border-darkLine text-13 md:text-sm">
        <div class="mb-3 py-3 border-b border-gray-300 dark:border-darkLine grid grid-cols-12 gap-3 font-semibold">
          <div class="col-span-4 md:col-span-3">Fee Items</div>
          <div class="col-span-4 md:col-span-7">Notes</div>
          <div class="col-span-4 md:col-span-2">Subtotal</div>
        </div>
        <div class="py-2 grid grid-cols-12 gap-3 border-b border-gray-300 dark:border-darkLine">
          <div class="col-span-4 md:col-span-3">Shipping cost</div>
          <div class="col-span-4 md:col-span-7">US$ {{ item.add_unit_price }}/{{ weightUnit[wunit - 1] }}</div>
          <div class="col-span-4 md:col-span-2">US${{ item.cost }}</div>
        </div>
        <div class="py-2 grid grid-cols-12 gap-3 border-b border-gray-300 dark:border-darkLine">
          <div class="col-span-4 md:col-span-3">Pickup Fee</div>
          <div class="col-span-4 md:col-span-7"></div>
          <div v-if="item.take_fee != 0" class="col-span-4 md:col-span-2">US${{ item.take_fee }}</div>
          <div v-if="item.take_fee == 0" class="col-span-4 md:col-span-2">N/A</div>
        </div>
        <div class="py-2 grid grid-cols-12 gap-3 border-b border-gray-300 dark:border-darkLine">
          <div class="col-span-4 md:col-span-3 text-15 md:text-base font-semibold">Total</div>
          <div class="col-span-4 md:col-span-7"></div>
          <div class="col-span-4 md:col-span-2 text-15 md:text-base font-semibold">US$ {{ item.freight }}</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import HoverTips from '@/components/Dashboard/HoverTips'
  export default {
    components: {
      HoverTips,
    },
    name: "ShippingItem",
    props: {
      from: '',
      to: '',
      to_zipcode: '',
      toType: '',
      pickup: false,
      weight: null,
      wunit: null,
      shippingList: {},
      number: null,
      long: null,
      width: null,
      height: null,
      leftMenu: null
    },
    watch: {
      leftMenu: function (val) {
        this.leftMenuOpen = val
      },
    },
    data() {
      return {
        // list: this.shippingList
        included: ['Not Included','Included'],
        weightUnit: ['kg','lb'],
        content: '111111',
        target: '',
        leftMenuOpen: this.leftMenu,
        indemnity: false,
        num: 1,
      }
    },
    methods:{
      toBooking(e){
        this.$emit('booking', e)
        // console.log(e)
        // let a = {
        //   tax: e.tax,
        //   freight: e.freight,
        //   aging_start: e.aging_start,
        //   aging_end: e.aging_end,
        //   unit_price: e.unit_price,
        //   add_price: e.add_price,
        //   opera_price: e.opera_price,
        //   product: e.product_name_e,
        //   shipping_from_ch: this.from.name,
        //   shipping_from: this.from.e_name,
        //   shipping_to_ch: this.to.zh_cn_nickname,
        //   shipping_to: this.to.en_nickname,
        //   shipping_to_iso2: this.to.code_two,
        //   pick_up: this.pickup,
        //   weight: this.weight,
        //   weight_unit: this.wunit,
        //   transport_type: e.transport_type,
        //   freight_good: e.id,
        //   number: this.number,
        //   long: this.long,
        //   width: this.width,
        //   height: this.height,
        //   take_fee: e.take_fee,
        // }
        // localStorage.setItem("orderRouter", JSON.stringify(a))
        // this.$router.push({
        //   name: 'reqOrder',
        // })
      },
      onShowTip(e) {
        this.indemnity = false
        this.target = e.target
        this.$refs.tooltip.show(e.target, this.leftMenuOpen)
        this.content = 'Price covers: Surcharges, Freight, Delivery fee. Freight Calculation method: Gross weight & Volumetric weight (Volume Calculation Formula: Length * Width * Height / 6000).'
      },
      onShowTip1(e) {
        this.indemnity = false
        this.target = e.target
        this.$refs.tooltip.show(e.target, this.leftMenuOpen)
        this.content = 'Additional Cost covers: Overlength Surcharge, Overweight surcharge, Remote Area Surcharge, Product Surcharge, Private Address Surcharge, Oversized Surcharge.'
      },
      onShowTip2(e) {
        this.num = 1
        this.indemnity = true
        this.target = e.target
        this.$refs.tooltip.show(e.target, this.leftMenuOpen)
        this.content = 'Liability for any loss or damage to the goods.'
      },
      onShowTip3(e) {
        this.num = 2
        this.indemnity = true
        this.target = e.target
        this.$refs.tooltip.show(e.target, this.leftMenuOpen)
        this.content = 'Delay compensation is compensation for losses caused by time delays.'
      },
      onHideTip() {
        this.$refs.tooltip.onHide()
      },
      indemnityOpen(){
        this.$refs.tooltip.onHide()
        this.$emit('indemnity',this.num)
      }
    }
  };
</script>

<style lang="postcss" scoped>

</style>