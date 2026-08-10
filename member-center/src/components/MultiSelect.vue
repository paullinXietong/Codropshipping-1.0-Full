<template>
  <div class="selectComponent">
    <!-- <input ref="searchInput" type="text" class="input h-10 rounded-b-none"
      v-model="searchInput" @input="search"> -->
    <div class="selectUl">
      <ul>
        <li

          v-for="(item, index) in selectList"
          :key="index"
          @click="CheckedOne(index)"
        >{{item.c_name}}
        <div class="absolute top-3 left-2 w-4 h-4 rounded border border-gray-400 flex justify-center items-center"
          :class="[item.selected ? 'selectOne' : '']">
          <svg v-show="item.selected" t="1670207733333" class="icon w-3 h-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9414"><path d="M-31.315747 519.457481m54.305801-54.305801l45.435853-45.435854q54.305801-54.305801 108.611601 0l303.931466 303.931466q54.305801 54.305801 0 108.611601l-45.435854 45.435853q-54.305801 54.305801-108.611601 0l-303.931465-303.931465q-54.305801-54.305801 0-108.611601Z" p-id="9415" fill="#ffffff"></path><path d="M898.357541 105.745969m54.305801 54.305801l45.797892 45.797892q54.305801 54.305801 0 108.611602l-563.332174 563.332173q-54.305801 54.305801-108.611602 0l-45.797892-45.797892q-54.305801-54.305801 0-108.611601l563.332174-563.332174q54.305801-54.305801 108.611602 0Z" p-id="9416" fill="#ffffff"></path></svg>
        </div>
      </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSelect",
  props: {
    selectList: {},
    // selectChecked: String,
    selectOpen: {
      type: Boolean,
      default: false
    },
    id: null
  },
  data() {
    return {
      // list: this.selectList,
      searchInput: '',
    }
  },
  // mounted(){
  //   console.log(this.selectList)
  // },
  watch: {
    // selectOpen: {
    //   handler (val, oldVal) {
        // if(val == false){
        //   this.searchInput = ''
        //   this.list = this.selectList
        // }
        // if(this.$refs[this.selectChecked][0].offsetTop > 240){
        //   this.$refs.selectUl.scrollTop = this.$refs[this.selectChecked][0].offsetTop-200
        // }else{
        //   this.$refs.selectUl.scrollTop = 0
        // }
        // if(val){
        //   this.$refs.searchInput.focus()
        // }
    //  }
    // },
    // selectList:{
    //   handler (val, oldVal) {
    //     this.list = this.selectList
    //   }
    // }
  },
  methods: {
    CheckedOne(checked) {
      this.selectList[checked].selected = !this.selectList[checked].selected
      let a= []
      for(let n = 0;n < this.selectList.length;n++){
        if(this.selectList[n].selected){
          a.push(this.selectList[n])
        }
      }
      this.$emit("selected", a, this.id)
    },
    // search(){
    //   let str = this.searchInput.toUpperCase()
    //   let a = []
    //   for(let n=0; n<this.selectList.length; n++){
    //     if(this.selectList[n].toUpperCase().indexOf(str) != -1){
    //       a.push(this.selectList[n])
    //     }
    //   }
    //   this.list = a
    // },
  }
};
</script>

<style lang="postcss" scoped>
.selectUl{
  @apply rounded-md max-h-52 overflow-auto cursor-pointer bg-white dark:bg-darkMenu;
}

.selectUl::-webkit-scrollbar {
  width: 6px;
}

.selectUl::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.selectUl::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}

.selectComponent{
  @apply absolute top-0 left-0 w-full mt-0.5 shadow-md z-50 select-none;
}

ul{
  @apply my-1;
}

li{
  @apply h-10 bg-white dark:bg-darkMenu hover:bg-lightMenu dark:hover:bg-darkLine p-2 pl-7 cursor-pointer relative;
}

.selectOne{
  @apply bg-green-400;
}
</style>
