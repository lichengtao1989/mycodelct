<template>
  <div :key="$route.meta.code">
    <cjm-list :request-url="requestUrl" :need-base-search="false" :need-advanced-search="true" ref="list" :before-search="beforeSearch" :auto-get-data="false">
      <div slot="operate">
        <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item :label="labelName" v-if="$route.meta.code == 'headSummary'" search-key="houseID" v-model="search.houseID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.STOCK_HOUSE" v-model="search.houseID"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item :label="labelName" v-else search-key="orgID" v-model="search.orgID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.ORG" v-model="search.orgID"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="产品名称" search-key="productID" v-model="search.productID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.PRODUCT" v-model="search.productID"></cjm-remote-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column :prop="propName" :label="labelName" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="productCode" label="产品编号" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="productName" label="产品名称" sortable="custom" min-width="120"></cjm-table-column>
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
        logisticsApiUrl: logisticsApiUrl,
        orgType: orgType,
        search: {
          houseID: '',
          orgID: '',
          productID: ''
        },
        url: {
          'headSummary': logisticsApiUrl.inventory.GET_INVENTORY_LIST,
          'dealerSummary': logisticsApiUrl.inventory.GET_DEALER_LIST + '&orgType=' + orgType.DEALER,
          'storeSummary': logisticsApiUrl.inventory.GET_DEALER_LIST + '&orgType=' + orgType.SHOP
        },
        exportUrl: {
          'headSummary': logisticsApiUrl.inventory.EXPORT_HEADSUMMARY,
          'dealerSummary': logisticsApiUrl.inventory.EXPORT_SUMMARY + '&orgType=' + orgType.DEALER,
          'storeSummary': logisticsApiUrl.inventory.EXPORT_SUMMARY + '&orgType=' + orgType.SHOP
        }
      }
    },
    computed: {
      requestUrl() {
        return this.url[this.$route.meta.code];
      },
      propName() {
        return (this.$route.meta.code == 'headSummary') ? 'houseName' : 'orgName';
      },
      labelName(){
        return (this.$route.meta.code == 'headSummary') ? '库房名称' : '机构名称';
      },
      powerCode(){
        return this.$route.meta.code;
      }
    },
    methods: {
      beforeSearch(conditions){
        if (conditions.productID && conditions.productID.indexOf(',') > 0) {
          let a = conditions.productID.split(',');
          conditions.productID = a[0];
          conditions.specID = a[1];
        }
        return conditions;
      },
      //导出
      exportData(){
        fileDownload(this.exportUrl[this.$route.meta.code], this.$refs.list.getConditions());
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>

</style>
