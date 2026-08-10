<template>
  <div>
    <div class="panel text-sm">
      <div>
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
        <div class="mt-3 flex items-center">
          <div>remark</div>
          <input v-model="remark" type="text" class="input ml-3">
        </div>
      </div>
      <div class="mt-5 py-2 border-b border-gray-300 dark:border-darkLine flex justify-end">
        <button class="btn" @click="upload">Upload</button>
        <button class="btn ml-3" @click="downloadAll">Download All</button>
      </div>

      <div v-if="list.length == 0" class="mt-5 py-20 bg-white dark:bg-darkMenu flex justify-center items-center">
        <div class="flex flex-col items-center">
          <img src="../../../assets/nofile.svg" class="md:w-56 md:h-56 w-40 h-40" alt="">
        </div>
      </div>

      <div v-show="list.length>0">
        <div class="py-2 border-b border-gray-300 dark:border-darkLine flex items-center justify-between">
          <div class="w-auto lg:w-1/5">File Name</div>
          <div class="hidden lg:block w-1/5">Uploader</div>
          <div class="hidden lg:block w-1/5">Remark</div>
          <div class="hidden lg:block w-1/5">Upload time</div>
          <div class="w-auto lg:w-1/5">Operations</div>
        </div>
        <div v-for="(i,n) in list" :key="n"
          class="py-2 border-b border-gray-300 dark:border-darkLine flex items-center justify-between">
          <div class="pr-2 w-auto lg:w-1/5 break-all">{{ i.name }}</div>
          <div class="hidden lg:block w-1/5">{{ i.user_name }}</div>
          <div class="hidden lg:block w-1/5">{{ i.remark }}</div>
          <div class="hidden lg:block w-1/5">{{ i.created_data }}</div>
          <div class="w-auto lg:w-1/5 flex">
            <button class="btn" @click="download(i)">Download</button>
            <button class="btn ml-3" @click="del(i)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOrderInfo,
  ImgUpload,
  saveFile,
  delFile
} from '@/api/order'
export default {
  name: 'ForwardDocuments',
  props: {
    id: null,
    tab: ''
  },
  data() {
    return {
      remark: '',
      files: {},
      list: []
    }
  },
  watch:{
    tab: {
      handler (val, oldVal) {
        if(val==3){
          this.getFile()
        }
      }
    }
  },
  mounted(){
    // this.getFile()
  },
  methods: {
    getFile(){
      getOrderInfo({
        id: this.id,
        type: 4
      }).then(res=>{
        this.list = res.data
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
    upload(){
      let data = new FormData()
      data.append('file', this.files);
      ImgUpload(data).then((res)=>{
        // console.log(res)
        let file = {
          id: this.id,
          file: res.data.file,
          name: res.data.name,
          remark: this.remark
        }
        saveFile(file).then((reh)=>{
          this.files = {}
          this.remark = ''
          if(reh.code==0){
            this.$emit('successM')
          }
          this.getFile()
        })
      })
    },
    download(e){
      var link= document.createElement("a");
      link.href = e.file; 
      link.download = "orderFile";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadAll(){
      for(let n=0;n<this.list.length;n++){
        var link= document.createElement("a");
        link.href = this.list[n].file; 
        link.download = "orderFile";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    del(e){
      delFile({id: e.id}).then((res)=>{
        if(res.code==0){
          this.$emit('delM')
        }
        this.getFile()
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.panel{
  @apply p-6 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default;
}

.btn{
  @apply py-1 px-4 bg-black hover:bg-gray-500 text-white rounded;
}
</style>