<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="addressModal" class="modal p-5 w-700 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine pb-3">
        <div class="text-xl">Select Address</div>
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="mt-2">
        <div v-for="(i,n) in supplier" :key="n" class="rounded border flex flex-col sm:flex-row mb-2">
          <div @click="chooseAdd(i)" class="p-2 w-full text-sm cursor-pointer hover:bg-gray-200">
            <div class="flex">
              <div class="w-44 font-semibold flex-shrink-0">Supplier Company Name</div>
              <div>{{i.name}}</div>
            </div>
            <div class="flex">
              <div class="w-44 font-semibold flex-shrink-0">Supplier Contact Name</div>
              <div class="flex flex-wrap">
                <div class="mr-6">{{i.contacts}}</div>
                <div>tel: {{i.mobile}}</div>
              </div>
            </div>
            <div class="flex">
              <div class="w-44 font-semibold flex-shrink-0">Address</div>
              <div>{{i.address}}, {{i.city_name}}</div>
            </div>
          </div>
          <div class="py-2 flex-shrink-0 sm:w-24 border-t sm:border-l sm:border-t-0 flex sm:flex-col justify-center items-center">
            <button class="mr-3 sm:mb-3 sm:mr-0 rounded bg-gray-300 hover:bg-gray-400 py-1 px-2" 
              @click="changeAddress(i)">Change</button>
            <button class="hover:text-orange" @click="removeAddress(i.id)">Remove</button>
          </div>
        </div>
      </div>
      <div class="flex justify-end border-t border-gray-200 dark:border-darkLine mt-3 pt-3">
        <button @click="addAddress"
          class="py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Add Address</button>
      </div>
    </div>
    <div ref="addAddressModal" class="modal p-5 w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3">
        <div class="text-xl">Add New Addresses</div>
        <svg @click="closeModal" t="1677419594166" class="icon cursor-pointer" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2902" id="mx_n_1677419594167" width="24" height="24"><path d="M646.4 512l345.6-345.6c38.4-38.4 38.4-96 0-134.4-38.4-38.4-96-38.4-134.4 0L512 377.6 166.4 32C128-6.4 70.4-6.4 32 32c-38.4 38.4-38.4 96 0 134.4L377.6 512l-345.6 345.6c-38.4 38.4-38.4 96 0 134.4 19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6L512 646.4l345.6 345.6c19.2 19.2 44.8 25.6 70.4 25.6s51.2-6.4 70.4-25.6c38.4-38.4 38.4-96 0-134.4L646.4 512z" fill="#7a7a7a" p-id="2903"></path></svg>
      </div>
      <div class="mt-5 grid grid-cols-2 gap-4">
        <div class="col-span-1">
          <div class="flex">Supplier Company Name</div>
          <div class="relative">
            <input type="text" class="input" v-model="addressForm.name" placeholder="">
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">Supplier Contacts</div>
          <div class="relative">
            <input type="text" class="input" v-model="addressForm.contacts" placeholder="">
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <span class="text-red-500">*</span>
            Supplier Contact Number</div>
          <div class="relative">
            <input type="text" class="input" v-model="addressForm.mobile" placeholder=""
              v-validate="'required|mobiles'" data-vv-scope="address" name="mobiles">
            <div class="inputTips -bottom-3.5">{{errors.first("mobiles","address")}}</div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <span class="text-red-500">*</span>
            State or Province</div>
          <div class="relative">
            <input ref="provinceM" @input="searchProvince" @focus="searchProvince" @blur="setProvince" type="text" class="input" v-model="provinces" placeholder=""
            v-validate="'required|Province'" data-vv-scope="address" name="Province">
            <div class="inputTips -bottom-3.5">{{errors.first("Province","address")}}</div>
            <div v-show="provinceModal" class="selectUl absolute top-11 w-full max-h-52 overflow-scroll z-10 bg-white dark:bg-darkMenu shadow-md">
              <div v-for="(i,n) in areaSearch" :key="n" @click="chooseProvince(i)"
                class="p-2 hover:bg-gray-200 cursor-pointer">
                <span v-html="i.valueBright"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex">
            <span class="text-red-500">*</span>
            City</div>
          <div class="relative">
            <input ref="cityM" @input="searchCity" @focus="searchCity" @blur="setCity" type="text" class="input" v-model="citys" placeholder=""
            v-validate="'required|City'" data-vv-scope="address" name="City">
            <div class="inputTips -bottom-3.5">{{errors.first("City","address")}}</div>
            <div v-show="cityModal" class="selectUl absolute top-11 w-full max-h-52 overflow-scroll z-10 bg-white dark:bg-darkMenu shadow-md">
              <div v-for="(i,n) in citySearch" :key="n" @click="chooseCity(i)"
                class="p-2 hover:bg-gray-200 cursor-pointer">
                <span v-html="i.valueBright"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <div class="flex">
            <span class="text-red-500">*</span>
            Address Line</div>
          <div class="relative">
            <input type="text" class="input" v-model="addressForm.address" placeholder=""
            v-validate="'required|line1'" data-vv-scope="address" name="line1">
            <div class="inputTips -bottom-3.5">{{errors.first("line1","address")}}</div>
          </div>
        </div>
      </div>
      <div class="flex justify-end border-t border-gray-200 dark:border-darkLine mt-9 pt-7">
        <button @click="closeModal" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Cancel</button>
        <button @click="saveAddress"
          class="ml-5 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Save</button>
      </div>
    </div>
    <div ref="successModal" class="modal w-600 p-6 opacity-20 bg-white dark:bg-darkMenu">
      <div class="text-center">Booking</div>
      <div class="flex justify-center">
        <div class="max-w-416 py-7 px-4 text-center text-red-500 text-xs">You will need to provide the inbound order number below as well as the barcode to the supplier to affix to the box.</div>
      </div>
      <div class="flex justify-center">
        <div class="px-3 py-1.5 rounded-md border border-orange relative">
          <div ref="barcode">
            <svg id="barcode"></svg>
          </div>
          <div @click="downloadCode" class="absolute -top-5 right-0 flex items-center text-blue-400 text-xs cursor-pointer">
            <svg t="1697678360912" class="icon mr-1.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4837" width="12" height="12"><path d="M980.670676 43.223159a142.266531 142.266531 0 0 0-107.777675-43.11107h-538.888374a146.577638 146.577638 0 0 0-141.188754 150.888745v43.11107h-46.3444A146.577638 146.577638 0 0 0 0.971612 339.611765v538.888374a147.655415 147.655415 0 0 0 145.499861 145.499861h538.888374a145.499861 145.499861 0 0 0 143.344308-145.499861v-47.422177h44.188846a144.422084 144.422084 0 0 0 147.655415-141.188754v-538.888374a144.422084 144.422084 0 0 0-39.87774-107.777675z m-698.399333 107.777675a56.044391 56.044391 0 0 1 51.733284-59.277722h538.888374a56.044391 56.044391 0 0 1 56.044391 56.044391v542.121705a57.122168 57.122168 0 0 1-56.044391 57.122168h-538.888374a56.044391 56.044391 0 0 1-51.733284-57.122168z m458.055118 727.499305a56.044391 56.044391 0 0 1-56.044391 56.044391h-538.888374a56.044391 56.044391 0 0 1-56.044391-56.044391v-538.888374a56.044391 56.044391 0 0 1 56.044391-56.044391h46.3444v406.321834a145.499861 145.499861 0 0 0 142.266531 141.188754h406.321834z" fill="#3b82f6" p-id="4838"></path></svg>
            <div>Download</div>
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-center text-orange">
        <div class="flex items-center relative">
          <img src="" alt="">
          <div>Warehouse address</div>
          <div @click="copyAddress" class="absolute -right-16 flex items-center text-blue-400 text-xs cursor-pointer">
            <svg t="1697678360912" class="icon mr-1.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4837" width="12" height="12"><path d="M980.670676 43.223159a142.266531 142.266531 0 0 0-107.777675-43.11107h-538.888374a146.577638 146.577638 0 0 0-141.188754 150.888745v43.11107h-46.3444A146.577638 146.577638 0 0 0 0.971612 339.611765v538.888374a147.655415 147.655415 0 0 0 145.499861 145.499861h538.888374a145.499861 145.499861 0 0 0 143.344308-145.499861v-47.422177h44.188846a144.422084 144.422084 0 0 0 147.655415-141.188754v-538.888374a144.422084 144.422084 0 0 0-39.87774-107.777675z m-698.399333 107.777675a56.044391 56.044391 0 0 1 51.733284-59.277722h538.888374a56.044391 56.044391 0 0 1 56.044391 56.044391v542.121705a57.122168 57.122168 0 0 1-56.044391 57.122168h-538.888374a56.044391 56.044391 0 0 1-51.733284-57.122168z m458.055118 727.499305a56.044391 56.044391 0 0 1-56.044391 56.044391h-538.888374a56.044391 56.044391 0 0 1-56.044391-56.044391v-538.888374a56.044391 56.044391 0 0 1 56.044391-56.044391h46.3444v406.321834a145.499861 145.499861 0 0 0 142.266531 141.188754h406.321834z" fill="#3b82f6" p-id="4838"></path></svg>
            <div>Copy</div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="p-2 border border-orange rounded text-xs max-w-lg">
          <div>102 Building C, Hezhihe Industrial Park, No. 2990 Songbai Road, Shiyan, Baoan, Shenzhen</div>
          <div>Customer service call: 0755-28225927/15323780975</div>
          <div>Name: Andy</div>
          <div>Postcode: 518000</div>
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <button @click="closeModal" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Confirm</button>
      </div>
    </div>

    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm mb-32">
        <div class="pb-2 flex items-center">
          <div class="text-lg">Inbound management/</div>
          <div class="text-base text-gray-400">Apply for storage space</div>
        </div>
        <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div>
            <div class="text-base font-semibold">Basic information:</div>
            <div class="grid grid-cols-6 gap-5">
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 184px;">Cargo Type:</div>
                <input class="input h-10" type="text" v-model="form.cargo_type" :class="isview ? 'bg-gray-200' : ''" :disabled="isview">
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 184px;">
                  <!-- <span class="text-red-500">*</span> -->
                  Total Volume(CBM):</div>
                <div class="relative w-full">
                  <input class="input h-10" type="number" min="0" v-model="form.total_volume" :class="isview ? 'bg-gray-200' : ''">
                  <!-- <input class="input h-10" type="number" min="0" v-model="form.total_volume"
                    v-validate="'required|rentVolume'" name="rentVolume" :class="isview ? 'bg-gray-200' : ''" :disabled="isview">
                  <div class="inputTips -bottom-3.5">{{errors.first("rentVolume")}}</div> -->
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 184px;">
                  <span class="text-red-500">*</span>
                  Inventory Time(day):
                </div>
                <div class="relative w-full">
                  <input class="input h-10" type="number" min="0" v-model="form.inventory_time"
                    v-validate="'required|rentTime'" name="rentTime" :class="isview ? 'bg-gray-200' : ''" :disabled="isview">
                  <div class="inputTips -bottom-3.5">{{errors.first("rentTime")}}</div>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 184px;">
                  <span class="text-red-500">*</span>
                  Of Boxes:</div>
                <div class="relative w-full">
                  <input class="input h-10" type="number" min="0" v-model="form.of_boxes"
                    v-validate="'required|rentUnit'" name="rentUnit" :class="isview ? 'bg-gray-200' : ''" :disabled="isview">
                  <div class="inputTips -bottom-3.5">{{errors.first("rentUnit")}}</div>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 184px;">Warehouse Address:</div>
                <select class="select h-10" v-model="form.warehouse_address" :disabled="isview" :class="isview ? 'bg-gray-200' : ''">
                  <option value="1">Shenzhen</option>
                  <option value="2">Yiwu</option>
                  <option value="3">Los Angeles</option>
                  <option value="4">New York</option>
                </select>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 184px;">
                  <!-- <span class="text-red-500">*</span> -->
                  Outbound Service:</div>
                <div ref="selectss" class="relative w-full h-10">
                  <div class="absolute top-0 left-0 input h-10 cursor-pointer text-sm overflow-ellipsis overflow-hidden whitespace-nowrap" @click="selectShow = !selectShow">
                    {{checked}}
                  </div>
                  <input class="input h-10 hidden" type="text" v-model="form.outbound_service">
                    <!-- v-validate="'required|rentService'" name="rentService">
                  <div class="inputTips -bottom-3.5">{{errors.first("rentService")}}</div> -->
                  <div v-show="selectShow" class="absolute top-10 left-0 w-full mt-0.5 shadow-md z-50">
                    <div class="selectUl rounded-md max-h-52 overflow-auto cursor-pointer bg-white dark:bg-darkMenu">
                      <ul class="oul">
                        <li class="oli"
                          v-for="(item, index) in selectList"
                          :key="index"
                          @click="CheckedOne(index)"
                          v-show="index == 0 || !selectList[0].selected">{{item.name}}
                          <div class="absolute top-3 left-2 w-4 h-4 rounded border border-gray-400 flex justify-center items-center"
                            :class="[item.selected ? 'selectOne' : '']">
                            <svg v-show="item.selected" t="1670207733333" class="icon w-3 h-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9414"><path d="M-31.315747 519.457481m54.305801-54.305801l45.435853-45.435854q54.305801-54.305801 108.611601 0l303.931466 303.931466q54.305801 54.305801 0 108.611601l-45.435854 45.435853q-54.305801 54.305801-108.611601 0l-303.931465-303.931465q-54.305801-54.305801 0-108.611601Z" p-id="9415" fill="#ffffff"></path><path d="M898.357541 105.745969m54.305801 54.305801l45.797892 45.797892q54.305801 54.305801 0 108.611602l-563.332174 563.332173q-54.305801 54.305801-108.611602 0l-45.797892-45.797892q-54.305801-54.305801 0-108.611601l563.332174-563.332174q54.305801-54.305801 108.611602 0Z" p-id="9416" fill="#ffffff"></path></svg>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="selectList[1].selected" class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 184px;">
                  <span class="text-red-500">*</span>
                  Label Carton qty:</div>
                <div class="relative w-full">
                  <input class="input h-10" type="number" min="1" v-model="form.label_carton_qty"
                    v-validate="'required|rentLabel'" name="rentLabel">
                  <div class="inputTips -bottom-3.5">{{errors.first("rentLabel")}}</div>
                </div>
              </div>
              <div v-if="selectList[2].selected" class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 184px;">
                  <span class="text-red-500">*</span>
                  Inspection Carton qty:</div>
                <div class="relative w-full">
                  <input class="input h-10" type="number" min="1" v-model="form.inspection_carton_qty"
                    v-validate="'required|rentInspection'" name="rentInspection">
                  <div class="inputTips -bottom-3.5">{{errors.first("rentInspection")}}</div>
                </div>
              </div>
              <div v-if="form.entry_method == 2" class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 184px;">
                  <span class="text-red-500">*</span>
                  Estimated time of arrival:</div>
                <div class="relative w-full">
                <input class="input h-10" type="date" v-model="form.estimated_time"
                  v-validate="'required|date'" name="date" :class="isview ? 'bg-gray-200' : ''" :disabled="isview">
                  <div class="inputTips -bottom-3.5">{{errors.first("date")}}</div>
                </div>
              </div>
            </div>

            <div>
              <div class="mt-8 text-base font-semibold">Product Information:</div>
              <input type="file"
                style="display: none;"
                accept="application/pdf,image/jpeg,image/png,image/jpg"
                ref="iptFileRef"
                @change="uploadFiles" />
              <div v-show="!files.name" @click="chooseFile" class="mt-3 p-5 max-w-700 w-full rounded border border-dashed border-gray-300 bg-gray-100 hover:bg-gray-300 cursor-pointer flex justify-center items-center">
                <svg t="1698140823625" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4012" width="22" height="22"><path d="M978.65515615 471.61040592H559.22475615V58.39378963c0-25.47651318-21.12686459-45.98199941-47.22475615-45.98199941-26.09789155 0-47.22475615 21.12686459-47.22475615 46.60337778v413.2166163h-407.0028326c-25.47651318 0-45.98199941 21.12686459-45.9819994 47.22475615 0 26.09789155 21.12686459 47.22475615 46.60337778 47.22475614h407.00283259v413.2166163c0 25.47651318 21.12686459 45.98199941 47.22475615 45.98199941 26.09789155 0 47.22475615-21.12686459 47.22475615-46.60337778v-413.2166163h419.4304c25.47651318 0 45.98199941-21.12686459 45.9819994-47.22475614s-21.12686459-47.22475615-46.60337777-47.22475616z" p-id="4013" fill="#bfbfbf"></path></svg>
                <div>Uploading information</div>
              </div>
              <div v-show="files.name" class="mt-3 flex items-center">
                <svg t="1670585288869" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8034" width="16" height="16"><path d="M886.7 247.6L713.4 73.4c-6-6-14.2-9.4-22.7-9.4H192c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h640c35.3 0 64-28.7 64-64V270.2c0-8.5-3.3-16.6-9.3-22.6zM832 864c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h384v160c0 35.3 28.7 64 64 64h160v512zM704 288c-17.7 0-32-14.3-32-32V128l160 160H704z" p-id="8035" fill="#7a7a7a"></path><path d="M671 672H287c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32zM287 480c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H287zM287 352h192c17.7 0 32-14.3 32-32s-14.3-32-32-32H287c-17.7 0-32 14.3-32 32s14.3 32 32 32z" p-id="8036" fill="#7a7a7a"></path></svg>
                <div style="margin: 0 20px 0 5px;font-size: 16px;">{{ files.name }}</div>
                <svg @click="clearFile" style="cursor: pointer;" t="1670585138725" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4532" width="18" height="18"><path d="M806.4 263.2l-45.6-45.6L512 467.2 263.2 217.6l-45.6 45.6L467.2 512 217.6 760.8l45.6 45.6L512 557.6l248.8 248.8 45.6-45.6L557.6 512z" p-id="4533" fill="#7a7a7a"></path></svg>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <!-- <router-link :to="{ name: 'InboundManagement' }">
                <button class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Cancel</button>
              </router-link> -->
              <button @click="submitForm"
              class="ml-4 py-1.5 px-6 bg-orange text-white hover:bg-orange1 rounded-md">Save</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {
    uploadFile,
    getSupplier,
    getArea,
    saveSupplier,
    delSupplier,
    applyStorage,
    getApply,
    updateApply
  } from '@/api/warehouse'
  import html2canvas from "html2canvas"
  import JsBarcode from 'jsbarcode';

  export default {
    components: {
      
    },
    data() {
      return {
        viewid: null,
        status: '',
        isview: false,
        istab: '0',
        // method: 0,
        supplier: [],
        selectSupplier: {
          id: '',
        },
        addressForm: {
          id: '',
          name: '',
          contacts: '',
          mobile: '',
          province: '',
          city: '',
          address: '',
        },
        area: [],
        areaSearch: [],
        provinceCity: [],
        citySearch: [],
        provinceModal: false,
        cityModal: false,
        provinces: '',
        provincexx: {},
        citys: '',
        cityxx: {},
        checked: '',
        form:{
          sale_id: '',
          entry_method: 1,
          supplier_id: [],
          cargo_type: '',
          total_volume: '',
          inventory_time: '',
          of_boxes: '',
          warehouse_address: 1,
          outbound_service: [],
          label_carton_qty: '',
          inspection_carton_qty: '',
          estimated_time: '',
          file_id: '',
          site_url: 'app.cargosoon.com',
        },
        selectList:[
          {
            name: 'Unnecessary',
            no: 0,
            selected: false,
          },
          {
            name: 'Label',
            no: 1,
            selected: false,
          },
          {
            name: 'Inspection',
            no: 2,
            selected: false,
          },
          {
            name: 'Repack',
            no: 3,
            selected: false,
          },
          {
            name: 'Palletize',
            no: 4,
            selected: false,
          },
          {
            name: 'Container Loading',
            no: 5,
            selected: false,
          },
        ],
        selectShow: false,
        files: {},
        code: '',
      }
    },
    created() {
      this.$emit('menu', 'ApplySpaces')
    },
    mounted() {
      document.addEventListener(
        "click",
        this.even,
        true
      );
      
      this.form.sale_id = JSON.parse(localStorage.getItem('userInfo')).manage.id
      // if(this.$route.params.id){
      //   this.viewid = this.$route.params.id
      //   // this.status = this.$route.params.status
      //   this.isview = true
      //   getApply({id: this.viewid}).then((res)=>{
      //     this.form = res.data
      //     let a = []
      //     for(let i=0;i<this.form.outbound_service.length;i++){
      //       for(let j=0;j<this.selectList.length;j++){
      //         if(this.form.outbound_service[i] == this.selectList[j].no){
      //           this.selectList[j].selected = true
      //           a.push(this.selectList[j].name)
      //           break
      //         }
      //       }
      //     }
      //     this.checked = a.join(', ')
      //     if(res.data.file_info.length>0){
      //       this.files = res.data.file_info[0]
      //     }
      //     if(res.data.supplier_info.length>0){
      //       this.selectSupplier = res.data.supplier_info[0]
      //       this.selectSupplier.city_name = res.data.supplier_info[0].address_array.area_merger_name_en2
      //     }
      //   })
      // }else{
      //   getArea().then((res)=>{
      //     this.area = res.data
      //     this.areaSearch = res.data
      //   })
      // }
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
    },
    methods:{
      even(e){
        if(!this.$refs.provinceM.contains(e.target)){
          this.provinceModal = false
        }
        if(!this.$refs.cityM.contains(e.target)){
          this.cityModal = false
        }
        if(!this.$refs.selectss.contains(e.target)){
          this.selectShow = false
        }
      },
      cancelSupplier(){
        this.selectSupplier = {
          id: ''
        }
        this.form.supplier_id = []
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.addressModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.addAddressModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.successModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      selectAddress(){
        getSupplier().then((res)=>{
          this.supplier = res.data.data
        })
        this.$refs.mask.style = 'display:block;'
        this.$refs.addressModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.addressModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      changeAddress(item){
        // console.log(item);
        this.addressForm = {
          id: item.id,
          name: item.name,
          contacts: item.contacts,
          mobile: item.mobile,
          province: item.province,
          city: item.city,
          address: item.address,
        }
        for(let i=0; i<this.area.length; i++){
          if(item.province == this.area[i].id){
            this.provincexx = this.area[i]
            this.provinces = this.area[i].pinyin
            this.provinceCity = this.area[i].child
            break
          }
        }
        for(let i=0; i<this.provinceCity.length; i++){
          if(item.city == this.provinceCity[i].id){
            this.citys = this.provinceCity[i].pinyin
            this.cityxx = this.provinceCity[i]
            break
          }
        }
        this.$refs.addressModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.addAddressModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      },
      removeAddress(id){
        delSupplier({id:id}).then((res) => {
          getSupplier().then((reh)=>{
            this.supplier = reh.data.data
          })
        })
      },
      addAddress(){
        this.addressForm = {
          id: '',
          name: '',
          contacts: '',
          mobile: '',
          province: '',
          city: '',
          address: '',
        },
        this.provinces = ''
        this.provincexx = {}
        this.citys = ''
        this.cityxx = {}
        this.provinceCity = {}
        this.$refs.addressModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.addAddressModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        setTimeout(()=>{
          // this.$validator.reset({scope:'address'})
          this.errors.clear('address')
        },1)
      },
      searchProvince(){
        this.provinceModal = true
        let aList = []
        for (var i = 0; i < this.area.length; i++) {
          if(this.area[i].pinyin.toUpperCase().indexOf(this.provinces.toUpperCase()) != -1){
            aList.push(this.area[i])
          }
        }
        this.areaSearch = aList

        const replaceReg = new RegExp(this.provinces, 'ig')
        const upperCase = /^[A-Z]+$/
        for (const i in this.areaSearch) {
          if (replaceReg.test(this.areaSearch[i].pinyin)) {
            this.areaSearch[i].pinyin.match(replaceReg).map(item => {
              if (upperCase.test(item)) {
                this.areaSearch[i].valueBright = this.areaSearch[i].pinyin.replace(replaceReg, `<span style="color:#e66a10">${this.provinces.toUpperCase()}</span>`)
              } else {
                this.areaSearch[i].valueBright = this.areaSearch[i].pinyin.replace(replaceReg, `<span style="color:#e66a10">${this.provinces}</span>`)
              }
            })
          } else {
            this.areaSearch[i].valueBright = this.areaSearch[i].pinyin
          }
        }
      },
      setProvince(){
        if(this.provincexx.pinyin != undefined){
          this.provinces = this.provincexx.pinyin
        }else{
          this.provinces = ''
        }
      },
      searchCity(){
        this.cityModal = true
        let aList = []
        for (var i = 0; i < this.provinceCity.length; i++) {
          if(this.provinceCity[i].pinyin.toUpperCase().indexOf(this.citys.toUpperCase()) != -1){
            aList.push(this.provinceCity[i])
          }
        }
        this.citySearch = aList

        const replaceReg = new RegExp(this.citys, 'ig')
        const upperCase = /^[A-Z]+$/
        for (const i in this.citySearch) {
          if (replaceReg.test(this.citySearch[i].pinyin)) {
            this.citySearch[i].pinyin.match(replaceReg).map(item => {
              if (upperCase.test(item)) {
                this.citySearch[i].valueBright = this.citySearch[i].pinyin.replace(replaceReg, `<span style="color:#e66a10">${this.citys.toUpperCase()}</span>`)
              } else {
                this.citySearch[i].valueBright = this.citySearch[i].pinyin.replace(replaceReg, `<span style="color:#e66a10">${this.citys}</span>`)
              }
            })
          } else {
            this.citySearch[i].valueBright = this.citySearch[i].pinyin
          }
        }
      },
      setCity(){
        if(this.cityxx.pinyin != undefined){
          this.citys = this.cityxx.pinyin
        }else{
          this.citys = ''
        }
      },
      chooseProvince(item){
        // console.log(item);
        this.provincexx = item
        this.addressForm.province = item.id
        this.provinces = item.pinyin
        this.provinceCity = item.child
        this.citySearch = item.child
        this.citys = ''
        this.cityxx = {}
        this.addressForm.city = ''
      },
      chooseCity(item){
        // console.log(item);
        this.cityxx = item
        this.addressForm.city = item.id
        this.citys = item.pinyin
      },
      chooseAdd(item){
        this.selectSupplier = item
        this.form.supplier_id[0] = item.id
        this.closeModal()
      },
      async saveAddress(){
        const success = await this.$validator.validateAll('address')
        if(success){
          saveSupplier(this.addressForm).then((res)=>{
            getSupplier().then((reh)=>{
              this.supplier = reh.data.data
            })
            this.$refs.addAddressModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
            this.$refs.addressModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          })
        }
      },
      CheckedOne(index){
        this.selectList[index].selected = !this.selectList[index].selected
        let a = []
        let b = []
        for(var i=0;i<this.selectList.length;i++){
          if(this.selectList[i].selected){
            a.push(this.selectList[i].name)
            b.push(this.selectList[i].no)
          }
        }
        if(this.selectList[0].selected){
          a = ['Unnecessary']
          b = [0]
          for(var j=1;j<this.selectList.length;j++){
            this.selectList[j].selected = false
          }
        }
        this.form.outbound_service = b
        this.checked = a.join(', ')
      },
      async submitForm(){
        // console.log(this.selectList,this.form.outbound_service);
        if(this.form.outbound_service.length == 0){
          this.form.outbound_service = [0]
        }
        // console.log(this.form.outbound_service);
        //  = b
        const success = await this.$validator.validateAll()
        if(success){
          // console.log(this.form);
          // if(this.isview){
          //   updateApply({
          //     id: this.viewid,
          //     outbound_service: this.form.outbound_service,
          //     label_carton_qty: this.form.label_carton_qty,
          //     inspection_carton_qty: this.form.inspection_carton_qty,
          //     file_id: this.files.id,
          //   }).then((rew)=>{
          //     if(reh.msg == 'success'){
          //       this.$router.push({
          //         name:'InboundManagement',
          //       })
          //     }
          //   })
          // }else{
            // if(this.form.entry_method == 1){
            //   this.form.estimated_time = ''
            // }else{
            //   this.form.supplier_id = []
            // }
            applyStorage(this.form).then((reh)=>{
              if(reh.msg == 'success'){
                this.code = reh.data
                this.$refs.mask.style = 'display:block;'
                this.$refs.successModal.style = 'display:block;'
                setTimeout(()=> {
                  this.$refs.mask.style = 'display:block;opacity:1;'
                  this.$refs.successModal.style =
                    'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
                },1)

                this.$nextTick(() => {
                  JsBarcode("#barcode", "BookingNO", {
                    format: "CODE128", //选择要使用的条形码类型
                    width: 1.5, //线宽
                    height: 60, //条码高度
                    text: this.code, //显示文本
                    displayValue: true, //是否在条形码下方显示文字
                    textPosition: "bottom", //设置文本的垂直位置
                    // fontOptions: "bold italic", //使文字加粗体或变斜体
                    background: "#fff", //设置条形码的背景
                    // font: "fantasy", //设置文本的字体
                    lineColor: "#000", //设置条和文本的颜色。
                    fontSize: 14, //设置文本的大小
                    margin: 8 //设置条形码周围的空白边距
                  });
                })
                // this.$router.push({
                //   name:'InboundManagement',
                // })
              }
            })
          // }
        }
      },
      chooseFile(){
        this.$refs.iptFileRef.click()
      },
      uploadFiles(e){
        this.files = e.target.files[0]
        this.upload()
      },
      clearFile(){
        this.$refs.iptFileRef.value = ''
        this.files = {}
      },
      upload(){
        let data = new FormData()
        data.append('file', this.files);
        uploadFile(data).then((res)=>{
          this.form.file_id = res.data
        })
      },
      downloadCode(){
        html2canvas(this.$refs.barcode).then(canvas => {
          let url = canvas.toDataURL("image/png");
          var link= document.createElement("a");
          link.href = url; 
          link.download = "Booking No";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      },
      copyAddress(){
        var text = `102 Building C, Hezhihe Industrial Park, No. 2990 Songbai Road, Shiyan, Baoan, Shenzhen
Customer service call: 0755-28225927/15323780975
Name: Andy
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

.inputTips {
  @apply left-0 text-xs text-red-500 absolute;
}

.selectUl::-webkit-scrollbar {
  width: 6px;
}

.selectUl::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.selectUl::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}

.oul{
  @apply my-1;
}

.oli{
  @apply h-10 bg-white dark:bg-darkMenu hover:bg-lightMenu dark:hover:bg-darkLine p-2 pl-7 cursor-pointer relative select-none;
}

.selectOne{
  @apply bg-green-400;
}
</style>