<template>
  <div class="wrapdzj">
    <nz-dialog ref="dialog" :title="title" :okHandler="submit" :class="computedclass" :isNeedOkButton="!readonly">
      <nz-form label-width="130px" ref="form" :model="form" :rules="rules">
        <nz-form-item label="(补贴)资金账号" prop="AccountNumber" required>
          <nz-input :readonly="readonly" v-model="form.AccountNumber"></nz-input>
        </nz-form-item>
        <nz-form-item label="当前余额" prop="Balance" required>
          <nz-input :readonly="readonly" v-model="form.Balance"></nz-input>
        </nz-form-item>
        <nz-form-item label="主体名称" prop="MainPartName" required>
          <nz-input :readonly="readonly" v-model="form.MainPartName"></nz-input>
        </nz-form-item>
        <nz-form-item label="联系人" prop="RelationPerson" required>
          <nz-input :readonly="readonly" v-model="form.RelationPerson"></nz-input>
        </nz-form-item>
        <nz-form-item label="联系方式" prop="RelationPersonPhoneNum" required>
          <nz-input :readonly="readonly" v-model="form.RelationPersonPhoneNum"></nz-input>
        </nz-form-item>
        <nz-form-item label="账户类型" prop="AccountType" required>
          <nz-input :readonly="readonly" v-model="form.AccountType"></nz-input>
        </nz-form-item>
        <nz-form-item label="状态" prop="Status">
          <nz-input :readonly="readonly" v-model="form.Status"></nz-input>
        </nz-form-item>
      </nz-form>
    </nz-dialog>
  </div>
</template>
<script>
export default {
  props: { type: { type: String, default: '' } },
  data() {
    return {
      readonly: true,
      title: '',
      formModel: {},
      search: {},
      form: {},
      rules: {
        // key1: [this.$formRules.required],
        // key2: [this.$formRules.required], //, this.$formRules.intRange(5, 10)
        // key3: [this.$formRules.required], //, this.$formRules.minLength(10), this.$formRules.maxLength(20)
        // key4: [this.$formRules.required],
        // key5: [this.$formRules.required],
        // key6: [this.$formRules.required],
        // key7: [this.$formRules.required]
      }
    };
  },
  computed: {
    computedclass() {
      return `computedclass${this.type}`;
    }
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
      this.title = '添加';
      this.form = Object.jsonClone(this.formModel);
    },
    initEdit(data) {
      this.title = '查看';
      this.form.AccountNumber = data.AccountNumber || '';
      this.form.Balance = data.Balance || '';
      this.form.MainPartName = data.MainPartName || '';
      this.form.RelationPerson = data.RelationPerson || '';
      this.form.RelationPersonPhoneNum = data.RelationPersonPhoneNum || '';
      let accountTypeStr = '';
      if (data.AccountType == 5) {
        accountTypeStr = '总经销';
      } else if (data.AccountType == 3) {
        accountTypeStr = '农资店';
      } else if (data.AccountType == 2) {
        accountTypeStr = '农户';
      }
      this.form.AccountType = accountTypeStr || '';
      let ustatus = '';
      if (data.Status == -1) {
        ustatus = '删除';
      } else if (data.Status == 0) {
        ustatus = '禁用';
      } else if (data.Status == 1) {
        ustatus = '正常';
      }
      this.form.Status = ustatus || '';
    },
    show(data) {
      this.init();
      if (data) {
        this.initEdit(data);
      }
      this.$refs.dialog.show();
    }
  }
};
</script>
