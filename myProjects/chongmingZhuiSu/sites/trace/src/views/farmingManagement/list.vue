<template>
  <div class="lctysx">
    <dialog-type ref="dialogtype" @typeSubmit="typeSubmit"></dialog-type>
    <dialog-jd ref="dialogJd" @jumpNext="showAddEdit">

    </dialog-jd>

    <diaglogeidt ref="diaglogeidt" @saveInfo="saveInfo"></diaglogeidt>
    <!-- 导入弹框 -->
    <cjm-dialog title="导入农事记录" :visible.sync="importDialogVisible" :height="500">
      <poorFarmily-import ref="import" @successImport="successImport"></poorFarmily-import>
      <div slot="footer">
        <cjm-button type="primary" @click="importConfirm" :loading="importButtonLoading">
          <i class="cjm-icon-import"></i>导入
        </cjm-button>
        <cjm-button @click="importCancel" :disabled="importButtonLoading">
          <i class="cjm-icon-close"></i>取消
        </cjm-button>
      </div>
    </cjm-dialog>
    <div v-if="currentPage == 'list'">
      <cjm-list ref="list" :request-url="requestUrl" :need-base-search="needBaseSearch" :need-advanced-search="needAdvancedSearch" base-search-placeholder="请输入区域名称、农事类型、操作人姓名">
        <div slot="operate">
          <cjm-button @click="newFn" power-code="baseAdd" type="primary">
            <i class="cjm-icon-add"></i>新建</cjm-button>
          <cjm-button @click="newTypeFn" power-code="baseAdd">
            <i class="cjm-icon-type"></i>农事类型</cjm-button>
          <cjm-button power-code="baseAdd" @click="importData">
            <i class="cjm-icon-import"></i>导入</cjm-button>
          <cjm-button power-code="baseAdd" @click="exportData">
            <i class="cjm-icon-export"></i>导出</cjm-button>
          <cjm-button power-code="baseAdd" @click="downloadTemplate">
            <i class="cjm-icon-download"></i>下载模板</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="农事类型" search-key="typeName" v-model="search.typeName">
            <!-- <cjm-input v-model="search.farmingTypeId"></cjm-input> -->
            <cjm-select v-model="search.typeName" placeholder="">
              <cjm-option v-for="item in optionsType" :key="item.value" :label="item.typeName" :value="item.typeName">
              </cjm-option>
            </cjm-select>

          </cjm-search-item>
          <cjm-search-item label=" 操作人" search-key="operatorName" v-model="search.operatorName">
            <cjm-input v-model="search.operatorName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="创建时间" search-key="operatorTime" v-model="search.operatorTime">
            <!-- <cjm-date-picker v-model="search.createTime" ></cjm-date-picker> -->
            <cjm-date-picker v-model="search.operatorTime" type="daterange"></cjm-date-picker>
            <!-- <cjm-date-picker placeholder="操作时间" type="datetime" v-model="search.operatorTime"></cjm-date-picker> -->
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="baseAreaName" label="区域" width="180" sortable="custom">
            <template slot-scope="scope">
              <div> {{scope.row.plotsName}}</div>
              <div class="fo12"> {{scope.row.baseAreaName}}</div>

            </template>
          </cjm-table-column>
          <cjm-table-column prop="typeName" label="农事类型 " width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="operatorName" label="操作人" width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="" label="操作工时" width="110">
            <template slot-scope="scope">
              {{scope.row.workHour}}{{scope.row.workHourUnit}}
            </template>
          </cjm-table-column>
          <cjm-table-column prop="" label="操作面积" min-width="110">
            <template slot-scope="scope">
              {{scope.row.area}}{{scope.row.areaUnit}}
            </template>
          </cjm-table-column>
          <cjm-table-column prop="invetoryRemark" label="投入品及使用量" min-width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="remark" label="备注" min-width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="operatorTime" label="操作时间" min-width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column label="操作" width="250" fixed="right">
            <template slot-scope="scope">

              <cjm-tooltip content="编辑" power-code="baseEdit" v-if="scope.row.status==1">
                <cjm-button type="text" @click="baseEdit(scope.row)">编辑</cjm-button>
              </cjm-tooltip>

              <cjm-tooltip content="删除" power-code="baseDelete" v-if="scope.row.status==1">
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
import dialogJd from './components/dialogInfo';
import dialogType from './components/dialogtype';
import diaglogeidt from './components/diaglogeidt.vue';
import PoorFarmilyImport from './import.vue';
import fileDownload from 'framework/utils/fileDownload';
export default {
  components: { dialogJd, diaglogeidt, dialogType, PoorFarmilyImport },
  mixins: [pageSwitch],
  data() {
    return {
      importDialogVisible: false,
      importButtonLoading: false,
      dislogTitle: '选择基地',
      requestUrl: this.$globalData.get('trace', 'apiUrl').FarmingManagement.LIST,
      currentPage: 'list',
      addResetDialogVisible: false,
      dialogVisible: false,
      needBaseSearch: true,
      needAdvancedSearch: true,
      optionsType: [],
      search: {
        typeName: '',
        farmingTypeId: '',
        operatorName: '',
        operatorTime: '',
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
    successImport() {
      this.importDialogVisible = false;
    },
    async showList() {
      let url = this.$globalData.get('trace', 'apiUrl').FarmingManagement.TYPELIST;
      let dataObj = { pageSize: 100, pageNum: 1 };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);
      // console.log(err, res);
      if (err) {
        console.log(err);
      } else {
        this.optionsType = res.data.rows;
      }
    },
    //导入
    importData() {
      this.importDialogVisible = true;
      console.log(this.$refs.import);
      this.$nextTick(() => {
        this.$refs.import.addForm();
      });
    },
    //导入确认
    importConfirm() {
      this.importButtonLoading = true;
      this.$refs.import
        .submit()
        .then(() => {
          this.importButtonLoading = false;
          this.$refs.list.refresh();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          this.importButtonLoading = false;
        });
    },
    importCancel() {
      this.importDialogVisible = false;
    },
    //下载模板
    downloadTemplate() {
      fileDownload(this.$globalData.get('other', 'appConfig').FarmingManagement);
      // console.log(this.$globalData.get('other', 'appConfig'))
    },
    exportData() {
      fileDownload(this.$globalData.get('trace', 'apiUrl').FarmingManagement.EXPORT, this.$refs.list.getConditions());
    },
    typeSubmit(info) {},
    newTypeFn() {
      this.$refs.dialogtype.show();
    },
    refreshTypeFn() {},
    showAddEdit(data) {
      this.$refs.diaglogeidt.show(data);
    },
    saveInfo() {
      this.$refs.list.refresh();
    },
    newFn() {
      this.$refs.dialogJd.show();
    },
    baseEdit(row) {
      // this.pushPage('editBase', '新建基地', { baseID: row.baseID, pageType: 'edit' });
      this.$refs.diaglogeidt.show(row);
    },

    confirm(callback) {
      this.$refs.editConfig
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    approval(row) {},
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    },
    setStatus(id, status) {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').baseManagement.UPDATE_STATUS, {
          baseID: id,
          status: status
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.$refs.list.refresh();
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    deleteConfig(row) {
      this.$confirm('确认删除？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.$globalData.get('trace', 'apiUrl').FarmingManagement.DELETE, {
              Id: row.farmingId
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
<style rel='stylesheet/less' lang='less' >
.lctysx {
  .cjm-search {
    .cjm-search-input {
      width: 220px !important;
    }
  }
}
</style>

