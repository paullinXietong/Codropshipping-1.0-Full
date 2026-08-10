<template>
  <el-dialog
    title="custom list"
    :visible.sync="dialogVisible"
    width="700px"
    append-to-body
  >
    <div class="flex">
      <el-transfer
        v-model="customList"
        :data="data"
        :titles="titles"
        target-order='push'
      ></el-transfer>

      <!-- <div style="margin-left: 20px;margin-top:145px;">
        <el-button
          @click="upword"
          class="block"
        >上移</el-button>

        <el-button
          @click="downword"
          style="margin-left: 0px; margin-top: 10px;"
          class="block ml-0"
        >下移</el-button>

        <el-button
          class="block ml-0"
          style="margin-left: 0px; margin-top: 10px;"
          @click="totop"
        >置顶</el-button>

      </div> -->
    </div>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="summit"
      >Summit</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSetting, setSetting } from "@/api/warehouse";

export default {
  data() {
    return {
      dialogVisible: false,
      titles: ["no show list", "show list"],
      loading: false,
      data: [],
      r_checked:[],
      customList: [],
      type: 1,
    };
  },
  mounted() {
  },
  methods: {
    open(value, table, type) {
      this.customList = value;
      this.data = table;
      this.type = type
      this.dialogVisible = true;
    },
    summit() {
      this.loading = true;
      setSetting({
        type: this.type,
        data: this.customList,
      }).then((res) => {
        this.dialogVisible = false;
        this.loading = false;
        this.$emit('on-submit')
      });
    },
  },
};
</script>

<style>
</style>