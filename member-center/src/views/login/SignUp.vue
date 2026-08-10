<template>
  <div class="relative bg-lightMenu">
    <div class="loginBG">
      <img src="../../assets/loginIcon.png" class="w-96 mb-56 mr-72" alt="">
    </div>
    <div class="w-screen min-h-screen px-3 z-10 flex items-center text-lightText relative">
      <notice-alerts class="top-14 lg:top-24 w-576"
                    v-show="alertShow"
                    :title="alertTitle"
                    :type="alertType"></notice-alerts>
      <div class="fixed top-0 left-0 w-screen h-topmenu bg-lightTop z-50 overflow-hidden">
        <div class="w-full h-full flex pl-6">
          <a class="flex items-center h-full" :href="'//' +globalWeb" target="_blank">
            <img src="../../assets/codropshipping.svg" class="h-20" alt="" />
          </a>
        </div>
      </div>
      <div class="max-w-1440 w-full mx-auto my-28 flex justify-center relative">
        <div v-if="codeTips" class="absolute left-0 p-2.5 max-w-416 bg-white rounded shadow-default text-sm"
          >Dear customer, if you haven't received the verification code within 30 seconds, please check your network connection or your spam folder.</div>
        <div class="max-w-xl w-full bg-white flex rounded shadow-default">
          <div class="w-full sm:px-10 px-3.5 pt-8">
            <div class="title">
              <div class="text-lg font-bold">Create your account</div>
            </div>
            <div class="my-3.5">

              <div v-if="signUpData.register_way == 1" key="email" class="mb-3">
                <div class="pb-2 flex justify-between">
                  <label class="text-15 text-loginLabel">Email</label>
                  <div @click="selectLogin(5)" class="text-sm text-blue-400 underline cursor-pointer">Sign up with Whatsapp</div>
                </div>
                <div>
                  <input v-model="signUpData.email"
                    v-on:keyup.enter="signUp"
                    ref="email"
                    v-validate="'required|email'"
                    name="email"
                    class="input"
                    type="email"
                    placeholder="Enter your email" />
                  <div class="inputTips">{{ errors.first("email") }}</div>
                </div>
              </div>

              <div v-if="signUpData.register_way == 5" key="phone" class="mb-3">
                <div class="pb-2 flex justify-between">
                  <label class="text-15 text-loginLabel"></label>
                  <div @click="selectLogin(1)" class="text-sm text-blue-400 underline cursor-pointer">Sign up with Email</div>
                </div>
                <whatsappInput ref="whatsappInput" v-model="whatsapp" name="whatsapp" v-validate="'required|whatsapp'"></whatsappInput>
                <div class="inputTips">{{ errors.first("whatsapp") }}</div>
              </div>

              <div class="mb-3">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Password</label>
                </div>
                <div>
                  <input v-model="signUpData.password"
                        v-on:keyup.enter="signUp"
                        ref="password"
                        v-validate="'required|password'"
                        name="password"
                        class="input"
                        type="password"
                        placeholder="Must be 6-18 charactor" />
                  <div class="inputTips">{{ errors.first("password") }}</div>
                </div>
              </div>
              <div class="mb-3">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Confirm Password</label>
                </div>
                <div>
                  <input v-model="signUpData.confirm_password"
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

              <div class="mb-3">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Verification code</label>
                </div>
                <div class="flex">
                  <div class="w-full">
                    <input v-model="signUpData.verify_code"
                      v-on:keyup.enter="signUp"
                      class="input"
                      name="authCode"
                      type="text"
                      v-validate="'required|authCode'"
                      placeholder="Enter verification code" />
                    <div class="inputTips">{{ errors.first("authCode") }}</div>
                  </div>
                  <button v-show="showCode" @click="sendVerifyCode()"
                    class="ml-2.5 flex-shrink-0 rounded-md bg-orange hover:bg-orange1 text-white"
                    style="width: 86px;">
                    Send
                  </button>
                  <button v-show="!showCode"
                    class="ml-2.5 flex-shrink-0 rounded-md bg-gray-400 text-white cursor-default"
                    style="width: 86px;">
                    {{ codeNum }}
                  </button>
                </div>
              </div>

              <div class="mb-6">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Referral Code - Optional</label>
                </div>
                <div>
                  <input class="input" v-model="invitation_code"
                    v-on:keyup.enter="signUp" type="text" placeholder="Referral Code">
                </div>
              </div>
              <div class="mb-6" v-if="signUpData.register_way != 5">
                <whatsappInput ref="whatsappInput" v-model="whatsapp" name="whatsapp" v-validate="'required|whatsapp'"></whatsappInput>
                <div class="inputTips">{{ errors.first("whatsapp") }}</div>
              </div>
              <div>
                <button class="loginbtn"
                        @click="signUp"
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
            <!-- <div class="pt-7 border-t border-gray-200">
              <div class="signUpGoogle" @click="signUpGoogle">
                <img src="../../assets/google.svg"
                    class="w-5 mr-4"
                    alt="" />
                <div>Continue with Google</div>
              </div>
            </div> -->
            <div class="pt-5 pb-3 border-t border-gray-200 flex justify-center text-sm">
              <span>Do You Have An Account?</span>&nbsp;
              <div @click="tologin" class="tips cursor-pointer">Login Now</div>
            </div>
            <div class="pb-5 text-sm text-center text-signUpTip">
              By creating your account, you agree to the<br />
              <a href="https://www.cargosoon.com/terms" target="_blank" class="underline mx-1">Terms of Service</a>
              and
              <a href="https://www.cargosoon.com/privacy" target="_blank" class="underline mx-1">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoticeAlerts from '@/components/NoticeAlerts.vue'
import whatsappInput from "@/components/whatsapp-input.vue";
import {
  sendVerify,
  createCoupons,
} from '@/api/user'
import {
  bindStore,
} from '@/api/dropshipping'
import {
  clearPendingNewUserCoupon,
  hasSubmittedCampaignClaim,
  markCampaignClaimSubmitted,
  readPendingNewUserCoupon,
} from '@/utils/newUserShippingCoupon'
export default {
  components: {
    NoticeAlerts,
    whatsappInput
  },
  data() {
    return {
      whatsapp:'',
      alertShow: false, //弹窗是否显示
      alertTitle: '', //弹窗内容
      alertType: '', //弹窗类型，不传默认为err,可传success、warn
      showLoading: false,
      msgpassword: '',
      signUpData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        source: 4,
        register_way: 1,
        mobile: '',
        verify_code: '',
      },
      invitation_code: '',
      whatsapp: '',
      globalWeb: this.$globalWeb,
      showCode: true,
      codeNum: 60,
      isShopiy: false,
      store_id: '',
      codeTips: false,
    }
  },
  methods: {
    async claimPendingCampaignCoupon() {
      const pendingCoupon = readPendingNewUserCoupon()
      const user = this.$store.state.user.userInfo || {}
      if (!pendingCoupon || hasSubmittedCampaignClaim(user.id)) return

      try {
        const response = await createCoupons(pendingCoupon)
        if (response && response.code === 0) {
          markCampaignClaimSubmitted(user.id, response.data)
          clearPendingNewUserCoupon()
        } else if (response && /already|claimed|received/i.test(response.msg || '')) {
          markCampaignClaimSubmitted(user.id, response.data)
          clearPendingNewUserCoupon()
        }
      } catch (error) {
        sessionStorage.setItem('coddrop_coupon_claim_error', String(error && error.message || error))
      }
    },
    async signUp() {
      const success = await this.$validator.validateAll()
      if (success) {
        if (this.signUpData.password == this.signUpData.confirm_password) {
          this.showLoading = true
          this.msgpassword = ''
          this.alertShow = false
          try {
            let data = {
              invitation_code: this.invitation_code,
              whatsapp: this.whatsapp,
            }
            const res = this.$refs.whatsappInput?.getInfo();
            data = {...data, ...this.signUpData, ...res}
            // localStorage.setItem('registerInfo', JSON.stringify(data))
            await this.$store.dispatch('userRegisters', data)
            await this.claimPendingCampaignCoupon()
            setTimeout(() => {
              // this.$router.push('verifyEmail')
              if(this.isShopiy){
                bindStore({
                  store_id: this.store_id
                }).then((res)=>{
                  this.$router.push({
                    path: '/ShopifyVerifyResult',
                    query: {
                      from: res.data.from,
                      result: res.data.result
                    },
                  })
                })
              }else{
                window.open('//' + this.globalWeb,'_self')
              }
              this.showLoading = false
            }, 800)
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
            localStorage.setItem(
              'customer_manage',
              JSON.stringify(this.$store.state.user.userInfo.manage)
            )
          } catch (error) {
            // setTimeout(() => {
            //   this.showLoading = false
            // }, 2000)
            console.log(error);
            
            this.showLoading = false
            this.alertShow = true
            this.alertTitle = error.message
          }
        } else {
          this.msgpassword = 'The passwords entered twice are different'
        }
      } else {
      }
    },
    signUpGoogle(){
      window.location.href = '//' +this.globalWeb+'/api/google/googleLogin'
    },
    selectLogin(type){
      this.signUpData.register_way = type
      if(type == 1){
        this.signUpData.mobile = ''
      }else{
        this.signUpData.email = ''
      }
      setTimeout(()=>{
        this.resetValidate()
      },1)
    },
    resetValidate(){
      this.$validator.reset()
    },
    sendVerifyCode(){
      let timer = setInterval(() => {
        this.codeNum -= 1
        if (this.codeNum <= 0) {
          clearInterval(timer)
          this.showCode = true
          this.codeNum = 60
        }
      }, 1000)
      this.showCode = false
      // if(){
      let send_way = 1
      if(this.signUpData.register_way == 5){
        send_way = 2
      }
      const res = this.$refs.whatsappInput?.getInfo();
        sendVerify({
          source: 4,
          scene: 1,
          send_way,
          email: this.signUpData.email,
          mobile: this.signUpData.mobile,
          whatsapp: res.whatsapp,
          code_no: res.code_no,
        }).then((res)=>{
          if(res.code == -1){
            this.$message({
              message: res.msg,
              offset: 70
            })
            clearInterval(timer)
            this.showCode = true
            this.codeNum = 60
          }
        })
      // }
      setTimeout(()=>{
        this.codeTips = true
      },3000)
    },
    tologin(){
      if(this.isShopiy){
        this.$router.push({
          path: '/login',
          query: {
            store_id: this.store_id,
            from: 'shopifyAuth'
          },
        })
      }else{
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    this.selectLogin(5)
    this.$refs.email.focus()
    if(localStorage.getItem('invitation_code') === 'undefined'){
      this.invitation_code = ''
    }else{
      this.invitation_code = localStorage.getItem('invitation_code')
    }
    if(this.$route.query.store_id && this.$route.query.from=='shopifyAuth'){
      this.isShopiy = true;
      this.store_id = this.$route.query.store_id
    }
  },
  watch: {
    password() {
      const msg = this.console.errors.has('password')
      if (!msg) {
        this.$refs.password.classList.value = 'input'
      } else {
        this.$refs.password.classList.value = 'inputErr'
      }
    },
    confirm_password() {
      const msg = this.console.errors.has('confirm_password')
      if (!msg) {
        this.$refs.confirm_password.classList.value = 'input'
      } else {
        this.$refs.confirm_password.classList.value = 'inputErr'
      }
    },
    email() {
      const msg = this.errors.has('email')
      // console.log(msg)
      if (!msg) {
        this.$refs.email.classList.value = 'input'
      } else {
        this.$refs.email.classList.value = 'inputErr'
      }
    },
    firstName() {
      const msg = this.errors.has('firstName')
      // console.log(msg)
      if (!msg) {
        this.$refs.firstName.classList.value = 'input'
      } else {
        this.$refs.firstName.classList.value = 'inputErr'
      }
    },
    lastName() {
      const msg = this.errors.has('lastName')
      // console.log(msg)
      if (!msg) {
        this.$refs.lastName.classList.value = 'input'
      } else {
        this.$refs.lastName.classList.value = 'inputErr'
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.code-box {
  border: 1px solid #b5bac4;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: 0.25rem;
  border-width: 1px;
  width: 100px;
  border-right: 0;
  border-top-right-radius: 0rem;
  border-bottom-right-radius: 0rem;
}
.title {
  @apply w-full pb-3 text-center;
}

.loginbtn {
  @apply w-full px-2.5 py-3.5 mb-3.5 text-white bg-orange hover:bg-orange1 rounded-md font-semibold border-0 cursor-pointer;
}

.tips {
  @apply text-orange hover:underline;
}

.signUpGoogle {
  @apply w-full px-6 py-3 rounded-md text-sm cursor-pointer flex justify-center items-center border border-inputBorder hover:bg-inputGoogle;
}

.inputTips {
  @apply text-xs text-red-500 absolute;
}

.loading {
  @apply w-full px-2.5 py-3.5 mb-3.5 bg-orange justify-center rounded-md;
}

.loginBG {
  @apply fixed top-0 left-0 w-full h-full hidden sm:flex z-10 justify-center items-end;
  background: url("../../assets/loginBG1.webp") 50% 100% / cover no-repeat fixed;
}
</style>
