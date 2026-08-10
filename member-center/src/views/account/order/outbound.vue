<template>
  <div class="w-full h-full p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="addressModal" class="modal p-5 w-700 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine pb-3">
        <div class="text-xl">Select Shipping Address</div>
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="mt-2">
        <div v-for="(i,n) in addList" :key="n" class="rounded border flex flex-col sm:flex-row mb-2"
          :class="i.id == chooseAddress.id ? 'bg-blue-50 border-blue-200' : ''">
          <div @click="chooseAdd(i)" class="p-2 w-full text-sm cursor-pointer hover:bg-gray-200">
            <div class="flex">
              <div class="w-28 font-semibold flex-shrink-0">Company Name</div>
              <div>{{i.address_name}}</div>
            </div>
            <div class="flex">
              <div class="w-28 font-semibold flex-shrink-0">Recipient Name</div>
              <div class="flex flex-wrap">
                <div class="mr-6">{{i.full_name}}</div>
                <div>tel: {{i.tel}}</div>
              </div>
            </div>
            <div class="flex">
              <div class="w-28 font-semibold flex-shrink-0">Address</div>
              <div><span v-if="i.address_two != ''">{{i.address_two}}, </span>{{i.address_one}}, 
                <span v-if="i.area != ''">{{i.area}}, </span>{{i.city}}, <span v-if="i.zipcode != ''">{{i.zipcode}}, </span>{{i.country_name}}</div>
            </div>
          </div>
          <div class="py-2 flex-shrink-0 sm:w-24 border-t sm:border-l sm:border-t-0 flex sm:flex-col justify-center items-center">
            <button class="mr-3 sm:mb-3 sm:mr-0 rounded bg-gray-300 hover:bg-gray-400 py-1 px-2" 
              @click="changeAddress(i)">Editing</button>
            <button class="hover:text-orange" @click="removeAddress(i.id)">Remove</button>
          </div>
        </div>
        <div class="rounded bg-gray-200 hover:bg-gray-300 p-4 flex justify-center items-center cursor-pointer" 
          @click="addaAddress">
          <svg t="1677400710440" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2779" width="25" height="25"><path d="M874.666667 469.333333H554.666667V149.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v320H149.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667h320v320c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666V554.666667h320c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667z" fill="#7a7a7a" p-id="2780"></path></svg>
          <div>Add</div>
        </div>
      </div>
    </div>
    <div ref="addAddressModal" class="modal p-5 w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3">
        <div class="text-xl">{{ addressTitle }} Shipping Address</div>
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-1">
          <div class="flex">Company Name</div>
          <div class="relative">
            <input type="text" class="input" v-model="shippingAddress.address_name">
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>
            Recipient Name</div>
          <div class="relative">
            <input type="text" class="input" v-model="shippingAddress.full_name"
              v-validate="'required|fullName'" name="fullName">
            <div class="inputTips">{{errors.first("fullName")}}</div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>
            Destination Type</div>
          <div class="relative">
            <select name="DestinationType" v-model="shippingAddress.address_type" class="select">
              <option class="hidden" value="null">Select Destination Type</option>
              <option value="1">FBA address</option>
              <option value="0">Non - FBA address</option>
            </select>
            <input type="text" class="input hidden" v-model="shippingAddress.address_type"
              v-validate="'required|destinationType'" name="destinationType">
            <div class="inputTips">{{errors.first("destinationType")}}</div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            FBA Code</div>
          <div class="relative">
            <input ref="fbaSelect" type="text" class="input" v-model="shippingAddress.fba_code"
              @focus="getFBA"
              @input="getFBA">
            <div v-show="fbaShow" class="searchFBA overflow-auto w-full max-h-52 absolute left-0 top-11 bg-white z-40 shadow-xxx">
              <div @click="chooseFBA(i)" v-for="(i,n) in fbaList" :key="i.fba_code+n" class="p-1.5 hover:bg-gray-100 cursor-pointer">
                {{i.fba_code}}
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <div class="flex">
            <div class="required">*</div>Country</div>
          <div ref="countrySelect" class="relative">
            <div class="select cursor-pointer h-42px overflow-hidden"
              :class="[countryShow ? 'selectOpen' : '']"
              @click.stop="countryShow = !countryShow">
              {{ countryItem.en_nickname }}
              <img src="../../../assets/down.svg"
                class="absolute right-1 top-3.5 w-5"
                alt="">
            </div>
            <select-country :selectList="countryList"
              :selectChecked="countryItem"
              :selectOpen="countryShow"
              @increment="selectCountry"
              v-show="countryShow"></select-country>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>State or Province</div>
          <div ref="stateSelect" class="relative h-42px">
            <div class="select cursor-pointer h-42px overflow-hidden"
                  :class="[stateShow ? 'selectOpen' : '']"
                  @click.stop="stateShow = !stateShow">
              {{ stateItem.name }}
              <img src="../../../assets/down.svg"
                    class="absolute right-1 top-3.5 w-5"
                    alt="">
            </div>
            <select-city :selectList="stateList"
              :selectChecked="stateItem"
              :selectOpen="stateShow"
              @increment="selectStates"
              v-show="stateShow"></select-city>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>City</div>
          <div class="relative">
            <input ref="citySelect" type="text" class="input" v-model="shippingcity"
              @input="endCity" @focus="endCity" @blur="endCity1"
              v-validate="'required|city'" name="city">
            <div class="inputTips">{{errors.first("city")}}</div>
            <div v-show="cityShow" class="searchPort">
              <div v-for="(f,nf) in citySelectList" :key="nf" @click="selectEnd(f)"
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                {{ f.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <div class="flex">
            <div class="required">*</div>Address Line1</div>
          <div class="relative">
            <input type="text" class="input" v-model="shippingAddress.address_one"
              v-validate="'required|line1'" name="line1">
            <div class="inputTips">{{errors.first("line1")}}</div> 
          </div>
        </div>
        <div class="col-span-2">
          <div>Address Line2</div>
          <div>
            <input type="text" class="input" v-model="shippingAddress.address_two">
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>Postal Code</div>
          <div class="relative">
            <input type="text" class="input" v-validate="'required|postalCode'"
            name="postalCode" v-model="shippingAddress.zipcode">
            <div class="inputTips">{{errors.first("postalCode")}}</div> 
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>Phone Number</div>
          <div class="relative flex">
            <vue-country-intl
              schema="input"
              v-model="shippingAddress.code_no"
              :showLabelImg="false"
              :onlyValue="true"
              placeholder="select"
            >
              <button
                type="button"
                class="code-box flex items-center"
                slot="reference"
              >
                <span class="inline-block flex-1">
                  <span v-if="shippingAddress.code_no!=''">+{{shippingAddress.code_no}}</span>
                  <span
                    v-else
                    class="text-gray-500"
                  >Select</span>
                </span>
                <Icon name="arrow-down" />
              </button>
            </vue-country-intl>
            <input type="text" class="input" v-model="shippingAddress.tel"
              v-validate="'required|phone'" name="phone">
            <div class="inputTips top-11">{{errors.first("phone")}}</div> 
          </div>
        </div>
        <div class="col-span-2 flex items-center text-sm">
          <div>Default Address</div>
          <input @change="checkDefault()" type="checkbox" v-model="defaultAddress" class="ml-1.5 addressCheckbox">
        </div>
      </div>
      <div class="mt-7 flex justify-end">
        <button class="cancelbtn" @click="closeModal">Cancel</button>
        <button class="btn" @click="addressSave" v-show="!btnLoading">Save</button>
        <button class="btn" v-show="btnLoading">
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

    <div v-show="preLoad" class="absolute bottom-0 z-10" style="width: calc(100% - 40px);">
      <div class="bg-white p-4 w-full shadow-default border rounded-t flex items-center justify-end text-sm">
        <button @click="confirmOrder" v-show="!showLoading" class="btn">Submit</button>
        <button class="btn" v-show="showLoading">
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

    <div class="h-full overflow-y-auto pb-32 p-0.5">
      <div @click="toList" class="flex items-center p-4 bg-white rounded-md shadow-default cursor-pointer">
        <img src="@/assets/arrowLeft.svg" class="w-7 mr-2" alt="">
        <div>Package Information</div>
      </div>
      <div class="mt-4 p-4 bg-white rounded-md shadow-default">
        <div class="mb-3">Order Details</div>
        <div v-for="(i,n) in list" :key="n" class="mb-3 border-t border-r border-b">
          <div class="p-2 text-sm border-l border-b" style="background-color: #F5FDFD;">
            <div class="flex justify-between">
              <div>Order No: {{i.order_number}}</div>
              <div>Time of Receipt: {{i.warehouse_arrival_time}}</div>
            </div>
          </div>
          <div class="flex bg-white text-13 flex-wrap">
            <div class="w-full sm:flex-1 flex flex-col justify-center border-l border-b">
              <div v-for="(ix,nx) in i.order_info" :key="nx" class="w-full p-3 flex"
                :class="[nx==0 ? '' : 'border-t']">
                <img :src="ix.sku_image" class="flex-shrink-0 w-16 h-16 mr-3" alt="">
                <div class="sm:w-470">
                  <div class="flex justify-between">
                    <div class=" pr-2 productTitle flex-1">{{ix.subject}}</div> 
                    <div class=" w-16">${{ix.price_us}}</div>
                  </div>
                  <div class="mt-3 flex justify-between text-xs text-gray-400">
                    <div class="pr-2 productTitle flex-1">{{ix.sku_name}}</div> 
                    <div class=" w-16">qty: {{ix.num}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
              <div>Total Items</div>
              <div>{{i.purchases[0].warehouse_data.num_total}} Pieces</div>
            </div>
            <div class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
              <div>Total Weight</div>
              <div>{{i.purchases[0].warehouse_data.weight_total}} KG</div>
            </div>
            <div class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
              <div>Total Volume</div>
              <div>{{i.purchases[0].warehouse_data.cube_total}} CBM</div>
            </div>
            <div class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
              <div>Days in stock</div>
              <div>{{i.purchases[0].warehouse_data.days_since_warehousing}} days</div>
            </div>
            <div class="flex flex-shrink-0 p-5 w-40 justify-center items-center border-l border-b font-semibold" style="color: #feac53;">US${{i.total_price_us}}</div>
          </div>
        </div>
      </div>
      <div class="mt-4 p-4 bg-white rounded-md shadow-default">
        <div class="mb-3">Parcel Status</div>
        <div class="mt-3 grid grid-cols-6 text-13 border-t border-l">
          <div class="ordername">Total Weight</div>
          <div class="ordertext">{{purchaseData.weight_total}} KG</div>
          <div class="ordername">Total Volume</div>
          <div class="ordertext">{{purchaseData.cube_total}} CBM</div>
          <div class="ordername">Total Items</div>
          <div class="ordertext">{{purchaseData.num_total}}</div>
        </div>
      </div>
      <div v-if="type == 1" class="mt-4 p-4 rounded-md shadow-default bg-white">
        <div class="flex items-center">
          <div>Shipping to:</div>
          <button v-show="addList.length==0" @click="selectAddress" class="ml-5 py-1 px-4 rounded-md bg-orange hover:bg-orange1 text-white">Add address</button>
        </div>
        <div v-if="addList.length>0" class="mt-3 flex flex-wrap text-sm">
          <div class="mb-3 mr-4">{{chooseAddress.full_name}}, Tel:{{chooseAddress.tel}}, {{chooseAddress.address_one}}, {{chooseAddress.city}}, {{chooseAddress.area}}, {{chooseAddress.country_name}}</div>
          <div @click="selectAddress" class="flex-shrink-0 text-blue-400 cursor-pointer hover:underline">Change address(Input recipient name)</div>
        </div>
      </div>
      <div v-if="type == 1" class="mt-4 p-4 bg-white rounded-md shadow-default">
        <div class="mb-3">Select Logistics</div>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(i,n) in freightEstimate" @click="selectLogistics(i)" class="col-span-1 p-3 border rounded relative cursor-pointer hover:bg-gray-100">
            <svg v-show="logisticsId == i.id" t="1765530335855" class="icon absolute -top-2 -right-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5526" width="32" height="32"><path d="M510.545 28.22c-267.043 0-483.521 216.477-483.521 483.52s216.479 483.521 483.521 483.521 483.52-216.479 483.52-483.521S777.588 28.22 510.545 28.22zM776.855 407.855l-315.37 315.37c-9.763 9.763-22.559 14.645-35.355 14.645-12.796 0-25.592-4.882-35.355-14.645l-176.13-176.13c-19.526-19.525-19.526-51.184 0-70.71 19.526-19.526 51.184-19.527 70.711 0L426.13 617.159l280.015-280.015c19.527-19.526 51.184-19.526 70.711 0C796.382 356.671 796.382 388.329 776.855 407.855z" fill="#F20000" p-id="5527"></path></svg>
            <div class="flex items-center">
              <img :src="i.product_img" class="w-12 h-12 rounded-full mr-3" alt="">
              <div>{{i.product_name_e}}</div>
            </div>
            <div class="py-1.5">{{i.aging_start}}-{{i.aging_end}} Business Days</div>
            <div class="text-red-500 font-semibold">US$ {{i.super_freight}}</div>
          </div>
        </div>
      </div>
      <div class="mt-4 bg-white rounded-md shadow-default">
        <div class="pt-4 px-4">
          <div class="mb-3">Fee Breakdown</div>
          <div class="mt-3 grid grid-cols-3 text-13">
            <div class="col-span-2 p-2 bg-gray-100">Fee Name</div>
            <div class="col-span-1 p-2 bg-gray-100">Price</div>
            <div v-if="type == 1" class="col-span-2 p-2">Booking Fee</div>
            <div v-if="type == 1" class="col-span-1 p-2">${{bookingFee>0?bookingFee:'--'}}</div>
            <div class="col-span-2 p-2">Warehouse Out Charge</div>
            <div class="col-span-1 p-2">${{storageCharge}}</div>
          </div>
        </div>
        <div class="px-4 py-2 border-t grid grid-cols-3 text-13 font-semibold text-sm">
          <div class="col-span-2 p-2">Total Cost</div>
          <div class="col-span-1 p-2 text-red-500">${{totalCost}}</div>
        </div>
      </div>
      <!-- loading -->
    </div>
  </div>
</template>

<script>
  import SelectCountry from '@/components/SelectCountry'
  import SelectCity from '@/components/SelectCity'
  import VueCountryIntl from 'vue-country-intl'
  import 'vue-country-intl/lib/vue-country-intl.css'
  import {
    outboundDetial,
    submitOutbound,
    getFreightList,
  } from '@/api/dropshipping'
  import {
    reqAddress,
    reqEditAddress,
    reqDelAddress,
    reqGetAddress,
    reqStates,
    reqCountries,
    reqGetCity,
    getFbaCodeList,
  } from '@/api/address'
  import {
    shipFromTo
  } from '@/api/shippingCost'
  export default {
    components: {
      SelectCountry,
      SelectCity,
      VueCountryIntl
    },
    data() {
      return {
        orderNo: [],
        type: 1,
        list: [],
        purchaseData: {},
        storageCharge: 0,
        addList: [],
        chooseAddress: {
          id: '',
        },
        titl: 'Add',
        addressTitle: 'Add New',
        shippingAddress:{
          area: '',
          country: '',
          countryName: '',
          email: '',
          address_name: '',
          full_name: '',
          city: '',
          address_one: '',
          address_two: '',
          zipcode: '',
          tel: '',
          id: '',
          address_type: null,
          fba_code: '',
          is_default: 0,
        },
        countryList: [],
        countryItem: {},
        countryShow: false,
        stateList: [],
        stateItem: {},
        stateShow: false,
        shippingcity: '',
        shippingcitys: '',
        cityList: [],
        citySelectList: [],
        cityShow: false,
        defaultAddress: false,
        fbaList: [],
        fbaShow: false,
        btnLoading: false,
        freightEstimate: [],
        logisticsId: '',
        bookingFee: 0,
        bookingName: '',
        totalCost: 0,
        preLoad: false,
        showLoading: false,
      }
    },
    mounted() {
      this.$emit('hiddenChat', false)
      document.addEventListener(
        'click',
        this.even,
        true
      )
      if(this.$route.params.id){
        this.orderNo = this.$route.params.id
        this.type = this.$route.params.type
        this.getData()
      }else{
        this.$router.push({
          path: '/account/orderList?type=3',
        })
      }
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
      this.$emit('hiddenChat', true)
    },
    methods: {
      even(e){
        if (!this.$refs.countrySelect.contains(e.target)) {
          this.countryShow = false
        }
        if (!this.$refs.stateSelect.contains(e.target)) {
          this.stateShow = false
        }
        if (!this.$refs.citySelect.contains(e.target)) {
          this.cityShow = false
        }
        if (!this.$refs.fbaSelect.contains(e.target)) {
          this.fbaShow = false;
        }
      },
      getData(){
        outboundDetial({order_number: this.orderNo}).then((res)=>{
          this.list = res.data.oredrs
          this.purchaseData = res.data.purchases
          this.storageCharge = res.data.storageCharge
          if(this.type == 1){
            this.getCountryList()
            this.getAddress()
          }else{
            this.totalCost = this.storageCharge
          }
          this.preLoad = true
        })
      },
      toList(){
        this.$router.push({
          path: '/account/orderList?type=3',
        })
      },
      getAddress() {
        this.showLoading = true
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        reqGetAddress({ email: userInfo.email }).then((res)=>{
          this.addList = res.data
          let defaultId = 0
          if(this.addList.length>0){
            this.addList.forEach((item,index)=>{
              if(item.is_default == '1'){
                defaultId = index
              }
            })
            this.chooseAddress = this.addList[defaultId]
            // this.productInfo.give_address_id = this.chooseAddress.id
          }
          getFreightList({
            give_address_id: this.chooseAddress.id,
            count_weight: this.purchaseData.weight_total
          }).then((rez)=>{
            if(rez.data.length>0){
              this.freightEstimate = rez.data
              this.setLogistics(rez.data[0])
            }else{
              this.clearLogistics()
            }
            this.totalCost = (Number(this.bookingFee) + Number(this.storageCharge)).toFixed(2)
            this.showLoading = false
          })
        })
      },
      setLogistics(item){
        this.logisticsId = item.id
        this.bookingFee = item.super_freight
        this.bookingName = item.product_name_e
      },
      clearLogistics(){
        this.freightEstimate = []
        this.logisticsId = ''
        this.bookingFee = 0
        this.bookingName = ''
      },
      chooseAdd(i){
        this.showLoading = true
        this.chooseAddress = i
        getFreightList({
          give_address_id: this.chooseAddress.id,
          count_weight: this.purchaseData.weight_total
        }).then((rez)=>{
          if(rez.data.length>0){
            this.freightEstimate = rez.data
            this.setLogistics(rez.data[0])
          }else{
            this.clearLogistics()
          }
          this.totalCost = (Number(this.bookingFee) + Number(this.storageCharge)).toFixed(2)
          this.showLoading = false
        })
        this.closeModal()
      },
      selectAddress(){
        this.$refs.mask.style = 'display:block;'
        if(this.addList.length<1){
          this.titl = 'Add'
          this.addressTitle = 'Add New'
          this.$refs.addAddressModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.addaAddress()
          },1)
        }else{
          this.$refs.addressModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.addressModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.addressModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.addAddressModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        setTimeout(()=>{
          this.$validator.reset()
        },1)
      },
      changeAddress(i){
        this.titl = 'Edit'
        // this.chooseAddress = i
        if(i.is_default == '0'){
          this.defaultAddress = false
        }else{
          this.defaultAddress = true
        }
        this.shippingAddress.address_name = i.address_name
        this.shippingAddress.full_name = i.full_name
        this.shippingAddress.city = i.city
        this.shippingAddress.address_one = i.address_one
        this.shippingAddress.address_two = i.address_two
        this.shippingAddress.zipcode = i.zipcode
        this.shippingAddress.tel = i.tel
        this.shippingAddress.id = i.id
        this.shippingAddress.country = i.country
        this.shippingAddress.countryName = i.country_name
        this.shippingAddress.email = i.email
        this.shippingAddress.area = i.area
        this.shippingAddress.areaName = i.area_name
        this.shippingAddress.address_type = i.address_type
        this.shippingAddress.fba_code = i.fba_code
        this.shippingAddress.code_no = i.code_no
        this.addressTitle = 'Change'
        this.shippingcity = i.city
        this.shippingcitys = i.city
        for(let n=0;n<this.countryList.length;n++){
          if(i.country == this.countryList[n].code_two){
            this.countryItem = this.countryList[n]
            this.statesQuest(this.countryItem.code_two,i.area)
          }
        }
        this.$refs.addressModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.addAddressModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      },
      removeAddress(id){
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        reqDelAddress({id: id}).then((res) => {
          this.getAddress()
        })
      },
      addaAddress(){
        this.titl = 'Add'
        this.addressTitle = 'Add New'
        this.defaultAddress = false
        this.shippingAddress = {
          area: '',
          country: '',
          countryName: '',
          email: '',
          address_name: '',
          full_name: '',
          city: '',
          address_one: '',
          address_two: '',
          zipcode: '',
          tel: '',
          id: '',
          address_type: null,
          fba_code: '',
          is_default: 0,
        }
        this.countryItem = {}
        this.stateItem = {}
        this.stateList = []
        this.shippingcity = '',
        this.shippingcitys = '',
        this.cityList = [],
        this.citySelectList = [],
        this.$refs.addressModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.addAddressModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      },
      selectCountry(data, clickOne){
        this.countryItem = data
        this.shippingAddress.countryName = data.en_nickname
        this.shippingAddress.country = data.code_two
        this.countryShow = clickOne
        this.statesQuest(data.code_two,'change')
      },
      selectStates(data, clickOne){
        // console.log(data);
        this.stateItem = data
        this.shippingAddress.areaName = data.iso2
        this.shippingAddress.area = data.name
        this.stateShow = clickOne
        this.cityQuest(this.countryItem.code_two,data.iso2)
        this.shippingcitys = ''
        this.shippingcity = ''
      },
      endCity(){
        this.cityShow = true
        let str = this.shippingcity.toUpperCase()
        let a = []
        for (let n = 0; n < this.cityList.length; n++) {
          if (this.cityList[n].name.toUpperCase().indexOf(str) != -1) {
            a.push(this.cityList[n])
          }
        }
        this.citySelectList = a
      },
      endCity1(){
        if(this.cityList.length>0){
          this.shippingcity = this.shippingcitys
        }else{
          this.shippingAddress.city = this.shippingcity
        }
      },
      selectEnd(e){
        this.shippingAddress.city = e.name
        this.shippingcitys = e.name
        this.shippingcity = e.name
      },
      async addressSave(){
        let that = this
        const success = await that.$validator.validateAll()
        if(success){
          that.btnLoading = true
          if (that.titl == 'Add') {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            that.shippingAddress.email = userInfo.email
            reqAddress(that.shippingAddress).then((res) => {
              that.getAddress()
              // that.closeModal()
              that.btnLoading = false
              that.$refs.addAddressModal.style =
                'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
              that.$refs.addressModal.style =
                'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
            })
          }else{
            reqEditAddress(that.shippingAddress).then((res) => {
              that.getAddress()
              // that.closeModal()
              that.btnLoading = false
              that.$refs.addAddressModal.style =
                'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
              that.$refs.addressModal.style =
                'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
            })
          }
        }
      },
      getFBA(){
        getFbaCodeList({
          code: this.shippingAddress.fba_code,
        }).then((res)=>{
          this.fbaShow = true
          this.fbaList = res.data
        })
      },
      chooseFBA(item){
        this.shippingAddress.fba_code = item.fba_code
        this.fbaShow = false
      },
      getCountryList() {
        shipFromTo().then((res) => {
          this.countryList = res.data.endCountry
        })
      },
      statesQuest(iso,area) {
        let code_two = iso
        if(iso == 'UK'){
          code_two = "GB"
        }
        let that = this
        reqStates({ country_code: code_two }).then((res) => {
          if (res.code == 0) {
            that.stateList = res.data
            if(that.titl == 'Add' || area == 'change'){
              if (that.stateList.length > 0){
                that.stateItem = that.stateList[0]
                that.cityQuest(code_two,that.stateList[0].iso2)
                that.shippingcitys = ''
                that.shippingcity = ''
                that.shippingAddress.area = that.stateItem.name
              } else {
                that.stateItem = {}
              }
            }else{
              for(let m=0;m<that.stateList.length;m++){
                if(area == that.stateList[m].name){
                  that.stateItem = that.stateList[m]
                  that.cityQuest(code_two,that.stateList[m].iso2)
                }
              }
            }
          }
        })
      },
      cityQuest(code1,code2){
        reqGetCity({
          country_code: code1,
          state_code: code2,
        }).then((res)=>{
          this.cityList = res.data.reverse()
        })
      },
      checkDefault(){
        if(this.defaultAddress){
          this.shippingAddress.is_default = 1
        }else{
          this.shippingAddress.is_default = 0
        }
      },
      selectLogistics(i){
        this.logisticsId = i.id
        this.bookingFee = i.super_freight
        this.totalCost = (Number(this.bookingFee) + Number(this.storageCharge)).toFixed(2)
      },
      confirmOrder(){
        if(this.type == 1 && this.bookingFee == 0){
          this.$message({
            message: 'Please select the address and logistics',
            offset: 70
          });
        }else{
          this.showLoading = true
          let form = {
            order_number: this.orderNo,
            is_freight_agency: this.type,
            shipping_fee: this.totalCost,
            give_address_id: this.chooseAddress.id,
            product_name_e: this.bookingName,
          }
          submitOutbound(form).then((res)=>{
            this.$message({
              message: res.msg,
              offset: 70
            });
            if(res.code == 0){
              this.$router.push({
                path: '/account/orderList?type=4',
              })
            }else{
              this.showLoading = false
            }
          })
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .ordername{
    @apply p-2 border-b border-r text-right bg-gray-100;
  }

  .ordertext{
    @apply p-2 border-b border-r;
  }

  .mask {
    @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
    transition: opacity 0.4s;
  }

  .modal {
    @apply shadow-md fixed z-50 top-1/2 right-1/2 transform scale-50 hidden translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto rounded text-lightText dark:text-darkText;
    transition: transform 0.4s;
  }

  .btn {
    @apply w-28 h-10 font-semibold border-0 text-white rounded bg-orange hover:bg-orange1 cursor-pointer;
  }

  .cancelbtn {
    @apply w-28 h-10 font-semibold mr-5 border border-solid border-gray-400 bg-white hover:bg-gray-400 rounded cursor-pointer;
  }

  .inputTips {
    @apply left-0 text-xs text-red-500 absolute;
  }

  .searchPort{
    @apply absolute z-10 p-0 w-full max-h-52 h-auto top-11 left-0 text-sm rounded bg-white shadow-md overflow-auto;
  }

  .searchPort::-webkit-scrollbar, .searchFBA::-webkit-scrollbar {
    width: 6px;
  }

  .searchPort::-webkit-scrollbar-thumb, .searchFBA::-webkit-scrollbar-thumb {
    border-radius: 2px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.3);
  }

  .searchPort::-webkit-scrollbar-track, .searchFBA::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgb(255, 255, 255);
    border-radius: 6px;
  }

  .addressCheckbox[type="checkbox"] {
    @apply appearance-none w-12 h-6 relative rounded-2xl cursor-pointer bg-gray-200;
  }

  .addressCheckbox[type="checkbox"]:before {
    @apply absolute w-5 h-5 bg-white shadow-sm left-0.5 top-0.5 rounded-full origin-left duration-300 ease-out;
    content: "";
  }

  .addressCheckbox[type="checkbox"]:after {
    @apply inline-block whitespace-nowrap text-white font-bold;
    text-indent: 12px;
    word-spacing: 4px;
    font: 14px/30px monospace;
  }

  .addressCheckbox[type="checkbox"]:checked {
    @apply bg-switch;
  }

  .addressCheckbox[type="checkbox"]:checked:before {
    left: 26px;
  }

  .addressCheckbox[type="checkbox"]:checked:after {
    @apply text-black;
  }
</style>

<style>
.vue-country-list-wrap{
  width: 280px;
  max-width: 280px;
}

.vue-country-item span{
  word-break: break-word;
  white-space: normal;
  max-width: 172px;
}

.vue-country-item.selected .selected-text{
  display: none;
}
</style>
