<template>
  <div class="content">
    <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="标题" prop="title" required>
        <nz-input v-model="form.title" :maxlength="40"></nz-input>
      </nz-form-item>
      <nz-form-item label="概要" prop="outline">
        <nz-input v-model="form.outline" :maxlength="100"></nz-input>
      </nz-form-item>
      <nz-form-item label="内容" prop="content">
        <nz-editor v-model="form.content" :height="300"></nz-editor>
      </nz-form-item>
    </nz-form>
  </div>
</template>
<script>
import NzEditor from '../../../framework/components/base/editor';
export default {
  components: {
    NzEditor
  },
  data() {
    let apiUrl = this.$apiUrl.NEWMANAGEMENT;
    return {
      apiUrl: apiUrl,
      isRegister: false,
      loadData: false,
      form: {},
      rules: {
        title: [this.$formRules.required, this.$formRules.maxLength(40)],
        outline: [this.$formRules.maxLength(500)]
      }
    };
  },
  methods: {
    async save() {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SAVE, this.form);
        return { valid, err, res };
      } else {
        return { valid };
      }
    },
    async editFrom(newId) {
      this.reset();
      let data = {
        id: newId
      };
      let { err, res } = await this.$model('dataManagement').commonfn2(this.apiUrl.GET, data);
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
        newID: '',
        module: 3,
        title: '',
        content: '',
        outline: ''
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
