<template>
  <div>
    <nz-list :requestUrl="$apiUrl.DEMO.LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="输入内容搜索">
      <div slot="search">
        <nz-search-item label="订单号" search-key="key1" v-model="search.key1">
          <nz-input v-model="search.key1"></nz-input>
        </nz-search-item>
        <nz-search-item label="农资店" search-key="key2" v-model="search.key2">
          <nz-remote-select :remoteUrl="$apiUrl.COMMON.DROP_DOWN.AGRICULTURALMATERIALS" v-model="search.key2"></nz-remote-select>
        </nz-search-item>
        <nz-search-item label="订单状态" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="紧急程度" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="下单时间" search-key="key3" v-model="search.key3">
          <nz-datepicker type="daterange" v-model="search.key3"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="id" min-width="120" label="订单号" sortable="custom"></nz-table-column>
        <nz-table-column prop="yn" min-width="120" label="农资店" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="紧急程度" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="订单状态" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="总金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="下单时间" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="收货时间" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDetail(scope.row)">详情</nz-button>
            <nz-button type="text" @click="deliver">发货</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        search: {key1: '', key2: '', key3: ''}
      }
    },
    methods: {
      viewDetail(){
      },
      deliver(){
        window.open('#/main/deliver?id=123')
      }
    }
  }
</script>
