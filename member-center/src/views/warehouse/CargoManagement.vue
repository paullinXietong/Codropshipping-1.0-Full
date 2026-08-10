<template>
  <div class="w-full h-full relative">
    <div ref="mask" class="mask"></div>
    <div ref="cancelModal" class="modal p-5 w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div>Sure you want to cancel your application?</div>
      <div class="mt-16 flex justify-end items-center">
        <button @click="closeModal" class="py-1.5 px-4 border-none hover:underline rounded-md">Cancel</button>
        <button @click="cancelSave" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Save</button>
      </div>
    </div>
    <div ref="imgModal" class="modal w-900 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-end">
        <div @click="closeModal" class="p-3 hover:bg-gray-200 cursor-pointer">
          <svg t="1698653302630" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4105" width="20" height="20"><path d="M477.895023 385.971685L845.430841 18.357099a66.717282 66.717282 0 0 1 91.923338 0c24.497137 24.497137 24.497137 67.426202 0 91.923338L569.818362 477.895023l367.535817 367.535818c24.497137 24.575905 24.497137 67.426202 0 91.923338a66.717282 66.717282 0 0 1-91.923338 0L477.895023 569.818362 110.280437 937.354179a66.717282 66.717282 0 0 1-91.923338 0 66.717282 66.717282 0 0 1 0-91.923338L385.971685 477.895023 18.357099 110.280437a66.717282 66.717282 0 0 1 0-91.923338 66.717282 66.717282 0 0 1 91.923338 0L477.895023 385.971685z" fill="#707070" p-id="4106"></path></svg>
        </div>
      </div>
      <img :src="bigImg" class="w-full p-3" alt="">
    </div>
    <div ref="detailModal" class="modal p-3 w-900 opacity-20 bg-white dark:bg-darkMenu">
      <div class="pb-2 flex justify-between items-center border-b">
        <div>Inventory Records</div>
        <div @click="closeModal" class="p-2 hover:bg-gray-200 cursor-pointer">
          <svg t="1698653302630" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4105" width="20" height="20"><path d="M477.895023 385.971685L845.430841 18.357099a66.717282 66.717282 0 0 1 91.923338 0c24.497137 24.497137 24.497137 67.426202 0 91.923338L569.818362 477.895023l367.535817 367.535818c24.497137 24.575905 24.497137 67.426202 0 91.923338a66.717282 66.717282 0 0 1-91.923338 0L477.895023 569.818362 110.280437 937.354179a66.717282 66.717282 0 0 1-91.923338 0 66.717282 66.717282 0 0 1 0-91.923338L385.971685 477.895023 18.357099 110.280437a66.717282 66.717282 0 0 1 0-91.923338 66.717282 66.717282 0 0 1 91.923338 0L477.895023 385.971685z" fill="#707070" p-id="4106"></path></svg>
        </div>
      </div>
      <div class="mt-3">
        <div class="pb-2 font-semibold">Goods No.: {{stockDatailNo}}</div>
        <div class="pb-3">Box name: {{stockDatailName}}</div>
        <el-table
          :data="stockDatail"
          style="width: 100%">
          <el-table-column
            label="Style"
            >
            <template slot-scope="scope" >
              <div>{{detailStyle[scope.row.type]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="warehouse_no"
            label="Order No."
            >
          </el-table-column>
          <el-table-column
            prop="number"
            label="Quantity"
            >
          </el-table-column>
          <el-table-column
            prop="warehousing_date"
            label="Times"
            >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div ref="skuModal" class="modal p-3 w-900 opacity-20 bg-white dark:bg-darkMenu">
      <div class="pb-2 flex justify-between items-center border-b">
        <div>SKU Details</div>
        <div @click="closeModal" class="p-2 hover:bg-gray-200 cursor-pointer">
          <svg t="1698653302630" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4105" width="20" height="20"><path d="M477.895023 385.971685L845.430841 18.357099a66.717282 66.717282 0 0 1 91.923338 0c24.497137 24.497137 24.497137 67.426202 0 91.923338L569.818362 477.895023l367.535817 367.535818c24.497137 24.575905 24.497137 67.426202 0 91.923338a66.717282 66.717282 0 0 1-91.923338 0L477.895023 569.818362 110.280437 937.354179a66.717282 66.717282 0 0 1-91.923338 0 66.717282 66.717282 0 0 1 0-91.923338L385.971685 477.895023 18.357099 110.280437a66.717282 66.717282 0 0 1 0-91.923338 66.717282 66.717282 0 0 1 91.923338 0L477.895023 385.971685z" fill="#707070" p-id="4106"></path></svg>
        </div>
      </div>
      <div class="mt-3">
        <el-table
          :data="skuDetails"
          style="width: 100%">
          <el-table-column
            prop="sku"
            label="SKU"
            >
          </el-table-column>
          <el-table-column
            prop="number"
            label="Quantity"
            >
          </el-table-column>
          <el-table-column
            prop="title_en"
            label="Product Name"
            >
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div>
          <div class="flex text-lg">
            <div :class="stockForm.transport_type == 1 ? 'text-orange border-orange' : 'border-transparent'"
              class="pb-1 border-b-2 font-semibold cursor-pointer hover:text-orange"
              @click="getList(1)">SKU Management</div>
            <div :class="stockForm.transport_type == 2 ? 'text-orange border-orange' : 'border-transparent'"
              class="pb-1 border-b-2 font-semibold cursor-pointer hover:text-orange ml-8"
              @click="getList(2)">Transit Warehouse</div>
          </div>
          <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
            <div class="grid grid-cols-12 gap-5">
              <div class="col-span-12 sm:col-span-6 xl:col-span-3">
                <div class="mb-1.5">SKU:</div>
                <input class="input h-10" type="text" v-model="stockForm.sku">
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3">
                <div class="mb-1.5">Product Name:</div>
                <input class="input h-10" type="text" v-model="stockForm.product_name">
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 flex items-end">
                <button @click="getList(stockForm.transport_type)" class="py-2 px-7 bg-orange text-white hover:bg-orange1 rounded">Search</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="flex">
            <el-button
              type="primary"
              @click="openCustom"
            >Custom List</el-button>
            <el-button
              class="ml-2"
              type="primary"
              :loading="loading"
              @click="exportFile"
            >Export List</el-button>
          </div>

          <TableListVue
            v-show="stockList.length > 0"
            ref="tableList"
            :tableData="stockList"
            @openImg='openImg'
            :RowColumn='Column'
            @viewDetail="getDetails"
            @skuDetail="skuDetail"
          ></TableListVue>
          
          <div
            v-show="stockList.length == 0"
            class="p-3"
          >
            <div class="mt-4 py-4 flex flex-col justify-center items-center rounded bg-white dark:bg-darkMenu">
              <img
                src="../../assets/warehouseNodata.png"
                class="w-40 h-40"
                alt=""
              >
              <div>No data</div>
            </div>
          </div>
        </div>

        <div class="hidden">
          <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
            <div class="grid grid-cols-12 gap-5">
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 140px;">Storage Number:</div>
                <input class="input h-10" type="text" v-model="form.sname">
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 140px;">Outbound Number:</div>
                <input class="input h-10" type="text" v-model="form.oname">
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 140px;">Product Name:</div>
                <input class="input h-10" type="text" v-model="form.model">
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 140px;">Supplier:</div>
                <input class="input h-10" type="text" v-model="form.supplier">
              </div>
              <div class="col-span-12 flex justify-center items-center">
                <button @click="searchReset" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Reset</button>
                <button @click="searchResult" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Search</button>
                <div class="ml-4">
                  <router-link :to="{ name: 'RentCalculation' }">
                    <button class="py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Apply for storage space</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
            <div class="flex justify-between items-center">
              <div class="flex">
                <div @click="searchStatus('0')" class="mr-2 p-2 border-b-2 cursor-pointer flex"
                  :class="[istab == '0' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                  <div>All</div>
                </div>
                <div @click="searchStatus('1')" class="mr-2 p-2 border-b-2 cursor-pointer flex"
                  :class="[istab == '1' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                  <div>Awaiting storage</div>
                </div>
                <div @click="searchStatus('2')" class="mr-2 p-2 border-b-2 cursor-pointer flex"
                  :class="[istab == '2' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                  <div>In storage</div>
                </div>
                <div @click="searchStatus('4')" class="mr-2 p-2 border-b-2 cursor-pointer flex"
                  :class="[istab == '4' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                  <div>Awaiting discharge</div>
                </div>
                <div @click="searchStatus('5')" class="mr-2 p-2 border-b-2 cursor-pointer flex"
                  :class="[istab == '5' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                  <div>Out of storage</div>
                </div>
                <div @click="searchStatus('3')" class="p-2 border-b-2 cursor-pointer flex"
                  :class="[istab == '3' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                  <div>Cancelled</div>
                </div>
                <!-- <div @click="searchStatus('6')" class="p-2 border-b-2 cursor-pointer flex"
                  :class="[istab == '6' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                  <div>Abandoned goods</div>
                </div> -->
              </div>
              <button @click="downloadExcel" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Export List</button>
            </div>
            <el-table
              v-show="list.length != 0"
              :data="list"
              :header-cell-style="{'background-color':'#ededee'}"
              style="width: 100%;margin-top: 12px;">
              <el-table-column
                fixed
                prop="storage_number"
                label="Storage number"
                width="160">
              </el-table-column>
              <el-table-column
                prop="outbound_number"
                label="Outbound number"
                width="160">
              </el-table-column>
              <el-table-column
                label="Product name"
                width="224">
                <template slot-scope="scope">
                  <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    <span v-for="(z,x) in scope.row.cargo_type" :key="x" class="flex-shrink-0">
                      <span v-show="x>0">, </span>
                      {{z}}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Photos"
                width="96">
                <template slot-scope="scope">
                  <img v-if="scope.row.photos != ''" @click="openImg(scope.row.photos)" :src="scope.row.photos" class="w-8 h-8 rounded cursor-pointer" alt="">
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="total_weight"
                label="Total Weight(kg)"
                width="160">
              </el-table-column> -->
              <el-table-column
                prop="total_volume"
                label="Total Volume(CBM)"
                width="160">
              </el-table-column>
              <el-table-column
                prop="pf"
                label="PO/FBA(number)"
                width="160">
              </el-table-column>
              <el-table-column
                prop="cargo_status"
                label="Cargo status"
                width="160">
                <template slot-scope="scope">
                  <div v-show="scope.row.cargo_status == 'Awaiting storage'" class="py-2 rounded-md text-white text-center" style="background-color: #629BF8;">{{scope.row.cargo_status}}</div>
                  <div v-show="scope.row.cargo_status == 'In storage'" class="py-2 rounded-md text-white text-center" style="background-color: #EB8943;">{{scope.row.cargo_status}}</div>
                  <div v-show="scope.row.cargo_status == 'Awaiting discharge'" class="py-2 rounded-md text-white text-center" style="background-color: #A6A5FF;">{{scope.row.cargo_status}}</div>
                  <div v-show="scope.row.cargo_status == 'Out of storage'" class="py-2 rounded-md text-white text-center" style="background-color: #40C79A;">{{scope.row.cargo_status}}</div>
                  <div v-show="scope.row.cargo_status == 'Cancelled'" class="py-2 rounded-md text-white text-center bg-gray-400">{{scope.row.cargo_status}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="creation_time"
                label="Creation time"
                width="160">
              </el-table-column>
              <el-table-column
                prop="supplier"
                label="Supplier"
                width="224">
                <template slot-scope="scope">
                  <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">{{scope.row.supplier}}</div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="inventory_time"
                label="Inventory time"
                width="160">
              </el-table-column> -->
              <el-table-column
                label="Arrival list number"
                width="224">
                <template slot-scope="scope">
                  <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    <span v-for="(z,x) in scope.row.arrival_list_number" :key="'x'+x" class="flex-shrink-0">
                      <span v-show="x>0">, </span>
                      {{z}}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="of_boxes"
                label="Of boxes"
                width="160">
              </el-table-column> -->
              <el-table-column
                prop="warehouse_address"
                label="Warehouse address"
                width="160">
              </el-table-column>
              <el-table-column
                prop="free"
                label="Fee(USD)"
                width="160">
              </el-table-column>
              <!-- <el-table-column
                prop="model"
                label="Model"
                width="160">
              </el-table-column> -->
              <el-table-column
                prop="remark"
                label="Remark"
                width="160">
              </el-table-column>

              <el-table-column
                fixed="right"
                label="Action"
                header-align="right"
                width="100">
                <template slot-scope="scope">
                  <div class="flex items-center justify-end">
                    <!-- <button v-if="scope.row.cargo_status == 'Awaiting storage'" @click="cancelApp(scope.row.id)" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Cancel</button> -->
                    <button @click="viewDetail(scope.row)" class="py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md border border-transparent">View</button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div v-show="list.length == 0" class="py-6 flex flex-col justify-center items-center">
              <img src="../../assets/warehouseNodata.png" class="w-52 h-52" alt="">
              <div>No data</div>
            </div>
          </div>

          <page-warehouse
            ref="pageW"
            @searchW="pageSearch"
          ></page-warehouse>
        </div>
      </div>

      <CustomListVue
        ref="customListRef"
        @on-submit='submit'
      ></CustomListVue>
    </div>
  </div>
</template>

<script>
  import PageWarehouse from '@/components/Warehouse/pageS'
  import {
    getWarehouseList,
    cancelApply,
    get_stock_list,
    getSetting,
    get_stock_info,
    exportList,
  } from '@/api/warehouse'
  import table2excel from 'js-table2excel/src/index';
  import TableListVue from "@/components/Warehouse/table-stock.vue";
  import CustomListVue from "@/components/Warehouse/stock-list.vue";

  export default {
    components: {
      PageWarehouse,
      TableListVue,
      CustomListVue
    },
    data() {
      return {
        istab: '0',
        listTotal: [],
        list: [],
        Waddress: ['', 'Shenzhen',],
        form: {
          sname: '',
          model: '',
          supplier: '',
          oname: '',
        },
        cancelID: null,
        bigImg: '',
        pageTotal: 0,
        pageNum: 1,
        stockForm: {
          transport_type: 1,
          sku: '',
          product_name: '',
        },
        stockList: [],
        Column: [],
        RowColumn: {
          skuTable:[
            {
              label: 'Customer SKU',
              prop: 'sku',
              width: '180'
            },
            {
              label: 'Product Name',
              prop: 'title_en',
              width: ''
            },
            {
              label: 'Box Quantity',
              prop: 'number',
              width: '180'
            },
            // {
            //   label: 'Outbound Quantity',
            //   prop: 'outbound_number',
            //   width: '180'
            // },
            // {
            //   label: 'Remaining Quantity',
            //   prop: 'stock_number',
            //   width: '180'
            // },
            {
              label: 'Size',
              prop: 'size',
              slot: 'size',
              width: '180'
            },
            // {
            //   label: 'Volumetric',
            //   prop: 'sku',
            //   width: '140'
            // },
            {
              label: 'Weight',
              prop: 'weight',
              width: '140'
            },
            // {
            //   label: 'Warehouse Rentals',
            //   prop: '',
            //   width: '180'
            // },
          ],
          boxTable: [
            {
              label: 'Box NO.',
              prop: 'box_number',
              width: '180'
            },
            {
              label: 'Box Name',
              prop: 'box_name',
              width: '180'
            },
            {
              label: 'Photos',
              prop: 'img',
              slot: 'img',
              width: '120'
            },
            {
              label: 'Product Name',
              prop: 'title_en',
              width: ''
            },
            {
              label: 'Customer SKU',
              prop: 'sku',
              width: '180'
            },
            {
              label: 'Box Quantity',
              prop: 'number',
              width: '180'
            },
            // {
            //   label: 'Outbound Quantity',
            //   prop: 'outbound_number',
            //   width: '180'
            // },
            // {
            //   label: 'Remaining Quantity',
            //   prop: 'stock_number',
            //   width: '180'
            // },
            {
              label: 'Size',
              prop: 'size',
              slot: 'size',
              width: '200'
            },
            // {
            //   label: 'Volumetric',
            //   prop: 'sku',
            //   width: '140'
            // },
            {
              label: 'Weight',
              prop: 'weight',
              width: '140'
            },
            // {
            //   label: 'Warehouse Rentals',
            //   prop: '',
            //   width: '180'
            // },
          ]
        },
        stockHead: [],
        tableHead: [],
        customlist: [],
        stockDatail: [],
        stockDatailNo: '',
        stockDatailName: '',
        detailStyle: ['', 'Inbound', 'Outbound'],
        loading: false,
        skuDetails: [],
      }
    },
    created() {
      this.$emit('menu', 'CargoManagement')
    },
    mounted() {
      getWarehouseList().then((res)=>{
        this.listTotal = res.data.list
        this.list = []
        this.listTotal.forEach((items) => {
          items.in_info.outbound_number = ''
          let arr = {}
          arr = { ...items.in_info, ...items.out_info }
          arr.subId = items.sub_detail.main_id
          arr.subType = items.sub_detail.type
          this.list.push(arr)
        })
        this.pageTotal = res.data.count
        this.pageC()
        // this.searchStatus('1')
      })
      getSetting({
        type: 1,
      }).then((reh) => {
        if(reh.data == null || reh.data == ""){
          this.customlist = []
        }else{
          this.customlist = reh.data;
        }
        this.customlist.forEach((item) => {
          const row = this.RowColumn.skuTable.find((i) => i.prop === item);
          if(row != undefined){
            this.Column.push(row);
          }
        });
        get_stock_list(this.stockForm).then((res) => {
          this.stockList = res.data.data
          // this.stockHead = []
          this.tableHead = []
          this.RowColumn.skuTable.forEach((item) => {
            let arr = {
              label: item.label,
              key: item.prop
            }
            this.tableHead.push(arr)
            // this.stockHead.push(item.prop)
          })
        })
      })
    },
    methods:{
      pageC(){
        // this.$refs.pageW.pageCou(this.pageTotal, this.pageNum)
      },
      pageSearch(num){
        let form = this.form
        getWarehouseList({
          cargo_status: this.istab,
          storage_number: form.sname,
          outbound_number: form.oname,
          cargo_type: form.model,
          supplier: form.supplier,
          pageIndex: num,
        }).then((res)=>{
          this.listTotal = res.data.list
          this.list = []
          this.listTotal.forEach((items) => {
            items.in_info.outbound_number = ''
            let arr = {}
            arr = { ...items.in_info, ...items.out_info }
            arr.subId = items.sub_detail.main_id
            arr.subType = items.sub_detail.type
            this.list.push(arr)
          })
          this.pageTotal = res.data.count
          this.pageNum = num
          this.pageC()
        })
      },
      searchReset(){
        this.form = {
          sname: '',
          model: '',
          supplier: '',
          oname: '',
        }
      },
      searchResult(){
        let form = this.form
        getWarehouseList({
          cargo_status: this.istab,
          storage_number: form.sname,
          outbound_number: form.oname,
          cargo_type: form.model,
          supplier: form.supplier,
        }).then((res)=>{
          this.listTotal = res.data.list
          this.list = []
          this.listTotal.forEach((items) => {
            items.in_info.outbound_number = ''
            let arr = {}
            arr = { ...items.in_info, ...items.out_info }
            arr.subId = items.sub_detail.main_id
            arr.subType = items.sub_detail.type
            this.list.push(arr)
          })
          this.pageTotal = res.data.count
          this.pageNum = 1
          this.pageC()
          // this.istab = '1'
          // this.searchStatus('1')
        })
      },
      cancelApp(id){
        this.cancelID = id
        this.$refs.mask.style = 'display:block;'
        this.$refs.cancelModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.cancelModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      viewDetail(item){
        // console.log(item);
        if(item.outbound_number!=''){
          this.$router.push({
            name:'OutboundDetail',
            params: {
              id: item.id,
              type: item.type,
              status: item.cargo_status
            },
          })
        }else{
          let ids = 0
          if(item.subType == "3"){
            ids = item.subId
          }else{
            ids = item.id
          }
          this.$router.push({
            name:'ApplySpace',
            params: {
              id: ids,
              status: item.cargo_status,
              statu: item.status,
              type: item.subType,
            },
          })
        }
      },
      searchStatus(num){
        let form = this.form
        this.istab = num
        getWarehouseList({
          cargo_status: num,
          storage_number: form.sname,
          outbound_number: form.oname,
          cargo_type: form.model,
          supplier: form.supplier,
        }).then((reh)=>{
          this.listTotal = reh.data.list
          this.list = []
          this.listTotal.forEach((items) => {
            items.in_info.outbound_number = ''
            let arr = {}
            arr = { ...items.in_info, ...items.out_info }
            arr.subId = items.sub_detail.main_id
            arr.subType = items.sub_detail.type
            this.list.push(arr)
          })
          this.pageTotal = reh.data.count
          this.pageNum = 1
          this.pageC()
        })
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.cancelModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.imgModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.detailModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.skuModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      cancelSave(){
        cancelApply({id:this.cancelID}).then((res)=>{
          this.closeModal()
          getWarehouseList({
            cargo_status: '3',
          }).then((reh)=>{
            this.listTotal = reh.data.list
            this.list = []
            this.listTotal.forEach((items) => {
              items.in_info.outbound_number = ''
              let arr = {}
              arr = { ...items.in_info, ...items.out_info }
              arr.subId = items.sub_detail.main_id
              arr.subType = items.sub_detail.type
              this.list.push(arr)
            })
            this.istab = '3'
            this.pageTotal = res.data.count
            this.pageNum = 1
            this.pageC()
            // this.searchStatus('1')
          })
        })
      },
      openImg(img){
        this.bigImg = img
        this.$refs.mask.style = 'display:block;'
        this.$refs.imgModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.imgModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      downloadExcel() {
        const column = [
          {
            title: 'Storage number',
            key: 'storage_number',
            type: 'text',
          },
          {
            title: 'Outbound number',
            key: 'outbound_number',
            type: 'text',
          },
          {
            title: 'Product name',
            key: 'cargo_type',
            type: 'text',
          },
          {
            title: 'Photos',
            key: 'photos',
            type: 'image',
            width: 100,
            height: 100,
          },
          {
            title: 'Total Weight(kg)',
            key: 'total_weight',
            type: 'text',
          },
          {
            title: 'Total Volume(CBM)',
            key: 'total_volume',
            type: 'text',
          },
          {
            title: 'PO/FBA(number)',
            key: 'pf',
            type: 'text',
          },
          {
            title: 'Cargo status',
            key: 'cargo_status',
            type: 'text',
          },
          {
            title: 'Creation time',
            key: 'creation_time',
            type: 'text',
          },
          {
            title: 'Supplier',
            key: 'supplier',
            type: 'text',
          },
          {
            title: 'Arrival list number',
            key: 'arrival_list_number',
            type: 'text',
          },
          {
            title: 'Warehouse address',
            key: 'warehouse_address',
            type: 'text',
          },
          {
            title: 'Fee(USD)',
            key: 'free',
            type: 'text',
          },
          {
            title: 'Remark',
            key: 'remark',
            type: 'text',
          }
        ];
        const tableDatas = JSON.parse(JSON.stringify(this.list));
        let excelname = 'Cargo List.xlsx'//如果不带后缀,默认是.xls文件
        table2excel(column, tableDatas, excelname);
      },
      getList(type){
        this.stockList = []
        if(type == 1){
          this.stockForm.transport_type = type
          getSetting({
            type: type,
          }).then((reh) => {
            if(reh.data == null || reh.data == ""){
              this.customlist = []
            }else{
              this.customlist = reh.data;
            }
            this.Column = [];
            this.customlist.forEach((item) => {
              const row = this.RowColumn.skuTable.find((i) => i.prop === item);
              if(row != undefined){
                this.Column.push(row);
              }
            });
            get_stock_list(this.stockForm).then((res) => {
              this.stockList = res.data.data
              this.tableHead = []
              this.RowColumn.skuTable.forEach((item) => {
                let arr = {
                  label: item.label,
                  key: item.prop
                }
                this.tableHead.push(arr)
              })
            })
          })
        }else if(type == 2){
          this.stockForm.transport_type = type
          getSetting({
            type: type,
          }).then((reh) => {
            if(reh.data == null || reh.data == ""){
              this.customlist = []
            }else{
              this.customlist = reh.data;
            }
            this.Column = [];
            this.customlist.forEach((item) => {
              const row = this.RowColumn.boxTable.find((i) => i.prop === item);
              if(row != undefined){
                this.Column.push(row);
              }
            });
            get_stock_list(this.stockForm).then((res) => {
              this.stockList = res.data.data
              this.tableHead = []
              this.RowColumn.boxTable.forEach((item) => {
                let arr = {
                  label: item.label,
                  key: item.prop
                }
                this.tableHead.push(arr)
              })
            })
          })
        }
      },
      openCustom(){
        // console.log(this.tableHead);
        this.$refs.customListRef.open(this.customlist, this.tableHead, this.stockForm.transport_type);
      },
      submit(){
        getSetting({
          type: this.stockForm.transport_type,
        }).then((res) => {
          if(res.data == null || res.data == ""){
            this.customlist = []
          }else{
            this.customlist = res.data;
          }
          this.Column = [];
          if(this.stockForm.transport_type == 1){
            this.customlist.forEach((item) => {
              const row = this.RowColumn.skuTable.find((i) => i.prop === item);
              if(row != undefined){
                this.Column.push(row);
              }
            });
          }else{
            this.customlist.forEach((item) => {
              const row = this.RowColumn.boxTable.find((i) => i.prop === item);
              if(row != undefined){
                this.Column.push(row);
              }
            });
          }

          this.$nextTick(()=>{
            this.$refs.tableList.$refs.tableref.doLayout();
          })
          
        });
      },
      getDetails(id, no, name){
        this.stockDatailNo = no
        this.stockDatailName = name 
        get_stock_info({
          id: id,
        }).then((res)=>{
          this.stockDatail = res.data
          this.$refs.mask.style = 'display:block;'
          this.$refs.detailModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.detailModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        })
      },
      skuDetail(sku){
        this.skuDetails = sku
        this.$refs.mask.style = 'display:block;'
        this.$refs.skuModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.skuModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      exportFile(){
        this.loading = true;
        exportList({
          type: this.stockForm.transport_type,
          transport_type: this.stockForm.transport_type,
          sku: this.stockForm.sku,
          product_name: this.stockForm.product_name
        }).then(res=>{
          if(res.code == 0){
            var link = document.createElement("a");
            link.href = '/api'+res.data.file;
            link.download = 'inventory.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }else{
            this.$message.error(res.msg);
          }

          this.loading = false;
        })
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
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}
</style>