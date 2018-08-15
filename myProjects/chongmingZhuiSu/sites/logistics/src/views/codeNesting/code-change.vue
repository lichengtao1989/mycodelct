<template>
  <div>
    <cjm-list :requestUrl="logisticsApiUrl.codeNesting.GET_CODE_CHANGE_LIST" :need-base-search="true" :need-advanced-search="true" base-search-placeholder="请输入产品名称" ref="list">
      <div slot="operate">
        <cjm-button @click="showReplaceDialog" type="primary">标识替换</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="物流码" search-key="logisticsCode" v-model="search.logisticsCode">
          <cjm-input v-model="search.logisticsCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="产品名称" search-key="productID" v-model="search.productID">
          <cjm-remote-select v-model="search.productID" :remote-url="logisticsApiUrl.autoComplete.PRODUCT">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="操作时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="datetimerange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="newCode" label="（新）物流码" min-width="170"></cjm-table-column>
        <cjm-table-column prop="oldCode" label="（原）物流码" min-width="170"></cjm-table-column>
        <cjm-table-column prop="operationTypeName" label="操作类型" min-width="170"></cjm-table-column>
        <cjm-table-column prop="productName" label="产品名称" min-width="170"></cjm-table-column>
        <cjm-table-column prop="createName" label="操作人" min-width="170"></cjm-table-column>
        <cjm-table-column prop="createTime" label="操作时间" min-width="170"></cjm-table-column>
      </template>
    </cjm-list>
    <code-change-dialog ref="dialog" @replace-success="onReplaceSuccess"></code-change-dialog>
  </div>
</template>
<script>
  import codeChangeDialog from './code-change-dialog.vue';
  export default {
    components: {codeChangeDialog},
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl,
        search: {
          logisticsCode: '',
          productID: '',
          createTime: ''
        }
      };
    },
    methods: {
      onReplaceSuccess(){
        this.$refs.dialog.hide();
        this.$refs.list.refresh();
      },
      showReplaceDialog(){
        this.$refs.dialog.show();
      }
    }
  }
</script>
