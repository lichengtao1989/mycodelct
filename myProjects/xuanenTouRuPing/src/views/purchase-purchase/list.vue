<template>
  <div>
    <nz-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true" base-search-placeholder="供应商名称、进货单号" ref="list">
      <div slot="search">
        <nz-search-item label="进货单号" search-key="purchaseReceiptCode" v-model="search.purchaseReceiptCode">
          <nz-input v-model="search.purchaseReceiptCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="供应商" search-key="supplierName" v-model="search.supplierName">
          <nz-input v-model="search.supplierName"></nz-input>
        </nz-search-item>
        <nz-search-item label="商品名称" search-key="productNameList" v-model="search.productNameList">
          <nz-input v-model="search.productNameList"></nz-input>
        </nz-search-item>
        <nz-search-item label="进货时间" search-key="createTime" v-model="search.createTime">
          <nz-datepicker v-model="search.createTime" type="datetimerange"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="purchaseReceiptCode" min-width="220" label="进货单号" sortable="custom"></nz-table-column>
        <nz-table-column prop="supplierName" min-width="100" label="供应商" sortable="custom"></nz-table-column>
        <nz-table-column prop="amount" min-width="200" label="订单金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="createByName" min-width="200" label="操作人" sortable="custom"></nz-table-column>
        <nz-table-column prop="createTime" min-width="180" label="进货时间" sortable="custom"></nz-table-column>
        <nz-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="detailOrder(scope.row)">详情</nz-button>
            <nz-button v-if="scope.row.status == 1" type="text" @click="canceOrder(scope.row)">撤消订单</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <nz-dialog title="进货详情信息" ref="orderDialog" :height="800">
      <order-detail ref="orderDetail"></order-detail>
      <div slot="footer">
        <nz-button type="primary" @click="orderConfirm">
          确定
        </nz-button>
      </div>
    </nz-dialog>
  </div>
</template>
<script>
import orderDetail from './order-detail';
export default {
  components: {
    orderDetail
  },
  data() {
    let apiUrl = this.$apiUrl.PURCHASEPURCHASE;
    return {
      apiUrl: apiUrl,
      requestUrl: apiUrl.GET_LIST,
      search: {
        purchaseReceiptCode: '',
        supplierName: '',
        productNameList: '',
        createTime: ''
      },
      dialogVisible: false
    };
  },
  watch: {},
  methods: {
    async instockConfirm(callback) {
      await this.$sleep(500);
      let { err, res } = await this.$refs.orderDetail.submit();
      if (res.resultCode == 200) {
        this.$refs.orderDialog.hide();
        this.$refs.list.refresh();
        this.$message.success('当前库存数量已调整');
      } else {
        this.$message.showError(err);
      }
      callback();
    },
    async canceOrder(row) {
      const result = await this.$message.confirm('撤消后将无法查询该订单信息，你还要继续吗？', '是否确认撤消该订单');
      if (result) {
        let data = {
          orderId: row.purchaseReceiptID
        };
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SET_STATUS, data);
        if (res.resultCode == 200) {
          this.$refs.list.refresh();
          this.$message.success(res.msg);
        } else {
          this.$message.showError(err);
        }
      }
    },
    async detailOrder(row) {
      this.$refs.orderDialog.show();
      await this.$nextTick();
      this.$refs.orderDetail.addForm(row.purchaseReceiptID);
    },
    async orderConfirm() {
      this.$refs.orderDialog.hide();
    }
  },
  created() {}
};
</script>
