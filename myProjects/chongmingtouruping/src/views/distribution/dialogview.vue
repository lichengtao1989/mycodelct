<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" class="viewpart" :isNeedOkButton="false">
    <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
      <div class="left-group">
        <nz-form-item label="总经销商名称" prop="DistributionName">
          <nz-input readonly="true" v-model="form.DistributionName" placeholder="请输入总经销商名称"></nz-input>
        </nz-form-item>
        <nz-form-item label="负责人" prop="ChargePerson">
          <nz-input readonly="true" v-model="form.ChargePerson" placeholder="请输入负责人"></nz-input>
        </nz-form-item>
        <nz-form-item label="身份证号" prop="IDCode">
          <nz-input readonly="true" v-model="form.IDCode" placeholder="请输入身份证号"></nz-input>
        </nz-form-item>
        <nz-form-item label="经营地址" prop="ManageAddress">
          <nz-input readonly="true" v-model="form.ManageAddress" placeholder="请输入经营地址"></nz-input>
          <!-- <nz-select v-model="v1" readonly="true">
            <nz-option label="选项1" value="1"></nz-option>
            <nz-option label="选项2" value="2"></nz-option>
            <nz-option label="选项3" value="3"></nz-option>
          </nz-select> -->
        </nz-form-item>
      </div>
      <div class="right-group">
        <nz-form-item label="统一社会信用代码" prop="CreditCode">
          <nz-input readonly="true" v-model="form.CreditCode" placeholder="请输入统一社会信用代码"></nz-input>
        </nz-form-item>
        <nz-form-item label="手机号" prop="PhoneNum">
          <nz-input readonly="true" v-model="form.PhoneNum" placeholder="请输入手机号"></nz-input>
        </nz-form-item>
        <nz-form-item label="经营范围" prop="ManageScope">
          <nz-input readonly="true" v-model="form.ManageScope" placeholder="请输入经营范围"></nz-input>
        </nz-form-item>
      </div>
      <!-- <nz-form-item label=" ">
        <nz-input readonly="true" v-model="form.key7" placeholder="请输入经营地址" class="lastinput"></nz-input>
      </nz-form-item> -->
    </nz-form>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      v1: '',
      title: '',
      formModel: {},
      form: {},
      rules: {}
    };
  },
  methods: {
    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        /**
         * 执行表单提交
         * const isSaveSuccess = this.$model('demo').save(this.form);
         * */
        const isSaveSuccess = true;
        if (isSaveSuccess) {
          this.$emit('save-success');
          this.$refs.dialog.hide();
        }
      }
      callback();
    },
    init() {
      this.title = '查看';
      this.form = Object.jsonClone(this.formModel);
    },
    initEdit(data) {
      this.title = '查看';
      this.form.DistributionName = data.DistributionName || '';
      this.form.ChargePerson = data.ChargePerson || '';
      this.form.PhoneNum = data.PhoneNum || '';
      this.form.IDCode = data.IDCode || '';
      this.form.CreditCode = data.CreditCode || '';
      this.form.ManageAddress = data.Town + data.ManageAddress || '';
      this.form.ManageScope = data.ManageScope || '';
    },
    show(data) {
      console.log(data);
      this.init();
      if (data) {
        this.initEdit(data);
      }
      this.$refs.dialog.show();
    }
  }
};
</script>
<style>
/* .viewpart .nz-dialog-footer{display: none;} */
</style>
