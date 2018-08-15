<template>
    <div>
      <cjm-list ref="list" :request-url="requestUrl" :need-base-search="true" base-search-placeholder="订单号、组织ID" :need-advanced-search="true">
        <div slot="operate">
          <cjm-button power-code="orderDetailListExport" type="default" class="cjm-icon-export" @click="exportData">导出</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="订单号" search-key="orderCode" v-model="search.orderCode">
            <cjm-input v-model="search.orderCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="组织名称" search-key="corpName" v-model="search.corpName">
            <cjm-input v-model="search.corpName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="组织ID" search-key="corpID" v-model="search.corpID">
            <cjm-input v-model="search.corpID"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="生产厂家" search-key="factoryID" v-model="search.factoryID">
            <cjm-remote-select :remote-url="$globalData.get('code', 'apiUrl').productionOrder.GET_FACTORY_LIST" v-model="search.factoryID"></cjm-remote-select>
          </cjm-search-item>
          <cjm-search-item label="业务员" search-key="operator" v-model="search.operator">
            <cjm-input v-model="search.operator"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="下单时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="标识名称" search-key="tagName" v-model="search.tagName">
            <cjm-input v-model="search.tagName"></cjm-input>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column sortable="custom" label="CRM订单号" prop="orderCode" min-width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" label="组织ID" prop="corpID" width="100"></cjm-table-column>
          <cjm-table-column sortable="custom" label="组织名称" prop="corpName" min-width="150"></cjm-table-column>
          <cjm-table-column sortable="custom" label="客户类型" prop="customerType" enum-name="生产订单客户类型" enum-namespace="code" width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" label="标识名称" prop="tagName" min-width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" label="订单数量" prop="orderBatchNumber" min-width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" label="标识规格" prop="tagSpecifications" min-width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" label="生产厂家" prop="factoryName" min-width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" label="业务员" prop="operator" min-width="100"></cjm-table-column>
          <cjm-table-column sortable="custom" label="下单时间" prop="createTime" width="150"></cjm-table-column>
        </template>
      </cjm-list>
    </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data(){
      return {
        requestUrl: this.$globalData.get('code', 'apiUrl').productionOrder.ORDER_DETAIL_LIST,
        search: {
          orderCode: '',
          corpName: '',
          corpID: '',
          factoryID: '',
          operator: '',
          createTime: '',
          tagName: ''
        }
      }
    },
    methods: {
      exportData(){
        fileDownload(this.$globalData.get('code', 'apiUrl').productionOrder.ORDER_DETAIL_LIST_EXPORT, this.$refs.list.getConditions());
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
</style>
