<template>
  <div>
    <div v-if="list.status == 2" class="mb-28">
      <!-- <div class="panel">
        <div class="font-semibold">Location Info</div>
        <div class="hidden sm:block mt-3 text-sm">
          <div class="py-3 border-b border-gray-300 dark:border-darkLine flex">
            <div class="w-1/2">Shipping from</div>
            <div class="w-1/2">Shipping to</div>
          </div>
          <div class="flex">
            <div class="w-1/2 py-1">
              <div class="py-2 flex items-center">
                <svg t="1671088004386" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2696" width="20" height="20"><path d="M497.117867 0C279.074133 0 102.4 177.152 102.4 395.605333 102.4 697.344 421.888 1024 498.346667 1024c76.526933 0 393.4208-326.724267 393.4208-628.394667C891.767467 177.152 714.9568 0 497.117867 0zm0 578.9696a181.6576 181.6576 0 0 1-181.521067-181.8624 181.6576 181.6576 0 0 1 181.521067-181.930667A181.6576 181.6576 0 0 1 678.570667 397.1072 181.6576 181.6576 0 0 1 497.117867 578.901333z" fill="#7a7a7a" p-id="2697"></path></svg>
                <div>{{ list.from_address }}</div>
              </div>
              <div v-show=" list.from_user != '' " class="py-2 flex items-center">
                <svg t="1671088247675" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12157" width="20" height="20"><path d="M502.178909 38.632727c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273z m0 0c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273zM413.184 581.678545c-169.472 0-306.874182 134.609455-306.874182 300.590546v19.316364c0 67.909818 137.402182 67.956364 306.874182 67.956363h197.957818c169.425455 0 306.781091-2.513455 306.781091-67.956363v-19.316364c0-165.981091-137.355636-300.590545-306.781091-300.590546H413.184z m0 0" p-id="12158" fill="#7a7a7a"></path></svg>
                <div>{{ list.from_user }}</div>
              </div>
              <div v-show=" list.from_tel != '' " class="py-2 flex items-center">
                <svg t="1671088305974" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13260" width="20" height="20"><path d="M871.673333 770.813333l-165.933333-165.94a53.4 53.4 0 0 0-75.426667 0l-37.713333 37.713334c-21.333333 21.333333-90.413333 0.1-150.846667-60.34S360.046667 452.76 381.413333 431.4l37.713334-37.713333a53.4 53.4 0 0 0 0-75.426667l-165.94-165.933333a53.393333 53.393333 0 0 0-75.42 0l-37.713334 37.713333c-27.866667 27.866667-44.84 64.52-50.46 108.946667-5.213333 41.206667-0.406667 87.42 14.28 137.333333C133.333333 536.586667 199.773333 642 290.9 733.1S487.42 890.666667 587.653333 920.126667c36.926667 10.86 71.813333 16.32 104.146667 16.32a264.333333 264.333333 0 0 0 33.213333-2.04c44.426667-5.62 81.08-22.593333 108.946667-50.46l37.713333-37.713334a53.393333 53.393333 0 0 0 0-75.42z" fill="#7a7a7a" p-id="13261"></path></svg>
                <div>{{ list.from_tel }}</div>
              </div>
              <div class="py-2 flex items-center">
                <svg t="1671088368237" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14509" width="20" height="20"><path d="M149.6 171.8h691.9c47.2 0 85.9 37.7 86.5 83.9L495.7 493 63.5 256c0.4-46.4 38.8-84.2 86.1-84.2z m-86.1 175l-0.4 419.6c0 46.7 38.9 84.9 86.5 84.9h691.9c47.6 0 86.5-38.2 86.5-84.9V346.6L505.9 572.8c-6.5 3.5-14.3 3.5-20.7 0l-421.7-226z" fill="#7a7a7a" p-id="14510"></path></svg>
                <div>{{ list.from_email }}</div>
              </div>
            </div>
            <div class="w-1/2 py-1">
              <div class="py-2 flex items-center">
                <svg t="1671088004386" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2696" width="20" height="20"><path d="M497.117867 0C279.074133 0 102.4 177.152 102.4 395.605333 102.4 697.344 421.888 1024 498.346667 1024c76.526933 0 393.4208-326.724267 393.4208-628.394667C891.767467 177.152 714.9568 0 497.117867 0zm0 578.9696a181.6576 181.6576 0 0 1-181.521067-181.8624 181.6576 181.6576 0 0 1 181.521067-181.930667A181.6576 181.6576 0 0 1 678.570667 397.1072 181.6576 181.6576 0 0 1 497.117867 578.901333z" fill="#7a7a7a" p-id="2697"></path></svg>
                <div>{{ list.to_address }}</div>
              </div>
              <div v-show=" list.to_user != '' " class="py-2 flex items-center">
                <svg t="1671088247675" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12157" width="20" height="20"><path d="M502.178909 38.632727c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273z m0 0c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273zM413.184 581.678545c-169.472 0-306.874182 134.609455-306.874182 300.590546v19.316364c0 67.909818 137.402182 67.956364 306.874182 67.956363h197.957818c169.425455 0 306.781091-2.513455 306.781091-67.956363v-19.316364c0-165.981091-137.355636-300.590545-306.781091-300.590546H413.184z m0 0" p-id="12158" fill="#7a7a7a"></path></svg>
                <div>{{ list.to_user }}</div>
              </div>
              <div v-show=" list.to_tel != '' " class="py-2 flex items-center">
                <svg t="1671088305974" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13260" width="20" height="20"><path d="M871.673333 770.813333l-165.933333-165.94a53.4 53.4 0 0 0-75.426667 0l-37.713333 37.713334c-21.333333 21.333333-90.413333 0.1-150.846667-60.34S360.046667 452.76 381.413333 431.4l37.713334-37.713333a53.4 53.4 0 0 0 0-75.426667l-165.94-165.933333a53.393333 53.393333 0 0 0-75.42 0l-37.713334 37.713333c-27.866667 27.866667-44.84 64.52-50.46 108.946667-5.213333 41.206667-0.406667 87.42 14.28 137.333333C133.333333 536.586667 199.773333 642 290.9 733.1S487.42 890.666667 587.653333 920.126667c36.926667 10.86 71.813333 16.32 104.146667 16.32a264.333333 264.333333 0 0 0 33.213333-2.04c44.426667-5.62 81.08-22.593333 108.946667-50.46l37.713333-37.713334a53.393333 53.393333 0 0 0 0-75.42z" fill="#7a7a7a" p-id="13261"></path></svg>
                <div>{{ list.to_tel }}</div>
              </div>
              <div class="py-2 flex items-center">
                <svg t="1671088368237" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14509" width="20" height="20"><path d="M149.6 171.8h691.9c47.2 0 85.9 37.7 86.5 83.9L495.7 493 63.5 256c0.4-46.4 38.8-84.2 86.1-84.2z m-86.1 175l-0.4 419.6c0 46.7 38.9 84.9 86.5 84.9h691.9c47.6 0 86.5-38.2 86.5-84.9V346.6L505.9 572.8c-6.5 3.5-14.3 3.5-20.7 0l-421.7-226z" fill="#7a7a7a" p-id="14510"></path></svg>
                <div>{{ list.to_email }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:hidden block mt-3 text-sm">
          <div>
            <div class="py-3 border-b border-gray-300 dark:border-darkLine flex">
              Shipping from
            </div>
            <div class="py-1">
              <div class="py-2 flex items-center">
                <svg t="1671088004386" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2696" width="20" height="20"><path d="M497.117867 0C279.074133 0 102.4 177.152 102.4 395.605333 102.4 697.344 421.888 1024 498.346667 1024c76.526933 0 393.4208-326.724267 393.4208-628.394667C891.767467 177.152 714.9568 0 497.117867 0zm0 578.9696a181.6576 181.6576 0 0 1-181.521067-181.8624 181.6576 181.6576 0 0 1 181.521067-181.930667A181.6576 181.6576 0 0 1 678.570667 397.1072 181.6576 181.6576 0 0 1 497.117867 578.901333z" fill="#7a7a7a" p-id="2697"></path></svg>
                <div>{{ list.from_address }}</div>
              </div>
              <div v-show=" list.from_user != '' " class="py-2 flex items-center">
                <svg t="1671088247675" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12157" width="20" height="20"><path d="M502.178909 38.632727c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273z m0 0c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273zM413.184 581.678545c-169.472 0-306.874182 134.609455-306.874182 300.590546v19.316364c0 67.909818 137.402182 67.956364 306.874182 67.956363h197.957818c169.425455 0 306.781091-2.513455 306.781091-67.956363v-19.316364c0-165.981091-137.355636-300.590545-306.781091-300.590546H413.184z m0 0" p-id="12158" fill="#7a7a7a"></path></svg>
                <div>{{ list.from_user }}</div>
              </div>
              <div v-show=" list.from_tel != '' " class="py-2 flex items-center">
                <svg t="1671088305974" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13260" width="20" height="20"><path d="M871.673333 770.813333l-165.933333-165.94a53.4 53.4 0 0 0-75.426667 0l-37.713333 37.713334c-21.333333 21.333333-90.413333 0.1-150.846667-60.34S360.046667 452.76 381.413333 431.4l37.713334-37.713333a53.4 53.4 0 0 0 0-75.426667l-165.94-165.933333a53.393333 53.393333 0 0 0-75.42 0l-37.713334 37.713333c-27.866667 27.866667-44.84 64.52-50.46 108.946667-5.213333 41.206667-0.406667 87.42 14.28 137.333333C133.333333 536.586667 199.773333 642 290.9 733.1S487.42 890.666667 587.653333 920.126667c36.926667 10.86 71.813333 16.32 104.146667 16.32a264.333333 264.333333 0 0 0 33.213333-2.04c44.426667-5.62 81.08-22.593333 108.946667-50.46l37.713333-37.713334a53.393333 53.393333 0 0 0 0-75.42z" fill="#7a7a7a" p-id="13261"></path></svg>
                <div>{{ list.from_tel }}</div>
              </div>
              <div class="py-2 flex items-center">
                <svg t="1671088368237" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14509" width="20" height="20"><path d="M149.6 171.8h691.9c47.2 0 85.9 37.7 86.5 83.9L495.7 493 63.5 256c0.4-46.4 38.8-84.2 86.1-84.2z m-86.1 175l-0.4 419.6c0 46.7 38.9 84.9 86.5 84.9h691.9c47.6 0 86.5-38.2 86.5-84.9V346.6L505.9 572.8c-6.5 3.5-14.3 3.5-20.7 0l-421.7-226z" fill="#7a7a7a" p-id="14510"></path></svg>
                <div>{{ list.from_email }}</div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="py-3 border-b border-gray-300 dark:border-darkLine flex">
              Shipping to
            </div>
            <div class="py-1">
              <div class="py-2 flex items-center">
                <svg t="1671088004386" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2696" width="20" height="20"><path d="M497.117867 0C279.074133 0 102.4 177.152 102.4 395.605333 102.4 697.344 421.888 1024 498.346667 1024c76.526933 0 393.4208-326.724267 393.4208-628.394667C891.767467 177.152 714.9568 0 497.117867 0zm0 578.9696a181.6576 181.6576 0 0 1-181.521067-181.8624 181.6576 181.6576 0 0 1 181.521067-181.930667A181.6576 181.6576 0 0 1 678.570667 397.1072 181.6576 181.6576 0 0 1 497.117867 578.901333z" fill="#7a7a7a" p-id="2697"></path></svg>
                <div>{{ list.to_address }}</div>
              </div>
              <div v-show=" list.to_user != '' " class="py-2 flex items-center">
                <svg t="1671088247675" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12157" width="20" height="20"><path d="M502.178909 38.632727c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273z m0 0c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273zM413.184 581.678545c-169.472 0-306.874182 134.609455-306.874182 300.590546v19.316364c0 67.909818 137.402182 67.956364 306.874182 67.956363h197.957818c169.425455 0 306.781091-2.513455 306.781091-67.956363v-19.316364c0-165.981091-137.355636-300.590545-306.781091-300.590546H413.184z m0 0" p-id="12158" fill="#7a7a7a"></path></svg>
                <div>{{ list.to_user }}</div>
              </div>
              <div v-show=" list.to_tel != '' " class="py-2 flex items-center">
                <svg t="1671088305974" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13260" width="20" height="20"><path d="M871.673333 770.813333l-165.933333-165.94a53.4 53.4 0 0 0-75.426667 0l-37.713333 37.713334c-21.333333 21.333333-90.413333 0.1-150.846667-60.34S360.046667 452.76 381.413333 431.4l37.713334-37.713333a53.4 53.4 0 0 0 0-75.426667l-165.94-165.933333a53.393333 53.393333 0 0 0-75.42 0l-37.713334 37.713333c-27.866667 27.866667-44.84 64.52-50.46 108.946667-5.213333 41.206667-0.406667 87.42 14.28 137.333333C133.333333 536.586667 199.773333 642 290.9 733.1S487.42 890.666667 587.653333 920.126667c36.926667 10.86 71.813333 16.32 104.146667 16.32a264.333333 264.333333 0 0 0 33.213333-2.04c44.426667-5.62 81.08-22.593333 108.946667-50.46l37.713333-37.713334a53.393333 53.393333 0 0 0 0-75.42z" fill="#7a7a7a" p-id="13261"></path></svg>
                <div>{{ list.to_tel }}</div>
              </div>
              <div class="py-2 flex items-center">
                <svg t="1671088368237" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14509" width="20" height="20"><path d="M149.6 171.8h691.9c47.2 0 85.9 37.7 86.5 83.9L495.7 493 63.5 256c0.4-46.4 38.8-84.2 86.1-84.2z m-86.1 175l-0.4 419.6c0 46.7 38.9 84.9 86.5 84.9h691.9c47.6 0 86.5-38.2 86.5-84.9V346.6L505.9 572.8c-6.5 3.5-14.3 3.5-20.7 0l-421.7-226z" fill="#7a7a7a" p-id="14510"></path></svg>
                <div>{{ list.to_email }}</div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div v-if="!boxid" class="panel">
        <div>Shipping To</div>
        <div class="mt-2 p-2 border dark:border-darkLine rounded text-sm">
          <div class="flex flex-col sm:flex-row">
            <div class="w-28 font-semibold">Company Name</div>
            <div>{{ list.to.company }}</div>
          </div>
          <div class="flex flex-col sm:flex-row">
            <div class="w-28 font-semibold">Recipien Name</div>
            <div class="flex flex-wrap">
              <div class="mr-2">{{ list.to.user }}</div>
              <div v-if="list.to.tel">PH:{{ list.to.tel }}</div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row">
            <div class="w-28 font-semibold">Address</div>
            <div>{{ list.to.country }},{{ list.to.area }},{{ list.to.city }},{{ list.to.give_address }},{{ list.to.give_address2 }}</div>
          </div>
        </div>
      </div>
      <div class="hidden md:block mt-4 rounded-md shadow-default text-sm overflow-hidden bg-white dark:bg-darkMenu">
        <div class="p-3 grid grid-cols-6 bg-gray-200">
          <div class="col-span-1">Booking No.</div>
          <div class="col-span-1">Inbound Number</div>
          <div class="col-span-1">Inbound time</div>
          <div class="col-span-1">Weight</div>
          <div class="col-span-1">Volume</div>
          <div class="col-span-1">Qty</div>
          <!-- <div class="col-span-1">Estimated Date</div> -->
        </div>
        <div class="p-3 grid grid-cols-6">
          <div class="col-span-1">{{ list.enquiry_no }}</div>
          <div class="col-span-1">{{ list.warehousing_no }}</div>
          <div class="col-span-1">{{ list.put_time }}</div>
          <div class="col-span-1">{{ list.weight }}</div>
          <div class="col-span-1">{{ list.volume }}</div>
          <div class="col-span-1">{{ list.num }}</div>
          <!-- <div class="col-span-1">{{ list.estimate_put_time }}</div> -->
        </div>
        <!-- <div class="mt-5 mx-3 pr-20 pb-2 border-b border-gray-300 flex justify-end text-base">
          <div class="mr-4">总费用</div>
          <div>+$440.00</div>
        </div> -->
        <div class="mt-5 p-1 grid grid-cols-6 border-b dark:border-darkLine">
          <div class="col-span-4"></div>
          <div class="col-span-1">Product Price</div>
          <div class="col-span-1">${{ list.price.freight }}</div>
        </div>
        <div class="p-1 grid grid-cols-6">
          <div class="col-span-4"></div>
          <div class="col-span-1">Preferential</div>
          <div class="col-span-1">-${{ list.price.super_freight }}</div>
        </div>
        <div class="p-1 grid grid-cols-6">
          <div class="col-span-4"></div>
          <div class="col-span-1">Storage Expense</div>
          <div class="col-span-1">-${{ list.price.preferential }}</div>
        </div>
        <div class="p-1 grid grid-cols-6">
          <div class="col-span-4"></div>
          <div @click="showCoupon = !showCoupon" class="col-span-1 flex items-center cursor-pointer">
            <div>Coupon</div>
            <svg t="1691378384071" class="icon ml-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2286" width="22" height="22"><path d="M472.064 751.552 72.832 352.32c-22.08-22.08-22.08-57.792 0-79.872 22.016-22.016 57.792-22.08 79.872 0L512 631.744l359.296-359.296c22.016-22.016 57.792-22.08 79.872 0 22.08 22.08 22.016 57.792 0 79.872l-399.232 399.232C529.856 773.568 494.144 773.568 472.064 751.552z" fill="#7a7a7a" p-id="2287"></path></svg>
          </div>
          <div class="col-span-1">-${{ couponS.type_value }}</div>
        </div>

        <div v-show="showCoupon">
          <div class="mt-5 p-2 grid grid-cols-12 gap-4 bg-white dark:bg-darkMain rounded">
            <div v-for="(item,index) in couponsList" :key="index" @click="selectCoupon(item)"
              :class="[item.id == couponS.id? 'border-oranges' : 'border-transparent']"
              class="col-span-12 md:col-span-4 2xl:col-span-3 shadow-default bg-white dark:bg-darkMenu cursor-pointer border hover:border-oranges">
              <div class="pt-3 px-5 pb-5 text-sm relative">
                <div class="text-xl font-semibold">${{ item.type_value }} OFF</div>
                <div>For orders over ${{ item.min_price }}</div>
                <!-- <div class="flex items-center">
                  <div>Code: {{ item.code }}</div>
                  <img src="../../assets/copy.svg" class="ml-1 w-4 h-4 cursor-pointer" @click="copyCode(item.code)" alt="">
                </div> -->
                <div class="border-r border-gray-300 dark:border-gray-900 bg-white dark:bg-darkMain absolute rounded-full"
                  style="left: -9px;bottom: -9px;width: 17px;height: 17px;">
                </div>
                <div class="border-l border-gray-300 dark:border-gray-900 bg-white dark:bg-darkMain absolute rounded-full"
                  style="right: -9px;bottom: -9px;width: 17px;height: 17px;">
                </div>
              </div>
              <div class=" pt-2.5 px-5 pb-2 text-xs border-t border-dashed border-gray-300 dark:border-darkLine">
                <div>{{ item.end_time }}</div>
                <!-- <div class="flex">
                  <div class="flex-shrink-0 mr-1">Applies to</div>
                  <div v-if="item.product_type.length<6" class="flex flex-wrap">
                    <div class="mr-2" v-for="(i,n) in item.product_type" :key="n">
                      {{applies[i]}}
                    </div>
                  </div>
                  <div v-if="item.product_type.length==6">{{applies[0]}}</div>
                </div> -->
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <svg t="1691378510320" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4406" width="22" height="22"><path d="M512 64C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64z m64 704c0 35.2-28.8 64-64 64s-64-28.8-64-64V480c0-35.2 28.8-64 64-64s64 28.8 64 64v288z m-64-416c-44.183 0-80-35.817-80-80s35.817-80 80-80 80 35.817 80 80-35.817 80-80 80z" p-id="4407" fill="#8a8a8a"></path></svg>
            <div>You can only use one coupon per order</div>
          </div>
        </div>
        <div class="p-1 grid grid-cols-6 border-t dark:border-darkLine">
          <div class="col-span-4"></div>
          <div class="col-span-1">Amount payable</div>
          <div class="col-span-1 text-red-500 font-semibold text-base">${{ total }}</div>
        </div>
        <!-- <div class="my-5 mx-3 pr-20 flex justify-end text-base">
          <div class="mr-4">Total:</div>
          <div>US${{ list.sum_price }}</div>
        </div> -->
      </div>
      <div class="block md:hidden mt-4 py-4 px-6 rounded-md shadow-default text-sm overflow-hidden bg-white dark:bg-darkMenu">
        <div class="flex justify-between">
          <div>Booking No.</div>
          <div>{{ list.enquiry_no }}</div>
        </div>
        <div class="flex justify-between">
          <div>Inbound Number</div>
          <div>{{ list.warehousing_no }}</div>
        </div>
        <div class="flex justify-between">
          <div>Inbound time</div>
          <div>{{ list.put_time }}</div>
        </div>
        <div class="flex justify-between">
          <div>Weight</div>
          <div>{{ list.weight }}</div>
        </div>
        <div class="flex justify-between">
          <div>Volume</div>
          <div>{{ list.volume }}</div>
        </div>
        <div class="flex justify-between">
          <div>Qty</div>
          <div>{{ list.num }}</div>
        </div>
        <!-- <div class="flex justify-between">
          <div>Estimated Date</div>
          <div>{{ list.estimate_put_time }}</div>
        </div> -->
        <div class="mt-3 mb-1 pb-1 flex justify-between border-b dark:border-darkLine">
          <div>Product Price</div>
          <div>${{ list.price.freight }}</div>
        </div>
        <div class="flex justify-between">
          <div>Preferential</div>
          <div>-${{ list.price.super_freight }}</div>
        </div>
        <div class="flex justify-between">
          <div>Storage Expense</div>
          <div>-${{ list.price.preferential }}</div>
        </div>
        <div class="flex justify-between">
          <div @click="showCoupon = !showCoupon" class="flex items-center cursor-pointer">
            <div>Coupon</div>
            <svg t="1691378384071" class="icon ml-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2286" width="22" height="22"><path d="M472.064 751.552 72.832 352.32c-22.08-22.08-22.08-57.792 0-79.872 22.016-22.016 57.792-22.08 79.872 0L512 631.744l359.296-359.296c22.016-22.016 57.792-22.08 79.872 0 22.08 22.08 22.016 57.792 0 79.872l-399.232 399.232C529.856 773.568 494.144 773.568 472.064 751.552z" fill="#7a7a7a" p-id="2287"></path></svg>
          </div>
          <div>-${{ couponS.type_value }}</div>
        </div>
        <div v-show="showCoupon">
          <div class="mt-5 p-2 grid grid-cols-12 gap-4 bg-white dark:bg-darkMain rounded">
            <div v-for="(item,index) in couponsList" :key="index" @click="selectCoupon(item)"
              :class="[item.id == couponS.id? 'border-oranges' : 'border-transparent']"
              class="col-span-12 md:col-span-4 2xl:col-span-3 shadow-default bg-white dark:bg-darkMenu cursor-pointer border hover:border-oranges">
              <div class="pt-3 px-5 pb-5 text-sm relative">
                <div class="text-xl font-semibold">${{ item.type_value }} OFF</div>
                <div>For orders over ${{ item.min_price }}</div>
                <!-- <div class="flex items-center">
                  <div>Code: {{ item.code }}</div>
                  <img src="../../assets/copy.svg" class="ml-1 w-4 h-4 cursor-pointer" @click="copyCode(item.code)" alt="">
                </div> -->
                <div class="border-r border-gray-300 dark:border-gray-900 bg-white dark:bg-darkMain absolute rounded-full"
                  style="left: -9px;bottom: -9px;width: 17px;height: 17px;">
                </div>
                <div class="border-l border-gray-300 dark:border-gray-900 bg-white dark:bg-darkMain absolute rounded-full"
                  style="right: -9px;bottom: -9px;width: 17px;height: 17px;">
                </div>
              </div>
              <div class=" pt-2.5 px-5 pb-2 text-xs border-t border-dashed border-gray-300 dark:border-darkLine">
                <div>{{ item.end_time }}</div>
                <!-- <div class="flex">
                  <div class="flex-shrink-0 mr-1">Applies to</div>
                  <div v-if="item.product_type.length<6" class="flex flex-wrap">
                    <div class="mr-2" v-for="(i,n) in item.product_type" :key="n">
                      {{applies[i]}}
                    </div>
                  </div>
                  <div v-if="item.product_type.length==6">{{applies[0]}}</div>
                </div> -->
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <svg t="1691378510320" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4406" width="22" height="22"><path d="M512 64C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64z m64 704c0 35.2-28.8 64-64 64s-64-28.8-64-64V480c0-35.2 28.8-64 64-64s64 28.8 64 64v288z m-64-416c-44.183 0-80-35.817-80-80s35.817-80 80-80 80 35.817 80 80-35.817 80-80 80z" p-id="4407" fill="#8a8a8a"></path></svg>
            <div>You can only use one coupon per order</div>
          </div>
        </div>

        <div class="mt-1 pt-1 flex justify-between border-t dark:border-darkLine">
          <div>Amount payable</div>
          <div class=" text-red-500 font-semibold text-base">${{ total }}</div>
        </div>
        <!-- <div class="font-semibold text-base flex justify-between">
          <div>Total</div>
          <div>US${{ list.sum_price }}</div>
        </div> -->
      </div>
      <div class="mt-4 rounded-md shadow-default text-sm overflow-hidden bg-white dark:bg-darkMenu">
        <div class="p-3 bg-gray-200 text-base font-semibold">
          Choose a payment method
        </div>
        <div class="py-3">
          <div class="px-6">
            <div class="mb-5">
              <label class="flex items-start cursor-pointer">
                <input class="mt-2.5" type="radio" v-model="payment_method" name="paymentMethod" value="2">
                <div class="ml-4 w-8">
                  <img src="../../../assets/creditCard.svg" class="w-8" alt="">
                </div>
                <div class="ml-3">
                  <div>Account Balance</div>
                  <div class="text-sm text-gray-400">0% handling charge.</div>
                </div>
              </label>
            </div>
            <div class="mb-5">
              <label class="flex items-start cursor-pointer">
                <input class="mt-2.5" type="radio" v-model="payment_method" name="paymentMethod" value="1">
                <div class="ml-4 w-8">
                  <img src="../../../assets/creditCard.svg" class="w-8" alt="">
                </div>
                <div class="ml-3">
                  <div>Wire Transfer</div>
                  <div class="text-sm text-gray-400">0% handling charge.</div>
                </div>
              </label>
            </div>
          </div>
          <div class="mx-4 py-3 px-2 border-t border-gray-300 dark:border-darkLine">
            <div class="text-base">Co-logistics Bank information</div>
            <div class="mt-3 grid grid-cols-2 gap-2">
              <div class="flex flex-col sm:flex-row col-span-2 lg:col-span-1">
                <div class="font-semibold w-56 flex-shrink-0">Beneficiary Name:</div>
                <div>Cooperate Logistics Co., Ltd</div>
              </div>
              <div class="flex flex-col sm:flex-row col-span-2 lg:col-span-1">
                <div class="font-semibold w-56 flex-shrink-0">Beneficiary Address:</div>
                <div>B701, Bantian International Centre, Huanchengnan road, Longang district, Shenzhen</div>
              </div>
              <div class="flex flex-col sm:flex-row col-span-2 lg:col-span-1">
                <div class="font-semibold w-56 flex-shrink-0">Beneficiary Account No.:</div>
                <div>1505 7566 5400 69</div>
              </div>
              <div class="flex flex-col sm:flex-row col-span-2 lg:col-span-1">
                <div class="font-semibold w-56 flex-shrink-0">Beneficiary Bank Name:</div>
                <div>Ping An Bank</div>
              </div>
              <div class="flex flex-col sm:flex-row col-span-2 lg:col-span-1">
                <div class="font-semibold w-56 flex-shrink-0">Beneficiary Bank Address:</div>
                <div>Ping An Bank Building NO. 1099 Shennan Road C. Shenzhen, P.R.China</div>
              </div>
              <div class="flex flex-col sm:flex-row col-span-2 lg:col-span-1">
                <div class="font-semibold w-56 flex-shrink-0">Beneficiary Bank SWIFT CODE:</div>
                <div>SZDBCNBS</div>
              </div>
              <div v-show="payment_method != 2" class="col-span-1 mt-6">
                <div>Submit Transfer Slip</div>
                <input type="file"
                  style="display: none;"
                  accept="application/pdf,image/jpeg,image/png,image/jpg"
                  ref="iptFileRef"
                  @change="uploadFiles" />
                <div v-show="!files.name">
                  <div @click="chooseFile"
                    class="w-28 h-28 bg-gray-200 hover:bg-gray-300 rounded-md border border-dashed border-gray-400 flex flex-col justify-center items-center cursor-pointer">
                    <svg t="1672105928501" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2693" width="28" height="28"><path d="M524.8 64c4.693333 0 8.533333 3.84 8.533333 8.533333V490.666667h418.133334c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H533.333333v418.133333a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333V554.666667H51.2a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H469.333333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h46.933333z" fill="#7a7a7a" p-id="2694"></path></svg>
                    <div class="mt-2">Upload</div>
                  </div>
                  <div>Acceptable file types:jpg,jpeg,png,pdf</div>
                </div>
                <div v-show="files.name" class="flex items-center">
                  <svg t="1670585288869" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8034" width="16" height="16"><path d="M886.7 247.6L713.4 73.4c-6-6-14.2-9.4-22.7-9.4H192c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h640c35.3 0 64-28.7 64-64V270.2c0-8.5-3.3-16.6-9.3-22.6zM832 864c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h384v160c0 35.3 28.7 64 64 64h160v512zM704 288c-17.7 0-32-14.3-32-32V128l160 160H704z" p-id="8035" fill="#7a7a7a"></path><path d="M671 672H287c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32zM287 480c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H287zM287 352h192c17.7 0 32-14.3 32-32s-14.3-32-32-32H287c-17.7 0-32 14.3-32 32s14.3 32 32 32z" p-id="8036" fill="#7a7a7a"></path></svg>
                  <div style="margin: 0 20px 0 5px;font-size: 16px;">{{ files.name }}</div>
                  <svg @click="clearFile" style="cursor: pointer;" t="1670585138725" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4532" width="18" height="18"><path d="M806.4 263.2l-45.6-45.6L512 467.2 263.2 217.6l-45.6 45.6L467.2 512 217.6 760.8l45.6 45.6L512 557.6l248.8 248.8 45.6-45.6L557.6 512z" p-id="4533" fill="#7a7a7a"></path></svg>
                </div>
              </div>
            </div>
            <div class="mt-8 flex justify-center">
              <button class="btn" @click="submitPayment">Payment Now</button>
            </div>
            <div v-show="noBalance && payment_method == 2" class="mt-3 text-base text-center text-red-500">Insufficient account balance</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!list.status" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../../assets/noPayment.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
        <div class="mt-5 text-base text-center font-semibold">No payment at this time</div>
      </div>
    </div>

    <div v-if="list.status == 5">
      <div class="panel">
        <div class="flex py-5 flex-col items-center">
          <div>
            <svg t="1671161696080" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3539" width="120" height="120"><path d="M512 950.852267c242.346667 0 438.852267-196.471467 438.852267-438.852267 0-242.346667-196.471467-438.852267-438.852267-438.852267C269.653333 73.147733 73.147733 269.6192 73.147733 512c0 242.346667 196.471467 438.852267 438.852267 438.852267zM512 1024C229.239467 1024 0 794.760533 0 512 0 229.239467 229.239467 0 512 0c282.760533 0 512 229.239467 512 512 0 282.760533-229.239467 512-512 512zM475.4432 219.4432c20.1728 0 36.5568 16.384 36.5568 36.5568V512h256a36.5568 36.5568 0 1 1 0 73.147733h-329.147733V256c0-20.206933 16.384-36.5568 36.590933-36.5568z" fill="#393939" p-id="3540"></path></svg>
          </div>
          <div class="mt-3 text-lg font-semibold">Awaiting payment review</div>
        </div>
      </div>
    </div>

    <div v-if="list.status == 3">
      <div class="panel">
        <div class="py-5 flex flex-col items-center">
          <div>
            <svg t="1671098625559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15527" width="120" height="120"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM844.8 364.8l-428.8 428.8L179.2 556.8c-25.6-25.6-25.6-64 0-89.6s64-25.6 89.6 0l147.2 147.2 339.2-339.2c25.6-25.6 64-25.6 89.6 0S870.4 339.2 844.8 364.8z" fill="#f39333" p-id="15528"></path></svg>
          </div>
          <div class="mt-3 text-lg font-semibold">Payment successful</div>
          <div v-show="list.complete.track_no" class="mt-1">Tracking NO.: {{ list.complete.track_no }}</div>
        </div>
        <div class="pt-7 m-5 border-t border-gray-300 flex">
          <div class="mx-auto">
            <!-- <div class="mt-1 flex flex-col sm:flex-row">
              <div class="font-semibold w-40">Payee:</div>
              <div>{{ list.payee }}</div>
            </div> -->
            <div class="mt-1 flex flex-col sm:flex-row">
              <div class="font-semibold w-40">Payment Time:</div>
              <div>{{ list.complete.payment_time }}</div>
            </div>
            <div class="mt-1 flex flex-col sm:flex-row">
              <div class="font-semibold w-40">Payment Method:</div>
              <div>{{ paymentMethod[list.complete.payment_method - 1] }}</div>
            </div>
            <div class="mt-1 flex flex-col sm:flex-row">
              <div class="font-semibold w-40">Invoice No.:</div>
              <div>{{ list.complete.invoice_no }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!boxid" class="panel">
        <div class="mb-4 font-semibold">Shipping to</div>
        <div class="text-sm">
          <div class="flex mb-1">
            <div class="font-medium w-36">Company Name</div>
            <div>{{ list.to.company_name }}</div>
          </div>
          <div class="flex mb-1">
            <div class="font-medium w-36">Recipient Name</div>
            <div>{{ list.to.full_name }} PH:{{ list.to.tel }}</div>
          </div>
          <div class="flex mb-1">
            <div class="font-medium w-36">Address</div>
            <div>
              <div>{{ list.to.city }}, {{ list.to.area }}, {{ list.to.country }}</div>
              <div>{{ list.to.zipcode }}, {{ list.to.address_one }}, {{ list.to.address_two }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default">
        <div class="grid grid-cols-10 text-sm">
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Enquiry No.</div>
            <div class="p-2">{{ list.enquiry_no }}</div>
          </div>
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Warehousing No.</div>
            <div class="p-2">{{ list.warehousing_no }}</div>
          </div>
          <!-- <div class="col-span-6 sm:col-span-3 xl:col-span-1">
            <div class="routeTitle"></div>
            <div class="p-2"></div>
          </div> -->
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Total weight</div>
            <div class="p-2">{{ list.weight }}</div>
          </div>
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Total volume</div>
            <div class="p-2">{{ list.volume }}</div>
          </div>
          <div class="col-span-10 sm:col-span-5 xl:col-span-2">
            <div class="routeTitle">Total num</div>
            <div class="p-2">{{ list.num }}</div>
          </div>
        </div>
        <div>
          <div class="mt-5 p-1 grid grid-cols-6 border-b dark:border-darkLine">
            <div class="col-span-4"></div>
            <div class="col-span-1">Product Price</div>
            <div class="col-span-1">${{ list.price.freight }}</div>
          </div>
          <div class="p-1 grid grid-cols-6">
            <div class="col-span-4"></div>
            <div class="col-span-1">Preferential</div>
            <div class="col-span-1">-${{ list.price.super_freight }}</div>
          </div>
          <div class="p-1 grid grid-cols-6">
            <div class="col-span-4"></div>
            <div class="col-span-1">Storage Expense</div>
            <div class="col-span-1">-${{ list.price.preferential }}</div>
          </div>
          <div class="p-1 grid grid-cols-6">
            <div class="col-span-4"></div>
            <div class="col-span-1">Coupon</div>
            <div class="col-span-1">-${{ list.price.coupon_price }}</div>
          </div>
          <div class="mt-1 px-1 pt-1 pb-3 grid grid-cols-6 border-t dark:border-darkLine">
            <div class="col-span-4"></div>
            <div class="col-span-1">Amount payable</div>
            <div class="col-span-1 text-red-500 font-semibold text-base">${{ totalPay }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOrderInfo,
  ImgUpload,
  paymentReq,
  getCoupon
} from '@/api/order'
export default {
  name: 'ForwardPayment',
  props: {
    id: null,
    tab: '',
    status: null,
    boxid: null,
  },
  data() {
    return {
      list: {
        to: {
          company: '',
          
        },
        price: {
          freight: '',
        },
        complete: {
          track_no: '',
        }
      },
      payment_method: 1,
      files: {},
      paymentMethod: ['Wire Transfer','Account Balance'],
      noBalance: false,
      statusz: this.status,
      showCoupon: false,
      couponsList: [],
      couponS: {
        type_value: 0
      },
      total: null,
      totals: null,
      totalPay: null,
    }
  },
  watch:{
    tab: {
      handler (val, oldVal) {
        if(val==6){
          this.getData()
        }
      }
    },
    status: {
      handler (val, oldVal) {
        this.statusz = val
      }
    }
  },
  mounted(){
    
  },
  methods:{
    getData(){
      getOrderInfo({
        id: this.id,
        type: 7
      }).then((res)=>{
        this.list = res.data
        if(res.data.price){
          this.totals = (Number(this.list.price.freight) - Number(this.list.price.preferential) - Number(this.list.price.super_freight)).toFixed(2)
          this.total = this.totals
          getCoupon({super_freight_coupon:this.list.price.freight}).then((req)=>{
            this.couponsList = req.data.useCoupon
          })
          this.totalPay = (Number(this.list.price.freight) - Number(this.list.price.preferential) - Number(this.list.price.super_freight) - Number(this.list.price.coupon_price)).toFixed(2)
        }
        
      })
    },
    submitPayment(){
      if(this.payment_method == 1){
        let data = new FormData()
        data.append('file', this.files);
        ImgUpload(data).then((res)=>{
          // console.log(res)
          let file = res.data.file
          let name = res.data.name
          paymentReq({
            id: this.id,
            payment_method: this.payment_method,
            file: file,
            img_name: name,
            coupon_id: this.couponS.id,
            super_id: this.list.price.super_id,
            coupon_price: this.couponS.type_value,
            super_price: this.list.price.super_freight,
            warehouse_price: this.list.price.preferential,
            pay_price: this.total,
          }).then((reh)=>{
            this.files = {}
            this.remark = ''
            this.getData()
          })
        })
      } else {
        paymentReq({
            id: this.id,
            payment_method: this.payment_method,
            coupon_id: this.couponS.id,
            super_id: this.list.price.super_id,
            coupon_price: this.couponS.type_value,
            super_price: this.list.price.super_freight,
            warehouse_price: this.list.price.preferential,
            pay_price: this.total,
          }).then((reh)=>{
            if(reh.msg == '余额不足'){
              this.noBalance = true
            }
            this.getData()
          })
      }
    },
    chooseFile(){
      this.$refs.iptFileRef.click()
    },
    uploadFiles(e){
      this.files = e.target.files[0]
    },
    clearFile(){
      this.$refs.iptFileRef.value = ''
      this.files = {}
    },
    selectCoupon(item){
      this.couponS = item
      this.total = (Number(this.totals) - Number(item.type_value)).toFixed(2)
    }
  }
}
</script>

<style lang="postcss" scoped>
.panel{
  @apply p-6 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default;
}

.btn{
  @apply py-3 px-20 bg-black hover:bg-gray-500 text-white rounded text-base;
}

.routeTitle{
  @apply p-2 border-b border-gray-300 bg-gray-200;
}
</style>