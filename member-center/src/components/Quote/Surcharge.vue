<template>
  <el-dialog
    title="Local Fee"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    width="780px"
  >
    <div class="sticky top-0">
      <div class="flex text-center border-t border-l border-gray-300 bg-gray-200">
        <div class="detailTable">Fee Breakdown</div>
        <div class="detailTable">20'GP</div>
        <div class="detailTable">40'GP</div>
        <div class="detailTable">40'HQ</div>
        <div class="detailTable">45'HQ</div>
        <div class="detailTable">Consignment</div>
      </div>
    </div>
    <div class="overflow-auto">
      <div class="">
        <div
          v-for="(i,n) in details"
          :key="'de'+n"
          class="flex text-center border-l border-gray-300 hover:bg-ptpdetail"
        >
          <div class="detailTable break-normal">{{i.name_e}}</div>
          <div class="detailTable">{{i.gp20}}</div>
          <div class="detailTable">{{i.gp40}}</div>
          <div class="detailTable">{{i.hq40}}</div>
          <div class="detailTable">{{i.hq45}}</div>
          <div class="detailTable">{{i.ticket}}</div>
        </div>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">Close</el-button>
      <!-- <el-button
        type="primary"
        @click="dialogVisible = false"
      >确 定</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return {
      dialogVisible: false,
      details:[]
    }
  },
  methods:{
    init(details){
      this.dialogVisible = true
      this.details = details
    }
  }
};
</script>

<style scoped>
.detailTable {
  @apply py-3 w-1/6 border-b border-r border-gray-300;
}
</style>