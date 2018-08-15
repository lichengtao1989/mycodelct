<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="false" ref="list" :auto-get-data="false">
      <div slot="operate">
        <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="单据编号" search-key="billCode" v-model="search.billCode">
          <cjm-input v-model="search.billCode">
          </cjm-input>
        </cjm-search-item>
        <cjm-search-item label="物流码" search-key="code" v-model="search.code">
          <cjm-input v-model="search.code">
          </cjm-input>
        </cjm-search-item>
        <cjm-search-item label="产品名称" search-key="productID" v-model="search.productID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.PRODUCT" v-model="search.productID">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="机构名称" search-key="orgID" v-model="search.orgID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.ORG" v-model="search.orgID">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="操作时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="billCode" label="单据编号" min-width="140" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="originalCode" label="物流码" min-width="170" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="orgName" label="机构名称" min-width="110" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="houseName" label="库房名称" min-width="110" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="productCode" label="产品编号" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="productName" label="产品名称" min-width="110" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="productBatchCode" label="产品批次" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="specValue" label="产品规格" min-width="110"></cjm-table-column>
        <cjm-table-column prop="iOFlag" label="出入库" min-width="100" enum-namespace="logistics" enum-name="台账出入库" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="subjectID" label="科目" min-width="100" enum-namespace="logistics" sortable="custom" enum-name="台账出入库科目"></cjm-table-column>
        <cjm-table-column prop="stockNumber" label="数量" min-width="100" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="unitName" label="计量单位" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="layer3Number" label="单标数量" min-width="110" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createByName" label="操作人" min-width="100" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" label="操作时间" min-width="140" sortable="custom"></cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>

<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        search: {
          billCode: '',
          code: '',
          productID: '',
          orgID: '',
          createTime: ''
        },
        requestUrl: logisticsApiUrl.inventory.GET_LOGISTICS_LIST
      }
    },
    methods: {
      //导出
      exportData(){
        fileDownload(this.logisticsApiUrl.inventory.EXPORT_LOGISTICS, this.$refs.list.getConditions());
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>

</style>
