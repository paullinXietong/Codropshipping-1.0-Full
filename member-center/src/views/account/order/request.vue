<template>
  <div class="w-full h-full p-5 relative">
    <div class="mx-auto max-w-1200 h-full overflow-y-auto pb-32 p-4 bg-white rounded-md shadow-default">
      <a :href="'//' + globalWeb" target="_self">
        <div class="flex items-center hover:underline">
          <img src="@/assets/arrowLeft.svg" class="w-7 mr-2" alt="">
          <div>Request a Quote</div>
        </div>
      </a>
      <div class="mt-9 grid grid-cols-1 gap-5">
        <div class="col-span-1">
          <div class="flex mb-2">
            <div class="required">*</div>
            Paste Product Link</div>
          <div class="relative">
            <input type="text" class="input" v-model="form.link" placeholder="Paste 1688/Taobao/Alibaba product link here"
              v-validate="'required|link'" name="link">
            <div class="inputTips">{{errors.first("link")}}</div>
          </div>
        </div>

        <div class="col-span-1">
          <div class="flex mb-2">
            <div class="required">*</div>
            Specify Quantity</div>
          <div class="relative">
            <input type="text" class="input" v-model="form.qty" placeholder="Please enter the purchase quantity"
              v-validate="'required|quantity'" name="quantity">
            <div class="inputTips">{{errors.first("quantity")}}</div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex mb-2">Specifications(e.g., color, size)</div>
          <div class="relative">
            <input type="text" class="input" v-model="form.size" name="size"
              placeholder="Please enter Specifications(e.g., color, size)">
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex mb-2">Remarks</div>
          <div class="relative">
            <textarea v-model="form.remark" rows="2" class="input resize-none"
              placeholder="Additional Requirements(Optonal) Example: Packaging customization, shipping needed."></textarea>
          </div>
        </div>
      </div>
      <div class="mt-6 flex justify-center">
        <button @click="onSubmit" class="w-full p-2.5 text-white rounded-lg bg-oranges hover:bg-orange">Get Quote Now!</button>
      </div>
      <div class="mt-3 text-xs text-center font-semibold" style="color: #FF0000;">Quotation Service Fee: $1 USD This fee covers manual procurement inquiry services. Payments are non-refundable and non-transferable.</div>
    </div>
  </div>
</template>

<script>
  import {
    orderDetails,
    getDetailsOfGoodsWarehousing
  } from '@/api/dropshipping'
  export default {
    data() {
      return {
        form: {
          link: '',
          img: '',
          qty: null,
          size: '',
          remark: '',
        },
        globalWeb: this.$globalWeb,
      }
    },
    mounted(){

    },
    methods: {
      async onSubmit(){
        const success = await this.$validator.validateAll();
        if (success) {
          
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .inputTips {
    @apply left-0 text-xs text-red-500 absolute;
  }
</style>