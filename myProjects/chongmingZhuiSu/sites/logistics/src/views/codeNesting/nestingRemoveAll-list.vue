<template>
  <div>
    <cjm-list :need-base-search="true" :need-advanced-search="true" :requestUrl="requestUrl" ref="list" base-search-placeholder="输入物流码、上级物流码">
      <div slot="operate">
        <cjm-button @click="nest" class="cjm-icon-unbox" type="primary" power-code="unBoxing">拆解整箱</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="物流码" search-key="logisticsCode" v-model="search.logisticsCode">
          <cjm-input v-model="search.logisticsCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="创建人" search-key="createBy" v-model="search.createName">
          <cjm-remote-select v-model="search.createName" :remote-url="logisticsApiUrl.autoComplete.USER"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="拆箱时间" search-key="createTime" v-model="search.endingTime">
          <cjm-date-picker v-model="search.endingTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="处理状态" search-key="resultStatus" v-model="search.resultStatus">
          <cjm-enum-select v-model="search.resultStatus" enum-namespace="logistics" enum-name="物流处理状态" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="logisticsCode" label="物流码" min-width="170"></cjm-table-column>
        <cjm-table-column prop="operationType" enum-namespace="logistics" enum-name="操作类型" label="操作类型" min-width="100"></cjm-table-column>
        <cjm-table-column prop="createName" label="创建人" min-width="100"></cjm-table-column>
        <cjm-table-column prop="createTime" label="创建时间" sortable="custom" min-width="150"></cjm-table-column>
        <cjm-table-column prop="result" label="结果" sortable="custom" min-width="180"></cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog title="拆解整箱" :visible.sync="dialogVisible" :ok-handler="confirm">
      <nesting-remove-all-edit ref="editPage"></nesting-remove-all-edit>
    </cjm-dialog>
  </div>
</template>

<script>
  import nestingRemoveAllEdit from './nestingRemoveAll-edit.vue'
  export default {
    components: {
      nestingRemoveAllEdit
    },
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        requestUrl: logisticsApiUrl.codeNesting.GET_PRODUCT_DATA_HISTORY_LIST + '&operationType=2', //调用产品装箱接口
        dialogVisible: false,
        search: {
          logisticsCode: '',
          createName: '',
          endingTime: '',
          resultStatus: ''
        },
        rules: {
          logisticsCode: [
            this.$formRules.logisticsCode
          ]
        }
      }
    },
    methods: {
      nest(){
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.editPage.addForm();
        });
      },
      confirm(callback){
        this.$refs.editPage.submit().then(() => {
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        }).catch(error => {
          if (error) {
            this.$message.error(error.message);
            this.$refs.list.refresh();
          }
          callback();
        })
      }
    }
  }
</script>

<style lang="css">
</style>
