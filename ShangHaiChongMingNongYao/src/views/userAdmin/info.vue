<template>
  <div class="infoout">
 
  </div>
</template>
<script>
export default {
  props:{
  },
  data() {
    return {
   
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
      this.title = '编辑';
      this.form.key1 = data.key1 || '';
      this.form.key2 = data.key2 || '';
      this.form.key3 = data.key3 || '';
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
 <style lang="less" rel="stylesheet/less" scoped>
.nz-form-item {
  width: 50%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>

 <style>
.nz-form-item__label {
  width: 140px !important;
  display: inline-block;
}
.nz-dialog {
  width: 50%;
}
</style>