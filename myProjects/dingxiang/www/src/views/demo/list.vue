<template>
  <div>
    <nz-list :requestUrl="$apiUrl.DEMO.LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="请输入关键字">
      <div slot="operate">
        <nz-button type="primary" size="small" @click="addDialog">
          <i class="nz-icon-add"></i>新建
        </nz-button>
        <nz-button type="primary" size="small" @click="showDialog">
          <i class="nz-icon-add"></i>固定宽度2列
        </nz-button>
      </div>
      <div slot="search">
        <nz-search-item label="字段1" search-key="key1" v-model="search.key1">
          <nz-input v-model="search.key1"></nz-input>
        </nz-search-item>
        <nz-search-item label="字段2" search-key="key2" v-model="search.key2">
          <nz-input v-model="search.key2"></nz-input>
        </nz-search-item>
        <nz-search-item label="字段3" search-key="key3" v-model="search.key3">
          <nz-input v-model="search.key3"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="id" min-width="120" label="字段1" sortable="custom"></nz-table-column>
        <nz-table-column prop="yn" min-width="120" label="字段2" enumName="枚举示例" sortable="custom"></nz-table-column>
        <nz-table-column prop="v1" min-width="120" label="字段3" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="editDialig(scope.row)">编辑</nz-button>
            <nz-button type="text" @click="delConfirm">删除</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
    <show-dialog ref="showDialog"></show-dialog>
  </div>
</template>
<script>
  import addEditDialog from './dialog.vue';
  import showDialog from './dialog2.vue';
  export default {
    components: {addEditDialog, showDialog},
    data(){
      return {
        search: {key1: '', key2: '', key3: ''}
      }
    },
    methods: {
      showDialog(){
        this.$refs.showDialog.show();
      },
      addDialog(){
        this.$refs.dialog.show();
      },
      editDialig(data){
        this.$refs.dialog.show(data);
      },
      refresh(){
        this.$refs.list.refresh();
      },
      async delConfirm(){
        const result = await this.$message.confirm('真的要删除吗?');
        if (result) {
          this.refresh();
        }
      }
    }
  }
</script>
