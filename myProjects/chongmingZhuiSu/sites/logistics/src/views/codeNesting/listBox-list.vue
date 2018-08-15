<template>
  <cjm-list :requestUrl="requestUrl" :need-base-search="true" base-search-placeholder="输入物流码、上级物流码" ref="list">
    <div slot="operate">
      <cjm-button @click="exportData" class="cjm-icon-export">导出</cjm-button>
    </div>
    <template slot="tableColumns">
      <cjm-table-column v-if="layerNumber==3" label="垛标" prop="codeLayer1" sortable="custom" min-width="170"></cjm-table-column>
      <cjm-table-column label="箱标" prop="codeLayer2" sortable="custom" min-width="170"></cjm-table-column>
      <cjm-table-column label="单标" prop="codeLayer3" sortable="custom" min-width="170"></cjm-table-column>
      <cjm-table-column label="标签批次" prop="batchID" sortable="custom" min-width="110"></cjm-table-column>
    </template>
  </cjm-list>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        requestUrl: logisticsApiUrl.codeNesting.GET_LISTBOX_LIST
      }
    },
    methods: {
      //导出
      exportData(){
        fileDownload(this.logisticsApiUrl.codeNesting.EXPORT_CODE_LIST, this.$refs.list.getConditions());
      }
    },
    computed: {
      layerNumber(){
        return this.$globalData.get('userConfig').layerNumber;
      }
    }
  }
</script>
