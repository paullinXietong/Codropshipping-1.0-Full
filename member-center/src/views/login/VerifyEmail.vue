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
          <a class="flex items-center h-full" :href="'//' +globalWeb" target="_blank">
            <img src="../../assets/codropshipping.svg" class="h-20" alt="" />
          </a>
        </div>
      </div>
      <div class="max-w-1440 w-full mx-auto my-28">
        <div class="max-w-xl bg-white flex mx-auto rounded shadow-default">
          <div class="w-full sm:px-10 px-3.5 pt-8">
            <div class="text-lg font-bold text-center">
              Please verify your email
            </div>
            <div class="text-center max-w-sm mt-8 mx-auto">
              To complete account setup, please verify: Enter the security code
              that has been sent to your email address and then click the button
              below. Remember to check your spam folder!
            </div>
            <!--  -->
            <!-- <div class="flex justify-between my-16 "
                v-on:keyup.enter="getCode()">
              <input v-for="(item,index) in inputList"
                    ref="input"
                    :key="index"
                    v-model="item.val"
                    class="valInput"
                    @paste="paste"
                    @keyup="inputNextFocus($event,index)"
                    @keydown="cancelValue(index)">
            </div> -->

            <!--  -->
            <div class="flex justify-between my-16"
                @keyup="fnCheckCodeKeyup"
                @keydown="fnCheckCodeKeydown"
                @paste="fnCheckCodeKeyPaste"
                @input="fnCheckCodeInputEvent">
              <input class="valInput"
                    max="9"
                    min="0"
                    maxlength="1"
                    data-index="0"
                    v-model.trim.number="aCheckCodeInputComputed[0]"
                    ref="firstInputRef"
                    :class="{'g-code-input_color': aCheckCodeInputComputed[0] !== ''}" />
              <input class="valInput"
                    :class="{'g-code-input_color': aCheckCodeInputComputed[1] !== ''}"
                    id="validation2"
                    max="9"
                    min="0"
                    maxlength="1"
                    data-index="1"
                    v-model.trim.number="aCheckCodeInputComputed[1]" />
              <input class="valInput"
                    :class="{'g-code-input_color': aCheckCodeInputComputed[2] !== ''}"
                    max="9"
                    min="0"
                    maxlength="1"
                    data-index="2"
                    v-model.trim.number="aCheckCodeInputComputed[2]" />
              <input class="valInput"
                    :class="{'g-code-input_color': aCheckCodeInputComputed[3] !== ''}"
                    max="9"
                    min="0"
                    maxlength="1"
                    data-index="3"
                    v-model.trim.number="aCheckCodeInputComputed[3]" />
              <input class="valInput"
                    :class="{'g-code-input_color': aCheckCodeInputComputed[4] !== ''}"
                    max="9"
                    min="0"
                    maxlength="1"
                    data-index="4"
                    v-model.trim.number="aCheckCodeInputComputed[4]" />
              <input class="valInput"
                    :class="{'g-code-input_color': aCheckCodeInputComputed[5] !== ''}"
                    max="9"
                    min="0"
                    maxlength="1"
                    data-index="5"
                    v-model.trim.number="aCheckCodeInputComputed[5]" />

            </div>
            <!-- <div class="inputTips"
                v-show="msgpassword">{{msgpassword}}</div> -->

            <div>
              <button class="signupbtn"
                      @click.prevent="getCode"
                      v-show="!showLoading">verify email</button>
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
            <div class="text-center max-w-sm mt-8 mx-auto text-15">
              Didn't receive the email? Check your spam folder.
              <div class="flex justify-center">
                <div class="underline cursor-pointer"
                    @click="resend">Re-send</div>
                <div class="mx-2">email or</div>
                <router-link class="underline cursor-pointer"
                            :to="{ name: 'signUp' }"
                            replace>go back</router-link>
              </div>
            </div>
            <div class="p-5 flex justify-center text-sm">
              <span>Do You Have An Account?</span>&nbsp;
              <router-link class="tips"
                          :to="{ name: 'login' }"
                          replace>Login Now</router-link>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NoticeAlerts from '@/components/NoticeAlerts.vue'
import {
  createCoupons
} from '@/api/user'
import {
  clearPendingNewUserCoupon,
  markCampaignClaimSubmitted,
  readPendingNewUserCoupon,
} from '@/utils/newUserShippingCoupon'
export default {
  name: 'VerifyEmail',
  components: {
    NoticeAlerts,
  },
  data() {
    return {
      alertShow: false,
      alertTitle: '',
      alertType: 'err',
      showLoading: false,
      aCheckCodeInput: ['', '', '', '', '', ''], // 存储输入验证码内容
      aCheckCodePasteResult: [], // 粘贴的验证码
      globalWeb: this.$globalWeb,
    }
  },
  mounted() {
    this.$refs.firstInputRef.focus()
  },
  computed: {
    aCheckCodeInputComputed() {
      if (this.aCheckCodePasteResult.length === 6) {
        return this.aCheckCodePasteResult
      } else if (
        this.aCheckCodeInput &&
        Array.isArray(this.aCheckCodeInput) &&
        this.aCheckCodeInput.length === 6
      ) {
        return this.aCheckCodeInput
      } else if (/^\d{6}$/.test(this.aCheckCodeInput.toString())) {
        return this.aCheckCodeInput.toString().split('')
      } else {
        return new Array(6)
      }
    },
  },
  methods: {
    async resend() {
      try {
        var restoredSession = JSON.parse(localStorage.getItem('registerInfo'))
        await this.$store.dispatch('userRegister', restoredSession)

        this.alertShow = true
        this.alertType = 'success'
        this.alertTitle = 'Resend succeeded'
        // console.log('this.alertType', this.alertType)
      } catch (error) {
        // this.alertShow = true
        // this.alertTitle = 'Failed to resend'
        // console.log(error.message)
      }
    },
    // 输入验证码，更新验证码数据
    fnCheckCodeKeyup(e) {
      let index = e.target.dataset.index * 1
      let el = e.target
      // 解决输入e的问题
      el.value = el.value.replace(/Digit|Numpad/i, '').slice(0, 1)
      if (/Digit|Numpad/i.test(e.code)) {
        // 必须在这里赋值，否则输入框会是空值
        this.aCheckCodeInput.splice(
          index,
          1,
          e.code.replace(/Digit|Numpad/i, '')
        )
        el.nextElementSibling && el.nextElementSibling.focus()
        if (index === 5) {
          if (this.aCheckCodeInput.join('').length === 6)
            document.activeElement.blur()
        }
      }
    },
    // 输入验证码，检测位置变化
    fnCheckCodeKeydown(e) {
      let index = e.target.dataset.index * 1
      let el = e.target
      if (e.key === 'Backspace') {
        if (this.aCheckCodeInput[index].length > 0) {
          this.aCheckCodeInput.splice(index, 1, '')
        } else {
          if (el.previousElementSibling) {
            el.previousElementSibling.focus()
            this.aCheckCodeInput[index - 1] = ''
          }
        }
      } else if (e.key === 'Delete') {
        if (this.aCheckCodeInput[index].length > 0) {
          this.aCheckCodeInput.splice(index, 1, '')
        } else {
          if (el.nextElementSibling) {
            el.nextElementSibling.focus()
            this.aCheckCodeInput[++index] = ''
          }
        }
      } else if (e.key === 'Home') {
        el.parentElement.children[0] && el.parentElement.children[0].focus()
      } else if (e.key === 'End') {
        el.parentElement.children[this.aCheckCodeInput.length - 1] &&
          el.parentElement.children[this.aCheckCodeInput.length - 1].focus()
      } else if (e.key === 'ArrowLeft') {
        if (el.previousElementSibling) el.previousElementSibling.focus()
      } else if (e.key === 'ArrowRight') {
        if (el.nextElementSibling) el.nextElementSibling.focus()
      }
    },
    // 输入验证码，解决一个输入框输入多个字符的问题
    fnCheckCodeInputEvent(e) {
      let index = e.target.dataset.index * 1
      let el = e.target
      el.value = el.value.replace(/Digit|Numpad/i, '').slice(0, 1)
      this.aCheckCodeInput[index] = el.value
    },
    // 验证码粘贴
    fnCheckCodeKeyPaste(e) {
      e.clipboardData.items[0].getAsString((str) => {
        if (str.toString().length === 6) {
          this.aCheckCodePasteResult = str.split('')
          document.activeElement.blur()
          this.aCheckCodeInput = this.aCheckCodeInputComputed
          this.aCheckCodePasteResult = []
        } else {
          // 如果粘贴内容不合规，清除所有内容
          this.aCheckCodeInput = ['', '', '', '', '', '']
        }
      })
    },

    async getCode() {
      this.showLoading = true
      try {
        const data = {
          code:
            this.aCheckCodeInput[0] +
            this.aCheckCodeInput[1] +
            this.aCheckCodeInput[2] +
            this.aCheckCodeInput[3] +
            this.aCheckCodeInput[4] +
            this.aCheckCodeInput[5],
          email: this.$store.state.user.userEmail,
        }
        await this.$store.dispatch('getCode', data)
        setTimeout(async () => {
          const pendingCoupon = readPendingNewUserCoupon()
          const response = await createCoupons(pendingCoupon || {})
          if (pendingCoupon && response && response.code === 0) {
            markCampaignClaimSubmitted(this.$store.state.user.userInfo.id, response.data)
            clearPendingNewUserCoupon()
          }
          // this.$router.push('/login')
          window.open('//' + this.globalWeb,'_self')
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
        this.showLoading = false
        this.alertShow = true
        this.alertType = 'err'
        this.alertTitle = error.message
      }
    },
  },

  //   beforeDestroy() {
  //     this.$bus.$off('List')
  //   },
}
</script>

<style lang="postcss" scoped>
.title {
  @apply w-full pb-3 flex border-b border-gray-200;
}

.loginbtn {
  @apply w-full px-2.5 py-3.5 mb-3.5 text-white bg-orange hover:bg-orange1 rounded-md font-semibold border-0 cursor-pointer;
}

.valInput {
  @apply w-14% sm:w-12% text-4xl text-center py-4 bg-lightMenu border rounded focus:outline-none focus:ring focus:ring-formRing focus:border-formBorder;
}

.signupbtn {
  @apply w-full px-2.5 py-3.5 mb-3.5 text-white bg-orange hover:bg-orange1 rounded-md font-semibold border-0 cursor-pointer;
}

.tips {
  @apply text-orange hover:underline;
}

.loading {
  @apply w-full px-2.5 py-3.5 mb-3.5 bg-orange justify-center rounded-md;
}

.inputTips {
  @apply text-xs text-red-500 absolute;
}

.loginBG {
  @apply fixed top-0 left-0 w-full h-full hidden sm:block z-10;
  background: url("../../assets/loginBG.webp") 50% 100% / cover no-repeat fixed;
}
</style>
