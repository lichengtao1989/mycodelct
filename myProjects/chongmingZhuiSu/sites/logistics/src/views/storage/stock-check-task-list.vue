<template>
  <div>
    <cjm-list :need-advanced-search="true" :request-url="logisticsApiUrl.storage.GET_STOCK_CHECK_TASK_LIST" ref="list" @selection-change="handleSelectionChange">
      <div slot="operate">
        <cjm-button @click="checkTask" type="primary" power-code="stockCheckTask">
          <i class="cjm-icon-add"></i>新建任务
        </cjm-button>
        <cjm-button @click="finishCheckTasks" :disabled="multipleSelection.length==0" power-code="SaveFinishTask">完成任务</cjm-button>
        <cjm-button @click="cancelCheckTasks" :disabled="multipleSelection.length==0" power-code="SaveCancelTask">取消任务</cjm-button>
        <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="盘点编号" search-key="stockTakingCode" v-model="search.stockTakingCode">
          <cjm-input v-model="search.stockTakingCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="仓库编号" search-key="houseCode" v-model="search.houseCode">
          <cjm-input v-model="search.houseCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="仓库名称" search-key="houseName" v-model="search.houseName">
          <cjm-input v-model="search.houseName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="盘点原因" search-key="reason" v-model="search.reason">
          <cjm-input v-model="search.reason"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="状态" search-key="status" v-model="search.status">
          <cjm-enum-select enum-namespace="logistics" enum-name="盘点状态" :clearable="true" v-model="search.status"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item class="cjm-search-item-long" label="创建时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker type="datetimerange" v-model="search.createTime"></cjm-date-picker>
          <!-- <cjm-date-picker type="datetime" placeholder="完成时间"></cjm-date-picker> -->
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column type="selection" width="55"></cjm-table-column>
        <cjm-table-column label="盘点编号" prop="stockTakingCode" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column label="仓库编号" prop="houseCode" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="仓库名称" prop="houseName" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="盘点原因" prop="reason" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="备注" prop="note" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column label="状态" enum-namespace="logistics" enum-name="盘点状态" sortable="custom" prop="status" min-width="100"></cjm-table-column>
        <cjm-table-column label="创建时间" prop="createTime" sortable="custom" min-width="160"></cjm-table-column>
        <cjm-table-column label="开始时间" prop="startTime" sortable="custom" min-width="160"></cjm-table-column>
        <cjm-table-column label="完成时间" prop="finishTime" sortable="custom" min-width="160"></cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :ok-handler="checkTaskConfirm" :visible.sync="dialogVisible" title="新建任务">
      <stock-check-task-edit ref="editPage"></stock-check-task-edit>
    </cjm-dialog>
  </div>
</template>
<script>
  import StockCheckTaskEdit from './stock-check-task-edit.vue'
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    components: {
      StockCheckTaskEdit
    },
    data() {
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        search: {
          stockTakingCode: '',
          houseCode: '',
          houseName: '',
          reason: '',
          status: '',
          createTime: ''
        },
        dialogVisible: false,
        multipleSelection: []
      }
    },
    methods: {
      checkTask() {
        this.dialogVisible = true;
      },
      checkTaskConfirm(callback) {
        this.$refs.editPage.submit().then(() => {
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        }).catch((error) => {
          if (error) {
            this.$message.error(error.message);
            this.$refs.list.refresh();
          }
          callback()
        })
      },
      handleSelectionChange(val){
        this.multipleSelection = val.map(function (x) {
          return x.stockTakingID;
        })
      },
      finishCheckTasks() {
        this.$confirm('确认要完成任务吗？', '提示', {
          type: 'info'
        }).then(() => {
          this.$ajax.get(this.logisticsApiUrl.storage.SAVE_FINISH_TASK, {id: this.multipleSelection}).then((r) => {
            if (r.resultCode == '200') {
              this.$refs.list.refresh();
              this.$message({
                type: 'success',
                message: '操作完成'
              });
            } else {
              this.$message({
                type: 'error',
                message: r.msg
              });
              this.$refs.list.refresh();
            }
          })
        }).catch(() => {
        })
      },
      cancelCheckTasks(){
        this.$confirm('确认要取消任务吗？', '提示', {
          type: 'info'
        }).then(() => {
          this.$ajax.get(this.logisticsApiUrl.storage.SAVE_CANCEL_TASK, {id: this.multipleSelection}).then((r) => {
            if (r.resultCode == '200') {
              this.$refs.list.refresh();
              this.$message({
                type: 'success',
                message: '操作完成'
              });
            } else {
              this.$message({
                type: 'error',
                message: r.msg
              });
              this.$refs.list.refresh();
            }
          })
        }).catch(() => {
        })
      },
      exportData() {
        fileDownload(this.logisticsApiUrl.storage.EXPORT_STOCK_CHECK_TASK_LIST, this.$refs.list.getConditions());
      }
    }
  }
</script>
