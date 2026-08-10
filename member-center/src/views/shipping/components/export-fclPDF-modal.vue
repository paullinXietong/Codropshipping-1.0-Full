<template>
  <el-dialog
    title="Export Price"
    :visible.sync="showModal"
    :modal-append-to-body="false"
    width='1000'
  >
    <!-- <Select v-model="tempS" style="width:200px">
        <Option v-for="item in temList" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select> -->
    <div
      class="downloadInvoice"
      style="padding-bottom: 30px;"
    >
      <div>
        <div class="name-company">Cooperate Logistics Co.,Ltd</div>
        <div style="text-align: center; font-size: 20px;color: black;">Add:B701,BantianinternationCenter,Huangchennanroad,Longang, Shenzhen</div>
        <div class="flex info-content">
          <div>
            E: {{email}}
          </div>
          <div>
            Web: https://app.cargosoon.com
          </div>
        </div>
      </div>

      <div class="user-info-content">
        <div class="flex info-content-item">
          <div class="flex-1">

          </div>
          <div class='right-box'>
            {{piNumber}}
          </div>
        </div>
        <div class="flex info-content-item">
          <div class="flex-1">
            To:
          </div>
          <div class='right-box'>
            DATE: {{date}}
          </div>
        </div>
        <div class="flex info-content-item">
          <div class="flex-1">
            {{info.company_name}}
          </div>
          <div class='right-box'>
            Incoterm: {{info.pdftype==1?'FOB':'EXW'}}
          </div>
        </div>
      </div>

      <div :id="tempS=='2'?'pdf-table-blur':'pdf-table-withe'" class="export-table-color">
        <el-table
          border
          :data="addpriceList"
          style="margin: 0 30px;color: black;width: calc(100% - 60px);font-size: 12px;"
        >
          <el-table-column
            prop="start_port"
            label="POL"
          >
          </el-table-column>
          <el-table-column
            prop="end_port"
            label="POD"
          >
          </el-table-column>
          <el-table-column
            prop="voyage"
            label="TT"
          >
          </el-table-column>
          <el-table-column
            prop="company"
            label="Carrier"
          >
          </el-table-column>
          <el-table-column
            label="Ocean Freight"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.freight > 0">$ {{scope.row.freight}}</div>
              <div v-if="scope.row.freight == 0">N/A</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="size"
            label="Container Size"
          >
          </el-table-column>
          <el-table-column
            prop="qty"
            label="QTY"
          >
          </el-table-column>
          <el-table-column
            label="Total"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.freight_total > 0">$ {{scope.row.freight_total}}</div>
              <div v-if="scope.row.freight_total == 0">N/A</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin: 10px 30px;color: black;font-size: 14px;">
        <div>Remark</div>
        <div style="word-break: break-word;white-space: break-spaces;">{{ info.remark }}</div>
      </div>
    </div>

    <div slot="footer">
      <button @click="showModal = false"
        class="mr-4 py-1 px-4 rounded h-8 bg-white border hover:bg-gray-200">Cancel</button>
      <button
        @click="downPdf"
        class="py-1 px-4 rounded h-8 bg-orderColor hover:bg-orderHover text-white"
      >Download PDF</button>
    </div>
  </el-dialog>
</template>

<script>
import htmlpdf from "@/utils/htmlpdf";

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
      tableHeader: [
        {
          title: "POL",
          key: "start_port",
          resizable: true,
          width: 95,
        },
        {
          title: "POD",
          key: "end_port",
          resizable: true,
          width: 95,
        },
        {
          title: "TT",
          key: "t_t",
          resizable: true,
          slot: "t_t",
          width: 90,
        },
        {
          title: "Carrier",
          resizable: true,
          key: "carrier",
          width: 120,
        },
        {
          title: "Ocean Freight",
          key: "unit_price",
          resizable: true,
          slot: "unit_price",
          width: 135,
        },
        {
          title: "Container Size",
          width: 105,
          resizable: true,
          key: "type",
        },
        {
          title: "QTY",
          key: "number",
          resizable: true,
          width: 80,
        },
        {
          title: "Total",
          key: "total_price",
          slot: "total_price",
        },
      ],
      addpriceList: [],
      email: "",
      date: "",
      info: {},
      piNumber:'',
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
    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: "Total",
          };
          return;
        } else if (index === 3) {
          const values = data.map((item) => Number(item[key]));

          const v = values.reduce((prev, curr) => {
            return add(prev, curr);
          }, 0);

          sums[key] = {
            key,
            value: '$ '+v,
          };
        } else {
          sums[key] = {
            key,
            value: "",
          };
        }
      });
      return sums;
    },
    init(row, info, date, manageId) {
      // if(getLocal('fclNumber')){
      //   this.piNumber = getLocal('fclNumber')
      // }else{
      //   getFclNumber().then(res=>{
      //     setLocal('fclNumber', res.data.data)
      //     this.piNumber = res.data.data
      //   })
      // }
      this.addpriceList = row;
      this.showModal = true;
      this.info = info;
      this.date = date
      this.manageId = manageId
    },
    downPdf() {
      // this.loading = true;
      // removeLocal('fclNumber')
      htmlpdf
        .downloadPDF(".downloadInvoice", "printHide", "Price List")
        .then((res) => {
          // this.pdfmodel = false;
          // this.previewmodel = false;
          // this.loading = false;
        });
      // this.trackEvent('Down PDF',{"type": 'Down FCL Price'})  
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
.export-table-color .ivu-table-cell {
  color: black;
}

.no-table-header .ivu-table-header {
  height: 0px !important;
}
</style>

<style scoped>
.right-box{
  width: 180px;
  text-align: left;
}
.info-content-item .flex-1{
  flex: 1;
  text-align: left;
}
.user-info-content {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin: 12px 30px;
  padding: 10px;
}
.info-content-item {
  /* text-align: center; */
  font-size: 16px;
  color: black;
  /* justify-content: space-between; */
  margin-top: 5px;
}

.info-content {
  text-align: center;
  font-size: 20px;
  color: black;
  padding: 0 50px;
  justify-content: space-between;
}
.bottom-position-right {
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