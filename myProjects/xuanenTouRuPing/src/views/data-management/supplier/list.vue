<template>
  <div>
    <nz-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true" base-search-placeholder="供应商名称" ref="list">
      <div slot="operate">
        <nz-button @click="supplierAdd" type="primary">
          <i class="nz-icon-add"></i>添加供应商</nz-button>
        <nz-button class="nz-bottom-border" @click="importSupplier">
          <i class="nz-icon-import"></i>
          <span>导入</span>
        </nz-button>
        <nz-button @click="downloadTemplate" class="nz-bottom-border">
          <i class="nz-icon-download"></i>
          <span>下载导入模版</span>
        </nz-button>
        <nz-button class="nz-bottom-border" @click="exportSupplier">
          <i class="nz-icon-export"></i>
          <span>导出</span>
        </nz-button>
      </div>
      <div slot="search">
        <nz-search-item label="供应商名称" search-key="supplierName" v-model="search.supplierName">
          <nz-input v-model="search.supplierName"></nz-input>
        </nz-search-item>
        <nz-search-item label="联系电话" search-key="mobile" v-model="search.mobile">
          <nz-input v-model="search.mobile"></nz-input>
        </nz-search-item>
        <nz-search-item label="联系地址" search-key="address" v-model="search.address">
          <nz-input v-model="search.address"></nz-input>
        </nz-search-item>
        <nz-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <nz-datepicker v-model="search.createTime" type="daterange"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="supplierName" min-width="120" label="供应商名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="contact" width="100" label="联系人" sortable="custom"></nz-table-column>
        <nz-table-column prop="address" min-width="200" label="联系地址" sortable="custom"></nz-table-column>
        <nz-table-column prop="uniformCreditCode" width="200" label="统一社会信用代码" sortable="custom"></nz-table-column>
        <nz-table-column prop="mobile" width="180" label="联系电话" sortable="custom"></nz-table-column>
        <nz-table-column prop="createTime" width="180" label="创建时间" sortable="custom"></nz-table-column>
        <nz-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="editBnt(scope.row.supplierID)">编辑</nz-button>
            <nz-button type="text" @click="deleteStatus(scope.row.supplierID)">删除</nz-button>
            <nz-button v-if="scope.row.status!='0'" type="text" @click="updateStatus(scope.row.supplierID, '0')">禁用</nz-button>
            <nz-button v-if="scope.row.status=='0'" type="text" @click="updateStatus(scope.row.supplierID, '1')" style="color:#4c4c4c;">启用</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <nz-dialog :title="titleName" ref="editSupplierDialog" :okHandler="editSupplierFirm" height="500">
      <edit-supplier ref="editSupplier"></edit-supplier>
    </nz-dialog>
    <nz-dialog title="导入供应商" ref="importDialog">
      <supplier-import ref="supplierImport"></supplier-import>
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
import editSupplier from './edit.vue';
import fileDownLoad from 'framework/utils/fileDownload';
import supplierImport from './import.vue';
export default {
  components: {
    editSupplier,
    supplierImport
  },
  data() {
    let apiUrl = this.$apiUrl.DATAMANAGEMENT;
    return {
      apiUrl: apiUrl,
      titleName: '添加供应商',
      importButtonLoading: false,
      requestUrl: apiUrl.GET_LIST_SUPPLIER,
      search: {
        mobile: '',
        supplierName: '',
        address: '',
        createTime: ''
      }
    };
  },
  watch: {},
  methods: {
    async editBnt(supplierID) {
      this.titleName = '编辑供应商';
      this.$refs.editSupplierDialog.show();
      await this.$nextTick();
      this.$refs.editSupplier.editForm(supplierID);
    },
    async deleteStatus(row) {
      let data = {
        supplierID: row
      };
      let msg = await this.$message.confirm('确定要删除吗');
      if (msg) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.DELETE_SUPPLIER, data);
        if (res.resultCode == 200) {
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
        }
      }
    },
    async updateStatus(row, status) {
      let data = {
        supplierID: row
      };
      if (status == 0) {
        let msg = await this.$message.confirm('确定要禁用吗');
        if (msg) {
          let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SET_SUPPLIER_STATUS, data);
          if (res.resultCode != 200) {
            this.$message.showError(err);
          }
        }
      } else {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SET_SUPPLIER_STATUS, data);
        if (res.resultCode != 200) {
          this.$message.showError(err);
        }
      }
      this.$refs.list.refresh();
    },
    //添加供应商
    async supplierAdd() {
      this.$refs.editSupplierDialog.show();
      await this.$nextTick();
      this.$refs.editSupplier.addForm();
    },
    async editSupplierFirm(callback) {
      let { valid, err, res } = await this.$refs.editSupplier.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$refs.editSupplierDialog.hide();
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }
      callback();
    },
    //导出列表
    async exportSupplier() {
      fileDownLoad(this.$apiUrl.DATAMANAGEMENT.EXPOET_SUPPLIER_LIST, this.$refs.list.getConditions());
    },
    //下载导入模板
    async downloadTemplate() {
      fileDownLoad(this.$apiUrl.TEMPLATE.supplierImportTemplateUrl);
    },
    importSupplier() {
      this.$refs.importDialog.show();
      this.$nextTick(() => {
        this.$refs.supplierImport.addForm();
      });
    },
    //导入确认
    importConfirm() {
      this.importButtonLoading = true;
      this.$refs.supplierImport
        .submit()
        .then(() => {
          this.importButtonLoading = false;
          this.$refs.importDialog.hide();
          this.$refs.list.refresh();
        })
        .catch(error => {
          if (error) {
            this.$message.showError(error);
          }
          this.importButtonLoading = false;
        });
    },
    importCancel() {
      this.$refs.importDialog.hide();
    }
  },
  created() {
    this.$eventBus.$emit('titleName', '供应商管理');
  }
};
</script>
