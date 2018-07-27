<template>
  <nz-dialog ref="dialog" :title="title" :okHandler="submit">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="字段1" prop="key1" required>
        <nz-input v-model="form.key1"></nz-input>
      </nz-form-item>
      <nz-form-item label="字段2" prop="key2" required>
        <nz-input v-model="form.key2"></nz-input>
      </nz-form-item>
      <nz-form-item label="字段3" prop="key3" required>
        <nz-input v-model="form.key3"></nz-input>
      </nz-form-item>
    </nz-form>
  </nz-dialog>
</template>
<script>
  export default {
    data(){
      return {
        title: '',
        formModel: {key1: '', key2: '', key3: ''},
        form: {},
        rules: {
          key1: [this.$formRules.required],
          key2: [this.$formRules.required, this.$formRules.intRange(5, 10)],
          key3: [this.$formRules.required, this.$formRules.minLength(10), this.$formRules.maxLength(20)]
        }
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
        this.title = '添加';
        this.form = Object.jsonClone(this.formModel);
      },
      initEdit(data){
        this.title = '编辑';
        this.form.key1 = data.key1 || '';
        this.form.key2 = data.key2 || '';
        this.form.key3 = data.key3 || '';
      },
      show(data){
        this.init();
        if (data) {
          this.initEdit(data);
        }
        this.$refs.dialog.show();
      }
    }
  }
</script>
