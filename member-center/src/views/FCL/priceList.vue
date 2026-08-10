<template>
  <div class="w-full h-full relative">
    <div ref="mask" class="mask" @click="closeModal"></div>
    <div ref="nologinModal" class="py-10 modal w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div @click="closeModal" class="absolute right-1.5 top-1.5 flex hover:bg-gray-200 cursor-pointer">
        <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
      </div>
      <div class="flex flex-col justify-center items-center">
        <img src="../../assets/logintoview.png" class="w-28" alt="">
        <div class="py-5">Login to view data</div>
        <button @click="tologin" class="px-10 py-2 rounded bg-orange hover:bg-orange1 text-white">Sign in</button>
      </div>
    </div>
    <div ref="detailModal" class="modal w-900 opacity-20 bg-white dark:bg-darkMenu text-sm">
      <div class="sticky top-0">
        <div class="h-10 bg-white dark:bg-darkMenu">
          <div @click="closeModal" class="absolute right-1.5 top-1.5 flex hover:bg-gray-200 cursor-pointer">
            <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
          </div>
        </div>
        <div class="flex text-center border-t border-l border-gray-300 bg-gray-200">
          <div class="detailTable">Fee Breakdown</div>
          <div class="detailTable">20'GP</div>
          <div class="detailTable">40'GP</div>
          <div class="detailTable">40'HQ</div>
          <div class="detailTable">45'HQ</div>
          <div class="detailTable">Consignment</div>
        </div>
      </div>
      <div class="overflow-auto">
        <div class="">
          <div v-for="(i,n) in details" :key="'de'+n"
            class="flex text-center border-l border-gray-300 hover:bg-ptpdetail">
            <div class="detailTable">{{i.name_e}}</div>
            <div class="detailTable">{{i.gp20}}</div>
            <div class="detailTable">{{i.gp40}}</div>
            <div class="detailTable">{{i.hq40}}</div>
            <div class="detailTable">{{i.hq45}}</div>
            <div class="detailTable">{{i.ticket}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full overflow-auto">
      <div class="w-full">
        <img class="w-full min-h-110px object-cover" src="../../assets/ptptop.png" alt="">
      </div>
      <div class="w-full relative z-10 2xl:-mt-20 max-w-1600 m-auto p-3 sm:p-5 dark:text-gray-400">
        <!-- <swiper class="mb-6 hidden lg:block rounded-md" ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(i,n) in bannerList" :key="n">
            <img :src="i.img" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper> -->
      
        <div class="bg-white dark:bg-darkMenu shadow-default rounded-md py-5 px-0 lg:px-3">
          <div class="flex flex-wrap lg:flex-nowrap">
            <div class="w-full flex flex-wrap md:flex-nowrap">
              <div class="w-full md:w-1/2 px-3 flex items-center ">
                <div class="w-10 mr-3 sm:mr-5 flex-shrink-0 text-sm font-semibold text-center sm:text-right">POL</div>
                <div class="w-full relative">
                  <input ref="from" v-model="fromSearch" @input="getDeparture" @focus="getDeparture"
                    type="text" class="input" placeholder="Select port of departure">
                  <div v-show="fromShow" class="searchPort">
                    <div v-for="(f,nf) in fromList" :key="nf" @click="selectDeparture(f)"
                      class="px-3 py-2 hover:bg-gray-100 flex cursor-pointer">
                      <div class="w-1/2">{{ f.cityName }}</div>
                      <div class="w-1/2">{{ f.countryName }}</div>
                    </div>
                  </div>
                  <svg @click="delFrom" v-show="fromSearch" t="1673857296342" class="icon absolute right-1 top-3 w-5 cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2691" width="20" height="20"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM672 627.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8l-115.2 115.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8C339.2 384 339.2 364.8 352 352s32-12.8 44.8 0L512 467.2l115.2-115.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z" p-id="2692" fill="#7a7a7a"></path></svg>
                </div>
              </div>
              <div class="hidden md:flex items-center">
                <img src="../../assets/FClto.svg" class="w-28" alt="">
              </div>
              <div class="w-full md:w-1/2 px-3 pt-3 md:pt-0 flex items-center">
                <div class="w-10 mr-3 sm:mr-5 flex-shrink-0 text-sm font-semibold text-center sm:text-right">POD</div>
                <div class="w-full relative">
                  <input ref="to" v-model="toSearch" @input="getDestination" @focus="getDestination"
                    type="text" class="input" placeholder="Select destination country and destination port">
                  <div v-show="toShow" class="searchPort">
                    <div v-for="(t,nt) in toList" :key="nt" @click="selectDestination(t)"
                      class="px-3 py-2 hover:bg-gray-100 flex cursor-pointer">
                      <div class="w-1/2">{{ t.cityName }}</div>
                      <div class="w-1/2">{{ t.countryName }}</div>
                    </div>
                  </div>
                  <svg @click="delTo" v-show="toSearch" t="1673857296342" class="icon absolute right-1 top-3 w-5 cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2691" width="20" height="20"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM672 627.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8l-115.2 115.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8C339.2 384 339.2 364.8 352 352s32-12.8 44.8 0L512 467.2l115.2-115.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z" p-id="2692" fill="#7a7a7a"></path></svg>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-52 px-3 pt-3 lg:pt-0 flex-shrink-0 flex justify-center">
              <button @click="searchAllPrice"
                class="w-full max-w-xs h-42px text-sm p-1 bg-orange hover:bg-orange1 text-white rounded-md">Get Price</button>
            </div>
          </div>
          <div v-show="!searchShow && history.length>0" class="border-t mt-5 pt-5 mx-3">
            <div>History</div>
            <div class="flex flex-wrap text-sm">
              <div v-for="(i,n) in history" :index="n" class="mr-4 mt-3 relative cursor-pointer">
                <div @click="historySearch(i)"
                  class="py-1 px-4 bg-gray-300 rounded hover:shadow-xxx">
                  {{i.start_en}}-{{i.end_en}}
                </div>
                <svg t="1672301620631" @click="delAHistory(i.id)" class="icon absolute -top-2 -right-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6172" width="20" height="20"><path d="M512 512m-426.666667 0a426.666667 426.666667 0 1 0 853.333334 0 426.666667 426.666667 0 1 0-853.333334 0Z" fill="#7a7a7a" p-id="6173" data-spm-anchor-id="a313x.7781069.0.i11" class="selected"></path><path d="M330.965333 270.634667a42.666667 42.666667 0 0 0-60.330666 60.330666L451.669333 512l-181.034666 181.034667a42.666667 42.666667 0 1 0 60.330666 60.330666L512 572.330667l180.992 181.034666a42.666667 42.666667 0 0 0 60.373333-60.330666L572.330667 512l181.034666-181.034667a42.666667 42.666667 0 0 0-60.373333-60.330666L512 451.669333 330.965333 270.634667z" fill="#ffffff" p-id="6174" data-spm-anchor-id="a313x.7781069.0.i12" class="selected"></path></svg>
              </div>
            </div>
          </div>
        </div>
        
        <div v-show="resultShow && searchShow">
          <div v-show="token != ''"
            class="bg-white dark:bg-darkMenu shadow-default rounded-md mt-3 p-3">
            <!-- <div class="flex flex-wrap md:flex-nowrap pb-2 border-b border-gray-300 dark:border-darkLine">
              <div class="mr-5 w-full md:w-44 flex-shrink-0 text-15 font-semibold">Date of departure:</div>
              <div class="flex flex-wrap">
                <label v-for="(id,nd) in dateList" :key="nd"
                  class="mr-5 sm:mr-6 flex items-center cursor-pointer select-none">
                  <input @change="searchPrice" v-model="dateSelect" :value="nd + 1" class="mr-1.5" type="checkbox" name="date">
                  <div class="text-sm">{{ id }}</div>
                </label>
              </div>
            </div> -->
            <div class="flex flex-wrap md:flex-nowrap pb-2 border-b border-gray-300 dark:border-darkLine">
              <div class="mr-5 w-full md:w-20 flex-shrink-0 text-15 font-semibold">Carrier:</div>
              <div class="flex flex-wrap">
                <label v-for="(ic,nc) in carrierList" :key="nc"
                  class="mr-5 sm:mr-6 flex items-center cursor-pointer select-none">
                  <input @change="searchPrice" v-model="carrierSelect" :value="ic" class="mr-1.5" type="checkbox" name="carrier">
                  <div class="text-sm">{{ ic }}</div>
                </label>
              </div>
            </div>
            <div class="flex flex-wrap md:flex-nowrap pt-2">
              <div class="mr-5 w-full md:w-20 flex-shrink-0 text-15 font-semibold">Method:</div>
              <div class="flex flex-wrap">
                <label v-for="(it,nt) in transshipmentList" :key="nt"
                  class="mr-5 sm:mr-6 flex items-center cursor-pointer select-none">
                  <input @change="searchPrice" v-model="transshipmentSelect" :value="nt + 1" class="mr-1.5" type="checkbox" name="transshipment">
                  <div class="text-sm">{{ it }}</div>
                </label>
              </div>
            </div>
          </div>

          <div class="mb-32 hidden xl:block bg-white dark:bg-darkMenu shadow-default rounded-md mt-3 overflow-hidden">
            <div class="p-3 flex bg-lightMenuVisit text-sm">
              <div class="w-full flex items-center">
                <div class="w-9%">Carrier</div>
                <div class="w-15%">POL/POD</div>
                <div class="w-9%">Method</div>
                <div class="w-9%">Transit Time</div>
                <div class="w-2/5 flex pl-28">
                  <div @click="selectSort1" class="w-1/4 flex items-center select-none cursor-pointer">
                    <div>20'GP</div>
                    <svg v-show="sort1 == 0" t="1673317120396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12538" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6zM774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="12539" fill="#7a7a7a"></path></svg>
                    <svg v-show="sort1 == 1" t="1673317284906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13172" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z" p-id="13173" fill="#7a7a7a"></path></svg>
                    <svg v-show="sort1 == 2" t="1673317405240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13478" width="16" height="16"><path d="M774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="13479" fill="#7a7a7a"></path></svg>
                  </div>
                  <div @click="selectSort2" class="w-1/4 flex items-center select-none cursor-pointer">
                    <div>40'GP</div>
                    <svg v-show="sort2 == 0" t="1673317120396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12538" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6zM774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="12539" fill="#7a7a7a"></path></svg>
                    <svg v-show="sort2 == 1" t="1673317284906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13172" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z" p-id="13173" fill="#7a7a7a"></path></svg>
                    <svg v-show="sort2 == 2" t="1673317405240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13478" width="16" height="16"><path d="M774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="13479" fill="#7a7a7a"></path></svg>
                  </div>
                  <div @click="selectSort3" class="w-1/4 flex items-center select-none cursor-pointer">
                    <div>40'HQ</div>
                    <svg v-show="sort3 == 0" t="1673317120396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12538" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6zM774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="12539" fill="#7a7a7a"></path></svg>
                    <svg v-show="sort3 == 1" t="1673317284906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13172" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z" p-id="13173" fill="#7a7a7a"></path></svg>
                    <svg v-show="sort3 == 2" t="1673317405240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13478" width="16" height="16"><path d="M774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="13479" fill="#7a7a7a"></path></svg>
                  </div>
                  <div @click="selectSort4" class="w-1/4 flex items-center select-none cursor-pointer">
                    <div>45'HQ</div>
                    <svg v-show="sort4 == 0" t="1673317120396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12538" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6zM774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="12539" fill="#7a7a7a"></path></svg>
                    <svg v-show="sort4 == 1" t="1673317284906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13172" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z" p-id="13173" fill="#7a7a7a"></path></svg>
                    <svg v-show="sort4 == 2" t="1673317405240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13478" width="16" height="16"><path d="M774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="13479" fill="#7a7a7a"></path></svg>
                  </div>
                </div>
                <div class="w-9%">Expiration date</div>
                <!-- <div class="w-9%">Surcharge</div> -->
              </div>
              <div class="hidden 2xl:block w-40 flex-shrink-0"></div>
            </div>

            <div v-show="loadingShow">
              <div class="p-3 flex flex-wrap 2xl:flex-nowrap text-base border-t border-gray-200">
                <div class="w-full flex items-center">
                  <div class="w-10% flex items-center">
                    <div class="rounded-full w-16 h-16 bg-gray-200"></div>
                  </div>
                  <div class="w-15% flex">
                    <div class="w-4/5 h-5 rounded-md bg-gray-200"></div>
                  </div>
                  <div class="w-10% flex">
                    <div class="w-2/5 h-5 rounded-md bg-gray-200"></div>
                  </div>
                  <div class="w-15% flex">
                    <div class="w-4/5 h-5 rounded-md bg-gray-200"></div>
                  </div>
                  <div class="w-2/5 flex">
                    <div class="w-90% h-5 rounded-md bg-gray-200"></div>
                  </div>
                  <div class="w-10% flex">
                    <div class="w-4/5 h-5 rounded-md bg-gray-200"></div>
                  </div>
                </div>
              </div>
              <div class="p-3 flex flex-wrap 2xl:flex-nowrap text-base border-t border-gray-200">
                <div class="w-full flex items-center">
                  <div class="w-10% flex items-center">
                    <div class="rounded-full w-16 h-16 bg-gray-200"></div>
                  </div>
                  <div class="w-15% flex">
                    <div class="w-4/5 h-5 rounded-md bg-gray-200"></div>
                  </div>
                  <div class="w-10% flex">
                    <div class="w-2/5 h-5 rounded-md bg-gray-200"></div>
                  </div>
                  <div class="w-15% flex">
                    <div class="w-4/5 h-5 rounded-md bg-gray-200"></div>
                  </div>
                  <div class="w-2/5 flex">
                    <div class="w-90% h-5 rounded-md bg-gray-200"></div>
                  </div>
                  <div class="w-10% flex">
                    <div class="w-4/5 h-5 rounded-md bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>

            <div v-for="(i,n) in list" :key="n"
              class="p-3 flex flex-wrap 2xl:flex-nowrap text-base hover:bg-gray-200 border-t hover:bg-darkLine border-gray-200 dark:border-darkLine">
              <div class="w-full flex items-center">
                <div class="w-9% flex items-center">
                  <img :src="i.img" class="rounded-full w-16" alt="">
                  <!-- <div class="ml-1 text-13">UPS</div> -->
                </div>
                <div class="w-15% text-sm flex items-center flex-wrap">
                  <div>{{ i.start_port }}</div>
                  <svg t="1689315829015" class="mx-1 icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6742" width="28" height="28"><path d="M975.71463926 581.31313556c1.9524827 13.66737884-6.83368941 25.38227498-19.52482692 28.31099902-0.97624134 0-2.92872403 0.97624134-3.90496537 0.97624136H72.69139438c-13.66737884 0-24.40603363-10.73865482-24.40603364-24.40603365s10.73865482-24.40603363 24.40603364-24.40603366h828.82890261l-105.43406534-105.43406536c-9.76241345-9.76241345-9.76241345-24.40603363 0-34.1684471s25.38227498-9.76241345 34.1684471 0l138.62627112 138.62627112c5.85744807 3.9049654 7.80993077 12.69113749 6.83368939 20.50106827z" fill="#a9a9a9" p-id="6743"></path></svg> 
                  <div>{{ i.end_port }}</div>
                </div>
                <div class="w-9% text-sm flex">
                  <div class="py-0.5 px-4 font-medium rounded-md"
                    style="background-color: #d4edff;color: #0075ff;">{{ transshipmentList[ i.line - 1 ] }}</div>
                </div>
                <div class="w-9%">{{ i.voyage }}</div>
                <div class="w-2/5">
                  <div class="flex text-gray-500 text-xs line-through">
                    <div class="w-28 flex-shrink-0">current price</div>
                    <div class="w-full flex">
                      <div class="w-1/4">
                        <div v-if="i.gp20 > 0">${{ i.gp20 }}</div>
                        <div v-if="i.gp20 == 0">N/A</div>
                      </div>
                      <div class="w-1/4">
                        <div v-if="i.gp40 > 0">${{ i.gp40 }}</div>
                        <div v-if="i.gp40 == 0">N/A</div>
                      </div>
                      <div class="w-1/4">
                        <div v-if="i.hq40 > 0">${{ i.hq40 }}</div>
                        <div v-if="i.hq40 == 0">N/A</div>
                      </div>
                      <div class="w-1/4">
                        <div v-if="i.hq45 > 0">${{ i.hq45 }}</div>
                        <div v-if="i.hq45 == 0">N/A</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center text-orange">
                    <div class="w-28 text-xs flex-shrink-0">Discounted price</div>
                    <div class="w-full flex font-semibold">
                      <div class="w-1/4">
                        <div v-if="i.super_gp20 > 0">${{ i.super_gp20 }}</div>
                        <div v-if="i.super_gp20 == 0">N/A</div>
                      </div>
                      <div class="w-1/4">
                        <div v-if="i.super_gp40 > 0">${{ i.super_gp40 }}</div>
                        <div v-if="i.super_gp40 == 0">N/A</div>
                      </div>
                      <div class="w-1/4">
                        <div v-if="i.super_hq40 > 0">${{ i.super_hq40 }}</div>
                        <div v-if="i.super_hq40 == 0">N/A</div>
                      </div>
                      <div class="w-1/4">
                        <div v-if="i.super_hq45 > 0">${{ i.super_hq45 }}</div>
                        <div v-if="i.super_hq45 == 0">N/A</div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="mt-2 mr-8 py-1 rounded text-xs text-center text-gray-500 bg-lightMenuVisit">Expiration date: {{ i.expiration_date }}</div> -->
                </div>
                <div class="w-9% text-sm">{{ i.expiration_date }}</div>
                <!-- <div @click="openDetail" class="w-9% text-sm hover:underline cursor-pointer"
                  style="color: #0075ff;">View datails</div> -->
                <div @click="toportchat(i)" class="w-9% p-1 border border-orange flex justify-center items-center cursor-pointer rounded bg-white hover:bg-gray-100">
                  <img class="w-6" src="../../assets/chatnow.png" alt="">
                  <div class="text-oranges text-sm font-semibold">Chat now</div>
                </div>
              </div>
              <div class="mt-2 2xl:mt-0 w-full 2xl:w-40 flex-shrink-0 flex flex-row 2xl:flex-col items-center text-xs">
                <button @click="booking(i)"
                  class="w-32 py-1.5 text-white rounded-md bg-orange hover:bg-orange1">Booking</button>
                <!-- <button @click="openDetail"
                class="w-32 mt-0 2xl:mt-2 ml-3 2xl:ml-0 py-1.5 bg-white hover:bg-gray-300 border border-gray-400 rounded-md dark:bg-darkText dark:text-gray-500">View Details</button> -->
                <div @click="openDetail" class="mt-0 2xl:mt-2 ml-5 2xl:ml-0 text-xs text-blue-500 underline cursor-pointer">View Details</div>
              </div>
            </div>
            <img v-show="!loadingShow && token == ''" src="../../assets/ptpList.png" class="w-full" alt="">
          </div>

          <div v-show="token != ''" class="pb-28 block xl:hidden">
            <div class="max-w-xl w-full flex bg-white dark:bg-darkMenu shadow-default rounded-md mt-3 text-sm overflow-hidden">
              <div @click="selectSort1" class="sort border-r" :class="[sort1 != 0 ? 'sortSelect' : '']">
                <div>20'GP</div>
                <svg v-show="sort1 == 0" t="1673317120396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12538" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6zM774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="12539" fill="#7a7a7a"></path></svg>
                <svg v-show="sort1 == 1" t="1673317284906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13172" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z" p-id="13173" fill="#7a7a7a"></path></svg>
                <svg v-show="sort1 == 2" t="1673317405240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13478" width="16" height="16"><path d="M774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="13479" fill="#7a7a7a"></path></svg>
              </div>
              <div @click="selectSort2" class="sort border-r" :class="[sort2 != 0 ? 'sortSelect' : '']">
                <div>40'GP</div>
                <svg v-show="sort2 == 0" t="1673317120396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12538" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6zM774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="12539" fill="#7a7a7a"></path></svg>
                <svg v-show="sort2 == 1" t="1673317284906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13172" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z" p-id="13173" fill="#7a7a7a"></path></svg>
                <svg v-show="sort2 == 2" t="1673317405240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13478" width="16" height="16"><path d="M774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="13479" fill="#7a7a7a"></path></svg>
              </div>
              <div @click="selectSort3" class="sort border-r" :class="[sort3 != 0 ? 'sortSelect' : '']">
                <div>40'HQ</div>
                <svg v-show="sort3 == 0" t="1673317120396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12538" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6zM774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="12539" fill="#7a7a7a"></path></svg>
                <svg v-show="sort3 == 1" t="1673317284906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13172" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z" p-id="13173" fill="#7a7a7a"></path></svg>
                <svg v-show="sort3 == 2" t="1673317405240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13478" width="16" height="16"><path d="M774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="13479" fill="#7a7a7a"></path></svg>
              </div>
              <div @click="selectSort4" class="sort border-r" :class="[sort4 != 0 ? 'sortSelect' : '']">
                <div>45'HQ</div>
                <svg v-show="sort4 == 0" t="1673317120396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12538" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6zM774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="12539" fill="#7a7a7a"></path></svg>
                <svg v-show="sort4 == 1" t="1673317284906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13172" width="16" height="16"><path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z" p-id="13173" fill="#7a7a7a"></path></svg>
                <svg v-show="sort4 == 2" t="1673317405240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13478" width="16" height="16"><path d="M774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z" p-id="13479" fill="#7a7a7a"></path></svg>
              </div>
            </div>
            <div v-for="(im,nm) in list" :key="nm"
              class="p-2 bg-white dark:bg-darkMenu shadow-default rounded-md mt-3 text-sm">
              <div class="flex justify-center">
                <div class="w-full max-w-xl px-3 flex relative">
                  <div class="w-16">
                    <div>
                      <img :src="im.img" class="w-full rounded-full" alt="">
                    </div>
                    <!-- <div class="text-center">UPS</div> -->
                  </div>
                  <div class="ml-7 mt-2">
                    <div>{{ transshipmentList[ im.line - 1 ] }}</div>
                    <div class="mt-1">{{ im.voyage }}</div>
                  </div>
                  <div class="absolute w-24 top-1 right-0">
                    <button  @click="detail"
                      class="w-24 py-1.5 bg-white hover:bg-gray-300 border border-gray-400 rounded-md">View Details</button>
                    <button @click="booking(i)"
                      class="w-24 mt-1.5 py-1.5 text-white rounded-md bg-orange hover:bg-orange1">Booking</button>
                  </div>
                </div>
              </div>
              <div class="my-3.5 flex justify-center font-medium">
                <div>{{ im.start_port }}</div>
                <svg t="1673334111703" class="icon mx-6 flex-shrink-0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8871" width="22" height="22"><path d="M951.853585 6.460162L25.039798 541.152733c-36.192728 20.795822-31.593652 71.185698 4.399116 86.382644L241.996208 716.717459l574.484575-506.298276c10.99779-9.798031 26.594657 5.198955 17.196545 16.596665L351.974111 813.897933v160.967659c0 47.190519 56.98855 65.786782 84.982925 31.593652L563.931525 851.8903l249.149941 104.379028c28.394295 11.997589 60.787787-5.798835 65.986742-36.392688l143.971074-863.826441C1029.837916 15.658314 986.446634-13.53582 951.853585 6.460162z" fill="#7a7a7a" p-id="8872"></path></svg>
                <div>{{ im.end_port }}</div>
              </div>
              <div class="flex justify-center">
                <table class="table-auto text-center w-full max-w-xl">
                  <tr class="border-b border-gray-300 dark:border-darkLine">
                    <th>20'GP</th>
                    <th>40'GP</th>
                    <th>40'HQ</th>
                    <th>45'HQ</th>
                  </tr>
                  <tr class="line-through text-gray-500 text-xs">
                    <td>
                      <div v-if="im.gp20 > 0">${{ im.gp20 }}</div>
                      <div v-if="im.gp20 == 0">N/A</div>
                    </td>
                    <td>
                      <div v-if="im.gp40 > 0">${{ im.gp40 }}</div>
                      <div v-if="im.gp40 == 0">N/A</div>
                    </td>
                    <td>
                      <div v-if="im.hq40 > 0">${{ im.hq40 }}</div>
                      <div v-if="im.hq40 == 0">N/A</div>
                    </td>
                    <td>
                      <div v-if="im.hq45 > 0">${{ im.hq45 }}</div>
                      <div v-if="im.hq45 == 0">N/A</div>
                    </td>
                  </tr>
                  <tr class="font-semibold text-orange">
                    <td>
                      <div v-if="im.super_gp20 > 0">${{ im.super_gp20 }}</div>
                      <div v-if="im.super_gp20 == 0">N/A</div>
                    </td>
                    <td>
                      <div v-if="im.super_gp40 > 0">${{ im.super_gp40 }}</div>
                      <div v-if="im.super_gp40 == 0">N/A</div>
                    </td>
                    <td>
                      <div v-if="im.super_hq40 > 0">${{ im.super_hq40 }}</div>
                      <div v-if="im.super_hq40 == 0">N/A</div>
                    </td>
                    <td>
                      <div v-if="im.super_hq45 > 0">${{ im.super_hq45 }}</div>
                      <div v-if="im.super_hq45 == 0">N/A</div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div v-show="!resultShow && searchShow"
          class="mt-4 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
          <img src="../../assets/noShipCost.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
          <div class="mt-5 text-base text-center font-semibold">No results</div>
        </div>

        <div v-show="!searchShow" class="pb-32">
          <div>
            <div class="mt-6 md:mt-14 text-base md:text-xl font-semibold">Recommended Price</div>
            <div class="mt-4 flex overflow-x-auto">
              <div @click="onsale(i.id)" v-for="(i,n) in saleType" :key="n"
                :class="[saleTypeChoose == i.id ? 'text-chatMe border-chatMe' : 'border-transparent hover:border-gray-400']"
                class="flex-shrink-0 mr-6 md:mr-12 my-2 py-0.5 px-2 cursor-pointer border rounded-md hover:text-chatMe">
                {{i.name_en}}
              </div>
            </div>
            <div class="mt-3 grid grid-cols-6 gap-7">
              <div v-for="(i,n) in saleList" :key="n" @click="searchSale(i)"
                class="p-6 col-span-6 md:col-span-3 xl:col-span-2 rounded-md shadow-sm bg-white dark:bg-darkMenu hover:shadow-xxx cursor-pointer">
                <div class="flex flex-col sm:flex-row">
                  <div class="flex flex-col items-center flex-shrink-0 w-16">
                    <img :src="i.img" class="w-12 h-12 rounded-full mb-1" alt="">
                    <div class="text-xs">{{i.company}}</div>
                  </div>
                  <div class="mt-3 sm:mt-0 w-full flex justify-around items-center">
                    <div class="font-semibold">{{i.start_port}}</div>
                    <div class="text-xs relative ml-2.5">
                      <img src="../../assets/arrive.svg" class="w-16" alt="">
                      <div class="absolute -top-3.5 left-2.5">{{i.air_day}} days</div>
                    </div>
                    <div class="font-semibold">{{i.end_port}}</div>
                  </div>
                </div>
                <div class="mt-6 flex justify-between text-xs text-center">
                  <div>
                    <div class="mb-1">20'GP</div>
                    <div class="text-gray-500 line-through">
                      <div v-if="i.gp20 != '0.00'">${{i.gp20}}</div>
                      <div v-if="i.gp20 == '0.00'">N/A</div>
                    </div>
                    <div class="text-sm text-chatMe">
                      <div v-if="i.super_gp20 != '0.00'">${{i.super_gp20}}</div>
                      <div v-if="i.super_gp20 == '0.00'">N/A</div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1">40'GP</div>
                    <div class="text-gray-500 line-through">
                      <div v-if="i.gp40 != '0.00'">${{i.gp40}}</div>
                      <div v-if="i.gp40 == '0.00'">N/A</div>
                    </div>
                    <div class="text-sm text-chatMe">
                      <div v-if="i.super_gp40 != '0.00'">${{i.super_gp40}}</div>
                      <div v-if="i.super_gp40 == '0.00'">N/A</div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1">40'HQ</div>
                    <div class="text-gray-500 line-through">
                      <div v-if="i.hq40 != '0.00'">${{i.hq40}}</div>
                      <div v-if="i.hq40 == '0.00'">N/A</div>
                    </div>
                    <div class="text-sm text-chatMe">
                      <div v-if="i.super_hq40 != '0.00'">${{i.super_hq40}}</div>
                      <div v-if="i.super_hq40 == '0.00'">N/A</div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1">45'HQ</div>
                    <div class="text-gray-500 line-through">
                      <div v-if="i.hq45 != '0.00'">${{i.hq45}}</div>
                      <div v-if="i.hq45 == '0.00'">N/A</div>
                    </div>
                    <div class="text-sm text-chatMe">
                      <div v-if="i.super_hq45 != '0.00'">${{i.super_hq45}}</div>
                      <div v-if="i.super_hq45 == '0.00'">N/A</div>
                    </div>
                  </div>
                </div>
                <div class="mt-5 flex justify-between items-center text-xs">
                  <div>
                    <span>Expiration date: </span>
                    <span class="text-gray-400">{{i.expiration_date}}</span>
                  </div>
                  <div class="px-2 py-0.5 border border-gray-300 text-gray-400 rounded-md">{{transshipmentList[i.type-1]}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <div class="mb-2 font-medium text-lg">Door to Door Price</div>
            <div class="grid grid-cols-12 gap-3.5">
              <div v-for="(i,n) in recommendDTD" :index="n"
                class="p-3 col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-md shadow-default bg-white dark:bg-darkMenu relative">
                <div v-show="i.delivery_type == 1" class="absolute -right-1.5 top-0 flex flex-col items-end">
                  <div class="bg-recommend text-white py-1 px-2 text-xs">Compensate for delay</div>
                  <div class="triangle"></div>
                </div>
                <div class="relative">
                  <div class="mt-1 flex items-center">
                    <img class="w-8 h-8 mr-2" :src="i.product_img" alt="">
                    <div class="font-medium">{{i.product_name_e}}</div>
                  </div>
                  <div class="mt-1.5 flex items-center">
                    <img class="w-3 h-3 mr-1" src="../../assets/dtdtime.svg" alt="">
                    <div class="text-xs">{{i.aging_start}}-{{i.aging_end}} Business Days</div>
                  </div>
                  <div class="flex items-end">
                    <div class="flex items-center w-full">
                      <img class="w-3 h-3 flex-shrink-0 mr-1" src="../../assets/dtdprice.svg" alt="">
                      <div class="w-full flex flex-wrap items-end">
                        <div>
                          <span class="text-recommend font-semibold">USD {{i.super_freight}}</span>
                          <span class="px-1 text-xs">({{i.weight}}kg)</span>
                        </div>
                        <span class="text-xs text-gray-400 line-through">USD {{i.freight}}</span>
                      </div>
                    </div>
                    <div @click="toBooking(i)"
                      class="w-28 flex-shrink-0 h-9 px-1 flex justify-center items-center cursor-pointer rounded hover:bg-gray-100 bg-white dark:bg-gray-500 border border-orange text-sm">
                      <img class="w-6" src="../../assets/chatnow.png" alt="">
                      <div class="text-oranges font-semibold">Chat now</div>
                    </div>
                    <!-- <button @click="toBooking(i)"
                    class="flex-shrink-0 w-20 p-1 text-13 bg-white hover:bg-gray-200 border border-orange text-orange rounded-md">Booking</button> -->
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
  import {
    getPort,
    getPrice,
    getSpecial,
    getHistory,
    delHistory
  } from '@/api/fcl'
  export default {
    components: {

    },
    props: ['search_port'],
    watch: {
      search_port: function (val) {
        let form = JSON.parse(val)
        this.searchAllPrice(form,3)
      },
    },
    data() {
      return {
        fromSearch: '',
        fromPort: '',
        fromList: [],
        fromShow: false,
        toSearch: '',
        toPort: '',
        toList: [],
        toShow: false,
        dateList: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        dateSelect: [],
        carrierList: ['YML','EMC','ONE','HPL','COSCO','HMM','CMA'],
        carrierSelect: [],
        transshipmentList: ['Transit','Direct'],
        transshipmentSelect: [],
        list: [],
        sort1: 0,
        sort2: 0,
        sort3: 0,
        sort4: 0,
        searchShow: false,
        resultShow: false,
        saleList: [],
        saleLists: [],
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
            // clickable: true,
          },
          autoplay:{
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          loop: true,
          loopAdditionalSlides: 2,
          speed: 1500,
          // effect: 'fade',
        },
        bannerList: [
          {img:require("../../assets/FCLBanner1.webp")},
          {img:require("../../assets/FCLBanner2.webp")},
          {img:require("../../assets/FCLBanner3.webp")},
        ],
        saleType: ['America East','America West','Europe','Australia','Middle East','Africa'],
        saleTypeChoose: '0',
        loadingShow: false,
        recommendDTD: [],
        history: [],
        token: '',
        details: [],
        manageId: '',
      }
    },
    computed: {
      // swiper() {
      //   return this.$refs.mySwiper.swiper
      // }
    },
    created() {
      this.$emit('menu', 'FCLprice')
      // if(this.$store.state.user.token){
      this.manageId = JSON.parse(localStorage.getItem('userInfo')).manage.id
      this.getList()
      // }
      this.nologin()
      getHistory().then(res=>{
        this.history = res.data
      })
      if(this.$store.state.user.token){
        this.token = this.$store.state.user.token
      }
    },
    mounted() {
      document.addEventListener(
        "click",
        this.even,
        true
      );
      // console.log('Current Swiper instance object', this.swiper)
      // this.swiper.slideTo(0, 4000, false)
      if(this.$route.params.start_port){
        let item = this.$route.params
        getPort({
          name: item.start_port,
          is_start: 1,
          is_end: 0
        }).then((res)=>{
          this.fromSearch = res.data[0].cityName
          this.fromPort = res.data[0].port
          getPort({
            name: item.end_port,
            is_start: 0,
            is_end: 1
          }).then((req)=>{
            this.toSearch = req.data[0].cityName
            this.toPort = req.data[0].port
            this.searchAllPrice()
          })
        })
      }
      if(this.$route.params.searchForm){
        let form = JSON.parse(this.$route.params.searchForm)
        this.searchAllPrice(form,3)
      }
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
    },
    methods:{
      even(e){
        if (!this.$refs.from.contains(e.target)) {
          this.fromShow = false
        }
        if (!this.$refs.to.contains(e.target)) {
          this.toShow = false
        }
      },
      getList(){
        getSpecial().then((res)=>{
          this.saleType = res.data.lineData
          this.saleList = res.data.specialData
          this.saleTypeChoose = this.saleList[0].sea_line
          this.recommendDTD = res.data.doorData
          // let list = []
          // for(let n=0;n<this.saleLists.length;n++){
          //   if(this.saleTypeChoose == this.saleLists[n].sea_line_id){
          //     list.push(this.saleLists[n])
          //   }
          // }
          // this.saleList = list
        })
      },
      onsale(e){
        if(this.$store.state.user.token){
          this.saleTypeChoose = e
          // let list = []
          // for(let n=0;n<this.saleLists.length;n++){
          //   if(this.saleTypeChoose == this.saleLists[n].sea_line_id){
          //     list.push(this.saleLists[n])
          //   }
          // }
          // this.saleList = list
          getSpecial({sea_line:e}).then((res)=>{
            this.saleType = res.data.lineData
            this.saleList = res.data.specialData
          })
        }else{
          localStorage.setItem("loginto", '2')
          this.$refs.mask.style = 'display:block;'
          this.$refs.nologinModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.nologinModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
      },
      getDeparture(){
        getPort({
          name: this.fromSearch,
          is_start: 1,
          is_end: 0
        }).then((res)=>{
          this.fromList = res.data
          this.fromShow = true
        })
      },
      selectDeparture(a){
        this.fromShow = false
        this.fromSearch = a.cityName
        this.fromPort = a.port
      },
      delFrom(){
        this.fromSearch = ''
        this.fromPort = ''
        this.$refs.from.focus()
      },
      getDestination(){
        getPort({
          name: this.toSearch,
          is_start: 0,
          is_end: 1
        }).then((res)=>{
          this.toList = res.data
          this.toShow = true
        })
      },
      selectDestination(a){
        this.toShow = false
        this.toSearch = a.cityName
        this.toPort = a.port
      },
      delTo(){
        this.toSearch = ''
        this.toPort = ''
        this.$refs.to.focus()
      },
      searchAllPrice(item,n){
        // if(this.$store.state.user.token){
          if(n==3){
            this.fromPort = item.start_port
            this.toPort = item.end_port
          }
          this.list = []
          this.loadingShow = true
          getPrice({
            start_port: this.fromPort,
            end_port: this.toPort,
            start_en: this.fromSearch,
            end_en: this.toSearch,
            manage_id: this.manageId,
          }).then((res)=>{
            this.carrierList = res.data.shipmaster
            this.details = res.data.surcharge
            this.dateSelect = []
            this.carrierSelect = []
            this.transshipmentSelect = []
            this.sort1 = 0
            this.sort2 = 0
            this.sort3 = 0
            this.sort4 = 0
            this.searchShow = true
            this.resultShow = true
            setTimeout(()=>{
              this.loadingShow = false
              this.list = res.data.transportBoxData
              if(res.data.transportBoxData.length == 0){
                this.resultShow = false
              }
            },800)
          })
        // }else{
        //   let form = {
        //     start_port: this.fromPort,
        //     end_port: this.toPort,
        //     from: this.fromSearch,
        //     to: this.toSearch
        //   }
        //   localStorage.setItem("loginto", '2')
        //   localStorage.setItem("ptp", JSON.stringify(form))
        //   localStorage.setItem("islogin", '1')
        //   this.$refs.mask.style = 'display:block;'
        //   this.$refs.nologinModal.style = 'display:block;'
        //   setTimeout(()=> {
        //     this.$refs.mask.style = 'display:block;opacity:1;'
        //     this.$refs.nologinModal.style =
        //       'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        //   },1)
        // }
      },
      searchPrice(){
        let a = []
        for(let n = 0;n < this.dateSelect.length;n++){
          a.push(this.dateSelect[n])
        }
        let shipping_date = a.join(',')
        
        let b = []
        for(let n = 0;n < this.carrierSelect.length;n++){
          b.push(this.carrierSelect[n])
        }
        let shipmaster = b.join(',')

        let line = ''
        if(this.transshipmentSelect.length != 2){
          let c = []
          for(let n = 0;n < this.transshipmentSelect.length;n++){
            c.push(this.transshipmentSelect[n])
          }
          line = c.join(',')
        }
        // console.log(shipping_date,shipmaster,line)
        getPrice({
          start_port: this.fromPort,
          end_port: this.toPort,
          start_en: this.fromSearch,
          end_en: this.toSearch,
          shipping_date,
          shipmaster,
          line,
          manage_id: this.manageId,
        }).then((res)=>{
          if(res.code == 0){
            this.list = res.data.transportBoxData
            this.details = res.data.surcharge
          }
        })
      },
      selectSort1(){
        if(this.sort1 != 1){
          this.sort1 = 1
          let arr = this.list
          arr.sort((a,b)=>{
            return a.gp20 - b.gp20
          })
          let a = arr.filter(num => num.gp20 > 0).concat(arr.filter(num => num.gp20 == 0))
          this.list = a
        }else{
          this.sort1 = 2
          this.list.sort((a,b)=>{
            return b.gp20 - a.gp20
          })
        }
        this.sort2 = 0
        this.sort3 = 0
        this.sort4 = 0
      },
      selectSort2(){
        if(this.sort2 != 1){
          this.sort2 = 1
          let arr = this.list
          arr.sort((a,b)=>{
            return a.gp40 - b.gp40
          })
          let a = arr.filter(num => num.gp40 > 0).concat(arr.filter(num => num.gp40 == 0))
          this.list = a
        }else{
          this.sort2 = 2
          this.list.sort((a,b)=>{
            return b.gp40 - a.gp40
          })
        }
        this.sort1 = 0
        this.sort3 = 0
        this.sort4 = 0
      },
      selectSort3(){
        if(this.sort3 != 1){
          this.sort3 = 1
          let arr = this.list
          arr.sort((a,b)=>{
            return a.hq40 - b.hq40
          })
          let a = arr.filter(num => num.hq40 > 0).concat(arr.filter(num => num.hq40 == 0))
          this.list = a
        }else{
          this.sort3 = 2
          this.list.sort((a,b)=>{
            return b.hq40 - a.hq40
          })
        }
        this.sort1 = 0
        this.sort2 = 0
        this.sort4 = 0
      },
      selectSort4(){
        if(this.sort4 != 1){
          this.sort4 = 1
          let arr = this.list
          arr.sort((a,b)=>{
            return a.hq45 - b.hq45
          })
          let a = arr.filter(num => num.hq45 > 0).concat(arr.filter(num => num.hq45 == 0))
          this.list = a
        }else{
          this.sort4 = 2
          this.list.sort((a,b)=>{
            return b.hq45 - a.hq45
          })
        }
        this.sort1 = 0
        this.sort2 = 0
        this.sort3 = 0
      },
      detail(){
        let url = this.$router.resolve({
          path: '/main/FCLdetail',
        })
        window.open(url.href,'_blank')
      },
      booking(item){
        this.$router.push({
          name: 'FCLbooking',
          params: {list: JSON.stringify(item)}
        })
      },
      tologin(){
        this.$router.push('/login')
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.nologinModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        this.$refs.detailModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      nologin(){
        if(localStorage.getItem("islogin")){
          let port = JSON.parse(localStorage.getItem("ptp"))
          this.fromSearch = port.from
          this.toSearch = port.to
          this.searchAllPrice(port,3)
          localStorage.removeItem("ptp")
          localStorage.removeItem("islogin")
        }
      },
      openDetail(){
        this.$refs.mask.style = 'display:block;'
        this.$refs.detailModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.detailModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      delAHistory(num){
        delHistory({id:num}).then((req)=>{
          getHistory().then(res=>{
            this.history = res.data
          })
        })
      },
      historySearch(num){
        // console.log(num,'123131');
        this.list = []
        this.loadingShow = true
        getPrice({
          start_port: num.start,
          end_port: num.end,
          start_en: num.start_en,
          end_en: num.end_en,
          manage_id: this.manageId,
        }).then((res)=>{
          this.fromPort = num.start
          this.toPort = num.end
          this.fromSearch = num.start_en
          this.toSearch = num.end_en

          this.carrierList = res.data.shipmaster
          this.details = res.data.surcharge
          this.dateSelect = []
          this.carrierSelect = []
          this.transshipmentSelect = []
          this.sort1 = 0
          this.sort2 = 0
          this.sort3 = 0
          this.sort4 = 0
          this.searchShow = true
          this.resultShow = true
          setTimeout(()=>{
            this.loadingShow = false
            this.list = res.data.transportBoxData
            if(res.data.transportBoxData.length == 0){
              this.resultShow = false
            }
          },800)
        })
      },
      toBooking(num){
        if(this.$store.state.user.token){
          // console.log(num);
          localStorage.setItem("tobooking", JSON.stringify(num))
          this.$router.push({
            name: 'shippingList',
          })
        }else{
          this.$refs.mask.style = 'display:block;'
          this.$refs.nologinModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.nologinModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
      },
      toportchat(item){
        if(this.$store.state.user.token){
          let search = {
            start_port: this.fromPort,
            end_port: this.toPort,
            start_en: this.fromSearch,
            end_en: this.toSearch,
          }
          localStorage.setItem("PortItem",JSON.stringify(item))
          localStorage.setItem("PortSearch",JSON.stringify(search))
          this.$emit('portchat')
        }else{
          localStorage.setItem("loginto", '2')
          this.$refs.mask.style = 'display:block;'
          this.$refs.nologinModal.style = 'display:block;'
          setTimeout(()=> {
            this.$refs.mask.style = 'display:block;opacity:1;'
            this.$refs.nologinModal.style =
              'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
          },1)
        }
      },
      searchSale(item){
        // console.log(item);
        getPort({
          name: item.start_port,
          is_start: 1,
          is_end: 0
        }).then((res)=>{
          this.fromSearch = res.data[0].cityName
          this.fromPort = res.data[0].port
          getPort({
            name: item.end_port,
            is_start: 0,
            is_end: 1
          }).then((req)=>{
            this.toSearch = req.data[0].cityName
            this.toPort = req.data[0].port
            this.searchAllPrice()
          })
        })
        
        // setTimeout(()=>{
        //   console.log(this.fromSearch);
        //   this.searchAllPrice()
        // },500)
      }
    }
  }
</script>

<style lang="postcss" scoped>
.sort{
  @apply w-1/4 py-2 flex justify-center items-center border-gray-300 dark:border-darkLine select-none cursor-pointer hover:bg-gray-200 dark:hover:bg-darkLine;
}

.sortSelect{
  @apply bg-gray-200 dark:bg-darkLine;
}

td{
  @apply w-1/5;
}

.searchPort{
  @apply absolute z-10 p-0 w-full min-w-312px max-h-52 h-auto top-11 left-0 text-sm rounded bg-white shadow-md overflow-auto;
}

.searchPort::-webkit-scrollbar {
  width: 6px;
}

.searchPort::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.searchPort::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}

.swiper-container{
  z-index: 0;
}

input::-webkit-input-placeholder {
  @apply text-sm;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.triangle{
  position: relative;
  z-index: -10;
  width: 0px;
  height: 0px;
  border-top: 6px solid #a30e04;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

.detailTable {
  @apply py-3 w-1/6 border-b border-r border-gray-300;
}

.modal::-webkit-scrollbar {
  width: 6px;
}

.modal::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.modal::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}
</style>
