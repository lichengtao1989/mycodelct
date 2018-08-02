<template>
  <div class="deliver-box" v-hide-menu="true" v-tab-title="'发货操作'">
    <nz-form>
      <h3 class="title">单据信息</h3>
      <nz-table v-loading="orderDataLoading" element-loading-text="拼命加载中" :data="[orderData]" class="nz-table" :stripe="true" tooltip-effect="light" border>
        <nz-table-column prop="PurchaseApplicationCode" label="订单号"></nz-table-column>
        <nz-table-column prop="StoreName" label="农资店"></nz-table-column>
        <nz-table-column prop="PriorityDescription" enumName="发货紧急程度" label="紧急程度"></nz-table-column>
        <nz-table-column prop="MoneyCount" label="订单金额"></nz-table-column>
        <nz-table-column prop="ChargePerson" label="申请人"></nz-table-column>
        <nz-table-column prop="CreateTime" label="下单时间"></nz-table-column>
        <nz-table-column prop="Status" enumName="发货订单状态" label="订单状态"></nz-table-column>
      </nz-table>
      <h3 class="title">商品详情</h3>
      <nz-form-item>
        <nz-table v-loading="sonListLoading" element-loading-text="拼命加载中" :data="sonList" class="nz-table" :stripe="true" tooltip-effect="light" border>
          <nz-table-column label="序号">
            <template slot-scope="scope"><span>{{scope.$index + 1}}</span></template>
          </nz-table-column>
          <nz-table-column prop="PesticideName" label="商品名称"></nz-table-column>
          <nz-table-column prop="PesticideCode" label="农药登记证号"></nz-table-column>
          <nz-table-column label="规格/包装">
            <template slot-scope="scope"><span>{{ spec(scope.row) }}</span></template>
          </nz-table-column>
          <nz-table-column prop="StockCount" label="库存数量"></nz-table-column>
          <nz-table-column prop="Count" label="订单数量"></nz-table-column>
          <nz-table-column label="发货数量">
            <template slot-scope="scope">
              <nz-input readonly v-model="scope.row.Count"></nz-input>
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
        <nz-input type="textarea" v-model="note" rows="3" resize="none" placeholder="请输入备注"></nz-input>
      </nz-form-item>
    </nz-form>
    <code-dialog ref="dialog" @save-trigger="handlerSave"></code-dialog>
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
        orderData: {PurchaseApplicationCode: '', StoreName: '', PriorityDescription: '', MoneyCount: '', ChargePerson: '', CreateTime: '', Status: ''},
        sonList: [],
        orderDataLoading: false,
        sonListLoading: false,
        isSubmiting: false,
        note: ''
      };
    },
    methods: {
      spec(row){
        const {SpecQuantity, SpecUnit, SpecType} = row;
        if (SpecQuantity && SpecUnit && SpecType) {
          return `${SpecQuantity}${SpecUnit}/${SpecType}`;
        }
        return '';
      },
      closeWindow(){
        window.close();
      },
      //扫描农药码弹框
      codeDialogShow(row){
        this.$refs.dialog.show(row);
      },
      handlerSave(data){
        const {ID, BarCode} = data;
        const sonList = Object.jsonClone(this.sonList);
        sonList.find(item => item.ID == ID).BarCode = BarCode;
        this.sonList = Object.jsonClone(sonList);
      },
      async submit(){
        this.isSubmiting = true;
        const {id} = this.$route.query;
        const {note} = this;
        const sonList = this.sonList.map(item => {
          return {ID: item.ID, PesticideID: item.BarCode || ''};
        });
        const isSuccess = await this.$model('purchase').send(id, note, sonList);
        this.isSubmiting = false;
        if (isSuccess) {
          this.closeWindow();
        }
      },
      async loadData(){
        this.orderDataLoading = true;
        this.sonListLoading = true;
        const {id} = this.$route.query;
        const detail = await this.$model('purchase').getPurchase(id);
        //
        this.orderData.PurchaseApplicationCode = detail.PurchaseApplicationCode;
        this.orderData.StoreName = detail.StoreName;
        this.orderData.PriorityDescription = detail.PriorityDescription;
        this.orderData.MoneyCount = detail.MoneyCount;
        this.orderData.ChargePerson = detail.ChargePerson;
        this.orderData.CreateTime = detail.CreateTime;
        this.orderData.Status = detail.Status;
        //
        this.note = detail.Note || '';
        //
        this.sonList = JSON.parse(detail.SonList);
        //
        this.orderDataLoading = false;
        this.sonListLoading = false;
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
