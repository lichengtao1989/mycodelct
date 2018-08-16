<template>
  <div>
    <nz-form ref="form" label-width="110px" :model="form" :rules="rules">
      <nz-form-item label="商品分类" prop="category">
        <nz-enum-select v-model="form.category" placeholder="" :options="$enum('类别').values" disabled="true"></nz-enum-select>
      </nz-form-item>
      <nz-form-item label="商品类型" prop="productType">
        <nz-enum-select v-model="form.productType" placeholder="" :options="$enum('类别').values" disabled="true"></nz-enum-select>
      </nz-form-item>
      <nz-form-item label="商品名称" prop="productName">
        <nz-input v-model="form.productName" disabled="true"></nz-input>
      </nz-form-item>
      <nz-form-item label="商品条码" prop="productBarCode">
        <nz-input v-model="form.productBarCode" disabled="true"></nz-input>
      </nz-form-item>
      <nz-form-item label="最小库存" prop="value" required>
        <nz-input v-model="form.value" placeholder="请输入最小库存值"></nz-input>
      </nz-form-item>
    </nz-form>
  </div>
</template>

<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.WAREHOUSE;
    return {
      apiUrl: apiUrl,
      form: {},
      rules: {
        value: [this.$formRules.required, this.$formRules.int]
      }
    };
  },
  computed: {},
  methods: {
    async submit() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        return this.$model('dataManagement').commonfn(this.apiUrl.SET_EARLY_WARNING, this.form);
      }
    },
    reset() {
      this.form = {
        stockId: '',
        category: '',
        productType: '',
        productName: '',
        productBarCode: '',
        value: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    async addForm(row) {
      this.reset();
      await this.$nextTick();
      this.form.stockId = row.stockID;
      this.form.category = row.category;
      this.form.productType = row.productType;
      this.form.productName = row.productName;
      this.form.productBarCode = row.productBarCode;
      this.form.value = row.earlyWarning;
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style scoped>
.add {
  float: left;
  cursor: pointer;
}
.logo-image {
}
.logo-image > li {
  width: 100px;
  float: left;
  border: 1px #bfcbd9 solid;
  margin: 10px 32px 10px 0px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  height: 100px;
  line-height: 100px;
}
.logo-icon {
  font-size: 68px;
  color: #48576a;
  height: 100px;
  line-height: 100px;
  width: 100px;
  text-align: center;
  margin: 0 auto;
}
.logo-description {
  text-align: center;
  background-color: #bfcbd9;
  height: 20px;
  line-height: 20px;
}
.logo-image > li.active {
  border: 1px #20a0ff solid;
}
.nz-icon-selected {
  position: absolute;
  right: -12px;
  color: #20a0ff;
  font-size: 24px;
  top: 84px;
}
.nz-icon-add2.active {
  display: block;
}
</style>
