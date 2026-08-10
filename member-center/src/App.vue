<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<script>
  export default {
    mounted(){
      // if(this.$store.state.user.token){
      //   // console.log(document.querySelector(".okki-chat--bubble-holder"),'1231313');
      //   // document.querySelector(".okki-chat--bubble-holder").style="display:none;"
      //   this.$nextTick(() => {
      //     import('./style/xm.css')
      //   });
      // }
    }
  }
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");

#app {
  font-family: "Inter", "Lato", "Ubuntu", sans-serif;
  background-color: #e6e6e6;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.input {
  @apply w-full bg-white dark:bg-darkMain border border-inputBorder dark:border-darkMain focus:outline-none focus:ring focus:ring-formRing focus:border-formBorder rounded px-3 py-2 text-base;
  transition: color 0.5s;
}

.inputErr {
  @apply w-full bg-white dark:bg-darkMain border outline-none border-red-500 rounded px-3 py-2 text-base;
  transition: color 0.5s;
}

input[type="date"]{
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

/* .okki-chat--bubble-holder{
  display: none;
} */

#nprogress .bar {
  background: #f39333 !important;
  height: 2px !important;
}
 
#nprogress .peg {
  box-shadow: 0 0 10px #f39333, 0 0 5px #f39333 !important;
  opacity: 1.0;
  width: 100px;
}
 
#nprogress .spinner {
  display: none;
}
.el-rate__icon{
  font-size: 26px;
}
</style>
