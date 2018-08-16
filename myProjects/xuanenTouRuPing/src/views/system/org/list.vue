<template>
  <div v-tab-title="'组织管理'">
    <nz-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true" base-search-placeholder="组织名称   、组织ID" :formatData="formatData" ref="list">
      <div slot="operate">
        <nz-button @click="addOrg" type="primary">
          <i class="nz-icon-add"></i>新建组织</nz-button>
      </div>
      <div slot="search">
        <nz-search-item label="组织ID" search-key="orgID" v-model="search.orgID">
          <nz-input v-model="search.orgID"></nz-input>
        </nz-search-item>
        <nz-search-item label="组织名称" search-key="orgName" v-model="search.orgName">
          <nz-input v-model="search.orgName"></nz-input>
        </nz-search-item>
        <nz-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <nz-datepicker v-model="search.createTime" type="daterange"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="orgID" min-width="120" label="组织ID" sortable="custom"></nz-table-column>
        <nz-table-column prop="orgName" min-width="200" label="组织名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="regionCode" min-width="250" label="所在地" sortable="custom"></nz-table-column>
        <nz-table-column prop="status" min-width="180" label="状态" sortable="custom">
          <template slot-scope="scope">
            <nz-button v-if="scope.row.status == 1" type="text">
              <i class="nz-icon-circle" style="color:#67c23a;font-size: 2px;"></i>运行中</nz-button>
            <nz-button v-if="scope.row.status == 0" type="text">
              <i class="nz-icon-circle" style="color:#ff4949;font-size: 2px;"></i>关闭</nz-button>
          </template>
        </nz-table-column>
        <nz-table-column prop="createTime" min-width="180" label="创建时间" sortable="custom"></nz-table-column>
        <nz-table-column label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="editOrg(scope.row)">编辑</nz-button>
            <nz-button type="text" @click="login(scope.row)">登录</nz-button>
            <nz-button v-if="scope.row.status!='0'" type="text" @click="updateStatus(scope.row.orgID, '0')">禁用</nz-button>
            <nz-button v-if="scope.row.status=='0'" type="text" @click="updateStatus(scope.row.orgID, '1')" style="color:#4c4c4c;">启用</nz-button>
            <nz-button type="text" @click="resetPwd(scope.row)">重置密码</nz-button>
            <nz-button type="text" @click="logoSeting(scope.row.orgID)">个性化设置</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <nz-dialog :title="titleName" ref="editDialog" :okHandler="editFirm">
      <edit ref="edit"></edit>
    </nz-dialog>
    <nz-dialog title="修改密码" ref="resetPwdDialog" :okHandler="resetPwdFirm">
      <reset-pwd ref="resetPwd"></reset-pwd>
    </nz-dialog>
    <nz-dialog title="修改密码" ref="logoSetingDialog" :okHandler="resetPwdFirm">
      <reset-pwd ref="resetPwd"></reset-pwd>
    </nz-dialog>
  </div>
</template>
<script>
import edit from './edit.vue';
import resetPwd from '../account/resetPwd.vue';
export default {
  components: {
    edit,
    resetPwd
  },
  data() {
    return {
      titleName: '新建组织',
      requestUrl: this.$apiUrl.ORG.GET_LIST,
      currentPage: 'list',
      search: {
        orgID: '',
        orgName: '',
        createTime: ''
      }
    };
  },
  watch: {},
  methods: {
    formatData(data) {
      data.forEach(item => {
        item.regionName = '';
        this.loadRegionName(item);
      });
      return data;
    },
    async loadRegionName(item) {
      if (item.regionCode != null && item.regionCode != '') {
        let regionCode = await this.$model('region').getRegionText(item.regionCode);
        item.regionCode = regionCode;
      }
    },
    async login(row) {
      let newBlank = window.open('about:blank');
      this.form = {
        mobile: row.contactsMobile,
        password: row.password,
        type: 1
      };
      let { err, res } = await this.$model('user').login(this.form);
      if (res.resultCode == 200) {
        newBlank.location.href = '/#/main/index';
      } else {
        this.$message.showError(err);
      }
    },
    async updateStatus(row, status) {
      let data = {
        orgID: row
      };
      if (status == 0) {
        let msg = await this.$message.confirm('确定要禁用吗');
        if (msg) {
          let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.ORG.SET_STATUS, data);
          if (res.resultCode != 200) {
            this.$message.showError(err);
          }
          this.$refs.list.refresh();
        }
      } else {
        let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.ORG.SET_STATUS, data);
        if (res.resultCode != 200) {
          this.$message.showError(err);
        }
        this.$refs.list.refresh();
      }
    },
    //编辑组织
    async editOrg(row) {
      this.titleName = '编辑组织';
      this.$refs.editDialog.show();
      await this.$nextTick();
      this.$refs.edit.editFrom(row.orgID);
    },
    //添加组织
    async addOrg(row) {
      this.titleName = '新建组织';
      this.$refs.editDialog.show();
      await this.$nextTick();
      this.$refs.edit.addFrom();
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
    //重置密码
    async resetPwd(row) {
      this.$refs.resetPwdDialog.show();
      await this.$nextTick();
      this.$refs.resetPwd.editFrom(row.userID);
    },
    async resetPwdFirm(callback) {
      let { valid, err, res } = await this.$refs.resetPwd.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$message.success('修改成功');
          this.$refs.resetPwdDialog.hide();
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
        }
      }
      callback();
    },
    //个性化设置logo
    async logoSeting(orgId){
      this.$router.push({ path: '/main/logoSeting', query: { orgId: orgId, currentPage: 'logoEdit' } });
    }
  },
  created() {}
};
</script>
