<template>
  <div>
    <cjm-list ref="list" :request-url="requestUrl" :need-base-search="true" base-search-placeholder="订单号、组织ID"
              :need-advanced-search="true">
      <div slot="operate">
        <cjm-button power-code="followListExport" type="default" class="cjm-icon-export" @click="exportData">导出
        </cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="订单号" v-model="search.orderCode" search-key="orderCode">
          <cjm-input v-model="search.orderCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="组织名称" v-model="search.corpName" search-key="corpName">
          <cjm-input v-model="search.corpName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="组织ID" v-model="search.corpID" search-key="corpID">
          <cjm-input v-model="search.corpID"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="下单时间" v-model="search.createTime" search-key="createTime">
          <cjm-date-picker type="daterange" v-model="search.createTime"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <!--<cjm-table-column type="selection" width="55"></cjm-table-column>-->
        <cjm-table-column sortable="custom" label="CRM订单号" prop="orderCode" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" label="组织ID" prop="corpID" width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" label="组织名称" prop="corpName" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" label="标识名称" prop="tagName" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" label="下单日期" prop="createTime" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" label="下单数量" prop="orderBatchNumber" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" label="要求发货时间" prop="reqDeliveryTime" width="180"></cjm-table-column>
        <cjm-table-column sortable="custom" label="确认发货时间" prop="deliveryTime" width="180"></cjm-table-column>
        <cjm-table-column sortable="custom" label="生产厂家" prop="factoryName" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" label="发货方式" prop="deliveryType" enum-name="生产订单-发放方式" enum-namespace="code"
                          min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" label="样品" prop="hasDemo" enum-name="有无" enum-namespace="code"
                          min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" label="联系人" prop="operator" width="100"></cjm-table-column>
        <cjm-table-column sortable="custom" label="备注1" prop="note1" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" label="备注2" prop="note2" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" label="最后修改时间" prop="lastUpdateTime" width="180"></cjm-table-column>
        <cjm-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <cjm-button type="text" power-code="productionOrderFollowEdit"
                        @click="edit(scope.row.codeGenerationID, scope.row.documentaryID)">编辑
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog title="编辑" :visible.sync="dialogVisible" :ok-handler="submit">
      <follow-edit ref="edit"></follow-edit>
    </cjm-dialog>
  </div>
</template>
<script>
  import followEdit from './follow-edit.vue'
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    components: {
      followEdit
    },
    data(){
      return {
        requestUrl: this.$globalData.get('code', 'apiUrl').productionOrder.GET_DOCUMENTARY_LIST,
        search: {
          orderCode: '',
          corpName: '',
          corpID: '',
          createTime: ''
        },
        dialogVisible: false
      }
    },
    methods: {
      edit(codeGenerationID, documentaryID){
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.edit.editForm({codeGenerationID, documentaryID});
        });
      },
      exportData(){
        fileDownload(this.$globalData.get('code', 'apiUrl').productionOrder.EXPORT_DOCUMENTARY, this.$refs.list.getConditions());
      },
      submit(callback){
        this.$refs.edit.submitData().then(() => {
          this.$message.success('保存成功!');
          this.$refs.list.refresh();
          callback();
          this.dialogVisible = false;
        }).catch((err) => {
          this.$message.error(err.message);
          callback();
        });
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
</style>
