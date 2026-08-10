<template>
  <div>
    <div class="bg-white p-3 grid grid-cols-4 gap-4">
      <div class="col-span-1">
        <div>Product Name</div>
        <div class="mt-1">
          <input v-model="searchArr.subject" type="text" class="input h-9 py-1 px-2" placeholder="">
        </div>
      </div>
      <div class="col-span-1">
        <div>Source</div>
        <div class="mt-1">
          <select v-model="searchArr.source" class="select h-9 p-1">
            <option class="hidden" value="null">All</option>
            <option value="1">1688</option>
          </select>
        </div>
      </div>
      <div class="col-span-1">
        <div>Pushable Status</div>
        <div class="mt-1">
          <select v-model="searchArr.push_status" class="select h-9 p-1">
            <option class="hidden" value="null">All</option>
            <option value="1">Pushed</option>
            <option value="2">Not pushed</option>
            <option value="3">Pushing</option>
          </select>
        </div>
      </div>
      <div class="col-span-1">
        <div>Inventory Add Status</div>
        <div class="mt-1">
          <select v-model="searchArr.inventory_addition_status" class="select h-9 p-1">
            <option class="hidden" value="null">All</option>
            <option value="1">Added</option>
            <option value="2">Unadded</option>
          </select>
        </div>
      </div>
      <div class="col-span-4 flex select-none">
        <button @click="search(1)" class="w-24 py-1.5 text-white bg-blue-400 hover:bg-blue-500">Search</button>
        <button @click="reset" class="ml-4 w-24 py-1.5 border border-gray-300 hover:bg-gray-200">Reset</button>
      </div>
    </div>

    <div class="mt-3 p-3 bg-white">
      <div class="flex">
        <div class="flex border rounded select-none">
          <div class="py-1.5 px-3 flex bg-gray-200">
            <div class="w-5 text-center text-red-500">{{ selectList.length }}</div>
            <div class="text-gray-500">items</div>
          </div>
          <div @click="pushtoShop" class="py-1.5 px-3 border-l hover:bg-gray-200 cursor-pointer">Push to my shop</div>
          <div @click="getNew" class="py-1.5 px-3 border-l hover:bg-gray-200 cursor-pointer">Get the latest product</div>
          <div @click="delItems" class="py-1.5 px-3 border-l hover:bg-gray-200 cursor-pointer">Delete</div>
        </div>
      </div>
      <div class="my-3 text-oranges text-xs">tips: Only items in the same category can be processed in bulk.</div>
      <div>
        <el-table
          v-show="list.length != 0"
          :data="list"
          :header-cell-style="{'background-color':'#ededee'}"
          style="width: 100%;">
          <!-- @selection-change="handleSelectionChange"> -->
          <!-- <el-table-column
            type="selection"
            width="35">
          </el-table-column> -->
          <el-table-column
            fixed
            label="Product name"
            width="400">
            <template slot-scope="scope">
              <div class="flex items-center">
                <input type="checkbox" v-model="selectList" :value="scope.row" @change="handleSelectionChange">
                <img class="flex-shrink-0 w-20 h-20 mr-3 ml-1" :src="scope.row.image" alt="">
                <a :href="'/productDetail?id='+scope.row.goods_id+'&source='+scope.row.source"
                  target="_blank" class="hover:underline">
                  <div style="word-break: break-word;">{{ scope.row.subject }}</div>
                </a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Cost price"
            width="160">
            <template slot-scope="scope">
              <span>US ${{scope.row.min_usd}}</span>
              <span v-show="scope.row.max_price != scope.row.min_price"
                > ~ {{scope.row.max_usd}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Source"
            width="140">
            <template slot-scope="scope">
              <div v-if="scope.row.source == 1" class="flex items-center">
                <svg t="1719541337962" class="icon mr-1.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5195" width="24" height="24"><path d="M680.448 376.32c3.584 7.68 4.608 15.872 3.584 24.576 1.024-9.728 0-17.92-3.584-24.576z" fill="#FC6020" p-id="5196"></path><path d="M514.048 7.168c-279.552 0-505.856 226.304-505.856 505.856 0 279.552 226.304 505.856 505.856 505.856 279.552 0 505.856-226.304 505.856-505.856 0-279.552-226.304-505.856-505.856-505.856z m-11.776 666.112c0.512-15.36 7.168-32.256 19.968-50.688 11.264-17.92 27.648-35.84 44.032-55.296 25.088-29.184 88.064-97.28 109.056-139.776 4.096-8.192 6.656-15.36 7.68-22.016 2.56-37.888-45.568-52.736-117.248-72.704l-13.824 8.192 26.624 22.016c-120.832 21.504-193.024 43.52-281.088 74.24l12.288 31.232-44.032 43.008c7.68 1.536 84.48 27.136 163.84-28.16l0.512-0.512 1.024-1.024c-2.56-4.096-7.68-8.192-14.336-13.824 24.064 1.536 38.4 22.528 35.84 43.52h-10.24c0.512-7.68-1.536-14.336-3.584-19.968-61.44 45.568-133.632 51.712-194.56 30.208v53.76c-30.208 10.24-81.92 43.008-81.92 74.24 2.048 15.36 9.216 20.992 16.896 24.576 67.584 38.4 250.368-13.824 249.856-13.824-65.536 35.84-130.56 62.464-227.328 66.56-127.488-2.56-145.92-87.552-87.04-175.616 57.344-89.6 146.944-168.96 290.304-219.648 41.472-14.848 102.912-31.232 161.792-32.768 84.992 0 167.424 25.088 161.792 107.008-4.096 62.976-92.16 149.504-140.288 212.992-20.992 27.136-24.576 46.08 10.752 43.52 124.416-8.192 239.104-51.2 345.088-96.256-71.168 48.64-439.296 231.936-441.856 107.008z" fill="#FC6020" p-id="5197"></path></svg>
                <div>1688</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Pushable platform"
            width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.store_list.length != 0">{{scope.row.store_list[0].store_name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="Pushable status"
            width="180">
            <template slot-scope="scope">
              <div>{{p_status[scope.row.push_status]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="Inventory add status"
            width="180">
            <template slot-scope="scope">
              <div>{{i_status[scope.row.inventory_addition_status]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="updated_date"
            label="Update date(UTC+8)"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Action"
            width="160">
            <template slot-scope="scope">
              <div @click="delItem(scope.row.id)" class="text-blue-500 hover:underline cursor-pointer">Delete</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="list.length > 0" class="mt-3 flex justify-center">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="searchArr.pageIndex"
          :page-size="50"
          :total="total"
          @current-change="setPages">
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      :show-close='false'
      :modal-append-to-body='false'
      class="cancel-model"
    >
      <p>You haven't linked your store yet.</p>
      <span slot="footer" class="dialog-footer">
        <button class="mr-5 hover:underline" @click="dialogVisible = false">Not for now</button>
        <button class="py-1 px-3 text-white bg-blue-400 hover:bg-blue-500 rounded" @click="toLink">Link store</button>
      </span>
    </el-dialog>

    <el-dialog
      title="Product Publish"
      :visible.sync="batchModal"
      width="800px"
      :modal-append-to-body='false'
      :close-on-click-modal="false"
    >
      <div>
        <div class="mb-3">
          <div class="pb-1 text-base text-black">
            <span class="text-red-500 text-sm">*</span>
            Order Sources</div>
          <el-select class="w-full" v-model="form.store_id" placeholder="Please Select">
            <el-option v-for="(i,n) in linkList"
              :label="i.store_name"
              :value="i.id"
              :key="i.id"
              :disabled="i.is_authorize=='2'">
            </el-option>
          </el-select>
        </div>
        <div class="mb-3">
          <div class="pb-1 text-base text-black">
            <span class="text-red-500 text-sm">*</span>
            Price Settings</div>
          <div>
            <div class="flex justify-between items-center">
              <div class="">Your Price($)</div>
              <svg t="1774497839984" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5623" width="26" height="26"><path d="M67.148 247.29h892.323v178.485H67.148V247.29z m0 342.392h892.323v178.486H67.148V589.682z" fill="#2C2C2C" p-id="5624"></path></svg>
              <div class="">Product Price</div>
              <el-select class="w-36" v-model="form.markup_type">
                <el-option label="addition" value="1"></el-option>
                <el-option label="multiplication" value="2"></el-option>
              </el-select>
              <el-input type="number" v-model="form.markup_value" class="w-40" min="0" placeholder="X"></el-input>
              <svg t="1774498284085" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7585" width="26" height="26"><path d="M580.722174 437.990403 580.722174 78.171384 436.794158 78.171384 436.794158 437.990403 76.975139 437.990403 76.975139 581.918419 436.794158 581.918419 436.794158 941.737438 580.722174 941.737438 580.722174 581.918419 940.542216 581.918419 940.542216 437.990403Z" fill="#272636" p-id="7586"></path></svg>
              <div class="">Shipping Cost</div>
            </div>
            <div class="mt-3 text-13 text-gray-400 leading-4">If you choose multiplication, your price will be X times the product price. If you choose addition, your price will be the product price plus X. (X refers to the number you enter.)</div>
          </div>
        </div>
        <div class="mb-3 flex items-center">
          <div class="pb-1 flex-shrink-0 w-28">Origin</div>
          <el-select v-model="storehouse" disabled="" style="width: 100%;">
            <el-option
              label="China"
              value="China">
            </el-option>
          </el-select>
        </div>
        <div class="mb-3 flex items-center">
          <div class="pb-1 flex-shrink-0 w-28">Selling Area</div>
          <el-select v-model="form.country" filterable placeholder="" style="width: 100%;">
            <el-option
              v-for="(item,n) in destinationList"
              :key="n"
              :label="item.en_nickname"
              :value="item.code_two">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="mr-5 hover:underline" @click="batchModal = false">Cancel</button>
        <button @click="batchPublish"
          class="py-1.5 px-4 text-white bg-oranges hover:bg-orange rounded">Confirm</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getGoods,
    getNewGoods,
    deleteGoods,
    getRate,
    batchPushToShop,
  } from '@/api/dropshipping'
  import {
    storeList,
  } from '@/api/user'
  import {
    shipFromTo,
  } from '@/api/shippingCost'
  export default {
    data() {
      return {
        searchArr:{
          subject: '',
          source: null,
          push_status: null,
          inventory_addition_status: null,
          pageIndex: 1,
        },
        list: [],
        selectList: [],
        p_status: ['','Pushed','Not pushed','Pushing'],
        i_status: ['','Added','Unadded'],
        linkList: [],
        dialogVisible: false,
        batchModal: false,
        form:{
          store_id: '',
          markup_type: '1',
          markup_value: '',
          country: 'US',
          source: 1,
          goods_info_id: [],
        },
        storehouse: 'China',
        destinationList: [],
        total: 0,
      }
    },
    mounted() {
      getRate().then((req)=>{
        this.rate = req.data.exchange_rate
        this.search(1)
      })
      storeList().then((res)=>{
        this.linkList = res.data.list
      })
      shipFromTo().then((res)=>{
        this.destinationList = res.data.endCountry
      })
    },
    methods: {
      // getData() {
      //   getGoods().then((res)=>{

      //     this.total = Number(res.data.total)
      //     this.list = res.data.list
      //     this.list.forEach((items)=>{
      //       if(items.currency == '1'){
      //         items.min_usd = this.divide(items.min_price, this.rate)
      //         items.max_usd = this.divide(items.max_price, this.rate)
      //       }else{
      //         items.min_usd = items.min_price
      //         items.max_usd = items.max_price
      //       }
      //     })
      //     this.selectList = []
      //   })
      // },
      setPages(val){
        this.search(val)
      },
      search(page) {
        this.searchArr.pageIndex = page
        this.list = []
        getGoods(JSON.stringify(this.searchArr)).then((res)=>{
          this.total = Number(res.data.total)
          this.list = res.data.list
          this.list.forEach((items)=>{
            if(items.currency == '1'){
              items.min_usd = this.divide(items.min_price, this.rate)
              items.max_usd = this.divide(items.max_price, this.rate)
            }else{
              items.min_usd = items.min_price
              items.max_usd = items.max_price
            }
          })
          this.selectList = []
        })
      },
      reset() {
        this.searchArr = {
          subject: '',
          source: null,
          push_status: null,
          inventory_addition_status: null,
          pageIndex: 1,
        }
      },
      pushtoShop() {
        if(this.selectList.length>0){
          if(this.linkList.length==0){
            this.dialogVisible = true
          }else if(this.selectList.length == 1){
            this.$router.push({
              path: '/account/Publish?id=' + this.selectList[0].id + '&type=1&source=' + this.selectList[0].source
            })
          }else{
            let idArr = []
            this.selectList.forEach((item)=>{
              idArr.push(item.id)
            })
            this.form.goods_info_id = idArr
            this.batchModal = true
          }
        }else{
          this.$message({
            message: 'Please select at least one product.',
            offset: 70
          });
        }
      },
      getNew() {
        if(this.selectList.length>0){
          let idArr = []
          this.selectList.forEach((item)=>{
            idArr.push(item.id)
          })
          // let ids = {
          //   ids: idArr.join(",")
          // }
          getNewGoods({
            ids: idArr
          }).then((res)=>{
            this.search(1)
          })
        }else{
          this.tipMessage()
        }
      },
      delItems() {
        if(this.selectList.length>0){
          let idArr = []
          this.selectList.forEach((item)=>{
            idArr.push(item.id)
          })
          // let ids = {
          //   ids: idArr.join(",")
          // }
          deleteGoods({
            ids: idArr
          }).then((res)=>{
            this.search(1)
          })
        }else{
          this.tipMessage()
        }
      },
      tipMessage() {
        this.$message({
          message: 'Please check at least one item',
          offset: 70
        });
      },
      delItem(id) {
        let ids = {
          ids: id
        }
        deleteGoods(JSON.stringify(ids)).then((res)=>{
          this.search(1)
        })
      },
      handleSelectionChange() {
        // console.log(this.selectList);
        
        // this.selectList = []
        // val.forEach((item)=>{
        //   this.selectList.push(item.id)
        // })
      },
      divide(num1, num2) {
        const result = (num1 * 100) / (num2 * 100);
        if(Math.round(result * 100) / 100>0){
          return Math.round(result * 100) / 100;
        }
        return 0.01;
      },
      toLink(){
        this.$router.push({
          path: '/account/Shopify'
        })
      },
      batchPublish(){
        batchPushToShop(this.form).then((res)=>{
          this.$message({
            message: `success: ${res.data.success} item, fail: ${res.data.fail} item`,
            offset: 70
          });
          this.batchModal = false
          this.search(1)
        })
      },
    }
  }
</script>