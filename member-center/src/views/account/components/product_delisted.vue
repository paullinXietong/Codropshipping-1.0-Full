<template>
  <div>
    <div class="bg-white p-3 grid grid-cols-4 gap-4">
      <div class="col-span-1">
        <div>Product Name</div>
        <div class="mt-1">
          <input type="text" class="input h-9 py-1 px-2" placeholder="">
        </div>
      </div>
      <div class="col-span-4 flex select-none">
        <button class="w-24 py-1.5 text-white bg-blue-400 hover:bg-blue-500">Search</button>
        <button class="ml-4 w-24 py-1.5 border border-gray-300 hover:bg-gray-200">Reset</button>
      </div>
    </div>

    <div>
      <el-table
        v-show="list.length != 0"
        :data="list"
        :header-cell-style="{'background-color':'#ededee'}"
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="35">
        </el-table-column>
        <el-table-column
          fixed
          width="860">
          <template slot="header" slot-scope="scope">
            <div class="flex items-center">
              <div class="w-20 text-red-500">已选中{{ selectList.length }}项</div>
              <select v-model="operate" class="select w-20 h-8 p-1">
                <option class="hidden" value="null">操作</option>
                <option value="0">上架</option>
                <option value="1">下架</option>
              </select>
            </div>
          </template>
          <template slot-scope="scope">
            <div class="flex items-center">
              <img class="flex-shrink-0 w-20 h-20 mr-5" :src="scope.row.img" alt="">
              <div>
                <div>{{ scope.row.title }}</div>
                <div class="mt-2 flex items-center">
                  <div>商品系列:{{ scope.row.series }}</div>
                  <svg t="1718676450453" class="ml-2.5 icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1482" width="20" height="20"><path d="M951 512h-62.7c-4.9 0-9 4-9 9v342.4c0 8.8-7.2 16-16 16H160.6c-8.8 0-16-7.2-16-16V160.6c0-8.8 7.2-16 16-16H503c4.9 0 9-4 9-9V73c0-4.9-4-9-9-9H99.8C80 64 64 80 64 99.8v824.3c0 19.8 16 35.8 35.8 35.8h824.3c19.8 0 35.8-16 35.8-35.8V521c0.1-5-4-9-8.9-9z" p-id="1483" fill="#B7B7B7"></path><path d="M337.2 537.6l-2.1 133.2c-0.1 10 8 18.1 17.9 18.1h0.4l132.2-3.2c2.2-0.1 4.5-1 6-2.6l465.8-464.8c3.5-3.5 3.5-9.2 0-12.7l-139.2-139c-1.8-1.8-4-2.6-6.4-2.6s-4.6 0.9-6.4 2.6L339.7 531.4c-1.5 1.7-2.5 3.9-2.5 6.2z m75.7 21.9l387.6-386.8c6.2-6.2 16.4-6.2 22.6 0l28 27.9c6.3 6.3 6.3 16.4 0 22.7l-387.9 387c-2.9 2.9-6.8 4.6-10.9 4.7l-28.2 0.7c-9.1 0.2-16.5-7.2-16.4-16.2 0.1-9.8 0.3-21.7 0.4-28.8 0.1-4.3 1.8-8.3 4.8-11.2z" p-id="1484" fill="#B7B7B7"></path></svg>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品库存"
          sortable
          sort-by="stock"
          width="450">
          <template slot-scope="scope">
            <div>{{ scope.row.stock }}个备货库存，共有{{ scope.row.size }}个属性</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Action"
          width="240">
          <template slot-scope="scope">
            <div class="flex items-center">
              <div class="flex items-center mr-4">
                <input v-model="scope.row.value" type="checkbox" @change="" class="switch">
                <div>上架</div>
              </div>
              <div class="text-blue-500 hover:underline cursor-pointer">Edit</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        source: null,
        operate: null,
        list: [],
        selectList: [],
        searchArr: {
          listing_status: 3,
          subject: '',
        }
      }
    },
    mounted() {
      // this.getData()
    },
    methods: {
      getData() {
        getGoods(JSON.stringify(this.searchArr)).then((res)=>{
          this.list = res.data.list
          this.selectList = []
        })
      },
      handleSelectionChange(val) {
        this.selectList = val
      }
    }
  }
</script>

<style lang="postcss" scoped>
.switch {
  @apply appearance-none w-12 h-6 relative rounded-2xl cursor-pointer bg-gray-200;
}

.switch:before {
  @apply absolute w-5 h-5 bg-white shadow-sm left-0.5 top-0.5 rounded-full origin-left duration-300 ease-out;
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
  left: 26px;
}

.switch:checked:after {
  @apply text-black;
}
</style>