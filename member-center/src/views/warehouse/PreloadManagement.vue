<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto pb-32">
      <div class="mb-3 text-xl font-semibold">Pre-loaded Box Management</div>
      <div class="mt-4 p-4 bg-white dark:bg-darkMenu rounded shadow-default grid grid-cols-6 gap-3">
        <div class="col-span-1">
          <div class="pb-1">Goods No.</div>
          <input v-model="form.no" type="text" class="input h-10">
        </div>
        <div class="col-span-1">
          <div class="pb-1">Box Name</div>
          <input v-model="form.name" type="text" class="input h-10">
        </div>
        <div class="col-span-1">
          <div class="pb-1">Container Type</div>
          <select v-model="form.type" class="select">
            <option value="1">1</option>
          </select>
        </div>
        <div class="col-span-1">
          <div class="pb-1">SKU</div>
          <input v-model="form.sku" type="text" class="input h-10">
        </div>
        <div class="col-span-2 flex items-end">
          <button @click="getData" class="py-2 px-5 rounded mr-3 bg-orange hover:bg-orange1 text-white">Search</button>
        </div>
      </div>
      <div class="mt-8">
        <button class="py-2 px-5 rounded mr-3 bg-orange hover:bg-orange1 text-white text-sm">Creating preloaded boxes</button>
        <div class="mt-3">
          <el-table
            :data="list"
            :header-cell-style="{'background-color':'#EDEDEE'}"
            :cell-class-name="cellClassName"
            empty-text="No data">
            <el-table-column
              label="Good No."
              width="140">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Box Name"
              width="160">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Container Type"
              width="180">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Count"
              width="120">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column label="Product List">
              <el-table-column
                label="Product Name"
                width="160">
                <template slot-scope="scope">
                  <div v-for="(i,n) in scope.row.product" :key="n">
                    <div class="px-2.5 py-1.5" :class="n==0 ? '' : 'border-t'">{{i.name}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Customer SKU"
                width="160">
                <template slot-scope="scope">
                  <div v-for="(i,n) in scope.row.product" :key="n">
                    <div class="px-2.5 py-1.5" :class="n==0 ? '' : 'border-t'">{{i.sku}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Quantity"
                width="140">
                <template slot-scope="scope">
                  <div v-for="(i,n) in scope.row.product" :key="n">
                    <div class="px-2.5 py-1.5" :class="n==0 ? '' : 'border-t'">{{i.qty}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Label"
                width="120">
                <template slot-scope="scope">
                  <div v-for="(i,n) in scope.row.product" :key="n">
                    <div class="px-2.5 py-1.5" :class="n==0 ? '' : 'border-t'">{{i.label}}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              label="Sizes"
              width="140">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Weights"
              width="120">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Remark"
              width="180">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Creation Time"
              width="160">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {
            product: [
              {
                name: "MG10",
                sku: "232323233",
                qty: "1",
                label: "",
              },
              {
                name: "MG10",
                sku: "232323233",
                qty: "1",
                label: "",
              },
            ]
          },
        ],
        form: {
          no: '',
          sku: "",
          name: "",
          type: "",
        },

      }
    },
    created() {
      this.$emit('menu', 'PreloadManagement')
    },
    methods:{
      getData(){

      },
      cellClassName({ row, column, rowIndex, columnIndex }) {
        if (column.label === 'Product Name' || column.label === 'Customer SKU' || 
          column.label === 'Quantity' || column.label === 'Label') {
          return 'product-cell';
        }
      }
    }
  }
</script>

<style>
  .el-table__cell{
    border-color: #d9d9d9 !important;
  }

  .el-table{
    border: 1px solid #d9d9d9 !important;
  }

  .product-cell, .product-cell>.cell{
    padding: 0 !important;
  }
</style>