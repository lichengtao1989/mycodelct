<template>
  <div>
    <cjm-list :requestUrl="logisticsApiUrl.storage.GET_STOCK_IN_LIST" :needAdvancedSearch="true" ref="list" v-show="currentPage==='list'">
      <div slot="operate">
        <cjm-button type="primary" @click="add"><i class="cjm-icon-add"></i>新建订单</cjm-button>
        <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="订单编号" search-key="billCode" v-model="search.billCode">
          <cjm-input v-model="search.billCode"></cjm-input>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="billCode" label="单据编号" width="160" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="code" label="物流码" width="170" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="operationTypeName" label="操作类型" width="110" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="stockInOrgName" label="入库机构" width="160" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="stockInHouseName" label="入库库房" width="160" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="productBatchCode" label="产品批次" width="100" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="ProductName" label="产品名称" width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="specValue" label="产品规格" width="100" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="unitName" label="计量单位" width="100" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="layer3Number" label="单标数量" width="100" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createByName" label="操作人" width="110" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" label="操作时间" width="150" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="result" label="处理结果" width="180" sortable="custom" fixed="right"></cjm-table-column>
      </template>
    </cjm-list>
    <div v-if="currentPage==='edit'">
      <apply-edit></apply-edit>
    </div>
  </div>
</template>

<script>
  import ApplyEdit from './apply-edit.vue'
  import pageSwitch from 'framework/mixins/pageSwitch'
  export default{
    mixins: [pageSwitch],
    components: {
      ApplyEdit
    },
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        name: 'list',
        search: {
          billCode: ''
        },
        currentPage: 'list'
      }
    },
    methods: {
      //新建订单
      add(){
        this.pushPage('edit', '新建订单');
      },
      //导出
      exportData(){

      },
      pageSwitched(codes){
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>

</style>
