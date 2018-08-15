<template>
  <div :class="disable ? 'upload-disabled' : ''">
    <upload
      ref="upload"
      :action="action"
      :name="name"
      :data="data"
      :accept="accept"
      :list-type="listStyle"
      :multiple="multiple"
      :disabled="disable"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :auto-upload="autoUpload">
      <cjm-button size="small" type="primary" :disabled="disabled">{{buttonName}}</cjm-button>
      <div slot="tip" class="el-upload__tip" v-if="tips">{{tips}}</div>
    </upload>
    <cjm-dialog v-model="dialogVisible" :showFooter="false" ref="previewDialog">
      <img :src="dialogVisible ? previewImg : ''" style="width:100%;"/>
    </cjm-dialog>
  </div>
</template>

<script>
import { Upload } from 'element-ui';
import apiUrl from 'framework/config/apiUrl';
export default {
  name: 'cjm-upload',
  components: {
    Upload
  },
  props: {
    /**
       *上传的文件字段名
       */
    fileName: String,
    /**
       * 上传文件api
       */
    url: String,
    /**
       * 是否支持多文件上传，默认：flase
       */
    multiple: Boolean,
    /**
       * 支持3种方式传入 1、url字符串 2、用逗号隔开的url字符串 3、url字符串数组
       */
    value: [Array, String],
    /**
       * 最多上传的文件数量
       */
    maxNumber: Number,
    /**
       * 提示语
       */
    tips: String,
    /**
       * 是否禁用
       */
    disabled: Boolean,
    /**
       * 接受上传的文件类型
       */
    acceptType: {
      type: String,
      required: true
    },
    /**
       *文件列表的类型
       */
    listType: String,
    /**
     * 可选参数, 上传时附带的额外参数
     */
    data: Object,
    /**
     * 是否在选取文件后立即进行上传，默认true
     */
    autoUpload: {
      type: Boolean,
      default: true
    },
    buttonName: {
      type: String,
      default: '点击上传'
    }
  },
  data() {
    return {
      fileList: [],
      multipleTemple: [],
      disable: this.disabled,
      multipleLength: 0,
      action: this.url,
      accpet: '',
      listStyle: this.listType,
      name: this.fileName || 'fileData',
      dialogVisible: false,
      previewImg: ''
    };
  },
  methods: {
    //删除
    handleRemove(file, fileList) {
      this.emitInput(fileList);
      this.toggleDisabled();
    },
    //预览
    handlePreview(file) {
      if (/\.(jpg|gif|bmp|png|jpeg)/g.test(file.url)) {
        this.dialogVisible = true;
        this.previewImg = file.url;
      }
    },
    handleError() {
      if (this.multiple) {
        this.multipleLength--;
      }
    },
    handleSuccess(response, file, fileList) {
      if (response.resultCode == 200 && response.data) {
        this.emitInput(response.data, true);
        this.toggleDisabled();
      } else if (this.multiple) {
        this.multipleLength--;
      }
    },
    emitInput(files, add) {
      let self = this;
      if (add) {
        if (this.multiple) {
          this.multipleTemple.push(files);
          if (this.multipleTemple.length == this.multipleLength) {
            this.multipleTemple.forEach(function(d) {
              self.fileList.push(d);
            });
            this.multipleTemple = [];
            this.multipleLength = 0;
            this.$emit('input', this.fileList);
          }
        } else {
          this.fileList.push(files);
          this.$emit('input', this.fileList);
        }
      } else {
        this.fileList = files;
        this.$emit('input', this.fileList);
      }
    },
    beforeUpload(file) {
      if (this.multiple) {
        this.multipleLength++;
      }
    },
    formatValue() {
      let self = this;
      if (this.value) {
        self.fileList = [];
        self.value.forEach(function(d) {
          self.fileList.push(d);
        });
      }
      if (this.maxNumber > 0 && this.fileList.length > this.maxNumber) {
        this.fileList = this.fileList.slice(0, this.maxNumber);
        this.toggleDisabled();
      }
    },
    getAccept() {
      switch (this.acceptType) {
        case 'image': {
          this.accept = '.jpg,.gif,.bmp,.png,.jpeg';
          this.listType || (this.listStyle = 'picture');
          this.url || (this.action = apiUrl.UPLOAD_IMAGE);
          break;
        }
        case 'pdf': {
          this.accept = '.pdf';
          this.url || (this.action = apiUrl.UPLOAD_PDF);
          break;
        }
        case 'excel': {
          this.accept = '.xls,.xlsx';
          break;
        }
        default: {
          this.accept = this.acceptType;
        }
      }
    },
    toggleDisabled() {
      if (
        (typeof this.disabled).toLocaleLowerCase() != 'boolean' &&
        this.maxNumber > 0
      ) {
        if (this.fileList.length >= this.maxNumber) {
          this.disable = true;
        } else if (this.fileList.length < this.maxNumber) {
          this.disable = false;
        }
      }
    },
    submit() {
      this.$refs.upload.submit();
    }
  },
  watch: {
    value() {
      this.formatValue();
    }
  },
  created() {
    this.formatValue();
    this.getAccept();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
.upload-disabled .el-upload-list__item:hover .el-icon-close {
  display: none;
}
</style>
