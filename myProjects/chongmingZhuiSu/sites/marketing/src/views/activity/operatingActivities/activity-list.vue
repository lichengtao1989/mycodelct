<template>
  <div>
    <div v-if="currentPage == 'list'">
      <cjm-list :request-url="requestUrl"
                :need-base-search="true"
                :need-advanced-search="true"
                base-search-placeholder="请输入活动标题">
        <div slot="operate">
          <cjm-button type="primary" class="cjm-icon-add" @click="edit('add')">新建活动</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="活动开始时间" v-model="search.beginTime" search-key="beginTime">
            <cjm-date-picker v-model="search.beginTime" type="date" :picker-options="beginTimeOption"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="活动结束时间" v-model="search.endTime" search-key="endTime">
            <cjm-date-picker v-model="search.endTime" type="date" :picker-options="endingTimeOption"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="活动标题" v-model="search.activityName" search-key="activityName">
            <cjm-input v-model="search.activityName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="状态" v-model="search.status" search-key="status">
            <cjm-enum-select v-model="search.status" enum-name="活动列表活动状态" enum-namespace="marketing"
                             :clearable="true"></cjm-enum-select>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column label="活动类型" prop="activityType" enum-name="运营活动-活动类型" enum-namespace="marketing"
                            sortable="custom" width="120"></cjm-table-column>
          <cjm-table-column label="活动标题" prop="activityName" sortable="custom" min-width="150"></cjm-table-column>
          <cjm-table-column label="活动时间" prop="activityTime" sortable="custom" min-width="180"></cjm-table-column>
          <cjm-table-column label="状态" prop="status" enum-name="运营活动-活动状态" enum-namespace="marketing" sortable="custom"
                            width="120"></cjm-table-column>
          <cjm-table-column label="更新者" prop="createByName" sortable="custom" min-width="150"></cjm-table-column>
          <cjm-table-column label="更新时间" prop="lastUpdateTime" sortable="custom" width="180"></cjm-table-column>
          <cjm-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text" @click="edit('edit', scope.row.activityID)">编辑</cjm-button>
              <cjm-button type="text" @click="handleActivity(scope.row)" v-if="scope.row.status === '1'">禁用</cjm-button>
              <cjm-button type="text" @click="handleActivity(scope.row)" v-if="scope.row.status === '0'">启用</cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div class="edit" v-if="currentPage == 'edit'">
      <add-edit></add-edit>
    </div>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch'
  import addEdit from './edit.vue'
  export default{
    components: {
      addEdit
    },
    mixins: [pageSwitch],
    data(){
      let search = {
        beginTime: '',
        endTime: '',
        activityName: '',
        status: ''
      };
      return {
        requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.operatingActivities.GET_ACTIVITY_LIST,
        search: search,
        currentPage: 'list',
        interfaceLock: true,
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
      handleActivity(row){ //列表操作 禁用/启用点击事件
        let params = {
          activityID: row.activityID,
          status: row.status === '1' ? '0' : '1'
        };
        if (this.interfaceLock) {
          this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.operatingActivities.UPDATE_STATUS, params).then((res) => {
            if (res.resultCode === '200') {
              if (row.status === '1') {
                row.status = '0';
                this.$message('已禁用');
              } else {
                row.status = '1';
                this.$message('已启用');
              }
            } else {
              this.$message(res.msg);
            }
            this.interfaceLock = true;
          })
        }
      },
      edit(type, activityID){
        switch (type) {
          case 'add':
            this.pushPage('edit', '新建活动', {id: type});
            break;
          case 'edit':
            let params = {
              activityID: activityID
            };
            this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.operatingActivities.GET_ACTIVITY_DETAIL, params).then((res) => {
              if (res.resultCode === '200') {
                this.pushPage('edit', '编辑', {id: type, data: res.data});
              } else {
                this.$message.error(res.msg)
              }
            })
            break;
        }
      },
      pageSwitched(codes){
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";
</style>
