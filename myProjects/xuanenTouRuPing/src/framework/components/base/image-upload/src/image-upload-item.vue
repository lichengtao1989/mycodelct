<template>
  <div class="nz-image-upload-item-wrap" :style="itemStyle">
    <div v-if="isShowPlusIcon" class="nz-image-upload-item" :title="value" @click="uploadClick" key="isShowPlusIcon">
      <i class="el-icon-plus"></i>
    </div>
    <div v-if="isShowImage" class="nz-image-upload-item" :title="value" key="notEmpty">
      <img :src="value" alt="" class="nz-image-upload-viewimg" />
      <div class="csca-image-upload-item-masker">
        <i title="预览" class="nz-icon-preview" @click="handlePreview"></i>
        <i title="上传" class="nz-icon-upload" @click="uploadClick"></i>
        <i title="删除" class="nz-icon-close" @click="delImage"></i>
      </div>
    </div>
    <div v-if="showProgress" class="nz-image-upload-item" :title="value">
      <div class="progress-wrap" @click="uploadClick">
        <el-progress type="circle" :status="progressStatus" :percentage="uploadProgress" :width="60"></el-progress>
      </div>
    </div>
    <input style="display: none" type="file" ref="input" @change="handleChange">
    <!--<nz-dialog :visible.sync="dialogVisible" :showFooter="false" ref="previewDialog">
      <img :src="imgUrl" class="nz-imgUpload-item-preview-img" />
    </nz-dialog>-->
  </div>
</template>
<script>
import upload from './upload';
export default {
  props: {
    value: { type: String, default: '' },
    uploadUrl: { type: String, default: '' },
    /**
     * 自定义样式
     */
    itemStyle: Object
  },
  data() {
    return {
      progressStatus: '',
      uploadProgress: 0,
      showProgress: false,
      imgUrl: this.value,
      dialogVisible: false
    };
  },
  computed: {
    defaultUploadUrl() {
      const { $apiUrl } = this;
      return $apiUrl && $apiUrl.COMMON && $apiUrl.COMMON.UPLOAD_IMAGE ? $apiUrl.COMMON.UPLOAD_IMAGE : '';
    },
    isEmpty() {
      return this.value === '';
    },
    isShowPlusIcon() {
      if (this.showProgress) {
        return false;
      }
      return this.isEmpty;
    },
    isShowImage() {
      if (this.showProgress) {
        return false;
      }
      return !this.isEmpty;
    }
  },
  methods: {
    delImage() {
      this.$emit('del-image');
    },
    handleChange(event) {
      const files = event.target.files;
      if (files && files[0]) {
        this.uploadFile(files[0]);
        this.$refs.input.value = null;
      }
    },
    uploadFile(file) {
      const { onProgress, onSuccess, onError } = this;
      this.showProgress = true;
      upload({
        action: this.uploadUrl || this.defaultUploadUrl,
        file: file,
        filename: 'Filedata',
        onProgress,
        onSuccess,
        onError
      });
    },
    onProgress(e) {
      this.uploadProgress = Math.floor(e.percent);
    },
    onSuccess(res) {
      if (res.resultCode == 200) {
        this.progressStatus = 'success';
        setTimeout(() => {
          this.showProgress = false;
          this.$emit('uploadSuccess', res.data.url);
        }, 500);
      } else {
        this.progressStatus = 'exception';
      }
    },
    onError() {
      this.progressStatus = 'exception';
    },
    uploadClick() {
      this.$refs.input.click();
    },
    handlePreview() {
      this.$eventBus.$emit('preview-image', this.value);
      //this.$refs.previewDialog.show();
    }
  },
  create() {}
};
</script>
<style rel="stylesheet/less" lang="less">
.nz-image-upload-item-wrap {
  display: inline-block;
  width: 90px;
  height: 90px;
  line-height: 90px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.nz-image-upload-item {
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  font-size: 0;
  box-sizing: border-box;
  border: 1px dashed #bfcbd9;
  background-color: #eff2f7;
  cursor: pointer;
  .el-icon-plus {
    font-size: 25px;
    color: #bfcbd9;
    display: inline-block;
    vertical-align: middle;
    font-weight: 400;
    cursor: pointer;
  }
  .progress-wrap {
    display: inline-block;
    vertical-align: middle;
    height: 60px;
  }
}

.nz-image-upload-viewimg {
  max-width: 80px;
  max-height: 80px;
  display: inline-block;
  vertical-align: middle;
}

.csca-image-upload-item-masker {
  display: none;
}

.nz-image-upload-item:hover {
  .csca-image-upload-item-masker {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin: 0 3px;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }
  }
}

.nz-imgUpload-item-preview-img {
  width: 100%;
  background: #eff2f7;
}
</style>
