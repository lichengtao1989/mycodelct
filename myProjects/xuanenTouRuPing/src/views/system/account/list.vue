<template>
  <div v-tab-title="'账号管理'">
    <nz-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true" base-search-placeholder="登陆账号" ref="list">
      <div slot="operate">
        <nz-button @click="addAccount" type="primary">
          <i class="nz-icon-add"></i>新建</nz-button>
      </div>
      <div slot="search">
        <nz-search-item label="登陆账号" search-key="mobile" v-model="search.mobile">
          <nz-input v-model="search.mobile"></nz-input>
        </nz-search-item>
        <nz-search-item label="姓名" search-key="userName" v-model="search.userName">
          <nz-input v-model="search.userName"></nz-input>
        </nz-search-item>
        <nz-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <nz-datepicker v-model="search.createTime" type="daterange"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="mobile" min-width="120" label="登陆账号" sortable="custom"></nz-table-column>
        <nz-table-column prop="userName" min-width="100" label="姓名" sortable="custom"></nz-table-column>
        <!-- <nz-table-column prop="storeName" min-width="200" label="所属主体" sortable="custom"></nz-table-column> -->
        <nz-table-column prop="createTime" min-width="180" label="创建时间" sortable="custom"></nz-table-column>
        <nz-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="editAccount(scope.row)">编辑</nz-button>
            <nz-button v-if="scope.row.status!='0'" type="text" @click="updateStatus(scope.row.userID, '0')">禁用</nz-button>
            <nz-button v-if="scope.row.status=='0'" type="text" @click="updateStatus(scope.row.userID, '1')" style="color:#4c4c4c;">启用</nz-button>
            <nz-button type="text" @click="resetPwd(scope.row)">重置密码</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <nz-dialog :title="titleName" ref="editDialog" :okHandler="editFirm" height="500">
      <edit ref="edit"></edit>
    </nz-dialog>
    <nz-dialog title="修改密码" ref="resetPwdDialog" :okHandler="resetPwdFirm" height="500">
      <reset-pwd ref="resetPwd"></reset-pwd>
    </nz-dialog>
  </div>
</template>
<script>
import edit from './edit.vue';
import resetPwd from './resetPwd.vue';
export default {
  components: {
    edit,
    resetPwd
  },
  data() {
    return {
      titleName: '新建账号',
      requestUrl: this.$apiUrl.USER.GET_ACCOUNT_LIST,
      search: {
        userName: '',
        mobile: '',
        createTime: ''
      }
    };
  },
  watch: {},
  methods: {
    async updateStatus(row, status) {
      let data = {
        userID: row
      };
      if (status == 0) {
        let msg = await this.$message.confirm('确定要禁用吗');
        if (msg) {
          let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.USER.SET_STATUS, data);
          if (res.resultCode != 200) {
            this.$message.showError(err);
          }
        }
      } else {
        let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.USER.SET_STATUS, data);
        if (res.resultCode != 200) {
          this.$message.showError(err);
        }
      }
      this.$refs.list.refresh();
    },
    //添加客户
    async addAccount() {
      this.titleName = '新建账号';
      this.$refs.editDialog.show();
      await this.$nextTick();
      this.$refs.edit.addFrom();
    },
    //编辑客户
    async editAccount(row) {
      this.titleName = '编辑账号';
      this.$refs.editDialog.show();
      await this.$nextTick();
      this.$refs.edit.editFrom(row.userID);
    },
    //重置密码
    async resetPwd(row) {
      this.$refs.resetPwdDialog.show();
      await this.$nextTick();
      this.$refs.resetPwd.editFrom(row.userID);
    },
    async editFirm(callback) {
      let { valid, err, res } = await this.$refs.edit.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$refs.editDialog.hide();
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }
      callback();
    },
    async resetPwdFirm(callback) {
      let { valid, err, res } = await this.$refs.resetPwd.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$message.success('修改成功');
          this.$refs.resetPwdDialog.hide();
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }
      callback();
    }
  },
  created() {}
};
</script>
