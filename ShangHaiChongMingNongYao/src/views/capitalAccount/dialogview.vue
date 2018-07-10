<template>
  <div class="wrapdview">
    <nz-dialog ref="dialog" :title="title" :okHandler="submit" :class="computedclass">
      <nz-form label-width="130px" ref="form" :model="form" :rules="rules">
        <nz-form-item label="(补贴)资金账号" prop="key1" required>
          <nz-input v-model="form.key1" :disabled="type==1"></nz-input>
        </nz-form-item>
        <nz-form-item label="当前余额" prop="key2" required>
          <nz-input v-model="form.key2" :disabled="type==1"></nz-input>
        </nz-form-item>
        <nz-form-item label="主体名称" prop="key3" required>
          <nz-input v-model="form.key3" :disabled="type==1"></nz-input>
        </nz-form-item>
        <nz-form-item label="联系人" prop="key4" required>
          <nz-input v-model="form.key4" :disabled="type==1"></nz-input>
        </nz-form-item>
        <nz-form-item label="联系方式" prop="key5" required>
          <nz-input v-model="form.key5" :disabled="type==1"></nz-input>
        </nz-form-item>
        <nz-form-item label="账户类型" prop="key6" required>
          <nz-input v-model="form.key6" :disabled="type==1"></nz-input>
        </nz-form-item>
        <nz-form-item label="状态" prop="key7">
          <nz-input v-model="form.key7" :disabled="type==1"></nz-input>
        </nz-form-item>
      </nz-form>
    </nz-dialog>
  </div>
</template>
<script>
  export default {
    props: {type: {type: String, default: ''}},
    data() {
      return {
        title: '',
        formModel: {key1: '', key2: '', key3: '', key4: '', key5: '', key6: '', key7: ''},
        search: {key1: '', key2: '', key3: '', key4: '', key5: '', key6: '', key7: ''},
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
