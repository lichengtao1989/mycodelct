<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-advanced-search="true" ref="list">
      <div slot="operate">
        <cjm-button @click="add" type="primary"><i class="cjm-icon-add"></i>发布</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="发布时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="发布来源" search-key="orgID" v-model="search.orgID">
          <cjm-remote-select v-model="search.orgID" :remote-url="apiUrl.autoComplete.ORG"></cjm-remote-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="title" min-width="150" label="标题" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="range" width="120" label="通知范围" enum-name="通知范围"
                          enum-namespace="base" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="status" width="120" label="当前状态" enum-name="启用禁用"
                          enum-namespace="base" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="closable" width="140" label="卡片允许关闭" enum-name="是否"
                          enum-namespace="base" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="orgName" width="150" label="发布来源" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createBy" width="100" label="发布人" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" width="170" label="发布时间" sortable="custom"></cjm-table-column>
        <cjm-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" v-if="canOperate(scope.row)" @click="edit(scope.row.id)">编辑</cjm-button>
            <cjm-button type="text" v-if="canOperate(scope.row) && scope.row.status==1" @click="disable([scope.row.id])">禁用</cjm-button>
            <cjm-button type="text" v-if="canOperate(scope.row) && scope.row.status==0" @click="enable([scope.row.id])">启用</cjm-button>
            <cjm-button type="text" v-if="canOperate(scope.row)" @click="del([scope.row.id])">删除</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>

    <notification-edit ref="notificationEdit"
                       :visible.sync="dialogVisible"
                       @submitSuccess="$refs.list.refresh()"></notification-edit>
  </div>
</template>

<script>
  import NotificationEdit from './edit.vue';
  export default {
    components: {
      NotificationEdit
    },
    data() {
      return {
        enums: this.$globalData.get('base', 'enums'),
        apiUrl: this.$globalData.get('base', 'apiUrl'),
        search: {
          orgID: '',
          createTime: ''
        },
        requestUrl: this.$globalData.get('base', 'apiUrl').notification.GET_LIST,
        dialogTitle: '',
        dialogVisible: false
      };
    },
    methods: {
      //是否可以操作
      canOperate(row){
        //不能操作其他机构发布的通知
        const currentUser = this.$globalData.get('currentUser');
        if (row.orgId != currentUser.orgID) {
          return false;
        }
        return true;
      },
      //新增
      add() {
        this.dialogTitle = '发布通知';
        this.dialogVisible = true;
        this.$nextTick(()=> {
          this.$refs.notificationEdit.addForm();
        });
      },
      //编辑
      edit(id) {
        this.dialogTitle = '编辑通知';
        this.dialogVisible = true;
        this.$nextTick(()=> {
          this.$refs.notificationEdit.editForm(id);
        });
      },
      //禁用
      disable(ids) {
        this.$confirm('确认禁用该通知？', '提示', {type: 'warning'}).then(()=> {
          this.setStatus(ids, 0);
        }).catch(()=> {
        });
      },
      //启用
      enable(ids) {
        this.setStatus(ids, 1);
      },
      //设置状态
      setStatus(ids, status){
        this.$ajax.post(this.apiUrl.notification.SET_STATUS, {
          ids: ids,
          status: status
        }).then((r) => {
          if (r.resultCode == 200) {
            this.$refs.list.refresh();
          } else {
            this.$message.error(r.msg);
          }
        }).catch(error=> {
          this.$message.error(error.message);
        });
      },
      //删除
      del(ids){
        this.$confirm('确认删除该通知？', '提示', {type: 'warning'}).then(()=> {
          this.$ajax.post(this.apiUrl.notification.DELETE, {
            ids: ids
          }).then((r) => {
            if (r.resultCode == 200) {
              this.$refs.list.refresh();
            } else {
              this.$message.error(r.msg);
            }
          }).catch(error=> {
            this.$message.error(error.message);
          });
        }).catch(()=> {
        });
      }
    }
  };
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
