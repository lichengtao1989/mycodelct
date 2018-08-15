<template>
  <div>
    <div v-if="currentPage == 'list'">
      <cjm-list ref="list" :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true"
                base-search-placeholder="订单号、组织ID">
        <div slot="operate">
          <cjm-button power-code="productionOrderAddOrder" type="primary" class="cjm-icon-add" @click="edit('add')">新建
          </cjm-button>
        </div>
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
          <cjm-search-item label="业务员" search-key="operator" v-model="search.operator">
            <cjm-input v-model="search.operator"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker type="daterange" v-model="search.createTime"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="新老客户" search-key="customerType" v-model="search.customerType">
            <cjm-enum-select v-model="search.customerType" enum-name="生产订单客户类型" enum-namespace="code"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="状态" search-key="status" v-model="search.status">
            <cjm-enum-select v-model="search.status" enum-name="生产订单状态" enum-namespace="code"></cjm-enum-select>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column type="selection" width="55"></cjm-table-column>
          <cjm-table-column label="订单号" prop="orderCode" width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column label="组织ID" prop="corpID" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column label="组织名称" prop="corpName" min-width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column label="状态" prop="status" enum-name="生产订单状态" enum-namespace="code" width="100"
                            sortable="custom"></cjm-table-column>
          <cjm-table-column label="创建人" prop="createByName" min-width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column label="业务员" prop="operator" min-width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column label="新老客户" prop="customerType" enum-name="生产订单客户类型" enum-namespace="code" min-width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column label="创建时间" prop="createTime" width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column label="操作" fixed="right" width="330">
            <template slot-scope="scope">
              <cjm-button type="text" power-code="productionOrderCopy" @click="edit('copy', scope.row)">复制</cjm-button>
              <cjm-button type="text" power-code="productionOrderEditOrder" @click="edit('editOrderDetail', scope.row)">编辑订单</cjm-button>
              <cjm-button type="text" power-code="productionOrderEditTags" @click="edit('edit', scope.row)">编辑标识
              </cjm-button>
              <cjm-button type="text" power-code="productionOrderSubmit" @click="submit(scope.row)" v-if="scope.row.status == '1' && parseInt(scope.row.codeGenerationCount) > 0">提交</cjm-button>
              <cjm-button type="text" power-code="productionOrderPrint" @click="print(scope.row)">打印</cjm-button>
              <cjm-button type="text" power-code="productionOrderDelete"
                          @click="deleteOrder(scope.row.productionOrderID)">删除
              </cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
      <cjm-dialog id="productionOrder" title="打印" :visible.sync="dialogVisible" class="print-dialog" :show-close="false" :height="100">
        <cjm-button class="cjm-icon-print" type="primary" @click="printOrder('machining')">打印加工单</cjm-button>
        <cjm-button class="cjm-icon-print" type="primary" @click="printOrder('code')">打印生码单</cjm-button>
        <div slot="footer">
          <cjm-button @click="dialogVisible = false">关闭</cjm-button>
        </div>
      </cjm-dialog>
    </div>
    <div v-if="currentPage == 'add'">
      <product-add @openEditPage="openEditPage"></product-add>
    </div>
    <div v-if="currentPage == 'edit'">
      <product-edit></product-edit>
    </div>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch';
  import productAdd from './product-add.vue';
  import productEdit from './product-edit.vue';
  export default{
    mixins: [pageSwitch],
    components: {
      productAdd,
      productEdit
    },
    data(){
      return {
        requestUrl: this.$globalData.get('code', 'apiUrl').productionOrder.GET_ORDER_LIST,
        currentPage: 'list',
        dialogVisible: false,
        search: {
          orderCode: '',
          corpName: '',
          corpID: '',
          createTime: '',
          status: '',
          operator: '',
          customerType: ''
        },
        ids: []
      }
    },
    methods: {
      edit(type, data){
        switch (type) {
          case 'add':
            this.pushPage('add', '新建订单', {id: 'add'});
            break;
          case 'edit':
            this.pushPage('edit', '编辑订单标识', {id: 'edit', data: data, productionOrderID: data.productionOrderID});
            break;
          case 'editOrderDetail':
            this.pushPage('add', '编辑生产订单', {id: 'editOrderDetail', data: data});
            break;
          case 'copy':
            this.pushPage('add', '新建生产订单', {id: 'copy', data: data});
            break;
        }
      },
      openEditPage(data){
        this.pushPage('edit', '编辑订单标识', {id: 'edit', data: data, productionOrderID: data.productionOrderID});
      },
      print(row){
        this.productionOrderID = row.productionOrderID;
        this.orderCode = row.orderCode;
        let params = {
          pageSize: 1000,
          productionOrderId: row.productionOrderID
        };
        this.$ajax.get(this.$globalData.get('code', 'apiUrl').productionOrder.GET_PRODUCTION_OREDER_LIST, params).then((res) => {
          if (res.resultCode === '200') {
            if (res.data.rows && res.data.rows.length > 0) {
              let printTags = this.qualifiedTags(res.data.rows);
              if (printTags.length > 0) {
                let factoryName = '';
                let status = true;
                printTags.forEach((p) => {
                  if (factoryName) {
                    if (factoryName !== p.factoryName) {
                      this.$message.warning('印刷工厂不同不能同时打印');
                      status = false;
                    }
                  } else {
                    factoryName = p.factoryName;
                  }
                  this.ids.push(p.codeGenerationID);
                });
                this.dialogVisible = status;
              }else {
                this.$message.warning('没有可打印的标识!');
              }
            } else {
              this.$message.warning('该订单没有可打印的订单');
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      qualifiedTags(data){
        let arr = [];
        data.forEach((p) => {
          if (parseInt(p.status) >= '-2') {
            arr.push(p);
          }
        });
        return arr;
      },
      printOrder(type){
        let url = 'page.html#/code/productionOrder/code-order-preview?type=' + type + '&productionOrderID=' + this.productionOrderID + '&orderCode=' + this.orderCode;
        sessionStorage.setItem('ids', JSON.stringify(this.ids));
        window.open(url);
      },
      deleteOrder(id){
        this.$confirm('确定要删除该订单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            productionOrderID: id
          };
          this.$ajax.post(this.$globalData.get('code', 'apiUrl').productionOrder.DELETE_ORDER, params).then((res) => {
            if (res.resultCode === '200') {
              this.$message.success('删除成功!');
              this.$refs.list.refresh();
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      },
      submit(row){
        this.$confirm('确定要提交审核该订单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            productionOrderID: row.productionOrderID
          };
          this.$ajax.post(this.$globalData.get('code', 'apiUrl').productionOrder.COMMIT_ORDER, params).then((res) => {
            if (res.resultCode === '200') {
              this.$message.success('提交成功!');
              this.$nextTick(() => {
                row.status = '2';
                row.statusName = '待审核';
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      },
      pageSwitched(codes) {
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  .print-dialog {
    text-align: center;
  }
</style>
<style lang="less">
  #productionOrder .cjm-dialog-head{
    text-align: left;
  }
</style>
