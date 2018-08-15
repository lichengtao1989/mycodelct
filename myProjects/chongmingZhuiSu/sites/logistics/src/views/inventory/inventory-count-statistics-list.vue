<template>
  <div>
    <cjm-list :request-url="requestUrl"
              :need-base-search="false"
              :need-advanced-search="true"
              ref="list"
              base-search-placeholder="输入机构名称、产品编号或名称"
              :auto-get-data="false">
      <div slot="operate">
        <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="产品名称" search-key="productID" v-model="search.productID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.PRODUCT" v-model="search.productID">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="库房名称" search-key="orgID" v-model="search.orgID">
          <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.ORG" v-model="search.orgID">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="期初时间" search-key="stockTime" v-model="search.stockTime">
          <cjm-date-picker v-model="search.stockTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="productCode" label="产品编号" sortable="custom" min-width="140"></cjm-table-column>
        <cjm-table-column prop="productName" label="产品名称" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="orgName" label="所属机构" sortable="custom" min-width="110"></cjm-table-column>
        <cjm-table-column prop="unitName" label="单标单位" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="beginNum" label="期初库存" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="inNum" label="入库数量" sortable="custom" min-width="120">
          <template slot-scope="scope">
            <div v-if="!scope.row.inNum">--</div>
            <div v-if="!!scope.row.inNum">
              {{scope.row.inNum}}
              <cjm-button @click="detailIn(scope.row.orgID,scope.row.productID,this.stockTime)" type="text"
                          class="cjm-icon-view"></cjm-button>
            </div>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="outNum" label="出库数量" sortable="custom" min-width="120">
          <template slot-scope="scope">
            <div v-if="!scope.row.outNum">--</div>
            <div v-if="!!scope.row.outNum">
              {{scope.row.outNum}}
              <cjm-button @click="detailOut(scope.row.orgID,scope.row.productID,this.stockTime)" type="text"
                          class="cjm-icon-view"></cjm-button>
            </div>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="changeNum" label="库存变化" sortable="custom" min-width="120"></cjm-table-column>
        <cjm-table-column prop="endNum" label="期末库存" sortable="custom" min-width="120"></cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :height="750" :visible.sync="dialogVisible" title="库存明细">
      <inventory-count-statistics-in-edit ref="editPage" :data="testData">
      </inventory-count-statistics-in-edit>
    </cjm-dialog>
    <cjm-dialog :height="775" :visible.sync="dialogVisible1" title="库存明细">
      <inventory-count-statistics-out-edit ref="editPage">
      </inventory-count-statistics-out-edit>
    </cjm-dialog>
  </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  import InventoryCountStatisticsInEdit from './inventory-count-statistics-in-edit.vue'
  import InventoryCountStatisticsOutEdit from './inventory-count-statistics-out-edit.vue'
  export default{
    components: {
      InventoryCountStatisticsInEdit,
      InventoryCountStatisticsOutEdit
    },
    data(){
      let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
      return {
        logisticsApiUrl: logisticsApiUrl,
        search: {
          productID: '',
          orgID: '',
          stockTime: ''
        },
        dialogVisible: false,
        dialogVisible1: false,
        requestUrl: logisticsApiUrl.inventory.GET_LEDGER_LIST,
        testData: ''
      }
    },
    methods: {
      //明细按钮点击
      detailIn(orgID, productID, stockTime) {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.editPage.editForm(orgID, productID, stockTime);
        })
      },
      detailOut(orgID, productID, stockTime){
        this.dialogVisible1 = true;
        this.$nextTick(() => {
          this.$refs.editPage.editForm(orgID, productID, stockTime);
        })
      },
      //明细按钮确认点击
      //导出
      exportData(){
        fileDownload(this.logisticsApiUrl.inventory.EXPORT_LEDGER, this.$refs.list.getConditions());
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>

</style>
