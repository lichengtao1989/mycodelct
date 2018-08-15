<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="手机号" prop="mobile" required>
      <cjm-input :disabled="true" v-model="form.mobile"></cjm-input>
      <cjm-button type="primary" class="send-sms-button" :disabled="sendBtnDisabled" @click="sendCode">{{sendBtnText}}
      </cjm-button>
    </cjm-form-item>
    <div style="clear:both;"></div>
    <cjm-form-item label="短信验证码" prop="code" required>
      <cjm-input v-model="form.code"></cjm-input>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
export default {
  data() {
    return {
      enums: this.$globalData.get('code', 'enums'),
      apiUrl: this.$globalData.get('code', 'apiUrl'),
      form: {},
      rules: {
        mobile: [this.$formRules.required, this.$formRules.mobile],
        code: [this.$formRules.required]
      },
      sendBtnDisabled: false,
      sendBtnText: '发送验证码',
      countDownSeconds: 60
    };
  },
  methods: {
    initForm() {
      this.reset();
    },
    reset() {
      this.form = {
        mobile: this.$globalData.get('currentUser').mobile,
        code: '',
        usage: 'codeGeneration'
      };
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
      });
    },
    //发送验证码
    sendCode() {
      this.sendBtnDisabled = true;
      this.$ajax
        .post(this.apiUrl.common.SEND_SMS_CODE, {
          mobile: this.form.mobile,
          usage: this.form.usage
        })
        .then(r => {
          if (r.resultCode == '200') {
            this.$message.success('短信已发送到您的手机，请注意查收');
            this.sendBtnCountDown();
          } else {
            this.$message.error(r.msg);
            this.sendBtnDisabled = false;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
          this.sendBtnDisabled = false;
        });
    },
    //发送按钮倒计时
    sendBtnCountDown() {
      if (this.countDownSeconds <= 0) {
        this.resetCountDown();
        return;
      }
      this.countDownSeconds--;
      this.sendBtnText = `重发 (${this.countDownSeconds}s)`;
      setTimeout(() => {
        this.sendBtnCountDown();
      }, 1000);
    },
    //重置倒计时
    resetCountDown() {
      this.sendBtnText = '发送验证码';
      this.sendBtnDisabled = false;
      this.countDownSeconds = 60;
    },
    //提交
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.apiUrl.common.CHECK_SMS_CODE, this.form).then(r => {
          if (r.resultCode != '200') {
            throw new Error(r.msg);
          }
        });
      });
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
.send-sms-button {
  position: absolute;
  top: 0;
  right: -110px;
}
</style>
