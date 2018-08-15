<template>
  <div>
    <cjm-list :need-advanced-search="true" :request-url="logisticsApiUrl.storage.GET_STOCK_TRANSFER_WAREHOUSE_LIST" ref="list" base-search-placeholder="输入单据编号、物流码搜索" :before-search="beforeSearch">
      <div slot="operate">
        <cjm-button @click="stockTransferWarehouse" type="primary" power-code="billMove"><i class="cjm-icon-add"></i>手工输入</cjm-button>
        <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="单据编号" search-key="billCode" v-model="search.billCode">
          <cjm-input v-model="search.billCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="物流码" search-key="code" v-model="search.code">
          <cjm-input v-model="search.code"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="产品名称" search-key="productID" v-model="search.productID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.PRODUCT" v-model="search.productID"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="调出仓库" search-key="stockOutHouseID" v-model="search.stockOutHouseID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.ORG" v-model="search.stockOutHouseID"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="调入仓库" search-key="stockInHouseID" v-model="search.stockInHouseID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.ORG" v-model="search.stockInHouseID"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="操作人" search-key="createBy" v-model="search.createBy">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.USER" v-model="search.createBy"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="操作时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker type="daterange" v-model="search.createTime"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column label="单据编号" prop="billCode" sortable="custom" min-width="140"></cjm-table-column>
        <cjm-table-column label="物流码" prop="code" sortable="custom" min-width="170"></cjm-table-column>
        <cjm-table-column label="操作类型" prop="operationType" sortable="custom" enum-namespace="logistics" enum-name="物流操作方式" min-width="120"></cjm-table-column>
        <cjm-table-column label="调出仓库" prop="stockOutHouseName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="调入仓库" prop="stockInHouseName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="产品名称" prop="productName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="产品规格" prop="specValue" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="计量单位" prop="unitName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="单标数量" prop="layer3Number" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="处理结果" prop="detailResult" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="操作人" prop="createByName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="操作时间" prop="createTime" sortable="custom" min-width="160"></cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :ok-handler="stockTransferWarehouseConfirm" :visible.sync="dialogVisible" title="产品调仓">
      <stock-transfer-warehouse-edit ref="editPage"></stock-transfer-warehouse-edit>
    </cjm-dialog>
  </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  import StockTransferWarehouseEdit from './stock-transfer-warehouse-edit.vue'
  export default{
    components: {
      StockTransferWarehouseEdit
    },
    data() {
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        search: {
          billCode: '',
          code: '',
          productID: '',
          stockOutHouseID: '',
          stockInHouseID: '',
          createBy: '',
          createTime: ''
        },
        dialogVisible: false
      }
    },
    methods: {
      stockTransferWarehouse(){
        this.dialogVisible = true;
        this.$nextTick(() => {     //保证子页面加载完成后执行
          this.$refs.editPage.addForm();
        })
      },
      stockTransferWarehouseConfirm(callback) {
        this.$refs.editPage.submit().then(() => {
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        }).catch(error => {
          if (error) {
            this.$message.error(error.message);
            this.$refs.list.refresh();
          }
          callback();
        })
      },
      beforeSearch(conditions){
        if (conditions.productID && conditions.productID.indexOf(',') > 0) {
          let a = conditions.productID.split(',');
          conditions.productID = a[0];
          conditions.specID = a[1];
        }
        return conditions;
      },
      exportData(){
        fileDownload(this.logisticsApiUrl.storage.EXPORT_STOCK_TRANSFER_WAREHOUSE_LIST, this.$refs.list.getConditions());
      }
    }
  }
</script>
