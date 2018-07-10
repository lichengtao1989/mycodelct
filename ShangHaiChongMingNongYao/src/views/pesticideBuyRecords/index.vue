<template>
  <div>
    <nz-list :requestUrl="$apiUrl.DEMO.LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="请输入订单号">
      <div slot="search">
        <nz-search-item label="单据号" search-key="key1" v-model="search.key1">
          <nz-input v-model="search.key1"></nz-input>
        </nz-search-item>
        <nz-search-item label="商品名称" search-key="key2" v-model="search.key2">
          <nz-input v-model="search.key2"></nz-input>
        </nz-search-item>
        <nz-search-item label="购买时间" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
        <nz-search-item label="购买人" search-key="key4" v-model="search.key4">
          <nz-input v-model="search.key4"></nz-input>
        </nz-search-item>
        <nz-search-item label="身份证号" search-key="key5" v-model="search.key5">
          <nz-input v-model="search.key5"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="id" min-width="120" label="单据号" sortable="custom"></nz-table-column>
        <nz-table-column prop="yn" min-width="120" label="订单金额" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="购买人" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="身份证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="购买地点" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="购买时间" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="状态" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDialig(scope.row)">详情</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
  </div>
</template>
<script>
  import addEditDialog from './dialog.vue';
  export default {
    components: {addEditDialog},
    data(){
      return {
        search: {key1: '', key2: '', key3: '', key4: '', key5: ''}
      }
    },
    methods: {
      showDialog(){
        this.$refs.showDialog.show();
      },
      viewDialig(data){
        this.$refs.dialog.show(data);
      }
    }
  }
</script>
