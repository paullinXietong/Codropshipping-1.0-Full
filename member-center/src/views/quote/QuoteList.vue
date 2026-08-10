<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask"
         class="mask"
         @click="closeModal"></div>
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
                @click="remove">Confirm</button>
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
      <div class="breadcrumb max-w-1600">Quote List</div>
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="bg-white dark:bg-darkMenu shadow-default rounded-md grid grid-cols-12 gap-4 p-3">
          <div class="h-10 col-span-6 sm:col-span-4 xl:col-span-2">
            <select name="status" class="select h-42px" v-model="statusItem" @change="searchData">
              <option class="hidden" value="null">Status</option>
              <option v-for="(item,index) in statusList" :value="index+1">{{ item }}</option>
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
          <div class="h-10 col-span-6 sm:col-span-4 xl:col-span-2">
            <select name="transportType" class="select h-42px" v-model="freightItem" @change="searchData">
              <option class="hidden" value="null">Transport type</option>
              <option v-for="(i,n) in freightList" :value="n+1">{{ i }}</option>
            </select>
            <!-- <div ref="freightSelect" class="relative">
              <div class="Select" :class="[freightShow ? 'selectOpen' : '']"
                @click.stop="freightShow = !freightShow">
                {{ freightItem }}
                <img src="../../assets/down.svg" class="absolute right-1 top-3.5 w-5" alt="">
              </div>
              <select-search :selectList="freightList" :selectChecked="freightItem" :selectOpen="freightShow"
                @increment="f2" v-show="freightShow"></select-search>
            </div> -->
          </div>
          <div class="h-10 col-span-12 sm:col-span-4 xl:col-span-2">
            <div ref="countrySelect" class="relative">
              <div class="Select overflow-hidden" :class="[countryShow ? 'selectOpen' : '']"
                @click.stop="countryShow = !countryShow">
                {{ countryItem.name }}
                <img src="../../assets/down.svg" class="absolute right-1 top-3.5 w-5" alt="">
              </div>
              <select-country :selectList="countryList" :selectChecked="countryItem" :selectOpen="countryShow"
                @increment="f3" v-show="countryShow"></select-country>
            </div>
          </div>
          <!-- max="2022-11-07" -->
          <input ref="dateSelect" @click="dateSelect" v-model="startDate" @input="searchData"
            type="date" class="input h-10 col-span-6 sm:col-span-4 xl:col-span-2 border">
          <input ref="dateSelect1" @click="dateSelect1" v-model="endDate" @input="searchData"
            type="date" class="input h-10 col-span-6 sm:col-span-4 xl:col-span-2 border">
          <router-link class="col-span-12 sm:col-span-4 xl:col-span-2" target="_blank" :to="{ name: 'quoteRequest' }">
            <button class="h-10 w-full bg-gray-400 hover:bg-gray-500 text-white rounded-md">Request Quote</button>
          </router-link>
        </div>

        <div v-show="quoteList.length == 0" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
          <div>
            <img src="../../assets/noQuote.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
            <div class="mt-5 text-base text-center font-semibold">no request</div>
          </div>
        </div>

        <quote-item v-show="quoteList.length != 0" :quoteList="quoteList" @showRemoveModal="openRemoveModal"></quote-item>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectSearch from '@/components/SelectSearch'
  import SelectCountry from '@/components/SelectCountry'
  import QuoteItem from '@/components/Quote/QuoteItem'
  import {
    reqCountries
  } from '@/api/address'
  import {
    quoteList,
    quoteDel
  } from '@/api/quote'
  export default {
    components: {
      SelectSearch,
      SelectCountry,
      QuoteItem
    },
    data() {
      return {
        statusList: ['Pending','Have'],
        statusItem: null,
        // statusShow: false,
        freightList: ['Sea Freight','Air Freight'],
        freightItem: null,
        // freightShow: false,
        countryList: ['US','UK'],
        countryItem: {id: 233, iso2: "US", name: "United States"},
        countryShow: false,
        btnLoading: false,
        quoteList: [
          // {
          //   name: 'XT123456 Name',
          //   freight: ['Sea Freight','Air Freight'],
          //   from: 'Shenzhen',
          //   to: 'United States',
          //   addressType: 'Amazon FBA',
          //   cargoDetails: ['7,500.00kg','12.000cbm'],
          //   requestDate: '2022-10-10',
          //   status: 'Pending for Quotation',
          //   quoteTime: '2022-10-11 12:00:00',
          //   show: false,
          // },
        ],
        startDate: '',
        endDate: ''
      }
    },
    created() {
      this.countryQuest()
      this.ReqList()
      this.$emit('menu', 'quotePrice')
    },
    mounted() {
      document.addEventListener(
        "click",
        this.even,
        true
      );
      this.setDate()
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
    },
    methods:{
      ReqList(){
        quoteList().then((res) => {
          // console.log(res)
          if(res.code == 0){
            res.data.forEach(item=>{
              Object.assign(item,{show:false})
            })
            this.quoteList = res.data
          }
        })
      },
      even(e){
        // if (!this.$refs.statusSelect.contains(e.target)) {
        //   this.statusShow = false;
        // }
        // if (!this.$refs.freightSelect.contains(e.target)) {
        //   this.freightShow = false;
        // }
        if (!this.$refs.countrySelect.contains(e.target)) {
          this.countryShow = false;
        }
      },
      async countryQuest(){
        // let resCountries = await reqCountries()
        // this.countryList = resCountries.data
        this.countryList = JSON.parse(localStorage.getItem("Countries"))
      },
      // f1(data, index, clickOne){
      //   this.statusItem = data
      //   this.statusShow = clickOne
      //   // await console.log(this.statusShow)
      // },
      // f2(data, index, clickOne){
      //   this.freightItem = data
      //   this.freightShow = clickOne
      // },
      f3(data, clickOne){
        this.countryItem = data
        this.countryShow = clickOne
        this.searchData()
      },
      setDate(){
        var newDay=new Date();
        var year=newDay.getFullYear();
        var month=newDay.getMonth()+1;
        var day=newDay.getDate();
        month=month<10?"0"+month:month;
        day=day<10?"0"+day:day;
        // console.log(year+"-"+month+"-"+day)
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
        that.$refs.removeModal.style = 'display:block;'
        setTimeout(function () {
          that.$refs.mask.style = 'display:none;opacity:0;'
          that.$refs.removeModal.style =
            'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        }, 240)
      },
      remove(){
        let that = this
        that.btnLoading = true
        quoteDel({id: that.delId}).then((res)=>{
          setTimeout(()=>{
            that.closeModal()
            that.btnLoading = false
            that.ReqList()
          },800)
        })
      },
      dateSelect(){
        this.$refs.dateSelect.showPicker()
      },
      dateSelect1(){
        this.$refs.dateSelect1.showPicker()
      },
      searchData(){
        let searchForm = {
          status: this.statusItem,
          transport_type: this.freightItem,
          end: this.countryItem.name,
          from_time: this.startDate,
          to_time: this.endDate
        }
        quoteList(searchForm).then((res) => {
          if(res.code == 0){
            res.data.forEach(item=>{
              Object.assign(item,{show:false})
            })
            this.quoteList = res.data
          }
        })
      },
    }
  }
  </script>

<style lang="postcss" scoped>
.Select{
  @apply h-10 w-full bg-white hover:bg-selectOpen dark:bg-darkMain dark:border-darkMain border border-inputBorder rounded px-3 py-2 text-base cursor-pointer relative;
}

.selectOpen{
  @apply bg-selectOpen !important;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: all 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 w-600 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.btn {
  @apply font-semibold border-0 text-15 text-white rounded bg-orange hover:bg-orange1 px-6 py-2 cursor-pointer;
}

.btn1 {
  @apply font-semibold text-white border-0 rounded bg-gray-500 hover:bg-gray-700 px-6 py-2.5 cursor-pointer;
}

</style>
