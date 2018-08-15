<template>
  <div>
    <div class='cjm-imgUpload-item'
         :style="itemStyle"
         :class="{'cjm-imgUpload-item-disabled': disabled}"
         @click="handleClick"
         @mouseover="handleMouseOver"
         @mouseout="handleMouseOut">
      <i v-show="showTips" class='cjm-imgUpload-item-tips el-icon-plus'></i>
      <img v-show="showImg" class='cjm-imgUpload-item-img' :src="imgUrl"/>
      <input class="cjm-imgUpload-item-file" type="file" accept="image/gif,image/png,image/jpeg,image/jpg,image/bmp" ref="input" @change="handleChange">
      <div v-show="showProgress" class="cjm-imgUpload-item-progressWrap">
        <cjm-progress type="circle" :width="60" :status="progressStatus"
                      :percentage="uploadProgress"></cjm-progress>
      </div>
      <div v-show="showMasker">
        <div class="cjm-imgUpload-item-masker">
          <i class="cjm-icon-preview" @click.stop="handlePreview"></i>
          <i class="cjm-icon-upload" @click.stop="handleUpload" v-if="!disabled"></i>
          <i class="cjm-icon-delete" @click.stop="handleDelete" v-if="!disabled"></i>
        </div>
      </div>
    </div>
    <cjm-dialog :visible.sync="dialogVisible" :showFooter="false" ref="previewDialog">
      <img :src="imgUrl" class="cjm-imgUpload-item-preview-img"/>
    </cjm-dialog>
  </div>
</template>

<script>
import upload from './upload';
import apiUrl from '../../../../config/apiUrl';
export default {
  name: 'cjm-image-upload-item',
  data() {
    return {
      showProgress: false,
      showImg: false,
      showTips: true,
      showMasker: false,
      uploadProgress: 0,
      progressStatus: '',
      imgUrl: this.value,
      dialogVisible: false
    };
  },
  props: {
    value: String,
    /**
     * 是否禁用
     */
    disabled: Boolean,
    /**
     * 自定义样式
     */
    itemStyle: Object
  },
  watch: {
    value() {
      this.imgUrl = this.value;
      if (this.value) {
        this.showProgress = false;
        this.showTips = false;
        this.showImg = true;
      } else {
        this.showProgress = false;
        this.showTips = true;
        this.showImg = false;
      }
    }
  },
  methods: {
    handleClick() {
      if (this.disabled || this.showMasker) {
        return;
      }
      this.$refs.input.click();
    },
    handleMouseOver() {
      if (this.showImg) {
        this.showMasker = true;
      }
    },
    handleMouseOut() {
      this.showMasker = false;
    },
    handleChange(event) {
      if (!event.target.files) {
        return;
      }
      if (!event.target.files[0].type.startsWith('image')) {
        this.$message.warning('请选择图片文件');
        this.$refs.input.value = null;
        return;
      }
      this.uploadFile(event.target.files[0]);
      this.$refs.input.value = null;
    },
    handleUpload() {
      this.$refs.input.click();
    },
    handlePreview() {
      this.dialogVisible = true;
    },
    handleDelete() {
      this.$emit('delete');
      this.showMasker = false;
    },
    uploadFile(file) {
      this.uploadProgress = 0;
      this.progressStatus = '';
      this.showTips = false;
      this.showImg = false;
      this.showProgress = true;
      upload({
        action: apiUrl.UPLOAD,
        file: file,
        filename: 'Filedata',
        onProgress: e => {
          this.uploadProgress = Math.floor(e.percent);
        },
        onSuccess: res => {
          if (!res.success) {
            this.progressStatus = 'exception';
            this.$message.error(res.msg);
            return;
          }
          this.progressStatus = 'success';
          this.imgUrl = res.obj.Url;
          setTimeout(() => {
            this.showProgress = false;
            this.showImg = true;
            this.$emit('uploadSuccess', this.imgUrl);
          }, 500);
        },
        onError: () => {
          this.progressStatus = 'exception';
          this.$message.error('服务器异常');
        }
      });
    }
  },
  mounted() {
    if (this.value) {
      this.showProgress = false;
      this.showTips = false;
      this.showImg = true;
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less'>
@import '../../../../assets/css/config';

.cjm-imgUpload-item {
  float: left;
  margin-right: 5px;
  border-radius: 5px;
  border: 1px dashed #bfcbd9;
  width: 85px;
  height: 85px;
  line-height: 85px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  position: relative;

  .cjm-icon-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 11;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    background: #db0000;
    width: 19px;
    height: 19px;
    padding-top: 2px;
    box-sizing: border-box;
  }
}

.cjm-imgUpload-item-disabled {
  cursor: not-allowed;

  .cjm-imgUpload-item-tips {
    cursor: not-allowed;
  }
}

.cjm-imgUpload-item-tips {
  color: #bfcbd9;
  cursor: pointer;
  font-size: 26px;
}

.cjm-imgUpload-item-img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: @ExtraLightGray;
}

.cjm-imgUpload-item-file {
  width: 0;
  height: 0;
  display: none;
}

.cjm-imgUpload-item-progressWrap {
  padding-top: 15px;
}

.cjm-imgUpload-item-masker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 90px;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 10;
  color: #fff;

  i {
    font-size: 22px;
    color: #fff;
    cursor: pointer;
  }
}

.cjm-imgUpload-item-preview-img {
  width: 100%;
  background: @ExtraLightGray;
}
</style>
