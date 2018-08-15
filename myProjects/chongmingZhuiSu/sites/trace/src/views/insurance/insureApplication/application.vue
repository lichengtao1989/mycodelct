<template>
  <div class="cjm-edit-page">
    <cjm-steps :active="activeStep">
      <cjm-step v-for="item in steps" :title="item.value" :key="item.key" :description="item.description"></cjm-step>
    </cjm-steps>
    <cjm-form ref="form" :model="form" :rules="rules" style="margin-top: 30px;" v-if="currentPage=='application'">
      <div class="audit-description failCause" v-if="currentPageInfo.isInsureLogin != 1 && (form.insureStatus==2 ||form.insureStatus==4)">审核意见:{{form.insureAuditRecord[0].failCause}}</div>
      <div class="approval-result" v-if="currentPageInfo.isInsureLogin != 1 && form.insureStatus==3">
        <ul class="inner-result zoom">
          <li>
            <p>恭喜审核通过，请打款至{{form.insureCompany}}银行账户。</p>
            <p>确认打款成功后，我们将为您创建保单号。</p>
          </li>
          <li>
            <div class="account-info">{{form.insureCompany}}账户信息</div>
            <div class="account-info insureCropInfo">{{examinationPassedVal.account}}<br>{{examinationPassedVal.bank}}<br>{{examinationPassedVal.accountNumber}}</div>
          </li>
        </ul>
      </div>
      <div class="audit-description" v-if="currentPageInfo.isInsureLogin != '1' && form.insureStatus=='5'">
        <ul class="underwriting zoom">
          <li>
            <p>恭喜您的订单已承保，保单号{{form.insureCode}}
              <i class="cjm-icon-pdf" style="color:#20a0ff;cursor: pointer;" v-show="form.policyPdf.length > 0" @click="downloadPolicy"></i>
              <span class="interval" v-show="form.activateEffectiveDate">请尽快激活保险，激活截止期：{{form.activateEffectiveDate}}</span>
            </p>
          </li>
          <li>
            <p>
              <span v-if="form.presentAmount !='' && form.presentAmount !=null">优惠金额：{{form.presentAmount}}元</span>
              <span v-if="form.presentQuanty !='' && form.presentQuanty !=null">赠送码数：{{form.presentQuanty}}</span>
            </p>
          </li>
        </ul>
      </div>
      <h1 class="cjm-h1">险种选择</h1>
      <insurance-options :form="form" :rules="rules" @query="query" @getProductSelectList="getProductSelectList" :currentPageInfo="currentPageInfo" @getInsureBasicConfig="getInsureBasicConfig" class="clear"></insurance-options>
      <h1 class="cjm-h1">被保险人基本情况</h1>
      <insurance-basic-info :form="form" :rules="rules" class="clear" @getProductSelectList="getProductSelectList" :currentPageInfo="currentPageInfo" @getInsureBasicConfig="getInsureBasicConfig"></insurance-basic-info>
      <h1 class="cjm-h1">投保详情</h1>
      <insurance-details :form="form" :rules="rules" class="clear" :productSelectList="productSelectList" :currentPageInfo="currentPageInfo"></insurance-details>
      <h1 class="cjm-h1" v-if="currentPageInfo.isInsureLogin == 1">审核操作</h1>
      <operational-review :form="form" :rules="rules" class="clear" v-if="currentPageInfo.isInsureLogin == 1" :auditForm="auditForm" :currentPageInfo="currentPageInfo"></operational-review>
      <div class="agree-clause" v-if="currentPageInfo.isInsureLogin != 1">
        <cjm-checkbox v-model="agree" :disabled="currentPageInfo.pageType=='view'"></cjm-checkbox> 本人已充分了解本保险产品，并承诺投保信息的真实性，理解并同意
        <a href="javascript:void(0);" class="detail" @click="query(3)">投保须知</a>和
        <a href="javascript:void(0);" class="detail" @click="query(4)">保险条款</a>
      </div>
      <h1 class="cjm-h1" v-if="currentPageInfo.isInsureLogin == 1">审核日志</h1>
      <operational-log :form="form" :rules="rules" v-if="currentPageInfo.isInsureLogin == 1" :currentPageInfo="currentPageInfo"></operational-log>
      <div class="cjm-page-bottom-bar" v-if="currentPageInfo.isInsureLogin != 1">
        <cjm-button type="primary" @click="save('submit')" :loading="submitLoading" v-if="currentPageInfo.pageType!='view'">
          <i class="cjm-icon-confirm"></i>提交
        </cjm-button>
        <cjm-button @click="save()" :loading="submitLoading" v-if="currentPageInfo.pageType!='view'">
          <i class="cjm-icon-save"></i>保存草稿
        </cjm-button>
        <cjm-button @click="popPage" v-if="currentPageInfo.pageType==='view'">
          <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
      </div>
      <div class="cjm-page-bottom-bar" v-if="currentPageInfo.isInsureLogin == 1">
        <cjm-button type="primary" @click="auditSave()" :loading="submitLoading" v-if="currentPageInfo.pageType!='view'">
          <i class="cjm-icon-confirm"></i>审核
        </cjm-button>
        <cjm-button @click="popPage">
          <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
      </div>
    </cjm-form>
    <div class="submit-success" v-if="currentPage=='submitSuccess'">
      <div class="submit-success-img"><img src="static/images/trace-success.png" alt=""></div>
      <div class="submit-success-info">
        <span style="color:#20a1ff;font-size:16px;">提交成功！</span><br/>
        <span>您的保单已发送至保险公司，保险公司将在{{auditDate}}个工作日被反馈，请耐心等待~</span>
      </div>
      <div class="submit-success-btn">
        <cjm-button type="primary" @click="continueInsure">继续投保
        </cjm-button>
        <cjm-button @click="popPage">进入投保列表</cjm-button>
      </div>
    </div>
    <cjm-dialog :title="titleDialog" :visible.sync="termsDialogVisible" :height="600">
      <terms ref="terms"></terms>
      <div slot='footer'>
        <cjm-button type="primary" @click="submit">确定</cjm-button>
      </div>
    </cjm-dialog>
  </div>
</template>

<script>
import Terms from './terms.vue';
import insuranceOptions from './components/insurance-options.vue';
import insuranceBasicInfo from './components/insurance-basic-info.vue';
import insuranceDetails from './components/insurance-details.vue';
import operationalReview from './components/operational-review.vue';
import operationalLog from './components/operational-log.vue';
import routerUtil from 'framework/utils/router';
import pageSwitch from 'framework/mixins/pageSwitch';
import fileDownload from 'framework/utils/fileDownload';
let allSteps = {
  audit: '提交保险公司审核',
  examinationPassed: '审核通过/审核未通过',
  //fightMoney: '线下打款',
  underwriting: '已承保/承保失败'
};
export default {
  mixins: [pageSwitch],
  components: {
    Terms,
    insuranceOptions,
    insuranceBasicInfo,
    insuranceDetails,
    operationalReview,
    operationalLog
  },
  data() {
    return {
      //当前的步骤，从0开始
      enums: this.$globalData.get('trace', 'enums'),
      apiUrl: this.$globalData.get('trace', 'apiUrl'),
      activeStep: 0,
      submitLoading: false,
      orgList: [],
      insureType: '',
      currentPage: 'application',
      agree: true,
      form: {
        type: '',
        insureID: '',
        insureCorpID: '',
        insureCompany: '',
        insureType: 0,
        orgID: '',
        orgName: '',
        orgCode: '',
        address: '',
        email: '',
        insureStatus: '0',
        contactName: '',
        contactPhone: '',
        refereerName: '',
        refereerPhone: '',
        businessLicenseImg: '',
        totalInsurance: '',
        testingReportImg: [],
        activateEffectiveDate: [],
        insureApplicationDetail: {
          detailID: '',
          premium: '',
          productID: [],
          productName: '',
          productNumber: '',
          productSell: '',
          insureType: ''
        },
        insureAuditRecord: [
          {
            auditStatus: '',
            failCause: '',
            auditTime: '',
            loginName: '',
            userName: ''
          }
        ]
      },
      auditForm: {
        insureID: '',
        insureStatus: '3',
        note: '',
        lastUpdateTime: 0,
        presentAmount: '',
        presentQuanty: '',
        policyPdf: [],
        productID: []
      },
      allSteps: allSteps,
      steps: [{ key: Math.random(), value: allSteps.audit, description: '' }, { key: Math.random(), value: allSteps.examinationPassed, description: '' }, { key: Math.random(), value: allSteps.underwriting, description: '' }],
      //完整的步骤
      titleDialog: '投保条款',
      auditDate: '1',
      termsDialogVisible: false,
      rules: {},
      currentPageInfo: {
        pageType: '',
        isInsureLogin: ''
      },
      examinationPassedInfo: [
        {
          account: '户名: 中国平安财产保险股份有限公司广东分公司',
          bank: '开户银行: 中国工商银行广州红棉支行',
          accountNumber: '账号: 3602014329200046626'
        },
        {
          account: '户名: 中华联合财产保险股份有限公司浙江分公司',
          bank: '开户银行: 工行开元支行',
          accountNumber: '账号: 1202021519900042686'
        }
      ],
      productSelectList: []
    };
  },
  computed: {
    insurance() {
      return this.enums['保险类型'];
    },
    examinationPassedVal() {
      if (this.form.insureCompany.indexOf('平安') < 0) {
        return this.examinationPassedInfo[1];
      } else {
        return this.examinationPassedInfo[0];
      }
    }
  },
  methods: {
    submit() {
      this.termsDialogVisible = false;
    },
    popPage() {
      routerUtil.push('insureApplicationList');
    },
    continueInsure() {
      this.currentPage = 'application';
      this.agree = true;
      this.activeStep = 0;
      this.submitLoading = false;
      this.orgList = [];
      this.insureType = '';
      this.productSelectList = [];
      this.form = {
        type: '',
        insureID: '',
        insureCorpID: '',
        insureCompany: '',
        insureType: 0,
        orgID: '',
        orgName: '',
        orgCode: '',
        address: '',
        email: '',
        insureStatus: '0',
        contactName: '',
        contactPhone: '',
        refereerName: '',
        refereerPhone: '',
        businessLicenseImg: '',
        totalInsurance: '',
        testingReportImg: [],
        activateEffectiveDate: [],
        policyPdf: [],
        insureApplicationDetail: {
          detailID: '',
          premium: '',
          productID: [],
          productName: '',
          productNumber: '',
          productSell: '',
          insureType: ''
        },
        insureAuditRecord: [
          {
            auditStatus: '',
            failCause: '',
            auditTime: '',
            loginName: '',
            userName: ''
          }
        ]
      };
    },
    query(id) {
      let insureType = 1;
      if ((id == 3 || id == 4) && (this.form.insureCorpID == '' || this.form.insureType == '' || this.form.insureType == 0)) {
        this.$message.info('请选择保险公司');
        return;
      }
      if (this.form.insureCorpID != '') {
        //1: 综合险，2基本险，3投保须知，4保险条款
        let titleDialog = {
          1: '投保介绍',
          2: '投保介绍',
          3: '投保须知',
          4: '保险条款'
        };
        this.titleDialog = titleDialog[id];
        this.termsDialogVisible = true;
        if (id == 2 || id == 1) {
          insureType = id;
        } else {
          insureType = this.form.insureType;
        }
        this.$nextTick(() => {
          this.$refs.terms.addForm(id, insureType, this.form.insureCompany);
        });
      } else {
        this.$message.info('请选择保险公司');
      }
    },
    //投保申请单详情
    getInsureApplication(insureID) {
      this.$ajax.get(this.apiUrl.insurance.insureApplication.GET_INSURE_APPLICATION, { insureID: insureID }).then(r => {
        if (r.resultCode == 200) {
          this.form = r.data;
          let self = this;
          this.form.insureApplicationDetail.insureType = Object.keys(self.insurance).find(key => self.insurance[key] == self.form.insureType);
          if (this.form.policyPdf.length > 0) {
            this.auditForm.policyPdf = this.form.policyPdf;
          }
          let lastUpdateTime = '';
          let auditPassedTime = '';
          let auditNotPassedTime = '';
          let underwritingFailedTime = '';
          let underwritingSuccessTime = '';
          if (this.form.insureAuditRecord && this.form.insureAuditRecord != null && this.form.insureAuditRecord.length > 0) {
            this.auditForm.note = this.form.insureAuditRecord[0].failCause;
            this.auditForm.insureStatus = this.form.insureAuditRecord[0].auditStatus;
            this.form.insureAuditRecord.forEach(x => {
              if (auditPassedTime == '' && x.auditStatus == '3') {
                auditPassedTime = x.auditTime;
              }
              if (auditNotPassedTime == '' && x.auditStatus == '2') {
                auditNotPassedTime = x.auditTime;
              }
              if (underwritingFailedTime == '' && x.auditStatus == '4') {
                underwritingFailedTime = x.auditTime;
              }
              if (underwritingSuccessTime == '' && x.auditStatus == '5') {
                underwritingSuccessTime = x.auditTime;
              }
            });
          } else {
            if (this.form.insureStatus != null) {
              this.auditForm.insureStatus = this.form.insureStatus;
            }
          }
          if (this.form.lastUpdateTime != '' && this.form.lastUpdateTime != null) {
            lastUpdateTime = this.form.lastUpdateTime;
          }
          this.steps[0].value = `提交保险公司审核`;
          this.steps[0].description = lastUpdateTime;
          if (this.form.insureStatus != null) {
            if (this.form.insureStatus == 3) {
              this.activeStep = 1;
              this.steps[1].value = `审核通过`;
              this.steps[1].description = auditPassedTime;
            } else if (this.form.insureStatus == 2) {
              this.activeStep = 1;
              this.steps[1].value = `审核未通过`;
              this.steps[1].description = auditNotPassedTime;
            } else if (this.form.insureStatus == 1) {
              this.activeStep = 1;
              this.steps[1].value = '审核中';
              this.auditForm.productID = this.form.insureApplicationDetail.productID;
            } else if (this.form.insureStatus == 5) {
              this.activeStep = 2;
              this.steps[1].value = `审核通过`;
              this.steps[1].description = auditPassedTime;
              this.steps[2].value = `已承保`;
              this.steps[2].description = underwritingSuccessTime;
              this.auditForm.note = this.form.insureCode;
              this.auditForm.presentAmount = this.form.presentAmount;
              this.auditForm.presentQuanty = this.form.insureApplicationDetail.presentQuanty;
              this.form.presentQuanty = this.form.insureApplicationDetail.presentQuanty;
              this.auditForm.productDetail = this.form.insureApplicationDetail;
            } else if (this.form.insureStatus == 4) {
              this.activeStep = 2;
              this.steps[2].value = `承保失败`;
              this.steps[2].description = underwritingFailedTime;
            }
          }
          if (this.form.insureStatus != null && this.form.insureStatus == 0) {
            if (this.form.insureType > 0 && this.form.insureCorpID != '') {
              this.getProductSelectList();
            }
          }
        } else {
          this.$message.error(r.msg);
        }
      });
    },
    verificationRules() {
      let flag = true;
      if (this.form.insureCorpID == '') {
        this.$message('请选择保险公司');
        flag = false;
      } else if (this.form.insureType == 0) {
        this.$message('请选择险种');
        flag = false;
      } else if (this.form.orgID == '') {
        this.$message('请选择机构');
        flag = false;
      } else if (this.form.address == '') {
        this.$message('请填写详细地址');
        flag = false;
      } else if (this.form.email == '' || !this.verifyEmail(this.form.email)) {
        this.$message('请填写正确的邮箱地址');
        flag = false;
      } else if (this.form.contactName == '' || this.form.contactName.length > 20) {
        this.$message('请填写正确联系人姓名');
        flag = false;
      } else if (this.form.contactPhone == '') {
        this.$message('请填写联系电话');
        flag = false;
      } else if (this.form.refereerName && this.form.refereerName != '' && this.form.refereerName.length > 20) {
        this.$message('请输入少于20个字符的姓名');
        flag = false;
      } else if (this.form.businessLicenseImg == '' || this.form.businessLicenseImg == undefined) {
        this.$message('请上传营业执照');
        flag = false;
      } else if (!this.agree) {
        this.$message('请先勾选同意书');
        flag = false;
      } else if (this.form.insureApplicationDetail.productID.length == 0) {
        this.$message('请选择投保产品');
        flag = false;
      } else if (this.form.insureApplicationDetail.productNumber == '' || parseInt(this.form.insureApplicationDetail.productNumber) < 0) {
        this.$message('请输入正确的投保数量');
        flag = false;
      } else if (!/^\-?\d+?$/.test(this.form.insureApplicationDetail.productNumber)) {
        this.$message('请输入正确的投保数量');
        flag = false;
      }
      return flag;
    },
    //保存草稿--提交
    save(submit) {
      this.form.insureAuditRecord = [];
      if (submit == 'submit') {
        if (!this.verificationRules()) {
          return false;
        }
        this.form.type = 'submit';
      }
      this.submitLoading = true;
      this.$ajax.post(this.apiUrl.insurance.insureApplication.SAVE, this.form).then(r => {
        if (r.resultCode === '200') {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          if (submit == 'submit') {
            if (this.form.insureCompany.indexOf('平安') < 0) {
              this.auditDate = '3';
            } else {
              this.auditDate = '1';
            }
            this.currentPage = 'submitSuccess';
            this.activeStep = 1;
            allSteps.examinationPassed = '审核中';
            this.steps[1].value = '审核中';
          } else {
            routerUtil.push('insureApplicationList');
          }
        } else {
          this.$message(r.msg);
          this.submitLoading = false;
        }
      });
    },
    verificationAuditRules() {
      let flag = true;
      this.auditForm.lastUpdateTime = this.form.lastUpdateTime;
      if (this.auditForm.insureStatus < 2) {
        this.$message('请选择审核结果');
        flag = false;
      }
      if ((this.auditForm.insureStatus == 2 || this.auditForm.insureStatus == 4) && this.auditForm.note == '') {
        this.$message('请输入审核结果描述');
        flag = false;
      }
      if (this.auditForm.insureStatus == 5 && this.auditForm.note == '') {
        this.$message('请输入正确的保单号');
        flag = false;
      }
      if (this.auditForm.insureStatus == 5 && this.auditForm.policyPdf.length == 0) {
        this.$message('请上传保单');
        flag = false;
      }
      if (this.auditForm.productDetail) {
        let self = this;
        if (this.auditForm.productID != '' && this.auditForm.presentQuanty <= 0) {
          self.$message('请选择正确的数量');
          flag = false;
        }
      }
      return flag;
    },
    //保险公司：审核
    auditSave() {
      if (this.verificationAuditRules()) {
        this.auditForm.productID = this.form.insureApplicationDetail.productID;
        this.submitLoading = true;
        this.$ajax.get(this.apiUrl.insurance.insureApplication.AUDIT, this.auditForm).then(r => {
          if (r.resultCode === '200') {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.popPage();
          } else {
            this.submitLoading = false;
            this.$message(r.msg);
          }
        });
      }
    },
    verifyEmail(strEmail) {
      if (strEmail && strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
      } else {
        return false;
      }
    },
    getInsureBasicConfig(insureType, insureCorpID) {
      if (insureType == 0) {
        this.$message.error('请选择险种');
        return;
      }
      if (insureCorpID > 0) {
        this.$ajax
          .get(this.$globalData.get('trace', 'apiUrl').insurance.insureApplication.GET_INSURE_BASIC_CONFIG, {
            insureType: insureType,
            insureCorpID: insureCorpID
          })
          .then(r => {
            if (r.resultCode == 200) {
              if (r.data != null) {
                this.form.insureApplicationDetail.productSell = r.data.singleCharge;
              } else {
                this.$message.error('请设置正确的码的单价');
              }
            } else {
              this.$message.error(r.msg);
            }
          });
      }
    },
    //所属机构下的，综合险则筛选第三方检测过的上架产品，其他则带出所有上架产品
    getProductSelectList() {
      if (this.form.insureType == '') {
        this.$message.error('请选择险种');
        return;
      }
      if (this.form.orgID == '') {
        this.$message.error('请选择机构');
        return;
      }
      this.$ajax
        .get(this.apiUrl.insurance.insureApplication.GET_PRODUCT_SELECT_LIST, {
          orgID: this.form.orgID,
          insureType: this.form.insureType
        })
        .then(r => {
          if (r.resultCode == 200) {
            if (r.data != null) {
              this.productSelectList = r.data;
            } else {
              if (this.form.insureType == '1') {
                this.$nextTick(() => {
                  this.form.insureType = '2';
                  this.form.insureApplicationDetail.insureType = '基础险';
                  this.$message.error('购买综合险的企业需先进行三方检测项');
                  this.getInsureBasicConfig(this.form.insureType, this.form.insureCorpID);
                });
              }
              this.productSelectList = [];
            }
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    //下载保单号
    downloadPolicy() {
      fileDownload(this.form.policyPdf[0].url, null, this.form.policyPdf[0].name);
    }
  },
  created() {
    if (this.getPageParams('edit') && this.getPageParams('edit').insureID) {
      const pageParams = this.getPageParams('edit');
      this.getInsureApplication(pageParams.insureID);
      this.currentPageInfo.pageType = pageParams.pageType;
      this.currentPageInfo.isInsureLogin = pageParams.isInsureLogin;
    }
  }
};
</script>
<style scoped>
.agree-clause {
  height: 42px;
  line-height: 42px;
  max-width: 1100px;
  margin: 0 auto;
  font-size: 12px;
  padding: 0px 0px 40px 0px;
  float: left;
}
.audit-description {
  float: right;
  width: 100%;
  margin-top: -1px;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 3px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 4px #ddd;
  font-size: 14px;
}
.failCause {
  color: #e74c3c;
}
.approval-result {
  width: 100%;
  margin-top: -1px;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 3px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 4px #ddd;
  font-size: 14px;
  color: rgb(27, 140, 206);
}
.approval-result .inner-result {
  max-width: 800px;
  margin: 0 auto;
}
.approval-result .inner-result li {
  width: 50%;
  float: left;
}
.approval-result .inner-result .account-info:first-child {
  margin-right: 20px;
}
.approval-result .inner-result .account-info {
  vertical-align: top;
  display: inline-block;
}
.underwriting {
  margin: 0 auto;
  color: #20a0ff;
}
.underwriting li {
  width: 100%;
  float: left;
  padding: 5px 0;
}
.interval {
  padding-left: 15px;
}
.submit-success {
  padding: 150px 0 0 20%;
}
.submit-success-img {
  float: left;
  margin-right: 29px;
}
.submit-success-info {
  float: left;
  padding: 52px 0;
}
.submit-success-info span {
  font-size: 13px;
  color: #526072;
}
.submit-success-btn {
  float: left;
  padding-top: 40px;
  width: 100%;
  margin-left: 20%;
}
.detail {
  color: #20a0ff;
}
</style>
