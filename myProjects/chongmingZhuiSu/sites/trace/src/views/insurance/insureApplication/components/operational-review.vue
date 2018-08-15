<template>
  <div class="clear commonbom">
    <cjm-form-item label="审核结果" prop="insureCorpID" required class="cjm-form-item-long">
      <cjm-radio-group v-model="auditForm.insureStatus">
        <cjm-radio :disabled="auditForm.insureStatus == 5 && currentPageInfo.pageType == 'view'" v-for="(value,key) in insureStatus" :key="key" :label="value" @click.native="auditChange(value)">{{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="保单号" prop="note" required v-if="auditForm.insureStatus == 5" key="note1">
      <cjm-input v-model="auditForm.note" :disabled="auditForm.insureStatus == 5 && currentPageInfo.pageType == 'view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="保单" prop="policyPdf" required v-if="auditForm.insureStatus == 5">
      <upload v-model="auditForm.policyPdf" acceptType="pdf" :maxNumber="maxNumber" :multiple="multiple" buttonName="上传pdf格式" :disabled="policyDisabled"></upload>
    </cjm-form-item>
    <cjm-form-item label="审核结果描述" prop="note" required v-if="auditForm.insureStatus != 5 && auditForm.insureStatus != 3 && auditForm.insureStatus > 1" key="note2">
      <cjm-input v-model="auditForm.note" type="textarea"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="优惠金额" prop="presentAmount" v-if="auditForm.insureStatus == 5">
      <cjm-input v-model="auditForm.presentAmount" placeholder="请输入优惠金额" :disabled="auditForm.insureStatus == 5 && currentPageInfo.pageType == 'view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="赠送码数" prop="presentQuanty" v-if="auditForm.insureStatus == 5">
      <cjm-input placeholder="请输入赠送数量" :disabled="auditForm.insureStatus == 5 && currentPageInfo.pageType == 'view'" v-model="auditForm.presentQuanty" @blur="verifyQuantity(auditForm.presentQuanty)" class="input-with-select">
      </cjm-input>
    </cjm-form-item>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import Upload from '../../../productTesting/components/file-upload.vue';
export default {
  components: {
    Upload
  },
  mixins: [pageSwitch],
  data() {
    return {
      enums: this.$globalData.get('trace', 'enums'),
      apiUrl: this.$globalData.get('trace', 'apiUrl'),
      pageType: 'edit',
      insureID: '',
      cukey: Math.random(),
      policyDisabled: false,
      multiple: false,
      maxNumber: 1,
      productAuditList: []
    };
  },
  props: {
    form: {
      type: Object
    },
    rules: {
      type: Object
    },
    currentPageInfo: {
      type: Object
    },
    auditForm: {
      type: Object
    }
  },
  computed: {
    insureStatus() {
      return this.$globalData.get('trace', 'enums')['审核结果'];
    }
  },
  watch: {
    'auditForm.policyPdf': function() {
      if (this.auditForm.insureStatus == 5 && this.auditForm.policyPdf.length > 0) {
        this.policyDisabled = true;
      } else {
        this.policyDisabled = false;
      }
    }
  },
  methods: {
    //新增赠送数量
    addPresentation() {
      this.auditForm.productDetail.push({
        productID: '',
        presentQuanty: ''
      });
    },
    //删除投保
    delPresentation(key) {
      this.auditForm.productDetail.splice(key, 1);
    },
    //审核操作赠送产品
    getProductSelectFn(insureID) {
      if (insureID != '') {
        this.$ajax
          .get(this.apiUrl.insurance.insureApplication.GET_PRODUCT_AUDIT_LIST, {
            insureID: insureID
          })
          .then(r => {
            if (r.resultCode == 200) {
              this.productAuditList = r.data;
            } else {
              this.$message.error(r.msg);
            }
          });
      }
    },
    auditChange(val) {
      this.auditForm.note = '';
    },
    verifyQuantity(val) {
      if (val % 1 != 0) {
        this.auditForm.presentQuanty = '';
        this.$message('请输入正确的赠送数量');
      }
    }
  },
  created() {
    if (this.getPageParams('edit')) {
      const insureID = this.getPageParams('edit').insureID;
      this.getProductSelectFn(insureID);
      this.auditForm.insureID = insureID;
      if (this.auditForm.insureStatus == 5 && (this.auditForm.policyPdf.length > 0 || this.currentPageInfo.pageType == 'view')) {
        this.policyDisabled = true;
      }
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../../assets/css/config';

.add-application-wrap {
  width: 100%;
  box-sizing: border-box;
  padding-right: 2px;
  float: left;
  margin-top: -20px;
}

.add-application {
  text-align: center;
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #dfe6ec;
  border-top: none;
}
.total-count {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #dfe6ec;
  border-top: none;
  margin-bottom: 50px;
  box-sizing: border-box;
}
.total-count-span {
  font-size: 13px;
  width: 60px;
  text-align: center;
  float: left;
}
.total-count-val {
  padding-left: 30px;
  float: left;
  font-size: 13px;
}
.commonbom {
  margin-bottom: 20px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.icon-close {
  position: absolute;
  right: -20px;
  color: #1b1b1b;
  cursor: pointer;
  top: 12px;
}
</style>
