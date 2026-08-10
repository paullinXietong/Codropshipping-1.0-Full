<template>
  <div
    key="phone"
  >
    <div class="pb-2 flex justify-between">
      <label class="text-15 text-loginLabel">Whatsapp</label>
    </div>
    <div class="flex">
      <vue-country-intl
        schema="popover"
        v-model="countryCode"
        :showLabelImg="false"
        :onlyValue="true"
        :showSelectedText="false"
        searchInputPlaceholder="Enter country name, area code search"
        placeholder="select"
      >
        <button
          type="button"
          class="code-box flex items-center"
          slot="reference"
        >
          <span class="inline-block flex-1">
            <span v-if="countryCode!=''">+{{countryCode}}</span>
            <span
              v-else
              class="text-gray-500"
            >Select</span>
          </span>
          <i class="el-icon-arrow-down w-4"></i>
        </button>
      </vue-country-intl>
      <input
        v-model="phone"
        ref="whatsapp"
        class="input flex-1"
        style="border-top-left-radius: 0rem;border-bottom-left-radius: 0rem;"
        name="whatsapp"
        type="number"
        placeholder="Enter your whatsapp"
      />
    </div>
    <!-- <div class="inputTips">{{ errors.first("whatsapp") }}</div> -->
  </div>
</template>

<script>
import VueCountryIntl from 'vue-country-intl'
import 'vue-country-intl/lib/vue-country-intl.css'
export default {
  components: { VueCountryIntl },
  props:{
    value:{
      type: [String, Number],
      default: ''
    }
  }, 
  watch: {
    value: function (val) {
      this.whatsapp = val
    },
    countryCode() {
      this.$emit('input', '+' + this.countryCode + this.phone);
    },
    phone() {
      this.$emit('input', '+' + this.countryCode + this.phone);
    }
  },
  computed:{
    whatsapp: {
      get(){
        return this.whatsapp ? this.whatsapp : '+' + this.countryCode + this.phone;
      },
      set(val){
        this.$emit('input', val);
      }

    }
  },

  data() {
    return {
      countryCode: "",
      phone:''
    };
  },
  methods:{
    getInfo(){
      return {
        whatsapp: this.phone,
        code_no: '+'+this.countryCode,
      }
    }
  }
};
</script>

<style scoped>
.code-box {
  border: 1px solid #b5bac4;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: 0.25rem;
  border-width: 1px;
  width: 100px;
  border-right: 0;
  border-top-right-radius: 0rem;
  border-bottom-right-radius: 0rem;
}
</style>
