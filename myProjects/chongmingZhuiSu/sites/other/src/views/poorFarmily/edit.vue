<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="姓名" prop="name" required>
      <cjm-input v-model="form.name"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="所在地" prop="regionCode" required class="cjm-form-item-long">
      <cjm-region-select v-model="form.regionCode"></cjm-region-select>
    </cjm-form-item>
    <cjm-form-item label="乡镇" prop="villages" required>
      <cjm-input v-model="form.villages"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="详细地址" prop="address" class="cjm-form-item-long">
      <cjm-input v-model="form.address"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="贫困类型" prop="poorType" required>
      <cjm-enum-select v-model="form.poorType" enum-name="贫困类型" enum-namespace="other"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="家庭人口" prop="familyNumber" required>
      <cjm-input v-model="form.familyNumber"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="身份证号" prop="idCardNo">
      <cjm-input v-model="form.idCardNo"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="手机号" prop="mobile">
      <cjm-input v-model="form.mobile"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="种/养殖面积" prop="contractedArea">
      <cjm-input v-model="form.contractedArea">
        <i slot="suffix">亩</i>
      </cjm-input>
    </cjm-form-item>
    <cjm-form-item label="备注" prop="note" class="cjm-form-item-long">
      <cjm-input v-model="form.note" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></cjm-input>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      enums: this.$globalData.get('other', 'enums'),
      apiUrl: this.$globalData.get('other', 'apiUrl'),
      form: {},
      rules: {
        name: [this.$formRules.required, this.$formRules.maxLength(10)],
        idCardNo: [this.$formRules.idCardNo],
        regionCode: [this.$formRules.required],
        villages: [this.$formRules.required, this.$formRules.maxLength(20)],
        address: [this.$formRules.maxLength(100)],
        poorType: [this.$formRules.required],
        familyNumber: [this.$formRules.required, this.$formRules.intRange(1)],
        mobile: [this.$formRules.mobile],
        contractedArea: [this.$formRules.numberRange(0)],
        note: [this.$formRules.maxLength(200)]
      }
    };
  },
  computed: {},
  methods: {
    addForm() {
      this.reset();
      this.$nextTick(() => {
        const currentUser = this.$globalData.get('currentUser');
        this.form.regionCode = currentUser.orgRegionCode;
      });
    },
    editForm(id) {
      this.reset();
      this.$ajax
        .get(this.apiUrl.poorFarmily.GET, { id: id })
        .then(r => {
          if (r.resultCode == '200') {
            Object.transfer(r.data, this.form);
            this.form.id = id;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    reset() {
      this.form = {
        id: '',
        name: '',
        idCardNo: '',
        regionCode: '',
        villages: '',
        address: '',
        familyNumber: '',
        mobile: '',
        poorType: '1',
        contractedArea: '',
        note: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.apiUrl.poorFarmily.SAVE, this.form).then(r => {
          if (r.resultCode != '200') {
            throw new Error(r.msg);
          }
        });
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
