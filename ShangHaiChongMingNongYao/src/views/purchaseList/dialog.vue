<template>
  <nz-dialog customClass="width-800" ref="dialog" title="订单详情信息" :okHandler="submit">
    <nz-scrollbar style="height:500px">
      <nz-form>
        <h3 class="title">单据信息</h3>
        <nz-table element-loading-text="拼命加载中" :data="orderData" class="nz-table" :stripe="true" tooltip-effect="light" border>
          <nz-table-column label="销售单号"></nz-table-column>
          <nz-table-column label="进货门店"></nz-table-column>
          <nz-table-column label="紧急程度"></nz-table-column>
          <nz-table-column label="订单金额"></nz-table-column>
          <nz-table-column label="申请人"></nz-table-column>
          <nz-table-column label="下单时间"></nz-table-column>
          <nz-table-column label="订单状态"></nz-table-column>
        </nz-table>
        <h3 class="title">商品详情</h3>
        <nz-form-item>
          <nz-table element-loading-text="拼命加载中" :data="goodsDetails" class="nz-table" :stripe="true" tooltip-effect="light" border>
            <nz-table-column label="序号"></nz-table-column>
            <nz-table-column label="商品名称"></nz-table-column>
            <nz-table-column label="农药登记证号"></nz-table-column>
            <nz-table-column label="规格/包装"></nz-table-column>
            <nz-table-column label="数量"></nz-table-column>
            <nz-table-column label="单价"></nz-table-column>
            <nz-table-column label="小计"></nz-table-column>
          </nz-table>
        </nz-form-item>
        <nz-form-item label="订单备注" label-width="75px">
          <nz-input readonly type="textarea" rows="3" resize="none" placeholder="请输入备注"></nz-input>
        </nz-form-item>
      </nz-form>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
  export default {
    data(){
      return {
        orderData: [{}, {}, {}, {}, {}],
        goodsDetails: [{}, {}, {}, {}, {}]
      }
    },
    methods: {
      async submit(callback){
        this.$refs.dialog.hide();
        callback();
      },
      init(){
      },
      show(data){
        this.init(data);
        this.$refs.dialog.show();
      }
    }
  }
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
</style>
