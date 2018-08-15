<template>
  <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="积分定义方式" prop="isIntegralDefineLater" required>
        <cjm-radio-group v-model="form.isIntegralDefineLater">
          <cjm-radio :label="value" v-for="(value,key) in integralDefineWay" :key="value"
                     :disabled="operation==='approve' || operation==='view'">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="积分码有效期" prop="integralIndate">
        <cjm-date-picker v-model="form.integralIndate"
                         :choose-future="true"
                         :disabled="operation==='approve' || operation==='view'"></cjm-date-picker>
      </cjm-form-item>
      <div v-if="form.isIntegralDefineLater==0">
        <cjm-form-item label="会员扫码积分" prop="customerIntegral" required>
          <cjm-input v-model="form.customerIntegral"
                     :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="渠道扫码积分" prop="orgCustomerIntegral">
          <cjm-input v-model="form.orgCustomerIntegral"
                     :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="导购积分" prop="guideIntegral">
          <cjm-input v-model="form.guideIntegral" :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="门店积分" prop="shopIntegral">
          <cjm-input v-model="form.shopIntegral" :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="经销商积分" prop="dealerIntegral">
          <cjm-input v-model="form.dealerIntegral" :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="1级推荐积分" prop="referrerIntegral1">
          <cjm-input v-model="form.referrerIntegral1"
                     :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="2级推荐积分" prop="referrerIntegral2">
          <cjm-input v-model="form.referrerIntegral2"
                     :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="注册门店积分" prop="registerShopIntegral">
          <cjm-input v-model="form.registerShopIntegral"
                     :disabled="operation==='approve' || operation==='view'"></cjm-input>
        </cjm-form-item>
      </div>
    </cjm-form>
</template>

<script>
  export default{
    props: {
      form: Object,
      status: Number,
      isApprove: Number,
      operation: String
    },
    data() {
      return {
        enums: this.$globalData.get('code', 'enums'),
        apiUrl: this.$globalData.get('code', 'apiUrl'),
        rules: {
          customerIntegral: [
            this.$formRules.required,
            this.$formRules.intRange(1, 10000)
          ],
          orgCustomerIntegral: [
            this.$formRules.intRange(1, 10000)
          ],
          guideIntegral: [
            this.$formRules.intRange(1, 10000)
          ],
          shopIntegral: [
            this.$formRules.intRange(1, 10000)
          ],
          dealerIntegral: [
            this.$formRules.intRange(1, 10000)
          ],
          referrerIntegral1: [
            this.$formRules.intRange(1, 10000)
          ],
          referrerIntegral2: [
            this.$formRules.intRange(1, 10000)
          ],
          registerShopIntegral: [
            this.$formRules.intRange(1, 10000)
          ]
        }
      }
    },
    computed: {
      integralDefineWay(){
        return this.enums['积分定义方式'];
      }
    },
    methods: {
      validate(callback){
        this.$refs.form.validate(callback);
      },
      resetFields(){
        this.$refs.form.resetFields();
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
