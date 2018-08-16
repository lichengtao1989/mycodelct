<template>
  <div>
    <div class="receipt-info">单据信息</div>
    <nz-table :data="form.receipt" class="nz-table" :stripe="true" border>
      <nz-table-column prop="purchaseReceiptCode" label="进货单号" min-width="130">
      </nz-table-column>
      <nz-table-column prop="supplierName" label="供应商" width="150">
      </nz-table-column>
      <nz-table-column prop="amount" label="订单金额" width="100">
        <template slot-scope="scope">{{`¥${scope.row.amount}`}}</template>
      </nz-table-column>
      <nz-table-column prop="createByName" label="操作人" width="100">
      </nz-table-column>
      <nz-table-column prop="createTime" label="进货时间" width="180"></nz-table-column>
      <nz-table-column prop="status" label="订单状态" width="100">
        <template slot-scope="scope">
          <nz-button type="text" v-if="scope.row.status== 0" style="color:#e74c3c">已撤单
          </nz-button>
          <nz-button type="text" v-else style="color:#3cd66d">正常
          </nz-button>
        </template>
      </nz-table-column>
    </nz-table>
    <div class="product-detail">商品详情</div>
    <nz-table :data="form.detail" class="nz-table" :stripe="true" border>
      <nz-table-column prop="productName" label="商品名称" min-width="130">
      </nz-table-column>
      <nz-table-column prop="packingSpecifications" label="规格" width="100">
      </nz-table-column>
      <nz-table-column prop="category" label="商品分类" enum-name="类别" width="120">
      </nz-table-column>
      <nz-table-column prop="restrictedStaus" label="限用农药" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.restrictedStaus == 1">限用</span>
        </template>
      </nz-table-column>
      <nz-table-column prop="productionBatch" label="产品批次" width="150">
      </nz-table-column>
      <nz-table-column prop="quantity" label="数量" width="100">
      </nz-table-column>
      <nz-table-column prop="unitPrice" label="单价" width="120">
        <template slot-scope="scope">{{`¥${scope.row.unitPrice}`}}</template>
      </nz-table-column>
      <nz-table-column prop="subtotal" label="小计" width="100">
        <template slot-scope="scope">{{`¥${scope.row.subtotal}`}}</template>
      </nz-table-column>
    </nz-table>
    <div class="product-detail" v-if="note != null">备注</div>
    <nz-input type="textarea" :rows="2" v-if="note != null" v-model="note" disabled="true"></nz-input>
  </div>
</template>

<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.PURCHASEPURCHASE;
    return {
      apiUrl: apiUrl,
      form: {},
      note: null
    };
  },
  computed: {},
  methods: {
    reset() {
      this.form = {
        receipt: [],
        detail: []
      };
    },
    async addForm(purchaseReceiptID) {
      this.reset();
      await this.$nextTick();
      let data = {
        orderId: purchaseReceiptID
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.GET, data);
      if (res.resultCode == 200) {
        this.form.receipt = res.data;
        this.form.detail = res.data[0].detail;
        this.note = res.data[0].note;
      } else {
        this.$message.showError(err);
      }
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style scoped>
.receipt-info {
  margin: 0 10px 10px 0px;
  font-size: 16px;
}
.product-detail {
  margin: 20px 10px 10px 0px;
  font-size: 16px;
}
</style>
