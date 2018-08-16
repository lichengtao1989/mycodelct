<template>
  <div class="content">
    <div class="register-main">
      <nz-form class="form" label-width="200px" ref="form" :model="form" :rules="rules">
        <business-entity v-if="loadData" :form="form" :rules="rules" :currentPage="currentPage"></business-entity>
        <div class="confirm-bottom" style="bottom:-38px;max-width:800px;">
          <nz-button :loading="isRegister" v-if="currentPage == 'governmentEdit'" @click="cancel">
            <i class="nz-icon-close"></i>取消</nz-button>
          <nz-button type="primary" :loading="isRegister" @click="save">
            <i class="nz-icon-confirm"></i>确定</nz-button>
        </div>
      </nz-form>
    </div>
  </div>
</template>
<script>
import businessEntity from '../../login-reg/components/business-entity.vue';
export default {
  components: {
    businessEntity
  },
  data() {
    let apiUrl = this.$apiUrl.DATAMANAGEMENT;
    return {
      apiUrl: apiUrl,
      isRegister: false,
      currentPage: 'edit',
      loadData: false,
      form: {
        storeID: '',
        mobile: '',
        code: '',
        password: '',
        confirmPassword: '',
        orgId: 1,
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
        moblie: [this.$formRules.required, this.$formRules.mobile],
        scope: [this.$formRules.required, this.$formRules.maxLength(40)],
        storeName: [this.$formRules.required, this.$formRules.maxLength(40)],
        legal: [this.$formRules.required, this.$formRules.maxLength(10)],
        creditCode: [this.$formRules.required, this.$formRules.maxLength(18)],
        licenseImg: [this.$formRules.required],
        regionCode: [this.$formRules.required]
      }
    };
  },
  methods: {
    async save() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        this.isRegister = true;
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SAVE, this.form);
        if (res.resultCode == 200) {
          this.$message.success('修改成功');
          if (this.currentPage == 'governmentEdit') {
            this.$router.push({ path: '/main/businessEntityList' });
          }
        } else {
          this.$message.showError(err.msg);
        }
        this.isRegister = false;
      }
    },
    async getStore(storeId) {
      let data = {
        storeId: storeId
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.GET, data);
      if (res.resultCode == 200) {
        this.form = res.data;
        if (res.data.licenseImg != '' || res.data.licenseImg != null) {
          this.form.licenseImg = JSON.parse(res.data.licenseImg);
        } else {
          this.form.licenseImg = [];
        }
        this.loadData = true;
      } else {
        this.$message.showError(err);
      }
    },
    async cancel() {
      this.isRegister = true;
      this.$router.back(-1);
    }
  },
  mounted: function() {
    // var t = this.$storage.get('countDownEndTime');
    // if (t && t > 0) {
    //   var e = Math.floor((t - Date.now()) / 1e3);
    //   e > 0 && ((this.countdown = e), this.startCountdown());
    // }
    let query = this.$route.query || {};
    if (query.storeID != undefined) {
      this.getStore(query.storeID);
      this.currentPage = query.currentPage;
    } else {
      let storeId = this.$storage.get('userInfo').storeId;
      if (this.$storage.get('userInfo').storeId) {
        this.getStore(storeId);
      }
    }
    this.$nextTick(() => {
      this.$refs.form.resetFields();
    });
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
  padding-bottom: 50px;
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
