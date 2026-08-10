<template>
  <div class="w-full h-full p-3 sm:p-5">
    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 h-full p-1 bg-transparent dark:bg-transparent shadow-none">
        <div class="h-full flex text-sm">
          <chat-list class="h-full w-2/5 xl:w-1/4 hidden md:flex rounded-md shadow-default bg-white flex-col"></chat-list>
          <div class="overflow-hidden m-0 md:ml-4 xl:mx-4 h-full w-full md:w-3/5 xl:w-1/2 rounded-md shadow-default bg-white dark:bg-darkMenu flex flex-col relative">
            <div @click="chatList = false" v-show="chatList" ref="mask" class="mask"></div>
            <chat-list @chatWith="clickChatList"
              v-show="chatList" class="absolute top-0 left-0 w-64 h-full flex flex-col bg-white z-50 shadow-default"></chat-list>
            <div class="flex xl:hidden flex-shrink-0 py-3 px-5 items-center bg-warehouseList dark:bg-darkMenu border-b border-gray-300 dark:border-darkLine">
              <div ref="chatList" class="w-5 md:hidden block mr-5 relative">
                <img @click="listSwitch" src="../assets/chatList.svg" class="w-5 h-5 cursor-pointer" alt="">
              </div>
              <div ref="chatInfo" class="w-5 relative">
                <img @click="infoSwitch" src="../assets/chatInfo.svg" class="w-5 h-5 cursor-pointer" alt="">
                <chat-about v-show="chatInfo" :list="manage"
                  class="absolute top-6 -left-14 md:-left-4 w-80 bg-white rounded-md shadow-md"></chat-about>
              </div>
            </div>
            <div class="flex-shrink-0 py-3 px-5 flex border-b border-gray-300 dark:border-darkLine">
              <div class="font-medium">{{manage.englishname}} ·</div>
              <div class="pl-1 text-gray-400">Last seen: 1hour ago</div>
            </div>
            <div ref="chatPanel" class="pb-3 h-full overflow-y-scroll">
              <div v-for="(item,index) in chatMessage" :key="index">
                <div v-if="item.is_me == 1" class="px-5 py-3 flex justify-end">
                  <div class="w-full pr-3">
                    <div class="py-1 flex justify-end">
                      <div class="text-13 text-gray-500">{{ item.date_entered }}</div>
                      <!-- <div class="ml-3">{{ item.nickname }}</div> -->
                    </div>
                    <div class="py-1 sm:pl-16 flex justify-end">
                      <div>{{ item.msg }}</div>
                    </div>
                  </div>
                  <img :src="item.head_img" class="w-14 h-14 rounded-full flex-shrink-0" alt="">
                </div>

                <div v-else class="px-5 py-3 flex">
                  <img :src="item.head_img" class="w-14 h-14 rounded-full flex-shrink-0" alt="">
                  <div class="w-full pl-3">
                    <div class="py-1 flex">
                      <!-- <div class="mr-3">{{ item.nickname }}</div> -->
                      <div class="text-13 text-gray-500">{{ item.date_entered }}</div>
                    </div>
                    <div class="py-1 sm:pr-16">{{ item.msg }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-shrink-0 px-5 py-3 border-t border-gray-300 dark:border-darkLine relative">
              <div v-show="entering" class="absolute -top-6 left-2 text-13 text-gray-500">
                The other is typing...</div>
              <div class="mb-2.5 flex justify-between items-center">
                <div class="flex">
                  <div ref="emojiPanel" class="relative">
                    <img @click="emojiPanel = !emojiPanel" src="../assets/emoji.svg" class="w-7 h-7 p-1 rounded hover:bg-gray-200 dark:hover:bg-darkLine cursor-pointer" alt="">
                    <div v-show="emojiPanel" class="absolute -top-28 -left-2 w-52 p-2 bg-white dark:bg-darkMain rounded-md shadow-md grid grid-cols-6 gap-1">
                      <div v-for="(item,index) in emojiList" :key="index"
                        @click="emojiChoose" class="emojiItem">{{ item }}</div>
                    </div>
                  </div>
                  <input type="file"
                    style="display: none;"
                    accept="application/pdf,image/jpeg,image/png,image/jpg"
                    id="files"
                    ref="iptFileRef"
                    @change="uploads" />
                  <img @click="upload" src="../assets/chatUpload.svg"
                    class="ml-2 w-7 h-7 p-1 rounded hover:bg-gray-200 dark:hover:bg-darkLine cursor-pointer" alt="">
                </div>
                <button @click="sendMessage" class="py-1 px-3 rounded-2xl bg-gray-400 hover:bg-orange">
                  <img src="../assets/send.svg" class="w-4 h-4" alt="">
                </button>
              </div>
              <textarea @blur="cancelEnter" @input="sendEnter"
                ref="textArea" v-model="msg" rows="3"
                class="input text-13 resize-none bg-gray-50 border-gray-200"></textarea>
            </div>
          </div>
          <div class="w-1/4 h-full hidden xl:flex flex-col">
            <chat-about :list="manage"
              class="flex-shrink-0 rounded-md shadow-default"></chat-about>
            <div class="h-full overflow-hidden mt-4 flex flex-col rounded-md shadow-default bg-white dark:bg-darkMenu">
              <div class="flex-shrink-0 py-3 px-5 flex justify-between items-center border-b border-gray-300 dark:border-darkLine">
                <div class="font-medium">FAQs</div>
                <img src="../assets/refresh.svg" class="w-5 h-5 cursor-pointer" alt="">
              </div>
              <div class="h-full overflow-y-scroll py-3 px-5">
                <div class="mb-5 flex">
                  <div class="w-4 flex-shrink-0">
                    <img src="../assets/help.svg" class="mt-0.5 w-4 h-4" alt="">
                  </div>
                  <div class="w-full pl-1">
                    <div>How long does it take for air cargo to arrive?</div>
                    <div class="mt-1 text-gray-400">Distance,normally transit time for air freight service from China to any country around 7 -10 business days</div>
                  </div>
                </div>
                <div class="mb-5 flex">
                  <div class="w-4 flex-shrink-0">
                    <img src="../assets/help.svg" class="mt-0.5 w-4 h-4" alt="">
                  </div>
                  <div class="w-full pl-1">
                    <div>How long does it take for air cargo to arrive?</div>
                    <div class="mt-1 text-gray-400">Distance,normally transit time for air freight service from China to any country around 7 -10 business days</div>
                  </div>
                </div>
                <div class="mb-5 flex">
                  <div class="w-4 flex-shrink-0">
                    <img src="../assets/help.svg" class="mt-0.5 w-4 h-4" alt="">
                  </div>
                  <div class="w-full pl-1">
                    <div>How long does it take for air cargo to arrive?</div>
                    <div class="mt-1 text-gray-400">Distance,normally transit time for air freight service from China to any country around 7 -10 business days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChatAbout from '@/components/Chat/ChatAbout'
  import ChatList from '@/components/Chat/ChatList'
  export default {
    components: {
      ChatAbout,
      ChatList
    },
    data(){
      return{
        chatList: false,
        chatInfo: false,
        emojiPanel: false,
        emojiList: [
          '🙂','😁','😂','😊','😍','😐',
          '😕','😒','😢','😭','🎉','❤',
          '👌','👍','🙏','✊','✌','✋',
        ],
        chatMessage: [
          // {
          //   is_me: 1,
          //   nickname: 'leary li',
          //   date_entered: '05 Dec 2020, 19:35',
          //   msg: 'Hello',
          //   head_img: 'https://co-logistics.cn/api/uploads/head_img/122_40_40.png',
          //   msg_type: 0,
          //   is_read: 0,
          // },
          // {
          //   is_me: 0,
          //   nickname: 'Joann',
          //   date_entered: '05 Dec 2020, 19:35',
          //   msg: 'Yah, that sounds great Yah, that sounds great Yah, that sounds great',
          //   head_img: 'https://cbu01.alicdn.com/img/ibank/O1CN01A7vNpF1WEkiSpd1jF_!!2209751902757-0-cib.jpg',
          //   msg_type: 0,
          //   is_read: 0,
          // },
        ],
        msg: '',
        userID: 0,
        manage: {},
        manageID: 0,
        websocket: '',
        entering: false,
        times: '',
        startPos: 0,
        endPos: 0,
      }
    },
    created() {
      this.$emit('menu', 'affiliates')
      let user = JSON.parse(localStorage.getItem('userInfo'))
      this.userID = user.id
      // console.log(user)
      if(user.manage.id){
        this.manage = user.manage
        this.manageID = user.manage.id
      }
      this.StartWebSocket()
      let dt = new Date()
      this.times = dt.getTime()
    },
    mounted() {
      document.addEventListener(
        'click',
        this.even,
        true
      )
    },
    destroyed() {  
      document.removeEventListener('click', this.even, true) 
    },
    methods: {
      even(e){
        let emojiPanel = this.$refs.emojiPanel
        let chatInfo = this.$refs.chatInfo
        if (!emojiPanel.contains(e.target)) {
          this.emojiPanel = false
        }
        if (!chatInfo.contains(e.target)) {
          this.chatInfo = false
        }
      },
      infoSwitch() {
        this.chatInfo = !this.chatInfo
      },
      listSwitch() {
        this.chatList = true
      },
      clickChatList() {
        this.chatList = false
      },
      emojiChoose(e) {
        // console.log(e.target.innerText)
        this.insertTxtAndSetcursor(e.target.innerText)
        this.emojiPanel = false
      },
      sendMessage(){
        var message = {
          type: "chat_msg",
          from_user_id: this.userID,
          from_service_id: this.manageID,
          service_type: 1,
          msg_type: 0,
          msg: this.msg
        }
        this.websocket.send(JSON.stringify(message))
        this.msg = ''
      },
      sendEnter(){
        if(this.msg != ''){
          var message = {
            type: "chat_msg_entering",
            from_user_id: this.userID,
            service_type: 1,
          }
          this.websocket.send(JSON.stringify(message))
        }else{
          this.cancelEnter()
        }
      },
      cancelEnter(){
        this.getCursorPosition()
        var message = {
          type: "chat_msg_cancel_entering",
          from_user_id: this.userID,
          service_type: 1,
        }
        this.websocket.send(JSON.stringify(message))
      },
      getCursorPosition(){
        let element = this.$refs.textArea
        this.startPos = element.selectionStart
        this.endPos = element.selectionEnd
        // if (this.startPos === undefined || this.endPos === undefined) return
      },
      insertTxtAndSetcursor(emoji){
        let element = this.$refs.textArea
        let oldTxt = this.msg
        let result = oldTxt.substring(0, this.startPos) + emoji + oldTxt.substring(this.endPos)
        this.msg = result
        element.focus()
        this.$nextTick(() => {
          element.selectionStart = this.startPos + emoji.length
          element.selectionEnd = this.startPos + emoji.length
        })
      },
      StartWebSocket() {
        // this.websocket = new WebSocket("wss://chat.co-logistics.cn/wss")
        this.websocket.onopen = this.onOpen;
        this.websocket.onclose = this.onClose;
        this.websocket.onmessage = this.onMessage;
        this.websocket.onerror = this.onError;
      },
      onOpen(e) {
        var me_1 = {
          type: "init",
          from_user_id: this.userID,
          service_type: 1,
          status: ""
        }
        this.websocket.send(JSON.stringify(me_1))
      },
      onClose() {
        this.websocket.close();
      },
      onMessage(e) {
        var data = JSON.parse(e.data)
        // console.log(data)
        if(data.type == 'init'){
          let list = data.message_list
          for(let n=0;n<list.length;n++){
            list[n].head_img = list[n].head_img + '?v=' + this.times
          }
          this.chatMessage = list
        }else if(data.type == 'chat_msg'){
          let a = {
            date_entered: data.date_entered,
            head_img: data.head_img + '?v=' + this.times,
            is_me: data.is_me,
            is_read: data.is_read,
            msg: data.msg,
            nickname: data.nickname,
            msg_type: data.msg_type,
          }
          this.chatMessage.push(a)
        }else if(data.type == 'chat_msg_entering'){
          this.entering = true
        }else if(data.type == 'chat_msg_cancel_entering'){
          this.entering = false
        }
        this.$nextTick(() => {
          this.$refs.chatPanel.scrollTop = this.$refs.chatPanel.scrollHeight
        })
      },
      onError() {},
      upload() {
        this.$refs.iptFileRef.click()
      },
      uploads(e){
        const files = e.target.files[0]
        let data = new FormData()
        data.append('file', files)
        // console.log(this.$refs.iptFileRef.files)
      }
    }
  }
</script>

<style lang="postcss" scoped>
.mask {
  @apply absolute w-full h-full top-0 left-0 bg-lightText bg-opacity-70 z-50 ;
  transition: all 0.4s;
}

.emojiItem{
  @apply p-1 col-span-1 cursor-pointer text-center hover:bg-gray-200 dark:hover:bg-darkLine rounded-md;
}
</style>
