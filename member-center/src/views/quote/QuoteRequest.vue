<template>
  <div class="w-full h-full p-3 sm:p-5">
    <hover-tips ref="tooltip"
                :target="target"
                :maxWidth="240">
      <div v-if="content">{{ content }}</div>
    </hover-tips>
    <div class="h-full overflow-auto">
      <div class="breadcrumb">Get a Quote</div>
      <div class="main1 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="bg-white dark:bg-darkMenu p-6 rounded-md shadow-default">
          <div>
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>
                Item Name</label>
            </div>
            <div class="relative">
              <input class="input" placeholder="Item Name" v-model="form.name"
              v-validate="'required|cargoTitle'" name="cargoTitle"/>
              <div class="inputTips -bottom-3.5">{{errors.first("cargoTitle")}}</div>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap sm:flex-nowrap">
            <div class="w-full mr-0 sm:mr-5">
              <div class="pb-2">
                <label class="text-base flex">
                  <div class="required">*</div>Origin</label>
              </div>
              <div ref="originSelect" class="relative h-42px">
                <div class="select cursor-pointer h-42px"
                    :class="[originShow ? 'selectOpen' : '']"
                    @click.stop="originShow = !originShow">
                  {{ originItem.name }}
                  <img src="../../assets/down.svg"
                      class="absolute right-1 top-3.5 w-5"
                      alt="">
                </div>
                <input hidden type="text" value v-model="form.origin" 
                  v-validate="'required|origin'" name="origin">
                <div class="inputTips -bottom-3.5">{{errors.first("origin")}}</div>
                <select-city
                  :selectList="originList"
                  :selectChecked="originItem"
                  :selectOpen="originShow"
                  @increment="selectOrigin"
                  v-show="originShow"
                ></select-city>
              </div>
            </div>
            <div class="w-full mt-4 sm:mt-0">
              <div class="pb-2">
                <label class="text-base flex">
                  <div class="required">*</div>Destination</label>
              </div>
              <div ref="destinationSelect" class="relative h-42px">
                <div class="select cursor-pointer h-42px"
                    :class="[destinationShow ? 'selectOpen' : '']"
                    @click.stop="destinationShow = !destinationShow">
                  {{ destinationItem.name }}
                  <img src="../../assets/down.svg"
                      class="absolute right-1 top-3.5 w-5"
                      alt="">
                </div>
                <input hidden type="text" value v-model="form.destination" 
                  v-validate="'required|destination'" name="destination">
                <div class="inputTips -bottom-3.5">{{errors.first("destination")}}</div>
                <select-country
                  :selectList="destinationList"
                  :selectChecked="destinationItem"
                  :selectOpen="destinationShow"
                  @increment="selectDestination"
                  v-show="destinationShow"
                ></select-country>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>Shipping Method</label>
            </div>
            <div class="flex flex-wrap relative">
              <label class="flex items-center w-36 mr-12 mb-2.5 cursor-pointer select-none">
                <input type="checkbox" value="1" v-model="form.shippingMethod" v-validate="'required|shippingMethod'" name="shippingMethod">
                <img src="../../assets/seaFreight.svg" class="w-5 h-5 mx-1" alt="">
                <div>Sea Freight</div>
              </label>
              <label class="flex items-center w-36 mr-12 mb-2.5 cursor-pointer select-none">
                <input type="checkbox" value="2" v-model="form.shippingMethod">
                <img src="../../assets/airFreight.svg" class="w-5 h-5 mx-1" alt="">
                <div>Air Freight</div>
              </label>
              <label class="flex items-center w-36 mr-12 mb-2.5 cursor-pointer select-none">
                <input type="checkbox" value="3" v-model="form.shippingMethod">
                <img src="../../assets/trainFreight.svg" class="w-5 h-5 mx-1" alt="">
                <div>Train Freight</div>
              </label>
              <label class="flex items-center w-36 mr-12 mb-2.5 cursor-pointer select-none">
                <input type="checkbox" value="4" v-model="form.shippingMethod">
                <img src="../../assets/truckFreight.svg" class="w-5 h-5 mx-1" alt="">
                <div>Truck Freight</div>
              </label>
              <div class="inputTips -bottom-1">{{errors.first("shippingMethod")}}</div>
            </div>
          </div>
          <div class="mt-4">
            <div class="pb-2 flex items-center">
              <label class="text-base flex">
                <div class="required">*</div>Incoterms with supplier</label>
              <img src="../../assets/quoteTips.svg"
                   class="w-4 h-4 ml-1 cursor-pointer"
                   @mouseenter="onShowTip($event)"
                   @mouseleave="onHideTip"
                   alt="">
              <!-- <div class=" text-red-500" v-show="isIncoterms">Please select one</div> -->
            </div>
            <div class="flex relative">
              <button class="radioBtn" :class="[incotermsSupplier=='FOB' ? 'radioChoose' : '']"
                @click="supplier('FOB')">FOB</button>
              <button class="radioBtn" :class="[incotermsSupplier=='EXW' ? 'radioChoose' : '']"
                @click="supplier('EXW')">EXW</button>
              <button class="radioBtn" :class="[incotermsSupplier=='Other' ? 'radioChoose' : '']"
                @click="supplier('Other')">Other</button>
              <input hidden type="text" value v-model="form.incotermsSupplier" 
                v-validate="'required|incotermsSupplier'" name="incotermsSupplier">
              <div class="inputTips -bottom-3.5">{{errors.first("incotermsSupplier")}}</div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row">
            <div class="w-full mr-0 sm:mr-5 mt-4">
              <div class="pb-2">
                <label class="text-base flex">
                  <div class="required">*</div>
                  When will your cargo be ready for pick up?</label>
              </div>
              <div class="relative">
                <input ref="dateSelect" class="input"
                    value max="2999-12-31"
                    v-validate="'required|pickupDate'"
                    name="pickupDate"
                    type="date" 
                    v-model="form.takeDate"
                    @click="dateSelect"
                    />
                <div class="inputTips -bottom-3.5">{{errors.first("pickupDate")}}</div>
              </div>
            </div>
            <div class="w-full mt-4">
              <div class="pb-2">
                <label class="text-base">Final Destination Target Delivery Date</label>
              </div>
              <div class="flex">
                <input ref="dateSelect1" class="input"
                    value max="2999-12-31"
                    type="date" 
                    v-model="form.deliveryDate"
                    @click="dateSelect1"/>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>Destination Address Type</label>
              <div class=" text-red-500" v-show="isAddressType">Please select one</div>
            </div>
            <div class="flex flex-wrap relative">
              <button class="radioBtn mb-2.5" :class="[addressType=='Amazon' ? 'radioChoose' : '']"
              @click="chooseType('Amazon')">Amazon FBA Warehouse</button>
              <button class="radioBtn mb-2.5" :class="[addressType=='Private' ? 'radioChoose' : '']"
              @click="chooseType('Private')">Residential Address</button>
              <button class="radioBtn mb-2.5" :class="[addressType=='Business' ? 'radioChoose' : '']"
              @click="chooseType('Business')">Business Address</button>
              <input hidden type="text" value v-model="form.addressType" v-validate="'required|addressType'" name="addressType">
              <div class="inputTips -bottom-1">{{errors.first("addressType")}}</div>
            </div>
          </div>
          <div class="mt-4 relative">
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>Destination Address</label>
            </div>
            <input type="text" class="input" v-model="form.address" v-validate="'required|destinationAddress'" name="destinationAddress" value>
            <div class="inputTips -bottom-3.5">{{errors.first("destinationAddress")}}</div>
          </div>
        </div>
        <div class="mt-4 bg-white dark:bg-darkMenu p-6 rounded-md shadow-default relative ">
          <div class="absolute top-6 right-6 cursor-pointer underline text-orange hover:text-orange1"
            @click="switchDetail = true" v-if="!switchDetail">Switch to package details</div>
            <div class="absolute top-6 right-6 cursor-pointer underline text-orange hover:text-orange1"
            @click="switchDetail = false" v-if="switchDetail">Switch to cargo totals</div>
          <div v-show="switchDetail" class="mt-8">
            <div class="mt-3 py-4 px-3 bg-gray-100 relative" v-for="(item,index) in package" :key="index">
              <div class="absolute top-2 right-2 cursor-pointer bg-transparent hover:bg-gray-300"
                @click="deletePackage(index)" v-if="package.length>1">
                <img src="../../assets/delete.svg" class=" w-6 h-6" alt="">
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 sm:col-span-6">
                  <div class="pb-2">
                    <label class="text-base">Package Name</label>
                  </div>
                  <input type="text" class="input" v-model="item.name">
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div class="pb-2">
                    <label class="text-base">Type</label>
                  </div>
                  <!-- <input type="text" class="input"> -->
                  <select name="paymentMethod" class="select" v-model="item.type">
                    <option v-for="(item,index) in package_type" :value="index+1">{{ item }}</option>
                  </select>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div class="pb-2">
                    <label class="text-base">Total</label>
                  </div>
                  <input type="number" class="input" v-model="item.total">
                </div>
              </div>
              <div class="flex flex-col sm:flex-row">
                <div class="h-42px mt-4 flex">
                  <button class="unitType1" :class="[item.isDimensions ? 'unitType' : '']"
                  @click="chooseUnit1(index,true)">Dimensions</button>
                  <button class="unitType2" :class="[item.isDimensions ? '' : 'unitType']"
                  @click="chooseUnit1(index,false)">Volume</button>
                </div>
                <!-- <div class=" h-42px mt-4 ml-0 sm:ml-6 flex">
                  <button class="unitType1" :class="[totalDetail=='metric' ? 'unitType' : '']"
                  @click="chooseUnit('metric')">Metric</button>
                  <button class="unitType2" :class="[totalDetail=='imperial' ? 'unitType' : '']"
                  @click="chooseUnit('imperial')">Imperial</button>
                </div> -->
              </div>
              <div class="mt-4 grid grid-cols-12 gap-4">
                <div class="col-span-6 sm:col-span-3 relative" v-show="item.isDimensions">
                  <div class="pb-2">
                    <label class="text-base">Length</label>
                  </div>
                  <input type="number" class="input pr-11" v-model="item.length">
                  <div class="absolute right-2 sm:right-2 top-10 text-base">({{ volumeUnit }})</div>
                </div>
                <div class="col-span-6 sm:col-span-3 relative" v-show="item.isDimensions">
                  <div class="pb-2">
                    <label class="text-base">Width</label>
                  </div>
                  <input type="number" class="input pr-11" v-model="item.width">
                  <div class="absolute right-2 sm:right-2 top-10 text-base">({{ volumeUnit }})</div>
                </div>
                <div class="col-span-6 sm:col-span-3 relative" v-show="item.isDimensions">
                  <div class="pb-2">
                    <label class="text-base">Height</label>
                  </div>
                  <input type="number" class="input pr-11" v-model="item.height">
                  <div class="absolute right-2 sm:right-2 top-10 text-base">({{ volumeUnit }})</div>
                </div>
                <div class="col-span-6 sm:col-span-3 relative" v-show="!item.isDimensions">
                  <div class="pb-2">
                    <label class="text-base">Volume</label>
                  </div>
                  <input type="number" class="input pr-14" v-model="item.volume">
                  <div class="absolute right-2 sm:right-2 top-10 text-base">({{ volume }})</div>
                </div>
                <div class="col-span-6 sm:col-span-3 relative">
                  <div class="pb-2">
                    <label class="text-base">Weight</label>
                  </div>
                  <input type="number" class="input pr-11" v-model="item.weight">
                  <div class="absolute right-2 top-10 text-base">({{ weight }})</div>
                </div>
              </div>
            </div>
            <div class="mt-2 flex">
              <div class="underline text-orange hover:text-orange1 cursor-pointer"
                @click="addPackage">Add another package</div>
            </div>
          </div>
          <div class="flex flex-wrap items-end">
            <div class="w-full sm:w-1/3 mt-5 pr-0 sm:pr-4 relative">
              <div class="pb-2">
                <label class="text-base flex">
                  <div class="required">*</div>Total Weight</label>
              </div>
              <input ref="totalWeight" v-model="form.weight" type="number" class="input pr-11" v-validate="'required|weight'" name="weight" value>
              <div class="absolute right-2 sm:right-6 top-10 text-base" @click="focusWeight">({{ weight }})</div>
              <div class="inputTips -bottom-3.5">{{errors.first("weight")}}</div>
            </div>
            <div class="w-full sm:w-1/3 mt-5 pr-0 sm:pr-4 relative">
              <div class="pb-2">
                <label class="text-base flex">
                  <div class="required">*</div>Total Volume</label>
              </div>
              <input ref="totalVolume" v-model="form.volume" type="number" class="input pr-14" v-validate="'required|volume'" name="volume" value>
              <div class="absolute right-2 sm:right-6 top-10 text-base" @click="focusVolume">({{ volume }})</div>
              <div class="inputTips -bottom-3.5">{{errors.first("volume")}}</div>
            </div>
            <div class="w-1/2 sm:w-1/3 h-42px mt-5 flex" >
              <button class="unitType1" :class="[totalDetail=='metric' ? 'unitType' : '']"
              @click="chooseUnit('metric')">Metric</button>
              <button class="unitType2" :class="[totalDetail=='imperial' ? 'unitType' : '']"
              @click="chooseUnit('imperial')">Imperial</button>
            </div>
          </div>
        </div>
        <div class="mt-4 bg-white dark:bg-darkMenu p-6 rounded-md shadow-default">
          <div class="pb-2">
            <label class="text-base font-semibold">Optional Services</label>
          </div>
          <div>
            <div class="flex">
              <label class="flex items-center mb-2 cursor-pointer">
                <input type="checkbox">
                <img src="../../assets/seaFreight.svg" class="w-5 h-5 mx-1" alt="">
                <div>
                  <div>Request Cargo packaging via Cargosoon</div>
                </div>
              </label>
            </div>
            <div class="flex">
              <label class="flex items-center mb-2 cursor-pointer">
                <input type="checkbox">
                <img src="../../assets/seaFreight.svg" class="w-5 h-5 mx-1" alt="">
                <div>Need Cargosoon pickup service from supplier</div>
              </label>
            </div>
            <div class="flex">
              <label class="flex items-center mb-2 cursor-pointer">
                <input type="checkbox">
                <img src="../../assets/seaFreight.svg" class="w-5 h-5 mx-1" alt="">
                <div>Request Cargo Insurance via Cargosoon</div>
              </label>
            </div>
          </div>
        </div>
        <div class="mt-4 bg-white dark:bg-darkMenu p-6 rounded-md shadow-default">
          <div class="pb-2">
            <label class="flex items-center flex-wrap">
              <div class="text-base font-semibold">Any Special Requirements</div>
              <!-- <div class="ml-1">- Optional</div> -->
            </label>
          </div>
          <!-- <input type="text" class="input"> -->
          <textarea class="input" rows="5" v-model="form.remark"></textarea>
        </div>
        <div class="btnGroup">
          <!-- <button class="cancelbtn">Cancel</button> -->
          <button class="btn" @click="change" v-show="!showLoading">Submit</button>
          <button class="loading"
                  v-show="showLoading">
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
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectCity from '@/components/SelectCity'
  import SelectCountry from '@/components/SelectCountry'
  import HoverTips from '@/components/Dashboard/HoverTips'
  // import {
  //   reqCountries,
  //   reqChinaCity
  // } from '@/api/address'
  import { quoteRequest } from '@/api/quote'
  export default {
    components: {
      SelectCity,
      SelectCountry,
      HoverTips
    },
    props: ['leftMenu'],
    watch: {
      leftMenu: function (val) {
        this.leftMenuOpen = val
      },
    },
    data() {
      return {
        target: '',
        leftMenuOpen: this.leftMenu,
        content: '123',
        originList: [],
        originItem: {},
        originShow: false,
        destinationList: [],
        // destinationItem: { iso2: 'US', name: 'United States' },
        destinationItem: {},
        destinationShow: false,
        incotermsSupplier: '',
        // isIncoterms: false,
        addressType: '',
        isAddressType: false,
        // detailVolume: 'dimensions',
        totalDetail: 'metric',
        weight: 'kg',
        volume: 'cbm',
        volumeUnit: 'cm',
        form: {
          name: '',
          origin: '',
          destination: '',
          shippingMethod: [],
          incotermsSupplier: '',
          takeDate: '',
          deliveryDate: '',
          addressType: '',
          address: '',
          weight: null,
          volume: null,
          unit_type: '1',
          remark: '',
          packageDetail:[],
        },
        package:[
          {
            isDimensions: true,
            name: '',
            type: 2,
            total: null,
            length: null,
            width: null,
            height: null,
            volume: null,
            weight: null,
          },
        ],
        switchDetail: false,
        showLoading: false,
        package_type: ['bag','carton','box'],
        // package_type: ['Pallet','Bag','Bale','Barrel','Carton','Crate','Roll','Package','Box','Drum','Bundle','Piece','Case','Tote','Pail','Set','Bin','Sack'],
      }
    },
    created() {
      this.countryQuest()
      this.$emit('menu', 'quotePrice')
    },
    mounted() {
      document.addEventListener(
        'click',
        this.even,
        true
      )
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
    },
    methods:{
      even(e){
        if (!this.$refs.originSelect.contains(e.target)) {
          this.originShow = false
        }
        if (!this.$refs.destinationSelect.contains(e.target)) {
          this.destinationShow = false
        }
      },
      countryQuest(){
        this.destinationList = JSON.parse(localStorage.getItem("Countries"))
        let city = JSON.parse(localStorage.getItem("ChinaCity"))
        this.originList = city
        // this.originItem = city[0]
        // this.form.origin = city[0].name

        // reqCountries().then((res) => {
        //   this.destinationList = res.data
        // })
        // reqChinaCity().then((res) => {
        //   this.originList = res.data
        //   this.originItem = res.data[0]
        //   this.form.origin = res.data[0].name
        // })
      },
      selectOrigin(data, show) {
        this.originItem = data
        this.originShow = show
        this.form.origin = data.name
      },
      selectDestination(data, show) {
        this.destinationItem = data
        this.destinationShow = show
        this.form.destination = data.name
      },
      supplier(data){
        this.incotermsSupplier = data
        // this.isIncoterms = false
        if(data == 'FOB'){
          this.form.incotermsSupplier = '1'
        }else if(data == 'EXW'){
          this.form.incotermsSupplier = '2'
        }else{
          this.form.incotermsSupplier = '3'
        }
      },
      chooseType(data){
        this.addressType = data
        this.isAddressType = false
        if(data == 'Amazon'){
          this.form.addressType = '1'
        }else if(data == 'Private'){
          this.form.addressType = '2'
        }else{
          this.form.addressType = '3'
        }
      },
      chooseUnit(data){
        // let old = this.totalDetail
        this.totalDetail = data
        if(data == 'metric'){
          this.weight = 'kg'
          this.volume = 'cbm'
          this.volumeUnit = 'cm'
          this.form.unit_type = '1'
          // if(old != 'metric'){
          //   this.form.weight = (this.form.weight / 2.20462)
          //   this.form.volume = (this.form.volume / 35.3147)
          // }
        }else{
          this.weight = 'lb'
          this.volume = 'cbf'
          this.volumeUnit = 'in'
          this.form.unit_type = '2'
          // if(old == 'metric'){
          //   this.form.weight = (this.form.weight * 2.20462)
          //   this.form.volume = (this.form.volume * 35.3147)
          // }
        }
      },
      chooseUnit1(i,data){
        this.package[i].isDimensions = data
      },
      focusWeight(){
        this.$refs.totalWeight.focus()
      },
      focusVolume(){
        this.$refs.totalVolume.focus()
      },
      dateSelect(){
        this.$refs.dateSelect.showPicker()
      },
      dateSelect1(){
        this.$refs.dateSelect1.showPicker()
      },
      async change(){
        const success = await this.$validator.validateAll()
        let packageD = []
        if(this.switchDetail){
          for(let n=0;n<this.package.length;n++){
            let packageD1 = {
              product_name: this.package[n].name,
              pack_type: this.package[n].type,
              length: this.package[n].length,
              width: this.package[n].width,
              height: this.package[n].height,
              volume: this.package[n].volume,
              num: this.package[n].total,
              weight: this.package[n].weight,
            }
            if(this.package[n].isDimensions){
              packageD1.product_type = '1'
            }else{
              packageD1.product_type = '2'
            }
            packageD.push(packageD1)
          }
        }
        if(success){
          this.showLoading = true
          let a = {
            offer: this.form.name,
            start: this.form.origin,
            end: this.form.destination,
            transport_type: this.form.shippingMethod.join(','),
            trade_type: this.form.incotermsSupplier,
            address_type: this.form.addressType,
            take_good_time: this.form.takeDate,
            delivery_date: this.form.deliveryDate,
            address_info: this.form.address,
            all_weight: this.form.weight,
            all_volume: this.form.volume,
            unit_type: this.form.unit_type,
            remark: this.form.remark,
            product_info: JSON.stringify(packageD)
          }
          // console.log(a)
          quoteRequest(a).then((res) => {
            // console.log(res)
            if(res.code == 0){
              setTimeout(()=>{
                this.showLoading = false
                this.$router.push("dashboard")
              },800)
            }else{
              this.showLoading = false
            }
          })
        }
      },
      addPackage(){
        let a = {
            isDimensions: true,
            name: '',
            type: 2,
            total: null,
            length: null,
            width: null,
            height: null,
            volume: null,
            weight: null,
        }
        this.package.push(a)
      },
      deletePackage(i){
        this.package.splice(i,1)
      },
      onShowTip(e) {
        this.content = 'Incoterms are the terms of sale between a buyer and seller that define who arranges for the payment and handling of the goods during shipping. Reach out to your trade partner if you are unsure which Incoterm applies to this shipment'
        this.target = e.target
        this.$refs.tooltip.show(e.target, this.leftMenuOpen)
      },
      onHideTip() {
        this.$refs.tooltip.onHide()
      },
    }
  }
  </script>

<style lang="postcss" scoped>
.radioBtn{
  @apply w-52 py-1.5 px-2 mr-6 font-semibold rounded-sm border border-inputBorder hover:bg-gray-200;
}

.radioChoose{
  @apply border-orange text-orange;
}

.unitType1{
  @apply px-5 py-2.5 rounded-l border border-inputBorder hover:bg-gray-200;
}

.unitType2{
  @apply -ml-1px px-5 py-2.5 rounded-r border border-inputBorder hover:bg-gray-200;
}

.unitType{
  @apply border-orange text-orange z-10;

}

.btn {
  @apply w-28 font-semibold border-0 text-white rounded bg-orange hover:bg-orange1 px-6 py-2.5 cursor-pointer;
}

.cancelbtn {
  @apply w-28 font-semibold mr-5 border border-solid border-gray-400 bg-white hover:bg-gray-400 rounded px-6 py-2.5 cursor-pointer;
}

.btnGroup {
  @apply flex justify-end mt-10 w-full;
}

.loading {
  @apply w-28 px-6 py-2.5 bg-orange justify-center rounded-md;
}

.inputTips {
  @apply left-0 text-xs text-red-500 absolute;
}

.selectOpen{
  @apply bg-selectOpen !important;
}
</style>
