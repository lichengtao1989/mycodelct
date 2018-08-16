<template>
  <div class="page-login">
    <div class="content">
      <div class="login-wrap">
        <div class="login-bg" :style="'background-image:url('+loginLogo.loginBackgroundImage[0]+')'"></div>
        <div class="login-main">
          <img v-if="loginLogo.loginType == 0" :src="loginLogo.loginImage[0]" class="logo">
          <div v-if="loginLogo.loginType == 1" class="login-logo">{{loginLogo.loginText}}</div>
          <div class="login-box">
            <ul>
              <li :class="{'active': loginActive}" @click="changeLogin">门店用户登陆</li>
              <li :class="{'active': !loginActive}" @click="changeLogin">政府用户登陆</li>
            </ul>
            <nz-form class="form" ref="form" :model="form" :rules="rules">
              <nz-form-item prop="mobile" class="input-wrap" v-if="loginActive" required>
                <nz-input placeholder="请输入手机号" v-model="form.mobile" prefix-icon="nz-icon-mobile"></nz-input>
              </nz-form-item>
              <nz-form-item prop="mobile" class="input-wrap" v-if="!loginActive" required>
                <nz-input placeholder="请输入用户名" v-model="form.mobile" prefix-icon="nz-icon-mobile"></nz-input>
              </nz-form-item>
              <nz-form-item prop="password" class="input-wrap" required>
                <nz-input placeholder="请输入密码" v-model="form.password" type="password" prefix-icon="nz-icon-password"></nz-input>
              </nz-form-item>
              <nz-form-item class="input-wrap" style="margin-bottom: 35px;">
                <div class="free-reg" @click="freeReg">没有账户？免费注册</div>
                <div class="forget-password" @click="jumpForgetPassword">忘记密码？</div>
              </nz-form-item>
              <nz-form-item>
                <nz-button type="primary" @click="login" :loading="loginStatus" class="login-bottom">
                  登录</nz-button>
              </nz-form-item>
            </nz-form>
          </div>
          <div class="login-box" v-if="isLogin">
            <h1>密码重置</h1>
            <nz-form class="form" ref="forgetPassWordForm" :model="forgetPassWordForm" :rules="forgetPassWordrules">
              <nz-form-item prop="mobile" class="input-wrap" required>
                <nz-input placeholder="请输入手机号" v-model="forgetPassWordForm.mobile" prefix-icon="nz-icon-mobile"></nz-input>
              </nz-form-item>
              <nz-form-item prop="code" class="input-wrap" required>
                <nz-input placeholder="请输入手机验证码" v-model="forgetPassWordForm.code">
                  <nz-button slot="append" class="get-verification-code" :class="{'get-verification-code-disabled': disabledCode}" :disabled="disabledCode" @click="sendSms">{{getVerificationCode}}</nz-button>
                </nz-input>
              </nz-form-item>
              <nz-form-item prop="newPassword" class="input-wrap" required>
                <nz-input placeholder="请输入密码" type="password" v-model="forgetPassWordForm.newPassword" prefix-icon="nz-icon-password"></nz-input>
              </nz-form-item>
              <nz-form-item class="input-wrap" prop="confirmPassword" required>
                <nz-input placeholder="请再次输入密码" type="password" v-model="forgetPassWordForm.confirmPassword" prefix-icon="nz-icon-password"></nz-input>
              </nz-form-item>
              <nz-form-item style="margin-bottom: 0px;">
                <nz-button type="primary" @click="forgetPassword" class="login-bottom">
                  确定</nz-button>
              </nz-form-item>
              <nz-form-item class="back-login">
                <label @click="backLogin">返回登录</label>
              </nz-form-item>
            </nz-form>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-right">Copyright 2005-2025 技术架构：甲骨文超级码科技股份 版权所有 Inc. All Reserved. 浙ICP备09106406号-9</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      loginStatus: false,
      loginActive: true,
      getVerificationCode: '获取验证码',
      countDownTime: '',
      loginLogo: {
        loginType: '0',
        loginImage: ['//nongzi.app315.net/static/img/logo.png'],
        loginText: '投入品流通溯源监管系统',
        loginBackgroundImage: ['//nongzi.app315.net/static/img/login-bg.jpg']
      },
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
        mobile: [
          this.$formRules.required,
          {
            validator: this.validatorMobile,
            trigger: 'blur'
          }
        ],
        password: [this.$formRules.required, this.$formRules.maxLength(20)]
      },
      forgetPassWordrules: {
        mobile: [this.$formRules.required, this.$formRules.mobile],
        code: [this.$formRules.required],
        newPassword: [this.$formRules.required, this.$formRules.maxLength(20)],
        confirmPassword: [
          this.$formRules.required,
          {
            validator: this.validatorRePassWord,
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    changeLogin() {
      if (this.loginActive) {
        this.loginActive = false;
      } else {
        this.loginActive = true;
      }
    },
    async validatorRePassWord(t, e, o) {
      e !== this.forgetPassWordForm.newPassword ? o(new Error('2次输入的密码不一致')) : o();
    },
    validatorMobile(t, e, callback) {
      if (this.loginActive) {
        const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
        if (!reg.test(e)) {
          callback(new Error('请输入正确的手机号'));
        }
      }
      callback();
    },
    async login() {
      const valid = await this.$validForm(this.$refs.form);
      if (!this.loginActive) {
        this.form.type = 1;
      }
      if (valid) {
        this.loginStatus = true;
        let { err, res } = await this.$model('user').login(this.form);
        await this.$sleep(500);
        if (res.resultCode == 200) {
          this.$router.push('/main');
          this.loginStatus = false;
        } else {
          this.$message.showError(err);
          this.loginStatus = false;
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
    async getOrgExt() {
      let { err, res } = await this.$model('user').getOrgExt();
      if (res.resultCode == 200) {
        this.$storage.set('configInfo', res.data);
        if (this.$storage.get('configInfo').detail) {
          this.$storage.get('configInfo').detail.forEach(item => {
            if (item.itemName == 'loginLogo') {
              this.loginLogo = JSON.parse(item.itemValue);
            }
          });
        }
      } else {
        this.$message.showError(err);
      }
    }
  },
  mounted() {
    this.bodyListener = e => {
      if (e.keyCode === 13) {
        this.login();
      }
    };
    document.body.addEventListener('keyup', this.bodyListener, false);
  },
  beforeDestroy() {
    document.body.removeEventListener('keyup', this.bodyListener);
  },
  created() {
    this.getOrgExt();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.page-login {
}
.content {
  min-height: 600px;
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
.login-logo {
  font-size: 48px;
  color: #00a88a;
  font-weight: bold;
  margin-top: 20px;
}
</style>
