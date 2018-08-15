<template>
  <div>
    <cjm-list :request-url="apiUrl.povertyRecord.GET_LIST"
              :need-advanced-search="true"
              :before-search="beforeSearch"
              base-search-placeholder="输入采购企业、贫困户搜索"
              ref="list">
      <div slot="operate">
        <cjm-button type="primary" @click="add" power-code="povertyRecordAdd" v-if="!poorFamilyID"><i class="cjm-icon-add"></i>新增记录</cjm-button>
        <cjm-button @click="importData" power-code="povertyRecordImport" v-if="!poorFamilyID"><i class="cjm-icon-import"></i>导入</cjm-button>
        <cjm-button @click="exportData" power-code="povertyRecordExport"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="采购企业" search-key="orgID" v-model="search.orgID">
          <cjm-remote-select v-model="search.orgID"
                             :params="{scene: 'povertyAlleviation'}"
                             :remote-url="apiUrl.autoComplete.ORG">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="贫困户" search-key="poorFamilyID" v-model="search.poorFamilyID" v-if="!poorFamilyID">
          <cjm-remote-select v-model="search.poorFamilyID"
                             :remote-url="apiUrl.autoComplete.POOR_FAMILY">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="贫困户手机号" search-key="mobile" v-model="search.mobile" v-if="!poorFamilyID">
          <cjm-input v-model="search.mobile"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="扶贫类型" search-key="povertyType" v-model="search.povertyType">
          <cjm-enum-select v-model="search.povertyType" enum-name="扶贫类型" enum-namespace="other" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="采购产品" search-key="procurementProduct" v-model="search.procurementProduct">
          <cjm-input v-model="search.procurementProduct"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="采购时间" search-key="procurementTime" v-model="search.procurementTime">
          <cjm-date-picker v-model="search.procurementTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <!-- <cjm-search-item label="是否溯源产品" search-key="isTrace" v-model="search.isTrace">
          <cjm-enum-select v-model="search.isTrace" enum-name="是否" enum-namespace="other" :clearable="true"></cjm-enum-select>
        </cjm-search-item> -->
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="orgName" min-width="180" label="采购企业" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="poorFamilyName" min-width="100" label="贫困户" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="mobile" width="140" label="贫困户手机号" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="poorType" width="120" label="贫困类型" sortable="custom" enum-name="贫困类型" enum-namespace="other"></cjm-table-column>
        <cjm-table-column prop="povertyType" width="130" label="扶贫类型" sortable="custom" enum-name="扶贫类型" enum-namespace="other"></cjm-table-column>
        <cjm-table-column prop="procurementTime" width="160" label="采购时间" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="procurementProduct" min-width="160" label="采购产品" sortable="custom"></cjm-table-column>
        <!-- <cjm-table-column prop="isTrace" min-width="110" label="是否溯源产品" sortable="custom" enum-name="是否" enum-namespace="other"></cjm-table-column> -->
        <cjm-table-column prop="quantity" width="90" label="数量" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="price" width="100" label="单价/元" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="totalPrice" width="100" label="总价/元" sortable="custom"></cjm-table-column>
        <cjm-table-column width="110" label="操作" fixed="right">
           <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.id)" power-code="povertyRecordEdit">编辑</cjm-button>
            <cjm-button type="text" @click="del([scope.row.id])" power-code="povertyRecordDelete">删除</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <!-- 编辑弹框 -->
    <cjm-dialog :title="dialogTitle"
                :visible.sync="dialogVisible"
                :okHandler="confirm">
      <poverty-record-edit ref="edit"></poverty-record-edit>
    </cjm-dialog>
    <!-- 导入弹框 -->
    <cjm-dialog title="导入扶贫记录" 
                :visible.sync="importDialogVisible" 
                :height="500">
      <poverty-record-import ref="import"></poverty-record-import>
      <div slot="footer">
        <cjm-button type="primary" @click="importConfirm" :loading="importButtonLoading"><i
            class="cjm-icon-import"></i>导入
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
import PovertyRecordEdit from './edit.vue';
import PovertyRecordImport from './import.vue';
export default {
  components: {
    PovertyRecordEdit,
    PovertyRecordImport
  },
  mixins: [pageSwitch],
  data() {
    return {
      enums: this.$globalData.get('other', 'enums'),
      apiUrl: this.$globalData.get('other', 'apiUrl'),
      search: {
        poorFamilyID: '',
        orgID: '',
        mobile: '',
        poorType: '',
        povertyType: '',
        procurementProduct: '',
        procurementTime: ''
        // isTrace: ''
      },
      dialogTitle: '',
      dialogVisible: false,
      importDialogVisible: false,
      importButtonLoading: false,
      poorFamilyID: ''
    };
  },
  computed: {},
  methods: {
    //搜索前的钩子函数
    beforeSearch(conditions) {
      conditions = conditions || {};
      if (this.poorFamilyID) {
        conditions.poorFamilyID = this.poorFamilyID;
      }
      return conditions;
    },
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
    del(ids) {
      this.$confirm('确认要删除吗？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.apiUrl.povertyRecord.DELETE, {
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
      const conditions = this.$refs.list.getConditions();
      if(this.poorFamilyID){
        conditions.poorFamilyID = this.poorFamilyID;
      }
      fileDownload(this.apiUrl.povertyRecord.EXPORT, conditions);
    },
    confirm(callback) {
      this.$refs.edit.submit().then(() => {
        this.$message.success('保存成功');
        this.dialogVisible = false;
        this.$refs.list.refresh();
        callback();
      }).catch(error => {
        if (error) {
          this.$message.error(error.message);
        }
        callback();
      });
    },
    //导入确认
    importConfirm() {
      this.importButtonLoading = true;
      this.$refs.import.submit()
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
    const params = this.getPageParams('povertyRecord');
    if (params && params.poorFarmilyID) {
      //代表是查看一个贫困户的记录
      this.poorFamilyID = params.poorFarmilyID;
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
