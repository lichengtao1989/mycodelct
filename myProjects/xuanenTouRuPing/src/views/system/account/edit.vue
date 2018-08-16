<template>
  <div class="content">
    <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="登录名" required prop="mobile">
        <nz-input placeholder="请输入11位手机号" v-model="form.mobile"></nz-input>
      </nz-form-item>
      <nz-form-item v-if="form.userID == ''" label="密码" required prop="password">
        <nz-input v-model="form.password" type="password"></nz-input>
      </nz-form-item>
      <nz-form-item label="用户姓名" required prop="userName">
        <nz-input v-model="form.userName"></nz-input>
      </nz-form-item>
      <nz-form-item label="所属角色" required prop="roleID">
        <nz-remote-select :remote-url="$apiUrl.ROLE.GET_LIST_ROLE" :label="form.roleName" v-model="form.roleID"></nz-remote-select>
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
        mobile: [this.$formRules.required, this.$formRules.mobile],
        userName: [this.$formRules.required, this.$formRules.maxLength(10)],
        password: [this.$formRules.required],
        roleID: [this.$formRules.required]
      }
    };
  },
  methods: {
    async save() {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.USER.SAVE_ACCOUNT_LIST, this.form);
        return { valid, err, res };
      } else {
        return { valid };
      }
    },
    async editFrom(userID) {
      this.reset();
      let data = {
        id: userID
      };
      let { err, res } = await this.$model('dataManagement').commonfn2(this.$apiUrl.USER.GET_ACCOUNT_BY_ID, data);
      if (res.resultCode == 200) {
        this.form = res.data;
      } else {
        this.$message.showError(err);
      }
    },
    addFrom() {
      this.reset();
    },
    reset() {
      this.form = {
        userID: '',
        mobile: '',
        password: '',
        userName: '',
        roleID: '',
        roleName: ''
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
<style rel='stylesheet/less' lang='less' scoped>
body {
  padding: 0;
  margin: 0;
  background-color: #ffffff;
  min-width: 1200px;
}
.content {
}
.register-wrap {
  text-align: center;
}
.register-main {
}
h1 {
  color: #00a88a;
  font-size: 30px;
  font-weight: lighter;
  text-align: center;
  margin: 35px 0 80px;
}
.form {
  width: 650px;
  display: inline-block;
  text-align: left;
}
.confirm-bottom {
  text-align: center;
  margin-top: 20px;
}
</style>
