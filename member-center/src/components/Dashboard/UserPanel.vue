<template>
  <div class="userPanel">
    <div class="flex items-center w-full flex-shrink">
      <img class="w-16 h-16 lg:w-24 lg:h-24 mx-5 rounded-full"
           :src="head_portrait"
           alt="">
      <div class="w-full flex-shrink mr-5">
        <div class="flex items-center">
          <div class="text-xl font-semibold mr-5 cursor-default">{{userName}}</div>
          <div class="flex items-center px-3 py-0.5 rounded-full bg-gray-100">
            <img src="../../assets/level.svg"
                 class="w-4 h-4 mr-1"
                 alt="">
            <div class="text-sm">Level 4</div>
          </div>
        </div>
        <div class="relative my-4">
          <div class="rounded-full w-full h-1 bg-gray-300"></div>
          <div class="absolute top-0 left-0 rounded-full w-3/5 h-1 bg-yellow-500"></div>
          <div class="absolute w-full -top-2.5 left-0 flex justify-between">
            <div class="levelGift">
              <img src="../../assets/crown.svg"
                   class="w-4 h-4"
                   alt="">
            </div>
            <div class="levelGift">
              <img src="../../assets/crown.svg"
                   class="w-4 h-4"
                   alt="">
            </div>
            <div class="levelGift">
              <img src="../../assets/crown.svg"
                   class="w-4 h-4"
                   alt="">
            </div>
            <div class="levelGift">
              <img src="../../assets/crown.svg"
                   class="w-4 h-4"
                   alt="">
            </div>
            <div class="levelGift1">
              <img src="../../assets/crown1.svg"
                   class="w-4 h-4"
                   alt="">
            </div>
            <div class="levelGift1">
              <img src="../../assets/crown1.svg"
                   class="w-4 h-4"
                   alt="">
            </div>
            <div class="levelGift1">
              <img src="../../assets/crown1.svg"
                   class="w-4 h-4"
                   alt="">
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-xs md:text-sm text-gray-400">You still need 1,456 points to upgrade to the next level.</div>
          <img src="../../assets/tips.svg"
               class="w-4 h-4 ml-1 cursor-pointer"
               @mouseenter="onShowTip($event)"
               @mouseleave="onHideTip"
               alt="">
        </div>
      </div>
    </div>
    <div class="mx-5 text-sm">
      <div class="flex items-center my-2.5">
        <div class="flex items-center w-24">
          <img src="../../assets/wallet.svg"
               class="w-5 h-5 mr-1"
               alt="">
          <div>Balance:</div>
        </div>
        <div class="w-28 mr-3">$1,256.00</div>
        <div class="flex items-center w-20 viewAll">
          <div class="mr-1">Top Up</div>>
          <!-- <img src="" class="w-4 h-4" alt=""> -->
        </div>
      </div>
      <div class="flex items-center my-2.5">
        <div class="flex items-center w-24">
          <img src="../../assets/coupons.svg"
               class="w-5 h-5 mr-1"
               alt="">
          <div>Coupons:</div>
        </div>
        <div class="w-28 mr-3">10</div>
        <div class="flex items-center viewAll">
          <div class="mr-1">To Use</div>>
          <!-- <img src="" class="w-4 h-4" alt=""> -->
        </div>
      </div>
      <div class="flex items-center my-2.5">
        <div class="flex items-center w-24">
          <img src="../../assets/points.svg"
               class="w-5 h-5 mr-1"
               alt="">
          <div>Points:</div>
        </div>
        <div>15,153</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPanel",
  props: {
    // freightList: {},
  },
  data() {
    return {
      // list: this.freightList,
      userName: '',
      content: '123',
      head_portrait: '',
      target: '',
      leftMenuOpen: this.leftMenu,
    }
  },
  mounted() {
    let dt = new Date()
    const first_name = JSON.parse(localStorage.getItem('first_name'))
    const last_name = JSON.parse(localStorage.getItem('last_name'))
    const userId = JSON.parse(localStorage.getItem('userId'))
    const headImg = JSON.parse(localStorage.getItem('userImg'))
    this.head_portrait = headImg + userId + '_120_120.png?v=' + dt.getTime()
    this.userName = first_name + ' ' + last_name
  },
  methods: {
    onShowTip(e) {
      // console.log(e.target.getBoundingClientRect(),window.pageYOffset,this.$refs.tooltip.offsetHeight)
      this.target = e.target
      this.$refs.tooltip.show(e.target, this.leftMenuOpen)
    },
    onHideTip() {
      this.$refs.tooltip.onHide()
    },
  },
};
</script>

<style lang="postcss" scoped>
.userPanel{
  @apply py-9 flex flex-col xl:flex-row items-start xl:items-center bg-white dark:bg-darkMenu rounded-md shadow-default;
}
</style>
