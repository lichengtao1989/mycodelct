<template>
  <div>
    <cjm-list :request-url="requestUrl"
              :need-base-search="false"
              :need-advanced-search="true"
              ref="list"
              v-show="currentPage==='list'">
      <div slot="operate">
        <cjm-button type="primary" @click="add"><i class="cjm-icon-add"></i>新建模板</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="模板名" search-key="name" v-model="search.name">
          <cjm-input v-model="search.name"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="包含产品" search-key="productID" v-model="search.productID">
          <cjm-remote-select v-model="search.productID"
                             :remote-url="$globalData.get('trace','apiUrl').autoComplete.PRODUCT"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="name" label="模板名" width="160" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="productList" label="包含产品" min-width="150"></cjm-table-column>
        <cjm-table-column prop="createUser" label="创建人" width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" label="创建时间" width="160" sortable="custom"></cjm-table-column>
        <cjm-table-column label="操作" width="140">
          <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.id)">编辑</cjm-button>
            <cjm-button type="text" @click="del(scope.row.id)">删除</cjm-button>
            <cjm-button type="text" @click="print(scope.row.id)">打印</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <templet-edit v-if="currentPage==='edit'" @submitSuccess="$refs.list.refresh()"></templet-edit>
  </div>
</template>

<script>
  import TempletEdit from './templet-edit.vue'
  import pageSwitch from 'framework/mixins/pageSwitch'
  export default{
    components: {
      TempletEdit
    },
    mixins: [pageSwitch],
    data(){
      return {
        requestUrl: this.$globalData.get('trace', 'apiUrl').traceTree.GET_TEMPLET_LIST,
        search: {
          name: '',
          productID: '',
          createTime: ''
        },
        currentPage: 'list'
      }
    },
    methods: {
      //新建
      add(){
        this.pushPage('edit', '新建模板');
      },
      //编辑
      edit(id){
        this.pushPage('edit', '编辑模板', {id: id});
      },
      //打印
      print(id){
        this.pushPage('edit', '打印模板', {id: id, print: true}, ()=> {
          this.currentPage = 'list';
        });
        this.currentPage = 'edit';
      },
      //删除
      del(id){
        this.$confirm('确认删除此模板？', '提示', {type: 'warning'})
          .then(() => {
            this.$ajax.post(this.$globalData.get('trace', 'apiUrl').traceTree.DELETE_TEMPLET, {
              id: id
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
      pageSwitched(codes){
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
