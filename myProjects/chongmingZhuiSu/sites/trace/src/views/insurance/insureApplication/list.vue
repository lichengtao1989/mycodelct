<template>
  <div :class="applicationList">
    <div v-if="currentPage==='list'">
      <policy-data v-if="policyDataShow"></policy-data>
      <cjm-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true" base-search-placeholder="机构、机构编号" ref="list">
        <div slot="operate">
          <cjm-button type="primary" @click="exportData">
            <i class="cjm-icon-export"></i>导出</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="保险类型" search-key="insureType" v-model="search.insureType" style="width:100%;">
            <cjm-checkbox v-model="isCheckAll" @change="checkAll" style="float: left;margin-right: 10px; ">全选</cjm-checkbox>
            <cjm-checkbox-group v-model="insureTypeArr">
              <cjm-checkbox v-for="(value,key) in insurance" :key="key" :label="value">{{key}}</cjm-checkbox>
            </cjm-checkbox-group>
          </cjm-search-item>
          <cjm-search-item label="申请状态" search-key="insureStatus" v-model="search.insureStatus" style="width:100%;">
            <cjm-checkbox v-model="isCheckStatusAll" @change="checkStatusAll" style="float: left;margin-right: 10px; ">全选</cjm-checkbox>
            <cjm-checkbox-group v-model="insureStatusArr">
              <cjm-checkbox v-for="(value,key) in insureStatusType" :key="key" v-if="($globalData.get('currentUser').corpType == 5 && value != 0) || ($globalData.get('currentUser').corpType != 5)" :label="value">{{key}}</cjm-checkbox>
            </cjm-checkbox-group>
          </cjm-search-item>
          <cjm-search-item label="申请日期" search-key="lastUpdateTime" v-model="search.lastUpdateTime">
            <cjm-date-picker v-model="search.lastUpdateTime" type="daterange"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="机构" search-key="orgName" v-model="search.orgName">
            <cjm-input v-model="search.orgName"></cjm-input>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="insureCompany" min-width="120" label="保险公司" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="orgName" min-width="120" label="机构" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="insureCode" width="100" label="保单号" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="insureTypeName" width="120" label="保险类型" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="totalInsurance" width="120" label="合计保费" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="activateEffectiveDate" width="150" label="激活截止期" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="effectiveDate" width="170" label="投保生效日" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="expiryDate" width="170" label="投保失效日" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="insureStatusName" width="110" label="状态" sortable="custom">
            <template slot-scope="scope">
              <span v-if="scope.row.insureStatus==2" style="color:#e74c3c;">审核未通过</span>
              <span v-if="scope.row.insureStatus==4" style="color:#e74c3c;">承保失败
              </span>
              <span v-if="scope.row.insureStatus==1" style="color:#8492A6;">审核中
              </span>
              <span v-if="scope.row.insureStatus==5" style="color:#3cd66d;">已承保
              </span>
              <span v-if="scope.row.insureStatus==0" style="color:#8492A6;">草稿
              </span>
              <span v-if="scope.row.insureStatus==3" style="color:#8492A6;">审核通过
              </span>
            </template>
          </cjm-table-column>
          <cjm-table-column prop="lastUpdateTime" width="170" label="申请日期" sortable="custom"></cjm-table-column>
          <cjm-table-column label="操作" width="250" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text" v-if="editBnt(scope.row)" @click="edit(scope.row.insureID, scope.row.isInsureLogin, 'edit')">编辑</cjm-button>
              <cjm-button type="text" v-if="viewBnt(scope.row)" @click="edit(scope.row.insureID, scope.row.isInsureLogin, 'view')">查看
              </cjm-button>
              <cjm-button type="text" v-if="deleteBnt(scope.row)" @click="deleteInsure(scope.row.insureID)">删除
              </cjm-button>
              <cjm-button type="text" v-if="activationBnt(scope.row)" @click="activation(scope.row.insureID)">激活
              </cjm-button>
              <span v-if="activationFailureBnt(scope.row)" style="color:#8492A6;padding-left:10px;">激活过期
              </span>
              <span v-if="activatedBnt(scope.row)" style="color:#8492A6;padding-left:10px;">已激活
              </span>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
      <cjm-dialog title="提示" :visible.sync="activationDialog" :okHandler="dialogConfirm" class="small">
        <activation ref="activationForm"></activation>
      </cjm-dialog>
    </div>
    <div v-if="currentPage=='edit'">
      <application ref="application"></application>
    </div>
  </div>
</template>

<script>
import fileDownload from 'framework/utils/fileDownload';
// import routerUtil from 'framework/utils/router';
import activation from './activation.vue';
import policyData from './policy-data.vue';
import application from './application.vue';
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  mixins: [pageSwitch],
  components: {
    activation: activation,
    policyData: policyData,
    application
  },
  data() {
    return {
      isCheckAll: false,
      isCheckStatusAll: false,
      insureTypeArr: [],
      insureStatusArr: [],
      activationDialog: false,
      search: {
        insureType: '',
        insureStatus: '',
        lastUpdateTime: '',
        orgName: ''
      },
      requestUrl: this.$globalData.get('trace', 'apiUrl').insurance.insureApplication.GET_LIST,
      currentPage: 'list'
    };
  },
  computed: {
    insurance() {
      return this.$globalData.get('trace', 'enums')['保险类型'];
    },
    insureStatusType() {
      return this.$globalData.get('trace', 'enums')['审核状态'];
    },
    applicationList() {
      if (this.$globalData.get('currentUser').corpType != 5) {
        return 'application-list';
      }
    },
    policyDataShow() {
      //数据分析卡片
      const powerCodes = this.$globalData.get('powerCodes');
      if (powerCodes && !powerCodes.includes('policyData'.toLowerCase())) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    insureTypeArr: function() {
      if (this.insureTypeArr.length > 0) {
        this.search.insureType = this.insureTypeArr.join(',');
        if (this.insureTypeArr.length == 2) {
          this.isCheckAll = true;
        } else {
          this.isCheckAll = false;
        }
      } else {
        this.search.insureType = '';
      }
    },
    'search.insureType': function() {
      if (this.search.insureType != '') {
        this.insureTypeArr = this.search.insureType.split(',');
      } else {
        this.insureTypeArr = [];
        this.isCheckAll = false;
      }
    },
    insureStatusArr: function() {
      if (this.insureStatusArr.length > 0) {
        this.search.insureStatus = this.insureStatusArr.join(',');
        if ((this.$globalData.get('currentUser').corpType == 5 && this.insureStatusArr.length == 5) || this.insureStatusArr.length == 6) {
          this.isCheckStatusAll = true;
        } else {
          this.isCheckStatusAll = false;
        }
      } else {
        this.search.insureStatus = '';
      }
    },
    'search.insureStatus': function() {
      if (this.search.insureStatus != '') {
        this.insureStatusArr = this.search.insureStatus.split(',');
      } else {
        this.insureStatusArr = [];
        this.isCheckStatusAll = false;
      }
    }
  },
  methods: {
    checkAll(event) {
      if (event) {
        this.insureTypeArr = ['1', '2'];
      } else {
        this.insureTypeArr = [];
      }
    },
    checkStatusAll(event) {
      if (event) {
        if (this.$globalData.get('currentUser').corpType == 5) {
          this.insureStatusArr = ['1', '2', '3', '4', '5'];
        } else {
          this.insureStatusArr = ['0', '1', '2', '3', '4', '5'];
        }
      } else {
        this.insureStatusArr = [];
      }
    },
    //是否显示编辑按钮
    editBnt(row) {
      //保险审核中/审核未通过/审核通过、承保失败row.isInsureLogin：1 保险公司
      if (row.isInsureLogin == '1') {
        if (row.insureStatus != 0 && row.insureStatus != 5) {
          return true;
        }
      } else {
        //草稿、审核未通过
        if (row.insureStatus == 0 || row.insureStatus == 2) {
          return true;
        }
      }
    },
    //是否显示查看按钮
    viewBnt(row) {
      //保险已承保
      if (row.isInsureLogin == '1') {
        if (row.insureStatus == 5) {
          return true;
        }
      } else if (row.isInsureLogin != '1') {
        //审核中、审核通过、承保失败、已承保
        if (row.insureStatus != 0 && row.insureStatus != 2) {
          return true;
        }
      }
    },
    //是否显示删除按钮
    deleteBnt(row) {
      //企业:草稿、审核失败、承保失败的单子，可以删除
      if (row.isInsureLogin != '1') {
        if (row.insureStatus == 0 || row.insureStatus == 2 || row.insureStatus == 4) {
          return true;
        }
      }
    },
    //是否显示激活按钮
    activationBnt(row) {
      //企业激活：激活有效期内，激活日为null，并且已承保的单子，才能显示激活按钮
      if (row.isInsureLogin != 1 && row.insureStatus == 5 && row.currentOrgID == row.orgID) {
        if (row.effectiveDate == null || row.effectiveDate == '') {
          let oData1 = new Date(row.activateEffectiveDate.replace(/\-/g, '/'));
          let oData2 = new Date();
          if (oData1 > oData2) {
            return true;
          }
        }
      }
    },
    //激活过期
    activationFailureBnt(row) {
      if (row.isInsureLogin != 1 && row.insureStatus == 5 && row.currentOrgID == row.orgID) {
        if (row.activateEffectiveDate != null && row.activateEffectiveDate != '') {
          let oData1 = new Date(row.activateEffectiveDate.replace(/\-/g, '/'));
          let oData2 = new Date();
          if (row.activationDate == null || row.activationDate == '') {
            if (oData1 < oData2) {
              return true;
            }
          }
        }
      }
    },
    //已激活
    activatedBnt(row) {
      if (row.isInsureLogin != 1) {
        if (row.activationDate != null && row.activationDate != '') {
          return true;
        }
      }
    },
    //查看保单
    view(id, isInsureLogin) {},
    //删除保单
    deleteInsure(id) {
      this.$confirm('确认要删除？', '提示', { type: 'warning' }).then(() => {
        this.$ajax
          .post(this.$globalData.get('trace', 'apiUrl').insurance.insureApplication.DELETE_INSURE, {
            insureID: id
          })
          .then(r => {
            if (r.resultCode == 200) {
              this.$refs.list.refresh();
            } else {
              this.$message.error(r.msg);
            }
          });
      });
    },
    //激活保单
    activation(id) {
      this.activationDialog = true;
      this.$nextTick(() => {
        this.$refs.activationForm.init(id);
      });
    },
    edit(id, isInsureLogin, pageType) {
      this.pushPage('edit', '投保申请', { insureID: id, pageType: pageType, isInsureLogin: isInsureLogin });
    },
    deployMenu(id) {
      window.open(`page.html#/system/menuEdit?id=${id}`);
    },
    //导出
    exportData() {
      fileDownload(this.$globalData.get('trace', 'apiUrl').insurance.insureApplication.EXPORT_INSURE, this.$refs.list.getConditions());
    },
    dialogConfirm(callback) {
      this.$refs.activationForm
        .submit()
        .then(() => {
          this.$message.success('激活成功');
          this.activationDialog = false;
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
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    }
  },
  created() {}
};
</script>
<style scoped>
.export-data {
  float: right;
  margin-bottom: 20px;
  position: relative;
  z-index: 1000;
}
</style>
<style>
.application-list .cjm-list-handleBar {
  margin-top: -30px;
  float: left;
  width: 100%;
  z-index: 9999;
}
</style>
