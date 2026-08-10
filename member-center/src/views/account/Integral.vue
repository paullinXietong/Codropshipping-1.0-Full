<template>
  <div class="w-full max-w-1440 m-auto h-full p-3 sm:p-5 overflow-scroll text-menu dark:text-darkText">
    <hover-tips ref="tooltip"
                :target="target"
                :maxWidth="240">
      <div v-if="content">{{ content }}</div>
    </hover-tips>
    <div class="user">
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
              <div class="text-sm">Level {{ userData.level }}</div>
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
          <div class="w-28 mr-3">${{ userData.balance }}</div>
          <router-link to="/account/wallet">
            <div class="flex items-center w-20 viewAll">
              <div class="mr-1">Top Up</div>>
              <!-- <img src="" class="w-4 h-4" alt=""> -->
            </div>
          </router-link>
        </div>
        <div class="flex items-center my-2.5">
          <div class="flex items-center w-24">
            <img src="../../assets/coupons.svg"
                  class="w-5 h-5 mr-1"
                  alt="">
            <div>Coupons:</div>
          </div>
          <div class="w-28 mr-3">{{ userData.coupons }}</div>
          <router-link to="/account/coupons">
            <div class="flex items-center viewAll">
              <div class="mr-1">To Use</div>>
              <!-- <img src="" class="w-4 h-4" alt=""> -->
            </div>
          </router-link>
        </div>
        <div class="flex items-center my-2.5">
          <div class="flex items-center w-24">
            <img src="../../assets/points.svg"
                  class="w-5 h-5 mr-1"
                  alt="">
            <div>Points:</div>
          </div>
          <div>{{ userData.points }}</div>
        </div>
      </div>
    </div>
    <div class="mt-10 hidden">
      <div class="text-lg mb-1">Integral Record</div>
      <div class="hidden lg:block p-5 bg-white dark:bg-darkMenu shadow-default rounded-md">
        <div class="pb-3 border-b border-gray-300 dark:border-darkLine flex text-lg">
          <div class="flex-shrink-0 w-64">Date</div>
          <div class="flex-shrink-0 w-48">Points</div>
          <div class="w-full">Details</div>
        </div>
        <div v-for="(item, index) in recordList" :key="index" class="py-3 border-b border-gray-300 dark:border-darkLine flex">
          <div class="flex-shrink-0 w-64">{{ item.date }}</div>
          <div class="flex-shrink-0 w-48">{{ item.points }}</div>
          <div class="w-full">{{ item.details }}</div>
        </div>
      </div>
      <div class="block lg:hidden">
        <div v-for="(n, i) in recordList" :key="i" class="mb-2 px-5 py-3 bg-white dark:bg-darkMenu shadow-default rounded-md">
          <div class="flex justify-between">
            <div class="font-semibold">{{ n.points }}</div>
            <div class="text-13 text-gray-500">{{ n.date }}</div>
          </div>
          <div class="mt-1 text-sm">{{ n.details }}</div>
        </div>
      </div>
    </div>
    <div class="mt-10 pb-12 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../assets/noPoint.svg" class="md:w-96 md:h-96 w-40 h-40" alt="">
        <div class="text-base text-center font-semibold">No points record</div>
      </div>
    </div>
  </div>
</template>

<script>
import HoverTips from '@/components/Dashboard/HoverTips'
import {
  getDashboard
} from '@/api/user'
export default {
  components: {
    HoverTips,
  },
  props: ['leftMenu'],
  watch: {
    leftMenu: function (val) {
      this.leftMenuOpen = val
    },
  },
  data() {
    return {
      userName: '',
      content: '123',
      head_portrait: '',
      target: '',
      leftMenuOpen: this.leftMenu,
      recordList:[
        {
          date: '2022-08-22 16:00:00',
          points: '+1500',
          details: 'New registration reward'
        },
        {
          date: '2022-08-22 16:00:00',
          points: '+800',
          details: 'New registration reward'
        },
        {
          date: '2022-08-22 16:00:00',
          points: '+1000',
          details: 'New registration reward'
        },
      ],
      userData: {
        balance: 0,
        coupons: 0,
        points: 0,
        level: 1,
      },
    }
  },
  created() {
    this.$emit('menu', 'Integral')
  },
  mounted() {
    let dt = new Date()
    const first_name = JSON.parse(localStorage.getItem('first_name'))
    const last_name = JSON.parse(localStorage.getItem('last_name'))
    const userId = JSON.parse(localStorage.getItem('userId'))
    const headImg = JSON.parse(localStorage.getItem('userImg'))
    this.head_portrait = headImg + userId + '_120_120.png?v=' + dt.getTime()
    this.userName = first_name + ' ' + last_name
    getDashboard().then((res)=>{
      this.userData = res.data.userData
    })
  },
  methods: {
    onShowTip(e) {
      this.target = e.target
      this.$refs.tooltip.show(e.target, this.leftMenuOpen)
    },
    onHideTip() {
      this.$refs.tooltip.onHide()
    },
  },
}
</script>

<style lang="postcss" scoped>
.user {
  @apply py-5 sm:py-9 flex flex-col xl:flex-row items-start xl:items-center bg-white dark:bg-darkMenu rounded-md shadow-default;
}

.viewAll {
  @apply text-blue-500 hover:underline cursor-pointer;
}

.levelGift {
  @apply w-6 h-6 flex justify-center items-center bg-yellow-500 rounded-full cursor-pointer;
}

.levelGift1 {
  @apply w-6 h-6 flex justify-center items-center bg-gray-300 rounded-full cursor-pointer;
}

.tip {
  display: inline;
  position: relative;
}

.tip:hover {
  text-decoration: none;
}

.tip:hover:before {
  border: solid;
  border-color: #333 transparent;
  border-width: 0.6rem 0.6rem 0 0.6rem;
  bottom: 2rem;
  content: '';
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  position: absolute;
  z-index: 99;
}

.tip:hover:after {
  background-color: #333;
  border-radius: 0.3rem;
  bottom: 2.5rem;
  color: #fff;
  content: attr(data-hover);
  font-size: 1.4rem;
  line-height: 2rem;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  padding: 0.5rem 1.5rem;
  position: absolute;
  z-index: 98;
  width: auto;
  white-space: nowrap;
  text-align: left;
}
</style>