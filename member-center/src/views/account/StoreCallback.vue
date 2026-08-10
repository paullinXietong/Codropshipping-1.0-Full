<template>
  <div>

  </div>
</template>

<script>
  import {
    linkStorecb
  } from '@/api/user'
  export default {
    data() {
      return {
        form: {
          code: '',
          shop: '',
          state: '',
        }
      }
    },
    mounted(){
      // console.log(this.$route.query);
      // this.form.code = this.$route.query.code
      // this.form.shop = this.$route.query.shop
      // this.form.state = this.$route.query.state
      let forms = this.$route.query
      linkStorecb(forms).then((res)=>{
        this.$router.push({
          path: '/account/Shopify',
        })
      })
    },
    // methods: {
    //   getData(){

    //   }
    // }
  }
</script>