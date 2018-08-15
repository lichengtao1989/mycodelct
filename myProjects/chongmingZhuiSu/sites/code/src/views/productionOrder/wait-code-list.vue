<template>
  <div>
    <cjm-list ref="list" :request-url="requestUrl" base-search-placeholder="组织ID" :need-base-search="true" :need-advanced-search="true">
      <div slot="search">
        <cjm-search-item label="订单号" search-key="orderCode" v-model="search.orderCode">
          <cjm-input v-model="search.orderCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="组织名称" search-key="corpName" v-model="search.corpName">
          <cjm-input v-model="search.corpName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="组织ID" search-key="corpID" v-model="search.corpID">
          <cjm-input v-model="search.corpID"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="下单时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker type="daterange" v-model="search.createTime"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column sortable="custom" prop="corpID" label="组织ID" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="corpName" label="组织名称" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="orderCode" label="CRM订单号" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="batchID" label="批次号" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="tagName" label="标识名称" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="orderBatchNumber" label="数量" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="createTime" label="创建时间" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="createName" label="创建人" width="120"></cjm-table-column>
        <cjm-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <cjm-button type="text" power-code="awaitListProductCode" @click="productCode(scope.row)">生码</cjm-button>
            <cjm-button type="text" power-code="awaitListProductCodeOrder" @click="productCodeOrder(scope.row)">生码单</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <edit ref="editDialog" :visible.sync="dialogVisible" @submitSuccess="submitSuccess" @approveSuccess="$refs.list.refresh()"></edit>
  </div>
</template>
<script>
  import edit from '../codeGeneration/edit.vue';
  export default{
    components: {
      edit
    },
    data(){
      return {
        requestUrl: this.$globalData.get('code', 'apiUrl').productionOrder.WAIT_GET_LIST,
        search: {
          orderCode: '',
          corpName: '',
          corpID: '',
          factoryID: '',
          operator: '',
          createTime: ''
        },
        dialogVisible: false
      }
    },
    methods: {
      productCodeOrder(row){
        let url = 'page.html#/code/productionOrder/code-order-preview?type=code&productionOrderID=' + row.productionOrderID + '&orderCode=' + row.orderCode;
        sessionStorage.setItem('ids', JSON.stringify([row.codeGenerationID]));
        window.open(url);
      },
      productCode(row){
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.editDialog.editForm(row.id, row.corpID);
        });
      },
      submitSuccess(id){
        let params = {
          id: id,
          value: 0
        };
        this.$ajax.post(this.$globalData.get('code', 'apiUrl').productionOrder.APPROVE, params).then((res) => {
          if(res.resultCode === '200'){
            this.$message.success('操作成功!');
            this.$refs.list.refresh();
          }else {
            this.$message.error(res.msg);
          }
        });
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
</style>
