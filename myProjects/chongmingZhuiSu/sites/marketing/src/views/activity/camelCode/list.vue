<template>
  <div>
    <div v-if="currentPage === 'list'">
      <cjm-list :requestUrl="requestUrl" ref="list" @data-change="getTableData" :need-base-search="true"
                :need-advanced-search="true">
        <div slot="operate">
          <cjm-popover trigger="hover" placement="right-start" :disabled="!isAddBtnDisabled" ref="popover2">
            <div>当前已存在上线的活动，请结束后再创建新活动</div>
          </cjm-popover>
          <div v-popover:popover2>
            <cjm-button type="primary" class="cjm-icon-add" @click="add" :disabled="isAddBtnDisabled">新建活动</cjm-button>
          </div>
        </div>
        <div slot="search">
          <cjm-search-item label="活动名称" v-model="search.activityName" search-key="activityName">
            <cjm-input v-model="search.activityName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="活动时间" v-model="search.createTime" search-key="createTime">
            <cjm-date-picker v-model="search.createTime" type="daterange" :chooseFuture="true"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="更新时间" v-model="search.lastUpdateTime" search-key="lastUpdateTime">
            <cjm-date-picker v-model="search.lastUpdateTime" type="daterange" :chooseFuture="true"></cjm-date-picker>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column sortable="custom" label="活动名称" min-width="150" prop="activityName"></cjm-table-column>
          <cjm-table-column sortable="custom" label="活动时间" min-width="200" prop="createTime">
            <template slot-scope="scope">
              <span>{{scope.row.beginTime.split(' ')[0]}} - {{scope.row.endTime.split(' ')[0]}}</span>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" label="活动产品" min-width="150" :show-overflow-tooltip="false"
                            prop="productNameList">
            <template slot-scope="scope">
              <cjm-popover trigger="hover" placement="top-start" width="300" ref="popover1">
                <div v-html="scope.row.productNameList.split(',').join('<br>')"
                     :style="scope.row.productNameList.split(',').length > 15 ? columHeight : columHeightAuto"></div>
              </cjm-popover>
              <p v-popover:popover1 v-html="listEditHTML(scope.row,'productNameList')"></p>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" label="更新时间" min-width="150" prop="lastUpdateTime"></cjm-table-column>
          <cjm-table-column sortable="custom" label="更新者" min-width="150" prop="lastUpdateByName"></cjm-table-column>
          <cjm-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.status != 0">
                <cjm-button type="text" @click="editActivity(scope.row)">编辑</cjm-button>
                <cjm-button type="text" @click="linkCamelCode(scope.row)">设置内容</cjm-button>
                <cjm-button type="text" @click="disabledActivity(scope.row)">结束</cjm-button>
              </div>
              <div v-if="scope.row.status == 0">
                <span>已结束</span>
              </div>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage === 'edit'">
      <edit ref="editForm"></edit>
    </div>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch'
  import edit from './edit.vue'
  export default{
    mixins: [pageSwitch],
    components: {
      edit
    },
    data(){
      return {
        requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.camelCode.GET_LIST,
        search: {
          activityName: '',
          createTime: '',
          lastUpdateTime: ''
        },
        currentPage: 'list',
        isAddBtnDisabled: false,
        columHeight: {
          height: '200px',
          overflow: 'auto'
        },
        columHeightAuto: {
          height: 'auto'
        }
      }
    },
    methods: {
      //新增活动
      add(){
        this.pushPage('edit', '新建活动', {id: 'add'});
      },
      //结束活动
      disabledActivity(row){
        this.$confirm('确定提前结束当前活动吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let params = {
            activityID: row.activityID,
            status: '0'
          };
          this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.camelCode.UPDATE_ACTIVITY_STATUS, params).then(res => {
            if (res.resultCode === '200') {
              this.$message.success('禁用成功!');
              row.status = '0';
              //this.$refs.list.refresh();
              this.isAddBtnDisabled = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        }).catch(() => {});
      },
      //编辑活动
      editActivity(row){
        let params = {
          activityID: row.activityID
        };
        this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.camelCode.GET_ACTIVITY_DETAIL, params).then(res => {
          if (res.resultCode === '200') {
            let editData = {
              activityID: res.data.activityID,
              activityName: res.data.activityName,
              productID: res.data.productIDList,
              activityTime: res.data.beginTime + ' ~ ' + res.data.endTime
            };
            this.pushPage('edit', '编辑活动', {id: 'edit', data: editData});
          }
        });
      },
      //设置活动内容
      linkCamelCode(){
        this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.camelCode.GET_SET_ACTIVITY_CONTENT_URL).then(res => {
          if (res.resultCode === '200') {
            location.href = res.data;
          }
        });
      },
      getTableData(data){
        data.rows.forEach(item => {
          if (item.status === '2') {
            this.isAddBtnDisabled = true;
          }
        });
      },
      listEditHTML(row, type) {
        let arr = row[type].split(',');
        if (arr.length > 2) {
          arr = arr.map((val, index) => {
            if (index < 1) {
              return (
                '<p style="white-space:nowrap; width: 150px;text-overflow:ellipsis;overflow: hidden;">' +
                val +
                '</p>'
              );
            }
          });
          return arr.join('') + '...';
        } else {
          arr = arr.map((val, index) => {
            if (index < 2) {
              return (
                '<p style="white-space:nowrap; width: 150px;text-overflow:ellipsis;overflow: hidden;">' +
                val +
                '</p>'
              );
            }
          });
          return arr.join('');
        }
      },
      pageSwitched(codes){
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
</style>
