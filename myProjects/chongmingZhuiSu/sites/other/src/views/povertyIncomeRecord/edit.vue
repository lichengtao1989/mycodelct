<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="所在企业" prop="orgID" required class="cjm-form-item-long">
      <cjm-remote-select v-model="form.orgID" :remote-url="apiUrl.autoComplete.ORG" :label="form.orgName"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="贫困户" prop="poorFamilyID" required>
      <cjm-remote-select v-model="form.poorFamilyID" :remote-url="apiUrl.autoComplete.POOR_FAMILY" :label="form.poorFamilyName" @select="poorFamilySelect"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="手机号">
      <cjm-input v-model="form.mobile" :disabled="true"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="贫困类型">
      <cjm-enum-select v-model="form.poorType" enum-name="贫困类型" enum-namespace="other" :disabled="true"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="劳务岗位" prop="postID" required>
      <cjm-remote-select v-model="form.postID" :remote-url="apiUrl.autoComplete.POVERTY_LABOR" :label="form.postName">
        <template slot-scope="scope">{{scope.item.name}}<span class="cjm-option-subtitle">({{scope.item.postNo}})</span></template>
      </cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="收入" prop="income" required>
      <cjm-input v-model="form.income"></cjm-input>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      enums: this.$globalData.get('other', 'enums'),
      apiUrl: this.$globalData.get('other', 'apiUrl'),
      form: {},
      rules: {
        orgID: [this.$formRules.required],
        poorFamilyID: [this.$formRules.required],
        postID: [this.$formRules.required],
        income: [this.$formRules.required, this.$formRules.numberRange(0)]
      }
    };
  },
  computed: {
    // yesOrNo(){
    //   return this.enums['是否'];
    // }
  },
  watch: {
    'form.poorFamilyID': function(val) {
      if (!val) {
        this.form.mobile = '';
        this.form.poorType = '';
      }
    }
  },
  methods: {
    addForm() {
      this.reset();
      this.$nextTick(() => {
        const currentUser = this.$globalData.get('currentUser');
        if (currentUser.orgType == this.enums.orgType.COMPANY) {
          this.form.orgID = currentUser.orgID;
          this.form.orgName = currentUser.orgName;
        }
      });
    },
    editForm(id) {
      this.reset();
      this.$ajax
        .get(this.apiUrl.povertyIncomeRecord.GET, { recordID: id })
        .then(r => {
          if (r.resultCode == '200') {
            Object.transfer(r.data, this.form);
            this.form.recordID = id;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    reset() {
      this.form = {
        recordID: '',
        orgID: '',
        orgName: '',
        poorFamilyID: '',
        poorFamilyName: '',
        mobile: '',
        poorType: '',
        poorTypeName: '',
        postName: '',
        postID: '',
        income: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        if (this.form.povertyType != '2') {
          this.form.industryType = '';
        }
        return this.$ajax
          .post(this.apiUrl.povertyIncomeRecord.SAVE, this.form)
          .then(r => {
            if (r.resultCode != '200') {
              throw new Error(r.msg);
            }
          })
          .catch(error => {
            throw new Error(error);
          });
      });
    },
    //贫困户选择
    poorFamilySelect(item) {
      console.log(item);
      this.form.mobile = item.mobile;
      this.form.poorType = item.poorType;
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
