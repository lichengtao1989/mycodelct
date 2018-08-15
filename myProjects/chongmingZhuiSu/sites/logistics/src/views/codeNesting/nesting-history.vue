<template>
  <cjm-list :requestUrl="requestUrl" :need-base-search="true" :need-advanced-search="true" base-search-placeholder="输入物流码、上级物流码">
    <div slot="search">
      <cjm-search-item label="物流码" search-key="logisticsCode" v-model="search.logisticsCode">
        <cjm-input v-model="search.logisticsCode"></cjm-input>
      </cjm-search-item>
      <cjm-search-item label="上级物流码" search-key="parentCode" v-model="search.parentCode">
        <cjm-input v-model="search.parentCode"></cjm-input>
      </cjm-search-item>
      <cjm-search-item label="操作时间" search-key="createTime" v-model="search.createTime">
        <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
      </cjm-search-item>
    </div>
    <template slot="tableColumns">
      <cjm-table-column prop="logisticsCode" label="物流码" min-width="170"></cjm-table-column>
      <cjm-table-column prop="parentCode" label="上级物流码" min-width="170"></cjm-table-column>
      <cjm-table-column prop="operationType" label="操作类型" enum-namespace="logistics" enum-name="操作类型" min-width="100"></cjm-table-column>
      <cjm-table-column prop="createName" label="创建人" min-width="100"></cjm-table-column>
      <cjm-table-column prop="createTime" label="创建时间" min-width="150" sortable="custom"></cjm-table-column>
      <cjm-table-column prop="result" label="结果" sortable="custom" min-width="180"></cjm-table-column>
    </template>
  </cjm-list>
</template>
<script>
  export default{
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        requestUrl: logisticsApiUrl.codeNesting.GET_PRODUCT_DATA_HISTORY_LIST,
        search: {
          logisticsCode: '',
          parentCode: '',
          createTime: ''
        }
      }
    }
  }
</script>
