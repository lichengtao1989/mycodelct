<template>
  <div :key="$route.meta.code">
    <div v-show="currentPage==='list'">
      <cjm-list :request-url="requestUrl" :need-base-search="needBaseSearch" :need-advanced-search="needAdvancedSearch" base-search-placeholder="输入单据编号搜索" ref="list">
        <div slot="operate" v-if="showOperate">
          <cjm-button @click="stockOut" type="primary">
            <i class="cjm-icon-add"></i>出库</cjm-button>
          <cjm-button @click="exportData">
            <i class="cjm-icon-export"></i>导出</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="投入品名称" search-key="name" v-model="search.name">
            <cjm-input v-model="search.name"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="投入品类型" search-key="type" v-model="search.type">
            <cjm-enum-select v-model="search.type" enum-name="投入品类型" enum-namespace="trace" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="批次" search-key="productionBatch" v-model="search.productionBatch">
            <cjm-input v-model="search.productionBatch"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="领用人" search-key="recipientName" v-model="search.recipientName">
            <cjm-input v-model="search.recipientName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="购买人" search-key="purchaserName" v-model="search.purchaserName">
            <cjm-input v-model="search.purchaserName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="出库机构" search-key="stockOutOrgID" v-model="search.stockOutOrgID">
            <cjm-remote-select v-model="search.stockOutOrgID" :remote-url="$globalData.get('trace','apiUrl').autoComplete.ORG"></cjm-remote-select>
          </cjm-search-item>
          <cjm-search-item label="出库类型" v-show="showBillType" search-key="billType" v-model="search.billType">
            <cjm-enum-select v-model="search.billType" enum-name="投入品出库类型" enum-namespace="trace" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="单据编号" search-key="billCode" v-model="search.billCode">
            <cjm-input v-model="search.billCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="创建人" search-key="createName" v-model="search.createName">
            <cjm-input v-model="search.createName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="billCode" label="单据编号" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="name" label="投入品名称" min-width="140" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="type" label="投入品类型" width="120" enum-name="投入品类型" enum-namespace="trace" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="className" label="投入品类别" width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="spec" label="规格型号" width="110" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="productionBatch" label="批次" width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="quantity" label="数量" width="90" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="measurementUnit" label="单位" width="80" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="efficacyDay" label="安全间隔期" width="120" sortable="custom" :formatter="formatEfficacyDay"></cjm-table-column>
          <cjm-table-column prop="stockOutOrgName" label="出库机构" width="140" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="billType" label="出库类型" width="110" enum-name="投入品出库类型" enum-namespace="trace" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="purchaserName" label="购买人" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="recipientName" label="领用人" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="technicalName" label="技术员" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="createName" label="创建人" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="createTime" label="创建时间" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column label="操作" width="90" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text" @click="showImages(scope.row)" v-if="scope.row.images && scope.row.images.length>0">附件图片</cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>

      <cjm-dialog title="附件图片" :visible.sync="dialogVisible">
        <img v-for="(image,key) in (editRow.images || [])" :src="image" :key="key" style="width:100%;" />
        <div slot="footer">
          <cjm-button type="primary" @click="dialogVisible=false">
            <i class="cjm-icon-confirm"></i>确定</cjm-button>
        </div>
      </cjm-dialog>
    </div>
    <stockOut-edit v-if="currentPage==='edit'" @submitSuccess="$refs.list.refresh()"></stockOut-edit>
  </div>
</template>

<script>
import fileDownload from 'framework/utils/fileDownload';
import pageSwitch from 'framework/mixins/pageSwitch';
import StockOutEdit from './stockOut-edit.vue';
export default {
  mixins: [pageSwitch],
  components: {
    StockOutEdit
  },
  data() {
    let apiUrl = this.$globalData.get('trace', 'apiUrl');
    return {
      needBaseSearch: true,
      needAdvancedSearch: true,
      showOperate: true,
      search: {
        name: '',
        type: '',
        productionBatch: '',
        recipientName: '',
        stockOutOrgID: '',
        billType: '',
        billCode: '',
        purchaserName: '',
        createName: '',
        createTime: ''
      },
      dialogVisible: false,
      codeDialogVisible: false,
      editRow: {},
      currentPage: 'list',
      url: {
        inputsStockOutList: apiUrl.inputs.GET_STOCK_OUT_LIST,
        inputsSalesList: apiUrl.inputs.GET_STOCK_OUT_LIST + '&billType=12'
      },
      exportUrl: {
        inputsStockOutList: apiUrl.inputs.EXPORT_STOCK_OUT_LIST,
        inputsSalesList: apiUrl.inputs.EXPORT_STOCK_OUT_LIST + '&billType=12'
      }
    };
  },
  computed: {
    requestUrl() {
      return this.url[this.$route.meta.code];
    },
    showBillType() {
      let showType = true;
      if (this.$route.meta.code != 'inputsStockOutList') {
        showType = false;
      }
      return showType;
    }
  },
  methods: {
    //出库
    stockOut() {
      this.pushPage('edit', '出库');
    },
    //导出
    exportData() {
      fileDownload(this.exportUrl[this.$route.meta.code], this.$refs.list.getConditions());
    },
    //查看附件图片
    showImages(row) {
      this.editRow = row;
      this.dialogVisible = true;
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    },
    formatEfficacyDay(row, column, cellValue) {
      if (cellValue) {
        return cellValue + '天';
      }
    }
  },
  created() {
    let query = this.$route.query || {};
    let inputsBatchID = query.inputsBatchID;
    let stockOutOrgID = query.stockOutOrgID;
    let billType = query.billType;
    let img = query.img;
    if (inputsBatchID || stockOutOrgID || billType || img) {
      //隐藏操作和按钮
      this.needBaseSearch = this.needAdvancedSearch = this.showOperate = false;
      this.requestUrl = `${this.$globalData.get('trace', 'apiUrl').inputs.GET_STOCK_OUT_LIST}&inputsBatchID=${inputsBatchID}&stockOutOrgID=${stockOutOrgID}&billType=${billType}&img=${img}`;
    }
  }
};
</script>

<style scoped>

</style>
