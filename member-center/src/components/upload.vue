<template>
  <div id="upload-image">
    <el-upload
      action=""
      :before-upload="uploadImage"
      class="avatar-uploader"
    >
      <img
        v-if="images.length>0"
        :src="images[0]"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      ></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>

export default {
  props:{
    images: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
    };
  },
  methods: {
    uploadImage(file) {
      this.$emit("uploadImage", file)
      return false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 66px;
  height: 66px;
  line-height: 66px;
  text-align: center;
}
.avatar {
  width: 66px;
  height: 66px;
  display: block;
}
</style>