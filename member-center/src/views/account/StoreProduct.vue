<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask" @click="closeModal"></div>
    <div ref="storeModal" class="modal p-5 w-600 opacity-20 bg-white dark:bg-darkMenu">
      <div class="py-4">Please select store</div>
      <select class="select" v-model="store_id">
        <option v-for="(i,n) in storeList" :key="n" :value="i.id" :disabled="i.is_authorize=='2'">{{i.store_name}}</option>
      </select>
      <div class="mt-7 flex justify-center">
        <button class="cancelbtn" @click="closeModal">Cancel</button>
        <button class="btn" @click="confirmSync">Comfirm</button>
      </div>
    </div>

    <el-dialog
      title="Products Connection"
      :visible.sync="dialogVisible"
      width="1180px"
      append-to-body
      border
    >
      <div class="grid grid-cols-2 gap-4 p-2 border-t border-b" style="max-height: 520px;">
        <div class="overflow-y-auto proPanel px-1" style="max-height: 500px;">
          <div>Store Product</div>
          <div
            v-for="(i, n) in productSku"
            :key="n"
            class="flex my-2.5 py-3 px-4 border shadow-sm rounded relative"
            :class="[i.isCheck?'proSelected':'border-gray-100', !proLeft?'hover:border-oranges cursor-pointer':'bg-gray-100']"
            @click="setProLeft(i,n)"
          >
            <div class="absolute px-1.5 py-0.5 -left-1 -top-1 bg-red-500 text-white rounded-full text-13"
              style="line-height: 17px;"
              v-if="i.isCheck">{{i.connectNo}}</div>
            <img
              :src="i.image?i.image.url:proImg"
              class="w-12 h-12 flex-shrink-0 mr-2"
              alt=""
            >
            <div class="w-full">
              <div class="title-over">{{ i.title }}</div>
              <div class="flex justify-between">
                <div class="title-over text-gray-400"> SKU:{{i.id}}</div>
                <div class="title-over font-semibold">${{i.price}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-y-auto proPanel px-1" style="max-height: 500px;">
          <div>CoDropshipping Product</div>
          <div
            v-for="(i, n) in productSkus"
            :key="n"
            class="flex my-2.5 py-3 px-4 border shadow-sm rounded relative"
            :class="[i.isCheck?'proSelected':'border-gray-100', !proRight?'hover:border-oranges cursor-pointer':'bg-gray-100']"
            @click="setProRight(i,n)">
            <div class="absolute px-1.5 py-0.5 -left-1 -top-1 bg-red-500 text-white rounded-full text-13"
              style="line-height: 17px;"
              v-if="i.isCheck">{{i.connectNo}}</div>
            <img
              :src="i.img?i.img:imgUrl"
              class="w-12 h-12 flex-shrink-0 mr-2"
              alt=""
            >
            <div class="w-full">
              <div class="title-over">
                <div class="inline" v-for="(ic, nc) in i.skuAttributes">
                  <span v-show="nc>0">, </span>
                  {{ ic.valueTrans }}
                </div>
              </div>
              <div class="flex justify-between">
                <div class="title-over text-gray-400"> SKU:{{i.skuId}}</div>
                <div class="title-over font-semibold">${{i.usd}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-3 grid grid-cols-3 gap-6">
        <div class="flex items-center">
          <div class="mr-2 flex-shrink-0">Shipping From:</div>
          <!-- <select
            class="select h-42px"
          >
            <option>China Warehouse</option>
          </select> -->
          <el-select v-model="shippingFrom" placeholder="Please Select">
            <el-option
              key="1"
              label="China Warehouse"
              value="1">
            </el-option>
          </el-select>
        </div>
        <div class="flex items-center">
          <div class="mr-2 flex-shrink-0">
            <span class="text-red-500">*</span>
            Shipping To:</div>
          <!-- <select
            class="select h-42px"
            v-model="codeTwo"
            @change="getMethods"
          >
            <option
              v-for="(i,n) in countryList"
              :key="n"
              :value="i.en_nickname"
            >{{i.en_nickname}}</option>
          </select> -->
          <el-select
            v-model="codeTwo"
            filterable
            @change="getMethods"
            placeholder="Please Select"
          >
            <el-option
              v-for="item in countryList"
              :key="item.en_nickname"
              :label="item.en_nickname"
              :value="item.en_nickname">
            </el-option>
          </el-select>
        </div>
        <div class="flex items-center">
          <div class="mr-2 flex-shrink-0">
            <span class="text-red-500">*</span>
            Shipping Method:</div>
          <!-- <select
            class="select h-42px"
            v-model="methodId"
          >
            <option
              v-for="(i,n) in methodList"
              :key="n"
              :value="i.id"
            >{{i.shipping_method}}</option>
          </select> -->
          <el-select v-model="methodId" placeholder="Please Select">
            <el-option
              v-for="item in methodList"
              :key="item.id"
              :label="item.shipping_method"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitConnect" :loading="loading">Confirm</el-button>
      </span>
    </el-dialog>

    <div class="h-full overflow-auto pb-64">
      <div class="py-5 px-6 font-semibold text-2xl bg-white">Store Products</div>

      <div class="flex mt-3 bg-white p-3">
        <div class="cursor-pointer hover:text-oranges mr-8"
          :class="connectType==1 ? 'text-oranges font-semibold' : ''"
          @click="productType(1)">Connected</div>
        <div class="cursor-pointer hover:text-oranges"
          :class="connectType==2 ? 'text-oranges font-semibold' : ''"
          @click="productType(2)">Unconnected</div>
      </div>

      <div v-if="connectType == 1">
        <div class="mt-5 p-4 flex items-end bg-white">
          <div class="w-64 mr-5">
            <div class="mb-2">Stores</div>
            <select
              class="select h-42px"
              v-model="store_id"
            >
              <option
                v-for="(i,n) in storeList"
                :key="n"
                :value="i.id"
                :disabled="i.is_authorize=='2'"
              >{{i.store_name}}</option>
            </select>
          </div>
          <div class="w-96 mr-5">
            <div class="mb-2">Product</div>
            <input
              class="input"
              v-model="title"
              type="text"
            >
          </div>
          <div class="flex">
            <button
              class="py-2 px-6 rounded mr-3 bg-store hover:bg-storeHover text-white"
              @click='search'
            >Search</button>
            <button
              class="py-2 px-6 rounded border dark:border-darkLine hover:bg-gray-300"
              @click='reset'
            >Reset</button>
          </div>
        </div>

        <div class="mt-4">
          <button @click="getProduct" 
            class="py-2 px-4 rounded bg-store hover:bg-storeHover text-white">Sync Store Product</button>
        </div>
        <div class="mt-5 ">
          <div class="overflow-x-auto">
            <div class="flex table-header">
              <div class="p-4 flex-1">Store Name</div>
              <div class="p-4 flex-2 ">Store Product</div>
              <div class="p-4 flex-2 ">CO Product</div>
              <div class="p-4 flex-1">Shipping Method</div>
              <div class="p-4 flex-1">Shipping Cost</div>
              <div class="p-4 flex-1">Amount</div>
            </div>
            <div v-show="showLoading" class="my-10 flex justify-center">
              <img src="@/assets/loading.svg" class="w-24 h-24 animate-spin" alt="">
            </div>
            <div
              v-for="(i, n) in ProductList"
              :key="n"
            >
              <ProductItemVue
                :row="i"
                :shiping_type="shiping_type"
                :rate="exchange"
                @getList="productType(1)"
              ></ProductItemVue>
            </div>
            <div class="text-center my-5">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size='10'
                :current-page.sync="beginPage"
                @current-change="setPages"
                :total="total"
              >
              </el-pagination>
            </div>

            <div
              class="text-center text-20"
              v-show="ProductList.length==0 && !showLoading"
            >
              no data
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white">
        <div class="mt-3 grid grid-cols-2 gap-6 p-3 rounded">
          <div>
            <div class="mb-5">Products from Authorized Stores</div>
            <div class="w-510 mb-3 flex items-center">
              <div class="mr-2">Stores</div>
              <select
                class="select h-42px"
                v-model="store_id"
              >
                <option
                  v-for="(i,n) in storeList"
                  :key="n"
                  :value="i.id"
                  :disabled="i.is_authorize=='2'"
                >{{i.store_name}}</option>
              </select>
              <button @click="getProduct" 
                class="flex-shrink-0 ml-5 py-2 px-4 h-42px rounded bg-store hover:bg-storeHover text-white">Sync Store Product</button>
            </div>
            <div class="w-576 flex items-center">
              <div class="mr-2">Product</div>
              <input
                class="input"
                v-model="title"
                type="text"
              >
              <div class="ml-5 flex h-42px">
                <button
                  class="py-2 px-6 rounded mr-3 bg-store hover:bg-storeHover text-white"
                  @click='search'
                >Search</button>
                <button
                  class="py-2 px-6 rounded border dark:border-darkLine hover:bg-gray-300"
                  @click='reset'
                >Reset</button>
              </div>
            </div>
          </div>

          <div>
            <div class="mb-5">Products from Automatic Matching</div>
            <div class="w-576 flex items-center">
              <input
                class="input"
                v-model="keywords"
                type="text"
                placeholder="Enter the product keywords/link"
              >
              <button
                class="py-2 px-6 rounded ml-3 bg-store hover:bg-storeHover text-white"
                @click='searchProduct'
              >Search</button>
            </div>
          </div>
        </div>

        <div class="mt-3 p-3 rounded text-sm">
          <div>You may want the associated item</div>
          <div class="mt-3 grid grid-cols-2 gap-6">
            <div class="">
              <div
                v-for="(i, n) in ProductList"
                :key="n"
                class="border border-gray-100 hover:border-oranges rounded my-2 shadow-sm h-24"
                :class="n==storePro?'border-oranges':''"
                style="height: 82px;"
              >
                <div class="flex m-1.5">
                  <div class="relative"
                    @mouseenter="imgPanel(i)"
                    @mouseleave="imgPanels(i)">
                    <img
                      :src="i.origin_data.images.length>0?i.origin_data.images[0].url:bgImage"
                      class="w-16 h-16"
                      alt=""
                    >
                    <div v-show="i.showPanel" class="absolute top-0 left-16 pl-2">
                      <div class="rounded-md shadow-md bg-white p-3" style="width: 344px;height: 344px;">
                        <img :src="i.origin_data.images.length>0?i.origin_data.images[0].url:bgImage"
                          class="w-80 h-80" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 ml-2">
                    <div class="title-over mb-1">{{ i.title }}</div>
                    <!-- <div class="title-over text-gray-400"> Weight:{{i.min_weight}}{{i.max_weight==0?"":"-"+i.max_weight}}g</div> -->
                    <div class="title-over font-semibold">${{getPrice(i.origin_data.variants)}}</div>
                  </div>
                  <div class="flex flex-col">
                    <button class="mb-2 px-4 py-1 border border-oranges hover:bg-gray-200 text-oranges rounded"
                      @click="searchPro(i,n)">Pin</button>
                    <button class="px-4 py-1 border border-oranges hover:bg-gray-200 text-oranges rounded"
                      @click="matchPro(i,n)">Match</button>
                  </div>
                </div>
              </div>
              <div class="text-center my-5">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size='10'
                  :current-page.sync="beginPage"
                  @current-change="setPages"
                  :total="total"
                >
                </el-pagination>
              </div>
            </div>

            <div class="">
              <div
                v-for="(i, n) in ProductLists"
                :key="n"
                class="border border-gray-100 hover:border-oranges rounded my-2 shadow-sm"
                style="height: 82px;"
              >
                <div class="flex m-1.5">
                  <div class="relative"
                    @mouseenter="imgPanel(i)"
                    @mouseleave="imgPanels(i)">
                    <img 
                      :src="i.imageUrl"
                      class="w-16 h-16"
                      alt=""
                    >
                    <div v-show="i.showPanel" class="absolute top-0 left-16 pl-2">
                      <div class="rounded-md shadow-md bg-white" style="width: 344px;height: 394px;">
                        <div class="flex justify-end p-3">
                          <button @click="toDetails(i.offerId)"
                            class="px-4 py-2 border bg-oranges hover:bg-orange text-white rounded"
                          >Product Details</button>
                        </div>
                        <img :src="i.imageUrl" class="mx-auto w-80 h-80" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 ml-2">
                    <div class="title-over mb-1">{{ i.subjectTrans }}</div>
                    <!-- <div class="title-over text-gray-400"> Weight:{{i.min_weight}}{{i.max_weight==0?"":"-"+i.max_weight}}g</div> -->
                    <div class="title-over font-semibold">${{i.usd}}</div>
                  </div>
                  <div>
                    <button 
                      class="px-4 py-1 border border-oranges hover:bg-gray-200 text-oranges rounded"
                      @click="connectPro(i)">Connect</button>
                  </div>
                </div>
              </div>
              <div v-if="ProductLists.length>0" class="text-center my-5">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size='10'
                  :current-page.sync="beginPages"
                  @current-change="setSearchPages"
                  :total="totals"
                >
                </el-pagination>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeList } from "@/api/user";
import {
  getStoreProductList,
  getTransportList,
  syncProduct,
  searchKeyword,
  searchImg,
  getImgId,
  getDetail,
  matchData,
  getRate,
  getShippingMethodList,
} from "@/api/dropshipping";
import { shipFromTo } from "@/api/shippingCost";
import ProductItemVue from "./components/product-item.vue";

export default {
  components: {
    ProductItemVue,
  },
  data() {
    return {
      store: "",
      beginPage: 1,
      beginPages: 1,
      storeList: [],
      productName: "",
      ProductList: [],
      ProductLists: [],
      store_id: "",
      title: "",
      shiping_type: [],
      total: 0,
      totals: 0,
      connectType: 1,
      showLoading: false,
      bgImage: require("@/assets/action/default1.png"),
      dialogVisible: false,
      productSku: [],
      productSkus: [],
      proImg: '',
      proLeft: false,
      proRight: false,
      proList:[
        // {
        //   external_sku_id: '',
        //   platform_sku_id: '',
        // },
      ],
      loading: false,
      storePro: 0,
      proTitle: '',
      imgUrl: '',
      imageId: '',
      searchType: 1,
      keywords: '',
      countryList: [],
      offerId: '',
      productId: '',
      storeId: '',
      codeTwo: '',
      methodId: '',
      methodList: [],
      exchange: 6,
      shippingFrom: '',
    };
  },
  created() {
    this.$emit('menu', 'storeProduct')
  },
  mounted() {
    this.$emit('hiddenChat', false)
    storeList().then((res) => {
      this.storeList = res.data.list;
    });
    getTransportList().then((res) => {
      this.shiping_type = res.data.list;
    });
    this.getData();
    shipFromTo().then((res)=>{
      this.countryList = res.data.endCountry
    })
    getRate().then(res => {
      this.exchange = res.data.exchange_rate
    })
  },
  destroyed() { 
    document.removeEventListener('click', this.even, true) 
    this.$emit('hiddenChat', true)
  },
  methods: {
    setPages(){
      this.getData();
    },
    reset() {
      this.store_id = "";
      this.title = "";
      this.beginPage = 1
      this.getData();
    },
    search() {
      this.getData();
    },
    productType(i){
      this.connectType = i
      if(i == 2){
        this.beginPages = 1
        this.totals = 0
        this.storePro = 0
        this.keywords = ''
        this.ProductLists = []
      }
        this.reset();
      // }else{

      // }
    },
    getData() {
      this.showLoading = true
      this.ProductList = [];
      getStoreProductList({
        pageIndex: this.beginPage,
        title: this.title,
        store_id: this.store_id,
        pageCount: 10,
        is_local: this.connectType
      }).then((res) => {
        this.ProductList = res.data.list;
        this.total = parseInt(res.data.total);
        this.showLoading = false
        if(this.connectType == 2){
          this.searchPro(this.ProductList[0], 0)
          this.ProductList.forEach(item=>{
            item.showPanel = false
          })
        }else{
          this.ProductList.forEach(item=>{
            if(item.product_detail){
              // if(item.product_detail.productShippingInfo.skuShippingInfoList){
              //   item.product_detail.detailWeight = this.getWeight(item.product_detail.productShippingInfo.skuShippingInfoList)
              // }else if(item.product_detail.productShippingInfo.skuShippingDetails){
              //   item.product_detail.detailWeight = this.getWeight(item.product_detail.productShippingInfo.skuShippingDetails)
              // }
              // item.product_detail.detailPrice = this.getDetailPrice(item.product_detail.productSkuInfos)
              item.showPanel = false
            }
          })
        }
      });
    },
    getWeight(arr){
      if (!arr || arr.length === 0) return "";
      const weights = arr.map((item) => {
        if(item.weight){
          return parseFloat(item.weight)
        }else{
          return 0
        }
      });
      const minWeight = Math.min(...weights);
      const maxWeight = Math.max(...weights);

      return minWeight === maxWeight ? minWeight : `${minWeight}-${maxWeight}`;
    },
    getDetailPrice(arr){
      if (!arr || arr.length === 0) return "";
      const prices = arr.map((item) => {
        if(item.price){
          return this.divide(item.price, this.exchange)
        }else if(item.jxhyPrice){
          return this.divide(item.jxhyPrice, this.exchange)
        }else{
          return this.divide(item.consignPrice, this.exchange)
        }
      });
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      return minPrice === maxPrice ? minPrice : `${minPrice}-${maxPrice}`;
    },
    getProduct(){
      this.$refs.storeModal.style = 'display:block;'
      setTimeout(()=> {
        this.$refs.mask.style = 'display:block;opacity:1;'
        this.$refs.storeModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      },1)
    },
    closeModal() {
      this.$refs.mask.style = 'display:block;'
      this.$refs.storeModal.style = 'display:block;'
      setTimeout(()=>{
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.storeModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },1)
    },
    confirmSync(){
      syncProduct({
        store_id: this.store_id,
      }).then((res)=>{
        if(res.code == 0){
          this.closeModal()
          this.getData()
        }else{
          this.$message({
            message: res.msg,
            offset: 70
          });
        }
      })
    },
    searchProduct(){
      // if(this.storePro == 99999){
      //   this.$message({
      //     message: 'Please select a associated item',
      //     offset: 70
      //   });
      // }else{
        const t = this.keywords
        const pattern = /^https:\/\/detail\.1688\.com\/.*\.html/
        const isLink = pattern.test(t)
        if (!t) return
        if (isLink) {
          const value = this.extractValueLink(t)
          this.ProductLists = []
          getDetail({
            code: '',
            keyword: '',
            offerId: value,
            source: 1,
          }).then((res)=>{
            this.beginPages = 1
            this.totals = 1
            this.ProductLists.push(res.data)
            this.ProductLists[0].usd = this.divide(this.ProductLists[0].productSaleInfo.priceRangeList[0].price, this.exchange)
            this.ProductLists[0].imageUrl = this.ProductLists[0].productImage.images[0]
            this.ProductLists[0].showPanel = false
          })
          // window.open(`/productDetail?id=${value}&source=1`, '_blank')
        } else {
          this.proTitle = this.keywords
          this.beginPages = 1
          this.searchType = 1
          this.setSearchPages()
        }
      // }
    },
    extractValueLink(link) {
      const match = String(link).match(/offer\/(\d+)\.html/);
      return match ? match[1] : null
    },
    searchPro(i,n){
      this.productId = i.product_id
      this.storeId = i.store_id
      this.productSku = i.origin_data.variants
      this.proImg = i.origin_data.images[0].url
      this.storePro = n
      this.proTitle = i.title
      this.searchType = 1
      this.setSearchPages()
    },
    setSearchPages(){
      this.ProductLists = []
      if(this.searchType == 1){
        searchKeyword({
          beginPage: this.beginPages,
          filter: "",
          keyword: this.proTitle,
          pageSize: 10,
          snId: "",
          sort: {},
        }).then((res)=>{
          this.ProductLists = res.data.data
          this.totals = parseInt(res.data.totalRecords);
          this.ProductLists.forEach(item => {
            // this.ProductLists[n].usd = this.ProductLists[n].productSaleInfo.priceRangeList[0].price
            let price = 0;
            if (item.priceInfo.price) { price = this.divide(item.priceInfo.price, this.exchange); }
            else if (item.priceInfo.jxhyPrice) { price = this.divide(item.priceInfo.jxhyPrice, this.exchange); }
            else { price = this.divide(item.priceInfo.consignPrice, this.exchange) }
            item.usd = price
            item.showPanel = false
          })
        })
      }else{
        searchImg({
          beginPage: this.beginPages,
          filter: '',
          imageId: this.imageId,
          pageSize: 10,
          sort: {},
        }).then((res)=>{
          this.ProductLists = res.data.data
          this.totals = parseInt(res.data.totalRecords);
          this.ProductLists.forEach(item => {
            // this.ProductLists[n].usd = this.ProductLists[n].productSaleInfo.priceRangeList[0].price
            let price = 0;
            if (item.priceInfo.price) { price = this.divide(item.priceInfo.price, this.exchange); }
            else if (item.priceInfo.jxhyPrice) { price = this.divide(item.priceInfo.jxhyPrice, this.exchange); }
            else { price = this.divide(item.priceInfo.consignPrice, this.exchange) }
            item.usd = price
            item.showPanel = false
          })
        })
      }
    },
    matchPro(i,n){
      this.ProductLists = []
      this.productId = i.product_id
      this.storeId = i.store_id
      this.productSku = i.origin_data.variants
      this.proImg = i.origin_data.images[0].url
      this.storePro = n
      getImgId({
        image_url: i.origin_data.images[0].url
      }).then((req)=>{
        this.imageId = req.data.imageId
        this.searchType = 2
        this.setSearchPages()
      })
    },
    divide(num1, num2) {
      const result = (num1 * 100) / (num2 * 100)
      if (Math.round(result * 100) / 100 > 0) return Math.round(result * 100) / 100
      return 0.01
    },
    connectPro(i){
      this.offerId = i.offerId
      getDetail({
        code: '',
        keyword: '',
        offerId: i.offerId,
        source: i.source,
      }).then((res)=>{
        this.productSku.forEach((item)=>{
          item.isCheck = false
          item.connectNo = null
          item.showPanel = false
        })
        this.productSkus = res.data.productSkuInfos
        this.productSkus.forEach((item)=>{
          item.isCheck = false
          item.connectNo = null
          for(let n=0;n<item.skuAttributes.length;n++){
            if(item.skuAttributes[n].skuImageUrl){
              item.img = item.skuAttributes[n].skuImageUrl
              break
            }
          }
          item.usd = this.divide(item.consignPrice, this.exchange)
          item.showPanel = false
        })
        this.imgUrl = res.data.productImage.images[0]
        this.proLeft = false
        this.proRight = false
        this.proList = []
        this.dialogVisible = true
      })
    },
    setProLeft(i,n){
      let isId = false
      if(this.proRight){
        //add
        for(let n=0;n<this.proList.length;n++){
          if(this.proList[n].external_sku_id == i.id){
            isId = true
            break;
          }
        }
        if(!isId){
          this.proList[this.proList.length-1].external_sku_id = i.id
          i.isCheck = !i.isCheck
          i.connectNo = this.proList.length
          this.proRight = false
        }
        this.$forceUpdate()
      }else{
        if(!this.proLeft){//un
          if(!i.isCheck){
            //add
            let arr = {
              external_sku_id: i.id,
              platform_sku_id: '',
            }
            this.proList.push(arr)
            i.isCheck = !i.isCheck
            i.connectNo = this.proList.length
            this.proLeft = true
            this.$forceUpdate()
          }else{
            let delNum = 0
            let delLeft = 0
            let delRight = 0
            for(let j=this.proList.length-1;j>=0;j--){
              if(this.proList[j].external_sku_id == i.id){
                delNum = j
                delLeft = this.proList[j].external_sku_id
                delRight = this.proList[j].platform_sku_id
                this.proList.splice(j, 1);
                i.isCheck = !i.isCheck
                break;
              }
            }
            for(let k=this.productSku.length-1;k>=0;k--){
              if(this.productSku[k].connectNo>delNum){
                this.productSku[k].connectNo -= 1
              }
            }
            for(let l=this.productSkus.length-1;l>=0;l--){
              if(this.productSkus[l].skuId == delRight){
                this.productSkus[l].isCheck = false
              }
              if(this.productSkus[l].connectNo>delNum){
                this.productSkus[l].connectNo -= 1
              }
            }
            this.$forceUpdate()
          }
        }else if(i.isCheck){
          //删除
          for(let n=0;n<this.proList.length;n++){
            if(this.proList[n].external_sku_id == i.id && this.proList[n].platform_sku_id == ''){
              this.proList.splice(n, 1);
              i.isCheck = !i.isCheck
              this.proLeft = false
              break;
            }
          }
          this.$forceUpdate()
        }
      }
    },
    setProRight(i,n){
      let isId = false
      if(this.proLeft){
        for(let n=0;n<this.proList.length;n++){
          if(this.proList[n].platform_sku_id == i.skuId){
            isId = true
            break;
          }
        }
        if(!isId){
          this.proList[this.proList.length-1].platform_sku_id = i.skuId
          i.isCheck = !i.isCheck
          i.connectNo = this.proList.length
          this.proLeft = false
        }
        this.$forceUpdate()
      }else{
        if(!this.proRight){
          if(!i.isCheck){
            let arr = {
              external_sku_id: '',
              platform_sku_id: i.skuId,
            }
            this.proList.push(arr)
            i.isCheck = !i.isCheck
            i.connectNo = this.proList.length
            this.proRight = true
            this.$forceUpdate()
          }else{
            let delNum = 0
            let delLeft = 0
            let delRight = 0
            for(let j=this.proList.length-1;j>=0;j--){
              if(this.proList[j].platform_sku_id == i.skuId){
                delNum = j
                delLeft = this.proList[j].external_sku_id
                delRight = this.proList[j].platform_sku_id
                this.proList.splice(j, 1);
                i.isCheck = !i.isCheck
                break;
              }
            }
            for(let k=this.productSku.length-1;k>=0;k--){
              if(this.productSku[k].id == delLeft){
                this.productSku[k].isCheck = false
              }
              if(this.productSku[k].connectNo>delNum){
                this.productSku[k].connectNo -= 1
              }
            }
            for(let l=this.productSkus.length-1;l>=0;l--){
              // if(this.productSkus[l].skuId == delRight){
              //   this.productSkus[l].isCheck = false
              // }
              if(this.productSkus[l].connectNo>delNum){
                this.productSkus[l].connectNo -= 1
              }
            }
            this.$forceUpdate()
          }
        }else if(i.isCheck){
          for(let n=0;n<this.proList.length;n++){
            if(this.proList[n].platform_sku_id == i.skuId && this.proList[n].external_sku_id == ''){
              this.proList.splice(n, 1);
              i.isCheck = !i.isCheck
              this.proRight = false
              break;
            }
          }
          this.$forceUpdate()
        }
      }
    },
    submitConnect(){
      this.loading = true
      let forms = {
        store_id: this.storeId,
        matches: [{
          external_product_id: this.productId,
          platform_product_id: this.offerId,
          variant_mappings: this.proList
        }],
        price_control_id: this.methodId,
      }
      // console.log(forms);
      matchData(forms).then((res)=>{
        if(res.code == 0){
          this.dialogVisible = false
          this.getData()
        }else{
          this.$message({
            message: res.msg,
            offset: 70
          });
        }
        this.loading = false
      })
    },
    getPrice(arr) {
      if (!arr || arr.length === 0) return "";
      const prices = arr.map((item) => parseFloat(item.price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      return minPrice === maxPrice ? minPrice : `${minPrice}-${maxPrice}`;
    },
    getMethods(){
      getShippingMethodList({
        country: this.codeTwo
      }).then((res)=>{
        this.methodList = res.data
      })
    },
    imgPanel(item){
      item.showPanel = true
      this.$forceUpdate()
    },
    imgPanels(item){
      item.showPanel = false
      this.$forceUpdate()
    },
    toDetails(id){
      window.open(`/productDetail?id=${id}&source=1`, '_blank')
    },
  },
};
</script>

<style scoped>
.flex-2 {
  flex: 2;
}
.table-header {
  background-color: #e5e7eb;
}

.table-container {
}

.title-over {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  font-size: 14px;
  -webkit-box-orient: vertical;
}
</style>


<style lang="postcss" scoped>
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

  .proPanel::-webkit-scrollbar {
    width: 6px;
  }

  .proPanel::-webkit-scrollbar-thumb {
    border-radius: 2px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.3);
  }

  .proPanel::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
    border-radius: 0;
    background: rgb(255, 255, 255);
    border-radius: 6px;
  }

  .proSelected{
    @apply border-oranges;
    background-color: #fff !important;
    cursor: pointer !important;
  }
</style>