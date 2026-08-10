<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="tailModal" class="py-10 modal w-900 opacity-20 bg-white dark:bg-darkMenu">
      <div @click="closeModal" class="absolute right-1.5 top-1.5 flex hover:bg-gray-200 cursor-pointer">
        <svg t="1686706416357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" width="25" height="25"><path d="M579.9 512l314-314c18.7-18.7 18.7-49.1 0-67.9-18.7-18.7-49.1-18.7-67.9 0l-314 314-314-314c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l314 314-314 314c-18.7 18.7-18.7 49.1 0 67.9 18.7 18.7 49.1 18.7 67.9 0l314-314 314 314c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9l-314-314z" fill="#515151" p-id="2347"></path></svg>
      </div>
      <ul class="mt-6">
        <li v-for="(i,n) in tailList" :key="n" class="flex items-center justify-between">
          <div class="flex items-center">
            <div :class="[n==0 ? 'bg-white dark:bg-darkMenu':'bg-transparent']" class="z-10 w-4 flex items-end" style="margin: -43px -9px 0 0;height: 60px;">
              <div :class="[n==0 ? 'border-orange' : 'border-gray-300']" class="w-4 h-4 bg-white dark:bg-darkMenu rounded-full border-2"></div>
            </div>
            <div :class="[n==0 ? 'text-orange' : '']" style="font-size: 16px;padding: 20px 0 20px 29px;border-left: 2px solid #d7d7d7;">{{i.location}}</div>
          </div>
          <div :class="[n==0 ? 'text-orange' : '']" style="width: 216px;white-space: nowrap;flex-shrink: 0;">{{i.checkpoint_date}}</div>
        </li>
      </ul>
    </div>

    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div class="flex mb-32">
          <!-- list -->
          <div class="flex-shrink-0 w-full md:w-510 md:mr-4 flex flex-col">
            <div class="p-3 rounded-md flex flex-col sm:flex-row text-sm bg-white dark:bg-darkMenu">
              <div class="flex">
                <select class="select w-36 text-sm" v-model="searchOption">
                  <!-- <option class="hidden" value="full">Order/Tracking NO.</option> -->
                  <option value="0">Order/Tracking NO.</option>
                  <option value="1">Transport state</option>
                </select>
                <input v-show="searchOption == 0" class="ml-2 h-10 input w-full" type="text" v-model="searchNo">
                <select v-show="searchOption == 1" class="ml-2 h-10 select w-full text-sm" v-model="searchState">
                  <!-- <option class="hidden" value="full">Order/Tracking NO.</option> -->
                  <option value="1">Pending warehouse</option>
                  <option value="2">In storage</option>
                  <option value="3">To be shipped</option>
                  <option value="4">In transit</option>
                  <option value="5">Already in port</option>
                  <option value="6">Picked up</option>
                  <option value="7">Shipped</option>
                  <option value="8">Delivered</option>
                </select>
              </div>
              <div class="flex justify-center">
                <button @click="Search" class="mt-3 sm:mt-0 sm:ml-3 bg-orange text-white rounded-md py-1.5 px-5 hover:bg-orange1">Track</button>
              </div>
            </div>
            <div class="mt-3 flex flex-wrap">
              <div v-for="(i,n) in statusList" :key="n"
                class="my-1 mr-2 py-1 px-3 flex items-center rounded shadow-default bg-white dark:bg-darkMenu hover:bg-gray-300 cursor-pointer">
                <div>{{i.name}}</div>
                <div class="ml-1 text-xs rounded-full px-1.5 py-0.5 text-orange bg-menuSelect">{{i.number}}</div>
              </div>
            </div>
            <div v-show="list.length==0" class="mt-4 py-4 flex flex-col justify-center items-center rounded bg-white dark:bg-darkMenu">
              <img src="../../assets/warehouseNodata.png" class="w-40 h-40" alt="">
              <div>No data</div>
            </div>
            <div class="h-full overflow-auto">
              <div v-for="(i,n) in list" :key="n" @click="trackDetail(i.id)"
                :class="[id==i.id ? 'border-orange' : 'border-transparent']"
                class="mt-2 p-3 rounded border bg-white dark:bg-darkMenu cursor-pointer">
                <div class="flex justify-between">
                  <div class="font-semibold text-base">Order No.: {{i.booking_no}}</div>
                  <!-- <div v-show="i.status<4" class="py-2 px-4 rounded-md bg-gray-500 text-white">{{itemStatus[i.status]}}</div>
                  <div v-show="i.status>3" class="py-2 px-4 rounded-md bg-orange text-white">{{itemStatus[i.status]}}</div> -->
                </div>
                <div>{{i.start_city}} -> {{i.give_area}}</div>
                <div class="mt-4 flex text-xs" v-if="i.statusIndex!=-1">
                  <div class=" mr-2" v-for="(statusItem, index) in Status[i.statusIndex].status" :class="statusItem!=''?'flex-1':'hidden'" :key="index">
                    <div v-show="statusItem!=''">
                      <div :class="[i.status < index ? 'bg-gray-300' : 'bg-orange']" class="h-1.5 rounded-full relative">
                        <!-- <img v-show="i.status == 1" :src="Status[i.statusIndex].icon" class="w-8 absolute -top-3 -left-1" alt=""> -->
                        <img v-show="i.status == index" :src="Status[i.statusIndex].icon" class="w-8 absolute -top-3 -right-1.5" alt="">
                      </div>
                      <div class="mt-2.5 text-center">{{statusItem}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- detail -->
          <div ref="detailPanel" class="absolute lg:sticky overflow-y-auto bg-white dark:bg-darkMenu left-0 top-0 w-full p-4 hidden lg:block lg:pt-0 lg:pr-0 lg:pl-0" style="height: calc(100vh - 80px);">
            <div class="mb-4">
              <div class="pt-1 pb-2 block lg:hidden">
                <div @click="closeDetail" class="flex items-center cursor-pointer">
                  <svg t="1695195158912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4005" width="24" height="24"><path d="M294.408263 534.448268l353.697601-353.697601c18.73776-18.73776 49.092092-18.73776 67.828828 0s18.73776 49.092092 0 67.828828L430.065919 534.448268l285.868773 285.868773c18.73776 18.73776 18.73776 49.092092 0 67.828828s-49.092092 18.73776-67.828828 0L294.408263 534.448268z" fill="#7a7a7a" p-id="4006"></path></svg>
                  <div>back</div>
                </div>
              </div>
              <!-- map -->
              <div class="relative">
                <div id='map' class="w-full h-96 rounded-t shadow-default"></div>
                <div v-if="mapList.package.tracking_no" class="absolute right-0 bottom-0 w-full p-3 flex justify-around items-center text-base" style="background-color: #ffffff94;">
                  <div>
                    <div>Tracking NO.:{{mapList.package.tracking_no}}</div>
                    <!-- <div>Order NO.:{{mapList.package.booking_no}}</div> -->
                  </div>
                  <div class="flex items-center">
                    <div>{{mapList.package.start_city}}</div>
                    <svg t="1695092198133" class="icon mx-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14856" width="28" height="28"><path d="M248.768 244.416l561.152 265.6a38.4 38.4 0 0 1 0.576 69.12L248.128 857.6a38.4 38.4 0 0 1-52.352-49.6l99.776-232L480 576a32 32 0 0 0 31.488-26.24L512 544a32 32 0 0 0-32-32H294.912L197.312 294.784a38.4 38.4 0 0 1 51.456-50.432z" fill="#e66a10" p-id="14857"></path></svg>
                    <div>{{mapList.package.end_area}},{{mapList.package.end_country}}</div>
                  </div>
                </div>
              </div>
              <!-- track -->
              <div v-if="trackList.msg" class="p-4 bg-white dark:bg-darkMenu rounded-b">
                <div class="mb-4 grid grid-cols-2 gap-4">
                  <div class="col-span-1">
                    <div class="flex justify-between items-center">
                      <div class="font-semibold">Order details</div>
                      <router-link :to="{path:'/order/forwardingOrder/'+orderInfo.id,query:{boxId:orderInfo.box_id}}" class="flex items-center text-orange hover:underline">
                        <div>View Order Details</div>
                        <svg t="1714961621345" class="icon ml-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4411" width="14" height="14"><path d="M801.92 478.08L394.624 71.04a48 48 0 0 0-67.84 67.84L700.096 512 326.784 885.376a48 48 0 0 0 67.84 67.84L801.92 545.92a48 48 0 0 0 0-67.84z" fill="#E66A10" p-id="4412"></path></svg>
                      </router-link>
                    </div>
                  </div>
                  <div class="col-span-1">
                    <div class="flex justify-between items-center">
                      <div class="font-semibold">Product details</div>
                      <router-link :to="{path:'/warehouse/CargoManagement'}" class="flex items-center text-orange hover:underline">
                        <div>View Product Details</div>
                        <svg t="1714961621345" class="icon ml-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4411" width="14" height="14"><path d="M801.92 478.08L394.624 71.04a48 48 0 0 0-67.84 67.84L700.096 512 326.784 885.376a48 48 0 0 0 67.84 67.84L801.92 545.92a48 48 0 0 0 0-67.84z" fill="#E66A10" p-id="4412"></path></svg>
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="mb-4 grid grid-cols-2 gap-4">
                  <div class="col-span-1 mt-2 p-3 rounded-md border border-oranges">
                    <div class="flex items-center">
                      <img :src="mapList.package.order_type_img" class="w-8 h-8 mr-3" alt="">
                      <div>{{mapList.package.order_type_name}}</div>
                    </div>
                    <div class="mt-6 grid grid-cols-2 gap-3">
                      <div class="col-span-1">
                        <div>Order NO.:</div>
                        <div class="mt-2">{{mapList.package.booking_no}}</div>
                      </div>
                      <div class="col-span-1">
                        <div>Service Type:</div>
                        <div class="mt-2">{{channel[orderInfo.transport_type - 1]}}</div>
                      </div>
                    </div>
                  </div>
                  <div v-if="mapList.product_detail" class="col-span-1 mt-2 p-3 rounded-md border border-oranges">
                    <div class="flex items-center">
                      <img :src="mapList.product_detail.product_img" class="flex-shrink-0 w-8 h-8 mr-3" alt="">
                      <div class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                        <span v-for="(ix, nx) in mapList.product_detail.outbound_no_list" :key="nx">
                          <span v-show="nx>0">, </span><span>{{ix}}</span>
                        </span>
                      </div>
                    </div>
                    <div class="mt-6 grid grid-cols-3 gap-3">
                      <div v-show="mapList.product_detail.detail.box_good" class="col-span-1">
                        <div>EQ Type/Q'ty:</div>
                        <div class="mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                          <span v-for="(ix, nx) in mapList.product_detail.detail.box_good" :key="nx">
                            <span v-show="nx>0">/</span><span>{{boxGood[ix.box]}}</span>x<span>{{ix.num}}</span>
                          </span>
                        </div>
                      </div>
                      <div class="col-span-1">
                        <div>Total Volume:</div>
                        <div class="mt-2">{{mapList.product_detail.detail.volume}}CBM</div>
                      </div>
                      <div class="col-span-1">
                        <div>Total Weight:</div>
                        <div class="mt-2">{{mapList.product_detail.detail.weight}}KG</div>
                      </div>
                      <div v-show="mapList.product_detail.detail.num" class="col-span-1">
                        <div>Boxes:</div>
                        <div class="mt-2">{{mapList.product_detail.detail.num}}</div>
                      </div>
                    </div>
                    <div v-show="mapList.product_detail.supplier" class="mt-4">
                      <div>Supplier:</div>
                      <div class="mt-2">{{mapList.product_detail.supplier}}</div>
                    </div>
                  </div>
                </div>
                <div class="text-base font-semibold">Status and history</div>
                <ul class="mt-6">
                  <li v-for="(i,n) in trackList.msg" :key="n" class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div :class="[n==0 ? 'bg-white dark:bg-darkMenu':'bg-transparent']" class="z-10 w-4 flex items-end" style="margin: -43px -9px 0 0;height: 60px;">
                        <div :class="[n==0 ? 'border-orange' : 'border-gray-300']" class="w-4 h-4 bg-white dark:bg-darkMenu rounded-full border-2"></div>
                      </div>
                      <div :class="[n==0 ? 'text-orange' : '']" style="font-size: 16px;padding: 20px 0 20px 29px;border-left: 2px solid #d7d7d7;">
                        <div >{{i.msg}}</div>
                        <!-- <div v-if="i.is_tail_no == 1" class="flex flex-wrap"> -->
                        <div v-if="n == 0 && trackList.tail_no.length>0" class="flex flex-wrap">
                          <div class="mr-2">Delivered to {{trackList.logistics_companies}}:</div>
                          <div v-for="(ix,nx) in trackList.tail_no" :key="nx"
                            @click="openTail(ix)" class="underline cursor-pointer mr-2">{{ ix }}</div>
                        </div>
                      </div>
                    </div>
                    <div :class="[n==0 ? 'text-orange' : '']" style="width: 216px;white-space: nowrap;flex-shrink: 0;">{{i.status_date}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div ref="pointPanel" class="hidden">
          <div v-if="mapList.package">
            <div class="mt-3 flex items-center justify-between text-sm">
              <div class="flex items-center">
                <img src="" alt="">
                <div class="font-semibold">{{mapList.package.tracking_no}}</div>
              </div>
              <div class="bg-gray-400 text-white rounded px-3 py-0.5">{{itemStatus[mapList.package.status]}}</div>
            </div>
            <div class="mt-2 flex items-center text-gray-400">
              <img src="" alt="">
              <div class="ml-2 py-0.5 px-3 bg-white border rounded-full">{{productType[mapList.package.product_type]}}</div>
              <div class="ml-2 py-0.5 px-3 bg-white border rounded-full">{{mapList.package.num}}ctns/{{mapList.package.weight}}kg/{{mapList.package.volume}}cbm</div>
            </div>
            <div class="mt-2 flex items-center leading-4">
              <img src="" alt="">
              <div>Estimated Shipping Time:{{mapList.package.aging_start}}-{{mapList.package.aging_end}} Business days (Door to Door)</div>
            </div>
            <div class="mt-2 flex items-center leading-4">
              <img src="" alt="">
              <div>{{mapList.package.site}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'mapbox-gl/dist/mapbox-gl.css';
  import mapboxgl from 'mapbox-gl';
  import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';
  import {
    getList,
    getDetail,
  } from '@/api/track'
  import {
    getOrderList
  } from '@/api/order'
  import Status from './status';
  export default {
    // components: {
    //   SelectSearch
    // },
    data() {
      return {
        searchOption: 0,
        searchState: 1,
        searchNo: '',
        statusList:[
          {
            name:'All',
            number:'0'
          },
          {
            name:'Sea Shipping',
            number:'0'
          },
          {
            name:'Air Shipping',
            number:'0'
          },
          {
            name:'Parcel',
            number:'0'
          },
          {
            name:'Express',
            number:'0'
          },
          {
            name:'European railway DDP',
            number:'0'
          },
        ],
        list:[],
        trackList:[],
        mapList:{
          track:[],
          package:{
            site:''
          }
        },
        productType:['','General','Special'],
        itemStatus:['','Pending warehouse','In storage','To be shipped','In transit',
        'Already in port','Picked up','Shipped','Delivered'],
        trackImg:[
          require('../../assets/tracking_sea.png'),
          require('../../assets/tracking_train.png'),
          require('../../assets/tracking_air.png'),
          require('../../assets/tracking_air.png'),
          require('../../assets/tracking_sea.png'),
        ],
        origin: [114.0683, 22.5455],//-122.414, 37.776
        destination: [-77.032, 38.913],
        pointlnglat: [
          // [114.0683, 22.5455],
          // [115.5683, 21.5455],
          // [117.5683, 22.5455],
          // [121.5683, 25.5455],
          // [150.5683, 37.5455],
          // [165.5683, 39.5455],
          // [-123,40],
          // [-83.5683, 6.5455],
          // [-77.032, 38.913],
        ],
        packageSite:[],
        id:0,
        map:null,
        markers:[],
        marker1:null,
        mapboxClient:null,
        channel: ['Sea Freight','Air Freight','Small Package','Express','Train Freight'],
        orderInfo: {
          id: '',
        },
        boxGood: ["","20'GP","40'GP","40'HQ","45'HQ"],
        tailList: [],
        Status:[]
      }
    },
    created() {
      this.$emit('menu', 'tracking')
      this.Status = Status;
      this.searchNo = this.$route.query.q || ''
    },
    mounted() {
      // this.List()
      // document.addEventListener('DOMContentLoaded', function() {
      // this.initmap()
      // }, false);
      getList({ order_no: this.searchNo, status: 0 }).then((res)=>{
        this.list = res.data.list
        if(res.data.list.length>0){
          this.id = res.data.list[0].id
        }
        this.list.forEach(item=>{
            // item.status = parseInt(item.status)-1
            if(item.new_order_type==1){
              item.statusIndex = 0;
            }else if(item.new_order_type == 5 || item.new_order_type == 11) {
              item.statusIndex = 1;
            }else if(item.new_order_type == 2) {
              item.statusIndex = 2;
            }else if(item.new_order_type == 12) {
              item.statusIndex = 3;
            }else if(item.new_order_type == 9 || item.new_order_type == 13|| item.new_order_type == 14|| item.new_order_type == 15) {
              item.statusIndex = 4;
            }else {
              item.statusIndex = 5;
            }
          }) 

        this.statusList[0].number = res.data.count[0].transport_type_0
        this.statusList[1].number = res.data.count[0].transport_type_1
        this.statusList[2].number = res.data.count[0].transport_type_2
        this.statusList[3].number = res.data.count[0].transport_type_3
        this.statusList[4].number = res.data.count[0].transport_type_4
        this.statusList[5].number = res.data.count[0].transport_type_5
        this.trackList = res.data.track
        if(res.data.map.package){
          this.mapList = res.data.map
          getOrderList({
            order_no: res.data.map.package.booking_no,
            status: 0,
          }).then((reh)=>{
            if(reh.data.data.length > 0){
              this.orderInfo = reh.data.data[0]
            }else{
              this.orderInfo = {}
            }
          })
        }
        this.initmap()
        setTimeout(() => {
          if(this.$route.params.id){
            this.trackDetail(this.$route.params.id)
          }
        }, 500)
      })
    },
    methods:{
      List(searchNo,searchState){
        getList({
          order_no: searchNo,
          status: searchState,
        }).then((res)=>{
          if(res.data.list.length>0){
            this.id = res.data.list[0].id
          }
          this.list = res.data.list
          this.list.forEach(item=>{
            if(item.new_order_type==1){
              item.statusIndex = 0;
            }else if(item.new_order_type == 5 || item.new_order_type == 11) {
              item.statusIndex = 1;
            }else if(item.new_order_type == 2) {
              item.statusIndex = 2;
            }else if(item.new_order_type == 12) {
              item.statusIndex = 3;
            }else if(item.new_order_type == 9 || item.new_order_type == 13|| item.new_order_type == 14|| item.new_order_type == 15) {
              item.statusIndex = 4;
            }else if(item.new_order_type == 9 || item.new_order_type == 13|| item.new_order_type == 14|| item.new_order_type == 15) {
              item.statusIndex = '';
            }
          }) 

          this.statusList[0].number = res.data.count[0].transport_type_0
          this.statusList[1].number = res.data.count[0].transport_type_1
          this.statusList[2].number = res.data.count[0].transport_type_2
          this.statusList[3].number = res.data.count[0].transport_type_3
          this.statusList[4].number = res.data.count[0].transport_type_4
          this.statusList[5].number = res.data.count[0].transport_type_5
          this.trackList = res.data.track
          if(res.data.map.package){
            this.mapList = res.data.map
            getOrderList({
              order_no: res.data.map.package.booking_no,
              status: 0,
            }).then((reh)=>{
              if(reh.data.data.length > 0){
                this.orderInfo = reh.data.data[0]
              }else{
                this.orderInfo = {}
              }
            })
          }
        })
      },
      Search(){
        if(this.searchOption == 0){
          this.List(this.searchNo,0)
        }else{
          this.List('',this.searchState)
        }
      },
      async initmap() {
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN || '';
        
        this.mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
        for(let i = 0; i < this.mapList.track.length; i++) {
          let point = this.mapList.track[i].port+','+this.mapList.track[i].city+','+this.mapList.track[i].area+','+ this.mapList.track[i].country
          await this.mapboxClient
          .forwardGeocode({
            query: point,
            autocomplete: false,
            limit: 1
          })
          .send()
          .then((response) => {
            if (
              !response ||
              !response.body ||
              !response.body.features ||
              !response.body.features.length
            ) {
              console.error('Invalid response:');
              console.error(response);
              return;
            }
            const feature = response.body.features[0];
            this.pointlnglat.push(feature.center)
          })
        }

        if(this.mapList.package.site != ''){
          this.mapboxClient
          .forwardGeocode({
            query: this.mapList.package.site,
            // query: 'shenzhen,china',
            autocomplete: false,
            limit: 1
          })
          .send()
          .then((response) => {
            if (
              !response ||
              !response.body ||
              !response.body.features ||
              !response.body.features.length
            ) {
              console.error('Invalid response:');
              console.error(response);
              return;
            }
            const feature = response.body.features[0];
            this.packageSite = feature.center
          })
        }
        
        // console.log(this.pointlnglat);
        setTimeout(() =>{
          this.mapMaker()
        },500)
      },
      mapMaker(){
        var lstLonDiff = []
        let center = [-160.486052, 30.830348]

        if(this.pointlnglat.length>0){
          for (var i = 0; i < this.pointlnglat.length - 1; i++) {
            var detLon = this.pointlnglat[i + 1][0] - this.pointlnglat[i][0];
            if (Math.abs(detLon) > 180) {
              if (detLon > 0) {
                detLon -= 360;
              } else {
                detLon += 360;
              }
            }
            lstLonDiff.push(detLon);
          }
          if (this.pointlnglat[0][0] < 0)
          this.pointlnglat[0][0] += 360;
          for (var i = 0; i < this.pointlnglat.length - 1; i++) {
            this.pointlnglat[i + 1][0] = this.pointlnglat[i][0] + lstLonDiff[i];
          }

          let po = this.pointlnglat
          center[0] = (po[0][0] + po[po.length-1][0]) / 2
          center[1] = (po[0][1] + po[po.length-1][1]) / 2
        }

        var map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/feifeigo/clk66r6gh005z01pxglbw6xv4",
          zoom: 1.5,
          maxZoom: 8,
          center: center,
          // center: [-160.486052, 30.830348],
        });
        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl());

        let panel = this.$refs.pointPanel.innerHTML
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(panel);

        const origin = this.origin;
        const destination = this.destination;

        if(this.packageSite.length>0){
          const marker1 = new mapboxgl.Marker()
            .setLngLat(this.packageSite)
            .setPopup(popup)
            .addTo(map);
          this.marker1 = marker1
        }

        // for(let i = 0; i < this.pointlnglat.length; i++) {
        //   const markers = new mapboxgl.Marker()
        //   .setLngLat(this.pointlnglat[i])
        //   .addTo(map);
        //   this.markers.push(markers)
        // }
        
        const route = {
          'type':'Feature',
          'geometry': {
              'type': 'LineString',
              'coordinates': this.pointlnglat
          }
        };
        
        map.on('load', () => {
          map.addSource('route', {
            'type': 'geojson',
            'data': route
          });

          map.addLayer({
            'id': 'route',
            'source': 'route',
            'type': 'line',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-width': 4,
              'line-color': '#007cbf',
              'line-dasharray': [3, 3]
            }
          });
        });

        this.map = map
      },
      trackDetail(id){
        this.id = id
        getDetail({id:id}).then(async (res)=>{
          this.trackList = res.data.track
          if(res.data.map.package){
            this.mapList = res.data.map
            getOrderList({
              order_no: res.data.map.package.booking_no,
              status: 0,
            }).then((reh)=>{
              if(reh.data.data.length > 0){
                this.orderInfo = reh.data.data[0]
              }else{
                this.orderInfo = {}
              }
            })
          }

          this.map.removeLayer('route')
          this.map.removeSource('route')
          if (this.marker1!==null) {
            this.marker1.remove()
          }
          if (this.markers!==null) {
            for (var i = this.markers.length - 1; i >= 0; i--) {
              this.markers[i].remove()
            }
          }

          // this.mapList.track = [
          //   {
          //   "country": "China", //国家
          //   "area": "Tianjin", //省
          //   "city": "Tianjin", //城市
          //   "port": "" //港口/机场
          //   },
          //   {
          //   "country": "China", //国家
          //   "area": "", //省
          //   "city": "Shanghai", //城市
          //   "port": "SHANGHAI PORT" //港口/机场
          //   },
          //   {
          //   "country": "Cameroon", //国家
          //   "area": "", //省
          //   "city": "", //城市
          //   "port": "Kribi" //港口/机场
          //   },
          //   {
          //   "country": "United States", //国家
          //   "area": "Washington", //省
          //   "city": "Adams County", //城市
          //   "port": "" //港口/机场
          //   }
          // ]
          
          this.pointlnglat = []
          this.packageSite = []

          for(let i = 0; i < this.mapList.track.length; i++) {
            let point = this.mapList.track[i].port+','+this.mapList.track[i].city+','+this.mapList.track[i].area+','+ this.mapList.track[i].country
            await this.mapboxClient
            .forwardGeocode({
              query: point,
              autocomplete: false,
              limit: 1
            })
            .send()
            .then((response) => {
              if (
                !response ||
                !response.body ||
                !response.body.features ||
                !response.body.features.length
              ) {
                console.error('Invalid response:');
                console.error(response);
                return;
              }
              const feature = response.body.features[0];
              this.pointlnglat.push(feature.center)
            })
          }

          if(this.mapList.package.site != ''){
            this.mapboxClient
            .forwardGeocode({
              query: this.mapList.package.site,
              // query: 'shenzhen,china',
              autocomplete: false,
              limit: 1
            })
            .send()
            .then((response) => {
              if (
                !response ||
                !response.body ||
                !response.body.features ||
                !response.body.features.length
              ) {
                console.error('Invalid response:');
                console.error(response);
                return;
              }
              const feature = response.body.features[0];
              this.packageSite = feature.center
            })
          }

          setTimeout(() => {
            var lstLonDiff = []
            let center = [-160.486052, 30.830348]

            if(this.pointlnglat.length>0){
              for (var i = 0; i < this.pointlnglat.length - 1; i++) {
                var detLon = this.pointlnglat[i + 1][0] - this.pointlnglat[i][0];
                if (Math.abs(detLon) > 180) {
                  if (detLon > 0) {
                    detLon -= 360;
                  } else {
                    detLon += 360;
                  }
                }
                lstLonDiff.push(detLon);
              }
              if (this.pointlnglat[0][0] < 0)
              this.pointlnglat[0][0] += 360;
              for (var i = 0; i < this.pointlnglat.length - 1; i++) {
                this.pointlnglat[i + 1][0] = this.pointlnglat[i][0] + lstLonDiff[i];
              }

              let po = this.pointlnglat
              center[0] = (po[0][0] + po[po.length-1][0]) / 2
              center[1] = (po[0][1] + po[po.length-1][1]) / 2
            }

            this.map.flyTo({
              center: center,
              essential: true
            })
            let panel = this.$refs.pointPanel.innerHTML
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(panel);
            this.marker1=null
            this.markers=[]
            if(this.packageSite.length>0){
              const marker1 = new mapboxgl.Marker()
                .setLngLat(this.packageSite)
                .setPopup(popup)
                .addTo(this.map);
              this.marker1 = marker1
            }

            // for(let i = 0; i < this.pointlnglat.length; i++) {
            //   const markers = new mapboxgl.Marker()
            //   .setLngLat(this.pointlnglat[i])
            //   .addTo(this.map);
            //   this.markers.push(markers)
            // }
            
            const route = {
              'type':'Feature',
              'geometry': {
                  'type': 'LineString',
                  'coordinates': this.pointlnglat
              }
            };
            
            this.map.addSource('route', {
              'type': 'geojson',
              'data': route
            });

            this.map.addLayer({
              'id': 'route',
              'source': 'route',
              'type': 'line',
              'layout': {
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-width': 4,
                'line-color': '#007cbf',
                'line-dasharray': [3, 3]
              }
            });
            
            this.$refs.detailPanel.style = 'display: block;height: calc(100vh - 50px);'
          },500)
        })
      },
      closeDetail(){
        this.$refs.detailPanel.style = 'display: none;height: calc(100vh - 80px);'
      },
      openTail(id){
        let upsNo = id.toString().replace(/\//g, '')
        this.tailList = this.trackList.tail_no_list[upsNo]
        this.$refs.mask.style = 'display:block;'
        this.$refs.tailModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.tailModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.tailModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },

    }
  }
  </script>

<style >
.mapboxgl-popup-anchor-left .mapboxgl-popup-tip{
  border-right-color: #ffffffeb;
}

.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
  border-top-color: #ffffffeb;
}

.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
  border-left-color: #ffffffeb;
}

.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
  border-bottom-color: #ffffffeb;
}

.mapboxgl-popup-content {
  background: #ffffffeb;
  width: 280px !important;
}

#marker {
  background-image: url('../../assets/location.png');
  background-size: cover;
  margin-top: -25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.mapboxgl-popup-content button{
  width: 20px;
  height: 20px;
  font-size: 16px;
  outline: none;
}

.mapboxgl-ctrl-bottom-left, .mapboxgl-ctrl-bottom-right{
  display: none !important;
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
