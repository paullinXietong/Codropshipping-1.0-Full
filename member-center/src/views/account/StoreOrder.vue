<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask" @click="closeModal"></div>
    <div ref="modal" class="modal w-900">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3 px-5">
        <div class="text-xl">Order Details</div>
        <img class="w-7 h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded" 
          @click="closeModal" src="../../assets/close.svg" alt="">
      </div>
      <div class="p-5 grid grid-cols-3 gap-5">
        <div class="col-span-1">
          <label>Store Name</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" v-model="detailItem.store_name" disabled>
        </div>
        <div class="col-span-2">
          <label>Remark</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" disabled>
        </div>
        <div class="col-span-1">
          <label>Name</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" v-model="detailItem.addressee" disabled>
        </div>
        <div class="col-span-1">
          <label>Phone Number</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" v-model="detailItem.phone" disabled>
        </div>
        <div class="col-span-1">
          <label>Email</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" v-model="detailItem.email" disabled>
        </div>
        <div class="col-span-1">
          <label>Country/Area</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" v-model="detailItem.address.country" disabled>
        </div>
        <div class="col-span-1">
          <label>State/Province</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" v-model="detailItem.address.province" disabled>
        </div>
        <div class="col-span-1">
          <label>City</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" v-model="detailItem.address.city" disabled>
        </div>
        <div class="col-span-1">
          <label>Postal Code</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" v-model="detailItem.address.zip" disabled>
        </div>
        <div class="col-span-2">
          <label>Address Line</label>
          <input type="text" class="mt-1.5 input h-9 bg-gray-100" v-model="detailItem.address.address1" disabled>
        </div>
        <div class="mt-4 col-span-3 text-sm border-t border-l">
          <div class="flex h-8 bg-gray-300 justify-center items-center ">
            <div class=" ml-2 mr-2 w-12">Image</div>
            <div class=" mr-6 w-470">Name</div>
            <div class=" mr-4 w-40">Sku</div>
            <div class=" w-40">Count</div>
          </div>
          <div v-for="(i,n) in detailItem.line_items" class="p-3 flex items-center border-b border-r">
            <img :src="i.image" class="mr-4 w-12 h-12" alt="">
            <div class="mr-6 w-470">{{i.name}}</div>
            <div class="mr-4 w-40">{{i.sku}}</div>
            <div class="w-40">{{i.quantity}}</div>
          </div>
        </div>
      </div>
    </div>
    <div ref="addAddressModal" class="modal p-5 w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine pb-3">
        <div class="text-xl">Update Address</div>
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-4">
        <div class="col-span-1">
          <div class="flex">First Name</div>
          <div class="relative">
            <input type="text" class="input" v-model="editItem.address.firstName">
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>
            Last Name</div>
          <div class="relative">
            <input type="text" class="input" v-model="editItem.address.lastName">
          </div>
        </div>
        <div class="col-span-2">
          <div class="flex">
            <div class="required">*</div>Country</div>
            <el-select v-model="country" filterable placeholder="" @change="checkCountry">
              <el-option
                v-for="(item,n) in destinationList"
                :key="n"
                :label="item.en_nickname"
                :value="item.en_nickname">
              </el-option>
            </el-select>
          <!-- <div ref="countrySelect" class="relative">
            <div class="select cursor-pointer h-42px overflow-hidden"
              :class="[countryShow ? 'selectOpen' : '']"
              @click.stop="countryShow = !countryShow">
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
          </div> -->
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>Province</div>
            <div class="relative">
              <input type="text" class="input" v-model="editItem.address.province">
            </div>
            <!-- <el-select v-model="province" filterable placeholder="" @change="checkProvince">
              <el-option
                v-for="(item,n) in provinceList"
                :key="n"
                :label="item.name"
                :value="item.iso2">
              </el-option>
            </el-select> -->
          <!-- <div ref="stateSelect" class="relative h-42px">
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
          </div> -->
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>City</div>
          <div class="relative">
            <input type="text" class="input" v-model="editItem.address.city">
          </div>
          <!-- <div class="relative">
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
          </div> -->
        </div>
        <div class="col-span-2">
          <div class="flex">
            <div class="required">*</div>Address Line1</div>
          <div class="relative">
            <input type="text" class="input" v-model="editItem.address.address1">
          </div>
        </div>
        <div class="col-span-2">
          <div>Address Line2</div>
          <div>
            <input type="text" class="input" v-model="editItem.address.address2">
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>Postal Code</div>
          <div class="relative">
            <input type="text" class="input" v-model="editItem.address.zip">
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <div class="required">*</div>Phone</div>
          <div class="relative">
            <input type="text" class="input" v-model="editItem.phone">
          </div>
        </div>
        <div class="col-span-2">
          <div class="flex">Email</div>
          <div class="relative">
            <input type="text" class="input" v-model="editItem.email">
          </div>
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
    <div ref="shippingModal" class="modal p-5 w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine pb-3">
        <div class="text-xl">Shipping Methods</div>
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="mt-4 py-2 grid grid-cols-3 gap-4" style="background: #f7f7f7;">
        <div class="col-span-1 ">Shipping Method</div>
        <div class="col-span-1">Total Shipping Cost</div>
        <div class="col-span-1">Delivery Time</div>
      </div>
      <label v-for="(i,n) in shippingList" :key="n" class="mt-4 grid grid-cols-3 gap-4 cursor-pointer">
        <div class="col-span-1 ">
          <input type="radio" v-model="shippingItem.price_control_id" :value="i.id">
          {{i.shipping_method}}</div>
        <div class="col-span-1">${{i.freight}}</div>
        <div class="col-span-1">{{i.aging_start}}-{{i.aging_end}} days</div>
      </label>
      <div class="mt-7 flex justify-end">
        <button class="cancelbtn" @click="closeModal">Cancel</button>
        <button class="btn" @click="shippingSave">Save</button>
      </div>
    </div>
    <div ref="cancelModal" class="modal p-5 w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div class="py-4">Sure you want to cancel the order?</div>
      <div class="mt-7 flex justify-center">
        <button class="cancelbtn" @click="closeModal">Cancel</button>
        <button class="btn" @click="cancelComfirm">Comfirm</button>
      </div>
    </div>
    <div ref="storeModal" class="modal p-5 w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div class="py-4">Please select store</div>
      <select class="select" v-model="form.store_id">
        <option v-for="(i,n) in stores" :key="n" :value="i.id" :disabled="i.is_authorize=='2'">{{i.store_name}}</option>
      </select>
      <div class="mt-7 flex justify-center">
        <button class="cancelbtn" @click="closeModal">Cancel</button>
        <button class="btn" @click="confirmSync">Comfirm</button>
      </div>
    </div>
    <div ref="trackModal" class="modal p-5 w-700 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine pb-3">
        <div class="text-xl">Track</div>
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="mt-4">
        <light-timeline :items='activities'></light-timeline>
      </div>
    </div>

    <div class="h-full overflow-auto">
      <div class="mb-3 text-xl font-semibold">Store Orders</div>
      <div class="main1 pb-32 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="flex">
          <div @click="searchStatus(1,1,1)" class="px-4 py-2 border-b-2 cursor-pointer flex"
            :class="[form.local_order_status  == 1 ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Pending</div>
          </div>
          <div @click="searchStatus(2,1,2)" class="px-4 py-2 border-b-2 cursor-pointer flex"
            :class="[form.local_order_status  == 2 ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Order Picking</div>
          </div>
          <div @click="searchStatus(3,2,1)" class="px-4 py-2 border-b-2 cursor-pointer flex"
            :class="[form.local_order_status  == 3 ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Awaiting Payment</div>
          </div>
          <div @click="searchStatus(4,2,2)" class="px-4 py-2 border-b-2 cursor-pointer flex"
            :class="[form.local_order_status  == 4 ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Paid Not Shipped</div>
          </div>
          <div @click="searchStatus(5,2,3)" class="px-4 py-2 border-b-2 cursor-pointer flex"
            :class="[form.local_order_status  == 5 ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Dispatched</div>
          </div>
          <div @click="searchStatus(6,2,4)" class="px-4 py-2 border-b-2 cursor-pointer flex"
            :class="[form.local_order_status  == 6 ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Completed</div>
          </div>
          <div @click="searchStatus(7,2,-1)" class="px-4 py-2 border-b-2 cursor-pointer flex"
            :class="[form.local_order_status  == 7 ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
            <div>Cancelled</div>
          </div>
        </div>

        <div class="mt-4 p-4 bg-white dark:bg-darkMenu rounded shadow-default grid grid-cols-12 gap-3">
          <div class="col-span-4">
            <div class="pb-1">Search Orders</div>
            <input v-model="form.order_number" type="text" class="input h-10">
          </div>
          <!-- <div class="col-span-6 md:col-span-4 xl:col-span-2">
            <div class="pb-1">Order Sources</div>
            <select class="select" v-model="form.store_type">
              <option v-for="(i,n) in sourceList" :key="n" :value="i.id">{{i.name}}</option>
            </select>
          </div>
          <div class="col-span-6 md:col-span-4 xl:col-span-2">
            <div class="pb-1">Store</div>
            <select class="select" v-model="form.store_id">
              <option v-for="(i,n) in stores" :key="n" :value="i.id">{{i.store_name}}</option>
            </select>
          </div>
          <div class="col-span-6 md:col-span-4 xl:col-span-2">
            <div class="pb-1">Search Recipients</div>
            <input v-model="form.addressee" type="text" class="input h-10">
          </div>
          <div class="col-span-4 md:col-span-2 xl:col-span-1">
            <div class="pb-1">Time</div>
            <select class="select" v-model="form.time_type">
              <option v-for="(i,n) in timeList" :key="n">{{i}}</option>
            </select>
          </div>
          <div class="col-span-8 md:col-span-6 xl:col-span-3">
            <div class="pb-1 h-6"></div>
            <div class="flex items-center">
              <input v-model="form.start_date" ref="dateSelect" @click="dateSelect" type="date" class="input h-10">
              <div class="flex-shrink-0 mx-2">-</div>
              <input v-model="form.end_date" ref="dateSelects" @click="dateSelects" type="date" class="input h-10">
            </div>
          </div> -->
          <div class="col-span-6 flex items-end">
            <button @click="getData(1)" class="py-2.5 px-4 rounded mr-3 bg-store hover:bg-storeHover text-white">Search</button>
            <!-- <button @click="resetForm" class="py-2.5 px-4 rounded border dark:border-darkLine hover:bg-gray-300">Recharge</button> -->
          </div>
        </div>

        <div class="mt-4 p-4 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="flex items-center">
            <!-- <button class="py-2 px-4 rounded-md border dark:border-darkLine hover:bg-gray-300">Exporting files</button> -->
            <button v-show="form.local_order_status == 1" @click="getOrders" 
              class="py-2 px-4 rounded bg-store hover:bg-storeHover text-white">Sync Store Orders</button>
            <button v-show="form.local_order_status == 1" @click="createOrders" 
              class="py-2 px-4 rounded ml-3 bg-store hover:bg-storeHover text-white">Create Orders</button>
            <!-- <button @click="getOrders" 
              class="py-2 px-4 rounded ml-3 bg-store hover:bg-storeHover text-white">Import Orders</button> -->
            <!-- <button @click="getOrders" 
              class="py-2 px-4 rounded ml-3 bg-store hover:bg-storeHover text-white">Add to Orders Picking</button>
            <button @click="getOrders" 
              class="py-2 px-4 rounded ml-3 bg-store hover:bg-storeHover text-white">Clear</button> -->
          </div>
          <div class="hidden mt-3">
            <div class="p-3 grid grid-cols-11 bg-gray-200 rounded-t">
              <div class="col-span-2 flex justify-center items-center">Order Number</div>
              <div class="col-span-2 flex justify-center items-center">Store Name</div>
              <div class="col-span-1 flex justify-center items-center">Price(USD)</div>
              <div class="col-span-2 flex justify-center items-center">Address</div>
              <div class="col-span-2 flex justify-center items-center">Time</div>
              <div class="col-span-1 flex justify-center items-center">Condition</div>
              <div class="col-span-1 flex justify-center items-center">Operation</div>
            </div>
            <div v-show="list.length>0">
              <div v-for="(i,n) in list" :key="n" class="p-3 grid grid-cols-11 border-b dark:border-darkLine">
                <!-- <div class="col-span-7"></div> -->
                <div class="col-span-2 flex justify-center items-center">
                  <div>{{i.order_number}}</div>
                </div>
                <div class="col-span-2 flex justify-center items-center">
                  <div>{{i.store_name}}</div>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <div>{{i.usd}}</div>
                </div>
                <div class="col-span-2 flex flex-col justify-center">
                  <div>{{i.addressee}}</div>
                  <div>
                    <span>{{i.address.address1}}, </span>
                    <span>{{i.address.address2}}, </span>
                    <span>{{i.address.city}}, </span>
                    <span>{{i.address.province}}, </span>
                    <span>{{i.address.country}}</span>
                  </div>
                </div>
                <div class="col-span-2 flex justify-center items-center">
                  <div>{{i.created_at}}</div>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <div>{{i.financial_status}}</div>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <button @click="openModal(i)" class="bg-gray-200 hover:bg-gray-300 rounded py-1 px-3">Order Details</button>
                </div>
              </div>
            </div>
            <div v-show="list.length==0" class="py-6 flex flex-col justify-center items-center">
              <img src="../../assets/warehouseNodata.png" class="w-52 h-52" alt="">
              <div>No data</div>
            </div>
          </div>
          <div v-show="form.local_order_status < 3" class="mt-3">
            <el-table
              :data="list"
              :header-cell-style="{'background-color':'#E5E7EB'}"
              empty-text="No data"
              @selection-change="selectTable">
              <el-table-column
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column
                label="Order No."
                width="320">
                <template slot-scope="scope">
                  <div style="height:26px" v-show="scope.row.store_type==3">
                    <div class="befor-time" ><i class="el-icon-time"></i> Please ship before {{ addWorkDays(scope.row.created_at, 2) }}</div>
                  </div>
                  <div>#{{scope.row.order_number}}</div>
                  <!-- <div>{{scope.row.local_order_number}}</div> -->
                  <div class="flex mt-2" v-for="item in scope.row.line_items" :key="item.id">
                    <img :src="item.image" class="w-10 h-10" alt="">
                    <div class="flex-1 overflow-hidden">
                      <el-tooltip class="item" effect="dark" :content="item.variant_title" placement="top">
                        <div v-if="item.variant_title" class="whitespace-nowrap overflow-ellipsis overflow-hidden">{{ item.variant_title }}</div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                        <div v-if="!item.variant_title" class="whitespace-nowrap overflow-ellipsis overflow-hidden">{{ item.title }}</div>
                      </el-tooltip>
                      <div><i class="el-icon-close"></i>{{ item.quantity }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Stores"
                width="160">
                <template slot-scope="scope">
                  <div>{{scope.row.store_url}}</div>
                  <!-- <div>Store Amount: {{scope.row.amount}} {{scope.row.currency}}</div> -->
                </template>
              </el-table-column>
              <el-table-column
                label="Cost"
                width="160">
                <template slot-scope="scope">
                  <!-- <div>Total: $19.52</div> -->
                  <div>Product: <span class="text-orange">${{scope.row.product_cost}}</span></div>
                  <div>Shipping: <span class="text-orange">${{scope.row.shipping_cost}}</span></div>
                  <!-- <div>Quantity: 1</div> -->
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="Warehouse"
                width="160">
                <template slot-scope="scope">
                  <div>China Warehouse</div>
                </template>
              </el-table-column> -->
              <el-table-column
                label="Receipt Information"
                width="240">
                <template slot-scope="scope">
                  <div class="flex flex-wrap">
                    <div class="pr-2 pb-1">Payment Methods: </div>
                    <div class="pb-1" v-for="(ia, na) in scope.row.payment_type" :key="na">
                      <span v-show="na>0">,</span>
                      {{ia}}
                    </div>
                  </div>
                  <div>Name: {{scope.row.address.name}}</div>
                  <div>Address: {{scope.row.address.address1}} {{scope.row.address.city}} {{scope.row.address.zip}} {{scope.row.address.country}}</div>
                  <div>Phone: {{scope.row.phone}}</div>
                  <svg @click="editAddress(scope.row)" t="1736130388461" class="icon mt-2 cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5076" width="20" height="20"><path d="M848.937379 537.578518a38.363045 38.363045 0 0 0-38.387037 38.387037c0 1.495495 0.111962 2.879028 0.215927 4.262561h-0.215927V947.040246H76.934078V213.423982h400.92861c21.224833 0 38.387037-17.170202 38.387037-38.387037 0-21.224833-17.162204-38.387037-38.387037-38.387037H76.934078a76.72609 76.72609 0 0 0-76.774074 76.774074V947.040246c0 42.441668 34.332406 76.774074 76.774074 76.774074h733.616264c42.441668 0 76.774074-34.332406 76.774074-76.774074V580.228116h-0.20793c0.103965-1.383533 0.20793-2.767066 0.20793-4.262561 0-21.216835-17.162204-38.387037-38.387037-38.387037z" p-id="5077" fill="#EE6A28"></path><path d="M1001.101994 107.107885L916.546547 22.552438c-29.965881-29.965881-78.805388-29.749954-108.763271 0.215927l-423.536975 423.536975a34.100485 34.100485 0 0 0-7.25355 10.876327L270.572688 708.184906c-5.965985 14.075247-1.80739 28.262456 7.25355 37.427361 9.06094 9.172902 23.352114 13.331498 37.531326 7.357515l251.115201-106.308101c4.054631-1.703425 7.677407-4.158596 10.876327-7.25355l423.536975-423.536975c29.965881-29.957883 30.181808-78.797391 0.215927-108.763271zM528.837474 579.164475l-146.510525 62.059043 62.059043-146.510525L741.669602 197.429384l84.451481 84.451481L528.837474 579.164475z m417.666957-417.674955l-66.105677 66.113674-84.451481-84.451481 66.105677-66.113674 0.215927-0.20793 84.451481 84.451482-0.215927 0.207929z" p-id="5078" fill="#EE6A28"></path></svg>
                </template>
              </el-table-column>
              <el-table-column
                label="Shipping Setting"
                width="160">
                <template slot-scope="scope">
                  <div class="flex flex-col items-center">
                    <div>{{scope.row.shippingName}}</div>
                    <svg @click="shippingMethod(scope.row)" t="1736130388461" class="icon mt-2 cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5076" width="20" height="20"><path d="M848.937379 537.578518a38.363045 38.363045 0 0 0-38.387037 38.387037c0 1.495495 0.111962 2.879028 0.215927 4.262561h-0.215927V947.040246H76.934078V213.423982h400.92861c21.224833 0 38.387037-17.170202 38.387037-38.387037 0-21.224833-17.162204-38.387037-38.387037-38.387037H76.934078a76.72609 76.72609 0 0 0-76.774074 76.774074V947.040246c0 42.441668 34.332406 76.774074 76.774074 76.774074h733.616264c42.441668 0 76.774074-34.332406 76.774074-76.774074V580.228116h-0.20793c0.103965-1.383533 0.20793-2.767066 0.20793-4.262561 0-21.216835-17.162204-38.387037-38.387037-38.387037z" p-id="5077" fill="#EE6A28"></path><path d="M1001.101994 107.107885L916.546547 22.552438c-29.965881-29.965881-78.805388-29.749954-108.763271 0.215927l-423.536975 423.536975a34.100485 34.100485 0 0 0-7.25355 10.876327L270.572688 708.184906c-5.965985 14.075247-1.80739 28.262456 7.25355 37.427361 9.06094 9.172902 23.352114 13.331498 37.531326 7.357515l251.115201-106.308101c4.054631-1.703425 7.677407-4.158596 10.876327-7.25355l423.536975-423.536975c29.965881-29.957883 30.181808-78.797391 0.215927-108.763271zM528.837474 579.164475l-146.510525 62.059043 62.059043-146.510525L741.669602 197.429384l84.451481 84.451481L528.837474 579.164475z m417.666957-417.674955l-66.105677 66.113674-84.451481-84.451481 66.105677-66.113674 0.215927-0.20793 84.451481 84.451482-0.215927 0.207929z" p-id="5078" fill="#EE6A28"></path></svg>
                  </div>
                  <!-- <select class="select">
                    <option value="null" disabled></option>
                    <option v-for="(i,n) in scope.row.shipping_method_list" :value="n">{{i.product_name_e}}</option>
                  </select> -->
                </template>
              </el-table-column>
              <el-table-column
                label="Time"
                width="160">
                <template slot-scope="scope">
                  <div>{{scope.row.created_date}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="Remark"
                width="160">
                <template slot-scope="scope">
                  <input type="text" class="input" v-model="scope.row.local_order_remark" @blur="editRemark(scope.row)">
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="Action"
                width="120">
                <template slot-scope="scope">
                  <div @click="editAddress(scope.row)" class="text-orange cursor-pointer hover:underline">Edit Address</div>
                  <!-- <div class="mt-1 text-orange cursor-pointer hover:underline">Contact Sales</div> -->
                </template>
              </el-table-column>
            </el-table>
            <div v-show="list.length > 0" class="mt-3 flex justify-center">
              <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="pageIndex"
                :page-size="10"
                :total="total"
                @current-change="setPages">
              </el-pagination>
            </div>
          </div>

          <div v-if="form.local_order_status > 2" class="mt-3">
            <el-table
              :data="orderList"
              :header-cell-style="{'background-color':'#E5E7EB'}"
              empty-text="No data"
              @selection-change="selectOrderTable">
              <el-table-column
                fixed
                type="expand">
                <template slot-scope="props">
                  <div v-for="(i,n) in props.row.order_list" :key="n" class="flex items-center">

                    <div style="width: 390px;margin-left: 65px;">
                      <div>{{i.order_number}}</div> 
                      <div class="break-all">{{i.store_url}}</div> 
                    </div>
                    <!-- <div class="px-2.5" style="width: 120px;"></div> -->
                    <!-- <div class="px-2.5 break-all" style="width: 180px;">{{i.store_url}}</div> -->
                    <div class="px-2.5 text-orange" style="width: 180px;">${{i.product_cost}}</div>
                    <!-- <div class="px-2.5 py-2" style="width: 160px;">{{i.address.first_name}} {{i.address.last_name}}, {{i.address.address1}}, {{i.address.city}}, {{i.address.province}}, {{i.address.country}}</div> -->
                    <div class="px-2.5" style="width: 280px;font-size: 12px;"><span v-show="i.tracking_number">Track No.: {{i.tracking_number}}</span> </div>
                    <!-- <div class="px-2.5" style="width: 160px;">{{i.shipping_method}}</div> -->
                    <div class="px-2.5" style="width: 180px;">{{i.updated_date}}</div>
                    <div class="px-2.5 flex" style="width: 120px;">
                      <div @click="viewTrack(i.id)"
                        class="text-orange hover:underline cursor-pointer">Track</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                fixed
                type="selection"
                width="50">
              </el-table-column> -->
              <el-table-column
                label="Order No."
                width="240">
                <template slot-scope="scope">
                  <div>{{scope.row.order_number}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="Status"
                width="160">
                <template slot-scope="scope">
                  <div class="text-red-500">{{paymentType[scope.row.payment_type]}}</div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="Stores"
                width="180">
              </el-table-column> -->
              <el-table-column
                label="Amount"
                width="200">
                <template slot-scope="scope">
                  <div class="text-orange">${{scope.row.total_amount}}</div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="Shipping Info"
                width="160">
              </el-table-column> -->
              <!-- <el-table-column
                label="Tracking Number"
                width="160">
              </el-table-column> -->
              <!-- <el-table-column
                label="Order Type"
                width="160">
              </el-table-column> -->
              <el-table-column
                label="Shipping Info"
                width="260">
              </el-table-column>
              <el-table-column
                label="Time"
                width="200">
                <template slot-scope="scope">
                  <div>{{ formTime(scope.row.created_date)}}</div>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="Action"
                min-width="120">
                <template slot-scope="scope">
                  <div v-show="form.local_order_status == 3" class="flex">
                    <!-- <div @click="toPay(scope.row)" class="mr-4 text-orange cursor-pointer hover:underline">Pay</div> -->
                    <div @click="cancelOrder(scope.row)" class="text-orange cursor-pointer hover:underline">Cancel</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div v-show="form.local_order_status == 2" class="absolute w-full bottom-0 left-0 px-5 z-10 text-sm">
        <div class="mx-0.5 py-2 px-4 bg-white dark:bg-darkMenu rounded shadow-default flex justify-between items-center">
          <div class="flex items-center">
            <div class="mr-10">Selected: <span class="text-orange">{{selectNum}}</span></div>
            <div class="mr-10">Shipping Cost: <span class="text-orange">${{selectSCost}}</span></div>
            <div>Products Cost: <span class="text-orange">${{selectPCost}}</span></div>
          </div>
          <div class="flex items-center">
            <div class="mr-5">Total Amount: <span class="text-orange font-semibold">${{selectTotal}}</span></div>
            <button @click="submitOrder" class="btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LightTimeline from 'vue-light-timeline'
  import {
    getRate,
    getOrderList,
    syncOrder,
    editRemark,
    editAddress,
    getShippingMethod,
    changeShippingMethod,
    fulfillment,
    createDeliveryOrder,
    getDeliveryOrderList,
    getDeliveryOrderInfo,
    payOrder,
    canalOrder,
    storeTrack,
  } from '@/api/dropshipping'
  import {
    storeList
  } from '@/api/user'
  import {
    shipFromTo,
  } from '@/api/shippingCost'
  import {
    getStates
  } from '@/api/order'
  import{
    formENData,
    formENDatall
  } from '@/utils/token'
  export default {
    components: { LightTimeline },
    data() {
      return {
        list: [],
        sourceList: [
          {
            id: 1,
            name: 'Shopify'
          },
          {
            id: 2,
            name: 'Amazon'
          }
        ],
        stores: [],
        timeList: ['Creation Time', 'Payment Time'],
        form: {
          // pay_status: 0,
          order_number: this.$route.query.q || '',
          store_type: '',
          store_id: '',
          // addressee: '',
          // time_type: '',
          // start_date: '',
          // end_date: '',
          // pageIndex: 1,
          local_order_status: 1,
        },
        rate: 0,
        detailItem: {
          store_name: '',
          addressee: '',
          phone: '',
          email: '',
          address: {
            country: '',
            province: '',
            city: '',
            zip: '',
            address1: '',
          },
          line_items: [],
        },
        orderList: [],
        btnLoading: false,
        editItem: {
          address: {},
        },
        destinationList: [],
        country: '',
        provinceList: [],
        province: '',
        selectionList: [],
        shippingList: [],
        shippingItem: {},
        selectNum: '',
        selectSCost: '',
        selectPCost: '',
        selectTotal: '',
        paymentType: ['Unpaid',''],
        cancelNum: '',
        tabType: 1,
        tabStatus: 1,
        pageIndex: 1,
        total: 0,
        activities: [],
      }
    },
    created() {
      this.$emit('menu', 'Store')
    },
    mounted() {
      shipFromTo().then((res)=>{
        this.destinationList = res.data.endCountry
      })
      storeList().then((res)=>{
        this.stores = res.data.list
      })
      getRate().then((req)=>{
        this.rate = req.data.exchange_rate
        this.getData(1)
      })
    },
    methods:{
      formTime(date){
        return formENDatall(date)
      },
      addWorkDays(startDate, workDaysToAdd) {
        let count = 0;
        let currentDate = new Date(startDate);
        while (count < workDaysToAdd) {
          currentDate.setDate(currentDate.getDate() + 1);
          const dayOfWeek = currentDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            count++;
          }
        }
        return  formENData(currentDate);
      },
      getData(page){
        if(this.tabType==1){
          this.pageIndex = page
          this.list = []
          getOrderList({
            order_number: this.form.order_number,
            local_order_status: this.form.local_order_status,
            store_type: '',
            store_id: '',
            pageCount: 10,
            pageIndex: page,
          }).then((res)=>{
            this.list = res.data.list
            for(let i=0;i<this.list.length;i++){
              for(let j=0;j<this.list[i].shipping_method_list.length;j++){
                if(this.list[i].shipping_method_list[j].id == this.list[i].price_control_id){
                  this.list[i].shippingName = this.list[i].shipping_method_list[j].shipping_method
                }
              }
            }
            this.total = Number(res.data.total)
          })
        }else{
          this.orderList = []
          getDeliveryOrderList({
            order_number: this.form.order_number,
            status: this.tabStatus,
          }).then((res)=>{
            this.orderList = res.data.list
            for(let i=0;i<this.orderList.length;i++){
              for(let j=0;j<this.orderList[i].order_list.length;j++){
                this.orderList[i].order_list[j].usd = Number(this.orderList[i].order_list[j].shipping_cost) + Number(this.orderList[i].order_list[j].product_cost)
              }
            }
          })
        }
      },
      dateSelect(){
        this.$refs.dateSelect.showPicker()
      },
      dateSelects(){
        this.$refs.dateSelects.showPicker()
      },
      divide(num1, num2) {
        const result = (num1 * 100) / (num2 * 100);
        if(Math.round(result * 100) / 100>0){
          return Math.round(result * 100) / 100;
        }
        return 0.01;
      },
      closeModal() {
        this.$refs.mask.style = 'display:block;'
        this.$refs.modal.style = 'display:block;'
        this.$refs.addAddressModal.style = 'display:block;'
        this.$refs.shippingModal.style = 'display:block;'
        this.$refs.cancelModal.style = 'display:block;'
        this.$refs.storeModal.style = 'display:block;'
        this.$refs.trackModal.style = 'display:block;'
        setTimeout(()=>{
          this.$refs.mask.style = 'display:none;opacity:0;'
          this.$refs.modal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
          this.$refs.addAddressModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
          this.$refs.shippingModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
          this.$refs.cancelModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
          this.$refs.storeModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
          this.$refs.trackModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        }, 1)
      },
      openModal(item) {
        this.detailItem = item
        this.$refs.mask.style = 'display:block;'
        this.$refs.modal.style = 'display:block;'
        setTimeout(()=>{
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.modal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        }, 1)
      },
      resetForm(){
        this.form = {
          // pay_status: 0,
          order_number: '',
          store_type: '',
          store_id: '',
          // addressee: '',
          // time_type: '',
          // start_date: '',
          // end_date: '',
          // pageIndex: 1,
          local_order_status: 1,
        }
        this.getData(1)
      },
      getOrders(){
        this.$refs.storeModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.storeModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      confirmSync(){
        syncOrder({
          store_id: this.form.store_id,
        }).then((res)=>{
          if(res.code == 0){
            this.closeModal()
            this.getData(1)
          }else{
            this.$message({
              message: res.msg,
              offset: 70
            });
          }
        })
      },
      editAddress(item){
        this.editItem = item
        if(this.editItem.address.country){
          for(let n=0;n<this.destinationList.length;n++){
            if(this.editItem.address.country.toUpperCase() == this.destinationList[n].en_nickname.toUpperCase()){
              this.country=this.destinationList[n].en_nickname
              // getStates({
              //   code_two: this.country
              // }).then((res)=>{
              //   this.provinceList = res.data
              // })
            }
          }
        }
        this.$refs.addAddressModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.addAddressModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      addressSave(){
        let addressItem = this.editItem.address
        let forms = {
          id: this.editItem.id,
          first_name: addressItem.firstName,
          last_name: addressItem.lastName,
          country: this.country,
          province: addressItem.province,
          city: addressItem.city,
          address1: addressItem.address1,
          address2: addressItem.address2,
          zip: addressItem.zip,
          phone: this.editItem.phone,
          email: this.editItem.email,
        }
        this.btnLoading = true
        editAddress(forms).then((res) =>{
          this.btnLoading = false
          if (res.code == 0) {
            this.getData(1)
            this.closeModal()
          }else{
            this.$message({
              message: res.msg,
              offset: 70
            })
          }
        })
      },
      searchStatus(status,type,order_status){
        this.form.local_order_status = status
        this.tabType = type
        this.tabStatus = order_status
        if(this.tabType==1){
          this.list = []
          getOrderList({
            order_number: this.form.order_number,
            local_order_status: status,
            store_type: '',
            store_id: '',
          }).then((res)=>{
            this.list = res.data.list
            for(let i=0;i<this.list.length;i++){
              for(let j=0;j<this.list[i].shipping_method_list.length;j++){
                if(this.list[i].shipping_method_list[j].id == this.list[i].price_control_id){
                  this.list[i].shippingName = this.list[i].shipping_method_list[j].shipping_method
                }
              }
            }
            // this.list.forEach((items)=>{
            //   items.usd = this.divide(items.amount, this.rate)
            //   for(let i=0;i<items.line_items.length;i++){
            //     items.line_items[i].usd = this.divide(items.line_items[i].price, this.rate)
            //   }
            // })
          })
        }else{
          this.orderList = []
          getDeliveryOrderList({
            order_number: this.form.order_number,
            status: this.tabStatus,
          }).then((res)=>{
            this.orderList = res.data.list
            for(let i=0;i<this.orderList.length;i++){
              for(let j=0;j<this.orderList[i].order_list.length;j++){
                this.orderList[i].order_list[j].usd = Number(this.orderList[i].order_list[j].shipping_cost) + Number(this.orderList[i].order_list[j].product_cost)
              }
            }
          })
        }
      },
      editRemark(item){
        editRemark({
          id: item.id,
          local_order_remark: item.local_order_remark
        }).then((res)=>{

        })
      },
      checkCountry(){
        // getStates({
        //   code_two: this.country
        // }).then((res)=>{
        //   this.provinceList = res.data
        // })
      },
      checkProvince(){

      },
      createOrders(){
        let ids = []
        for(let i=0;i<this.selectionList.length;i++){
          ids.push(this.selectionList[i].id)
        }
        fulfillment({
          ids: ids
        }).then((res)=>{
          if(res.code == 0){
            this.getData(1)
            this.selectionList = []
          }else{
            this.$message({
              message: res.msg,
              offset: 70
            });
          }
        })
      },
      selectTable(selection){
        this.selectionList = selection
        this.selectNum = this.selectionList.length
        let selectSCost = 0
        let selectPCost = 0
        for(let i=0;i<this.selectionList.length;i++){
          selectSCost += Number(this.selectionList[i].shipping_cost)
          selectPCost += Number(this.selectionList[i].product_cost)
        }
        this.selectSCost = selectSCost
        this.selectPCost = Number(selectPCost).toFixed(2)
        this.selectTotal = (Number(selectSCost) + Number(selectPCost)).toFixed(2)
      },
      selectOrderTable(selection){

      },
      shippingMethod(item){
        this.shippingItem = item
        getShippingMethod({
          id: item.id,
          weight: item.weight
        }).then((res)=>{
          this.shippingList = res.data.shipping_method
          this.$refs.shippingModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.shippingModal.style =
                'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        })
      },
      shippingSave(){
        // console.log(this.shippingItem);
        changeShippingMethod({
          id: this.shippingItem.id,
          price_control_id: this.shippingItem.price_control_id,
        }).then((res)=>{
          if (res.code == 0) {
            this.getData(1)
            this.closeModal()
          }else{
            this.$message({
              message: res.msg,
              offset: 70
            })
          }
        })
      },
      submitOrder(){
        if(this.selectionList.length>0){
          let ids = []
          for(let i=0;i<this.selectionList.length;i++){
            ids.push(this.selectionList[i].id)
          }
          createDeliveryOrder({
            ids: ids,
          }).then((res)=>{
            if (res.code == 0) {
              this.getData(1)
            }else{
              this.$message({
                message: res.msg,
                offset: 70
              })
            }
          })
        }else{
          this.$message({
            message: 'Please select',
            offset: 70
          })
        }
      },
      cancelOrder(item){
        this.cancelNum = item.order_number
        this.$refs.cancelModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.cancelModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      cancelComfirm(){
        canalOrder({
          order_number: this.cancelNum
        }).then(()=> {
          this.getData(1)
        })
      },
      toPay(item){
        this.$router.push({
          path: '/account/storeOrderDetails',
          query: {
            order_number: item.order_number
          }
        })
      },
      setPages(val){
        this.getData(val)
      },
      viewTrack(id){
        storeTrack({
          id: id
        }).then((res)=>{
          this.activities = []
          let list = res.data.checkpoints
          if(list!=null){
            for(let i=0;i<list.length;i++){
              let a = {}
              a.tag = list[i].time_stamp.replace("T", " ");
              a.htmlMode = true
              if(i==0){
                a.color = '#f39333'
                a.content =  `<div style="color: #000;">${list[i].message}</div>`
              }else{
                a.color = '#c5c5c5'
                a.content =  `<div style="color: #a4a4a4;">${list[i].message}</div>`
              }
              this.activities.push(a)
            }
            this.$refs.trackModal.style = 'display:block;'
            setTimeout(()=> {
              this.$refs.mask.style = 'display:block;opacity:1;'
              this.$refs.trackModal.style =
                'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
            },1)
          }else{
            this.$message({
              message: 'No logistics track',
              offset: 70
            })
          }
        })
      },
    }
  }
  </script>

<style lang="postcss" scoped>
.befor-time{
  position: absolute;
  top: 4px;
  white-space: nowrap;
  z-index: 999;
  background: #ebebeb;
  padding: 4px 8px;
}
.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu z-50 rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
  /* @apply w-full h-full flex justify-center items-center; */
}

.btn {
  @apply w-28 font-semibold border-0 text-white rounded bg-orange hover:bg-orange1 px-6 py-2.5 cursor-pointer;
}

.cancelbtn {
  @apply w-28 font-semibold mr-5 border border-solid border-gray-400 bg-white hover:bg-gray-400 rounded px-6 py-2.5 cursor-pointer;
}
</style>

<style>
  .el-input__inner{
    border-color: #b5bac4;
    color: #000;
  }

  .el-select{
    width: 100%;
  }

  .el-input__inner{
    height: 42px;
  }
</style>
