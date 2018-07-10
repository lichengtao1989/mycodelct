<template>
  <div v-hide-menu="true">
    <!-- <nz-scrollbar style="height:500px"> -->
    <nz-form>
      <h3 class="title">销售单据信息</h3>
      <nz-table element-loading-text="拼命加载中" :data="orderData" class="nz-table" :stripe="true" tooltip-effect="light" border>
        <nz-table-column label="销售单号"></nz-table-column>
        <nz-table-column label="订单金额"></nz-table-column>
        <nz-table-column label="购买人"></nz-table-column>
        <nz-table-column label="身份证号"></nz-table-column>
        <nz-table-column label="业务员"></nz-table-column>
        <nz-table-column label="销售时间"></nz-table-column>
        <nz-table-column label="状态"></nz-table-column>
      </nz-table>
      <h3 class="title">订单商品</h3>
      <nz-form-item>
        <nz-table element-loading-text="拼命加载中" :data="goodsDetails" class="nz-table" :stripe="true" tooltip-effect="light" border>
          <nz-table-column label="序号"></nz-table-column>
          <nz-table-column label="农药名称"></nz-table-column>
          <nz-table-column label="规格/包装"></nz-table-column>
          <nz-table-column label="注册商标"></nz-table-column>
          <nz-table-column label="数量"></nz-table-column>
          <nz-table-column label="单价"></nz-table-column>
          <nz-table-column label="小计"></nz-table-column>
          <nz-table-column label="操作">
            <template slot-scope="scope">
              <nz-button type="text" @click="viewDetail(scope.row)">添加</nz-button>
            </template>
          </nz-table-column>
        </nz-table>
      </nz-form-item>
      <h3 class="title">退货商品列表</h3>
      <nz-table element-loading-text="拼命加载中" :data="goodsDetails" class="nz-table" :stripe="true" tooltip-effect="light" border>
        <nz-table-column label="序号"></nz-table-column>
        <nz-table-column label="农药名称"></nz-table-column>
        <nz-table-column label="规格/包装"></nz-table-column>
        <nz-table-column label="注册商标"></nz-table-column>
        <nz-table-column label="数量">
          <template slot-scope="scope">
            <nz-input type="text" />
          </template>
        </nz-table-column>
        <nz-table-column label="单价">
          <template slot-scope="scope">
            <nz-input type="text" />
          </template>
        </nz-table-column>
        <nz-table-column label="小计"></nz-table-column>
        <nz-table-column label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="delFn(scope.row)">删除</nz-button>
          </template>
        </nz-table-column>
      </nz-table>
      <div class="xuanze">
        <span class="tkze">退款总额:
          <span class="spzt">20</span>元</span>
        <span class="xzdx">
          <nz-radio v-model="radio" label="1" class="ras">现金退款</nz-radio>
          <nz-radio v-model="radio" label="2" class="ras">账户预留</nz-radio>
        </span>
      </div>
      <nz-form-item label="订单备注" label-width="75px">
        <nz-input readonly type="textarea" rows="3" resize="none" placeholder="请输入备注"></nz-input>
      </nz-form-item>
      <div class="nzbtn2">
        <nz-button type="">取消</nz-button>
        <nz-button type="primary">确定</nz-button>
      </div>
    </nz-form>
    <!-- </nz-scrollbar> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1',
      // orderData: [{}, {}, {}, {}, {}],
      // goodsDetails: [{}, {}, {}, {}, {}],
      orderData: [],
      goodsDetails: []
    };
  },
  methods: {
    delFn(row) {},
    async submit(callback) {
      this.$refs.dialog.hide();
      callback();
    },
    init() {},
    show(data) {
      this.init(data);
      this.$refs.dialog.show();
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
h3.title {
  font-size: 16px;
  color: #333333;
  padding: 0;
  margin: 0;
  margin-bottom: 13px;
  margin-top: 35px;
  &:first-child {
    margin-top: 0;
  }
}
.xuanze {
  font-size: 13px;
  padding-left: 10px;
  padding-top: 50px;
  padding-bottom: 50px;
  .xzdx {
    margin-left: 150px;
  }
  .ras {
    margin-right: 70px;
  }
}
.nzbtn2 {
  text-align: right;
  padding-right: 25px;
  padding-bottom: 50px;
}
</style>
