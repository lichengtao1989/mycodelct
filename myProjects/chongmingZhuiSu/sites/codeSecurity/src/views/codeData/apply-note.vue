<template>
  <cjm-form>
    <cjm-form-item label="备注" class="cjm-form-item-long">
      <cjm-input v-model="form.downNote" type="textarea" :row="5"></cjm-input>
    </cjm-form-item>
  </cjm-form>
</template>
<script>
  export default{
    data(){
      return {
        form: {}
      }
    },
    methods: {
      reset(){
        this.form = {
          downNote: ''
        }
      },
      addForm(){
        this.reset();
      },
      submit(){
        this.$emit('downNote', this.form.downNote);
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../assets/css/config";
</style>
