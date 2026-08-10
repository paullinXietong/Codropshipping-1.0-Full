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
    <div ref="freightModal" class="modal p-5 w-700 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine pb-3">
        <div class="text-xl">Select Shipping Service</div>
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="my-2">
        <div ref="freightscroll" class="shippingfreight">
          <div v-for="(item,n) in freight_info" :key="n" @click="selectTran = item.vendor_code"
            class="border rounded-md p-4 mt-3 flex justify-between cursor-pointer hover:bg-gray-200"
            :class="selectTran==item.vendor_code?'border-black':'border-gray-300'">
            <div class="flex-1">
              <div>
                {{item.product_name_e}}
              </div>
              <div>
                Transit time: Est. {{item.aging_start}} ~ {{item.aging_end}} days
              </div>
            </div>
            <div v-if="item.freight == '0.00'">Free Shipping</div>
            <div v-else>${{item.freight}}</div>
          </div>
        </div>
        <!-- <div class="px-1 flex justify-end">
          <div v-show="!moreFreight" @click="moreFreight = true" class="cursor-pointer underline">More</div>
        </div> -->
      </div>
      <div class="flex justify-center">
        <button @click="confirmTrans" class="bg-orange py-2 px-6 rounded-3xl text-white cursor-pointer">Apply</button>
      </div>
    </div>

    <div ref="couponModal" class="modal p-5 w-576  opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-1">
        <div class="text-xl">Coupon</div>
        <svg @click="closeCouponModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="20" height="20"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class=" px-5 py-3">
        
          <div v-for="(item,index) in coupon_list" :key="index" style="color: #FF7600;"
            class="col-span-12 sm:col-span-6 md:col-span-4 2xl:col-span-3 shadow-default bg-white"
            :class="{ 'opacity-50 grayscale cursor-not-allowed': couponUnavailable(item) }"
            @click="selectCoupon(item)">
            <div class="pt-3 px-5 pb-5 relative">
              <div class="flex justify-between">
                <div>
                  <div class="text-xl font-semibold">${{ item.type_value }}</div>
                  <div class="text-xs" style="color: #FCB78F;">For orders over ${{ item.min_price }}</div>
                </div>
                <div class="text-13">
                  <img src="@/assets/icon/select1.png" v-if="couponId==item.id && !couponUnavailable(item)" class="w-6 h-6 " alt="">
                  <div v-else class="w-6 h-6 rounded-xl border border-gray-400 "></div>
                </div>
              </div>
              <div class="border-r border-gray-300 dark:border-gray-900 absolute rounded-full"
                style="left: -9px;bottom: -9px;width: 17px;height: 17px;transition: all 0.5s;background-color: #F3F4F8;">
              </div>
              <div class="border-l border-gray-300 dark:border-gray-900 absolute rounded-full"
                style="right: -9px;bottom: -9px;width: 17px;height: 17px;transition: all 0.5s;background-color: #F3F4F8;">
              </div>
            </div>
            <div class="pt-2.5 px-5 pb-2 text-xs border-t border-dashed border-orange" style="background-color: #FFF2EA;">
              <div class="flex justify-between items-center">
                <div>
                  <div>{{ item.end_time }}</div>
                </div>
                <div>
                  <div class="py-1 px-3 text-13 rounded-full bg-white" style="border: 1px solid #FF7600;">
                    {{ couponUnavailable(item) ? couponUnavailableReason(item) : 'Waiting to use' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div v-show="coupon_list.length==0" class="text-center">
            No coupons available
          </div>
    </div>

    <!-- <div class="absolute bottom-0 z-10" style="width: calc(100% - 40px);">
      <div class="bg-white p-4 w-full shadow-default border rounded-t flex items-center justify-between text-sm">
        123
      </div>
    </div> -->

    <div v-show="preLoad" class="absolute bottom-0 z-10" style="width: calc(100% - 40px);">
      <div class="bg-white p-4 w-full shadow-default border rounded-t flex items-center justify-end text-sm">
        <div class="flex flex-col items-end mr-10">
          <div class="text-lg font-bold" style="color: #d10000;">Amounts Due: ${{couponId!=''?subtractWithPrecision(totalCost,couponFee):totalCost}}</div>
          <div style="color: #787878;">The order amount is based on the submitted order.</div>
        </div>
        <button @click="confirmOrder" v-show="!showLoading" class="btn">{{confirmText}}</button>
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

      <div class="py-4 px-3 text-xl font-semibold bg-white">Submit Your Order</div>

      <div class="mt-4 mx-auto flex justify-between" style="max-width: 1200px;">
        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="steps bg-oranges">1</div>
          <div>Select Order</div>
        </div>
        <div class="w-full bg-gray-300 h-0.5 mt-3"></div>
        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="steps bg-gray-300">2</div>
          <div>Pay For Products Fee</div>
        </div>
        <div class="w-full bg-gray-300 h-0.5 mt-3"></div>
        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="steps bg-gray-300">3</div>
          <div>Pay For International Delivery Fee</div>
        </div>
        <div class="w-full bg-gray-300 h-0.5 mt-3"></div>
        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="steps bg-gray-300">4</div>
          <div>Delivery</div>
        </div>
      </div>

      <!-- <div class="mt-4 p-4 rounded-md shadow-default bg-white">
        <div>Co-logistics shipping or not</div>
        <div class="mt-2 flex select-none">
          <label class="flex items-center cursor-pointer mr-8">
            <input @change="chooseTrans" v-model="productInfo.is_freight_agency" type="radio" value="1" class="mr-1.5 cursor-pointer">
            <div>Yes</div>
          </label>
          <label class="flex items-center cursor-pointer">
            <input @change="chooseTrans" v-model="productInfo.is_freight_agency" type="radio" value="2" class="mr-1.5 cursor-pointer">
            <div>No</div>
          </label>
        </div>
      </div> -->

      <div class="mt-4 p-4 rounded-md shadow-default bg-white">
        <div class="flex items-center">
          <div>Shipping to:</div>
          <button v-show="addList.length==0" @click="selectAddress" class="ml-5 py-1 px-4 rounded-md bg-orange hover:bg-orange1 text-white">Add address</button>
        </div>
        <div v-if="addList.length>0" class="mt-3 flex flex-wrap text-sm">
          <div class="mb-3 mr-4">{{chooseAddress.full_name}}, Tel:{{chooseAddress.tel}}, {{chooseAddress.address_one}}, {{chooseAddress.city}}, {{chooseAddress.area}}, {{chooseAddress.country_name}}</div>
          <div @click="selectAddress" class="flex-shrink-0 text-blue-400 cursor-pointer hover:underline">Change address(Input recipient name)</div>
        </div>
      </div>

      <div class="mt-4 p-4 rounded-md shadow-default bg-white grid grid-cols-12 gap-4">
        <div class="col-span-12 pb-4 border-b text-xl">Check And Confirm Your Order</div>
        <div class="col-span-12">
          <div class="flex text-sm bg-gray-100 p-2">
            <div class="w-20 flex-shrink-0">Product</div>
            <div class="pl-2 w-full grid grid-cols-3 gap-3 ">
              <div class="col-span-1">Unit Price(USD)</div>
              <div class="col-span-1 text-center">Qty</div>
              <div class="col-span-1 text-right">Total(USD)</div>
            </div>
          </div>
          <div v-for="(i,n) in list" :key="n" class="border-b py-4">
            <div v-for="(it,nt) in i.order_info.goods_list" :key="nt+it.goods_id" class="bg-white p-2">
              <div class="flex items-center">
                <div class="mr-5">Order {{ n+1 }}</div>
                <div v-show="it.source==4 || it.source==5" class="flex items-center">
                  <img src="@/assets/alibaba.png" class="h-8 mr-2" alt="">
                  {{ it.delivery_area_code_en }} Product
                </div>
                <div v-show="it.source<4" class="flex items-center">
                  <img src="@/assets/1688.png" class="w-8 h-8 mr-2" alt="">
                  1688 Agent
                </div>
              </div>
              <!-- <div class="flex">
                <img :src="it.image" class="mr-4 flex-shrink-0 w-20 h-20 rounded-md" alt="">
                <div class="w-full text-sm">
                  <div class="mb-3">{{it.subject}}</div>
                  <div class="flex justify-between">
                    <div class="flex">
                      <div class="mr-7">sku type: {{it.product_type_num}}</div>
                      <div>qty: {{it.product_num}}</div>
                    </div>
                    <div class="font-semibold" style="color: #d10000;">${{it.total_price_us}}</div>
                  </div>
                </div>
              </div> -->
              <div v-for="(ix,nx) in it.sku_info" :key="nx" class="mt-3 text-sm">
                <div class="flex">
                  <img :src="ix.image" class="flex-shrink-0 w-20 h-20 rounded-md" alt="">
                  <div class="flex-1 text-sm pl-2" style="width: calc(100% - 5rem);">
                    <div class="mb-1 no-wrap">{{it.subject}}</div>
                    <div class="mb-1 w-full flex">
                      <div class="p-1 bg-gray-50 no-wrap text-gray-500">{{ix.sku_name}}</div>
                    </div>
                    <div class="grid grid-cols-3">
                      <div class="col-span-1 text-base">${{ix.price_us}}</div>
                      <div class="col-span-1 flex items-center justify-center text-gray-500">
                        <i class="el-icon-close"></i>{{ix.num}}
                      </div>
                      <div class="col-span-1 flex items-center justify-end text-red-500 text-base">${{ix.total_price_us}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div v-for="(ix,nx) in it.sku_info" :key="nx" class="mt-3 grid grid-cols-9 gap-3 text-sm">
                <div class="col-span-3 flex items-center">
                  <div class="w-full bg-gray-50 p-2">{{ix.sku_name}}</div>
                </div>
                <div class="col-span-2 flex items-center justify-center">{{ix.num}}</div>
                <div class="col-span-2 flex items-center justify-center">{{ix.price_us}}</div>
                <div class="col-span-2 flex items-center justify-end">{{ix.total_price_us}}</div>
              </div> -->
            </div>
            <div v-if="i.order_info.freight_info.length>0" class="p-3">
              <div>International Logistics:</div>
              <div class="flex">
                <div class="p-2 border rounded">
                  <div class="flex ">
                    <div class="font-semibold">
                      {{i.order_info.default_freight.product_name_e}}
                    </div>
                    <div class="ml-7 mr-3 cursor-pointer decoration-black underline"
                      @click="changeFreight(i.order_info.freight_info, i.order_info.default_freight, i.cart_id)">
                      Change
                    </div>
                  </div>
                  <div class="shipping-fee text-sm">Shipping fee: ${{i.order_info.default_freight.freight}}</div>
                  <div class="shipping-date text-sm">Transit time: Est. {{i.order_info.default_freight.aging_start}}~{{i.order_info.default_freight.aging_end}} days</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-6">
          <div class="mb-2">Remark:</div>
          <div>
            <textarea v-model="remark" rows="2" class="input resize-none" placeholder="Leave a message for your agent if you have special purchasing requirements."></textarea>
          </div>
        </div>

        <div class="col-span-6">
          <!-- <div class="py-1 px-3 rounded-lg border border-oranges text-orange text-sm" style="background-color: #ffe4b2;">The freight rate is generated by AI</div> -->
          <div class="mt-4 p-4 rounded-lg border">
            <div class="flex justify-between">
              <div>Product Price</div>
              <div>${{orderPrice.total_price_us}}</div>
            </div>
            <div class="mt-3 flex justify-between">
              <div>Procurement Cost</div>
              <div>${{orderPrice.total_purchase_fee}}</div>
            </div>
            <div class="mt-3 flex justify-between">
              <div>International Logistics</div>
              <div>{{orderPrice.total_shipping_fee>0?'$'+orderPrice.total_shipping_fee:'Calculation after arrival in warehouse'}}</div>
            </div>
            <!-- <div v-if="productInfo.source == 5 && list.taxes>0" class="mt-3 flex justify-between">
              <div>Tax Fee</div>
              <div>${{list.taxes}}</div>
            </div> -->
            <div class="mt-3 flex justify-between" @click="showCouponModal">
              <div>Coupon</div>
              <div v-show="coupon_list.length>0" class="flex">
                <div class="text-white bg-red-600 rounded px-2 " v-if="couponId==''">{{coupon_list.length}} available</div>
                <div class="text-red-500 " v-else>-${{couponFee}} </div>    
                <span style="color: grey;" class="ml-1 ">></span>
              </div>
            </div>

            <!-- <div v-if="productInfo.source==4 || productInfo.source==5" class="mt-3 pt-3 border-t">
              <div class="flex justify-between">
                <div>Shipping Costs</div>
                <div v-if="productInfo.source!=5">{{fright_cost>0?'$'+fright_cost:'Free'}}</div>
              </div>
              <div v-if="productInfo.source==5&&freight_info.length>0" class="mt-1 w-full bg-gray-200 p-2 rounded">
                <div class="flex justify-between">
                  <div class="font-semibold">
                    {{freight_info[actionFre].product_name_e}}
                  </div>
                  <div class="cursor-pointer decoration-black underline" @click="changeFreight">
                    Change
                  </div>
                </div>
                <div v-if="freight_info[actionFre].freight>0" class="shipping-fee text-sm">Shipping fee: ${{freight_info[actionFre].freight}}</div>
                <div v-else class="shipping-fee text-sm">Shipping fee: Free</div>
                <div class="shipping-date text-sm">Transit time: Est. {{freight_info[actionFre].aging_start}} ~ {{freight_info[actionFre].aging_end}} days</div>
              </div>
            </div> -->

            <!-- 选择运输方式，计算运费 -->
            <!-- <div v-if="freightList.length==0" class="mt-3 pt-3 border-t flex justify-between">
              <div>Shipping Costs</div>
              <div>--</div>
            </div> -->
            <!-- <div v-if="freightList.length>0" class="mt-3 pt-3 border-t">
              <div class="flex justify-between">
                <div>Shipping Costs</div>
                <div>${{freightList[logisNum].freight}}</div>
              </div>
              <div class="mt-3 flex items-center">
                <div class="mr-8">Shipment</div>
                <div>
                  <select v-model="logisNum" @change="chooseLogis" class="select h-9 p-1.5">
                    <option v-for="(i,n) in freightList" :key="n" :value="n">{{i.product_name_e}}</option>
                  </select>
                </div>
              </div>
              <div class="mt-3">Delivery expected in {{freightList[logisNum].aging_start}} working days</div>
            </div> -->
            <div class="mt-3 pt-3 border-t flex justify-between">
              <div>Total Cost</div>
              <div class="font-semibold" style="color: #d10000;">${{couponId!=''?subtractWithPrecision(totalCost,couponFee):totalCost}}</div>
            </div>
          </div>
        </div>

        <div class="mt-5 col-span-12">
          <div class="flex justify-between">
            <div class="pb-4 text-xl">International Delivery Fee Estimate</div>
            <router-link :to="{ name: 'shippingList' }" target="_blank" class="flex items-center hover:underline">
              <svg t="1761813196913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5837" width="20" height="20"><path d="M532.523781 653.790711h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255524v40.514118c0 11.184923 9.068552 20.255523 20.255524 20.255524h40.51207c11.186971 0 20.255523-9.0706 20.255524-20.255524V674.047259c0.001024-11.185947-9.067528-20.256547-20.255524-20.256548z m0-141.790711h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255523v40.512071c0 11.186971 9.068552 20.257571 20.255524 20.257571h40.51207c11.186971 0 20.255523-9.0706 20.255524-20.257571v-40.512071c0.001024-11.184923-9.067528-20.255523-20.255524-20.255523z m-182.302782 0h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255523v40.512071c0 11.186971 9.068552 20.257571 20.255524 20.257571h40.51207c11.184923 0 20.255523-9.0706 20.255524-20.257571v-40.512071c0-11.184923-9.0706-20.255523-20.255524-20.255523z m425.373158-384.862111H248.941335c-44.748908 0-81.023117 36.276257-81.023118 81.025165v607.674916c0 44.748908 36.274209 81.023117 81.023118 81.023118h526.652822c44.74686 0 81.023117-36.274209 81.023118-81.023118V208.164078c0.001024-44.749932-36.275233-81.026189-81.023118-81.026189z m40.512071 688.702129c0 22.374966-18.137105 40.512071-40.512071 40.512071H248.941335c-22.374966 0-40.512071-18.137105-40.512071-40.512071v-607.67594c0-22.374966 18.137105-40.512071 40.512071-40.512071h526.652822c22.374966 0 40.512071 18.137105 40.512071 40.512071v607.67594zM350.220999 653.790711h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255524v40.514118c0 11.184923 9.068552 20.255523 20.255524 20.255524h40.51207c11.184923 0 20.255523-9.0706 20.255524-20.255524V674.047259c0-11.185947-9.0706-20.256547-20.255524-20.256548z m364.605564-141.790711h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255523v40.512071c0 11.186971 9.068552 20.257571 20.255524 20.257571h40.51207c11.186971 0 20.255523-9.0706 20.255524-20.257571v-40.512071c0.001024-11.184923-9.067528-20.255523-20.255524-20.255523z m-20.255523-263.326923h-364.605564c-22.374966 0-40.512071 18.139152-40.512071 40.51207v81.025165c0 22.374966 18.137105 40.510023 40.512071 40.510023h364.605564c22.372918 0 40.512071-18.135057 40.512071-40.510023v-81.025165c0-22.372918-18.139152-40.512071-40.512071-40.51207z m0 121.537235h-364.605564v-81.023117h364.605564v81.023117z m20.255523 283.580399h-40.51207c-11.186971 0-20.255523 9.0706-20.255524 20.255524v40.514118c0 11.184923 9.068552 20.255523 20.255524 20.255524h40.51207c11.186971 0 20.255523-9.0706 20.255524-20.255524V674.047259c0.001024-11.185947-9.067528-20.256547-20.255524-20.256548z" fill="#8a8a8a" p-id="5838"></path></svg>
              International Shipping Calculator
            </router-link>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <div v-for="(i,n) in freightEstimate" class="col-span-1 p-3 border rounded">
              <div class="flex items-center">
                <img :src="i.product_img" class="w-12 h-12 rounded-full mr-3" alt="">
                <div>{{i.product_name_e}}</div>
              </div>
              <div class="py-1.5">{{i.aging_start}}-{{i.aging_end}} Business Days</div>
              <div class="text-red-500 font-semibold">US$ {{i.super_freight}}</div>
            </div>
          </div>
        </div>

        <div class="mt-5 p-2 col-span-12 border rounded">
          <div class="flex justify-between">
            <div class="pb-4 text-base">International Delivery</div>
            <div>
              Product Weight Estimate: {{orderPrice.total_weight}}kg
            </div>
          </div>
          <div class="text-sm text-right text-oranges">The Specific Logistics Fee Is Subject to the Weighing of the Package to the Warehouse.</div>
        </div>

        <label class="mt-3 col-span-12 flex items-center justify-end">
          <input type="checkbox" v-model="co_disclaimer" class="mr-2 w-4 h-4">
          <div class="select-none">I have read and agreed to</div> <a
            class="px-1 underline cursor-pointer text-oranges"
            :href="'https://codropshipping.com/Disclaimer of Liability.html'"
            target="_blank"
          >Disclaimer of Liability</a>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectCountry from '@/components/SelectCountry'
  import SelectCity from '@/components/SelectCity'
  import VueCountryIntl from 'vue-country-intl'
  import 'vue-country-intl/lib/vue-country-intl.css'
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
    getCart,
    getRate,
    orderInfo,
    orderCreate,
    getLogisPrice,
    getFreightList,
    updateFreightCode,
    orderList as getProductOrderList,
  } from '@/api/dropshipping'
  import { getOrderList as getFreightOrderList } from '@/api/order'
  import {
    isNewUserCouponUnavailable,
    isNewUserShippingCoupon,
    newUserCouponUnavailableReason,
    responseHasOrders,
  } from '@/utils/newUserShippingCoupon'
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
        list: [],
        rate: 0,
        productInfo: {
          preview_type: '2',
          give_address_id: null,
          is_freight_agency: 1,
          price_control_id: null,
          shipping_fee: null,
          cart_info_ids: '',
          source: "1",
          goodsId: '',
          goodsSkuAndNum: [],
        },
        addList: [],
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
        chooseAddress: {},
        btnLoading: false,
        titl: 'Add',
        defaultAddress: false,
        freightList: [],
        logisNum: 0,
        remark: '',
        confirmText: 'Contact Sales',
        totalCost: null,
        showLoading: true,
        coupon_list:[],
        couponId:'',
        couponFee: 0,
        couponPopup: true,
        hasPlacedOrder: false,
        couponEligibilityLoading: true,
        couponEligibilityFailed: false,
        preLoad: false,
        oneitem: false,
        fright_cost:'',
        freight_info: [],
        actionFre: 0,
        selectLogis: {},
        selectCart: 0,
        selectTran: '',
        moreFreight: false,
        fbaList: [],
        fbaShow: false,
        freightEstimate: [],
        orderPrice: {
          total_price_us: 0,
          total_purchase_fee: 0,
          total_weight: 0,
          total_shipping_fee: 0,
        },
        co_disclaimer: true,
      }
    },
    mounted() {
      this.$emit('hiddenChat', false)
      this.loadNewUserCouponEligibility()
      document.addEventListener(
        'click',
        this.even,
        true
      )
      if(this.$route.query.offerId){
        this.productInfo.preview_type = 1
        this.productInfo.goodsId = this.$route.query.offerId
        this.productInfo.goodsSkuAndNum = JSON.parse(decodeURIComponent(this.$route.query.sku))
        if(this.$route.query.onlyOne == 'true'){
          this.oneitem = true
        }
        if(this.$route.query.source == 5){
          this.productInfo.vendor_code = this.$route.query.vendor
          // this.productInfo.is_freight_agency = 2
        }
        this.getData()
      }else{
        this.productInfo.cart_info_ids = this.$route.query.cartIds
        this.getData()
      }
      this.productInfo.source = this.$route.query.source
      this.getCountryList()
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
      this.$emit('hiddenChat', true)
    },
    methods: {
      couponUnavailable(item) {
        if ((this.couponEligibilityLoading || this.couponEligibilityFailed) && isNewUserShippingCoupon(item)) return true
        return isNewUserCouponUnavailable(item, this.hasPlacedOrder)
      },
      couponUnavailableReason(item) {
        if (this.couponEligibilityLoading && isNewUserShippingCoupon(item)) return 'Checking eligibility'
        if (this.couponEligibilityFailed && isNewUserShippingCoupon(item)) return 'Eligibility unavailable'
        return newUserCouponUnavailableReason(item, this.hasPlacedOrder)
      },
      async loadNewUserCouponEligibility() {
        const requests = await Promise.allSettled([
          getProductOrderList({ status: 0, pageIndex: 1, pageCount: 1 }),
          getFreightOrderList({ status: 0, page: 1, page_size: 1 }),
        ])
        this.hasPlacedOrder = requests.some((result) => (
          result.status === 'fulfilled' && responseHasOrders(result.value)
        ))
        this.couponEligibilityFailed = requests.some((result) => (
          result.status !== 'fulfilled' || !result.value || result.value.code !== 0
        ))
        this.couponEligibilityLoading = false
        const selectedCoupon = this.coupon_list.find((item) => item.id === this.couponId)
        if (selectedCoupon && this.couponUnavailable(selectedCoupon)) {
          this.couponId = ''
          this.couponFee = 0
        }
      },
      mulNumber(a, b) {
        a = Number(a);
        b = Number(b);
        const result = Math.round((a - b) * 100) / 100;
        return result;
      },
      addNumber(a, b){
        a = Number(a);
        b = Number(b); 
        const result = Math.round((a + b) * 100) / 100;
        return result;
      },
      subtractWithPrecision(a, b) {
        a = Number(a);
        b = Number(b); 
        const result = Math.round((a - b) * 100) / 100;
        return result;
      },
      selectCoupon(item){
        if(this.couponUnavailable(item)){
          this.$message({
            message: this.couponUnavailableReason(item),
            offset: 70
          })
          return
        }
        if(this.couponId == item.id){
          this.couponId = '';
          this.couponFee = 0;
        }else{
          this.couponId = item.id; 
          this.couponFee = item.type_value;
        }
        this.closeCouponModal();
      },
      showCouponModal(){
        this.$refs.mask.style = 'display:block;'
        this.$refs.couponModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;';
        setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
        },1)
      },
      closeCouponModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.couponModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;';
      },
      even(e){
        if(!this.id){
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
        }
      },
      getData(){
        this.getAddress()
        // orderInfo(this.productInfo).then((res)=>{
        //   this.list = res.data.order_info
        //   this.coupon_list= res.data.coupon_list
        // })
      },
      divide(num1, num2) {
        const result = (num1 * 100) / (num2 * 100);
        if(Math.round(result * 100) / 100>0){
          return Math.round(result * 100) / 100;
        }
        return 0.01;
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
            this.productInfo.give_address_id = this.chooseAddress.id
            if(this.$route.query.offerId){
              this.productInfo.goodsSkuAndNum[0].delivery_area_code = this.chooseAddress.country
            }
          }
          this.freight_info = []
          this.actionFre = 0
          this.selectTran = 0
          orderInfo(this.productInfo).then((req)=>{
            if(req.code==0){
              this.list = req.data.orders
              this.coupon_list= req.data.coupon_list
              this.orderPrice.total_price_us = req.data.total_price_us
              this.orderPrice.total_purchase_fee = req.data.total_purchase_fee
              this.orderPrice.total_shipping_fee = req.data.total_shipping_fee
              this.orderPrice.total_weight = req.data.total_weight
              getFreightList({
                give_address_id: this.productInfo.give_address_id,
                count_weight: this.orderPrice.total_weight
              }).then((rez)=>{
                this.freightEstimate = rez.data
              })
              this.totalCost = req.data.total_price;
              this.confirmText = 'Payments'
              this.preLoad = true
              this.showLoading = false
            }else{
              this.$message({
                message: req.msg,
                offset: 70
              });
              this.showLoading = false
            }
          })
        })
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
        this.$refs.freightModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        setTimeout(()=>{
          this.$validator.reset()
        },1)
      },
      chooseAdd(i){
        this.showLoading = true
        this.chooseAddress = i
        this.productInfo.give_address_id = this.chooseAddress.id
        if(this.$route.query.offerId){
          this.productInfo.goodsSkuAndNum[0].delivery_area_code = i.country
        }
        this.preLoad = false
        this.freight_info = []
        this.actionFre = 0
        this.selectTran = 0

        // getFreightList({
        //   give_address_id: this.productInfo.give_address_id,
        //   count_weight: this.orderPrice.total_weight
        // }).then((rez)=>{
        //   this.freightEstimate = rez.data
        // })
        this.showLoading = true
        orderInfo(this.productInfo).then((req)=>{
          if(req.code==0){
            this.list = req.data.orders
            this.coupon_list= req.data.coupon_list
            this.orderPrice.total_price_us = req.data.total_price_us
            this.orderPrice.total_purchase_fee = req.data.total_purchase_fee
            this.orderPrice.total_shipping_fee = req.data.total_shipping_fee
            this.orderPrice.total_weight = req.data.total_weight
            getFreightList({
              give_address_id: this.productInfo.give_address_id,
              count_weight: this.orderPrice.total_weight
            }).then((rez)=>{
              this.freightEstimate = rez.data
            })
            this.totalCost = req.data.total_price;
            this.confirmText = 'Payments'
            this.preLoad = true
            this.showLoading = false
          }else{
            this.$message({
              message: req.msg,
              offset: 70
            });
            this.showLoading = false
          }
        })
        this.closeModal()
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
      confirmOrder(){
        if(this.co_disclaimer){
          if(this.addList.length > 0){
            this.showLoading = true
            let list = this.productInfo
            list.purchase_type = this.productInfo.preview_type
            list.order_remark = this.remark
            list.give_address_id = this.chooseAddress.id
            list.coupon_id = this.couponId;
            if(this.freight_info.length>0){
              list.vendor_code = this.freight_info[this.actionFre].vendor_code
            }
            if(this.freightList.length>0){
              list.price_control_id = this.freightList[this.logisNum].id
              list.shipping_fee = this.freightList[this.logisNum].freight
            }
            orderCreate(JSON.stringify(list)).then((res)=>{
              if(res.code == 0){
                // if(this.oneitem || this.list.status==1){
                  this.$router.push({
                    name: 'orderPayment',
                    params: {
                      id: res.data.order_number,
                      cost: this.subtractWithPrecision(this.totalCost, this.couponFee) 
                    },
                  })
                // }else{
                //   this.$router.push({
                //     path: '/account/orderList',
                //   })
                //   // this.$emit('openChat')
                // }
              }else{
                this.showLoading = false
                this.$message({
                  message: res.msg,
                  offset: 100
                });
              }
            })
          }else{
            this.$message({
              message: 'Please create a address',
              offset: 70
            });
          }
        }else{
          this.$message({
            message: 'Please read and agreed to Disclaimer of Liability',
            offset: 70
          });
        }
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
      getPre(){
        this.showLoading = true
        orderInfo(this.productInfo).then((req)=>{
          this.list = req.data.order_info
          // this.totalCost = this.list.total_price_us
          this.fright_cost = req.data.order_info.shipping_fee
          if (this.productInfo.is_freight_agency == 1) {
            this.totalCost = this.list.total_price_us;
          } else {
            this.totalCost = this.mulNumber(
              this.list.total_price_us,
              this.fright_cost
            );
          }
          if(this.list.status==1){
            this.confirmText = 'Payments'
          }else{
            this.confirmText = 'Contact Sales'
          }
          this.preLoad = true
          this.showLoading = false
        })
      },
      getLogi(){
        if(this.list.total_weight=='0.000'){
          this.freightList = []
          this.productInfo.price_control_id = null
          this.productInfo.shipping_fee = null
          this.getPre()
        }else{
          this.logisNum = 0
          if(this.productInfo.is_freight_agency == 1 && this.addList.length > 0){
            // let shipping_to = ''
            // let shipping_to_en = ''
            // for(let n=0;n<this.countryList.length;n++){
            //   if(this.chooseAddress.country == this.countryList[n].code_two){
            //     shipping_to = this.countryList[n].zh_cn_nickname
            //     shipping_to_en = this.countryList[n].en_nickname
            //   }
            // }
            // let logis = {
            //   // dest_code: this.chooseAddress.country,
            //   dispatch_country: '',
            //   shipping_to: shipping_to,
            //   shipping_to_en: shipping_to_en,
            //   weight: this.list.total_weight,
            //   // type: 2
            // }
            // getLogisPrice(logis).then((res)=>{
            //   this.freightList = res.data
            //   if(this.freightList.length>0){
            //     this.productInfo.price_control_id = this.freightList[0].id
            //     this.productInfo.shipping_fee = this.freightList[0].freight
            //     // this.totalCost = (Number(this.freightList[0].freight) + Number(this.list.total_price_us)).toFixed(2)
            //   }else{
            //     this.productInfo.price_control_id = null
            //     this.productInfo.shipping_fee = null
            //   }
            //   this.getPre()
            // })
          }else{
            this.freightList = []
            this.productInfo.price_control_id = null
            this.productInfo.shipping_fee = null
            this.getPre()
          }
        }
      },
      chooseLogis(){
        this.productInfo.price_control_id = this.freightList[this.logisNum].id
        this.productInfo.shipping_fee = this.freightList[this.logisNum].freight
        this.getPre()
        // this.totalCost = (Number(this.freightList[this.logisNum].freight) + Number(this.list.total_price_us)).toFixed(2)
      },
      chooseTrans(){
        if(this.productInfo.source == 4 || this.productInfo.source == 5){
          if (this.productInfo.is_freight_agency == 1) {
            this.totalCost = this.list.total_price_us;
          } else {
            this.totalCost = this.mulNumber(
              this.list.total_price_us,
              this.fright_cost
            );
          }
        }else{
          this.getLogi()
        }
        this.preLoad = true
        // this.preLoad = false
      },
      changeFreight(list, item, id){
        if(!this.showLoading){
          this.freight_info = list
          this.selectLogis = item
          this.selectTran = item.vendor_code
          this.selectCart = id
          this.$refs.freightModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.freightModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
      },
      confirmTrans(){
        this.showLoading = true
        if(this.selectLogis.vendor_code != this.selectTran){
          updateFreightCode({
            cart_id: this.selectCart,
            freight_code: this.selectTran,
          }).then((res)=>{
            orderInfo(this.productInfo).then((req)=>{
              if(req.code==0){
                this.list = req.data.orders
                this.coupon_list= req.data.coupon_list
                this.orderPrice.total_price_us = req.data.total_price_us
                this.orderPrice.total_purchase_fee = req.data.total_purchase_fee
                this.orderPrice.total_shipping_fee = req.data.total_shipping_fee
                this.orderPrice.total_weight = req.data.total_weight
                this.totalCost = req.data.total_price;
                this.preLoad = true
                this.showLoading = false
                this.closeModal()
              }else{
                this.$message({
                  message: req.msg,
                  offset: 70
                });
                this.showLoading = false
              }
            })
          })
        }else{
          this.showLoading = false
          this.closeModal()
        }
        
        // this.productInfo.vendor_code = this.freight_info[this.selectTran].vendor_code
        // this.preLoad = false
        // orderInfo(this.productInfo).then((req)=>{
        //   this.list = req.data.order_info
        //   this.coupon_list= req.data.coupon_list
        //   this.fright_cost = req.data.order_info.shipping_fee
        //   this.freight_info = req.data.order_info.freight_info
        //   if(this.freight_info.length>0){
        //     for(let i=0;i<this.freight_info.length;i++){
        //       if(req.data.order_info.default_freight.vendor_code == this.freight_info[i].vendor_code){
        //         // this.fright_cost = this.freight_info[i].freight
        //         this.actionFre = i
        //         this.selectTran = i
        //       }
        //     }
        //   }
        //   // else{
        //   //   this.fright_cost = ''
        //   // }
        //   if (this.productInfo.is_freight_agency == 1) {
        //     this.totalCost = this.list.total_price_us;
        //   } else {
        //     this.totalCost = this.mulNumber(
        //       this.list.total_price_us,
        //       this.fright_cost
        //     );
        //   }

        //   if(this.list.status==1){
        //     this.confirmText = 'Payments'
        //   }else{
        //     this.confirmText = 'Contact Sales'
        //   }
        //   this.preLoad = true
        //   this.showLoading = false
        // })
        
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
    }
  }
</script>

<style lang="postcss" scoped>
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

  .shippingfreights{
    overflow-y: hidden;
    max-height: 200px;
  }
  
  .shippingfreight{
    overflow-y: auto;
    max-height: 600px;
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
