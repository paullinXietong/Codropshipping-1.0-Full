<template>
  <div>
    <div class="hidden lg:block mt-5">
      <table class="table-auto text-center w-full">
        <tr>
          <th>Date</th>
          <th>Email</th>
          <th>Reward</th>
          <th>Credited</th>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ item.date }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.reward }}</td>
          <td>{{ item.credited }}</td>
        </tr>
      </table>
    </div>
    <div class="block lg:hidden mt-5">
      <div
        class="rounded p-2.5 text-sm mb-4 bg-main dark:bg-darkMain"
        style="transition: all 0.5s"
        v-for="(item, index) in list" :key="index"
      >
        <div class="flex">
          <div class="w-70">Date:</div>
          <div>{{ item.date }}</div>
        </div>
        <div class="flex">
          <div class="w-70">Email:</div>
          <div>{{ item.email }}</div>
        </div>
        <div class="flex">
          <div class="w-70">Reward:</div>
          <div>{{ item.reward }}</div>
        </div>
        <div class="flex">
          <div class="w-70">Credited:</div>
          <div>{{ item.credited }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AffiliatesList",
  props: {
    affiliatesList: {},
  },
  data() {
    return {
      list: this.affiliatesList,
    }
  },
};
</script>

<style lang="postcss" scoped>
th,
td {
  @apply border-b border-solid border-gray-300 dark:border-gray-500 p-2;
}

th {
  @apply font-medium;
}
</style>
