<template>
  <div class="relative bg-lightMenu">
    <div class=""></div>
    <div class="w-screen min-h-screen px-3 z-10 flex items-center text-lightText relative">
      <notice-alerts class="top-14 lg:top-24 w-576"
                    v-show="alertShow"
                    :title="alertTitle"
                    :type="alertType"></notice-alerts>
      <loading v-show="loading"></loading>
      <div class="fixed top-0 left-0 w-screen h-topmenu bg-lightTop z-50 overflow-hidden">
        <div class="w-full h-full flex pl-6">
          <a class="flex items-center h-full" :href="'//' +globalWeb" target="_blank">
            <img src="../../assets/codropshipping.svg" class="h-20" alt="" />
          </a>
        </div>
      </div>
      <div class="max-w-1440 w-full mx-auto my-28" v-show="!loading">
        <div class="max-w-xl bg-white flex mx-auto rounded shadow-default">
          <div class="w-full sm:px-10 px-3.5 pt-8">
            <div class="title">
              <div class="text-lg font-bold">Sign up with Google</div>
            </div>

            <div class="my-3.5">
              <div class="mb-3">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Email</label>
                </div>
                <div class="relative">
                  <input v-model="ruleForm.email"
                        class="input inputDisabled"
                        type="email"
                        disabled/>
                </div>
              </div>
              <div class="mb-3">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Password</label>
                </div>
                <div>
                  <input v-model="ruleForm.password"
                        v-on:keyup.enter="signUp"
                        ref="password"
                        v-validate="'required|password'"
                        name="password"
                        class="input"
                        type="password"
                        placeholder="Must be 6 charactor or more" />
                  <div class="inputTips">{{ errors.first("password") }}</div>
                </div>
              </div>
              <div class="mb-3">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Confirm Password</label>
                </div>
                <div>
                  <input v-model="ruleForm.confirm_password"
                        v-on:keyup.enter="signUp"
                        ref="confirm_password"
                        name="confirmPassword"
                        v-validate="'required|confirmPassword'"
                        class="input"
                        type="password"
                        placeholder="Please enter your password again" />
                  <div class="inputTips"
                      v-show="!msgpassword">{{errors.first("confirmPassword")}}</div>
                  <div class="inputTips"
                      v-show="msgpassword">{{msgpassword}}</div>
                </div>
              </div>
              <div class="mb-6">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Invitation Code - Optional</label>
                </div>
                <div>
                  <input v-model="ruleForm.invitation_code"
                        v-on:keyup.enter="signUp"
                        ref="invitation_code"
                        class="input"
                        type="text"/>
                </div>
              </div>

              <div>
                <button class="loginbtn"
                        @click.prevent="userLogin"
                        v-show="!showLoading">Sign up</button>
                <button class="loading"
                        v-show="showLoading">
                  <svg class="animate-spin mx-auto my-0.5 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                    <circle class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"></circle>
                    <path class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NoticeAlerts from '@/components/NoticeAlerts'
import Loading from '@/components/Loading'
import {
  signUpGoogle,
  setPasswordGoogle,
  createCoupons,
  reqUserImg
} from '@/api/user'
import uaParser from 'ua-parser-js'
import {
  clearPendingNewUserCoupon,
  hasSubmittedCampaignClaim,
  markCampaignClaimSubmitted,
  readPendingNewUserCoupon,
} from '@/utils/newUserShippingCoupon'
export default {
  name: 'Login',
  components: {
    NoticeAlerts,
    Loading,
  },
  data() {
    return {
      alertShow: false,
      alertTitle: '',
      alertType: '',
      showLoading: false,
      ruleForm: {
        email: '',
        password: '',
        confirm_password: '',
        invitation_code: '',
      },
      msgpassword: '',
      id: null,
      loading: true,
      globalWeb: this.$globalWeb,
    }
  },

  methods: {
    async claimPendingCampaignCoupon() {
      const pendingCoupon = readPendingNewUserCoupon()
      const user = this.$store.state.user.userInfo || {}
      if (!pendingCoupon || hasSubmittedCampaignClaim(user.id)) return
      const response = await createCoupons(pendingCoupon)
      if (response && response.code === 0) {
        markCampaignClaimSubmitted(user.id, response.data)
        clearPendingNewUserCoupon()
      }
    },
    async userLogin() {
      const success = await this.$validator.validateAll()
      this.msgpassword = ''
      if (success) {
        if (this.ruleForm.password == this.ruleForm.confirm_password) {
          this.showLoading = true
          // console.log(this.ruleForm)
          let user = {
            id: this.id,
            password: this.ruleForm.password,
            invitation_code: this.ruleForm.invitation_code
          }
          setPasswordGoogle(user).then(async (res) => {
            if (res.code == 0) {
              await this.$store.dispatch('googleEnter', res)
              await this.claimPendingCampaignCoupon()
              
              // console.log('用户信息', this.$store.state.user.userInfo)
              localStorage.setItem(
                'userInfo',
                JSON.stringify(this.$store.state.user.userInfo)
              )
              localStorage.setItem(
                'userId',
                JSON.stringify(this.$store.state.user.userInfo.id)
              )
              localStorage.setItem(
                'userImg',
                JSON.stringify(this.$store.state.user.userInfo.img)
              )
              localStorage.setItem(
                'first_name',
                JSON.stringify(this.$store.state.user.userInfo.first_name)
              )
              localStorage.setItem(
                'last_name',
                JSON.stringify(this.$store.state.user.userInfo.last_name)
              )
              // console.log('token', this.$store.state.user.token)
              this.loading = true
              setTimeout(() => {
                reqUserImg().then((req)=>{})
                this.$router.push('/main/booking')
              }, 1500)
            }
            // console.log(res)
          })
        } else {
          this.msgpassword = 'The passwords entered twice are different'
          this.showLoading = false
        }
      } else {
      }
    },
    async googleEnter(e){
      await this.$store.dispatch('googleLogin', e)
      // console.log('用户信息', this.$store.state.user.userInfo)
      localStorage.setItem(
        'userInfo',
        JSON.stringify(this.$store.state.user.userInfo)
      )
      localStorage.setItem(
        'userId',
        JSON.stringify(this.$store.state.user.userInfo.id)
      )
      localStorage.setItem(
        'userImg',
        JSON.stringify(this.$store.state.user.userInfo.img)
      )
      localStorage.setItem(
        'first_name',
        JSON.stringify(this.$store.state.user.userInfo.first_name)
      )
      localStorage.setItem(
        'last_name',
        JSON.stringify(this.$store.state.user.userInfo.last_name)
      )
      // console.log('token', this.$store.state.user.token)
      setTimeout(() => {
        this.$router.push('/main/booking')
      }, 1500)
    },
    googleLogin(e){
      let that = this
      signUpGoogle(e).then((res) => {
        // console.log(res)
        that.id = res.data.id
        if(res.data.token){
          that.googleEnter(e)
        }else{
          //set password
          that.ruleForm.email = res.data.email
          setTimeout(() => {
            that.loading = false
          }, 800)
        }
      })
    }
  },
  created() {
    let that = this
    if(localStorage.getItem('invitation_code') === 'undefined'){
      that.ruleForm.invitation_code = ''
    }else{
      that.ruleForm.invitation_code = localStorage.getItem('invitation_code')
    }
    const ua = uaParser(navigator.userAgent)
    let code = that.$route.query.code
    let a = {
      code: code,
      browser: ua.browser.name,
      sys: ua.os.name + ua.os.version,
      agent: ua.ua,
      machine: window.screen.width + '*' + window.screen.height,
      language: window.navigator.language,
      invitation_code: that.ruleForm.invitation_code,
    }
    that.googleLogin(a)
  },
  mounted(){

  },
  watch: {},
}
</script>

<style lang="postcss" scoped>
.title {
  @apply w-full pb-3 text-center;
}

.loginbtn {
  @apply w-full px-2.5 py-3.5 mb-3.5 text-white bg-orange hover:bg-orange1 rounded-md font-semibold border-0 cursor-pointer;
}

.tips {
  @apply text-orange hover:underline;
}

.inputTips {
  @apply text-xs text-red-500 absolute;
}

.loading {
  @apply w-full px-2.5 py-3.5 mb-3.5 bg-orange justify-center rounded-md;
}

.inputDisabled {
  @apply bg-gray-300 !important;
}

.loginBG {
  @apply fixed top-0 left-0 w-full h-full hidden sm:block z-10;
  background: url("../../assets/loginBG.webp") 50% 100% / cover no-repeat fixed;
}
</style>
