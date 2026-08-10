<template>
  <div class="selectComponent">
    <input ref="searchInput"
           type="text"
           class="input h-10 rounded-b-none"
           v-model="searchInput"
           @input="search">
    <div ref="selectUl"
         class="selectUl">
      <ul>
        <li :ref="item.name"
            class=" overflow-hidden"
            :class="{ checked: selectChecked.name == item.name}"
            v-for="(item, index) in list"
            :key="index"
            @click="CheckedOne(item)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectCity',
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
      searchInput: '',
    }
  },
  // mounted(){
  //   console.log(this.selectList)
  // },
  watch: {
    selectOpen: {
      handler(val, oldVal) {
        if (val == false) {
          this.searchInput = ''
          this.list = this.selectList
        }
        if (this.list.length > 0 && this.selectChecked.name) {
          if (this.$refs[this.selectChecked.name][0].offsetTop > 240) {
            this.$refs.selectUl.scrollTop =
              this.$refs[this.selectChecked.name][0].offsetTop - 200
          } else {
            this.$refs.selectUl.scrollTop = 0
          }
        }
        if (val) {
          this.$refs.searchInput.focus()
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
    search() {
      this.$refs.selectUl.scrollTop = 0
      let str = this.searchInput.toUpperCase()
      let a = []
      for (let n = 0; n < this.selectList.length; n++) {
        if (this.selectList[n].name.toUpperCase().indexOf(str) != -1) {
          a.push(this.selectList[n])
        }
      }
      this.list = a
    },
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
  @apply absolute top-11 left-0 w-full shadow-md z-50;
}

ul {
  @apply my-1;
}

li {
  @apply h-10 bg-white hover:bg-lightMenu p-2 cursor-pointer;
}

.checked {
  @apply bg-formRing hover:bg-selectHover;
}
</style>
