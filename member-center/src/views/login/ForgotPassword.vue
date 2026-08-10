

<template>
  <div class="relative bg-lightMenu">
    <div class=""></div>
    <div class="w-screen min-h-screen px-3 z-10 flex items-center text-lightText relative">
      <notice-alerts class="top-14 lg:top-24 w-576"
                    v-show="alertShow"
                    :title="alertTitle"
                    :type="alertType"></notice-alerts>
      <div class="fixed top-0 left-0 w-screen h-topmenu bg-lightTop z-50 overflow-hidden">
        <div class="w-full h-full flex pl-6">
          <a class="flex items-center h-full" :href="'//' + globalWeb" target="_blank">
            <img src="../../assets/codropshipping.svg" class="h-20" alt="" />
          </a>
        </div>
      </div>
      <div class="max-w-1440 w-full mx-auto my-28">
        <div class="max-w-xl bg-white flex mx-auto rounded shadow-default">
          <div class="w-full sm:px-10 px-3.5 pt-8">
            <div class="title">
              <div class="text-lg font-bold">Forgot Password</div>
            </div>
            <div class="my-3.5">
              <div v-if="Email.reset_way == 1" key="email" class="mb-3">
                <div class="pb-2 flex justify-between">
                  <label class="text-15 text-loginLabel">Email</label>
                  <div @click="selectLogin(2)" class="text-sm text-blue-400 underline cursor-pointer">Login with Whatsapp</div>
                </div>
                <div>
                  <input v-model="Email.email"
                    v-on:keyup.enter="sendEmail()"
                    ref="email"
                    name="email"
                    class="input"
                    v-validate="'required|email'"
                    type="email"
                    placeholder="Enter your email" />
                  <div class="inputTips">{{ errors.first("email") }}</div>
                </div>
              </div>

              <div v-if="Email.reset_way == 2" key="phone" class="mb-3">
                <div class="pb-2 flex justify-between">
                  <label class="text-15 text-loginLabel"></label>
                  <div @click="selectLogin(1)" class="text-sm text-blue-400 underline cursor-pointer">Login with email</div>
                </div>
                <whatsappInput ref="whatsappInput" v-model="whatsapp" name="whatsapp" v-validate="'required|whatsapp'"></whatsappInput>
                <div class="inputTips">{{ errors.first("whatsapp") }}</div>
                <!-- 
                <div class="relative">
                  <input v-model="Email.mobile"
                    v-on:keyup.enter="sendEmail"
                    class="input"
                    v-validate="'required|phone'"
                    name="phone"
                    type="text"
                    placeholder="Enter your phone number" />
                  <div class="inputTips">{{ errors.first("phone") }}</div>
                </div> -->
              </div>
              <div class="mb-3">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Password</label>
                </div>
                <div>
                  <input v-model="Email.password"
                        v-on:keyup.enter="sendEmail"
                        ref="password"
                        v-validate="'required|password'"
                        name="password"
                        class="input"
                        type="password"
                        placeholder="Must be 6-18 charactor" />
                  <div class="inputTips">{{ errors.first("password") }}</div>
                </div>
              </div>
              <div class="mb-6">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Verification code</label>
                </div>
                <div class="flex">
                  <div class="w-full">
                    <input v-model="Email.verify_code"
                      v-on:keyup.enter="sendEmail"
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

              <div>
                <button class="loginbtn"
                        @click="sendEmail"
                        v-show="!showLoading">Log in</button>
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
              <router-link class="tips"
                          :to="{ name: 'login' }">Back to login</router-link>
            </div>
            <!-- <div class=" p-5 border-t border-gray-200 flex justify-center text-sm text-center">
              <span>Type in your email and we will send you instructions on how to reset your password.</span>
            </div> -->
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
} from '@/api/user'
export default {
  name: 'ForgotPassword',
  components: {
    NoticeAlerts,
    whatsappInput,
  },
  data() {
    return {
      whatsapp:'',
      alertShow: false, //弹窗是否显示
      alertTitle: '', //弹窗内容
      alertType: '', //弹窗类型，不传默认为err,可传success、warn
      showLoading: false,
      Email: {
        email: '',
        reset_way: 1,
        mobile: '',
        password: '',
        verify_code: '',
      },
      globalWeb: this.$globalWeb,
      showCode: true,
      codeNum: 60,
    }
  },
  methods: {
    async sendEmail() {
      const success = await this.$validator.validateAll()

      if (success) {
        this.showLoading = true
        this.alertShow = false
        const res = this.$refs.whatsappInput?.getInfo();
        try {
          let data = this.Email
          data = {...data, ...res}
          await this.$store.dispatch('forgotPasswords', data)
          setTimeout(() => {
            this.$router.push('login')
            this.showLoading = false
          }, 800)
        } catch (error) {
          //   setTimeout(() => {
          //     this.alertShow = false
          //     this.showLoading = false
          //   }, 2000)
          this.showLoading = false
          this.alertShow = true
          this.alertTitle = error.message
        }
      } else {
        // this.$refs.email.classList.value = 'inputErr'
      }
    },
    selectLogin(type){
      this.Email.reset_way = type
      if(type == 1){
        this.Email.mobile = ''
      }else{
        this.Email.email = ''
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
      const res = this.$refs.whatsappInput?.getInfo();
      if(res!=undefined){
        sendVerify({
          source: 4,
          scene: 3,
          send_way: this.Email.reset_way,
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
      }else{
        sendVerify({
          source: 4,
          scene: 3,
          send_way: this.Email.reset_way,
          email: this.Email.email,
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
      }
    },
  },
  mounted() {
    this.$refs.email.focus()
  },
  watch: {
    Email: {
      email() {
        const msg = this.errors.has('email')
        if (!msg) {
          this.$refs.email.classList.value = 'input'
        } else {
          this.$refs.email.classList.value = 'inputErr'
        }
      },
    },
  },
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
  @apply text-orange hover:underline text-sm pb-5;
}

.inputTips {
  @apply text-xs text-red-500 absolute;
}

.loading {
  @apply w-full px-2.5 py-3.5 mb-3.5 bg-orange justify-center rounded-md;
}

.loginBG {
  @apply fixed top-0 left-0 w-full h-full hidden sm:block z-10;
  background: url("../../assets/loginBG.webp") 50% 100% / cover no-repeat fixed;
}
</style>
