<template>
  <div>
    <div class="operate">
      <cjm-button type="primary" class="cjm-icon-add"
                  power-code="productionOrderAddTag"
                  :disabled="totalTags >= 30"
                  @click="add">添加
      </cjm-button>
      <cjm-button type="default" class="cjm-icon-print"
                  power-code="productionOrderPrintCode1"
                  :disabled="labelIds.length == 0"
                  @click="printCodeOrder('code')">打印生码单
      </cjm-button>
      <cjm-button type="default" class="cjm-icon-print"
                  :disabled="labelIds.length == 0"
                  power-code="productionOrderPrintCode2"
                  @click="printCodeOrder('machining')">打印加工单
      </cjm-button>
    </div>
    <div class="no-data-img" v-if="listData.length == 0">
      <img src="static/images/no-data.ddded3c.png" alt="">
      <p style="text-align: center;">还没有标识，请点击添加</p>
    </div>
    <edit-list ref="editList"
               @openCopyModel="copy"
               @openEidtModel="edit"
               @openApproveModel="approve"
               @openViewModel="view"
               @totalTagsChange="totalTagsChange"
               :totalTags="totalTags"
               :labelIds="labelIds"
               :visible.sync="dialogVisible"
               :listData="listData"></edit-list>
    <cjm-pagination class="pagination"
                    layout="prev, pager, next"
                    :current-page.sync="currentListPage"
                    :total="total"
                    v-if="listData.length > 0"
                    @current-change="sizeChange"></cjm-pagination>
    <edit-code-order ref="editDialog" :visible.sync="dialogVisible" @submitSuccess="submitSuccess"
                     @approveSuccess="approveSuccess"></edit-code-order>
  </div>
</template>
<script>
  import editCodeOrder from './edit.vue'
  import editList from './components/edit-list.vue'
  import pageSwitch from 'framework/mixins/pageSwitch';
  export default{
    mixins: [pageSwitch],
    components: {
      editCodeOrder,
      editList
    },
    data(){
      return {
        dialogVisible: false,
        editData: null,
        listData: [],
        enums: this.$globalData.get('code', 'enums'),
        labelIds: [],
        operate: '',
        total: 1,
        currentListPage: 1,
        totalTags: 0
      }
    },
    methods: {
      add(){
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.editDialog.addForm(this.productionOrderID, this.corpID, this.orderCode, this.salesman, this.corpName);
        });
      },
      edit(id){
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.editDialog.editForm(id, this.corpID, this.orderCode, this.salesman);
        });
      },
      copy(id){
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.editDialog.copyForm(id, this.productionOrderID, this.corpID, this.orderCode, this.salesman);
        });
      },
      approve(data){
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.editDialog.approveForm(data.id);
        });
        this.approveIndex = data.index;
      },
      view(id){
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.editDialog.viewForm(id);
        });
      },
      editRender(id){
        let params = {
          pageNum: this.currentListPage,
          productionOrderId: id
        };
        this.$ajax.get(this.$globalData.get('code', 'apiUrl').productionOrder.GET_PRODUCTION_OREDER_LIST, params).then((res) => {
          if (res.resultCode === '200') {
            if (res.data.rows && res.data.rows.length > 0) {
              this.listData = this.initListData(res.data.rows);
              this.totalTags = res.data.total;
              this.total = res.data.total;
              this.listData.map((p) => {
                p.isShowTagInformation = true;
                p.isSelected = true;
                return p;
              });
            }
          }
        });
      },
      totalTagsChange(val){
        this.totalTags = val;
      },
      initListData(data){
        data.map((p) => {
          p.emergencyDegreeName = this.enumSearch('生产订单紧急程度', p.emergencyDegree);
        });
        return data;
      },
      enumSearch(keyName, val){
        for (let key in this.enums[keyName]) {
          if (this.enums[keyName][key] === val) {
            return key;
          }
        }
        return '';
      },
      printCodeOrder(type){
        let url = 'page.html#/code/productionOrder/code-order-preview?type=' + type + '&productionOrderID=' + this.productionOrderID + '&orderCode=' + this.orderCode;
        sessionStorage.setItem('ids', JSON.stringify(this.labelIds));
        window.open(url);
      },
      submitSuccess(){
        this.editRender(this.productionOrderID);
      },
      approveSuccess(val){
        this.listData[this.approveIndex - 1].status = val;
        this.$set(this.listData, this.approveIndex - 1, this.listData[this.approveIndex - 1]);
      },
      nextStep(){
        this.$refs.editDialog.submitData();
      },
      submitData(){},
      sizeChange(){
        this.editRender(this.productionOrderID);
      },
      pageSwitched(codes) {
        this.currentPage = codes.length > 1 ? codes[1] : 'edit';
      }
    },
    created(){
      if (this.getPageParams('edit')) {
        this.productionOrderID = this.getPageParams('edit').productionOrderID;
        this.orderCode = this.getPageParams('edit').data.orderCode;
        this.corpID = this.getPageParams('edit').data.corpID;
        this.salesman = this.getPageParams('edit').data.operator;
        this.corpName = this.getPageParams('edit').data.corpName;
        this.editRender(this.productionOrderID);
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  .operate {
    margin-bottom: 20px;
  }

  .pagination {
    width: 100%;
    text-align: center;
  }

  .no-data-img {
    position: absolute;
    left: 50%;
    margin-left: -250px;
  }
</style>
