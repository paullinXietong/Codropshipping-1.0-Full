<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto">
      <div class="breadcrumb">Notifications</div>
      <div class="main1 bg-transparent dark:bg-transparent shadow-none px-0">
        <div class="noticeList">
          <notice-item :noticeList="noticeList"></notice-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NoticeItem from '@/components/NoticeItem'
  export default {
    components: {
      NoticeItem
    },
    data() {
      return {
        noticeList:[
          {
            title: "Enabling Desktop Notification1",
            toggle: true,
            content: "LinEnabling Desktop Notificationda,Enabling Desktop Notification,LinEnabling Desktop Notificationda,Enabling Desktop Notification.",
          },
          {
            title: "Enabling Desktop Notification2",
            toggle: false,
            content: "LinEnabling Desktop Notificationda,Enabling Desktop Notification,LinEnabling Desktop Notificationda,Enabling Desktop Notification.",
          },
          {
            title: "Enabling Desktop Notification3",
            toggle: false,
            content: "LinEnabling Desktop Notificationda,Enabling Desktop Notification,LinEnabling Desktop Notificationda,Enabling Desktop Notification.",
          },
          {
            title: "Enabling Desktop Notification4",
            toggle: true,
            content: "LinEnabling Desktop Notificationda,Enabling Desktop Notification,LinEnabling Desktop Notificationda,Enabling Desktop Notification.",
          },
          {
            title: "Enabling Desktop Notification5",
            toggle: false,
            content: "LinEnabling Desktop Notificationda,Enabling Desktop Notification,LinEnabling Desktop Notificationda,Enabling Desktop Notification.",
          },
        ],
      }
    },
    created() {
      this.$emit('menu', 'notice')
    },
  }
</script>

<style lang="postcss" scoped>

</style>
