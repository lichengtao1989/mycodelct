<template>
  <div>
    <cjm-list :request-url="requestUrl"
              :need-base-search="true"
              :need-advanced-search="true" base-search-placeholder="标题、机构、产品、产品码" ref="list">
      <div slot="operate">
        <cjm-button class="cjm-icon-export" @click="exportData">导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="活动时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange" :picker-options="dateRangeOptions"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="活动标题" search-key="activityName" v-model="search.activityName">
          <cjm-input v-model="search.activityName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="机构" search-key="orgID" v-model="search.orgID">
          <cjm-remote-select
            v-model="search.orgID"
            :remote-url="$globalData.get('marketing','apiUrl').autoComplete.ORG">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="状态" search-key="status" v-model="search.status">
          <cjm-enum-select v-model="search.status" enum-name="运营活动-参与记录状态" enum-namespace="marketing"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column sortable="custom" prop="activityName" label="活动标题" min-width="150"></cjm-table-column>
        <!--<cjm-table-column sortable="custom" prop="partakeEquipment" label="参与设备" min-width="120"></cjm-table-column>-->
        <cjm-table-column sortable="custom" prop="orgName" label="机构" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="productName" label="产品" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="antiFakeCode" label="产品码" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="award" label="奖品" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="" label="填写信息" min-width="200">
          <template slot-scope="scope">
            {{scope.row.participatorName + ',' + scope.row.participatorPhone + scope.row.participatorProvince + scope.row.participatorCity + scope.row.participatorDistrict + scope.row.participatorAddress}}
          </template>
        </cjm-table-column>
        <cjm-table-column sortable="custom" prop="createTime" label="参与时间" width="180"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="status" enum-name="运营活动-参与记录状态" enum-namespace="marketing" label="状态" width="120"></cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data(){
      return {
        requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.operatingActivities.GET_PARTICIPATE_RECORDS,
        search: {
          createTime: '',
          activityName: '',
          orgID: '',
          status: ''
        },
        dateRangeOptions: {
          disabledDate(time){
            return false;
          }
        }
      }
    },
    methods: {
      exportData(){
        fileDownload(this.$globalData.get('marketing', 'apiUrl').activity.operatingActivities.OPERATING_ACT_PARTICIPATE_PECORD_EXPORT, this.$refs.list.getConditions());
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";
</style>
