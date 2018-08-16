<template>
  <div v-tab-title="'个性化设置'" class="logo-conent">
    <div class="nz-edit-page">
      <nz-form ref="form" label-width="150px" :model="form" :rules="rules" style="padding: 20px;display: inline-block;">
        <h1 class="nz-h1">系统Logo设置</h1>
        <nz-form-item label="显示方式" prop="type" required class="nz-form-item-long">
          <nz-enum-select v-model="form.type" is-radio :options="$enum('logo显示方式').values"></nz-enum-select>
        </nz-form-item>
        <nz-form-item label="图片" prop="image" v-if="form.type == 0" required class="nz-form-item-long">
          <nz-image-upload v-model="form.image" tips="建议上传图片大小长不限，高40"></nz-image-upload>
        </nz-form-item>
        <nz-form-item label="文字" prop="text" v-if="form.type == 1" required class="nz-form-item-long">
          <nz-input v-model="form.text" style="width:450px;"></nz-input>
        </nz-form-item>
        <h1 class="nz-h1">登录界面设置</h1>
        <nz-form-item label="显示方式" prop="loginType" required class="nz-form-item-long">
          <nz-enum-select v-model="form.loginType" is-radio :options="$enum('logo显示方式').values"></nz-enum-select>
        </nz-form-item>
        <nz-form-item label="图片" prop="loginImage" v-if="form.loginType == 0" required class="nz-form-item-long">
          <nz-image-upload v-model="form.loginImage" tips="建议上传图片大小长不限，高40"></nz-image-upload>
        </nz-form-item>
        <nz-form-item label="文字" prop="loginText" v-if="form.loginType == 1" required class="nz-form-item-long">
          <nz-input v-model="form.loginText" style="width:450px;"></nz-input>
        </nz-form-item>
        <nz-form-item label="背景图片" prop="loginBackgroundImage" required class="nz-form-item-long">
          <nz-image-upload v-model="form.loginBackgroundImage" tips="建议上传图片1920*686"></nz-image-upload>
        </nz-form-item>
      </nz-form>
      <div class="nz-page-bottom-bar" style="bottom:30px;">
        <nz-button type="primary" @click="save">
          <i class="nz-icon-confirm"></i>保存</nz-button>
        <nz-button @click="restore">
          <i class="nz-icon-reset"></i>恢复默认</nz-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        orgID: '',
        type: '0',
        image: ['//nongzi.app315.net/static/img/syslogo.png'],
        text: '投入品流通溯源监管系统',
        loginType: '0',
        loginImage: ['//nongzi.app315.net/static/img/logo.png'],
        loginText: '投入品流通溯源监管系统',
        loginBackgroundImage: ['//nongzi.app315.net/static/img/login-bg.jpg']
      },
      submitForm: {
        orgID: '',
        detail: [
          {
            itemName: 'sysLogo',
            itemValue: { type: '0', image: ['//nongzi.app315.net/static/img/syslogo.png'], text: '投入品流通溯源监管系统' }
          },
          {
            itemName: 'loginLogo',
            itemValue: { loginType: '0', loginImage: ['//nongzi.app315.net/static/img/logo.png'], loginText: '投入品流通溯源监管系统', loginBackgroundImage: ['//nongzi.app315.net/static/img/login-bg.jpg'] }
          }
        ]
      },
      rules: {
        type: [this.$formRules.required],
        image: [this.$formRules.required],
        text: [this.$formRules.required],
        loginType: [this.$formRules.required],
        loginImage: [this.$formRules.required],
        loginText: [this.$formRules.required],
        loginBackgroundImage: [this.$formRules.required]
      }
    };
  },
  watch: {
    'form.image': {
      handler(val, oldVal) {
        if (val == '') {
          this.$nextTick(() => {
            this.form.image = [];
            this.form.image.push('//nongzi.app315.net/static/img/syslogo.png');
          });
        }
      },
      deep: true
    },
    'form.loginImage': {
      handler(val, oldVal) {
        if (val == '') {
          this.$nextTick(() => {
            this.form.loginImage = [];
            this.form.loginImage.push('//nongzi.app315.net/static/img/logo.png');
          });
        }
      },
      deep: true
    },
    'form.loginBackgroundImage': {
      handler(val, oldVal) {
        if (val == '') {
          this.$nextTick(() => {
            this.form.loginBackgroundImage = [];
            this.form.loginBackgroundImage.push('//nongzi.app315.net/static/img/login-bg.jpg');
          });
        }
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    //保存
    async save() {
      const valid = await this.$validForm(this.$refs.form);
      this.submitForm.orgID = this.form.orgID;
      this.submitForm.detail[0].itemValue.type = this.form.type;
      this.submitForm.detail[0].itemValue.image = this.form.image;
      this.submitForm.detail[0].itemValue.text = this.form.text;
      this.submitForm.detail[1].itemValue.loginType = this.form.loginType;
      this.submitForm.detail[1].itemValue.loginImage = this.form.loginImage;
      this.submitForm.detail[1].itemValue.loginText = this.form.loginText;
      this.submitForm.detail[1].itemValue.loginBackgroundImage = this.form.loginBackgroundImage;
      if (valid) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.ORG.SAVE_LOGO, this.submitForm);
        if (res.resultCode == 200) {
          this.$router.push('/main/org');
        } else {
          this.$message.showError(err);
        }
      } else {
        return { valid };
      }
    },
    async editFrom(orgID) {
      this.reset();
      let data = {
        orgID: orgID
      };
      let { err, res } = await this.$model('dataManagement').commonfn2(this.$apiUrl.ORG.GET_LOGO, data);
      if (res.resultCode == 200) {
        res.data.detail.forEach(item => {
          if (item.itemName == 'sysLogo') {
            this.submitForm.detail[0].itemValue = JSON.parse(item.itemValue);
            this.form.type = this.submitForm.detail[0].itemValue.type;
            this.form.image = this.submitForm.detail[0].itemValue.image;
            this.form.text = this.submitForm.detail[0].itemValue.text;
          } else if (item.itemName == 'loginLogo') {
            this.submitForm.detail[1].itemValue = JSON.parse(item.itemValue);
            this.form.loginType = this.submitForm.detail[1].itemValue.loginType;
            this.form.loginImage = this.submitForm.detail[1].itemValue.loginImage;
            this.form.loginText = this.submitForm.detail[1].itemValue.loginText;
            this.form.loginBackgroundImage = this.submitForm.detail[1].itemValue.loginBackgroundImage;
          }
          this.submitForm.orgID = res.data.orgID;
          this.form.orgID = res.data.orgID;
        });
      } else {
        this.$message.showError(err);
      }
    },
    reset() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    //还原
    async restore() {
      let msg = await this.$message.confirm('确定要回复默认吗');
      if (msg) {
        this.form.type = '0';
        this.form.image = ['//nongzi.app315.net/static/img/syslogo.png'];
        this.form.text = '投入品流通溯源监管系统';
        this.form.loginType = '0';
        this.form.loginImage = ['//nongzi.app315.net/static/img/logo.png'];
        this.form.loginText = '投入品流通溯源监管系统';
        this.form.loginBackgroundImage = ['//nongzi.app315.net/static/img/login-bg.jpg'];
      }
    }
  },
  async created() {
    this.reset();
    let query = this.$route.query || {};
    if (query.orgId > 0) {
      this.form.orgID = query.orgId;
      this.editFrom(query.orgId);
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
.logo-conent {
  display: inline-block;
  width: 100%;
  background-color: #fff;
}
</style>
