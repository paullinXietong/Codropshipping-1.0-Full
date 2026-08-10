
<template>
  <div class="relative bg-lightMenu">
    <div class=""></div>
    <div class="w-screen min-h-screen px-3 z-10 flex items-center text-lightText relative">
      <div class="fixed top-0 left-0 w-screen h-topmenu bg-lightTop z-50 overflow-hidden">
        <div class="w-full h-full flex pl-6">
          <a class="flex items-center h-full" :href="'//' +globalWeb" target="_blank">
            <img src="../../assets/codropshipping.svg" class="h-20" alt="" />
          </a>
        </div>
      </div>
      <div class="max-w-1440 w-full mx-auto my-28">
        <div class="max-w-xl bg-white flex mx-auto rounded shadow-default">
          <div class="w-full sm:px-10 px-3.5 pt-8">
            <div class="title">
              <div class="text-lg font-bold">Verification</div>
            </div>
            <div class="my-9 flex flex-col items-center text-center text-sm">
              <div>Please verify your email</div>
              <div class="flex justify-center items-center bg-lightMenu w-20 h-20 my-10 rounded-full">
                <img src="../../assets/email.svg"
                    class="w-9"
                    alt="">
              </div>
              <div>An email has been sent to {{this.$store.state.user.userEmail}}</div>
              <div>Please verify your email to continue.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      globalWeb: this.$globalWeb
    }
  },
  methods: {
    sendEmail() {
      this.$router.push('sendToEmail')
    },
  },
}
</script>

<style lang="postcss" scoped>
.title {
  @apply w-full pb-3 text-center;
}

.loginbtn {
  @apply w-full px-2.5 py-3.5 mb-3.5 text-white bg-orange hover:bg-orange1 rounded-md font-semibold border-0 cursor-pointer;
}

.tips {
  @apply text-orange hover:underline text-sm pb-5;
}

.loginBG {
  @apply fixed top-0 left-0 w-full h-full hidden sm:block z-10;
  background: url("../../assets/loginBG.webp") 50% 100% / cover no-repeat fixed;
}
</style>
