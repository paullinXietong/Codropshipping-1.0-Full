<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
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

    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm mb-32">
        <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div class="grid grid-cols-6 gap-5">
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Storage Number:</div>
              <input class="input h-10" type="text" v-model="form.sname">
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Model/Cargo Type:</div>
              <input class="input h-10" type="text" v-model="form.model">
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Product SKU:</div>
              <input class="input h-10" type="text" v-model="form.sku">
            </div>
            <!-- <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Cargo Type:</div>
              <input class="input h-10" type="text" v-model="form.pname">
            </div> -->
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="searchReset" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Reset</button>
            <button @click="searchResult" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Search</button>
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
              <div @click="searchStatus('3')" class="p-2 border-b-2 cursor-pointer flex"
                :class="[istab == '3' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                <div>Cancelled</div>
              </div>
            </div>
            <div>
              <router-link :to="{ name: 'ApplySpaces' }">
                <button class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Apply for storage space</button>
              </router-link>
            </div>
          </div>
          <!-- <div class="flex">
            <div class="w-full overflow-x-auto">
              <div class="inline-flex mt-3 rounded-tl px-4 py-3.5 bg-warehouseList dark:bg-darkLine">
                <div class="w-40 flex items-center">Storage number</div>
                <div class="w-24 flex items-center">Photos</div>
                <div class="w-56 flex items-center">Cargo type</div>
                <div class="w-56 flex items-center">Supplier</div>
                <div class="w-40 flex items-center">Inventory time</div>
                <div class="w-40 flex items-center">PO/FBA(number)</div>
                <div class="w-40 flex items-center">Of boxes</div>
                <div class="w-40 flex items-center">Warehouse address</div>
                <div class="w-40 flex items-center">Cargo status</div>
                <div class="w-56 flex items-center">Arrival list number</div>
                <div class="w-40 flex items-center">Fee(USD)</div>
                <div class="w-40 flex items-center">Value(of goods)</div>
                <div v-show="istab == '1'" class="w-40 flex items-center">Total Weight(kg)</div>
                <div v-show="istab == '1'" class="w-40 flex items-center">Total Volume(CBM)</div>
                <div class="w-40 flex items-center">Creation time</div>
                <div class="w-40 flex items-center">Model</div>
                <div class="w-40 flex items-center">Remark</div>
              </div>
              <div v-show="list.length > 0">
                <div v-for="(i,n) in list" :key="n" class="inline-flex px-4 py-3.5 border-b dark:border-darkLine hover:bg-gray-200">
                  <div class="w-40 flex items-center" style="height: 34px;">{{i.storage_number}}</div>
                  <div class="w-24 flex items-center">
                    <img v-if="i.photos != ''" @click="openImg(i.photos)" :src="i.photos" class="w-8 h-8 rounded cursor-pointer" alt="">
                  </div>
                  <div class="pr-2 w-56 flex items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
                    <div v-for="(z,x) in i.cargo_type" :key="x" class="flex-shrink-0">
                      <span v-show="x>0">, </span>
                      {{z}}
                    </div>
                  </div>
                  <div class="pr-2 w-56 flex items-center overflow-hidden overflow-ellipsis whitespace-nowrap">{{i.supplier}}</div>
                  <div class="w-40 flex items-center">{{i.inventory_time}}</div>
                  <div class="w-40 flex items-center">{{i.pf}}</div>
                  <div class="w-40 flex items-center">{{i.of_boxes}}</div>
                  <div class="w-40 flex items-center">{{i.warehouse_address}}</div>
                  <div class="w-40 flex items-center">{{i.cargo_status}}</div>
                  <div class="pr-2 w-56 flex items-center">
                    <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <span v-for="(z,x) in i.arrival_list_number" :key="'x'+x" class="flex-shrink-0">
                        <span v-show="x>0">, </span>
                        {{z}}
                      </span>
                    </div>
                  </div>
                  <div class="w-40 flex items-center">{{i.free}}</div>
                  <div class="w-40 flex items-center">{{i.value}}</div>
                  <div v-show="istab == '1'" class="w-40 flex items-center">{{i.total_weight}}</div>
                  <div v-show="istab == '1'" class="w-40 flex items-center">{{i.total_volume}}</div>
                  <div class="w-40 flex items-center">{{i.creation_time}}</div>
                  <div class="w-40 flex items-center">{{i.model}}</div>
                  <div class="w-40 flex items-center">{{i.remark}}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-shrink-0">
              <div class="inline-flex mt-3 rounded-tr px-4 py-3.5 bg-warehouseList dark:bg-darkLine">
                <div class="w-40 flex items-center justify-end">Action</div>
              </div>
              <div v-show="list.length > 0">
                <div v-for="(i,n) in list" :key="'n'+n" class="px-4 py-3.5 border-b dark:border-darkLine">
                  <div class="w-40 flex items-center justify-end">
                    <button v-if="i.cargo_status == 'Awaiting storage'" @click="cancelApp(i.id)" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Cancel</button>
                    <button @click="viewDetail(i)" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md border border-transparent">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
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
              label="Photos"
              width="96">
              <template slot-scope="scope">
                <img v-if="scope.row.photos != ''" @click="openImg(scope.row.photos)" :src="scope.row.photos" class="w-8 h-8 rounded cursor-pointer" alt="">
              </template>
            </el-table-column>
            <el-table-column
              label="Cargo type"
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
              prop="supplier"
              label="Supplier"
              width="224">
              <template slot-scope="scope">
                <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">{{scope.row.supplier}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="inventory_time"
              label="Inventory time"
              width="160">
            </el-table-column>
            <el-table-column
              prop="pf"
              label="PO/FBA(number)"
              width="160">
            </el-table-column>
            <el-table-column
              prop="of_boxes"
              label="Of boxes"
              width="160">
            </el-table-column>
            <el-table-column
              prop="warehouse_address"
              label="Warehouse address"
              width="160">
            </el-table-column>
            <el-table-column
              prop="cargo_status"
              label="Cargo status"
              width="160">
            </el-table-column>
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
            <el-table-column
              prop="free"
              label="Fee(USD)"
              width="160">
            </el-table-column>
            <el-table-column
              prop="value"
              label="Value(of goods)"
              width="160">
            </el-table-column>
            <el-table-column
              v-if="istab == '1'"
              prop="total_weight"
              label="Total Weight(kg)"
              width="160">
            </el-table-column>
            <el-table-column
              v-if="istab == '1'"
              prop="total_volume"
              label="Total Volume(CBM)"
              width="160">
            </el-table-column>
            <el-table-column
              prop="creation_time"
              label="Creation time"
              width="160">
            </el-table-column>
            <el-table-column
              prop="model"
              label="Model"
              width="160">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="Remark"
              width="160">
            </el-table-column>

            <el-table-column
              fixed="right"
              label="Action"
              header-align="right"
              width="192">
              <template slot-scope="scope">
                <div class="flex items-center justify-end">
                  <button v-if="scope.row.cargo_status == 'Awaiting storage'" @click="cancelApp(scope.row.id)" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Cancel</button>
                  <button @click="viewDetail(scope.row)" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md border border-transparent">View</button>
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
  </div>
</template>

<script>
  import PageWarehouse from '@/components/Warehouse/pageS'
  import {
    getList,
    cancelApply
  } from '@/api/warehouse'
  export default {
    components: {
      PageWarehouse
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
          sku: '',
          pname: '',
        },
        cancelID: null,
        bigImg: '',
        pageTotal: 0,
        pageNum: 1,
      }
    },
    created() {
      this.$emit('menu', 'InboundManagement')
    },
    mounted() {
      getList().then((res)=>{
        this.listTotal = res.data.data
        this.list = JSON.parse(JSON.stringify(this.listTotal))
        this.pageTotal = res.data.count
        this.pageC()
        // this.searchStatus('1')
      })
    },
    methods:{
      pageC(){
        this.$refs.pageW.pageCou(this.pageTotal, this.pageNum)
      },
      pageSearch(num){
        let form = this.form
        getList({
          cargo_status: this.istab,
          storge_number: form.sname,
          cargo_type: form.model,
          product_sku: form.sku,
          pageIndex: num,
        }).then((res)=>{
          this.listTotal = res.data.data
          this.list = JSON.parse(JSON.stringify(this.listTotal))
          this.pageTotal = res.data.count
          this.pageNum = num
          this.pageC()
        })
      },
      searchReset(){
        this.form = {
          sname: '',
          model: '',
          sku: '',
          pname: '',
        }
      },
      searchResult(){
        let form = this.form
        getList({
          cargo_status: this.istab,
          storge_number: form.sname,
          cargo_type: form.model,
          product_sku: form.sku,
          // product_name: form.pname,
        }).then((res)=>{
          this.listTotal = res.data.data
          this.list = JSON.parse(JSON.stringify(this.listTotal))
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
        this.$router.push({
          name:'ApplySpace',
          params: {
            id: item.id,
            status: item.cargo_status,
            statu: item.status
          },
        })
      },
      searchStatus(num){
        let form = this.form
        this.istab = num
        getList({
          cargo_status: num,
          storge_number: form.sname,
          cargo_type: form.model,
          product_sku: form.sku,
          // product_name: form.pname,
        }).then((reh)=>{
          this.listTotal = reh.data.data
          this.list = JSON.parse(JSON.stringify(this.listTotal))
          this.pageTotal = reh.data.count
          this.pageNum = 1
          this.pageC()
        })
        // let ls = []
        // if(num == '0'){
        //   ls = JSON.parse(JSON.stringify(this.listTotal))
        // }else if(num == '1'){
        //   for(let i=0; i<this.listTotal.length; i++){
        //     if(this.listTotal[i].cargo_status == 'Awaiting storage'){
        //       ls.push(this.listTotal[i])
        //     }
        //   }
        // }else if(num == '2'){
        //   for(let i=0; i<this.listTotal.length; i++){
        //     if(this.listTotal[i].cargo_status == 'In storage'){
        //       ls.push(this.listTotal[i])
        //     }
        //   }
        // }else{
        //   for(let i=0; i<this.listTotal.length; i++){
        //     if(this.listTotal[i].cargo_status == 'Cancelled'){
        //       ls.push(this.listTotal[i])
        //     }
        //   }
        // }
        // this.list = ls
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.cancelModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.imgModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      cancelSave(){
        cancelApply({id:this.cancelID}).then((res)=>{
          this.closeModal()
          getList({
            cargo_status: '3',
          }).then((reh)=>{
            this.listTotal = reh.data.data
            this.list = JSON.parse(JSON.stringify(this.listTotal))
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