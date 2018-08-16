<template>
  <div class="content">
    <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="密码" required prop="password">
        <nz-input v-model="form.password" type="password"></nz-input>
      </nz-form-item>
      <nz-form-item label="短信通知" required prop="isNotice">
        <nz-enum-select v-model="form.isNotice" is-radio :options="$enum('是否').values"></nz-enum-select>
      </nz-form-item>
      <nz-form-item label="通知手机" v-if="form.isNotice==1" required prop="tel">
        <nz-input placeholder="请输入11位手机号" v-model="form.tel"></nz-input>
      </nz-form-item>
    </nz-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        tel: [this.$formRules.required, this.$formRules.mobile],
        password: [this.$formRules.required],
        isNotice: [this.$formRules.required]
      }
    };
  },
  methods: {
    async save() {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.USER.RESET_PWD, this.form);
        return { valid, err, res };
      } else {
        return { valid };
      }
    },
    async editFrom(userID) {
      this.reset();
      await this.$nextTick();
      this.form.userID = userID;
    },
    reset() {
      this.form = {
        userID: '',
        tel: '',
        password: '',
        isNotice: '0'
      };
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    }
  },
  created() {
    this.reset();
  }
};
</script>
