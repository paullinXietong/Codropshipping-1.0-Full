<template>
  <div ref="consPage" class="w-full h-full relative overflow-y-auto pb-32" style="min-width: 1200px;">
    <div ref="mask" class="mask"></div>
    <div ref="priceModal" class="py-8 modal w-900 opacity-20 bg-white dark:bg-darkMenu">
      <div @click="closeModal" class="absolute right-3 top-3 flex hover:bg-gray-200 cursor-pointer">
        <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
      </div>
      <div class="px-7 text-sm">
        <div class="mb-5 text-xl font-semibold">Cargo Consolidation description of services (Pickup available)</div>
        <div class="mb-3">Service Mode: Delivery to warehouse/Pickup available.</div>
        <div class="mb-3">Transportation method: you can contact your account manager for selection, or you can choose package service.</div>
        <div class="mb-3 text-base font-semibold">Quotation sheet</div>
        <table class="mb-3 table-auto text-left">
          <tr class="bg-consbtn">
            <th class="w-36">Price band</th>
            <th class="w-52">Number of suppliers</th>
            <th class="w-40">Unit Price (USD)</th>
          </tr>
          <tbody>
            <tr>
              <td>0~10CBM</td>
              <td>1~5</td>
              <td>***(USD)</td>
            </tr>
            <tr>
              <td>10~20CBM</td>
              <td>6~10</td>
              <td>***(USD)</td>
            </tr>
            <tr>
              <td>>20CBM</td>
              <td>11~20</td>
              <td>***(USD)</td>
            </tr>
          </tbody>
        </table>
        <div class="mb-3 text-base font-semibold">Description of Prices</div>
        <div class="mb-3">Fees include collection, storage, loading and unloading.</div>
        <div class="mb-3">There is a pickup fee if you need to pick up at your home.</div>
        <div class="mb-3 text-base font-semibold">Value-added service prices</div>
        <div class="mb-3">Value-added services include door-to-door collection, warehouse value-added services (palletizing, unpacking, packaging, sorting, labeling, quality inspection, etc.), the actual cost of value-added services shall be subject to the price given by the account manager.</div>
        <div class="mb-3 text-base font-semibold">Shipping Package Description</div>
        <div class="mb-3">Costs include transportation and consolidation related costs and do not include value-added services.</div>
      </div>
    </div>
    <div ref="serviceModal" class="py-8 modal w-700 opacity-20 bg-white dark:bg-darkMenu">
      <div @click="closeModal" class="absolute right-3 top-3 flex hover:bg-gray-200 cursor-pointer">
        <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
      </div>
      <div class="py-4 text-xl text-center">Selection of service options</div>
      <div class="mt-6 px-7 text-sm flex justify-center flex-wrap text-blueBtn">
        <div class="m-3 w-72 p-4 flex rounded-md border border-blueBtn">
          <img src="../../assets/deliveryWarehouse.png" class="flex-shrink-0 mr-2 w-11 h-14" alt="">
          <div class="w-full">
            <div class="text-base">Delivery to warehouse</div>
            <div class="mt-5">Delivered by you to the designated warehouse</div>
            <div class="mt-2 p-1.5 text-center text-xs text-black rounded-md"
              style="background-color: #FFF0DB;">A specific shipping address will be provided to you after the order is submitted</div>
            <div class="flex justify-center">
              <button @click="confirmBooking"
                class="mt-3 w-4/5 p-2 border border-blueBtn rounded-md bg-consbtn">Options</button>
            </div>
          </div>
        </div>
        <div class="m-3 w-72 p-4 flex rounded-md border border-blueBtn bg-consbtn">
          <img src="../../assets/pickupAvailable.png" class="flex-shrink-0 mr-2 w-11 h-14" alt="">
          <div class="w-full">
            <div class="text-base">Pickup available</div>
            <div class="mt-5">We'll pick it up at your door.</div>
            <div style="height: 90px;"></div>
            <div class="flex justify-center">
              <button class="mt-3 w-4/5 p-2 border border-blueBtn rounded-md bg-blueBtn text-consbtn">Selected Programs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="successModal" class="py-8 modal w-510 opacity-20 bg-white dark:bg-darkMenu">
      <div @click="closeModal" class="absolute right-3 top-3 flex hover:bg-gray-200 cursor-pointer">
        <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
      </div>
      <div class="px-10 flex flex-col items-center">
        <svg t="1676519430153" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5034" width="70" height="70"><path d="M512 32C246.4 32 32 249.6 32 512s217.6 480 480 480 480-217.6 480-480S774.4 32 512 32z m268.8 380.8L496 697.6c-25.6 25.6-60.8 25.6-83.2 0L243.2 528c-25.6-25.6-25.6-60.8 0-83.2s60.8-25.6 83.2 0l128 128 240-240c25.6-25.6 60.8-25.6 83.2 0 25.6 19.2 25.6 54.4 3.2 80z" p-id="5035" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#75BB43"></path></svg>
        <div class="mt-6">The collection was successfully launched</div>
        <div class="mt-6 text-center" style="color: #e66a10;">Note: Documentation includes warehouse number (Remind vendors to place warehouse receipts on goods) and warehouse address.</div>
        <div class="w-56 p-2 border border-oranges rounded-md mt-4 flex justify-between items-center">
          <div class="flex items-center">
            <svg t="1712558582751" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8117" width="36" height="36"><path d="M531.3 574.4l0.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-0.7-29.9 8.3-33.4 21.4-6.6 24-0.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5 0.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7z m87.6-235.5c5.2 8.9 4.5 35.8 0.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4 0.8 0.1 1.5 0.7 2.2 2z m-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4z m155.6 65.5c0.1 0.2 0.2 0.5-0.4 0.9h-0.2l-0.2 0.3c-0.8 0.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4z" p-id="8118"></path><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326z m1.8 562H232V136h302v216c0 23.2 18.8 42 42 42h216v494z" p-id="8119"></path></svg>
            <div>Document</div>
          </div>
          <svg t="1712558634652" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9986" width="24" height="24"><path d="M768 768q0-14.857143-10.857143-25.714286t-25.714286-10.857143-25.714286 10.857143-10.857143 25.714286 10.857143 25.714286 25.714286 10.857143 25.714286-10.857143 10.857143-25.714286zm146.285714 0q0-14.857143-10.857143-25.714286t-25.714286-10.857143-25.714286 10.857143-10.857143 25.714286 10.857143 25.714286 25.714286 10.857143 25.714286-10.857143 10.857143-25.714286zm73.142857-128l0 182.857143q0 22.857143-16 38.857143t-38.857143 16l-841.142857 0q-22.857143 0-38.857143-16t-16-38.857143l0-182.857143q0-22.857143 16-38.857143t38.857143-16l265.714286 0 77.142857 77.714286q33.142857 32 77.714286 32t77.714286-32l77.714286-77.714286 265.142857 0q22.857143 0 38.857143 16t16 38.857143zm-185.714286-325.142857q9.714286 23.428571-8 40l-256 256q-10.285714 10.857143-25.714286 10.857143t-25.714286-10.857143l-256-256q-17.714286-16.571429-8-40 9.714286-22.285714 33.714286-22.285714l146.285714 0 0-256q0-14.857143 10.857143-25.714286t25.714286-10.857143l146.285714 0q14.857143 0 25.714286 10.857143t10.857143 25.714286l0 256 146.285714 0q24 0 33.714286 22.285714z" p-id="9987" fill="#169BD5"></path></svg>
        </div>
      </div>
    </div>

    <div v-show="showMsg" class="msgModal">
      Upload a supplier phone number/supplier information file to book a shipment.
    </div>

    <div class="w-full relative">
      <img src="../../assets/consolidationTop.webp" class="absolute top-0 left-0 w-full h-full object-cover" alt="">
      <div class="flex z-10 relative max-w-1200 w-full mx-auto">
        <div class="pt-16 px-4 pb-8 w-full">
          <div class="text-3xl font-semibold">Cargo Consolidation</div>
          <div class="mt-5 text-sm max-w-700">Cargosoon can be responsible for the business which collect cargoes from multiple suppliers, also provide loading & unloading, quality check, labeling, and storage services.</div>
          <div class="mt-5 flex text-sm">
            <button @click="focusBooking"
              class="mr-6 w-44 py-2 rounded bg-blueBtn text-white border border-blueBtn">Booking</button>
            <button class="w-44 py-2 rounded bg-white text-blueBtn border border-blueBtn">Check shipping costs</button>
          </div>
          <div class="mt-5 flex text-sm text-blueBtn">
            <div @click="openModal" class="mr-8 cursor-pointer hover:underline flex items-center">
              <svg t="1712460485643" class="icon mr-1" viewBox="0 0 1097 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6715" width="18" height="18"><path d="M256 256q0-30.285714-21.428571-51.714286T182.857143 182.857143t-51.714286 21.428571T109.714286 256t21.428571 51.714286T182.857143 329.142857t51.714286-21.428571T256 256z m609.714286 329.142857q0 30.285714-21.142857 51.428572l-280.571429 281.142857q-22.285714 21.142857-52 21.142857-30.285714 0-51.428571-21.142857L52 508.571429q-21.714286-21.142857-36.857143-57.714286T0 384V146.285714q0-29.714286 21.714286-51.428571t51.428571-21.714286h237.714286q30.285714 0 66.857143 15.142857T436 125.142857l408.571429 408q21.142857 22.285714 21.142857 52z m219.428571 0q0 30.285714-21.142857 51.428572l-280.571429 281.142857q-22.285714 21.142857-52 21.142857-20.571429 0-33.714285-8t-30.285715-25.714286l268.571429-268.571428q21.142857-21.142857 21.142857-51.428572 0-29.714286-21.142857-52L527.428571 125.142857q-21.714286-21.714286-58.285714-36.857143T402.285714 73.142857h128q30.285714 0 66.857143 15.142857t58.285714 36.857143l408.571429 408q21.142857 22.285714 21.142857 52z" p-id="6716" fill="#327cff"></path></svg>
              <div>Value-added service prices</div>
            </div>
            <div>Description of Prices</div>
          </div>
        </div>
        <div class="pt-14 pb-8 px-4 flex-shrink-0">
          <video autoplay loop muted controls width="356px">
            <source src="../../assets/cargoConsolidation.mp4" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
    <div ref="bookingPanel" class="mt-6 px-3 mx-auto w-full max-w-1600 ">
      <div class="flex text-sm">
        <div @click="setType(1)" :class="[conType == 1 ? 'bg-white text-blueBtn' : 'bg-consbtn']"
          class="py-2.5 px-10 mr-6 cursor-pointer relative select-none">
          Cargo Consolidation
          <div class="triangle" :style="conType == 1 ? 'border-left: 24px solid #fff;' : 'border-left: 24px solid #E0F3FF;'"></div>
        </div>
        <div @click="setType(2)" :class="[conType == 2 ? 'bg-white text-blueBtn' : 'bg-consbtn']"
          class="py-2.5 px-10 mr-6 cursor-pointer relative select-none">
          Consolidation and transportation
          <div class="triangle" :style="conType == 2 ? 'border-left: 24px solid #fff;' : 'border-left: 24px solid #E0F3FF;'"></div>
        </div>
      </div>
      <div class="w-full">
        <div class="flex">
          <div class="w-600 flex-shrink-0 p-7 text-sm relative border-r border-consbtn" style="background-image: linear-gradient(-180deg, #ffffff 0%, #ffffff00 100%);">
            <img v-show="conType == 1" src="../../assets/cargoConsolidation.webp" class="absolute bottom-0 left-0 w-full object-cover" alt="">
            <img v-show="conType == 2" src="../../assets/consolidationTransportation.webp" class="absolute bottom-0 left-0 w-full object-cover" alt="">
            <div class="flex items-center z-10 relative">
              <div class="flex-shrink-0 w-40">Volume(CBM)</div>
              <input type="number" v-model="volume" @input="searchCost" min="0" class="input h-9 w-40">
            </div>
            <div class="mt-4 flex items-center z-10 relative">
              <div class="flex-shrink-0 w-40">Number of suppliers</div>
              <input type="number" v-model="suppliers" @input="searchCost" min="1" class="input h-9 w-40">
            </div>
            <div v-if="conType == 2" class="mt-4 flex items-center z-10 relative">
              <div class="flex-shrink-0 w-40">Destination</div>
              <select v-model="country" @change="searchCost" class="select h-9 w-40">
                <option v-for="(i,n) in destinationList" :key="n" :value="i.zh_cn_nickname">
                  {{ i.en_nickname }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-full bg-white p-7">
            <div class="p-2 text-xs" style="color: #327cff;background-color: #DEE9FE;">The number of suppliers refers to the number of suppliers for this consolidation, filling in the supplier's data will help you to inquire and store your goods better.(Supplier phone number/supplier information file can be uploaded as a single file)</div>
            <div class="mt-6">
              <div class="flex items-end">
                <div class="flex-shrink-0 w-64">
                  <div class="text-sm">Supplier Tel.</div>
                  <div class="text-xs">(You can fill in more than one)</div>
                </div>
                <input v-model="supplierTel" type="text" class="input text-sm" 
                  placeholder="Please enter supplier information">
              </div>
            </div>
            <div class="mt-4">
              <div class="text-sm">Supplier Information Document</div>
              <div class="mt-2 w-576 p-3 border border-dashed border-gray-200 rounded-md flex justify-center items-center cursor-pointer bg-gray-100 hover:bg-gray-200">
                <svg t="1712541226553" class="icon mr-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6111" width="24" height="24"><path d="M0 472.615385l1024 0 0 78.769231L0 551.384615 0 472.615385z" fill="#B7B7B7" p-id="6112"></path><path d="M472.615385 0l78.769231 0 0 1024-78.769231 0L472.615385 0z" fill="#B7B7B7" p-id="6113"></path></svg>
                <div>Uploading files</div>
              </div>
            </div>
            <div class="mt-3 flex">
              <div class="py-1 px-6 rounded-md font-semibold text-xs" style="color: #ff9b53;border: 2px solid #ff9b53;">L1 Member Price</div>
            </div>
            <div class="mt-3 font-semibold text-lg" style="color: #ff9b53;">${{ disCost }}</div>
            <button @click="BookingCons"
              class="mt-3 w-72 py-2 rounded bg-blueBtn text-white border border-blueBtn">Booking</button>
          </div>
        </div>
        <div class="mt-8 py-9 px-12 text-center bg-white">
          <div class="text-3xl font-semibold">Consolidation Warehousing Process</div>
          <div class="mt-20 flex justify-between items-center leading-tight">
            <div class="w-44 flex flex-col items-center">
              <img src="../../assets/process1.png" class="w-24 mb-4" alt="">
              <div class="">Pick up from multiple suppliers</div>
            </div>
            <img src="../../assets/conArrow.svg" class="w-44" alt="">
            <div class="w-44 flex flex-col items-center">
              <img src="../../assets/process2.png" class="w-24 mb-4" alt="">
              <div class="">Let the goods into our warehouse</div>
            </div>
            <img src="../../assets/conArrow.svg" class="w-44" alt="">
            <div class="w-44 flex flex-col items-center">
              <img src="../../assets/process3.png" class="w-24 mb-4" alt="">
              <div class="">Get cargo prepared(labelled, repacked, etc.)</div>
            </div>
            <div class="relative">
              <div class="absolute -top-8">outbound from warehouse</div>
              <img src="../../assets/conArrow.svg" class="w-44" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getConsolidation,
    getConsolidations,
    shipFromTo
  } from '@/api/shippingCost'
  export default {
    data() {
      return {
        conType: 1,
        showMsg: false,
        supplierTel: '',
        volume: null,
        suppliers: null,
        country: '澳大利亚',
        disCost: 'N/A',
        destinationList: [],
      }
    },
    created() {
      this.$emit('menu', 'consolidation')
    },
    mounted() {
      shipFromTo().then((res)=>{
        this.destinationList = res.data.endCountry
      })
    },
    methods: {
      searchCost(){
        if(this.conType == 1){
          getConsolidation({
            volume: this.volume,
            suppliers: this.suppliers,
          }).then((res)=>{
            if(res.data.price){
              this.disCost = res.data.price
            }else{
              this.disCost = 'N/A'
            }
          })
        }else{
          getConsolidations({
            volume: this.volume,
            suppliers: this.suppliers,
            end_country_c: this.country,
          }).then((res)=>{
            if(res.data.price){
              this.disCost = res.data.price
            }else{
              this.disCost = 'N/A'
            }
          })
        }
      },
      setType(type){
        if(type == 1){
          this.conType = 1
        }else{
          this.conType = 2
        }
        this.searchCost()
      },
      openModal(){
        this.$refs.mask.style = 'display:block;'
        this.$refs.priceModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.priceModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.priceModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.serviceModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.successModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      BookingCons(){
        if(this.supplierTel == ''){
          this.openMsg()
        }else{
          this.$refs.mask.style = 'display:block;'
          this.$refs.serviceModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.serviceModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
      },
      openMsg(){
        this.showMsg = true
        setTimeout(()=> {
          this.showMsg = false
        },2000)
      },
      focusBooking(){
        this.$refs.consPage.scrollTop = 300
      },
      confirmBooking(){
        this.$refs.serviceModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.successModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      }
    }
  }
</script>

<style lang="postcss" scoped>
.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.msgModal {
  @apply fixed z-50 top-1/2 right-1/3 py-4 px-8 text-white text-center w-full max-w-416 text-sm rounded-lg;
  background-color: #000000ab;
}

.triangle{
  position: absolute;
  right: -24px;
  top: 0;
  /* z-index: -10; */
  width: 0px;
  height: 0px;
  border-top: 40px solid transparent;
  border-right: 0px solid transparent;
  border-bottom: 0px solid transparent;
}

table th,td{
  @apply py-1.5 px-3;
}

table tbody tr {
  @apply hover:bg-gray-200 ;
}
</style>