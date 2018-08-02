<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" :isNeedOkButton="!readonly" :data-readonly="readonly">
    <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
      <div class="left-group">
        <nz-form-item label="总经销商名称" prop="DistributionName" required>
          <nz-input :readonly="readonly" v-model="form.DistributionName" placeholder="请输入总经销商名称"></nz-input>
        </nz-form-item>
        <nz-form-item label="负责人" prop="ChargePerson" required>
          <nz-input :readonly="readonly" v-model="form.ChargePerson" placeholder="请输入负责人"></nz-input>
        </nz-form-item>
        <nz-form-item label="身份证号" prop="IDCode" required>
          <nz-input :readonly="readonly" v-model="form.IDCode" placeholder="请输入身份证号"></nz-input>
        </nz-form-item>
        <nz-form-item label="经营地址" required>
          <nz-select v-model="form.Town" :readonly="readonly">
            <nz-option label="建设镇" value="建设镇"></nz-option>
            <nz-option label="堡镇" value="堡镇"></nz-option>
            <nz-option label="竖新镇" value="竖新镇"></nz-option>
            <nz-option label="长新镇" value="长新镇"></nz-option>
            <nz-option label="港新镇" value="港新镇"></nz-option>
            <nz-option label="向化镇" value="向化镇"></nz-option>
          </nz-select>
        </nz-form-item>
      </div>
      <div class="right-group">
        <nz-form-item label="统一社会信用代码" prop="CreditCode" required>
          <nz-input :readonly="readonly" v-model="form.CreditCode" placeholder="请输入统一社会信用代码"></nz-input>
        </nz-form-item>
        <nz-form-item label="手机号" prop="PhoneNum" required>
          <nz-input :readonly="readonly" v-model="form.PhoneNum" placeholder="请输入手机号"></nz-input>
        </nz-form-item>
        <nz-form-item label="经营范围" prop="ManageScope">
          <nz-input :readonly="readonly" v-model="form.ManageScope" placeholder="请输入经营范围"></nz-input>
        </nz-form-item>
      </div>
      <nz-form-item label=" ">
        <nz-input :readonly="readonly" v-model="form.ManageAddress" placeholder="请输入经营地址" class="lastinput"></nz-input>
      </nz-form-item>
    </nz-form>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      readonly: false,
      addflag: '',
      updateId: '',
      inputAdress: '',
      ManageAddress: '',
      v1: '',
      title: '',
      formModel: {},
      form: {},
      rules: {
        // key1: [this.$formRules.required],
        // key2: [this.$formRules.required], //, this.$formRules.intRange(5, 10)
        // key3: [this.$formRules.required], //, this.$formRules.minLength(10), this.$formRules.maxLength(20)
        // key4: [this.$formRules.required],
        // key5: [this.$formRules.required]
      }
    };
  },
  methods: {
    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        this.$ajax
          .post(this.$apiUrl.MAINDISTRIBUTION.UPDATE, this.form)
          .then(r => {
            if (r.res.resultCode == 200) {
              this.$emit('save-success');
              this.$refs.dialog.hide();
            } else {
            }
          })
          .catch(() => {});
      }
      callback(); //处理loading
    },
    init() {
      this.readonly = false;
      this.title = '添加';
      this.form = Object.jsonClone(this.formModel);
    },
    initEdit(data, type) {
      this.title = '编辑';
      this.form.DistributionName = data.DistributionName || '';
      this.form.ChargePerson = data.ChargePerson || '';
      this.form.PhoneNum = data.PhoneNum || '';
      this.form.IDCode = data.IDCode || '';
      this.form.CreditCode = data.CreditCode || '';
      this.form.ManageAddress = data.ManageAddress || '';
      this.form.Town = data.Town || '';
      this.form.ManageScope = data.ManageScope || '';
      this.form.Id = data.Id;
      if (type == 0) {
        this.readonly = true;
      }
    },
    show(data, type) {
      this.init();
      if (data) {
        this.initEdit(data, type);
      }
      this.$refs.dialog.show();
    }
  }
};
</script>
