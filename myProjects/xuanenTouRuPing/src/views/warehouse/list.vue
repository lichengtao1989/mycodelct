<template>
  <div>
    <nz-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true" base-search-placeholder="输入商品条码或商品名称查找" ref="list">
      <div slot="search">
        <nz-search-item label="商品名称" search-key="productName" v-model="search.productName">
          <nz-input v-model="search.productName"></nz-input>
        </nz-search-item>
        <nz-search-item label="商品分类" search-key="category" v-model="search.category">
          <nz-enum-select v-model="search.category" :options="$enum('类别').values"></nz-enum-select>
        </nz-search-item>
        <nz-search-item label="商品条码" search-key="productBarCode" v-model="search.productBarCode">
          <nz-input v-model="search.productBarCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="库存预警" search-key="isWarning" v-model="search.isWarning">
          <nz-enum-select v-model="search.isWarning" :options="$enum('库存预警').values"></nz-enum-select>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="productName" min-width="120" label="商品名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="productBarCode" min-width="100" label="商品条码" sortable="custom"></nz-table-column>
        <nz-table-column prop="category" min-width="200" label="商品分类" enum-name="类别" sortable="custom"></nz-table-column>
        <nz-table-column prop="productType" min-width="200" label="商品类型" sortable="custom"></nz-table-column>
        <nz-table-column prop="packingSpecifications" min-width="200" label="规格/包装" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.packingSpecifications !=null">{{`${scope.row.packingSpecifications}${scope.row.packagingType}/${scope.row.packagingUnit}`}}</div>
          </template>
        </nz-table-column>
        <nz-table-column prop="stockCount" min-width="120" label="当前库存" sortable="custom"></nz-table-column>
        <nz-table-column prop="isWarning" min-width="120" label="库存预警" enum-name="库存预警" sortable="custom">
          <template slot-scope="scope">
            <nz-button type="text" v-if="scope.row.isWarning == 1" style="color:#67c23a">
              <i class="nz-icon-adequate"></i>库存充足</nz-button>
            <nz-button type="text" v-if="scope.row.isWarning == 2" style="color:#fc9b1e">
              <i class="nz-icon-insufficient"></i>库存不足</nz-button>
          </template>
        </nz-table-column>
        <nz-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="instockEditFn(scope.row)">调整库存</nz-button>
            <nz-button type="text" @click="earlyWarningEditFn(scope.row)">预警设置</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <nz-dialog title="调整库存" ref="instockDialog" :okHandler="instockConfirm" :height="600">
      <instock-edit ref="instockEdit"></instock-edit>
    </nz-dialog>
    <nz-dialog title="预警设置" ref="earlyWarningDialog" :okHandler="earlyWarningConfirm" :height="600">
      <early-warning-edit ref="earlyWarningEdit"></early-warning-edit>
    </nz-dialog>
  </div>
</template>
<script>
import instockEdit from './instock-edit';
import earlyWarningEdit from './early-warning-edit';
export default {
  components: {
    instockEdit,
    earlyWarningEdit
  },
  data() {
    let apiUrl = this.$apiUrl.WAREHOUSE;
    return {
      apiUrl: apiUrl,
      requestUrl: apiUrl.GET_LIST,
      search: {
        productName: '',
        category: '',
        productBarCode: '',
        isWarning: ''
      },
      dialogVisible: false
    };
  },
  watch: {},
  methods: {
    async instockEditFn(row) {
      this.$refs.instockDialog.show();
      await this.$nextTick();
      this.$refs.instockEdit.addForm(row);
    },
    async earlyWarningEditFn(row) {
      this.$refs.earlyWarningDialog.show();
      await this.$nextTick();
      this.$refs.earlyWarningEdit.addForm(row);
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
    async instockConfirm(callback) {
      await this.$sleep(500);
      let { err, res } = await this.$refs.instockEdit.submit();
      if (res.resultCode == 200) {
        this.$refs.instockDialog.hide();
        this.$refs.list.refresh();
        this.$message.success('当前库存数量已调整');
      } else {
        this.$message.showError(err);
      }
      callback();
    },
    async earlyWarningConfirm(callback) {
      await this.$sleep(500);
      let { err, res } = await this.$refs.earlyWarningEdit.submit();
      if (res.resultCode == 200) {
        this.$refs.earlyWarningDialog.hide();
        this.$refs.list.refresh();
        this.$message.success('当前库存数量低于最小值则预警');
      } else {
        this.$message.showError(err);
      }
      callback();
    }
  },
  created() {
    this.$eventBus.$emit('titleName', '库存表');
  }
};
</script>
