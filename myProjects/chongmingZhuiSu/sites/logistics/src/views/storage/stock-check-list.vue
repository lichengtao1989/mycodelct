<template>
  <cjm-list :need-advanced-search="true" :request-url="logisticsApiUrl.storage.GET_STOCK_CHECK_LIST">
    <div slot="operate">
      <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
    </div>
    <div slot="search">
      <cjm-search-item label="盘点编号" search-key="stockTakingCode">
        <cjm-input v-model="search.stockTakingCode"></cjm-input>
      </cjm-search-item>
      <cjm-search-item label="仓库编号" search-key="houseCode">
        <cjm-input v-model="search.houseCode"></cjm-input>
      </cjm-search-item>
      <cjm-search-item label="仓库名称" search-key="houseName">
        <cjm-input v-model="search.houseName"></cjm-input>
      </cjm-search-item>
      <cjm-search-item label="产品编号" search-key="productCode">
        <cjm-input v-model="search.productCode"></cjm-input>
      </cjm-search-item>
      <cjm-search-item label="产品名称" search-key="productName">
        <cjm-input v-model="search.productName"></cjm-input>
      </cjm-search-item>
    </div>
    <template slot="tableColumns">
      <cjm-table-column type="selection"></cjm-table-column>
      <cjm-table-column label="盘点编号" prop="stockTakingCode" sortable="custom" min-width="120"></cjm-table-column>
      <cjm-table-column label="仓库编号" prop="houseCode" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="仓库名称" prop="houseName" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="产品编号" prop="productCode" sortable="custom" min-width="120"></cjm-table-column>
      <cjm-table-column label="产品名称" prop="productName" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="计量单位" prop="unitName" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="正常数量" prop="takingNumberNormal" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="正常单标" prop="layer3NumberNormal" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="盘盈数量" prop="takingNumberProfit" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="单标数量" prop="" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="盘盈单标" prop="layer3NumberProfit" sortable="custom" min-width="120"></cjm-table-column>
      <cjm-table-column label="盘亏数量" prop="takingNumberLoss" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="盘亏单标" prop="layer3NumberLoss" sortable="custom" min-width="110"></cjm-table-column>
      <cjm-table-column label="信息不符数量" prop="takingNumberNotMatch" sortable="custom" min-width="140"></cjm-table-column>
      <cjm-table-column label="信息不符单标" prop="layer3NumberNotMatch" sortable="custom" min-width="140"></cjm-table-column>
    </template>
  </cjm-list>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data() {
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        search: {
          stockTakingCode: '',
          houseCode: '',
          houseName: '',
          productCode: '',
          productName: '',
          code: '',
          detailResult: '',
          createTime: ''
        }
      }
    },
    methods: {
      exportData() {
        fileDownload(this.logisticsApiUrl.storage.EXPORT_CONFIRMATION_LIST, this.$refs.list.getConditions())
      }
    }
  }
</script>
