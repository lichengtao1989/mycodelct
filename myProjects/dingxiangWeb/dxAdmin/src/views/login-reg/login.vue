<template>
  <div class="page-login">
    <div class="content">
      <div class="yyde">用户登录</div>
      <div class="formwrap">
        <nz-form v-if="!isLogin" class="form" ref="form" :model="form" :rules="rules">
          <nz-form-item prop="mobile" class="input-wrap" required>
            <nz-input placeholder="请输入账号" v-model="form.mobile" prefix-icon="nz-icon-mobile"></nz-input>
          </nz-form-item>
          <nz-form-item prop="password" class="input-wrap" required>
            <nz-input placeholder="请输入密码" v-model="form.password" type="password" prefix-icon="nz-icon-password"></nz-input>
          </nz-form-item>

          <nz-form-item>
            <nz-button type="primary" @click="login" :loading="loginStatus" class="login-bottom">
              登录
            </nz-button>
          </nz-form-item>
        </nz-form>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      loginStatus: false,
      loginActive: true,
      isSavePassword: false,
      getVerificationCode: '获取验证码',
      countDownTime: '',
      form: {
        mobile: '',
        password: ''
      },
      forgetPassWordForm: {
        mobile: '',
        code: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        mobile: [this.$formRules.required],
        password: [this.$formRules.required, this.$formRules.maxLength(20)]
      },
      forgetPassWordrules: {
        mobile: [this.$formRules.required, this.$formRules.mobile],
        code: [this.$formRules.required],
        newPassword: [this.$formRules.required, this.$formRules.maxLength(20)],
        confirmPassword: [this.$formRules.required, { validator: this.validatorRePassWord, trigger: 'blur' }]
      }
    };
  },
  methods: {
    changeLogin() {
      if (this.loginActive) {
        this.loginActive = false;
      } else {
        this.loginActive = true;
      }
    },
    async validatorRePassWord(rule, value, callback) {
      value !== this.forgetPassWordForm.newPassword ? callback(new Error('2次输入的密码不一致')) : callback();
    },
    async login() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        this.loginStatus = true;
        const { mobile, password } = this.form;
        let isLoginSuccess = await this.$model('user').login(mobile, password);

        console.log(isLoginSuccess);
        await this.$sleep(500);
        this.loginStatus = false;
        this.$storage.set('loginData', { mobile, password, isSavePassword: true });
        if (this.isSavePassword) {
          this.$storage.set('loginData', { mobile, password, isSavePassword: true });
        } else {
          this.$storage.del('loginData');
        }
        if (isLoginSuccess) {
          this.$router.push('/main');
        }
      }
    },
    async jumpForgetPassword() {
      this.isLogin = true;
      this.forgetPassWordForm = {
        mobile: '',
        code: '',
        newPassword: '',
        confirmPassword: ''
      };
      this.getVerificationCode = `获取验证码`;
      this.disabledCode = false;
      clearInterval(this.countDownTime);
    },
    async forgetPassword() {
      const valid = await this.$refs.forgetPassWordForm.validate();
      if (valid) {
        let { err, res } = await this.$model('user').resetPassword(this.forgetPassWordForm);
        await this.$sleep(500);
        if (res.resultCode == 200) {
          this.$message.success(res.msg);
          this.isLogin = false;
        } else {
          this.isLogin = true;
          this.$message.showError(err);
        }
      }
    },
    async backLogin() {
      this.isLogin = false;
    },
    async freeReg() {
      this.$router.push('/register');
    },
    async sendSms() {
      let data = {
        mobile: this.forgetPassWordForm.mobile
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.USER.IS_EXIST, data);
      if (err) {
        this.$message.showError(err);
      }
      if (res.resultCode == 200) {
        if (res.data == 'true') {
          const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
          if (!reg.test(this.forgetPassWordForm.mobile)) {
            this.$message.error('请输入正确的手机号');
            return false;
          }
          let res = await this.$model('common').sendSms(this.forgetPassWordForm.mobile);
          if (res.resultCode == 200) {
            this.disabledCode = true;
            this.intervalSeconds();
          } else {
            this.$message.error(res.data);
          }
        } else {
          this.$message.error('该手机号未注册');
          return false;
        }
      }
    },
    intervalSeconds() {
      let seconds = 60;
      let self = this;
      this.countDownTime = setInterval(function() {
        self.getVerificationCode = `已发送${seconds}`;
        --seconds;
        if (seconds == 0) {
          clearInterval(self.countDownTime);
          self.getVerificationCode = `获取验证码`;
          self.disabledCode = false;
        }
      }, 1000);
    },
    setSaveInfo() {
      const loginData = this.$storage.get('loginData') || {};
      const { mobile = '', password = '', isSavePassword = false } = loginData;
      this.form.mobile = mobile;
      this.form.password = password;
      this.isSavePassword = isSavePassword;
    }
  },
  mounted() {
    this.bodyListener = e => {
      if (e.keyCode === 13) {
        this.login();
      }
    };
    document.body.addEventListener('keyup', this.bodyListener, false);
    this.setSaveInfo();
  },
  beforeDestroy() {
    document.body.removeEventListener('keyup', this.bodyListener);
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.page-login {
  width: 100%;
  height: 100%;
  background-image: url('../../../static/img/loginBg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.yyde {
  height: 77px;
  line-height: 77px;
  // font-weight: bold;
  font-size: 25px;
}
.formwrap {
  background: #fff;
  padding-right: 20px;
  padding-top: 20px;
}

.content {
  border-radius: 5px;
  -webkit-border-radius: 5px;

  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background: #f5f5f5;
  //  width:348px;

  text-align: center;
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
}

.login-wrap {
  position: relative;
}

.login-bg {
  height: 800px;
  background-color: #fff;
  background-image: url(/static/img/login-bg.jpg);
  background-repeat: no-repeat;
  background-position: center 120px;
}

.login-main {
  position: absolute;
  width: 1200px;
  height: 100%;
  left: 50%;
  top: 0;
  margin-left: -600px;
  .logo {
    margin-top: 30px;
  }
}

img {
  border-style: none;
}

.login-box {
  position: absolute;
  right: 0;
  top: 252px;
  width: 388px;
  height: 432px;
  background-color: #ffffff;
  border-radius: 5px;
  ul {
    height: 80px;
    line-height: 80px;
    li {
      font-size: 20px;
      width: 132px;
      float: left;
      list-style: none;
      color: #aeaeae;
      height: 60px;
      margin-right: 40px;
      cursor: pointer;
    }
    li.active {
      color: #00a88a;
      border-bottom: #00a88a 2px solid;
    }
  }
}

h1 {
  color: #00a88a;
  font-size: 30px;
  font-weight: lighter;
  text-align: center;
  margin: 35px 0 30px;
}

.form {
  width: 346px;
  margin-left: 21px;
}

.input-wrap {
  margin-bottom: 18px;
}

.free-reg {
  color: #c7c7c7;
  cursor: pointer;
  display: inline-block;
}

.forget-password {
  color: #c7c7c7;
  cursor: pointer;
  float: right;
}

.login-bottom {
  width: 100%;
  font-size: 18px;
}

.verification-code {
  width: 186px;
}

.get-verification-code {
  float: right;
  width: 130px;
  font-size: 16px;
}

.back-login {
  float: right;
  color: #00a88a;
  cursor: pointer;
  text-align: right;
}

.copy-right {
  color: #cccccc;
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
}
</style>
