<template>
  <div>
    <nz-form-item label="商品名称" prop="productName" required>
      <nz-input v-model="form.productName"></nz-input>
    </nz-form-item>
    <nz-form-item label="生产企业" prop="productionEnterprises">
      <nz-input v-model="form.productionEnterprises" placeholder="填写生产（委托或分装）企业名称"></nz-input>
    </nz-form-item>
    <nz-form-item label="生产许可证号" prop="productionLicenseNumber">
      <nz-input v-model="form.productionLicenseNumber" placeholder="填写生产（委托或分装）企业的生许可证号"></nz-input>
    </nz-form-item>
    <nz-form-item label="商品条码" prop="productBarCode">
      <nz-input v-model="form.productBarCode"></nz-input>
    </nz-form-item>
    <nz-form-item label="包装规格" prop="packingSpecifications" required>
      <nz-input v-model="form.packingSpecifications">
        <nz-valid-reject slot="append">
          <nz-enum-select v-model="form.packagingUnit" placeholder="包装单位" style="width:120px;padding-right: 30px;" :options="$enum('包装单位').values"></nz-enum-select>
          <nz-enum-select v-model="form.packagingType" placeholder="包装类型" style="width:120px;" :options="$enum('包装类型').values"></nz-enum-select>
        </nz-valid-reject>
      </nz-input>
    </nz-form-item>
    <nz-form-item label="产品有效期" prop="productValidTime" required>
      <nz-input v-model="form.productValidTime">
        <template slot="append">天</template>
      </nz-input>
    </nz-form-item>
    <nz-form-item label="成本单价" prop="costUnitPrice" required>
      <nz-input v-model="form.costUnitPrice">
        <template slot="append">元</template>
      </nz-input>
    </nz-form-item>
    <nz-form-item label="销售单价" prop="retailPrice" required>
      <nz-input v-model="form.retailPrice">
        <template slot="append">元</template>
      </nz-input>
    </nz-form-item>
  </div>
</template>
<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.DATAMANAGEMENT;
    return {
      apiUrl: apiUrl,
      isRegister: false
    };
  },
  props: {
    form: {
      type: Object
    },
    rules: {
      type: Object
    },
    currentPage: {
      type: String
    }
  },
  methods: {},
  created() {
    // let query = this.$route.query || {};
    // if (query.supplierID != undefined) {
    //   this.getSupplier(query.supplierID);
    // }
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
.select-width {
  width: 100%;
}
.input-short {
  width: 50%;
}
</style>
