<template>
  <div class="w-full max-w-1200 m-auto h-full p-3 sm:p-5 overflow-scroll text-menu dark:text-darkText">
    <div class="mt-6 flex border-b-2 border-inputBorder">
      <button class="tabs" :class="[type=='Unused' ? 'tabChoose' : '']"
                @click="chooseTab('Unused')">Unused Coupons</button>
       <button class="tabs" :class="[type=='Expired' ? 'tabChoose' : '']"
                @click="chooseTab('Expired')">Expired Coupons</button>
    </div>
    <div v-show="couponsList.length>0" class="mt-5 grid grid-cols-3 gap-4">
      <div
        v-for="(item,index) in couponsList"
        :key="index"
        class="coupon-card col-span-3 md:col-span-1 shadow-default bg-white dark:bg-darkMenu"
        :class="{ 'coupon-card-disabled': couponUnavailable(item) }"
        :aria-disabled="couponUnavailable(item) ? 'true' : 'false'"
      >
        <div class="pt-3 px-5 pb-5 text-sm relative">
          <div class="text-xl font-semibold">${{ item.type_value }} OFF</div>
          <div>For orders over ${{ item.min_price }}</div>
          <div v-if="couponUnavailable(item)" class="coupon-status">
            {{ couponUnavailableReason(item) }}
          </div>
          <div v-else-if="isCampaignCoupon(item)" class="coupon-status coupon-status-active">
            New user shipping coupon
          </div>
          <div class="flex items-center">
            <div>Code: {{ item.code }}</div>
            <img src="../../assets/copy.svg" class="ml-1 w-4 h-4 cursor-pointer" @click="copyCode(item.code)" alt="">
          </div>
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
    <div v-show="couponsList.length==0" class="mt-5 pb-12 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../assets/noCoupon.svg" class="md:w-96 md:h-96 w-40 h-40" alt="">
        <div class="text-base text-center font-semibold">No coupons</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCoupons
} from '@/api/user'
import { getOrderList as getFreightOrderList } from '@/api/order'
import { orderList as getProductOrderList } from '@/api/dropshipping'
import {
  isNewUserCouponUnavailable,
  isNewUserShippingCoupon,
  newUserCouponUnavailableReason,
  responseHasOrders,
} from '@/utils/newUserShippingCoupon'
export default {
  data() {
    return {
      type: 'Unused',
      couponsList: [],
      hasPlacedOrder: false,
      couponEligibilityLoading: true,
      couponEligibilityFailed: false,
      applies:['All Lines','Sea DDP','Air DDP','Parcel','Express','European Railway DDP','European Trucking'],
    }
  },
  created() {
    this.$emit('menu', 'Coupons')
  },
  mounted() {
    this.loadOrderEligibility()
    this.getList()
  },
  methods: {
    isCampaignCoupon(item) {
      return isNewUserShippingCoupon(item)
    },
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
    copyCode(code){
      navigator.clipboard.writeText(code).then(() => {
        // console.log(code)
      })
    },
    chooseTab(e){
      this.type = e
      this.getList(e)
    },
    getList(e){
      let status = 1
      if(e == 'Expired'){
        status = 2
      }
      getCoupons({
        status
      }).then((res)=>{
        let list = res.data
        for(let n=0;n<list.length;n++){
          const productType = list[n].product_type
          list[n].product_type = Array.isArray(productType)
            ? productType
            : String(productType || '').split(',').filter(Boolean)
        }
        this.couponsList = list
      })
    }
  },
}
</script>

<style lang="postcss" scoped>
.tabs {
  @apply -mb-2px py-1.5 px-2 mr-3 font-semibold border-b-2 border-inputBorder hover:border-orange;
}

.tabChoose {
  @apply border-orange;
}

.coupon-card {
  position: relative;
  transition: opacity 160ms ease, filter 160ms ease;
}

.coupon-card-disabled {
  filter: grayscale(1);
  opacity: 0.58;
}

.coupon-status {
  display: inline-flex;
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: #e5e7eb;
  color: #374151;
  font-size: 12px;
  font-weight: 600;
}

.coupon-status-active {
  background: #fff2ea;
  color: #b93808;
}
</style>
