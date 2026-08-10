<template>
  <div id="inventory" class="w-full max-w-1600 m-auto h-full p-3 sm:p-5 overflow-scroll text-menu dark:text-darkText relative">
    <div
      ref="mask"
      class="mask"
    ></div>
    <div
      ref="imgModal"
      class="modal w-900 opacity-20 bg-white dark:bg-darkMenu"
    >
      <div class="flex justify-end">
        <div
          @click="closeModal"
          class="p-3 hover:bg-gray-200 cursor-pointer"
        >
          <svg
            t="1698653302630"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4105"
            width="20"
            height="20"
          >
            <path
              d="M477.895023 385.971685L845.430841 18.357099a66.717282 66.717282 0 0 1 91.923338 0c24.497137 24.497137 24.497137 67.426202 0 91.923338L569.818362 477.895023l367.535817 367.535818c24.497137 24.575905 24.497137 67.426202 0 91.923338a66.717282 66.717282 0 0 1-91.923338 0L477.895023 569.818362 110.280437 937.354179a66.717282 66.717282 0 0 1-91.923338 0 66.717282 66.717282 0 0 1 0-91.923338L385.971685 477.895023 18.357099 110.280437a66.717282 66.717282 0 0 1 0-91.923338 66.717282 66.717282 0 0 1 91.923338 0L477.895023 385.971685z"
              fill="#707070"
              p-id="4106"
            ></path>
          </svg>
        </div>
      </div>
      <img
        :src="bigImg"
        class="w-full p-3"
        alt=""
      >
    </div>
    <div ref="detailModal" class="modal p-3 w-900 opacity-20 bg-white dark:bg-darkMenu">
      <div class="pb-2 flex justify-between items-center border-b">
        <div>Inventory Records</div>
        <div @click="closeModal" class="p-2 hover:bg-gray-200 cursor-pointer">
          <svg t="1698653302630" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4105" width="20" height="20"><path d="M477.895023 385.971685L845.430841 18.357099a66.717282 66.717282 0 0 1 91.923338 0c24.497137 24.497137 24.497137 67.426202 0 91.923338L569.818362 477.895023l367.535817 367.535818c24.497137 24.575905 24.497137 67.426202 0 91.923338a66.717282 66.717282 0 0 1-91.923338 0L477.895023 569.818362 110.280437 937.354179a66.717282 66.717282 0 0 1-91.923338 0 66.717282 66.717282 0 0 1 0-91.923338L385.971685 477.895023 18.357099 110.280437a66.717282 66.717282 0 0 1 0-91.923338 66.717282 66.717282 0 0 1 91.923338 0L477.895023 385.971685z" fill="#707070" p-id="4106"></path></svg>
        </div>
      </div>
      <div class="mt-3">
        <div class="pb-2 font-semibold">Goods No.: {{stockDatailNo}}</div>
        <div class="pb-3">Box name: {{stockDatailName}}</div>
        <el-table
          :data="stockDatail"
          style="width: 100%">
          <el-table-column
            label="Style"
            >
            <template slot-scope="scope" >
              <div>{{detailStyle[scope.row.type]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="warehouse_no"
            label="Order No."
            >
          </el-table-column>
          <el-table-column
            prop="number"
            label="Quantity"
            >
          </el-table-column>
          <el-table-column
            prop="warehousing_date"
            label="Times"
            >
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="mb-28 flex flex-col xl:flex-row">
      <div class="w-full">
        <div class="flex md:grid grid-cols-12 gap-4 overflow-x-auto">
          <div
            class="flex-shrink-0 w-52 md:w-auto flex flex-col col-span-6 md:col-span-3 bg-white dark:bg-darkMenu rounded shadow-default overflow-hidden"
            style="height: 160px;"
          >
            <div
              class="relative h-full p-3 rounded-t"
              style="background-image: linear-gradient(-180deg, #edf1fd 0%, #ffffff 100%);"
            >
              <div class="absolute top-3 text-sm font-semibold">All Inventory</div>
              <div class="pt-4 h-full text-2xl font-medium flex justify-center items-center">
                {{topNum.total_num}}
                <span class="text-base">(CBM)</span>
              </div>
            </div>
            <!-- <router-link :to="{ name: 'StockList' }">
              <div class="flex-shrink-0 border-t border-gray-100 text-xs h-11 flex justify-center items-center cursor-pointer hover:bg-gray-300">
                <div class="px-2">Breakdown of inventory</div>
              </div>
            </router-link> -->
          </div>
          <div
            class="flex-shrink-0 w-52 md:w-auto flex flex-col col-span-6 md:col-span-3 bg-white dark:bg-darkMenu rounded shadow-default overflow-hidden"
            style="height: 160px;"
          >
            <div
              class="relative h-full p-3 rounded-t"
              style="background-image: linear-gradient(-180deg, #edf1fd 0%, #ffffff 100%);"
            >
              <div class="absolute top-3 text-sm font-semibold">Inventory clarity (today)</div>
              <div class="pt-4 h-full text-2xl font-medium flex justify-center items-center">
                <div class="w-full flex flex-col xl:flex-row">
                  <div class="w-full flex flex-col items-center">
                    <div>{{topNum.today_num}}
                      <span class="text-base">(CBM)</span>
                    </div>
                    <div class="text-sm">In storage</div>
                  </div>
                  <div class="w-full flex flex-col items-center">
                    <div>{{topNum.today_out_num}}
                      <span class="text-base">(CBM)</span>
                    </div>
                    <div class="text-sm">Out of storage</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="flex-shrink-0 border-t border-gray-100 text-xs h-11 text-center flex justify-center items-center">
              <router-link :to="{ name: 'ApplySpaces' }" class="h-full">
                <div class="px-2 w-full h-full flex items-center cursor-pointer hover:bg-gray-300">Reservation Inbound</div>
              </router-link>
              <router-link :to="{ name: 'OutboundManagement' }" class="h-full">
                <div class="px-2 w-full h-full flex items-center border-l border-gray-100 dark:border-darkLine cursor-pointer hover:bg-gray-300">Appointment out of stock</div>
              </router-link>
            </div> -->
          </div>
          <div
            class="flex-shrink-0 w-52 md:w-auto flex flex-col col-span-6 md:col-span-3 bg-white dark:bg-darkMenu rounded shadow-default"
            style="height: 160px;"
          >
            <div
              class="relative h-full p-3 rounded-t"
              style="background-image: linear-gradient(-180deg, #edf1fd 0%, #ffffff 100%);"
            >
              <div class="absolute top-3 text-sm font-semibold">List of costs</div>
              <div class="pt-4 h-full text-2xl font-medium flex justify-center items-center">
                <div class="text-center">
                  <div>${{topNum.total_free}}</div>
                  <div class="text-sm">Amount to be paid</div>
                </div>
              </div>
            </div>
            <div class="flex-shrink-0 border-t border-gray-100 text-xs h-11 text-center flex justify-center items-center">
              Breakdown of expenses
              <!-- <div class="px-2 w-full h-full flex items-center">Breakdown of expenses</div> -->
              <!-- <div class="px-2 w-full h-full flex justify-center items-center border-l border-gray-100">Pay now</div> -->
            </div>
          </div>
          <div
            class="flex-shrink-0 w-52 md:w-auto flex flex-col col-span-6 md:col-span-3 bg-white dark:bg-darkMenu rounded shadow-default"
            style="height: 160px;"
          >
            <div
              class="relative h-full p-3 rounded-t"
              style="background-image: linear-gradient(-180deg, #edf1fd 0%, #ffffff 100%);"
            >
              <div class="absolute top-3 text-sm font-semibold">Estimated cost analysis</div>
              <div class="pt-4 h-full text-xl font-medium flex justify-center items-center">NO data</div>
            </div>
            <div class="flex-shrink-0 border-t border-gray-100 text-xs h-11 flex justify-center items-center">
              <div>Cost breakdown</div>
            </div>
          </div>
        </div>
        <div class="md:mt-4 p-3 bg-white dark:bg-darkMenu rounded-md shadow-default">
          <div class="flex justify-between">
            <div class="font-semibold mb-2 mr-3 flex">
              <span class="mr-3">Stock List</span>
              <!-- <router-link :to="{ name: 'CargoManagement' }">
                <div class="text-blue-500 cursor-pointer hover:underline">View All</div>
              </router-link> -->
            </div>
            <div class="flex">
              <!-- <div
                class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md cursor-pointer"
                @click="openCustom"
              >Custom List</div> -->
              <!-- <el-button
                type="primary"
                @click="openCustom"
              >Custom List</el-button>

              <el-button
                class="ml-2"
                type="primary"
                :loading="loading"
                @click="exportFile"
              >Export List</el-button> -->
            </div>

          </div>
          <StockTable></StockTable>
          <!-- <TableListVue
            v-show="list.length > 0"
            ref="tableList"
            :tableData="list"
            @openImg='openImg'
            :RowColumn='RowColumn'
            :tableHeight="tableHeight"
            @viewDetail="getDetails"
          ></TableListVue>

          <div
            v-show="list.length == 0"
            class="p-3"
          >
            <div class="mt-4 py-4 flex flex-col justify-center items-center rounded bg-white dark:bg-darkMenu">
              <img
                src="../../assets/warehouseNodata.png"
                class="w-40 h-40"
                alt=""
              >
              <div>No data</div>
            </div>
          </div> -->
        </div>
        <div class="hidden mt-4 p-3 bg-white dark:bg-darkMenu rounded-md shadow-default xl:h-96">
          <div class="font-semibold mb-2">Inventory data</div>
          <div class="flex justify-end mb-4 text-sm">
            <button
              class="unitType1"
              :class="[dataType=='1' ? 'unitType' : '']"
              @click="chooseS('1')"
            >Quantities</button>
            <button
              class="unitType2"
              :class="[dataType=='2' ? 'unitType' : '']"
              @click="chooseS('2')"
            >Volumetric</button>
          </div>
          <!-- <div class="flex flex-wrap">
            <div class="my-1 mr-6 flex items-center text-xs">
              <div class="rounded-full w-2.5 h-2.5 mr-2" style="background-color: #FAAA69;"></div>
              <div>In production</div>
            </div>
            <div class="my-1 mr-6 flex items-center text-xs">
              <div class="rounded-full w-2.5 h-2.5 mr-2" style="background-color: #77D9A1;"></div>
              <div>Available quantity</div>
            </div>
            <div class="my-1 mr-6 flex items-center text-xs">
              <div class="rounded-full w-2.5 h-2.5 mr-2" style="background-color: #77B4D9;"></div>
              <div>In transit</div>
            </div>
            <div class="my-1 mr-6 flex items-center text-xs">
              <div class="rounded-full w-2.5 h-2.5 mr-2" style="background-color: #6F26D9;"></div>
              <div>To be released</div>
            </div>
          </div> -->
          <!-- <img src="../../assets/inventorydata.png" class="w-full" alt=""> -->
          <div
            id="main"
            style="width: 100%;height: 300px;"
          ></div>
        </div>
      </div>

      <div class="hidden ml-0 xl:ml-4 mt-4 xl:mt-0 flex-shrink-0 w-full xl:w-350">
        <div
          class="bg-white dark:bg-darkMenu rounded-md py-3 pl-3 pr-1 shadow-default"
          style="height: 260px;"
        >
          <div class="font-semibold">Apply for storage space</div>
          <div
            class="pr-2 mt-2 h-full grid grid-cols-2 gap-3 text-xs overflow-y-scroll stocklist"
            style="max-height: 208px;"
          >
            <div class="col-span-2 flex items-center">
              <div
                class="flex-shrink-0"
                style="width: 138px;"
              >Outbound Service:</div>
              <div
                ref="selectss"
                class="relative w-full h-7"
              >
                <div
                  class="absolute top-0 left-0 input h-7 text-xs cursor-pointer overflow-ellipsis overflow-hidden whitespace-nowrap leading-none"
                  @click="selectShow = !selectShow"
                >
                  {{checked}}
                </div>
                <input
                  class="input h-7 text-xs hidden"
                  type="text"
                  v-model="form.outbound_service"
                >
                <div
                  v-show="selectShow"
                  class="absolute top-7 left-0 w-full mt-0.5 shadow-md z-50"
                >
                  <div class="selectUl rounded-md max-h-52 overflow-auto cursor-pointer bg-white dark:bg-darkMenu">
                    <ul class="oul">
                      <li
                        class="oli"
                        v-for="(item, index) in selectList"
                        :key="index"
                        @click="CheckedOne(index)"
                        v-show="index == 0 || !selectList[0].selected"
                      >{{item.name}}
                        <div
                          class="absolute top-1.5 left-2 w-4 h-4 rounded border border-gray-400 flex justify-center items-center"
                          :class="[item.selected ? 'selectOne' : '']"
                        >
                          <svg
                            v-show="item.selected"
                            t="1670207733333"
                            class="icon w-3 h-3"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="9414"
                          >
                            <path
                              d="M-31.315747 519.457481m54.305801-54.305801l45.435853-45.435854q54.305801-54.305801 108.611601 0l303.931466 303.931466q54.305801 54.305801 0 108.611601l-45.435854 45.435853q-54.305801 54.305801-108.611601 0l-303.931465-303.931465q-54.305801-54.305801 0-108.611601Z"
                              p-id="9415"
                              fill="#ffffff"
                            ></path>
                            <path
                              d="M898.357541 105.745969m54.305801 54.305801l45.797892 45.797892q54.305801 54.305801 0 108.611602l-563.332174 563.332173q-54.305801 54.305801-108.611602 0l-45.797892-45.797892q-54.305801-54.305801 0-108.611601l563.332174-563.332174q54.305801-54.305801 108.611602 0Z"
                              p-id="9416"
                              fill="#ffffff"
                            ></path>
                          </svg>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="selectList[1].selected"
              class="col-span-2 flex items-center"
            >
              <div
                class="flex-shrink-0"
                style="width: 138px;"
              >
                <span class="text-red-500">*</span>
                Label Carton qty:
              </div>
              <div class="relative w-full">
                <input
                  class="input h-7 text-xs"
                  type="number"
                  min="1"
                  v-model="form.label_carton_qty"
                  v-validate="'required|rentLabel'"
                  name="rentLabel"
                >
                <div class="inputTips -bottom-3.5">{{errors.first("rentLabel")}}</div>
              </div>
            </div>
            <div
              v-if="selectList[2].selected"
              class="col-span-2 flex items-center"
            >
              <div
                class="flex-shrink-0"
                style="width: 138px;"
              >
                <span class="text-red-500">*</span>
                Inspection Carton qty:
              </div>
              <div class="relative w-full">
                <input
                  class="input h-7 text-xs"
                  type="number"
                  min="1"
                  v-model="form.inspection_carton_qty"
                  v-validate="'required|rentInspection'"
                  name="rentInspection"
                >
                <div class="inputTips -bottom-3.5">{{errors.first("rentInspection")}}</div>
              </div>
            </div>
            <div class="col-span-1 flex items-center">
              <div class="flex-shrink-0 pr-2">Cargo Type:</div>
              <input
                class="input h-7 text-xs"
                type="text"
                v-model="form.cargo_type"
              >
            </div>
            <div class="col-span-1 flex items-center">
              <div class="flex-shrink-0 pr-2">
                <span class="text-red-500">*</span>
                Of Boxes:
              </div>
              <div class="relative w-full">
                <input
                  class="input h-7 text-xs"
                  type="number"
                  min="0"
                  v-model="form.of_boxes"
                  v-validate="'required|rentUnit'"
                  name="rentUnit"
                >
                <div class="inputTips -bottom-3.5">{{errors.first("rentUnit")}}</div>
              </div>
            </div>
            <div class="col-span-2 flex items-center">
              <div
                class="flex-shrink-0"
                style="width: 138px;"
              >Total Volume(CBM):</div>
              <div class="relative w-full">
                <input
                  class="input h-7 text-xs"
                  type="number"
                  min="0"
                  v-model="form.total_volume"
                >
              </div>
            </div>
            <div class="col-span-2 flex items-center">
              <div
                class="flex-shrink-0"
                style="width: 138px;"
              >
                <span class="text-red-500">*</span>
                Inventory Time(day):
              </div>
              <div class="relative w-full">
                <input
                  class="input h-7 text-xs"
                  type="number"
                  min="0"
                  v-model="form.inventory_time"
                  v-validate="'required|rentTime'"
                  name="rentTime"
                >
                <div class="inputTips -bottom-3.5">{{errors.first("rentTime")}}</div>
              </div>
            </div>
            <div class="col-span-2 flex">
              <div class="flex items-center">
                <div
                  class="flex-shrink-0"
                  style="width: 138px;"
                >Warehouse Address:</div>
                <select
                  class="select h-7 text-xs py-0.5"
                  v-model="form.warehouse_address"
                >
                  <option value="1">Shenzhen</option>
                  <option value="2">Yiwu</option>
                  <option value="3">Los Angeles</option>
                  <option value="4">New York</option>
                </select>
              </div>
              <button
                @click="submitForm"
                class="ml-3 my-1 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md"
              >Save</button>
            </div>
          </div>
        </div>
        <div
          class="mt-4 bg-white dark:bg-darkMenu rounded-md p-3 shadow-default"
          style="height: 140px;"
        >
          <div class="font-semibold">Common Tools</div>
          <div class="mt-2 grid grid-cols-3 gap-2">
            <router-link :to="{ name: 'CargoManagement' }">
              <div class="col-span-1 flex flex-col items-center text-center text-xs">
                <div class="relative">
                  <img
                    src="../../assets/inventory1.svg"
                    class="w-12 h-12 mb-1"
                    alt=""
                  >
                  <div
                    v-if="topNum.fnum > 0"
                    class="absolute top-0 right-0 py-0.5 px-1 bg-red-500 text-white text-xs rounded-full"
                  >{{topNum.fnum}}</div>
                </div>
                <div>Overtime warning</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'RentCalculation' }">
              <div class="col-span-1 flex flex-col items-center text-center text-xs">
                <img
                  src="../../assets/inventory2.svg"
                  class="w-12 h-12 mb-1"
                  alt=""
                >
                <div>Warehouse Rent Calculation</div>
              </div>
            </router-link>
            <!-- <div class="col-span-1 flex flex-col items-center text-center text-xs">
              <img src="../../assets/inventory3.svg" class="w-12 h-12 mb-1" alt="">
              <div>Logistics costing</div>
            </div>
            <div class="col-span-1 flex flex-col items-center text-center text-xs">
              <img src="../../assets/inventory4.svg" class="w-12 h-12 mb-1" alt="">
              <div>Inquiry about goods</div>
            </div>
            <div class="col-span-1 flex flex-col items-center text-center text-xs">
              <img src="../../assets/inventory5.svg" class="w-12 h-12 mb-1" alt="">
              <div>Warehouse services</div>
            </div> -->
          </div>
        </div>
        <div
          class="mt-4 bg-white dark:bg-darkMenu rounded-md p-3 shadow-default"
          style="height: 164px;"
        >
          <div class="font-semibold">New notice</div>
          <div class="flex flex-col justify-center items-center rounded">
            <img
              src="../../assets/warehouseNodata.png"
              class="w-24"
              alt=""
            >
            <div>No data</div>
          </div>
        </div>
        <div class="mt-4 bg-white dark:bg-darkMenu rounded-md p-3 shadow-default xl:h-96">
          <div class="font-semibold">Time in storage</div>
          <div
            id="Pancake"
            style="width: 100%;height: 300px;"
          ></div>
          <!-- <div class="flex justify-center xl:mt-6">
            <img src="../../assets/timeinstorage.png" class="w-full max-w-xs" alt="">
          </div> -->
        </div>
      </div>

      <!-- <CustomListVue
        ref="customListRef"
        @on-submit='submit'
      ></CustomListVue> -->
    </div>

  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  warehousehome,
  manageList,
  applyStorage,
  getSetting,
  exportList,
  get_stock_list,
  get_stock_info,
} from "@/api/warehouse";

// import TableListVue from "@/components/Warehouse/table-list.vue";
// import CustomListVue from "@/components/Warehouse/custom-list.vue";
import Column from "./column";
import StockTable from "./CargoManagement.vue";

export default {
  props: ["leftMenu"],
  components: {
    // TableListVue,
    // CustomListVue,
    StockTable,
  },
  watch: {
    leftMenu: function (val) {
      this.leftMenuOpen = val;
    },
  },
  data() {
    return {
      RowColumn: [],
      customlist: [],
      userData: [],
      customer_manage: {},
      searchOption: 0,
      searchState: 1,
      searchNo: "",
      list: [],
      topNum: {},
      bigImg: "",
      dataType: "1",
      chart: null,
      chart1: null,
      option1: "",
      form: {
        sale_id: "",
        entry_method: 1,
        supplier_id: [],
        cargo_type: "",
        total_volume: "",
        inventory_time: "",
        of_boxes: "",
        warehouse_address: 1,
        outbound_service: [],
        label_carton_qty: "",
        inspection_carton_qty: "",
        estimated_time: "",
        file_id: "",
        site_url: "app.cargosoon.com",
      },
      selectList: [
        {
          name: "Unnecessary",
          no: 0,
          selected: false,
        },
        {
          name: "Label",
          no: 1,
          selected: false,
        },
        {
          name: "Inspection",
          no: 2,
          selected: false,
        },
        {
          name: "Repack",
          no: 3,
          selected: false,
        },
        {
          name: "Palletize",
          no: 4,
          selected: false,
        },
        {
          name: "Container Loading",
          no: 5,
          selected: false,
        },
      ],
      selectShow: false,
      checked: "",
      datas: {},
      storageData: {},
      loading: false,
      stockForm: {
        transport_type: 2,
        sku: '',
        product_name: '',
      },
      tableHeight: 510,
      stockDatail: [],
      stockDatailNo: '',
      stockDatailName: '',
      detailStyle: ['', 'Inbound', 'Outbound'],
    };
  },
  created() {
    this.$emit("menu", "InventoryStatistics");
    this.form.site_url = window.location.host
    // this.getCustom();
  },
  mounted() {
    document.addEventListener("click", this.even, true);

    this.form.sale_id = JSON.parse(localStorage.getItem("userInfo")).manage.id;

    warehousehome().then((res) => {
      this.topNum = res.data;
      this.datas = res.data.inventory_data.quantities;
      this.storageData = res.data.time_in_storage;
      this.getmain();
      this.setPancake();
    });
    // manageList().then((reh) => {
    //   this.list = reh.data.data;
    // });

    // get_stock_list(this.stockForm).then((res) => {
    //   this.list = res.data.data
    // })
    
  },
  destroyed() {
    document.removeEventListener("click", this.even, true);
  },
  methods: {
    exportFile(){
      this.loading = true;
      exportList({
        type: 1,
      }).then(res=>{
        if(res.code == 0){
          var link = document.createElement("a");
          link.href = '/api'+res.data.file;
          link.download = 'inventory.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }else{
          this.$message.error(res.msg);
        }

        this.loading = false;
      })
    },
    submit(){
      getSetting({
        type: 2,
      }).then((res) => {
        this.customlist = res.data;
        this.RowColumn = [];
        this.customlist.forEach((item) => {
          const row = Column.boxTable.find((i) => i.prop === item);
          this.RowColumn.push(row);
        });

        this.$nextTick(()=>{
          this.$refs.tableList.$refs.tableref.doLayout();
        })
        
      });
    },
    getCustom() {
      getSetting({
        type: 2,
      }).then((res) => {
        this.customlist = res.data;
        // this.customlist.push('action')
        this.RowColumn = [];
        this.customlist.forEach((item) => {
          const row = Column.boxTable.find((i) => i.prop === item);
          this.RowColumn.push(row);
        });
        this.$nextTick(()=>{
          this.$refs.tableList.$refs.tableref.doLayout();
        })
      });
    },
    openCustom() {
      this.$refs.customListRef.open(this.customlist);
    },
    even(e) {
      if (!this.$refs.selectss.contains(e.target)) {
        this.selectShow = false;
      }
    },
    viewDetail(item) {
      // console.log(id);
      this.$router.push({
        name: "ApplySpace",
        params: {
          id: item.manage_id,
          status: "In storage",
          statu: 2,
          type: 1,
        },
      });
    },
    openImg(img) {
      this.bigImg = img;
      this.$refs.mask.style = "display:block;";
      this.$refs.imgModal.style = "display:block;";
      setTimeout(() => {
        this.$refs.mask.style = "display:block;opacity:1;";
        this.$refs.imgModal.style =
          "display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;";
      }, 1);
    },
    closeModal() {
      this.$refs.mask.style = "display:none;opacity:0;";
      this.$refs.imgModal.style =
        "display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;";
      this.$refs.detailModal.style =
        "display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;";
    },
    getmain() {
      this.chart = echarts.init(document.getElementById("main"));
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        legend: {},
        toolbox: {
          //工具栏
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        tooltip: {
          trigger: "axis", //显示当前列的所有信息
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "In production",
            data: this.datas.in_production,
            type: "line",
            itemStyle: {
              color: "#FAAA69",
            },
          },
          {
            name: "Available quantity",
            data: this.datas.available_quantity,
            type: "line",
            itemStyle: {
              color: "#77D9A1",
            },
          },
          {
            name: "In transit",
            data: this.datas.in_transit,
            type: "line",
            itemStyle: {
              color: "#77B4D9",
            },
          },
          {
            name: "To be released",
            data: this.datas.to_be_released,
            type: "line",
            itemStyle: {
              color: "#6F26D9",
            },
          },
        ],
      };

      // setInterval(function() {
      // option.series.map(item => {
      //   item.data.shift();
      //   return item.data.push(parseInt(Math.random() * 1500));
      // });
      this.chart.setOption(option);
      // }, 2000);
    },
    setPancake() {
      this.chart1 = echarts.init(document.getElementById("Pancake"));
      this.option1 = {
        legend: {
          left: "center",
          top: "bottom",
        },
        series: [
          {
            type: "pie",
            radius: ["60%", "40%"],
            center: ["50%", "50%"],
            color: ["#FAAA69", "#77D9A1", "#77B4D9", "#6F26D9"],
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: (params) => {
                  return params.value;
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            data: [
              { value: this.storageData.one_part, name: "<3 days" },
              { value: this.storageData.two_part, name: ">10 days" },
              { value: this.storageData.three_part, name: ">1 month" },
              { value: this.storageData.four_part, name: ">6 months" },
            ],
          },
        ],
      };

      this.option1 && this.chart1.setOption(this.option1);
    },
    chooseS(type) {
      this.dataType = type;
      if (type == "1") {
        this.datas = this.topNum.inventory_data.quantities;
      } else {
        this.datas = this.topNum.inventory_data.volumetric;
      }
      setTimeout(() => {
        // let myChart = echarts.init(document.getElementById("main"));
        this.chart.setOption({
          series: [
            {
              name: "In production",
              data: this.datas.in_production,
              type: "line",
              itemStyle: {
                color: "#FAAA69",
              },
            },
            {
              name: "Available quantity",
              data: this.datas.available_quantity,
              type: "line",
              itemStyle: {
                color: "#77D9A1",
              },
            },
            {
              name: "In transit",
              data: this.datas.in_transit,
              type: "line",
              itemStyle: {
                color: "#77B4D9",
              },
            },
            {
              name: "To be released",
              data: this.datas.to_be_released,
              type: "line",
              itemStyle: {
                color: "#6F26D9",
              },
            },
          ],
        });
      }, 500);
    },
    CheckedOne(index) {
      this.selectList[index].selected = !this.selectList[index].selected;
      let a = [];
      let b = [];
      for (var i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i].selected) {
          a.push(this.selectList[i].name);
          b.push(this.selectList[i].no);
        }
      }
      if (this.selectList[0].selected) {
        a = ["Unnecessary"];
        b = [0];
        for (var j = 1; j < this.selectList.length; j++) {
          this.selectList[j].selected = false;
        }
      }
      this.form.outbound_service = b;
      this.checked = a.join(", ");
    },
    async submitForm() {
      if (this.form.outbound_service.length == 0) {
        this.form.outbound_service = [0];
      }
      const success = await this.$validator.validateAll();
      if (success) {
        applyStorage(this.form).then((reh) => {
          if (reh.msg == "success") {
            this.$router.push({
              name: "CargoManagement",
            });
          }
        });
      }
    },
    getDetails(id, no, name){
      this.stockDatailNo = no
      this.stockDatailName = name 
      get_stock_info({
        id: id,
      }).then((res)=>{
        this.stockDatail = res.data
        this.$refs.mask.style = 'display:block;'
        this.$refs.detailModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.detailModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      })
    }
  },
};
</script>

<style lang="postcss" scoped>
#inventory::-webkit-scrollbar {
  height: 6px;
  width: 0px;
}

#inventory::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

#inventory::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}

.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.unitType1 {
  @apply px-3 py-1.5 rounded-l-md border border-inputBorder hover:bg-gray-200;
}

.unitType2 {
  @apply -ml-1px px-3 py-1.5 rounded-r-md border border-inputBorder hover:bg-gray-200;
}

.unitType {
  @apply border-blue-500 text-blue-500 z-10;
}

.inputTips {
  @apply left-0 text-xs text-red-500 absolute;
}

.selectUl::-webkit-scrollbar {
  width: 6px;
}

.selectUl::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.selectUl::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}

.oul {
  @apply my-1;
}

.oli {
  @apply h-7 bg-white dark:bg-darkMenu hover:bg-lightMenu dark:hover:bg-darkLine p-2 pl-7 cursor-pointer relative select-none leading-none;
}

.selectOne {
  @apply bg-green-400;
}
</style>