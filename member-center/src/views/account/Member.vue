<template>
  <div class="w-full max-w-1600 m-auto h-full p-3 sm:p-5 overflow-scroll text-menu dark:text-darkText">
    <div class="text-xl font-semibold hidden">Member</div>
    <div class="mt-5 hidden">
      <div class="mb-3 flex flex-wrap justify-between">
        <div class="text-sm">Plan Overview</div>
        <a class="cursor-pointer" href="https://app.cargosoon.com/Membership_Terms_Conditions.html" target="_blank">
          <div class="flex items-center text-xs">
            <div>Cargosoon Membership Terms & Conditions</div>
            <svg t="1691465175491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4006" width="20" height="20"><path d="M513.31835938 903.20117188c-8.96484375 0-18.01757813-3.42773438-24.87304688-10.28320313-13.7109375-13.7109375-13.7109375-35.94726563 0-49.74609375l331.69921875-331.69921875-331.69921875-331.78710938c-13.7109375-13.7109375-13.7109375-35.94726563 0-49.74609374 13.7109375-13.7109375 35.94726563-13.7109375 49.74609375 0L894.76367188 486.51171875c13.7109375 13.7109375 13.7109375 35.94726563-1e-8 49.74609375L538.19140625 892.91796875c-6.94335938 6.85546875-15.90820313 10.28320313-24.87304688 10.28320313z" p-id="4007" fill="#8a8a8a"></path></svg>
          </div>
        </a>
      </div>
      <div class="flex flex-wrap text-black">
        <div class="mr-6 mb-3 py-4 px-6 w-64 rounded shadow-default relative" style="background-color: #e0e6ea;">
          <div class="absolute top-1 right-3 flex items-center">
            <img src="../../assets/lv1.png" class="w-9" alt="">
            <svg v-if="grade == '2'" t="1691114037349" class="icon ml-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2371" width="18" height="18"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512-230.4-512-512-512z m-57.6 864L147.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l204.8 204.8 339.2-396.8c25.6-25.6 64-32 89.6-6.4s32 64 6.4 89.6l-422.4 505.6z" fill="#e66a10" p-id="2372"></path></svg>
          </div>
          <div class="font-bold">Free L1</div>
          <div class="py-3 text-2xl font-bold">$0</div>
          <div class="pb-3 text-xs">Unlimited users</div>
          <div class="flex justify-center">
            <div v-if="grade == '2'" class="w-44 p-1.5 text-13 font-medium rounded text-white text-center"
              style="background-color: #747474;">Active plan</div>
            <div v-if="grade == '3'" class="w-44 p-1.5 text-13 font-medium rounded text-white text-center"
            style="background-color: #747474;">Upgraded</div>
          </div>
        </div>
        <div class="mb-3 py-4 px-6 w-64 rounded shadow-default relative"
          style="background-image: linear-gradient(-180deg, #494535, #181411);">
          <div class="absolute top-1 right-3 flex items-center">
            <img src="../../assets/lv2.png" class="w-9" alt="">
            <svg v-if="grade == '3'" t="1691114037349" class="icon ml-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2371" width="18" height="18"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512-230.4-512-512-512z m-57.6 864L147.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l204.8 204.8 339.2-396.8c25.6-25.6 64-32 89.6-6.4s32 64 6.4 89.6l-422.4 505.6z" fill="#e4bf84" p-id="2372"></path></svg>
          </div>
          <div class="font-bold" style="color: #ffc566;">Free L2</div>
          <div class="py-3 text-2xl font-bold text-white">$0</div>
          <div class="pb-3 text-xs text-gray-300">Unlimited users</div>
          <div class="flex justify-center">
            <router-link :to="{ name: 'memberReview' }">
              <button v-if="grade == '2'" class="w-44 p-1.5 text-13 font-semibold rounded"
                style="background-color: #ffc566;">Subscribe now</button>
            </router-link>
            <div v-if="grade == '3'" class="w-44 p-1.5 text-13 font-semibold rounded text-center"
              style="background-color: #ffc566;">Active plan</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 hidden">
      <div v-if="grade == '2'" class="text-sm mb-3">My L1 Privilege</div>
      <div v-if="grade == '3'" class="text-sm mb-3">Membership Benefits</div>
      <div class="relative px-7 bg-white dark:bg-darkMenu rounded shadow-default">
        <div class="mb-6 flex w-full gap-4 overflow-x-auto rounded-md">
          <div class="swiperItems flex-shrink-0" v-for="(i,n) in bannerList" :key="n">
            <div class="my-6 px-6 text-center flex flex-col items-center">
              <div class="relative">
                <img :src="i.img" class="w-10" alt="">
                <img v-if="!i.level" src="../../assets/member_lock.png" class="absolute -right-2 bottom-0 w-4" alt="">
              </div>
              <div class="my-2 font-semibold h-11 leading-5">{{i.title}}</div>
              <div class="text-xs">{{i.desc}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 mb-32">
      <div class="text-sm mb-3">My Coupons</div>
      <div v-show="couponsList.length==0 " class="mt-4 py-4 flex flex-col justify-center items-center rounded bg-white dark:bg-darkMenu">
          <img src="@/assets/warehouseNodata.png" alt="w-40 h-40" ><div>No Coupons</div>
        </div>
      <div class="mt-5 grid grid-cols-12 gap-4">
        
        <div
          v-for="(item,index) in couponsList"
          :key="index"
          class="member-coupon col-span-12 md:col-span-4 2xl:col-span-3 shadow-default bg-white dark:bg-darkMenu"
          :class="{ 'member-coupon-disabled': couponUnavailable(item) }"
        >
          <div class="pt-3 px-5 pb-5 text-sm relative">
            <div class="text-xl font-semibold">${{ item.type_value }} OFF</div>
            <div class="flex justify-between items-center">
              <div>For orders over ${{ item.min_price }}</div>
              <div v-if="couponUnavailable(item)" class="rounded-md p-2 bg-gray-300 text-gray-700">
                {{ couponUnavailableReason(item) }}
              </div>
              <div v-else class="rounded-md p-2"
                style="background-image: linear-gradient(-180deg,#3a372d,#191512);color: #ffc566;">Waiting to use</div>
            </div>
            <!-- <div class="flex items-center">
              <div>Code: {{ item.code }}</div>
              <img src="../../assets/copy.svg" class="ml-1 w-4 h-4 cursor-pointer" @click="copyCode(item.code)" alt="">
            </div> -->
            <div class="border-r border-gray-300 dark:border-gray-900 bg-lightMenu dark:bg-darkMain absolute rounded-full"
              style="left: -9px;bottom: -9px;width: 17px;height: 17px;transition: all 0.5s;">
            </div>
            <div class="border-l border-gray-300 dark:border-gray-900 bg-lightMenu dark:bg-darkMain absolute rounded-full"
              style="right: -9px;bottom: -9px;width: 17px;height: 17px;transition: all 0.5s;">
            </div>
          </div>
          <div class=" pt-2.5 px-5 pb-2 text-xs border-t border-dashed border-gray-300 dark:border-darkLine">
            <div>{{ item.end_time }}</div>
            <div class="flex">
              <div class="flex-shrink-0 mr-1">Applies to</div>
              <div v-if="item.product_type.length<6" class="flex flex-wrap">
                <div class="mr-2" v-for="(i,n) in item.product_type" :key="n">
                  {{applies[i]}}
                </div>
              </div>
              <div v-if="item.product_type.length==6">{{applies[0]}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMember,
  getMemberInfo,
  setMember,
  editMember,
  getCoupons
} from '@/api/user'
import { getOrderList as getFreightOrderList } from '@/api/order'
import { orderList as getProductOrderList } from '@/api/dropshipping'
import {
  isNewUserCouponUnavailable,
  newUserCouponUnavailableReason,
  responseHasOrders,
} from '@/utils/newUserShippingCoupon'
export default {
  data() {
    return {
      grade: null,
      bannerList:[],
      bannerList1:[
        {
          img:require('../../assets/member_price.png'),
          title:'10% off member price',
          desc:'L1 member price 10% off from the price when logged in',
          level:true,
        },
        {
          img:require('../../assets/member_warehouse.png'),
          title:'free warehouse storage',
          desc:'We will provide you with a warehouse in china for free for 15 days.',
          level:true,
        },
        {
          img:require('../../assets/member_coupon.png'),
          title:'$80 Coupon',
          desc:'2 sheets to be used when placing an order',
          level:true,
        },
        {
          img:require('../../assets/member_quote.png'),
          title:'Unlimited shipping quotes',
          desc:'"Always Free" Unlimited Shipping Offers',
          level:true,
        },
        {
          img:require('../../assets/member_service.png'),
          title:'Dedicated 24/7 customer service',
          desc:'24/7 customer service and upgraded after-sales service',
          level:true,
        },
        {
          img:require('../../assets/member_prioritize.png'),
          title:'Prioritize processing and shipping',
          desc:'To prioritize processing and shipping orders for the esteemed members.',
          level:false,
        },
        {
          img:require('../../assets/member_coupon.png'),
          title:'$100 Coupon',
          desc:'5 sheets to be used when placing an order',
          level:false,
        },
        {
          img:require('../../assets/member_price.png'),
          title:'15% off member price',
          desc:'L2 member price 15% off from the price when logged in',
          level:false,
        },
      ],
      bannerList2:[
        {
          img:require('../../assets/member_price.png'),
          title:'15% off member price',
          desc:'L2 member price 15% off from the price when logged in',
          level:true,
        },
        {
          img:require('../../assets/member_warehouse.png'),
          title:'free warehouse storage',
          desc:'We will provide you with a warehouse in china for free for 30 days.',
          level:true,
        },
        {
          img:require('../../assets/member_coupon.png'),
          title:'$80 Coupon',
          desc:'2 sheets to be used when placing an order',
          level:true,
        },
        {
          img:require('../../assets/member_quote.png'),
          title:'Unlimited shipping quotes',
          desc:'"Always Free" Unlimited Shipping Offers',
          level:true,
        },
        {
          img:require('../../assets/member_service.png'),
          title:'Dedicated 24/7 customer service',
          desc:'24/7 customer service and upgraded after-sales service',
          level:true,
        },
        {
          img:require('../../assets/member_prioritize.png'),
          title:'Prioritize processing and shipping',
          desc:'To prioritize processing and shipping orders for the esteemed members.',
          level:true,
        },
        {
          img:require('../../assets/member_coupon.png'),
          title:'$100 Coupon',
          desc:'5 sheets to be used when placing an order',
          level:true,
        },
        
      ],
      couponsList:[],
      hasPlacedOrder: false,
      couponEligibilityLoading: true,
      couponEligibilityFailed: false,
      applies:['All Lines','Sea DDP','Air DDP','Parcel','Express','European Railway DDP','European Trucking'],
    }
  },
  created() {
    this.$emit('menu', 'Member')
  },
  mounted() {
    this.loadOrderEligibility()
    getMember().then((res)=>{
      // this.grade = res.data.current_super_id
      if(res.data.current_super_id != '3'){
        this.grade = 2
        this.bannerList = this.bannerList1
        this.$emit('setLevel','L1')
      }else{
        this.grade = 3
        this.bannerList = this.bannerList2
        this.$emit('setLevel','L2')
      }
      // this.couponsList = res.data.myCoupon
      let list = res.data.myCoupon
      for(let n=0;n<list.length;n++){
        let a = []
        const productType = list[n].product_type
        list[n].product_type = Array.isArray(productType)
          ? productType
          : String(productType || '').split(',').filter(Boolean)
      }
      this.couponsList = list
    })
    // getCoupons({
    //   status:2
    // }).then((res)=>{
    //   let list = res.data
    //   for(let n=0;n<list.length;n++){
    //     let a = []
    //     a = list[n].product_type.split(',')
    //     list[n].product_type = a
    //   }
    //   this.couponsList = list
    // })
  },
  methods: {
    couponUnavailable(item) {
      if ((this.couponEligibilityLoading || this.couponEligibilityFailed) && isNewUserShippingCoupon(item)) return true
      return isNewUserCouponUnavailable(item, this.hasPlacedOrder)
    },
    couponUnavailableReason(item) {
      if (this.couponEligibilityLoading && isNewUserShippingCoupon(item)) return 'Checking eligibility'
      if (this.couponEligibilityFailed && isNewUserShippingCoupon(item)) return 'Eligibility unavailable'
      return newUserCouponUnavailableReason(item, this.hasPlacedOrder)
    },
    async loadOrderEligibility() {
      const requests = await Promise.allSettled([
        getProductOrderList({ status: 0, pageIndex: 1, pageCount: 1 }),
        getFreightOrderList({ status: 0, page: 1, page_size: 1 }),
      ])
      this.hasPlacedOrder = requests.some((result) => (
        result.status === 'fulfilled' && responseHasOrders(result.value)
      ))
      this.couponEligibilityFailed = requests.some((result) => (
        result.status !== 'fulfilled' || !result.value || result.value.code !== 0
      ))
      this.couponEligibilityLoading = false
    },
  },
}
</script>

<style lang="postcss" scoped>
.swiper-button-disabled{
  opacity: 0 !important;
}

.swiper-button-next, .swiper-button-prev{
  /* opacity: 0; */
  color: #181818;
  background-color: #00000000;
  /* width: calc(var(--swiper-navigation-size) / 44 * 27 + 8px); */
  height: calc(var(--swiper-navigation-size) + 16px);
  top: var(--swiper-navigation-top-offset,45%);
}

.swiper-button-next:after, .swiper-button-prev:after{
  font-size: 24px;
  font-weight: 600;
}

.swiper-button-next{
  right: 0;
}

.swiper-button-prev{
  left: 0;
}

.swiperItems{
  width: 250px !important;
  height: 196px !important;
}

.swiperItems:not(:first-child)>div{
  height: 148px;
  border-left: 1px solid #cacaca6b;
}

.member-coupon {
  transition: opacity 160ms ease, filter 160ms ease;
}

.member-coupon-disabled {
  filter: grayscale(1);
  opacity: 0.58;
}
</style>
