<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
    :show-close='false'
    :modal-append-to-body='false'
  >
    <div slot="title">
      <div class="text-2xl text-center text-black">Welcome To CoDropShipping</div>
      <div class="text-center">You can choose the product categories that interest you</div>  
    </div>
    <div class="mb-4" v-for="(item,index) in hobbyList" :key='index'>
      <div class="mb-2">
        <img class="inline-block align-middle w-8 h-8 mr-4" :src="item.icon" alt="">  
        <div class="text-lg inline-block align-middle text-black">{{item.translatedName}}</div>
      </div>
      <div class="flex flex-wrap ml-2">
        <div 
          v-for="type in item.children" :key="type.categoryId" 
          :class="selectHobby.includes(type.categoryId)?'active':''" 
          class="py-2 px-6 mr-4 mb-2 text-sm border text-black rounded-full cursor-pointer select-none whitespace-nowrap"
          @click="selectHobbyItem(type.categoryId)"
          >
          {{type.translatedName}}
        </div>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <button
        class="active px-6 py-2 rounded-lg"
        @click="commitHobby"
      >Begin</button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getHobbyInfo,
  getUserHobby,
  setHobby
} from "@/api/user"

export default {
    data() {
      return {
        dialogVisible: false,
        selectHobby:[],
        hobbyList:[
        ]
      };
    },
    mounted(){
      getHobbyInfo().then(res=>{
        this.hobbyList = res.data;
      })
      getUserHobby().then(res=>{
        if(res.data.data){
          this.selectHobby = res.data.data.map(item=>item.categoryId);
        }
      })
    },
    methods: {
      commitHobby(){
        setHobby({
          categoryIdList: this.selectHobby
        }).then(res=>{
          if(res.code==0){
            this.dialogVisible = false;
          }
        })
      },
      selectHobbyItem(id){
        const index = this.selectHobby.findIndex(item=>item == id)
        if(index == -1){
          this.selectHobby.push(id)
        }else{
          this.selectHobby.splice(index,1)
        }
      },
      showHobby(){
        this.dialogVisible = true;
      },
      handleClose(done) {
      }
    }
  };
</script>

<style scoped>
.active{
  background-color: #f59a23;
  color: #ffffff;
}
</style>