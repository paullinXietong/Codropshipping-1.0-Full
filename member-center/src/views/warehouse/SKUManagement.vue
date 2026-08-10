<template>
  <div class="w-full h-full p-3 sm:p-5 relative">
    <div class="h-full overflow-auto pb-32">
      <div class="mb-3 text-xl font-semibold">SKU Management</div>
      <div class="mt-4 p-4 bg-white dark:bg-darkMenu rounded shadow-default grid grid-cols-5 gap-3">
        <div class="col-span-1">
          <div class="pb-1">SKU</div>
          <input v-model="form.sku" type="text" class="input h-10">
        </div>
        <div class="col-span-1">
          <div class="pb-1">Product Name</div>
          <input v-model="form.name" type="text" class="input h-10">
        </div>
        <div class="col-span-1">
          <div class="pb-1">Product Type</div>
          <select v-model="form.type" class="select">
            <option value="1">1</option>
          </select>
        </div>
        <div class="col-span-2 flex items-end">
          <button @click="getData" class="py-2 px-5 rounded mr-3 bg-orange hover:bg-orange1 text-white">Search</button>
        </div>
      </div>
      <div class="mt-8">
        <button class="py-2 px-5 rounded mr-3 bg-black hover:bg-gray-600 text-white text-sm">Create SKU</button>
        <div class="mt-3">
          <el-table
            :data="list"
            :header-cell-style="{'background-color':'#EDEDEE'}"
            empty-text="No data">
            <el-table-column
              label="Serial No."
              width="140">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Customer SKU"
              width="160">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Product name/(Chinese and English)"
              width="280">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              label="Product type/category"
              width="200">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
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
              label="Product Pictures"
              width="140">
              <template slot-scope="scope">
                <img src="" class="w-12 h-12" alt="">
              </template>
            </el-table-column>
            <el-table-column
              label="Product Labels"
              width="160">
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
            <el-table-column
              label="Remark"
              width="180">
              <template slot-scope="scope">
                <div>MG10</div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Action"
              width="120">
              <template slot-scope="scope">
                <div class="text-orange cursor-pointer hover:underline">View Details</div>
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
          {},
        ],
        form: {
          sku: "",
          name: "",
          type: "",
        },

      }
    },
    created() {
      this.$emit('menu', 'SKUManagement')
    },
    methods:{
      getData(){

      }
    }
  }
</script>