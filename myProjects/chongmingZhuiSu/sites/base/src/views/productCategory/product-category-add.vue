<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="类目名称" prop="categoryName" class="cjm-form-item-long" required>
        <cjm-input v-model="form.categoryName"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="规格1">
        <cjm-enum-select enum-name="类目规格" enum-namespace="base" :clearable="true" v-model="form.specName1"></cjm-enum-select>
      </cjm-form-item>
      <cjm-form-item label="规格2">
        <cjm-enum-select enum-name="类目规格" enum-namespace="base" :clearable="true" v-model="form.specName2"></cjm-enum-select>
      </cjm-form-item>
      <cjm-form-item label="用于系统" class="cjm-form-item-long" required>
        <cjm-checkbox-group v-model="form.systemCode" :min="1">
          <cjm-checkbox label="SuperCode">超级码系统</cjm-checkbox>
          <cjm-checkbox label="Agriculture">农产品溯源系统</cjm-checkbox>
        </cjm-checkbox-group>
      </cjm-form-item>
      <cjm-form-item label="备注" class="cjm-form-item-long">
        <cjm-input type="textarea" :rows="3" v-model="form.note"></cjm-input>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        categoryName: '',
        specName1: '',
        specName2: '',
        systemCode: ['SuperCode'],
        parentID: '',
        note: ''
      },
      rules: {
        systemCode: [this.$formRules.required],
        categoryName: [this.$formRules.required, this.$formRules.maxLength(40)]
      },
      placeholderFn() {
        return '';
      }
    };
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset(data) {
      let defaultData = {
        categoryName: '',
        specName1: '',
        specName2: '',
        systemCode: ['SuperCode'],
        parentID: '',
        note: ''
      };
      this.form = data || defaultData;
      /*this.$nextTick(()=> {
         this.$refs.form.resetFields();
         });*/
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        this.form.systemCode = this.form.systemCode.join(','); //后台需保存为字符串
        return this.$ajax.post(this.$globalData.get('base', 'apiUrl').productCategory.EDIT, this.form).then(res => {
          if (res.resultCode != '200') {
            throw new Error(res.msg);
          }
        });
      });
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';
</style>
