<template>
  <div class="w-full h-full p-2 sm:p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="successModal" class="modal w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div class="p-6 flex flex-col items-center">
        <svg t="1676519430153" class="icon mb-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5034" width="70" height="70"><path d="M512 32C246.4 32 32 249.6 32 512s217.6 480 480 480 480-217.6 480-480S774.4 32 512 32z m268.8 380.8L496 697.6c-25.6 25.6-60.8 25.6-83.2 0L243.2 528c-25.6-25.6-25.6-60.8 0-83.2s60.8-25.6 83.2 0l128 128 240-240c25.6-25.6 60.8-25.6 83.2 0 25.6 19.2 25.6 54.4 3.2 80z" p-id="5035" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#75bb43"></path></svg>
        <div class="mb-3 text-lg">Reservation Success</div>
        <div class="text-center text-sm">Your request has been received, waiting for the account manager to contact you</div>
        <div class="flex justify-center pt-8">
          <router-link :to="{path:'/order/forwardingOrder/'+toShippingOrder,query:{boxType:'ptp'}}">
            <button class="btn">Confirm</button>
          </router-link>
        </div>
      </div>
    </div> 

    <div class="h-full overflow-auto">
      <div class="main1 mb-32 max-w-1440 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="bg-white dark:bg-darkMenu mb-4 py-4 px-6 grid grid-cols-9 gap-4 rounded-md shadow-default">
          <div class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-orange rounded-full"></div>
              <div class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Booking</div>
              <div class="text-sm">Fill in the request information</div>
            </div>
          </div>
          <div class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col text-gray-300">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
              <div class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Load Cargo</div>
              <div class="text-sm">Waiting for goods to load</div>
            </div>
          </div>
          <div class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col text-gray-300">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
              <div class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Payment</div>
              <div class="text-sm">Waiting for payment</div>
            </div>
          </div>
          <div class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col text-gray-300">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
              <div class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Shipped</div>
              <div class="text-sm">Cargo tracking</div>
            </div>
          </div>
          <div class="col-span-9 sm:col-span-1 flex flex-row sm:flex-col text-gray-300">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Delivered</div>
              <!-- <div class="text-sm">Delivered</div> -->
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-darkMenu shadow-default rounded-md p-6">
          <div class="py-6 border-b dark:border-darkLine flex flex-wrap">
            <div class="w-full md:w-1/4 flex items-center">
              <img :src="ptpList.img" class="w-16 h-16 rounded-full" alt="">
              <div class="ml-2">{{ptpList.company}}</div>
            </div>
            <div class="mt-3 mb-4 w-full md:w-1/2 flex items-center text-center">
              <div class="flex-shrink-0">
                <div class="text-base sm:text-lg font-medium">{{ptpList.start_port}}</div>
                <div class="sm:text-base">{{ptpList.start_country}}</div>
              </div>
              <div class="w-full px-3 text-gray-400 relative">
                <div class="border-b border-gray-400">{{ptpList.voyage}}</div>
                <div>{{transshipmentList[ ptpList.line - 1 ]}}</div>
                <svg t="1673504216656" class="icon absolute top-3 right-1.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4017" width="17" height="17"><path d="M704.7168 509.5424L279.074133 83.899733a25.6 25.6 0 1 1 36.181334-36.181333l443.733333 443.733333a25.6 25.6 0 0 1 0 36.181334l-443.733333 443.733333a25.6 25.6 0 1 1-36.181334-36.181333l425.642667-425.642667z" fill="#9ca3af" p-id="4018"></path></svg>
              </div>
              <div class="flex-shrink-0">
                <div class="text-base sm:text-lg font-medium">{{ptpList.end_port}}</div>
                <div class="sm:text-base">{{ptpList.end_country}}</div>
              </div>
            </div>
            <div class="w-full md:w-1/4 text-xs flex justify-end">
              <div>
                <div class="flex">
                  <div>Expiration date:</div>
                  <div class="pl-3">{{ptpList.expiration_date}}</div>
                </div>
                <div class="flex">
                  <div>Line:</div>
                  <div class="pl-3">{{ptpList.sea_line_name}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5">
            <div class="mb-6 flex flex-wrap items-center">
              <div class="text-base mr-4">Select Container Type and Container Quantity</div>
              <div v-show="upQuantity" class="text-xs text-red-500">(Select a box type, so that we can calculate the price)</div>
            </div>
            <div class="grid grid-cols-9 gap-5">
              <div class="col-span-2 w-4/5">
                <label class="mb-1 flex flex-wrap">
                  <div class="mr-4">20'GP</div>
                  <div v-show="form.gp20>0">Unit price USD{{ptpList.super_gp20}}</div>
                </label>
                <div class="flex">
                  <div @click="subgp" class="leftbtn">
                    <svg t="1673590255287" class="icon mx-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8043" width="16" height="16"><path d="M170.666667 469.333333h682.666666v85.333334H170.666667z" fill="#7a7a7a" p-id="8044"></path></svg>
                  </div>
                  <input @blur="checkgp" v-model="form.gp20" type="number" class="input h-11 text-center rounded-none">
                  <div @click="addgp" class="rightbtn">
                    <svg t="1673590790959" class="icon mx-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8547" width="16" height="16"><path d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z" fill="#7a7a7a" p-id="8548"></path></svg>
                  </div>
                </div>
              </div>
              <div class="col-span-2 w-4/5">
                <label class="mb-1 flex flex-wrap">
                  <div class="mr-4">40'GP</div>
                  <div v-show="form.gp40>0">Unit price USD{{ptpList.super_gp40}}</div>
                </label>
                <div class="flex">
                  <div @click="subgps" class="leftbtn">
                    <svg t="1673590255287" class="icon mx-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8043" width="16" height="16"><path d="M170.666667 469.333333h682.666666v85.333334H170.666667z" fill="#7a7a7a" p-id="8044"></path></svg>
                  </div>
                  <input @blur="checkgps" v-model="form.gp40" type="number" class="input h-11 text-center rounded-none">
                  <div @click="addgps" class="rightbtn">
                    <svg t="1673590790959" class="icon mx-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8547" width="16" height="16"><path d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z" fill="#7a7a7a" p-id="8548"></path></svg>
                  </div>
                </div>
              </div>
              <div class="col-span-2 w-4/5">
                <label class="mb-1 flex flex-wrap">
                  <div class="mr-4">40'HQ</div>
                  <div v-show="form.hq40>0">Unit price USD{{ptpList.super_hq40}}</div>
                </label>
                <div class="flex">
                  <div @click="subhq" class="leftbtn">
                    <svg t="1673590255287" class="icon mx-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8043" width="16" height="16"><path d="M170.666667 469.333333h682.666666v85.333334H170.666667z" fill="#7a7a7a" p-id="8044"></path></svg>
                  </div>
                  <input @blur="checkhq" v-model="form.hq40" type="number" class="input h-11 text-center rounded-none">
                  <div @click="addhq" class="rightbtn">
                    <svg t="1673590790959" class="icon mx-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8547" width="16" height="16"><path d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z" fill="#7a7a7a" p-id="8548"></path></svg>
                  </div>
                </div>
              </div>
              <div class="col-span-2 w-4/5">
                <label class="mb-1 flex flex-wrap">
                  <div class="mr-4">45'HQ</div>
                  <div v-show="form.hq45>0">Unit price USD{{ptpList.super_hq45}}</div>
                </label>
                <div class="flex">
                  <div @click="subhqs" class="leftbtn">
                    <svg t="1673590255287" class="icon mx-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8043" width="16" height="16"><path d="M170.666667 469.333333h682.666666v85.333334H170.666667z" fill="#7a7a7a" p-id="8044"></path></svg>
                  </div>
                  <input @blur="checkhqs" v-model="form.hq45" type="number" class="input h-11 text-center rounded-none">
                  <div @click="addhqs" class="rightbtn">
                    <svg t="1673590790959" class="icon mx-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8547" width="16" height="16"><path d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z" fill="#7a7a7a" p-id="8548"></path></svg>
                  </div>
                </div>
              </div>

              <div class="col-span-2">
                <div class="mb-1">
                  <span class="text-red-500">*</span>
                  Type of goods
                </div>
                <div>
                  <select v-model="form.product_type" name="goodsType" class="select h-11">
                    <option value="1">General cargo</option>
                    <option value="2">Special cargo</option>
                  </select>
                </div>
              </div>
              <div class="col-span-2">
                <div class="mb-1">
                  <span class="text-red-500">*</span>
                  Term of service
                </div>
                <div>
                  <select v-model="form.delivery_type" name="serviceTerm" class="select h-11">
                    <option value="1">FOB</option>
                    <option value="2">EXW</option>
                    <option value="3">FAS</option>
                    <option value="4">FCA</option>
                    <option value="5">CFR</option>
                    <option value="6">CPT</option>
                    <option value="7">CIF</option>
                    <option value="8">CIP</option>
                    <option value="9">DES</option>
                    <option value="10">DAF</option>
                    <option value="11">DEQ</option>
                    <option value="12">DDP</option>
                    <option value="13">DDU</option>
                  </select>
                </div>
              </div>
              <div class="col-span-2">
                <div class="mb-1">
                  <span class="text-red-500">*</span>
                  BILL of Lading#
                </div>
                <div>
                  <select v-model="form.issue_type" name="" class="select h-11">
                    <option value="1">OCEAN BILL OF LADING</option>
                    <option value="2">SURRENDER.TLXRLS</option>
                    <option value="3">SEA WAY BILL</option>
                    <option value="6">Destination port release</option>
                  </select>
                </div>
              </div>
              <div v-if="form.issue_type == 1" class="col-span-3">
                <div class="mb-1">
                  <span class="text-red-500">*</span>
                  Postal address
                </div>
                <div class="relative">
                  <input v-model="form.issue_address" type="text" class="input"
                    v-validate="'required|ptpaddress'" name="ptpaddress">
                  <div class="inputTips">{{errors.first("ptpaddress")}}</div>
                </div>
              </div>
              <div class="col-span-2">
                <div class="mb-1">
                  <span class="text-red-500">*</span>
                  Whether or not a pick-up is required
                </div>
                <div class="flex items-center">
                  <input v-model="isTake" @change="selectTake" type="checkbox" class="switch">
                </div>
              </div>
              <div class="col-span-2">
                <div class="mb-1">
                  <span class="text-red-500">*</span>
                  <span v-if="form.take == 1">Supplier contact number</span>
                  <span v-if="form.take == 0">Stuffing</span>
                </div>
                <div class="relative">
                  <input v-model="pickSS" type="text" class="input"
                    v-validate="'required|ptpNumber'" name="ptpNumber">
                  <div class="inputTips">{{errors.first("ptpNumber")}}</div>
                </div>
              </div>
              <!-- <div v-if="form.take == 0" class="col-span-2">
                <div class="mb-1">
                  <span class="text-red-500">*</span>
                  Stuffing
                </div>
                <div class="relative">
                  <input v-model="form.pick_address" type="text" class="input"
                    v-validate="'required|ptpStuffing'" name="ptpStuffing">
                  <div class="inputTips">{{errors.first("ptpStuffing")}}</div>
                </div>
              </div> -->
              <div class="col-span-2">
                <div class="mb-1">
                  <span class="text-red-500">*</span>
                  Delivery time
                </div>
                <div class="relative">
                  <input v-model="form.delivery_time" type="date" class="input"
                    v-validate="'required|ptpTime'" name="ptpTime">
                  <div class="inputTips">{{errors.first("ptpTime")}}</div>
                </div>
              </div>
              <div class="col-span-2">
                <div class="mb-1">Insurance Service</div>
                <div class="flex items-center">
                  <input v-model="isInsurance" @change="selectInsurance" type="checkbox" class="switch">
                </div>
              </div>
            </div>
            <div class="mt-7">
              <div class="mb-1">Upload related files(Booking Note/Other Files)</div>
              <div v-show="uploadShow" @click="upload" class="w-full h-24 p-2 border border-dashed border-inputBorder dark:border-darkLine rounded hover:bg-gray-200 flex flex-col justify-center items-center cursor-pointer">
                <input type="file"
                  style="display: none;"
                  accept="application/pdf,image/jpeg,image/png,image/jpg"
                  ref="iptFileRef"
                  @change="uploadPL" />
                <svg t="1677400710440" class="icon mb-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2779" width="25" height="25"><path d="M874.666667 469.333333H554.666667V149.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v320H149.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667h320v320c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666V554.666667h320c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667z" fill="#7a7a7a" p-id="2780"></path></svg>
                <div>Upload File</div>
              </div>
              <div v-show="!uploadShow" class="col-span-3 flex items-center">
                <svg t="1677404290219" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3871" width="22" height="22"><path d="M511.974401 0c-282.75527 0-511.974401 229.219131-511.974401 511.974401 0 282.757318 229.219131 511.974401 511.974401 511.974401 282.757318 0 511.974401-229.217083 511.974401-511.974401C1023.948803 229.219131 794.729672 0 511.974401 0zM805.63063 379.174385 474.510162 710.296901c0 0-0.004096 0.004096-0.010239 0.010239-15.265029 15.269125-38.541433 17.652877-56.31104 7.157402-3.290971-1.945503-6.393536-4.333351-9.219635-7.157402-0.002048-0.004096-0.006144-0.006144-0.006144-0.006144l-190.642884-190.642884c-18.095223-18.095223-18.095223-47.4375 0-65.536819 18.095223-18.095223 47.4375-18.095223 65.532723 0l157.884714 157.884714 298.362298-298.362298c18.097271-18.095223 47.439548-18.095223 65.534771 0C823.725854 331.738933 823.725854 361.079162 805.63063 379.174385z" fill="#75bb43" p-id="3872" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path></svg>
                <div class="mx-2">{{ order_img_name }}</div>
                <svg t="1677404339739" @click="delPL" class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6635" width="26" height="26"><path d="M691.157333 260.821333h176.938667c15.402667 0 27.904 11.904 27.904 26.538667 0 14.634667-12.501333 26.538667-27.904 26.538667h-65.066667v461.44c0 42.837333-35.413333 77.994667-79.744 77.994666H343.381333c-44.330667 0-79.744-35.157333-79.744-77.994666V313.898667H198.570667c-15.402667 0-27.904-11.904-27.904-26.538667 0-14.634667 12.501333-26.538667 27.904-26.538667h195.541333C398.933333 186.154667 464 128 542.592 128c78.677333 0 143.744 58.197333 148.565333 132.821333z m-55.978666 0c-4.778667-45.184-44.8-79.573333-92.586667-79.573333-47.701333 0-87.722667 34.389333-92.501333 79.573333h185.088z m112.042666 53.077334H319.445333v461.44c0 14.037333 10.965333 24.917333 23.893334 24.917333h379.946666c12.928 0 23.893333-10.88 23.893334-24.917333V313.898667zM412.458667 425.770667c0-14.677333 12.458667-26.538667 27.904-26.538667 15.36 0 27.861333 11.861333 27.861333 26.538667v257.536c0 14.677333-12.458667 26.538667-27.861333 26.538666-15.445333 0-27.904-11.861333-27.904-26.538666V425.813333z m185.984 0c0-14.677333 12.458667-26.538667 27.861333-26.538667 15.445333 0 27.904 11.861333 27.904 26.538667v257.536c0 14.677333-12.458667 26.538667-27.904 26.538666-15.36 0-27.861333-11.861333-27.861333-26.538666V425.813333z" fill="#7a7a7a" p-id="6636"></path></svg>
              </div>
            </div>
            <div class="mt-5">
              <div class="mb-1">Order remark</div>
              <div>
                <textarea v-model="form.remark" rows="3" class="input text-13 resize-none"></textarea>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-center">
            <button class="w-60 font-semibold border-0 text-white rounded-md bg-orange hover:bg-orange1 px-6 py-3 cursor-pointer"
              @click="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ImgUpload,
    createBox
  } from '@/api/order'
  export default {
    data() {
      return {
        ptpList: [],
        transshipmentList: ['Transit','Direct'],
        form: {
          box_id: 0,
          product_type: 1,
          gp20: 0,
          gp40: 0,
          hq40: 0,
          hq45: 0,
          delivery_type: 1,
          issue_type: 1,
          issue_address: '',
          delivery_time: '',
          take: 1,
          take_vendor_tel: '',
          pick_address: '',
          booking_space: {},
          remark: '',
          customer_manage: '',
          insurance: 0
        },
        isTake: true,
        isInsurance: false,
        uploadShow: true,
        order_img_name: '',
        order_img_url: '',
        pickSS: '',
        upQuantity: false,
        toShippingOrder: null,
      }
    },
    created() {
      this.$emit('menu', 'FCLprice')
    },
    mounted() {
      this.ptpList = JSON.parse(this.$route.params.list)
      this.form.box_id = this.ptpList.id
      let manage = JSON.parse(localStorage.getItem('customer_manage'))
      this.form.customer_manage = manage.id
      // console.log(this.ptpList);
    },
    methods:{
      subgp(){
        let num = Number(this.form.gp20)
        if(num>0){
          this.form.gp20 = (num - 1)
        }
      },
      addgp(){
        let num = Number(this.form.gp20)
        this.form.gp20 = (num + 1)
      },
      checkgp(){
        let num = Math.ceil(Number(this.form.gp20))
        if(num>0){
          this.form.gp20 = num
        }else{
          this.form.gp20 = 0
        }
      },
      subgps(){
        let num = Number(this.form.gp40)
        if(num>0){
          this.form.gp40 = (num - 1)
        }
      },
      addgps(){
        let num = Number(this.form.gp40)
        this.form.gp40 = (num + 1)
      },
      checkgps(){
        let num = Math.ceil(Number(this.form.gp40))
        if(num>0){
          this.form.gp40 = num
        }else{
          this.form.gp40 = 0
        }
      },
      subhq(){
        let num = Number(this.form.hq40)
        if(num>0){
          this.form.hq40 = (num - 1)
        }
      },
      addhq(){
        let num = Number(this.form.hq40)
        this.form.hq40 = (num + 1)
      },
      checkhq(){
        let num = Math.ceil(Number(this.form.hq40))
        if(num>0){
          this.form.hq40 = num
        }else{
          this.form.hq40 = 0
        }
      },
      subhqs(){
        let num = Number(this.form.hq45)
        if(num>0){
          this.form.hq45 = (num - 1)
        }
      },
      addhqs(){
        let num = Number(this.form.hq45)
        this.form.hq45 = (num + 1)
      },
      checkhqs(){
        let num = Math.ceil(Number(this.form.hq45))
        if(num>0){
          this.form.hq45 = num
        }else{
          this.form.hq45 = 0
        }
      },
      upload() {
        this.$refs.iptFileRef.click()
      },
      uploadPL(e){
        const files = e.target.files[0]
        let data = new FormData()
        data.append('file', files);
        ImgUpload(data).then((res)=>{
          if( res.code == 0 ){
            this.form.booking_space = {
              file: res.data.file,
              name: res.data.name
            }
            this.order_img_url = res.data.file
            this.order_img_name = res.data.name
            this.uploadShow = false
          }
        })
      },
      delPL(){
        this.$refs.iptFileRef.value = ''
        this.form.booking_space = {}
        this.order_img_url = ''
        this.order_img_name = ''
        this.uploadShow = true
      },
      selectTake(){
        if(this.isTake){
          this.form.take = 1
        } else {
          this.form.take = 0
        }
      },
      selectInsurance(){
        if(this.isInsurance){
          this.form.insurance = 1
        } else {
          this.form.insurance = 0
        }
      },
      async submit(){
        const success = await this.$validator.validateAll()
        if(this.form.gp20==0&&this.form.gp40==0&&this.form.hq40==0&&this.form.hq45==0){
          this.upQuantity = true
        }else{
          this.upQuantity = false
        }
        if(success && !this.upQuantity){
          if(this.isTake){
            this.form.take_vendor_tel = this.pickSS
          }else{
            this.form.pick_address = this.pickSS
          }
          // console.log(this.form);
          createBox(this.form).then((res) =>{
            if(res.code == 0){
              this.toShippingOrder = res.data
              this.$refs.mask.style = 'display:block;'
              this.$refs.successModal.style = 'display:block;'
              setTimeout(()=> {
                this.$refs.mask.style = 'display:block;opacity:1;'
                this.$refs.successModal.style =
                  'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
              },1)
              setTimeout(()=>{
                this.$router.push({
                  path: '/order/forwardingOrder/'+ res.data,
                  query: {
                    boxType: 'ptp'
                  }
                })
              },10000)
            }
          })
        }
      },
    }
  }
</script>

<style lang="postcss" scoped>
th,td{
  @apply py-2 text-13 sm:text-sm;
}

tr{
  @apply border-b border-gray-200 dark:border-darkLine hover:bg-gray-200 dark:hover:bg-darkLine
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type="number"]{
    -moz-appearance: textfield;
}

.leftbtn{
  @apply flex-shrink-0 flex justify-center items-center border-l border-t border-b border-inputBorder dark:border-darkLine rounded-tl rounded-bl cursor-pointer hover:bg-gray-200 select-none;
}

.rightbtn{
  @apply flex-shrink-0 flex justify-center items-center border-r border-t border-b border-inputBorder dark:border-darkLine rounded-tr rounded-br cursor-pointer hover:bg-gray-200 select-none;
}

.switch {
  @apply appearance-none w-16 h-8 relative rounded-2xl cursor-pointer bg-gray-200;
}

.switch:before {
  @apply absolute w-7 h-7 bg-white shadow-sm left-0.5 top-0.5 rounded-full origin-left duration-300 ease-out;
  content: "";
}

.switch:after {
  @apply inline-block whitespace-nowrap text-white font-bold;
  text-indent: 12px;
  word-spacing: 4px;
  font: 14px/30px monospace;
}

.switch:checked {
  background-color: #FF7602;
}

.switch:checked:before {
  left: 34px;
}

.switch:checked:after {
  @apply text-black;
}

.inputTips {
  @apply -bottom-4 left-0 text-xs text-red-500 absolute;
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
  @apply w-28 font-semibold border-0 text-white rounded bg-orange hover:bg-orange1 px-6 py-2.5 cursor-pointer;
}
</style>
