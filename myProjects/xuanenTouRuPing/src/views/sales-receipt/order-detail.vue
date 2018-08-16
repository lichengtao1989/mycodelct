<template>
  <div>
    <div class="receipt-info">单据信息</div>
    <nz-table :data="form.receipt" class="nz-table" :stripe="true" border>
      <nz-table-column prop="salesReceiptCode" label="销售单号" min-width="130">
      </nz-table-column>
      <nz-table-column prop="customerName" label="购买人" width="100">
      </nz-table-column>
      <nz-table-column prop="identityNumber" label="身份证号" width="150">
      </nz-table-column>
      <nz-table-column prop="amount" label="订单金额" width="120">
        <template slot-scope="scope">{{`¥${scope.row.amount}`}}</template>
      </nz-table-column>
      <nz-table-column prop="createByName" label="操作人" width="120">
      </nz-table-column>
      <nz-table-column prop="createTime" label="进货时间" width="170"></nz-table-column>
      <nz-table-column prop="status" label="订单状态" width="100">
        <template slot-scope="scope">
          <cjm-button type="text" v-if="scope.row.status== 0" style="color:#e74c3c">已撤单
          </cjm-button>
          <cjm-button type="text" v-else style="color:#3cd66d">正常
          </cjm-button>
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
      <nz-table-column prop="toxicity" min-width="180" label="含高毒农药" enum-name="毒性">
        <template slot-scope="scope">
          <span :class="{'grade-toxicity':scope.row.toxicity == '高毒' || scope.row.toxicity == '剧毒'}">{{scope.row.toxicity}}</span>
        </template>
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
  data: function() {
    let apiUrl = this.$apiUrl.SALESRECEIPT;
    return {
      apiUrl: apiUrl,
      form: {},
      note: null,
      rules: {
        value: [this.$formRules.required, this.$formRules.int]
      }
    };
  },
  computed: {},
  methods: {
    async submit() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        return this.$model('dataManagement').commonfn(this.apiUrl.SET_STOCK_COUNT, this.form);
      }
    },
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
.grade-toxicity {
  color: #ff4949;
}
</style>
