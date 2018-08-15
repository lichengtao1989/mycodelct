<template>
  <div>
    <cjm-list :request-url="$globalData.get('trace', 'apiUrl').inputs.GET_STOCK_IN_STATISTICS_LIST"
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
        <cjm-search-item label="供应商" search-key="supplierID" v-model="search.supplierID">
          <cjm-remote-select v-model="search.supplierID"
                             :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.SUPPLIER"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="入库机构" search-key="stockInOrgID" v-model="search.stockInOrgID">
          <cjm-remote-select v-model="search.stockInOrgID"
                             :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.ORG"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="入库类型" search-key="billType" v-model="search.billType">
          <cjm-enum-select v-model="search.billType"
                           enum-name="投入品入库类型"
                           enum-namespace="trace"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="创建时间" search-key="operateTime" v-model="search.operateTime">
          <cjm-date-picker v-model="search.operateTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="code" label="投入品编号" width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="name" label="投入品名称" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="typeName" label="投入品类型" width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="className" label="投入品类别" width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="supplierName" label="供应商" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="stockInOrgName" label="入库机构" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="billTypeName" label="入库类型" width="110" sortable="custom"></cjm-table-column>
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
          supplierID: '',
          stockInOrgID: '',
          billType: '',
          operateTime: ''
        }
      }
    },
    methods: {
      //显示详情
      showDetail(row){
        let url = `page.html#/trace/inputs/stockInList?inputsBatchID=${row.inputsBatchID || ''}&stockInOrgID=${row.stockInOrgID || ''}&billType=${row.billType || ''}`;
        if (!row.id) {
          url += '&img=1';
        }
        window.open(url);
      },
      //导出
      exportData(){
        fileDownload(this.$globalData.get('trace', 'apiUrl').inputs.EXPORT_STOCK_IN_STATISTICS_LIST, this.$refs.list.getConditions());
      }
    }
  }
</script>
