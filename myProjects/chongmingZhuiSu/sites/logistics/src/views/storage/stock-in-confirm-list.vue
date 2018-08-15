<template>
  <div>
    <cjm-list :need-advanced-search="true" :request-url="logisticsApiUrl.storage.GET_STOCK_IN_CONFIRM_LIST" ref="list" base-search-placeholder="输入单据编号、物流码搜索" @selection-change="handleSelectionChange">
      <div slot="operate">
        <cjm-button @click="batchStockConfirm" :disabled="multipleSelection.length==0" type="primary">
          <i class="cjm-icon-add"></i>确认收货
        </cjm-button>
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
          <cjm-input v-model="search.productID"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="产品批次" search-key="productBatchID" v-model="search.productBatchID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.PRODUCT_BATCH" v-model="search.productBatchID"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="产品编号" search-key="productCode" v-model="search.productCode">
          <cjm-input v-model="search.productCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="发货时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker type="daterange" v-model="search.createTime"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column type="selection" width="55"></cjm-table-column>
        <cjm-table-column label="单据编号" prop="billCode" sortable="custom" min-width="140"></cjm-table-column>
        <cjm-table-column label="物流码" prop="code" sortable="custom" min-width="170"></cjm-table-column>
        <cjm-table-column label="发货机构" prop="stockOutOrgName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="发货时间" prop="createTime" sortable="custom" min-width="150"></cjm-table-column>
        <cjm-table-column label="产品批次" prop="productBatchCode" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="产品编号" prop="productCode" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column label="产品名称" prop="productName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="产品规格" prop="do_Spec" min-width="110"></cjm-table-column>
        <cjm-table-column label="计量单位" prop="unitName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="单标数量" prop="layer3Number" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="操作人" prop="createByName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="操作" prop="operate" min-width="140">
          <template slot-scope="scope">
            <cjm-button @click="stockConfirm([scope.row.code])" :disabled="isConfirmButtonDisabled" type="text" size="small">确认收货</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data() {
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        search: {
          billCode: '',
          code: '',
          productID: '',
          productBatchID: '',
          productCode: '',
          createTime: ''
        },
        disabled: true,
        selectionData: [],
        multipleSelection: [],
        dialogVisible: false,
        isConfirmButtonDisabled: false
      }
    },
    methods: {
      stockConfirm(codes) {
        this.$confirm('确认要收货吗？', '提示', {
          type: 'info'
        }).then(() => {
          this.isConfirmButtonDisabled = true;
          this.confirm(codes)
        }).catch(() => {
        })
      },
      confirm(codes){
        this.$ajax.get(this.logisticsApiUrl.storage.STOCK_IN_CONFIRM, {codes: codes}).then((r) => {
          this.isConfirmButtonDisabled = false;
          if (r.resultCode == '200') {
            this.$refs.list.refresh();
            this.$message({
              type: 'success',
              message: '已确认收货'
            })
          } else {
            this.$message({
              type: 'error',
              message: r.msg
            });
            this.$refs.list.refresh()
          }
        })
      },
      handleSelectionChange(val){
        this.multipleSelection = val.map(function (x) {
          return x.code
        })
      },
      batchStockConfirm(){
        this.stockConfirm(this.multipleSelection)
      },
      exportData() {
        fileDownload(this.logisticsApiUrl.storage.EXPORT_STOCK_IN_CONFIRM_LIST, this.$refs.list.getConditions())
      }
    }
  }
</script>
