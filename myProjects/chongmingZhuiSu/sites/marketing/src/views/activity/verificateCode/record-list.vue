<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-base-search="true" :need-advanced-search="true" base-search-placeholder="请输入活动标题" ref="list">
      <div slot="operate">
        <cjm-button power-code="" @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="活动开始时间" v-model="search.beginTime" search-key="beginTime">
          <cjm-date-picker v-model="search.beginTime" :picker-options="beginTimeOption"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="活动结束时间" v-model="search.endTime" search-key="endTime">
          <cjm-date-picker v-model="search.endTime" :picker-options="endingTimeOption"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="活动机构" v-model="search.orgID" search-key="orgID">
          <cjm-remote-select v-model="search.orgID"
                             value-key="orgID"
                             label-key="orgName"
                             :remote-url="$globalData.get('marketing','apiUrl').activity.verificateCode.GET_EDIT_ORG_LIST"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="抵用状态" v-model="search.status" search-key="status">
          <cjm-enum-select v-model="search.status" enum-name="抵用码-抵用状态" enum-namespace="marketing"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="抵用码" v-model="search.verificateCode" search-key="verificateCode">
          <cjm-input v-model="search.verificateCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="消费者手机" v-model="search.integralMobile" search-key="integralMobile">
          <cjm-input v-model="search.integralMobile"></cjm-input>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column sortable="custom" prop="activityName" label="活动标题" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="beginTime" label="活动起始" width="150">
          <div slot-scope="scope">
            <div v-html="scope.row.beginTime.split(' ')[0]"></div>
          </div>
        </cjm-table-column>
        <cjm-table-column sortable="custom" prop="endTime" label="活动结束" width="150">
          <div slot-scope="scope">
            <div v-html="scope.row.endTime.split(' ')[0]"></div>
          </div>
        </cjm-table-column>
        <cjm-table-column sortable="custom" prop="region" label="区域" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="orgName" label="活动机构" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="parentOrgName" label="上级机构" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="triggerCondition" label="生抵用码条件值" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="integralMobile" label="消费者手机" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="createTime" label="生码时间" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="statusName" label="抵用状态" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="verificateCode" label="抵用码" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="verificateAmount" label="抵用金额" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="verificateName" label="核销账号" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="verificateTime" label="抵用时间" width="150"></cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data(){
      let search = {
        beginTime: '',
        endTime: '',
        orgID: '',
        status: '',
        verificateCode: '',
        integralMobile: ''
      };
      return {
        requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.verificateCode.GET_RECORD_LIST,
        search: search,
        beginTimeOption: {
          disabledDate(time){
            if (search.endTime !== '') {
              return time.getTime() > new Date(search.endTime).getTime();
            }
          }
        },
        endingTimeOption: {
          disabledDate(time){
            if (search.beginTime !== '') {
              return time.getTime() < new Date(search.beginTime).getTime();
            }
          }
        }
      }
    },
    methods: {
      exportData(){
        fileDownload(this.$globalData.get('marketing', 'apiUrl').activity.verificateCode.RECORD_EXPORT, this.$refs.list.getConditions());
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";
</style>
