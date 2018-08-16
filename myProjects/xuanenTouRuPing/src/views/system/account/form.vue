<template>
  <nz-form v-if="form" label-width="80px" ref="form" :model="form" :rules="rules">
    <nz-form-item label="登录名" required prop="mobile">
      <nz-input placeholder="请输入11位手机号" v-model="form.mobile"></nz-input>
    </nz-form-item>
    <nz-form-item label="密码" required prop="password">
      <nz-input v-model="form.password"></nz-input>
    </nz-form-item>
    <nz-form-item label="用户姓名" required prop="name">
      <nz-input v-model="form.name"></nz-input>
    </nz-form-item>
    <nz-form-item label="所属角色" required prop="roleID">
      <nz-input v-model="form.roleID"></nz-input>
    </nz-form-item>
  </nz-form>
</template>
<script>
  export default {
    data(){
      return {
        formModel: {mobile: '', password: '', name: '', roleID: ''},
        form: null,
        rules: {
          mobile: [this.$formRules.required],
          password: [this.$formRules.required],
          name: [this.$formRules.required],
          roleID: [this.$formRules.required]
        }
      }
    },
    methods: {
      async validForm(){
        const valid = await this.$validForm(this.$refs.form);
        return valid;
      },
      getForm(){
        return Object.jsonClone(this.form);
      },
      formInit(){
        this.form = Object.jsonClone(this.formModel);
      }
    },
    mounted(){
      this.formInit();
    }
  }
</script>
