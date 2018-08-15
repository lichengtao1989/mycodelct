<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="供应商名称" prop="name" required>
      <cjm-input v-model="form.name"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="供应商编号" prop="code">
      <cjm-input v-model="form.code"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="供应商类型" prop="type" class="cjm-form-item-long" required>
      <cjm-enum-select v-model="form.type" :multiple="true" enum-name="供应商类型" enum-namespace="base"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="所属机构" prop="orgID" required>
      <cjm-remote-select v-model="form.orgID" :remote-url="$globalData.get('base','apiUrl').autoComplete.ORG"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="联系人" prop="manager">
      <cjm-input v-model="form.manager"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="联系电话" prop="managerPhone">
      <cjm-input v-model="form.managerPhone"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="许可证号" prop="licenseNumber">
      <cjm-input v-model="form.licenseNumber"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="详细地址" prop="address" class="cjm-form-item-long">
      <cjm-input v-model="form.address"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="备注" prop="note" class="cjm-form-item-long">
      <cjm-input v-model="form.note" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="营业执照" prop="" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.images[0]" tips="建议上传图片大小800*600"></cjm-image-upload>
    </cjm-form-item>
    <cjm-form-item label="生产许可证" prop="" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.images[1]" tips="建议上传图片大小800*600"></cjm-image-upload>
    </cjm-form-item>
    <cjm-form-item label="经营许可证" prop="" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.images[2]" tips="建议上传图片大小800*600"></cjm-image-upload>
    </cjm-form-item>
    <cjm-form-item label="代理授权书" prop="" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.images[3]" tips="建议上传图片大小800*600"></cjm-image-upload>
    </cjm-form-item>
    <cjm-form-item label="其他" prop="" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.images[4]" tips="建议上传图片大小800*600"></cjm-image-upload>
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
        code: [this.$formRules.maxLength(30)],
        type: [this.$formRules.required],
        orgID: [this.$formRules.required],
        manager: [this.$formRules.maxLength(10)],
        managerPhone: [this.$formRules.phoneOrMobile],
        licenseNumber: [this.$formRules.maxLength(30)],
        address: [this.$formRules.maxLength(100)],
        note: [this.$formRules.maxLength(200)]
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
        return this.$ajax.post(this.$globalData.get('base', 'apiUrl').supplier.EDIT, this.form).then(r => {
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
        code: '',
        type: [],
        orgID: '',
        manager: '',
        managerPhone: '',
        licenseNumber: '',
        address: '',
        note: '',
        images: ['', '', '', '', '']
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
