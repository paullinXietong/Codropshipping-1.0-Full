<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="emailModal" class="modal p-5 w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div class="absolute top-2 right-2">
        <img @click="closeModal" class="w-6 cursor-pointer" src="../assets/close.svg" alt="">
      </div>
      <div class="font-semibold">Add email/Modify email</div>
      <div class="text-xs" style="color: #999;">Enter and verify email</div>
      <div class="mt-6 pb-2">
        <label class="text-15 text-loginLabel">Email</label>
      </div>
      <div class="relative">
        <input
          @input="enterEmail"
          v-model="editEmail"
          ref="email"
          class="input"
          v-validate="'required|email'"
          name="email"
          data-vv-scope="emails"
          type="email"
          placeholder="Enter your email" />
        <div class="inputTips">{{ errors.first("email","emails") }}</div>
        <div v-show="isEmailTip" class="inputTips">{{ emailTip }}</div>
      </div>
      <div class="mt-5 flex justify-center text-sm">
        <button @click="subEmail" class="py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Submit</button>
      </div>
    </div>
    <div ref="verifyModal" class="modal p-5 w-600 opacity-20 bg-white dark:bg-darkMenu">
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
        <div class="flex items-center">
          <div class="w-full flex justify-between my-16 relative"
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
            <div v-show="errShow" class="text-red-500 absolute -bottom-6 text-xs">{{errMsg}}</div>
          </div>
          <button v-show="showCode" @click="verifyEmailCode"
            class="flex-shrink-0 w-20 h-12 ml-3 text-white bg-orange hover:bg-orange1 rounded-md">Send</button>
          <button v-show="!showCode"
            class="flex-shrink-0 w-20 h-12 ml-3 rounded-md bg-gray-400 text-white cursor-default">
            {{ codeNum }}
          </button>
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
            <div class="mx-2">email</div>
            <div @click="closeModal" class="underline cursor-pointer">go back</div>
          </div>
        </div>
      </div>
    </div>
    <div ref="noticeMask" class="modal p-5 w-510 opacity-20 bg-white dark:bg-darkMenu">
      <div>Do you want to turn off email notifications? After closing, you will not be able to receive email notifications for updates on the status of the goods!</div>
      <div class="mt-4 flex justify-center">
        <button @click="closeModal" class="cancelbtn w-28">cancel</button>
        <button @click="confirmNotice" class="btn w-28 ml-3">confirm</button>
      </div>
    </div>

    <div class="h-full overflow-auto">
      <notice-alerts class="top-3 w-1200"
                     v-show="alertShow"
                     :title="alertTitle"
                     :type="alertType"></notice-alerts>
      <div class="breadcrumb">Profile</div>
      <div class="main1">
        <div class="pt-8">
          <div class="flex flex-col sm:flex-row">
            <div class="changeImg">
              <img :src="head_portrait"
                   class="w-120 h-120 rounded-full" />
              <input type="file"
                     style="display: none;"
                     accept="image/gif,image/jpeg,image/png,image/jpg"
                     ref="iptFileRef"
                     @change="changeCover" />
              <button class="uploadBtn w-20"
                      id="filedbtn"
                      v-show="!imgLoading"
                      @click="uploadImg">Upload</button>
              <button class="uploadBtn w-20" v-show="imgLoading">
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
            <div class="w-full mt-6 sm:ml-6 text-lg">
              <div class="py-1.5 flex">
                <div class="flex-shrink-0 w-24 text-loginLabel">Account:</div>
                <div>{{account}}</div>
              </div>
              <div class="py-1.5 flex">
                <div class="flex-shrink-0 w-24 text-loginLabel">Mail:</div>
                <div v-if="changeInfoList.email != ''" class="flex">
                  <div class="mr-4">{{changeInfoList.email}}</div>
                  <div @click="openEmodal" class="text-oranges hover:underline cursor-pointer">Modify email</div>
                  <div v-show="supers.email_status == '1'" 
                    @click="sendverifyEmail" class="ml-4 text-oranges hover:underline cursor-pointer">Verify email</div>
                </div>
                <div v-if="changeInfoList.email == ''" @click="openEmodal" class="text-oranges hover:underline cursor-pointer">Add email</div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-10">
            <!-- <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text-base">Username</label>
                </div>
                <div>
                  <input
                    class="input"
                    value
                    type="text"
                    placeholder="Username"
                  />
                </div>
              </div>
            </div> -->
            <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text-base">First Name</label>
                </div>
                <div class="relative">
                  <input v-model="changeInfoList.first_name"
                         ref="firstName"
                         v-validate="'required|firstName'"
                         name="firstName"
                         class="input"
                         value
                         type="text"
                         maxlength="30"
                         placeholder="First Name" />
                  <div class="inputTips">{{ errors.first("firstName") }}</div>
                </div>
              </div>
            </div>
            <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text-base">Last Name</label>
                </div>
                <div class="relative">
                  <input v-model="changeInfoList.last_name"
                         v-validate="'required|lastName'"
                         name="lastName"
                         class="input"
                         value
                         type="text"
                         maxlength="30"
                         placeholder="Last Name" />
                  <div class="inputTips">{{ errors.first("lastName") }}</div>
                </div>
              </div>
            </div>
            <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text-base">Email</label>
                </div>
                <div class="relative">
                  <input v-model="changeInfoList.email"
                         v-validate="'required|email'"
                         name="email"
                         class="input bg-gray-200"
                         value
                         :disabled='true'
                         type="email"
                         placeholder="Email" />
                  <div class="inputTips">{{ errors.first("email") }}</div>
                </div>
              </div>
            </div>
            <!-- <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text-base">Mobile Number</label>
                </div>
                <div>
                  <input
                    class="input"
                    value
                    type="text"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>
            </div> -->
            <!-- <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text-base">Gender</label>
                </div>
                <div class="flex">
                  <label class="flex items-center my-3 mr-8 cursor-pointer">
                    <input type="radio" name="gender" value="male" />
                    <div class="ml-2">Male</div>
                  </label>
                  <label class="flex items-center my-3 mr-8 cursor-pointer">
                    <input type="radio" name="gender" value="female" />
                    <div class="ml-2">Female</div>
                  </label>
                  <label class="flex items-center my-3 mr-8 cursor-pointer">
                    <input type="radio" name="gender" value="secret" />
                    <div class="ml-2">Secret</div>
                  </label>
                </div>
              </div>
            </div> -->
            <!-- <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text text-base">Currency</label>
                </div>
                <div>
                  <select name="currency" class="select">
                    <option value="usd">USD</option>
                    <option value="cny">CNY</option>
                  </select>
                </div>
              </div>
            </div> -->
            <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text text-base">Language</label>
                </div>
                <div class="block sm:hidden">
                  <select name="currency"
                          class="select">
                    <option v-for="(item, index) in selectList"
                            :key="index"
                            :disabled='false'
                            :value="item">{{ item }}</option>
                  </select>
                </div>
                <div ref="languageSelect"
                     class="relative hidden sm:block">
                  <div class="Select"
                       :class="[selectShow ? 'selectOpen' : '']"
                       @click.stop="selectShow = !selectShow">
                    {{ selectItem }}
                    <img src="../assets/down.svg"
                         class="absolute right-1 top-4 w-5"
                         alt="">
                  </div>
                  <select-search :selectList="selectList"
                                 :selectChecked="selectItem"
                                 :selectOpen="selectShow"
                                 @increment="f1"
                                 v-show="selectShow"></select-search>
                </div>
              </div>
            </div>
            <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text text-base">Timezone</label>
                </div>
                <!-- <div >
                  <select name="timezone"
                          class="select">
                    <option value="bj"
                            v-for="(item,index) in timezonelist"
                            :key="index">{{item}}</option>
                  </select>
                </div> -->
                <div ref="timezoneSelect"
                     class="relative">
                  <div class="Select"
                       :class="[timezoneShow ? 'selectOpen' : '']"
                       @click.stop="timezoneShow = !timezoneShow">
                    {{ timezoneItem }}
                    <img src="../assets/down.svg"
                         class="absolute right-1 top-4 w-5"
                         alt="">
                  </div>
                  <select-search :selectList="timezonelist"
                                 :selectChecked="timezoneItem"
                                 :selectOpen="timezoneShow"
                                 @increment="f2"
                                 v-show="timezoneShow">
                  </select-search>
                </div>
              </div>
            </div>
            <div class="info">
              <div>
                <div class="pb-2">
                  <label class="text text-base">Email Notifications</label>
                </div>
                <div class="flex">
                  <div class="relative">
                    <input type="checkbox" v-model="is_send_email" disabled class="mt-1.5">
                    <div @click="changeNotice" class="absolute top-0 left-0 w-full h-full cursor-pointer"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="info">
              <div class="flex justify-between items-center">
                <div>Enterprise Validation:</div>
                <router-link :to="{ name: 'member' }" class="text-lg">
                  <div v-if="!supers.status" class="text-oranges hover:underline cursor-pointer">Verify business</div>
                  <div v-if="supers.status == '0'" class="text-oranges hover:underline cursor-pointer">Verifying</div>
                  <div v-if="supers.status == '1'" class="text-green-500 hover:underline cursor-pointer">Verification successful</div>
                  <div v-if="supers.status == '2'" class="text-oranges hover:underline cursor-pointer">Verification failed, re-verify</div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="btnGroup">
            <button class="cancelbtn w-28"
                    @click="cancel">Cancel</button>
            <button class="btn w-28"
                    @click="changeUserInfo" v-show="!btnLoading">Save</button>
            <button class="btn w-28" v-show="btnLoading">
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
import SelectSearch from '@/components/SelectSearch'
import NoticeAlerts from '@/components/NoticeAlerts'
import {
  reqChangeUserInfo,
  reqGetImg,
  reqSuper,
  addEmail,
  verifyEmail,
  reqUserRegister,
  verifyEmails
} from '@/api/user'
export default {
  components: {
    SelectSearch,
    NoticeAlerts,
  },
  data() {
    return {
      alertShow: false,
      alertTitle: '',
      alertType: '',
      showLoading: false,
      head_portrait: '',
      timezonelist: [],
      timezoneItem: '',
      timezoneShow: false,
      changeInfoList: {
        first_name: '',
        last_name: '',
        email: '',
        id: '',
        ip_time_zone: '',
        is_send_email: 1,
      },
      selectList: [
        'English',
        // 'Chinese',
        // 'French',
        // 'German',
        // 'Italian',
        // 'Russian',
        // 'Japanese',
      ],
      selectItem: 'English',
      selectShow: false,
      btnLoading: false,
      imgLoading: false,
      editEmail: '',
      account: '',
      supers: {},
      aCheckCodeInput: ['', '', '', '', '', ''], // 存储输入验证码内容
      aCheckCodePasteResult: [], // 粘贴的验证码
      emailTip: '',
      isEmailTip: false,
      emailStatus: '1',
      is_send_email: true,
      showCode: true,
      codeNum: 60,
      errMsg: 'error',
      errShow: false,
    }
  },
  created() {
    this.$emit('menu', 'profile')
  },
  mounted() {
    let dt = new Date()
    this.timezoneItem = JSON.parse(localStorage.getItem('userInfo')).ip_time_zone
    this.changeInfoList.ip_time_zone = this.timezoneItem
    const userId = JSON.parse(localStorage.getItem('userId'))
    this.changeInfoList.id = userId
    const headImg = JSON.parse(localStorage.getItem('userImg'))
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(userInfo);
    if(userInfo.email == null){
      this.head_portrait = require('../assets/moren.png')
    }else{
      this.head_portrait = headImg + userId + '_120_120.png?v=' + dt.getTime()
    }
    this.changeInfoList.first_name = userInfo.first_name
    this.changeInfoList.last_name = userInfo.last_name
    this.changeInfoList.email = userInfo.email
    this.timeZoneList()
    this.account = userInfo.account
    // console.log(userInfo)
    reqSuper().then((res)=>{
      this.supers = res.data
      if(res.data.is_send_email == '1'){
        this.is_send_email = true
      }else{
        this.is_send_email = false
      }
    })
    document.addEventListener(
      'click',
      this.even,
      true
    )
    // console.log(JSON.parse(localStorage.getItem('userInfo')))
    // console.log(this.changeInfoList)
    if(this.$route.params.status == 'account'){
      // this.openEmodal()
      this.sendverifyEmail()
    }
  },
  destroyed() { 
    document.removeEventListener('click', this.even, true) 
  },
  methods: {
    async timeZoneList() {
      try {
        await this.$store.dispatch('timeZone')
        this.timezonelist = this.$store.state.user.timeZoneList
      } catch (error) {}
    },
    changeCover(e) {
      // console.log(e)
      var that = this
      const files = e.target.files[0]
      let data = new FormData()
      data.append('file', files);
      let id = JSON.parse(localStorage.getItem('userId'))
      // console.log(data.get('file'))
      that.imgLoading = true
      reqGetImg(id,data).then((res) => {
        // console.log(res)
        setTimeout(function () {
          that.alertShow = true
          that.alertType = 'success'
          that.alertTitle = 'Profile picture uploaded successfully'
          let dt = new Date()
          that.head_portrait = res.data + id + '_120_120.png?v=' + dt.getTime()
          that.$emit('changeImg', that.head_portrait)
          that.imgLoading = false
        },800)
      })
      // let fr = new FileReader()
      // fr.onload = function (e) {
      //   console.log(e.target.result)
      //   that.head_portrait = e.target.result
      // }
      // fr.readAsDataURL(files)
    },
    async changeUserInfo() {
      // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // this.changeInfoList.id = userInfo.id
      //   this.changeInfoList.ip_time_zone = item
      // console.log('用户时间', this.changeInfoList.ip_time_zone)
      let that = this
      const success = await that.$validator.validateAll()
      if (success) {
        // console.log('1231231',this.changeInfoList)
        let a = JSON.parse(localStorage.getItem('userInfo'))
        a.first_name = that.changeInfoList.first_name
        a.last_name = that.changeInfoList.last_name
        a.ip_time_zone = that.changeInfoList.ip_time_zone
        if(that.is_send_email){
          that.changeInfoList.is_send_email = 1
        }else{
          that.changeInfoList.is_send_email = 0
        }
        // console.log(a)
        that.btnLoading = true
        reqChangeUserInfo(that.changeInfoList).then((res) => {
          if (res.code == 0) {
            // console.log(res)
            setTimeout(function(){
              that.alertShow = true
              that.alertTitle = 'User information modification succeeded'
              that.alertType = 'success'
              that.btnLoading = false
              localStorage.setItem('userInfo',JSON.stringify(a))
              let username = that.changeInfoList.first_name + ' ' + that.changeInfoList.last_name
              that.$emit('changeName', username)
            },800)
          } else {
            // this.showLoading = false
            setTimeout(function(){
              that.alertShow = true
              that.alertTitle = error.message
              that.alertType = 'err'
              that.btnLoading = false
            },800)
          }
        })
        // this.showLoading = true
        // this.msgpassword = ''
        // this.alertShow = false
        // try {
        //   await this.$store.dispatch('changeUserInfo', this.changeInfoList)
        //   setTimeout(() => {
        //     this.alertShow = true
        //     this.alertType = 'success'
        //     this.alertTitle = 'User information modification succeeded'
        //     this.showLoading = false
        //   }, 800)
        // } catch (error) {
        //   this.showLoading = false
        //   this.alertShow = true
        //   this.alertTitle = error.message
        // }
      }
    },
    cancel() {
      this.$router.push('/dashboard')
    },
    uploadImg() {
      this.$refs.iptFileRef.click()
    },
    f1(data, index, clickOne) {
      this.selectItem = data
      this.selectShow = clickOne
    },
    f2(data, index, clickOne) {
      this.timezoneItem = data
      this.changeInfoList.ip_time_zone = data
      this.timezoneShow = clickOne
    },
    even(e){
      let s1 = this.$refs.languageSelect
      if (!s1.contains(e.target)) {
        this.selectShow = false
      }
      let s2 = this.$refs.timezoneSelect
      if (!s2.contains(e.target)) {
        this.timezoneShow = false
      }
    },
    openEmodal(){
      this.editEmail = ''
      this.emailStatus = '1'
      this.$refs.mask.style = 'display:block;'
      this.$refs.emailModal.style = 'display:block;'
      setTimeout(()=> {
        this.$refs.mask.style = 'display:block;opacity:1;'
        this.$refs.emailModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      },1)
    },
    closeModal(){
      this.$refs.mask.style = 'display:none;opacity:0;'
      this.$refs.emailModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      this.$refs.verifyModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      this.$refs.noticeMask.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
    },
    async subEmail(){
      const success = await this.$validator.validateAll('emails')
      if (success) {
        addEmail({
          id: this.changeInfoList.id,
          email: this.editEmail
        }).then((res)=>{
          if(res.msg == 'success'){
            this.$refs.emailModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
            this.$refs.verifyModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
            let timer = setInterval(() => {
              this.codeNum -= 1
              if (this.codeNum <= 0) {
                clearInterval(timer)
                this.showCode = true
                this.codeNum = 60
              }
            }, 1000)
            this.showCode = false
            this.$refs.firstInputRef.focus()
          }
          if(res.code == '-1'){
            this.isEmailTip = true
            this.emailTip = res.msg
          }
        })
      }
    },
    enterEmail(){
      this.isEmailTip = false
    },
    resend() {
      if(this.emailStatus == '1'){
        addEmail({
          id: this.changeInfoList.id,
          email: this.editEmail
        }).then((res)=>{

        })
      }else{
        verifyEmails().then((res)=>{
          this.$refs.firstInputRef.focus()
        })
      }
    },
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
      let code =
            this.aCheckCodeInput[0] +
            this.aCheckCodeInput[1] +
            this.aCheckCodeInput[2] +
            this.aCheckCodeInput[3] +
            this.aCheckCodeInput[4] +
            this.aCheckCodeInput[5]
      verifyEmail({
        id: this.changeInfoList.id,
        email: this.editEmail,
        code: code,
      }).then((res) => {
        this.showLoading = false
        if(res.code != 0){
          this.errMsg = res.msg
          this.errShow = true
        }
        if(res.code == 0){
          if(this.supers.email_status == '1'){
            this.closeModal()
            this.$message({
              message: 'Email verification successful!',
              offset: 70,
              type: 'success'
            })
          }else{
            this.$store.dispatch('userLogout')
            localStorage.removeItem("loginto")
            this.$router.push('/login')
          }
          // this.closeModal()
          // let info = JSON.parse(localStorage.getItem('userInfo'))
          // info.email = this.editEmail
          // this.changeInfoList.email = this.editEmail
          // localStorage.setItem('userInfo', JSON.stringify(info))
        }
      })
    },
    sendverifyEmail(){
      this.$refs.mask.style = 'display:block;'
      this.$refs.verifyModal.style = 'display:block;'
      setTimeout(()=> {
        this.$refs.mask.style = 'display:block;opacity:1;'
        this.$refs.verifyModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      },1)
    },
    verifyEmailCode(){
      let timer = setInterval(() => {
        this.codeNum -= 1
        if (this.codeNum <= 0) {
          clearInterval(timer)
          this.showCode = true
          this.codeNum = 60
        }
      }, 1000)
      this.showCode = false
      this.$refs.firstInputRef.focus()
      this.editEmail = this.changeInfoList.email
      this.emailStatus = '2'
      verifyEmails().then((res)=>{})
    },
    changeNotice(){
      // this.is_send_email = !this.is_send_email
      if(this.is_send_email){
        this.openNotice()
      }else{
        this.is_send_email = true
      }
    },
    openNotice(){
      this.$refs.mask.style = 'display:block;'
      this.$refs.noticeMask.style = 'display:block;'
      setTimeout(()=> {
        this.$refs.mask.style = 'display:block;opacity:1;'
        this.$refs.noticeMask.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      },1)
    },
    confirmNotice(){
      this.is_send_email = false
      this.closeModal()
    },
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
  watch: {
    changeInfoList: {
      handler(newVal) {
        // console.log(newVal)
      },
      deep: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
/* .breadcrumb {
  @apply pt-12 pb-2 bg-main dark:bg-darkMain max-w-1200 w-full mx-auto;
  transition: all 0.5s;
} */

/* .main1 {
  @apply max-w-1200 w-full mx-auto p-3 sm:p-5 bg-white dark:bg-darkMenu rounded shadow;
  transition: all 0.5s;
} */

.changeImg {
  @apply flex-shrink-0 flex flex-col items-center;
}

.uploadBtn {
  @apply bg-gray-500 hover:bg-gray-700 font-semibold mt-6 border-0 text-14 text-white rounded py-2 px-4 cursor-pointer;
}

.btn {
  @apply font-semibold border-0 text-white rounded bg-orange hover:bg-orange1 px-6 py-2.5 cursor-pointer;
}

.cancelbtn {
  @apply font-semibold mr-5 border border-solid border-gray-400 bg-white text-gray-900 hover:bg-gray-400 rounded px-6 py-2.5 cursor-pointer;
}

.btnGroup {
  @apply flex justify-end mt-10 w-full sm:w-95%;
}

.info {
  @apply w-full sm:w-1/2 mb-6 sm:mb-8;
}

.info > div {
  @apply w-full sm:w-90%;
}

.Select {
  @apply h-42px w-full bg-white hover:bg-selectOpen dark:bg-darkMain dark:border-darkMain border border-inputBorder rounded px-3 py-2 text-base cursor-pointer relative;
}

.selectOpen {
  @apply bg-selectOpen !important;
}

.inputTips {
  @apply text-xs text-red-500 absolute;
}

.loading {
  @apply w-full px-6 py-3.5 bg-orange justify-center rounded-md;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.valInput {
  @apply w-14% sm:w-12% text-4xl text-center py-4 bg-lightMenu border rounded focus:outline-none focus:ring focus:ring-formRing focus:border-formBorder;
}

.signupbtn {
  @apply w-full px-2.5 py-3.5 mb-3.5 text-white bg-orange hover:bg-orange1 rounded-md font-semibold border-0 cursor-pointer;
}

input[type="checkbox"] {
  @apply appearance-none w-12 h-6 relative rounded-2xl cursor-pointer bg-gray-200;
}

input[type="checkbox"]:before {
  @apply absolute w-5 h-5 bg-white shadow-sm left-0.5 top-0.5 rounded-full origin-left duration-300 ease-out;
  content: "";
}

input[type="checkbox"]:after {
  @apply inline-block whitespace-nowrap text-white font-bold;
  text-indent: 12px;
  word-spacing: 4px;
  font: 14px/30px monospace;
}

input[type="checkbox"]:checked {
  @apply bg-switch;
}

input[type="checkbox"]:checked:before {
  left: 26px;
}

input[type="checkbox"]:checked:after {
  @apply text-black;
}
</style>
