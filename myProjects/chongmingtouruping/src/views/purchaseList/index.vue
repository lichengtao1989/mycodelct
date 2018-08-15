<template>
  <div>
    <nz-list :requestUrl="$apiUrl.PURCHASE.GET_LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="进货单号">
      <div slot="search">
        <nz-search-item label="订单编号" search-key="PurchaseApplicationCode" v-model="search.PurchaseApplicationCode">
          <nz-input v-model="search.PurchaseApplicationCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="供应商" search-key="Suppliers" v-model="search.Suppliers">
          <nz-remote-select :remoteUrl="$apiUrl.COMMON.DROP_DOWN.SUPPLIER" v-model="search.Suppliers"></nz-remote-select>
        </nz-search-item>
        <nz-search-item label="订单状态" search-key="Status" v-model="search.Status">
          <nz-enum-select :options="$enum('发货订单状态').values" v-model="search.Status"></nz-enum-select>
        </nz-search-item>
        <nz-search-item label="紧急程度" search-key="PriorityDescription" v-model="search.PriorityDescription">
          <nz-enum-select :options="$enum('进货申请紧急程度').values" v-model="search.PriorityDescription"></nz-enum-select>
        </nz-search-item>
        <nz-search-item label="下单时间" search-key="CreateTime" v-model="search.CreateTime">
          <nz-datepicker type="daterange" v-model="search.CreateTime"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="PurchaseApplicationCode" min-width="120" label="订单号" sortable="custom"></nz-table-column>
        <nz-table-column prop="DistributionName" min-width="180" label="供应商名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="PriorityDescription" min-width="120" enumName="进货申请紧急程度" label="紧急程度" sortable="custom"></nz-table-column>
        <nz-table-column prop="Status" min-width="120" label="订单状态" sortable="custom">
          <template slot-scope="scope">
            <span>
              <span v-if="scope.row.Status==1"><i class="is-close"></i>待发货</span>
              <span v-if="scope.row.Status==2"><i class="is-close"></i>待收货</span>
              <span v-if="scope.row.Status==3"><i class="is-running"></i>已收货</span>
            </span>
          </template>
        </nz-table-column>
        <nz-table-column prop="StoreName" min-width="120" label="农资店" sortable="custom"></nz-table-column>
        <nz-table-column prop="MoneyCount" min-width="120" label="总金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="CreateTime" min-width="180" label="下单时间" sortable="custom"></nz-table-column>
        <nz-table-column prop="ReceivingTime" min-width="120" label="收货时间" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDetail(scope.row)">详情</nz-button>
            <nz-button type="text" @click="cancel(scope.row)" v-if="scope.row.Status==1">撤销订单</nz-button>
            <nz-button type="text" @click="confirmOrder(scope.row)" v-if="scope.row.Status==2">确认收货</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <detail-dialog ref="dialog" @save-success="refresh"></detail-dialog>
  </div>
</template>
<script>
  import detailDialog from '../deliver/detail.vue';
  export default {
    components: {detailDialog},
    data(){
      return {
        search: {PurchaseApplicationCode: '', Suppliers: '', Status: '', PriorityDescription: '', CreateTime: ''}
      }
    },
    methods: {
      viewDetail(row){
        this.$refs.dialog.show(row);
      },
      async cancel(row){
        const result = await this.$message.confirm('真的要撤销该订单吗?');
        if (result) {
          const isSuccess = await this.$model('purchase').cancel(row.ID);
          if (isSuccess) {
            this.refresh();
          }
        }
      },
      async confirmOrder(row){
        const result = await this.$message.confirm('真的要确认收货吗?');
        if (result) {
          const isSuccess = await this.$model('purchase').confirmReceipt(row.ID);
          if (isSuccess) {
            this.refresh();
          }
        }
      },
      refresh(){
        this.$refs.list.refresh();
      }
    }
  }
</script>
