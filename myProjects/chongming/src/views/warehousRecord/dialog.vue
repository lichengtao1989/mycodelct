<template>
  <nz-dialog ref="dialog" customClass="width-500" :title="title" :okHandler="submit">
    <nz-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <nz-tab-pane label="农户" name="first">
        <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
          <nz-form-item label="主体名称" prop="key1" required>
            <nz-input v-model="form.key1" placeholder="请输入主体名称"></nz-input>
          </nz-form-item>
          <nz-form-item label="用户账号" prop="key2" required>
            <nz-input v-model="form.key2" placeholder="请输入用户账号"></nz-input>
          </nz-form-item>
          <nz-form-item label="初始密码" prop="key3" required>
            <nz-input v-model="form.key3" placeholder="请输入初始密码"></nz-input>
          </nz-form-item>
          <nz-form-item label="联系人" prop="key4" required>
            <nz-input v-model="form.key4" placeholder="请输入联系人"></nz-input>
          </nz-form-item>
          <nz-form-item label="身份证号" prop="key5" required>
            <nz-input v-model="form.key5" placeholder="请输入身份证号"></nz-input>
          </nz-form-item>
        </nz-form>
      </nz-tab-pane>
      <nz-tab-pane label="农资店" name="second">农资店</nz-tab-pane>
      <nz-tab-pane label="总经销" name="third">总经销</nz-tab-pane>
      <nz-tab-pane label="农委" name="fourth">农委</nz-tab-pane>
    </nz-tabs>
  </nz-dialog>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        title: '',
        formModel: {key1: '', key2: '', key3: '', key4: '', key5: ''},
        form: {},
        rules: {
          key1: [this.$formRules.required],
          key2: [this.$formRules.required], //, this.$formRules.intRange(5, 10)
          key3: [this.$formRules.required], //, this.$formRules.minLength(10), this.$formRules.maxLength(20)
          key4: [this.$formRules.required],
          key5: [this.$formRules.required],
          key6: [this.$formRules.required],
          key7: [this.$formRules.required]
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      async submit(callback) {
        console.log(this.activeName)
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
