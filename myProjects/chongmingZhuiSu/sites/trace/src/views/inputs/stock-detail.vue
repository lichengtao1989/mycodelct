<template>
  <div>
    <cjm-list :request-url="requestUrl"
              :need-base-search="false" ref="list">
      <template slot="tableColumns">
        <cjm-table-column prop="billCode" label="单据编号" width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="name" label="投入品名称" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="type" label="投入品类型" width="120" enum-name="投入品类型" enum-namespace="trace" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="spec" label="规格型号" width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="productionBatch" label="批次" min-width="100" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="productionTime" label="生产日期" width="160" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="quantity" label="数量" width="90" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="measurementUnit" label="单位" width="90" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="supplierName" label="供应商" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="stockInOrgName" label="入库机构" min-width="120" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="stockInTime" label="入库时间" width="160" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="billType" label="入库类型" width="110" enum-name="投入品入库类型" enum-namespace="trace"
                          sortable="custom"></cjm-table-column>
        <cjm-table-column prop="employeeName" label="仓管员" width="90" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" label="创建时间" width="160" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createName" label="创建人" width="90" sortable="custom"></cjm-table-column>
        <cjm-table-column label="附件图片" width="110">
          <template slot-scope="scope">
            <cjm-button type="text" @click="showImages(scope.row)"
                        v-if="scope.row.images && scope.row.images.length>0">查看
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>

    <cjm-dialog title="附件图片" :visible.sync="dialogVisible">
      <img v-for="image in (editRow.images || [])" :src="image" style="width:100%;"/>
      <div slot="footer">
        <cjm-button type="primary" @click="dialogVisible=false"><i class="cjm-icon-confirm"></i>确定</cjm-button>
      </div>
    </cjm-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        requestUrl: '',
        dialogVisible: false,
        editRow: {}
      }
    },
    methods: {
      //查看附件图片
      showImages(row){
        this.editRow = row;
        this.dialogVisible = true;
      }
    },
    created(){
      let query = this.$route.query || {};
      let inputsID = query.inputsID;
      let orgID = query.orgID;
      if (!inputsID || !orgID) {
        this.$message.error('缺少必要参数');
        return;
      }
      this.requestUrl = `${this.$globalData.get('trace', 'apiUrl').inputs.GET_STOCK_DETAIL_LIST}&inputsID=${inputsID}&orgID=${orgID}`;
    }
  }
</script>
