<template>
  <div>
    <cjm-list :request-url="requestUrl" ref="list" :need-base-search="true" :need-advanced-search="true" baseSearchPlaceholder="输入关联批次、关联产品">
      <div slot="operate">
        <cjm-button type="primary" power-code="addCodeCorrelation" @click="addCodeCorrelation">
          <i class="cjm-icon-add"></i>码关联
        </cjm-button>
        <cjm-button type="primary" power-code="codeCorrelationReset" @click="codeCorrelationReset">
          <i class="cjm-icon-add"></i>重置码关联
        </cjm-button>
        <cjm-button power-code="codeCorrelationExport" @click="codeCorrelationExport">
          <i class="cjm-icon-export"></i>导出
        </cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="关联批次" search-key="productBatchCode" v-model="search.productBatchCode">
          <cjm-remote-select :remote-url="codeUrl.autoComplete.PRODUCT_BATCH" v-model="search.productBatchCode"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="物流码" search-key="code" v-model="search.code">
          <cjm-input v-model="search.code"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="关联产品" search-key="productName" v-model="search.productName">
          <cjm-remote-select :remote-url="codeUrl.autoComplete.PRODUCT" value-key="name" v-model="search.productName"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column label="类型" prop="operationTypeName" min-width="180"></cjm-table-column>
        <cjm-table-column label="关联方式" prop="codeBindTypeName" min-width="180"></cjm-table-column>
        <cjm-table-column label="生码批次" prop="batchID" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="起始码" prop="beginLogisticsCode" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="结束码" prop="endLogisticsCode" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="物流码" prop="logisticsCode" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="码数量" prop="logisticsCodeCount" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="关联批次" prop="productBatchCode" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="批次物流码" prop="relatedCode" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="关联产品" prop="productName" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="创建人" prop="createByName" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="创建时间" prop="createTime" sortable="custom" min-width="180"></cjm-table-column>
        <cjm-table-column label="操作" min-width="180" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" v-if="scope.row.operationType==1" @click="editCodeCorrelation(scope.row)">重定义码关联
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <!--码关联 重置码关联 弹窗-->
    <cjm-dialog :height="dialogHeight" key="dialog1" :ok-handler="addResetSubmit" :visible.sync="addResetDialogVisible" :title="dislogTitle">
      <add-reset ref="addReset" :edit-row="editRow" :ctrl="dialogCtrl" v-if="addResetDialogVisible"></add-reset>
    </cjm-dialog>

    <!-- long msg dialog -->
    <cjm-dialog :ok-handler="clearLongMsg" key="dialog2" :cancel-handler="clearLongMsg" @close="clearLongMsg" :visible="longMsgDialogVisible" :title="addResetDialogTitle">
      <long-msg :text="longMsgText" v-if="longMsgDialogVisible"></long-msg>
    </cjm-dialog>

  </div>
</template>
<script>
import AddReset from './add-reset.vue';
import LongMsg from './long-msg.vue';
import fileDownload from 'framework/utils/fileDownload';
export default {
  components: { AddReset, LongMsg },
  data() {
    const codeUrl = this.$globalData.get('code', 'apiUrl');
    const requestUrl = codeUrl.codeCorrelation.GET_LIST;
    return {
      search: {
        productBatchCode: '',
        code: '',
        productName: '',
        createTime: ''
      },
      codeUrl,
      requestUrl,
      dislogTitle: '码关联',
      dialogHeight: 580,
      dialogCtrl: 'add',
      editRow: {},
      addResetDialogVisible: false,
      longMsgText: '',
      addResetDialogTitle: ''
    };
  },
  computed: {
    longMsgDialogVisible() {
      return this.longMsgText.length > 0;
    }
  },
  methods: {
    editCodeCorrelation(row) {
      //重定义码关联
      this.editRow = row;
      this.dislogTitle = '重定义码关联';
      this.dialogHeight = 580;
      this.dialogCtrl = 'edit';
      this.addResetDialogVisible = true;
    },
    addCodeCorrelation() {
      //添加码关联
      this.editRow = {};
      this.dislogTitle = '码关联';
      this.dialogHeight = 580;
      this.dialogCtrl = 'add';
      this.addResetDialogVisible = true;
    },
    codeCorrelationReset() {
      //重置码关联
      this.editRow = {};
      this.dislogTitle = '重置码关联';
      this.dialogHeight = 470;
      this.dialogCtrl = 'reset';
      this.addResetDialogVisible = true;
    },
    //导出码关联
    codeCorrelationExport() {
      fileDownload(this.codeUrl.codeCorrelation.CODE_RELATE_EXPORT, this.$refs.list.getConditions());
    },
    addResetSubmit(callback) {
      this.$refs.addReset
        .submit()
        .then(res => {
          callback();
          this.addResetDialogVisible = false;
          this.$refs.list.refresh();
          if (res && res.longMsg) {
            this.addResetDialogTitle = res.type == 'add' ? '码关联失败详情' : '重置码关联失败详情';
            this.longMsgText = res.longMsg;
          }
        })
        .catch(err => {
          let res = null;
          if (err) {
            const msg = err.message;
            try {
              res = JSON.parse(msg);
            } catch (err) {}
          }
          if (res && res.longMsg) {
            this.addResetDialogVisible = false;
            this.addResetDialogTitle = res.type == 'add' ? '码关联失败详情' : '重置码关联失败详情';
            this.longMsgText = res.longMsg;
          }
          callback();
        });
    },
    clearLongMsg(callback) {
      this.longMsgText = '';
      if ((typeof callback).toLowerCase() == 'function') {
        callback();
      }
    }
  }
};
</script>
