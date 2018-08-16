<template>
  <nz-dialog ref="dialog" title="查看角色" :okHandler="submit" :isNeedOkButton="false">
    <add-edit-form :row-data="rowData" is-view></add-edit-form>
  </nz-dialog>
</template>
<script>
  import addEditForm from './form.vue';
  export default {
    components: {addEditForm},
    data(){
      return {
        isSaving: false,
        rowData: {}
      };
    },
    methods: {
      show(row){
        this.rowData = row;
        this.$refs.dialog.show();
      },
      async submit(callback){
        this.isSaving = true;
        await this.$sleep(2000);
        this.isSaving = false;
        callback();
        this.$refs.dialog.hide();
      }
    }
  }
</script>
