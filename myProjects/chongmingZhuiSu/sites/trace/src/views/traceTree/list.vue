<template>
  <div>
    <cjm-list :request-url="requestUrl"
              :need-base-search="false"
              :need-advanced-search="true"
              ref="list"
              v-show="currentPage==='list'"
              @selection-change="handleSelectionChange">
      <div slot="operate">
        <cjm-button type="primary" @click="add"><i class="cjm-icon-add"></i>新建溯源树</cjm-button>
        <cjm-button @click="batchDel" :disabled="multipleSelection.length===0"><i class="cjm-icon-delete"></i>删除</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="模板" search-key="templetID" v-model="search.templetID">
          <cjm-remote-select v-model="search.templetID"
                             :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.TRACE_TREE_TEMPLET"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="关联产品批次" search-key="productBatch" v-model="search.productBatch">
          <cjm-input v-model="search.productBatch"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="更新时间" search-key="updateTime" v-model="search.updateTime">
          <cjm-date-picker v-model="search.updateTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column type="selection" width="45" fixed="left"></cjm-table-column>
        <cjm-table-column prop="templetName" label="模板" width="160" sortable="custom">
          <template slot-scope="scope">
            {{scope.row.templetName || '无'}}
          </template>
        </cjm-table-column>
        <cjm-table-column prop="productBatchList" label="关联产品批次" min-width="150" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <cjm-tooltip>
              <div v-html="scope.row.productBatchList.slice(0,2).join('<br/>') + (scope.row.productBatchList.length > 2 ? '<br/>...' : '')"></div>
              <div slot="content" v-html="scope.row.productBatchList.join('<br/>')"></div>
            </cjm-tooltip>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="createUser" label="创建人" width="110" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="updateTime" label="更新时间" width="160" sortable="custom"></cjm-table-column>
        <cjm-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.id)">编辑</cjm-button>
            <cjm-button type="text" @click="del([scope.row.id])">删除</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <trace-tree-edit v-if="currentPage==='edit'" @submitSuccess="$refs.list.refresh()"></trace-tree-edit>
  </div>
</template>

<script>
  import TraceTreeEdit from './edit.vue'
  import pageSwitch from 'framework/mixins/pageSwitch'
  export default{
    components: {
      TraceTreeEdit
    },
    mixins: [pageSwitch],
    data(){
      return {
        requestUrl: this.$globalData.get('trace', 'apiUrl').traceTree.GET_LIST,
        search: {
          templetID: '',
          productBatch: '',
          updateTime: ''
        },
        multipleSelection: [],
        currentPage: 'list'
      }
    },
    methods: {
      //新建
      add(){
        this.pushPage('edit', '创建溯源树');
      },
      //编辑
      edit(id){
        this.pushPage('edit', '编辑溯源树', {id: id});
      },
      //删除
      del(ids){
        this.$confirm('确认删除？', '提示', {type: 'warning'})
          .then(() => {
            this.$ajax.post(this.$globalData.get('trace', 'apiUrl').traceTree.DELETE, {
              ids: ids
            }).then((r) => {
              if (r.resultCode == 200) {
                this.$message.success('删除成功');
                this.$refs.list.refresh();
              } else {
                this.$message.error(r.msg);
              }
            })
          }).catch(()=> {});
      },
      //批量删除
      batchDel(){
        let ids = this.multipleSelection.map(item=> {
          return item.id;
        });
        this.del(ids);
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      pageSwitched(codes){
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      }
    },
    created(){

    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
