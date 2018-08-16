<template>
  <div class="form-content" style="padding: 33px" v-tab-title="'注册审核任务列表'">
    <div v-loading="isLoading">
      <task v-for="(item,index) in list" :key="index" :task-data="item" @audit-success="loadList"></task>
      <div v-if="list.length===0" style="text-align: center;font-size: 15px"><img src="@/assets/images/no-data.png"/></div>
    </div>
    <div v-if="list.length>0" style="text-align: center">
      <nz-pagination
        @size-change="pageSizeChange"
        @current-change="pageChange"
        :current-page="pageNum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </nz-pagination>
    </div>
  </div>
</template>
<script>
  import task from './task.vue';
  export default {
    components: {task},
    data(){
      return {
        list: [],
        isLoading: false,
        loadTimeout: null,
        pageSize: 2,
        pageNum: 1,
        total: 0
      };
    },
    methods: {
      pageSizeChange(pageSize){
        this.pageSize = pageSize;
        this.loadList();
      },
      pageChange(pageNum){
        this.pageNum = pageNum;
        this.loadList();
      },
      loadList(){
        clearTimeout(this.loadTimeout);
        this.loadTimeout = setTimeout(async () => {
          const {pageSize, pageNum} = this;
          const param = {pageSize, pageNum, status: 1};
          this.isLoading = true;
          const {rows, total} = await this.$model('system').store.getList(param);
          await this.$sleep(300);
          this.isLoading = false;
          this.list = rows;
          this.total = total;
        }, 200);
      }
    },
    created(){
      this.loadList();
    }
  }
</script>
