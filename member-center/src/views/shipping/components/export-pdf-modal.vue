<template>
  <el-dialog
    title="Export Price"
    :visible.sync="showModal"
    :modal-append-to-body="false"
    width='800'
  >
    <!-- <el-select v-model="tempS" style="width:200px">
        <el-option v-for="item in temList" :value="item.id" :key="item.id">{{ item.name }}</el-option>
    </el-select> -->
    <div
      class="downloadInvoices"
      style="padding-bottom: 30px;padding-top: 40px;"
    >
      <div>
        <img
          src="@/assets/logo/co-logistics.png"
          style="height: 100px; vertical-align: middle;"
        >
        <div class="name-company">Cooperate Logistics Co.,Ltd</div>
        <div style="text-align: center; font-size: 20px;color: black;">Email: {{email}}</div>
      </div>

      <div class="info">
        <div style="flex:1">
          <div class="flex-item">
            Quotation Date: &nbsp; {{ addprice.date }}
          </div>
          <div class="flex-item">
            {{ addprice.info }}
          </div>
        </div>
      </div>

      <!-- <h4 style="margin-left: 30px;font-size: 16px;color: black;margin-bottom: 10px;">By Sea With DDP Freight</h4> -->
      <div :id="tempS=='2'?'pdf-table-blur':'pdf-table-withe'" class="export-table-color">
        <el-table
          border
          stripe
          :columns="tableHeader"
          :data="addprice.priceList"
          style="margin: 0 30px;color: black;width: calc(100% - 60px);"
        >
          <el-table-column
            prop="product_name_e"
            label="Service"
          >
          </el-table-column>
          <el-table-column
            prop="add_unit_price"
            label="Unit Price(USD/KG)"
          >
          </el-table-column>
          <el-table-column
            prop="super_freight"
            label="Total Charge(USD)"
          >
          </el-table-column>
          <el-table-column
            label="T/T(days)"
          >
            <template slot-scope="scope">
              <div>{{scope.row.aging_start}} ~ {{scope.row.aging_end}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin: 10px 30px;color: black;font-size: 14px;">
        <div>Remark</div>
        <div style="word-break: break-word;white-space: break-spaces;">{{ addprice.remark }}</div>
      </div>
    </div>

    <div slot="footer">
      <button
        @click="showModal = false"
        class="mr-4 py-1 px-4 rounded h-8 bg-white border hover:bg-gray-200"
      >Cancel</button>
      <button
        @click="downPdf"
        class="py-1 px-4 rounded h-8 bg-orderColor hover:bg-orderHover text-white"
      >Download PDF</button>
    </div>
  </el-dialog>
</template>

<script>
import htmlpdf from '@/utils/htmlpdf'

export default {
  // mixins: [trackMixin],
  data() {
    return {
      showModal: false,
      loading: false,
      tempS: '1',
      temList:[
        {
          id: '1',
          name:'模板1'
        },
        {
          id: '2',
          name:'模板2'
        }
      ],
      tableHeader:[
        {
          title: "Unit Price(USD/KG)",
          key: "unit_price",
          slot: "unit_price"
        },
        {
          title: "Total Charge(USD)",
          key: "total_price",
          slot: "total_price"
        },
        {
          title: "T/T(days)",
          key: "t_t",
        },
      ],
      addprice:{
        priceList:[]
      },
      email:''
    };
  },
  created(){
    if(this.$store.state.user.token){
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.email = userInfo.manage.email
    }else{
      this.email = JSON.parse(localStorage.getItem('chat_info')).manage.service_email
    }
  },
  methods: {
    init(row){
      this.addprice = row
      this.showModal = true
    },
    downPdf(){
      // this.loading = true
      htmlpdf.downloadPDF(".downloadInvoices", "printHide", "Price List").then(res=>{
        // this.pdfmodel = false;
        // this.previewmodel = false;
        // this.loading = false;
      });
      // this.trackEvent('Down PDF',{"type": 'Down Price'})  
    },
  },
};
</script>

<style>
#pdf-table-blur .ivu-table-header thead tr th {
  background: #4b7c89;
  color: #fff;
}

#pdf-table-withe .ivu-table-header thead tr th {
  background: #fff;
}

.export-table-color .ivu-table-cell{
  color: black;
}

.no-table-header .ivu-table-header {
  height: 0px !important;
}
</style>

<style scoped>
.bottom-position-right{
  position: absolute;
  bottom: 0;
  right: 35px;
}
.flex-item {
  height: 28px;
}
.flex-item1 {
  margin-top: 56px;
  height: 28px;
}
.allprice {
  flex: 1;
  padding: 0px 18px;
  box-sizing: border-box;
  vertical-align: middle;
  border-right: 1px solid #e8eaec;
}
.allprice:last-child {
  /* border-right: none; */
}
.weight-bold {
  display: inline-block;
  width: 100px;
  /* font-weight: bold; */
}
.address-box {
  font-size: 22px;
  text-align: center;
  color: #333;
}
.name-company {
  font-size: 40px;
  text-align: center;
  color: #333;
  font-weight: 700;
}
.info {
  padding: 0 30px;
  margin: 10px 0;
  min-height: 56px;
  font-size: 16px;
  color: #222;
  display: flex;
  position: relative;
}

.btn {
  background-color: #333;
  color: #fff;
  border: none !important;
  width: 96px;
}
.btn1:hover {
  background-color: rgb(51, 51, 51) !important;
  color: #fff;
  border: none !important;
}
.btn:hover {
  background-color: rgb(51, 51, 51) !important;
  color: #fff;
  border: none !important;
}

.totals {
  display: flex;
  font-size: 16px;
  /* border: 1px solid #dcdee2;
  border-top: 0;
  border-right: 0; */
  box-sizing: border-box;
}

.totals:hover {
  background-color: #ebf7ff;
}
</style>

<style>
.el-table .cell {
  line-height: 30px !important;
}
</style>