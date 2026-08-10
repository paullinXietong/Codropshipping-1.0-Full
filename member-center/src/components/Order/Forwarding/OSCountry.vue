<template>
  <div class="selectComponent">
    <div ref="selectUl"
         class="selectUl">
      <ul>
        <li :ref="item.en_nickname"
            :class="{ checked: selectChecked.en_nickname == item.en_nickname}"
            v-for="(item, index) in list"
            :key="index"
            @click="CheckedOne(item)">{{item.en_nickname}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSelectCountry',
  props: {
    selectList: [],
    selectChecked: {},
    selectOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: this.selectList,
    }
  },
  watch: {
    selectOpen: {
      handler(val, oldVal) {
        if (val == false) {
          this.list = this.selectList
        }
        if (this.list.length > 0 && this.selectChecked.code_two) {
          if (this.$refs[this.selectChecked.en_nickname][0].offsetTop > 200) {
            this.$refs.selectUl.scrollTop =
              this.$refs[this.selectChecked.en_nickname][0].offsetTop - 160
          } else {
            this.$refs.selectUl.scrollTop = 0
          }
        }
      },
    },
    selectList: {
      handler(val, oldVal) {
        this.list = this.selectList
      },
    },
  },
  methods: {
    CheckedOne(checked) {
      this.$emit('increment', checked, false)
    },
    Search(input){
      if(input!=''){
        this.$refs.selectUl.scrollTop = 0
      }
      let str = input.toUpperCase()
      let a = []
      for (let n = 0; n < this.selectList.length; n++) {
        if (
          this.selectList[n].code_two.toUpperCase().indexOf(str) != -1 ||
          this.selectList[n].en_nickname.toUpperCase().indexOf(str) != -1
        ) {
          a.push(this.selectList[n])
        }
      }
      this.list = a
    }
  },
}
</script>

<style lang="postcss" scoped>
.selectUl {
  @apply rounded-b-md max-h-52 overflow-auto cursor-pointer bg-white;
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

.selectComponent {
  @apply absolute top-16 left-0 w-full sm:w-96 shadow-md z-50;
}

ul {
  @apply my-1;
}

li {
  @apply h-10 bg-white hover:bg-lightMenu p-2 cursor-pointer overflow-hidden whitespace-nowrap;
}

.checked {
  @apply bg-formRing hover:bg-selectHover;
}
</style>
