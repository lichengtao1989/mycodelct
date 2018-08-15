<template>
  <div>
    <nz-list :requestUrl="$apiUrl.PURCHASE.GET_LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="输入内容搜索">
      <div slot="search">
        <nz-search-item label="订单号" search-key="PurchaseApplicationCode" v-model="search.PurchaseApplicationCode">
          <nz-input v-model="search.PurchaseApplicationCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="农资店" search-key="StoreName" v-model="search.StoreName">
          <nz-input v-model="search.StoreName"></nz-input>
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
        <nz-table-column prop="StoreName" min-width="120" label="农资店" sortable="custom"></nz-table-column>
        <nz-table-column prop="PriorityDescription" enumName="发货紧急程度" min-width="120" label="紧急程度" sortable="custom"></nz-table-column>
        <nz-table-column prop="Status" enumName="发货订单状态" min-width="120" label="订单状态" sortable="custom">
          <template slot-scope="scope">
            <span>
              <span v-if="scope.row.Status==1"><i class="is-close"></i>待发货</span>
              <span v-if="scope.row.Status==2"><i class="is-close"></i>待收货</span>
              <span v-if="scope.row.Status==3"><i class="is-running"></i>已收货</span>
            </span>
          </template>
        </nz-table-column>
        <nz-table-column prop="MoneyCount" min-width="120" label="总金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="CreateTime" min-width="170" label="下单时间" sortable="custom"></nz-table-column>
        <nz-table-column prop="ReceivingTime" min-width="170" label="收货时间" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDetail(scope.row)">详情</nz-button>
            <nz-button type="text" v-if="scope.row.Status==1" @click="deliver(scope.row)">发货</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <view-detail ref="dialog"></view-detail>
  </div>
</template>
<script>
  import viewDetail from './detail.vue';
  export default {
    components: {viewDetail},
    data(){
      return {
        search: {PurchaseApplicationCode: '', StoreName: '', Status: '', PriorityDescription: '', CreateTime: ''}
      }
    },
    methods: {
      viewDetail(row){
        this.$refs.dialog.show(row);
      },
      deliver(row){
        window.open('#/main/deliver?id=' + row.ID)
      }
    }
  }
</script>
