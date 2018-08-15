<template>
  <div class="clear commonbom" v-if="currentPageInfo.isInsureLogin != 1">
    <cjm-form-item label="保险公司" prop="insureCorpID" required class="cjm-form-item-long">
      <cjm-radio-group v-model="form.insureCorpID">
        <cjm-radio v-for="(value,index) in insureCorpList" :key="index" :label="value.id" @mousedown.native="selectInsure(value)" :disabled="form.insureStatus > 0 && (currentPageInfo.pageType=='view'  || currentPageInfo.pageType=='edit')">{{value.name}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="险种" prop="insureType" required class="cjm-form-item-long">
      <cjm-radio-group v-model="form.insureType">
        <cjm-radio v-for="(value,key) in insurance" :key="key" :label="value" :disabled="form.insureStatus > 0 && (currentPageInfo.pageType=='view' || currentPageInfo.pageType=='edit')" @change="selectInsureType(value)">{{key}}
          <i class="cjm-icon-question detail" v-if="form.insureCorpID !=''" @click.stop.prevent="query(value)"></i>
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
  </div>
  <div class="clear commonbom" v-else>
    <cjm-form-item label="保险公司" prop="insureCorpID" required class="cjm-form-item-long">
      {{form.insureCompany}}
    </cjm-form-item>
    <cjm-form-item label="险种" prop="insureType" required class="cjm-form-item-long">
      {{insureTypeName}}
    </cjm-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      insureCorpList: [],
      pageType: 'edit',
      isInsureLogin: '',
      oldInsureCorpID: '',
      oldInsureType: ''
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
    }
  },
  computed: {
    insurance() {
      return this.$globalData.get('trace', 'enums')['保险类型'];
    },
    insureTypeName() {
      return Object.keys(this.insurance).find(key => this.insurance[key] == this.form.insureType);
    }
  },
  methods: {
    //获取保险公司
    getInsureCorpList() {
      this.$ajax.get(this.$globalData.get('trace', 'apiUrl').insurance.insureApplication.GET_INSURE_CORP_LIST).then(r => {
        if (r.resultCode == 200) {
          this.insureCorpList = r.data;
          if (r.data != null) {
            if (r.data.length == 1) {
              this.form.insureCorpID = r.data[0].id;
            }
          }
        } else {
          this.$message.error(r.msg);
        }
      });
    },
    selectInsureCompanyCommon(val) {
      this.form.insureCompany = val.name;
      this.form.insureCorpID = val.id;
      this.oldInsureCorpID = this.form.insureCorpID;
      if (this.form.insureType > 0) {
        this.$emit('getInsureBasicConfig', this.form.insureType, this.form.insureCorpID);
        let insureTypeName = Object.keys(this.insurance).find(key => this.insurance[key] == this.form.insureType);
        if (this.currentPageInfo.pageType != 'view') {
          this.form.insureApplicationDetail = {
            detailID: '',
            premium: '',
            productID: [],
            productName: '',
            productNumber: '',
            productSell: '',
            insureType: insureTypeName
          };
          if (this.form.orgID != '') {
            this.$emit('getProductSelectList');
          }
        }
      }
    },
    selectInsure(val) {
      if (this.form.insureStatus == '0' || (this.currentPageInfo.pageType != 'view' && this.currentPageInfo.pageType != 'edit')) {
        if (this.form.insureCorpID == '' || this.form.insureApplicationDetail.productID.length == 0) {
          this.selectInsureCompanyCommon(val);
        } else {
          this.$confirm('重新选择保险公司将清空投保详情哦!', '提示', {
            type: 'info'
          }).then(() => {
            this.selectInsureCompanyCommon(val);
          });
        }
      }
    },
    selectInsureTypeCommon(val) {
      this.form.insureType = val;
      this.oldInsureType = this.form.insureType;
      let insureTypeName = Object.keys(this.insurance).find(key => this.insurance[key] == val);
      this.form.insureApplicationDetail.insureType = insureTypeName;
      this.$emit('getInsureBasicConfig', this.form.insureType, this.form.insureCorpID);
      this.form.insureApplicationDetail = {
        detailID: '',
        premium: '',
        productID: [],
        productName: '',
        productNumber: '',
        productSell: '',
        insureType: insureTypeName
      };
      if (this.form.insureType > 0 && this.form.orgID != '') {
        this.$emit('getProductSelectList');
      }
    },
    selectInsureType(val) {
      if (this.form.insureStatus == '0' || (this.currentPageInfo.pageType != 'view' && this.currentPageInfo.pageType != 'edit')) {
        if (this.form.insureCorpID == '') {
          this.$message.info('请选择保险公司');
          this.form.insureType = '';
          return;
        }
        if (this.form.insureType == '' || this.form.insureApplicationDetail.productID.length == 0) {
          this.selectInsureTypeCommon(val);
        } else {
          this.$confirm('重新选择保险险种将清空投保详情哦!', '提示', {
            type: 'info'
          })
            .then(() => {
              this.selectInsureTypeCommon(val);
            })
            .catch(() => {
              this.$message.error();
            });
        }
      }
    },
    query(id) {
      this.$emit('query', id);
    }
  },
  created() {
    this.getInsureCorpList();
    this.oldInsureCorpID = this.form.insureCorpID;
    this.oldInsureType = this.form.insureType;
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.detail {
  color: rgb(27, 140, 206);
}
.commonbom {
  margin-bottom: 20px;
}
</style>
