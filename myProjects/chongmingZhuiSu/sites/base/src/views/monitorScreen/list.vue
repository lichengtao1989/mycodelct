<template>
  <div>
    <div v-show="currentPage=='list'">
      <cjm-list ref="list" :request-url="requestUrl" :need-advanced-search="true"
                :need-base-search="true">
        <div slot="operate">
          <cjm-button @click="monitorDataVConfig($globalData.get('currentUser').corpID, true)" type="primary"  power-code="configTemplateMonitor"><i class="cjm-icon-setting"></i>模版配置</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="组织ID" search-key="corpID" v-model="search.corpID">
            <cjm-input v-model="search.corpID"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="组织名称" search-key="corpName" v-model="search.corpName">
            <cjm-input v-model="search.corpName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="行业类型" search-key="industryTypeName" v-model="search.industryTypeName">
            <cjm-input v-model="search.industryTypeName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="标签" search-key="labelNames" v-model="search.labelNames">
            <cjm-input v-model="search.labelNames"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="注册时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker v-model="search.createTime" range-separator="~" type="daterange"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="有效期至" search-key="expiryDate" v-model="search.expiryDate">
            <cjm-date-picker v-model="search.expiryDate" range-separator="~" type="daterange"></cjm-date-picker>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="corpID" label="组织ID" width="" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="corpName" label="组织名称" width=""></cjm-table-column>
          <cjm-table-column prop="industryTypeName" label="行业类型" width=""></cjm-table-column>
          <cjm-table-column label="组织类型" width="">
            <template slot-scope="scope">{{getCorpTypeName(scope.row.corpType)}}</template>
          </cjm-table-column>
          <cjm-table-column prop="createTime" label="注册时间" width="" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="expiryDate" label="有效期至" width="" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="labelNames" label="标签" width=""></cjm-table-column>
          <cjm-table-column label="操作" width="210" fixed="right">
            <template slot-scope="scope">
              <cjm-tooltip content="配置监控屏">
                <cjm-button type="text" @click="monitorConfig(scope.row.corpID)" power-code="configMonitor">配置监控屏</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="配置数据屏">
                <cjm-button type="text" @click="monitorDataVConfig(scope.row.corpID,false)" power-code="configMonitor">配置数据屏</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="查看">
                <cjm-button type="text" @click="checkMonitor()" power-code="checkMonitor">查看</cjm-button>
              </cjm-tooltip>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage=='edit'">
      <monitor-config-edit ref="monitorConfigEdit"></monitor-config-edit>
    </div>
    <div v-if="currentPage=='configList'">
      <monitor-config-list ref="monitorConfigList"></monitor-config-list>
    </div>
    <div v-if="currentPage=='addConfig'">
     <monitor-config-add></monitor-config-add>
    </div>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch';
  import monitorConfigEdit from './edit';
  import monitorConfigList from './config-list';
  import monitorConfigAdd from './config-add';
  export default {
    components: {
      'monitor-config-edit': monitorConfigEdit,
      'monitor-config-list': monitorConfigList,
      'monitor-config-add': monitorConfigAdd
    },
    mixins: [pageSwitch],
    data () {
      return {
        requestUrl: this.$globalData.get('base', 'apiUrl').monitorScreen.CONFIG_LIST,
        search: {
          corpID: '',
          corpName: '',
          industryTypeName: '',
          createTime: '',
          expiryDate: ''
        },
        currentPage: 'list'
      }
    },
    methods: {
      checkMonitor(){
        this.$ajax.get(this.$globalData.get('base', 'apiUrl').monitorScreen.GET_MONITOR_TOKEN).then((r) => {
          if (r.resultCode == '200' && r.data) {
            window.open(this.$globalData.get('base', 'appConfig').monitorPlatform + '?token=' + r.data.token);
          } else {
            this.$message.error(r.msg);
          }
        }).catch(() => {
          this.$message.error('查看失败,请重新尝试');
        });
      },
      monitorConfig(corpID){
        this.pushPage('edit', '监控屏配置', {id: corpID, type: 'edit'});
      },
      monitorDataVConfig(corpID, isTemplateConfig){
        this.pushPage('configList', isTemplateConfig ? '模版配置' : '数据屏配置', {id: corpID, type: 'edit', isTemplateConfig});
      },
      addDataVConfig(corpID, isAddTemplate){
        this.pushPage('addConfig', isAddTemplate ? '新建模版' : '新建数据屏', {id: corpID, type: 'add', isAddTemplate});
      },
      pageSwitched(codes){
        this.currentPage = codes.length > 0 ? codes[codes.length - 1] : 'list';
      },
      getCorpTypeName(corpType){
        let corpList = this.$globalData.get('base', 'enums')['组织类型'];
        for (let o in corpList) {
          if (corpType == corpList[o]) {
            return o;
          }
        }
      }
    }
  }
</script>
<style scoped lang='less'>
</style>
