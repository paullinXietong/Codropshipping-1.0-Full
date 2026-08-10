<template>
  <div class="w-full h-full p-5 relative">
    <div class="h-full overflow-y-auto pb-32 p-0.5">
      <div @click="toList" class="flex items-center p-4 bg-white rounded-md shadow-default cursor-pointer">
        <img src="@/assets/arrowLeft.svg" class="w-7 mr-2" alt="">
        <div>Inventory Details</div>
      </div>
      <div class="mt-4 p-4 bg-white rounded-md shadow-default">
        <div>Order Details</div>
        <div class="mt-3 grid grid-cols-4 text-13 border-t border-l">
          <div class="ordername">Order No</div>
          <div class="ordertext">{{list.order_number}}</div>
          <div class="ordername">Payment Method</div>
          <div class="ordertext">{{list.transport_channel}}</div>
          <div class="ordername">Purchase No</div>
          <div class="ordertext">{{list.purchases[0].purchase_no}}</div>
          <div class="ordername">Tracking No</div>
          <div class="ordertext"></div>
          <div class="ordername">Time of Receipt</div>
          <div class="ordertext">{{list.warehouse_arrival_time}}</div>
          <div class="ordername">Days in Stock</div>
          <div class="ordertext">{{list.purchases[0].warehouse_data.days_since_warehousing}} days</div>
        </div>
      </div>
      <div class="mt-4 p-4 bg-white rounded-md shadow-default">
        <div>Product Information</div>
        <div class="mt-2 flex bg-white text-13 flex-wrap border-t border-r">
          <div class="w-full sm:flex-1 flex flex-col justify-center border-l border-b">
            <div class="p-2 border-b bg-gray-100">Product</div>
            <div v-for="(ix,nx) in list.order_info" :key="nx" class="w-full p-3 flex"
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
                </div>
              </div>
            </div>
          </div>
          <div class="flex-shrink-0 w-36 border-l border-b flex flex-col">
            <div class="p-2 border-b text-center bg-gray-100">Total Items</div>
            <div class="h-full flex justify-center items-center">
              <div>{{list.purchases[0].warehouse_data.num_total}} Pieces</div>
            </div>
          </div>
          <div class="flex-shrink-0 w-36 border-l border-b flex flex-col">
            <div class="p-2 border-b text-center bg-gray-100">Total Weight</div>
            <div class="h-full flex justify-center items-center">
              <div>{{list.purchases[0].warehouse_data.weight_total}} KG</div>
            </div>
          </div>
          <div class="flex-shrink-0 w-36 border-l border-b flex flex-col">
            <div class="p-2 border-b text-center bg-gray-100">Total Volume</div>
            <div class="h-full flex justify-center items-center">
              <div>{{list.purchases[0].warehouse_data.cube_total}} CBM</div>
            </div>
          </div>
          <div class="flex-shrink-0 w-36 border-l border-b flex flex-col">
            <div class="p-2 border-b text-center bg-gray-100">Days in stock</div>
            <div class="h-full flex justify-center items-center">
              <div>{{list.purchases[0].warehouse_data.days_since_warehousing}} days</div>
            </div>
          </div>
        </div>

        <div class="mt-4">Free Stock Photos:</div>
        <div class="flex flex-wrap">
          <img v-for="(i,n) in list.purchases[0].warehouse_data.images" :src="'https://'+url+'/api/'+i" class="w-36 mr-3 mt-3" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    orderDetails,
    getDetailsOfGoodsWarehousing
  } from '@/api/dropshipping'
  export default {
    data() {
      return {
        orderNo: '',
        list: {
          goods_list: [
            {
              sku_info: {}
            }
          ],
          purchases: [
            {
              warehouse_data: {}
            }
          ],
        },
        url: '',
      }
    },
    mounted() {
      this.url = window.location.host
      this.orderNo = this.$route.query.id
      this.getData()
    },
    methods: {
      getData(){
        // orderDetails({order_number: this.orderNo}).then((res)=>{
        //   this.list = res.data.order_info
        // })
        getDetailsOfGoodsWarehousing({order_number: this.orderNo}).then((res)=>{
          this.list = res.data[0]
        })
      },
      toList(){
        this.$router.push({
          path: '/account/orderList?type=3',
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .ordername{
    @apply p-2 border-b border-r text-right bg-gray-100;
  }

  .ordertext{
    @apply p-2 border-b border-r;
  }
</style>