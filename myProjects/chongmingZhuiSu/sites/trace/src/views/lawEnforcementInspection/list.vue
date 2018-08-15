<template>
  <div>
    <diaglogeidt ref="diaglogeidt" @saveInfo="saveInfo"></diaglogeidt>
    <div v-if="currentPage == 'list'">
      <cjm-list ref="list" :request-url="requestUrl" :need-base-search="needBaseSearch" :need-advanced-search="needAdvancedSearch" base-search-placeholder="请输入被检单位">
        <div slot="operate">
          <cjm-button @click="newFn" power-code="baseAdd" type="primary">
            <i class="cjm-icon-add"></i>添加执法记录</cjm-button>

        </div>
        <div slot="search">
          <cjm-search-item label="被检单位" search-key="orgID" v-model="search.orgID">
            <!-- <cjm-input v-model="search.farmingTypeId"></cjm-input> -->
            <cjm-select v-model="search.orgID" placeholder="请选择">
              <cjm-option v-for="item in optionsType" :key="item.id" :label="item.name" :value="item.id">
              </cjm-option>
            </cjm-select>

          </cjm-search-item>
          <cjm-search-item label="检查人" search-key="checkName" v-model="search.checkName">
            <cjm-input v-model="search.checkName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="检查时间" search-key="checkTime" v-model="search.checkTime">
            <!-- <cjm-date-picker v-model="search.createTime" ></cjm-date-picker> -->
            <cjm-date-picker v-model="search.checkTime" type="daterange"></cjm-date-picker>
            <!-- <cjm-date-picker placeholder="操作时间" type="datetime" v-model="search.operatorTime"></cjm-date-picker> -->
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="OrgName" label="被检单位" width="180">
          </cjm-table-column>
          <cjm-table-column prop="CreateTime" label="检查时间 " width="280"></cjm-table-column>
          <cjm-table-column prop="Town" label="所在乡镇" width="220" enumName='崇明乡镇' enumNamespace='trace'></cjm-table-column>
          <cjm-table-column prop="ProductionRecordType" label="农产品生产记录" width="180" enumName='崇明检查结果' enumNamespace='trace'>
          </cjm-table-column>
          <cjm-table-column prop="OutgoingType" label="农资进出库记录" min-width="150" enumName='崇明检查结果' enumNamespace='trace'>
          </cjm-table-column>
          <cjm-table-column prop="TestRecordType" label="农产品检测记录" min-width="150" enumName='崇明检查结果' enumNamespace='trace'>
          </cjm-table-column>
          <cjm-table-column prop="ReasonableUseOfInputs" label="合理使用农业投入品" min-width="150" enumName='崇明合理使用农业投入品' enumNamespace='trace'>
          </cjm-table-column>
          <cjm-table-column prop="PackageIdentification" label="农产品包装标识" min-width="150" enumName='崇明检查结果' enumNamespace='trace'>
          </cjm-table-column>
          <cjm-table-column prop="ProcessingZone" label="生产区" min-width="150" enumName='崇明检查结果' enumNamespace='trace'>
          </cjm-table-column>
          <cjm-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <cjm-tooltip content="查看" power-code="baseEdit">
                <cjm-button type="text" @click="lookDetailFn(scope.row)">查看</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="编辑" power-code="baseEdit">
                <cjm-button type="text" @click="baseEdit(scope.row)">编辑</cjm-button>
              </cjm-tooltip>

              <cjm-tooltip content="删除" power-code="baseDelete">
                <cjm-button type="text" @click="deleteConfig(scope.row)">删除</cjm-button>
              </cjm-tooltip>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>

  </div>
</template>

<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import diaglogeidt from './components/diaglogeidt.vue';
import PoorFarmilyImport from './import.vue';
// import fileDownload from 'framework/utils/fileDownload';
export default {
  components: { diaglogeidt, PoorFarmilyImport },
  mixins: [pageSwitch],
  data() {
    return {
      importDialogVisible: false,
      importButtonLoading: false,
      dislogTitle: '选择基地',
      requestUrl: this.$globalData.get('trace', 'apiUrl').Law.LIST,
      currentPage: 'list',
      addResetDialogVisible: false,
      dialogVisible: false,
      needBaseSearch: true,
      needAdvancedSearch: true,
      optionsType: [],
      search: {
        orgID: '',
        checkName: '',
        farmingTypeId: '',
        operatorName: '',
        checkTime: '',
        baseCode: '',
        orgName: '',
        createTime: '',
        baseName: ''
      }
    };
  },
  mounted() {
    this.showList();
  },
  methods: {
    lookDetailFn(row) {
      this.$refs.diaglogeidt.show(row, 3);
    },
    showAddEdit(data) {
      this.$refs.diaglogeidt.show(data);
    },
    saveInfo() {
      this.$refs.list.refresh();
    },
    newFn() {
      this.$refs.diaglogeidt.show('lct', 1);
    },
    baseEdit(row) {
      this.$refs.diaglogeidt.show(row, 2);
    },
    async showList() {
      let url = this.$globalData.get('trace', 'apiUrl').Law.TOWNORG;
      let dataObj = { pageSize: 50 };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);
      if (err) {
      } else {
        this.optionsType = res.data;
      }
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    },
    deleteConfig(row) {
      this.$confirm('确认删除？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.$globalData.get('trace', 'apiUrl').Law.DELETE, {
              id: row.LawEnforcementRecordID
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$refs.list.refresh();
                // this.disabled = false;
              } else {
                this.$message.error(r.msg);
              }
            });
        })
        .catch(() => {});
    }
  },
  created() {}
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.fo12 {
  font-size: 12px;
  color: #ccc;
}
</style>

