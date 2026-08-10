<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto">
      <div class="main1 m-auto max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm">
        <div id='map' class="w-full max-w-1600 h-96 rounded-md shadow-default"></div>
      </div>
    </div>
  </div>
</template>



<script>
  import 'mapbox-gl/dist/mapbox-gl.css';
  import mapboxgl from 'mapbox-gl';
  export default {
    data() {
      return{
        origin: [114.0683, 22.5455],//-122.414, 37.776
        destination: [-77.032, 38.913],
        point: [
          [114.0683, 22.5455],
          [115.5683, 21.5455],
          [117.5683, 22.5455],
          [121.5683, 25.5455],
          [150.5683, 37.5455],
          [165.5683, 39.5455],
          [-123,40],
          [-83.5683, 6.5455],
          // [125.5683, 32.5455],
          [-77.032, 38.913],
        ]
      }
    },
    mounted() {
      this.initmap()
    },
    methods: {
      initmap() {
        var lstLonDiff = [];
        for (var i = 0; i < this.point.length - 1; i++) {
          var detLon = this.point[i + 1][0] - this.point[i][0];
          if (Math.abs(detLon) > 180) {
            if (detLon > 0) {
              detLon -= 360;
            } else {
              detLon += 360;
            }
          }
          lstLonDiff.push(detLon);
        }
        if (this.point[0][0] < 0)
        this.point[0][0] += 360;
        for (var i = 0; i < this.point.length - 1; i++) {
          this.point[i + 1][0] = this.point[i][0] + lstLonDiff[i];
        }
        // console.log(this.point);

        let center = []
        center[0] = (this.origin[0] + this.destination[0]) / 2
        center[1] = (this.origin[1] + this.destination[1]) / 2
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN || '';
        var map = new mapboxgl.Map({
          container: "map",
          // style: "mapbox://styles/mapbox/navigation-night-v1",
          style: "mapbox://styles/feifeigo/clk66r6gh005z01pxglbw6xv4",
          // center: this.destination,
          zoom: 2,
          maxZoom: 8,
          center: [180.486052, 30.830348],
          // zoom: 14
          
        });
        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl());

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Construction on the Washington Monument began in 1848.'
        );
        // const el = document.createElement('div');
        // el.id = 'marker';

        const origin = this.origin;
        const destination = this.destination;

        const marker1 = new mapboxgl.Marker()
          .setLngLat(origin)
          .setPopup(popup)
          .addTo(map);

        const marker2 = new mapboxgl.Marker()
          .setLngLat(destination)
          .addTo(map);

        
        const route = {
          // 'type': 'FeatureCollection',
          'type':'Feature',
          'geometry': {
              'type': 'LineString',
              'coordinates': this.point
          }
          // 'features': [
          //   {
          //     'type': 'Feature',
          //     'geometry': {
          //       'type': 'LineString',
          //       'coordinates': [origin , this.point]
          //     }
          //   },
          //   {
          //     'type': 'Feature',
          //     'geometry': {
          //       'type': 'LineString',
          //       'coordinates': [this.point , destination]
          //     }
          //   },
          // ]
        };

        // const lineDistance = this.$turf.length(route.features[0]);
        // const arc = [];
        // const steps = 600;
        // for (let i = 0; i < lineDistance; i += lineDistance / steps) {
        //   const segment = this.$turf.along(route.features[0], i);
        //   arc.push(segment.geometry.coordinates);
        // }
        // route.features[0].geometry.coordinates = arc;
        
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

          // map.setLayoutProperty('country-label', 'text-field', [
          //   'format',
          //   ['get', 'name_en'],
          //   { 'font-scale': 1.2 },
          //   '\n',
          //   {},
          //   ['get', 'name'],
          //   {
          //     'font-scale': 0.8,
          //     'text-font': [
          //       'literal',
          //       ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
          //     ]
          //   }
          // ]);
        });
      }
    }
  }
</script>

<style>
.mapboxgl-popup {
  max-width: 200px;
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
</style>
