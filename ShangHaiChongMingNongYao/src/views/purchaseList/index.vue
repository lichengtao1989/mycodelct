<template>
  <div>
    <nz-list :requestUrl="$apiUrl.PURCHASE.GET_LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="进货单号">
      <div slot="search">
        <nz-search-item label="订单编号" search-key="key1" v-model="search.key1">
          <nz-input v-model="search.key1"></nz-input>
        </nz-search-item>
        <nz-search-item label="供应商" search-key="key2" v-model="search.key2">
          <nz-remote-select :remoteUrl="$apiUrl.COMMON.DROP_DOWN.SUPPLIER" v-model="search.key2"></nz-remote-select>
        </nz-search-item>
        <nz-search-item label="订单状态" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="紧急程度" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="下单时间" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="id" min-width="120" label="订单号" sortable="custom"></nz-table-column>
        <nz-table-column prop="yn" min-width="120" label="供应商名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="yn" min-width="120" enumName="进货申请紧急程度" label="紧急程度" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="订单状态" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="农资店" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="总金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="下单时间" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="收货时间" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDetail(scope.row)">详情</nz-button>
            <nz-button type="text" @click="cancel(scope.row)" v-if="scope.$index>5">撤销订单</nz-button>
            <nz-button type="text" @click="firmOrder(scope.row)" v-if="scope.$index<=5">确认收货</nz-button>
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
    components: {detailDialog},
    data(){
      return {
        search: {key1: '', key2: '', key3: ''}
      }
    },
    methods: {
      viewDetail(row){
        this.$refs.dialog.show(row);
      },
      async cancel(row){
        const result = await this.$message.confirm('真的要撤销该订单吗?');
        if (result) {
          //
          this.refresh();
        }
      },
      async firmOrder(row){
        const result = await this.$message.confirm('真的要确认收货吗?');
        if (result) {
          //
          this.refresh();
        }
      },
      refresh(){
        this.$refs.list.refresh();
      }
    }
  }
</script>
