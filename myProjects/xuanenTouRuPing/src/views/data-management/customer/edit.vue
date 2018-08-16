<template>
  <div class="content">
    <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
      <nz-button type="primary" style="margin-bottom: 10px;" @click="startFun">
        <span>识读身份证</span>
      </nz-button>
      <nz-form-item label="姓名" prop="name" required>
        <nz-input v-model="form.name" :disabled="disabled"></nz-input>
      </nz-form-item>
      <nz-form-item label="公司名称" prop="corpName">
        <nz-input v-model="form.corpName"></nz-input>
      </nz-form-item>
      <nz-form-item label="手机号" prop="mobile">
        <nz-input v-model="form.mobile"></nz-input>
      </nz-form-item>
      <nz-form-item label="地址" prop="address">
        <nz-input v-model="form.address" :disabled="disabled"></nz-input>
      </nz-form-item>
      <nz-form-item label="性别" prop="sex">
        <nz-enum-select v-model="form.sex" :disabled="disabled" is-radio :options="$enum('性别').values"></nz-enum-select>
      </nz-form-item>
      <nz-form-item label="身份证号" prop="identityNumber" required>
        <nz-input v-model="form.identityNumber" :disabled="disabled"></nz-input>
      </nz-form-item>
      <nz-form-item label="民族" prop="nationality">
        <nz-input v-model="form.nationality" :disabled="disabled"></nz-input>
      </nz-form-item>
      <nz-form-item label="出生" prop="birthDate">
        <nz-input v-model="form.birthDate" :disabled="disabled"></nz-input>
      </nz-form-item>
      <nz-form-item label="签发机构" prop="authority">
        <nz-input v-model="form.authority" :disabled="disabled"></nz-input>
      </nz-form-item>
      <nz-form-item label="身份证照片" prop="identityImg">
        <nz-image-upload v-if="form.source == 2 || form.source == 4" v-model="form.identityImg.positive"></nz-image-upload>
        <img :src="form.identityImg.positive" v-if="form.source == 1" alt="" width="90px" class="identity" height="90px">
      </nz-form-item>
    </nz-form>
  </div>
</template>
<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.DATAMANAGEMENT;
    return {
      apiUrl: apiUrl,
      isRegister: false,
      loadData: false,
      form: {},
      disabled: false,
      rules: {
        mobile: [this.$formRules.mobile],
        identityNumber: [this.$formRules.required, this.$formRules.idCardNo],
        address: [this.$formRules.maxLength(100)],
        corpName: [this.$formRules.maxLength(40)],
        legal: [this.$formRules.required, this.$formRules.maxLength(10)],
        name: [this.$formRules.required, this.$formRules.maxLength(10)]
      }
    };
  },
  watch: {
    'form.source': function(val) {
      if (val == 1) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }
  },
  methods: {
    trim(string) {
      return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
    },
    async save() {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SAVE_CUSTOMER, this.form);
        return { valid, err, res };
      } else {
        return { valid };
      }
    },
    async editFrom(customerId) {
      this.reset();
      let data = {
        customerId: customerId
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.GET_CUSTOMER, data);
      if (res.resultCode == 200) {
        this.form = res.data;
        if (res.data.identityImg != '' && res.data.identityImg != null) {
          this.form.identityImg = JSON.parse(res.data.identityImg);
        } else {
          this.form.identityImg = {
            positive: []
          };
        }
      } else {
        this.$message.showError(err);
      }
    },
    addFrom() {
      this.reset();
    },
    reset() {
      this.form = {
        customerID: '',
        name: '',
        sex: '',
        mobile: '',
        corpName: '',
        identityNumber: '',
        identityImg: {
          positive: []
        },
        address: '',
        nationality: '',
        birthDate: '',
        authority: '',
        source: 2
      };
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    //识读身份证
    async startFun() {
      let url = 'http://127.0.0.1:24010/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4&REPEAT=1&common=1';
      let { err, res } = await this.$model('dataManagement').commonfn2(url);
      let successRes = JSON.parse(res.replace(/\\/g, '/'));
      //console.log(successRes);
      if (successRes.ret == 0) {
        let Certificate = successRes.Certificate;
        this.form.name = this.trim(Certificate.Name);
        this.form.sex = this.trim(Certificate.Sex);
        this.form.address = this.trim(Certificate.Address);
        this.form.identityNumber = this.trim(Certificate.IDNumber);
        this.form.nationality = Certificate.Nation;
        this.form.birthDate = Certificate.Birthday;
        this.form.authority = Certificate.IDIssued;
        this.form.identityImg.positive = 'data:image/jpg;base64,' + Certificate.Base64Photo;
        this.form.source = 1;
      } else {
        this.$message.showError(err);
      }
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
.identity {
  border: 1px dashed #bfcbd9;
}
</style>
