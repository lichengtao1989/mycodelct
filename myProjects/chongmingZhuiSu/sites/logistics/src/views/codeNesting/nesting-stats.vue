<template>
  <cjm-list :requestUrl="requestUrl" :need-base-search="false" :need-advanced-search="true" ref="list">
    <div slot="operate">
      <cjm-button class="cjm-icon-export" @click="exportData">导出</cjm-button>
    </div>
    <div slot="search">
      <cjm-search-item label="产品" search-key="productID" v-model="search.productID">
        <cjm-remote-select v-model="search.productID" :remote-url="logisticsApiUrl.autoComplete.PRODUCT"></cjm-remote-select>
      </cjm-search-item>
      <cjm-search-item label="产品批次" search-key="productBatchID" v-model="search.productBatchID">
        <cjm-remote-select v-model="search.productBatchID" :remote-url="logisticsApiUrl.autoComplete.PRODUCT_BATCH"></cjm-remote-select>
      </cjm-search-item>
      <cjm-search-item label="操作时间" search-key="createTime" v-model="search.createTime">
        <cjm-date-picker :picker-options="createTimeOptions" v-model="search.createTime" type="daterange"></cjm-date-picker>
      </cjm-search-item>
    </div>
    <template slot="tableColumns">
      <cjm-table-column label="产品编号" prop="productCode" min-width="120" sortable="custom"></cjm-table-column>
      <cjm-table-column label="产品名称" prop="productName" min-width="110" sortable="custom"></cjm-table-column>
      <cjm-table-column label="产品批次" prop="productBatchCode" min-width="110" sortable="custom"></cjm-table-column>
      <cjm-table-column label="垛数" prop="layer1Number" min-width="110" sortable="custom"></cjm-table-column>
      <cjm-table-column label="箱数" prop="layer2Number" min-width="110" sortable="custom"></cjm-table-column>
      <cjm-table-column label="单标数" prop="layer3Number" sortable="custom" min-width="110"></cjm-table-column>
    </template>
  </cjm-list>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload';
  export default{
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        requestUrl: logisticsApiUrl.codeNesting.GET_NESTING_STATS_LIST,
        search: {
          productID: '',
          productBatchID: '',
          createTime: ''
        }
      }
    },
    computed: {
      createTimeOptions(){
        const shortcuts = [];
        const dayMilliseconds = 24 * 60 * 60 * 1000;
        shortcuts.push({
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            picker.$emit('pick', [start, end]);
          }
        });
        shortcuts.push({
          text: '昨天',
          onClick(picker) {
            const now = new Date();
            const yesterDay = now * 1 - dayMilliseconds;
            const end = new Date(yesterDay);
            const start = new Date(yesterDay);
            picker.$emit('pick', [start, end]);
          }
        });
        shortcuts.push({
          text: '本周',
          onClick(picker) {
            const end = new Date();
            let start = new Date();
            while (start.getDay() > 0) {
              start = new Date(start * 1 - dayMilliseconds);
            }
            picker.$emit('pick', [start, end]);
          }
        });
        shortcuts.push({
          text: '本月',
          onClick(picker) {
            const end = new Date();
            let start = new Date();
            while (start.getDate() > 1) {
              start = new Date(start * 1 - dayMilliseconds);
            }
            picker.$emit('pick', [start, end]);
          }
        });
        shortcuts.push({
          text: '上月',
          onClick(picker) {
            let end = new Date();
            const nowMonth = end.getMonth();
            while (end.getMonth() === nowMonth) {
              end = new Date(end * 1 - dayMilliseconds);
            }
            let start = new Date(end * 1);
            while (start.getDate() > 1) {
              start = new Date(start * 1 - dayMilliseconds);
            }
            picker.$emit('pick', [start, end]);
          }
        });
        shortcuts.push({
          text: '今年',
          onClick(picker) {
            const end = new Date();
            const year = end.getFullYear();
            const start = new Date(year + '-01-01');
            picker.$emit('pick', [start, end]);
          }
        });
        return {
          shortcuts
        };
      }
    },
    methods: {
      exportData(){
        fileDownload(this.logisticsApiUrl.codeNesting.NESTING_STATS_LIST_EXPORT, this.$refs.list.getConditions());
      }
    }
  }
</script>
