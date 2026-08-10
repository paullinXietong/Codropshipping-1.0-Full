<template>
  <div>
    <el-table
      ref="tableref"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        v-for="item in RowColumn"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :key="item.prop"
        :fixed='item.fixed'>
        <template slot-scope="scope" >
          <div class="w-36 flex items-center" v-if="item.slot=='photos'">
            <img v-if="scope.row.photos != ''" @click="openImg(scope.row.photos)" :src="scope.row.photos" class="w-10 h-10 rounded cursor-pointer" alt="">
          </div>

          <div v-else-if="item.slot=='logistics_no'">
            <span v-for="no in scope.row.logistics_no" :key="no">{{no}}</span>
          </div>

          <div class="w-36 flex items-center" v-else-if="item.slot=='img'">
            <img v-if="scope.row.img != ''" @click="openImg(scope.row.img)" :src="scope.row.img" class="w-10 h-10 rounded cursor-pointer" alt="">
          </div>

          <div v-else-if="item.slot=='size'">
            <div>{{scope.row.length}} * {{scope.row.width}} * {{scope.row.height}}</div>
          </div>

          <div v-else>
            {{scope.row[item.prop]}}
          </div>
        </template>

      </el-table-column>

      <el-table-column
        prop="action"
        label="Operation"
        width="150"
        fixed='right'>
        <template slot-scope="scope" >
          <div>
            <button @click="viewDetail(scope.row.id, scope.row.box_number, scope.row.box_name)" class="text-orange hover:underline">Inventory Records</button>
            <button @click="skuDetail(scope.row.sku_list)" class="text-orange hover:underline">View SKU</button>
          </div>
        </template>

      </el-table-column>

    </el-table>  
  </div>  
</template>

<script>
export default {
  props:{
    tableData:
     {
      type: Array,
    },
    RowColumn:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      Column: [
        {
          label: 'Storage number',
          prop: 'storage_number',
          width: '180'
        },
        {
          label: 'Invetory tracking number',
          prop: 'logistics_no',
          slot: 'logistics_no',
          width: '200'
        },
        {
          label: 'Photos',
          prop: 'photos',
          slot: 'photos',
          width: '180'
        },
        {
          label: 'Product name',
          prop: 'product_name',
          width: '180'
        },
        {
          label: 'Case size(cm)',
          prop: 'case_size',
          width: '180'
        },
        {
          label: 'Carton qty',
          prop: 'carton_qty',
          width: '180'
        },
        {
          label: 'Total Volume(CBM)',
          prop: 'total_volume',
          width: '180'
        },
        {
          label: 'PO/FBA(number)',
          prop: 'pf',
          width: '180'
        },
        {
          label: 'Available Quantity(ctn)',
          prop: 'available_quantity',
          width: '180'
        },
        {
          label: 'In transit(ctn)',
          prop: 'in_transit',
          width: '180'
        },
        {
          label: 'To be released(ctn)',
          prop: 'to_be_released',
          width: '180'
        },
        // {
        //   label: 'In production(ctn)',
        //   prop: 'storage_number',
        //   width: '180'
        // },
        {
          label: 'Inventory time',
          prop: 'inventory_time',
          width: '180'
        },
        {
          label: 'Fee($)',
          prop: 'free',
          width: '180'
        },
        {
          label: 'Warehouse Address',
          prop: 'warehouse_address',
          width: '180'
        },
        {
          label: 'action',
          prop: 'action',
          width: '120',
          fixed:  'right',
          slot: 'action'
        }
      ],
    }
  },
  methods:{
    initColumn(){
      this.customlist.forEach(item=>{
        const row = this.Column.find(i=> i.prop ===item)
        this.RowColumn.push(row)
      })
    },
    openImg(image){
      this.$emit('openImg', image)
    },
    viewDetail(id, no, name){
      this.$emit('viewDetail', id, no, name)
      // console.log(id);
      // this.$router.push({
      //   name:'ApplySpace',
      //   params: {
      //     id: item.manage_id,
      //     status: 'In storage',
      //     statu: 2
      //   },
      // })
    },
    skuDetail(sku){
      this.$emit('skuDetail', sku)
    }
  }
}
</script>

<style>

</style>