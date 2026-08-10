<template>
  <div ref="all" class="light">
    <div class="w-screen h-screen bg-lightMenu dark:bg-darkMain">
      <div ref="maskImg"
        @click="closeImgMask"
        class="fixed w-full h-full top-0 left-0 bg-lightText opacity-70 hidden z-60">
      </div>
      <div ref="openImgPanel"
        @click="closeImgMask"
        class="fixed top-0 left-0 hidden z-60 max-w-full max-h-full w-full h-full justify-center items-center">
        <img class="max-w-90% max-h-80% w-full h-full object-contain" :src="openImgs" alt="">
      </div>

      <div class="topMenu" ref="topMenu">
        <div class="topMenuLeft">
          <div class="pl-2 sm:pl-6 w-152 sm:w-leftmenu h-full flex items-center flex-row-reverse sm:flex-row relative">
            <a class="flex items-center h-full" :href="'//' + globalWeb" target="_blank">
              <img src="../../assets/codropshipping.svg" class="h-20" alt="" />
            </a>
          </div>
          <router-link :to="{ name: 'dashboard' }" class="flex items-center">
            <button class="py-1 px-5 text-orange bg-white hover:bg-gray-200 rounded text-sm">Switch to Functionality</button>
          </router-link>
        </div>
        <div class="topMenuRight" v-if="istoken">
          <div class="hidden md:block mr-1 sm:mr-4 p-1 rounded sm:hover:bg-gray-700 cursor-pointer relative"
            ref="feedback" @click.self="feedbackSwitch">
            Feedback
            <div v-show="feedbackMenu" class="dark:bg-darkMenu dark:text-gray-400 topSelect top-10 -right-24 sm:-right-4 p-2.5 w-80 h-64 text-13 cursor-default">
              <div v-show="!feedbackSuccess">
                <div class="mb-1.5">Tell us your suggestion or report an issue</div>
                <textarea rows="3" v-model="feedbackInput" class="input text-13 resize-none"></textarea>
                <div class="mt-3 mb-1.5">Reply-to email</div>
                <input type="text" class="input text-13 py-1" v-model="email" disabled>
                <div class="mt-3 flex text-14 font-medium">
                  <button class="mr-2 py-1 px-2 bg-orange hover:bg-orange1 rounded-md text-white"
                  @click="sendFeedback">Send feedback</button>
                  <button class="py-1 px-2 bg-gray-100 hover:bg-gray-300 border border-gray-300 rounded-md text-gray-500"
                  @click="cancelFeedback">Cancel</button>
                </div>
              </div>
              <div v-show="feedbackSuccess" class="h-full flex justify-center items-center relative">
                <div v-show="feedbackLoading">
                  <img src="../../assets/loading.svg" class="w-20 h-20 animate-spin" alt="">
                </div>
                <div v-show="!feedbackLoading">
                  <img src="../../assets/thankFeedback.svg" class="w-24 h-24 mx-auto mb-5" alt="">
                  <div>Thank you for your feedback!</div>
                </div>
              </div>
            </div>
          </div>
          <div @click="checkTheme()" class="mr-1 sm:mr-4 p-1 rounded sm:hover:bg-gray-700 cursor-pointer">
            <img src="../../assets/light1.svg" class="w-26 h-26" alt="" />
          </div>
          <div class="hidden mr-1 sm:mr-5 p-1 rounded sm:hover:bg-gray-700 cursor-pointer relative"
            ref="message" @click.self="messageSwitch">
            <img @click.self="messageSwitch" src="../../assets/chat1.svg" class="w-26 h-26" alt="" />
            <div class="hidden absolute top-0 right-0 w-3.5 h-3.5 leading-none bg-red-500 rounded-full text-xs text-white text-center">
              3
            </div>
            <div v-show="messageMenu" class="dark:bg-darkMenu dark:text-gray-400 topSelect top-10 -right-24 sm:-right-4 w-80 cursor-default">
              <div class="flex justify-between items-center bg-gray-50 dark:bg-darkMain py-2.5 px-5">
                <div>Contacts Message</div>
              </div>
              <div class="my-8">
                <img src="../../assets/noMessage.svg" class="w-28 h-28 mx-auto mb-1" alt="">
                <div class="text-center">No message</div>
              </div>
            </div>
          </div>
          <div class="mr-1 sm:mr-4 p-1 rounded sm:hover:bg-gray-700 cursor-pointer relative"
            ref="notice" @click.self="noticeSwitch">
            <img @click.self="noticeSwitch" src="../../assets/notice1.svg" class="w-26 h-26" alt=""/>
            <div v-show="noRead>0" class="absolute top-0 right-0 w-3.5 h-3.5 leading-none bg-red-500 rounded-full text-xs text-white text-center">
              {{noRead}}
            </div>
            <div v-show="noticeMenu"
              class="dark:bg-darkMenu dark:text-gray-400 topSelect top-10 -right-16 sm:-right-4 w-80 sm:w-96 cursor-default">
              <div class="flex justify-between items-center bg-gray-50 dark:bg-darkMain py-2.5 px-5">
                <div>Notifications</div>
                <div @click="readAll" class="text-gray-500 text-13 cursor-pointer hover:underline">Mark all as read</div>
              </div>
              <div ref="noticePanel" v-show="noticeList.length>0" class="h-72 overflow-auto notiList">
                <div v-for="(ni,nn) in noticeList" :key="nn"
                  class="border-t border-gray-200 dark:border-darkLine py-2.5 px-5 relative hover:bg-tableHover dark:hover:bg-darkLine">
                  <div class="flex justify-between text-13">
                    <div class="leading-tight">{{ni.msg}}</div>
                    <div class="text-gray-500 w-24 flex-shrink-0 text-right">{{ni.created_data}}</div>
                  </div>
                  <div class="mt-3 flex">
                    <div @click="viewNotice(ni,nn)" class="text-blue-500 hover:underline cursor-pointer">View details</div>
                  </div>
                  <div v-show="ni.is_read == 0" class="absolute top-3 left-2 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </div>
              <div v-show="noticeList.length==0" class="my-8">
                <img src="../../assets/noNotification.svg" class="w-28 h-28 mx-auto mb-1" alt="">
                <div class="text-center">No notification</div>
              </div>
            </div>
          </div>
          <!-- <a href="https://www.cargosoon.com/help" target="_blank"
            class="hidden md:block mr-1 sm:mr-4 p-1 rounded sm:hover:bg-gray-700 cursor-pointer">
            <img src="../../assets/help.svg" class="w-26 h-26" alt="" />
          </a> -->
          <router-link :to="{ name: 'member' }" v-if="superLevel == 'L1'" class="mr-4">
            <div class="py-1.5 px-3 hidden md:flex items-center rounded-md text-xs" style="background-color: #463b2b;">
              <img src="../../assets/member_icon.png" class="w-6 mr-2" alt="">
              <div style="color: #ffb342;">Free L2 Membership Upgrade</div>
            </div>
          </router-link>
          <div class="mr-0 sm:mr-8 relative cursor-pointer" ref="s1" @click="userSwitch">
            <div class="p-1 flex items-center sm:hover:bg-gray-700 rounded">
              <div class="relative">
                <img :src="head_portrait" class="mr-1 sm:mr-4 w-10 h-10 rounded-full" alt="" />
                <img v-if="superLevel == 'L1'" src="../../assets/lv1.png" class="absolute right-0 -bottom-1.5 w-7" alt="">
                <img v-if="superLevel == 'L2'" src="../../assets/lv2.png" class="absolute right-0 -bottom-1.5 w-7" alt="">
              </div>
              <div class="hidden sm:block mr-4 max-w-200 overflow-hidden whitespace-nowrap overflow-ellipsis">{{userName}}</div>
              <img src="../../assets/down1.svg" class="w-20px h-20px" alt="" />
            </div>
            <div v-show="userMenu" class="topSelect top-12 right-0 w-200">
              <router-link :to="{ name: 'profile' }"
                class="block p-2 hover:bg-item"
                :class="{ visited: isvisited == 'profile' }">Profile</router-link>
              <router-link :to="{ name: 'changePassword' }"
                class="block p-2 hover:bg-item"
                :class="{ visited: isvisited == 'changePassword' }">Change Password</router-link>
              <router-link :to="{ name: 'shippingAddresses' }"
                class="block p-2 hover:bg-item"
                :class="{ visited: isvisited == 'address' }">Shipping Addresses</router-link>
              <span @click.prevent="logout"
                class="block p-2 hover:bg-item border-t border-solid border-gray-200">
                Logout
              </span>

            </div>
          </div>
        </div>
        <div v-else class="mr-8">
          <router-link :to="{ name: 'login' }">
            <button class="text-sm px-3 py-0.5 rounded bg-orange hover:bg-orange1 text-white">Log in</button>
          </router-link>
          <router-link :to="{ name: 'signUp' }">
            <button class="ml-3 text-sm px-3 py-0.5 rounded bg-orange hover:bg-orange1 text-white">Sign up</button>
          </router-link>
        </div>
      </div>
      <div class="fixed top-12 left-0 z-40 bg-lightMenu dark:bg-darkMain w-full h-leftmenu overflow-auto">
        <div class="mx-auto max-w-1200 h-full p-3 flex">
          <div class="w-80 flex-shrink-0 overflow-auto">
            <div class="mt-10 flex flex-col items-center text-center">
              <!-- <img src="../../assets/cargosoonLogo1.png" class="w-28 " alt=""> -->
              <div class="mt-7 text-xl font-semibold">Welcome to CoDropshipping.</div>
              <div class="mt-5 text-13 w-56">Facilitate the transportation and storage of your goods</div>
            </div>
            <div class="mt-10 px-1.5">
              <router-link :to="{ name: 'tracking' }">
                <div class="px-5 py-2.5 bg-white hover:bg-serviceType flex items-center">
                  <div>
                    <div>Cargo Tracking</div>
                    <div class="mt-2 text-xs leading-relaxed">Clear and fast information about the location, status.</div>
                  </div>
                  <img src="../../assets/cargoTracking.png" class="w-20 ml-5" alt="">
                </div>
              </router-link>
              <router-link :to="{ name: 'consolidation' }">
                <div class="px-5 py-2.5 bg-white hover:bg-serviceType flex items-center">
                  <div>
                    <div>Cargo Consolidation</div>
                    <div class="mt-2 text-xs leading-relaxed">Collection of goods from multiple vendors.</div>
                  </div>
                  <img src="../../assets/cargoConsolidation.png" class="w-20 ml-5" alt="">
                </div>
              </router-link>
              <router-link :to="{ name: 'shopify' }">
                <div class="px-5 py-2.5 bg-white hover:bg-serviceType flex items-center">
                  <div>
                    <div>Drop shipping</div>
                    <div class="mt-2 text-xs leading-relaxed">Affiliate shopify and amazon store and you're good to go!</div>
                  </div>
                  <img src="../../assets/dropShipping.png" class="w-20 ml-5" alt="">
                </div>
              </router-link>
              <a :href="'//' + globalWeb" target="_blank">
                <div class="px-5 py-2.5 bg-white hover:bg-serviceType flex items-center">
                  <div>
                    <div>Product Sourcing</div>
                    <div class="mt-2 text-xs leading-relaxed">Sourcing From China Becomes So Easy!</div>
                  </div>
                  <img src="../../assets/productSourcing.png" class="w-20 ml-5" alt="">
                </div>
              </a>
            </div>
          </div>
          <div class="w-full ml-5 bg-white rounded-lg relative">
            <div ref="chatPanels" class="overflow-y-auto" style="height: calc(100% - 96px);">
              <div v-show="manageAI" class="py-8 flex flex-col items-center">
                <img src="../../assets/gptIcon.png" class="w-16" alt="">
                <div class="mt-7 text-lg">Hello, I am CoDropshippingAl assistant</div>
                <div class="mt-8 text-xs">How can I help you?</div>
                <div class="mt-5 flex text-xs">
                  <div @click="sendAI(1)" class="mx-1.5 w-64 p-1.5 text-blueBtn text-center rounded-lg hover:underline cursor-pointer" style="background-color: #F2F2F2;">How to check price</div>
                  <div @click="sendAI(2)" class="mx-1.5 w-64 p-1.5 text-blueBtn text-center rounded-lg hover:underline cursor-pointer" style="background-color: #F2F2F2;">Services</div>
                  <div @click="sendAI(3)" class="mx-1.5 w-64 p-1.5 text-blueBtn text-center rounded-lg hover:underline cursor-pointer" style="background-color: #F2F2F2;">Become a member</div>
                </div>
              </div>
              <div class="px-8 pb-6">
                <div v-for="(i,n) in chatMessage" :key="n">
                  <div v-if="i.is_me == 1">
                    <div class="pt-5 pb-2 text-xs text-center text-gray-500">{{i.date_entered}}</div>
                    <div class="py-2 flex justify-end">
                      <div class="pr-2 flex flex-col items-end" style="width:calc( 100% - 80px )">
                        <div class="flex items-end justify-end flex-wrap">
                          <div class="ml-2 text-sm dark:text-gray-400">{{i.nickname}}</div>
                        </div>
                        <div v-if="i.msg_type == 0" class="mt-1.5 px-3 py-1.5 text-13 text-white rounded-3xl bg-chatMe min-w-40px max-w-full relative break-words">
                          {{i.msg}}
                          <div v-show="i.is_read == 1" class="absolute bottom-0 -left-6">
                            <svg t="1678437391950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30218" width="18" height="18"><path d="M511.006881 64.592111c-247.195985 0-447.565479 200.369493-447.565479 447.566502 0 247.168356 200.369493 447.566502 447.565479 447.566502 247.168356 0 447.566502-200.398146 447.566502-447.566502C958.573383 264.961604 758.175237 64.592111 511.006881 64.592111zM511.006881 895.376551c-211.645304 0-383.217938-171.59924-383.217938-383.217938 0-211.646328 171.572634-383.217938 383.217938-383.217938s383.217938 171.572634 383.217938 383.217938C894.22482 723.776288 722.652186 895.376551 511.006881 895.376551z" fill="#7a7a7a" p-id="30219"></path><path d="M706.369338 385.719922c-11.580756 0-22.099321 4.700045-29.706579 12.308327L454.6135 620.581997l-137.570215-138.074705c-7.608282-7.609305-18.098193-12.308327-29.706579-12.308327-23.161512 0-41.958624 18.769482-41.958624 41.959647 0 11.580756 4.670369 22.043039 12.252045 29.622668l167.277818 167.837566c7.580652 7.580652 18.098193 12.308327 29.706579 12.308327 11.609409 0 22.099321-4.700045 29.707602-12.308327l0 0.028653 251.754814-252.343215c7.553023-7.580652 12.252045-18.070564 12.252045-29.65132C748.327962 404.491451 729.53085 385.719922 706.369338 385.719922z" fill="#7a7a7a" p-id="30220"></path></svg>
                          </div>
                        </div>
                        <div v-if="i.msg_type == 2" class="mt-1.5 px-3 py-1.5 text-13 rounded-3xl bg-chatMe min-w-40px max-w-full relative break-words text-blue-700">
                          <a :href="i.msg" target="_blank" class="cursor-pointer underline">{{i.file_name}}</a>
                          <div v-show="i.is_read == 1" class="absolute bottom-0 -left-6">
                            <svg t="1678437391950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30218" width="18" height="18"><path d="M511.006881 64.592111c-247.195985 0-447.565479 200.369493-447.565479 447.566502 0 247.168356 200.369493 447.566502 447.565479 447.566502 247.168356 0 447.566502-200.398146 447.566502-447.566502C958.573383 264.961604 758.175237 64.592111 511.006881 64.592111zM511.006881 895.376551c-211.645304 0-383.217938-171.59924-383.217938-383.217938 0-211.646328 171.572634-383.217938 383.217938-383.217938s383.217938 171.572634 383.217938 383.217938C894.22482 723.776288 722.652186 895.376551 511.006881 895.376551z" fill="#7a7a7a" p-id="30219"></path><path d="M706.369338 385.719922c-11.580756 0-22.099321 4.700045-29.706579 12.308327L454.6135 620.581997l-137.570215-138.074705c-7.608282-7.609305-18.098193-12.308327-29.706579-12.308327-23.161512 0-41.958624 18.769482-41.958624 41.959647 0 11.580756 4.670369 22.043039 12.252045 29.622668l167.277818 167.837566c7.580652 7.580652 18.098193 12.308327 29.706579 12.308327 11.609409 0 22.099321-4.700045 29.707602-12.308327l0 0.028653 251.754814-252.343215c7.553023-7.580652 12.252045-18.070564 12.252045-29.65132C748.327962 404.491451 729.53085 385.719922 706.369338 385.719922z" fill="#7a7a7a" p-id="30220"></path></svg>
                          </div>
                        </div>
                        <div v-if="i.msg_type == 1" class="mt-1.5 relative">
                          <!-- <div @click="openImg($event)" v-html="i.msg" class="messageImg">{{i.msg}}</div> -->
                          <div @click="openImg($event)" class="messageImg">
                            <img :src="i.msg" alt="">
                          </div>
                          <div v-show="i.is_read == 1" class="absolute bottom-0 -left-6">
                            <svg t="1678437391950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30218" width="18" height="18"><path d="M511.006881 64.592111c-247.195985 0-447.565479 200.369493-447.565479 447.566502 0 247.168356 200.369493 447.566502 447.565479 447.566502 247.168356 0 447.566502-200.398146 447.566502-447.566502C958.573383 264.961604 758.175237 64.592111 511.006881 64.592111zM511.006881 895.376551c-211.645304 0-383.217938-171.59924-383.217938-383.217938 0-211.646328 171.572634-383.217938 383.217938-383.217938s383.217938 171.572634 383.217938 383.217938C894.22482 723.776288 722.652186 895.376551 511.006881 895.376551z" fill="#7a7a7a" p-id="30219"></path><path d="M706.369338 385.719922c-11.580756 0-22.099321 4.700045-29.706579 12.308327L454.6135 620.581997l-137.570215-138.074705c-7.608282-7.609305-18.098193-12.308327-29.706579-12.308327-23.161512 0-41.958624 18.769482-41.958624 41.959647 0 11.580756 4.670369 22.043039 12.252045 29.622668l167.277818 167.837566c7.580652 7.580652 18.098193 12.308327 29.706579 12.308327 11.609409 0 22.099321-4.700045 29.707602-12.308327l0 0.028653 251.754814-252.343215c7.553023-7.580652 12.252045-18.070564 12.252045-29.65132C748.327962 404.491451 729.53085 385.719922 706.369338 385.719922z" fill="#7a7a7a" p-id="30220"></path></svg>
                          </div>
                        </div>
                        <div v-if="i.msg_type == 3 || i.msg_type == 4" class="mt-1.5 relative">
                          <div class="p-3 rounded-md bg-white shadow-default">
                            <div class="flex items-center mb-1.5">
                              <img v-show="i.msg.img != ''" :src="i.msg.img" class="w-7 h-7 rounded-full mr-1" alt="">
                              <div class="text-sm font-semibold">{{i.msg.name}}</div>
                            </div>
                            <div v-show="i.msg.date != ''" class="flex items-center">
                              <img src="../../assets/dtdtime.svg" class="w-3 h-3 mr-1" alt="">
                              <div class="text-xs">{{i.msg.date}}</div>
                            </div>
                            <div class="flex items-center my-0.5">
                              <img src="../../assets/dtdprice.svg" class="w-3 h-3 mr-1" alt="">
                              <div class="flex items-center">
                                <div class="text-red-500 font-semibold">{{i.msg.price}}</div>
                                <div v-show="i.msg_type == 3" class="text-xs">{{i.msg.weight}}</div>
                              </div>
                            </div>
                            <div v-show="i.msg.destination != ''" class="flex items-center">
                              <img src="../../assets/dtdlocation.svg" class="w-3 h-3 mr-1" alt="">
                              <div class="text-xs">{{i.msg.destination}}</div>
                            </div>
                          </div>
                          <div v-show="i.is_read == 1" class="absolute bottom-0 -left-6">
                            <svg t="1678437391950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30218" width="18" height="18"><path d="M511.006881 64.592111c-247.195985 0-447.565479 200.369493-447.565479 447.566502 0 247.168356 200.369493 447.566502 447.565479 447.566502 247.168356 0 447.566502-200.398146 447.566502-447.566502C958.573383 264.961604 758.175237 64.592111 511.006881 64.592111zM511.006881 895.376551c-211.645304 0-383.217938-171.59924-383.217938-383.217938 0-211.646328 171.572634-383.217938 383.217938-383.217938s383.217938 171.572634 383.217938 383.217938C894.22482 723.776288 722.652186 895.376551 511.006881 895.376551z" fill="#7a7a7a" p-id="30219"></path><path d="M706.369338 385.719922c-11.580756 0-22.099321 4.700045-29.706579 12.308327L454.6135 620.581997l-137.570215-138.074705c-7.608282-7.609305-18.098193-12.308327-29.706579-12.308327-23.161512 0-41.958624 18.769482-41.958624 41.959647 0 11.580756 4.670369 22.043039 12.252045 29.622668l167.277818 167.837566c7.580652 7.580652 18.098193 12.308327 29.706579 12.308327 11.609409 0 22.099321-4.700045 29.707602-12.308327l0 0.028653 251.754814-252.343215c7.553023-7.580652 12.252045-18.070564 12.252045-29.65132C748.327962 404.491451 729.53085 385.719922 706.369338 385.719922z" fill="#7a7a7a" p-id="30220"></path></svg>
                          </div>
                        </div>
                      </div>
                      <img :src="i.head_img" class="flex-shrink-0 w-12 h-12 rounded-full" alt="">
                    </div>
                  </div>

                  <div v-if="i.is_me == 0">
                    <div class="pt-5 pb-2 text-xs text-center text-gray-500">{{i.date_entered}}</div>
                    <div class="py-2 flex">
                      <img :src="i.head_img" class="flex-shrink-0 w-12 h-12 rounded-full" alt="">
                      <div class="pl-2 flex flex-col items-start" style="width:calc( 100% - 80px )">
                        <div class="flex items-start flex-wrap-reverse">
                          <div class="text-sm mr-2 dark:text-gray-400">{{i.nickname}}</div>
                          <!-- <div class="text-xs text-gray-500">{{i.date_entered}}</div> -->
                        </div>
                        <div class="mt-1.5 px-3 py-1.5 text-13 rounded-3xl bg-gray-200 min-w-40px max-w-full overflow-x-hidden break-words"
                          v-if="i.msg_type == 0">{{i.msg}}</div>
                        <div class="mt-1.5 px-3 py-1.5 text-13 rounded-3xl bg-gray-200 min-w-40px max-w-full overflow-x-hidden break-words text-blue-700"
                          v-if="i.msg_type == 2">
                          <a :href="i.msg" download class="cursor-pointer underline">{{i.file_name}}</a>
                        </div>
                        <!-- <div @click="openImg($event)" v-if="i.msg_type == 1" v-html="i.msg" class="messageImg mt-1.5">{{i.msg}}</div> -->
                        <div @click="openImg($event)" v-if="i.msg_type == 1" class="messageImg mt-1.5">
                          <img :src="i.msg" alt="">
                        </div>
                        <div v-if="i.msg_type == 3 || i.msg_type == 4" class="mt-1.5 relative">
                          <div class="p-3 rounded-md bg-gray-100 shadow-default">
                            <div class="bg-white rounded-md shadow-default overflow-hidden">
                              <div v-show="i.msg_type == 4" class="text-13">
                                <div class="p-2">Cargo Consolidation</div>
                                <table class="w-full table-auto text-center border-t border-l">
                                  <tr>
                                    <th class="py-2 border-r border-b font-normal">Cabinet type</th>
                                    <th class="py-2 border-r border-b font-normal">Volume</th>
                                    <th class="py-2 border-r border-b font-normal">Unit price (cabinet)</th>
                                  </tr>
                                  <tbody>
                                    <tr v-for="(ix,nx) in i.msg.price_list" :key="nx">
                                      <td class="py-2 border-r border-b">{{ ix.type }}</td>
                                      <td class="py-2 border-r border-b">{{ ix.volume }}</td>
                                      <td class="py-2 border-r border-b">{{ ix.price }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div class="p-3">
                                <div class="flex items-center mb-1.5">
                                  <img v-show="i.msg.img != ''" :src="i.msg.img" class="w-7 h-7 rounded-full mr-1" alt="">
                                  <div class="text-sm font-semibold">{{i.msg.name}}</div>
                                </div>
                                <div v-show="i.msg.date != ''" class="flex items-center">
                                  <img src="../../assets/dtdtime.svg" class="w-3 h-3 mr-1" alt="">
                                  <div class="text-13">{{i.msg.date}}</div>
                                </div>
                                <div v-show="i.msg.unit_price" class="flex items-center mt-0.5">
                                  <img src="../../assets/dtdprice.svg" class="w-3 h-3 mr-1" alt="">
                                  <div class="text-13">${{i.msg.unit_price}}/kg</div>
                                </div>
                                <div class="flex items-center my-0.5">
                                  <img src="../../assets/dtdprice.svg" class="w-3 h-3 mr-1" alt="">
                                  <div class="flex items-center">
                                    <div v-show="i.msg_type == 4" class="text-red-500 font-semibold">USD {{i.msg.total_price}}</div>
                                    <div v-show="i.msg_type == 4" class="text-13 flex items-center">
                                      (<div v-for="(it,nt) in i.msg.type_and_number" :key="nt">
                                        <span v-show="nt>0">+</span>
                                        {{it.number}} * {{it.type}}
                                      </div>)
                                    </div>
                                    <div v-show="i.msg_type == 3" class="text-red-500 font-semibold">{{i.msg.price}}</div>
                                    <div v-show="i.msg_type == 3" class="text-13">{{i.msg.weight}}</div>
                                  </div>
                                </div>
                                <div v-show="i.msg.destination != ''" class="flex items-center">
                                  <img src="../../assets/dtdlocation.svg" class="w-3 h-3 mr-1" alt="">
                                  <div class="text-13">{{i.msg.destination}}</div>
                                </div>
                                <div v-show="i.msg.tax == '1'" class="flex items-center mt-2.5">
                                  <div class="py-0.5 px-3 rounded text-13"
                                    style="color: #5dba00;background-color: #ebf9ed;">Included Tax</div>
                                </div>
                              </div>
                            </div>
                            <div v-show="i.msg_type == 4" class="mt-4 text-gray-400 text-xs">
                              Tips: Time: Includes route transportation time only
                            </div>
                            <div class="flex justify-center text-sm">
                              <button class="mt-3 py-1.5 px-10 bg-orange hover:bg-orange1 text-white rounded-md"
                                @click="toPriceDetails(i.msg.detail_info,i.msg_type)">Get Discount</button>
                            </div>
                          </div>
                        </div>
                        <div v-if="i.msg_type == 12" class="mt-1.5 relative text-13">
                          <div class="p-3 rounded-md bg-gray-100 shadow-default">
                            <div class="bg-white rounded-md shadow-default">
                              <div class="p-2">Cargo Consolidation</div>
                              <table v-if="i.msg_state == 0" class="table-auto text-center border-t border-l">
                                <tr>
                                  <th class="border-r border-b font-normal">Total Volume(CBM)</th>
                                  <th class="border-r border-b font-normal">Number of suppliers</th>
                                  <th class="border-r border-b font-normal">Prices(kg)</th>
                                </tr>
                                <tbody>
                                  <tr v-for="(ix,nx) in i.msg" :key="nx">
                                    <td class="py-2 border-r border-b">{{ ix.volume }}</td>
                                    <td class="py-2 border-r border-b">{{ ix.supplier }}</td>
                                    <td class="py-2 border-r border-b">{{ ix.price }}</td>
                                  </tr>
                                </tbody>
                              </table>
                              <div v-if="i.msg_state == 1" class="px-2 pb-2">
                                <div class="flex">
                                  <div class="text-gray-400 w-36">Total volume(CBM):</div>
                                  <div>{{ i.msg.volume }}</div>
                                </div>
                                <div class="flex">
                                  <div class="text-gray-400 w-36">Number of suppliers:</div>
                                  <div>{{ i.msg.suppliers }}</div>
                                </div>
                                <div class="flex items-center">
                                  <div class="text-gray-400 w-36">Prices:</div>
                                  <div class="text-red-500 font-semibold text-base">${{ i.msg.price }}</div>
                                </div>
                              </div>
                            </div>
                            <div class="mt-4 text-gray-400 text-xs">
                              <div>Tips: Warehouse address</div>
                              <div>102 Building C, Hezhihe Industrial Park, No. 2990 Songbai Road, Shiyan, Baoan, Shenzhen</div>
                              <div>Customer service call: 0755-28225927/15323780975</div>
                              <div>Name:Andy</div>
                            </div>
                          </div>
                        </div>
                        <div v-if="i.msg_type == 11" class="mt-1.5 relative text-13">
                          <div class="p-3 rounded-md bg-gray-100 shadow-default max-w-sm">
                            <div class="bg-white rounded-md shadow-default">
                              <div class="p-2">Cargo Consolidation</div>
                              <table v-if="i.msg_state == 0" class="w-full table-auto text-center border-t border-l">
                                <tr>
                                  <th class="py-2 border-r border-b font-normal">Service name</th>
                                  <th class="py-2 border-r border-b font-normal">Prices</th>
                                </tr>
                                <tbody>
                                  <tr v-for="(ix,nx) in i.msg" :key="nx">
                                    <td class="py-2 border-r border-b">{{ ix.service_name }}</td>
                                    <td class="py-2 border-r border-b">{{ ix.prices }}</td>
                                  </tr>
                                </tbody>
                              </table>
                              <div v-if="i.msg_state == 1" class="px-2 pb-2">
                                <div class="flex">
                                  <div class="text-gray-400 w-36">Warehouse address:</div>
                                  <div>{{ i.msg.warehouse_address }}</div>
                                </div>
                                <div class="flex">
                                  <div class="text-gray-400 w-36">Total volume(CBM):</div>
                                  <div>{{ i.msg.total_volume }}</div>
                                </div>
                                <div class="flex">
                                  <div class="text-gray-400 w-36">Cargo type:</div>
                                  <div>{{ i.msg.cargo_type }}</div>
                                </div>
                                <div class="flex">
                                  <div class="text-gray-400 w-36">Of boxes:</div>
                                  <div>{{ i.msg.of_boxes }}</div>
                                </div>
                                <div class="flex">
                                  <div class="text-gray-400 w-36">Inventory time:</div>
                                  <div>{{ i.msg.inventory_time }}</div>
                                </div>
                                <div class="flex">
                                  <div class="text-gray-400 w-36">Fee days:</div>
                                  <div>{{ i.msg.free_days }}</div>
                                </div>
                                <div class="flex">
                                  <div class="text-gray-400 w-36">Outbound service:</div>
                                  <div>{{ i.msg.outbound_service }}</div>
                                </div>
                                <div class="flex items-center">
                                  <div class="text-gray-400 w-36">Prices:</div>
                                  <div class="text-red-500 font-semibold text-base">${{ i.msg.free }}</div>
                                </div>
                              </div>
                            </div>
                            <div class="mt-4 text-gray-400 text-xs">
                              <div>Tips: Warehouse address</div>
                              <div>102 Building C, Hezhihe Industrial Park, No. 2990 Songbai Road, Shiyan, Baoan, Shenzhen</div>
                              <div>Customer service call: 0755-28225927/15323780975</div>
                              <div>Name:Andy</div>
                            </div>
                          </div>
                        </div>
                        <div class="AI_msg mt-1.5 pl-7 pr-5 py-1.5 text-13 rounded-3xl bg-gray-200 min-w-40px max-w-full overflow-x-hidden break-words"
                          v-if="i.msg_type == 13" v-html="i.msg"></div>
                        <div class="mt-1.5 px-3 py-1.5 text-13 rounded-3xl bg-gray-200 min-w-40px max-w-full overflow-x-hidden break-words"
                          v-if="i.msg_type == 5">
                          <div>{{nologinHello[0]}}</div>
                          <div>{{nologinHello[1]}}</div>
                          <div>{{nologinHello[2]}}</div>
                          <div>{{nologinHello[3]}}</div>
                          <div class="mt-2 pt-2 border-t border-gray-700">WhatsApp:{{manageNew.whatsappp}}</div>
                          <div>e-mail:{{manageNew.service_email}}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="i.msg_type == 999" class="my-3 text-gray-400 text-center text-xs">{{ i.msg }}</div>
                </div>
                <div v-show="waitingAI"
                  class="pt-5 text-gray-400 text-center text-xs">AI replies can take 5-10 seconds to reply</div>
              </div>
            </div>
            <div class="absolute w-full bottom-0 left-0 p-4">
              <textarea ref="textArea" v-model="msg"  rows="3"
                @blur="cancelEnter" @input="sendEnter"
                @keyup.enter.exact="sendMessage" @keyup.ctrl.enter="listenKey()"
                class="py-2 pl-3 pr-12 w-full border border-blueBtn focus:outline-none text-13 resize-none rounded-xl"
                placeholder="Enter the shipment information to get details e.g. 21kg Shenzhen to USA"></textarea>
              <div @click="sendMessage" class="absolute right-6 bottom-7 w-9 h-9 rounded-full flex justify-center items-center cursor-pointer" style="background-image: linear-gradient(-180deg, #02CFFF, #4CA2FE);">
                <svg t="1712652520903" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5165" width="17" height="17"><path d="M998.823724 19.067586c12.358621 8.933517 17.266759 20.939034 15.006897 35.698759L870.753103 913.231448a35.592828 35.592828 0 0 1-35.169103 29.66069c-4.13131 0-8.651034-1.024-13.417931-2.895448l-253.104552-103.38869-135.309241 165.005241c-6.744276 8.615724-15.889655 12.747034-27.400828 12.747035a31.284966 31.284966 0 0 1-12.393931-2.259862 34.710069 34.710069 0 0 1-17.019586-13.135448 35.027862 35.027862 0 0 1-6.532414-20.40938v-194.913103L853.239172 191.735172 255.894069 708.784552l-220.689655-90.535724c-13.771034-5.12-21.292138-15.39531-22.316138-30.790621-0.706207-14.900966 5.15531-25.917793 17.902345-33.050483L960.653241 17.831724a35.027862 35.027862 0 0 1 38.170483 1.235862z" fill="#ffffff" p-id="5166"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    feedback
  } from '@/api/order'
  import {
    reqCountries,
    reqChinaCity,
  } from '@/api/address'
  import {
    createCoupons,
    getNotice,
    setNotice,
    getId
  } from '@/api/user'
  import uaParser from 'ua-parser-js'
  import MarkdownIt from 'markdown-it';
  export default {
    data(){
      return{
        userName: '',
        head_portrait: '',
        theme: '',
        left: 'open',
        feedbackSuccess: false,
        feedbackLoading: false,
        feedbackMenu: false,
        messageMenu: false,
        noticeMenu: false,
        userMenu: false,
        screenWidth: null,
        first: true,
        isvisited: '',
        feedbackInput: '',
        email: '',
        userID: 0,
        manage: {
          id: 0
        },
        chatLarge: false,
        chatShow: false,
        emojiPanel: false,
        emojiList: [
          '🙂','😁','😂','😊','😍','😐',
          '😕','😒','😢','😭','🎉','❤',
          '👌','👍','🙏','✊','✌','✋',
        ],
        chatMessage: [],
        msg: '',
        websocket: '',
        entering: false,
        startPos: 0,
        endPos: 0,
        formData: null,
        t: null,
        chatNum: 0,
        openImgs: '',
        times: '',
        // startLeft: null,
        // startTop: null,
        offLeft: null,
        offTop: null,
        moveLeft: null,
        moveTop: null,
        point: {
          x: null,
          y: null
        },
        chatMove: true,
        firstLogin: 0,
        firstName: '',
        istoken: false,
        noticeList: [],
        noRead: 0,
        newNotice: null,
        bookingChat: false,
        bookingName: '',
        portChat: false,
        portName: '',
        superLevel: '',
        ruleForm: [],
        nologinHello: [],
        orderChat: false,
        orderName: '',
        openMenu: true,
        manageNew: {},
        firstfun: 1,
        fileType: 1,
        aiEnter: false,
        manageAI: false,
        waitingAI: false,
        waitingTime: null,
        banEnter: false,
        waitSend: '',
        owSend: false,
        globalWeb: this.$globalWeb,
      }
    },
    created() {
      let cookieArr = document.cookie.split(";");
      for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(cookiePair[0].indexOf('cargosoonAICookie')!=-1) {
          this.owSend = true
          this.waitSend = cookiePair[1]
          var exp = new Date();
          exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
          document.cookie=`cargosoonAICookie=${cookiePair[1]};domain=cargosoon.com;path=/;expires=${exp.toGMTString()}`
          break;
        }
      }
    },
    mounted() {
      if(!this.$store.state.user.token || this.$store.state.user.token=='undefined'){
        this.istoken = false
      }else{
        this.istoken = true
      }
      if(this.istoken){
        let dt = new Date()
        const userId = JSON.parse(localStorage.getItem('userId'))
        const headImg = JSON.parse(localStorage.getItem('userImg'))
        this.email = JSON.parse(localStorage.getItem('userInfo')).email
        if(this.email == null){
          this.head_portrait = require('../../assets/moren.png')
        }else{
          this.head_portrait = headImg + userId + '_40_40.png?v=' + dt.getTime()
        }
        this.times = dt.getTime()
        let user = JSON.parse(localStorage.getItem('userInfo'))
        // console.log(user);
        this.userName = user.first_name + ' ' + user.last_name
        this.userID = user.id
        this.superLevel = user.super_level
        this.firstLogin = user.first_login
        // if(this.firstLogin == 1){
        //   this.$refs.memberMask.style = 'display:block;'
        //   this.$refs.firstloginModal.style = 'display:block;'
        //   setTimeout(()=>{
        //     this.$refs.memberMask.style = 'display:block;opacity:1;'
        //     this.$refs.firstloginModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        //   })
        // }
        this.firstName = user.first_name
        if(user.hasOwnProperty('manage')){
          this.manage = user.manage
        }
        this.themes()
        this.StartWebSocket()
      }else{
        let code = localStorage.getItem('invitation_code')
        getId({
          type: 1,
          code: code
        }).then(res=>{
          this.manageNew = res.data.manage
          this.manage = res.data.manage
          localStorage.setItem("manageNew", JSON.stringify(this.manageNew))
          this.ruleForm.id = res.data.chat_id
          this.userID = res.data.chat_id
          this.StartWebSocket()
        })

        const ua = uaParser(navigator.userAgent)
        // console.log(ua);
        this.ruleForm.browser = ua.browser.name
        this.ruleForm.sys = ua.os.name + ua.os.version
        this.ruleForm.machine = window.screen.width + '*' + window.screen.height
        
        // this.$refs.memberMask.style = 'display:block;'
        // this.$refs.nologinModal.style = 'display:block;'
        // setTimeout(()=>{
        //   this.$refs.memberMask.style = 'display:block;opacity:1;'
        //   this.$refs.nologinModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        // })
      }
      document.addEventListener(
        'click',
        this.even,
        true
      )

      // this.$refs.textArea.addEventListener('paste', async (e)=>{
      //   if(e.clipboardData.files[0]){
      //     this.formData = new FormData()
      //     this.formData.append('file', e.clipboardData.files[0])
      //     let res = await fetch('https://mini.cargosoon.online/api/mini/Login/upload_chat', {
      //       method: 'POST',
      //       body: this.formData,
      //     })
      //     let data = await res.json()
      //     if (data.code == "0") {
      //       var img = data.data.image
      //       let imgs = 'https://mini.cargosoon.online/api' + img.substr(1)
      //       for (let [a, b] of this.formData.entries()) {
      //         if(b.type.indexOf('image')!=-1){
      //           var message = { 
      //             type: "chat_msg",
      //             from_user_id: this.userID,
      //             from_service_id: this.manage.id,
      //             service_type: 1,
      //             msg_type: 1,
      //             // msg: '<img style="max-width:80px;min-height:80px;" src="' + img + '">'
      //             msg: imgs,
      //             order_state: this.$store.state.user.token,
      //           }
      //           this.websocket.send(JSON.stringify(message))
      //         }else{
      //           var msgs = {
      //             image: imgs,
      //             file_name: data.data.file_name,
      //             file_size: data.data.file_size,
      //             file_type: data.data.file_type, 
      //           }
      //           var message = { 
      //             type: "chat_msg",
      //             from_user_id: this.userID,
      //             from_service_id: this.manage.id,
      //             service_type: 1,
      //             msg_type: 2,
      //             msg: JSON.stringify(msgs),
      //             order_state: this.$store.state.user.token,
      //           }
      //           this.websocket.send(JSON.stringify(message))
      //         }
      //       }
      //     }
      //   }
      // })
    },
    destroyed() {  
      document.removeEventListener('click', this.even, true) 
      clearInterval(this.t)
    },
    methods:{
      even(e){
        let feedback = this.$refs.feedback
        let message = this.$refs.message
        let notice = this.$refs.notice
        let s1 = this.$refs.s1
        
        if(this.istoken){
          if(!s1.contains(e.target) && !notice.contains(e.target) 
          && !message.contains(e.target) && !feedback.contains(e.target)){
            this.$refs.topMenu.style = 'z-index:30;'
          }
          if (!s1.contains(e.target)) {
            this.userMenu = false
          }
          if (!notice.contains(e.target)) {
            this.noticeMenu = false
          }
          if (!message.contains(e.target)) {
            this.messageMenu = false
          }
          if (!feedback.contains(e.target)) {
            this.feedbackMenu = false
          }
        }

        // if (!this.$refs.chatShow.contains(e.target) && !this.$refs.maskImg.contains(e.target)
        //   && !this.$refs.openImgPanel.contains(e.target)) {
        //   this.closeChat()
        // }
        // if (!this.$refs.emojiPanel.contains(e.target)) {
        //   this.emojiPanel = false
        // }
      },
      countryQuest(){
        reqCountries().then((res) => {
          let countries = res.data
          localStorage.setItem("Countries", JSON.stringify(countries))
        })
        reqChinaCity().then((res) => {
          let city = res.data
          localStorage.setItem("ChinaCity", JSON.stringify(city))
        })
      },
      async logout() {
        const token = this.$store.state.user.token
        // console.log(token)
        if (token) {
          try {
            await this.$store.dispatch('userLogout')
            localStorage.removeItem("loginto")
            this.$router.push('/login')
          } catch (error) {}
        } else {
          this.$router.push('/login')
        }
      },
      switchMenu() {
        this.first = false
        if (this.left == 'open') {
          this.left = 'close'
          this.$refs.leftMenu.style.transform = 'translate(-100%)'
          if (this.screenWidth > 1024) {
            this.$refs.main.style.width = '100%'
            this.$refs.main.style.left = '0px'
            setTimeout(()=>{
              this.$refs.newSwitch.style = 'left: -10px;z-index: 30;display: flex'
            },500)
          }
          this.$refs.mask.style.display = 'none'
        } else {
          this.left = 'open'
          this.$refs.leftMenu.style.transform = 'translate(0)'
          if (this.screenWidth < 1024) {
            this.$refs.mask.style.display = 'block'
          } else {
            this.$refs.main.style.width = 'calc(100% - 250px)'
            this.$refs.main.style.left = '250px'
            this.$refs.newSwitch.style = 'left: -28px;z-index: 0;display: none'
          }
        }
      },
      closeMask() {
        this.left = 'close'
        this.$refs.leftMenu.style.transform = 'translate(-100%)'
        this.$refs.main.style.width = '100%'
        this.$refs.main.style.left = '0px'
        this.$refs.mask.style.display = 'none'
        setTimeout(()=>{
          this.$refs.newSwitch.style = 'left: -10px;z-index: 30;display: flex'
        },500)
      },
      themes(){
        this.theme = localStorage.getItem("theme")
        this.$refs.all.className = this.theme
      },
      checkTheme() {
        if (this.theme != 'dark') {
          localStorage.setItem("theme", 'dark')
        } else {
          localStorage.setItem("theme", 'light')
        }
        this.themes()
      },
      feedbackSwitch() {
        this.$refs.topMenu.style = 'z-index:41;'
        this.feedbackMenu = !this.feedbackMenu
        this.feedbackSuccess = false
      },
      messageSwitch(){
        this.$refs.topMenu.style = 'z-index:41;'
        this.messageMenu = !this.messageMenu
      },
      noticeSwitch(){
        this.$refs.topMenu.style = 'z-index:41;'
        this.noticeMenu = !this.noticeMenu
      },
      userSwitch() {
        this.$refs.topMenu.style = 'z-index:41;'
        this.userMenu = !this.userMenu
      },
      visitfun(index) {
        this.isvisited = index
      },
      changeImg(e){
        this.head_portrait = e
      },
      changeName(e){
        this.userName = e
      },
      async chooseMenu(e){
        this.isvisited = await e
        if(this.screenWidth<1024){
          this.closeMask()
          this.first = false
        }
      },
      sendFeedback(){
        if(this.feedbackInput != ''){
          feedback({
            type: 1,
            content: this.feedbackInput,
            reply_email: this.email,
            manage_id: this.manage.id,
          }).then((res)=>{
            if(res.code == 0){
              this.feedbackLoading = true
              this.feedbackSuccess = true
              setTimeout(()=>{
                this.feedbackLoading = false
                this.feedbackInput = ''
              },800)
            }
          })
        }
      },
      cancelFeedback(){
        this.feedbackMenu = false
        this.feedbackInput = ''
      },
      // messagePage(){
      //   this.$router.push({path: '/main/message'})
      //   this.messageMenu = false
      // },
      emojiChoose(e) {
        // console.log(e.target.innerText)
        this.insertTxtAndSetcursor(e.target.innerText)
        this.emojiPanel = false
      },
      sendMessage(){
        // this.isReadAll = false
        if(!this.banEnter){
          var message = {
            type: "chat_msg",
            from_user_id: this.userID,
            from_service_id: this.manage.id,
            service_type: 1,
            msg_type: 0,
            msg: this.msg,
            order_state: this.$store.state.user.token,
            msg_source_type: 'app',
          }
          this.websocket.send(JSON.stringify(message))
          this.msg = ''
          if(this.manageAI){
            this.banEnter = true
          }
        }else{
          this.$message({
            message: 'Chatting in progress, please wait for the end',
          });
        }
      },
      listenKey(e){
        this.msg = this.msg + '\n'
      },
      sendEnter(){
        if(this.msg != ''){
          var message = {
            type: "chat_msg_entering",
            from_user_id: this.userID,
            service_type: 1,
            order_state: this.$store.state.user.token,
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
          order_state: this.$store.state.user.token,
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
        this.websocket = new WebSocket("wss://chat.co-logistics.cn/wss")
        // this.websocket = new WebSocket("wss://testchat.co-logistics.com/wss")
        // this.websocket = new WebSocket("wss://testchat.cargosoon.online/wss")
        this.websocket.onopen = this.onOpen;
        this.websocket.onclose = this.onClose;
        this.websocket.onmessage = this.onMessage;
        this.websocket.onerror = this.onError;
        // this.onClose()
        
      },
      firstSend(){
        this.firstLogin = 0
        var message = {
          type: "first_login",
          from_user_id: this.userID,
          from_service_id: this.manage.id,
          order_state: this.$store.state.user.token,
          msg_source_type: 'app',
        }
        this.websocket.send(JSON.stringify(message))
        this.chatOpen()
      },
      onOpen(e) {
        if(this.istoken){
          var me_1 = {
            type: "init",
            from_user_id: this.userID,
            service_type: 1,
            status: "",
            order_state: this.$store.state.user.token,
          }
          this.websocket.send(JSON.stringify(me_1))
          // this.pingMessage()
        }else{
          this.nologinMessage()
        }
      },
      pingMessage(){
        let ping = {
          type: "ping",
          from_user_id: this.userID,
          service_type: 1,
          order_state: this.$store.state.user.token,
        }
        clearInterval(this.t)
        this.t = setInterval(() => {
          // console.log(this.websocket.readyState)
          if(this.websocket.readyState == 3){
            this.StartWebSocket()
          }
          this.websocket.send(JSON.stringify(ping))
        }, 30000)
      },
      onClose() {
        // this.websocket.close();
        this.StartWebSocket()
      },
      onMessage(e) {
        var data = JSON.parse(e.data)
        // console.log(data)
        if(data.type == 'init' || data.type == 'chat_msg_list' || data.type == 'no_login_init'){
          if(data.type == 'init'){
            // this.noticeList = data.notice_list.reverse()
            this.noticeList = data.notice_list
            this.noRead = data.no_notice_read
            if(data.mode == 2){
              this.manageAI = true
            //   this.manageNow.image_url = 'https://co-logistics.cn/api/uploads/ai.png'
            //   this.manageNow.englishname = 'Message-AI'
            }
            if(this.owSend){
              this.owtosend()
            }
          }
          if(data.type == 'no_login_init'){
            this.manage.id = data.manage_row.id
            this.manage.image_url = data.manage_row.image_url
            this.manage.englishname = data.manage_row.englishname
            this.manage.service_email = data.manage_row.service_email
            this.manage.whatsappp = data.manage_row.whatsappp
            if(data.mode == 2){
              this.manageAI = true
            }
            if(this.owSend){
              this.owtosend()
            }
          }
          if(data.type == 'chat_msg_list'){
            if(data.mode == 2){
              this.manageAI = true
            }
          }
          let list = data.message_list
          // console.log(list)
          if(this.firstLogin == 1 && list.length == 0){
            this.firstSend()
            this.chatNum = 1
          }
          for(let n=0;n<list.length;n++){
            list[n].head_img = list[n].head_img + '?v=' + this.times
            if(list[n].msg_type == 3 || list[n].msg_type == 4){
              list[n].msg = JSON.parse(list[n].msg)
            }
            if(list[n].msg_type == 5){
              this.nologinHello = list[n].msg.split(',')
              // console.log(this.nologinHello);
            }
            if(list[n].msg_type == 11 || list[n].msg_type == 12){
              list[n].msg = JSON.parse(list[n].msg)
              if(Object.prototype.toString.call(list[n].msg) == '[object Array]'){
                list[n].msg_state = 0
              }else{
                list[n].msg_state = 1
              }
            }
            if(list[n].msg_type == 13){
              const markdownIt = new MarkdownIt();
              list[n].msg = markdownIt.render(list[n].msg);
            }
            // if(list[n].msg_type == 2){
            //   list[n].fileName = list[n].msg.replace("https://co-logistics.cn/api/uploads/chat/images/","")
            // }
          }
          // console.log(list)
          this.chatMessage = list
          this.Height()
        }else if(data.type == 'chat_msg' && data.msg_type != 13){
          let a = {
            date_entered: data.date_entered,
            head_img: data.head_img + '?v=' + this.times,
            is_me: data.is_me,
            is_read: data.is_read,
            msg: data.msg,
            nickname: data.nickname,
            msg_type: data.msg_type,
          }
          if(data.msg_type == 3 || data.msg_type == 4){
            a.msg = JSON.parse(data.msg)
          }
          if(data.msg_type == 2){
            // a.fileName = data.msg.replace("https://co-logistics.cn/api/uploads/chat/images/","")
            a.file_name = data.file_name
          }
          if(data.msg_type == 11 || data.msg_type == 12){
            a.msg = JSON.parse(data.msg)
            if(Object.prototype.toString.call(a.msg) == '[object Array]'){
              a.msg_state = 0
            }else{
              a.msg_state = 1
            }
          }
          this.chatMessage.push(a)
          // if(!this.chatShow){
          //   this.chatNum+=1
          // }
          this.Height()
          if(this.manageAI && data.is_me == 1){
            this.waitingTime = setInterval(()=>{
              this.waitingAI = true
              this.Height()
            },5000)
          }
          if(data.is_me == 0){
            this.banEnter = false
            clearInterval(this.waitingTime)
            this.waitingAI = false
          }
        }else if(data.type == 'chat_msg_entering'){
          this.entering = true
        }else if(data.type == 'chat_msg_cancel_entering'){
          this.entering = false
        }else if(data.type == 'is_read'){
          // this.isReadAll = true
          var message = {
            type: "chat_msg_list",
            from_user_id: this.userID,
            from_service_id: this.manage.id,
            service_type: 1,
            order_state: this.$store.state.user.token,
          }
          this.websocket.send(JSON.stringify(message))
        }else if(data.type == 'switch_mode'){
          if(data.mode == 2){
            this.manageAI = true
          }else{
            this.manageAI = false
            let a = {
              msg: 'Enter the manual service, professional customer service for you!',
              msg_type: 999,
            }
            this.chatMessage.push(a)
            this.Height()
          }
        }

        if(data.msg_type == 13){
          clearInterval(this.waitingTime)
          this.waitingAI = false
          let a = {
            head_img: data.head_img + '?v=' + this.times,
            is_me: data.is_me,
            msg: data.msg,
            nickname: data.nickname,
            msg_type: data.msg_type,
          }
          if(!this.aiEnter){
            this.chatMessage.push(a)
          }else if(this.aiEnter && data.msg != '[DONE]'){
            const markdownIt = new MarkdownIt();
            this.chatMessage[this.chatMessage.length - 1].msg = markdownIt.renderInline(this.chatMessage[this.chatMessage.length - 1].msg + data.msg)
            this.Height()
          }

          if(data.msg != '[DONE]'){
            this.aiEnter = true
          }else{
            this.aiEnter = false
            const markdownIt = new MarkdownIt();
            this.chatMessage[this.chatMessage.length - 1].msg = markdownIt.render(this.chatMessage[this.chatMessage.length - 1].msg)
            this.Height()
            this.banEnter = false
          }
        }
      },
      onError(){
        this.StartWebSocket()
      },
      upload(){
        this.$refs.iptFileRef.click()
      },
      uploads(e){
        const files = e.target.files[0]
        this.formData = new FormData()
        this.formData.append('file', files)
        if(files.type.indexOf('image')!=-1){
          this.fileType = 1
        }else{
          this.fileType = 2
        }
        this.tttt()
      },
      async tttt(){
        let res = await fetch('https://mini.cargosoon.online/api/mini/Login/upload_chat', {
        // let res = await fetch('https://www.co-logistics.net/api/admin/login/upload_chat', {
          method: 'POST',
          body: this.formData,
        })
        let data = await res.json()
        if (data.code == "0") {
          // this.isReadAll = false
          var img = data.data.image
          let imgs = 'https://mini.cargosoon.online/api' + img.substr(1)
          if(this.fileType == 1){
            var message = { 
              type: "chat_msg",
              from_user_id: this.userID,
              from_service_id: this.manage.id,
              service_type: 1,
              msg_type: 1,
              // msg: '<img style="max-width:80px;min-height:80px;" src="' + img + '">'
              msg: imgs,
              order_state: this.$store.state.user.token,
            }
            this.websocket.send(JSON.stringify(message))
          }else{
            var msgs = {
              image: imgs,
              file_name: data.data.file_name,
              file_size: data.data.file_size,
              file_type: data.data.file_type, 
            }
            var message = { 
              type: "chat_msg",
              from_user_id: this.userID,
              from_service_id: this.manage.id,
              service_type: 1,
              msg_type: 2,
              // msg: '<img style="max-width:80px;min-height:80px;" src="' + img + '">'
              msg: JSON.stringify(msgs),
              order_state: this.$store.state.user.token,
            }
            this.websocket.send(JSON.stringify(message))
          }
          
        }
      },
      async chatOpen(){
        // this.chatMove = true
        // this.chatShow =! this.chatShow
        this.chatNum = 0
        // if(this.istoken){
        var message = {
          type: "chat_msg_list",
          from_user_id: this.userID,
          from_service_id: this.manage.id,
          service_type: 1,
          order_state: this.$store.state.user.token,
        }
        this.websocket.send(JSON.stringify(message))
        // }else{
        //   this.nologinMessage()
        // }
        // this.$refs.chatShow.style = 'display:flex;'
        // this.$refs.chatShow.style.display = 'flex'
        // setTimeout(()=>{
        //   // this.$refs.chatShow.style = 'display: flex;opacity: 1;'
        //   this.$refs.chatShow.style.display = 'flex'
        //   this.$refs.chatShow.style.opacity = 1
        //   this.$refs.chatShow.style.left = this.point.x + 'px'
        //   this.$refs.chatShow.style.top = this.point.y + 'px'
        // },1)
      },
      Height(){
        this.$nextTick(() => {
          this.$refs.chatPanels.scrollTop = this.$refs.chatPanels.scrollHeight
        })
      },
      closeChat(){
        // this.chatShow = false
        // setTimeout(()=>{
        //   this.$refs.chatShow.style = 'display: none;opacity: 0;'
        // },1)
      },
      openImg(e){
        this.openImgs = e.target.src
        this.$refs.maskImg.style.display = 'block'
        this.$refs.openImgPanel.style.display = 'flex'
      },
      closeImgMask() {
        this.$refs.maskImg.style.display = 'none'
        this.$refs.openImgPanel.style.display = 'none'
      },
      dragenter(e){
        e.preventDefault()
      },
      chatmove(e){
        // this.startLeft = e.clientX
        // this.startTop = e.clientY
        this.offLeft = e.offsetX
        this.offTop = e.offsetY
      },
      chatmoving(e){
        this.chatMove = false
        let menuWidth = 0
        if(this.left == 'open'){
          menuWidth = 250
        }
        this.point.x = e.clientX - this.offLeft - menuWidth
        this.point.y = e.clientY - this.offTop - 48
        // this.$nextTick(() => {
        //   this.$refs.chatShow.style.left = this.point.x + 'px'
        //   this.$refs.chatShow.style.top = this.point.y + 'px'
        // })
      },
      showMsg(quoteMsg){
        var message = {
          type: "chat_msg",
          from_user_id: this.userID,
          from_service_id: this.manage.id,
          service_type: 1,
          msg_type: 0,
          msg: 'Quick quote: ' + quoteMsg,
          order_state: this.$store.state.user.token,
          msg_source_type: 'app',
        }
        this.websocket.send(JSON.stringify(message))
        this.chatOpen()
      },
      accessNotice(){
        this.newNotice = setInterval(() => {
          getNotice().then(res=>{
            if(res.data.msg){
              res.data.is_read = 0
              this.noRead = Number(this.noRead)+1
              this.noticeList.unshift(res.data)
            }
            if(res.data.msg == 'You have earned L2 membership benefits'){
              this.superLevel = 'L2'
              let userInfo = JSON.parse(localStorage.getItem('userInfo'))
              userInfo.super_level = 'L2'
              localStorage.setItem('userInfo',JSON.stringify(userInfo))
            }
            // else{
            //   console.log(this.noticeList);
            // }
            
            // this.noticeList = res.data
            // console.log(this.noticeList);
          })
        }, 60000)
      },
      viewNotice(item,index){
        console.log(item);
        if(this.noRead>0){
          this.noRead = this.noRead - 1
        }
        setNotice({
          customer_id: item.customer_id,
          msg_id: item.id,
          type: 1,
        }).then(res=>{
          this.noticeList[index].is_read = 1
          let num = 0
          for(let n=0;n<this.noticeList.length;n++){
            if(this.noticeList[n].is_read == 0){
              num++
            }
          }
          this.noRead = num
          if(item.msg_link == 'super'){
            this.$router.push({name:'memberReview',})
          }else{
            this.$router.replace({
              path:`/order/forwardingOrder/${item.freightOrderId}`
            })
            setTimeout(()=>{
              this.$router.go(0)
            },300)
          }
        })
      },
      readAll(){
        setNotice({
          customer_id: JSON.parse(localStorage.getItem('userId')),
          type: 2,
        }).then(res=>{
          for(let n=0;n<this.noticeList.length;n++){
            this.noticeList[n].is_read = 1
          }
          this.noRead = 0
        })
      },
      bookingInfo(){
        this.bookingName = JSON.parse(localStorage.getItem('BookItem')).product_name_e
        this.bookingChat = true
        this.chatOpen()
      },
      sendBooking(){
        let a = JSON.parse(localStorage.getItem('BookItem'))
        let b = JSON.parse(localStorage.getItem('SearchForm'))
        // console.log(a,b);
        if(a.total == 0){
          a.total = 'N'
        }
        let msgs = {
          img: a.product_img,
          name: a.product_name_e,
          date: `${a.aging_start}-${a.aging_end} Business Days`,
          price: `$${a.freight}`,
          weight: `(${a.weight}kg/${a.total}ctns)`,
          destination: b.shipping_to_en
        }
        let controlLog = b
        controlLog.control_id = a.id
        controlLog.all_weight = a.weight
        controlLog.control_name = a.product_name
        controlLog.aging_start = a.aging_start
        controlLog.aging_end = a.aging_end
        controlLog.transport_type = a.transport_type
        controlLog.freight = a.freight
        controlLog.cutomer_id = this.userID

        // console.log(controlLog);
        var message = {
          type: "chat_msg_control",
          from_user_id: this.userID,
          from_service_id: this.manage.id,
          msg: msgs,
          msg_type: 3,
          control_log: controlLog,
          order_state: this.$store.state.user.token,
        }
        this.websocket.send(JSON.stringify(message))
        this.bookingChat = false
      },
      portInfo(){
        this.portName = JSON.parse(localStorage.getItem('PortItem')).company
        this.portChat = true
        this.chatOpen()
      },
      sendPort(){
        let a = JSON.parse(localStorage.getItem('PortItem'))
        let b = JSON.parse(localStorage.getItem('PortSearch'))
        let c = {}
        // console.log(a,b);
        if(a.gp20 == 0){
          c.gp20 = 'N'
        }else{
          c.gp20 = '$'+a.gp20
        }
        if(a.gp40 == 0){
          c.gp40 = 'N'
        }else{
          c.gp40 = '$'+a.gp40
        }
        if(a.hq40 == 0){
          c.hq40 = 'N'
        }else{
          c.hq40 = '$'+a.hq40
        }
        if(a.hq45 == 0){
          c.hq45 = 'N'
        }else{
          c.hq45 = '$'+a.hq45
        }
        
        let msgs = {
          img: a.img,
          name: a.company,
          date: a.voyage,
          price: `${c.gp20}/${c.gp40}/${c.hq40}/${c.hq45}`,
          destination: b.end_en
        }
        let controlLog = b
        controlLog.company = a.company
        controlLog.customer_id = this.userID
        controlLog.sea_line = a.sea_line
        controlLog.line = a.line
        controlLog.air_day = a.air_day
        controlLog.validity_start = a.validity_start
        controlLog.validity_end = a.validity_end
        controlLog.gp20 = a.gp20
        controlLog.gp40 = a.gp40
        controlLog.hq40 = a.hq40
        controlLog.hq45 = a.hq45

        var message = {
          type: "chat_msg_control",
          from_user_id: this.userID,
          from_service_id: this.manage.id,
          msg: msgs,
          msg_type: 4,
          control_log: controlLog,
          order_state: this.$store.state.user.token,
        }
        this.websocket.send(JSON.stringify(message))
        this.portChat = false
      },
      closeMember(){
        this.$refs.memberMask.style = 'display:none;opacity:0;'
        this.$refs.memberModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.nologinModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.firstloginModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      toMember(){
        this.closeMember()
        this.$router.push('/account/Member')
      },
      setSuperLevel(item){
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        userInfo.super_level = item
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        this.superLevel = item
      },
      nologinMessage(){
        // this.isReadAll = false
        let code = localStorage.getItem('invitation_code')
        var message = {
          type: "no_login_init",
          sys: this.ruleForm.sys,
          browser: this.ruleForm.browser,
          machine: this.ruleForm.machine,
          from_user_id: this.ruleForm.id,
          code: code,
          manage: this.manageNew,
          order_state: this.$store.state.user.token,
        }
        this.websocket.send(JSON.stringify(message))
      },
      orderInfo(){
        this.orderName = JSON.parse(localStorage.getItem('OrderItem')).enquiry_no
        this.orderChat = true
        this.chatOpen()
      },
      sendOrder(){
        let controlLog = JSON.parse(localStorage.getItem('OrderItem'))
        let c = {}

        if(controlLog.num == '0'){
          c.num = 'N'
        }else{
          c.num = controlLog.num
        }
        if(controlLog.weight == '0'){
          c.weight = 'N'
        }else{
          c.weight = controlLog.weight
        }
        if(controlLog.volume == '0'){
          c.volume = 'N'
        }else{
          c.volume = controlLog.volume
        }

        let msgs = {
          img: '',
          name: `Order ${controlLog.enquiry_no}`,
          date: '',
          price: '',
          weight: `(${c.num}ctns/${c.weight}kg/${c.volume}cbm)`,
          destination: ''
        }

        var message = {
          type: "chat_msg_control",
          from_user_id: this.userID,
          from_service_id: this.manage.id,
          msg: msgs,
          msg_type: 3,
          control_log: controlLog,
          order_state: this.$store.state.user.token,
        }
        this.websocket.send(JSON.stringify(message))
        this.orderChat = false
      },
      OpenMenu(){
        this.openMenu = !this.openMenu
        if(this.openMenu){
          this.$refs.pullIcons.style = "transform: rotate(90deg)"
        }else{
          this.$refs.pullIcons.style = "transform: rotate(0deg)"
        }
      },
      menuLock(){
        this.$refs.lockModal.style = "display:block;opacity:0.7;--tw-scale-x: 1;--tw-scale-y: 1;"
        setTimeout(()=>{
          this.$refs.lockModal.style = 'display:none'
        },1500)
      },
      sendAI(type){
        let msgAI = ''
        if(type == 1){
          msgAI = 'How to check price'
        }else if(type == 2){
          msgAI = 'Services'
        }else{
          msgAI = 'Become a member'
        }

        var message = {
          type: "chat_msg",
          from_user_id: this.userID,
          from_service_id: this.manage.id,
          service_type: 1,
          msg_type: 0,
          msg: msgAI,
          order_state: this.$store.state.user.token,
          msg_source_type: 'app',
        }
        this.websocket.send(JSON.stringify(message))
      },
      toPriceDetails(item,type){
        // console.log(item);
        if(type == 3){
          this.$router.push({
            name:'shippingList',
            params: {
              searchForm: JSON.stringify(item),
            },
          })
        }else{
          item.manage_id = this.manage.id
          this.$router.push({
            name:'FCL',
            params: {
              searchForm: JSON.stringify(item),
            },
          })
        }
      },
      owtosend(){
        var message = {
          type: "chat_msg",
          from_user_id: this.userID,
          from_service_id: this.manage.id,
          service_type: 1,
          msg_type: 0,
          msg: this.waitSend,
          order_state: this.$store.state.user.token,
          msg_source_type: 'app',
        }
        this.websocket.send(JSON.stringify(message))
        this.owSend = false
      }
    }
  }
</script>

<style lang="postcss" scoped>
.topMenu {
  @apply w-full h-topmenu bg-lightTop dark:bg-darkMenu text-menuText z-30 select-none border-b-0 border-solid border-gray-300 fixed top-0 flex justify-between items-center;
}

.topMenuLeft {
  @apply flex h-full;
}

.topMenuRight {
  @apply flex items-center;
}
</style>

<style>
/* .AI_msg p{
  margin: 0px 10px 0px 16px !important;
} */
.AI_msg a{
  color: #4CA2FE !important;
}
.AI_msg ol{
  list-style-type: demical !important;
}
.AI_msg ol>li>ul{
  list-style-type: circle !important;
}
.AI_msg>ul{
  list-style-type: disc !important;
}
.AI_msg>ul>li>ul{
  list-style-type: circle !important;
}
</style>