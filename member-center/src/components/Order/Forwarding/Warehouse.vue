<template>
  <div class="relative">
    <div ref="mask" class="mask" @click="closeModal"></div>
    <div ref="detailModal" class="modal opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3 px-5">
        <div class="text-xl">View details</div>
        <img id="closeImg"
             class="closeModal"
             @click="closeModal"
             src="../../../assets/close.svg"
             alt="">
      </div>
      <div class="p-5 text-sm">
        <div class="mb-4 grid grid-cols-2 border border-gray-300 dark:border-darkLine">
          <div class="modalItem">
            <div class="itemTitle">Booking No.</div>
            <div class="p-2">{{ warehouseList.info.enquiry_no }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Inbound Number</div>
            <div class="p-2">{{ warehouseList.info.warehousing_no }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Product Channel Type</div>
            <div class="p-2">{{ channel[warehouseList.info.transport_type - 1] }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Delivery City</div>
            <div class="p-2">{{ warehouseList.info.delivery_city }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Destination</div>
            <div class="p-2">{{ warehouseList.info.give_country }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Address Type</div>
            <div class="p-2">{{ addressType[warehouseList.info.delivery_type - 1] }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Is it remote</div>
            <div class="p-2">{{ remote[warehouseList.info.remote] }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Customer Type</div>
            <div class="p-2">{{ customerType[warehouseList.info.customer_type - 1] }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Recipient Name</div>
            <div class="p-2">{{ warehouseList.info.from_user }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Recipient Phone</div>
            <div class="p-2">{{ warehouseList.info.from_tel }}</div>
          </div>
          <div class="col-span-2 flex border border-gray-300 dark:border-darkLine">
            <div class="itemTitle">Recipient Address</div>
            <div class="p-2">{{ warehouseList.info.from_address }}</div>
          </div>
        </div>
        <div class="mb-4 grid grid-cols-2 border border-gray-300 dark:border-darkLine">
          <div class="modalItem">
            <div class="itemTitle">Product Name</div>
            <div class="p-2">{{ warehouseList.info.product_name }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Total Weight</div>
            <div class="p-2">{{ warehouseList.info.weight_str }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Total Volume</div>
            <div class="p-2">{{ warehouseList.info.cube_str }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Qty</div>
            <div class="p-2">{{ warehouseList.info.num }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Whether to declare customs</div>
            <div class="p-2">{{ remote[warehouseList.info.bill] }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Pickup required or not</div>
            <div class="p-2">{{ remote[warehouseList.info.take] }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Estimated time</div>
            <div class="p-2">{{ warehouseList.info.estimate_put_time }}</div>
          </div>
          <div class="modalItem">
            <div class="itemTitle">Storage number</div>
            <div class="p-2">{{ warehouseList.info.shipment_no }}</div>
          </div>
        </div>
        <div v-for="(o,p) in warehouseList.package_info" :key="p">
          <div class="text-lg font-semibold">Package {{p+1}}</div>
          <div class="grid grid-cols-2 border border-gray-300 dark:border-darkLine">
            <div class="modalItem">
              <div class="itemTitle">Shipment NO</div>
              <div class="p-2">{{ o.shipment_no }}</div>
            </div>
            <div class="modalItem">
              <div class="itemTitle">Volume</div>
              <div class="p-2">{{ o.cube_str }}</div>
            </div>
            <div class="modalItem">
              <div class="itemTitle">Weight</div>
              <div class="p-2">{{ o.weight_str }}</div>
            </div>
            <div class="modalItem">
              <div class="itemTitle">Qty</div>
              <div class="p-2">{{ o.num }}</div>
            </div>
            <div class="p-2 col-span-2 border border-gray-300 dark:border-darkLine">
              <div>Package photos</div>
              <div class="flex flex-wrap pt-1">
                <img v-for="(ip,np) in o.product_img" :key="np" 
                  class="w-48 h-48 mr-3" :src="ip" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 border border-gray-300 dark:border-darkLine">
          <div class="flex border border-gray-300 dark:border-darkLine">
            <div class="itemTitle">Review Remark</div>
            <div class="p-2">{{ warehouseList.info.review_remark }}</div>
          </div>
          <div class="flex border border-gray-300 dark:border-darkLine">
            <div class="itemTitle">Book Remark</div>
            <div class="p-2">{{ warehouseList.info.book_remark }}</div>
          </div>
        </div>
      </div>
    </div>
    <div ref="photoModal" class="modal bg-lightText bg-opacity-0">
      <div class="flex justify-end">
        <img @click="closeModal"
          src="../../../assets/close.svg" class="w-10 h-10 cursor-pointer" alt="">
      </div>
      <div class="bg-lightText rounded overflow-hidden" >
        <img class="modalPic" v-for="(pi,pn) in picList" :key="pn"
          :class="{ picCurrent: ispic == pn }"
          :src="pi" alt="">
      </div>
      <div @click="picLeftfun"
        class="bg-white bg-opacity-75 hover:bg-opacity-100 absolute select-none left-0 top-picLeft w-16 h-16 p-4 cursor-pointer">
        <img src="../../../assets/arrowLeft.svg" class="w-8 h-8" alt="">
      </div>
      <div @click="picRightfun"
        class="bg-white bg-opacity-75 hover:bg-opacity-100 absolute select-none right-0 top-picLeft w-16 h-16 p-4 cursor-pointer">
        <img src="../../../assets/arrowRight.svg" class="w-8 h-8" alt="">
      </div>
    </div>

    <div v-if="noData" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../../assets/noWare.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
        <div class="mt-5 text-base text-center font-semibold">Waiting for goods to enter the warehouse</div>
      </div>
    </div>

    <div v-if="!noData" class="mb-28">
      <div class="hidden lg:block mt-3 text-sm">
        <div class="mb-3 rounded-md shadow-default overflow-hidden">
          <div>
            <div class="p-3 flex items-center justify-between bg-gray-200 border-b border-gray-200 dark:bg-darkLine dark:border-darkLine">
              <div class="flex">
                <div class="pr-14">{{ warehouseList.arrival_time }}</div>
                <div class="pr-14">Request Time: {{ warehouseList.created_data }}</div>
                <div class="pr-14">{{ siteList[warehouseList.site - 1] }}</div>
                <div>Cargo NO: {{ warehouseList.site_no }}</div>
              </div>
              <div class="w-1/12 text-13">
                <button class="detailbtn w-full" @click="detailModal">Details</button>
              </div>
            </div>
            <div v-for="(z,x) in warehouseList.package_info" :key="x"
              class="px-3 pb-3 bg-white flex dark:bg-darkMenu border-t border-gray-300 dark:border-darkLine">
              <div class="w-28 flex-shrink-0">
                <div class="text-13 py-3">Package Detail:</div>
                <img :src="z.product_img[0]" class="w-28 h-28 rounded-md" alt="">
              </div>
              <div class="w-full">
                <div class="flex mb-1">
                  <div class="w-2/12 mt-10 pl-3 pr-6"></div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Of Boxes</div>
                    <div>{{ z.num }} Boxes</div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Total Weight</div>
                    <div>{{ z.weight_str }}</div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Total Volume</div>
                    <div>{{ z.cube_str }}</div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Storage Time</div>
                    <div>{{ z.put_time }}</div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Inbound Days</div>
                    <div>{{ z.put_day }}</div>
                  </div>
                </div>
                <div class="mt-4 px-3">
                  <!-- <div>Shipment NO: {{ z.shipment_no }}</div> -->
                  <div>Storage NO: {{ warehouseList.request_no }}</div>
                  <div v-if="warehouseList.package_info.length > 0" class="mt-2 flex">
                    <img v-for="(item,index) in z.product_img" :key="index" @click="photoModal(index,z.product_img)"
                      :src="item" class="w-12 h-12 rounded-md mr-1.5 cursor-pointer" alt="">
                  </div>
                </div>

                <!-- <div class="flex hover:bg-gray-100" v-for="(z,x) in warehouseList.package_info" :key="x">
                  <div class="w-4/12 mt-2 pl-3 pr-6">
                    <div class="py-1">
                      <div>shipment NO: {{ z.shipment_no }}</div>
                      <div v-if="warehouseList.package_info.length > 0" class="mt-2 flex">
                        <img v-for="(item,index) in z.product_img" :key="index" @click="photoModal(index,z.product_img)"
                          :src="item" class="w-12 h-12 rounded-md mr-1.5 cursor-pointer" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Weight</div>
                    <div>{{ z.weight_str }}</div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Volume</div>
                    <div>{{ z.cube_str }}</div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Storage Time</div>
                    <div>{{ z.put_time }}</div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Inbound Days</div>
                    <div>{{ z.put_day }}</div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="block lg:hidden mt-3 text-sm">
        <div class="mb-3 p-3 bg-white dark:bg-darkMenu rounded-md shadow-default">
          <div class="relative">
            <div class="flex">
              <img :src="warehouseList.package_info[0].product_img[0]" class="w-16 h-16 mr-2 flex-shrink-0 rounded-md" alt="">
            </div>
            <div>{{ warehouseList.arrival_time }}</div>
            <div>Request Time: {{ warehouseList.created_data }}</div>
            <div>{{ siteList[warehouseList.site - 1] }}</div>
            <div>Cargo NO: {{ warehouseList.site_no }}</div>
            <div class="mt-1">
              <button class="detailbtn px-6" @click="detailModal">Details</button>
            </div>
            <div class="absolute right-0 bottom-0 w-6 h-6 flex justify-center items-center cursor-pointer"
              @click="show = !show">
              <img src="../../../assets/down.svg" class="w-5 h-5" alt="">
            </div>
          </div>
          <div v-show="show" class="mt-3 pt-2 border-t border-gray-300 dark:border-darkLine">
            <div class="mt-2 p-2">
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Total Weight</div>
                <div>{{ warehouseList.weight_str }}</div>
              </div>
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Total Volume</div>
                <div>{{ warehouseList.cube_str }}</div>
              </div>
            </div>
            <div v-for="(mi,mn) in warehouseList.package_info" :key="mn"
              class="bg-lightMenu dark:bg-darkMain mt-2 p-2 rounded-md">
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <!-- <div>Shipment NO.</div>
                <div>{{ mi.shipment_no }}</div> -->
                <div>Storage NO.</div>
                <div>{{ warehouseList.request_no }}</div>
              </div>
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Weight</div>
                <div>{{ mi.weight_str }}</div>
              </div>
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Volume</div>
                <div>{{ mi.cube_str }}</div>
              </div>
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Storage Time</div>
                <div>{{ mi.put_time }}</div>
              </div>
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Inbound Days</div>
                <div>{{ mi.put_day }}</div>
              </div>
              <div class="p-1">
                <div>Product Photos</div>
                <div class="flex flex-wrap">
                  <img v-for="(mis,mns) in mi.product_img" :key="mns" @click="photoModal(mns,mi.product_img)"
                  :src="mis" class="m-1.5 w-14 h-14 rounded-md cursor-pointer" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {
  getWarehouse,
  getSelData
} from '@/api/warehouse'
import {
  getOrderInfo
} from '@/api/order'
export default {
  name: 'ForwardWarehouse',
  props: {
    id: null,
    tab: ''
  },
  data() {
    return {
      warehouseList:{
        arrival_time: "",
        created_data: "",
        cube_str: "",
        id: "",
        info: {
          bill: "",
          book_remark: "",
          cube_str: "",
          customer_type: 1,
          delivery_city: "",
          delivery_type: "",
          enquiry_no: null,
          estimate_put_time: "",
          from_address: "",
          from_tel: "",
          from_user: "",
          give_country: "",
          img: [],
          num: 10,
          product_name: "",
          remote: 1,
          review_remark: "",
          shipment_no: null,
          take: "",
          transport_type: "",
          warehousing_no: "",
          weight_str: "",
        },
        package_info: [
          {
            id: "", 
            product_img: []
          }
        ],
        request_no: "",
        site: "",
        site_no: "",
        weight_str: "",
      },
      siteList: ['Shenzhen','Yiwu'],
      noData: true,
      addressType: ['warehouse','residential'],
      remote: ['No','Yes'],
      customerType: ['Business Address','Residential Address','Amazon FBA Warehouse'],
      channel: ['Sea Freight','Air Freight','Small Package','Express','Train Freight'],
      show: false,
      picList: [],
      ispic: 0,
    }
  },
  watch:{
    tab: {
      handler (val, oldVal) {
        if(val==4){
          this.getData()
        }
      }
    }
  },
  mounted(){
    
  },
  methods: {
    getData(){
      getOrderInfo({
        id: this.id,
        type: 5
      }).then((res)=>{
        if(res.data.length!=0){
          this.warehouseList = res.data
          this.noData = false
        }
      })
    },
    openModal(e) {
      let that = this
      that.$refs.mask.style = 'display:block;'
      if(e==2){
        that.$refs.detailModal.style = 'display:block;'
      }
      if(e==1){
        that.$refs.photoModal.style = 'display:block;'
      }
      setTimeout(function () {
        that.$refs.mask.style = 'display:block;opacity:1;'
        if(e==2){
          that.$refs.detailModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        }
        if(e==1){
          that.$refs.photoModal.style =
          'display:block;--tw-scale-x: 1;--tw-scale-y: 1;'
        }
      }, 1)
    },
    closeModal() {
      let that = this
      that.$refs.mask.style = 'display:block;'
      if(that.$refs.detailModal.style.opacity == 1){
        that.$refs.detailModal.style = 'display:block;'
      }
      that.$refs.photoModal.style =
        'display:none;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      setTimeout(function () {
        that.$refs.mask.style = 'display:none;opacity:0;'
        that.$refs.detailModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      }, 180)
    },
    detailModal(){
      this.openModal(2)
    },
    photoModal(e,p){
      this.openModal(1)
      this.picList = p
      this.ispic = e
    },
    picLeftfun(){
      if(this.ispic == 0){
        this.ispic = (this.picList.length - 1)
      } else {
        this.ispic -= 1
      }
    },
    picRightfun(){
      if(this.ispic == (this.picList.length - 1)){
        this.ispic = 0
      } else {
        this.ispic += 1
      }
    },
  }
}
</script>

<style lang="postcss" scoped>
.detailbtn {
  @apply py-1 rounded-md bg-warehouseDetail hover:bg-black text-white;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: all 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden translate-x-1/2 -translate-y-1/2 w-1200 max-w-90% max-h-80% overflow-auto rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.closeModal {
  @apply w-7 h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded;
}

.modalItem{
  @apply col-span-2 md:col-span-1 flex border border-gray-300 dark:border-darkLine;
}

.itemTitle{
  @apply p-2 font-semibold text-left sm:text-right w-auto sm:w-52 border-r-2 border-gray-300 dark:border-darkLine;
}

.modalPic{
  @apply w-full hidden opacity-0;
}

.picCurrent{
  @apply block opacity-100;
  animation: fadeIn 500ms;
  animation-timing-function: ease-in;
}
</style>