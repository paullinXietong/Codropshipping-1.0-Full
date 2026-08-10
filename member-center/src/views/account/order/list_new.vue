<template>
  <div class="w-full h-full p-5 relative">
    <div v-show="istab == 1" class="absolute bottom-0 z-10" style="width: calc(100% - 40px);">
      <div class="bg-white p-4 w-full shadow-default border rounded-t flex items-center justify-between text-sm">
        <div class="flex items-center">
          <label class="flex items-center cursor-pointer select-none">
            <input v-model="checkAll" @click="allProduct" type="checkbox"
              class="mr-2 w-4 h-4 cursor-pointer">
            <div>Select All</div>
          </label>
        </div>
        <div class="flex items-center">
          <!-- <div class="mr-5">Qty: {{totalNum}}</div> -->
          <div class="mr-5 font-semibold">Total: <span class="text-red-500">${{totalPrice}}</span></div>
          <button @click="toPayment"
            class="py-2 px-6 rounded-lg text-white bg-orange hover:bg-orange1">Payments</button>
        </div>
      </div>
    </div>

    <div class="h-full overflow-y-auto pb-28 p-0.5">
      <!-- <div class="py-4 px-3 text-xl font-semibold bg-white">订单管理</div> -->
      <div class="mt-4">
        <div class="mb-4 flex select-none text-sm w-full overflow-x-auto">
          <!-- <div @click="searchTab('-2')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '-2' ? 'border-opacity-100' : 'border-opacity-0'">Processing ({{statusNum.status_5}})</div> -->
          <div @click="searchTab('1')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '1' ? 'border-opacity-100' : 'border-opacity-0'">To be paid ({{statusNum.status_1}})</div>
           <div @click="searchTab('2')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '2' ? 'border-opacity-100' : 'border-opacity-0'">Paid ({{statusNum.status_2}})</div>
          <div @click="searchTab('3')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '3' ? 'border-opacity-100' : 'border-opacity-0'">In the warehouse ({{statusNum.status_3}})</div>
          <div @click="searchTab('4')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '4' ? 'border-opacity-100' : 'border-opacity-0'">Freight to be paid ({{statusNum.status_4}})</div>
          <div @click="searchTab('5')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '5' ? 'border-opacity-100' : 'border-opacity-0'">Paid freight ({{statusNum.status_5}})</div>
          <div @click="searchTab('7')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '7' ? 'border-opacity-100' : 'border-opacity-0'">Completed ({{statusNum.status_7}})</div>
          <!-- <div @click="searchTab('-1')" class="mr-2 whitespace-nowrap px-2 py-1 border-b-2 border-blue-400 hover:border-opacity-100 cursor-pointer"
            :class="istab == '-1' ? 'border-opacity-100' : 'border-opacity-0'">Canceled ({{statusNum.status_6}})</div> -->
        </div>
        <div class="flex">
          <input type="text" class="input w-72 h-9 py-1 px-2" v-model="keyword" placeholder="">
          <button @click="getData" class="ml-3 w-24 py-1.5 text-white bg-blue-400 hover:bg-blue-500 rounded">Search</button>
        </div>
        <button v-show="istab == '3'" @click="openOutbound" class="mt-4 py-1.5 px-8 rounded text-white bg-orange hover:bg-orange1">Submit</button>
        <div v-if="istab < 4" class="mt-4">
          <div v-for="(i,n) in list" :key="n" class="mb-3 border-t border-r">
            <div class="p-2 text-sm border-l border-b" style="background-color: #F5FDFD;">
              <!-- <div class="flex items-center"></div> -->
              <div class="flex justify-between">
                <div class="flex items-center">
                  <input v-show="i.status==1 || i.status==3" type="checkbox" @change="checkProduct(i)" :value="i.order_number" v-model="checkArr"
                    class="flex-shrink-0 mr-4 w-4 h-4 cursor-pointer">
                  <div v-show="i.status <= 3" class="mr-7">Order No: {{i.order_number}}</div>
                  <div v-show="i.status <= 3" class="mr-7">Creation Time: {{i.created_date}}</div>
                  <div v-show="i.status > 3" class="mr-7">Parcel No: {{i.code}}</div>
                  <!-- <div class="mr-7">Transaction Time: {{i.updated_date}}</div> -->
                  <!-- <div>Total Amount: <span class="font-semibold" style="color: #feac53;">US${{i.amounts}}</span></div> -->
                </div>
                <div v-if="i.status > 1" class="flex items-center">
                  <div v-show="i.status == 2">Status: {{purStatus[i.purchases[0].status]}}</div>
                  <div v-show="i.status == 3">Time of Receipt: {{i.warehouse_arrival_time}}</div>
                  <div v-show="i.status > 3">Package Creation Time: {{i.package_created_time}}</div>
                  <div v-show="i.status == 7" class="ml-7">Signature Time: {{i.order_finish_time}}</div>
                </div>
              </div>
            </div>
            <div class="flex bg-white text-13 flex-wrap cursor-pointer" @click="getDetails(i.order_number,i.status)">
              <div class="w-full sm:flex-1 flex flex-col justify-center border-l border-b">
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
              <!-- <div v-show="i.status == 1" class=" flex sm:hidden flex-row-reverse w-full text-right font-bold  px-3">
                Total: ${{i.amounts}}
              </div> -->
              <!-- <div class="flex sm:hidden flex-row-reverse w-full text-right px-2">
                <button v-show="i.status == 1" @click.stop="toPay(i.order_number,i.amounts,'1')" class="my-1.5 py-1.5 w-20 border text-center mx-1 rounded-full  text-orange border-orange">Payment</button>
                <button v-show="i.status == 4" @click.stop="toPay(i.order_number,i.shipping_fee,'2')" class="my-1.5 py-1.5 w-20 border text-center mx-1 rounded-full  text-orange border-orange">Payment</button>
                <button class="my-1.5 py-1.5 w-20 border text-center mx-1 rounded-full  text-orange border-orange" @click.stop="chatNow(i.order_number)">Contact</button>
                <button v-show="i.payment_status==1" class="my-1.5 py-1.5 w-20 border text-center mx-1 rounded-full" @click.stop="cancelModel(i.order_number)">Cancel</button>
              </div> -->
              <div v-show="i.status < 3" class="flex flex-shrink-0 w-52 flex-col justify-center items-center border-l border-b">
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
              <div v-if="i.status >= 3" class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                <div>Total Items</div>
                <div>{{i.purchases[0].warehouse_data.num_total}} Pieces</div>
              </div>
              <div v-if="i.status >= 3" class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                <div>Total Weight</div>
                <div>{{i.purchases[0].warehouse_data.weight_total}} KG</div>
              </div>
              <div v-if="i.status >= 3" class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                <div>Total Volume</div>
                <div>{{i.purchases[0].warehouse_data.cube_total}} CBM</div>
              </div>
              <div v-if="i.status == 3" class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                <div>Days in stock</div>
                <div>{{i.purchases[0].warehouse_data.days_since_warehousing}} days</div>
              </div>
              <div v-if="i.status >= 4" class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                <div>Delivery Method</div>
                <div>{{i.transport_channel}}</div>
              </div>
              <div v-if="i.status >= 5" class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                <div>Delivery NO</div>
                <div>{{i.code}}</div>
              </div>
              <div v-if="i.status >= 5" class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                <div>Payment Method</div>
                <div>{{i.payment_method}}</div>
              </div>
              <div v-if="i.status >= 5" class="flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                <div>Payment Date</div>
                <div>{{i.payment_time}}</div>
              </div>
              <div v-if="i.status <= 3" class="flex flex-col flex-shrink-0 w-40 justify-center items-center border-l border-b">
                <div class="flex items-center mb-1">
                  <div class="mr-1">Fees</div>
                  <el-tooltip effect="dark" content="Including product price and procurement cost" placement="top">
                    <svg t="1755745565248" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5114" width="16" height="16"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m31.744 814.762667a54.954667 54.954667 0 0 1-75.093333 0 49.834667 49.834667 0 0 1-14.677334-37.546667 46.762667 46.762667 0 0 1 14.677334-36.522667 49.834667 49.834667 0 0 1 37.546666-14.677333 51.882667 51.882667 0 0 1 39.936 14.677333 50.176 50.176 0 0 1 14.677334 36.522667 48.128 48.128 0 0 1-17.066667 37.546667z m125.610667-348.842667a864.256 864.256 0 0 1-70.656 68.266667 179.541333 179.541333 0 0 0-40.96 46.08 121.856 121.856 0 0 0-16.725334 63.829333v20.138667h-68.266666v-20.138667a173.397333 173.397333 0 0 1 15.701333-75.776 363.861333 363.861333 0 0 1 88.064-102.4 387.413333 387.413333 0 0 0 29.696-31.402667 108.202667 108.202667 0 0 0 26.282667-68.266666 110.250667 110.250667 0 0 0-29.696-81.237334 112.981333 112.981333 0 0 0-85.333334-30.378666 111.274667 111.274667 0 0 0-96.938666 42.666666 157.696 157.696 0 0 0-28.672 100.352h-68.266667a204.8 204.8 0 0 1 51.541333-146.432 188.074667 188.074667 0 0 1 144.384-56.661333 189.44 189.44 0 0 1 134.485334 46.08 159.061333 159.061333 0 0 1 48.810666 122.88 164.522667 164.522667 0 0 1-33.450666 102.4z" fill="#999999" p-id="5115"></path></svg>
                  </el-tooltip>
                </div>
                <div class="font-semibold" style="color: #feac53;">US${{i.amounts}}</div>
              </div>
              <div v-if="i.status > 3" class="flex flex-col flex-shrink-0 w-40 justify-center items-center border-l border-b">
                <div class="flex items-center mb-1">
                  <div class="mr-1">Fees</div>
                  <el-tooltip effect="dark" :content="`Including product price and procurement cost: $${i.amounts}, freight: $${i.freights}`" placement="top">
                    <svg t="1755745565248" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5114" width="16" height="16"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m31.744 814.762667a54.954667 54.954667 0 0 1-75.093333 0 49.834667 49.834667 0 0 1-14.677334-37.546667 46.762667 46.762667 0 0 1 14.677334-36.522667 49.834667 49.834667 0 0 1 37.546666-14.677333 51.882667 51.882667 0 0 1 39.936 14.677333 50.176 50.176 0 0 1 14.677334 36.522667 48.128 48.128 0 0 1-17.066667 37.546667z m125.610667-348.842667a864.256 864.256 0 0 1-70.656 68.266667 179.541333 179.541333 0 0 0-40.96 46.08 121.856 121.856 0 0 0-16.725334 63.829333v20.138667h-68.266666v-20.138667a173.397333 173.397333 0 0 1 15.701333-75.776 363.861333 363.861333 0 0 1 88.064-102.4 387.413333 387.413333 0 0 0 29.696-31.402667 108.202667 108.202667 0 0 0 26.282667-68.266666 110.250667 110.250667 0 0 0-29.696-81.237334 112.981333 112.981333 0 0 0-85.333334-30.378666 111.274667 111.274667 0 0 0-96.938666 42.666666 157.696 157.696 0 0 0-28.672 100.352h-68.266667a204.8 204.8 0 0 1 51.541333-146.432 188.074667 188.074667 0 0 1 144.384-56.661333 189.44 189.44 0 0 1 134.485334 46.08 159.061333 159.061333 0 0 1 48.810666 122.88 164.522667 164.522667 0 0 1-33.450666 102.4z" fill="#999999" p-id="5115"></path></svg>
                  </el-tooltip>
                </div>
                <div class="font-semibold" style="color: #feac53;">US${{i.totalCosts}}</div>
              </div>
              <div class="flex flex-shrink-0 w-52 py-5 flex-col justify-center items-center border-l border-b">
                <button v-show="i.payment_status==1 || i.status==4" @click.stop="cancelModel(i.order_number)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Cancel</button>
                <button v-show="i.status == 1" @click.stop="toPay(i.order_number,i.amounts,'1')" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Payment</button>
                <button v-show="i.status == 4" @click.stop="toPay(i.order_number,i.freights,'2')" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Payment</button>
                <button v-show="i.status == 3" @click.stop="getInventory(i.order_number)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Inventory Details</button>
                <button v-show="i.status > 4" @click.stop="toTracking(i.order_number)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Cargo Tracking</button>
                <button @click="getDetails(i.order_number,i.status)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Order Details</button>
                <button @click.stop="chatNow(i.order_number)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Contact</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="istab > 3" class="mt-4">
          <div v-for="(item,index) in list" :key="index+'n'" class="mb-3 border-t border-r">
            <div class="p-2 text-sm border-l border-b" style="background-color: #F5FDFD;">
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div v-show="istab > 3" class="mr-7">Parcel No: {{item.code}}</div>
                </div>
                <div v-if="istab > 1" class="flex items-center">
                  <div v-show="istab > 3">Package Creation Time: {{item.package_created_time}}</div>
                  <div v-show="istab == 7" class="ml-7">Signature Time: {{item.order_finish_time}}</div>
                </div>
              </div>
            </div>
            <div class="flex bg-white text-13">
              <div class="w-full">
                <div v-for="(i,n) in item.order" :key="n+'m'">
                  <div class="p-2 border-l border-b bg-gray-100">Order No: {{i.order_number}}</div>
                  <div class="w-full flex flex-wrap cursor-pointer border-b">
                    <div class="w-full sm:flex-1 flex flex-col justify-center border-l border-b">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="i.status >= 3" class="py-2.5 flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                      <div>Total Items</div>
                      <div>{{i.purchases[0].warehouse_data.num_total}} Pieces</div>
                    </div>
                    <div v-if="i.status >= 3" class="py-2.5 flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                      <div>Total Weight</div>
                      <div>{{i.purchases[0].warehouse_data.weight_total}} KG</div>
                    </div>
                    <div v-if="i.status >= 3" class="py-2.5 flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                      <div>Total Volume</div>
                      <div>{{i.purchases[0].warehouse_data.cube_total}} CBM</div>
                    </div>
                    <div v-if="i.status == 3" class="py-2.5 flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                      <div>Days in stock</div>
                      <div>{{i.purchases[0].warehouse_data.days_since_warehousing}} days</div>
                    </div>
                    <div v-if="i.status >= 4" class="py-2.5 flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                      <div>Delivery Method</div>
                      <div>{{i.transport_channel}}</div>
                    </div>
                    <div v-if="i.status >= 5" class="py-2.5 flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                      <div>Delivery NO</div>
                      <div>{{i.code}}</div>
                    </div>
                    <div v-if="i.status >= 5" class="py-2.5 flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                      <div>Payment Method</div>
                      <div>{{i.payment_method}}</div>
                    </div>
                    <div v-if="i.status >= 5" class="py-2.5 flex flex-shrink-0 w-36 flex-col justify-center items-center border-l border-b">
                      <div>Payment Date</div>
                      <div>{{i.payment_time}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 flex">
                <div class="flex flex-col flex-shrink-0 w-40 justify-center items-center border-l border-b">
                  <div class="flex items-center mb-1">
                    <div class="mr-1">Fees</div>
                    <el-tooltip effect="dark" :content="`Including Warehouse Out Charge: $${item.total_storage_charge}, freight: $${item.total_shipping_fee}`" placement="top">
                      <svg t="1755745565248" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5114" width="16" height="16"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m31.744 814.762667a54.954667 54.954667 0 0 1-75.093333 0 49.834667 49.834667 0 0 1-14.677334-37.546667 46.762667 46.762667 0 0 1 14.677334-36.522667 49.834667 49.834667 0 0 1 37.546666-14.677333 51.882667 51.882667 0 0 1 39.936 14.677333 50.176 50.176 0 0 1 14.677334 36.522667 48.128 48.128 0 0 1-17.066667 37.546667z m125.610667-348.842667a864.256 864.256 0 0 1-70.656 68.266667 179.541333 179.541333 0 0 0-40.96 46.08 121.856 121.856 0 0 0-16.725334 63.829333v20.138667h-68.266666v-20.138667a173.397333 173.397333 0 0 1 15.701333-75.776 363.861333 363.861333 0 0 1 88.064-102.4 387.413333 387.413333 0 0 0 29.696-31.402667 108.202667 108.202667 0 0 0 26.282667-68.266666 110.250667 110.250667 0 0 0-29.696-81.237334 112.981333 112.981333 0 0 0-85.333334-30.378666 111.274667 111.274667 0 0 0-96.938666 42.666666 157.696 157.696 0 0 0-28.672 100.352h-68.266667a204.8 204.8 0 0 1 51.541333-146.432 188.074667 188.074667 0 0 1 144.384-56.661333 189.44 189.44 0 0 1 134.485334 46.08 159.061333 159.061333 0 0 1 48.810666 122.88 164.522667 164.522667 0 0 1-33.450666 102.4z" fill="#999999" p-id="5115"></path></svg>
                    </el-tooltip>
                  </div>
                  <div class="font-semibold" style="color: #feac53;">US${{item.totalCosts}}</div>
                </div>
                <div class="flex flex-shrink-0 w-52 py-5 flex-col justify-center items-center border-l border-b">
                  <!-- <button v-show="istab == 4" @click.stop="cancelModel(item.outboundId)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Cancel</button> -->
                  <button v-show="istab == 4" @click.stop="toPays(item.order,item.totalCosts,'2')" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Payment</button>
                  <button v-show="istab > 4" @click.stop="toTracking(item.outboundId)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Cargo Tracking</button>
                  <button @click="getDetails(item.outboundId,istab)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Order Details</button>
                  <!-- <button @click.stop="chatNow(i.order_number)" class="my-1.5 py-1.5 w-44 hover:underline" style="background-color: #F2F2F2;">Contact</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="Cancel Order"
      :visible.sync="dialogVisible"
      width="60%"
      :show-close='false'
      :modal-append-to-body='false'
      class="cancel-model"
    >
      <p>Once an order is canceled, it cannot be restored. Are you sure you want to cancel the order?</p>
      <span slot="footer" class="dialog-footer">
        <button class="w-16" @click="dialogVisible = false">No</button>
        <button class=" w-16 text-white bg-blue-400 hover:bg-blue-500 rounded" @click="commitCandel">Yes</button>
      </span>
    </el-dialog>

    <el-dialog
      title="International Transportation"
      :visible.sync="outboundModal"
      width="60%"
      :show-close='false'
      :modal-append-to-body='false'
      class="cancel-model"
    >
      <div class="flex ">
        <label class="flex items-center mr-6">
          <input type="radio" value="1" v-model="outboundType" class="mr-2">
          Cooperative Transportation
        </label>
        <label class="flex items-center">
          <input type="radio" value="2" v-model="outboundType" class="mr-2">
          Self-transportation
        </label>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="w-16" @click="outboundModal = false">Cancel</button>
        <button class="ml-8 w-16 text-white bg-blue-400 hover:bg-blue-500 rounded" @click="getOutbound">Submit</button>
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
          status_6: 0,
          status_7: 0,
        },
        totalNum: 0,
        totalPrice: 0,
        checkArr: [],
        checkAll: false,
        purStatus: ['Waiting to purchase','Purchased'],
        outboundType: 1,
        outboundModal: false,
      }
    },
    watch: {
      'checkArr':{
        handler(val,oldVal){
          if(this.checkArr.length == this.list.length){
            this.checkAll = true
          }else{
            this.checkAll = false
          }
          // console.log(val);
          let total_price = 0
          this.list.forEach((item)=>{
            for(let i=0;i<val.length;i++){
              if(val[i] == item.order_number){
                total_price += Number(item.amounts)
              }
            }
          })
          // this.totalNum = val.length
          this.totalPrice = total_price.toFixed(2)
        }
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
        this.checkArr = []
        orderList(status).then((res)=>{
          this.list = res.data.list
          this.list.forEach(item=>{
            item.trackList = []
            // item.amounts = (Number(item.total_price_us) - Number(item.coupon_price)).toFixed(2)
            if(this.istab<4){
              item.amounts = Number(item.total_price_us)
              item.freights = (Number(item.shipping_fee) + Number(item.storage_charge)).toFixed(2)
              item.totalCosts = (Number(item.amounts) + Number(item.freights)).toFixed(2)
            }else{
              item.totalCosts = (Number(item.total_shipping_fee) + Number(item.total_storage_charge)).toFixed(2)
            }
          })
          this.statusNum = res.data.count[0]
          this.checkAll = false
        })
      },
      searchTab(type){
        this.keyword = ''
        this.istab = type
        this.getData()
      },
      getDetails(id,type){
        this.$router.push({
          path: `/account/orderDetails?id=${id}&type=${type}`,
        })
        // orderDetails({order_number: id}).then((res)=>{

        // })
      },
      toPay(id, cost, type){
        this.$router.push({
          name: 'orderPayment',
          params: {
            id: id,
            cost: cost,
            type: type,
          },
        })
      },
      toPays(item, cost, type){
        let ids = []
        item.forEach((item)=>{
          ids.push(item.order_number)
        })
        this.$router.push({
          name: 'orderPayment',
          params: {
            id: ids,
            cost: cost,
            type: type,
          },
        })
      },
      checkProduct(){

      },
      allProduct(){
        if(!this.checkAll){
          let arr = []
          this.list.forEach((item)=>{
            arr.push(item.order_number)
          })
          this.checkArr = arr
        }else{
          this.checkArr = []
        }
      },
      toPayment(){
        if(this.checkArr.length>0){
          this.$router.push({
            name: 'orderPayment',
            params: {
              id: this.checkArr,
              cost: this.totalPrice
            },
          })
        }else{
          this.$message({
            message: 'Please check at least one item',
            offset: 70
          });
        }
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
      },
      getInventory(id){
        this.$router.push({
          path: '/account/inventory?id=' + id,
        })
      },
      openOutbound(){
        if(this.checkArr.length>0){
          this.outboundModal = true
        }else{
          this.$message({
            message: 'Please check at least one item',
            offset: 70
          });
        }
      },
      getOutbound(){
        this.$router.push({
          name: 'outbound',
          params: {
            id: this.checkArr,
            type: this.outboundType,
          },
        })
      },
      toTracking(){
        this.$router.push({
          path: '/order/tracking',
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