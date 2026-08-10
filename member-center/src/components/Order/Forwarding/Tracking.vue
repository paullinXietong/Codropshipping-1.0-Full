<template>
  <div>
    <div v-if="info.track.msg" class="mt-5">
      <!-- map -->
      <div class="relative">
        <div id='map' class="w-full h-96 rounded-t shadow-default"></div>
        <div v-if="mapList.package.tracking_no" class="absolute right-0 bottom-0 w-full p-3 flex justify-around items-center text-base" style="background-color: #ffffff94;">
          <div>
            <div>Tracking NO.:{{mapList.package.tracking_no}}</div>
            <div>Order NO.:{{mapList.package.booking_no}}</div>
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
        <div class="text-base font-semibold">Status and history</div>
        <ul class="mt-6">
          <li v-for="(i,n) in trackList.msg" :key="n" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="[n==0 ? 'bg-white dark:bg-darkMenu':'bg-transparent']" class="z-10 w-4 flex items-end" style="margin: -43px -9px 0 0;height: 60px;">
                <div :class="[n==0 ? 'border-orange' : 'border-gray-300']" class="w-4 h-4 bg-white dark:bg-darkMenu rounded-full border-2"></div>
              </div>
              <div :class="[n==0 ? 'text-orange' : '']" style="font-size: 16px;padding: 20px 0 20px 29px;border-left: 2px solid #d7d7d7;">{{i.msg}}</div>
            </div>
            <div :class="[n==0 ? 'text-orange' : '']" style="width: 216px;white-space: nowrap;flex-shrink: 0;">{{i.status_date}}</div>
          </li>
        </ul>
      </div>
      <!-- <div class="panel">
        <div class="mx-auto max-w-xl">
          <div class="py-2 grid grid-cols-9">
            <div class="col-span-3">{{ info.delivery_city }}</div>
            <div class="col-span-3 flex">
              <svg t="1676603656959" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="35403" width="28" height="28"><path d="M1008.00096 6.272q18.848 13.728 15.424 36.576l-146.272 877.728q-2.848 16.576-18.272 25.728-8 4.576-17.728 4.576-6.272 0-13.728-2.848l-258.848-105.728-138.272 168.576q-10.272 13.152-28 13.152-7.424 0-12.576-2.272-10.848-4-17.44-13.44t-6.56-20.864l0-199.424 493.728-605.152-610.848 528.576-225.728-92.576q-21.152-8-22.848-31.424-1.152-22.848 18.272-33.728l950.848-548.576q8.576-5.152 18.272-5.152 11.424 0 20.576 6.272z" p-id="35404" fill="#7a7a7a"></path></svg>
            </div>
            <div class="col-span-3 flex">
              <div>{{ info.give_area }}</div>
              <div v-if="info.give_area && info.give_area != '' && info.give_country != '' " class="mr-1">,</div>
              <div>{{ info.give_country }}</div>
            </div>
          </div>
          <div class="py-2 grid grid-cols-3">
            <div class="col-span-3 sm:col-span-1 font-semibold">Tracking NO.</div>
            <div class="col-span-1 flex justify-center"></div>
            <div class="col-span-3 sm:col-span-1">{{ info.track_no }}</div>
          </div>
          <div class="py-2 grid grid-cols-3">
            <div class="col-span-3 sm:col-span-1 font-semibold">Arrival Date</div>
            <div class="col-span-1 flex justify-center"></div>
            <div class="col-span-3 sm:col-span-1">{{ info.arrive_time }}</div>
          </div>
          <div class="py-2 grid grid-cols-3">
            <div class="col-span-3 sm:col-span-1 font-semibold">Number of packages</div>
            <div class="col-span-1 flex justify-center"></div>
            <div class="col-span-3 sm:col-span-1">{{ info.num }}</div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="p-3 grid grid-cols-4 border-b border-gray-300 font-semibold">
          <div class="col-span-1">Date&Time</div>
          <div class="col-span-1">Area</div>
          <div class="col-span-2">Track Information</div>
        </div>
        <div v-for="(i,n) in info.msg" :key="n"
          class="p-3 grid grid-cols-4 border-b border-gray-300">
          <div class="col-span-1">{{ i.created_data }}</div>
          <div class="col-span-1">{{ i.area }}</div>
          <div class="col-span-2">{{ i.msg }}</div>
        </div>
      </div> -->
    </div>

    <div v-else class="mt-5 py-20 bg-white dark:bg-darkMenu shadow-default rounded-md flex justify-center items-center">
      <div class="flex flex-col items-center">
        <img src="../../../assets/noTracking.svg" class="md:w-52 md:h-52 w-40 h-40" alt="">
        <div class="mt-5 text-base text-center font-semibold">No logistics information</div>
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
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';
import {
  getOrderInfo
} from '@/api/order'
export default {
  name: 'ForwardTracking',
  props: {
    id: null,
    tab: ''
  },
  data() {
    return {
      info: {
        track:[]
      },
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
      // id:0,
      map:null,
      markers:[],
      marker1:null,
      mapboxClient:null,
    }
  },
  watch:{
    tab: {
      handler (val, oldVal) {
        if(val==7){
          this.getData()
        }
      }
    }
  },
  mounted(){

  },
  methods:{
    getData(){
      getOrderInfo({
        id: this.id,
        type: 8
      }).then((res)=>{
        this.info = res.data
        this.trackList = res.data.track
        if(res.data.map.package){
          this.mapList = res.data.map
        }
        this.initmap()
      })
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
            'line-color': '#007cbf'
          }
        });
      });

      this.map = map
    },
  }
}
</script>

<style >
.panel{
  @apply p-6 mt-4 bg-white dark:bg-darkMenu rounded-md shadow-default;
}

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
  background-image: url('../../../assets/location.png');
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
</style>
