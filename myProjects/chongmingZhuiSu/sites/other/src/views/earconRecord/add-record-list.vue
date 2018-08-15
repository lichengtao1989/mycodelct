
<template>
    <div>
      <cjm-list :request-url="requestUrl" :need-base-search="true" :need-advanced-search="true" base-search-placeholder="批次、圈舍">
        <div slot="search">
          <cjm-search-item label="批次" search-key="productBatchCode" v-model="search.productBatchCode">
            <cjm-input v-model="search.productBatchCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="圈舍" search-key="plotsName" v-model="search.plotsName">
            <cjm-input v-model="search.plotsName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="品种" search-key="productName" v-model="search.productName">
            <cjm-input v-model="search.productName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="追溯码" search-key="logisticsCode" v-model="search.logisticsCode">
            <cjm-input v-model="search.logisticsCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="入场时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker type="daterange" v-model="search.createTime"></cjm-date-picker>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column sortable="custom" label="追溯码（耳标）" prop="logisticsCode" min-width="150"></cjm-table-column>
          <cjm-table-column sortable="custom" label="品种" prop="productName" min-width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" label="批次" prop="productBatchCode" min-width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" label="圈舍" prop="plotsName" min-width="150"></cjm-table-column>
          <cjm-table-column sortable="custom" label="类型" prop="bussinessType" enum-name="耳标处理类型" enum-namespace="other" width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" label="入场日期" prop="createTime" width="180"></cjm-table-column>
        </template>
      </cjm-list>
    </div>
</template>
<script>
  export default{
    data(){
      return {
        requestUrl: this.$globalData.get('other', 'apiUrl').earconRecordList.ADD_RECORD_LIST,
        search: {
          productBatchCode: '',
          plotsName: '',
          productName: '',
          logisticsCode: '',
          createTime: ''
        }
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
</style>
