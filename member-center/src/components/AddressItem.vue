
<template>
  <div>
    <div v-show="addressList.length == 0" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../assets/noAddress.svg" class="md:w-72 md:h-72 w-40 h-40" alt="">
        <div class="mt-5 text-base text-center font-semibold">No shipping address</div>
      </div>
    </div>
    <div class="addressItem"
         v-for="(item, index) in addressList"
         :key="index">
      <div class="left">
        <div class="w-3/5 sm:w-70% mr-5">
          <div class="text-gray-500 pl-0 sm:pl-5">
            <div class="text-base font-semibold">{{ item.addressName }}</div>
            <div>{{ item.name }}</div>
            <div class="flex">
              <div v-show="item.address2.length>0">{{ item.address2 }},</div>
              <div>{{ item.address1 }}</div>
            </div>
            <div class="flex">
              <div>{{ item.area }}</div>,
              <div>{{ item.city }}</div>,
              <div>{{ item.zipcode }}</div>
            </div>
            <div>{{ item.country }}</div>
          </div>
        </div>
        <div class="w-2/5 sm:w-30%">
          <div class="text-gray-500">
            <div>tel: {{ item.phone }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <div class="mb-2">
            <div v-show="!item.defaultAddress" class="m-1 flex items-center text-sm">
              <input @change="checkDefault(item)" type="checkbox" v-model="item.defaultAddress" class="mr-1.5">
              <div>Default Address</div>
            </div>
            <div v-show="item.defaultAddress" class="m-1 py-1 px-3 bg-green-200 text-green-500 rounded text-13">Default Address</div>
          </div>
          <button class="changebtn"
                  @click="changeAddress(index,item.id)">Change address</button>
          <button class="removebtn"
                  id="removeTips"
                  @click="remove(item.id)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reqEditAddress,
  reqDelAddress,
  setDefault
} from '@/api/address'
export default {
  name: 'AddressItem',
  props: {
    // shippingAddress: {
    //   type: Object,
    //   default() {
    //     return {}
    //   },
    // },
    // addressIdDatas: [],
    addressList: [],
    // name: String,
    // address: String,
    // country: String,
    // phone: String,
    // id: Number,
  },
  data() {
    return {}
  },
  methods: {
    changeAddress(e, id) {
      this.$emit('showModal', 'edits', e, id)
    },
    remove(e) {
      this.$emit('showRemoveModal', e)
    },
    checkDefault(item){
      // console.log(item);
      if(item.defaultAddress){
        setDefault({
          id: item.id
        }).then((res)=>{
          this.$emit('editDefault')
        })
      }
    }
  },
}
</script>

<style lang="postcss" scoped>
.addressItem {
  @apply bg-white dark:bg-darkMenu flex items-center p-3 flex-wrap rounded shadow mt-5;
}

.left {
  @apply flex w-full lg:w-70% text-sm sm:text-15;
}

.right {
  @apply w-full lg:w-30%;
}

.right > div {
  @apply flex flex-row lg:flex-col items-center lg:items-end justify-start lg:justify-center w-full mx-auto max-w-416;
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
