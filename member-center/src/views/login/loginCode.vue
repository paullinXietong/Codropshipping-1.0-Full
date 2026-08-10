<template>

</template>

<script>
  import{
    reqLoginCode
  } from "../../api/user"
  export default{
    data(){
      return{
        ruleForm: [],
        code: '',
        redirect: '',
      }
    },
    mounted(){
      this.code = this.$route.query.code
      this.redirect = this.$route.query.redirect
      reqLoginCode({
        code: this.code,
      }).then((res)=>{
        if(res.code == 0){
          this.ruleForm = res.data
          this.logout()
        }else{
          this.$router.push('/')
        }
      })
    },
    methods:{
      async logout() {
        const token = this.$store.state.user.token
        // console.log(token)
        if (token) {
          try {
            await this.$store.dispatch('userLogout')
            localStorage.removeItem("loginto")
            // this.$router.push('/login')
            // window.localStorage.clear()
            this.login()
          } catch (error) {}
        } else {
          this.login()
          // this.$router.push('/login')
        }
      },
      async login(){
        try {
          await this.$store.dispatch('userLoginCode', this.ruleForm)
          setTimeout(() => {
            if(this.redirect == 'tracking'){
              this.$router.push({
                name:'tracking'
              })
            }else if(this.$store.state.user.userInfo.email == null || this.redirect != 'dashboard'){
              this.$router.push({
                name:'profile',
                params: {
                  status: 'account',
                },
              })
            }else{
              if(this.$store.state.user.userInfo.super_level == 'L1'){
                this.$router.push({
                  name:'shippingList',
                  params: {level:'L1'},
                })
              }else{
                // this.$router.push('/main/booking')
                this.$router.push('/main/dashboard')
              }
            }
          }, 800)
          // console.log('用户信息', this.$store.state.user.userInfo)
          localStorage.setItem(
            'userInfo',
            JSON.stringify(this.$store.state.user.userInfo)
          )
          localStorage.setItem(
            'userId',
            JSON.stringify(this.$store.state.user.userInfo.id)
          )
          localStorage.setItem(
            'userImg',
            JSON.stringify(this.$store.state.user.userInfo.img)
          )
          localStorage.setItem(
            'first_name',
            JSON.stringify(this.$store.state.user.userInfo.first_name)
          )
          localStorage.setItem(
            'last_name',
            JSON.stringify(this.$store.state.user.userInfo.last_name)
          )
          localStorage.setItem(
            'customer_manage',
            JSON.stringify(this.$store.state.user.userInfo.manage)
          )
          
        } catch (error) {}
      }
    }
  }  
</script>