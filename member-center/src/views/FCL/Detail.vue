<template>
  <div class="w-full h-full p-2 sm:p-5 relative">
    <div class="h-full overflow-auto">
      <div class="breadcrumb max-w-1440 flex">
        <router-link to="/main/FCL">
          <div>PRICE LIST</div>
        </router-link>
        <div class="pl-2 text-lg text-signUpTip">> Detail</div>
      </div>
      <div class="main1 max-w-1440 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="bg-white dark:bg-darkMenu shadow-default rounded-md p-3 flex flex-wrap">
          <div class="w-full md:w-1/4 flex items-center">
            <img src="../../assets/ups.webp" class="w-16 h-16 rounded-full" alt="">
            <div class="ml-2">UPS</div>
          </div>
          <div class="mt-3 mb-4 w-full md:w-1/2 flex items-center text-center">
            <div class="flex-shrink-0">
              <div class="text-base sm:text-lg font-medium">Shenzhen</div>
              <div class="sm:text-base">China</div>
            </div>
            <div class="w-full px-3 text-gray-400 relative">
              <div class="border-b border-gray-400">26 days</div>
              <div>Transit</div>
              <svg t="1673504216656" class="icon absolute top-3 right-1.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4017" width="17" height="17"><path d="M704.7168 509.5424L279.074133 83.899733a25.6 25.6 0 1 1 36.181334-36.181333l443.733333 443.733333a25.6 25.6 0 0 1 0 36.181334l-443.733333 443.733333a25.6 25.6 0 1 1-36.181334-36.181333l425.642667-425.642667z" fill="#9ca3af" p-id="4018"></path></svg>
            </div>
            <div class="flex-shrink-0">
              <div class="text-base sm:text-lg font-medium">CHICAGO,IL</div>
              <div class="sm:text-base">United States</div>
            </div>
          </div>
          <div class="w-full md:w-1/4 text-right flex flex-row md:flex-col justify-center">
            <div>Expiration date</div>
            <div class="pl-3 md:pl-0">2023-01-01~2023-01-14</div>
          </div>
        </div>
        <div class="mt-3 bg-white dark:bg-darkMenu shadow-default rounded-md p-3">
          <div class="flex items-center bg-gray-200 dark:bg-darkLine p-1 rounded">
            <div class="mx-4">ETD:</div>
            <div class="flex flex-wrap text-xs">
              <div v-for="(id,nd) in etd" :key="nd"
                class="my-1 mx-1.5 py-1 px-2 bg-white dark:bg-darkMain rounded-md">{{ id }}</div>
            </div>
          </div>
          <div class="mt-7">
            <div class="mb-2 text-base font-medium">Fee Breakdown</div>
            <div class="rounded-md shadow overflow-hidden">
              <table class="table-auto text-center w-full">
                <tr class="bg-gray-200 dark:bg-darkLine">
                  <th>Fee Breakdown</th>
                  <th>20'GP</th>
                  <th>40'GP</th>
                  <th>40'HQ</th>
                  <th>45'HQ</th>
                </tr>
                <tr>
                  <td>Seal</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                </tr>
                <tr>
                  <td>Booking Fee(Box)</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                </tr>
                <tr>
                  <td>THC/ORC</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                </tr>
                <tr>
                  <td>TLX fee</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                </tr>
                <tr>
                  <td>Custom fee</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                </tr>
                <tr>
                  <td>ISPS</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                </tr>
                <tr>
                  <td>EIR</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                </tr>
                <tr>
                  <td>DOC</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                </tr>
                <tr>
                  <td>ANS/AMS</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                  <td>$2900</td>
                </tr>
              </table>
              <div class="mt-8 mb-2 mr-4 flex justify-end text-base font-medium">
                <div class="mr-5">Total cost:</div>
                <div>$10000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        etd: ['2023-01-01','2023-01-02','2023-01-03','2023-01-04','2023-01-05','2023-01-06']
      }
    },
    created() {
      this.$emit('menu', 'FCLprice')
    },
    methods:{
      
    }
  }
</script>

<style lang="postcss" scoped>
th,td{
  @apply py-2 text-13 sm:text-sm;
}

tr{
  @apply border-b border-gray-200 dark:border-darkLine hover:bg-gray-200 dark:hover:bg-darkLine
}
</style>
