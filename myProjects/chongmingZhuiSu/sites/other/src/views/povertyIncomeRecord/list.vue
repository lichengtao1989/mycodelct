<template>
  <div>
    <cjm-list :request-url="apiUrl.povertyIncomeRecord.GET_LIST" :need-advanced-search="true" base-search-placeholder="贫困户姓名、企业名称、劳务岗位" ref="list">
      <div slot="operate">
        <cjm-button type="primary" @click="add" power-code="povertyIncomeRecordAdd">
          <i class="cjm-icon-add"></i>新增记录</cjm-button>
        <cjm-button @click="importData" power-code="povertyIncomeRecordImport">
          <i class="cjm-icon-import"></i>导入</cjm-button>
        <cjm-button @click="exportData" power-code="povertyIncomeRecordExport">
          <i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="贫困户" search-key="poorFamilyID" v-model="search.poorFamilyID">
          <cjm-remote-select v-model="search.poorFamilyID" :remote-url="apiUrl.autoComplete.POOR_FAMILY">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="贫困户手机号" search-key="mobile" v-model="search.mobile">
          <cjm-input v-model="search.mobile"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="企业名称" search-key="orgID" v-model="search.orgID">
          <cjm-remote-select v-model="search.orgID" :remote-url="apiUrl.autoComplete.ORG">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="劳务岗位" search-key="postID" v-model="search.postID">
          <cjm-remote-select v-model="search.postID" :remote-url="apiUrl.autoComplete.POVERTY_LABOR">
          </cjm-remote-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="orgName" min-width="180" label="所在企业" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="poorFamilyName" min-width="120" label="贫困户" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="mobile" width="140" label="贫困户手机号" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="poorTypeName" width="120" label="贫困类型" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="postName" width="130" label="劳务岗位" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="income" width="160" label="收入/元" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" min-width="160" label="创建时间" sortable="custom"></cjm-table-column>
        <cjm-table-column width="110" label="操作" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.recordID)" power-code="povertyIncomeRecordEdit">编辑</cjm-button>
            <cjm-button type="text" @click="del(scope.row.recordID)" power-code="povertyIncomeRecordDelete">删除</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <!-- 编辑弹框 -->
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" :okHandler="confirm">
      <poverty-income-record-edit ref="edit"></poverty-income-record-edit>
    </cjm-dialog>
    <!-- 导入弹框 -->
    <cjm-dialog title="导入职工收入记录" :visible.sync="importDialogVisible" :height="500">
      <poverty-income-record-import ref="import"></poverty-income-record-import>
      <div slot="footer">
        <cjm-button type="primary" @click="importConfirm" :loading="importButtonLoading">
          <i class="cjm-icon-import"></i>导入
        </cjm-button>
        <cjm-button @click="importCancel" :disabled="importButtonLoading">
          <i class="cjm-icon-close"></i>取消
        </cjm-button>
      </div>
    </cjm-dialog>
  </div>
</template>

<script>
import fileDownload from 'framework/utils/fileDownload';
import pageSwitch from 'framework/mixins/pageSwitch';
import PovertyIncomeRecordEdit from './edit.vue';
import PovertyIncomeRecordImport from './import.vue';
export default {
  components: {
    PovertyIncomeRecordEdit,
    PovertyIncomeRecordImport
  },
  mixins: [pageSwitch],
  data() {
    return {
      enums: this.$globalData.get('other', 'enums'),
      apiUrl: this.$globalData.get('other', 'apiUrl'),
      search: {
        postID: '',
        orgID: '',
        mobile: '',
        poorFamilyID: ''
      },
      dialogTitle: '',
      dialogVisible: false,
      importDialogVisible: false,
      importButtonLoading: false
    };
  },
  computed: {},
  methods: {
    //新增
    add() {
      this.dialogTitle = '新增记录';
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.edit.addForm();
      });
    },
    //编辑
    edit(id) {
      this.dialogTitle = '编辑记录';
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.edit.editForm(id);
      });
    },
    //删除
    del(recordID) {
      this.$confirm('确认要删除吗？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.apiUrl.povertyIncomeRecord.UPDATESTATUS, {
              recordID: recordID,
              status: -1
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$refs.list.refresh();
              } else {
                this.$message.error(r.msg);
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        })
        .catch(() => {});
    },
    //导入
    importData() {
      this.importDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.import.addForm();
      });
    },
    //导出
    exportData() {
      const conditions = this.$refs.list.getConditions();
      fileDownload(this.apiUrl.povertyIncomeRecord.EXPORT, conditions);
    },
    confirm(callback) {
      this.$refs.edit
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    //导入确认
    importConfirm() {
      this.importButtonLoading = true;
      this.$refs.import
        .submit()
        .then(() => {
          this.importButtonLoading = false;
          this.$refs.list.refresh();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          this.importButtonLoading = false;
        });
    },
    importCancel() {
      this.importDialogVisible = false;
    }
  },
  created() {
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
