<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto">
      <div class="flex">
        <router-link to="/account/storeOrder">
          <div class="flex items-center">
            <svg t="1736493314931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5054" width="20" height="20"><path d="M685.226667 168.106667a64 64 0 0 1 0 90.453333l-256.426667 256.469333 256.426667 256.426667a64 64 0 0 1-90.453334 90.538667l-301.738666-301.696a64 64 0 0 1 0-90.538667l301.696-301.653333a64 64 0 0 1 90.538666 0z" fill="#515151" p-id="5055"></path></svg>
            Back
          </div>
        </router-link>
      </div>
      <div class="main1 pb-32 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="mt-5 font-semibold">Order Confirmation</div>
        <div v-for="(io,no) in list.order_list" :key="no" class="mt-4">
          <div class="p-4 grid grid-cols-3 gap-4" style="background-color: #F9F8F8;">
            <div class="col-span-1">Order Number: {{io.local_order_number}}</div>
            <div class="col-span-1">Store Order Number: {{io.order_number}}</div>
            <div class="col-span-1">Product Cost: ${{io.product_cost}}</div>
            <div class="col-span-1">Shipping Cost: ${{io.shipping_cost}}</div>
            <div class="col-span-1">Shipping Info: {{io.address.first_name}} {{io.address.last_name}}</div>
            <div class="col-span-1">Shipping Address: {{io.address.address1}}, {{io.address.city}}, {{io.address.province}}, {{io.address.country}}</div>
          </div>
          <el-table
            :data="io.line_items"
            :header-cell-style="{'background-color':'#E5E7EB'}"
            empty-text="No data">
            <el-table-column
              label="Products"
              width="650">
              <template slot-scope="scope">
                <div class="flex">
                  <img :src="scope.row.image" class="w-14 h-14 m-2" alt="">
                  <div class="text-13 overflow-hidden">
                    <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">{{scope.row.name}}</div>
                    <div>SKU: {{scope.row.sku}}</div>
                    <div>Variant: {{scope.row.variant_title}}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Price"
              width="200">
              <template slot-scope="scope">
                <div class="text-oranges">${{scope.row.cost_price}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Quantity"
              width="200">
              <template slot-scope="scope">
                <div class="text-oranges">{{scope.row.quantity}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Weight"
              width="200">
              <template slot-scope="scope">
                <div class="text-oranges">{{scope.row.grams}}g</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Supplier">
              <template slot-scope="scope">
                <div class="text-oranges">{{scope.row.vendor}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="mt-10 p-4 flex flex-col items-end border border-oranges" style="background-color: #FFFDFC;">
          <div>Total Product Cost: <span>${{list.product_cost}}</span></div>
          <div class="mt-2">Total Shipping Cost: <span>${{list.shipping_cost}}</span></div>
          <div class="mt-2 font-semibold text-base">Amount: <span class="text-oranges">${{list.total_amount}}</span></div>
        </div>
        <div class="mt-4 flex justify-end">
          <button @click="payOrder(list)" class="btn">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getDeliveryOrderInfo,
  } from '@/api/dropshipping'
  export default {
    data() {
      return {
        list: {},
        productList: [],
      }
    },
    mounted(){
      getDeliveryOrderInfo({
        order_number: this.$route.query.order_number
      }).then((res)=>{
        this.list = res.data.delivery_order_info
        // let alist = []
        // for(let j=0;j<this.list.order_list.length;j++){
        //   alist = [...alist, ...this.list.order_list[j].line_items]
        // }
        // this.productList = alist
      })
    },
    methods:{
      payOrder(item){
        this.$router.push({
          path: '/account/storeOrderPayment',
          query: {
            order_number: item.order_number
          }
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .btn {
    @apply w-28 font-semibold border-0 text-white rounded bg-orange hover:bg-orange1 px-6 py-2.5 cursor-pointer;
  }
</style>