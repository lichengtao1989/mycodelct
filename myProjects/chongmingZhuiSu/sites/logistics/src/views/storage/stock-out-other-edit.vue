<template>
  <cjm-form :model="form" :rules="rules" ref="form">
    <cjm-form-item class="cjm-form-item-long" label="出库机构" prop="stockOutOrgID" required>
      <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.ORG" v-model="form.stockOutOrgID" :params="{scene:'otherStockOut'}"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item class="cjm-form-item-long" label="出库科目" prop="stockOutSubjectID" required>
      <cjm-enum-select v-model="form.stockOutSubjectID" enum-namespace="logistics" enum-name="出库科目"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item key="codes" label="物流码" prop="codes" required>
      <cjm-input :rows="10" :value="codes" @input="codesInputHandler" placeholder="每行判定为一个物流码" type="textarea"></cjm-input>
    </cjm-form-item>
    <div class="msgDetail">
      <ul>
        <li v-for="(msgDetail,index) in msgDetails" :key="index">{{msgDetail}}</li>
      </ul>
    </div>
    <cjm-form-item class="cjm-form-item-long" label="共计">
      {{codeCount}}
    </cjm-form-item>
  </cjm-form>
</template>
<script>
//import bigInt from 'big-int'
export default {
  data() {
    let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
    return {
      logisticsApiUrl: logisticsApiUrl,
      msgDetails: [],
      form: {
        stockOutSubjectID: '',
        stockOutOrgID: '',
        codes: []
      },
      rules: {
        stockOutSubjectID: [this.$formRules.required],
        stockOutOrgID: [this.$formRules.required],
        codes: [
          {
            validator: (rule, value, callback) => {
              if (!value || value.length === 0) {
                callback(new Error(`该项为必填项`));
                return;
              }
              for (let i = 0; i < value.length; i++) {
                if (!/^(\d{16}|\d{17}|\d{18}|\d{32})$/.test(value[i])) {
                  callback(new Error(`第${i + 1}行物流码输入有误`));
                  break;
                }
              }
              callback();
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    codes() {
      if (this.form.codes && this.form.codes.length > 0) {
        return this.form.codes.join('\n');
      }
      return '';
    },
    codeCount() {
      return this.form.codes.length;
    }
  },
  methods: {
    //重置表单
    reset() {
      this.msgDetails = [];
      this.form = {
        stockOutOrgID: '',
        stockOutSubjectID: '',
        codes: []
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    //添加
    addForm() {
      this.reset();
    },
    //提交
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.logisticsApiUrl.storage.STOCK_OUT_OTHER, this.form).then(r => {
          if (r.resultCode != '200') {
            this.msgDetails = r.msgDetails.msgs;
            throw new Error(r.msg);
          }
        });
      });
    },
    codesInputHandler(val) {
      this.form.codes = val
        .trim()
        .split('\n')
        .filter(function(code) {
          return code != '';
        });
    }
  },
  created() {
    this.reset();
  }
};
</script>
<style lang="css">
.msgDetail {
  width: 45%;
  height: 180px;
  float: right;
  margin-bottom: 20px;
  min-height: 37px;
  font-size: 14px;
  color: #ff0000;
  overflow-y: auto;
}

.msgDetail li {
  float: left;
  margin-bottom: 4px;
}
</style>
