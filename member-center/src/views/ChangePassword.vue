<template>
  <div class="w-full h-full p-3 sm:p-5">

    <div class="h-full overflow-auto">
      <notice-alerts class="top-3 w-1200"
                     v-show="alertShow"
                     :title="alertTitle"
                     :type="alertType"></notice-alerts>
      <div class="breadcrumb">Change Password</div>
      <div class="main1">
        <div class="py-5">
          <div class="flex flex-wrap mt-10">
            <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text-base">Old Password</label>
                </div>
                <div class="relative">
                  <input v-model="changePassword.old_password"
                    ref="old_password"
                    v-validate="'required|password'"
                    name="password"
                    class="input"
                    value
                    :type="passwordTypeOld"
                    placeholder="Old password change to current password" />
                  <div @click="checkTypeOld" class="absolute bottom-1.5 right-2 cursor-pointer select-none">
                    <svg v-show="passwordTypeOld == 'text'" t="1765186821621" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4670" width="28" height="28"><path d="M512 256a416.853333 416.853333 0 0 1 376.32 234.666667C817.92 634.453333 673.706667 725.333333 512 725.333333s-305.92-90.88-376.32-234.666666A416.853333 416.853333 0 0 1 512 256m0-85.333333C298.666667 170.666667 116.48 303.36 42.666667 490.666667 116.48 677.973333 298.666667 810.666667 512 810.666667s395.52-132.693333 469.333333-320C907.52 303.36 725.333333 170.666667 512 170.666667z m0 213.333333a106.666667 106.666667 0 0 1 0 213.333333 106.666667 106.666667 0 0 1 0-213.333333m0-85.333333c-105.813333 0-192 86.186667-192 192S406.186667 682.666667 512 682.666667s192-86.186667 192-192S617.813333 298.666667 512 298.666667z" p-id="4671" fill="#8a8a8a"></path></svg>
                    <svg v-show="passwordTypeOld == 'password'" t="1765187174091" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5057" width="28" height="28"><path d="M512 256a416.853333 416.853333 0 0 1 376.32 234.666667 411.605333 411.605333 0 0 1-102.826667 133.12l60.16 60.16c59.306667-52.48 106.24-118.186667 135.68-193.28C907.52 303.36 725.333333 170.666667 512 170.666667c-54.186667 0-106.24 8.533333-155.306667 24.32l70.4 70.4C454.826667 259.84 482.986667 256 512 256z m-45.653333 48.64L554.666667 392.96c24.32 10.666667 43.946667 30.293333 54.613333 54.613333l88.32 88.32c3.413333-14.506667 5.973333-29.866667 5.973333-45.653333C704 384.426667 617.813333 298.666667 512 298.666667c-15.786667 0-30.72 2.133333-45.653333 5.973333zM85.76 165.12l114.346667 114.346667A500.821333 500.821333 0 0 0 42.666667 490.666667C116.48 677.973333 298.666667 810.666667 512 810.666667c64.853333 0 127.146667-12.373333 184.32-34.986667l145.92 145.92 60.16-60.16L145.92 104.533333 85.76 165.12z m320 320l111.36 111.36c-1.706667 0.426667-3.413333 0.853333-5.12 0.853333a106.666667 106.666667 0 0 1-106.666667-106.666666c0-2.133333 0.426667-3.413333 0.426667-5.546667z m-145.066667-145.066667l74.666667 74.666667a196.266667 196.266667 0 0 0-15.36 75.946667 192.298667 192.298667 0 0 0 267.52 176.64l41.813333 41.813333c-37.546667 10.24-76.8 16.213333-117.333333 16.213333a416.853333 416.853333 0 0 1-376.32-234.666666c29.866667-61.013333 73.386667-111.36 125.013333-150.613334z" p-id="5058" fill="#8a8a8a"></path></svg>
                  </div>
                  <div class="inputTips">{{errors.first("password")}}</div>
                </div>
              </div>
            </div>
            <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text-base">New Password</label>
                </div>
                <div class="relative">
                  <input v-model="changePassword.new_password"
                    ref="new_password"
                    v-validate="'required|newPassword'"
                    name="newPassword"
                    class="input"
                    value
                    :type="passwordTypeNew"
                    placeholder="New password" />
                  <div @click="checkTypeNew" class="absolute bottom-1.5 right-2 cursor-pointer select-none">
                    <svg v-show="passwordTypeNew == 'text'" t="1765186821621" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4670" width="28" height="28"><path d="M512 256a416.853333 416.853333 0 0 1 376.32 234.666667C817.92 634.453333 673.706667 725.333333 512 725.333333s-305.92-90.88-376.32-234.666666A416.853333 416.853333 0 0 1 512 256m0-85.333333C298.666667 170.666667 116.48 303.36 42.666667 490.666667 116.48 677.973333 298.666667 810.666667 512 810.666667s395.52-132.693333 469.333333-320C907.52 303.36 725.333333 170.666667 512 170.666667z m0 213.333333a106.666667 106.666667 0 0 1 0 213.333333 106.666667 106.666667 0 0 1 0-213.333333m0-85.333333c-105.813333 0-192 86.186667-192 192S406.186667 682.666667 512 682.666667s192-86.186667 192-192S617.813333 298.666667 512 298.666667z" p-id="4671" fill="#8a8a8a"></path></svg>
                    <svg v-show="passwordTypeNew == 'password'" t="1765187174091" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5057" width="28" height="28"><path d="M512 256a416.853333 416.853333 0 0 1 376.32 234.666667 411.605333 411.605333 0 0 1-102.826667 133.12l60.16 60.16c59.306667-52.48 106.24-118.186667 135.68-193.28C907.52 303.36 725.333333 170.666667 512 170.666667c-54.186667 0-106.24 8.533333-155.306667 24.32l70.4 70.4C454.826667 259.84 482.986667 256 512 256z m-45.653333 48.64L554.666667 392.96c24.32 10.666667 43.946667 30.293333 54.613333 54.613333l88.32 88.32c3.413333-14.506667 5.973333-29.866667 5.973333-45.653333C704 384.426667 617.813333 298.666667 512 298.666667c-15.786667 0-30.72 2.133333-45.653333 5.973333zM85.76 165.12l114.346667 114.346667A500.821333 500.821333 0 0 0 42.666667 490.666667C116.48 677.973333 298.666667 810.666667 512 810.666667c64.853333 0 127.146667-12.373333 184.32-34.986667l145.92 145.92 60.16-60.16L145.92 104.533333 85.76 165.12z m320 320l111.36 111.36c-1.706667 0.426667-3.413333 0.853333-5.12 0.853333a106.666667 106.666667 0 0 1-106.666667-106.666666c0-2.133333 0.426667-3.413333 0.426667-5.546667z m-145.066667-145.066667l74.666667 74.666667a196.266667 196.266667 0 0 0-15.36 75.946667 192.298667 192.298667 0 0 0 267.52 176.64l41.813333 41.813333c-37.546667 10.24-76.8 16.213333-117.333333 16.213333a416.853333 416.853333 0 0 1-376.32-234.666666c29.866667-61.013333 73.386667-111.36 125.013333-150.613334z" p-id="5058" fill="#8a8a8a"></path></svg>
                  </div>
                  <div class="inputTips">{{errors.first("newPassword")}}</div>
                </div>
              </div>
            </div>
            <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text-base">Confirm Password</label>
                </div>
                <div class="relative">
                  <input v-model="changePassword.new_confirm_password"
                    ref="new_confirm_password"
                    v-validate="'required|confirmPassword'"
                    name="confirmPassword"
                    class="input"
                    value
                    :type="passwordType"
                    placeholder="Confirm password" />
                  <div @click="checkType" class="absolute bottom-1.5 right-2 cursor-pointer select-none">
                    <svg v-show="passwordType == 'text'" t="1765186821621" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4670" width="28" height="28"><path d="M512 256a416.853333 416.853333 0 0 1 376.32 234.666667C817.92 634.453333 673.706667 725.333333 512 725.333333s-305.92-90.88-376.32-234.666666A416.853333 416.853333 0 0 1 512 256m0-85.333333C298.666667 170.666667 116.48 303.36 42.666667 490.666667 116.48 677.973333 298.666667 810.666667 512 810.666667s395.52-132.693333 469.333333-320C907.52 303.36 725.333333 170.666667 512 170.666667z m0 213.333333a106.666667 106.666667 0 0 1 0 213.333333 106.666667 106.666667 0 0 1 0-213.333333m0-85.333333c-105.813333 0-192 86.186667-192 192S406.186667 682.666667 512 682.666667s192-86.186667 192-192S617.813333 298.666667 512 298.666667z" p-id="4671" fill="#8a8a8a"></path></svg>
                    <svg v-show="passwordType == 'password'" t="1765187174091" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5057" width="28" height="28"><path d="M512 256a416.853333 416.853333 0 0 1 376.32 234.666667 411.605333 411.605333 0 0 1-102.826667 133.12l60.16 60.16c59.306667-52.48 106.24-118.186667 135.68-193.28C907.52 303.36 725.333333 170.666667 512 170.666667c-54.186667 0-106.24 8.533333-155.306667 24.32l70.4 70.4C454.826667 259.84 482.986667 256 512 256z m-45.653333 48.64L554.666667 392.96c24.32 10.666667 43.946667 30.293333 54.613333 54.613333l88.32 88.32c3.413333-14.506667 5.973333-29.866667 5.973333-45.653333C704 384.426667 617.813333 298.666667 512 298.666667c-15.786667 0-30.72 2.133333-45.653333 5.973333zM85.76 165.12l114.346667 114.346667A500.821333 500.821333 0 0 0 42.666667 490.666667C116.48 677.973333 298.666667 810.666667 512 810.666667c64.853333 0 127.146667-12.373333 184.32-34.986667l145.92 145.92 60.16-60.16L145.92 104.533333 85.76 165.12z m320 320l111.36 111.36c-1.706667 0.426667-3.413333 0.853333-5.12 0.853333a106.666667 106.666667 0 0 1-106.666667-106.666666c0-2.133333 0.426667-3.413333 0.426667-5.546667z m-145.066667-145.066667l74.666667 74.666667a196.266667 196.266667 0 0 0-15.36 75.946667 192.298667 192.298667 0 0 0 267.52 176.64l41.813333 41.813333c-37.546667 10.24-76.8 16.213333-117.333333 16.213333a416.853333 416.853333 0 0 1-376.32-234.666666c29.866667-61.013333 73.386667-111.36 125.013333-150.613334z" p-id="5058" fill="#8a8a8a"></path></svg>
                  </div>
                  <div class="inputTips">{{errors.first("confirmPassword")}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="btnGroup">
            <button class="cancelbtn"
                    @click="cancel">Cancel</button>
            <button class="btn"
                    @click="changeUserPassword"
                    v-show="!showLoading">Change</button>
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
</template>
<script>
import NoticeAlerts from '@/components/NoticeAlerts.vue'
export default {
  components: {
    NoticeAlerts,
  },
  data() {
    return {
      alertShow: false,
      alertTitle: '',
      alertType: '',
      showLoading: false,
      changePassword: {
        old_password: '',
        new_password: '',
        new_confirm_password: '',
        id: '',
      },
      passwordTypeOld: 'password',
      passwordTypeNew: 'password',
      passwordType: 'password',
    }
  },
  created() {
    this.$emit('menu', 'changePassword')
  },
  methods: {
    async changeUserPassword() {
      const success = await this.$validator.validateAll()

      this.changePassword.id = JSON.parse(localStorage.getItem('userId'))
      // console.log('id', JSON.parse(localStorage.getItem('registerInfo')))
      // console.log('修改密码', this.changePassword)
      if (success) {
        this.showLoading = true
        this.msgpassword = ''
        this.alertShow = false
        try {
          await this.$store.dispatch('changeUserPassword', this.changePassword)
          setTimeout(() => {
            this.alertShow = true
            this.alertType = 'success'
            this.alertTitle = 'Password modification succeeded'
            this.showLoading = false
            this.$router.push('/login')
          }, 800)
        } catch (error) {
          this.showLoading = false
          this.alertShow = true
          this.alertTitle = error.message
        }
      }
    },
    cancel() {
      this.$router.push('/dashboard')
    },
    checkTypeOld(){
      if(this.passwordTypeOld == 'password'){
        this.passwordTypeOld = 'text'
      }else{
        this.passwordTypeOld = 'password'
      }
      this.$nextTick(() => {
        const input = this.$refs.old_password;
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      });
    },
    checkTypeNew(){
      if(this.passwordTypeNew == 'password'){
        this.passwordTypeNew = 'text'
      }else{
        this.passwordTypeNew = 'password'
      }
      this.$nextTick(() => {
        const input = this.$refs.new_password;
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      });
    },
    checkType(){
      if(this.passwordType == 'password'){
        this.passwordType = 'text'
      }else{
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        const input = this.$refs.new_confirm_password;
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      });
    },
  },
}
</script>
<style lang="postcss" scoped>
.info {
  @apply w-full mb-6 sm:mb-8;
}

.info > div {
  @apply w-full m-auto;
}

.btn {
  @apply w-28 font-semibold border-0 text-white rounded bg-orange hover:bg-orange1 px-6 py-2.5 cursor-pointer;
}

.cancelbtn {
  @apply w-28 font-semibold mr-5 border border-solid border-gray-400 bg-white hover:bg-gray-400 rounded px-6 py-2.5 cursor-pointer;
}

.btnGroup {
  @apply flex justify-end mt-10 w-full;
}

.inputTips {
  @apply text-xs text-red-500 absolute;
}

.loading {
  @apply w-28 px-6 py-2.5 bg-orange justify-center rounded-md;
}
/* .input {
  @apply w-full bg-white border focus:outline-none focus:border-gray-600 rounded px-3 py-2 text-base;
} */
</style>
