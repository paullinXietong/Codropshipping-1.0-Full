<template>
  <div class="w-full max-w-1600 m-auto h-full p-3 sm:p-5 overflow-scroll text-menu dark:text-darkText">
    <div class="text-xl font-semibold hidden">Member</div>
    <div class="mt-5">
      <div class="text-lg mb-3">Plan Overview/Apply</div>
      <div v-if="status == '44' || status == '2'" class="max-w-1200 p-4 bg-white dark:bg-darkMenu rounded-md shadow-default text-sm">
        <div class="max-w-416 relative">
          <label>Official email address of your company</label>
          <input type="email" class="input mt-2" v-model="email"
            placeholder="Official email address of your company"
            v-validate="'email'" name="email">
          <div class="text-xs text-red-500 absolute -bottom-4">{{ errors.first("email") }}</div>
        </div>
        <div class="mt-6">
          <div class="mb-2">Upload the business license of your company</div>
          <input type="file"
            style="display: none;"
            accept="application/pdf,image/jpeg,image/png,image/jpg"
            ref="iptFileRef"
            @change="uploadFiles" />
          <div v-show="!files.name" @click="chooseFile"
            class="p-5 flex justify-center items-center bg-gray-100 hover:bg-gray-200 border border-dashed border-gray-300 rounded-md cursor-pointer select-none">
            <svg t="1672105928501" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2693" width="18" height="18"><path d="M524.8 64c4.693333 0 8.533333 3.84 8.533333 8.533333V490.666667h418.133334c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H533.333333v418.133333a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333V554.666667H51.2a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H469.333333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h46.933333z" fill="#7a7a7a" p-id="2694"></path></svg>
            <div class="ml-2">Select file</div>
          </div>
          <div v-show="files.name" class="flex items-center">
            <svg t="1670585288869" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8034" width="16" height="16"><path d="M886.7 247.6L713.4 73.4c-6-6-14.2-9.4-22.7-9.4H192c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h640c35.3 0 64-28.7 64-64V270.2c0-8.5-3.3-16.6-9.3-22.6zM832 864c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h384v160c0 35.3 28.7 64 64 64h160v512zM704 288c-17.7 0-32-14.3-32-32V128l160 160H704z" p-id="8035" fill="#7a7a7a"></path><path d="M671 672H287c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32zM287 480c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H287zM287 352h192c17.7 0 32-14.3 32-32s-14.3-32-32-32H287c-17.7 0-32 14.3-32 32s14.3 32 32 32z" p-id="8036" fill="#7a7a7a"></path></svg>
            <div style="margin: 0 20px 0 5px;font-size: 16px;">{{ files.name }}</div>
            <svg @click="clearFile" style="cursor: pointer;" t="1670585138725" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4532" width="18" height="18"><path d="M806.4 263.2l-45.6-45.6L512 467.2 263.2 217.6l-45.6 45.6L467.2 512 217.6 760.8l45.6 45.6L512 557.6l248.8 248.8 45.6-45.6L557.6 512z" p-id="4533" fill="#7a7a7a"></path></svg>
          </div>
        </div>
        <div v-show="status == '2'" class="mt-6">
          <div class="mb-2 text-red-500">Open L2 Failure Reasons</div>
          <input type="text" class="input" v-model="this.remark" disabled />
        </div>
        <div class="mt-6 flex flex-col items-end">
          <div class="flex items-center">
            <router-link :to="{ name: 'member' }">
              <div class="font-semibold hover:underline">Cancel</div>
            </router-link>
            <button @click="submit(status)"
              class="ml-4 py-2 px-5 font-semibold bg-black hover:bg-orange rounded" style="color: #fadb93;">Submit</button>
          </div>
          <div ref="tips" class="mt-3 text-xs text-gray-400">Fill in one to submit</div>
        </div>
      </div>
      <div v-if="status == '0'" class="flex flex-col items-center text-center p-6 bg-white dark:bg-darkMenu rounded-md shadow-default text-sm">
        <svg t="1691050549128" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19567" width="48" height="48"><path d="M512 121.6c217.6 0 390.4 172.8 390.4 390.4S729.6 902.4 512 902.4 121.6 729.6 121.6 512 294.4 121.6 512 121.6m0-89.6C246.4 32 32 249.6 32 512s217.6 480 480 480 480-217.6 480-480S774.4 32 512 32z" p-id="19568" fill="#2c2c2c"></path><path d="M675.2 512H508.8V284.8c0-25.6-19.2-41.6-41.6-41.6H464c-25.6 0-41.6 19.2-41.6 41.6v272c0 25.6 19.2 41.6 41.6 41.6h214.4c25.6 0 44.8-22.4 44.8-44.8s-22.4-41.6-48-41.6z" p-id="19569" fill="#2c2c2c"></path></svg>
        <div class="my-3 font-semibold">Waiting to be reviewed</div>
        <div class="text-xs">Waiting for review to upgrade to L2 member, we will contact you within 24 hours.</div>
      </div>
      <div v-if="status == '1' && afterSuper == '3'" class="flex flex-col items-center text-center p-6 bg-white dark:bg-darkMenu rounded-md shadow-default text-sm">
        <svg t="1691051023522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23445" width="48" height="48"><path d="M512 1024c-281.6 0-512-230.4-512-512s230.4-512 512-512 512 230.4 512 512-230.4 512-512 512zM448 608L275.2 441.6 192 524.8 448 768l384-364.8L748.8 320 448 608z" p-id="23446" fill="#75bb43"></path></svg>
        <div class="my-3 font-semibold">L2 member opened successfully</div>
        <div class="mb-3 text-xs">Waiting for review to upgrade to L2 member, we will contact you within 24 hours.</div>
        <router-link :to="{ name: 'member' }">
          <div class="cursor-pointer hover:underline" style="color: #187ff5;">View Membership Benefits→</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMemberInfo,
  setMember,
  editMember,
  MemberFile
} from '@/api/user'
export default {
  data() {
    return {
      email: '',
      files: {},
      manageId: '',
      superLevel: '',
      status: '',
      remark: '',
      applyid: '',
      afterSuper: '',
    }
  },
  computed: {

  },
  created() {
    this.$emit('menu', 'Member')
    this.getInfo()
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    this.manageId = user.manage.id
    this.superLevel = user.super_level
  },
  methods: {
    getInfo(){
      getMemberInfo().then((res)=>{
        if(res.data.status){
          this.status = res.data.status
          // this.email = res.data.email
          this.remark = res.data.remark
          // this.files.name = res.data.file
          this.applyid = res.data.id
          this.afterSuper = res.data.after_super
        }else{
          this.status = '44'
        }
      })
    },
    chooseFile(){
      this.$refs.iptFileRef.click()
    },
    uploadFiles(e){
      this.files = e.target.files[0]
    },
    clearFile(){
      this.$refs.iptFileRef.value = ''
      this.files = {}
    },
    async submit(status){
      // console.log(status);
      const success = await this.$validator.validateAll()
      if (success) {
        // console.log('32423422s');
        if(this.files.name){
          let data = new FormData()
          data.append('file', this.files)
          MemberFile(data).then((res)=>{
            let file = res.data.file
            if(status == '44'){
              setMember({
                file: file,
                email: this.email,
                manage_id: this.manageId,
                super: this.superLevel,
              }).then((req)=>{
                this.getInfo()
              })
            }else{
              editMember({
                id: this.applyid,
                file: file,
                email: this.email,
              }).then((req)=>{
                this.getInfo()
              })
            }
          })
        }else if(this.email!=''){
          if(status == '44'){
            setMember({
              email: this.email,
              manage_id: this.manageId,
              super: this.superLevel,
            }).then((req)=>{
              this.getInfo()
            })
          }else{
            editMember({
              id: this.applyid,
              email: this.email,
            }).then((req)=>{
              this.getInfo()
            })
          }
        }else{
          this.$refs.tips.style = "color: red;"
        }
      }
    }
  },
}
</script>

<style lang="postcss" scoped>

</style>