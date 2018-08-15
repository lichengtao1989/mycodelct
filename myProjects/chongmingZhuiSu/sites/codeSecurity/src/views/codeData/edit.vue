<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="手机号" class="cjm-form-item-long">
        <cjm-input v-model="form.mobile" :disabled="true"></cjm-input>
        <cjm-button @click="sendMessage">向此手机发送验证码</cjm-button>
      </cjm-form-item>
      <cjm-form-item label="短信验证" class="cjm-form-item-long" prop="message" required>
        <cjm-input v-model="form.message"></cjm-input>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        message: [this.$formRules.required]
      }
    };
  },
  methods: {
    reset() {
      this.form = {
        mobile: this.$globalData.get('currentUser').mobile,
        message: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    addForm(row) {
      this.reset();
    },
    sendMessage() {
      this.$ajax.get(this.$globalData.get('codeSecurity', 'apiUrl').codeData.GET_CODE).then(res => {
        if (res.resultCode === '200') {
          this.$message('发送成功！');
        } else {
          this.$message('发送失败!');
        }
      });
    },
    checkCode() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax
          .post(this.$globalData.get('codeSecurity', 'apiUrl').codeData.CHECK_CODE, {
            code: this.form.message
          })
          .then(res => {
            if (res.resultCode != '200') {
              throw new Error(res.msg);
            }
          });
      });
    }
  },
  mounted() {
    this.reset();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';

.cjm-form-item-long .el-input {
  width: 50%;
}
</style>
