<template>
  <div>
    <cjm-list :request-url="apiUrl.poorFarmily.GET_LIST" :need-advanced-search="true" base-search-placeholder="输入姓名、手机号、身份证号" ref="list" v-show="currentPage === 'list'">
      <div slot="operate">
        <cjm-button type="primary" @click="add" power-code="poorFarmilyAdd">
          <i class="cjm-icon-add"></i>添加贫困户</cjm-button>
        <cjm-button @click="importData" power-code="poorFarmilyImport">
          <i class="cjm-icon-import"></i>导入</cjm-button>
        <cjm-button @click="exportData" power-code="poorFarmilyExport">
          <i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="姓名" search-key="name" v-model="search.name">
          <cjm-input v-model="search.name"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="乡镇" search-key="villages" v-model="search.villages">
          <cjm-input v-model="search.villages"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="脱贫情况" search-key="povertySituation" v-model="search.povertySituation">
          <cjm-enum-select v-model="search.povertySituation" enum-name="脱贫情况" enum-namespace="other"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="手机号" search-key="mobile" v-model="search.mobile">
          <cjm-input v-model="search.mobile"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="家庭人口" search-key="familyNumber" v-model="search.familyNumber">
          <cjm-input v-model="search.familyNumber"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="name" min-width="120" label="姓名" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="villages" min-width="120" label="乡镇" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="idCardNo" min-width="180" label="身份证号" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="familyNumber" min-width="120" label="家庭人口" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="aveRevenue" min-width="140" label="人均扶贫收入" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="poorType" min-width="120" label="贫困类型" sortable="custom" enum-name="贫困类型" enum-namespace="other"></cjm-table-column>
        <cjm-table-column prop="contractedArea" min-width="150" label="种/养殖面积(亩)" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="povertySituation" min-width="130" label="脱贫情况" sortable="custom" enum-name="脱贫情况" enum-namespace="other"></cjm-table-column>
        <cjm-table-column prop="mobile" min-width="180" label="手机号" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" min-width="160" label="创建时间" sortable="custom"></cjm-table-column>
        <cjm-table-column width="170" label="操作" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.id)" power-code="poorFarmilyEdit">编辑</cjm-button>
            <cjm-button type="text" @click="del([scope.row.id])" power-code="poorFarmilyDelete">删除</cjm-button>
            <cjm-button type="text" @click="viewPovertyRecord(scope.row.id)" power-code="povertyRecordView">扶贫记录</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <!-- 编辑弹框 -->
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" :okHandler="confirm">
      <poorFarmily-edit ref="edit"></poorFarmily-edit>
    </cjm-dialog>
    <!-- 导入弹框 -->
    <cjm-dialog title="导入贫困户" :visible.sync="importDialogVisible" :height="500">
      <poorFarmily-import ref="import"></poorFarmily-import>
      <div slot="footer">
        <cjm-button type="primary" @click="importConfirm" :loading="importButtonLoading">
          <i class="cjm-icon-import"></i>导入
        </cjm-button>
        <cjm-button @click="importCancel" :disabled="importButtonLoading">
          <i class="cjm-icon-close"></i>取消
        </cjm-button>
      </div>
    </cjm-dialog>
    <!-- 扶贫记录页面 -->
    <poverty-record-list v-if="currentPage === 'povertyRecord'"></poverty-record-list>
  </div>
</template>

<script>
import fileDownload from 'framework/utils/fileDownload';
import pageSwitch from 'framework/mixins/pageSwitch';
import PoorFarmilyEdit from './edit.vue';
import PoorFarmilyImport from './import.vue';
import PovertyRecordList from '../povertyRecord/list.vue';
export default {
  components: {
    PoorFarmilyEdit,
    PoorFarmilyImport,
    PovertyRecordList
  },
  mixins: [pageSwitch],
  data() {
    return {
      enums: this.$globalData.get('other', 'enums'),
      apiUrl: this.$globalData.get('other', 'apiUrl'),
      search: {
        name: '',
        villages: '',
        poorType: '',
        povertySituation: '',
        mobile: '',
        familyNumber: '',
        createTime: ''
      },
      dialogTitle: '',
      dialogVisible: false,
      importDialogVisible: false,
      importButtonLoading: false,
      currentPage: 'list'
    };
  },
  computed: {},
  methods: {
    //新增
    add() {
      this.dialogTitle = '添加贫困户';
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.edit.addForm();
      });
    },
    //编辑
    edit(id) {
      this.dialogTitle = '编辑贫困户';
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.edit.editForm(id);
      });
    },
    //删除
    del(ids) {
      this.$confirm('删除贫困户信息，该贫困户扶贫记录也将同步删除，确认要删除吗？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.apiUrl.poorFarmily.DELETE, {
              ids: ids
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
      fileDownload(this.apiUrl.poorFarmily.EXPORT, this.$refs.list.getConditions());
    },
    //查看扶贫记录
    viewPovertyRecord(id) {
      this.pushPage('povertyRecord', '扶贫记录', { poorFarmilyID: id });
    },
    //新增、编辑确认
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
    },
    pageSwitched(pageCodes) {
      if (pageCodes.length === 0) {
        this.currentPage = 'list';
        return;
      }
      this.currentPage = pageCodes[0];
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
</style>
