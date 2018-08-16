<template>
  <div class="content">
    <div class="register-wrap">
      <div class="register-main">
        <h1>欢迎注册，农资管理系统</h1>
        <div class="existing-account" @click="login">已有账户？直接登录</div>
        <nz-form class="form" label-width="200px" ref="form" :model="form" :rules="rules">
          <business-entity :form="form" :rules="rules" :currentPage="currentPage"></business-entity>
          <nz-form-item style="text-align: center;margin-top: 30px;">
            <nz-button type="primary" :loading="isRegister" @click="register">提交注册</nz-button>
          </nz-form-item>
        </nz-form>
      </div>
    </div>
  </div>
</template>
<script>
import businessEntity from './components/business-entity.vue';
export default {
  components: {
    businessEntity
  },
  data() {
    return {
      isRegister: false,
      currentPage: 'register',
      form: {
        mobile: '',
        code: '',
        password: '',
        confirmPassword: '',
        //orgId: '',
        storeName: '',
        legal: '',
        creditCode: '',
        licenseKey: '',
        licenseImg: [],
        regionCode: '',
        address: '',
        scope: '',
        type: '1',
        isSaleRestrictivePesticides: '0',
        longitude: '',
        latitude: ''
      },
      rules: {
        mobile: [this.$formRules.required, this.$formRules.mobile],
        code: [this.$formRules.required],
        password: [this.$formRules.required, this.$formRules.maxLength(20)],
        confirmPassword: [
          this.$formRules.required,
          {
            validator: this.validatorRePassWord,
            trigger: 'blur'
          }
        ],
        storeName: [this.$formRules.required, this.$formRules.maxLength(40)],
        legal: [this.$formRules.required, this.$formRules.maxLength(10)],
        licenseKey: [
          this.$formRules.required,
          {
            validator: this.validatorCode,
            trigger: 'blur'
          }
        ],
        creditCode: [
          this.$formRules.required,
          {
            validator: this.validatorCode,
            trigger: 'blur'
          }
        ],
        licenseImg: [this.$formRules.required],
        regionCode: [this.$formRules.required]
      }
    };
  },
  methods: {
    async validatorRePassWord(t, e, o) {
      e !== this.form.password ? o(new Error('2次输入的密码不一致')) : o();
    },
    async validatorCode(t, e, o) {
      let patrn = /^[0-9A-Za-z]+$/;
      if (e.length != 18 || patrn.test(e) == false) {
        o(new Error('请输入正确的信息'));
      }
    },
    async register() {
      const valid = await this.$refs.form.validate();
      if (this.form.confirmPassword !== this.form.password) {
        this.$message.showError('2次输入的密码不一致');
        return false;
      }
      if (valid) {
        // this.isRegister = true;
        // let orgData = {
        //   domainName: document.location.hostname
        //   //domainName: 'nzjxc.kf315.net'
        // };
        // this.$ajax
        //   .post(this.$apiUrl.USER.GET_ORG_INFO, orgData)
        //   .then(r => {
        //     if (r.res.resultCode == 200) {
        //       this.sendRegister();
        //     } else {
        //       this.$message.showError(r.err);
        //     }
        //     this.isRegister = false;
        //   })
        //   .catch(() => {});
        this.sendRegister();
      } else {
        this.isRegister = false;
      }
    },
    sendRegister() {
      this.$ajax
        .post(this.$apiUrl.USER.REGISTER, this.form)
        .then(r => {
          if (r.res.resultCode == 200) {
            this.$message.success('注册成功');
            this.$router.push('/login');
          } else {
            this.$message.showError(r.err);
          }
          this.isRegister = false;
        })
        .catch(() => {});
    },
    async login() {
      this.$router.push('/login');
    }
  },
  mounted: function() {
    // var t = this.$storage.get('countDownEndTime');
    // if (t && t > 0) {
    //   var e = Math.floor((t - Date.now()) / 1e3);
    //   e > 0 && ((this.countdown = e), this.startCountdown());
    // }
  },
  beforeDestroy: function() {
    clearTimeout(this.countDownTimeOut);
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
  min-height: 700px;
  background-color: #fff;
}
.register-wrap {
  text-align: center;
}
.register-main {
  position: relative;
  margin-top: 50px;
  display: inline-block;
  width: 1200px;
  background-color: #fff;
  height: 795px;
  color: #00a88a;
}
h1 {
  color: #00a88a;
  font-size: 30px;
  font-weight: lighter;
  text-align: center;
  margin: 35px 0 15px;
}
.form {
  width: 650px;
  display: inline-block;
  text-align: left;
}
.existing-account {
  padding-bottom: 30px;
  text-align: right;
  padding-right: 355px;
  cursor: pointer;
}
</style>
