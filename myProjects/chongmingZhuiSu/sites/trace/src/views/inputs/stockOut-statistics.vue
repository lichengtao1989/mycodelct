<template>
  <div>
    <cjm-list :request-url="$globalData.get('trace','apiUrl').inputs.GET_STOCK_OUT_STATISTICS_LIST"
              :need-advanced-search="true" ref="list">
      <div slot="operate">
        <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="投入品名称" search-key="name" v-model="search.name">
          <cjm-input v-model="search.name"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="投入品编号" search-key="code" v-model="search.code">
          <cjm-input v-model="search.code"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="投入品类型" search-key="type" v-model="search.type">
          <cjm-enum-select v-model="search.type"
                           enum-name="投入品类型"
                           enum-namespace="trace"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="出库机构" search-key="stockOutOrgID" v-model="search.stockOutOrgID">
          <cjm-remote-select v-model="search.stockOutOrgID"
                             :remote-url="$globalData.get('trace','apiUrl').autoComplete.ORG"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="出库类型" search-key="billType" v-model="search.billType">
          <cjm-enum-select v-model="search.billType"
                           enum-name="投入品出库类型"
                           enum-namespace="trace"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="code" label="投入品编号" width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="name" label="投入品名称" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="type" label="投入品类型" width="120" enum-name="投入品类型" enum-namespace="trace" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="className" label="投入品类别" width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="stockOutOrgName" label="出库机构" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="billType" label="出库类型" width="110" enum-name="投入品出库类型" enum-namespace="trace" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="quantity" label="数量" width="90" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="measurementUnit" label="单位" width="80" sortable="custom"></cjm-table-column>
        <cjm-table-column label="操作" width="70" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="showDetail(scope.row)">详情</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>

<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data(){
      return {
        search: {
          name: '',
          code: '',
          type: '',
          stockOutOrgID: '',
          billType: '',
          createTime: ''
        }
      }
    },
    methods: {
      //显示详情
      showDetail(row){
        let url = `page.html#/trace/inputs/stockOutList?inputsBatchID=${row.inputsBatchID || ''}&stockOutOrgID=${row.stockOutOrgID || ''}&billType=${row.billType || ''}`;
        if (!row.id) {
          url += '&img=1';
        }
        window.open(url);
      },
      //导出
      exportData(){
        fileDownload(this.$globalData.get('trace', 'apiUrl').inputs.EXPORT_STOCK_OUT_STATISTICS_LIST, this.$refs.list.getConditions());
      }
    }
  }
</script>
