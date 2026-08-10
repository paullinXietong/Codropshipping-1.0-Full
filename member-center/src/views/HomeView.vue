<template>
  <div ref="all"
       class="light">
    <div class="w-screen h-screen bg-lightMenu dark:bg-darkMain">
      <div ref="mask"
           @click="closeMask"
           class="fixed w-full h-full top-0 left-0 bg-lightText opacity-70 hidden z-60"></div>
      <div ref="maskImg"
        @click="closeImgMask"
        class="fixed w-full h-full top-0 left-0 bg-lightText opacity-70 hidden z-60">
      </div>
      <div ref="openImgPanel"
        @click="closeImgMask"
        class="fixed top-0 left-0 hidden z-60 max-w-full max-h-full w-full h-full justify-center items-center">
        <img class="max-w-90% max-h-80% w-full h-full object-contain" :src="openImgs" alt="">
      </div>
      <div ref="memberMask" class="member_mask"></div>
      <div ref="memberModal" class="member_modal w-600 p-6 opacity-20 bg-white dark:bg-darkMenu">
        <div @click="closeMember"
          class="absolute right-0 top-0 flex justify-center items-center p-2 hover:bg-gray-300 cursor-pointer">
          <svg t="1691033107179" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18460" width="22" height="22"><path d="M259.413333 129.706667c-27.306667-20.48-61.44-34.133333-88.746666-27.306667s-54.613333 34.133333-68.266667 68.266667c-6.826667 34.133333 0 61.44 27.306667 88.746666l252.586666 252.586667-252.586666 252.586667c-20.48 20.48-34.133333 54.613333-27.306667 88.746666 13.653333 34.133333 34.133333 54.613333 68.266667 68.266667 34.133333 6.826667 61.44 0 88.746666-27.306667l252.586667-252.586666 252.586667 252.586666c20.48 20.48 54.613333 34.133333 88.746666 27.306667 34.133333-6.826667 54.613333-34.133333 61.44-61.44 6.826667-34.133333 0-61.44-27.306666-88.746667L641.706667 512l252.586666-252.586667c20.48-20.48 34.133333-54.613333 27.306667-88.746666-13.653333-34.133333-34.133333-54.613333-68.266667-68.266667-34.133333-6.826667-61.44 0-88.746666 27.306667L512 382.293333 259.413333 129.706667z" p-id="18461" fill="#2c2c2c"></path></svg>
        </div>
        <div class="mb-4 font-bold text-center text-xl">Join the L2 membership for free</div>
        <div class="p-4 flex flex-col items-center text-white rounded-md"
          style="background-image: linear-gradient(-180deg, #494535, #181411);">
          <div class="mb-4 text-lg font-semibold" style="color: #ffc566;">Benefits of Join the membership</div>
          <div class="mb-4 flex flex-col text-sm">
            <div class="mb-3 flex items-center">
              <svg t="1691032358525" class="icon mr-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11873" width="18" height="18"><path d="M525.184 72c-247.424 0-448 200.64-448 448 0 247.424 200.576 448 448 448 247.488 0 448-200.576 448-448C973.184 272.64 772.608 72 525.184 72zM851.456 367.104l-407.872 407.808L198.912 530.24l101.952-101.952 142.72 142.72 305.92-305.856L851.456 367.104z" fill="#fadb93" p-id="11874"></path></svg>
              <div>30 days of free warehouse storage</div>
            </div>
            <div class="mb-3 flex items-center">
              <svg t="1691032358525" class="icon mr-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11873" width="18" height="18"><path d="M525.184 72c-247.424 0-448 200.64-448 448 0 247.424 200.576 448 448 448 247.488 0 448-200.576 448-448C973.184 272.64 772.608 72 525.184 72zM851.456 367.104l-407.872 407.808L198.912 530.24l101.952-101.952 142.72 142.72 305.92-305.856L851.456 367.104z" fill="#fadb93" p-id="11874"></path></svg>
              <div>$100 Coupon for new customers</div>
            </div>
            <div class="mb-3 flex items-center">
              <svg t="1691032358525" class="icon mr-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11873" width="18" height="18"><path d="M525.184 72c-247.424 0-448 200.64-448 448 0 247.424 200.576 448 448 448 247.488 0 448-200.576 448-448C973.184 272.64 772.608 72 525.184 72zM851.456 367.104l-407.872 407.808L198.912 530.24l101.952-101.952 142.72 142.72 305.92-305.856L851.456 367.104z" fill="#fadb93" p-id="11874"></path></svg>
              <div>Unlimited shipping quotes</div>
            </div>
            <div class="mb-3 flex items-center">
              <svg t="1691032358525" class="icon mr-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11873" width="18" height="18"><path d="M525.184 72c-247.424 0-448 200.64-448 448 0 247.424 200.576 448 448 448 247.488 0 448-200.576 448-448C973.184 272.64 772.608 72 525.184 72zM851.456 367.104l-407.872 407.808L198.912 530.24l101.952-101.952 142.72 142.72 305.92-305.856L851.456 367.104z" fill="#fadb93" p-id="11874"></path></svg>
              <div>Dedicated 24/7 customer service</div>
            </div>
          </div>
          <button @click="toMember" class="mb-4 w-60 p-2.5 rounded text-black text-sm font-medium"
            style="background-image: linear-gradient(-180deg, #fbd895, #ffc566);">Subscribe now</button>
        </div>
        <div class="mt-3 text-center text-xs text-gray-400">
          This version is a junior version of the entitlement and will have subsequent iterations based on version upgrades. The sooner you apply for the benefits, the sooner you can enjoy them.
        </div>
      </div>
      <div ref="nologinModal" class="member_modal w-600 p-6 opacity-20 bg-white dark:bg-darkMenu">
        <div @click="closeMember"
          class="absolute right-0 top-0 flex justify-center items-center p-2 hover:bg-gray-300 cursor-pointer">
          <svg t="1691033107179" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18460" width="22" height="22"><path d="M259.413333 129.706667c-27.306667-20.48-61.44-34.133333-88.746666-27.306667s-54.613333 34.133333-68.266667 68.266667c-6.826667 34.133333 0 61.44 27.306667 88.746666l252.586666 252.586667-252.586666 252.586667c-20.48 20.48-34.133333 54.613333-27.306667 88.746666 13.653333 34.133333 34.133333 54.613333 68.266667 68.266667 34.133333 6.826667 61.44 0 88.746666-27.306667l252.586667-252.586666 252.586667 252.586666c20.48 20.48 54.613333 34.133333 88.746666 27.306667 34.133333-6.826667 54.613333-34.133333 61.44-61.44 6.826667-34.133333 0-61.44-27.306666-88.746667L641.706667 512l252.586666-252.586667c20.48-20.48 34.133333-54.613333 27.306667-88.746666-13.653333-34.133333-34.133333-54.613333-68.266667-68.266667-34.133333-6.826667-61.44 0-88.746666 27.306667L512 382.293333 259.413333 129.706667z" p-id="18461" fill="#2c2c2c"></path></svg>
        </div>
        <div class="mb-4 font-bold text-center text-xl">Login and register to become an L1 member</div>
        <div class="p-4 flex flex-col items-center rounded-md"
          style="background-image: linear-gradient(-180deg, #cff2ff, #93bbfe);">
          <div class="mb-4 text-lg font-semibold">Benefits of Join the membership</div>
          <div class="mb-4 flex flex-col text-sm">
            <div class="mb-3 flex items-center">
              <svg t="1691032358525" class="icon mr-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11873" width="18" height="18"><path d="M525.184 72c-247.424 0-448 200.64-448 448 0 247.424 200.576 448 448 448 247.488 0 448-200.576 448-448C973.184 272.64 772.608 72 525.184 72zM851.456 367.104l-407.872 407.808L198.912 530.24l101.952-101.952 142.72 142.72 305.92-305.856L851.456 367.104z" fill="#fadb93" p-id="11874"></path></svg>
              <div>15 days of free warehouse storage</div>
            </div>
            <div class="mb-3 flex items-center">
              <svg t="1691032358525" class="icon mr-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11873" width="18" height="18"><path d="M525.184 72c-247.424 0-448 200.64-448 448 0 247.424 200.576 448 448 448 247.488 0 448-200.576 448-448C973.184 272.64 772.608 72 525.184 72zM851.456 367.104l-407.872 407.808L198.912 530.24l101.952-101.952 142.72 142.72 305.92-305.856L851.456 367.104z" fill="#fadb93" p-id="11874"></path></svg>
              <div>$100 Coupon for new customers</div>
            </div>
            <div class="mb-3 flex items-center">
              <svg t="1691032358525" class="icon mr-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11873" width="18" height="18"><path d="M525.184 72c-247.424 0-448 200.64-448 448 0 247.424 200.576 448 448 448 247.488 0 448-200.576 448-448C973.184 272.64 772.608 72 525.184 72zM851.456 367.104l-407.872 407.808L198.912 530.24l101.952-101.952 142.72 142.72 305.92-305.856L851.456 367.104z" fill="#fadb93" p-id="11874"></path></svg>
              <div>Unlimited shipping quotes</div>
            </div>
            <div class="mb-3 flex items-center">
              <svg t="1691032358525" class="icon mr-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11873" width="18" height="18"><path d="M525.184 72c-247.424 0-448 200.64-448 448 0 247.424 200.576 448 448 448 247.488 0 448-200.576 448-448C973.184 272.64 772.608 72 525.184 72zM851.456 367.104l-407.872 407.808L198.912 530.24l101.952-101.952 142.72 142.72 305.92-305.856L851.456 367.104z" fill="#fadb93" p-id="11874"></path></svg>
              <div>Dedicated 24/7 customer service</div>
            </div>
          </div>
          <router-link :to="{ name: 'signUp' }">
            <button class="mb-4 w-60 p-2.5 rounded text-white text-sm font-medium"
              style="background-color: #333333;">Sign up</button>
          </router-link>
        </div>
        <div class="mt-3 text-center text-xs text-gray-400">
          This version is a junior version of the entitlement and will have subsequent iterations based on version upgrades. The sooner you apply for the benefits, the sooner you can enjoy them.
        </div>
      </div>
      <div ref="lockModal" class="member_modal px-4 py-2 opacity-20 rounded-md text-white bg-gray-400 text-xs">
        This feature is not yet available,so stay tuned!
      </div>
      <div ref="firstloginModal" class="member_modal w-510 p-8 opacity-20 bg-white dark:bg-darkMenu">
        <div @click="closeMember"
          class="absolute right-0 top-0 flex justify-center items-center p-2 hover:bg-gray-300 cursor-pointer">
          <svg t="1691033107179" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18460" width="22" height="22"><path d="M259.413333 129.706667c-27.306667-20.48-61.44-34.133333-88.746666-27.306667s-54.613333 34.133333-68.266667 68.266667c-6.826667 34.133333 0 61.44 27.306667 88.746666l252.586666 252.586667-252.586666 252.586667c-20.48 20.48-34.133333 54.613333-27.306667 88.746666 13.653333 34.133333 34.133333 54.613333 68.266667 68.266667 34.133333 6.826667 61.44 0 88.746666-27.306667l252.586667-252.586666 252.586667 252.586666c20.48 20.48 54.613333 34.133333 88.746666 27.306667 34.133333-6.826667 54.613333-34.133333 61.44-61.44 6.826667-34.133333 0-61.44-27.306666-88.746667L641.706667 512l252.586666-252.586667c20.48-20.48 34.133333-54.613333 27.306667-88.746666-13.653333-34.133333-34.133333-54.613333-68.266667-68.266667-34.133333-6.826667-61.44 0-88.746666 27.306667L512 382.293333 259.413333 129.706667z" p-id="18461" fill="#2c2c2c"></path></svg>
        </div>
        <div class="text-xl font-medium">Function</div>
        <div v-show="firstfun == 1">
          <div class="mt-4 text-center font-medium">Cargo Tracking Function Description</div>
          <div class="mt-4">Freight tracking and visualization at every stage of your shipment.</div>
          <img src="../assets/firstFunction1.png" class="mt-4 w-full" alt="">
          <div class="mt-8 flex text-sm">
            <svg t="1706857155339" class="icon flex-shrink-0 mr-1.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5126" width="22" height="22"><path d="M512 170.666667a341.333333 341.333333 0 1 1 0 682.666666 341.333333 341.333333 0 0 1 0-682.666666z m0 469.333333a42.666667 42.666667 0 1 0 0 85.333333 42.666667 42.666667 0 0 0 0-85.333333z m42.666667-341.333333h-85.333334l21.333334 298.666666h42.666666l21.333334-298.666666z" fill="#2c2c2c" p-id="5127"></path></svg>
            <div class="w-full">
              <div>It is possible to search for all goods transported on our platform. Other platforms are not supported at the moment.</div>
              <div class="mt-3">You can search for your shipment by searching for the order number, tracking number, product name and other shipment-related information.</div>
            </div>
          </div>
        </div>
        <div v-show="firstfun == 2">
          <div class="mt-4 text-center font-medium">Explanation of Price Checking Function</div>
          <div class="mt-4">Hundreds of logistics lines are stationed on the platform and quoted online. The route plans provided are all the advantages of each special line, long-term stability.</div>
          <img src="../assets/firstFunction2.png" class="mt-4 w-full" alt="">
          <div class="mt-8 flex text-sm">
            <svg t="1706857155339" class="icon flex-shrink-0 mr-1.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5126" width="22" height="22"><path d="M512 170.666667a341.333333 341.333333 0 1 1 0 682.666666 341.333333 341.333333 0 0 1 0-682.666666z m0 469.333333a42.666667 42.666667 0 1 0 0 85.333333 42.666667 42.666667 0 0 0 0-85.333333z m42.666667-341.333333h-85.333334l21.333334 298.666666h42.666666l21.333334-298.666666z" fill="#2c2c2c" p-id="5127"></path></svg>
            <div class="w-full">
              <div>Provide member discounts, value-added services, warehouse services, etc.</div>
              <div class="mt-3">You can directly through the price booking, after booking the account manager will communicate with you within 24 hours!</div>
            </div>
          </div>
        </div>
        <div v-show="firstfun == 3">
          <div class="mt-4 text-center font-medium">Inventory Functionality Description</div>
          <div class="mt-4">At each stage of a shipment, we promptly enter cargo-related data and check information about the stored product.</div>
          <img src="../assets/firstFunction3.png" class="mt-4 w-full" alt="">
          <div class="mt-8 flex text-sm">
            <svg t="1706857155339" class="icon flex-shrink-0 mr-1.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5126" width="22" height="22"><path d="M512 170.666667a341.333333 341.333333 0 1 1 0 682.666666 341.333333 341.333333 0 0 1 0-682.666666z m0 469.333333a42.666667 42.666667 0 1 0 0 85.333333 42.666667 42.666667 0 0 0 0-85.333333z m42.666667-341.333333h-85.333334l21.333334 298.666666h42.666666l21.333334-298.666666z" fill="#2c2c2c" p-id="5127"></path></svg>
            <div class="w-full">
              <div>You can see in real time what is being shipped under each order and what services are being fulfilled by the shipment.</div>
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-center items-center text-xs">
          <div @click="firstfun = 1" :class="[firstfun == 1 ? 'bg-warehouseAddress' : '']"
            class="mx-1.5 w-8 h-8 text-gray-400 rounded cursor-pointer hover:bg-warehouseAddress flex justify-center items-center">1</div>
            <div @click="firstfun = 2" :class="[firstfun == 2 ? 'bg-warehouseAddress' : '']"
            class="mx-1.5 w-8 h-8 text-gray-400 rounded cursor-pointer hover:bg-warehouseAddress flex justify-center items-center">2</div>
            <div @click="firstfun = 3" :class="[firstfun == 3 ? 'bg-warehouseAddress' : '']"
            class="mx-1.5 w-8 h-8 text-gray-400 rounded cursor-pointer hover:bg-warehouseAddress flex justify-center items-center">3</div>
        </div>
      </div>

      <div class="topMenu" ref="topMenu">
        <div class="topMenuLeft">
          <div class="pl-2 sm:pl-6 w-152 sm:w-leftmenu h-full flex items-center flex-row-reverse sm:flex-row relative">
            <a class="flex items-center h-full" :href="'//' + globalWeb" target="_blank">
              <img src="../assets/codropshipping.svg" class="h-20" alt="" />
            </a>
            <img src="../assets/menu1.svg"
                 class="hidden absolute top-0.5 sm:top-2 right-120 sm:right-0 sm:mr-8 w-26 h-26 p-1 rounded sm:hover:bg-gray-700 cursor-pointer"
                 @click="switchMenu()"
                 alt="" />
          </div>
          <!-- <router-link :to="{ name: 'gpt' }" class="flex items-center">
            <button class="py-1 px-5 text-orange bg-white hover:bg-gray-200 rounded text-sm">Switch to AI</button>
          </router-link> -->
          <!-- <div>
            <select name=""
                    id=""
                    class="menuSearch">
              <option value="1">Destination</option>
            </select>
            <input class="menuSearch px-1"
                   type="text"
                   placeholder="Weight(KG)" />
            <div class="ml-4 bg-orange px-3 flex justify-center items-center rounded cursor-pointer hover:bg-orange1">
              <img src="../assets/search.svg"
                   class="w-20px h-20px"
                   alt="" />
            </div>
          </div> -->
        </div>
        <div class="topMenuRight" v-if="istoken">
          <GlobalLanguageSelect class="top-language" :show-label="false" />
          <div class="hidden md:block mr-1 sm:mr-4 p-1 cursor-pointer relative"
            ref="feedback">
            <span class="text-red-500 text-2xl bg-gray-600 px-2 py-1 rounded" @click.self="feedbackSwitch">Feedback</span> 
            <!-- <img src="../assets/feedback.svg"
                 class="w-26 h-26"
                 alt="" @click.self="feedbackSwitch"/> -->
            <div v-show="feedbackMenu" class="dark:bg-darkMenu dark:text-gray-400 topSelect top-10 -right-24 sm:-right-4 p-2.5 w-470 text-13 cursor-default">
              <div v-show="!feedbackSuccess">
                <div class="mb-1.5">Tell us your suggestion or report an issue</div>
                <textarea rows="3" v-model="content" class="input text-13 resize-none" @paste="handlePaste"></textarea>
                
                <Upload :images='images' @uploadImage='uploadImg'></Upload>
                <div class="mb-1.5">level</div>
                <el-rate
                  v-model="severity_level"
                  :colors="colors">
                </el-rate>
                <!-- <div class="mt-3 mb-1.5">Reply-to email</div>
                <input type="text" class="input text-13 py-1" v-model="email" disabled> -->
                <div class="mt-4 flex text-14 font-medium justify-end">
                  <button class="mr-2 py-1 px-2 bg-orange hover:bg-orange1 rounded-md text-white"
                  @click="sendFeedback">Send feedback</button>
                  <button class="py-1 px-2 bg-gray-100 hover:bg-gray-300 border border-gray-300 rounded-md text-gray-500"
                  @click="cancelFeedback">Cancel</button>
                </div>
              </div>
              <div v-show="feedbackSuccess" class="h-full flex justify-center items-center relative">
                <div v-show="feedbackLoading">
                  <img src="../assets/loading.svg" class="w-20 h-20 animate-spin" alt="">
                </div>
                <div v-show="!feedbackLoading">
                  <img src="../assets/thankFeedback.svg" class="w-24 h-24 mx-auto mb-5" alt="">
                  <div>Thank you for your feedback! <a href="/admin/main/issus" class="text-blue-500">Go Feedback Center</a></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mr-1 sm:mr-4 p-1 rounded sm:hover:bg-gray-700 cursor-pointer"
               @click="checkTheme()">
            <img src="../assets/light1.svg"
                 class="w-26 h-26"
                 alt="" />
          </div>
          <div class="hidden mr-1 sm:mr-5 p-1 rounded sm:hover:bg-gray-700 cursor-pointer relative"
            ref="message" @click.self="messageSwitch">
            <img src="../assets/chat1.svg"
                 class="w-26 h-26"
                 alt="" @click.self="messageSwitch"/>
            <div class="hidden absolute top-0 right-0 w-3.5 h-3.5 leading-none bg-red-500 rounded-full text-xs text-white text-center">
              3
            </div>
            <div v-show="messageMenu" class="dark:bg-darkMenu dark:text-gray-400 topSelect top-10 -right-24 sm:-right-4 w-80 cursor-default">
              <div class="flex justify-between items-center bg-gray-50 dark:bg-darkMain py-2.5 px-5">
                <div>Contacts Message</div>
                <!-- <div @click="messagePage" class="text-gray-500 text-13 cursor-pointer">See all in box</div> -->
              </div>
              <div class="hidden">
                <div class="flex py-2.5 px-5 border-t border-gray-200 dark:border-darkLine cursor-pointer hover:bg-tableHover dark:hover:bg-darkLine">
                  <div class="w-1/5 flex-shrink-0 mr-4 relative">
                    <!-- <img src="../assets/accountManager.svg" alt=""> -->
                    <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-white rounded-full flex justify-center items-center">
                      <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div class="w-full relative">
                    <div class="flex justify-between">
                      <div>Joann</div>
                      <div class="text-gray-500">14:23</div>
                    </div>
                    <div class="mt-3 text-gray-500">Yah,that sounds great</div>
                    <div class="absolute right-0 bottom-1 bg-red-500 rounded-full w-3.5 h-3.5 text-xs text-white text-center"
                      style="line-height: 1.1;">3</div>
                  </div>
                </div>
                <div class="flex py-2.5 px-5 border-t border-gray-200 dark:border-darkLine cursor-pointer hover:bg-tableHover dark:hover:bg-darkLine">
                  <div class="w-1/5 flex-shrink-0 mr-4 relative">
                    <!-- <img src="../assets/accountManager.svg" alt=""> -->
                    <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-white rounded-full flex justify-center items-center">
                      <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div class="w-full relative">
                    <div class="flex justify-between">
                      <div>Joann</div>
                      <div class="text-gray-500">14:23</div>
                    </div>
                    <div class="mt-3 text-gray-500">Yah,that sounds great</div>
                    <!-- <div class="absolute right-0 bottom-1 bg-red-500 rounded-full w-3.5 h-3.5 text-xs text-white text-center"
                      style="line-height: 1.1;">2</div> -->
                  </div>
                </div>
              </div>
              <div class="my-8">
                <img src="../assets/noMessage.svg" class="w-28 h-28 mx-auto mb-1" alt="">
                <div class="text-center">No message</div>
              </div>
            </div>
          </div>
          <div class="mr-1 sm:mr-4 p-1 rounded sm:hover:bg-gray-700 cursor-pointer relative"
            ref="notice" @click.self="noticeSwitch">
            <img src="../assets/notice1.svg"
                 class="w-26 h-26"
                 alt="" @click.self="noticeSwitch"/>
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
                <img src="../assets/noNotification.svg" class="w-28 h-28 mx-auto mb-1" alt="">
                <div class="text-center">No notification</div>
              </div>
            </div>
          </div>
          <!-- <a href="https://www.cargosoon.com/help" target="_blank"
                       class="hidden md:block mr-1 sm:mr-4 p-1 rounded sm:hover:bg-gray-700 cursor-pointer">
            <img src="../assets/help.svg"
                 class="w-26 h-26"
                 alt="" />
          </a> -->
          <!-- <router-link :to="{ name: 'member' }" v-if="superLevel == 'L1'" class="mr-4">
            <div 
              class="py-1.5 px-3 hidden md:flex items-center rounded-md text-xs" style="background-color: #463b2b;">
              <img src="../assets/member_icon.png" class="w-6 mr-2" alt="">
              <div style="color: #ffb342;">Free L2 Membership Upgrade</div>
            </div>
          </router-link> -->
          <div class="mr-0 sm:mr-8 relative cursor-pointer"
               ref="s1"
               @click="userSwitch">
            <div class="p-1 flex items-center sm:hover:bg-gray-700 rounded">
              <div class="relative">
                <img :src="head_portrait"
                    class="mr-1 sm:mr-4 w-10 h-10 rounded-full"
                    alt="" />
                <img v-if="superLevel == 'L1'" src="../assets/lv1.png" class="absolute right-0 -bottom-1.5 w-7" alt="">
                <img v-if="superLevel == 'L2'" src="../assets/lv2.png" class="absolute right-0 -bottom-1.5 w-7" alt="">
              </div>
              <div class="hidden sm:block mr-4 max-w-200 overflow-hidden whitespace-nowrap overflow-ellipsis">{{userName}}</div>
              <img src="../assets/down1.svg"
                   class="w-20px h-20px"
                   alt="" />
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
              <!-- <router-link :to="{ name: 'notice' }"
                           class="block p-2 hover:bg-item"
                           :class="{ visited: isvisited == 'notice' }">Notifications</router-link>
              <router-link :to="{ name: 'affiliates' }"
                           class="block p-2 hover:bg-item"
                           :class="{ visited: isvisited == 'affiliates' }">Affiliates</router-link> -->
              <!-- <router-link
                :to="{ name: 'login' }"
                class="block p-2 hover:bg-item border-t border-solid border-gray-200"
                >Logout</router-link> -->
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
      <div class="leftMenu"
           ref="leftMenu">
        <div @click="switchMenu()"
          class="absolute top-2 right-3 w-7 h-7 bg-menuSelect rounded-full hidden lg:flex justify-center items-center cursor-pointer hover:shadow-default">
          <svg t="1690776709094" class="icon mr-0.5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="937" width="18" height="18"><path d="M427.4 512L761.8 163.8c8.4-8.6 8.2-22.8-0.4-31.6l-59.8-61.2c-8.6-8.8-22.6-9-31-0.4L262.2 495.8c-4.4 4.4-6.4 10.4-6 16.2-0.2 6 1.8 11.8 6 16.2l408.4 425.4c8.4 8.6 22.4 8.4 31-0.4l59.8-61.2c8.6-8.8 8.8-23 0.4-31.6L427.4 512z" p-id="938" fill="#ff6600"></path></svg>
        </div>
        <div class="pl-3 w-leftmenu flex lg:hidden h-topmenu items-center flex-row relative">
          <!-- <img src="../assets/shipImg.svg"
               class="w-5 h-5 mr-1"
               alt="" /> -->
          <!-- <img src="../assets/newLogo.svg"
          class="w-10 h-10 mr-1"
          alt="" /> 
          <div class="text-20 font-bold dark:text-white">Cargosoon</div> -->
          <img src="../assets/cargosoonLogo1.png"
            class="h-8 mr-1"
            alt="" /> 
          <img src="../assets/cargosoonLogo2.png"
            class="h-6"
            alt="" /> 
          <img src="../assets/close1.svg"
               class="absolute top-3 right-0 mr-7 w-7 h-7 p-1 rounded sm:hover:bg-gray-300 cursor-pointer"
               @click="closeMask()"
               alt="" />
        </div>
        <div>
          <div class="menuTitle">
            <img src="../assets/co-menu1.svg" class="w-6 mr-2.5" alt="">
            WORKSPACE</div>
          
          <router-link :to="{ name: 'dashboard' }">
            <div class="menuItem"
                 :class="{ visited: isvisited == 'dashboard' }">
              <img src=""
                   alt="" />
              <div>Overview</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'cart' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Cart' }">
              <img src=""
                  alt="" />
              <div>My Cart</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'orderList' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'orderList' }">
              <img src=""
                  alt="" />
              <div>My Order</div>
            </div>
          </router-link>
          <!-- <router-link :to="{ name: 'shippingList' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'shippingCost' }">
              <img src=""
                  alt="" />
              <div>Door to Door</div>
            </div>
          </router-link> -->
          <!-- <router-link :to="{ name: 'FCL' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'FCLprice' }">
              <img src=""
                  alt="" />
              <div>Port to Port</div>
            </div>
          </router-link> -->
          <!-- <router-link :to="{ name: 'consolidation' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'consolidation' }">
              <img src=""
                  alt="" />
              <div>Cargo consolidation</div>
            </div>
          </router-link> -->
          <!-- <div class="menuItem"
               :class="{ visited: isvisited == '4' }"
               @click="visitfun(4)">
            <img src=""
                 alt="" />
            <div>Sourcing</div>
          </div> -->
        </div>
        <div>
          <div class="menuTitle">
            <img src="../assets/co-menu2.svg" class="w-6 mr-2.5" alt="">
            COMMERCE</div>
          <a :href="'//' + globalWeb" target="_blank">
            <div class="menuItem">
              <div>Find Products</div>
            </div>
          </a>
          <router-link :to="{ name: 'productList' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Product' }">
              <img src=""
                  alt="" />
              <div>Product Library</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'shopify' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Shopify' }">
              <img src=""
                  alt="" />
              <div>Sales Channels</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'storeProduct' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'storeProduct' }">
              <img src=""
                  alt="" />
              <div>Published Products</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'storeOrder' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Store' }">
              <img src=""
                  alt="" />
              <div>Orders</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'shippingList' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'shippingCost' }">
              <img src=""
                  alt="" />
              <div>Shipping Calculator</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'tracking' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'tracking' }">
              <img src=""
                  alt="" />
              <div>Tracking</div>
            </div>
          </router-link>
          <!-- <router-link :to="{ name: 'forwardingOrder' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'forwardingOrder' }">
              <img src=""
                  alt="" />
              <div>Forwarding Order</div>
            </div>
          </router-link> -->
          <!-- <div class="menuItem"
               :class="{ visited: isvisited == '7' }"
               @click="visitfun(7)">
            <img src=""
                 alt="" />
            <div>My Packages</div>
          </div> -->
          <!-- <div class="menuItem"
               :class="{ visited: isvisited == '8'}"
               @click="visitfun(8)">
            <img src=""
                 alt="" />
            <div>Track Packets</div>
          </div> -->
        </div>
        <div>
          <div class="menuTitle">
            <img src="../assets/co-menu3.svg" class="w-6 mr-2.5" alt="">
            OPERATIONS</div>
            <!-- <router-link :to="{ name: 'SKUManagement' }">
              <div class="menuItem relative"
                  :class="{ visited: isvisited == 'SKUManagement' }">
                <img src=""
                    alt="" />
                <div>SKU Management</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'PreloadManagement' }">
              <div class="menuItem relative"
                  :class="{ visited: isvisited == 'PreloadManagement' }">
                <img src=""
                    alt="" />
                <div>Pre-assembled Tube</div>
              </div>
            </router-link> -->
            <router-link :to="{ name: 'CargoManagements' }">
              <div class="menuItem relative"
                  :class="{ visited: isvisited == 'CargoManagements' }">
                <img src=""
                    alt="" />
                <div>Inventory</div>
                <!-- <div class="absolute right-1">
                  <svg style="transform: rotate(90deg)" ref="pullIcons" t="1695628494138" class="icon pullIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4011" width="18" height="18"><path d="M729.987756 534.448268 376.290155 888.145869c-18.73776 18.73776-49.092092 18.73776-67.828828 0s-18.73776-49.092092 0-67.828828l285.868773-285.868773L308.461327 248.579495c-18.73776-18.73776-18.73776-49.092092 0-67.828828s49.092092-18.73776 67.828828 0L729.987756 534.448268z" p-id="4012"></path></svg>
                </div> -->
              </div>
            </router-link>
            <div v-show="!openMenu">
              <!-- <router-link :to="{ name: 'ApplySpaces' }">
                <div class="menuItem"
                    :class="{ visited: isvisited == 'ApplySpaces' }">
                  <img src=""
                      alt="" />
                  <div>Apply for storage space</div>
                </div>
              </router-link>
              <router-link :to="{ name: 'InboundManagement' }">
                <div class="menuItem"
                    :class="{ visited: isvisited == 'InboundManagement' }">
                  <img src=""
                      alt="" />
                  <div>Inbound Management</div>
                </div>
              </router-link>
              <router-link :to="{ name: 'OutboundManagement' }">
                <div class="menuItem"
                    :class="{ visited: isvisited == 'OutboundManagement' }">
                  <img src=""
                      alt="" />
                  <div>Outbound Management</div>
                </div>
              </router-link>
              <router-link :to="{ name: 'StockList' }">
                <div class="menuItem"
                    :class="{ visited: isvisited == 'StockList' }">
                  <img src=""
                      alt="" />
                  <div>Stock List</div>
                </div>
              </router-link> -->
              <router-link :to="{ name: 'CargoManagement' }">
                <div class="menuItem"
                    :class="{ visited: isvisited == 'CargoManagement' }">
                  <img src=""
                      alt="" />
                  <div>Cargo Management</div>
                </div>
              </router-link>
              <router-link :to="{ name: 'RentCalculation' }">
                <div class="menuItem"
                    :class="{ visited: isvisited == 'RentCalculation' }">
                  <img src=""
                      alt="" />
                  <div>Warehouse Rent Calculation</div>
                </div>
              </router-link>
            </div>
        </div>
        <div>
          <div class="menuTitle">
            <img src="../assets/co-menu4.svg" class="w-6 mr-2.5" alt="">
            ACCOUNT</div>
          <router-link :to="{ name: 'wallet' }">
            <div class="menuItem"
                 :class="{ visited: isvisited == 'wallet' }">
              <img src=""
                   alt="" />
              <div>My Wallet</div>
            </div>
          </router-link>
          <!-- <div class="menuItem"
               :class="{ visited: isvisited == '14' }"
               @click="visitfun(14)">
            <img src=""
                 alt="" />
            <div>Member Center</div>
          </div> -->
          <!-- <router-link :to="{ name: 'integral' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Integral' }">
              <img src=""
                  alt="" />
              <div>My Points</div>
            </div>
          </router-link> -->
          <router-link :to="{ name: 'member' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Member' }">
              <img src=""
                  alt="" />
              <div>My Coupons</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'issus' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'feedback' }">
              <img src=""
                  alt="" />
              <div>Feedback Center</div>
            </div>
          </router-link>
          <!-- <router-link :to="{ name: 'Developer' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Developer' }">
              <div>Become a Developer</div>
            </div>
          </router-link> -->
          <!-- <router-link :to="{ name: 'document' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Document' }">
              <img src=""
                  alt="" />
              <div>My Documents</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'bill' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Bill' }">
              <img src=""
                  alt="" />
              <div>My Bill</div>
            </div>
          </router-link> -->
          <!-- <router-link :to="{ name: 'coupons' }">
            <div class="menuItem"
                :class="{ visited: isvisited == 'Coupons' }">
              <img src=""
                  alt="" />
              <div>My Coupons</div>
            </div>
          </router-link> -->
        </div>
      </div>
      <div class="main" ref="main">
        <!-- -left-2 -->
        <div @click="switchMenu()" v-show="left == 'close'" ref="newSwitch" style="transition: all 0.5s;"
          class="absolute top-2 -left-7 w-7 h-7 bg-menuSelect rounded-full hidden justify-center items-center cursor-pointer hover:shadow-default">
          <svg t="1690777241249" class="icon ml-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1379" width="18" height="18"><path d="M596.6 512L262.2 163.8c-8.4-8.6-8.2-22.8 0.4-31.6l59.8-61.2c8.6-8.8 22.6-9 31-0.4L761.8 496c4.4 4.4 6.4 10.4 6 16.2 0.2 6-1.8 11.8-6 16.2L353.4 953.6c-8.4 8.6-22.4 8.4-31-0.4L262.6 892c-8.6-8.8-8.8-23-0.4-31.6L596.6 512z" p-id="1380" fill="#ff6600"></path></svg>
        </div>
        <!-- <div class="w-full h-full bg-gray-900 block sm:hidden"></div> -->
        <router-view :leftMenu="left" @changeImg="changeImg" @changeName="changeName" @menu="chooseMenu"
          @getMessage="showMsg" @openChat="chatOpen" @hiddenChat="hidChat"
          @bookingchat="bookingInfo" @portchat="portInfo" @setLevel="setSuperLevel"
          @orderchat="orderInfo" :search_form="searchForms" :search_port="searchPorts"/>
        <!-- :class="[ istoken ? 'block' : 'hidden' ]" -->
        <div v-show="chatModal">
          <!-- <div @click="chatOpen" v-show="!chatShow" -->
          <!-- <a :href="'https://api.whatsapp.com/send?phone='+manage.whatsappp+'&text=Hello, '+manage.englishname" target="_blank"> -->
            <div @click="chatOpen" v-show="!chatShow"
              class="absolute bottom-20 right-1.5 sm:right-10 p-2 bg-white dark:bg-darkMenu hover:bg-gray-100
                rounded-full shadow-xxx flex cursor-pointer z-10">
              <div class="relative">
                <!-- <img :src="manage.image_url" class="w-12 h-12 rounded-full" alt=""> -->
                <img src="../assets/whatsapp.png" class="w-12 h-12 rounded-full" alt="">
                <div class="absolute right-0 bottom-0 w-2.5 h-2.5 bg-green-400 rounded-full"></div>
              </div>
              <div class="hidden sm:block px-2">
                <div class="my-0.5 font-semibold dark:text-gray-400">{{manage.englishname}}</div>
                <div class="text-xs text-gray-500">Account Manager</div>
              </div>
              <div v-show="chatNum>0" 
                class="absolute -top-1 py-1 px-1.5 bg-red-500 text-white rounded-full text-13 leading-3">{{chatNum}}</div>
            </div>
          <!-- </a> -->

          <div ref="chatShow" class="chatMain"
            :class="[chatMove ? 'bottom-8 sm:bottom-20 right-1.5 sm:right-10' : '']">
            <!-- :style="'left:'+ point.x +'px;top:'+point.y+'px'"> -->
            <div class="absolute top-1 right-1 flex items-center">
              <svg t="1678422228047" @click="chatLarge = true" v-show="!chatLarge"
                class="icon hidden lg:block cursor-pointer mr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10741" width="24" height="24"><path d="M193.349046 210.094207v130.995519c0.084979 23.530755-6.042025 43.024996-29.555785 43.105726h-0.195452c-23.649726-0.025494-33.940714-19.53673-34.004448-43.207701v-169.916017a41.580349 41.580349 0 0 1 41.784299-41.809792h170.328166c23.641228 0.029743 42.795552 10.707386 42.825294 34.36561 0.029743 23.535004-19.009859 29.445311-42.523618 29.475054H210.344896a16.995851 16.995851 0 0 0-16.99585 16.99585z m620.306058-16.99585H681.992498c-23.513759-0.025494-42.549112-5.935801-42.523618-29.470805 0.029743-23.662473 19.184066-34.335867 42.825294-34.369859H852.78805a41.580349 41.580349 0 0 1 41.618589 41.809792v169.920266c-0.063734 23.666722-10.354722 43.182207-34.000199 43.21195h-0.199701c-23.513759-0.084979-29.636515-19.57922-29.555785-43.109975v-130.995519a16.995851 16.995851 0 0 0-16.99585-16.99585zM210.344896 830.09434H342.007502c23.513759 0.025494 42.553361 5.94005 42.523618 29.470805-0.029743 23.662473-19.184066 34.335867-42.825294 34.369859H171.21195a41.580349 41.580349 0 0 1-41.618589-41.809792v-169.916017c0.063734-23.670971 10.354722-43.186456 34.004448-43.21195h0.195452c23.513759 0.084979 29.636515 19.574971 29.555785 43.105726v130.995519a16.995851 16.995851 0 0 0 16.99585 16.99585z m620.306058-16.859884v-130.991269c-0.084979-23.535004 6.042025-43.024996 29.555785-43.109975h0.199701c23.645477 0.029743 33.936465 19.545228 34.000199 43.21195v169.916016a41.580349 41.580349 0 0 1-41.784299 41.809793h-170.328166c-23.641228-0.029743-42.795552-10.707386-42.825294-34.36561-0.025494-23.535004 19.009859-29.445311 42.523618-29.475054H813.655104a16.995851 16.995851 0 0 0 16.99585-16.995851z" fill="#7a7a7a" p-id="10742"></path></svg>
              <svg t="1678430872698" @click="chatLarge = false" v-show="chatLarge"
                class="icon hidden lg:block cursor-pointer mr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1599" width="24" height="24"><path d="M319.978667 304.622933V173.085867c-0.085333-23.633067 6.0672-43.204267 29.678933-43.2896h0.196267c23.748267 0.029867 34.082133 19.626667 34.146133 43.392v170.624a41.7536 41.7536 0 0 1-41.9584 41.984H171.003733c-23.739733-0.029867-42.973867-10.752-43.003733-34.5088-0.029867-23.633067 19.089067-29.568 42.7008-29.597867H302.912a17.066667 17.066667 0 0 0 17.066667-17.066667z m0 418.346667a17.066667 17.066667 0 0 0-17.066667-17.066667H170.7008c-23.611733-0.0256-42.730667-5.960533-42.7008-29.5936 0.029867-23.761067 19.264-34.478933 43.003733-34.513066H342.208a41.7536 41.7536 0 0 1 41.792 41.984v170.628266c-0.064 23.765333-10.397867 43.362133-34.146133 43.392h-0.196267c-23.611733-0.085333-29.76-19.6608-29.678933-43.2896v-131.541333z m384.042666-418.346667a17.066667 17.066667 0 0 0 17.066667 17.066667H853.2992c23.611733 0.029867 42.730667 5.9648 42.7008 29.597867-0.029867 23.7568-19.264 34.478933-43.003733 34.5088H681.792a41.7536 41.7536 0 0 1-41.792-41.984v-170.624c0.064-23.765333 10.397867-43.362133 34.146133-43.392h0.196267c23.611733 0.085333 29.76 19.656533 29.678933 43.2896v131.541333z m0 418.346667v131.541333c0.085333 23.6288-6.0672 43.204267-29.678933 43.285334h-0.196267c-23.748267-0.0256-34.082133-19.618133-34.146133-43.387734v-170.624a41.7536 41.7536 0 0 1 41.9584-41.984h171.037867c23.739733 0.029867 42.973867 10.752 43.003733 34.5088 0.029867 23.633067-19.089067 29.568-42.7008 29.597867H721.088a17.066667 17.066667 0 0 0-17.066667 17.066667z" fill="#7a7a7a" p-id="1600"></path></svg>
              <svg t="1678422103952" @click="closeChat" class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2580" width="26" height="26"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM512 832c-179.2 0-320-140.8-320-320s140.8-320 320-320 320 140.8 320 320S691.2 832 512 832z" p-id="2581" fill="#7a7a7a"></path><path d="M672 352c-12.8-12.8-32-12.8-44.8 0L512 467.2 396.8 352C384 339.2 364.8 339.2 352 352S339.2 384 352 396.8L467.2 512 352 627.2c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L512 556.8l115.2 115.2c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8L556.8 512l115.2-115.2C684.8 384 684.8 364.8 672 352z" p-id="2582" fill="#7a7a7a"></path></svg>
            </div>
            <div :class="[chatLarge ? 'sm:w-700' : 'sm:w-96']" class="w-80">
              <div draggable="true" @dragenter="dragenter($event)"
                @dragstart="chatmove($event)" @dragover="chatmoving($event)"
                class="p-3 flex border-b dark:border-darkLine select-none"
                style="cursor: -webkit-grab;">
                <div class="relative">
                  <img draggable="false" :src="manage.image_url" class="w-12 h-12 rounded-full" alt="">
                  <div class="absolute right-0 bottom-0 w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                </div>
                <div class="pl-3 pr-5">
                  <div class="my-0.5 font-semibold dark:text-gray-400">{{manage.englishname}}</div>
                  <div class="text-xs text-gray-500">Account Manager</div>
                </div>
              </div>
              <div ref="chatPanels" class="h-80 overflow-x-hidden overflow-y-scroll">
                <div class="p-3">
                  <!-- <div v-if="firstLogin == 1" class="py-2 flex">
                    <img :src="manage.image_url" class="flex-shrink-0 w-12 h-12 rounded-full" alt="">
                    <div class="pl-2 flex flex-col items-start" style="width:calc( 100% - 80px )">
                      <div class="flex items-start flex-wrap-reverse">
                        <div class="text-sm mr-2 dark:text-gray-400">{{manage.englishname}}</div>
                      </div>
                      <div class="mt-1.5 px-3 py-1.5 text-13 rounded-3xl bg-gray-200 min-w-40px max-w-full overflow-x-hidden break-words">Hi {{firstName}}, welcome to Cargosoon!</div>
                    </div>
                  </div> -->
                  <div v-show="manageAI" class="py-6 flex flex-col items-center">
                    <img src="../assets/gptIcon.png" class="w-16" alt="">
                    <div class="mt-3 text-lg">Hello, I am CargosoonAl assistant</div>
                    <div class="mt-2.5 text-sm">How can I help you?</div>
                    <div class="mt-2 flex flex-col items-center text-sm">
                      <div @click="sendAI(1)" class="my-1 w-64 p-1.5 text-blueBtn text-center rounded-lg hover:underline cursor-pointer" style="background-color: #F2F2F2;">How to check price</div>
                      <div @click="sendAI(2)" class="my-1 w-64 p-1.5 text-blueBtn text-center rounded-lg hover:underline cursor-pointer" style="background-color: #F2F2F2;">Services</div>
                      <div @click="sendAI(3)" class="my-1 w-64 p-1.5 text-blueBtn text-center rounded-lg hover:underline cursor-pointer" style="background-color: #F2F2F2;">Become a member</div>
                    </div>
                  </div>

                  <div v-for="(i,n) in chatMessage" :key="n">
                    <div v-if="i.is_me == 1" class="py-2 flex justify-end">
                      <div class="pr-2 flex flex-col items-end" style="width:calc( 100% - 80px )">
                        <div class="flex items-end justify-end flex-wrap">
                          <div class="text-xs text-gray-500">{{i.date_entered}}</div>
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
                              <img src="../assets/dtdtime.svg" class="w-3 h-3 mr-1" alt="">
                              <div class="text-xs">{{i.msg.date}}</div>
                            </div>
                            <div class="flex items-center my-0.5">
                              <img src="../assets/dtdprice.svg" class="w-3 h-3 mr-1" alt="">
                              <div class="flex items-center">
                                <div class="text-red-500 font-semibold">{{i.msg.price}}</div>
                                <div v-show="i.msg_type == 3" class="text-xs">{{i.msg.weight}}</div>
                              </div>
                            </div>
                            <div v-show="i.msg.destination != ''" class="flex items-center">
                              <img src="../assets/dtdlocation.svg" class="w-3 h-3 mr-1" alt="">
                              <div class="text-xs">{{i.msg.destination}}</div>
                            </div>
                          </div>
                          <div v-show="i.is_read == 1" class="absolute bottom-0 -left-6">
                            <svg t="1678437391950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30218" width="18" height="18"><path d="M511.006881 64.592111c-247.195985 0-447.565479 200.369493-447.565479 447.566502 0 247.168356 200.369493 447.566502 447.565479 447.566502 247.168356 0 447.566502-200.398146 447.566502-447.566502C958.573383 264.961604 758.175237 64.592111 511.006881 64.592111zM511.006881 895.376551c-211.645304 0-383.217938-171.59924-383.217938-383.217938 0-211.646328 171.572634-383.217938 383.217938-383.217938s383.217938 171.572634 383.217938 383.217938C894.22482 723.776288 722.652186 895.376551 511.006881 895.376551z" fill="#7a7a7a" p-id="30219"></path><path d="M706.369338 385.719922c-11.580756 0-22.099321 4.700045-29.706579 12.308327L454.6135 620.581997l-137.570215-138.074705c-7.608282-7.609305-18.098193-12.308327-29.706579-12.308327-23.161512 0-41.958624 18.769482-41.958624 41.959647 0 11.580756 4.670369 22.043039 12.252045 29.622668l167.277818 167.837566c7.580652 7.580652 18.098193 12.308327 29.706579 12.308327 11.609409 0 22.099321-4.700045 29.707602-12.308327l0 0.028653 251.754814-252.343215c7.553023-7.580652 12.252045-18.070564 12.252045-29.65132C748.327962 404.491451 729.53085 385.719922 706.369338 385.719922z" fill="#7a7a7a" p-id="30220"></path></svg>
                          </div>
                        </div>
                        <div v-if="i.msg_type == 14" class="mt-1.5 relative">
                          <a :href="i.msgx.url" target="_blank">
                            <img :src="i.msgx.image" style="border-radius: 6px 6px 0 0;max-width: 180px;min-width: 180px;" alt="">
                          </a>
                          <div style="width: 180px;background-color: #ededed;padding: 10px;border-radius: 0 0 6px 6px;">
                            <a :href="i.msgx.url" target="_blank">
                              <div class="productTitleMsg">{{i.msgx.subject}}</div>
                            </a>
                            <div style="padding-top: 6px;color: #e30101;font-weight: 600;">${{i.msgx.price_us}}</div>
                          </div>
                        </div>
                      </div>
                      <img :src="i.head_img" class="flex-shrink-0 w-12 h-12 rounded-full" alt="">
                    </div>

                    <div v-else-if="i.msg_type!=15" class="py-2 flex">
                      <img :src="i.head_img" class="flex-shrink-0 w-12 h-12 rounded-full" alt="">
                      <div class="pl-2 flex flex-col items-start" style="width:calc( 100% - 80px )">
                        <div class="flex items-start flex-wrap-reverse">
                          <div class="text-sm mr-2 dark:text-gray-400">{{i.nickname}}</div>
                          <div class="text-xs text-gray-500">{{i.date_entered}}</div>
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
                                  <img src="../assets/dtdtime.svg" class="w-3 h-3 mr-1" alt="">
                                  <div class="text-13">{{i.msg.date}}</div>
                                </div>
                                <div v-show="i.msg.unit_price" class="flex items-center mt-0.5">
                                  <img src="../assets/dtdprice.svg" class="w-3 h-3 mr-1" alt="">
                                  <div class="text-13">${{i.msg.unit_price}}/kg</div>
                                </div>
                                <div class="flex items-center my-0.5">
                                  <img src="../assets/dtdprice.svg" class="w-3 h-3 mr-1" alt="">
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
                                  <img src="../assets/dtdlocation.svg" class="w-3 h-3 mr-1" alt="">
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
                          <div class="p-3 rounded-md bg-gray-100 shadow-default">
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

                    <div v-if="i.msg_type == 999" class="my-3 text-gray-400 text-center text-xs">{{ i.msg }}</div>
                  </div>

                  <div v-show="waitingAI"
                    class="pt-5 text-gray-400 text-center text-xs">AI replies can take 5-10 seconds to reply</div>

                  <div v-show="bookingChat"
                    class="mt-4 p-3 flex justify-between items-center rounded-md border border-orange relative">
                    <svg t="1678422103952" @click="bookingChat = false" class="absolute right-0 -top-3.5 icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2580" width="26" height="26"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM512 832c-179.2 0-320-140.8-320-320s140.8-320 320-320 320 140.8 320 320S691.2 832 512 832z" p-id="2581" fill="#7a7a7a"></path><path d="M672 352c-12.8-12.8-32-12.8-44.8 0L512 467.2 396.8 352C384 339.2 364.8 339.2 352 352S339.2 384 352 396.8L467.2 512 352 627.2c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L512 556.8l115.2 115.2c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8L556.8 512l115.2-115.2C684.8 384 684.8 364.8 672 352z" p-id="2582" fill="#7a7a7a"></path></svg>
                    <div class="overflow-ellipsis overflow-hidden whitespace-nowrap text-sm dark:text-gray-400">Do you want to consult {{bookingName}}?</div>
                    <button @click="sendBooking" class="ml-3 px-5 py-1.5 bg-orange hover:bg-orange1 text-white rounded-md text-xs">Send</button>
                  </div>
                  <div v-show="portChat"
                    class="mt-4 p-3 flex justify-between items-center rounded-md border border-orange relative">
                    <svg t="1678422103952" @click="portChat = false" class="absolute right-0 -top-3.5 icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2580" width="26" height="26"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM512 832c-179.2 0-320-140.8-320-320s140.8-320 320-320 320 140.8 320 320S691.2 832 512 832z" p-id="2581" fill="#7a7a7a"></path><path d="M672 352c-12.8-12.8-32-12.8-44.8 0L512 467.2 396.8 352C384 339.2 364.8 339.2 352 352S339.2 384 352 396.8L467.2 512 352 627.2c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L512 556.8l115.2 115.2c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8L556.8 512l115.2-115.2C684.8 384 684.8 364.8 672 352z" p-id="2582" fill="#7a7a7a"></path></svg>
                    <div class="overflow-ellipsis overflow-hidden whitespace-nowrap text-sm dark:text-gray-400">Do you want to inquire the price of {{portName}}?</div>
                    <button @click="sendPort" class="ml-3 px-5 py-1.5 bg-orange hover:bg-orange1 text-white rounded-md text-xs">Send</button>
                  </div>
                  <div v-show="orderChat"
                    class="mt-4 p-3 flex justify-between items-center rounded-md border border-orange relative">
                    <svg t="1678422103952" @click="orderChat = false" class="absolute right-0 -top-3.5 icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2580" width="26" height="26"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM512 832c-179.2 0-320-140.8-320-320s140.8-320 320-320 320 140.8 320 320S691.2 832 512 832z" p-id="2581" fill="#7a7a7a"></path><path d="M672 352c-12.8-12.8-32-12.8-44.8 0L512 467.2 396.8 352C384 339.2 364.8 339.2 352 352S339.2 384 352 396.8L467.2 512 352 627.2c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L512 556.8l115.2 115.2c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8L556.8 512l115.2-115.2C684.8 384 684.8 364.8 672 352z" p-id="2582" fill="#7a7a7a"></path></svg>
                    <div class="text-sm dark:text-gray-400">You may want to inquire about order number {{orderName}}?</div>
                    <button @click="sendOrder" class="ml-3 px-5 py-1.5 bg-orange hover:bg-orange1 text-white rounded-md text-xs">Send</button>
                  </div>
                </div>
              </div>
              <div class="p-3 border-t dark:border-darkLine relative">
                <div v-show="entering" class="absolute -top-5 left-2 text-xs text-gray-500">
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
                  @keyup.enter.exact="sendMessage" @keyup.ctrl.enter="listenKey()"
                  ref="textArea" v-model="msg"  rows="3"
                  class="input text-13 resize-none bg-gray-50 border-gray-200"
                  placeholder="Enter the shipment information to get details e.g. 21kg Shenzhen to USA"></textarea>
              </div>
            </div>
            <div v-show="chatLarge"
              class="hidden lg:flex w-80 p-3 border-l dark:border-darkLine flex-col items-center">
              <img :src="manage.image_url" class="mt-20 w-20 h-20 rounded-full" alt="">
              <div class="mt-4 font-semibold dark:text-gray-400">{{manage.englishname}}</div>
              <div class="mt-2 text-sm dark:text-gray-400">Account Manager</div>
              <div class="mt-4 flex items-center w-full rounded-3xl bg-gray-200">
                <div class="h-full flex items-center px-4 py-1.5 bg-green-500 rounded-3xl">
                  <svg t="1678429918279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18947" width="18" height="18"><path d="M520.124 64C277.21 64 80.268 259.402 80.268 500.464c0 82.46 23.064 159.58 63.118 225.374L64 960l243.528-77.364c63.016 34.57 135.49 54.292 212.596 54.292C763.07 936.928 960 741.498 960 500.464 960 259.402 763.07 64 520.124 64z m218.724 602.22c-10.348 25.654-57.148 49.066-77.798 50.144-20.628 1.094-21.216 15.988-133.68-32.868-112.45-48.868-180.104-167.688-185.438-175.34-5.338-7.624-43.56-62.094-41.498-116.91 2.076-54.826 32.094-80.692 42.808-91.45 10.702-10.774 22.972-12.704 30.464-12.826 8.856-0.144 14.592-0.264 21.146-0.022 6.548 0.248 16.384-1.37 24.9 21.278 8.512 22.646 28.886 78.306 31.492 83.978 2.604 5.678 4.216 12.252 0.204 19.542-4.024 7.306-6.084 11.87-11.922 18.166-5.87 6.296-12.348 14.084-17.584 18.898-5.84 5.33-11.94 11.144-5.8 22.538 6.136 11.386 27.306 48.712 59.558 79.472 41.45 39.542 77.196 52.658 88.196 58.634 11.03 6.008 17.612 5.34 24.452-1.858 6.808-7.198 29.278-31.492 37.192-42.338 7.91-10.876 15.322-8.746 25.484-4.658 10.156 4.104 64.314 33.112 75.346 39.102 11.02 5.978 18.386 9.058 21.02 13.8 2.634 4.76 1.802 27.062-8.542 52.718z" p-id="18948" fill="#ffffff"></path></svg>
                </div>
                <div class="p-2 w-full text-sm leading-4 text-gray-500 text-center">{{manage.whatsappp}}</div>
              </div>
              <div class="mt-2 flex items-center w-full rounded-3xl bg-gray-200">
                <div class="h-full flex items-center px-4 py-1.5 bg-blue-500 rounded-3xl">
                  <svg t="1678430218216" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20170" width="18" height="18"><path d="M926.47619 355.644952V780.190476a73.142857 73.142857 0 0 1-73.142857 73.142857H170.666667a73.142857 73.142857 0 0 1-73.142857-73.142857V355.644952l304.103619 257.828572a170.666667 170.666667 0 0 0 220.745142 0L926.47619 355.644952zM853.333333 170.666667a74.044952 74.044952 0 0 1 26.087619 4.778666 72.704 72.704 0 0 1 30.622477 22.186667 73.508571 73.508571 0 0 1 10.678857 17.67619c3.169524 7.509333 5.12 15.652571 5.607619 24.210286L926.47619 243.809524v24.380952L559.469714 581.241905a73.142857 73.142857 0 0 1-91.306666 2.901333l-3.632762-2.925714L97.52381 268.190476v-24.380952a72.899048 72.899048 0 0 1 40.155428-65.292191A72.97219 72.97219 0 0 1 170.666667 170.666667h682.666666z" p-id="20171" fill="#ffffff"></path></svg>
                </div>
                <div class="p-2 w-full text-sm leading-4 text-gray-500 text-center">{{manage.service_email}}</div>
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
  feedback,
  feedbackSubmit,
  ImgUpload
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
import {
  getRate
} from '@/api/dropshipping'
import uaParser from 'ua-parser-js'
import MarkdownIt from 'markdown-it';
import Upload from '@/components/upload';
import GlobalLanguageSelect from '@/components/GlobalLanguageSelect.vue';
export default {
  components:{
    Upload,
    GlobalLanguageSelect
  },
  data() {
    return {
      images:[],
      severity_level: 0,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
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
      content: '',
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
      manageNow: {
        image_url: '',
        englishname: '',
      },
      manageAI: false,
      waitingAI: false,
      waitingTime: null,
      banEnter: false,
      searchForms: '',
      searchPorts: '',
      globalWeb: this.$globalWeb,
      chatModal: true,
      rate: 6,
    }
  },
  mounted() {
    getRate().then((rez) => {
      this.rate = rez.data.exchange_rate;
    })
    if(!this.$store.state.user.token || this.$store.state.user.token=='undefined'){
      this.istoken = false
    }else{
      this.istoken = true
    }
    this.screenWidth = document.body.clientWidth
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth
        })()
      }
      if (this.screenWidth > 1024) {
        this.left = 'open'
      } else {
        this.left = 'close'
      }
    
    if(this.istoken){
      let dt = new Date()
      // const first_name = JSON.parse(localStorage.getItem('first_name'))
      // const last_name = JSON.parse(localStorage.getItem('last_name'))
      let user = JSON.parse(localStorage.getItem('userInfo'))
      const userId = user.id
      const headImg = user.img
      this.email = user.email
      if(this.email == null){
        this.head_portrait = require('../assets/moren.png')
      }else{
        this.head_portrait = headImg + userId + '_40_40.png?v=' + dt.getTime()
      }
      this.times = dt.getTime()
      
      // console.log(user,'123gdsgae');
      this.userName = user.first_name + ' ' + user.last_name
      this.userID = user.id
      this.superLevel = user.super_level
      this.firstLogin = user.first_login
      if(this.firstLogin == 1){
        // createCoupons().then((res)=>{})
        this.$refs.memberMask.style = 'display:block;'
        this.$refs.firstloginModal.style = 'display:block;'
        setTimeout(()=>{
          this.$refs.memberMask.style = 'display:block;opacity:1;'
          this.$refs.firstloginModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        })
      }
      // if(user.first_login == 1){
      //   this.chatNum = 1
      // }
      this.firstName = user.first_name
      // if(user.manage.id){
      //   this.manage = user.manage
      // }
      if(user.hasOwnProperty('manage')){
        this.manage = user.manage
        if(this.manage.whatsappp.indexOf('+')==-1){
          this.manage.whatsappp = '+86'+ this.manage.whatsappp
        }
        // console.log(user);
        // this.manageNow = user.manage
      }
      // console.log(this.manage)
      // this.$refs.all.className
      
      this.themes()
      // this.accessNotice()
      this.StartWebSocket()
    }else{
      if(localStorage.getItem('chat_info')){
        let chatInfo = JSON.parse(localStorage.getItem('chat_info'))
        this.manageNew = chatInfo.manage
        this.manage = chatInfo.manage
        if(this.manage.whatsappp.indexOf('+')==-1){
          this.manage.whatsappp = '+86'+ this.manage.whatsappp
        }
        localStorage.setItem("manageNew", JSON.stringify(this.manageNew))
        this.ruleForm.id = chatInfo.chat_id
        this.userID = chatInfo.chat_id
        this.StartWebSocket()
      }else{
        let code = localStorage.getItem('invitation_code')
        getId({
          type: 1,
          code: code
        }).then(res=>{
          localStorage.setItem('chat_info',JSON.stringify(res.data))
          this.manageNew = res.data.manage
          this.manage = res.data.manage
          if(this.manage.whatsappp.indexOf('+')==-1){
            this.manage.whatsappp = '+86'+ this.manage.whatsappp
          }
          localStorage.setItem("manageNew", JSON.stringify(this.manageNew))
          this.ruleForm.id = res.data.chat_id
          this.userID = res.data.chat_id
          this.StartWebSocket()
        })
      }

      const ua = uaParser(navigator.userAgent)
      // console.log(ua);
      this.ruleForm.browser = ua.browser.name
      this.ruleForm.sys = ua.os.name + ua.os.version
      this.ruleForm.machine = window.screen.width + '*' + window.screen.height
      

      this.$refs.memberMask.style = 'display:block;'
      this.$refs.nologinModal.style = 'display:block;'
      setTimeout(()=>{
        this.$refs.memberMask.style = 'display:block;opacity:1;'
        this.$refs.nologinModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      })
    }

    document.addEventListener(
      'click',
      this.even,
      true
    )
  
    this.$refs.textArea.addEventListener('paste', async (e)=>{
      if(e.clipboardData.files[0]){
        this.formData = new FormData()
        this.formData.append('file', e.clipboardData.files[0])
        let res = await fetch('https://mini.cargosoon.online/api/mini/Login/upload_chat', {
          method: 'POST',
          body: this.formData,
        })
        let data = await res.json()
        if (data.code == "0") {
          var img = data.data.image
          let imgs = 'https://mini.cargosoon.online/api' + img.substr(1)
          for (let [a, b] of this.formData.entries()) {
            if(b.type.indexOf('image')!=-1){
              var message = { 
                type: "chat_msg",
                from_user_id: this.userID,
                from_service_id: this.manage.id,
                service_type: 1,
                msg_type: 1,
                // msg: '<img style="max-width:80px;min-height:80px;" src="' + img + '">'
                msg: imgs,
                order_state: this.$store.state.user.token,
                client_source: 2
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
                msg: JSON.stringify(msgs),
                order_state: this.$store.state.user.token,
                client_source: 2
              }
              this.websocket.send(JSON.stringify(message))
            }
          }
        }
      }
    })
    if(this.$store.state.user.token){
      // console.log(document.querySelector(".okki-chat--bubble-holder"),'1231313');
      // document.querySelector(".okki-chat--bubble-holder").style="display:none;"
      this.$nextTick(() => {
        import('../style/xm.css')
      });
    }
    if(this.$route.params.level == 'L1'){
      this.$refs.memberMask.style = 'display:block;'
      this.$refs.memberModal.style = 'display:block;'
      setTimeout(()=>{
        this.$refs.memberMask.style = 'display:block;opacity:1;'
        this.$refs.memberModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      })
    }
  },
  created() {
    if(!localStorage.getItem("Countries")){
      this.countryQuest()
    }
  },
  destroyed() {  
    document.removeEventListener('click', this.even, true) 
    clearInterval(this.t)
  },
  watch: {
    screenWidth: {
      handler: function (val) {
        if (val < 1024) {
          this.$refs.main.style.width = '100%'
          this.$refs.main.style.left = '0px'
          this.$refs.newSwitch.style = 'left: -10px;z-index: 30;display: flex'
          if (this.first == true) {
            this.left = 'close'
          }
          if (this.left == 'open') {
            this.$refs.mask.style.display = 'block'
          }
        } else {
          if (this.left == 'open') {
            this.$refs.main.style.width = 'calc(100% - 250px)'
            this.$refs.main.style.left = '250px'
            this.$refs.newSwitch.style = 'left: -28px;z-index: 0;display: none'
          }
          this.$refs.mask.style.display = 'none'
          if (this.first == true) {
            this.left = 'open'
          }
        }
      },
      // immediate: true,
      deep: true,
    },
  },
  methods: {
    handlePaste(event) {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      
      // 遍历所有粘贴项
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          // 如果是图片，则读取图片并上传
          const blob = items[i].getAsFile();
          this.uploadImg(blob);
          break;
        }
      }
      // 默认行为是粘贴文本
    },
    uploadImg(file){
      let data = new FormData()
      data.append('file', file);
      ImgUpload(data).then((res)=>{
        this.images = [];
        this.images.push(res.data.path)
      })
    },
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

      if (!this.$refs.chatShow.contains(e.target) && !this.$refs.maskImg.contains(e.target)
        && !this.$refs.openImgPanel.contains(e.target)) {
        this.closeChat()
      }
      if (!this.$refs.emojiPanel.contains(e.target)) {
        this.emojiPanel = false
      }
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
          window.localStorage.clear()
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
      if(this.content != ''){
        feedbackSubmit({
          source: 1,
          type: window.location.href,
          content: this.content,
          severity_level: this.severity_level,
          images: this.images
        }).then((res)=>{
          if(res.code == 0){
            this.feedbackLoading = true
            this.feedbackSuccess = true
            setTimeout(()=>{
              this.feedbackLoading = false
              this.content = ''
              this.images = []
              this.severity_level = 0
            },800)
          }
        })
      }
    },
    cancelFeedback(){
      this.feedbackMenu = false
      this.content = ''
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
          client_source: 2
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
            this.manageNow.image_url = 'https://co-logistics.cn/api/uploads/ai.png'
            this.manageNow.englishname = 'Message-AI'
            this.manageAI = true
          }
        }
        if(data.type == 'no_login_init'){
          this.manage.id = data.manage_row.id
          this.manage.image_url = data.manage_row.image_url
          this.manage.englishname = data.manage_row.englishname
          this.manage.service_email = data.manage_row.service_email
          this.manage.whatsappp = data.manage_row.whatsappp
          if(data.mode == 2){
            this.manageNow.image_url = 'https://co-logistics.cn/api/uploads/ai.png'
            this.manageNow.englishname = 'Message-AI'
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
          if(list[n].msg_type == 14){
            list[n].msgx = JSON.parse(list[n].msg)
            if(list[n].msgx.url.indexOf('source=5')==-1){
              list[n].msgx.price_us = (Number(list[n].msgx.min_price)/this.rate).toFixed(2)
            }else{
              list[n].msgx.price_us = list[n].msgx.min_price
            }
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
        if(!this.chatShow){
          this.chatNum+=1
        }
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
          this.manageNow.image_url = 'https://co-logistics.cn/api/uploads/ai.png'
          this.manageNow.englishname = 'Message-AI'
        }else{
          this.manageNow = this.manage
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
    onError(e){
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
            client_source: 2
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
            client_source: 2
          }
          this.websocket.send(JSON.stringify(message))
        }
        
      }
    },
    async chatOpen(){
      // this.chatMove = true
      this.chatShow =! this.chatShow
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
      this.$refs.chatShow.style.display = 'flex'
      setTimeout(()=>{
        // this.$refs.chatShow.style = 'display: flex;opacity: 1;'
        this.$refs.chatShow.style.display = 'flex'
        this.$refs.chatShow.style.opacity = 1
        this.$refs.chatShow.style.left = this.point.x + 'px'
        this.$refs.chatShow.style.top = this.point.y + 'px'
      },1)
    },
    Height(){
      this.$nextTick(() => {
        this.$refs.chatPanels.scrollTop = this.$refs.chatPanels.scrollHeight
      })
    },
    closeChat(){
      this.chatShow = false
      setTimeout(()=>{
        this.$refs.chatShow.style = 'display: none;opacity: 0;'
      },1)
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
      this.$nextTick(() => {
        this.$refs.chatShow.style.left = this.point.x + 'px'
        this.$refs.chatShow.style.top = this.point.y + 'px'
      })
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
        client_source: 2
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
      // console.log(item);
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
        }else if(item.msg_link.indexOf("co_warehouse_manage")!=-1){
          this.$router.replace({
            path: '/account/orderList?type=2',
          })
          setTimeout(()=>{
            this.$router.go(0)
          },300)
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
        client_source: 2
      }
      this.websocket.send(JSON.stringify(message))
    },
    toPriceDetails(item,type){
      let routeName = this.$router.currentRoute.name
      let items = JSON.stringify(item)
      if(type == 3){
        if(routeName != 'shippingList'){
          this.$router.push({
            name:'shippingList',
            params: {
              searchForm: items,
            },
          })
        }else{
          this.searchForms = items
        }
      }else{
        if(routeName != 'FCL'){
          this.$router.push({
            name:'FCL',
            params: {
              searchForm: items,
            },
          })
        }else{
          this.searchPorts = items
        }
      }
    },
    hidChat(e){
      console.log(e);
      
      this.chatModal = e
    },
  },
}
</script>

<style lang="postcss">
/* ::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: transparent;
}

::-webkit-scrollbar-track {
  border-radius: 0;
  background: transparent;
} */

::-webkit-scrollbar {
  width: 0px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  /* border-radius: 0 !important; */
  /* background: rgb(255, 255, 255); */
  border-radius: 6px;
}

.topMenu {
  @apply w-full h-topmenu bg-lightTop dark:bg-darkMenu text-menuText z-30 select-none border-b-0 border-solid border-gray-300 fixed top-0 flex justify-between items-center;
}

.topMenuLeft {
  @apply flex h-full;
}

.topMenuRight {
  @apply flex items-center;
}

.leftMenu {
  @apply px-1 lg:z-30 z-70 -translate-x-full lg:translate-x-0 overflow-y-auto overflow-x-hidden select-none fixed transform left-0 w-leftmenu h-full lg:h-leftmenu top-0 lg:top-12 bg-lightMenu dark:bg-darkMenu border-r border-solid border-gray-300 dark:border-gray-800 text-15;
  transition: all 0.5s;
}

.menuTitle {
  @apply border-l-2 border-transparent pl-3 pt-5 pb-2 text-black text-sm font-semibold flex items-center;
}

.menuItem {
  @apply border-l-2 border-transparent rounded-md text-base text-lightText flex items-center pl-12 py-2 font-medium dark:text-gray-300 sm:hover:bg-lightMenuHover sm:dark:hover:bg-gray-500 cursor-pointer;
}

.menuItem img {
  @apply w-4 h-4 mr-2 hidden;
}

.main {
  @apply fixed top-12 left-0 lg:left-250 z-40 bg-lightMenu dark:bg-darkMain w-full lg:w-main h-leftmenu;
  transition: all 0.5s;
}

.menuSearch {
  @apply ml-4 h-full border-0 border-solid dark:bg-darkMain border-gray-300 rounded w-200 focus:outline-none focus:border-gray-500 placeholder-gray-300 text-14;
}

.main1 {
  @apply max-w-1200 w-full mx-auto p-3 sm:p-5 bg-white dark:bg-darkMenu rounded shadow-default text-lightText dark:text-darkText;
  transition: all 0.5s;
}

.breadcrumb {
  @apply pt-12 pb-3 bg-lightMenu dark:bg-darkMain max-w-1200 w-full mx-auto text-lightText dark:text-darkText text-xl font-semibold;
  transition: all 0.5s;
}

.select {
  @apply w-full bg-white dark:bg-darkMain dark:border-darkMain border border-inputBorder focus:outline-none focus:ring focus:ring-formRing focus:border-formBorder rounded px-2 py-2 text-base;
  /* transition: all 0.5s; */
}

.visited {
  @apply font-semibold text-orange bg-menuSelect hover:bg-menuSelect dark:hover:bg-menuSelect dark:text-orange;
}

.topSelect {
  @apply text-black z-50 absolute bg-white text-14 rounded-md shadow-md overflow-hidden;
}

.required {
  @apply text-red-500 mr-1;
}

.emojiItem{
  @apply p-1 col-span-1 cursor-pointer text-center hover:bg-gray-200 dark:hover:bg-darkLine rounded-md;
}

.messageImg{
  @apply flex text-sm mx-1;
}

.messageImg>img{
  @apply rounded-md cursor-pointer;
  max-width: 80px;
  min-width: 80px;
}

.chatMain{
  @apply hidden opacity-0 absolute rounded-md bg-white dark:bg-darkMenu shadow-xxx z-10;
  transition: opacity 0.4s;
}

.member_mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.member_modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.pullIcon{
  fill: #7a7a7a;
}

.pullIcon:hover{
  fill: #f39333;
}

.top-language {
  margin-right: 14px;
}

.top-language select {
  min-width: 132px;
  height: 36px;
}
</style>

<style>
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

.productTitleMsg {
  @apply text-13 break-words overflow-ellipsis overflow-hidden hover:underline h-10 cursor-pointer;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
