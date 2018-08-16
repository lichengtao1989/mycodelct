<template>
  <nz-dialog ref="dialog" title="编辑菜单" :okHandler="submit">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="名称" prop="powerName" required>
        <nz-input v-model="form.powerName"></nz-input>
      </nz-form-item>
      <nz-form-item label="权限码" prop="powerCode" required>
        <nz-input v-model="form.powerCode"></nz-input>
      </nz-form-item>
      <!-- <nz-form-item label="排序值" prop="sorting" required>
        <nz-input v-model="form.sorting"></nz-input>
      </nz-form-item> -->
      <!-- <nz-form-item label="菜单类型" prop="powerType" required>
        <nz-enum-select v-model="form.powerType" :options="$enum('角色类型').values" is-radio></nz-enum-select>
      </nz-form-item> -->
    </nz-form>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      form: { powerID: '', parentID: '', powerName: '', powerCode: '', sorting: '', powerType: '' },
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
        this.$refs.dialog.hide();
        await this.$model('system').menu.editItem(this.form);
        this.$emit('save-success');
      }
      cllback();
    },
    show(menuData) {
      this.form.powerID = menuData.powerID;
      this.form.powerName = menuData.powerName;
      this.form.powerCode = menuData.powerCode;
      this.form.parentID = menuData.parentID;
      this.form.powerType = menuData.powerType;
      this.form.sorting = menuData.sorting || '';
      this.$refs.dialog.show();
    }
  }
};
</script>
