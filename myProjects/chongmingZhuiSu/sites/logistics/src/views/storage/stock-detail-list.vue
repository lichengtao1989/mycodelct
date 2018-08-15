<template>
  <cjm-list :need-advanced-search="true" :request-url="logisticsApiUrl.storage.GET_STOCK_DETAIL_LIST">
    <div slot="operate">
      <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
    </div>
    <div slot="search">
      <cjm-search-item label="盘点编号" search-key="stockTakingCode" v-model="search.stockTakingCode">
        <cjm-input v-model="search.stockTakingCode">
        </cjm-input>
      </cjm-search-item>
      <cjm-search-item label="仓库编号" search-key="houseCode" v-model="search.houseCode">
        <cjm-input v-model="search.houseCode">
        </cjm-input>
      </cjm-search-item>
      <cjm-search-item label="仓库名称" search-key="houseName" v-model="search.houseName">
        <cjm-input v-model="search.houseName">
        </cjm-input>
      </cjm-search-item>
      <cjm-search-item label="产品编号" search-key="productCode" v-model="search.productCode">
        <cjm-input v-model="search.productCode">
        </cjm-input>
      </cjm-search-item>
      <cjm-search-item label="产品名称" search-key="productName" v-model="search.productName">
        <cjm-input v-model="search.productName">
        </cjm-input>
      </cjm-search-item>
      <cjm-search-item label="物流码" search-key="code" v-model="search.code">
        <cjm-input v-model="search.code">
        </cjm-input>
      </cjm-search-item>
      <cjm-search-item label="盘点结果" search-key="stockTakingType" v-model="search.stockTakingType">
        <cjm-enum-select v-model="search.stockTakingType" enum-name="盘点结果" enum-namespace="logistics" :clearable="true"></cjm-enum-select>
      </cjm-search-item>
      <cjm-search-item label="上传时间" search-key="createTime" v-model="search.createTime">
        <cjm-date-picker type="datetimerange" v-model="search.createTime">
        </cjm-date-picker>
      </cjm-search-item>
    </div>
    <template slot="tableColumns">
      <cjm-table-column type="selection">
      </cjm-table-column>
      <cjm-table-column label="盘点编号" prop="stockTakingCode" sortable="custom" min-width="120">
      </cjm-table-column>
      <cjm-table-column label="仓库编号" prop="houseCode" sortable="custom" min-width="110">
      </cjm-table-column>
      <cjm-table-column label="仓库名称" prop="houseName" sortable="custom" min-width="110">
      </cjm-table-column>
      <cjm-table-column label="产品编号" prop="productCode" sortable="custom" min-width="110">
      </cjm-table-column>
      <cjm-table-column label="产品名称" prop="productName" sortable="custom" min-width="110">
      </cjm-table-column>
      <cjm-table-column label="物流码" prop="code" sortable="custom" min-width="170">
      </cjm-table-column>
      <cjm-table-column label="计量单位" prop="unitName" sortable="custom" min-width="110">
      </cjm-table-column>
      <cjm-table-column label="单标数量" prop="layer3Number" sortable="custom" min-width="110">
      </cjm-table-column>
      <cjm-table-column label="盘点结果" prop="stockTakingType" sortable="custom" min-width="140">
      </cjm-table-column>
      <cjm-table-column label="上传时间" prop="createTime" sortable="custom" min-width="160">
      </cjm-table-column>
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
          stockTakingType: '',
          createTime: ''
        }
      }
    },
    methods: {
      exportData() {
        fileDownload(this.logisticsApiUrl.storage.EXPORT_TAKING_DETAIL_LIST, this.$refs.list.getConditions())
      }
    }
  }
</script>
