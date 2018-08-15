<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="姓名" prop="name" required>
      <cjm-input v-model="form.name"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="所属机构" prop="orgID" required>
      <cjm-remote-select v-model="form.orgID" :remote-url="$globalData.get('base','apiUrl').autoComplete.ORG"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="性别" prop="sex">
      <cjm-enum-select v-model="form.sex" enum-name="性别" enum-namespace="base"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="年龄" prop="age">
      <cjm-input v-model="form.age"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="员工编号" prop="number">
      <cjm-input v-model="form.number"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="岗位" prop="position">
      <cjm-input v-model="form.position"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="用工性质" prop="contractNature">
      <cjm-enum-select v-model="form.contractNature" enum-name="用工性质" enum-namespace="base"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="健康状况" prop="healthStatus">
      <cjm-enum-select v-model="form.healthStatus" enum-name="健康状况" enum-namespace="base"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="联系电话" prop="phone">
      <cjm-input v-model="form.phone"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="身份证号" prop="identityNo">
      <cjm-input v-model="form.identityNo"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="家庭住址" prop="address" class="cjm-form-item-long">
      <cjm-input v-model="form.address"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="紧急联系人" prop="emContactName">
      <cjm-input v-model="form.emContactName"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="紧急联系电话" prop="emContactPhone">
      <cjm-input v-model="form.emContactPhone"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="身份证正面" prop="" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.images[0]"></cjm-image-upload>
    </cjm-form-item>
    <cjm-form-item label="身份证反面" prop="" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.images[1]"></cjm-image-upload>
    </cjm-form-item>
    <cjm-form-item label="健康证" prop="" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.healthCertificateImage"></cjm-image-upload>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        name: [this.$formRules.required],
        orgID: [this.$formRules.required],
        age: [this.$formRules.intRange(16, 99)],
        number: [this.$formRules.maxLength(30)],
        position: [this.$formRules.maxLength(30)],
        phone: [this.$formRules.phoneOrMobile],
        identityNo: [this.$formRules.idCardNo],
        address: [this.$formRules.maxLength(100)],
        emContactName: [this.$formRules.maxLength(10)],
        emContactPhone: [this.$formRules.phoneOrMobile]
      }
    };
  },
  methods: {
    //新增，供列表页调用
    addForm() {
      this.reset();
    },
    //提交表单，供列表页调用
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax
          .post(this.$globalData.get('base', 'apiUrl').employee.EDIT, this.form)
          .then(r => {
            if (r.resultCode != '200') {
              throw new Error(r.msg);
            }
          });
      });
    },
    //重置表单，内部调用
    reset() {
      this.form = {
        id: '',
        name: '',
        orgID: '',
        sex: '',
        age: '',
        number: '',
        position: '',
        contractNature: '',
        healthStatus: '',
        phone: '',
        identityNo: '',
        address: '',
        emContactName: '',
        emContactPhone: '',
        images: ['', ''],
        healthCertificateImage: ''
      };
      //必须调用此方法，否则上次验证的结果还会保留
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

</style>
