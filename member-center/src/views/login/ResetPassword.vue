
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
      <div class="max-w-1440 w-full mx-auto my-28"
          v-show="!loading">
        <div class="max-w-xl bg-white flex mx-auto rounded shadow-default">
          <div class="w-full sm:px-10 px-3.5 pt-8">
            <div class="title">
              <div class="text-lg font-bold">Reset Password</div>
            </div>
            <div class="my-3.5">
              <div class="mb-3">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Password</label>
                </div>
                <div>
                  <input v-model="password"
                        v-on:keyup.enter="login()"
                        ref="password"
                        class="input"
                        name="newPassword"
                        v-validate="'required|newPassword'"
                        type="password"
                        placeholder="Must be 6 charactor or more" />
                  <div class="inputTips">{{ errors.first("newPassword") }}</div>
                </div>
              </div>
              <div class="mb-6">
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Confirm Password</label>
                </div>
                <div>
                  <input v-model="confirm_password"
                        v-on:keyup.enter="login()"
                        ref="confirm_password"
                        name="confirmPassword"
                        v-validate="'required|confirmPassword'"
                        class="input"
                        type="password"
                        placeholder="Please enter your password again" />
                  <div class="inputTips">{{ errors.first("confirmPassword") }}</div>
                </div>
              </div>
              <div>
                <button class="loginbtn"
                        @click.prevent="login"
                        v-show="!showLoading">Submit</button>
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
export default {
  name: 'ResetPassword',
  components: {
    NoticeAlerts,
    Loading,
  },
  data() {
    return {
      showLoading: false,
      alertShow: false,
      alertTitle: '',
      alertType: '',
      password: '',
      confirm_password: '',
      key: '',
      loading: true,
      globalWeb: this.$globalWeb
    }
  },
  created() {
    // console.log('666', this.key)
    this.key = this.$route.query.key
  },
  mounted() {
    this.$refs.password.focus()
    // console.log('8888', this.key)
    this.resetPassword()
  },
  methods: {
    async resetPassword() {
      try {
        const data = {
          key: this.key,
        }
        await this.$store.dispatch('getKey', data)
        setTimeout(() => {
          this.loading = false
        }, 1000)
      } catch (error) {
        setTimeout(() => {
          this.alertShow = true
          this.alertTitle = error.message
        }, 1000)
        this.showLoading = false
        this.loading = true
      }
    },
    //
    async login() {
      const success = await this.$validator.validateAll()
      if (success) {
        this.alertShow = false
        this.showLoading = true
        try {
          const dates = {
            password: this.password,
            confirm_password: this.confirm_password,
            key: this.key,
          }
          await this.$store.dispatch('resetPassword', dates)
          setTimeout(() => {
            this.$router.push('/login')
            this.showLoading = false
          }, 800)
        } catch (error) {
          this.showLoading = false
          this.alertShow = true
          this.alertTitle = error.message
        }
      } else {
      }
    },
  },
  watch: {
    password() {
      const msg = this.errors.has('password')
      if (!msg) {
        this.$refs.password.classList.value = 'input'
      } else {
        this.$refs.password.classList.value = 'inputErr'
      }
    },
    confirm_password() {
      const msg = this.errors.has('confirm_password')
      if (!msg) {
        this.$refs.confirm_password.classList.value = 'input'
      } else {
        this.$refs.confirm_password.classList.value = 'inputErr'
      }
    },
  },
}
</script>>
<style lang="postcss" scoped>
.title {
  @apply w-full pb-3 text-center;
}

.loginbtn {
  @apply w-full px-2.5 py-3.5 mb-3.5 text-white bg-orange hover:bg-orange1 rounded-md font-semibold border-0 cursor-pointer;
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
