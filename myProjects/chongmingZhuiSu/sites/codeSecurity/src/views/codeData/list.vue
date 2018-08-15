<template>
  <div>
    <cjm-list :requestUrl="requestUrl" :need-advanced-search="true" baseSearchPlaceholder="输入企业ID企业名称批次号" :need-base-search="true" ref="list">
      <div slot="search">
        <cjm-search-item label="状态" v-model="search.downStatus" search-key="downStatus">
          <cjm-enum-select v-model="search.downStatus" enum-name="码数据下载状态" enum-namespace="codeSecurity" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="印刷工厂" v-model="search.factoryID" search-key="factoryID">
          <cjm-remote-select v-model="search.factoryID" value-key="corpID" label-key="corpName" :remote-url="$globalData.get('codeSecurity','apiUrl').autoComplete.GET_FACTORYS"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="上传时间" v-model="search.dataFileUploadTime" search-key="dataFileUploadTime">
          <cjm-date-picker v-model="search.dataFileUploadTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="下载时间" v-model="search.dataFileDownLoadTime" search-key="dataFileDownLoadTime">
          <cjm-date-picker v-model="search.dataFileDownLoadTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column sortable="custom" prop="dataFileName" label="文件名" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="" label="文件类型" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.status === '4'||scope.row.status === '5'">密文</span>
            <span v-else="scope.row.status === '4'||scope.row.status === '5'">明文</span>
          </template>
        </cjm-table-column>
        <cjm-table-column sortable="custom" prop="corpName" label="所属企业" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="corpID" label="企业ID" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="batchID" label="生码批次" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="batchNumber" label="数量" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="downStatus" enum-name="码数据下载状态" enum-namespace="codeSecurity" label="状态" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="orderCode" label="订单号" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="dataFileUploadTime" label="上传时间" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="dataFileDownLoadTime" label="下载时间" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="dataFileDownloadCount" label="下载次数" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" label="下载人" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.dataFileDownLoadTime">{{scope.row.userName}}</span>
          </template>
        </cjm-table-column>
        <cjm-table-column sortable="custom" prop="factoryName" label="印刷工厂" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" label="操作" fixed="right" min-width="150">
          <template slot-scope="scope">
            <cjm-button type="text" @click="download(scope.row)" v-if="scope.row.downStatus === '0'|| scope.row.downStatus ==='2'">
              下载
            </cjm-button>
            <cjm-button type="text" @click="onApply(scope.row)" v-if="scope.row.downStatus === '1'">
              未审核
            </cjm-button>
            <cjm-button type="text" @click="apply(scope.row)" v-if="scope.row.downStatus ==='3'">
              再次申请
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog title="短信验证" :visible.sync="dialogVisible" :ok-handler="okCheckMessage">
      <dialog-edit ref="edit" @mobile="getMobile"></dialog-edit>
    </cjm-dialog>
    <cjm-dialog title="下载中..." :visible.sync="dialogVisibleDownload" show-close="false" :ok-handler="okDownload">
      <p style="text-align: center">文件下载中....</p>
      <p style="text-align: center">该文件为加密文件，密码已短信发送到手机号{{userMobile}}，请注意查收！</p>
    </cjm-dialog>
    <cjm-dialog title="备注" :visible.sync="dialogApply" :ok-handler="saveDownNote">
      <dialog-apply ref="applyNote" @downNote="getDownNote"></dialog-apply>
    </cjm-dialog>
  </div>
</template>
<script>
import dialogEdit from './edit.vue';
import dialogApply from './apply-note.vue';
import fileDownload from 'framework/utils/fileDownload';
export default {
  components: {
    dialogEdit,
    dialogApply
  },
  data() {
    return {
      requestUrl: this.$globalData.get('codeSecurity', 'apiUrl').codeData.GET_LIST,
      search: {
        downStatus: '',
        dataFileDownLoadTime: '',
        dataFileUploadTime: '',
        factoryID: '',
        orgID: ''
      },
      userMobile: '',
      dialogType: '',
      dialogVisible: false,
      dialogVisibleDownload: false,
      dialogApply: false,
      downNote: '',
      token: '',
      rowData: {}
    };
  },
  methods: {
    download(row) {
      this.rowData = row;
      this.dialogType = 'download';
      this.$ajax.get(this.$globalData.get('codeSecurity', 'apiUrl').codeData.IS_SMS_AUTH).then(res => {
        if (res.resultCode === '200') {
          this.downloadFile();
          this.rowData.downStatus = '3';
        } else {
          this.dialogVisible = true;
          this.$nextTick(() => {
            this.$refs.edit.addForm();
          });
        }
      });
    },
    apply(row) {
      this.rowData = row;
      this.dialogType = 'apply';
      this.$ajax.get(this.$globalData.get('codeSecurity', 'apiUrl').codeData.IS_SMS_AUTH).then(res => {
        if (res.resultCode === '200') {
          //是否短信授权 是-200 否-500
          this.applyDownload(row);
        } else {
          this.dialogVisible = true;
          this.$nextTick(() => {
            this.$refs.edit.addForm();
          });
        }
      });
    },
    onApply(row) {
      console.log(row);
    },
    okDownload(callback) {
      this.rowData.downStatus = '3';
      this.dialogVisibleDownload = false;
      callback();
    },
    okCheckMessage(callback) {
      this.$refs.edit
        .checkCode()
        .then(res => {
          this.dialogVisible = false;
          if (this.dialogType === 'download') {
            this.downloadFile();
          } else {
            this.applyDownload();
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
        });
      callback();
    },
    downloadFile() {
      this.dialogVisibleDownload = true;
      this.$ajax.get(this.$globalData.get('codeSecurity', 'apiUrl').codeData.GET_TOKEN, { CodeGenerationID: this.rowData.codeGenerationID }).then(res => {
        this.token = res.data;
        if (res.resultCode === '200') {
          switch (this.rowData.status) {
            case '0':
            case '1':
            case '2':
            case '3':
              /*明文下载*/
              fileDownload(this.$globalData.get('codeSecurity', 'apiUrl').codeData.EXPRESS_DOWNLOAD, { downloadtoken: this.token });
              this.$refs.list.refresh();
              this.$message('下载完成!');
              break;
            case '4':
            case '5':
              /*密文下载*/
              fileDownload(this.$globalData.get('codeSecurity', 'appConfig').ciphertextDownload + '?token=' + this.token + '&notifyid=' + this.rowData.encryptionnotifyID + '&fileId=' + this.rowData.encryptionfileID);
              this.$refs.list.refresh();
              this.$message('下载完成!');
              break;
          }
        } else {
          this.$message(res.msg);
        }
      });
    },
    applyDownload(row) {
      this.dialogApply = true;
      this.$nextTick(() => {
        this.$refs.applyNote.addForm();
      });
    },
    saveDownNote(callback) {
      this.$refs.applyNote.submit();
      let params = {
        codeGenerationIDs: this.rowData.codeGenerationID,
        corpIDs: this.rowData.corpID,
        downNote: this.downNote
      };
      this.$ajax.post(this.$globalData.get('codeSecurity', 'apiUrl').codeData.APPLY, params).then(res => {
        if (res.resultCode === '200') {
          this.$refs.list.refresh();
          this.rowData.downStatus = '1';
          callback();
          this.dialogApply = false;
        } else {
          this.$message(res.msg);
        }
      });
    },
    getMobile(val) {
      this.userMobile = val;
    },
    getDownNote(val) {
      this.downNote = val;
    }
  },
  mounted() {
    this.$ajax.get(this.$globalData.get('codeSecurity', 'apiUrl').codeData.GET_USER_INFO).then(res => {
      this.userMobile = res.data.Mobile;
    });
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';
</style>
