<template>
  <div :key="$route.meta.code">
    <cjm-list :request-url="requestUrl" :need-advanced-search="true" ref="list">
      <div slot="operate">
        <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item :label="labelName" v-if="$route.meta.code == 'headStockOut'" search-key="houseName" v-model="search.houseName">
          <cjm-input v-model="search.houseName">
          </cjm-input>
        </cjm-search-item>
        <cjm-search-item :label="labelName" v-else search-key="orgName" v-model="search.orgName">
          <cjm-input v-model="search.orgName">
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
        <cjm-search-item label="科目" search-key="subjectID" v-model="search.subjectID">
          <cjm-enum-select v-model="search.subjectID" enum-name="物流出库方式" enum-namespace="logistics" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="出库时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column :prop="propName" :label="labelName" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="productCode" label="产品编号" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="productName" label="产品名称" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="subjectID" enum-name="台账出入库科目" enum-namespace="logistics" label="科目" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="stockNumber" label="数量" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="unitName" label="计量单位" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="layer3Number" label="单标数量" sortable="custom" min-width="120"></cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>

<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      let orgType = this.$globalData.get('logistics', 'enums').orgType;
      return {
        orgType: orgType,
        search: {
          houseName: '',
          orgName: '',
          code: '',
          productCode: '',
          productName: '',
          createTime: '',
          subjectID: ''
        },
        url: {
          'headStockOut': logisticsApiUrl.inventory.STOCK_LIST + '&ioFlag=-1',
          'dealerStockOut': logisticsApiUrl.inventory.STOCK_STATS_LIST + '&ioFlag=-1&orgType=' + orgType.DEALER,
          'storeStockOut': logisticsApiUrl.inventory.STOCK_STATS_LIST + '&ioFlag=-1&orgType=' + orgType.SHOP
        },
        exportUrl: {
          'headStockOut': logisticsApiUrl.inventory.EXPORT_STOCK + '&ioFlag=-1',
          'dealerStockOut': logisticsApiUrl.inventory.EXPORT_STOCK_STATS + '&ioFlag=-1&orgType=' + orgType.DEALER,
          'storeStockOut': logisticsApiUrl.inventory.EXPORT_STOCK_STATS + '&ioFlag=-1&orgType=' + orgType.SHOP
        }
      }
    },
    computed: {
      requestUrl() {
        return this.url[this.$route.meta.code];
      },
      propName() {
        return (this.$route.meta.code == 'headStockOut') ? 'houseName' : 'orgName';
      },
      labelName(){
        return (this.$route.meta.code == 'headStockOut') ? '库房名称' : '机构名称';
      },
      powerCode(){
        return this.$route.meta.code;
      }
    },
    methods: {
      //导出
      exportData(){
        fileDownload(this.exportUrl[this.$route.meta.code], this.$refs.list.getConditions());
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>

</style>
