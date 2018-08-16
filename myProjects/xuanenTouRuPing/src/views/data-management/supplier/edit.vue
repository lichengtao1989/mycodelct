<template>
  <div class="content">
    <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="供应商名称" prop="supplierName" required>
        <nz-input v-model="form.supplierName"></nz-input>
      </nz-form-item>
      <nz-form-item label="统一社会信用代码" prop="uniformCreditCode">
        <nz-input v-model="form.uniformCreditCode"></nz-input>
      </nz-form-item>
      <nz-form-item label="联系人" prop="contact">
        <nz-input v-model="form.contact"></nz-input>
      </nz-form-item>
      <nz-form-item label="联系电话" prop="mobile" required>
        <nz-input v-model="form.mobile"></nz-input>
      </nz-form-item>
      <nz-form-item label="地址" prop="address">
        <nz-input v-model="form.address"></nz-input>
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
      titleName: '添加供应商',
      form: {},
      rules: {
        mobile: [this.$formRules.required, this.$formRules.mobile],
        uniformCreditCode: [
          {
            validator: this.validatorCode,
            trigger: 'blur'
          }
        ],
        contact: [this.$formRules.maxLength(10)],
        address: [this.$formRules.maxLength(100)],
        supplierName: [this.$formRules.required, this.$formRules.maxLength(40)]
      }
    };
  },
  methods: {
    async validatorCode(t, e, o) {
      let patrn = /^[0-9A-Za-z]+$/;
      if (e != null && e.length > 0) {
        if (e.length != 18 || patrn.test(e) == false) {
          o(new Error('请输入正确的统一社会信用代码'));
        }
      }
    },
    async save() {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SAVE_SUPPLIER, this.form);
        return { valid, err, res };
      } else {
        return { valid };
      }
    },
    async editForm(supplierId) {
      this.reset();
      let data = {
        supplierId: supplierId
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.GET_SUPPLIER, data);
      if (res.resultCode == 200) {
        this.form = res.data;
      } else {
        this.$message.showError(err);
      }
    },
    addForm() {
      this.reset();
    },
    reset() {
      this.form = {
        supplierID: '',
        uniformCreditCode: '',
        contact: '',
        supplierName: '',
        mobile: '',
        address: ''
      };
      this.isRegister = false;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
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
