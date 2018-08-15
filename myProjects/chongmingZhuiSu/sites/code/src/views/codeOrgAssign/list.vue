<script
  src="../../../../../../../项目文件/SuperCode2.0 Project/CommonWapPlatform/CommonWap/Wap/BasicWapSite/Operator/Common/js/base.js"></script>
<template>
  <div>
    <cjm-list ref="list"
              :request-url="requestUrl"
              :need-advanced-search="true"
              :need-base-search="false"
              :auto-get-data="false"
              :before-search="beforeSearch">
      <div slot="operate">
        <cjm-button @click="exportList" type="primary"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="查询方式" search-key="assignType" v-model="search.assignType">
          <cjm-radio-group v-model="search.assignType">
            <cjm-radio v-for="(value,key) in assignType" :label="value" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-search-item>
        <cjm-search-item label="物流码" search-key="code" v-model="search.code" v-show="search.assignType === '0'">
          <cjm-input v-model="search.code"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="起始码" search-key="beginCode" v-model="search.beginCode"
                         v-show="search.assignType === '1'">
          <cjm-input v-model="search.beginCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="结束码" search-key="endCode" v-model="search.endCode" v-show="search.assignType === '1'">
          <cjm-input v-model="search.endCode"></cjm-input>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="logisticsCode" label="物流码" width="" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="orgName" label="发往企业" width=""></cjm-table-column>
        <cjm-table-column prop="productName" label="应用产品" width=""></cjm-table-column>
        <cjm-table-column prop="spec" label="规格" width=""></cjm-table-column>
        <cjm-table-column prop="assignTime" label="分配时间" width=""></cjm-table-column>
        <cjm-table-column prop="userName" label="操作人" width=""></cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload';
  export default {
    data() {
      return {
        search: {
          assignType: '0',
          code: '',
          beginCode: '',
          endCode: ''
        },
        requestUrl: this.$globalData.get('code', 'apiUrl').codeOrgAssign.LIST
      }
    },
    computed: {
      assignType() {
        return this.$globalData.get('code', 'enums')['码关联方式'];
      }
    },
    watch: {
      'search.assignType'(newVal){
        if (newVal == 0) {
          this.search.beginCode = '';
          this.search.endCode = '';
        } else if (newVal == 1) {
          this.search.code = '';
        } else {
          this.search.code = '';
          this.search.beginCode = '';
          this.search.endCode = '';
        }
      }
    },
    methods: {
      exportList(){
        if (this.$refs.list.tableData.length == 0) {
          this.$message.warning('暂无可导出的数据');
        } else {
          let conditions = Object.deepClone(this.$refs.list.getConditions());
          conditions.pageSize = this.$refs.list.totalPage;
          conditions.orderField = this.$refs.list.sortCol;
          conditions.orderField != '' && (conditions.orderType = this.$refs.list.sortType == 'descending' ? 0 : 1);
          fileDownload(this.$globalData.get('code', 'apiUrl').codeOrgAssign.EXPORT, conditions);
        }
      },
      beforeSearch(conditions){
        if (this.$refs.list.sortCol == '') {
          conditions.orderField = 'logisticsCode';
          conditions.orderType = '1';
        }
        return conditions;
      }
    },
    mounted(){
      let self = this;
      this.$refs.list.advancedReset = function () {
        self.$refs.list.tableData = [];
      }
    }
  }
</script>
<style scoped="scoped" lang="less">
</style>
