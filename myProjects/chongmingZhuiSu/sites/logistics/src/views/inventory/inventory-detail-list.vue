<template>
  <div :key="$route.meta.code">
    <cjm-list :request-url="requestUrl"
              :need-advanced-search="true"
              ref="list"
              base-search-placeholder="输入机构名称、产品编号或名称">
      <div slot="operate">
        <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="物流码" search-key="code" v-model="search.code">
          <cjm-input v-model="search.code">
          </cjm-input>
        </cjm-search-item>
        <cjm-search-item :label="labelName" v-if="$route.meta.code == 'headDetail'" search-key="houseName" v-model="search.houseName">
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
      </div>
      <template slot="tableColumns">
        <cjm-table-column :prop="propName" :label="labelName" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="productCode" label="产品编号" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="productName" label="产品名称" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="productBatchCode" label="产品批次" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="originalCode" label="物流码" sortable="custom" min-width="170"></cjm-table-column>
        <cjm-table-column prop="stockNumber" label="数量" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column prop="unitName" label="计量单位" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column prop="layer3Number" label="单标数量" min-width="110"></cjm-table-column>
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
          orgName: '',
          houseName: '',
          code: '',
          productCode: '',
          productName: ''
        },
        url: {
          'headDetail': logisticsApiUrl.inventory.GET_DETAIL_LIST + '&orgType=' + orgType.HEAD,
          'dealerDetail': logisticsApiUrl.inventory.GET_DETAIL_LIST + '&orgType=' + orgType.DEALER,
          'storeDetail': logisticsApiUrl.inventory.GET_DETAIL_LIST + '&orgType=' + orgType.SHOP
        },
        exportUrl: {
          'headDetail': logisticsApiUrl.inventory.EXPORT_DETAIL + '&orgType=' + orgType.HEAD,
          'dealerDetail': logisticsApiUrl.inventory.EXPORT_DETAIL + '&orgType=' + orgType.DEALER,
          'storeDetail': logisticsApiUrl.inventory.EXPORT_DETAIL + '&orgType=' + orgType.SHOP
        }
      }
    },
    computed: {
      requestUrl() {
        return this.url[this.$route.meta.code];
      },
      propName() {
        return (this.$route.meta.code == 'headDetail') ? 'houseName' : 'orgName';
      },
      labelName(){
        return (this.$route.meta.code == 'headDetail') ? '库房名称' : '机构名称';
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
