<template>
  <div class="relative bg-lightMenu">
    <div class="loginBG">
      <img
        src="../../assets/loginIcon.png"
        class="w-96 mb-56 mr-72"
        alt=""
      >
    </div>
    <div class="w-screen min-h-loginbg px-3 z-10 flex items-center text-lightText relative">
      <notice-alerts
        class="top-14 lg:top-24 w-576"
        v-show="alertShow"
        :title="alertTitle"
        :type="alertType"
      ></notice-alerts>
      <div class="fixed top-0 left-0 w-screen h-topmenu bg-lightTop z-50 overflow-hidden">
        <div class="w-full h-full flex items-center justify-between px-6">
          <a
            class="flex items-center h-full"
            :href="'//' + globalWeb"
            target="_blank"
          >
            <img
              src="../../assets/codropshipping.svg"
              class="h-20"
              alt=""
            />
          </a>
          <global-language-select :show-label="false" />
        </div>
      </div>
      <div class="max-w-1440 w-full mx-auto my-28 flex justify-center">
        <div class="max-w-xl w-full bg-white flex rounded shadow-default">
          <div class="w-full sm:px-10 px-3.5 pt-8">
            <div class="title">
              <div class="text-lg font-bold">Log in</div>
            </div>

            <div class="flex">
              <div
                @click="selectLogin(2)"
                class="mr-6 py-2 border-b-2 cursor-pointer flex"
                :class="[ruleForm.login_way == '2' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']"
              >
                Whatsapp
              </div>
              <div
                @click="selectLogin(1)"
                class=" py-2 border-b-2 cursor-pointer flex"
                :class="[ruleForm.login_way == '1' ? 'border-orange font-semibold text-orange' : 'border-transparent hover:text-orange']"
              >
                Email
              </div>
            </div>

            <div class="my-3.5">
              <div
                v-if="ruleForm.login_way == 1"
                key="email"
                class="mb-3"
              >
                <div class="pb-2 flex justify-between">
                  <label class="text-15 text-loginLabel">Email</label>
                  <!-- <div @click="selectLogin(2)" class="text-sm text-blue-400 underline cursor-pointer">Login with phone number</div> -->
                </div>
                <div class="relative">
                  <input
                    v-model="ruleForm.email"
                    v-on:keyup.enter="userLogin()"
                    ref="email"
                    class="input"
                    v-validate="'required|email'"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <div class="inputTips">{{ errors.first("email") }}</div>
                </div>
              </div>

              <div
                v-if="ruleForm.login_way == 2"
                class="mb-3"
              >
                <whatsappInput ref="whatsappInput" v-model="whatsapp" name="whatsapp" v-validate="'required|whatsapp'"></whatsappInput>
                <div class="inputTips">{{ errors.first("whatsapp") }}</div>
              </div>

              <div
                v-if="ruleForm.check_way == 1"
                key="password"
                class="mb-6"
              >
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Password</label>
                </div>
                <div class="relative">
                  <input
                    v-model="ruleForm.password"
                    v-on:keyup.enter="userLogin()"
                    ref="password"
                    class="input"
                    name="password"
                    :type="passwordType"
                    v-validate="'required|password'"
                    placeholder="Must be 6 charactor or more"
                  />
                  <div @click="checkType" class="absolute bottom-1.5 right-2 cursor-pointer select-none">
                    <svg v-show="passwordType == 'text'" t="1765186821621" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4670" width="28" height="28"><path d="M512 256a416.853333 416.853333 0 0 1 376.32 234.666667C817.92 634.453333 673.706667 725.333333 512 725.333333s-305.92-90.88-376.32-234.666666A416.853333 416.853333 0 0 1 512 256m0-85.333333C298.666667 170.666667 116.48 303.36 42.666667 490.666667 116.48 677.973333 298.666667 810.666667 512 810.666667s395.52-132.693333 469.333333-320C907.52 303.36 725.333333 170.666667 512 170.666667z m0 213.333333a106.666667 106.666667 0 0 1 0 213.333333 106.666667 106.666667 0 0 1 0-213.333333m0-85.333333c-105.813333 0-192 86.186667-192 192S406.186667 682.666667 512 682.666667s192-86.186667 192-192S617.813333 298.666667 512 298.666667z" p-id="4671" fill="#8a8a8a"></path></svg>
                    <svg v-show="passwordType == 'password'" t="1765187174091" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5057" width="28" height="28"><path d="M512 256a416.853333 416.853333 0 0 1 376.32 234.666667 411.605333 411.605333 0 0 1-102.826667 133.12l60.16 60.16c59.306667-52.48 106.24-118.186667 135.68-193.28C907.52 303.36 725.333333 170.666667 512 170.666667c-54.186667 0-106.24 8.533333-155.306667 24.32l70.4 70.4C454.826667 259.84 482.986667 256 512 256z m-45.653333 48.64L554.666667 392.96c24.32 10.666667 43.946667 30.293333 54.613333 54.613333l88.32 88.32c3.413333-14.506667 5.973333-29.866667 5.973333-45.653333C704 384.426667 617.813333 298.666667 512 298.666667c-15.786667 0-30.72 2.133333-45.653333 5.973333zM85.76 165.12l114.346667 114.346667A500.821333 500.821333 0 0 0 42.666667 490.666667C116.48 677.973333 298.666667 810.666667 512 810.666667c64.853333 0 127.146667-12.373333 184.32-34.986667l145.92 145.92 60.16-60.16L145.92 104.533333 85.76 165.12z m320 320l111.36 111.36c-1.706667 0.426667-3.413333 0.853333-5.12 0.853333a106.666667 106.666667 0 0 1-106.666667-106.666666c0-2.133333 0.426667-3.413333 0.426667-5.546667z m-145.066667-145.066667l74.666667 74.666667a196.266667 196.266667 0 0 0-15.36 75.946667 192.298667 192.298667 0 0 0 267.52 176.64l41.813333 41.813333c-37.546667 10.24-76.8 16.213333-117.333333 16.213333a416.853333 416.853333 0 0 1-376.32-234.666666c29.866667-61.013333 73.386667-111.36 125.013333-150.613334z" p-id="5058" fill="#8a8a8a"></path></svg>
                  </div>
                  <div class="inputTips">{{ errors.first("password") }}</div>
                </div>
              </div>

              <div
                v-if="ruleForm.check_way == 2"
                key="code"
                class="mb-6"
              >
                <div class="pb-2">
                  <label class="text-15 text-loginLabel">Verification code</label>
                </div>
                <div class="flex">
                  <div class="w-full">
                    <input
                      v-model="ruleForm.verify_code"
                      v-on:keyup.enter="userLogin()"
                      class="input"
                      name="authCode"
                      type="text"
                      v-validate="'required|authCode'"
                      placeholder="Enter verification code"
                    />
                    <div class="inputTips">{{ errors.first("authCode") }}</div>
                  </div>
                  <button
                    v-show="showCode"
                    @click="sendVerifyCode()"
                    class="ml-2.5 flex-shrink-0 rounded-md bg-orange hover:bg-orange1 text-white"
                    style="width: 86px;"
                  >
                    Send
                  </button>
                  <button
                    v-show="!showCode"
                    class="ml-2.5 flex-shrink-0 rounded-md bg-gray-400 text-white cursor-default"
                    style="width: 86px;"
                  >
                    {{ codeNum }}
                  </button>
                </div>
              </div>

              <div class="flex justify-between text-sm mb-6">
                <!-- <label class="flex items-center cursor-pointer"
                      style="-webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;">
                  <input class="mr-1.5 w-4 h-4"
                        type="checkbox" />
                  <div>Remember me</div>
                </label> -->
                <div
                  v-if="ruleForm.check_way == 1"
                  @click="selectPassword(2)"
                  class="text-red-500 cursor-pointer hover:underline"
                >verification code login</div>
                <div
                  v-if="ruleForm.check_way == 2"
                  @click="selectPassword(1)"
                  class="text-red-500 cursor-pointer hover:underline"
                >password login</div>
                <div v-if="ruleForm.check_way == 1">
                  <router-link
                    class="tips"
                    :to="{ name: 'forgotPassword' }"
                  >Forget the password?</router-link>
                </div>
              </div>
              <div>
                <button
                  class="loginbtn"
                  @click.prevent="userLogin"
                  v-show="!showLoading"
                >Log in</button>
                <button
                  class="loading"
                  v-show="showLoading"
                >
                  <svg
                    class="animate-spin mx-auto my-0.5 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="pt-7 border-t border-gray-200">
              <div
                class="signUpGoogle border-orange text-orange"
                @click="signUpGoogle"
              >
                <img
                  src="../../assets/google.svg"
                  class="w-5 mr-4"
                  alt=""
                />
                <div>Log in with Google</div>
              </div>
              <div
                @click="loginWith('facebook')"
                class="signUpGoogle mt-3 border-blue-800 text-blue-800"
              >
                <svg
                  t="1701746780470"
                  class="icon mr-3"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4470"
                  width="20"
                  height="20"
                >
                  <path
                    data-v-087a94b2=""
                    d="M967.4752 0H56.5248C25.2928 0 0 25.2928 0 56.5248v910.9504C0 998.7072 25.2928 1024 56.5248 1024h490.3936v-396.544H413.4912V472.9344h133.4272V358.912c0-132.3008 80.7936-204.288 198.8096-204.288 56.5248 0 105.0624 4.1984 119.2448 6.0928v138.24h-81.8176c-64.2048 0-76.5952 30.5152-76.5952 75.264v98.6624h153.0368l-19.968 154.5216h-133.12V1024h260.9664c31.232 0 56.5248-25.2928 56.5248-56.5248V56.5248C1024 25.2928 998.7072 0 967.4752 0z"
                    fill="#1e40af"
                    p-id="4471"
                  ></path>
                </svg>
                <div>Log in with Fackbook</div>
              </div>
              <div
                @click="loginWith('tiktok')"
                class="signUpGoogle mt-3 border-black text-black"
              >
                <svg
                  t="1723513266463"
                  class="icon mr-3"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6481"
                  width="20"
                  height="20"
                >
                  <path
                    d="M0 0h1024v1024H0z"
                    fill="#FFFFFF"
                    p-id="6482"
                  ></path>
                  <path
                    d="M910.912 0H113.088C50.88 0 0 50.88 0 113.088v797.824C0 973.12 50.88 1024 113.088 1024h797.824c62.208 0 113.088-50.88 113.088-113.088V113.088C1024 50.88 973.12 0 910.912 0z"
                    fill="#000000"
                    p-id="6483"
                  ></path>
                  <path
                    d="M444.608 416.256V384.64a200.512 200.512 0 0 0-32.512-2.56 241.536 241.536 0 0 0-241.408 241.152c0 82.112 41.088 153.92 103.552 197.568a239.616 239.616 0 0 1-65.024-164.224C208.32 525.76 313.6 418.816 444.608 416.256z"
                    fill="#00F2EA"
                    p-id="6484"
                  ></path>
                  <path
                    d="M450.56 767.744c59.136 0 107.904-47.04 110.464-106.048V135.744h95.872c-1.664-11.136-3.392-22.208-3.392-33.344H522.496v525.952a110.4 110.4 0 0 1-110.4 106.048c-18.88 0-35.968-4.224-51.392-12.8 20.544 28.16 53.12 46.144 89.92 46.144z"
                    fill="#00F2EA"
                    p-id="6485"
                  ></path>
                  <path
                    d="M736.512 255.488a179.84 179.84 0 0 1-44.48-119.68h-35.136a183.296 183.296 0 0 0 79.616 119.68zM412.096 513.792c-60.8 0-110.464 49.6-110.464 110.272 0 42.816 24 79.552 59.072 97.536a110.336 110.336 0 0 1 122.432-169.344V417.92a200.576 200.576 0 0 0-32.512-2.56h-6.016v102.592a135.616 135.616 0 0 0-32.512-4.224v0.064z"
                    fill="#FF004F"
                    p-id="6486"
                  ></path>
                  <path
                    d="M836.672 314.496v101.76a305.664 305.664 0 0 1-182.336-59.008v266.88a241.472 241.472 0 0 1-380.096 197.504 243.008 243.008 0 0 0 177.216 76.992 241.536 241.536 0 0 0 241.408-241.152v-266.88a313.6 313.6 0 0 0 182.4 59.008V317.888a185.6 185.6 0 0 1-38.592-3.392z"
                    fill="#FF004F"
                    p-id="6487"
                  ></path>
                  <path
                    d="M653.44 624.128v-266.88c53.12 38.208 116.928 58.88 182.4 59.008v-101.76a185.152 185.152 0 0 1-99.328-59.008 182.4 182.4 0 0 1-80.448-119.68H561.024v525.952a110.4 110.4 0 0 1-160.96 93.76 110.72 110.72 0 0 1-39.36-33.92 111.04 111.04 0 0 1-59.072-97.472c0-60.8 49.664-110.336 110.464-110.336 11.136 0 22.208 1.664 32.512 5.12V416.256a241.088 241.088 0 0 0-236.288 241.216 239.36 239.36 0 0 0 65.088 164.16 242.624 242.624 0 0 0 231.04 25.408 241.088 241.088 0 0 0 149.056-222.912h-0.064z"
                    fill="#FFFFFF"
                    p-id="6488"
                  ></path>
                </svg>
                <div>Log in with Tiktok</div>
              </div>
            </div>
            <div class="p-5 border-t border-gray-200 flex justify-center text-sm">
              <span>Don't Have An Account?</span>&nbsp;
              <div
                @click="tosignup"
                class="tips cursor-pointer"
              >Sign up</div>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
    <div class="w-screen min-h-50 bg-lightTop z-20 text-xs text-gray-300 flex justify-center items-center relative">
      <div class="text-center p-4">
        By clicking the Accept and Continue button, you acknowledge that you have read and reviewed the <a
          class="px-1 underline cursor-pointer"
          :href="'//' +globalWeb+'/terms.html'"
          target="_blank"
        >CoDropshipping Terms and Conditions</a> and the <a
          class="px-1 underline cursor-pointer"
          :href="'//' +globalWeb+'/privacy_policy.html'"
          target="_blank"
        >CoDropshipping Privacy Policy</a> and agree to be subject to those terms and policies.
      </div>
    </div>
  </div>
</template>
<script>
import NoticeAlerts from "@/components/NoticeAlerts";
import uaParser from "ua-parser-js";
import { getThirdLink, sendVerify } from "@/api/user";
import { bindStore } from "@/api/dropshipping";
import whatsappInput from "@/components/whatsapp-input.vue";
import GlobalLanguageSelect from "@/components/GlobalLanguageSelect.vue";
export default {
  name: "Login",
  components: {
    NoticeAlerts,
    whatsappInput,
    GlobalLanguageSelect,
  },
  data() {
    return {
      whatsapp:'',
      alertShow: false,
      alertTitle: "",
      alertType: "",
      showLoading: false,
      ruleForm: {
        email: "",
        password: "",
        browser: "",
        sys: "",
        agent: "",
        machine: "",
        language: "",
        login_way: 1,
        check_way: 1,
        mobile: "",
        verify_code: "",
        whatsapp:'',
      },
      istab: "0",
      globalWeb: this.$globalWeb,
      invitation_code: "",
      forms: {},
      showCode: true,
      codeNum: 60,
      isShopiy: false,
      store_id: "",
      passwordType: 'password'
    };
  },

  methods: {
    async userLogin() {
      // console.log(this.whatsapp);
      const success = await this.$validator.validateAll();
      
      if (success) {
        this.alertShow = false;
        this.showLoading = true;
        try {
          const res = this.$refs.whatsappInput?.getInfo();
          this.ruleForm = { ...this.ruleForm, ...res };
          await this.$store.dispatch("userLogin", this.ruleForm);
          setTimeout(() => {
            // if(this.$store.state.user.userInfo.email == null){
            //   this.$router.push({
            //     name:'profile',
            //     params: {
            //       status: 'account',
            //     },
            //   })
            // }else{
            //   if(localStorage.getItem("loginto") == '2'){
            //     if(this.$store.state.user.userInfo.super_level == 'L1'){
            //       this.$router.push({
            //         name:'FCL',
            //         params: {level:'L1'},
            //       })
            //     }else{
            //       this.$router.push('/main/FCL')
            //     }
            //   }else{
            //     if(this.$store.state.user.userInfo.super_level == 'L1'){
            //       this.$router.push({
            //         name:'shippingList',
            //         params: {level:'L1'},
            //       })
            //     }else{
            //       this.$router.push('/main/booking')
            //       // this.$router.push('/main/dashboard')
            //     }
            //   }
            // }
            // if(this.$store.state.user.userInfo.delivery_status == 0){
            //   this.$router.push({
            //     name:'gpt',
            //   })
            // }else{
            // }

            // this.$router.push('/main/dashboard')
            if (this.isShopiy) {
              bindStore({
                store_id: this.store_id,
              }).then((res) => {
                this.$router.push({
                  path: "/ShopifyVerifyResult",
                  query: {
                    from: res.data.from,
                    result: res.data.result,
                  },
                });
              });
            } else if (typeof this.$route.query.redirect === 'string' && this.$route.query.redirect.startsWith('/')) {
              this.$router.replace(this.$route.query.redirect);
            } else {
              this.$router.replace('/main/dashboard');
            }
            this.showLoading = false;
          }, 800);
          // console.log('用户信息', this.$store.state.user.userInfo)
          localStorage.setItem(
            "userInfo",
            JSON.stringify(this.$store.state.user.userInfo)
          );
          localStorage.setItem(
            "userId",
            JSON.stringify(this.$store.state.user.userInfo.id)
          );
          localStorage.setItem(
            "userImg",
            JSON.stringify(this.$store.state.user.userInfo.img)
          );
          localStorage.setItem(
            "first_name",
            JSON.stringify(this.$store.state.user.userInfo.first_name)
          );
          localStorage.setItem(
            "last_name",
            JSON.stringify(this.$store.state.user.userInfo.last_name)
          );
          localStorage.setItem(
            "customer_manage",
            JSON.stringify(this.$store.state.user.userInfo.manage)
          );
          // localStorage.setItem(
          //   'showHobby',
          //   true
          // )
        } catch (error) {
          this.showLoading = false;
          this.alertShow = true;
          this.alertTitle = error.message;
        }
      } else {
      }
    },
    signUpGoogle() {
      window.location.href =
        "//" + this.globalWeb + "/api/google/googleLogin";
    },
    loginWith(type) {
      getThirdLink({
        type,
        source: 4,
        source_client: 1,
      }).then((res) => {
        window.location.href = res.data.url;
      });
    },
    async toThirdLogin() {
      await this.$store.dispatch("thirdLogins", this.forms);
      setTimeout(() => {
        window.open("//" + this.globalWeb, "_self");
      }, 800);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(this.$store.state.user.userInfo)
      );
      localStorage.setItem(
        "userId",
        JSON.stringify(this.$store.state.user.userInfo.id)
      );
      localStorage.setItem(
        "userImg",
        JSON.stringify(this.$store.state.user.userInfo.img)
      );
      localStorage.setItem(
        "first_name",
        JSON.stringify(this.$store.state.user.userInfo.first_name)
      );
      localStorage.setItem(
        "last_name",
        JSON.stringify(this.$store.state.user.userInfo.last_name)
      );
      localStorage.setItem(
        "customer_manage",
        JSON.stringify(this.$store.state.user.userInfo.manage)
      );
    },
    selectLogin(type) {
      this.ruleForm.login_way = type;
      if (type == 1) {
        this.ruleForm.mobile = "";
      } else {
        this.ruleForm.email = "";
      }
      setTimeout(() => {
        this.resetValidate();
      }, 1);
    },
    selectPassword(type) {
      this.ruleForm.check_way = type;
      if (type == 1) {
        this.ruleForm.verify_code = "";
      } else {
        this.ruleForm.password = "";
      }
      setTimeout(() => {
        this.resetValidate();
      }, 1);
    },
    resetValidate() {
      this.$validator.reset();
    },
    sendVerifyCode() {
      let timer = setInterval(() => {
        this.codeNum -= 1;
        if (this.codeNum <= 0) {
          clearInterval(timer);
          this.showCode = true;
          this.codeNum = 60;
        }
      }, 1000);
      this.showCode = false;
      const res = this.$refs.whatsappInput?.getInfo();
      if(res!=undefined){
        sendVerify({
          source: 4,
          scene: 2,
          send_way: this.ruleForm.login_way,
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
          scene: 2,
          send_way: this.ruleForm.login_way,
          email: this.ruleForm.email,
          // mobile: this.ruleForm.mobile,
          // whatsapp: res.whatsapp,
          // code_no: res.code_no,
        }).then((res) => {
          if (res.code == -1) {
            this.$message({
              message: res.msg,
              offset: 70,
            });
            clearInterval(timer);
            this.showCode = true;
            this.codeNum = 60;
          }
        });
      }
    },
    tosignup() {
      if (this.isShopiy) {
        this.$router.push({
          path: "/signUp",
          query: {
            store_id: this.store_id,
            from: "shopifyAuth",
          },
        });
      } else {
        this.$router.push("/signUp");
      }
    },
    checkType(){
      if(this.passwordType == 'password'){
        this.passwordType = 'text'
      }else{
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        const input = this.$refs.password;
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      });
    }
  },
  mounted() {
    this.$refs.email.focus();
    const ua = uaParser(navigator.userAgent);
    this.ruleForm.browser = ua.browser.name;
    this.ruleForm.sys = ua.os.name + ua.os.version;
    this.ruleForm.agent = ua.ua;
    this.ruleForm.machine = window.screen.width + "*" + window.screen.height;
    this.ruleForm.language = window.navigator.language;
    if (localStorage.getItem("invitation_code") === "undefined") {
      this.invitation_code = "";
    } else {
      this.invitation_code = localStorage.getItem("invitation_code");
    }
    if (this.$route.query.code) {
      this.forms = {
        state: this.$route.query.state,
        code: this.$route.query.code,
        source: 4,
        invitation_code: this.invitation_code,
        sys: this.ruleForm.sys,
        browser: this.ruleForm.browser,
        agent: this.ruleForm.agent,
        machine: this.ruleForm.machine,
        language: this.ruleForm.language,
        source_client: 1,
      };
      this.toThirdLogin();
    }
    if (this.$route.query.store_id && this.$route.query.from == "shopifyAuth") {
      this.isShopiy = true;
      this.store_id = this.$route.query.store_id;
    }
    if (this.$route.query.email) {
      this.ruleForm.email = this.$route.query.email;
    }
  },
  watch: {},
};
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
  @apply w-full px-6 py-3 rounded-md text-sm cursor-pointer flex justify-center items-center border hover:bg-inputGoogle;
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
