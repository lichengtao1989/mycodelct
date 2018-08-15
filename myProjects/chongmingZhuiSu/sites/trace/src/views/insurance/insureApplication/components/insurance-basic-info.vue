<template>
  <div class="clear commonbom" v-if="currentPageInfo.isInsureLogin != 1">
    <cjm-form-item label="机构名称" prop="orgID" required>
      <cjm-remote-select :remote-url="apiUrl.insurance.insureApplication.GET_ORG_SELECT_LIST" :label="form.orgName" v-model="form.orgID" @select="getOrgSelect" :disabled="form.insureStatus > 0 && (currentPageInfo.pageType=='view' || currentPageInfo.pageType=='edit')">
      </cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="机构代码" prop="orgCode" required>
      <cjm-input v-model="form.orgCode" :disabled="true"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="详细地址" prop="address" required>
      <cjm-input v-model="form.address" :disabled="currentPageInfo.pageType==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="联系邮箱" prop="email" required>
      <cjm-input v-model="form.email" :disabled="currentPageInfo.pageType==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="联系人姓名" prop="contactName" required>
      <cjm-input v-model="form.contactName" :disabled="currentPageInfo.pageType==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="联系电话" prop="contactPhone" required>
      <cjm-input v-model="form.contactPhone" :disabled="currentPageInfo.pageType==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="推荐人姓名" prop="refereerName">
      <cjm-input v-model="form.refereerName" :disabled="currentPageInfo.pageType==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="推荐人电话" prop="refereerPhone">
      <cjm-input v-model="form.refereerPhone" :disabled="currentPageInfo.pageType==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="营业执照" prop="businessLicenseImg" required class="cjm-form-item-long">
      <cjm-image-upload v-model="form.businessLicenseImg" :disabled="currentPageInfo.pageType==='view'"></cjm-image-upload>
    </cjm-form-item>
    <!-- <cjm-form-item label="检测报告" prop="testingReportImg" class="cjm-form-item-long" required>
      <cjm-image-upload v-model="form.testingReportImg" :multiple="true" :maxNumber="10" :tips="tips" :disabled="currentPageInfo.pageType==='view'"></cjm-image-upload>
    </cjm-form-item> -->
  </div>
  <div class="clear commonbom" v-else>
    <cjm-form-item label="机构名称" prop="orgID">
      {{form.orgName}}
    </cjm-form-item>
    <cjm-form-item label="机构代码" prop="orgCode">
      {{form.orgCode}}
    </cjm-form-item>
    <cjm-form-item label="详细地址" prop="address">
      {{form.address}}
    </cjm-form-item>
    <cjm-form-item label="联系邮箱" prop="email">
      {{form.email}}
    </cjm-form-item>
    <cjm-form-item label="联系人姓名" prop="contactName">
      {{form.contactName}}
    </cjm-form-item>
    <cjm-form-item label="联系电话" prop="contactPhone">
      {{form.contactPhone}}
    </cjm-form-item>
    <cjm-form-item label="推荐人姓名" prop="refereerName" v-if="form.refereerName !='' && form.refereerName != null">
      {{form.refereerName}}
    </cjm-form-item>
    <cjm-form-item label="推荐人电话" prop="refereerPhone" v-if="form.refereerPhone !='' && form.refereerPhone != null">
      {{form.refereerPhone}}
    </cjm-form-item>
    <cjm-form-item label="营业执照" prop="businessLicenseImg" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.businessLicenseImg" :disabled="currentPageInfo.isInsureLogin==1"></cjm-image-upload>
    </cjm-form-item>
    <!-- <cjm-form-item label="检测报告" prop="testingReportImg" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.testingReportImg" :multiple="true" :maxNumber="10" :disabled="currentPageInfo.isInsureLogin==1"></cjm-image-upload>
    </cjm-form-item> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      enums: this.$globalData.get('trace', 'enums'),
      apiUrl: this.$globalData.get('trace', 'apiUrl'),
      tips: '最多支持上传10张图片'
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
    }
  },
  methods: {
    //进入页面获取机构信息
    getOrgSelectList() {
      this.$ajax.get(this.apiUrl.insurance.insureApplication.GET_ORG_SELECT_LIST).then(r => {
        if (r.resultCode == 200) {
          if (this.form.orgID == '') {
            this.getOrgSelect(r.data[0]);
          } else {
            if (this.form.insureType > 0) {
              this.$emit('getProductSelectList');
            }
          }
        } else {
          this.$message.error(r.msg);
        }
      });
    },
    //获取机构最新笔记的详情
    getOrgSelect(val) {
      if (this.currentPageInfo.pageType != 'view') {
        if (val == null) {
          this.form.orgID = '';
          this.form.orgName = '';
          this.form.orgCode = '';
          this.form.address = '';
          this.form.email = '';
          this.form.contactName = '';
          this.form.contactPhone = '';
          this.form.refereerName = '';
          this.form.refereerPhone = '';
        } else {
          this.$ajax.get(this.apiUrl.insurance.insureApplication.GET_ORG_SELECT, { orgID: val.id }).then(r => {
            if (r.resultCode == 200 && r.data != null) {
              this.form.orgID = val.id;
              this.form.orgName = r.data.orgName;
              this.form.orgCode = r.data.orgCode;
              this.form.address = r.data.address;
              this.form.email = r.data.email;
              this.form.contactName = r.data.contactName;
              this.form.contactPhone = r.data.contactPhone;
              this.form.refereerName = r.data.refereerName;
              this.form.refereerPhone = r.data.refereerPhone;
            } else {
              this.form.orgID = val.id;
              this.form.orgName = val.name;
              this.form.orgCode = val.orgCode;
              this.form.address = val.address;
              this.form.email = val.email;
              this.form.contactName = val.contactName;
              this.form.contactPhone = val.contactPhone;
              this.form.refereerName = val.refereerName;
              this.form.refereerPhone = val.refereerPhone;
            }
          });
        }
      }
      if (this.form.insureCorpID > 0 && this.form.insureType > 0) {
        this.$emit('getInsureBasicConfig', this.form.insureType, this.form.insureCorpID);
      }
      let insureTypeName = Object.keys(this.insurance).find(key => this.insurance[key] == this.form.insureType);
      this.form.insureApplicationDetail.insureType = insureTypeName;
      if (this.form.insureType > 0) {
        this.$emit('getProductSelectList');
      }
    }
  },
  created() {
    if (this.$route.query.insureID == undefined && this.currentPageInfo.isInsureLogin != 1) {
      this.getOrgSelectList();
      if (this.currentPageInfo.pageType === 'view') {
        this.tips = '';
      }
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.commonbom {
  margin-bottom: 20px;
}
</style>
