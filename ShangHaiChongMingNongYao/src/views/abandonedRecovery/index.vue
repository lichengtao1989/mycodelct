<template>
  <div>
    <nz-list :requestUrl="$apiUrl.PURCHASE.GET_LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="进货单号">
      <div slot="search">
        <nz-search-item label="销售单号" search-key="key1" v-model="search.key1">
          <nz-input v-model="search.key1"></nz-input>
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
        <nz-table-column prop="id1" min-width="120" label="序号" sortable="custom"></nz-table-column>
        <nz-table-column prop="id" min-width="120" label="销售单号" sortable="custom"></nz-table-column>
        <nz-table-column prop="yn" min-width="120" label="订单金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="yn" min-width="120" label="购买人" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="身份证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="业务员" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="销售时间" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="状态" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDetail(scope.row)">查看详情</nz-button>
            <!-- <nz-button type="text" @click="print(scope.row)">打印</nz-button>
            <nz-button type="text" @click="cancelGoods(scope.row)">退货</nz-button>
            <nz-button type="text" @click="cancel(scope.row)">撤销订单</nz-button> -->
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
      search: { key1: '', key2: '', key3: '' }
    };
  },
  methods: {
    print(row) {},
    viewDetail(row) {
      this.$refs.dialog.show(row);
    },
    async cancel(row) {
      const result = await this.$message.confirm('真的要撤销该订单吗?');
      if (result) {
        //
        this.refresh();
      }
    },
    async cancelGoods(row) {
      const result = await this.$message.confirm('真的要确认收货吗?');
      if (result) {
        //
        this.refresh();
      }
    },
    refresh() {
      this.$refs.list.refresh();
    }
  }
};
</script>
