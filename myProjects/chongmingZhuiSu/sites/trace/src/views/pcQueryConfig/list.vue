<template>
  <div>
    <cjm-list ref="list" :request-url="requestUrl" :need-advanced-search="true"
              :need-base-search="true" v-if="currentPage=='list'">
      <div slot="operate">
        <cjm-button type="primary" @click="addQueryPage()"><i class="cjm-icon-add"></i>新增查询页</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="查询页名称" search-key="queryPageName" v-model="search.queryPageName">
          <cjm-input v-model="search.queryPageName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="关联组织ID" search-key="corpID" v-model="search.corpID">
          <cjm-input v-model="search.corpID"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" range-separator="~" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="queryPageName" label="查询页名称" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="corpName" label="关联组织"  min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="queryPageConfigurationCode" label="配置码" min-width="100"
                          sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createByName" label="创建人"  min-width="100" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="joinCount" label="接入点"  min-width="100" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" label="创建时间"  min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <cjm-tooltip content="编辑">
              <cjm-button type="text" @click="edit(scope.row.id)">编辑</cjm-button>
            </cjm-tooltip>
            <cjm-tooltip content="预览">
              <cjm-button type="text" @click="preview(scope.row.queryPageConfigurationCode)">预览</cjm-button>
            </cjm-tooltip>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <config-edit-view v-if="currentPage == 'edit'"></config-edit-view>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch';
  import configEditView from './edit';
  export default {
    components: {
      configEditView
    },
    mixins: [pageSwitch],
    data() {
      return {
        requestUrl: this.$globalData.get('trace', 'apiUrl').queryPageConfiguration.GET_LIST,
        search: {
          queryPageName: '',
          corpID: '',
          createTime: ''
        },
        currentPage: 'list'
      }
    },
    methods: {
      pageSwitched(codes){
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      },
      addQueryPage(){
        this.pushPage('edit', '新增', {id: '', type: 'add'});
      },
      preview(configCode){
        window.open(this.$globalData.get('trace', 'appConfig').PCQueryUrl + '?configcode=' + configCode);
      },
      edit(id){
        this.pushPage('edit', '编辑', {id: id, type: 'edit'});
      }
    }
  }
</script>
<style scoped lang='less'>
</style>
