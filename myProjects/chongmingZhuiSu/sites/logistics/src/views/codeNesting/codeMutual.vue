<template>
  <cjm-list :requestUrl="requestUrl" :need-base-search="false" :before-search="beforeSearch" :need-advanced-search="true" ref="list">
    <div slot="search">
      <cjm-search-item label="物流码" search-key="logisticsCode" v-model="search.lCodes" prop="lCodes">
        <cjm-input type="textarea" :rows="3" v-model="search.lCodes"></cjm-input>
      </cjm-search-item>
      <cjm-search-item label="防伪码" search-key="antiFakeCode" v-model="search.aCodes">
        <cjm-input type="textarea" :rows="3" v-model="search.aCodes"></cjm-input>
      </cjm-search-item>
    </div>
    <template slot="tableColumns">
      <cjm-table-column prop="logisticsCode" label="单标物流码" width="170"></cjm-table-column>
      <cjm-table-column prop="antiFakeCode" label="单标防伪码" width="190"></cjm-table-column>
      <cjm-table-column prop="parentLogisticsCode" label="箱标物流码" width="170"></cjm-table-column>
      <cjm-table-column prop="parentAntiFakeCode" label="箱标防伪码" width="190"></cjm-table-column>
      <cjm-table-column v-if="layerNumber==3" prop="grandParentLogisticsCode" label="垛标物流码" width="170"></cjm-table-column>
      <cjm-table-column prop="status" label="状态" width="100"></cjm-table-column>
      <cjm-table-column prop="orgCode" label="机构代码" min-width="110"></cjm-table-column>
      <cjm-table-column prop="orgName" label="机构名称" min-width="110"></cjm-table-column>
      <cjm-table-column prop="loginName" label="会员手机号" min-width="140"></cjm-table-column>
    </template>
  </cjm-list>
</template>
<script>
  export default{
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        test: '',
        requestUrl: logisticsApiUrl.codeNesting.CODE_MUTUAL_QUERY,
        search: {
          lCodes: '',
          aCodes: ''
        }
      }
    },
    methods: {
      beforeSearch(val){
        if (val.logisticsCode) {
          val.logisticsCode = val.logisticsCode.split('\n');
        }
        if (val.antiFakeCode) {
          val.antiFakeCode = val.antiFakeCode.split('\n');
        }
        return val;
      }
    },
    computed: {
      layerNumber(){
        return this.$globalData.get('userConfig').layerNumber;
      }
    }
  }
</script>
<style scoped>
  .cjm-search-item {
    height: 76px;
  }

  .cjm-form .el-form-item {
    width: 350px;
  }

  .cjm-form > .el-button {
    margin-left: 4%;
  }
</style>
