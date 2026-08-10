<template>
  <div class="w-full h-full p-5 relative">
    <div class="h-full overflow-y-auto pb-28 p-0.5">
      <!-- <div class="py-4 px-3 text-xl font-semibold bg-white">订单管理</div> -->
      <div class="mt-4">
        <div class="mb-4 flex select-none text-sm w-full overflow-x-auto">
          <div @click="searchTab('-2')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '-2' ? 'border-opacity-100' : 'border-opacity-0'">Processing ({{statusNum.status_5}})</div>
          <div @click="searchTab('1')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '1' ? 'border-opacity-100' : 'border-opacity-0'">Pending ({{statusNum.status_1}})</div>
           <div @click="searchTab('2')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '2' ? 'border-opacity-100' : 'border-opacity-0'">Paid ({{statusNum.status_2}})</div>
          <div @click="searchTab('3')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '3' ? 'border-opacity-100' : 'border-opacity-0'">Shipped ({{statusNum.status_3}})</div>
          <div @click="searchTab('4')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '4' ? 'border-opacity-100' : 'border-opacity-0'">Completed ({{statusNum.status_4}})</div>
          <!-- <div @click="searchTab('-1')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '-1' ? 'border-opacity-100' : 'border-opacity-0'">Canceled ({{statusNum.status_6}})</div> -->
        </div>
        <div class="flex">
          <input type="text" class="input w-72 h-9 py-1 px-2" v-model="keyword" placeholder="">
          <button @click="getData" class="ml-3 w-24 py-1.5 text-white bg-blue-400 hover:bg-blue-500 rounded">Search</button>
        </div>
        <div class="mt-4">
          <div v-for="(i,n) in list" :key="n" class="mb-3 border border-gray-300">
            <div class="p-2 flex justify-between items-center text-sm border-b" style="background-color: #F5FDFD;">
              <!-- <div class="flex items-center"></div> -->
              <div class="flex">
                <div class="mr-7">Order No: {{i.order_number}}</div>
                <div class="mr-7 hidden sm:block">Creation Time: {{i.created_date}}</div>
                <!-- <div class="mr-7">Transaction Time: {{i.updated_date}}</div> -->
                <!-- <div>Total Amount: <span class="font-semibold" style="color: #feac53;">US${{i.total_price_us}}</span></div> -->
              </div>
            </div>
            <div class="flex bg-white text-13 flex-wrap cursor-pointer" @click="getDetails(i.order_number)">
              <div class="w-full sm:flex-1 flex flex-col justify-center">
                <div v-for="(ix,nx) in i.order_info" :key="nx" class="w-full p-3 flex"
                  :class="[nx==0 ? '' : 'border-t']">
                  <img :src="ix.sku_image" class="flex-shrink-0 w-16 h-16 mr-3" alt="">
                  <div class="sm:w-470">
                    <div class="flex justify-between">
                      <div class=" pr-2 productTitle flex-1">{{ix.subject}}</div> 
                      <div class=" w-16">${{ix.price_us}}</div>
                    </div>
                    <div class="mt-3 flex justify-between text-xs text-gray-400">
                      <div class="pr-2 productTitle flex-1">{{ix.sku_name}}</div> 
                      <div class=" w-16">qty: {{ix.num}}</div>
                      <!-- <div class="mr-3">库存编号： G1233-S</div>
                      <div class="mr-3">颜色： 黑色</div>
                      <div>尺码： S</div> -->
                    </div>
                  </div>
                  <!-- <div class="flex-shrink-0 w-24">US${{ix.price_us}}</div> -->
                  <!-- <div class="flex-shrink-0 w-24">qty: {{ix.num}}</div> -->
                </div>
              </div>
              <div v-show="i.status == 1" class=" flex sm:hidden flex-row-reverse w-full text-right font-bold  px-3">
                Total: ${{i.total_price_us}}
              </div>
              <div class="flex sm:hidden flex-row-reverse w-full text-right px-2">
                <button v-show="i.status == 1" @click.stop="toPay(i.order_number,i.total_price_us)" class="my-1.5 py-1.5 w-20 border text-center mx-1 rounded-full  text-orange border-orange">Payment</button>
                <button class="my-1.5 py-1.5 w-20 border text-center mx-1 rounded-full  text-orange border-orange" @click.stop="chatNow(i.order_number)">Contact</button>
                <button v-show="i.payment_status==1" class="my-1.5 py-1.5 w-20 border text-center mx-1 rounded-full" @click.stop="cancelModel(i.order_number)">Cancel</button>
              </div>
              <div class=" hidden sm:flex flex-shrink-0 w-52 flex-col justify-center items-center border-l">
                <div>{{paymentType[i.payment_status]}}</div>
                <el-popover
                  placement="bottom"
                  width="320"
                  trigger="click">
                  <div v-show="i.trackList.length>0">
                    <ul class="pl-5 pr-2 co-ul">
                      <li v-for="(i,n) in i.trackList" :key="n" class="mb-3"
                        :class="[n==0 ? 'text-orange' : '']">
                        <div>{{i.msg}}</div>
                        <div>{{i.created_data}}</div>
                      </li>
                    </ul>
                  </div>
                  <div v-show="i.trackList.length==0">No tracking information</div>
                  <div @click.stop="viewTrack(i.id,n)" slot="reference" class="mt-3 text-blue-500 hover:underline cursor-pointer relative">Tracking</div>
                </el-popover>
                
              </div>
              <div class=" hidden sm:flex flex-shrink-0 w-52  justify-center items-center border-l font-semibold" style="color: #feac53;">US${{i.total_price_us}}</div>
              <div class=" hidden sm:flex flex-shrink-0 w-52  py-5 flex-col justify-center items-center border-l">
                <button v-show="i.payment_status==1" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;" @click.stop="cancelModel(i.order_number)">Cancel</button>
                <!-- <button @click="getDetails(i.order_number)" class="my-1.5 py-1.5 w-44" style="background-color: #F2F2F2;">Order Details</button> -->
                <button v-show="i.status == 1" @click.stop="toPay(i.order_number,i.total_price_us)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Payment</button>
                <button class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;" @click.stop="chatNow(i.order_number)">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="cancellation of order"
      :visible.sync="dialogVisible"
      width="60%"
      :show-close='false'
      :modal-append-to-body='false'
      class="cancel-model"
    >
      <p>Cancellation of this order can be viewed from Cancelled</p>
      <span slot="footer" class="dialog-footer">
        <button class="w-16" @click="dialogVisible = false">No</button>
        <button class=" w-16 text-white bg-blue-400 hover:bg-blue-500 rounded" @click="commitCandel">Yes</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    orderList,
    orderDetails,
    candelOrder,
    getTracking
  } from '@/api/dropshipping'
  export default {
    data(){
      return{
        istab: 1,
        keyword: '',
        list: [],
        paymentType: ['','Unpaid List','Pending Goods Delivery','Pending Goods Delivery'],
        dialogVisible: false,
        // paymentType: ['','Aid List'],
        order_number: '',
        statusNum: {
          status_1: 0,
          status_2: 0,
          status_3: 0,
          status_4: 0,
          status_5: 0,
          status_6: 0
        },
      }
    },
    created() {
      this.$emit('menu', 'orderList')
    },
    mounted(){
      if(this.$route.query.type){
        this.istab = this.$route.query.type
      }
      this.getData()
    },
    methods:{
      chatNow(order){
        this.$emit('openChat')
      },
      commitCandel(){
        candelOrder({
          order_number: this.order_number
        }).then(res=>{
          this.dialogVisible = false;
          this.getData();
        })
      },
      cancelModel(order){
        this.order_number = order;
        this.dialogVisible = true;
      },
      getData(){
        let status = {
          status: this.istab,
          keyword: this.keyword,
          pageIndex: 1,
          pageCount: 50
        }
        this.list = []
        orderList(status).then((res)=>{
          this.list = res.data.list
          this.list.forEach(item=>{
            item.trackList = []
          })
          this.statusNum = res.data.count[0]
        })
      },
      searchTab(type){
        this.keyword = ''
        this.istab = type
        this.getData()
      },
      getDetails(id){
        this.$router.push({
          path: '/account/orderDetails?id=' + id,
        })
        // orderDetails({order_number: id}).then((res)=>{

        // })
      },
      toPay(id,cost){
        this.$router.push({
          name: 'orderPayment',
          params: {
            id: id,
            cost: cost
          },
        })
      },
      viewTrack(id,index){
        getTracking({id: id}).then((res)=>{
          let a = this.list[index]
          if(res.data.msg){
            a.trackList = res.data.msg
          }else{
            a.trackList = []
          }
          this.$set(this.list, index, a)
        })
      }
    }
  }
</script>

<style>
.cancel-model .el-dialog__body{
  padding: 10px 20px !important;
}

.co-ul{
  list-style: outside !important;
  max-height: 400px;
  overflow-y: auto;
}

.co-ul::-webkit-scrollbar {
  width: 4px;
  height: 8px;
}

.co-ul::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.co-ul::-webkit-scrollbar-track {
  border-radius: 6px;
}
</style>
<style scoped lang="postcss">
  .productTitle {
    @apply break-words overflow-hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
</style>