<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div ref="mask" class="mask"></div>
    <div ref="cancelModal" class="modal p-5 w-96 opacity-20 bg-white dark:bg-darkMenu">
      <div>Sure you want to cancel?</div>
      <div class="mt-16 flex justify-end items-center">
        <button @click="closeModal" class="py-1.5 px-4 border-none hover:underline rounded-md">Cancel</button>
        <button @click="cancelSave" class="ml-4 py-1.5 px-4 bg-orange text-white hover:bg-orange1 rounded-md">Save</button>
      </div>
    </div>

    <div class="h-full overflow-auto">
      <div class="main1 max-w-1600 bg-transparent dark:bg-transparent shadow-none p-1 text-sm mb-32">
        <div class="pb-2 flex items-center">
          <div class="text-lg">Outbound management/</div>
          <div class="text-base text-gray-400">View</div>
        </div>
        <div class="mt-3 p-3 bg-white dark:bg-darkMenu rounded shadow-default">
          <div>
            <div class="mt-3 text-base font-semibold">Basic information:</div>
            <div class="grid grid-cols-6 gap-5">
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Outbound Number:</div>
                <input class="input h-10 bg-gray-200" type="text" v-model="form.outbound_no" disabled>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Product Name:</div>
                <input class="input h-10 bg-gray-200" type="text" v-model="form.cargo_type" disabled>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Total Volume(CBM):</div>
                <input class="input h-10 bg-gray-200" type="text" v-model="form.total_volume" disabled>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Of Boxes:</div>
                <input class="input h-10 bg-gray-200" type="text" v-model="form.unit" disabled>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Warehouse Address:</div>
                <select class="select h-10 bg-gray-200" v-model="form.warehouse_address" disabled>
                  <option value="1">Shenzhen</option>
                </select>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Total Weight(kg):</div>
                <input class="input h-10 bg-gray-200" type="text" v-model="form.total_weight" disabled>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Outbound Service:</div>
                <input class="input h-10 bg-gray-200" type="text" v-model="checked" disabled>
              </div>
              <div v-if="selectList[1].selected" class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Label Carton qty:</div>
                <input class="input h-10 bg-gray-200" type="text" v-model="form.label_carton_qty" disabled>
              </div>
              <div v-if="selectList[2].selected" class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Inspection Carton qty:</div>
                <input class="input h-10 bg-gray-200" type="text" v-model="form.inspection_carton_qty" disabled>
              </div>
              <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
                <div class="flex-shrink-0 text-right pr-2" style="width: 160px;">Fee($):</div>
                <input class="input h-10 bg-gray-200" type="text" v-model="form.free" disabled>
              </div>
            </div>

            <div>
              <div class="mt-8 text-base font-semibold">Detailed list:</div>
              <div class="w-full overflow-x-scroll detailedlist" style="max-width: 1560px;">
                <div v-if="type == '3'" class="inline-flex px-1 py-3 text-xs bg-warehouseList rounded">
                  <div class="w-32">SKU</div>
                  <div class="w-32">photos</div>
                  <div class="w-32">PO/FBA(number)</div>
                  <div class="w-32">Storage number</div>
                  <div class="w-32">SKU Unit</div>
                  <div class="w-32">Factor</div>
                  <div class="w-32">Carton qty</div>
                  <div class="w-36">Weight (boxes)(kg)</div>
                  <div class="w-36">Volume(boxes)(CBM)</div>
                  <div class="w-32">Storage time</div>
                  <div class="w-32">Inbound Days</div>
                  <div class="w-32">Model</div>
                  <div class="w-32">Value (of goods)</div>
                  <div class="w-32">Remark</div>
                </div>
                <div v-if="type == '3'" v-for="(i,n) in list" :key="n"
                  class="inline-flex px-1 py-3 text-xs border-b dark:border-darkLine">
                  <div class="w-32">SKU</div>
                  <div class="w-32">photos</div>
                  <div class="w-32">PO/FBA(number)</div>
                  <div class="w-32">Storage number</div>
                  <div class="w-32">SKU Unit</div>
                  <div class="w-32">Factor</div>
                  <div class="w-32">Carton qty</div>
                  <div class="w-36">Weight (boxes)(kg)</div>
                  <div class="w-36">Volume(boxes)(CBM)</div>
                  <div class="w-32">Storage time</div>
                  <div class="w-32">Inbound Days</div>
                  <div class="w-32">Model</div>
                  <div class="w-32">Value (of goods)</div>
                  <div class="w-32">Remark</div>
                </div>

                <div v-if="type != '3'" class="inline-flex px-1 py-3 text-xs bg-warehouseList rounded">
                  <div class="w-32">photos</div>
                  <div class="w-36">PO/FBA(number)</div>
                  <div class="w-32">Model</div>
                  <div class="w-32">Storage number</div>
                  <div class="w-32">Storage space</div>
                  <div class="w-32">Carton qty</div>
                  <div class="w-32">Weight(kg)</div>
                  <div class="w-32">Volume(CBM)</div>
                  <div v-show="status == 'Awaiting discharge' || status == 'Cancelled'" class="w-32">Storage time</div>
                  <div v-show="status == 'Out of storage' || status == 'Abandoned goods'" class="w-32">Deposit time</div>
                  <div class="w-32">Inbound Days</div>
                  <div class="w-32">Value (of goods)</div>
                  <div class="w-32">Remark</div>
                </div>
                <div v-if="type != '3'" v-for="(i,n) in list" :key="n"
                  class="inline-flex px-1 py-3 text-xs border-b dark:border-darkLine">
                  <div class="w-32">
                    <img v-if="i.photos != ''" :src="i.photos" class="w-10 h-10 rounded" alt="">
                  </div>
                  <div class="w-36">{{i.pf}}</div>
                  <div class="w-32">{{i.model}}</div>
                  <div class="w-32">{{i.storage_number}}</div>
                  <div class="w-32">{{i.storage_space}}</div>
                  <div class="w-32">{{i.carton_qty}}</div>
                  <div class="w-32">{{i.weight}}</div>
                  <div class="w-32">{{i.volume}}</div>
                  <div class="w-32">{{i.storage_time}}</div>
                  <div class="w-32">{{i.inbound_days}}</div>
                  <div class="w-32">{{i.value}}</div>
                  <div class="w-32">{{i.remarks}}</div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button v-if="status == 'Awaiting discharge'" @click="cancelApp"
              class="py-1.5 px-4 border border-gray-600 hover:bg-gray-300 rounded-md">Cancel Outbound</button>
              <router-link :to="{ name: 'CargoManagement' }">
                <button 
                class="ml-4 py-1.5 px-6 bg-orange text-white hover:bg-orange1 rounded-md">Return</button>
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {
    skuDetail,
    treatDetail,
    skuOutlist,
    Outlist,
    skuCancel,
    getCancel,
    cancelOutbound
  } from '@/api/warehouse'
  export default {
    components: {
      
    },
    data() {
      return {
        viewid: null,
        type: '',
        status: '',
        form: {},
        list: [],
        selectList:[
          {
            name: 'Unnecessary',
            no: 0,
            selected: false,
          },
          {
            name: 'Label',
            no: 1,
            selected: false,
          },
          {
            name: 'Inspection',
            no: 2,
            selected: false,
          },
          {
            name: 'Repack',
            no: 3,
            selected: false,
          },
          {
            name: 'Palletize',
            no: 4,
            selected: false,
          },
          {
            name: 'Container Loading',
            no: 5,
            selected: false,
          },
        ],
        checked: '',
      }
    },
    created() {
      this.$emit('menu', 'OutboundManagement')
    },
    mounted() {
      document.addEventListener(
        "click",
        this.even,
        true
      );
      
      this.viewid = this.$route.params.id
      this.type = this.$route.params.type
      this.status = this.$route.params.status

      if(this.status == 'Cancelled'){
        if(this.type == '3'){
          skuCancel({id: this.viewid}).then((res)=>{
            this.form = res.data.data
            this.list = res.data.detail
            this.getservice()
          })
        }else{
          getCancel({id: this.viewid}).then((res)=>{
            this.form = res.data.data
            this.list = res.data.detail
            this.getservice()
          })
        }
      }else if(this.status == 'Awaiting discharge'){
        if(this.type == '3'){
          skuDetail({id: this.viewid}).then((res)=>{
            this.form = res.data.data
            this.list = res.data.detail
            this.getservice()
          })
        }else{
          treatDetail({id: this.viewid}).then((res)=>{
            this.form = res.data.data
            this.list = res.data.detail
            this.getservice()
          })
        }
      }else{
        if(this.type == '3'){
          skuOutlist({id: this.viewid}).then((res)=>{
            this.form = res.data.data
            this.list = res.data.detail
            this.getservice()
          })
        }else{
          Outlist({id: this.viewid}).then((res)=>{
            this.form = res.data.data
            this.list = res.data.detail
            this.getservice()
          })
        }
      }
    },
    destroyed() { 
      document.removeEventListener('click', this.even, true) 
    },
    methods:{
      getservice(){
        let a = []
        for(let i=0;i<this.form.outbound_service.length;i++){
          for(let j=0;j<this.selectList.length;j++){
            if(this.form.outbound_service[i] == this.selectList[j].no){
              this.selectList[j].selected = true
              a.push(this.selectList[j].name)
              break
            }
          }
        }
        this.checked = a.join(', ')
      },
      cancelApp(){
        this.$refs.mask.style = 'display:block;'
        this.$refs.cancelModal.style = 'display:block;'
        setTimeout(()=> {
          this.$refs.mask.style = 'display:block;opacity:1;'
          this.$refs.cancelModal.style =
            'display:block;opacity:1;--tw-scale-x: 1;--tw-scale-y: 1;'
        },1)
      },
      closeModal(){
        this.$refs.mask.style = 'display:none;opacity:0;'
        this.$refs.cancelModal.style = 'display:none;opacity:0.2;--tw-scale-x: 0.5;--tw-scale-y: 0.5;'
      },
      cancelSave(){
        cancelOutbound({id:this.viewid}).then((res)=>{
          this.closeModal()
          if(this.type == '3'){
            skuCancel({id: this.viewid}).then((res)=>{
              this.form = res.data.data
              this.list = res.data.detail
              this.status = 'Cancelled'
              this.getservice()
            })
          }else{
            getCancel({id: this.viewid}).then((res)=>{
              this.form = res.data.data
              this.list = res.data.detail
              this.status = 'Cancelled'
              this.getservice()
            })
          }
        })
      },
    }
  }
</script>

<style lang="postcss" scoped>
.mask {
  @apply fixed w-screen h-screen top-0 left-0 bg-lightText bg-opacity-70 z-50 hidden transform opacity-0;
  transition: opacity 0.4s;
}

.modal {
  @apply fixed z-50 top-1/2 right-1/2 transform scale-50 hidden opacity-20 translate-x-1/2 -translate-y-1/2 max-w-90% max-h-80% overflow-auto bg-white dark:bg-darkMenu rounded text-lightText dark:text-darkText;
  transition: transform 0.4s;
}

.detailedlist::-webkit-scrollbar {
  height: 6px;
}

.detailedlist::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.detailedlist::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 0;
  background: rgb(255, 255, 255);
  border-radius: 6px;
}
</style>