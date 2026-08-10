<template>
  <div class="w-full h-full relative">
    <div ref="mask" class="mask"></div>
    <div ref="successModal" class="py-10 modal w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex flex-col justify-center items-center">
        <!-- <img src="../../../assets/reqSuccess.svg" class="mr-3 w-10 h-10" alt=""> -->
        <svg t="1676519430153" class="icon mb-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5034" width="70" height="70"><path d="M512 32C246.4 32 32 249.6 32 512s217.6 480 480 480 480-217.6 480-480S774.4 32 512 32z m268.8 380.8L496 697.6c-25.6 25.6-60.8 25.6-83.2 0L243.2 528c-25.6-25.6-25.6-60.8 0-83.2s60.8-25.6 83.2 0l128 128 240-240c25.6-25.6 60.8-25.6 83.2 0 25.6 19.2 25.6 54.4 3.2 80z" p-id="5035" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#75bb43"></path></svg>
        <div>Booking success</div>
      </div>
      <div v-if="orderType == 1">
        <div class="text-center pt-3 pb-6">We'll contact you within 24 hours</div>
        <div class="flex justify-center">
          <router-link to="/main/booking">
            <button class="btn">Confirm</button>
          </router-link>
        </div>
      </div>
      <div v-if="orderType == 2">
        <div class="flex justify-center pt-8">
          <router-link :to="'/order/forwardingOrder/' + toShippingOrder">
            <button class="btn">Confirm</button>
          </router-link>
        </div>
      </div>
    </div>
    <div ref="successModals" class="py-10 px-3 sm:px-10 modal w-510 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex flex-col justify-center items-center">
        <!-- <img src="../../../assets/reqSuccess.svg" class="mr-3 w-10 h-10" alt=""> -->
        <svg t="1676519430153" class="icon mb-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5034" width="70" height="70"><path d="M512 32C246.4 32 32 249.6 32 512s217.6 480 480 480 480-217.6 480-480S774.4 32 512 32z m268.8 380.8L496 697.6c-25.6 25.6-60.8 25.6-83.2 0L243.2 528c-25.6-25.6-25.6-60.8 0-83.2s60.8-25.6 83.2 0l128 128 240-240c25.6-25.6 60.8-25.6 83.2 0 25.6 19.2 25.6 54.4 3.2 80z" p-id="5035" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#75bb43"></path></svg>
        <div class="text-lg font-semibold">Reservation Success</div>
        <div class="text-center font-medium">If you do not need to pick up the goods, you can send them to our warehouse by yourself.</div>
        <div class="mt-4 p-2 border border-orange rounded-md text-sm relative">
          <div @click="copyInfo"
            class="absolute right-2 top-2 text-blue-400 hover:underline cursor-pointer flex items-center">
            <svg t="1690771803392" class="icon mr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2483" id="mx_n_1690771803393" width="17" height="17"><path d="M878.250667 981.333333H375.338667a104.661333 104.661333 0 0 1-104.661334-104.661333V375.338667a104.661333 104.661333 0 0 1 104.661334-104.661334h502.912a104.661333 104.661333 0 0 1 104.661333 104.661334v502.912C981.333333 934.485333 934.485333 981.333333 878.250667 981.333333zM375.338667 364.373333a10.666667 10.666667 0 0 0-10.922667 10.965334v502.912c0 6.229333 4.693333 10.922667 10.922667 10.922666h502.912a10.666667 10.666667 0 0 0 10.922666-10.922666V375.338667a10.666667 10.666667 0 0 0-10.922666-10.922667H375.338667z" fill="#60a5fa" p-id="2484"></path><path d="M192.597333 753.322667H147.328A104.661333 104.661333 0 0 1 42.666667 648.661333V147.328A104.661333 104.661333 0 0 1 147.328 42.666667H650.24a104.661333 104.661333 0 0 1 104.618667 104.661333v49.962667c0 26.538667-20.309333 46.848-46.848 46.848a46.037333 46.037333 0 0 1-46.848-46.848V147.328a10.666667 10.666667 0 0 0-10.922667-10.965333H147.328a10.666667 10.666667 0 0 0-10.965333 10.965333V650.24c0 6.229333 4.693333 10.922667 10.965333 10.922667h45.269333c26.538667 0 46.848 20.309333 46.848 46.848 0 26.538667-21.845333 45.312-46.848 45.312z" fill="#60a5fa" p-id="2485"></path></svg>
            <span>Quick Copy</span>
          </div>
          <div class="mt-6 sm:mt-0 mb-4 text-center text-base">Warehouse Information</div>
          <div>Address: Cooperate Logistics Warehouse, 102 Building C, Hezhihe Industrial Park, No.2990 Songbai Road, Shiyan, Baoan, Shenzhen</div>
          <div>Customer service call: +86-28225927</div>
          <div class="flex flex-wrap">
            <div class="mr-8">Name: Andy.Liu</div>
            <div>Postcode: 518000</div>
          </div>
        </div>
      </div>
      <div class="flex justify-center pt-8">
        <router-link :to="'/order/forwardingOrder/' + toShippingOrder">
          <button class="btn">Confirm</button>
        </router-link>
      </div>
    </div>
    <div ref="noPriceModal" class="py-10 px-3 sm:px-10 modal w-510 opacity-20 bg-white dark:bg-darkMenu">
      <div class="px-2 py-1 absolute top-0 right-0 cursor-pointer hover:bg-gray-300" @click="closePriceModal">
        <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
      </div>
      <div class="flex flex-col justify-center items-center">
        <svg t="1691477395670" class="icon mb-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4015" width="70" height="70"><path d="M973.312 788.48L609.28 131.584c-23.552-43.008-58.88-67.072-96.768-67.072-37.888 0-72.704 24.576-96.768 67.584L52.736 788.48c-23.552 42.496-26.112 86.016-6.656 119.296s58.368 52.224 106.496 52.224h720.896c48.128 0 87.04-18.944 106.496-52.224 19.456-33.28 16.896-76.288-6.656-119.296zM513.024 269.824c18.944 0 34.304 15.36 34.304 34.304V614.4a34.304 34.304 0 0 1-68.608 0V304.128c0-18.432 15.36-34.304 34.304-34.304z m0 547.84c-29.696 0-53.248-24.064-53.248-53.76s24.064-53.76 53.248-53.76c29.696 0 53.248 24.064 53.248 53.76s-24.064 53.76-53.248 53.76z" p-id="4016" fill="#e66a10"></path></svg>
        <div class="text-lg font-semibold">Weight & Volume No Price Inquiry</div>
        <div class="text-center font-medium">We cannot find any results that match your search. Please try again with different search terms.</div>
        <div class="mt-4 p-2 border border-orange rounded-md text-sm relative">
          <div class="mt-6 sm:mt-0 mb-4 text-center text-base">Explanation of the problem</div>
          <div>1. The express weight volume follows the weight volume of the original search;</div>
          <div>
            <span class="mr-2">2. Re-check the new weight volume and book the shipment</span>
            <router-link :to="'/main/booking'">
              <span class="text-blue-400 hover:underline cursor-pointer">Price check</span>
            </router-link>
          </div>
        </div>
      </div>
        <!-- <router-link :to="'/order/forwardingOrder/' + toShippingOrder">
          <button class="btn">Confirm</button>
        </router-link> -->
    </div>
    <div ref="cancelModal" class="modal p-5 w-510 opacity-20 bg-white dark:bg-darkMenu">
      <div>Sure to cancel the request? After cancellation, your request will not be saved.</div>
      <div class="mt-7 flex justify-end">
        <button class="cancelbtn" @click="cancelcancel">Cancel</button>
        <button class="btn" @click="cancelconfirm">Confirm</button>
      </div>
    </div>
    <div ref="addressModal" class="modal p-5 w-700 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine pb-3">
        <div class="text-xl">Select Shipping Address</div>
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="mt-2">
        <div v-for="(i,n) in addList" :key="n" class="rounded border flex flex-col sm:flex-row mb-2">
          <div @click="chooseAdd(addList,n)" class="p-2 w-full text-sm cursor-pointer hover:bg-gray-200">
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
              @click="changeAddress(i)">Change</button>
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
          <div class="flex">
            <!-- <div class="required">*</div> -->
            Company Name</div>
          <div class="relative">
            <input type="text" class="input" v-model="shippingAddress.address_name">
            <!-- <input type="text" class="input" v-model="shippingAddress.address_name"
              v-validate="'required|addressName'" name="addressName">
            <div class="inputTips">{{errors.first("addressName")}}</div> -->
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <!-- <div class="required">*</div> -->
            Recipient Name</div>
          <div class="relative">
            <input type="text" class="input" v-model="shippingAddress.full_name">
            <!-- <input type="text" class="input" v-model="shippingAddress.full_name"
              v-validate="'required|fullName'" name="fullName">
            <div class="inputTips">{{errors.first("fullName")}}</div> -->
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
            <input type="text" class="input" v-model="shippingAddress.fba_code">
          </div>
        </div>
        <div class="col-span-2">
          <div class="flex">
            <div class="required">*</div>Country</div>
          <div ref="countrySelect" class="relative">
            <!-- @click.stop="countryShow = !countryShow" -->
            <div class="select bg-gray-200 h-42px overflow-hidden"
              :class="[countryShow ? 'selectOpen' : '']"
              >
              {{ countryItem.name }}
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
            <select-country :selectList="stateList"
                            :selectChecked="stateItem"
                            :selectOpen="stateShow"
                            @increment="selectStates"
                            v-show="stateShow"></select-country>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>City</div>
          <div class="relative">
            <!-- <input type="text" class="input" v-model="shippingAddress.city"
              v-validate="'required|city'" name="city">
            <div class="inputTips">{{errors.first("city")}}</div> -->
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
            <!-- <div class="required">*</div> -->
          Postal Code</div>
          <div class="relative">
            <input type="text" class="input" v-model="shippingAddress.zipcode">
            <!-- <input type="text" class="input" v-model="shippingAddress.zipcode"
              v-validate="'required|postalCode'" name="postalCode">
            <div class="inputTips">{{errors.first("postalCode")}}</div> -->
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>Phone Number</div>
          <div class="relative">
            <input type="text" class="input" v-model="shippingAddress.tel"
              v-validate="'required|phone'" name="phone">
            <div class="inputTips">{{errors.first("phone")}}</div> 
          </div>
        </div>
      </div>
      <div class="mt-7 flex justify-end">
        <button class="cancelbtn" @click="closeModal">Cancel</button>
        <button class="btn" @click="addressSave">Save</button>
      </div>
    </div>

    <div v-if="!id">
      <div class="bg-white dark:bg-darkMenu mb-4 py-4 px-6 grid grid-cols-9 gap-4 rounded-md shadow-default">
        <div class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col">
          <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
            <div class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-orange rounded-full"></div>
            <div class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
          </div>
          <div class="ml-3 sm:ml-0">
            <div class="font-semibold mb-1">Booking</div>
            <div class="text-sm">Select a route and book a shipment</div>
          </div>
        </div>
        <div class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col text-gray-300">
          <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
            <div class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
            <div class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
          </div>
          <div class="ml-3 sm:ml-0">
            <div class="font-semibold mb-1">Load Cargo</div>
            <div class="text-sm">Measured and arrived at warehouse</div>
          </div>
        </div>
        <div class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col text-gray-300">
          <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
            <div class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
            <div class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
          </div>
          <div class="ml-3 sm:ml-0">
            <div class="font-semibold mb-1">Payment</div>
            <div class="text-sm">Payment completed and ready for shipping</div>
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
    </div>
    <div class="panel">
      <div class="mb-4 font-semibold">Route</div>
      <div class="grid grid-cols-10 text-sm">
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Departure City</div>
          <div v-if="!id" class="p-2">{{ shipping_from_en }}</div>
          <div v-if="id && list.delivery_city != ''" class="p-2">{{ list.delivery_city }}</div>
          <div v-if="list.delivery_city == ''" class="p-2">N/A</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Destination</div>
          <div v-if="!id" class="p-2">{{ infos.product_info.shipping_to_en }}</div>
          <div v-if="id" class="p-2 flex items-center">
            <img :src="list.give_country_img" class="w-10 mr-2" alt="">
            <div>{{ list.give_country }}</div>
          </div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Carrier Code</div>
          <div v-if="!id" class="p-2">{{ infos.product }}</div>
          <div v-if="id" class="p-2">{{ list.transport_type  }}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Service Type</div>
          <div v-if="!id" class="p-2">DDP</div>
          <div v-if="id" class="p-2">{{ list.service_type }}</div>
        </div>
        <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Custom Duties</div>
          <div v-if="!id" class="p-2">{{ whether[infos.tax] }}</div>
          <div v-if="id" class="p-2">{{ whether[list.tax] }}</div>
        </div>
        <!-- <div class="col-span-10 sm:col-span-5 xl:col-span-2">
          <div class="routeTitle">Shipping Time</div>
          <div v-if="!id" class="p-2">{{ infos.aging_start }}-{{ infos.aging_end }} days</div>
          <div v-if="id" class="p-2">{{ list.transportation_time }}</div>
        </div> -->
      </div>
    </div>

    <div v-if="!id"> 
      <!-- <div class="panel">
        <div class="py-4 flex">
          <div class="p-3 border border-gray-200 rounded-md flex items-center">
            <div>Does it need to be picked up</div>
            <input v-model="take" type="checkbox" @change="istake" class="flex-shrink-0 switch ml-4"/>
          </div>
        </div>
        <div v-show="take" class="pt-3 border-t border-gray-300">
          <div class="grid grid-cols-6 gap-4">
            <div class="col-span-6 md:col-span-3 lg:col-span-2">
              <div class="pb-2">
                <label>Pickup Location Type</label>
              </div>
              <select v-model="form.delivery_type" name="placeType" class="select h-11">
                <option value="1">warehouse</option>
                <option value="2">residential</option>
              </select>
            </div>
            <div class="col-span-6 md:col-span-3 lg:col-span-2">
              <div class="pb-2">
                <label>Pickup City</label>
              </div>
              <div ref="originSelect" class="relative h-11">
                <div class="select cursor-pointer overflow-hidden h-11"
                    :class="[originShow ? 'selectOpen' : '']"
                    @click.stop="originShow = !originShow">
                  {{ originItem.e_name }},China
                  <img src="../../../assets/down.svg"
                      class="absolute right-1 top-4 w-5"
                      alt="">
                </div>
                <order-select-city
                  :selectList="originList"
                  :selectChecked="originItem"
                  :selectOpen="originShow"
                  @increment="selectOrigin"
                  v-show="originShow"
                ></order-select-city>
              </div>
            </div>
            <div class="col-span-6 md:col-span-3 lg:col-span-2">
              <div class="pb-2">
                <label>Available for Pickup</label>
              </div>
              <div v-if="take" class="relative">
                <input ref="dateSelect" @click="dateSelect"
                  v-model="form.estimate_put_time" type="date" class="input"
                  v-validate="'required|arrivalDate'"
                  name="arrivalDate">
                <div class="inputTips">{{errors.first("arrivalDate")}}</div>
              </div>
            </div>
            <div class="col-span-6 md:col-span-3 lg:col-span-2">
              <div class="pb-2">
                <label>Contact - optional</label>
              </div>
              <input v-model="form.take_contacts" type="text" class="input h-11">
            </div>
            <div class="col-span-6 md:col-span-3 lg:col-span-2">
              <div class="pb-2">
                <label>Phone Number</label>
              </div>
              <div v-if="take" class="relative">
                <input v-model="form.take_tel" type="text" class="input h-11"
                  v-validate="'required|pickupPhone'"
                  name="pickupPhone">
                <div class="inputTips">{{errors.first("pickupPhone")}}</div>
              </div>
            </div>
            <div class="col-span-6">
              <div class="pb-2">
                <label>Full Address - optional</label>
              </div>
              <textarea v-model="form.take_address" rows="3" class="input resize-none"></textarea>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div class="panel" v-show="!take">
        <div class="mb-4 font-semibold">Cargosoon Warehouse Address</div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="col-span-2 lg:col-span-1 border border-gray-300 rounded-md p-3">
            <div class="mb-2 flex justify-center">
              <div class="px-6 py-1 rounded-md bg-yellow-200">Chinese</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-24">省份:</div>
              <div>中国大陆 广东省</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-24">城市:</div>
              <div>深圳市</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-24">街道地址:</div>
              <div>宝安区石岩松白路2990号合志和工业园C栋1楼102</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-24">收货人姓名:</div>
              <div>刘勇</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-24">电话号码:</div>
              <div>0755-28225927/+86 15323780975</div>
            </div>
          </div>
          <div class="col-span-2 lg:col-span-1 border border-gray-300 rounded-md p-3">
            <div class="mb-2 flex justify-center">
              <div class="px-6 py-1 rounded-md bg-blue-200">English</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-32">Province:</div>
              <div>Guangdong Province, China</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-32">City:</div>
              <div>Shenzhen</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-32">Street Address:</div>
              <div>Warehouse, 102 Building C, Hezhihe Industrial Park, No.2990 Songbai Road, Shiyan, Baoan</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-32">Contact Name:</div>
              <div>Andy.Liu</div>
            </div>
            <div class="flex flex-col sm:flex-row pb-2">
              <div class="font-semibold text-gray-500 flex-shrink-0 w-32">Phone Number:</div>
              <div>0755-28225927/+86 15323780975</div>
            </div>
          </div>
        </div>
      </div>  -->
      <!-- <div class="mt-4 grid grid-cols-2 gap-3 text-xl">
        <div class="col-span-2 sm:col-span-1 bg-white hover:bg-gray-200 dark:bg-darkMenu rounded-md shadow-default">
          <label class="block p-6 cursor-pointer select-none">
            <div class="flex items-center justify-center">
              <input v-model="orderType" type="radio" value="1" class="mr-2 w-4 h-4">
              <div>Quick Order</div>
            </div>
            <div class="mt-2 text-center text-xs">The quickest and easiest way to enter your information into the Cargo Details box</div>
          </label>
        </div>
        <div class="col-span-2 sm:col-span-1 bg-white hover:bg-gray-200 dark:bg-darkMenu rounded-md shadow-default">
          <label class="block p-6 cursor-pointer select-none">
            <div class="flex items-center justify-center">
              <input v-model="orderType" type="radio" value="2" class="mr-2 w-4 h-4">
              <div>Standard Order</div>
            </div>
            <div class="mt-2 text-center text-xs">You need to fill out the information in detail</div>
          </label>
        </div>
      </div> -->
      <!-- <div v-if="orderType == 1">
        <div class="panel">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-3">
              <div class="pb-2">
                <label>Cargo Details</label>
              </div>
              <div class="relative">
                <textarea v-model="cargo_info" rows="8" 
                placeholder="Enter the basic information of the Cargo. For example
——————————————————————————
Master Box dimension: 62*35*52cm(24.41*13.78*20.47 inches)
Single Master Box weight: 16.3KGS(35.93lb)
Total number of Master boxes : 15
Total weight: 244.5 KG" class="input resize-none"
                  v-validate="'required|cargoInfo'"
                  name="cargoInfo"></textarea>
                <div class="inputTips -bottom-2">{{errors.first("cargoInfo")}}</div>
              </div>
            </div>
            <div class="col-span-3 md:col-span-1">
              <div class="pb-2">
                <label>Phone Number - optional</label>
              </div>
              <input v-model="contact_number" type="text" class="input h-11">
            </div>
            <div class="col-span-3 md:col-span-1">
              <div class="pb-2">
                <label>WhatsApp - optional</label>
              </div>
              <input v-model="whatsapp" type="text" class="input h-11">
            </div>
            <div class="col-span-3 md:col-span-1">
              <div class="pb-2">
                <label>Skype/Wechat - optional</label>
              </div>
              <input v-model="wetch" type="text" class="input h-11">
            </div>
          </div>
        </div>
      </div> -->
      <div v-if="orderType == 2">
        <div class="panel">
          <div class="mb-4 font-semibold">Package Details</div>
          <div class="border-t border-gray-300">
            <div class="bg-white dark:bg-darkMenu pt-6 relative ">
              <div class="flex flex-wrap items-end">
                <div class="w-1/2 sm:w-1/3 h-42px flex" >
                  <button class="unitType1" :class="[totalDetail=='metric' ? 'unitType' : '']"
                  @click="chooseUnit('metric')">Metric</button>
                  <button class="unitType2" :class="[totalDetail=='imperial' ? 'unitType' : '']"
                  @click="chooseUnit('imperial')">Imperial</button>
                </div>
              </div>
              <!-- <div class="absolute top-6 right-0 cursor-pointer underline text-orange hover:text-orange1"
                @click="switchDetail(2)" v-if="form.pack_type == 1">Switch to package details</div>
              <div class="absolute top-6 right-0 cursor-pointer underline text-orange hover:text-orange1"
                @click="switchDetail(1)" v-if="form.pack_type == 2">Switch to cargo totals</div> -->
              <div v-if="pack_type == 2">
                <!-- <div class="mt-3 py-4 px-3 bg-gray-100 relative" v-for="(item,index) in package" :key="index">
                  <div class="absolute top-2 right-2 cursor-pointer bg-transparent hover:bg-gray-300"
                    @click="deletePackage(index)" v-if="package.length>1">
                    <img src="../../../assets/delete.svg" class=" w-6 h-6" alt="">
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 sm:col-span-6 flex flex-col justify-end">
                      <div class="pb-2">
                        <label class="text-base">Cargo Description</label>
                      </div>
                      <input type="text" class="input" v-model="item.name">
                    </div>
                    <div class="col-span-6 sm:col-span-3 flex flex-col justify-end">
                      <div class="pb-2">
                        <label class="text-base">Packing Type</label>
                      </div>
                      <select v-model="item.type" name="packageType" class="select h-42px">
                        <option value="1">carton</option>
                      </select>
                    </div>
                    <div class="col-span-6 sm:col-span-3 flex flex-col justify-end">
                      <div class="pb-2">
                        <label class="text-base">Number of Packages</label>
                      </div>
                      <input type="number" min="0" class="input" v-model="item.total" @input="TotalQty">
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row">
                    <div class="h-42px mt-4 flex">
                      <button class="unitType1" :class="[item.isDimensions ? 'unitType' : '']"
                      @click="chooseUnit1(index,true)">Dimensions</button>
                      <button class="unitType2" :class="[item.isDimensions ? '' : 'unitType']"
                      @click="chooseUnit1(index,false)">Volume</button>
                    </div>
                  </div>
                  <div class="mt-4 grid grid-cols-12 gap-4">
                    <div class="col-span-6 sm:col-span-3 relative" v-show="item.isDimensions">
                      <div class="pb-2">
                        <label class="text-base">Length</label>
                      </div>
                      <input type="number" min="0" class="input pr-11" v-model="item.length" @input="TotalVolume()">
                      <div class="absolute right-2 sm:right-2 top-10 text-base">({{ volumeUnit }})</div>
                    </div>
                    <div class="col-span-6 sm:col-span-3 relative" v-show="item.isDimensions">
                      <div class="pb-2">
                        <label class="text-base">Width</label>
                      </div>
                      <input type="number" min="0" class="input pr-11" v-model="item.width" @input="TotalVolume()">
                      <div class="absolute right-2 sm:right-2 top-10 text-base">({{ volumeUnit }})</div>
                    </div>
                    <div class="col-span-6 sm:col-span-3 relative" v-show="item.isDimensions">
                      <div class="pb-2">
                        <label class="text-base">Height</label>
                      </div>
                      <input type="number" min="0" class="input pr-11" v-model="item.height" @input="TotalVolume()">
                      <div class="absolute right-2 sm:right-2 top-10 text-base">({{ volumeUnit }})</div>
                    </div>
                    <div class="col-span-6 sm:col-span-3 relative" v-show="!item.isDimensions">
                      <div class="pb-2">
                        <label class="text-base">Volume</label>
                      </div>
                      <input type="number" min="0" class="input pr-14" v-model="item.volume" @input="TotalVolume()">
                      <div class="absolute right-2 sm:right-2 top-10 text-base">({{ volume }})</div>
                    </div>
                    <div class="col-span-6 sm:col-span-3 relative">
                      <div class="pb-2">
                        <label class="text-base">Gross Weight</label>
                      </div>
                      <input type="number" min="0" class="input pr-11" v-model="item.weight" @input="TotalWeight">
                      <div class="absolute right-2 top-10 text-base">({{ weight }})</div>
                    </div>
                    <div class="col-span-6 sm:col-span-3 relative">
                      <div class="pb-2">
                        <label class="text-base">Declared Value</label>
                      </div>
                      <input v-model="item.value" min="0" type="number" class="input pr-14">
                      <div class="absolute right-2 sm:right-3 top-10 text-base">USD</div>
                    </div>
                  </div>
                </div> -->
                <div class="mt-5" v-for="(item,index) in package" :key="index">
                  <div class="font-semibold mb-2">Product #{{index + 1}}</div>
                  <div class="flex">
                    <div class="grid grid-cols-4 gap-4 relative">
                      <div class="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col justify-end">
                        <div class="pb-2">
                          <label class="text-base flex">
                            <div class="required">*</div>
                            Boxes</label>
                        </div>
                        <div class="relative">
                          <input @input="totalBoxes" v-model="item.total" type="number" min="1" class="input">
                        </div>
                      </div>
                      <div class="col-span-4 sm:col-span-2 md:col-span-1 relative flex flex-col justify-end">
                        <div class="pb-2">
                          <label class="text-base flex">
                            <div class="required">*</div>
                            Weight (per box)</label>
                        </div>
                        <div class="relative">
                          <input @input="totalBoxes" v-model="item.weight" min="0" type="number" class="input pr-11">
                        </div>
                        <div class="absolute right-2 sm:right-3 bottom-2 text-base">{{ weight }}</div>
                      </div>
                      <div class="col-span-4 md:col-span-2 flex flex-col justify-end">
                        <div class="pb-2">
                          <label class=" flex">
                            <div class="required">*</div>
                            Dimensions (L x W x H per box)</label>
                        </div>
                        <div class="relative overflow-hidden flex border border-inputBorder dark:border-darkMain rounded">
                          <input @input="totalBoxes" type="number" v-model="item.length" placeholder="L" class="input h-10 px-1.5 sm:px-2 rounded-none border-0 border-r focus:border-inputBorder dark:border-darkLine dark:focus:border-darkLine focus:ring-0" min="0">
                          <input @input="totalBoxes" type="number" v-model="item.width" placeholder="W" class="input h-10 px-1.5 sm:px-2 rounded-none border-0 border-r focus:border-inputBorder dark:border-darkLine dark:focus:border-darkLine focus:ring-0" min="0">
                          <input @input="totalBoxes" type="number" v-model="item.height" placeholder="H" class="input h-10 px-1.5 sm:px-2 rounded-none border-0 focus:ring-0" min="0">
                          <div class="flex-shrink-0 w-10 border-l border-inputBorder dark:border-darkLine
                          dark:bg-darkMain flex justify-center items-center">{{volumeUnit}}</div>
                        </div>
                      </div>
                      <!-- <div class="col-span-5 md:col-span-2 flex flex-col justify-end">
                        <div class="pb-2">
                          <label class="text-base">Declared Value</label>
                        </div>
                        <div class="relative">
                          <input v-model="item.value" min="0" type="number" class="input pr-14">
                          <div class="absolute right-2 sm:right-3 bottom-2 text-base">USD</div>
                        </div>
                      </div> -->
                      <div v-show="!item.right" class="inputTips -bottom-4">Enter a positive value for all fields</div>
                    </div>
                    <div class="flex items-end mb-2">
                      <svg @click="delLoad(index)" t="1677056269738" class="icon mx-2.5 cursor-pointer" viewBox="0 0 1033 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7668" width="18" height="18"><path d="M0 151.220727h1033.939684v80.017582H0z" p-id="7669" fill="#7a7a7a"></path><path d="M701.804205 228.837782H332.135479a40.008791 40.008791 0 0 1-40.008791-40.008791v-148.782692a40.008791 40.008791 0 0 1 40.008791-40.008791h369.668726a40.008791 40.008791 0 0 1 40.008791 40.008791v148.782692a40.008791 40.008791 0 0 1-40.008791 40.008791z m-329.659935-80.017582h289.651144v-68.76511H372.14427z" p-id="7670" fill="#7a7a7a"></path><path d="M813.616273 1023.987497H232.813655a40.008791 40.008791 0 0 1-39.896266-37.133159l-56.262362-780.846573a40.008791 40.008791 0 0 1 39.896266-42.884422h680.824595a40.008791 40.008791 0 0 1 39.946278 42.246782l-43.759616 780.809065a40.008791 40.008791 0 0 1-39.946277 37.808307z m-543.569437-80.017582H775.795463l39.271129-700.853996H219.548241z" p-id="7671" fill="#7a7a7a"></path><path d="M400.275451 991.655393a40.008791 40.008791 0 0 1-40.008791-40.008791V356.328295a40.008791 40.008791 0 0 1 80.017582 0v595.318307a40.008791 40.008791 0 0 1-40.008791 40.008791zM644.491612 991.655393a40.008791 40.008791 0 0 1-40.008791-40.008791V356.328295a40.008791 40.008791 0 0 1 80.017582 0v595.318307a40.008791 40.008791 0 0 1-40.008791 40.008791z" p-id="7672" fill="#7a7a7a"></path></svg>
                      <svg @click="copyLoad(index)" t="1677056177686" class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3964" width="20" height="20"><path d="M853.333333 224h-53.333333V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667H170.666667C130.133333 96 96 130.133333 96 170.666667v554.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h53.333333V853.333333c0 40.533333 34.133333 74.666667 74.666667 74.666667h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V298.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667zM160 725.333333V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h554.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v554.666666c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667z m704 128c0 6.4-4.266667 10.666667-10.666667 10.666667H298.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667v-53.333333H725.333333c40.533333 0 74.666667-34.133333 74.666667-74.666667V288H853.333333c6.4 0 10.666667 4.266667 10.666667 10.666667v554.666666z" fill="#7a7a7a" p-id="3965"></path><path d="M576 416h-96V320c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v96H320c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h96V576c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-96H576c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#7a7a7a" p-id="3966"></path></svg>
                    </div>
                  </div>
                </div>
                <div class="mt-6 flex">
                  <button class="bg-orange hover:bg-orange1 rounded text-white py-1.5 px-3"
                    @click="addPackage">Add a cargo</button>
                </div>
                <div class="mt-4 flex flex-wrap">
                  <div>Total qty: {{ totalNum }}/</div>
                  <div>Total volume: {{ totalVolume }}{{ volume }}/</div>
                  <div>Total weight: {{ totalWeight }}{{ weight }}</div>
                </div>
              </div>
              <div v-if="pack_type == 1">
                <div class="mt-3 grid grid-cols-3 gap-4">
                  <div class="col-span-3 md:col-span-1 flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base">Boxes</label>
                    </div>
                    <div class="relative">
                      <input v-model="package[0].total" type="number" min="1" class="input">
                    </div>
                  </div>
                  <div class="col-span-3 md:col-span-1 relative flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base flex">
                        <div class="required">*</div>
                        Total Weight</label>
                    </div>
                    <div class="relative">
                      <input v-model="package[0].weight" min="1" type="number" class="input pr-11"
                        v-validate="'required|weight'" data-vv-scope="package"
                        name="weight">
                      <div class="inputTips">{{errors.first("weight","package")}}</div>
                    </div>
                    <div class="absolute right-2 sm:right-3 bottom-2 text-base">{{ weight }}</div>
                  </div>
                  <div class="col-span-3 md:col-span-1 relative flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base flex">
                        <!-- <div class="required">*</div> -->
                        Total Volume</label>
                    </div>
                    <div class="relative">
                      <input v-model="package[0].volume" min="1" type="number" class="input pr-14"
                         data-vv-scope="package"
                        name="volume">
                        <!-- v-validate="'required|volume'" -->
                        <!-- <div class="inputTips">{{errors.first("volume","package")}}</div> -->
                    </div>
                    <div class="absolute right-2 sm:right-3 bottom-2 text-base">{{ volume }}</div>
                  </div>
                  <!-- <div class="col-span-2 md:col-span-1 flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base">Declared Value</label>
                    </div>
                    <div class="relative">
                      <input v-model="package[0].value" min="0" type="number" class="input pr-14">
                      <div class="absolute right-2 sm:right-3 bottom-2 text-base">USD</div>
                    </div>
                  </div> -->
                </div>
              </div>
              <div class="mt-4">
                <label class="text-base flex mb-2">
                  <div class="required">*</div>
                  Select your type of goods
                </label>
                <div class="flex relative">
                  <button class="radioBtn" :class="[goodtype==1 ? 'radioChoose' : '']"
                  @click="selectgoodtype(1)">General cargo</button>
                  <button class="radioBtn" :class="[goodtype==2 ? 'radioChoose' : '']"
                  @click="selectgoodtype(2)">Special cargo</button>
                  <input type="text" class="hidden" v-model="goodtype"
                    v-validate="'required|goodtypes'" data-vv-scope="package" name="goodtypes">
                  <div class="inputTips -bottom-3.5">{{errors.first("goodtypes","package")}}</div>
                </div>
              </div>
              <div class="mt-4">
                <div class="mb-2">Upload / take photos of product / packing list</div>
                <div v-show="uploadShow" @click="upload" class="w-32 h-32 col-span-3 p-2 border border-inputBorder dark:border-darkMain rounded hover:bg-gray-200 flex flex-col justify-center items-center cursor-pointer">
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
              <!-- <div v-if="form.pack_type == 1" class="mt-8">
                <div class="grid grid-cols-12 gap-4">
                  <div class="col-span-12 sm:col-span-6 flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base">Cargo Description</label>
                    </div>
                    <div class="relative">
                      <input v-model="package[0].name" type="text" class="input"
                        v-validate="'required|cargoDesc'"
                        name="cargoDesc">
                      <div class="inputTips">{{errors.first("cargoDesc")}}</div>
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-3 flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base">Packing Type</label>
                    </div>
                    <select v-model="package[0].type" name="packageType" class="select h-42px">
                      <option value="1">carton</option>
                    </select>
                  </div>
                  <div class="col-span-6 sm:col-span-3 flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base">Number of Packages</label>
                    </div>
                    <div class="relative">
                      <input v-model="package[0].total" min="0" type="number" class="input"
                        v-validate="'required|qty'"
                        name="qty">
                      <div class="inputTips">{{errors.first("qty")}}</div>
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-3 relative flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base">Gross Weight</label>
                    </div>
                    <div class="relative">
                      <input v-model="package[0].weight" min="0" type="number" class="input pr-11"
                        v-validate="'required|weight'"
                        name="weight">
                      <div class="inputTips">{{errors.first("weight")}}</div>
                    </div>
                    <div class="absolute right-2 sm:right-3 bottom-2 text-base">({{ weight }})</div>
                  </div>
                  <div class="col-span-6 sm:col-span-3 relative flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base">Gross Volume - optional</label>
                    </div>
                    <input v-model="package[0].volume" min="0" type="number" class="input pr-14">
                    <div class="absolute right-2 sm:right-3 bottom-2 text-base">({{ volume }})</div>
                  </div>
                  <div class="col-span-6 sm:col-span-3 relative flex flex-col justify-end">
                    <div class="pb-2">
                      <label class="text-base">Declared Value - optional</label>
                    </div>
                    <input v-model="package[0].value" min="0" type="number" class="input pr-14">
                    <div class="absolute right-2 sm:right-3 bottom-2 text-base">USD</div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="mb-4 font-semibold">
            <span class="text-red-500">*</span>
            Shipping To</div>
          <div class="pt-3 border-t border-gray-300 relative">
            <div v-show="chooseAddress.id">
              <div class="rounded border flex flex-col md:flex-row mb-2">
                <div class="p-2 w-full text-sm">
                  <div class="flex">
                    <div class="w-28 font-semibold flex-shrink-0">Company Name</div>
                    <div>{{chooseAddress.address_name}}</div>
                  </div>
                  <div class="flex">
                    <div class="w-28 font-semibold flex-shrink-0">Recipient Name</div>
                    <div class="flex flex-wrap">
                      <div class="mr-6">{{chooseAddress.full_name}}</div>
                      <div>tel: {{chooseAddress.tel}}</div>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="w-28 font-semibold flex-shrink-0">Address</div>
                    <div><span v-if="chooseAddress.address_two != ''">{{chooseAddress.address_two}}, </span>{{chooseAddress.address_one}}, 
                      <span v-if="chooseAddress.area_name != ''">{{chooseAddress.area_name}}, </span>{{chooseAddress.city}}, {{chooseAddress.zipcode}}, {{chooseAddress.country_name}}</div>
                  </div>
                </div>
                <div class="p-2 flex-shrink-0 md:w-40 border-t md:border-l md:border-t-0 flex flex-col justify-center items-center">
                  <button class="rounded bg-gray-300 hover:bg-gray-400 py-1 px-5" 
                    @click="changeAdd">Remove</button>
                </div>
              </div>
            </div>
            <input type="text" class="hidden" v-model="oneAddress"
              v-validate="'required|Address'" data-vv-scope="package" name="Address">
            <div class="inputTips top-0">{{errors.first("Address","package")}}</div>
            <!-- <div class="inputTips -bottom-2">Please select a delivery address</div> -->
            <button class="mt-2 rounded bg-orange hover:bg-orange1 py-1 px-3 text-white"
              @click="selectAddress">Select</button>
            <!-- <div class="grid grid-cols-4 gap-4">
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="pb-2">
                  <label>Destination Type</label>
                </div>
                <select v-model="form.give_type" name="placeType" class="select h-11">
                  <option value="1">Business Address</option>
                  <option value="2">Residential Address</option>
                  <option value="3">Amazon FBA Warehouse</option>
                </select>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="pb-2">
                  <label>Country</label>
                </div>
                <div ref="destinationSelect" class="relative h-11">
                  <div class="select cursor-pointer h-11 overflow-hidden"
                      :class="[destinationShow ? 'selectOpen' : '']"
                      @click.stop="destinationShow = !destinationShow">
                    {{ destinationItem.en_nickname }}
                    <img src="../../../assets/down.svg"
                        class="absolute right-1 top-4 w-5"
                        alt="">
                  </div>
                  <order-select-country
                    :selectList="destinationList"
                    :selectChecked="destinationItem"
                    :selectOpen="destinationShow"
                    @increment="selectDestination"
                    v-show="destinationShow"
                  ></order-select-country>
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="pb-2">
                  <label>Province/States</label>
                </div>
                <div ref="stateSelect" class="relative h-11">
                  <div class="select cursor-pointer overflow-hidden h-11"
                      :class="[stateShow ? 'selectOpen' : '']"
                      @click.stop="stateShow = !stateShow">
                    {{ stateItem.name }}
                    <img src="../../../assets/down.svg"
                        class="absolute right-1 top-4 w-5"
                        alt="">
                  </div>
                  <select-city
                    :selectList="stateList"
                    :selectChecked="stateItem"
                    :selectOpen="stateShow"
                    @increment="selectState"
                    v-show="stateShow"
                  ></select-city>
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="pb-2">
                  <label>City</label>
                </div>
                <div class="relative">
                  <input v-model="form.give_city" type="text" class="input h-11"
                    v-validate="'required|orderCity'"
                    name="orderCity">
                  <div class="inputTips">{{errors.first("orderCity")}}</div>
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="pb-2">
                  <label>Postcode</label>
                </div>
                <div class="relative">
                  <input v-model="form.give_code" type="text" class="input h-11"
                    v-validate="'required|orderPostcode'"
                    name="orderPostcode">
                  <div class="inputTips">{{errors.first("orderPostcode")}}</div>
                </div>
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="pb-2">
                  <label>Contacts - optional</label>
                </div>
                <input v-model="form.give_contacts" type="text" class="input h-11">
              </div>
              <div class="col-span-4 md:col-span-2 lg:col-span-1">
                <div class="pb-2">
                  <label>Phone - optional</label>
                </div>
                <input v-model="form.give_tel" type="text" class="input h-11">
              </div>
              <div class="col-span-4">
                <div class="pb-2">
                  <label>Full Address - optional</label>
                </div>
                <textarea v-model="form.give_address" rows="3" class="input resize-none"></textarea>
              </div>
            </div> -->
          </div>
        </div>
        <div class="panel">
          <div class="mb-4 font-semibold">
            <span v-show="form.take == 1 && not_fba_address == 1" class="text-red-500">*</span>
            Supplier contact number</div>
          <div v-if="form.take == 1 && not_fba_address == 1" class="pt-3 relative">
            <input type="text" class="input" v-model="form.take_vendor_tel"
              placeholder="eg. Supplier contact number : 123456789"
              v-validate="'required|Number'" data-vv-scope="package" name="Number">
            <div class="inputTips -bottom-4">{{errors.first("Number","package")}}</div>
          </div>
          <div v-if="form.take == 0 || not_fba_address == 0" class="pt-3">
            <input type="text" class="input" v-model="form.take_vendor_tel"
             placeholder="eg. Supplier contact number : 123456789">
          </div>
        </div>
        <!-- <div class="panel">
          <div class="mb-4 font-semibold">Shipping From</div>
          <input type="text" class="input" placeholder="eg. Supplier contact number: 123456789">
        </div> -->
        <div class="panel">
          <div class="mb-4 font-semibold">Value-added Services</div>
          <div class="flex items-center flex-wrap xl:flex-nowrap">
            <div class="p-3 border border-gray-200 rounded-md w-full max-w-416 flex justify-between items-center">
              <div class="text-sm">Whether to buy insurance?</div>
              <div class="flex items-center">
                <input v-model="insurance" type="checkbox" @change="isinsurance" class="switch">
              </div>
            </div>
            <div v-show="!insurance" class="w-full xl:px-3 py-3 text-13">Without insurance, the Maximum compensation will be subject to the UPS compensation standard: 100USD/Order.</div>
            <div v-show="insurance" class="w-full xl:px-3 py-3 text-13">Add insurance, insure 3‰, zero deductible.</div>
          </div>
          <div v-if="insurance" class="mt-3 w-48 flex flex-col justify-end">
            <div class="pb-2">
              <label class="text-base">
                <span class="text-red-500">*</span>
                Declared Value</label>
            </div>
            <div class="relative">
              <input v-model="declaredValue" min="0" type="number" class="input pr-14"
                v-validate="'required|declaredValue'" data-vv-scope="package" name="declaredValue">
              <div class="inputTips -bottom-4">{{errors.first("declaredValue","package")}}</div>
              <div class="absolute right-2 sm:right-3 bottom-2 text-base">USD</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnGroup">
        <!-- <router-link :to="'/order/sourcingOrder'"> -->
          <button class="cancelbtn" @click="cancel">Cancel</button>
        <!-- </router-link> -->
        <button class="btn" @click="submit" v-show="!showLoading">Submit</button>
        <button class="loading" v-show="showLoading">
          <svg class="animate-spin mx-auto my-0.5 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="id" class="mt-5 mb-28">
      <div v-if="list.take == 1" class="panel">
        <div class="mb-4 font-semibold">Where to ship from?</div>
        <div class="pt-3 grid grid-cols-4 text-sm">
          <div class="col-span-4 sm:col-span-2 xl:col-span-1">
            <div class="routeTitle">Location Type</div>
            <div class="p-2">{{ DeliveryType[list.from_type-1] }}</div>
          </div>
          <div class="col-span-4 sm:col-span-2 xl:col-span-1">
            <div class="routeTitle">Country/Region</div>
            <div class="p-2">China</div>
          </div>
          <div class="col-span-4 sm:col-span-2 xl:col-span-1">
            <div class="routeTitle">City/ZIP Code</div>
            <div class="p-2">{{ list.delivery_city }}</div>
          </div>
          <div class="col-span-4 sm:col-span-2 xl:col-span-1">
            <div class="routeTitle">Need pickup</div>
            <div class="p-2">{{ whether[list.take] }}</div>
          </div>
        </div>
        <!-- <div class="p-2 text-sm">
          <div class="flex">
            <div class="mr-2">Full Address:</div>
            <div>{{ list.take_address }}</div>
          </div>
          <div v-if="list.take != 0" class="flex">
            <div class="mr-2">Contact who to pick up:</div>
            <div>{{ list.take_contacts }}</div>
          </div>
          <div v-if="list.take != 0" class="flex">
            <div class="mr-2">Phone:</div>
            <div>{{ list.take_tel }}</div>
          </div>
        </div>
        <div v-if="list.take != 0" class="p-2 flex">
          <div class="mr-2">Pickup Options:</div>
          <div>{{ list.take_type }}</div>
        </div> -->
      </div>
      <div class="panel">
        <div class="mb-4 font-semibold">Payment records</div>
        <div class="pt-3 grid grid-cols-10 text-sm">
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Time of payment</div>
            <div v-if="list.pay.payment_time" class="p-2">{{ list.pay.payment_time }}</div>
          </div>
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Payment method</div>
            <div v-if="list.pay.payment_method" class="p-2">{{ list.pay.payment_method }}</div>
          </div>
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Amount(USD)</div>
            <div v-if="list.pay.total_price" class="p-2">{{ list.pay.total_price }}</div>
          </div>
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Status</div>
            <div v-if="list.pay.payment_status" class="p-2">{{ list.pay.payment_status }}</div>
          </div>
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Action</div>
            <div class="p-2 flex flex-wrap">
              <button @click="toDetail(id,6)" v-if="list.pay.payment_status == '1'" class="mr-3 my-1 px-4 py-1.5 rounded bg-orange hover:bg-orange1 text-white">Pay now</button>
              <button @click="toDetail(id,5)" v-if="list.pay.invoice" class="my-1 px-4 py-1.5 rounded border border-gray-600 hover:bg-gray-300">Download invoice</button>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="mb-4 font-semibold">Cargo information</div>
        <div class="pt-3 grid grid-cols-4 text-sm">
          <div class="col-span-4 sm:col-span-1">
            <div class="routeTitle">Cargo Type</div>
            <div class="p-2">{{ productType[list.product_type] }}</div>
          </div>
          <div class="col-span-4 sm:col-span-1">
            <div class="routeTitle">Of Boxes</div>
            <div class="p-2">{{ list.num }}</div>
          </div>
          <div class="col-span-4 sm:col-span-1">
            <div class="routeTitle">Total Weight</div>
            <div class="p-2">{{ list.weight }}</div>
          </div>
          <div class="col-span-4 sm:col-span-1">
            <div class="routeTitle">Total Volume</div>
            <div class="p-2">{{ list.volume }}</div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="mb-4 font-semibold">Shipping to?</div>
        <div class="pt-3 grid grid-cols-5 text-sm">
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">Destination Type</div>
            <div class="p-2">{{ DestinationType[list.address_type] }}</div>
          </div>
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">Country/Area</div>
            <div class="p-2">{{ list.country }}</div>
          </div>
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">State/Province</div>
            <div class="p-2">{{ list.area }}</div>
          </div>
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">City</div>
            <div class="p-2">{{ list.city }}</div>
          </div>
          <div class="col-span-5 sm:col-span-1">
            <div class="routeTitle">Postal Code</div>
            <div class="p-2">{{ list.zipcode }}</div>
          </div>
        </div>
        <div class="p-2 text-sm">
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Company Name:</div>
            <div>{{ list.company_name }}</div>
          </div>
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Full Name:</div>
            <div>{{ list.full_name }}</div>
          </div>
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Phone Number:</div>
            <div>{{ list.tel }}</div>
          </div>
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Address Line 1:</div>
            <div>{{ list.address_one }}</div>
          </div>
          <div class="flex mb-1">
            <div class="mr-2 w-32 font-medium">Address Line 2:</div>
            <div>{{ list.address_two }}</div>
          </div>
        </div>
      </div>
      <div class="panel hidden">
        <div class="mb-4 font-semibold">Package Details</div>
        <div v-for="(li,ln) in list.package_info" :key="ln" class="mb-3">
          <!-- <div>Package{{ ln+1 }}</div> -->
          <div class="rounded-md bg-gray-100">
            <div class="p-3 grid grid-cols-5 text-sm">
              <div class="col-span-5 sm:col-span-1">
                <div class="p-2 border-b border-gray-300">Product name</div>
                <div class="p-2">{{ li.name }}</div>
              </div>
              <div class="col-span-5 sm:col-span-1">
                <div class="p-2 border-b border-gray-300">Packing type</div>
                <div class="p-2">{{ PackageType[li.type-1] }}</div>
              </div>
              <div class="col-span-5 sm:col-span-1">
                <div class="p-2 border-b border-gray-300">Number of Packages</div>
                <div class="p-2">{{ li.num_str }}</div>
              </div>
              <div class="col-span-5 sm:col-span-1">
                <div class="p-2 border-b border-gray-300">Volume</div>
                <div class="p-2">{{ li.cube_str }}</div>
              </div>
              <div class="col-span-5 sm:col-span-1">
                <div class="p-2 border-b border-gray-300">Weight</div>
                <div class="p-2">{{ li.weight_str }}</div>
              </div>
              <!-- <div class="col-span-7 sm:col-span-1">
                <div class="p-2 border-b border-gray-300">Customs code</div>
                <div class="p-2">{{ li.hs_code }}</div>
              </div> -->
              <!-- <div class="col-span-6 sm:col-span-1">
                <div class="p-2 border-b border-gray-300">Declare value</div>
                <div class="p-2">{{ li.value_str }}</div>
              </div> -->
            </div>
            <!-- <div class="p-5 text-sm"> -->
              <!-- <div class="flex">
                <div class="mr-2">Product Type:</div>
                <div>{{ li.product_type_name }}</div>
              </div> -->
              <!-- <div class="flex">
                <div class="mr-2">Remark:</div>
                <div>{{ li.remark }}</div>
              </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="mb-4 font-semibold">Shipping from?</div>
        <div>{{ list.vendor }}</div>
      </div>
      <div class="panel">
        <div class="mb-4 font-semibold">Value-added Services</div>
        <div class="flex text-sm">
          <div class="mr-10">Insurance Service</div>
          <div>{{ whether[list.insurance] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect'
import SelectCity from '@/components/SelectCity'
import OrderSelectCity from '@/components/Order/Forwarding/OrderSelectCity'
import OrderSelectCountry from '@/components/Order/Forwarding/OrderSelectCountry'
import SelectCountry from '@/components/SelectCountry'
import {
  getSelData,
} from '@/api/warehouse'
import {
  reqGetAddress,
  reqGetAddressz,
  reqCountries,
  reqAddress,
  reqEditAddress,
  reqDelAddress,
  reqGetCity
} from '@/api/address'
// import {
//   reqStates
// } from '@/api/address'
import {
  getCountry,
  getStates,
  submitReq,
  getOrderInfo,
  quickOrder,
  ImgUpload
} from '@/api/order'
export default {
  components: {
    MultiSelect,
    SelectCity,
    OrderSelectCity,
    OrderSelectCountry,
    SelectCountry
  },
  name: 'ForwardRequest',
  props: {
    id: null,
    tab: '',
    shippingCost: {}
  },
  data() {
    return {
      package:[
        {
          isDimensions: true,
          name: '',
          type: 1,
          weight: 1,
          volume: 1,
          total: 1,
          length: null,
          width: null,
          height: null,
          product_type: [],
          value: null,
          multiple_choice:[],
          productTypeShow: false,
          multiSelected: [],
        },
      ],
      take: false,
      insurance: false,
      multiple_choice1: [],
      // package_type: ['bag','carton','box'],
      totalDetail: 'metric',
      weight: 'KG',
      weight1: 1,
      volume: 'CBM',
      volume1: 1,
      volumeUnit: 'CM',
      volumeUnit1: 1,
      form: {
        delivery_type: 1,
        delivery_city: '',
        take: 0,
        give_type: 1,
        give_country: '美国',
        give_code: '',
        insurance: 0,
        product_info: [],
        take_vendor_tel: '',
      },
      pack_type: 1,
      originList: [],
      originItem: {},
      originShow: false,
      destinationList: [],
      destinationItem: {zh_cn_nickname: '美国', code_two: 'US', en_nickname: 'United States'},
      destinationShow: false,
      stateList: [],
      stateItem: {},
      stateShow: false,
      list: [],
      whether: ['Not Include','Include'],
      DeliveryType: ['warehouse','residential'],
      DestinationType: ['','FBA Address','Non-FBA Warehouse'],
      productType:['','General products','Special products'],
      PackageType: ['carton'],
      totalWeight: 0,
      totalVolume: 0,
      totalNum: 0,
      tax: '',
      freight: '',
      aging_start: '',
      aging_end: '',
      unit_price: '',
      add_price: '',
      opera_price: null,
      product_name_e: '',
      shipping_from: '',
      shipping_from_ch: '',
      shipping_to: '',
      shipping_to_ch: '',
      orderType: 2,
      quickWeight: '',
      quickWeightUnit: null,
      quickTransport_type: null,
      cargo_info: '',
      contact_number: '',
      whatsapp: '',
      wetch: '',
      showLoading: false,
      toShippingOrder: null,
      freight_good: '',
      customer_manage: {},
      take_fee: null,
      infos: {},
      addList: [],
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
      },
      countryList: [],
      countryItem: {},
      ADDcountryItem: {},
      countryShow: false,
      addressTitle: 'Add New',
      userInfo: {},
      chooseAddress: {},
      uploadShow: true,
      order_img_url: '',
      order_img_name: '',
      shipping_from_en: '',
      oneAddress: '',
      submitSuccess: false,
      addstate: '',
      addcity: '',
      shippingcity: '',
      shippingcitys: '',
      cityList: [],
      citySelectList: [],
      cityShow: false,
      goodtype: null,
      not_fba_address_fee: null,
      product_fee: null,
      not_fba_address: 0,
      declaredValue: null,
    }
  },
  watch:{
    tab: {
      handler (val, oldVal) {
        if(val==0){
          this.getData()
        }
      }
    }
  },
  created() {
    if(this.id){
      this.getData()
    } else {
      this.countryQuest()
      // // this.statesQuest('US')
      // getSelData().then((res)=>{
      //   if(res.code == 0){
      //     res.data.forEach(item=>{
      //       Object.assign(item,{selected:false})
      //     })
      //     this.multiple_choice1 = res.data
      //     const mul = JSON.parse(JSON.stringify(this.multiple_choice1))
      //     this.package[0].multiple_choice = mul
      //   }
      // })
      
      this.infos = JSON.parse(localStorage.getItem("orderRouter"))
      // console.log(this.infos)
      this.form.delivery_type = this.infos.product_info.delivery_type
      this.form.delivery_city = this.infos.product_info.shipping_from
      this.shipping_from_en = this.infos.product_info.shipping_from_en
      this.form.take = this.infos.product_info.take
      this.form.give_type = this.infos.product_info.shipping_to_type
      this.form.fba_code = this.infos.product_info.fba_code
      this.form.give_country = this.infos.product_info.shipping_to
      this.form.give_code = this.infos.product_info.shipping_to_zipcode
      this.pack_type = this.infos.product_info.load_type
      this.not_fba_address_fee = this.infos.not_fba_address_fee
      this.product_fee = this.infos.product_fee
      this.not_fba_address = this.infos.product_info.not_fba_address
      
      if(this.infos.product_info.product_two == 1){
        this.goodtype = 1
      }else if(this.infos.product_info.product_two == 2){
        this.goodtype = 2
      }
      
      if(this.form.give_type != '1'){
        let endcity = []
        let state = []
        endcity = this.form.give_code.split(',')
        // state = endcity[1].replace(' Dong Province / State','')
        state = endcity[1]
        this.addstate = state
        this.addcity = endcity[0]
      }
      if(this.pack_type == 1){
        this.package[0].total = this.infos.product_info.total
        this.package[0].weight = this.infos.product_info.weight
        this.package[0].volume = this.infos.product_info.volume
      }else{
        // this.form1.size_unit = this.infos.product_info.volume_unit
        // this.form1.weight_unit = this.infos.product_info.weight_unit
        this.package = []
        let vo = this.infos.product_info.volume.split('-')
        let we = this.infos.product_info.weight.split(',')
        let to = this.infos.product_info.total.split(',')
        let tn = 0
        let tv = 0
        let tw = 0
        for(let bn=0;bn<vo.length;bn++){
          tn += Number(to[bn])
          tw += (Number(we[bn]) * Number(to[bn]))
          
          let boxsize = ''
          let box = {
            length: 0,
            width: 0,
            height: 0,
            weight: 0,
            total: 0,
            value: 0,
            volume: 0,
            right: true,
          }
          boxsize = vo[bn].split(',')
          box.length = boxsize[0]
          box.width = boxsize[1]
          box.height = boxsize[2]
          if(this.infos.product_info.volume_unit == 1){
            tv += (Number(box.length * box.width * box.height) * Number(to[bn])/1000000)
          }else{
            tv += (Number(box.length * box.width * box.height) * Number(to[bn])/1728)
          }
          box.weight = we[bn]
          box.total = to[bn]
          this.package.push(box)
        }
        this.totalNum = tn
        this.totalVolume = tv
        this.totalWeight = tw
      }
      if(this.infos.product_info.volume_unit == 1){
        this.chooseUnit('metric')
      }else{
        this.chooseUnit('imperial')
      }
      if(this.infos.weight){
        this.package[0].weight = this.infos.weight
        this.form.take = 0
      }
    }
    // if(this.shippingCost!=undefined){
    //   this.tax = this.shippingCost.tax
    //   this.freight = this.shippingCost.freight
    //   this.aging_start = this.shippingCost.aging_start
    //   this.aging_end = this.shippingCost.aging_end
    //   this.unit_price = this.shippingCost.unit_price
    //   this.add_price = this.shippingCost.add_price
    //   this.opera_price = this.shippingCost.opera_price
    //   this.product_name_e = this.shippingCost.product
    //   this.shipping_from_ch = this.shippingCost.shipping_from_ch
    //   this.shipping_from = this.shippingCost.shipping_from
    //   this.shipping_to_ch = this.shippingCost.shipping_to_ch
    //   this.shipping_to = this.shippingCost.shipping_to
    //   this.take = this.shippingCost.pick_up
    //   this.quickWeight = this.shippingCost.weight
    //   this.quickWeightUnit = this.shippingCost.weight_unit
    //   this.package[0].weight = this.shippingCost.weight
    //   this.quickTransport_type = this.shippingCost.transport_type
    //   this.freight_good = this.shippingCost.freight_good
    //   if(this.shippingCost.number > 0){
    //     this.package[0].total = this.shippingCost.number
    //   }
    //   if(this.shippingCost.length > 0){
    //     this.package[0].length = this.shippingCost.length
    //   }
    //   if(this.shippingCost.width > 0){
    //     this.package[0].width = this.shippingCost.width
    //   }
    //   if(this.shippingCost.height > 0){
    //     this.package[0].height = this.shippingCost.height
    //   }
    //   if(this.shippingCost.weight_unit == 2){
    //     this.chooseUnit('imperial')
    //   }
    //   let volume1 = this.shippingCost.length * this.shippingCost.width * this.shippingCost.height
    //   if(volume1!=0){
    //     this.package[0].volume = volume1
    //   }
    //   this.destinationItem.en_nickname = this.shippingCost.shipping_to
    //   this.destinationItem.zh_cn_nickname = this.shippingCost.shipping_to_ch
    //   this.destinationItem.code_two = this.shippingCost.shipping_to_iso2
    //   this.statesQuest(this.shippingCost.shipping_to_iso2)
    //   this.take_fee = this.shippingCost.take_fee
    //   console.log(this.shippingCost)
    // }
    // getStates({code_two: 'CN'}).then((res)=>{
    //   console.log(res)
    // })
  },
  mounted() {
    document.addEventListener(
      'click',
      this.even,
      true
    )
    this.customer_manage = JSON.parse(localStorage.getItem('customer_manage'))
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    reqGetAddressz({
      email: this.userInfo.email,
      country_two: this.infos.iso
    }).then((res)=>{
      this.addList = res.data
    })
  },
  destroyed() { 
    document.removeEventListener('click', this.even, true) 
  },
  methods: {
    even(e){
      
      if(!this.id){
        // if (!this.$refs.originSelect.contains(e.target)) {
        //   this.originShow = false
        // }
        // if(this.orderType == 2){
        //   if (!this.$refs.destinationSelect.contains(e.target)) {
        //     this.destinationShow = false
        //   }
          if (!this.$refs.countrySelect.contains(e.target)) {
            this.countryShow = false
          }
          if (!this.$refs.stateSelect.contains(e.target)) {
            this.stateShow = false
          }
          if (!this.$refs.citySelect.contains(e.target)) {
            this.cityShow = false
          }
          // if(this.form.pack_type == 1){
          //   if(!this.$refs.ProductType.contains(e.target)){
          //     this.package[0].productTypeShow = false
          //   }
          // }else{
          //   for(let n=0;n<this.package.length;n++){
          //     if(!this.$refs[`ProductType${n}`][0].contains(e.target)){
          //       this.package[n].productTypeShow = false
          //     }
          //   }
          // }
        // }
      }
      // if (!this.$refs.productTypeSelect.contains(e.target)) {
      //   this.productTypeShow = false
      // }
      // this.package[0].productTypeShow = false
    },
    addPackage(){
      const mul = JSON.parse(JSON.stringify(this.multiple_choice1))
      let a = {
        // isDimensions: true,
        // name: '',
        // type: 1,
        // weight: null,
        // volume: null,
        // total: 1,
        // length: null,
        // width: null,
        // height: null,
        // product_type: [],
        // value: null,
        // multiple_choice: mul, 
        // productTypeShow: false,
        // multiSelected: [],
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
        total: 0,
        value: 0,
        volume: 0,
        right: false,
      }
      this.package.push(a)
    },
    deletePackage(i){
      this.package.splice(i,1)
      this.TotalQty()
      this.TotalWeight()
      this.TotalVolume()
    },
    chooseUnit(data){
        this.totalDetail = data
        if(data == 'metric'){
          this.weight = 'KG'
          this.weight1 = 1
          this.volume = 'CBM'
          this.volume1 = 1
          this.volumeUnit = 'CM'
          this.volumeUnit1 = 1
          // this.form.pack_type = '1'
        }else{
          this.weight = 'LB'
          this.weight1 = 2
          this.volume = 'CBF'
          this.volume1 = 2
          this.volumeUnit = 'IN'
          this.volumeUnit1 = 2
          // this.form.pack_type = '2'
        }
        this.totalBoxes()
      },
    chooseUnit1(i,data){
      this.package[i].isDimensions = data
      if(data){
        this.package[i].length = null
        this.package[i].width = null
        this.package[i].height = null
      } else {
        this.package[i].volume = null
      }
      this.TotalVolume()
    },
    multiSelect(e,i){
      this.package[i].multiSelected = e
      // this.package[i].productTypeShow = true
    },
    // switchDetail(e){
    //   this.form.pack_type = e
    // },
    // submits(){
    //   this.$refs.mask.style = 'display:block;'
    //   this.$refs.noPriceModal.style = 'display:block;'
    //   setTimeout(()=> {
    //     this.$refs.mask.style = 'display:block;opacity:1;'
    //     this.$refs.noPriceModal.style =
    //       'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
    //   },1)
    // },
    async submit(){
      // if(this.orderType == 1){
      //   const success = await this.$validator.validateAll()
      //   if(success){
      //     this.showLoading = true
      //     let QuickOrder = {
      //       manage_id: 1,
      //       start_city: this.shipping_from_ch,
      //       end_country: this.shipping_to_ch,
      //       weight: this.quickWeight,
      //       weight_unit: this.quickWeightUnit,
      //       transport_type: this.quickTransport_type,
      //       aging_start: this.aging_start,
      //       aging_end: this.aging_end,
      //       tax: this.tax,
      //       take: this.take,
      //       take_contacts: this.form.take_contacts,
      //       take_tel: this.form.take_tel,
      //       take_address: this.form.take_address,
      //       delivery_city: this.originItem.name,
      //       delivery_type: this.form.delivery_type,
      //       estimate_put_time: this.form.estimate_put_time,
      //       contact_tel: this.contact_number,
      //       whatsapp: this.whatsapp,
      //       wetch: this.wetch,
      //       content: this.cargo_info,
      //       freight_good: this.freight_good
      //     }
      //     if(this.customer_manage.id){
      //       QuickOrder.manage_id = this.customer_manage.id
      //     }else{
      //       QuickOrder.manage_id = 1
      //     }
      //     setTimeout(()=> {
      //       quickOrder(QuickOrder).then((res)=>{
      //         if(res.code == 0){
      //           this.$refs.mask.style = 'display:block;'
      //           this.$refs.successModal.style = 'display:block;'
      //           setTimeout(()=> {
      //             this.$refs.mask.style = 'display:block;opacity:1;'
      //             this.$refs.successModal.style =
      //               'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      //           },1)
      //         }
      //       })
      //     },1000)
      //   }
      // }else{
        const success = await this.$validator.validateAll('package')
        if(success){
          // this.showLoading = true
          let a = []
          for(let n = 0;n<this.package.length;n++){
            if(this.pack_type == 2 ){
              if(!this.package[n].right ){
                this.submitSuccess = false
              }else{
                this.submitSuccess = true
              }
            }else{
              this.submitSuccess = true
            }
            // let multi = []
            // for(let m = 0;m < this.package[n].multiSelected.length;m++){
            //   multi.push(this.package[n].multiSelected[m].id)
            // }
            let b = {
              
              weight: this.package[n].weight,
              weight_unit: this.weight1,
              cube: this.package[n].volume,
              cube_unit: this.volume1,
              
              length: this.package[n].length,
              width: this.package[n].width,
              height: this.package[n].height,

              size_unit: this.volumeUnit1,
              num: this.package[n].total,
              value: this.package[n].value,
            }
            b.name = "#" + (n+1)
            a.push(b)
          }
          // this.infos

          this.form.product_info = a
          this.form.tax = this.infos.tax
          this.form.freight = this.infos.freight
          this.form.aging_start = this.infos.aging_start
          this.form.aging_end = this.infos.aging_end
          this.form.unit_price = this.infos.unit_price
          this.form.add_price = this.infos.add_price
          this.form.opera_price = this.infos.opera_price
          this.form.freight_good = this.infos.freight_good
          this.form.take_fee = this.infos.take_fee
          this.form.give_address_id = this.chooseAddress.id
          this.form.order_img_url = this.order_img_url
          this.form.order_img_name = this.order_img_name
          this.form.product_type = this.goodtype
          this.form.not_fba_address_fee = this.not_fba_address_fee
          this.form.product_fee = this.product_fee
          this.form.declared = this.declaredValue
          this.form.transport_type = this.infos.transport_type

          if(this.customer_manage.id){
            this.form.customer_manage = this.customer_manage.id
          }else{
            this.form.customer_manage = 1
          }
          // console.log(this.form)
          let data = JSON.stringify(this.form)
          if(this.submitSuccess){
            this.showLoading = true
            setTimeout(()=> {
              submitReq({
                data: data
              }).then((res)=>{
                // console.log(res)
                if(res.code == 0){
                  this.toShippingOrder = res.data
                  if(this.form.take_vendor_tel != ''){
                    this.$refs.mask.style = 'display:block;'
                    this.$refs.successModal.style = 'display:block;'
                    setTimeout(()=> {
                      this.$refs.mask.style = 'display:block;opacity:1;'
                      this.$refs.successModal.style =
                        'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
                    },1)
                    setTimeout(()=>{
                      this.$router.push('/order/forwardingOrder/'+ res.data)
                    },10000)
                  }else{
                    this.$refs.mask.style = 'display:block;'
                    this.$refs.successModals.style = 'display:block;'
                    setTimeout(()=> {
                      this.$refs.mask.style = 'display:block;opacity:1;'
                      this.$refs.successModals.style =
                        'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
                    },1)
                  }
                }else if(res.code == '-1' && res.msg == '快递订舱失败'){
                  this.showLoading = false
                  this.$refs.mask.style = 'display:block;'
                  this.$refs.noPriceModal.style = 'display:block;'
                  setTimeout(()=> {
                    this.$refs.mask.style = 'display:block;opacity:1;'
                    this.$refs.noPriceModal.style =
                      'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
                  },1)
                }
              })
            },1000)
          }
        }
      // }
    },
    cancel(){
      this.$refs.mask.style = 'display:block;'
      this.$refs.cancelModal.style = 'display:block;'
      setTimeout(()=> {
        this.$refs.mask.style = 'display:block;opacity:1;'
        this.$refs.cancelModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      },1)
    },
    cancelcancel(){
      this.$refs.mask.style = 'display:block;'
      this.$refs.cancelModal.style = 'display:block;'
      setTimeout(()=> {
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.cancelModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },180)
    },
    cancelconfirm(){
      this.$router.push('/main/booking')
    },
    istake(){
      if(this.take){
        //提货
        this.form.take = 1
        this.form.delivery_type = 1
        this.originItem = this.originList[0]
      } else {
        this.form.take = 0
        this.form.delivery_type = null
        this.originItem = ''
        this.form.take_contacts = ''
        this.form.take_tel = ''
        this.form.take_address = ''
        // this.form.take_type = []
        this.form.estimate_put_time = ''
      }
    },
    isinsurance(){
      if(this.insurance){
        this.form.insurance = 1
      } else {
        this.form.insurance = 0
      }
    },
    // selectOrigin(data, show) {
    //   this.originItem = data
    //   this.originShow = show
    //   this.form.delivery_city = data.name
    // },
    selectDestination(data, show) {
      this.destinationItem = data
      this.destinationShow = show
      this.form.give_country = data.zh_cn_nickname
      this.statesQuest(data.code_two)
    },
    selectState(data, show) {
      this.stateItem = data
      this.stateShow = show
      this.form.give_area = data.iso2
    },
    countryQuest(){
      // getCountry().then((res)=>{
        // console.log(res)
        // this.destinationList = res.data.countryData
        // this.originList = res.data.deliveryCityData
        // this.originItem = this.originList[0]
        // this.form.delivery_city = this.originList[0].name
      // })
      reqCountries().then((res) => {
        this.countryList = res.data
        for(let n=0;n<this.countryList.length;n++){
          // if(this.infos.product_info.shipping_to_en == this.countryList[n].name){
          if(this.infos.iso == this.countryList[n].iso2){
            this.ADDcountryItem = this.countryList[n]
            // this.statesQuest(this.ADDcountryItem.iso2,'add')
            // console.log(this.stateList)
            break;
          }
        }
      })
    },
    statesQuest(iso,type,area) {
      getStates({ code_two: iso }).then((res) => {
        if (res.code == 0 && res.data.length > 0) {
          this.stateList = res.data
          this.stateItem = res.data[0]
          if(type == 'select'){
            this.cityQuest(iso,this.stateItem.iso2)
            this.shippingcity = ''
            this.shippingcitys = ''
          }
          // this.form.give_area = this.stateItem.iso2
          if(type == 'add'){
            // console.log(this.stateItem);
            // if(this.addstate != ''){
              // for(let m=0;m<this.stateList.length;m++){
                // if(this.addstate == this.stateList[m].name){
                  this.stateItem = this.stateList[0]
                  this.shippingAddress.area = this.stateItem.name
                  this.shippingAddress.areaName = this.stateItem.name
                  this.cityQuest(iso,this.stateList[0].iso2)
                  this.shippingcity = this.addcity
                  this.shippingcitys = this.addcity
                // }
              // }
            // }
            // else{
            //   this.cityQuest(iso,this.stateItem.iso2)
            //   this.shippingcity = ''
            //   this.shippingcitys = ''
            // }
            setTimeout(()=>{
              this.$validator.reset()
            },1)
          }
          if(type == 'change' && area.length > 0){
            for(let m=0;m<this.stateList.length;m++){
              if(area == this.stateList[m].name){
                this.stateItem = this.stateList[m]
                this.cityQuest(iso,this.stateList[m].iso2)
              }
            }
          }
        } else {
          this.stateList = []
          this.stateItem = {}
          // this.form.give_area = ''
        }
      })
    },
    cityQuest(code1,code2){
      reqGetCity({
        country_code: code1,
        state_code: code2,
      }).then((res)=>{
        this.cityList = res.data.reverse()
        // this.cityList = res.data.reverse().slice(0,10)
      })
    },
    getData(){
      getOrderInfo({
        id: this.id,
        type: 1
      }).then((res)=>{
        this.list = res.data
        // this.list.package_info = this.list.package_info.reverse()
        this.tax = this.list.tax
      })
    },
    TotalQty(){
      let a = 0
      for(let n=0;n<this.package.length;n++){
        a += Number(this.package[n].total)
      }
      this.totalNum = a
    },
    TotalWeight(){
      let a = 0
      for(let n=0;n<this.package.length;n++){
        a += Number(this.package[n].weight)
      }
      this.totalWeight = a
    },
    TotalVolume(){
      // if(this.package[i].isDimensions){
        let a = 0
        for(let n=0;n<this.package.length;n++){
          if(this.package[n].isDimensions){
            a += (Number(this.package[n].length)*Number(this.package[n].width)*Number(this.package[n].height))
          } else {
            a += Number(this.package[n].volume)
          }
        }
        this.totalVolume = a
        // console.log(a)
      // }
    },
    dateSelect(){
      let date = this.$refs.dateSelect
      date.showPicker()
      // this.$refs.dateSelect.showPicker()
    },
    selectAddress(){
      this.$refs.mask.style = 'display:block;'
      if(this.addList.length<1){
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
    addaAddress(){
      this.countryItem = this.ADDcountryItem
      // this.shippingcity = this.addcity
      // this.shippingcitys = this.addcity
      this.shippingAddress.address_name = ''
      this.shippingAddress.full_name = ''
      // this.shippingAddress.city = ''
      this.shippingAddress.city = this.addcity
      this.shippingAddress.address_one = ''
      this.shippingAddress.address_two = ''
      // if(this.form.give_type == '1'){
      //   this.shippingAddress.zipcode = this.form.give_code
      // }else{
        this.shippingAddress.zipcode = ''
      // }
      this.shippingAddress.tel = ''
      this.shippingAddress.id = ''
      this.shippingAddress.country = this.countryItem.iso2
      this.shippingAddress.countryName = this.countryItem.name
      this.shippingAddress.email = this.userInfo.email
      // this.shippingAddress.area = this.stateItem.iso2
      // this.shippingAddress.areaName = ''
      this.shippingAddress.address_type = null
      this.shippingAddress.fba_code = ''
      this.addressTitle = 'Add New'
      this.statesQuest(this.ADDcountryItem.iso2,'add')
      this.$refs.addressModal.style =
        'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      this.$refs.addAddressModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
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
    selectCountry(data, clickOne) {
      this.countryItem = data
      this.shippingAddress.countryName = data.name
      this.shippingAddress.country = data.iso2
      this.countryShow = clickOne
      this.statesQuest(data.iso2,'select')
    },
    selectStates(data, clickOne) {
      this.stateItem = data
      this.shippingAddress.areaName = data.name
      this.shippingAddress.area = data.name
      this.stateShow = clickOne
      // console.log(this.countryItem)
      this.cityQuest(this.countryItem.iso2,data.iso2)
      this.shippingcity = ''
      this.shippingcitys = ''
    },
    changeAddress(i){
      // console.log(i)
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
      this.addressTitle = 'Change'
      this.shippingcity = i.city
      this.shippingcitys = i.city
      for(let n=0;n<this.countryList.length;n++){
        if(i.country_name == this.countryList[n].name){
          this.countryItem = this.countryList[n]
          this.statesQuest(this.countryItem.iso2,'change',i.area_name)
        }
      }
      this.$refs.addressModal.style =
        'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      this.$refs.addAddressModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
    },
    async addressSave(){
      // console.log(this.shippingAddress)
      const success = await this.$validator.validateAll()
      // const success = await this.$validator.validate('scope.*')
      if(success){
        if(this.shippingAddress.id!=''){
       // this.shippingAddress.area = this.stateItem.iso2
          reqEditAddress(this.shippingAddress).then((res) => {
            reqGetAddressz({ 
              email: this.userInfo.email,
              country_two: this.infos.iso
            }).then((req)=>{
              this.addList = req.data
              this.$refs.addAddressModal.style =
                'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
              this.$refs.addressModal.style =
                  'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
            })
          })
        }else{
          //xinzeng
          // console.log(this.shippingAddress);
          reqAddress(this.shippingAddress).then((res) => {
            reqGetAddressz({ 
              email: this.userInfo.email,
              country_two: this.infos.iso
            }).then((req)=>{
              this.addList = req.data
              this.$refs.addAddressModal.style =
                'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
              this.$refs.addressModal.style =
                  'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
            })
          })
        }
      }
    },
    removeAddress(data){
      reqDelAddress({id: data}).then((res) => {
        reqGetAddressz({ 
          email: this.userInfo.email,
          country_two: this.infos.iso
        }).then((req)=>{
          this.addList = req.data
        })
      })
    },
    chooseAdd(i,n){
      this.chooseAddress = i[n]
      this.oneAddress = i[n].id
      this.closeModal()
    },
    changeAdd(){
      this.chooseAddress = {}
      this.oneAddress = ''
    },
    upload() {
        this.$refs.iptFileRef.click()
      },
    uploadPL(e){
      var that = this
      const files = e.target.files[0]
      let data = new FormData()
      data.append('file', files);
      // console.log(data)
      // console.log(this.form)
      ImgUpload(data).then((res)=>{
        if( res.code == 0 ){
          this.order_img_url = res.data.file
          this.order_img_name = res.data.name
          this.uploadShow = false
        }
      })
    },
    delPL(){
      this.$refs.iptFileRef.value = ''
      this.order_img_url = ''
      this.order_img_name = ''
      this.uploadShow = true
    },
    totalBoxes(){
      let volumn = 0
      let Weight = 0
      let num = 0
      for(let n=0;n<this.package.length;n++){
        if(this.package[n].length>0 && this.package[n].width>0 && this.package[n].height>0 &&
        this.package[n].weight>0 && this.package[n].total>0){
          this.package[n].right = true
          if(this.volumeUnit1 == 1){
            volumn += Number(this.package[n].length * this.package[n].width * this.package[n].height/1000000) * Number(this.package[n].total)
          }else{
            volumn += Number(this.package[n].length * this.package[n].width * this.package[n].height/1728) * Number(this.package[n].total)
          }
          Weight += Number(this.package[n].weight) * Number(this.package[n].total)
          num += Number(this.package[n].total)
        }else{
          this.package[n].right = false
        }
      }
      this.totalVolume = Number(volumn).toFixed(2)
      this.totalWeight = Number(Weight).toFixed(2)
      this.totalNum = Number(num).toFixed(0)
    },
    delLoad(e){
      if(this.package.length > 1){
        this.package.splice(e, 1)
        this.totalBoxes()
      }
    },
    copyLoad(e){
      let a = JSON.parse(JSON.stringify(this.package[e]))
      this.package.splice(e, 0, a)
      this.totalBoxes()
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
    selectgoodtype(num){
      this.goodtype = num
    },
    copyInfo(){
      var text = `Address: Cooperate Logistics Warehouse, 102 Building C, Hezhihe Industrial Park, No.2990 Songbai Road, Shiyan, Baoan, Shenzhen
Customer service call: +86-28225927
Name: Andy.Liu
Postcode: 518000`
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text)
        } else {
          var textarea = document.createElement('textarea')
          document.body.appendChild(textarea)
          textarea.style.position = 'fixed'
          textarea.style.clip = 'rect(0 0 0 0)'
          textarea.style.top = '10px'
          textarea.value = text
          textarea.select()
          document.execCommand('copy', true)
          document.body.removeChild(textarea)
        }
    },
    closePriceModal(){
      this.$refs.mask.style = 'display:none;opacity:0;'
      this.$refs.noPriceModal.style =
        'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
    },
    toDetail(id,type){
      this.$router.push({
        path: '/order/forwardingOrder/'+id,
        query: {
          type: type
        },
      })
      setTimeout(()=>{
        this.$router.go(0)
      },300)
    }
  },
}
</script>

<style lang="postcss" scoped>
.panel{
  @apply p-6 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default;
}

.routeTitle{
  @apply p-2 border-b border-gray-300 bg-gray-200;
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
  @apply bg-switch;
}

.switch:checked:before {
  left: 34px;
}

.switch:checked:after {
  @apply text-black;
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
  @apply flex justify-end mt-10 w-full pb-32;
}

.selectOpen {
  @apply bg-selectOpen !important;
}

.inputTips {
  @apply left-0 text-xs text-red-500 absolute;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply shadow-md fixed z-50 top-1/2 right-1/2 transform scale-50 hidden translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.loading {
  @apply w-28 px-2.5 py-2 bg-orange justify-center rounded;
}

textarea::-webkit-input-placeholder{
	color: #999;
	font-size: 12px;
}

textarea:-moz-placeholder{
	color: #999;
	font-size: 12px;
}

textarea::moz-placeholder{
	color: #999;
	font-size: 12px;
}

textarea:-ms-input-placeholder{
    color: #999;
    font-size: 12px;
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

.radioBtn{
  @apply w-52 py-1.5 px-2 mr-6 font-semibold rounded-sm border border-inputBorder hover:bg-gray-200;
}

.radioChoose{
  @apply border-orange text-orange;
}
</style>
