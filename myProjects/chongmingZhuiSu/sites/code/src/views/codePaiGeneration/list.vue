<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true"
              base-search-placeholder="组织ID、组织名称、批次号">
      <div slot="search">
        <cjm-search-item label="组织ID" search-key="corpID" v-model="search.corpID">
          <cjm-input v-model="search.corpID"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="组织名称" search-key="corpName" v-model="search.corpName">
          <cjm-input v-model="search.corpName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="生码批次" search-key="batchID" v-model="search.batchID">
          <cjm-input v-model="search.batchID"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="状态" search-key="status" v-model="search.status">
          <cjm-enum-select v-model="search.status" enum-name="生码状态" enum-namespace="code"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="是否审核" search-key="isapprove" v-model="search.isapprove">
          <cjm-enum-select v-model="search.isapprove" enum-name="是否" enum-namespace="code"></cjm-enum-select>
        </cjm-search-item>
        <!--<cjm-search-item label="操作时间" search-key="" v-model="">-->
        <!--<cjm-date-picker type="daterange" v-model=""></cjm-date-picker>-->
        <!--</cjm-search-item>-->
        <cjm-search-item label="码上淘" search-key="isMST" v-model="search.isMST">
          <cjm-enum-select v-model="search.isMST" enum-name="是否" enum-namespace="code"></cjm-enum-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column sortable="custom" prop="corpID" label="组织ID" width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="corpName" label="组织名称" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="batchID" label="批次号" min-width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="batchNumber" label="生码量" min-width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="status" label="状态" enum-name="生码状态" enum-namespace="code"
                          width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="labelType" label="标签类型" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="logisticsCodeType" label="物流码类型" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="isMST" label="码上淘" enum-name="是否" enum-namespace="code"
                          width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="isapprove" label="是否审核" enum-name="是否" enum-namespace="code"
                          width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="createName" label="创建人" min-width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="createTime" label="创建时间" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="generateName" label="提交人" min-width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="generateTime" label="提交时间" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="approveName" label="审批人" min-width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="approveTime" label="审批时间" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="factoryName" label="印刷工厂" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="exportTime" label="导出时间" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" label="操作" fixed="right" width="250">
          <template slot-scope="scope">
            <div v-if="scope.row.status >= 3">
              <cjm-button type="text" @click="uploadFile(scope.row)" v-if="scope.row.alreadyUpload == 0">上传</cjm-button>
              <cjm-button type="text" @click="uploadFile(scope.row)" v-if="scope.row.alreadyUpload == 1">
                已上传<span v-if="scope.row.alreadyUploadCount">({{numberFormater(scope.row.alreadyUploadCount, 10000)}}万)</span>
              </cjm-button>
              <cjm-button type="text" @click="paiEdit(scope.row)">π编辑</cjm-button>
              <cjm-button type="text" @click="openCopyConfig(scope.row)">复制配置</cjm-button>
            </div>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog title="上传文件" :visible.sync="fileUploadDailog" :okHandler="fileUploadConfirm" :height="500">
      <cjm-form>
        <cjm-form-item label="文件上传" required class="upload">
          <cjm-input v-model="uploadFileUrl" :disabled="true"></cjm-input>
          <cjm-upload ref="upload" class="upload-button"
                      name="UploadFile"
                      :action="uploadUrl"
                      accept=".txt"
                      :auto-upload="false"
                      :show-file-list="false"
                      :on-success="uploadFileSuccess"
                      :on-change="uploadFileChange">
            <cjm-button type="primary">浏览</cjm-button>
          </cjm-upload>
        </cjm-form-item>
      </cjm-form>
      <div class="upload-tip" style="margin-top: 20px;">
        元素：物流码，防伪码，验证码，序列号，随机码，防伪码Url
      </div>
      <div class="upload-tip">
        注意：物流码层级大于1时,盒标会当成物流码处理表头元素列数和数据列数必须相同
      </div>
    </cjm-dialog>
    <cjm-dialog title="配置信息复制" :visible.sync="copyConfigDialog" :okHandler="copyConfigConfirm" :height="300">
      <cjm-form ref="copyConfig" :rules="rules" :model="copyConfig">
        <cjm-form-item label="企业ID" required prop="copyCoprID">
          <cjm-input v-model="copyConfig.copyCoprID"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="批次号" required prop="copyBatchID">
          <cjm-input v-model="copyConfig.copyBatchID"></cjm-input>
        </cjm-form-item>
      </cjm-form>
    </cjm-dialog>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        requestUrl: this.$globalData.get('code', 'apiUrl').codePaiGeneration.GET_LIST,
        search: {
          corpID: '',
          corpName: '',
          batchID: '',
          status: '',
          isapprove: '',
          isMST: ''
        },
        copyConfig: {
          copyCoprID: '',
          copyBatchID: ''
        },
        rules: {
          copyCoprID: [
            this.$formRules.required
          ],
          copyBatchID: [
            this.$formRules.required
          ]
        },
        uploadUrl: this.$globalData.get('code', 'apiUrl').codePaiGeneration.UPLOAD_FILE_URL,
        uploadFileUrl: '',
        editID: '',
        fileUploadDailog: false,
        copyConfigDialog: false
      }
    },
    methods: {
      //点击π编辑按钮-跳转页面
      paiEdit(row){
        let url = `page.html#/code/codePaiGeneration/edit?id=` + row.iD;
        window.open(url);
      },
      //点击上传按钮-打开弹窗
      uploadFile(row){
        this.uploadFileUrl = '';
        this.uploadUrl += '&id=' + row.iD;
        this.fileUploadDailog = true;
      },
      //点击上传按钮-上传文件
      fileUploadConfirm(callback){
        callback();
        if (!this.uploadFileUrl) {
          this.$message.error('请选择上传的文件');
          return false;
        }
        this.$refs.upload.submit();
      },
      //文件替换时回掉函数
      uploadFileChange(file){
        this.uploadFileUrl = file.name;
      },
      //上传成功后的回掉函数
      uploadFileSuccess(res){
        if (res.resultCode == '200') {
          this.$message.success('上传成功!');
        } else {
          this.$message.error(res.msg);
        }
      },
      //提交复制配置
      copyConfigConfirm(callback){
        this.$refs.copyConfig.validate((val) => {
          if (val) {
            let params = {
              copyCoprID: this.copyConfig.copyCoprID,
              copyBatchID: this.copyConfig.copyBatchID,
              id: this.editID
            };
            this.$ajax.post(this.$globalData.get('code', 'apiUrl').codePaiGeneration.COPY_CONFIG_SUBMIT, params).then((res) => {
              if (res && res.resultCode == 200) {
                this.$message.success('操作成功!');
                this.copyConfigDialog = false;
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        });
        callback();
      },
      //点击打开复制配置弹窗
      openCopyConfig(row){
        this.editID = row.iD;
        this.copyConfigDialog = true;
        this.$nextTick(() => {
          this.$refs.copyConfig.resetFields();
          this.copyConfig = {
            copyCoprID: '',
            copyBatchID: ''
          };
        });
      },
      //数字格式化
      numberFormater(number, type){
        if ((typeof number).toLocaleLowerCase() === 'number' && (typeof type).toLocaleLowerCase() === 'number') {
          return number / type;
        }
      }
    }
  }
</script>
<style scoped="scoped" lang="less">
  .upload {
    width: 85%;
    position: relative;
    .upload-button {
      position: absolute;
      right: -15%;
      top: 0;
    }
  }

  .upload-tip {
    color: #999;
    font-size: 12px;
    text-indent: 40px;
  }
</style>
