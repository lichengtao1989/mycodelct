<template>
  <div>
    <cjm-list :requestUrl="requestUrl" :need-base-search="true" :need-advanced-search="true" ref="list" base-search-placeholder="输入物流码、上级物流码" :before-search="beforeSearch">
      <div slot="operate">
        <cjm-button @click="nest" class="cjm-icon-add" type="primary" power-code="boxing">手工装箱</cjm-button>
        <cjm-button @click="exportData" class="cjm-icon-export">导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="物流码" search-key="logisticsCode" v-model="search.logisticsCode">
          <cjm-input v-model="search.logisticsCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="上级码" search-key="parentCode" v-model="search.parentCode">
          <cjm-input v-model="search.parentCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="装箱级别" search-key="layer" v-model="search.layer">
          <cjm-enum-select v-model="search.layer" enum-namespace="logistics" enum-name="装箱级别" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="处理状态" search-key="resultStatus" v-model="search.resultStatus">
          <cjm-enum-select v-model="search.resultStatus" enum-namespace="logistics" enum-name="物流处理状态" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="产品" search-key="productID" v-model="search.productIDAndSpecID">
          <cjm-remote-select v-model="search.productIDAndSpecID" :remote-url="logisticsApiUrl.autoComplete.PRODUCT">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="产品批次" search-key="productBatchID" v-model="search.productBatchID">
          <cjm-remote-select v-model="search.productBatchID" :remote-url="logisticsApiUrl.autoComplete.PRODUCT_BATCH">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="创建人" search-key="createBy" v-model="search.createName">
          <cjm-remote-select v-model="search.createName" :remote-url="logisticsApiUrl.autoComplete.USER">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="装箱时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="datetimerange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="logisticsCode" label="物流码" width="170"></cjm-table-column>
        <cjm-table-column prop="parentCode" label="上级物流码" width="170"></cjm-table-column>
        <cjm-table-column prop="layer" label="装箱级别" width="110" enum-namespace="logistics" enum-name="装箱级别"></cjm-table-column>
        <cjm-table-column prop="operationType" label="操作类型" enum-namespace="logistics" enum-name="操作类型" width="100"></cjm-table-column>
        <cjm-table-column prop="productCode" label="产品编号" min-width="110"></cjm-table-column>
        <cjm-table-column prop="productName" label="产品名称" min-width="110"></cjm-table-column>
        <cjm-table-column prop="do_Spec" label="产品规格" min-width="110"></cjm-table-column>
        <cjm-table-column prop="productBatchCode" label="产品批次" min-width="110"></cjm-table-column>
        <cjm-table-column prop="createName" label="创建人" width="90"></cjm-table-column>
        <cjm-table-column prop="createTime" label="创建时间" width="150" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="result" label="结果" min-width="180" sortable="custom"></cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog title="产品装箱" :visible.sync="dialogVisible" :ok-handler="confirm">
      <nesting-edit ref="editPage"></nesting-edit>
    </cjm-dialog>
  </div>
</template>

<script>
import fileDownload from 'framework/utils/fileDownload';
import nestingEdit from './nesting-edit.vue';
export default {
  components: {
    nestingEdit
  },
  data() {
    let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
    return {
      logisticsApiUrl: logisticsApiUrl,
      requestUrl: logisticsApiUrl.codeNesting.GET_PRODUCT_DATA_HISTORY_LIST + '&operationType=1', //调用产品装箱接口
      search: {
        logisticsCode: '',
        parentCode: '',
        layer: '',
        productIDAndSpecID: '',
        productBatchID: '',
        createName: '',
        createTime: '',
        processingState: '',
        resultStatus: ''
      },
      dialogVisible: false
    };
  },
  methods: {
    //点击 手工装箱 弹窗
    nest() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editPage.addForm();
      });
    },
    //点击 确定
    confirm(callback) {
      this.$refs.editPage
        .submit()
        .then(() => {
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
            this.$refs.list.refresh();
          }
          callback();
        });
    },
    beforeSearch(conditions) {
      if (conditions.productID && conditions.productID.indexOf(',') > 0) {
        let a = conditions.productID.split(',');
        conditions.productID = a[0];
        conditions.specID = a[1];
      }
      return conditions;
    },
    //导出
    exportData() {
      fileDownload(this.logisticsApiUrl.codeNesting.EXPORT_CODE_NESTING_LIST + '&operationType=1', this.$refs.list.getConditions());
    }
  }
};
</script>

<style lang="css">

</style>
