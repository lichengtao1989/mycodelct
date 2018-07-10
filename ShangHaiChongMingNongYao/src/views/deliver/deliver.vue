<template>
  <div class="deliver-box" v-hide-menu="true" v-tab-title="'发货操作'">
    <nz-form>
      <h3 class="title">单据信息</h3>
      <nz-table v-loading="orderDataLoading" element-loading-text="拼命加载中" :data="orderData" class="nz-table" :stripe="true" tooltip-effect="light" border>
        <nz-table-column label="订单号"></nz-table-column>
        <nz-table-column label="农资店"></nz-table-column>
        <nz-table-column label="紧急程度"></nz-table-column>
        <nz-table-column label="订单金额"></nz-table-column>
        <nz-table-column label="申请人"></nz-table-column>
        <nz-table-column label="下单时间"></nz-table-column>
        <nz-table-column label="订单状态"></nz-table-column>
      </nz-table>
      <h3 class="title">商品详情</h3>
      <nz-form-item>
        <nz-table v-loading="goodsDetailsLoading" element-loading-text="拼命加载中" :data="goodsDetails" class="nz-table" :stripe="true" tooltip-effect="light" border>
          <nz-table-column label="序号"></nz-table-column>
          <nz-table-column label="商品名称"></nz-table-column>
          <nz-table-column label="农药登记证号"></nz-table-column>
          <nz-table-column label="规格/包装"></nz-table-column>
          <nz-table-column label="库存数量"></nz-table-column>
          <nz-table-column label="订单数量"></nz-table-column>
          <nz-table-column label="发货数量">
            <template slot-scope="scope">
              <nz-input></nz-input>
            </template>
          </nz-table-column>
          <nz-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <nz-button @click="codeDialogShow(scope.row)" type="text">扫描农药码</nz-button>
            </template>
          </nz-table-column>
        </nz-table>
      </nz-form-item>
      <nz-form-item label="订单备注" label-width="75px">
        <nz-input type="textarea" rows="3" resize="none" placeholder="请输入备注"></nz-input>
      </nz-form-item>
    </nz-form>
    <code-dialog ref="dialog"></code-dialog>
    <div style="margin-top: 60px;text-align: center">
      <nz-button @click="submit" :loading="isSubmiting" type="primary"><i class="nz-icon-confirm"></i>保存</nz-button>
      <nz-button @click="closeWindow"><i class="nz-icon-close"></i>取消</nz-button>
    </div>
  </div>
</template>
<script>
  import codeDialog from './dialog.vue';
  export default {
    components: {codeDialog},
    data(){
      return {
        orderData: [],
        goodsDetails: [],
        orderDataLoading: false,
        goodsDetailsLoading: false,
        isSubmiting: false
      };
    },
    methods: {
      closeWindow(){
        window.close();
      },
      //扫描农药码弹框
      codeDialogShow(row){
        this.$refs.dialog.show(row);
      },
      async submit(){
        this.isSubmiting = true;
        await this.$sleep(500);
        this.isSubmiting = false;
        this.closeWindow();
      },
      async loadOrderData(){
        this.orderDataLoading = true;
        await this.$sleep(500);
        this.orderData = [{}, {}, {}];
        this.orderDataLoading = false;
      },
      async loadGoodsDetails(){
        this.goodsDetailsLoading = true;
        await this.$sleep(500);
        this.goodsDetails = [{}, {}, {}];
        this.goodsDetailsLoading = false;
      },
      async loadData(){
        await Promise.all([this.loadOrderData(), this.loadGoodsDetails()]);
      }
    },
    created(){
      this.loadData();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .deliver-box {
    padding: 31px 33px;
  }

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
