<template>
  <div>
    <div v-show="currentPage==='list'">
      <cjm-list :request-url="requestUrl"
                :need-base-search="needBaseSearch"
                :need-advanced-search="needAdvancedSearch"
                ref="list">
        <div slot="operate" v-if="showOperate">
          <cjm-button @click="stockIn" type="primary"><i class="cjm-icon-add"></i>入库</cjm-button>
          <cjm-button @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="投入品名称" search-key="name" v-model="search.name">
            <cjm-input v-model="search.name"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="追溯码" search-key="relationCode" v-model="search.relationCode">
            <cjm-input v-model="search.relationCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="投入品类型" search-key="type" v-model="search.type">
            <cjm-enum-select v-model="search.type"
                             enum-name="投入品类型"
                             enum-namespace="trace"
                             :clearable="true"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="批次" search-key="productionBatch" v-model="search.productionBatch">
            <cjm-input v-model="search.productionBatch"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="供应商" search-key="supplierID" v-model="search.supplierID">
            <cjm-remote-select v-model="search.supplierID"
                               :remote-url="$globalData.get('trace','apiUrl').autoComplete.SUPPLIER"></cjm-remote-select>
          </cjm-search-item>
          <cjm-search-item label="入库机构" search-key="stockInOrgID" v-model="search.stockInOrgID">
            <cjm-remote-select v-model="search.stockInOrgID"
                               :remote-url="$globalData.get('trace','apiUrl').autoComplete.ORG"></cjm-remote-select>
          </cjm-search-item>
          <cjm-search-item label="入库类型" search-key="billType" v-model="search.billType">
            <cjm-enum-select v-model="search.billType"
                             enum-name="投入品入库类型"
                             enum-namespace="trace"
                             :clearable="true"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="单据编号" search-key="billCode" v-model="search.billCode">
            <cjm-input v-model="search.billCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="创建人" search-key="creater" v-model="search.creater">
            <cjm-input v-model="search.creater"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="创建时间" search-key="operateTime" v-model="search.operateTime">
            <cjm-date-picker v-model="search.operateTime" type="daterange"></cjm-date-picker>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="billCode" label="单据编号" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="name" label="投入品名称" min-width="140" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="typeName" label="投入品类型" width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="className" label="投入品类别" width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="spec" label="规格型号" width="110" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="productionBatch" label="批次" width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="productionTime" label="生产日期" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="quantity" label="数量" width="90" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="measurementUnit" label="单位" width="80" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="supplierName" label="供应商" width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="stockInOrgName" label="入库机构" width="140" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="stockInTime" label="入库时间" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="billTypeName" label="入库类型" width="110" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="employeeName" label="仓管员" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="createBy" label="创建人" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="createTime" label="创建时间" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text"
                          @click="showRelationCode(scope.row)"
                          v-if="scope.row.relationCode && scope.row.relationCode.length>0">追溯码</cjm-button>
              <cjm-button type="text" @click="showImages(scope.row)"
                          v-if="scope.row.images && scope.row.images.length>0">附件图片</cjm-button>
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

      <cjm-dialog title="查看追溯码" :visible.sync="codeDialogVisible">
        <cjm-form>
          <cjm-form-item label="入库方式" class="cjm-form-item-long">
            {{editRow.relationCodeType=='1' ? '按号段' : '单码'}}
          </cjm-form-item>
          <cjm-form-item label="追溯码" v-if="editRow.relationCodeType==2" class="cjm-form-item-long">
            <p v-for="code in editRow.relationCode.split(',')" class="code">{{code}}</p>
          </cjm-form-item>
          <cjm-form-item label="起始码" v-if="editRow.relationCodeType==1" class="cjm-form-item-long">
            {{editRow.relationCode.split(',')[0]}}
          </cjm-form-item>
          <cjm-form-item label="结束码" v-if="editRow.relationCodeType==1" class="cjm-form-item-long">
            {{editRow.relationCode.split(',')[1]}}
          </cjm-form-item>
        </cjm-form>
        <div slot="footer">
          <cjm-button type="primary" @click="codeDialogVisible=false"><i class="cjm-icon-confirm"></i>确定</cjm-button>
        </div>
      </cjm-dialog>
    </div>
    <stockIn-edit v-if="currentPage==='edit'" @submitSuccess="$refs.list.refresh()"></stockIn-edit>
  </div>
</template>

<script>
  import fileDownload from 'framework/utils/fileDownload'
  import pageSwitch from 'framework/mixins/pageSwitch'
  import StockInEdit from './stockIn-edit.vue'
  export default{
    mixins: [pageSwitch],
    components: {
      StockInEdit
    },
    data(){
      return {
        requestUrl: this.$globalData.get('trace', 'apiUrl').inputs.GET_STOCK_IN_LIST,
        needBaseSearch: true,
        needAdvancedSearch: true,
        showOperate: true,
        search: {
          name: '',
          type: '',
          stockInOrgID: '',
          billType: '',
          billCode: '',
          relationCode: '',
          productionBatch: '',
          supplierID: '',
          creater: '',
          operateTime: ''
        },
        dialogVisible: false,
        codeDialogVisible: false,
        editRow: {},
        currentPage: 'list'
      }
    },
    methods: {
      //入库
      stockIn(){
        this.pushPage('edit', '入库');
      },
      //导出
      exportData(){
        fileDownload(this.$globalData.get('trace', 'apiUrl').inputs.EXPORT_STOCK_IN_LIST, this.$refs.list.getConditions());
      },
      //查看附件图片
      showImages(row){
        this.editRow = row;
        this.dialogVisible = true;
      },
      showRelationCode(row){
        this.editRow = row;
        this.codeDialogVisible = true;
      },
      pageSwitched(codes){
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      }
    },
    created(){
      let query = this.$route.query || {};
      let inputsBatchID = query.inputsBatchID;
      let stockInOrgID = query.stockInOrgID;
      let billType = query.billType;
      let img = query.img;
      if (inputsBatchID || stockInOrgID || billType || img) {
        //隐藏操作和按钮
        this.needBaseSearch = this.needAdvancedSearch = this.showOperate = false;
        this.requestUrl = `${this.$globalData.get('trace', 'apiUrl').inputs.GET_STOCK_IN_LIST}&inputsBatchID=${inputsBatchID}&stockInOrgID=${stockInOrgID}&billType=${billType}&img=${img}`;
      }
    }
  }
</script>

<style scoped>
</style>
