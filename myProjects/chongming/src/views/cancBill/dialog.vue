<template>
  <nz-dialog customClass="width-800" ref="dialog" title="扫描农药码" :okHandler="submit">
    <nz-form label-width="100px" ref="form" :model="form" :rules="rules">
      <nz-form-item class="normal-item" label="农药登记证号">xxxxxx</nz-form-item>
      <nz-form-item class="normal-item" label="农药名称">xxxxxx</nz-form-item>
      <nz-form-item class="normal-item" label="注册商标">xxxxxx</nz-form-item>
      <nz-form-item class="normal-item" label="规格">xxxxxx</nz-form-item>
      <nz-form-item class="normal-item" label="生产批次">xxxxxx</nz-form-item>
      <nz-form-item class="normal-item" label="应扫描数量">xxxxxx</nz-form-item>
      <nz-form-item class="normal-item" label="单位">xxxxxx</nz-form-item>
      <nz-form-item label="农药码">
        <nz-input autofocus ref="codeInput" v-model="form.code" type="textarea" style="width: 260px" placeholder="请扫码或手动输入" resize="none" rows="7"></nz-input>
      </nz-form-item>
      <nz-form-item class="normal-item" label="已扫">{{ count }}</nz-form-item>
    </nz-form>
  </nz-dialog>
</template>
<script>
  export default {
    data(){
      return {
        title: '',
        formModel: {key1: '', key2: '', key3: '', code: ''},
        form: {},
        rules: {
          key1: [this.$formRules.required],
          key2: [this.$formRules.required, this.$formRules.intRange(5, 10)],
          key3: [this.$formRules.required, this.$formRules.minLength(10), this.$formRules.maxLength(20)]
        }
      }
    },
    computed: {
      count(){
        const {code = ''} = this.form;
        const lines = code.split('\n');
        const realLines = lines.filter(line => line.trim() !== '');
        return realLines.length;
      }
    },
    methods: {
      async submit(callback){
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
      init(){
        this.form = Object.jsonClone(this.formModel);
      },
      initEdit(data){
        this.form.key1 = data.key1 || '';
        this.form.key2 = data.key2 || '';
        this.form.key3 = data.key3 || '';
      },
      async inputFocus(){
        await this.$sleep(500);
        this.$refs.codeInput.focus();
      },
      show(data){
        this.init();
        this.initEdit(data);
        this.$refs.dialog.show();
        this.inputFocus();
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .normal-item {
    margin-bottom: 0;
  }
</style>
