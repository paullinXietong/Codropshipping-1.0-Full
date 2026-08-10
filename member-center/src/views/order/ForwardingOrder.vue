<template>
  <div class="w-full h-full relative">
    <div ref="mask" class="mask"></div>
    <div ref="uploadModal" class="py-10 modal w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div @click="closeModal" class="absolute right-1.5 top-1.5 flex hover:bg-gray-200 cursor-pointer">
        <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
      </div>
      <div class="flex justify-center items-center">
        <svg t="1688373084403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2316" width="28" height="28"><path d="M510.545 28.22c-267.043 0-483.521 216.477-483.521 483.52s216.479 483.521 483.521 483.521 483.52-216.479 483.52-483.521S777.588 28.22 510.545 28.22zM776.855 407.855l-315.37 315.37c-9.763 9.763-22.559 14.645-35.355 14.645-12.796 0-25.592-4.882-35.355-14.645l-176.13-176.13c-19.526-19.525-19.526-51.184 0-70.71 19.526-19.526 51.184-19.527 70.711 0L426.13 617.159l280.015-280.015c19.527-19.526 51.184-19.526 70.711 0C796.382 356.671 796.382 388.329 776.855 407.855z" fill="#75bb43" p-id="2317"></path></svg>
        <div class="ml-3">Upload successfully</div>
      </div>
    </div>
    <div ref="delModal" class="py-10 modal w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div @click="closeModal" class="absolute right-1.5 top-1.5 flex hover:bg-gray-200 cursor-pointer">
        <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
      </div>
      <div class="flex justify-center items-center">
        <svg t="1688374355158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260" width="28" height="28"><path d="M730.156522 171.408696 730.156522 84.591304c0-46.747826-40.069565-84.591304-86.817391-84.591304L380.66087 0c-48.973913 0-86.817391 37.843478-86.817391 84.591304l0 84.591304L73.46087 169.182609l0 84.591304 86.817391 0 0 681.182609c0 46.747826 40.069565 84.591304 86.817391 84.591304l525.356522 0c48.973913 0 86.817391-37.843478 86.817391-84.591304L859.269565 256l86.817391 0L946.086957 171.408696 730.156522 171.408696zM463.026087 877.078261l-97.947826 0L365.078261 340.591304l97.947826 0L463.026087 877.078261zM658.921739 877.078261l-97.947826 0L560.973913 340.591304l97.947826 0L658.921739 877.078261z" fill="#2c2c2c" p-id="4261"></path></svg>
        <div class="ml-3">Delete completed</div>
      </div>
    </div>

    <div class="w-full max-w-1440 m-auto h-full p-3 sm:p-5 overflow-scroll text-menu dark:text-darkText">
      
      <div v-if="noReq" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
        <div class="flex flex-col items-center">
          <img src="../../assets/noData.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
          <div class="mt-5 text-base text-center font-semibold">No order Info</div>
        </div>
      </div>

      <div v-else>
        <div class="bg-white dark:bg-darkMenu mb-4 py-4 px-6 grid grid-cols-9 gap-4 rounded-md shadow-default">
          <div class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-orange rounded-full"></div>
              <div class="w-1 sm:w-full h-6 sm:h-1 bg-orange"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Booking</div>
              <div class="text-sm">Fill in the request information</div>
            </div>
          </div>
          <div :class="status >= 2 ? '' : 'text-gray-300'"
            class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col ">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div :class="status >= 2 ? 'inStatus' : ''" class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
              <div :class="status >= 2 ? 'inStatus' : ''" class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Load Cargo</div>
              <div class="text-sm">Waiting for goods to load</div>
            </div>
          </div>
          <div :class="status >= 3 ? '' : 'text-gray-300'"
            class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div :class="status >= 3 ? 'inStatus' : ''" class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
              <div :class="status >= 3 ? 'inStatus' : ''" class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Payment</div>
              <div v-if="status < 3" class="text-sm">Waiting for payment</div>
              <div v-if="status >= 3 && payStatus == 1" class="text-sm text-orange">Unpaid</div>
              <div v-if="status >= 3 && payStatus == 2" class="text-sm text-green-500">Paid</div>
            </div>
          </div>
          <div :class="status >= 4 ? '' : 'text-gray-300'"
            class="col-span-9 sm:col-span-2 flex flex-row sm:flex-col">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div :class="status >= 4 ? 'inStatus' : ''" class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
              <div :class="status >= 4 ? 'inStatus' : ''" class="w-1 sm:w-full h-6 sm:h-1 bg-gray-300"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Shipped</div>
              <div class="text-sm">Cargo tracking</div>
            </div>
          </div>
          <div :class="status >= 5 ? '' : 'text-gray-300'"
            class="col-span-9 sm:col-span-1 flex flex-row sm:flex-col">
            <div class="flex items-center flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-2">
              <div :class="status >= 5 ? 'inStatus' : ''" class="flex-shrink-0 w-6 h-6 mr-0 sm:mr-4 mb-2.5 sm:mb-0 bg-gray-300 rounded-full"></div>
            </div>
            <div class="ml-3 sm:ml-0">
              <div class="font-semibold mb-1">Delivered</div>
              <!-- <div class="text-sm">Delivered</div> -->
            </div>
          </div>
        </div>
        <div class="hidden xl:flex mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default overflow-hidden relative">
          <div class="tab" :class="{ tabs: istab == '0' }"
            @click="tabfun(0)">
            <div>Details</div>
            <div class="ml-1">
              <svg v-if="header.type_1" t="1671098625559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15527" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="15528"></path></svg>
              <svg v-else t="1671098716713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16570" width="16" height="16"><path d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z" fill="#7a7a7a" p-id="16571"></path></svg>
            </div>
          </div>
          <!-- <div class="tab" :class="{ tabs: istab == '1' }"
            @click="tabfun(1)">
            <div>Estimated Cost</div>
            <div class="ml-1">
              <svg v-if="header.type_2" t="1671098625559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15527" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="15528"></path></svg>
              <svg v-else t="1671098716713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16570" width="16" height="16"><path d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z" fill="#7a7a7a" p-id="16571"></path></svg>
            </div>
          </div> -->
          <!-- <div class="tab" :class="{ tabs: istab == '2' }"
            @click="tabfun(2)">
            <div>My Supplier</div>
            <div class="ml-1">
              <svg v-if="header.type_3" t="1671098625559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15527" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="15528"></path></svg>
              <svg v-else t="1671098716713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16570" width="16" height="16"><path d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z" fill="#7a7a7a" p-id="16571"></path></svg>
            </div>
          </div> -->
          <div class="tab" :class="{ tabs: istab == '3' }"
            @click="tabfun(3)">
            <div>Documents</div>
            <div class="ml-1">
              <svg v-if="header.type_4" t="1671098625559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15527" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="15528"></path></svg>
              <svg v-else t="1671098716713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16570" width="16" height="16"><path d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z" fill="#7a7a7a" p-id="16571"></path></svg>
            </div>
          </div>
          <!-- <div class="tab" :class="{ tabs: istab == '4' }"
            @click="tabfun(4)">
            <div>Warehouse</div>
            <div class="ml-1">
              <svg v-if="header.type_5" t="1671098625559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15527" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="15528"></path></svg>
              <svg v-else t="1671098716713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16570" width="16" height="16"><path d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z" fill="#7a7a7a" p-id="16571"></path></svg>
            </div>
          </div> -->
          <div class="tab" :class="{ tabs: istab == '5' }"
            @click="tabfun(5)">
            <div>Invoice</div>
            <div class="ml-1">
              <svg v-if="header.type_6" t="1671098625559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15527" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="15528"></path></svg>
              <svg v-else t="1671098716713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16570" width="16" height="16"><path d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z" fill="#7a7a7a" p-id="16571"></path></svg>
            </div>
          </div>
          <div class="tab" :class="{ tabs: istab == '6' }"
            @click="tabfun(6)">
            <div>Payment</div>
            <div class="ml-1">
              <svg v-if="header.type_7" t="1671098625559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15527" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="15528"></path></svg>
              <svg v-else t="1671098716713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16570" width="16" height="16"><path d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z" fill="#7a7a7a" p-id="16571"></path></svg>
            </div>
          </div>
          <div class="tab" :class="{ tabs: istab == '7' }"
            @click="tabfun(7)">
            <div>Tracking</div>
            <div class="ml-1">
              <svg v-if="header.type_8" t="1671098625559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15527" width="16" height="16"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="15528"></path></svg>
              <svg v-else t="1671098716713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16570" width="16" height="16"><path d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z" fill="#7a7a7a" p-id="16571"></path></svg>
            </div>
          </div>
          <!-- <div class="absolute top-3 right-2 text-14 cursor-pointer flex items-center" style="color: #1996d6;">
            <img src="../../assets/orderMessage.svg" class="w-5 h-5 mr-2" alt="">
            <div>Message</div>  
          </div> -->
        </div>
        <div class="xl:hidden flex items-center mt-4">
          <div class="mr-3 font-semibold">select status</div>
          <div class="w-200">
            <select v-model="istab" name="status" class="select dark:bg-darkMenu">
              <option value="0">Details</option>
              <!-- <option value="1">Estimated Cost</option> -->
              <!-- <option value="2">My Supplier</option> -->
              <option value="3">Documents</option>
              <!-- <option value="4">Warehouse</option> -->
              <option value="5">Invoice</option>
              <option value="6">Payment</option>
              <option value="7">Tracking</option>
            </select>
          </div>
        </div>

        <request v-show="istab == '0' && !boxId" :id="id" :tab="istab"></request>
        <ptp v-show="istab == '0' && boxId" :id="id" :tab="istab"></ptp>
        <quotation v-show="istab == '1'" :id="id" :tab="istab"></quotation>
        <supplier v-show="istab == '2'" :id="id" :tab="istab"></supplier>
        <documents v-show="istab == '3'" :id="id" :tab="istab"
          @successM="openUm"
          @delM="opendM"></documents>
        <warehouse v-show="istab == '4'" :id="id" :tab="istab"></warehouse>
        <expense v-show="istab == '5'" :id="id" :tab="istab"></expense>
        <payment v-show="istab == '6'" :id="id" :tab="istab" :status="status" :boxid="boxId"></payment>
        <tracking v-show="istab == '7'" :id="id" :tab="istab"></tracking>
      </div>
    </div>
  </div>
</template>

<script>
  import Request from '@/components/Order/Forwarding/Request'
  import Quotation from '@/components/Order/Forwarding/Quotation'
  import Supplier from '@/components/Order/Forwarding/Supplier'
  import Documents from '@/components/Order/Forwarding/Documents'
  import Warehouse from '@/components/Order/Forwarding/Warehouse'
  import Expense from '@/components/Order/Forwarding/Expense'
  import Payment from '@/components/Order/Forwarding/Payment'
  import Tracking from '@/components/Order/Forwarding/Tracking'
  import Ptp from '@/components/Order/Forwarding/Ptp'
  import {
    getOrderInfo,
    getStatus,
    getType
  } from '@/api/order'
  export default {
    components: {
      Request,
      Quotation,
      Supplier,
      Documents,
      Warehouse,
      Expense,
      Payment,
      Tracking,
      Ptp
    },
    data() {
      return {
        id: this.$route.params.id,
        istab: 0,
        status: 1,
        payStatus: 1,
        header: {},
        noReq: false,
        boxId: false,
      }
    },
    created() {
      this.$emit('menu', 'forwardingOrder')
      getOrderInfo({
        id: this.id,
        type: 1
      }).then((res)=>{
        if(res.msg == '系统错误'){
          this.noReq = true
        }
      })
      getStatus({ id: this.id }).then((res)=>{
        this.status = res.data.status
        this.payStatus = res.data.payment_status
      })
      getType({ id: this.id }).then((reh)=>{
        this.header = reh.data
      })

      
    },
    mounted(){
      if(this.$route.query.boxId || this.$route.query.boxType == 'ptp'){
        this.boxId = true
      }
      if(this.$route.query.type){
        this.tabfun(this.$route.query.type)
      }
    },
    methods:{
      tabfun(e){
        this.istab = e
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.uploadModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.delModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      openUm(){
        this.$refs.mask.style = 'display:block;'
        this.$refs.uploadModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.uploadModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      opendM(){
        this.$refs.mask.style = 'display:block;'
        this.$refs.delModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.delModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
    }
  }
</script>

<style>
.tab {
  @apply flex justify-center items-center mx-1.5 px-5 py-3 text-sm cursor-pointer border-b-2 border-transparent hover:border-orange select-none;
}

.tabs{
  @apply text-orange border-orange;
}

.inStatus{
  @apply bg-orange;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}
</style>