<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="bookingModal" class="modal w-600 p-6 opacity-20 bg-white dark:bg-darkMenu">
      <div class="text-center">Booking</div>
      <div class="flex justify-center">
        <div class="max-w-416 py-7 px-4 text-center text-red-500 text-xs">Fill in the e-mail/whatsapp and you can quickly see the information about the goods on our website!</div>
      </div>
      <div class="flex sm:items-center flex-col sm:flex-row">
        <div class="flex-shrink-0 text-sm">
          <span class="text-red-500 text-sm">*</span>
          Enter your email/Whatsapp: </div>
        <input v-model="email" type="text" class="input" placeholder="Please fill in the e-mail/Whatsapp">
      </div>
      <div class="mt-6 flex justify-end">
        <button @click="closeModal" class="hover:underline">Cancel</button>
        <button @click="submitModal" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Save</button>
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
        <router-link :to="{ name: 'CargoManagement' }">
          <button class="py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Confirm</button>
        </router-link>
      </div>
    </div>

    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="pb-2 text-lg">Warehouse Rent Calculation</div>
        <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="grid grid-cols-6 gap-5">
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Product Name:</div>
              <input class="input h-10" type="text" v-model="form.cargo_type">
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">
                <span class="text-red-500 text-sm">*</span>
                Total Volume(CBM):</div>
              <div class="relative w-full">
                <input class="input h-10" type="number" min="0" v-model="form.total_volume"
                  v-validate="'required|rentVolume'" name="rentVolume">
                <div class="inputTips -bottom-3.5">{{errors.first("rentVolume")}}</div>
              </div>
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">
                <span class="text-red-500 text-sm">*</span>
                Inventory time(day):</div>
              <div class="relative w-full">
                <input class="input h-10" type="number" min="0" v-model="form.inventory_time"
                  v-validate="'required|rentTime'" name="rentTime">
                <div class="inputTips -bottom-3.5">{{errors.first("rentTime")}}</div>
              </div>
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">
                <span class="text-red-500">*</span>
                Of Boxes:</div>
              <div class="relative w-full">
                <input class="input h-10" type="number" min="0" v-model="form.of_boxes"
                  v-validate="'required|rentUnit'" name="rentUnit" :class="isview ? 'bg-gray-200' : ''" :disabled="isview">
                <div class="inputTips -bottom-3.5">{{errors.first("rentUnit")}}</div>
              </div>
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Warehouse Address:</div>
              <select class="select h-10" v-model="form.warehouse_address">
                <option value="1">Shenzhen</option>
                <option value="2">Yiwu</option>
                <option value="3">Los Angeles</option>
                <option value="4">New York</option>
                <!-- <option value="Yiwu">Yiwu</option>
                <option value="Ho Chi Minh">Ho Chi Minh</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="New York">New York</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option> -->
              </select>
            </div>
            <!-- <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center"></div> -->
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">
                <span class="text-red-500 text-sm">*</span>
                Outbound Service:</div>
              <div ref="selectss" class="relative w-full h-10">
                <div class="absolute top-0 left-0 input h-10 cursor-pointer text-sm overflow-ellipsis overflow-hidden whitespace-nowrap" @click="selectShow = !selectShow">
                  {{checked}}
                </div>
                <input class="input h-10 hidden" type="text" v-model="form.outbound_service"
                  v-validate="'required|rentService'" name="rentService">
                <div class="inputTips -bottom-3.5">{{errors.first("rentService")}}</div>
                <div v-show="selectShow" class="absolute top-10 left-0 w-full mt-0.5 shadow-md z-50">
                  <div class="selectUl">
                    <ul>
                      <li
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
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">
                <span class="text-red-500 text-sm">*</span>
                Label Carton qty:</div>
              <div class="relative w-full">
                <input class="input h-10" type="number" min="1" v-model="form.label_carton_qty"
                  v-validate="'required|rentLabel'" name="rentLabel">
                <div class="inputTips -bottom-3.5">{{errors.first("rentLabel")}}</div>
              </div>
            </div>
            <div v-if="selectList[2].selected" class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">
                <span class="text-red-500 text-sm">*</span>
                Inspection Carton qty:</div>
              <div class="relative w-full">
                <input class="input h-10" type="number" min="1" v-model="form.inspection_carton_qty"
                  v-validate="'required|rentInspection'" name="rentInspection">
                <div class="inputTips -bottom-3.5">{{errors.first("rentInspection")}}</div>
              </div>
            </div>
          </div>

          <div class="mt-4 flex justify-end">
            <button @click="searchReset" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Reset</button>
            <button @click="searchResult" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Search</button>
          </div>
        </div>

        <div v-show="noSearch" class="mt-3 mb-32 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="mt-4 rounded-md overflow-hidden">
            <div class="px-4 py-2 bg-menuSelect text-gray-500 text-13">Warm reminder: the trial calculation results are for reference only, the final cost of the actual situation of the goods shall prevail</div>
            <div class="w-full overflow-x-auto listWidth">
              <div class="inline-flex px-4 py-3.5 2xl:grid grid-cols-10 bg-warehouseList dark:bg-darkLine">
                <div class="w-36 2xl:w-auto col-span-1 flex items-center">Warehouse Address</div>
                <div class="w-36 2xl:w-auto col-span-1 flex items-center">Total Volume(CBM)</div>
                <div class="w-36 2xl:w-auto col-span-1 flex items-center">Product Name</div>
                <div class="w-36 2xl:w-auto col-span-1 flex items-center">Of Boxes</div>
                <div class="w-36 2xl:w-auto col-span-1 flex items-center">Inventory time</div>
                <div class="w-36 2xl:w-auto col-span-1 flex items-center">Free days</div>
                <div class="w-36 2xl:w-auto col-span-1 flex items-center">Outbound Service</div>
                <div class="w-36 2xl:w-auto col-span-1 flex items-center">Label Carton qty</div>
                <div class="w-36 2xl:w-auto col-span-1 flex items-center">Inspection Carton qty</div>
                <div class="w-36 2xl:w-auto col-span-1 flex items-center justify-end">Fee($)</div>
              </div>
              <div>
                <div class="inline-flex px-4 py-3.5 2xl:grid grid-cols-10 border-b dark:border-darkLine">
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center">{{forms.warehouse_address}}</div>
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center">{{forms.total_volume}}</div>
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center">{{forms.cargo_type}}</div>
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center">{{forms.of_boxes}}</div>
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center">{{forms.inventory_time}}</div>
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center">{{forms.free_days}}</div>
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center">{{forms.outbound_service}}</div>
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center">{{forms.label_carton_qty}}</div>
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center">{{forms.inspection_carton_qty}}</div>
                  <div class="w-36 2xl:w-auto col-span-1 flex items-center justify-end">{{forms.free}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="py-5 flex justify-center">
            <button @click="openBooking" class="py-1.5 px-6 bg-orange text-white hover:bg-orange1 rounded-md">Booking</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {
    reqRent,
    applyStorage
  } from '@/api/warehouse'
  import html2canvas from "html2canvas"
  import JsBarcode from 'jsbarcode';
  export default {
    components: {
      
    },
    data() {
      return {
        form:{
          cargo_type: '',
          total_volume: '',
          inventory_time: '',
          of_boxes: '',
          warehouse_address: 1,
          outbound_service: [],
          label_carton_qty: '',
          inspection_carton_qty: '',
        },
        forms:{
          cargo_type: '',
          total_volume: '',
          inventory_time: '',
          of_boxes: '',
          warehouse_address: 1,
          outbound_service: '',
          label_carton_qty: '',
          inspection_carton_qty: '',
          address: 1,
          service: [],
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
        warehouseAddress:['','Shenzhen'],
        // checkedList: [],
        checked: '',
        selectLists:[
          {
            name: 'Unnecessary',
            selected: false,
          },
          {
            name: 'Label',
            selected: false,
          },
          {
            name: 'Inspection',
            selected: false,
          },
          {
            name: 'Repack',
            selected: false,
          },
          {
            name: 'Palletize',
            selected: false,
          },
          {
            name: 'Container Loading',
            selected: false,
          },
        ],
        checkeds: '',
        selectShow: false,
        noSearch: false,
        superLevel: '15',
        email: '',
        manageID: '',
        code: '',
        isview: false,
      }
    },
    created() {
      this.$emit('menu', 'RentCalculation')
    },
    mounted() {
      document.addEventListener(
        "click",
        this.even,
        true
      );
      if(this.$store.state.user.token){
        let user = JSON.parse(localStorage.getItem('userInfo'))
        let lv = user.super_level
        if(lv == 'L2'){
          this.superLevel = '30'
        }
        this.manageID = user.manage.id
        this.email = user.email
      }else{
        this.manageID = JSON.parse(localStorage.getItem("manageNew")).id
      }
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
    },
    methods:{
      even(e){
        if(!this.$refs.selectss.contains(e.target)){
          this.selectShow = false
        }
      },
      openBooking(){
        this.$refs.mask.style = 'display:block;'
        this.$refs.bookingModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.bookingModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.bookingModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.successModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      submitModal(){
        if(this.email != ''){
          applyStorage({
            sale_id: this.manageID,
            // email: this.email,
            warehouse_address: this.forms.address,
            total_volume: this.forms.total_volume,
            of_boxes: this.forms.of_boxes,
            inventory_time: this.forms.inventory_time,
            outbound_service: this.forms.service,
            label_carton_qty: this.forms.label_carton_qty,
            inspection_carton_qty: this.forms.inspection_carton_qty,
            // free: this.forms.free,
            site_url: 'app.cargosoon.com',
            entry_method: 1,
            supplier_id: [],
            cargo_type: this.forms.cargo_type,
            estimated_time: '',
            file_id: '',
          }).then((res)=>{
            this.code = res.data
            this.$refs.bookingModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
            this.$refs.successModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'

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
      searchReset(){
        this.form = {
          cargo_type: '',
          total_volume: '',
          inventory_time: '',
          of_boxes: '',
          warehouse_address: 1,
          outbound_service: [],
          label_carton_qty: '',
          inspection_carton_qty: '',
        },
        this.selectList = [
          {
            name: 'Unnecessary',
            selected: false,
          },
          {
            name: 'Label',
            selected: false,
          },
          {
            name: 'Inspection',
            selected: false,
          },
          {
            name: 'Repack',
            selected: false,
          },
          {
            name: 'Palletize',
            selected: false,
          },
          {
            name: 'Container Loading',
            selected: false,
          },
        ],
        this.checked = '',
        this.noSearch = false
        setTimeout(()=>{
          this.$validator.reset()
        },1)
      },
      async searchResult(){
        const success = await this.$validator.validateAll()
        if(success){
          if(!this.selectList[1].selected){
            this.form.label_carton_qty = ''
          }
          if(!this.selectList[2].selected){
            this.form.inspection_carton_qty = ''
          }
          // console.log(this.form);
          reqRent(this.form).then((res)=>{
            this.noSearch = true
            this.forms = res.data
            this.forms.outbound_service = res.data.outbound_service.join(', ')
            this.forms.label_carton_qty = JSON.parse(JSON.stringify(this.form.label_carton_qty))
            this.forms.inspection_carton_qty = JSON.parse(JSON.stringify(this.form.inspection_carton_qty))
            this.forms.address = JSON.parse(JSON.stringify(this.form.warehouse_address))
            this.forms.service = JSON.parse(JSON.stringify(this.form.outbound_service))
          })
          
          // console.log(this.form.service);
          // this.forms = JSON.parse(JSON.stringify(this.form))
          // this.checkeds = JSON.parse(JSON.stringify(this.checked))
          // this.selectLists = JSON.parse(JSON.stringify(this.selectList))
          // this.noSearch = true
          
          // // this.forms.time - 15 
          // let m = Math.ceil(Number(this.forms.time)/30)
          // if(m < 7){
          //   console.log(30*this.forms.volume*m)
          // }else if(m < 13){
          //   console.log(60*this.forms.volume*m)
          // }else{
          //   console.log(120*this.forms.volume*m)
          // }

          // if(this.selectLists[1].selected){

          // }
          // if(this.selectLists[2].selected){
            
          // }
          // if(this.selectLists[3].selected){
            
          // }
          // if(this.selectLists[4].selected){
            
          // }
          // if(this.selectLists[5].selected){
            
          // }
        }
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

.selectUl{
  @apply rounded-md max-h-52 overflow-auto cursor-pointer bg-white dark:bg-darkMenu;
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

ul{
  @apply my-1;
}

li{
  @apply h-10 bg-white dark:bg-darkMenu hover:bg-lightMenu dark:hover:bg-darkLine p-2 pl-7 cursor-pointer relative select-none;
}

.selectOne{
  @apply bg-green-400;
}

.inputTips {
  @apply left-0 text-xs text-red-500 absolute;
}

.listWidth::-webkit-scrollbar {
  height: 6px;
}

.listWidth::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.listWidth::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 0;
  /* background: rgb(255, 255, 255); */
  border-radius: 6px;
}
</style>