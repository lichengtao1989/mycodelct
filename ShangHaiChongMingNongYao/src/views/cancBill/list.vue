<template>
  <div>
    <nz-list :requestUrl="$apiUrl.DEMO.LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="输入内容搜索">
      <div slot="search">
        <nz-search-item label="退货单号" search-key="key1" v-model="search.key1">
          <nz-input v-model="search.key1"></nz-input>
        </nz-search-item>
        <nz-search-item label="商品名称" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="退货时间" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="购买人" search-key="key3" v-model="search.key3">
          <nz-datepicker type="daterange" v-model="search.key3"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="id" min-width="120" label="序号" sortable="custom"></nz-table-column>
        <nz-table-column prop="id" min-width="120" label="退货单号" sortable="custom"></nz-table-column>
        <nz-table-column prop="yn" min-width="120" label="退货金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="退款方式" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="购买人" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="身份证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="操作员" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="退货时间" sortable="custom"></nz-table-column>
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
      search: { key1: '', key2: '', key3: '' }
    };
  },
  methods: {
    viewDetail() {
      window.open('#/main/cancBill?id=123');
    },
    deliver() {
      window.open('#/main/cancBill?id=123');
    }
  }
};
</script>
