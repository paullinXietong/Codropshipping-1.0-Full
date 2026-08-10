<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="cancelModal" class="modal p-5 w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div>Sure you want to cancel?</div>
      <div class="mt-16 flex justify-end items-center">
        <button @click="closeModal" class="py-1.5 px-4 border-none hover:underline rounded-md">Cancel</button>
        <button @click="cancelSave" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Save</button>
      </div>
    </div>
    <div ref="imgModal" class="modal w-470 opacity-20 bg-white dark:bg-darkMenu">
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
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Outbound Number:</div>
              <input class="input h-10" type="text" v-model="form.outbound_number">
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Storage number:</div>
              <input class="input h-10" type="text" v-model="form.storge_number">
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Product SKU:</div>
              <input class="input h-10" type="text" v-model="form.product_sku">
            </div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
              <div class="flex-shrink-0 text-right pr-2" style="width: 170px;">Product Name:</div>
              <input class="input h-10" type="text" v-model="form.product_name">
            </div>
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
                <div>Awaiting discharge</div>
              </div>
              <div @click="searchStatus('2')" class="mr-2 p-2 border-b-2 cursor-pointer flex"
                :class="[istab == '2' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                <div>Out of storage</div>
              </div>
              <div @click="searchStatus('3')" class="p-2 border-b-2 cursor-pointer flex"
                :class="[istab == '3' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                <div>Cancelled</div>
              </div>
              <div @click="searchStatus('4')" class="p-2 border-b-2 cursor-pointer flex"
                :class="[istab == '4' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']">
                <div>Abandoned goods</div>
              </div>
            </div>
          </div>
          <!-- <div class="w-full overflow-x-auto listWidth">
            <div class="inline-flex mt-3 rounded-t px-4 py-3.5 bg-warehouseList dark:bg-darkLine">
              <div class="w-36 flex items-center">Outbound number</div>
              <div class="w-36 flex items-center">Cargo photos</div>
              <div class="w-36 flex items-center">Model/Cargo type</div>
              <div class="w-36 flex items-center">Total Volume</div>
              <div class="w-36 flex items-center">Carton qty</div>
              <div class="w-36 flex items-center">Fee($)</div>
              <div class="w-36 flex items-center">Total Weight</div>
              <div class="w-36 flex items-center">Unit(product)</div>
              <div class="w-36 flex items-center">Creation time</div>
              <div class="w-36 flex items-center">Cargo Status</div>
              <div class="w-36 flex items-center justify-end">Action</div>
            </div>
            <div v-show="list.length > 0">
              <div v-for="(i,n) in list" :key="n"
                class="inline-flex px-4 py-3.5 border-b dark:border-darkLine text-xs hover:bg-gray-200">
                <div class="w-36 flex items-center">{{i.outbound_number}}</div>
                <div class="w-36 flex items-center">
                  <img @click="openImg(i.cargo_photos)" v-if="i.cargo_photos != ''" :src="i.cargo_photos"
                    class="w-10 h-10 rounded cursor-pointer" alt="">
                </div>
                <div class="w-36 flex items-center">{{i.model}}{{i.cargo_type}}</div>
                <div class="w-36 flex items-center">{{i.total_volume}}</div>
                <div class="w-36 flex items-center">{{i.carton_qty}}</div>
                <div class="w-36 flex items-center">{{i.free}}</div>
                <div class="w-36 flex items-center">{{i.total_weight}}</div>
                <div class="w-36 flex items-center">{{i.unit}}</div>
                <div class="w-36 flex items-center">{{i.creation_time}}</div>
                <div class="w-36 flex items-center">{{i.cargo_status}}</div>
                <div class="w-36 flex items-center justify-end">
                  <button v-if="i.cargo_status == 'Awaiting discharge'" @click="cancelApp(i.id)" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Cancel</button>
                  <button @click="viewDetail(i)" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">View</button>
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
              fixed
              prop="outbound_number"
              label="Outbound number"
              width="144">
            </el-table-column>
            <el-table-column
              label="Cargo photos"
              width="144">
              <template slot-scope="scope">
                <img v-if="scope.row.cargo_photos != ''" @click="openImg(scope.row.cargo_photos)" :src="scope.row.cargo_photos" class="w-10 h-10 rounded cursor-pointer" alt="">
              </template>
            </el-table-column>
            <el-table-column
              label="Model/Cargo type"
              width="144">
              <template slot-scope="scope">
                <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  <span>{{scope.row.model}}</span>
                  <span>{{scope.row.cargo_type}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="total_volume"
              label="Total Volume"
              width="144">
            </el-table-column>
            <el-table-column
              prop="carton_qty"
              label="Carton qty"
              width="144">
            </el-table-column>
            <el-table-column
              prop="free"
              label="Fee($)"
              width="144">
            </el-table-column>
            <el-table-column
              prop="total_weight"
              label="Total Weight"
              width="144">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="Unit(product)"
              width="144">
            </el-table-column>
            <el-table-column
              prop="creation_time"
              label="Creation time"
              width="144">
            </el-table-column>
            <el-table-column
              prop="cargo_status"
              label="Cargo Status"
              width="144">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Action"
              header-align="right"
              width="170">
              <template slot-scope="scope">
                <div class="flex items-center justify-end">
                  <button v-if="scope.row.cargo_status == 'Awaiting discharge'" @click="cancelApp(scope.row.id)" class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Cancel</button>
                  <button @click="viewDetail(scope.row)" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">View</button>
                </div>
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
      </div>
    </div>
  </div>
</template>

<script>
  import PageWarehouse from '@/components/Warehouse/pageS'
  import {
    getOutbound,
    cancelOutbound
  } from '@/api/warehouse'
  export default {
    components: {
      PageWarehouse
    },
    data() {
      return {
        istab: '0',
        form: {
          outbound_number: '',
          storge_number: '',
          product_sku: '',
          product_name: '',
        },
        listTotal: [],
        list: [],
        cancelID: null,
        bigImg: '',
        pageTotal: 0,
        pageNum: 1,
      }
    },
    created() {
      this.$emit('menu', 'OutboundManagement')
    },
    mounted() {
      getOutbound().then((res)=>{
        this.listTotal = res.data.data
        this.list = JSON.parse(JSON.stringify(this.listTotal))
        // this.istab = '0'
        this.pageTotal = res.data.count
        this.pageC()
      })
    },
    methods:{
      pageC(){
        this.$refs.pageW.pageCou(this.pageTotal, this.pageNum)
      },
      pageSearch(num){
        getOutbound({
          outbound_number: this.form.outbound_number,
          storge_number: this.form.storge_number,
          product_sku: this.form.product_sku,
          product_name: this.form.product_name,
          cargo_status: this.istab,
          pageIndex: num,
        }).then((res)=>{
          this.listTotal = res.data.data
          this.list = JSON.parse(JSON.stringify(this.listTotal))
          // this.istab = '0'
          this.pageTotal = res.data.count
          this.pageNum = num
          this.pageC()
        })
      },
      searchReset(){
        this.form = {
          outbound_number: '',
          storge_number: '',
          product_sku: '',
          product_name: '',
        }
      },
      searchResult(){
        getOutbound({
          outbound_number: this.form.outbound_number,
          storge_number: this.form.storge_number,
          product_sku: this.form.product_sku,
          product_name: this.form.product_name,
          cargo_status: this.istab,
        }).then((res)=>{
          this.listTotal = res.data.data
          this.list = JSON.parse(JSON.stringify(this.listTotal))
          // this.istab = '0'
          this.pageTotal = res.data.count
          this.pageNum = 1
          this.pageC()
        })
      },
      searchStatus(num){
        this.istab = num
        getOutbound({
          outbound_number: this.form.outbound_number,
          storge_number: this.form.storge_number,
          product_sku: this.form.product_sku,
          product_name: this.form.product_name,
          cargo_status: num,
        }).then((res)=>{
          this.listTotal = res.data.data
          this.list = JSON.parse(JSON.stringify(this.listTotal))
          // this.istab = '0'
          this.pageTotal = res.data.count
          this.pageNum = 1
          this.pageC()
        })
        // let ls = []
        // if(num == '0'){
        //   ls = JSON.parse(JSON.stringify(this.listTotal))
        // }else if(num == '1'){
        //   for(let i=0; i<this.listTotal.length; i++){
        //     if(this.listTotal[i].cargo_status == 'Awaiting discharge'){
        //       ls.push(this.listTotal[i])
        //     }
        //   }
        // }else if(num == '2'){
        //   for(let i=0; i<this.listTotal.length; i++){
        //     if(this.listTotal[i].cargo_status == 'Out of storage'){
        //       ls.push(this.listTotal[i])
        //     }
        //   }
        // }else if(num == '3'){
        //   for(let i=0; i<this.listTotal.length; i++){
        //     if(this.listTotal[i].cargo_status == 'Cancelled'){
        //       ls.push(this.listTotal[i])
        //     }
        //   }
        // }else{
        //   for(let i=0; i<this.listTotal.length; i++){
        //     if(this.listTotal[i].cargo_status == 'Abandoned goods'){
        //       ls.push(this.listTotal[i])
        //     }
        //   }
        // }
        // this.list = ls
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
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.cancelModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.imgModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      cancelSave(){
        cancelOutbound({id:this.cancelID}).then((res)=>{
          this.closeModal()
          getOutbound().then((reh)=>{
            this.listTotal = reh.data.data
            this.list = JSON.parse(JSON.stringify(this.listTotal))
            // this.istab = '0'
            this.pageTotal = reh.data.count
            this.pageNum = 1
            this.pageC()
          })
        })
      },
      viewDetail(item){
        this.$router.push({
          name:'OutboundDetail',
          params: {
            id: item.id,
            type: item.type,
            status: item.cargo_status
          },
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