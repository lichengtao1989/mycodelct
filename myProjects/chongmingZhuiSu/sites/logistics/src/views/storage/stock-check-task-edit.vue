<template>
  <div>
    <cjm-form :model="form" :rules="rules" ref="form">
      <cjm-form-item class="cjm-form-item-long" label="盘点编号">
        <cjm-input :disabled="true" v-model="form.code"></cjm-input>
      </cjm-form-item>
      <cjm-form-item class="cjm-form-item-long" label="盘点仓库" prop="houseID" required="">
        <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.ORG" v-model="form.houseID"></cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item class="cjm-form-item-long" label="盘点原因">
        <cjm-input v-model="form.reason"></cjm-input>
      </cjm-form-item>
      <cjm-form-item class="cjm-form-item-long" label="备注">
        <cjm-input :autosize="{minRows:5}" type="textarea" v-model="form.note"></cjm-input>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>
<script>
export default {
  data() {
    let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
    return {
      logisticsApiUrl: logisticsApiUrl,
      form: {
        code: '',
        houseID: '',
        reason: '',
        note: ''
      },
      rules: {
        houseID: [this.$formRules.required]
      }
    };
  },
  methods: {
    addForms() {},
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.logisticsApiUrl.storage.STOCK_CHECK_TASK, this.form).then(res => {
          if (res.resultCode != '200') {
            throw new Error(res.msgDetails.msgs[0].toString());
          }
        });
      });
    }
  }
};
</script>
