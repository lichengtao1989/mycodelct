<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="文件下载" class="cjm-form-item-long">
      <cjm-button type="text" @click="downloadTemplate">点击下载导入模板</cjm-button>
      <cjm-button type="text" @click="downloadOrgInfo">点击下载企业信息</cjm-button>
    </cjm-form-item>
    <cjm-form-item label="文件上传" required class="cjm-form-item-long">
      <cjm-input class="upload-input" v-model="filePath" :disabled="true"></cjm-input>
      <cjm-upload ref="upload" class="upload-button"
                  name="fileData"
                  :action="apiUrl.povertyRecord.IMPORT"
                  accept=".xls,.xlsx"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :on-change="fileChange">
        <cjm-button type="primary">选择文件</cjm-button>
      </cjm-upload>
    </cjm-form-item>
    <p class="upload-tip">温馨提示：请严格按照模版方式进行填写，如部分数据无法上传，请核对格式内容，修改后
重新上传。</p>
    <div class="upload-result upload-error" v-if="status==='error'">
      <p class="upload-result-title">部分数据导入失败：</p>
      <p v-for="error in errors" :key="error">{{error}}</p>
    </div>
    <div class="upload-result upload-success" v-if="status==='success'">
      <p class="upload-result-title">所有数据导入成功</p>
    </div>
  </cjm-form>
</template>

<script>
import fileDownload from 'framework/utils/fileDownload';
export default {
  props: {},
  data() {
    return {
      enums: this.$globalData.get('other', 'enums'),
      apiUrl: this.$globalData.get('other', 'apiUrl'),
      form: {},
      rules: {},
      filePath: '',
      uploadSuccessCallback: null,
      uploadErrorCallback: null,
      status: '',
      errors: []
    };
  },
  computed: {},
  methods: {
    //下载模板
    downloadTemplate() {
      fileDownload(this.$globalData.get('other', 'appConfig').povertyRecordImportTemplateUrl);
    },
    //下载企业信息
    downloadOrgInfo() {
      fileDownload(this.apiUrl.org.EXPORT, {orgType: this.enums.orgType.COMPANY});
    },
    addForm() {
      this.reset();
    },
    reset() {
      this.filePath = '';
      this.status = '';
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submit() {
      return new Promise((resolve, reject) => {
        if (!this.filePath) {
          this.$message.warning('请选择导入文件');
          reject(new Error());
          return;
        }
        this.$refs.upload.submit();
        this.uploadSuccessCallback = resolve;
        this.uploadErrorCallback = reject;
      });
    },
    fileChange(file) {
      if (file.status === 'ready') {
        this.filePath = file.name;
      } else {
        this.$refs.upload.clearFiles();
        this.filePath = '';
      }
    },
    uploadSuccess(response, file) {
      if (response.resultCode == '200') {
        this.status = 'success';
      } else {
        this.status = 'error';
        this.errors = response.msgDetails.msgs ? response.msgDetails.msgs : [response.msg];
      }
      this.uploadSuccessCallback && this.uploadSuccessCallback();
    },
    uploadError(error, file) {
      this.uploadErrorCallback && this.uploadErrorCallback(error);
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';
.upload-input {
  padding-right: 100px;
  box-sizing: border-box;
}

.upload-button {
  position: absolute;
  right: 0;
  top: 0;
}

.upload-tip {
  padding-left: 40px;
  font-size: 13px;
  color: #999;
  margin-bottom: 10px;
}

.upload-result {
  padding-left: 40px;
  font-size: 13px;

  p {
    padding-left: 10px;
    line-height: 22px;
  }

  .upload-result-title {
    font-size: 14px;
    padding-left: 0;
    line-height: 30px;
  }
}

.upload-error {
  color: @Red;
}

.upload-success {
  color: @Green;
}
</style>
