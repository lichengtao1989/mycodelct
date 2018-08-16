<template>
  <nz-scrollbar style="height:400px;">
    <nz-form ref="form" :model="form" label-width="150px" :rules="rules">
      <nz-form-item label="文件上传" required class="nz-form-item-long">
        <nz-input class="upload-input" v-model="fileName" :disabled="true"></nz-input>
        <nz-upload ref="upload" class="upload-button" name="fileData" :action="$apiUrl.COMMON.UPLOAD_TEMP_FILE" accept=".xls,.xlsx" :auto-upload="true" :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError" :on-change="fileChange">
          <nz-button type="primary">选择文件</nz-button>
        </nz-upload>
      </nz-form-item>
      <p class="upload-tip">温馨提示：请严格按照模版方式进行填写，如部分数据无法上传，请核对格式内容，修改后 重新上传。
      </p>
      <div class="upload-result upload-error" v-if="status==='error'">
        <!-- <p class="upload-result-title">部分数据导入失败：</p> -->
        <p v-for="error in errors" :key="error">{{error}}</p>
      </div>
      <div class="upload-result upload-success" v-if="status==='success'">
        <p class="upload-result-title">所有数据导入成功</p>
      </div>
    </nz-form>
  </nz-scrollbar>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      form: {},
      rules: {},
      fileName: '',
      filePath: '',
      uploadSuccessCallback: null,
      uploadErrorCallback: null,
      status: '',
      errors: []
    };
  },
  computed: {},
  methods: {
    addForm() {
      this.reset();
    },
    reset() {
      this.fileName = '';
      this.status = '';
      this.errors = [];
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    async submit() {
      return new Promise(async (resolve, reject) => {
        if (!this.fileName) {
          reject(new Error('请选择导入文件'));
          return;
        }
        const fileUrl = this.filePath;
        let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.DATAMANAGEMENT.IMPORT_CUSTOMER_LIST, { fileUrl });
        if (res.resultCode == '200') {
          this.status = 'success';
          resolve();
        } else {
          this.status = 'error';
          //const err = err;
          const errmsg = res.data ? res.data : [res.msg];
          this.errors = errmsg;
          reject(new Error(res.msg ? res.msg : err.join(';')));
        }
      });
    },
    fileChange(file) {
      /*if (file.status === 'ready') {
        this.filePath = file.name;
      } else {
        this.$refs.upload.clearFiles();
        this.filePath = '';
      }*/
    },
    uploadSuccess(response, file) {
      console.log(response);
      if (response.resultCode == '200') {
        //this.status = 'success';
        this.fileName = response.data.originName;
        this.filePath = response.data.newName;
      } else {
        this.status = 'error';
        this.errors = response.msg;
        // this.errors = response.msgDetails.msgs ? response.msgDetails.msgs : [response.msg];
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
@import '../../../assets/css/config';
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
