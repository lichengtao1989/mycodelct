<template>
  <div>
    <div v-if="currentPage == 'list'">
      <cjm-list :request-url="requestUrl"
                :need-base-search="true"
                :need-advanced-search="true"
                base-search-placeholder="请输入活动标题">
        <div slot="operate">
          <cjm-button type="primary" power-code="vertificateCodeListAdd" class="cjm-icon-add" @click="edit('add')">新建活动</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="活动起始时间" search-key="beginTime" v-model="search.beginTime">
            <cjm-date-picker v-model="search.beginTime" :picker-options="beginTimeOption"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="活动结束时间" search-key="endTime" v-model="search.endTime">
            <cjm-date-picker v-model="search.endTime" :picker-options="endingTimeOption"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="抵用码条件" search-key="verificateType" v-model="search.verificateType">
            <cjm-enum-select v-model="search.verificateType" enum-name="抵用码-抵用码条件"
                             enum-namespace="marketing"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="活动机构" search-key="orgID" v-model="search.orgID">
            <cjm-remote-select v-model="search.orgID"
                               value-key="orgID"
                               label-key="orgName"
                               :remote-url="$globalData.get('marketing','apiUrl').activity.verificateCode.GET_EDIT_ORG_LIST"></cjm-remote-select>
          </cjm-search-item>
          <cjm-search-item label="状态" search-key="status" v-model="search.status">
            <cjm-enum-select v-model="search.status" enum-name="活动列表活动状态" enum-namespace="marketing"></cjm-enum-select>
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
          <cjm-table-column sortable="custom" prop="verificateType" enum-name="抵用码-抵用码条件" enum-namespace="marketing"
                            label="抵用码条件" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.verificateType == 1">新客</span>
              <span v-if="scope.row.verificateType == 2">一次性充值积分{{scope.row.verificateValue}}</span>
              <span v-if="scope.row.verificateType == 3">累计充值积分{{scope.row.verificateValueTotal}}</span>
              <span v-if="scope.row.verificateType == 4">指定的产品</span>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" prop="orgNameGroup" label="活动机构" :show-overflow-tooltip="false"
                            width="150">
            <template slot-scope="scope">
              <cjm-popover ref="popover1"
                           placement="top-start"
                           width="300"
                           trigger="hover">
                <div v-html="scope.row.orgNameGroup.split(',').join('<br />')"
                     :style="scope.row.orgNameGroup.split(',').length > 15 ? columHeight : columHeightAuto"></div>
              </cjm-popover>
              <div v-html="listEditHTML(scope.row,'orgNameGroup')" v-popover:popover1></div>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" prop="productNameGroup" label="活动产品" :show-overflow-tooltip="false"
                            width="150">
            <template slot-scope="scope">
              <cjm-popover ref="popover2"
                           placement="top-start"
                           width="300"
                           trigger="hover">
                <div v-html="scope.row.productNameGroup.split(',').join('<br />')"
                     :style="scope.row.productNameGroup.split(',').length > 15 ? columHeight : columHeightAuto"></div>
              </cjm-popover>
              <div v-html="listEditHTML(scope.row,'productNameGroup')" v-popover:popover2></div>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" prop="loginName" label="创建账号" width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="userName" label="创建者" width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="createTime" label="创建时间" width="150"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="status" label="状态" enum-namespace="marketing" enum-name="活动列表活动状态"
                            width="100"></cjm-table-column>
          <cjm-table-column sortable="custom" label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text" power-code="vertificateCodeListEdit" @click="edit('edit', scope.row)">编辑</cjm-button>
              <cjm-button type="text" power-code="vertificateCodeListControl" v-if="scope.row.status == 1" @click="updateStatus('0', scope.row)">停用
              </cjm-button>
              <cjm-button type="text" power-code="vertificateCodeListControl" v-if="scope.row.status == 0" @click="updateStatus('1', scope.row)">启用
              </cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage == 'edit'">
      <add-edit></add-edit>
    </div>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch'
  import addEdit from './edit.vue'
  export default{
    mixins: [pageSwitch],
    components: {
      addEdit
    },
    data(){
      let search = {
        beginTime: '',
        endTime: '',
        verificateType: '',
        orgID: '',
        status: ''
      };
      return {
        requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.verificateCode.GET_ACTIVITY_LIST,
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
        },
        search: search,
        columHeight: {
          height: '200px',
          overflow: 'auto'
        },
        columHeightAuto: {
          height: 'auto'
        },
        statusLock: true,
        currentPage: 'list'
      }
    },
    methods: {
      listEditHTML(row, type){
        let arr = row[type].split(',');
        if (arr.length > 2) {
          arr = arr.map((val, index) => {
            if (index < 1) {
              return '<p style="white-space:nowrap; width: 150px;text-overflow:ellipsis;overflow: hidden;">' + val + '</p>';
            }
          })
          return arr.join('') + '...';
        } else {
          arr = arr.map((val, index) => {
            if (index < 2) {
              return '<p style="white-space:nowrap; width: 150px;text-overflow:ellipsis;overflow: hidden;">' + val + '</p>';
            }
          })
          return arr.join('');
        }
      },
      updateStatus(status, row){
        if (this.statusLock) {
          this.statusLock = false;
          let params = {
            activityID: row.activityID,
            status: status
          };
          this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.verificateCode.UPDATE_STATUS, params).then((res) => {
            if (res.resultCode === '200') {
              row.status = row.status === '1' ? '0' : '1';
              this.$message(row.status === '1' ? '已启用' : '已停用');
            } else {
              this.$message.error(res.message);
            }
            this.statusLock = true;
          })
        } else {
          this.$message('请等待...');
        }
      },
      edit(type, row){
        switch (type) {
          case 'add':
            this.pushPage('edit', '新建活动', {id: type});
            break;
          case 'edit':
            let activityID = row.activityID;
            this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.verificateCode.GET_ACTIVITY_DETAIL, {activityID: activityID}).then((res) => {
              if (res.resultCode === '200') {
                this.pushPage('edit', '编辑', {id: type, editData: res.data});
              } else {
                this.$message.error(res.message);
              }
            });
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
