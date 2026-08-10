<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="imgModal" class="modal w-900 opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-end">
        <div @click="closeModal" class="p-3 hover:bg-gray-200 cursor-pointer">
          <svg t="1698653302630" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4105" width="20" height="20"><path d="M477.895023 385.971685L845.430841 18.357099a66.717282 66.717282 0 0 1 91.923338 0c24.497137 24.497137 24.497137 67.426202 0 91.923338L569.818362 477.895023l367.535817 367.535818c24.497137 24.575905 24.497137 67.426202 0 91.923338a66.717282 66.717282 0 0 1-91.923338 0L477.895023 569.818362 110.280437 937.354179a66.717282 66.717282 0 0 1-91.923338 0 66.717282 66.717282 0 0 1 0-91.923338L385.971685 477.895023 18.357099 110.280437a66.717282 66.717282 0 0 1 0-91.923338 66.717282 66.717282 0 0 1 91.923338 0L477.895023 385.971685z" fill="#707070" p-id="4106"></path></svg>
        </div>
      </div>
      <img :src="bigImg" class="w-full p-3" alt="">
    </div>

    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm mb-32">
        <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="grid grid-cols-6 gap-5">
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 140px;">Receiving NO.:</div>
              <input class="input h-10" type="text" v-model="form.receiving_no">
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 140px;">Storage number:</div>
              <input class="input h-10" type="text"  v-model="form.storage_number">
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 140px;">Product SKU:</div>
              <input class="input h-10" type="text"  v-model="form.sku">
            </div>
            <!-- <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 140px;">Cargo Type:</div>
              <input class="input h-10" type="text" >
            </div> -->
            <div class="pl-9 col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col">
              <label class="flex cursor-pointer">
                <input type="checkbox" v-model="inum" @change="checkNum">
                <div class="ml-1">view only inventory > 0</div>
              </label>
              <label class="mt-1.5 flex cursor-pointer">
                <input type="checkbox" v-model="itime" @change="checkTime">
                <div class="ml-1">Inventory time > 30 days</div>
              </label>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="searchReset" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Reset</button>
            <button @click="searchResult" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Search</button>
          </div>
        </div>

        <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="flex justify-between xl:items-center">
            <div class="flex flex-col xl:flex-row xl:items-center">
              <div class="h-42px flex" >
                <button class="unitType1" :class="[statistics=='box' ? 'unitType' : '']"
                  @click="chooseS('box')">Box Statistics</button>
                <button class="unitType2" :class="[statistics=='sku' ? 'unitType' : '']"
                  @click="chooseS('sku')">SKU Statistics</button>
              </div>
              <div class="xl:ml-3 text-red-500 text-xs">
                <div v-show="statistics == 'sku'">Note: SKU statistics only include packages with SKU information</div>
                <div>Note: Red dots indicate inventory time greater than or equal to 30 days</div>
              </div>
            </div>
            <div>
              <button @click="downloadExcel"
              class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Export List</button>
            </div>
          </div>
          <!-- <div class="flex">
            <div class="w-full overflow-x-auto listWidth">
              <div class="inline-flex mt-3 rounded-tl px-4 py-3.5 bg-warehouseList dark:bg-darkLine text-xs">
                <div v-show="statistics == 'box'" class="w-36 flex items-center">Storage number</div>
                <div v-show="statistics == 'sku'" class="w-36 flex items-center">SKU</div>
                <div class="w-36 flex items-center">Photos</div>
                <div v-show="statistics == 'box'" class="w-36 flex items-center">Case size(cm)</div>
                <div v-show="statistics == 'box'" class="w-36 flex items-center">Carton qty</div>
                <div v-show="statistics == 'box'" class="w-36 flex items-center">Total Weight</div>
                <div v-show="statistics == 'box'" class="w-36 flex items-center">Total Volume(CBM)</div>
                <div class="w-36 flex items-center">PO/FBA(number)</div>
                <div class="w-36 flex items-center">Model</div>
                <div class="w-36 flex items-center">Available Quantity(ctn)</div>
                <div class="w-36 flex items-center">In transit(ctn)</div>
                <div class="w-36 flex items-center">To be released(ctn)</div>
                <div class="w-36 flex items-center">In production(ctn)</div>
                <div class="w-36 flex items-center">Inventory time</div>
                <div class="w-36 flex items-center">Fee($)</div>
                <div class="w-36 flex items-center">Warehouse Address</div>
              </div>
              <div v-show="list.length > 0">
                <div v-for="(i,n) in list" :key="n" class="inline-flex px-4 py-3.5 border-b dark:border-darkLine">
                  <div v-show="statistics == 'box'" class="w-36 flex items-center relative">{{i.storage_number}}
                    <div v-show="i.inventory_time >= 30" class="absolute -left-3 w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div v-show="statistics == 'sku'" class="w-36 flex items-center relative">{{i.sku}}
                    <div v-show="i.inventory_time >= 30" class="absolute -left-3 w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div class="w-36 flex items-center">
                    <img v-if="i.photos != ''" @click="openImg(i.photos)" :src="i.photos" class="w-8 h-8 rounded cursor-pointer" alt="">
                    </div>
                  <div v-show="statistics == 'box'" class="w-36 flex items-center break-all">{{i.case_size}}</div>
                  <div v-show="statistics == 'box'" class="w-36 flex items-center">{{i.carton_qty}}</div>
                  <div v-show="statistics == 'box'" class="w-36 flex items-center">{{i.total_weight}}</div>
                  <div v-show="statistics == 'box'" class="w-36 flex items-center">{{i.total_volume}}</div>
                  <div class="w-36 flex items-center">{{i.pf}}</div>
                  <div class="w-36 flex items-center">{{i.model}}</div>
                  <div class="w-36 flex items-center">{{i.available_quantity}}</div>
                  <div class="w-36 flex items-center">{{i.in_transit}}</div>
                  <div class="w-36 flex items-center pr-3">{{i.to_be_released}}</div>
                  <div class="w-36 flex items-center pr-3">
                    <input type="number" min="0" class="input h-8" v-model="i.in_production">
                  </div>
                  <div class="w-36 flex items-center">{{i.inventory_time}}</div>
                  <div class="w-36 flex items-center">{{i.free}}</div>
                  <div class="w-36 flex items-center">{{i.warehouse_address}}</div>
                </div>
              </div>
            </div>
            <div v-show="statistics == 'box'" class="flex-shrink-0">
              <div class="inline-flex mt-3 rounded-tr px-4 py-3.5 bg-warehouseList dark:bg-darkLine text-xs">
                <div class="w-20 flex items-center justify-end">Action</div>
              </div>
              <div v-show="list.length > 0">
                <div v-for="(i,n) in list" :key="'n'+n" class="px-4 py-3.5 border-b dark:border-darkLine">
                  <div  class="w-20 flex items-center justify-end">
                    <button @click="viewDetail(i)" class="rounded-md px-4 py-1.5 bg-orange hover:bg-orange1 text-white">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <el-table
            v-show="list.length != 0"
            :data="list"
            :header-cell-style="{'background-color':'#ededee'}"
            style="width: 100%;margin-top: 12px;font-size: 12px;">
            <el-table-column
              v-if="statistics == 'box'"
              fixed
              label="Storage number"
              width="144">
              <template slot-scope="scope">
                <div class="flex items-center">
                  <div v-if="scope.row.inventory_time >= 30" class="mr-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>{{scope.row.storage_number}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="statistics == 'sku'"
              fixed
              label="SKU"
              width="144">
            </el-table-column>
            <el-table-column
              label="Photos"
              width="144">
              <template slot-scope="scope">
                <img v-if="scope.row.photos != ''" @click="openImg(scope.row.photos)" :src="scope.row.photos" class="w-8 h-8 rounded cursor-pointer" alt="">
              </template>
            </el-table-column>
            <el-table-column
              v-if="statistics == 'box'"
              prop="case_size"
              label="Case size(cm)"
              width="144">
            </el-table-column>
            <el-table-column
              v-if="statistics == 'box'"
              prop="carton_qty"
              label="Carton qty"
              width="144">
            </el-table-column>
            <el-table-column
              v-if="statistics == 'box'"
              prop="total_weight"
              label="Total Weight"
              width="144">
            </el-table-column>
            <el-table-column
              v-if="statistics == 'box'"
              prop="total_volume"
              label="Total Volume(CBM)"
              width="144">
            </el-table-column>
            <el-table-column
              prop="pf"
              label="PO/FBA(number)"
              width="144">
            </el-table-column>
            <el-table-column
              prop="model"
              label="Model"
              width="144">
            </el-table-column>
            <el-table-column
              prop="available_quantity"
              label="Available Quantity(ctn)"
              width="164">
            </el-table-column>
            <el-table-column
              prop="in_transit"
              label="In transit(ctn)"
              width="144">
            </el-table-column>
            <el-table-column
              prop="to_be_released"
              label="To be released(ctn)"
              width="144">
            </el-table-column>
            <el-table-column
              label="In production(ctn)"
              width="144">
              <template slot-scope="scope">
                <input type="number" min="0" class="input h-8" v-model="scope.row.in_production">
              </template>
            </el-table-column>
            <el-table-column
              prop="inventory_time"
              label="Inventory time"
              width="144">
            </el-table-column>
            <el-table-column
              prop="free"
              label="Fee($)"
              width="144">
            </el-table-column>
            <el-table-column
              prop="warehouse_address"
              label="Warehouse Address"
              width="144">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Action"
              header-align="right"
              width="80">
              <template slot-scope="scope">
                <button @click="viewDetail(scope.row)" class="rounded-md px-4 py-1.5 bg-orange hover:bg-orange1 text-white">View</button>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="list.length == 0" class="py-6 flex flex-col justify-center items-center">
            <img src="../../assets/warehouseNodata.png" class="w-52 h-52" alt="">
            <div>No data</div>
          </div>

          <page-warehouse
            ref="pageW"
            @searchW="pageSearch"
          ></page-warehouse>
        </div>

        <!-- <div>
          <table border="1" width="100%" cellspacing="0" cellpadding="0" id="tableId">
            <tbody>
              <tr>
                <td v-if="statistics == 'box'">Storage number</td>
                <td v-if="statistics == 'sku'">SKU</td>
                <td>Photos</td>
                <td>PO/FBA(number)</td>
                <td>Model</td>
                <td>Available Quantity(ctn)</td>
                <td>In transit(ctn)</td>
                <td>To be released(ctn)</td>
                <td>In production(ctn)</td>
                <td>Inventory time</td>
                <td>Fee($)</td>
                <td>Warehouse Address</td>
              </tr>
              <tr v-for="(i,n) in list" :key="n">
                <td v-if="statistics == 'box'">{{i.storage_number}}</td>
                <td v-if="statistics == 'sku'">{{i.sku}}</td>
                <td>{{i.photos}}</td>
                <td>{{i.pf}}</td>
                <td>{{i.model}}</td>
                <td>{{i.available_quantity}}</td>
                <td>{{i.in_transit}}</td>
                <td>{{i.to_be_released}}</td>
                <td>{{i.in_production}}</td>
                <td>{{i.inventory_time}}</td>
                <td>{{i.free}}</td>
                <td>{{i.warehouse_address}}</td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import PageWarehouse from '@/components/Warehouse/pageS'
  import table2excel from 'js-table2excel';
  // import htmlToExcel from '@/utils/htmlToExcel'
  // import * as XLSX2 from 'xlsx-style';
  import {
    manageList,
    skuList,
  } from '@/api/warehouse'
  export default {
    components: {
      PageWarehouse
    },
    data() {
      return {
        statistics: 'box',
        form: {
          receiving_no: '',
          storage_number: '',
          sku: '',
          inventory_num: 0,
          inventory_time: 0,
        },
        list: [],
        inum: false,
        itime: false,
        bigImg: '',
        pageTotal: 0,
        pageNum: 1,
      }
    },
    created() {
      this.$emit('menu', 'StockList')
    },
    mounted() {
      manageList().then((res)=>{
        this.list = res.data.data
        this.pageTotal = res.data.count
        this.pageC()
      })
    },
    methods:{
      pageC(){
        this.$refs.pageW.pageCou(this.pageTotal, this.pageNum)
      },
      pageSearch(num){
        if(this.statistics == 'box'){
          manageList({
            receiving_no: this.form.receiving_no,
            storage_number: this.form.storage_number,
            inventory_num: this.form.inventory_num,
            inventory_time: this.form.inventory_time,
            pageIndex: num,
          }).then((res)=>{
            this.list = res.data.data
            this.pageTotal = res.data.count
            this.pageNum = num
            this.pageC()
          })
        }else{
          skuList({
            receiving_no: this.form.receiving_no,
            storage_number: this.form.storage_number,
            sku: this.form.sku,
            inventory_num: this.form.inventory_num,
            inventory_time: this.form.inventory_time,
            pageIndex: num,
          }).then((res)=>{
            this.list = res.data.data
            this.pageTotal = res.data.count
            this.pageNum = num
            this.pageC()
          })
        }
      },
      searchReset(){
        this.form = {
          receiving_no: '',
          storage_number: '',
          sku: '',
          inventory_num: 0,
          inventory_time: 0,
        }
        this.inum = false
        this.itime = false
      },
      searchResult(){
        if(this.statistics == 'box'){
          manageList({
            receiving_no: this.form.receiving_no,
            storage_number: this.form.storage_number,
            inventory_num: this.form.inventory_num,
            inventory_time: this.form.inventory_time,
          }).then((res)=>{
            this.list = res.data.data
            this.pageTotal = res.data.count
            this.pageNum = 1
            this.pageC()
          })
        }else{
          skuList({
            receiving_no: this.form.receiving_no,
            storage_number: this.form.storage_number,
            sku: this.form.sku,
            inventory_num: this.form.inventory_num,
            inventory_time: this.form.inventory_time,
          }).then((res)=>{
            this.list = res.data.data
            this.pageTotal = res.data.count
            this.pageNum = 1
            this.pageC()
          })
        }
      },
      chooseS(name){
        this.statistics = name
        this.searchResult()
      },
      checkNum(){
        if(this.inum){
          this.form.inventory_num = 1
        }else{
          this.form.inventory_num = 0
        }
      },
      checkTime(){
        if(this.itime){
          this.form.inventory_time = 1
        }else{
          this.form.inventory_time = 0
        }
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
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.imgModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      viewDetail(item){
        // console.log(id);
        this.$router.push({
          name:'ApplySpace',
          params: {
            id: item.manage_id,
            status: 'In storage',
            statu: 2
          },
        })
      },
      // downloadExcel(){
      //   htmlToExcel.getExcel('#tableId', 'Stock_List')
      // },
      downloadExcel() {
        // console.log('导出', table2excel);
        const column = [
          {
            title: 'Storage number',
            key: 'storage_number',
            type: 'text',
          },
          {
            title: 'SKU',
            key: 'sku',
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
            title: 'Case size(cm)',
            key: 'case_size',
            type: 'text',
          },
          {
            title: 'Carton qty',
            key: 'carton_qty',
            type: 'text',
          },
          {
            title: 'Total Weight',
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
            title: 'Model',
            key: 'model',
            type: 'text',
          },
          {
            title: 'Available Quantity(ctn)',
            key: 'available_quantity',
            type: 'text',
          },
          {
            title: 'In transit(ctn)',
            key: 'in_transit',
            type: 'text',
          },
          {
            title: 'To be released(ctn)',
            key: 'to_be_released',
            type: 'text',
          },
          {
            title: 'In production(ctn)',
            key: 'in_production',
            type: 'text',
          },
          {
            title: 'Inventory time',
            key: 'inventory_time',
            type: 'text',
          },
          {
            title: 'Fee($)',
            key: 'free',
            type: 'text',
          },
          {
            title: 'Warehouse Address',
            key: 'warehouse_address',
            type: 'text',
          },
        ];
        if(this.statistics == 'box'){
          column.splice(1,1)
        }else{
          column.splice(0,1)
        }
        const tableDatas = JSON.parse(JSON.stringify(this.list));
        const datas = tableDatas;
        let excelname = 'Stock_List.xlsx'//如果不带后缀,默认是.xls文件
        table2excel(column, datas, excelname);
      }
    }
  }
</script>

<style lang="postcss" scoped>
.unitType1{
  @apply px-5 py-2.5 rounded-l-md border border-inputBorder hover:bg-gray-200;
}

.unitType2{
  @apply -ml-1px px-5 py-2.5 rounded-r-md border border-inputBorder hover:bg-gray-200;
}

.unitType{
  @apply border-orange bg-orange hover:bg-orange1 text-white z-10;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

#tableId{
  border: 1px solid #ccc;
}

#tableId td{
  border: 1px solid #ccc;
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