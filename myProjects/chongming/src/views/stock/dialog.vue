<template>
  <nz-dialog ref="dialog" customClass="width-500" :title="title" :okHandler="submit">
    <nz-form label-width="120px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="农药名称" prop="pesticideName">
        <nz-input v-model="form.pesticideName" placeholder="农药名称" readonly="true"></nz-input>
      </nz-form-item>
      <nz-form-item label="注册商标" prop="registeredTrademark">
        <nz-input v-model="form.registeredTrademark" placeholder="注册商标" readonly="true"></nz-input>
      </nz-form-item>
      <nz-form-item label="登记证号" prop="pesticideCode">
        <nz-input v-model="form.pesticideCode" placeholder="登记证号" readonly="true"></nz-input>
      </nz-form-item>
      <nz-form-item label="规格" prop="specification">
        <nz-input v-model="form.specification" placeholder="规格" readonly="true"></nz-input>
      </nz-form-item>
      <nz-form-item label="预警最低数量" prop="warnCount" required>
        <nz-input v-model="form.warnCount" placeholder="请输入产品库存预警值"></nz-input>
      </nz-form-item>
    </nz-form>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      title: '',
      formModel: {},
      form: {},
      rules: {},
      StockId: ''
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    async submit(callback) {
      // console.log(this.activeName);
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let { err, res } = await this.$ajax.post(this.$apiUrl.STOCK.SETEARLYWARNING, { StockId: this.StockId, Value: parseInt(this.form.warnCount) });
        console.log(err, res);
        /**
         * 执行表单提交
         * const isSaveSuccess = this.$model('demo').save(this.form);
         * */

        if (err) {
          this.$message.showError('设置失败!');
        }
        if (res.resultCode == 200) {
          this.$message.success(res.msg);
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
      console.log(data);
      this.StockId = data.stockId;
      this.title = '编辑';
      this.form.pesticideName = data.pesticideName || '';
      this.form.registeredTrademark = data.registeredTrademark || '';
      this.form.pesticideCode = data.pesticideCode || '';
      this.form.warnCount = data.warnCount || '';
      this.form.specification = `${data.specQuantity}${data.specUnit}/${data.specType}` || '';
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
