<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="采购企业" prop="orgID" required class="cjm-form-item-long">
      <cjm-remote-select v-model="form.orgID" :remote-url="apiUrl.autoComplete.ORG" :params="{scene: 'povertyAlleviation'}" :label="form.orgName"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="贫困户" prop="poorFamilyID" required>
      <cjm-remote-select v-model="form.poorFamilyID" :remote-url="apiUrl.autoComplete.POOR_FAMILY" :label="form.poorFamilyName" @select="poorFamilySelect"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="手机号">
      <cjm-input v-model="form.mobile" :disabled="true"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="贫困类型">
      <cjm-enum-select v-model="form.poorType" enum-name="贫困类型" enum-namespace="other" :disabled="true"></cjm-enum-select>
    </cjm-form-item>
    <div style="clear:both;"></div>
    <cjm-form-item label="扶贫类型">
      <cjm-enum-select v-model="form.povertyType" enum-name="扶贫类型" enum-namespace="other" :clearable="true"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="产业类型" v-if="form.povertyType=='2'">
      <cjm-enum-select v-model="form.industryType" enum-name="产业类型" enum-namespace="other" :clearable="true"></cjm-enum-select>
    </cjm-form-item>
    <div style="clear:both;"></div>
    <cjm-form-item label="采购时间" prop="procurementTime" required>
      <cjm-date-picker v-model="form.procurementTime"></cjm-date-picker>
    </cjm-form-item>
    <cjm-form-item label="采购产品" prop="procurementProduct" required>
      <cjm-input v-model="form.procurementProduct"></cjm-input>
    </cjm-form-item>
    <!-- <cjm-form-item label="是否溯源产品" prop="isTrace" required>
      <cjm-radio-group v-model="form.isTrace">
        <cjm-radio v-for="(value,key) in yesOrNo" :label="value" :key="value">{{key}}</cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="溯源产品" prop="traceProductID" required v-if="form.isTrace=='1'">
      <cjm-remote-select v-model="form.traceProductID"
                         :remote-url="apiUrl.autoComplete.PRODUCT"
                         :label="traceProductName"></cjm-remote-select>
    </cjm-form-item>
    <div style="clear:both;"></div> -->
    <cjm-form-item label="采购数量" prop="quantity" required>
      <cjm-input v-model="form.quantity"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="单价" prop="price">
      <cjm-input v-model="form.price"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="总价" prop="totalPrice" required>
      <cjm-input v-model="form.totalPrice"></cjm-input>
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
        orgID: [this.$formRules.required],
        poorFamilyID: [this.$formRules.required],
        procurementTime: [this.$formRules.required],
        procurementProduct: [this.$formRules.required, this.$formRules.maxLength(20)],
        // isTrace: [
        //   this.$formRules.required
        // ],
        // traceProductID: [
        //   this.$formRules.required
        // ],
        quantity: [this.$formRules.required, this.$formRules.numberRange(0)],
        price: [this.$formRules.numberRange(0)],
        totalPrice: [this.$formRules.required, this.$formRules.numberRange(0)]
      }
    };
  },
  computed: {
    // yesOrNo(){
    //   return this.enums['是否'];
    // }
  },
  watch: {
    'form.poorFamilyID': function(val) {
      if (!val) {
        this.form.mobile = '';
        this.form.poorType = '';
      }
    }
  },
  methods: {
    addForm() {
      this.reset();
      this.$nextTick(() => {
        const currentUser = this.$globalData.get('currentUser');
        if (currentUser.orgType == this.enums.orgType.COMPANY) {
          this.form.orgID = currentUser.orgID;
          this.form.orgName = currentUser.orgName;
        }
      });
    },
    editForm(id) {
      this.reset();
      this.$ajax
        .get(this.apiUrl.povertyRecord.GET, { id: id })
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
        orgID: '',
        orgName: '',
        poorFamilyID: '',
        poorFamilyName: '',
        mobile: '',
        poorType: '',
        povertyType: '1',
        industryType: '1',
        procurementTime: '',
        procurementProduct: '',
        // isTrace: '0',
        // traceProductID: '',
        // traceProductName: '',
        quantity: '',
        price: '',
        totalPrice: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        //不是产业扶贫，清除产业类型
        if (this.form.povertyType != '2') {
          this.form.industryType = '';
        }
        return this.$ajax
          .post(this.apiUrl.povertyRecord.SAVE, this.form)
          .then(r => {
            if (r.resultCode != '200') {
              throw new Error(r.msg);
            }
          })
          .catch(error => {
            throw new Error(error);
          });
      });
    },
    //贫困户选择
    poorFamilySelect(item) {
      this.form.mobile = item.mobile;
      this.form.poorType = item.poorType;
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
