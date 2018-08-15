<template>
  <div>
    <div v-if="currentPage == 'list'">
      <cjm-list ref="list" :request-url="requestUrl" :need-base-search="needBaseSearch" :need-advanced-search="needAdvancedSearch" base-search-placeholder="申请人名称,申请企业">
        <div slot="operate">
          <cjm-button @click="approvalExport" power-code="approvalExport" type="primary">
            <i class="cjm-icon-add"></i>导出</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="申请企业" search-key="applyCorpName" v-model="search.applyCorpName">
            <cjm-input v-model="search.applyCorpName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="审批模块" search-key="reviewModule" v-model="search.reviewModule">
            <cjm-enum-select v-model="search.reviewModule" enum-name="审批模块" enum-namespace="trace" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="reviewApplyCode" label="审批编号" width="120"></cjm-table-column>
          <cjm-table-column prop="productName" label="产品名称" width="120"></cjm-table-column>
          <cjm-table-column prop="productBatchCode" label="产品批次" width="120"></cjm-table-column>
          <cjm-table-column prop="statusName" label="审批状态" width="120"></cjm-table-column>
          <cjm-table-column prop="reviewResultName" label="审批结果" width="120">
             <template slot-scope="scope">
              <span v-if="scope.row.reviewResultName == '拒绝'" style="color:#e74c3c">拒绝</span>
              <span v-if="scope.row.reviewResultName == '同意'" style="color:#3cd66d">同意</span>
            </template>
          </cjm-table-column>
          <cjm-table-column prop="reviewOpinion" label="审批意见" width="200"></cjm-table-column>
          <cjm-table-column prop="applyByName" label="申请人" width="120"></cjm-table-column>
          <cjm-table-column prop="applyCorpName" label="申请企业" width="180"></cjm-table-column>
          <cjm-table-column prop="createTime" label="申请时间" width="120"></cjm-table-column>
          <cjm-table-column prop="reviewModule" label="审批模块" width="120" enum-name="审批模块" enum-namespace="trace"></cjm-table-column>
          <cjm-table-column prop="level" label="审批优先级" enum-name="优先级" enum-namespace="trace" width="120"></cjm-table-column>
          <cjm-table-column prop="reviewByName" label="审批人" width="160"></cjm-table-column>
          <cjm-table-column prop="reviewTime" label="审批时间" width="160"></cjm-table-column>
          <cjm-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <cjm-tooltip content="审批" v-if="scope.row.status == 2" power-code="pendingEdit" >
                <cjm-button type="text" @click="approval(scope.row)">审批</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="查看" v-if="scope.row.status == 1" >
                <cjm-button type="text" @click="viewDetail(scope.row)">查看</cjm-button>
              </cjm-tooltip>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage == 'pending'" class="cjm-edit-page">
      <pending></pending>
    </div>
  </div>
</template>

<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import pending from './edit';
import fileDownload from 'framework/utils/fileDownload';
export default {
  components: {
    pending
  },
  mixins: [pageSwitch],
  data() {
    return {
      requestUrl: this.$globalData.get('trace', 'apiUrl').approval.GET_APPLY_LIST,
      currentPage: 'list',
      dialogVisible: false,
      needBaseSearch: true,
      needAdvancedSearch: true,
      search: {
        applyCorpName: '',
        reviewModule: '',
        status: ''
      }
    };
  },
  methods: {
    editConfig(row) {
      this.dialogTitle = '编辑设置';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.editConfig.editForm(row.reviewConfigID);
      });
    },
    viewDetail(row) {
      this.pushPage('pending', '查看审批单', { type: 'view', row: row });
    },
    confirm(callback) {
      this.$refs.editConfig
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
    approval(row) {
      this.pushPage('pending', '新建审批单', { row: row });
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    },
    approvalExport() {
      fileDownload(this.$globalData.get('trace', 'apiUrl').approval.REVIEW_EXPORT, this.$refs.list.getConditions());
    }
  },
  created() {}
};
</script>
<style scoped>

</style>
