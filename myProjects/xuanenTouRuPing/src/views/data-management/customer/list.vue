<template>
  <div v-tab-title="'客户管理'">
    <nz-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true" base-search-placeholder="客户姓名" ref="list">
      <div slot="operate">
        <nz-button @click="customerAdd" type="primary">
          <i class="nz-icon-add"></i>添加客户</nz-button>
        <nz-button class="nz-bottom-border" @click="importCustomer">
          <i class="nz-icon-import"></i>
          <span>导入</span>
        </nz-button>
        <nz-button class="nz-bottom-border" @click="downloadTemplate">
          <i class="nz-icon-download"></i>
          <span>下载导入模版</span>
        </nz-button>
        <nz-button class="nz-bottom-border" @click="exportCustomer">
          <i class="nz-icon-export"></i>
          <span>导出</span>
        </nz-button>
      </div>
      <div slot="search">
        <nz-search-item label="姓名" search-key="name" v-model="search.name">
          <nz-input v-model="search.name"></nz-input>
        </nz-search-item>
        <nz-search-item label="联系电话" search-key="mobile" v-model="search.mobile">
          <nz-input v-model="search.mobile"></nz-input>
        </nz-search-item>
        <nz-search-item label="公司名称" search-key="corpName" v-model="search.corpName">
          <nz-input v-model="search.corpName"></nz-input>
        </nz-search-item>
        <nz-search-item label="身份证号" search-key="identityNumber" v-model="search.identityNumber">
          <nz-input v-model="search.identityNumber"></nz-input>
        </nz-search-item>
        <nz-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <nz-datepicker v-model="search.createTime" type="daterange"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="name" min-width="120" label="姓名" sortable="custom"></nz-table-column>
        <nz-table-column prop="sex" min-width="100" label="性别" enum-name="性别" sortable="custom"></nz-table-column>
        <nz-table-column prop="corpName" min-width="200" label="公司名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="address" min-width="120" label="地址" sortable="custom"></nz-table-column>
        <nz-table-column prop="identityNumber" min-width="180" label="身份证号码" sortable="custom"></nz-table-column>
        <nz-table-column prop="mobile" min-width="120" label="联系方式" sortable="custom"></nz-table-column>
        <nz-table-column prop="createTime" min-width="120" label="创建时间" sortable="custom"></nz-table-column>
        <nz-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="editBnt(scope.row.customerID)">编辑</nz-button>
            <nz-button type="text" @click="deleteStatus(scope.row.customerID)">删除</nz-button>
            <nz-button v-if="scope.row.status!='0'" type="text" @click="updateStatus(scope.row.customerID, '0')">禁用</nz-button>
            <nz-button v-if="scope.row.status=='0'" type="text" @click="updateStatus(scope.row.customerID, '1')" style="color:#4c4c4c;">启用</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <nz-dialog :title="titleName" ref="editCustomerDialog" :okHandler="editCustomerFirm" height="500">
      <edit-customer ref="editCustomer"></edit-customer>
    </nz-dialog>
    <!-- 导入弹框 -->
    <nz-dialog title="导入客户" ref="importDialog">
      <customer-import ref="customerImport"></customer-import>
      <div slot="footer">
        <nz-button type="primary" @click="importConfirm" :loading="importButtonLoading">
          <i class="nz-icon-import"></i>导入
        </nz-button>
        <nz-button @click="importCancel" :disabled="importButtonLoading">
          <i class="nz-icon-close"></i>取消
        </nz-button>
      </div>
    </nz-dialog>
  </div>
</template>
<script>
import editCustomer from './edit.vue';
import fileDownLoad from 'framework/utils/fileDownload';
import customerImport from './import.vue';
export default {
  components: {
    editCustomer,
    customerImport
  },
  data() {
    let apiUrl = this.$apiUrl.DATAMANAGEMENT;
    return {
      apiUrl: apiUrl,
      titleName: '添加客户',
      importButtonLoading: false,
      requestUrl: apiUrl.GET_LIST_CUSTOMER,
      search: {
        mobile: '',
        name: '',
        corpName: '',
        identityNumber: '',
        createTime: ''
      }
    };
  },
  watch: {},
  methods: {
    async editBnt(customerId) {
      this.titleName = '编辑客户';
      this.$refs.editCustomerDialog.show();
      await this.$nextTick();
      this.$refs.editCustomer.editFrom(customerId);
    },
    async deleteStatus(row) {
      let data = {
        customerId: row
      };
      let msg = await this.$message.confirm('确定要删除吗');
      if (msg) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.DELETE_CUSTOMER, data);
        if (res.resultCode == 200) {
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
        }
      }
    },
    async updateStatus(row, status) {
      let data = {
        customerId: row
      };
      if (status == 0) {
        let msg = await this.$message.confirm('确定要禁用吗');
        if (msg) {
          let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SET_CUSTOMER_STATUS, data);
          if (res.resultCode != 200) {
            this.$message.showError(err);
          }
        }
      } else {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SET_CUSTOMER_STATUS, data);
        if (res.resultCode != 200) {
          this.$message.showError(err);
        }
      }
      this.$refs.list.refresh();
    },
    //添加客户
    async customerAdd() {
      this.$refs.editCustomerDialog.show();
      await this.$nextTick();
      this.$refs.editCustomer.addFrom();
    },
    async editCustomerFirm(callback) {
      let { valid, err, res } = await this.$refs.editCustomer.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$refs.editCustomerDialog.hide();
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }
      callback();
    },
    //导出列表
    async exportCustomer() {
      fileDownLoad(this.$apiUrl.DATAMANAGEMENT.EXPOET_CUSTOMER_LIST, this.$refs.list.getConditions());
    },
    //下载导入模板
    async downloadTemplate() {
      fileDownLoad(this.$apiUrl.TEMPLATE.customerImportTemplateUrl);
    },
    importCustomer() {
      this.$refs.importDialog.show();
      this.$nextTick(() => {
        this.$refs.customerImport.addForm();
      });
    },
    //导入确认
    importConfirm() {
      this.importButtonLoading = true;
      this.$refs.customerImport
        .submit()
        .then(() => {
          this.importButtonLoading = false;
          this.$refs.importDialog.hide();
          this.$refs.list.refresh();
        })
        .catch(error => {
          if (error) {
            console.log(error);
            this.$message.showError(error);
          }
          this.importButtonLoading = false;
        });
    },
    importCancel() {
      this.$refs.importDialog.hide();
    }
  },
  created() {}
};
</script>
