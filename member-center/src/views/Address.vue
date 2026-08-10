<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <notice-alerts class="top-3 w-1200"
                   v-show="alertShow"
                   :title="alertTitle"
                   :type="alertType"></notice-alerts>
    <div ref="mask"
         class="mask"
         @click="closeModal"></div>
    <div ref="modal"
         class="modal">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3 px-5">
        <div class="text-xl">{{modalTitle}} a Address</div>
        <img id="closeImg"
             class="closeModal"
             @click="closeModal"
             src="../assets/close.svg"
             alt="">
      </div>
      <div class="pt-5 px-5 border-b border-gray-200 dark:border-darkLine">
        <div class="half1">
          <div class="half mr-0 md:mr-5">
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>Company Name</label>
            </div>
            <div>
              <input class="input"
                     v-validate="'required|addressName'"
                     name="addressName"
                     value
                     type="text"
                     placeholder="Company Name"
                     v-model="shippingAddress.address_name">
              <div class="inputTips">{{errors.first("addressName")}}</div>
            </div>
          </div>
          <div class="half">
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>Recipient Name</label>
            </div>
            <div>
              <input class="input"
                     v-validate="'required|fullName'"
                     name="fullName"
                     value
                     type="text"
                     placeholder="Recipient Name"
                     v-model="shippingAddress.full_name">
              <div class="inputTips">{{errors.first("fullName")}}</div>
            </div>
          </div>
        </div>
        <div class="mb-5">
          <div class="pb-2">
            <label class="text-base flex">
              <div class="required">*</div>Country</label>
          </div>
          <!-- <div>
            <select name="country"
                    id="select1"
                    class="select"
                    v-model="shippingAddress.country">
              <option v-for="(item,index) in countryList"
                      :key="index"
                      :value="item.iso2">{{item.name}}</option>
            </select>
          </div> -->
          <div ref="countrySelect"
               class="relative">
            <div class="select cursor-pointer h-42px"
                 :class="[countryShow ? 'selectOpen' : '']"
                 @click.stop="countryShow = !countryShow">
              {{ countryItem.en_nickname }}
              <img src="../assets/down.svg"
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
        <div class="half1">
          <div class="half mr-0 md:mr-5">
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>State or Province</label>
            </div>
            <!-- <div>
              <select name="stateProvince"
                      id="select2"
                      class="select"
                      v-model="shippingAddress.area">
                <option v-for="(item,index) in stateList"
                        :key="index"
                        :value="item.iso2">{{item.name}}</option>
              </select>
            </div> -->
            <div ref="statesSelect"
                 class="relative h-42px">
              <div class="select cursor-pointer h-42px"
                   :class="[statesShow ? 'selectOpen' : '']"
                   @click.stop="statesShow = !statesShow">
                {{ statesItem.name }}
                <img src="../assets/down.svg"
                     class="absolute right-1 top-3.5 w-5"
                     alt="">
              </div>
              <select-city :selectList="statesList"
                              :selectChecked="statesItem"
                              :selectOpen="statesShow"
                              @increment="selectStates"
                              v-show="statesShow"></select-city>
            </div>
          </div>
          <div class="half">
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>City</label>
            </div>
            <div class="relative">
              <!-- <input class="input" v-validate="'required|city'" name="city"
                value type="text" placeholder="City" v-model="shippingAddress.city"> -->
              <input ref="citySelect" class="input" v-validate="'required|city'"
                name="city" value type="text" placeholder="City" v-model="shippingcity"
                @input="endCity" @focus="endCity" @blur="endCity1">
              <div class="inputTips">{{errors.first("city")}}</div>
              <div v-show="cityShow" class="searchPort">
                <div v-for="(f,nf) in citySelectList" :key="nf" @click="selectEnd(f)"
                  class="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  {{ f.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-5">
          <div class="pb-2">
            <label class="text-base flex">
              <div class="required">*</div>Address Line 1</label>
          </div>
          <div>
            <input class="input"
                   v-validate="'required|line1'"
                   name="line1"
                   value
                   type="text"
                   placeholder="Address"
                   v-model="shippingAddress.address_one">
            <div class="inputTips">{{errors.first("line1")}}</div> 
          </div>
        </div>
        <div class="mb-5">
          <div class="pb-2">
            <label class="text-base">Address Line 2</label>
          </div>
          <div>
            <input class="input"
                   value
                   type="text"
                   placeholder="Apartment,suite,etc."
                   v-model="shippingAddress.address_two">
          </div>
        </div>
        <div class="half1">
          <div class="half mr-0 md:mr-5">
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>Postal Code</label>
            </div>
            <div>
              <input class="input"
                     v-validate="'required|postalCode'"
                     name="postalCode"
                     value
                     type="text"
                     placeholder="Postal Code"
                     v-model="shippingAddress.zipcode">
              <div class="inputTips">{{errors.first("postalCode")}}</div>
            </div>
          </div>
          <div class="half">
            <div class="pb-2">
              <label class="text-base flex">
                <div class="required">*</div>Phone Number</label>
            </div>
            <div class="flex relative">
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
              <input class="input"
                     v-validate="'required|phone'"
                     name="phone"
                     value
                     type="text"
                     placeholder="Phone Number"
                     v-model="shippingAddress.tel">
              <div class="inputTips top-11">{{errors.first("phone")}}</div> 
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="btn1 my-5 mx-3 w-28" :disabled="btnLoading"
                @click="closeModal">Cancel</button>
        <button class="btn my-5 mx-3 w-28" v-show="!btnLoading"
                @click="submitModal()">Save</button>
        <button class="btn my-5 mx-3 w-28" v-show="btnLoading">
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
    <div ref="removeModal" class="modal">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3 px-5">
        Tips
      </div>
      <div class="py-3 px-5 h-20">
        Are you confirm remove?
      </div>
      <div class="flex justify-end">
        <button class="btn1 my-5 mx-3 w-28"
                @click="closeModal" :disabled="btnLoading">Cancel</button>
        <button class="btn my-5 mx-3 w-28" v-show="!btnLoading"
                @click="removeAddress">Confirm</button>
        <button class="btn my-5 mx-3 w-28" v-show="btnLoading">
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
    <div class="h-full overflow-auto">
      <div class="breadcrumb pb-0 flex items-start sm:items-center justify-between sm:flex-row flex-col">
        <div>Shipping Addresses</div>
        <button class="btn sm:mt-0 mt-3"
                id="openModal"
                @click="openModal('Add',id)">Add new address</button>
      </div>
      <div class="main1 bg-transparent dark:bg-transparent shadow-none p-0">
        <address-item :addressList="addressList"
                      :shippingAddress='shippingAddress'
                      @showModal="openModal"
                      @showRemoveModal="openRemoveModal"
                      @getAddress='getAddress'
                      :addressIdDatas='addressIdDatas'
                      @editDefault="getAddress"></address-item>
      </div>
    </div>
  </div>
</template>

<script>
import AddressItem from '@/components/AddressItem'
import NoticeAlerts from '@/components/NoticeAlerts'
import SelectCountry from '@/components/SelectCountry'
import SelectCity from '@/components/SelectCity'
import VueCountryIntl from 'vue-country-intl'
import 'vue-country-intl/lib/vue-country-intl.css'
import {
  reqAddress,
  reqCountries,
  reqStates,
  reqGetAddress,
  reqEditAddress,
  reqDelAddress,
  reqGetCity
} from '@/api/address'
import {
  shipFromTo
} from '@/api/shippingCost'
export default {
  components: {
    AddressItem,
    NoticeAlerts,
    SelectCountry,
    SelectCity,
    VueCountryIntl
  },
  data() {
    return {
      modalTitle: 'Add',
      id: null,
      titl: 'Add',
      addressIdDatas: [],
      addressId: null,
      email: '',
      alertShow: false,
      alertTitle: '',
      alertType: 'err',
      showLoading: false,
      shippingAddress: {
        area: '',
        country: '',
        email: '',
        address_name: '',
        full_name: '',
        city: '',
        address_one: '',
        address_two: '',
        zipcode: '',
        tel: '',
        id: '',
      },
      addressList: [
        // {
        //   name: '',
        //   addressName: '',
        //   country: '',
        //   phone: '',
        //   zipcode: '',
        //   id: '',
        //   address: '',
        //   city: '',
        //   area: '',
        // },
      ],
      countryList: ['US', 'UK'],
      countryItem: { iso2: 'US', name: 'United States' },
      countryShow: false,
      statesList: [],
      statesItem: {},
      statesShow: false,
      delId: null,
      btnLoading: false,
      shippingcity: '',
      shippingcitys: '',
      cityList: [],
      citySelectList: [],
      cityShow: false,
    }
  },
  created() {
    this.statesQuest('US')
    this.$emit('menu', 'address')
  },
  mounted() {
    document.addEventListener(
      'click',
      this.even,
      true
    )
    this.getCountryList()
    this.getAddress()
  },
  destroyed() { 
    document.removeEventListener('click', this.even, true) 
  },
  methods: {
    even(e){
      if (!this.$refs.countrySelect.contains(e.target)) {
        this.countryShow = false
      }
      if (!this.$refs.statesSelect.contains(e.target)) {
        this.statesShow = false
      }
      if (!this.$refs.citySelect.contains(e.target)) {
        this.cityShow = false
      }
    },
    async getCountryList() {
      try {
        // let resCountries = await reqCountries()
        let resStates = await reqStates()
        // this.countryList = resCountries.data
        // this.countryList = JSON.parse(localStorage.getItem("Countries"))
        shipFromTo().then((res) => {
          this.countryList = res.data.endCountry
        })
        this.stateList = resStates.data
      } catch (error) {}
    },
    statesQuest(iso, e) {
      let code_two = iso
      if(iso == 'UK'){
        code_two = "GB"
      }
      let that = this
      reqStates({ country_code: code_two }).then((res) => {
        if (res.code == 0) {
          that.statesList = res.data
          if(e != 'edit'){
            if (that.statesList.length > 0){
              that.statesItem = that.statesList[0]
              that.cityQuest(code_two,that.statesList[0].iso2)
              that.shippingcitys = ''
              that.shippingcity = ''
              that.shippingAddress.area = that.statesItem.name
            } else {
              that.statesItem = {}
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
    openModal(edit, index, id) {
      // console.log('555', edit, index, id)
      this.titl = edit
      this.id = id
      
      if (edit == 'Add') {
        this.modalTitle = 'Add'
        this.shippingAddress = {
          areaName: '',
          countryName: '',
          area: this.statesItem.name,
          country: this.countryItem.code_two,
          email: '',
          address_name: '',
          full_name: '',
          city: '',
          address_one: '',
          address_two: '',
          zipcode: '',
          tel: '',
          id: '',
        }
        setTimeout(()=>{ 
          this.$validator.reset()
        },1)
      } else {
        this.modalTitle = 'Edit'
        this.shippingAddress = {
          areaName: this.addressIdDatas[index].area_name,
          countryName: this.addressIdDatas[index].country_name,
          area: this.addressIdDatas[index].area,
          country: this.addressIdDatas[index].country,
          email: this.addressIdDatas[index].email,
          address_name: this.addressIdDatas[index].address_name,
          full_name: this.addressIdDatas[index].full_name,
          city: this.addressIdDatas[index].city,
          address_one: this.addressIdDatas[index].address_one,
          address_two: this.addressIdDatas[index].address_two,
          zipcode: this.addressIdDatas[index].zipcode,
          tel: this.addressIdDatas[index].tel,
          code_no: this.addressIdDatas[index].code_no,
          //   id: this.addressIdDatas[0].id,
        }
        this.cityQuest(this.shippingAddress.country,this.shippingAddress.area)
        this.shippingcity = this.shippingAddress.city
        this.shippingcitys = this.shippingAddress.city
        this.countryItem.en_nickname = this.addressIdDatas[index].country_name
        this.countryItem.code_two = this.addressIdDatas[index].country
        this.statesItem.name = this.addressIdDatas[index].area
        this.statesItem.iso2 = this.addressIdDatas[index].area_name
        this.statesQuest(this.countryItem.code_two, 'edit')
      }
      let that = this
      that.$refs.mask.style = 'display:block;'
      that.$refs.modal.style = 'display:block;'
      setTimeout(function () {
        that.$refs.mask.style = 'display:block;opacity:1;'
        that.$refs.modal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      }, 1)
    },
    openRemoveModal(e){
      let that = this
      that.$refs.mask.style = 'display:block;'
      that.$refs.removeModal.style = 'display:block;'
      setTimeout(function () {
        that.$refs.mask.style = 'display:block;opacity:1;'
        that.$refs.removeModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      }, 1)
      this.delId = e
    },
    closeModal() {
      let that = this
      that.$refs.mask.style = 'display:block;'
      if(that.$refs.modal.style.opacity == 1){
        that.$refs.modal.style = 'display:block;'
      }
      if(that.$refs.removeModal.style.opacity == 1){
        that.$refs.removeModal.style = 'display:block;'
      }
      setTimeout(function () {
        that.$refs.mask.style = 'display:none;opacity:0;'
        that.$refs.modal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        that.$refs.removeModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        that.$validator.reset()
      }, 240)
    },
    async submitModal() {
      let that = this
      const success = await that.$validator.validateAll()
      if(success){
        // add
        that.btnLoading = true
        if (that.titl == 'Add') {
          const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          that.shippingAddress.email = userInfo.email
          reqAddress(that.shippingAddress).then((res) => {
            if (res.code == 0) {
              setTimeout(function(){
                that.alertShow = true
                that.alertType = 'success'
                that.alertTitle = 'Add succeeded'
                that.getAddress()
                that.closeModal()
                that.btnLoading = false
              },800)
            } else {
              setTimeout(function(){
                that.showLoading = false
                that.alertShow = true
                that.alertTitle = res.msg
                that.getAddress()
                that.closeModal()
                that.btnLoading = false
              },800)
            }
          })
        } else {
          //   edit
          that.shippingAddress.id = that.id
          that.shippingAddress.area = that.statesItem.name
          reqEditAddress(that.shippingAddress).then((res) => {
            if (res.code == 0) {
              setTimeout(function(){
                that.alertShow = true
                that.alertType = 'success'
                that.alertTitle = 'Edit succeeded'
                that.getAddress()
                that.closeModal()
                that.btnLoading = false
              },800)
            } else {
              setTimeout(function(){
                that.showLoading = false
                that.alertShow = true
                that.alertTitle = res.msg
                that.getAddress()
                that.closeModal()
                that.btnLoading = false
              },800)
            }
          })
        }
      }
    },
    removeAddress(){
      let that = this
      that.btnLoading = true
      const data = {
        id: that.delId,
      }
      reqDelAddress(data).then((res) => {
        if (res.code == 0) {
          setTimeout(function(){
            that.alertShow = true
            that.alertType = 'success'
            that.alertTitle = 'Remove succeeded'
            that.getAddress()
            that.closeModal()
            that.btnLoading = false
          },800)
        } else {
          setTimeout(function(){
            that.showLoading = false
            that.alertShow = true
            that.alertTitle = res.msg
            that.getAddress()
            that.closeModal()
            that.btnLoading = false
          },800)
        }
      })
    },  
    async getAddress() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.email = userInfo.email
      let res = await reqGetAddress({ email: this.email })
      this.addressIdDatas = res.data
      this.addressList = []
      res.data.forEach((items) => {
        let defaultAddress = false
        if(items.is_default == '1'){
          defaultAddress = true
        }
        this.addressList.push({
          id: Number(items.id),
          name: items.full_name,
          addressName: items.address_name,
          // address: items.address_two + ',' + items.address_one,
          address2: items.address_two,
          address1: items.address_one,
          city: items.city,
          area: items.area,
          zipcode: items.zipcode,
          country: items.country_name,
          phone: items.tel,
          defaultAddress: defaultAddress,
        })
      })
    },
    selectCountry(data, clickOne) {
      this.countryItem = data
      this.shippingAddress.countryName = data.en_nickname
      this.shippingAddress.country = data.code_two
      this.countryShow = clickOne
      // if (this.titl == 'edits') {
      //   this.titl = 'editSelect'
      // } else {
      //   this.titl = 'addSelect'
      // }
      this.statesQuest(data.code_two)
    },
    selectStates(data, clickOne) {
      // console.log(data);
      this.statesItem = data
      this.shippingAddress.areaName = data.iso2
      this.shippingAddress.area = data.name
      this.statesShow = clickOne
      this.cityQuest(this.countryItem.iso2,data.iso2)
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
    }
  },
}
</script>

<style lang="postcss">
.btn {
  @apply font-semibold border-0 text-15 text-white rounded bg-orange hover:bg-orange1 px-6 py-2 cursor-pointer;
}

.changebtn {
  @apply border border-solid border-gray-500 bg-gray-500 hover:bg-gray-700 text-15 text-white w-4/5 max-w-200 m-1 font-semibold rounded p-2.5 cursor-pointer;
}

.removebtn {
  @apply border border-solid text-lightText border-gray-400 bg-white hover:bg-gray-400 text-15 w-4/5 max-w-200 m-1 font-semibold rounded p-2.5 cursor-pointer;
}

.btn1 {
  @apply font-semibold text-white border-0 rounded bg-gray-500 hover:bg-gray-700 px-6 py-2.5 cursor-pointer;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 w-600 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.closeModal {
  @apply w-7 h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded;
}

.half1 {
  @apply flex md:flex-nowrap flex-wrap;
}

.half {
  @apply w-full md:w-1/2 mb-5;
}

.loading {
  @apply w-full px-2.5 py-3.5 mb-3.5 bg-orange justify-center rounded-md;
}

.inputTips {
  @apply text-xs text-red-500 absolute;
}

.selectOpen {
  @apply bg-selectOpen !important;
}

.searchPort{
  @apply absolute z-10 p-0 w-full max-h-52 h-auto top-11 left-0 text-sm rounded bg-white shadow-md overflow-auto;
}

.searchPort::-webkit-scrollbar {
  width: 6px;
}

.searchPort::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.searchPort::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
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
