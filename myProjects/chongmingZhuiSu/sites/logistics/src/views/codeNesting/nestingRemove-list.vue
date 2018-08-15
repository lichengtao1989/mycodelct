<template>
  <div>
    <cjm-list :requestUrl="requestUrl" :need-base-search="true" :need-advanced-search="true" base-search-placeholder="输入物流码、上级物流码" ref="list">
      <div slot="operate">
        <cjm-button @click="nest" class="cjm-icon-separate" type="primary" power-code="boxDecrease">分离单标</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="物流码" search-key="logisticsCode" v-model="search.logisticsCode">
          <cjm-input v-model="search.logisticsCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="创建人" search-key="createBy" v-model="search.createName">
          <cjm-remote-select v-model="search.createName" :remote-url="logisticsApiUrl.autoComplete.USER"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="分离时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="处理状态" search-key="resultStatus" v-model="search.resultStatus">
          <cjm-enum-select v-model="search.resultStatus" enum-namespace="logistics" enum-name="物流处理状态" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="logisticsCode" label="物流码" min-width="170"></cjm-table-column>
        <cjm-table-column prop="operationType" label="操作类型" enum-namespace="logistics" enum-name="操作类型" min-width="100"></cjm-table-column>
        <cjm-table-column prop="createName" label="创建人" min-width="100"></cjm-table-column>
        <cjm-table-column prop="createTime" label="创建时间" sortable="custom" min-width="150"></cjm-table-column>
        <cjm-table-column prop="result" label="结果" sortable="custom" min-width="180"></cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog title="分离单标" :visible.sync="dialogVisible" :ok-handler="confirm">
      <nesting-remove-edit ref="editPage"></nesting-remove-edit>
    </cjm-dialog>
  </div>
</template>
<script>
import nestingRemoveEdit from './nestingRemove-edit.vue';
export default {
  components: {
    nestingRemoveEdit
  },
  data() {
    let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
    return {
      logisticsApiUrl: logisticsApiUrl,
      requestUrl: logisticsApiUrl.codeNesting.GET_PRODUCT_DATA_HISTORY_LIST + '&operationType=4',
      search: {
        logisticsCode: '',
        createName: '',
        createTime: '',
        resultStatus: ''
      },
      dialogVisible: false
    };
  },
  methods: {
    nest() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editPage.addForm();
      });
    },
    confirm(callback) {
      this.$refs.editPage
        .submit()
        .then(() => {
          this.dialogVisible = false;
          this.$refs.editPage.reset();
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
    }
  }
};
</script>
