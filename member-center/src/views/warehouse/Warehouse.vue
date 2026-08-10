<template>
  <div class="w-full h-full relative">
    <div ref="mask" class="mask" @click="closeModal"></div>
    <div ref="requestModal" class="modal opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3 px-5">
        <div class="text-xl">Request a space</div>
        <img id="closeImg"
             class="closeModal"
             @click="closeModal"
             src="../../assets/close.svg"
             alt="">
      </div>
      <div class="pt-5 px-5 border-b border-gray-200 dark:border-darkLine">
        <div class="grid grid-cols-2 gap-5">
          <div class="col-span-2 sm:col-span-1">
            <label>Warehouse Location</label>
            <select v-model="reqList.site" name="location" class="select h-42px">
              <option value="1">Shenzhen</option>
              <option value="2">Yiwu</option>
            </select>
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label>Total number of packages</label>
            <input type="number" min="0"
              onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
              class="input"
              v-model="reqList.num"
              v-validate="'required|qty'"
              name="qty"
              value>
            <div class="inputTips">{{errors.first("qty")}}</div>
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label>Total weight</label>
            <div class="relative">
              <input type="number" min="0"
                class="input pr-12"
                v-model="reqList.weight"
                v-validate="'required|weight'"
                name="weight"
                value>
              <select name="weight" v-model="reqList.weight_unit"
                class="absolute bottom-1px right-1px rounded-r h-10 bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                <option value="1">KG</option>
                <option value="2">LB</option>
              </select>
            </div>
            <div class="inputTips">{{errors.first("weight")}}</div>
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label>Total volume - optional</label>
            <div class="relative">
              <input type="text" v-model="reqList.cube" class="input pr-16">
              <select name="volume" v-model="reqList.cube_unit"
                class="absolute bottom-1px right-1px rounded-r h-10 bg-gray-50 dark:bg-darkLine border-l border-inputBorder dark:border-darkMain flex-shrink-0 focus:outline-none">
                <option value="1">CBM</option>
                <option value="2">CBF</option>
              </select>
            </div>
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label>Estimated Time - optional</label>
            <input type="date" v-model="reqList.put_time" class="input h-42px">
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label>Courier Bill Number - optional</label>
            <input type="text" v-model="reqList.express_no" class="input">
          </div>
          <div class="col-span-2">
            <label>Product Type(multiple) - optional</label>
            <div ref="productTypeSelect" @click="productTypeShow = !productTypeShow"
              class="flex flex-wrap input min-h-42px items-center cursor-pointer select-none overflow-hidden">
              <div v-for="(i,n) in multiSelected" :key="n"
                class="mr-2 my-0.5 px-2 py-0.5 text-xs bg-yellow-100 rounded">{{ i.c_name }}</div>
            </div>
            <div class="relative">
              <multi-select v-show="productTypeShow"
              :selectList="multiple_choice"
              :selectOpen="productTypeShow"
              @selected="multiSelect"></multi-select>
            </div>
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label>Package Type - optional</label>
            <select name="packageType" class="select h-42px" v-model="reqList.package_type">
              <option value="1">box</option>
              <option value="2">carton</option>
            </select>
          </div>
          <div class="col-span-2">
            <label>Notes - optional</label>
            <textarea class="input resize-none" rows="3" v-model="reqList.remark"></textarea>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="btn1 my-5 mx-3 w-28"
                @click="cancelReq"
                :disabled="btnLoading">Cancel</button>
        <button class="btn my-5 mx-3 w-28"
                @click="submitModal()"
                v-show="!btnLoading">Request</button>
        <button class="btn my-5 mx-3 w-28" v-show="btnLoading">
          <svg class="animate-spin mx-auto my-0.5 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
            <circle class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"></circle>
            <path class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button> 
      </div>
    </div>
    <div ref="detailModal" class="modal opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3 px-5">
        <div class="text-xl">View details</div>
        <img id="closeImg"
             class="closeModal"
             @click="closeModal"
             src="../../assets/close.svg"
             alt="">
      </div>
      <div class="py-5 px-5 border-b border-gray-200 dark:border-darkLine">
        <div>
          <table class="w-full text-sm">
            <tr>
              <td class="detailTitle">Warehouse Location</td>
              <td>{{ siteList[details.site - 1] }}</td>
            </tr>
            <tr>
              <td class="detailTitle">Total number of packages</td>
              <td>{{ details.num }}</td>
            </tr>
            <tr>
              <td class="detailTitle">Total weight</td>
              <td>{{ details.weight_str }}</td>
            </tr>
            <tr>
              <td class="detailTitle">Total volume</td>
              <td>{{ details.cube_str }}</td>
            </tr>
            <tr v-if="details.status != 3 && details.status != 4">
              <td class="detailTitle">Estimated Time</td>
              <td>{{ details.put_time }}</td>
            </tr>
            <tr v-if="details.status == 3">
              <td class="detailTitle">Storage Time</td>
              <td>{{ details.updated_data }}</td>
            </tr>
            <tr v-if="details.status == 4">
              <td class="detailTitle">Outbound Time</td>
              <td>{{ details.updated_data }}</td>
            </tr>
            <tr>
              <td class="detailTitle">Package Type</td>
              <td>{{ packageType[details.package_type] }}</td>
            </tr>
            <tr>
              <td class="detailTitle">Product Type</td>
              <td>{{ details.product_type_name }}</td>
            </tr>
            <tr>
              <td class="detailTitle">Courier Bill Number</td>
              <td>{{ details.express_no }}</td>
            </tr>
            <tr v-if="details.status == 3">
              <td class="detailTitle">Storage Number</td>
              <td>{{ details.shipment_no }}</td>
            </tr>
            <tr>
              <td class="detailTitle">Notes</td>
              <td>{{ details.remark }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="btn my-5 mx-3 w-28"
                @click="closeModal">OK</button>
      </div>
    </div>
    <div ref="removeModal" class="modal opacity-20 bg-white dark:bg-darkMenu">
      <div class="flex justify-between border-b border-gray-200 dark:border-darkLine py-3 px-5">
        Tips
      </div>
      <div class="py-3 px-5 min-h-20">
        Are you sure you want to delete this request? After deletion, the requested information can not be recovered.
      </div>
      <div class="flex justify-end">
        <button class="btn1 my-5 mx-3 w-28"
                @click="closeModal" :disabled="btnLoading">Cancel</button>
        <button class="btn my-5 mx-3 w-28" v-show="!btnLoading"
                @click="removeWarehouse">Confirm</button>
        <button class="btn my-5 mx-3 w-28" v-show="btnLoading">
          <svg class="animate-spin mx-auto my-0.5 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
            <circle class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"></circle>
            <path class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>      
      </div>
    </div>
    <div ref="photoModal" class="modal bg-lightText bg-opacity-0">
      <div class="flex justify-end">
        <img @click="closeModal"
          src="../../assets/close.svg" class="w-10 h-10 cursor-pointer" alt="">
      </div>
      <!-- <div @click="closeModal" 
        class="bg-white bg-opacity-75 hover:bg-opacity-100 absolute right-0 top-0 w-11 h-11 cursor-pointer rounded-bl-full">
        <img src="../../assets/close1.svg" class="w-7 h-7 ml-3 mt-1" alt="">
      </div> -->
      <div class="bg-lightText rounded overflow-hidden" >
        <img class="modalPic" v-for="(item,index) in picList"
          :class="{ picCurrent: ispic == index }"
          :src="item" alt="">
      </div>
      <div @click="picLeftfun"
        class="bg-white bg-opacity-75 hover:bg-opacity-100 absolute select-none left-0 top-picLeft w-16 h-16 p-4 cursor-pointer">
        <img src="../../assets/arrowLeft.svg" class="w-8 h-8" alt="">
      </div>
      <div @click="picRightfun"
        class="bg-white bg-opacity-75 hover:bg-opacity-100 absolute select-none right-0 top-picLeft w-16 h-16 p-4 cursor-pointer">
        <img src="../../assets/arrowRight.svg" class="w-8 h-8" alt="">
      </div>
    </div>

    <div class="w-full max-w-1600 m-auto h-full p-3 sm:p-5 overflow-scroll text-menu dark:text-darkText">
      <!-- <div class="flex flex-col xl:flex-row">
        <div class="w-full mr-3 px-3 py-2 leading-4 flex flex-col xl:flex-row justify-between items-start xl:items-center bg-warehouseAddress text-13 rounded-md shadow-default">
          <div class="flex flex-col xl:flex-row items-start xl:items-center">
            <img src="../../assets/warehouseA.svg" class="mb-1 xl:mb-0 mr-0 xl:mr-4" alt="">
            <div class="mb-1 xl:mb-0 mr-0 xl:mr-4"><b>Warehouse address:</b> 111111 Bantian Street, Longgang District, Shenzhen,Guangdong Province</div>
            <div class="mb-1 xl:mb-0 mr-0 xl:mr-4"><b>Customer service call:</b> +86-1234567890</div>
            <div class="mb-1 xl:mb-0 mr-0 xl:mr-4"><b>Name:</b> Vivi</div>
            <div class="mb-1 xl:mb-0 mr-0 xl:mr-4"><b>Postcode:</b> 518000</div>
          </div>
          <button @click="copyInfo" class="bg-white hover:bg-gray-100 hover:shadow-inner py-1 px-3.5 rounded-md">Copy</button>
        </div>
        <div class="mt-2 xl:mt-0 flex-shrink-0 w-full sm:w-44">
          <button class="w-full h-full py-1.5 rounded-md text-white bg-orange hover:bg-orange1"
            @click="requestSpace">Request a space</button>
        </div>
      </div> -->
      <div class="hidden xl:flex mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default overflow-hidden">
        <div class="tab"
          :class="{ tabs: istab == '0' }"
          @click="tabfun(0)">
          <div>All requests</div>
          <div class="qty">{{ count.status_0 }}</div>
        </div>
        <div class="tab"
          :class="{ tabs: istab == '1' }"
          @click="tabfun(1)">
          <div>In Review</div>
          <div class="qty">{{ count.status_1 }}</div>
        </div>
        <div class="tab"
          :class="{ tabs: istab == '2' }"
          @click="tabfun(2)">
          <div>Approved</div>
          <div class="qty">{{ count.status_2 }}</div>
        </div>
        <div class="tab"
          :class="{ tabs: istab == '3' }"
          @click="tabfun(3)">
          <div>In storage</div>
          <div class="qty">{{ count.status_3 }}</div>
        </div>
        <div class="tab"
          :class="{ tabs: istab == '4' }"
          @click="tabfun(4)">
          <div>Processed</div>
          <div class="qty">{{ count.status_4 }}</div>
        </div>
        <div class="tab"
          :class="{ tabs: istab == '5' }"
          @click="tabfun(5)">
          <div>Cancelled</div>
          <div class="qty">{{ count.status_5 }}</div>
        </div>
        <div class="tab"
          :class="{ tabs: istab == '6' }"
          @click="tabfun(6)">
          <div>Rejected</div>
          <div class="qty">{{ count.status_6 }}</div>
        </div>
      </div>
      <div class="xl:hidden flex items-center mt-4">
        <div class="mr-3 font-semibold">select status</div>
        <div class="w-200">
          <select @change="tabfun(istab)" v-model="istab"
            name="warehouseStatus" class="select dark:bg-darkMenu">
            <option value="0">All requests</option>
            <option value="1">In Review</option>
            <option value="2">Approved</option>
            <option value="3">In storage</option>
            <option value="4">Processed</option>
            <option value="5">Cancelled</option>
            <option value="6">Rejected</option>
          </select>
        </div>
      </div>

      <div v-show="warehouseList.length == 0" class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
        <div>
          <img src="../../assets/noWarehouse.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
          <div class="mt-5 text-base text-center font-semibold">no request</div>
        </div>
      </div>

      
      <div class="hidden xl:block mt-3 text-sm mb-28">
        <div v-for="(i,n) in warehouseList" :key="n"
          class="mb-3 rounded-md shadow-default overflow-hidden">
          <div v-if="i.status != 3 && i.status != 4">
            <div class="p-3 flex bg-warehouseList dark:bg-darkLine border-b border-gray-200 dark:border-darkLine">
              <div class="w-12%">Warehouse Location</div>
              <div class="w-1/12">Request ID</div>
              <div class="w-1/12">Request Time</div>
              <div class="w-1/12">Status</div>
              <div class="w-1/12">Total weight</div>
              <div class="w-2/12">Total Volume</div>
              <div class="w-2/12">Total number of packages</div>
              <div class="w-14%">Estimated time</div>
              <div class="w-1/12">Actions</div>
            </div>
            <div class="p-3 flex bg-white dark:bg-darkMenu">
              <div class="w-12%">{{ siteList[i.site - 1] }}</div>
              <div class="w-1/12">{{ i.request_no }}</div>
              <div class="w-1/12">{{ i.created_data }}</div>
              <div class="w-1/12">
                <div class="flex">
                  <div class="px-5 py-1.5 bg-black text-white rounded">{{ statusList[i.status] }}</div>
                </div>
              </div>
              <div class="w-1/12">{{ i.weight_str }}</div>
              <div class="w-2/12">{{ i.cube_str }}</div>
              <div class="w-2/12">{{ i.num }}</div>
              <div class="w-14%">{{ i.put_time }}</div>
              <div class="w-1/12 flex flex-col text-13">
                <button class="detailbtn" @click="detailModal(n)">Details</button>
                <!-- <button class="cancelbtn mt-1">Modify</button> -->
                <button v-if="i.status == 2" class="detailbtn mt-1" @click="downloadBq(n)">Download</button>
                <button class="cancelbtn mt-1" @click="removeModal(i.id)">Cancel</button>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="p-3 flex items-center justify-between bg-warehouseList border-b border-gray-200 dark:bg-darkLine dark:border-darkLine">
              <div class="flex">
                <div class="pr-14">{{ i.created_data }}</div>
                <div class="pr-14">Request ID: {{ i.request_no }}</div>
                <div class="pr-14">{{ siteList[i.site - 1] }}</div>
                <div>Enquiry number: {{ i.booking_no }}</div>
              </div>
              <div class="w-1/12 text-13">
                <button class="detailbtn w-full" @click="detailModal(n)">Details</button>
              </div>
            </div>
            <div class="px-3 pb-3 bg-white flex dark:bg-darkMenu">
              <!-- <div class="w-28 flex-shrink-0">
                <div class="text-13 py-3">Package detail:</div>
                <img v-if="i.package_info.length > 0" :src="i.package_info[0].product_img[0]" class="w-28 h-28 rounded-md" alt="">
              </div> -->
              <div class="w-full">
                <!-- <div class="flex mb-1">
                  // <div class="w-4/12 mt-10 pl-3 pr-6">
                    <div v-for="(z,x) in i.package_info" :key="x" class="pt-2">
                      <div>Storage number: {{ z.shipment_no }}</div>
                      <div v-if="i.package_info.length > 0" class="mt-3 flex">
                        <img v-for="(item,index) in z.product_img" :key="index" @click="photoModal(index,z.product_img)"
                          :src="item" class="w-12 h-12 rounded-md mr-1.5 cursor-pointer" alt="">
                      </div>
                    </div>
                  </div> 
                  
                  <div class="w-4/12 mt-10 pl-3 pr-6"></div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Status</div>
                    <div class="flex">
                      <div class="px-5 py-1.5 bg-black text-white rounded">{{ statusList[i.status] }}</div>
                    </div>
                  </div>
                  <div class="w-12%">
                    <div class="text-13 py-3">Total Weight</div>
                    <div>{{ i.weight_str }}</div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Total Volume</div>
                    <div>{{ i.cube_str }}</div>
                  </div>
                  <div v-if="i.status == 3" class="w-12%">
                    <div class="text-13 py-3">Storage time</div>
                    <div>{{ i.updated_data }}</div>
                  </div>
                  <div v-if="i.status == 4" class="w-12%">
                    <div class="text-13 py-3">Outbound time</div>
                    <div>{{ i.updated_data }}</div>
                  </div>
                  <div class="w-1/12 text-right">
                    <div class="text-13 py-3">Inbound Days</div>
                    <div>{{ i.put_day }}</div>
                  </div>
                </div> -->

                <div class="flex hover:bg-gray-100" v-for="(z,x) in i.package_info" :key="x">
                  <div class="w-4/12 mt-2 pl-3 pr-6">
                    <div class="py-1">
                      <div>Storage number: {{ z.shipment_no }}</div>
                      <div v-if="i.package_info.length > 0" class="mt-2 flex">
                        <img v-for="(item,index) in z.product_img" :key="index" @click="photoModal(index,z.product_img)"
                          :src="item" class="w-12 h-12 rounded-md mr-1.5 cursor-pointer" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">status</div>
                    <div class="flex">
                      <div class="px-5 py-1.5 bg-black text-white rounded">{{ statusList[i.status] }}</div>
                    </div>
                  </div>
                  <div class="w-12%">
                    <div class="text-13 py-3">Weight</div>
                    <div>{{ z.weight_str }}</div>
                  </div>
                  <div class="w-2/12">
                    <div class="text-13 py-3">Volume</div>
                    <div>{{ z.cube_str }}</div>
                  </div>
                  <div v-if="i.status == 3" class="w-12%">
                    <div class="text-13 py-3">Storage time</div>
                    <div>{{ z.put_time }}</div>
                  </div>
                  <div v-if="i.status == 4" class="w-12%">
                    <div class="text-13 py-3">Outbound time</div>
                    <div>{{ z.put_time }}</div>
                  </div>
                  <div class="w-1/12 text-right">
                    <div class="text-13 py-3">Inbound Days</div>
                    <div>{{ z.put_day }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="block xl:hidden mt-3 text-sm mb-28">
        <div v-for="(item,index) in warehouseList" :key="index"
          class="mb-3 p-3 bg-white dark:bg-darkMenu rounded-md shadow-default">
          <div v-if="item.status != 3 && item.status != 4">
            <div class="relative">
              <div class="font-semibold">ID: {{ item.request_no }}</div>
              <div>{{ siteList[item.site - 1] }}</div>
              <div class="my-1 flex">
                <div class="px-5 py-1.5 bg-black text-white rounded">{{ statusList[item.status] }}</div>
              </div>
              <div class="flex mt-2">
                <div class="mx-auto w-full max-w-416 flex justify-around">
                  <button class="detailbtn px-5" @click="detailModal(index)">Details</button>
                  <!-- <button class="cancelbtn px-5">Modify</button> -->
                  <button v-if="item.status == 2" class="detailbtn px-5">Download</button>
                  <button class="cancelbtn px-5" @click="removeModal(item.id)">Cancel</button>
                </div>
                <div class="w-6 flex-shrink-0"></div>
              </div>
              <div class="absolute bottom-0 right-0 w-6 h-6 flex justify-center items-center cursor-pointer" @click="item.show = !item.show">
                <img src="../../assets/down.svg" class="w-5 h-5" alt="">
              </div>
            </div>
            <div v-show="item.show" class="mt-3 pt-2 border-t border-gray-300 dark:border-darkLine">
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Request Time</div>
                <div>{{ item.created_data }}</div>
              </div>
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Estimated time</div>
                <div>{{ item.put_time }}</div>
              </div>
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Total Weight</div>
                <div>{{ item.weight_str }}</div>
              </div>
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Total Volume</div>
                <div>{{ item.cube_str }}</div>
              </div>
              <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                <div>Total number of packages</div>
                <div>{{ item.num }}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="relative">
              <div class="flex">
                <img v-if="item.package_info.length > 0" :src="item.package_info[0].product_img[0]" class="w-16 h-16 mr-2 flex-shrink-0 rounded-md" alt="">
                <div class="w-full">
                  <div class="font-semibold">{{ item.shipment_no }}</div>
                  <!-- <div>Cross-border cotton and linentablecloth fabric Nordic table</div> -->
                </div>
              </div>
              <div class="font-semibold">ID: {{ item.request_no }}</div>
              <div>{{ item.created_data }}</div>
              <div>{{ siteList[item.site - 1] }}</div>
              <div>{{ item.booking_no }}</div>
              <div class="mt-1">
                <button class="detailbtn px-6" @click="detailModal(index)">Details</button>
              </div>
              <div class="absolute right-0 bottom-0 w-6 h-6 flex justify-center items-center cursor-pointer"
                @click="item.show = !item.show">
                <img src="../../assets/down.svg" class="w-5 h-5" alt="">
              </div>
            </div>
            <div v-show="item.show" class="mt-3 border-t border-gray-300 dark:border-darkLine">
              <div class="mt-2 p-2 rounded-md">
                <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Total Weight</div>
                  <div>{{ item.weight_str }}</div>
                </div>
                <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Total Volume</div>
                  <div>{{ item.cube_str }}</div>
                </div>
                <div v-if="item.status == 3" class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Storage time</div>
                  <div>{{ item.updated_data }}</div>
                </div>
                <div v-if="item.status == 4" class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Outbound time</div>
                  <div>{{ item.updated_data }}</div>
                </div>
                <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Inbound Days</div>
                  <div>{{ item.put_day }}</div>
                </div>
                <div class="flex items-center p-1">
                  <div>Status</div>
                  <div class="ml-3 px-5 py-1.5 bg-black text-white rounded">{{ statusList[item.status] }}</div>
                </div>
              </div>

              <div v-for="(a,s) in item.package_info" :key="s"
                class="bg-lightMenu dark:bg-darkMain mt-2 p-2 rounded-md">
                <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Weight</div>
                  <div>{{ a.weight_str }}</div>
                </div>
                <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Volume</div>
                  <div>{{ a.cube_str }}</div>
                </div>
                <div v-if="item.status == 3" class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Storage time</div>
                  <div>{{ a.put_time }}</div>
                </div>
                <div v-if="item.status == 4" class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Outbound time</div>
                  <div>{{ a.put_time }}</div>
                </div>
                <div class="flex justify-between border-b border-gray-300 dark:border-darkLine p-1">
                  <div>Inbound Days</div>
                  <div>{{ a.put_day }}</div>
                </div>
                <div class="flex items-center p-1">
                  <div>Status</div>
                  <div class="ml-3 px-5 py-1.5 bg-black text-white rounded">{{ statusList[item.status] }}</div>
                </div>
                <div class="p-1">
                  <div>Product Photos</div>
                  <div v-if="item.package_info.length > 0" class="flex flex-wrap">
                    <img v-for="(items,indexs) in a.product_img" :key="indexs" @click="photoModal(indexs,a.product_img)"
                    :src="items" class="m-1.5 w-14 h-14 rounded-md cursor-pointer" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute" style="top: -999999px;left: -999999px;">
        <div ref="biaoqian" class="w-510 bg-white border-2 border-black">
          <div class="p-3 text-2xl text-center border-b-2 border-black">Freight Label</div>
          <div class="p-3 border-b-2 border-black flex justify-between">
            <div>Customer: {{ userName }}</div>
            <div>Package request time: {{ FreightLabel.created_data }}</div>
          </div>
          <div class="flex border-b-2 border-black">
            <div class="w-36 p-3 flex-shrink-0 border-r-2 border-black">
              <div>Package type</div>
              <div>{{ packageType[FreightLabel.package_type] }}</div>
            </div>
            <div class="p-3 w-full flex justify-between">
              <div>
                <div>Total qty</div>
                <div>{{ FreightLabel.num }}</div>
              </div>
              <div>
                <div>Total weight</div>
                <div>{{ FreightLabel.weight_str }}</div>
              </div>
              <div>
                <div>Total volume</div>
                <div>{{ FreightLabel.cube_str }}</div>
              </div>
            </div>
          </div>
          <div class="flex border-b-2 border-black">
            <div class="w-36 p-3 flex-shrink-0 border-r-2 border-black flex items-center">
              <div>Product type</div>
            </div>
            <div class="p-3 w-full">
              <div>{{ FreightLabel.product_type_name }}</div>
            </div>
          </div>
          <div class="flex">
            <div class="w-1/2 p-3 flex flex-col justify-between border-r-2 border-black">
              <div>
                <div>Remark:</div>
                <div>{{ FreightLabel.remark }}</div>
              </div>
              <div>Account Manager: {{ FreightLabel.customer_manage_name }}</div>
            </div>
            <div class="w-1/2 p-3">
              <div class="flex justify-center">
                <vue-qr ref="qrCode" :text="shipment_no" class="w-44 h-44" width="200" height="200" ></vue-qr>
              </div>
              <div>Freight number: {{ FreightLabel.shipment_no }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect'
import {
  reqWarehouse,
  getWarehouse,
  getSelData,
  delWarehouse
} from '@/api/warehouse'
import html2canvas from "html2canvas"
import VueQr from 'vue-qr'
export default {
  components: {
    MultiSelect,
    VueQr
  },
  data() {
    return {
      warehouseList: [],
      reqList: {
        site: 1,
        num: null,
        weight: null,
        weight_unit: 1,
        cube: '',
        cube_unit: 1,
        put_time: '',
        express_no: '',
        product_type: '',
        package_type: null,
      },
      statusList: ['All requests','In Review','Approved','In storage','Processed','Cancelled','Rejected'],
      siteList: ['Shenzhen','Yiwu'],
      packageType: ['','box','carton'],
      details: {},
      delete: null,
      count: {},
      istab: 0,
      show1: false,
      show2: false,
      btnLoading: false,
      picList: [
        // 'https://cbu01.alicdn.com/img/ibank/O1CN01A7vNpF1WEkiSpd1jF_!!2209751902757-0-cib.jpg',
        // 'https://cbu01.alicdn.com/img/ibank/O1CN01N1Hq7D1WEkiVAW0ic_!!2209751902757-0-cib.jpg',
        // 'https://cbu01.alicdn.com/img/ibank/O1CN01Y7RCSi1WEkiYuDAuV_!!2209751902757-0-cib.jpg',
      ],
      ispic: 0,
      multiple_choice:[],
      productTypeShow: false,
      multiSelected: [],
      copy: 'Warehouse address: 111111 Bantian Street, Longgang District, Shenzhen,Guangdong Province;Customer service call: +86-1234567890;Name: Vivi;Postcode: 518000',
      userName: '',
      shipment_no: '',
      FreightLabel:{
        // customer: '',
        // date: '',
        // packageType: '',
        // qty: '',
        // weight: '',
        // volume: '',
        // productType: '',
        // remark: '',
        // accountManager: '',
        // no: '',
      },
      customer_manage: {},
    }
  },
  created() {
    this.$emit('menu', 'Warehouse')
    this.WarehouseList(0)
    getSelData().then((res)=>{
      if(res.code == 0){
        res.data.forEach(item=>{
          Object.assign(item,{selected:false})
        })
        this.multiple_choice = res.data
      }
    })
  },
  mounted() {
    document.addEventListener(
      'click',
      this.even,
      true
    )
    const first_name = JSON.parse(localStorage.getItem('first_name'))
    const last_name = JSON.parse(localStorage.getItem('last_name'))
    this.userName = first_name + ' ' + last_name
    this.customer_manage = JSON.parse(localStorage.getItem('customer_manage'))
  },
  destroyed() { 
    document.removeEventListener('click', this.even, true) 
  },
  methods: {
    even(e){
      if (!this.$refs.productTypeSelect.contains(e.target)) {
        this.productTypeShow = false
      }
    },
    WarehouseList(e) {
      getWarehouse({ status: e }).then((res)=>{
        if(res.code == 0){
          res.data.data.forEach(item=>{
            Object.assign(item,{show:false})
          })
          this.warehouseList = res.data.data
          this.count = res.data.count[0]
        }
      })
      this.istab = e
    },
    tabfun(e) {
      // this.istab = e
      this.WarehouseList(e)
    },
    openModal(e) {
      let that = this
      that.$refs.mask.style = 'display:block;'
      if(e==1){
        that.$refs.requestModal.style = 'display:block;'
      }
      if(e==2){
        that.$refs.detailModal.style = 'display:block;'
      }
      if(e==3){
        that.$refs.removeModal.style = 'display:block;'
      }
      if(e==4){
        that.$refs.photoModal.style = 'display:block;'
      }
      setTimeout(function () {
        that.$refs.mask.style = 'display:block;opacity:1;'
        if(e==1){
          that.$refs.requestModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        }
        if(e==2){
          that.$refs.detailModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        }
        if(e==3){
          that.$refs.removeModal.style =
          'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        }
        if(e==4){
          that.$refs.photoModal.style =
          'display:block;--tw-scale-x: 1;--tw-scale-y: 1;'
        }
      }, 1)
    },
    closeModal() {
      let that = this
      that.$refs.mask.style = 'display:block;'
      if(that.$refs.requestModal.style.opacity == 1){
        that.$refs.requestModal.style = 'display:block;'
      }
      if(that.$refs.detailModal.style.opacity == 1){
        that.$refs.detailModal.style = 'display:block;'
      }
      if(that.$refs.removeModal.style.opacity == 1){
        that.$refs.removeModal.style = 'display:block;'
      }
      // if(that.$refs.photoModal.style.opacity == 1){
        // that.$refs.photoModal.style = 'display:block;'
      // }
      that.$refs.photoModal.style =
        'display:none;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      setTimeout(function () {
        that.$refs.mask.style = 'display:none;opacity:0;'
        that.$refs.requestModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        that.$refs.detailModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        that.$refs.removeModal.style =
          'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
        
        that.$validator.reset()
      }, 180)
    },
    requestSpace() {
      this.openModal(1)
    },
    detailModal(e) {
      this.details = this.warehouseList[e]
      // console.log(this.details)
      this.openModal(2)
    },
    removeModal(e) {
      this.delete = e
      this.openModal(3)
    },
    photoModal(e,p) {
      this.openModal(4)
      this.picList = p
      this.ispic = e
    },
    async submitModal() {
      const success = await this.$validator.validateAll()
      if(success){
        this.btnLoading = true
        let a = []
        for(let n = 0;n < this.multiSelected.length;n++){
          a.push(this.multiSelected[n].id)
        }
        this.reqList.product_type = a.join(',')
        if(this.customer_manage.id){
          this.reqList.customer_manage = this.customer_manage.id
        }else{
          this.reqList.customer_manage = 1
        }
        reqWarehouse(this.reqList).then((res)=>{
          if(res.code == 0){
            setTimeout(()=>{
              this.closeModal()
              this.btnLoading = false
              this.reqList = {
                site: 1,
                num: null,
                weight: null,
                weight_unit: 1,
                cube: '',
                cube_unit: 1,
                put_time: '',
                express_no: '',
                product_type: '',
                package_type: null,
              }
              this.WarehouseList(0)
            },800)
          } else {
            setTimeout(()=>{
              this.btnLoading = false
            },800)
          }
        })
      }
    },
    cancelReq() {
      this.closeModal()
      this.reqList = {
        site: 1,
        num: null,
        weight: null,
        weight_unit: 1,
        cube: '',
        cube_unit: 1,
        put_time: '',
        express_no: '',
        product_type: '',
        package_type: null,
      }
      // this.multiSelected = []
    },
    removeWarehouse() {
      this.btnLoading = true
      delWarehouse({id: this.delete}).then((res)=>{
        setTimeout(()=>{
          this.closeModal()
          this.btnLoading = false
          this.WarehouseList(this.istab)
        },800)
      })
    },
    picLeftfun(){
      if(this.ispic == 0){
        this.ispic = (this.picList.length - 1)
      } else {
        this.ispic -= 1
      }
    },
    picRightfun(){
      if(this.ispic == (this.picList.length - 1)){
        this.ispic = 0
      } else {
        this.ispic += 1
      }
    },
    multiSelect(e){
      this.multiSelected = e
      this.productTypeShow = true
    },
    copyInfo(){
      navigator.clipboard.writeText(this.copy).then(() => {
        // console.log('copy')
      })
    },
    downloadBq(e){
      this.FreightLabel = this.warehouseList[e]
      this.shipment_no = this.warehouseList[e].shipment_no
      setTimeout(()=>{
        html2canvas(this.$refs.biaoqian).then(canvas => {
          let url = canvas.toDataURL("image/png");
          // console.log(url)
          var link= document.createElement("a");
          link.href = url; 
          link.download = "FreightLabel";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      },1)
    }
  },
}
</script>

<style lang="postcss" scoped>
.tab {
  @apply flex justify-center items-center mx-1.5 px-5 py-3 text-sm cursor-pointer border-b-2 border-transparent hover:border-orange;
}

.tabs{
  @apply text-orange border-orange;
}

.qty {
  @apply ml-1.5 px-2.5 text-orange text-13 bg-warehouseAddress rounded-xl;
}

.detailbtn {
  @apply py-1 rounded-md bg-warehouseDetail hover:bg-black text-white;
}

.cancelbtn {
  @apply py-1 rounded-md text-warehouseDetail hover:bg-warehouseDetail hover:text-white border border-warehouseDetail;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden translate-x-1/2 -translate-y-1/2 w-700 max-w-90% max-h-80% overflow-auto rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.closeModal {
  @apply w-7 h-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded;
}

.inputTips {
  @apply text-xs text-red-500 absolute;
}

.btn {
  @apply font-semibold border-0 text-15 text-white rounded bg-orange hover:bg-orange1 px-6 py-2 cursor-pointer;
}

.btn1 {
  @apply font-semibold text-white border-0 rounded bg-gray-500 hover:bg-gray-700 px-6 py-2.5 cursor-pointer;
}

.detailTitle{
  @apply w-1/2 sm:w-1/3 text-right font-semibold leading-3;
}

td{
  @apply p-2.5 border border-gray-300;
}

.modalPic{
  @apply w-full hidden opacity-0;
}

.picCurrent{
  @apply block opacity-100;
  animation: fadeIn 500ms;
  animation-timing-function: ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
}
</style>