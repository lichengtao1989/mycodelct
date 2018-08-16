<template>
  <nz-dialog ref="dialog" title="新建角色" :okHandler="submit">
    <add-edit-form ref="form"></add-edit-form>
  </nz-dialog>
</template>
<script>
  import addEditForm from './form.vue';
  export default {
    components: {addEditForm},
    data(){
      return {
        isSaving: false
      };
    },
    methods: {
      show(){
        this.$refs.dialog.show();
      },
      async submit(callback){
        this.isSaving = true;
        const valid = await this.$refs.form.validForm();
        if (valid) {
          const form = this.$refs.form.getForm();
          const {roleName, roleType, powerList} = form;
          const isInsertSuccess = await this.$model('system').role.insert(roleName, roleType, powerList);
          if (isInsertSuccess) {
            this.$refs.dialog.hide();
            this.$message.success('添加角色成功');
            this.$emit('save-success');
          }
        }
        this.isSaving = false;
        callback();
      }
    }
  }
</script>
