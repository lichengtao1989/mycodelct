<template>
  <nz-dialog ref="dialog" title="编辑角色" :okHandler="submit">
    <add-edit-form :row-data="rowData" ref="form"></add-edit-form>
  </nz-dialog>
</template>
<script>
import addEditForm from './form.vue';
export default {
  components: { addEditForm },
  data() {
    return {
      isSaving: false,
      rowData: {}
    };
  },
  methods: {
    show(row) {
      this.rowData = row;
      this.$refs.dialog.show();
    },
    async submit(callback) {
      this.isSaving = true;
      const valid = await this.$refs.form.validForm();
      if (valid) {
        const form = this.$refs.form.getForm();
        const { roleName, roleType, powerList } = form;
        const { roleID } = this.rowData;
        const isUpdateSuccess = await this.$model('system').role.update(roleID, roleName, roleType, powerList);
        if (isUpdateSuccess) {
          this.$refs.dialog.hide();
          this.$message.success('编辑角色成功');
          this.$emit('save-success');
        }
      }
      this.isSaving = false;
      callback();
    }
  }
};
</script>
