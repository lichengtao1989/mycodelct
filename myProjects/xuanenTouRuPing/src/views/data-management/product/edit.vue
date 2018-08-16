<template>
  <div class="content">
    <div class="register-main">
      <nz-form class="form" label-width="150px" ref="form" :model="form" :validate-on-rule-change="false" :rules="rules">
        <nz-form-item label="类别" prop="category">
          <nz-enum-select v-model="category" is-radio :options="$enum('类别').values" :disabled="disabled"></nz-enum-select>
        </nz-form-item>
        <pesticide v-if="category == 1" key="1" :form="form" :rules="rules"></pesticide>
        <seeds v-if="category == 2" key="2" :form="form" :rules="rules"></seeds>
        <fertilizer v-if="category == 3" key="3" :form="form" :rules="rules"></fertilizer>
        <other v-if="category == 4" key="4" :form="form" :rules="rules"></other>
        <div class="confirm-bottom" style="bottom:-38px;max-width:800px;">
          <nz-button :loading="isRegister" @click="cancel">
            <i class="nz-icon-close"></i>取消</nz-button>
          <nz-button type="primary" :loading="isRegister" @click="save">
            <i class="nz-icon-confirm"></i>确定</nz-button>
        </div>
      </nz-form>
    </div>
  </div>
</template>
<script>
import pesticide from './components/pesticide.vue';
import seeds from './components/seeds.vue';
import fertilizer from './components/fertilizer.vue';
import other from './components/other.vue';
export default {
  components: {
    pesticide,
    seeds,
    fertilizer,
    other
  },
  data() {
    let apiUrl = this.$apiUrl.DATAMANAGEMENT;
    return {
      apiUrl: apiUrl,
      isRegister: false,
      loadData: false,
      titleName: '添加商品',
      category: '1',
      disabled: false,
      form: {},
      rules: {},
      pesticideForm: {
        productPesticideID: '',
        registrationCode: '',
        productName: '',
        pesticideType: '',
        dosageForm: '',
        toxicity: '',
        registrationValidTime: '',
        pesticideStatus: '',
        productionEnterprises: '',
        productionLicenseNumber: '',
        productBarCode: '',
        packingSpecifications: '',
        packagingUnit: '',
        packagingType: '',
        productValidTime: '',
        costUnitPrice: ''
      },
      seedsForm: {
        productSeedsID: '',
        registrationCode: '',
        productName: '',
        seedsType: '',
        breedingUnits: '',
        auditYear: '',
        productionEnterprises: '',
        productionLicenseNumber: '',
        productBarCode: '',
        packingSpecifications: '',
        packagingUnit: '',
        packagingType: '',
        productValidTime: '',
        costUnitPrice: ''
      },
      fertilizerForm: {
        productFertilizerID: '',
        registrationCode: '',
        productName: '',
        productGeneralName: '',
        productForm: '',
        productType: '',
        productionEnterprises: '',
        productionLicenseNumber: '',
        productBarCode: '',
        packingSpecifications: '',
        packagingUnit: '',
        packagingType: '',
        productValidTime: '',
        costUnitPrice: ''
      },
      otherForm: {
        productOtherID: '',
        productName: '',
        productionEnterprises: '',
        productionLicenseNumber: '',
        productBarCode: '',
        packingSpecifications: '',
        packagingUnit: '',
        packagingType: '',
        productValidTime: '',
        costUnitPrice: ''
      },
      pesticideRules: {
        productName: [
          this.$formRules.required,
          {
            validator: this.checkRegistrationName,
            trigger: 'blur'
          }
        ],
        productBarCode: [this.$formRules.maxLength(40)],
        registrationCode: [this.$formRules.required],
        packingSpecifications: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ],
        productValidTime: [this.$formRules.required, this.$formRules.int],
        retailPrice: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ],
        costUnitPrice: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ]
      },
      seedsRules: {
        productName: [this.$formRules.required],
        productBarCode: [this.$formRules.maxLength(40)],
        seedsType: [this.$formRules.required],
        packingSpecifications: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ],
        productValidTime: [this.$formRules.required, this.$formRules.int],
        retailPrice: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ],
        costUnitPrice: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ]
      },
      fertilizerRules: {
        productName: [this.$formRules.required],
        productBarCode: [this.$formRules.maxLength(40)],
        productGeneralName: [this.$formRules.required, this.$formRules.maxLength(13)],
        productForm: [this.$formRules.required],
        packingSpecifications: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ],
        productValidTime: [this.$formRules.required, this.$formRules.int],
        retailPrice: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ],
        costUnitPrice: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ]
      },
      otherRules: {
        productName: [this.$formRules.required],
        productBarCode: [this.$formRules.maxLength(40)],
        packingSpecifications: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ],
        productValidTime: [this.$formRules.required, this.$formRules.int],
        retailPrice: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ],
        costUnitPrice: [
          this.$formRules.required,
          {
            validator: this.validatorSpec,
            trigger: 'blur'
          }
        ]
      }
    };
  },
  watch: {
    category: function(val) {
      this.setCategory(val);
    }
  },
  methods: {
    //农药是否禁用或限用
    async checkRegistrationName(t, e, callback) {
      let url = this.apiUrl.CHECK_REGISTATIONNAME;
      let data = {
        registrationName: e
      };
      let { err, res } = await this.$model('dataManagement').commonfn(url, data);
      if (err) {
        callback(new Error(res.msg));
      }
    },
    async validatorSpec(t, e, o) {
      let patrn = /^(([0-9]+[\.]?[0-9]{1,2})|[1-9])$/;
      if (patrn.test(e) == false) {
        o(new Error('请输入正确信息'));
      }
    },
    // async validatorCode(t, e, o) {
    //   if (e != '' && e != null && e.length > 0) {
    //     let patrn = /^[0-9A-Za-z]+$/;
    //     if (e.length != 13 || patrn.test(e) == false) {
    //       o(new Error('请输入正确的商品条码'));
    //     }
    //   }
    // },
    async save() {
      let url = '';
      switch (this.category) {
        case '1':
          url = this.apiUrl.SAVE_PRODUCT_PESTICIDE;
          break;
        case '2':
          url = this.apiUrl.SAVE_PRODUCT_SEEDS;
          break;
        case '3':
          url = this.apiUrl.SAVE_PRODUCT_FERTILIZER;
          break;
        case '4':
          url = this.apiUrl.SAVE_PRODUCT_OTHER;
          break;
      }
      const valid = await this.$refs.form.validate();
      if (valid) {
        if (this.form.packagingUnit == null || this.form.packagingUnit == '') {
          this.$message.showError('请选择包装单位');
          return false;
        }
        if (this.form.packagingType == null || this.form.packagingType == '') {
          this.$message.showError('请选择包装类型');
          return false;
        }
        this.isRegister = true;
        let { err, res } = await this.$model('dataManagement').commonfn(url, this.form);
        if (res.resultCode == 200) {
          this.$router.push({ path: '/main/productList' });
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
        this.isRegister = false;
      }
    },
    async getProduct(productId, category) {
      this.titleName = '编辑商品';
      this.disabled = true;
      this.$eventBus.$emit('titleName', this.titleName);
      let data = {
        productId: productId
      };
      let url = '';
      switch (category) {
        case '1':
          url = this.apiUrl.GET_PRODUCT_PESTICIDE;
          break;
        case '2':
          url = this.apiUrl.GET_PRODUCT_SEEDS;
          break;
        case '3':
          url = this.apiUrl.GET_PRODUCT_FERTILIZER;
          break;
        case '4':
          url = this.apiUrl.GET_PRODUCT_OTHER;
          break;
      }
      let { err, res } = await this.$model('dataManagement').commonfn(url, data);
      if (res.resultCode == 200) {
        this.form = res.data;
      } else {
        this.$message.showError(err);
      }
    },
    async setCategory(category) {
      switch (category) {
        case '1':
          this.form = { ...this.pesticideForm };
          this.rules = { ...this.pesticideRules };
          break;
        case '2':
          this.form = { ...this.seedsForm };
          this.rules = { ...this.seedsRules };
          break;
        case '3':
          this.form = { ...this.fertilizerForm };
          this.rules = { ...this.fertilizerRules };
          break;
        case '4':
          this.form = { ...this.otherForm };
          this.rules = { ...this.otherRules };
          break;
      }
      await this.$nextTick();
      this.$refs.form.resetFields();
    },
    async cancel() {
      this.isRegister = true;
      this.$router.back(-1);
    },
    reset() {
      this.isRegister = false;
      this.disabled = false;
      this.setCategory(this.category);
    }
  },
  async mounted() {
    let query = this.$route.query || {};
    if (query.productId != undefined) {
      this.category = query.category;
      await this.$nextTick();
      this.reset();
      await this.$nextTick();
      //this.$refs.form.resetFields();
      //await this.$nextTick();
      await this.getProduct(query.productId, query.category);
    } else {
      this.reset();
    }
  },
  async created() {
    this.$eventBus.$emit('titleName', this.titleName);
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
</style>
