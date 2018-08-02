<template>
  <div>
    <nz-list :requestUrl="$apiUrl.FARMSTORESALE.RETURNLIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="输入内容搜索">
      <div slot="search">
        <nz-search-item label="退货单号" search-key="BillCode" v-model="search.BillCode">
          <nz-input v-model="search.BillCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="商品名称" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="退货时间" search-key="ReturnTime" v-model="search.ReturnTime">
          <nz-input v-model="search.ReturnTime"></nz-input>
        </nz-search-item>
        <nz-search-item label="购买人" search-key="FarmerName" v-model="search.FarmerName">
          <nz-datepicker type="daterange" v-model="search.FarmerName"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="BillCode" min-width="120" label="退货单号" sortable="custom"></nz-table-column>
        <nz-table-column prop="NeedTotalMoney" min-width="120" label="退货金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="退款方式" sortable="custom">
          <template slot-scope="scope">
            账户预留
          </template>
        </nz-table-column>
        <nz-table-column prop="FarmerName" min-width="120" label="购买人" sortable="custom"></nz-table-column>
        <nz-table-column prop="FarmerIDCode" min-width="120" label="身份证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="SaleManName" min-width="120" label="操作员" sortable="custom"></nz-table-column>
        <nz-table-column prop="ReturnTime" min-width="120" label="退货时间" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDetail(scope.row)">详情</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: { BillCode: '', FarmerName: '', ReturnTime: '' }
    };
  },
  methods: {
    viewDetail(val) {
      window.open(`#/main/cancBill?id=${val.Id}&type=2`);
    },
    deliver() {
      window.open('#/main/cancBill?id=123');
    }
  }
};
</script>
