<template>
  <div class="w-full h-full relative">
    <div ref="mask" class="mask"></div>
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

    <div class="overflow-auto" style="height: calc(100vh - 61px);">
      <div class="grid grid-cols-2 gap-5 max-w-1600 pt-5 px-2 mx-auto pb-32">
        <div class="col-span-1">
          <div class="p-5 bg-white rounded shadow">
            <div class="mb-4 text-orderColor text-2xl font-semibold">Ocean Freight</div>
            <div class="p-3 rounded border border-gray-300">
              <div class="w-full flex">
                <div class="w-1/3">
                  <div class="mb-1.5 text-sm font-semibold">From</div>
                  <div class="flex">
                    <!-- <div class="w-1/2 mr-5 flex items-center">
                      <div class="relative w-full">
                        <select v-model="fromCountrySearch" class="select text-sm" @change="selectDepartures">
                          <option class="hidden" disabled value="">Select country of departure</option>
                          <option value="1">China</option>
                        </select>
                      </div>
                    </div> -->
                    <div class="w-full mr-5">
                      <div class="relative w-full">
                        <input ref="froms" v-model="fromSearch" @input="getDeparture" @focus="getDeparture"
                          type="text" class="input" placeholder="Select port of departure">
                        <div v-show="fromShows" class="searchPorts">
                          <div v-for="(f,nf) in fromLists" :key="nf" @click="selectDeparture(f)"
                            class="px-3 py-2 hover:bg-gray-100 flex cursor-pointer">
                            <div class="w-2/3">{{ f.cityName }}</div>
                            <div class="w-1/3 pl-5">{{ f.countryName }}</div>
                          </div>
                        </div>
                        <svg @click="delFrom" v-show="fromSearch" t="1673857296342" class="icon absolute right-1 top-2 w-5 cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2691" width="20" height="20"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM672 627.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8l-115.2 115.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8C339.2 384 339.2 364.8 352 352s32-12.8 44.8 0L512 467.2l115.2-115.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z" p-id="2692" fill="#7a7a7a"></path></svg>
                      </div>
                      <div class="mt-2 flex text-orderHover text-xs">
                        <div>China:</div>
                        <div class="ml-1.5 flex flex-wrap">
                          <div v-for="(i,n) in fromPorts" :key="n" @click="selectDeparture(i)"
                            class="mr-1 flex cursor-pointer hover:underline">
                            <span>{{i.city}}</span>
                            <span v-show="n < 2">, </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="flex items-center">
                  <img src="../../assets/FClto.svg" class="w-28" alt="">
                </div> -->
                <div class="w-2/3">
                  <div class="mb-1.5 text-sm font-semibold">To</div>
                  <div class="flex">
                    <div class="w-1/2 mr-5 flex items-center">
                      <div class="relative w-full">
                        <input ref="toCountry" v-model="endSearch" @input="getCountry" @focus="getCountry"
                          type="text" class="input" placeholder="Select country of destination">
                        <div v-show="toShows" class="searchPorts">
                          <div v-for="(t,nt) in toCountryList" :key="nt" @click="selectCountrys(t)"
                            class="px-3 py-2 hover:bg-gray-100 flex cursor-pointer">
                            <div>{{ t.countryName }}</div>
                          </div>
                        </div>
                        <svg @click="delTos" v-show="endSearch" t="1673857296342" class="icon absolute right-1 top-2 w-5 cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2691" width="20" height="20"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM672 627.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8l-115.2 115.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8C339.2 384 339.2 364.8 352 352s32-12.8 44.8 0L512 467.2l115.2-115.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z" p-id="2692" fill="#7a7a7a"></path></svg>
                      </div>
                    </div>
                    <div class="w-1/2 flex items-center">
                      <div class="relative w-full">
                        <input ref="to" v-model="toSearch" @input="getDestination" @focus="getDestination"
                          type="text" class="input" placeholder="Select port of destination">
                        <div v-show="toShow" class="searchPorts">
                          <div v-for="(t,nt) in toList" :key="nt" @click="selectDestinations(t)"
                            class="px-3 py-2 hover:bg-gray-100 flex cursor-pointer">
                            <div class="w-1/2">{{ t.cityName }}</div>
                            <div class="w-1/2">{{ t.countryName }}</div>
                          </div>
                        </div>
                        <svg @click="delTo" v-show="toSearch" t="1673857296342" class="icon absolute right-1 top-2 w-5 cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2691" width="20" height="20"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM672 627.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8l-115.2 115.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8C339.2 384 339.2 364.8 352 352s32-12.8 44.8 0L512 467.2l115.2-115.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z" p-id="2692" fill="#7a7a7a"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div v-if="toPorts.length>0" class="mt-2 flex text-orderHover text-xs">
                    <div class="flex-shrink-0">{{toPorts[0].countryName}}:</div>
                    <div class="w-full ml-1.5 flex flex-wrap">
                      <div v-for="(i,n) in toPorts" :key="n" @click="selectDestinations(i)"
                        class="mr-1 flex cursor-pointer hover:underline">
                        <span>{{i.cityName}}</span>
                        <span v-show="n < 4">, </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-3 flex-shrink-0 flex justify-end">
                <button @click="searchAllPrice"
                  class="w-52 max-w-xs h-42px text-sm p-1 bg-orderColor hover:bg-orderHover text-white rounded">Get Price</button>
              </div>
            </div>
            <div class="my-3 flex">
              <button class="py-1 px-4 rounded h-8 bg-orderColor hover:bg-orderHover text-white"
                @click="viewfcl">Export Quotes</button>
            </div>
            <div v-show="resultShow && list.length == 0"
              class="mt-4 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex flex-col justify-center items-center">
              <img src="../../assets/noShipCost.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
              <div class="mt-5 text-base text-center font-semibold">No results</div>
            </div>
            <div v-show="list.length>0">
              <div class="mb-2 flex text-xs" style="background: #E9EFF5;">
                <div class="w-1/12 border-r border-white"></div>
                <div class="w-1/12 flex justify-center items-center border-r border-white">Carrier</div>
                <div class="w-2/12 flex justify-center items-center border-r border-white">20GP</div>
                <div class="w-2/12 flex justify-center items-center border-r border-white">40GP</div>
                <div class="w-2/12 flex justify-center items-center border-r border-white">40HQ</div>
                <div class="w-2/12 flex justify-center items-center border-r border-white py-1.5">Estd.Transit Time</div>
                <div class="w-2/12 border-r border-white"></div>
              </div>
              <div v-for="(ic,nc) in list" :key="nc" class="py-2 text-sm">
                <div class="pb-1 flex justify-between items-center">
                  <div class="flex items-center">
                    <div>{{ ic[0].start_port }}, {{ ic[0].start_country }}</div>
                    <svg t="1689315829015" class="mx-1 icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6742" width="28" height="28"><path d="M975.71463926 581.31313556c1.9524827 13.66737884-6.83368941 25.38227498-19.52482692 28.31099902-0.97624134 0-2.92872403 0.97624134-3.90496537 0.97624136H72.69139438c-13.66737884 0-24.40603363-10.73865482-24.40603364-24.40603365s10.73865482-24.40603363 24.40603364-24.40603366h828.82890261l-105.43406534-105.43406536c-9.76241345-9.76241345-9.76241345-24.40603363 0-34.1684471s25.38227498-9.76241345 34.1684471 0l138.62627112 138.62627112c5.85744807 3.9049654 7.80993077 12.69113749 6.83368939 20.50106827z" fill="#a9a9a9" p-id="6743"></path></svg> 
                    <div>{{ ic[0].end_port }}, {{ ic[0].end_country }}</div>
                  </div>
                  <div @click="toportchat(ic[0])" class="w-32 p-1 border border-gray-200 flex justify-center items-center cursor-pointer rounded bg-white hover:bg-gray-100">
                    <img class="w-5 mr-1" src="../../assets/chatnow.png" alt="">
                    <div class="text-orderColor">Chat now</div>
                  </div>
                </div>
                <div v-for="(i,n) in ic" :key="n" class="flex border-b border-white" style="background: #E9EFF5;color: #606266;">
                  <div class="w-1/12 flex justify-center items-center border-r border-white">
                    <input type="checkbox" :value="i" v-model="fclSelect" class="cursor-pointer" style="width: 14px;height: 14px;">
                  </div>
                  <div class="w-1/12 flex justify-center items-center border-r border-white">{{ i.company }}</div>
                  <div class="w-2/12 flex justify-center items-center border-r border-white font-semibold">
                    <div v-if="i.super_gp20 > 0">${{ i.super_gp20 }}</div>
                    <div v-if="i.super_gp20 == 0">N/A</div>
                  </div>
                  <div class="w-2/12 flex justify-center items-center border-r border-white font-semibold">
                    <div v-if="i.super_gp40 > 0">${{ i.super_gp40 }}</div>
                    <div v-if="i.super_gp40 == 0">N/A</div>
                  </div>
                  <div class="w-2/12 flex justify-center items-center border-r border-white font-semibold">
                    <div v-if="i.super_hq40 > 0">${{ i.super_hq40 }}</div>
                    <div v-if="i.super_hq40 == 0">N/A</div>
                  </div>
                  <div class="w-2/12 flex justify-center items-center border-r border-white">{{ i.voyage }}</div>
                  <div class="w-2/12 flex justify-center items-center py-1">
                    <button @click="surchargeModal(i)"
                      class="py-1 px-2 rounded-sm bg-orderColor hover:bg-orderHover text-white text-xs mr-1"
                      >Surcharge</button>  
                    <!-- <button @click="booking(i)"
                      class="py-1 px-2 rounded-sm bg-orderColor hover:bg-orderHover text-white text-xs"
                      >Booking Now</button> -->
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-1">
          <div class="p-5 bg-white rounded shadow">
            <div class="mb-4 text-orderColor text-2xl font-semibold">DDP/DDU Freight</div>
            <div class="flex items-center">
              <div class="w-full grid grid-cols-3 rounded-md border border-gray-300 dark:border-darkLine">
                <div ref="OriginSelect" class="bookingSearch border-r-0 md:border-r rounded-t-md md:rounded-tr-none md:rounded-l-md border-b md:border-b-0">
                  <div class="relative">
                    <div ref="fromSearchs" class="py-2.5 px-5 absolute top-0 left-0 w-full h-full hidden">
                      <input ref="from" @input="originCity" @focus="originCity" @blur="originCity1" 
                        v-model="shippingFrom" class="py-2.5 w-full h-full text-sm focus:outline-none bg-transparent" type="text"
                        autocomplete="new-password">
                      <div v-show="fromShow && shippingFrom != ''" class="searchPort">
                        <div v-for="(f,nf) in fromList" :key="nf" @click="selectFrom(f)"
                          class="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                          <div><span v-html="f.valueBright"></span></div>
                        </div>
                      </div>
                    </div>
                    <div ref="originPanel" @click="openOrigin" class="py-2.5 px-5">
                      <div class="mb-1.5 font-semibold flex items-center">
                        <div ref="orginTitle">Origin</div>
                      </div>
                      <div class="text-gray-400 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">{{ form.shipping_from_en }}</div>
                    </div>
                  </div>
                  <div v-show="OriginShow && shippingFrom == ''" class="absolute bottom-0 left-0 z-10 w-full sm:w-600">
                    <div class="top-1 left-0 searchItem w-full">
                      <div class="font-semibold text-base">Recommended city</div>
                      <div class="mt-3 grid grid-cols-4 gap-0">
                        <div v-for="(i,n) in reCity" @click="selectFrom(i)"
                          class="py-3 px-1.5 col-span-1 cursor-pointer hover:bg-gray-100 rounded">{{i.pinyin}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref="DestinationSelect" class="bookingSearch border-r-0 md:border-r border-b md:border-b-0">
                  <div class="relative">
                    <div ref="toSearchs" class="py-2.5 px-5 absolute top-0 left-0 w-full h-full hidden">
                      <input ref="toCountrys" @input="seCountry" @focus="seCountry"
                        v-model="shippingTo" class="py-2.5 w-full h-full text-sm focus:outline-none bg-transparent" type="text"
                        autocomplete="new-password">
                      <select-country
                        ref="selectCountry"
                        :selectList="destinationList"
                        :selectChecked="destinationItem"
                        :selectOpen="destinationShow"
                        @increment="selectDestination"
                        v-show="destinationShow"
                      ></select-country>
                    </div>
                    <div ref="destinationPanel" @click="openDestination" class="py-2.5 px-5">
                      <div class="mb-1.5 font-semibold flex items-center">
                        <div ref="destinationTitle">Destination</div>
                      </div>
                      <div v-show="!DestinationSuccess" class="text-gray-400 text-xs">Please enter country</div>
                      <div v-show="DestinationSuccess" class="text-gray-400 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis"
                      >{{ destinationItem.en_nickname }}</div>
                    </div>
                  </div>
                </div>
                <div ref="LoadSelect" class="bookingSearch rounded-b md:rounded-r-md md:rounded-bl-none">
                  <div class="py-2.5 px-5" @click="LoadShow = !LoadShow">
                    <div class="mb-1.5 font-semibold flex items-center">
                      <div ref="loadTitle">Package Data</div>
                    </div>
                    <div v-show="!LoadSuccess" class="text-gray-400 text-xs">Enter weight and volume</div>
                    <div v-show="LoadSuccess" class="text-gray-400 text-xs"
                    >Total: 
                    <span v-show="totalVolumn > 0">{{ totalVolumn }} {{ volumnUnit[form1.size_unit - 1] }} | </span>
                    {{ totalWeight }} {{ weightUnit[form1.weight_unit - 1] }}
                    <span v-show="totalBoxes > 0"> | {{ totalBoxes }} boxes</span></div>
                  </div>
                  <div v-show="LoadShow" class="absolute bottom-0 left-0 md:left-auto md:-right-24 2xl:left-0 z-10 w-full sm:w-600">
                    <div class="top-1 -left-52 searchItem w-full">
                      <div class="mb-4 flex flex-col sm:flex-row">
                        <div class="mr-4 mb-1.5 sm:mb-0 flex-shrink-0 font-semibold">Cargo calculation method</div>
                        <div class="w-full flex flex-wrap">
                          <label class="mr-4 flex items-center cursor-pointer select-none relative">
                            <div class="mr-1 border w-4 h-4 rounded-full flex justify-center items-center"
                              :class="[calculationMethod == 1 ? 'border-orange': 'border-gray-400']">
                              <div v-show="calculationMethod == 1" class="rounded-full bg-orange w-2.5 h-2.5"></div>
                            </div>
                            <input @change="loadSuccess" class="mr-1 absolute opacity-0 cursor-pointer" type="radio" value="1" v-model="calculationMethod">
                            <div>Calculate by Total Shipment</div>
                          </label>
                        </div>
                      </div>
                      <div class="mb-3 p-1.5 rounded bg-main text-xs">The final price is subject to the actual measurement size.</div>
                      <div v-if="calculationMethod == 1">
                        <div class="mb-5 grid grid-cols-3 gap-3">
                          <div class="col-span-3 sm:col-span-1">
                            <div class="pb-1">
                              <label class="text-13 flex">
                                <div class="required">*</div>
                                Total Weight</label>
                            </div>
                            <div class="relative">
                              <input @input="loadSuccess" v-model="form1.weight" type="number" class="input pr-12 h-42px" min="0"
                                v-validate="'required|totalWeight'" name="totalWeight">
                              <div class="inputTips -bottom-3.5">{{errors.first("totalWeight")}}</div>
                              <select v-model="form1.weight_unit" @change="chooseLoadUnit1"
                                class="absolute bottom-1px right-1px rounded-r h-10 bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                                <option value="1">KG</option>
                                <option value="2">LB</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-span-3 sm:col-span-1">
                            <div class="pb-1">
                              <label class="text-13 flex">
                                Total Volume</label>
                            </div>
                            <div class="relative">
                              <input @input="loadSuccess" v-model="form1.size" type="number" class="input pr-14 h-42px" min="0">
                              <select v-model="form1.size_unit" @change="chooseLoadUnit"
                                class="absolute bottom-1px right-1px rounded-r h-10 bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                                <option value="1">CBM</option>
                                <option value="2">CBF</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-span-3 sm:col-span-1">
                            <div class="pb-1">
                              <label class="text-13 flex">Of Boxes</label>
                            </div>
                            <input @input="loadSuccess" v-model="form1.num" class="input h-42px" type="number" min="1">
                          </div>
                        </div>
                      </div>
                      <div v-if="calculationMethod == 2">
                        <div v-for="(item,ns) in unitBox" :key="ns" class="flex items-end relative mb-4">
                          <div class="mb-2 grid grid-cols-4 gap-3">
                            <div class="col-span-1">
                              <div class="pb-1">
                                <label class="text-13 flex">
                                  <div class="required">*</div>
                                  Weight (per box)</label>
                              </div>
                              <div class="relative">
                                <input @input="loadSuccess" v-model="item.weight" type="number" class="input pr-12 h-42px" min="0">
                                <select v-model="form1.weight_unit" @change="chooseLoadUnit1"
                                  class="absolute bottom-1px right-1px rounded-r h-10 bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                                  <option value="1">KG</option>
                                  <option value="2">LB</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-span-2">
                              <div class="pb-1">
                                <label class="text-13 flex">
                                  <div class="required">*</div>
                                  Dimensions (L x W x H per box)</label>
                              </div>
                              <div class="relative overflow-hidden flex border border-inputBorder dark:border-darkMain rounded">
                                <input @input="loadSuccess" v-model="item.long" type="number" placeholder="L" class="input h-10 px-1.5 sm:px-2 rounded-none border-0 border-r focus:border-inputBorder dark:border-darkLine dark:focus:border-darkLine focus:ring-0" min="0">
                                <input @input="loadSuccess" v-model="item.width" type="number" placeholder="W" class="input h-10 px-1.5 sm:px-2 rounded-none border-0 border-r focus:border-inputBorder dark:border-darkLine dark:focus:border-darkLine focus:ring-0" min="0">
                                <input @input="loadSuccess" v-model="item.height" type="number" placeholder="H" class="input h-10 px-1.5 sm:px-2 rounded-none border-0 focus:ring-0" min="0">
                                <select name="volume" v-model="form1.size_unit" @change="chooseLoadUnit"
                                  class="bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                                  <option value="1">CM</option>
                                  <option value="2">IN</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-span-1">
                              <div class="pb-1">
                                <label class="text-13 flex">
                                  <div class="required">*</div>
                                  Of Boxes</label>
                              </div>
                              <input @input="loadSuccess" v-model="item.num" class="input h-42px" type="number" min="1">
                            </div>
                          </div>
                          <div class="mb-4 flex">
                            <svg @click="delLoad(ns)" t="1677056269738" class="icon mx-2.5 cursor-pointer" viewBox="0 0 1033 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7668" width="18" height="18"><path d="M0 151.220727h1033.939684v80.017582H0z" p-id="7669" fill="#7a7a7a"></path><path d="M701.804205 228.837782H332.135479a40.008791 40.008791 0 0 1-40.008791-40.008791v-148.782692a40.008791 40.008791 0 0 1 40.008791-40.008791h369.668726a40.008791 40.008791 0 0 1 40.008791 40.008791v148.782692a40.008791 40.008791 0 0 1-40.008791 40.008791z m-329.659935-80.017582h289.651144v-68.76511H372.14427z" p-id="7670" fill="#7a7a7a"></path><path d="M813.616273 1023.987497H232.813655a40.008791 40.008791 0 0 1-39.896266-37.133159l-56.262362-780.846573a40.008791 40.008791 0 0 1 39.896266-42.884422h680.824595a40.008791 40.008791 0 0 1 39.946278 42.246782l-43.759616 780.809065a40.008791 40.008791 0 0 1-39.946277 37.808307z m-543.569437-80.017582H775.795463l39.271129-700.853996H219.548241z" p-id="7671" fill="#7a7a7a"></path><path d="M400.275451 991.655393a40.008791 40.008791 0 0 1-40.008791-40.008791V356.328295a40.008791 40.008791 0 0 1 80.017582 0v595.318307a40.008791 40.008791 0 0 1-40.008791 40.008791zM644.491612 991.655393a40.008791 40.008791 0 0 1-40.008791-40.008791V356.328295a40.008791 40.008791 0 0 1 80.017582 0v595.318307a40.008791 40.008791 0 0 1-40.008791 40.008791z" p-id="7672" fill="#7a7a7a"></path></svg>
                            <svg @click="copyLoad(ns)" t="1677056177686" class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3964" width="20" height="20"><path d="M853.333333 224h-53.333333V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667H170.666667C130.133333 96 96 130.133333 96 170.666667v554.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h53.333333V853.333333c0 40.533333 34.133333 74.666667 74.666667 74.666667h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V298.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667zM160 725.333333V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h554.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v554.666666c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667z m704 128c0 6.4-4.266667 10.666667-10.666667 10.666667H298.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667v-53.333333H725.333333c40.533333 0 74.666667-34.133333 74.666667-74.666667V288H853.333333c6.4 0 10.666667 4.266667 10.666667 10.666667v554.666666z" fill="#7a7a7a" p-id="3965"></path><path d="M576 416h-96V320c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v96H320c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h96V576c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-96H576c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#7a7a7a" p-id="3966"></path></svg>
                          </div>
                          <div v-show="!item.right" class="inputTips -bottom-2">Enter a positive value for all fields</div>
                        </div>
                        <div class="mt-3 mb-5 flex">
                          <div @click="addLoad" class="text-switch cursor-pointer hover:underline">Add a load</div>
                          <div class="ml-2 text-13 text-gray-400">(If more than one size goods, please add.)</div>
                        </div>
                      </div>
                      <div class="pt-5 flex justify-end items-center border-t border-gray-300 dark:border-darkLine">
                        <div @click="clearLoad" class="mr-8 cursor-pointer hover:underline">Clear all</div>
                        <button @click="confirmLoad" class="confirmBtn">Confirm</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button @click="Search(form,'1')"
                class="flex-shrink-0 mt-5 md:mt-0 md:ml-10 w-60 md:w-40 h-14 p-1 bg-orderColor hover:bg-orderHover text-white rounded-md">Get Price</button>
            </div>
            <div class="my-3 flex">
              <button class="py-1 px-4 rounded h-8 bg-orderColor hover:bg-orderHover text-white"
                @click="viewddp">Export Quotes</button>
            </div>
            <div v-show="resultShows && shippingList.length == 0"
              class="mt-4 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex flex-col justify-center items-center">
              <img src="../../assets/noShipCost.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
              <div class="mt-5 text-base text-center font-semibold">No results</div>
            </div>
            <div v-show="shippingList.length>0">
              <div class="mb-2 flex items-center">
                <div>{{forms.shipping_from_en}}</div>
                <svg t="1689315829015" class="mx-1 icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6742" width="28" height="28"><path d="M975.71463926 581.31313556c1.9524827 13.66737884-6.83368941 25.38227498-19.52482692 28.31099902-0.97624134 0-2.92872403 0.97624134-3.90496537 0.97624136H72.69139438c-13.66737884 0-24.40603363-10.73865482-24.40603364-24.40603365s10.73865482-24.40603363 24.40603364-24.40603366h828.82890261l-105.43406534-105.43406536c-9.76241345-9.76241345-9.76241345-24.40603363 0-34.1684471s25.38227498-9.76241345 34.1684471 0l138.62627112 138.62627112c5.85744807 3.9049654 7.80993077 12.69113749 6.83368939 20.50106827z" fill="#a9a9a9" p-id="6743"></path></svg> 
                <div>{{forms.shipping_to_en}}</div>
              </div>
              <el-table
                :data="shippingList"
                @selection-change="ddpSelection"
                style="width: 100%"
                :header-cell-style="{'background-color':'#E9EFF5'}"
                :row-class-name="tableRowClassName"
                :border="true">
                <el-table-column
                  fixed
                  type="selection"
                  width="40">
                </el-table-column>
                <el-table-column
                  prop="product_name_e"
                  label="Shipping"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  prop="service_term"
                  label="Tax Types"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="Transit Time"
                  width="130">
                  <template slot-scope="scope">
                    <div>{{scope.row.aging_start}}-{{scope.row.aging_end}} Days</div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Freight"
                  width="120">
                  <template slot-scope="scope">
                    <div>{{scope.row.add_unit_price}}/kg</div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Estimated Cost"
                  width="150">
                  <template slot-scope="scope">
                    <div class="font-semibold">${{scope.row.super_freight}}</div>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  min-width="100">
                  <template slot-scope="scope">
                    <div class="flex justify-end">
                      <button @click="bookingOrder(scope.row,'base')"
                        class="rounded-sm w-28 h-6 bg-orderColor hover:bg-orderHover text-white text-xs"
                        >Booking Now</button>
                    </div>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="Export Price"
      :visible.sync="fclModal"
      :modal-append-to-body="false"
      width='500px'
    >
      <div>
        <div>
          <div class="mb-2">Export Type</div>
          <div class="flex">
            <label class="flex items-center cursor-pointer mr-4">
              <input type="radio" value="1" v-model="fclInfo.pdftype" class="mr-1">
              <div>FOB</div>
            </label>
            <label class="flex items-center cursor-pointer">
              <input type="radio" value="2" v-model="fclInfo.pdftype" class="mr-1">
              <div>EXW</div>
            </label>
          </div>
        </div>
        <div class="mt-5">
          <div class="mb-2">Customer Name/Company Name</div>
          <input type="text" class="input" v-model="fclInfo.company_name">
        </div>
        <div class="mt-5">
          <div class="mb-2">Container Size</div>
          <div>
            <div class="flex items-center h-8">
              <label class="flex items-center cursor-pointer">
                <input type="radio" value="1" v-model="sizeType" class="mr-1">
                <div>20GP</div>
              </label>
              <div v-show="sizeType == 1" class="flex items-center">
                <input type="number" min="1" class="input px-2 w-16 h-8 ml-3 mr-1" v-model="fclNum">
                <div>Qty</div>
                <input type="number" class="input px-2 w-16 h-8 ml-3 mr-1" v-model="fclPrice">
                <div>USD</div>
              </div>
            </div>
            <div class="flex items-center h-8">
              <label class="flex items-center cursor-pointer">
                <input type="radio" value="2" v-model="sizeType" class="mr-1">
                <div>40GP</div>
              </label>
              <div v-show="sizeType == 2" class="flex items-center">
                <input type="number" min="1" class="input px-2 w-16 h-8 ml-3 mr-1" v-model="fclNum">
                <div>Qty</div>
                <input type="number" class="input px-2 w-16 h-8 ml-3 mr-1" v-model="fclPrice">
                <div>USD</div>
              </div>
            </div>
            <div class="flex items-center h-8">
              <label class="flex items-center cursor-pointer">
                <input type="radio" value="3" v-model="sizeType" class="mr-1">
                <div>40HQ</div>
              </label>
              <div v-show="sizeType == 3" class="flex items-center">
                <input type="number" min="1" class="input px-2 w-16 h-8 ml-3 mr-1" v-model="fclNum">
                <div>Qty</div>
                <input type="number" class="input px-2 w-16 h-8 ml-3 mr-1" v-model="fclPrice">
                <div>USD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button
          @click="fclModal = false"
          class="mr-4 py-1 px-4 rounded h-8 bg-white border hover:bg-gray-200"
        >Cancel</button>
        <button
          @click="fclPdf"
          class="py-1 px-4 rounded h-8 bg-orderColor hover:bg-orderHover text-white"
        >View PDF</button>
      </div>
    </el-dialog>

    <el-dialog
      title="Export Price"
      :visible.sync="ddpModal"
      :modal-append-to-body="false"
      width='500px'
    >
      <div>
        <div class="mb-2">Price increase(USD/KG)</div>
        <input type="number" class="input" v-model="ddpPrice">
      </div>
      <div slot="footer">
        <button
          @click="ddpModal = false"
          class="mr-4 py-1 px-4 rounded h-8 bg-white border hover:bg-gray-200"
        >Cancel</button>
        <button
          @click="pdfModal"
          class="py-1 px-4 rounded h-8 bg-orderColor hover:bg-orderHover text-white"
        >View PDF</button>
      </div>
    </el-dialog>

    <fclpdf ref="fcl"></fclpdf>

    <ddppdf ref="ddp"></ddppdf>
    <Surcharge ref="surcharge"></Surcharge>
  </div>
</template>

<script>
import SelectCountry from '@/components/Order/Forwarding/OSCountry'
import fclpdf from './components/export-fclPDF-modal'
import ddppdf from './components/export-pdf-modal'
import dayjs from 'dayjs';
import Surcharge from '@/components/Quote/Surcharge.vue';
var localizedFormat = require('dayjs/plugin/localizedFormat')

import {
  shipFromTo,
  getCost,
  getRecommend,
  getIpInfo
} from '@/api/shippingCost'
import {
  ImgUpload,
  quickOrder,
  getStart,
  getEnd,
  feedback,
} from '@/api/order'
import {
  getPort,
  getPrice,
  getEndCountry,
  getRecommendedDestinationPort
} from '@/api/fcl'
export default {
  components: {
    SelectCountry,
    ddppdf,
    fclpdf,
    Surcharge
  },
  data() {
    return {
      surchargeList:[],
      contryList: ['US', 'UK'],
      originList: [],
      originItem: { name: "北京市", e_name: "Beijing" },
      originShow: false,
      destinationList: [],
      destinationItem: {},
      // destinationItem: { zh_cn_nickname: '美国', code_two: 'US', en_nickname: 'United States' },
      destinationShow: false,
      email: '',
      sortShippingList: [],
      shippingList: [],
      shippingListss: [],
      shippingListSort: [],
      form: {
        shipping_from: '100000',
        shipping_from_en: 'China',
        take: 1,
        shipping_to: '',
        shipping_to_en: '',
        shipping_to_zipcode: '',
        insurance: 0,
        load_type: 1,
        volume: '',
        volume_unit: 1,
        weight: 21,
        weight_unit: 1,
        total: '',
        product_one: 0,
        product_two: 0,
        manage_id: '',
        not_fba_address: 0,
      },
      result: false,
      history: [],
      weightUnit: ['KG','LB'],
      sizeUnit: ['CM','IN'],
      volumnUnit: ['CBM','CBF'],
      ispickup: false,
      customer_manage: {
        email: "ben.he@co-logistics.com",
        englishname: "Ben",
        whatsapp: "+1-917-639-5399",
        image_url: '',
        id: "152",
      },
      OriginShow: false,
      DestinationShow: false,
      LoadShow: false,
      GoodsShow: false,
      calculationMethod: 1,
      locationType1: ['Factory/Warehouse','Business address','Residential address'],
      shipping_to_type: 1,
      destinationType1: ['Amazon FBA Warehouse','Business address','Residential address'],
      buyinsurance: false,
      OriginSuccess: true,
      DestinationSuccess: true,
      LoadSuccess: true,
      GoodsSuccess: false,
      form1: {
        size: null,
        size_unit: 1,
        weight: 21,
        weight_unit: 1,
        num: null,
      },
      unitBox: [
        {
          long: null,
          width: null,
          height: null,
          weight: null,
          num: null,
          right: true,
        }
      ],
      totalVolumn: 0,
      totalWeight: 21,
      totalBoxes: 0,
      GoodsList: '',
      selectGoods: 0,
      GoodsType: [
        {
          e_name: 'General products',
          check: [],
          child: [
            {
              e_name: 'Plastic & Silicone products'
            },
            {
              e_name: 'Paper products (Excl grid)'
            },
            {
              e_name: 'Lamps'
            },
            {
              e_name: 'General products'
            },
          ]
        }
      ],
      FBAList: [],
      FBASearchList: [],
      FBAShow: false,
      sortBy: 1,
      shippingMethod: [],
      customsDuties: [],
      orderType: 1,
      uploadShow: true,
      quickOrderForm: {
        contact_tel: '',
        whatsapp: '',
        wetch: '',
        content: '',
        order_img_url: '',
        order_img_name: '',
      },
      upload1Show: true,
      quickQuotes: {
        content: '',
        order_img_url: '',
        order_img_name: '',
      },
      freight_good: {},
      forms: {
        shipping_from: '100000',
        shipping_from_en: 'China',
        take: 1,
        shipping_to: '',
        shipping_to_en: '',
        shipping_to_zipcode: '',
        insurance: 0,
        load_type: 1,
        volume: '',
        volume_unit: 1,
        weight: 21,
        weight_unit: 1,
        total: '',
        product_one: 0,
        product_two: 0,
        manage_id: '',
        not_fba_address: 0,
      },
      sort_sm1: false,
      sort_sm2: false,
      sort_sm3: false,
      sort_sm4: false,
      sort_sm5: false,
      sort_cd1: false,
      sort_cd0: false,
      fromShow: false,
      fromList: [],
      shippingFrom: '',
      fbaCode: '',
      showLoad: false,
      destinationCity: '',
      endShow: false,
      endList: [],
      leftMenuOpen: this.leftMenu,
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
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
      },
      bannerList: [
        {img:require("../../assets/DDPBanner1.webp")},
        {img:require("../../assets/DDPBanner2.webp")},
        {img:require("../../assets/DDPBanner3.webp")},
      ],
      tabChoose: 1,
      isTab: 1,
      contents: '',
      typeFirst: true,
      standard: true,
      reCity: [],
      shippingTo: '',
      sort1: true,
      sort2: false,
      sort3: false,
      target: '',
      content: '',
      token: '',
      recommendDTD: [],
      recommendPTP: [],
      transshipmentList: ['Transit','Direct'],
      sortby: null,
      sortMethod: null,
      shipping_toSearch: '',
      shipping_to_enSearch: '',
      priceType: 1,
      bestRates: [],
      ddpList: [],
      fclModal: false,
      ddpModal: false,
      sizeType: 1,
      fclNum: 1,
      fclPrice: 0,
      ddpPrice: 0,
      fromCountrySearch: '',
      fromSearch: '',
      fromLists: [],
      fromShows: false,
      fromPort: '',
      endSearch: '',
      toCountry: '',
      toCountryList: '',
      toShows: false,
      toSearch: '',
      toPort: '',
      toList: [],
      toShow: false,
      endCountry: '',
      list: [],
      fclSelect: [],
      fclInfo: {
        pdftype: 1,
        company_name: '',
        remark: `1, The rate will be updated half a month.
2, Total amount will be changed if the total weight, size, type or value is changed or storage charge is caused by customs check goods. Customs fee inspection if applied
3, Rates are applicable on general, non-hazardous cargo only.`,
      },
      resultShow: false,
      resultShows: false,
      fromPorts: [
        {
          cityName: "YANTIAN PORT,SHENZHEN",
          countryName: "CHINA",
          port: "中国,深圳市,盐田港",
          city: "SHENZHEN"
        },
        {
          cityName: "SHANGHAI PORT,SHANGHAI",
          countryName: "CHINA",
          port: "中国,上海市,上海港",
          city: "SHANGHAI"
        },
        {
          cityName: "GUANGZHOU PORT,GUANGZHOU",
          countryName: "CHINA",
          port: "中国,广州市,广州港",
          city: "GUANGZHOU"
        },
      ],
      toPorts: [],
    }
  },
  // watch: {
  //   fclSelect: function (val) {
  //     console.log(val);
      
  //   }
  // },
  created() {
    // this.countryQuest()
    this.$emit('menu', 'shippingCost')
    if(this.$store.state.user.token){
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.email = userInfo.email
      this.token = this.$store.state.user.token
      this.form.manage_id = userInfo.manage.id
    }else if(JSON.parse(localStorage.getItem('chat_info')).manage){
      this.form.manage_id = JSON.parse(localStorage.getItem('chat_info')).manage.id
    }else{
      this.form.manage_id = JSON.parse(localStorage.getItem('manageNew')).id
    }
    // else{
      // getRecommend({
      //   is_packet: 0
      // }).then((req)=>{
      //   this.recommendDTD = req.data.doorData
      //   this.recommendPTP = req.data.specialData
      // })
    // }
  },
  mounted() {
    document.addEventListener(
      "click",
      this.even,
      true
    );
    getStart().then((res)=>{
      this.reCity = res.data
    })

    let ist = JSON.parse(localStorage.getItem("tobooking"))
    if(ist){
      localStorage.removeItem("tobooking")
      this.tobookingchat(ist,'quick')
    }
    if(this.$route.params.searchForm){
      let form = JSON.parse(this.$route.params.searchForm)
      this.searchAllPrice(form,3)
      // this.gptSearch(form)
    }
    if(this.$route.params.chatBooking){
      let item = JSON.parse(this.$route.params.chatBooking);
      this.bookingOrder(item, 'base')
    }
    shipFromTo().then((res)=>{
      this.destinationList = res.data.endCountry
      this.FBAList = res.data.fbaData
      this.nologin()
    
      if(this.$route.query.code){
        let codes = JSON.parse(this.$route.query.code)
        for(var i = 0; i < this.destinationList.length; i++){
          if(codes.country == this.destinationList[i].zh_cn_nickname
            || codes.code_two == this.destinationList[i].code_two){
            this.destinationItem = this.destinationList[i]
            this.form.shipping_to = this.destinationList[i].zh_cn_nickname
            this.form.shipping_to_en = this.destinationList[i].en_nickname
            this.form1.weight = Number(codes.weight).toFixed(2)
            this.totalWeight = Number(codes.weight).toFixed(2)
            this.form.weight = this.form1.weight
            break
          }
        }
        setTimeout(()=>{
          this.Search(this.form,'1')
        })
      }

      if(this.$route.query.type == 1){
        this.destinationItem = {
          zh_cn_nickname: this.$route.query.shipping_to,
          code_two: this.$route.query.code_two,
          en_nickname: this.$route.query.shipping_to_en
        },
        this.form.shipping_to = this.$route.query.shipping_to
        this.form.shipping_to_en = this.$route.query.shipping_to_en
        this.form1.weight = Number(this.$route.query.weight).toFixed(2)
        this.totalWeight = Number(this.$route.query.weight).toFixed(2)
        this.form.weight = this.$route.query.weight
        setTimeout(()=>{
          this.Search(this.form,'1')
        })
      }

      getIpInfo().then((req)=>{
        if(req.data.info[0].countryCode == "CN"){
          this.destinationItem = {
            zh_cn_nickname: '美国',
            code_two: 'US',
            en_nickname: 'United States'
          }
          this.form.shipping_to = '美国'
          this.form.shipping_to_en = 'United States'
          this.shipping_to_enSearch = 'United States'
          this.Search(this.form,'1')
        }else{
          for(let i=0;i<this.destinationList.length;i++){
            if(this.destinationList[i].code_two == req.data.info[0].countryCode){
              this.destinationItem = {
                zh_cn_nickname: this.destinationList[i].zh_cn_nickname,
                code_two: this.destinationList[i].code_two,
                en_nickname: this.destinationList[i].en_nickname
              }
              this.form.shipping_to = this.destinationList[i].zh_cn_nickname
              this.form.shipping_to_en = this.destinationList[i].en_nickname
              this.shipping_to_enSearch = this.destinationList[i].en_nickname
              this.Search(this.form,'1')
              break;
            }
          }
        }
      })
    })
    getRecommendedDestinationPort().then((res)=>{
      this.toPorts = res.data
      this.endSearch = res.data[0].countryName
    })
    this.searchAllPrice()
    // getPrice({
    //   start_port: this.fromPort,
    //   end_port: '美国,菲尼克斯,Phoenix-America',
    //   start_en: this.fromSearch,
    //   end_en: 'Phoenix',
    //   manage_id: this.form.manage_id,
    //   pageIndex: 1,
    //   pageCount: 30,
    // }).then((res)=>{
    //   let alist = res.data.transportBoxData
    //   let arr = [[alist[0]]]
    //   for(let i=0;i<alist.length;i++){
    //     if(i>0){
    //       if(alist[i-1].start_port == alist[i].start_port && alist[i-1].end_port == alist[i].end_port){
    //         arr[arr.length-1].push(alist[i])
    //       }else{
    //         arr.push([alist[i]])
    //       }
    //     }
    //   }
    //   this.list = arr
    // })
    dayjs.extend(localizedFormat)
  },
  destroyed() { 
    document.removeEventListener('click', this.even, true) 
  },
  methods:{
    surchargeModal(){
      this.$refs.surcharge.init(this.surchargeList)
    },
    even(e){
      if(!this.$refs.OriginSelect.contains(e.target)){
        this.OriginShow = false
        this.shippingFrom = ''
        this.$refs.fromSearchs.style = 'display:none;'
        this.$refs.originPanel.style = 'opacity:1;'
      }
      if(!this.$refs.DestinationSelect.contains(e.target)){
        this.shippingTo = ''
        this.$refs.destinationPanel.style = 'opacity:1;'
        this.$refs.toSearchs.style = 'display:none;'
        this.destinationShow = false
      }
      if(!this.$refs.LoadSelect.contains(e.target)){
        this.LoadShow = false
      }
      if (!this.$refs.froms.contains(e.target)) {
        this.fromShows = false
      }
      if (!this.$refs.to.contains(e.target)) {
        this.toShow = false
      }
      if (!this.$refs.toCountry.contains(e.target)) {
        this.toShows = false
      }
    },
    selectFrom(e){
      this.form.shipping_from_en = e.area_merger_name_en
      this.form.shipping_from = e.id
      this.shippingFrom = ''
      this.OriginShow = false
      this.$refs.fromSearchs.style = 'display:none;'
      this.$refs.originPanel.style = 'opacity:1;'
    },
    openOrigin(){
      this.OriginShow = true
      this.$refs.originPanel.style = 'opacity:0.4;'
      this.$refs.fromSearchs.style = 'display:block;'
      this.$refs.from.focus()
    },
    openDestination(){
      this.destinationShow = true
      this.$refs.destinationPanel.style = 'opacity:0.4;'
      this.$refs.toSearchs.style = 'display:block;'
      this.$refs.toCountrys.focus()
    },
    delLoad(e){
      if(this.unitBox.length > 1){
        this.unitBox.splice(e, 1)
        this.loadSuccess()
      }
    },
    copyLoad(e){
      let a = JSON.parse(JSON.stringify(this.unitBox[e]))
      this.unitBox.splice(e, 0, a)
      this.loadSuccess()
    },
    addLoad(){
       let a = {
        long: null,
        width: null,
        height: null,
        weight: null,
        num: null,
        right: false
      }
      this.unitBox.push(a)
      this.loadSuccess()
    },
    clearLoad(){
      if(this.calculationMethod == 2){
        this.unitBox = [{
          long: null,
          width: null,
          height: null,
          weight: null,
          num: null,
          right: true,
        }]
      }else{
        this.form1.size = null
        this.form1.weight = null
        this.form1.num = null
      }
      this.LoadSuccess = false
    },
    confirmLoad(){
      if(this.calculationMethod == 1){
        this.$validator.validate('totalWeight')
      }else{
        this.loadSuccess()
      }
      if(this.LoadSuccess){
        this.LoadShow = false
        if(!this.OriginSuccess){
          this.OriginShow = true
        }else if(!this.DestinationSuccess){
          this.DestinationShow = true
        }else if(!this.GoodsSuccess){
          this.GoodsShow = true
          if(this.typeFirst){
            // this.chooseType()
          }
        }
      }
    },
    Search(e,n){
      if(n != 1){
        if(n == 2){
          this.form = JSON.parse(JSON.stringify(e))
        }else{
          this.form = e
        }

        if(this.form.take == 1){
          this.sort1 = true
        }else{
          this.sort1 = false
        }

        if(this.form.product_one == 1){
          this.sort2 = true
        }else{
          this.sort2 = false
        }

        if(this.form.not_fba_address == 1){
          this.sort3 = true
        }else{
          this.sort3 = false
        }

        if(this.form.take == '1'){
          this.ispickup = true
        }else{
          this.ispickup = false
        }
        this.OriginSuccess = true

        if(this.form.insurance == '1'){
          this.buyinsurance = true
        }else{
          this.buyinsurance = false
        }
        for(let cn = 0; cn < this.destinationList.length; cn++){
          if(this.form.shipping_to_en == this.destinationList[cn].en_nickname){
            this.destinationItem = this.destinationList[cn]
          }
        }
        this.destinationCity = this.form.shipping_to_zipcode
        this.shippingFrom = this.form.shipping_from_en
        this.fbaCode = this.form.fba_code
        this.DestinationSuccess = true

        //Load
        this.calculationMethod = this.form.load_type
        if(this.form.load_type == '1'){
          this.form1.size = this.form.volume
          this.form1.size_unit = this.form.volume_unit
          this.form1.weight = this.form.weight
          this.form1.weight_unit = this.form.weight_unit
          this.form1.num = this.form.total
        }else{
          this.form1.size_unit = this.form.volume_unit
          this.form1.weight_unit = this.form.weight_unit
          this.unitBox = []
          let vo = this.form.volume.split('-')
          let we = this.form.weight.split(',')
          let to = this.form.total.split(',')
          for(let bn=0;bn<vo.length;bn++){
            let boxsize = ''
            let box = {
              long: null,
              width: null,
              height: null,
              weight: null,
              num: null,
            }
            boxsize = vo[bn].split(',')
            box.long = boxsize[0]
            box.width = boxsize[1]
            box.height = boxsize[2]
            box.weight = we[bn]
            box.num = to[bn]
            this.unitBox.push(box)
          }
        }
        this.loadSuccess()
      }
      
      if(this.DestinationSuccess && this.LoadSuccess){
        this.$refs.destinationTitle.style = 'color:#191b23;'
        this.$refs.loadTitle.style = 'color:#191b23;'
          if(n==3){
            this.form = e
          }
          this.showLoad = true
          this.resultShows = false
          this.shippingList = []
          this.ddpList = []
          getCost(this.form).then((res)=>{
            res.data.forEach(v=>{
              v['itemin']=false
              v['itemopen']=false
            })
            this.resultShows = true
            this.shippingList = res.data
            this.bestRates = this.shippingList.slice(0, 2)
            this.shippingListss = res.data
            this.forms = JSON.parse(JSON.stringify(this.form))
            // this.sortPrice()
            this.sortby = null
            this.sortMethod = null
            this.shipping_toSearch = this.form.shipping_to
            this.shipping_to_enSearch = this.form.shipping_to_en
            setTimeout(()=>{
              this.priceType = 1
              this.result = true
              this.showLoad = false
            },10)
          })
      }
      if(!this.DestinationSuccess){
        this.$refs.destinationTitle.style = 'color:#ef4444;'
        this.openDestination()
      }
      if(!this.LoadSuccess){
        this.$refs.loadTitle.style = 'color:#ef4444;'
        if(!this.DestinationSuccess){
          this.openDestination()
        }else{
          this.LoadShow = true
        }
      }
    },
    originCity(){
      if(this.shippingFrom!=''){
        this.$refs.originPanel.style = 'opacity:0;'
        getStart({n_search: this.shippingFrom}).then((res)=>{
          this.fromList = res.data
          // this.fromList.forEach(e=>{
          //   e.area_merger_name_en = e.area_merger_name_en.replace(this.shippingFrom, `<font color='#409eff'>${this.shippingFrom}</font>`)
          // })
          const replaceReg = new RegExp(this.shippingFrom, 'ig')
          const upperCase = /^[A-Z]+$/
          for (const i in this.fromList) {
            if (replaceReg.test(this.fromList[i].area_merger_name_en)) {
              this.fromList[i].area_merger_name_en.match(replaceReg).map(item => {
                if (upperCase.test(item)) {
                  this.fromList[i].valueBright = this.fromList[i].area_merger_name_en.replace(replaceReg, `<span style="color:#e66a10">${this.shippingFrom.toUpperCase()}</span>`)
                } else {
                  this.fromList[i].valueBright = this.fromList[i].area_merger_name_en.replace(replaceReg, `<span style="color:#e66a10">${this.shippingFrom}</span>`)
                }
              })
            } else {
              this.fromList[i].valueBright = this.fromList[i].area_merger_name_en
            }
          }
          this.fromShow = true
          // this.originSuccess()
        })
      }else{
        this.$refs.originPanel.style = 'opacity:0.4;'
      }
    },
    originCity1(){},
    seCountry(){
      this.$refs.selectCountry.Search(this.shippingTo)
      if(this.shippingTo != ''){
        this.$refs.destinationPanel.style = 'opacity:0;'
      }
    },
    selectDestination(data, show) {
      this.shippingTo = ''
      this.$refs.destinationPanel.style = 'opacity:1;'
      this.$refs.toSearchs.style = 'display:none;'
      this.destinationItem = data
      this.destinationShow = false
      this.form.shipping_to = data.zh_cn_nickname
      this.form.shipping_to_en = data.en_nickname
      this.destinationCity = ''
      this.form.shipping_to_zipcode = ''
      this.DestinationSuccess = true
      this.$refs.destinationTitle.style = 'color:#191b23;'
    },
    loadSuccess(e){
      this.form.load_type = this.calculationMethod
      if(this.calculationMethod == 1){
        this.form.volume = this.form1.size
        this.form.weight = this.form1.weight
        this.form.total = this.form1.num
        // if(this.form1.size>0 && this.form1.weight>0){
        if(this.form1.weight>0){
          this.totalBoxes = Number(this.form1.num).toFixed(0)
          this.totalVolumn = Number(this.form1.size).toFixed(2)
          this.totalWeight = Number(this.form1.weight).toFixed(2)
          this.LoadSuccess = true
          this.$refs.loadTitle.style = 'color:#191b23;'
        }else{
          this.LoadSuccess = false
        }
      }else{
        let volumn = 0
        let Weight = 0
        let num = 0
        let formVolume = []
        let formWeight = []
        let formNum = []
        for(let n=0;n<this.unitBox.length;n++){
          formVolume.push(`${this.unitBox[n].long},${this.unitBox[n].width},${this.unitBox[n].height}`)
          formWeight.push(this.unitBox[n].weight)
          formNum.push(this.unitBox[n].num)
          if(this.unitBox[n].long>0 && this.unitBox[n].width>0 && this.unitBox[n].height>0 &&
          this.unitBox[n].weight>0 && this.unitBox[n].num>0){
            this.unitBox[n].right = true
            if(this.form1.size_unit == 1){
              volumn += Number(this.unitBox[n].long * this.unitBox[n].width * this.unitBox[n].height/1000000) * Number(this.unitBox[n].num)
            }else{
              volumn += Number(this.unitBox[n].long * this.unitBox[n].width * this.unitBox[n].height/1728) * Number(this.unitBox[n].num)
            }
            Weight += Number(this.unitBox[n].weight) * Number(this.unitBox[n].num)
            // if(this.unitBox[n].num>0){
              num += Number(this.unitBox[n].num)
            // }
            this.LoadSuccess = true
            this.$refs.loadTitle.style = 'color:#191b23;'
          }else{
            this.LoadSuccess = false
            this.unitBox[n].right = false
          }
        }
        this.form.volume = formVolume.join('-')
        this.form.weight = formWeight.join(',')
        this.form.total = formNum.join(',')
        this.totalVolumn = Number(volumn).toFixed(2)
        this.totalWeight = Number(Weight).toFixed(2)
        this.totalBoxes = Number(num).toFixed(0)
      }
    },
    chooseLoadUnit1(){
      this.form1.size_unit = this.form1.weight_unit
      this.form.volume_unit = this.form1.weight_unit
      this.form.weight_unit = this.form1.weight_unit
      this.loadSuccess()
    },
    chooseLoadUnit(){
      this.form1.weight_unit = this.form1.size_unit
      this.form.volume_unit = this.form1.size_unit
      this.form.weight_unit = this.form1.size_unit
      this.loadSuccess()
    },
    nologin(){
      if(localStorage.getItem("islogin")){
        let booking = JSON.parse(localStorage.getItem("dtd"))
        this.Search(booking,3)
        localStorage.removeItem("dtd")
        localStorage.removeItem("islogin")
      }
    },
    bookingOrder(e,type){
      if(this.$store.state.user.token){
        this.freight_good = e
        console.log(this.freight_good);
        
        this.orderType = 2
        this.Orders(type)
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
    Orders(type){
      // if(this.orderType == 1){
      //   this.$refs.Modal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      //   this.$refs.quickModal.style = 'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
      // }else{
        let iso2 = ''
        for(let n=0;n<this.destinationList.length;n++){
          if(this.shipping_to_enSearch.toUpperCase() == this.destinationList[n].en_nickname.toUpperCase()){
            if(this.destinationList[n].code_two == 'USA'){
              iso2 = 'US'
            }else{
              iso2 = this.destinationList[n].code_two
            }
            break;
          }
        }
        let a = {
          tax: this.freight_good.tax,
          freight: this.freight_good.freight,
          aging_start: this.freight_good.aging_start,
          aging_end: this.freight_good.aging_end,
          unit_price: this.freight_good.unit_price,
          add_price: this.freight_good.add_price,
          opera_price: this.freight_good.opera_price,
          product: this.freight_good.product_name_e,
          transport_type: this.freight_good.transport_type,
          freight_good: this.freight_good.id,
          take_fee: this.freight_good.take_fee,
          product_info: this.form,
          not_fba_address_fee: this.freight_good.not_fba_address_fee,
          product_fee: this.freight_good.product_fee,
          iso: iso2
        }
        if(type == 'quick'){
          a.weight = this.freight_good.weight
          a.iso = this.freight_good.code_two
        }
        localStorage.setItem("orderRouter", JSON.stringify(a))
        this.$router.push({
          name: 'reqOrder',
        })
      // }
    },
    closeModal(){
      this.$refs.mask.style = 'display:none;opacity:0;'
      this.$refs.nologinModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
    },
    tologin(){
      this.$router.push('/login')
    },
    fclPdf(){
      let alist = this.fclSelect.slice(0, 3)
      for(let i=0;i<alist.length;i++){
        if(this.sizeType == 1){
          alist[i].freight = Number(alist[i].super_gp20) + Number(this.fclPrice)
          alist[i].size = '20GP'
          alist[i].qty = this.fclNum
          alist[i].freight_total = alist[i].freight * Number(this.fclNum)
        }else if(this.sizeType == 2){
          alist[i].freight = Number(alist[i].super_gp40) + Number(this.fclPrice)
          alist[i].size = '40GP'
          alist[i].qty = this.fclNum
          alist[i].freight_total = alist[i].freight * Number(this.fclNum)
        }else{
          alist[i].freight = Number(alist[i].super_hq40) + Number(this.fclPrice)
          alist[i].size = '40HQ'
          alist[i].qty = this.fclNum
          alist[i].freight_total = alist[i].freight * Number(this.fclNum)
        }
      }
      this.fclModal = false
      this.$refs.fcl.init(
        alist,
        this.fclInfo,
        dayjs().format('LL')
      )
    },
    viewddp(){
      if(this.ddpList.length > 0){
        this.ddpModal = true
      }else{
        this.$message({
          message: 'Please select 1~3 pieces of price',
          offset: 70,
        })
      }
    },
    pdfModal(){
      let infos = []
      let weight = this.forms.weight + this.weightUnit[this.forms.weight_unit - 1]
      infos.push(weight)
      if(this.forms.volume != ''){
        let volume = this.forms.volume + this.volumnUnit[this.forms.volume_unit - 1]
        infos.push(volume)
      }
      if(this.forms.total != ''){
        let total = this.forms.total + 'Boxes'
        infos.push(total)
      }
      let alist = JSON.parse(JSON.stringify(this.ddpList))
      for(let i=0;i<alist.length;i++){
        alist[i].add_unit_price = (Number(alist[i].add_unit_price) + Number(this.ddpPrice)).toFixed(2)
        alist[i].super_freight = (Number(alist[i].super_freight) + Number(this.ddpPrice) * Number(this.forms.weight)).toFixed(2)
      }
      this.ddpModal = false
      this.$refs.ddp.init({
        date: dayjs().format('LL'),
        remark:`1：This is the latest price. If the goods are still in production, please confirm the price with us before shipping!
2：The size and weight data of the goods shall be based on the machine scanning measurement when entering our warehouse!
3：Please contact us to obtain the warehouse id before shipping. Thank you for your cooperation!
4：The U.S.A customs inspection fee: at cost`,
        info: infos.join(', '),
        priceList: alist
      })
    },
    ddpSelection(val){
      if(val.length>3){
        this.ddpList = val.slice(0, 3)
      }else{
        this.ddpList = val
      }
    },
    getDeparture(){
      getPort({
        name: this.fromSearch,
        is_start: 1,
        is_end: 0
      }).then((res)=>{
        this.fromLists = res.data
        this.fromShows = true
      })
      this.fromCountrySearch = ''
    },
    selectDeparture(a){
      this.fromShows = false
      this.fromSearch = a.cityName
      this.fromPort = a.port
      this.fromCountrySearch = ''
    },
    delFrom(){
      this.fromSearch = ''
      this.fromPort = ''
      this.$refs.froms.focus()
    },
    selectDepartures(){
      this.fromSearch = ''
      this.fromPort = ''
    },
    getCountry(){
      getEndCountry({
        name: this.endSearch,
      }).then((res)=>{
        this.toCountryList = res.data
        this.toShows = true
      })
    },
    selectCountrys(a){
      this.toShows = false
      this.endSearch = a.countryName
      this.toCountry = a.country_cn
      this.toSearch = ''
      this.toPort = ''
    },
    delTos(){
      this.endSearch = ''
      this.toCountry = ''
      this.$refs.toCountry.focus()
    },
    getDestination(){
      getPort({
        name: this.toSearch,
        is_start: 0,
        is_end: 1,
        end_country: this.endCountry
      }).then((res)=>{
        this.toList = res.data
        // if(this.countryFirst){
        //   this.selectDestinations(res.data[0],1)
        //   this.countryFirst = false
        // }else{
        this.toShow = true
        // }
      })
    },
    selectDestinations(a){
      this.toShow = false
      this.toSearch = a.cityName
      this.toPort = a.port
      this.endSearch = ''
      this.toCountry = ''
      // if(b==1){
      //   this.searchAllPrice()
      // }
    },
    delTo(){
      this.toSearch = ''
      this.toPort = ''
      this.$refs.to.focus()
    },
    searchAllPrice(item,n){
      if(n==3){
        this.fromPort = item.start_port
        this.toPort = item.end_port
      }
      this.list = []
      this.fclSelect = []
      // this.loadingShow = true
      this.resultShow = false
      getPrice({
        start_port: this.fromPort,
        end_port: this.toPort,
        start_en: this.fromSearch,
        end_en: this.toSearch,
        country: this.toCountry,
        manage_id: this.form.manage_id,
        pageIndex: 1,
        pageCount: 30,
      }).then((res)=>{
        this.resultShow = true
        if(res.data.transportBoxData.length>0){
          let alist = res.data.transportBoxData
          this.surchargeList = res.data.surcharge
          let arr = [[alist[0]]]
          for(let i=0;i<alist.length;i++){
            if(i>0){
              if(alist[i-1].start_port == alist[i].start_port && alist[i-1].end_port == alist[i].end_port){
                arr[arr.length-1].push(alist[i])
              }else{
                arr.push([alist[i]])
              }
            }
          }
          this.list = arr
        }
      })
    },
    viewfcl(){
      if(this.fclSelect.length > 0){
        this.fclModal = true
      }else{
        this.$message({
          message: 'Please select 1~3 pieces of price',
          offset: 70,
        })
      }
    },
    booking(item){
      if(this.$store.state.user.token){
        this.$router.push({
          name: 'FCLbooking',
          params: {list: JSON.stringify(item)}
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
    tableRowClassName({row, rowIndex}) {
      return 'normal-row';
    },
  }
};
</script>

<style lang="postcss" scoped>
.w-1-8{
  width: calc(100% / 8);
}
.w-7-24{
  width: calc(100% / 24 * 7);
}
.Select{
  @apply h-10 w-full bg-white hover:bg-selectOpen dark:bg-darkMain dark:border-darkMain border border-inputBorder rounded px-3 py-2 text-base cursor-pointer relative;
}

.selectOpen{
  @apply bg-selectOpen !important;
}

input{
  @apply text-sm !important;
}

.modeltext{
  @apply ml-5 list-disc text-sm md:text-lg;
}

.modeltext>li{
  @apply pb-3;
}

.switch {
  @apply appearance-none w-16 h-8 relative rounded-2xl cursor-pointer bg-gray-200;
}

.switch:before {
  @apply absolute w-7 h-7 bg-white shadow-sm left-0.5 top-0.5 rounded-full origin-left duration-300 ease-out;
  content: "";
}

.switch:after {
  @apply inline-block whitespace-nowrap text-white font-bold;
  text-indent: 12px;
  word-spacing: 4px;
  font: 14px/30px monospace;
}

.switch:checked {
  @apply bg-switch;
}

.switch:checked:before {
  left: 34px;
}

.switch:checked:after {
  @apply text-black;
}

.bookingSearch{
  @apply col-span-3 md:col-span-1 border-gray-300 dark:border-darkLine hover:bg-gray-200 cursor-pointer relative;
}

.searchItem{
  @apply absolute p-5 bg-white dark:bg-darkMenu shadow-md rounded cursor-default;
}

.confirmBtn{
  @apply py-1.5 px-4 text-white bg-orange hover:bg-orange1 rounded;
}

.searchPort{
  @apply absolute z-10 p-0 w-80 max-h-52 h-auto top-16 left-0 text-sm rounded bg-white shadow-md overflow-auto;
}

.searchPort::-webkit-scrollbar,.searchPorts::-webkit-scrollbar {
  width: 6px;
}

.searchPort::-webkit-scrollbar-thumb,.searchPorts::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.searchPort::-webkit-scrollbar-track,.searchPorts::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}

.searchPorts{
  @apply absolute z-10 p-0 w-96 max-h-52 h-auto top-10 left-0 text-sm rounded bg-white shadow-md overflow-auto;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.Checkbox {
  @apply flex justify-center items-center border border-gray-400 rounded mr-1.5 w-4 h-4;
}

.sortItem {
  @apply my-1 mr-2 py-1 px-3 rounded hover:bg-gray-100 flex items-center cursor-pointer select-none relative;
}

.inputTips {
  @apply left-0 text-xs text-red-500 absolute;
}

.loading{
  @apply mb-4 rounded bg-gray-200 relative;
  animation: loading 5s infinite;
}

@keyframes loading{
  0% {
    opacity: 1;
  }
  50% {
    opacity: .6;
  }
  100% {
    opacity: 1;
  }
}

.swiper-container{
  z-index: 0;
}

.StatementIndemnity>div::-webkit-scrollbar {
  width: 6px;
}

.StatementIndemnity>div::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.StatementIndemnity>div::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
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

.selectLabel {
  @apply w-1/2 lg:w-13% flex justify-center my-1;
}
</style>

<style>
  .el-table .normal-row {
    background: #E9EFF5;
  }

  .el-table td.el-table__cell,.el-table th.el-table__cell.is-leaf{
    border-bottom: 1px solid #fff;
  }

  .el-table--border .el-table__cell, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right: 1px solid #fff;
  }

  .el-table .el-table__cell{
    padding: 4px 0;
  }
</style>