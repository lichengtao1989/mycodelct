<template>
  <div>
    <cjm-form :model="form" ref="form" :rules="rules">
      <cjm-form-item label="确认发货时间" required>
        <cjm-date-picker v-model="form.deliveryTime"></cjm-date-picker>
      </cjm-form-item>
      <cjm-form-item label="发货方式" required>
        <cjm-enum-select v-model="form.deliveryType" enum-name="生产订单-发放方式" enum-namespace="code"></cjm-enum-select>
      </cjm-form-item>
      <cjm-form-item label="样品" required>
        <cjm-enum-select v-model="form.hasDemo" enum-name="有无" enum-namespace="code"></cjm-enum-select>
      </cjm-form-item>
      <cjm-form-item label="备注1" class="cjm-form-item-long">
        <cjm-input type="textarea" v-model="form.note1" :rows="4"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="备注2" class="cjm-form-item-long">
        <cjm-input type="textarea" v-model="form.note2" :rows="4"></cjm-input>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        form: {},
        rules: {}
      }
    },
    methods: {
      addForm(id){
        this.reset(id);
      },
      reset(id){
        this.form = {
          codeGenerationId: id ? id : '',
          deliveryTime: '',
          deliveryType: '',
          hasDemo: '',
          note1: '',
          note2: ''
        };
        this.$refs.form.resetFields();
      }
    },
    created(){
      this.reset();
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  .cjm-form .el-form-item {
    float: none;
  }
</style>
