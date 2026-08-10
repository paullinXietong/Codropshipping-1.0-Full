<template>
  <div class="w-full h-full p-3 sm:p-5">
    <div class="h-full overflow-auto">
      <div class="breadcrumb">Affiliates</div>
      <div class="main1">
        <div class="py-5">
          <div class="flex mb-7 justify-between flex-wrap">
            <div class="affiliatesHeader">
              <label class="m-1">Link Invitation</label>
              <div class="flex mt-1">
                <input
                  type="text"
                  placeholder="https://Cargosoon.com/?r=asdfg"
                  class="input"
                  disabled
                />
                <button class="btn">Copy</button>
              </div>
            </div>
            <div class="affiliatesHeader">
              <label class="m-1">Code Invitation</label>
              <div class="flex mt-1">
                <input type="text" placeholder="code" class="input" disabled />
                <button class="btn">Copy</button>
              </div>
            </div>
          </div>
          <div
            class="border-t border-solid border-gray-300 dark:border-gray-500 py-12"
          >
            <div class="text-lg mb-2.5">
              Invite friends to join Cargosoon and earn shipping credits!
            </div>
            <div class="text-base">
              When each friend you recommend becomes a member and sends their
              first shipment, you get a $5 bonus. Plus your friends will get 20%
              off their first order on their first shipment just because you
              introduced them!
            </div>
          </div>
          <div
            class="border-t border-solid border-gray-300 dark:border-gray-500 py-12"
          >
            <div class="text-lg">Total Invites successed: 3</div>
            <affiliates-list :affiliatesList="affiliatesList"></affiliates-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AffiliatesList from '@/components/AffiliatesList'
  export default {
    components: {
      AffiliatesList
    },
    data(){
      return{
        affiliatesList:[
          {
            date: '2022-08-26 08:00:00',
            email: '13155133135115@163.com',
            reward: '$5.00',
            credited: '20',
          },
          {
            date: '2022-08-26 08:00:00',
            email: '13155133135115@163.com',
            reward: '$5.00',
            credited: '20',
          },
          {
            date: '2022-08-26 08:00:00',
            email: '13155133135115@163.com',
            reward: '$5.00',
            credited: '20',
          },
        ],
      }
    },
    created() {
      this.$emit('menu', 'affiliates')
    },
  }
</script>

<style lang="postcss" scoped>
.affiliatesHeader {
  @apply w-full lg:w-48% mb-5;
}

.btn {
  @apply font-semibold border-0 text-white rounded bg-orange hover:bg-orange1 px-6 py-2.5 cursor-pointer;
}

.input {
  @apply mr-2.5 cursor-not-allowed bg-lightMenu dark:bg-darkMain focus:ring-0;
  transition: all 0.5s;
}
</style>
