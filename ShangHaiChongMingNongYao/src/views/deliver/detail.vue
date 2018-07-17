<template>
  <nz-dialog customClass="width-800" :isNeedOkButton="false" ref="dialog" title="订单详细信息">
    <div class="deliver-box">
      <nz-scrollbar style="height:500px">
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
              <nz-table-column prop="RegisteCode" label="农药登记证号"></nz-table-column>
              <nz-table-column prop="Specification" label="规格/包装">
                <template slot-scope="scope"><span>{{ spec(scope.row) }}</span></template>
              </nz-table-column>
              <nz-table-column prop="Count" label="数量"></nz-table-column>
              <nz-table-column prop="Money" label="单价"></nz-table-column>
              <nz-table-column prop="MoneyCount" label="小计"></nz-table-column>
            </nz-table>
          </nz-form-item>
          <nz-form-item label="订单备注" label-width="75px">
            <nz-input type="textarea" readonly v-model="note" rows="3" resize="none" placeholder="请输入备注"></nz-input>
          </nz-form-item>
        </nz-form>
      </nz-scrollbar>
    </div>
  </nz-dialog>
</template>
<script>
  export default {
    data(){
      return {
        orderData: {PurchaseApplicationCode: '', StoreName: '', PriorityDescription: '', MoneyCount: '', ChargePerson: '', CreateTime: '', Status: ''},
        sonList: [],
        orderDataLoading: false,
        sonListLoading: false,
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
      async loadData(id){
        this.orderDataLoading = true;
        this.sonListLoading = true;
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
        //this.sonList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
        //
        this.orderDataLoading = false;
        this.sonListLoading = false;
      },
      show(row){
        this.loadData(row.ID);
        this.$refs.dialog.show();
      }
    }
  }
</script>
