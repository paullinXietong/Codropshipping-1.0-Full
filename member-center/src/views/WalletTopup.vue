<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask" @click="closeModal"></div>
    <div ref="modal" class="modal">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3 px-5">
        <div class="text-xl">Withdraw</div>
        <img id="closeImg" class="closeModal" @click="closeModal" src="../assets/close.svg" alt="">
      </div>
      <div class="p-5 text-sm border-b border-gray-200 dark:border-darkLine">
        <div class="flex justify-between items-center mb-5">
          <div class="text-lg font-semibold">Cargosoon Bank Information</div>
          <div>
            <img src="../assets/download.svg" class="w-5 h-5 cursor-pointer" alt="">
          </div>
        </div>
        <div class="modalItem">
          <div class="font-semibold flex-shrink-0 mr-8">Beneficiary Name:</div>
          <div>Cooperate Logistics Co., Ltd</div>
        </div>
        <div class="modalItem">
          <div class="font-semibold flex-shrink-0 mr-8">Beneficiary Address:</div>
          <div>B701, Bantian International Centre, Huanchengnan road, Longang district, Shenzhen</div>
        </div>
        <div class="modalItem">
          <div class="font-semibold flex-shrink-0 mr-8">Beneficiary Account No:</div>
          <div>1505 7566 5400 69</div>
        </div>
        <div class="modalItem">
          <div class="font-semibold flex-shrink-0 mr-8">Beneficiary Bank Name:</div>
          <div>Ping An Bank</div>
        </div>
        <div class="modalItem">
          <div class="font-semibold flex-shrink-0 mr-8">Beneficiary Bank Address:</div>
          <div>Ping An Bank Building NO. 1099 Shennan Road C. Shenzhen, P.R.China</div>
        </div>
        <div class="modalItem pb-6 border-b border-gray-200 dark:border-darkLine">
          <div class="font-semibold flex-shrink-0 mr-8">Beneficiary Bank SWIFT CODE:</div>
          <div>SZDBCNBS</div>
        </div>
        <div class="hidden text-center pb-6 border-b border-gray-200 dark:border-darkLine">Tip: In
          order to ensure that your recharge can be confirmed by Finance as soon as possible.</div>
        <div class="modalItem mt-5">
          <div class="text-lg font-semibold">Submit Transfer Slip</div>
          <div class="text-sm flex">
            <div>Amount:</div>
            <div class="text-red-600 ml-1 font-semibold">${{ customAmount }}</div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <input type="file"
                     style="display: none;"
                     accept="application/pdf,image/jpeg,image/png,image/jpg"
                     ref="iptFileRef"
                     @change="uploadImg" />
          <div class="relative flex flex-wrap" v-for="(item,index) in imgList" v-show="imgShow">
            <img :src="item" class="w-28 h-28 rounded-md m-2" alt="">
            <div class="absolute -top-1 -right-1 bg-gray-300 hover:bg-gray-400 w-7 h-7 cursor-pointer rounded-full flex justify-center items-center"
              @click="DeleteImg(index)">
              <img src="../assets/close1.svg" class="w-5 h-5" alt="">
            </div>
          </div>
          <div v-show="uploadShow" @click="upload"
            class="flex justify-center items-center flex-col m-2 w-28 h-28 bg-white hover:bg-gray-200 border border-dashed border-gray-500 rounded-md cursor-pointer">
            <img src="../assets/add.svg" class="w-6 h-6 mb-2.5" alt="">
            <div>Upload</div>
          </div>
        </div>
        <div class="mt-2.5 mb-6">Acceptable file types: .jpg, .jpeg, .png, .pdf</div>
      </div>
      <div class="flex justify-end">
        <button class="btn1 my-5 mx-3" @click="closeModal">Cancel</button>
        <button class="btn my-5 mx-3" @click="submitModal" v-show="!showLoading">Submit</button>
        <button class="loading my-5 mx-3" v-show="showLoading">
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
    <div class="h-full overflow-auto">
      <div class="breadcrumb flex">
        <div>My Wallet/</div>
        <div class="text-gray-600 dark:text-white">Top Up</div>
      </div>
      <div class="main1">
        <div class="panel">
          <div class="text-lg mt-4 pb-20 border-b border-gray-200 dark:border-darkLine">
            <div class="flex mb-7">
              <div class="w-44">Current Balance:</div>
              <div class=" text-xl">${{ balance }}</div>
            </div>
            <div class="amount">
              <div class="w-44 pb-2.5">Recharge Amount:</div>
              <div>
                <div class="flex flex-wrap">
                  <div class="amountItem">
                    <div id="amount1" @click="customAmount = '1000.00'">$1000.00</div>
                  </div>
                  <div class="amountItem">
                    <div id="amount2" @click="customAmount = '2000.00'">$2000.00</div>
                  </div>
                  <div class="amountItem">
                    <div id="amount3" @click="customAmount = '5000.00'">$5000.00</div>
                  </div>
                  <div class="amountItem">
                    <div id="amount4" @click="customAmount = '10000.00'">$10000.00</div>
                  </div>
                  <div class="amountItem">
                    <div id="amount5" @click="customAmount = '20000.00'">$20000.00</div>
                  </div>
                </div>
                <div style="width: 260px;" class="relative">
                  <label @click="InputFocus"
                  class="absolute rounded-r-md top-1px right-1px h-10 p-2 border-l border-gray-300 bg-white">USD</label>
                  <input type="text" ref="customAmount"
                    class="input" v-model="customAmount"
                    placeholder="$ Custom Amount">
                </div>
              </div>
            </div>
            <div class="amount">
              <div class="w-44 pb-2.5">Payment Method:</div>
              <div>
                <div class="flex flex-wrap">
                  <div class="mb-5 border-2 px-4 py-2 h-16 rounded shadow mr-2" :class="payment_method==1?'active-border':''">
                    <label class="flex items-start cursor-pointer">
                      <input class="mt-2.5" type="radio" v-model="payment_method" name="paymentMethod" value="1">
                      <div class="ml-4 w-8">
                        <img src="../assets/creditCard.svg" class="w-8" alt="">
                      </div>
                      <div class="ml-3 w-40">
                        <div>Credit Card</div>
                        <div class="text-sm text-gray-400">3.9% handling charge.</div>
                      </div>
                    </label>
                  </div>
                  <div class="mb-5 border-2 px-4 py-2 h-16 rounded shadow mr-2" :class="payment_method==3?'active-border':''">
                    <label class="flex items-start cursor-pointer">
                      <input class="mt-2.5" type="radio" v-model="payment_method" name="paymentMethod" value="3">
                      <div class="ml-4 w-8">
                        <img src="../assets/paypal.svg" class="w-6" alt="">
                      </div>
                      <div class="ml-3 w-40">
                        <div>Paypal</div>
                        <div class="text-sm text-gray-400">4.4% handling charge.</div>
                      </div>
                    </label>
                  </div>
                  <div class="mb-5 border-2 px-4 py-2 h-16 rounded shadow mr-2" :class="payment_method==5?'active-border':''">
                    <label class="flex items-start cursor-pointer">
                      <input class="mt-2.5" type="radio" v-model="payment_method" name="paymentMethod" value="5">
                      <div class="ml-4 w-8">
                        <img src="../assets/creditCard.svg" class="w-8" alt="">
                      </div>
                      <div class="ml-3 w-40">
                        <div>Wire Transfer</div>
                        <!-- <div class="text-sm text-gray-400">0% handling charge.</div> -->
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-end;margin: 40px 0 20px;">
            <router-link class="mr-5" :to="{ name: 'wallet' }">
              <button class="cancelbtn">cancel</button>
            </router-link>
            <button class="btn" @click="Topup">Top up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  reqWallet,
  reqImgUpload,
  walletTopup
} from '@/api/wallet'
export default {
  data() {
    return {
      balance: null,
      customAmount: '',
      imgList: [],
      imgShow: false,
      uploadShow: true,
      payment_method: null,
      showLoading: false,
    }
  },
  created(){
    this.$emit('menu', 'wallet')
    reqWallet().then((res) => {
      this.balance = this.balanceFormat(res.data.balance)
    })
  },
  mounted(){},
  methods: {
    Topup(){
      if(this.customAmount != ''){
        if(this.payment_method == 5){
          this.customAmount = this.balanceFormat(this.customAmount)
          this.openModal()
        }else if(this.payment_method == 1||this.payment_method == 3){
          let topup = {
            running_amount: parseFloat(this.customAmount),
            payment_method: this.payment_method,
            redirect_url: window.location.protocol + "//" + window.location.host + '/account/TopUpResult',
          }
          walletTopup(topup).then((res) => {
            window.open(res.data.url,"_self")
          })
        }
      } else {
        this.$refs.customAmount.focus()
      }
    },
    openModal() {
      let that = this
      that.$refs.mask.style = "display:block;";
      that.$refs.modal.style = "display:block;";
      setTimeout(function () {
        that.$refs.mask.style = "display:block;opacity:1;";
        that.$refs.modal.style = "display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;";
      },1)
    },
    closeModal() {
      let that = this
      that.$refs.mask.style = "display:block;";
      that.$refs.modal.style = "display:block;";
      setTimeout(function () {
        that.$refs.mask.style = "display:none;opacity:0;";
        that.$refs.modal.style = "display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;";

      },140)
    },
    submitModal() {
      // this.closeModal()
      this.showLoading = true
      let topup = {
        running_amount: parseFloat(this.customAmount),
        payment_method: this.payment_method,
        image: '',
      }
      topup.image = this.imgList.join(',')
      // console.log(topup)
      walletTopup(topup).then((res) => {
        if (res.code == 0) {
          setTimeout(() => {
            this.$router.push("wallet")
          },800)
        } else {
          this.showLoading = false
        }
      })
    },
    upload() {
      this.$refs.iptFileRef.click()
    },
    uploadImg(e) {
      var that = this
      const files = e.target.files[0]
      let data = new FormData()
      data.append('file', files);
      reqImgUpload(data).then((res)=>{
        if( res.code == 0 ){
          that.imgList.push(res.data.image)
          that.imgShow = true
          if(that.imgList.length>=3){
            that.uploadShow = false
          }
        }
      })
    },
    DeleteImg(e) {
      this.imgList.splice(e,1)
      this.uploadShow = true
    },
    inputNum(value){
      value = value.replace(/[^\d.]/g, "");
      value = value.replace(/^\./g, "");
      value = value.replace(/\.{2,}/g, ".");
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      this.customAmount = value
    },
    InputFocus(){
      this.$refs.customAmount.focus()
    },
    balanceFormat(num){ 
      num += ''
      num = num.replace(/[^0-9|\.]/g, '')
      if(/^0+/)
      num = num.replace(/^0+/, '')
      if(!/\./.test(num))
      num += '.00'
      if(/^\./.test(num))
      num = '0' + num 
      num += '00' 
      num = num.match(/\d+\.\d{2}/)[0]
      
      return num
    }
  },
  watch: {
    'customAmount': {
      handler(newVal, old) {
        this.inputNum(newVal)
      },
      deep: true,
      immediate: true
    },
  }
};
</script>

<style lang="postcss" scoped>
.active-border{
  border: 2px solid;
  border-color: rgba(96, 165, 250, var(--tw-border-opacity)) 
}

.amount{
  @apply flex flex-col md:flex-row mb-7;
}

.amountItem{
  @apply w-1/3 sm:w-28;
}

.amountItem>div{
  @apply text-center w-90% mb-4 text-sm font-semibold rounded px-2.5 py-1.5 cursor-pointer bg-lightMenu hover:bg-lightMenuHover dark:bg-darkMain dark:hover:bg-gray-500;
}

.btn {
  @apply w-28 font-semibold border-0 text-white text-15 rounded bg-orange hover:bg-orange1 px-6 py-2.5 cursor-pointer;
}

.btn1 {
  @apply w-28 font-semibold text-white text-15 border-0 rounded bg-gray-500 hover:bg-gray-700 px-6 py-2.5 cursor-pointer;
}

.cancelbtn {
  @apply font-semibold border border-solid border-gray-400 bg-white text-gray-900 hover:bg-gray-400 rounded px-6 py-2.5 cursor-pointer;
}

.loading {
  @apply w-28 px-6 py-2.5 bg-orange justify-center rounded-md;
}

.mask{
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: all .4s;
}

.modal{
  @apply fixed top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 w-900 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu z-50 rounded text-lightText dark:text-darkText;
  transition: transform .4s;
}

.closeModal{
  @apply w-7 h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded;
}

.modalItem{
  @apply flex justify-between items-start md:items-center md:flex-row flex-col mb-3 text-13;
}
</style>
