<template>
  <nz-dialog ref="dialog" title="添加菜单" :okHandler="submit">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="名称" prop="powerName" required>
        <nz-input v-model="form.powerName"></nz-input>
      </nz-form-item>
      <nz-form-item label="权限码" prop="powerCode" required>
        <nz-input v-model="form.powerCode"></nz-input>
      </nz-form-item>
      <!-- <nz-form-item label="排序值" prop="sorting">
        <nz-input v-model="form.sorting"></nz-input>
      </nz-form-item> -->
      <nz-form-item v-show="false" label="菜单类型" prop="powerType">
        <nz-enum-select v-model="form.powerType" :options="$enum('角色类型').values" is-radio></nz-enum-select>
      </nz-form-item>
    </nz-form>
  </nz-dialog>
</template>
<script>
export default {
  props: ['powerType'],
  data() {
    return {
      parentMenuData: null,
      form: { powerName: '', powerCode: '', sorting: '', powerType: '' },
      rules: {
        powerName: [this.$formRules.required],
        powerCode: [this.$formRules.required]
      }
    };
  },
  methods: {
    async submit(cllback) {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        const parentID = this.parentMenuData.powerID;
        const { err } = await this.$model('system').menu.addItem(parentID, this.form);
        err || this.$refs.dialog.hide();
        this.$emit('save-success');
      }
      cllback();
    },
    show(parentMenuData) {
      this.parentMenuData = parentMenuData ? { ...parentMenuData } : {};
      this.form.powerName = '';
      this.form.powerCode = '';
      this.form.sorting = '';
      this.form.powerType = this.powerType;
      this.$refs.dialog.show();
    }
  }
};
</script>
