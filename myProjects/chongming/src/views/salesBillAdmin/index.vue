<template>
  <div>
    <nz-list :requestUrl="$apiUrl.FARMSTORESALE.LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="进货单号">
      <div slot="search">
        <nz-search-item label="销售单号" search-key="BillCode" v-model="search.BillCode">
          <nz-input v-model="search.BillCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="商品名称" search-key="key2" v-model="search.key2">
          <nz-remote-select :remoteUrl="$apiUrl.COMMON.DROP_DOWN.SUPPLIER" v-model="search.key2"></nz-remote-select>
        </nz-search-item>
        <nz-search-item label="销售时间" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="购买人" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="身份证号" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <!-- <nz-table-column prop="id1" min-width="120" label="序号" sortable="custom"></nz-table-column> -->
        <nz-table-column prop="BillCode" min-width="120" label="销售单号" sortable="custom"></nz-table-column>
        <nz-table-column prop="NeedTotalMoney" min-width="120" label="订单金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="FarmerName" min-width="120" label="购买人" sortable="custom"></nz-table-column>
        <nz-table-column prop="FarmerIDCode" min-width="120" label="身份证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="SaleManName" min-width="120" label="业务员" sortable="custom"></nz-table-column>
        <nz-table-column prop="CreateTime" min-width="120" label="销售时间" sortable="custom"></nz-table-column>
        <nz-table-column prop="Status" min-width="120" label="状态" sortable="custom">
          <template slot-scope="scope">完成</template>
        </nz-table-column>
        <nz-table-column min-width="220" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDetail(scope.row)">详情</nz-button>
            <nz-button type="text" v-if="false" @click="print(scope.row)">打印</nz-button>
            <nz-button type="text" @click="cancelGoods(scope.row)">退货</nz-button>
            <nz-button type="text" @click="cancel(scope.row)">撤销订单</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <detail-dialog ref="dialog" @save-success="refresh"></detail-dialog>
  </div>
</template>
<script>
import detailDialog from './dialog.vue';
export default {
  components: { detailDialog },
  data() {
    return {
      search: { BillCode: '', key2: '', key3: '' }
    };
  },
  methods: {
    print(row) {},
    async viewDetail(row) {
      console.log(row);
      this.$refs.dialog.show(row);
    },
    async cancel(row) {
      const result = await this.$message.confirm('真的要撤销该订单吗?');
      if (result) {
        let { err, res } = await this.$ajax.post(this.$apiUrl.FARMSTORESALE.CANCEL, { FarmerStoreSaleId: row.Id });
        console.log(err, res);
        if (err) {
        } else {
          this.$message.success('撤销订单成功');
          this.refresh();
        }
      }
    },
    async cancelGoods(row) {
      window.open(`${window.location.origin}/#/main/cancBill?id=${row.Id}`);
    },
    refresh() {
      this.$refs.list.refresh();
    }
  }
};
</script>
