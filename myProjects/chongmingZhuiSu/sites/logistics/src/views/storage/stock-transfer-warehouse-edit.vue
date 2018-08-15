<template>
  <div>
    <cjm-form :model="form" :rules="rules" ref="form">
      <cjm-form-item class="cjm-form-item-long" label="调出仓库" prop="stockOutHouseID" required="">
        <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.STOCK_HOUSE" v-model="form.stockOutHouseID"></cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item class="cjm-form-item-long" label="调入仓库" prop="stockInHouseID" required="">
        <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.STOCK_HOUSE" v-model="form.stockInHouseID"></cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item label="物流码" prop="codes" required="">
        <cjm-input :autosize="{minRows: 10}" :value="codes" @input="codesInputHandler" placeholder="每行判定为一个物流码" type="textarea"></cjm-input>
      </cjm-form-item>
      <div class="msgDetail">
        <ul>
          <li v-for="msgDetail in msgDetails" :key="msgDetail">{{msgDetail}}</li>
        </ul>
      </div>
      <cjm-form-item class="cjm-form-item-long" label="共计">
        {{codeCount}}
      </cjm-form-item>
    </cjm-form>
  </div>
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
        stockOutHouseID: '',
        stockInHouseID: '',
        codes: []
      },
      rules: {
        stockOutHouseID: [this.$formRules.required],
        stockInHouseID: [this.$formRules.required],
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
        stockOutHouseID: '',
        stockInHouseID: '',
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
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax
          .post(this.logisticsApiUrl.storage.STOCK_TRANSFER_WAREHOUSE, this.form)
          .then(r => {
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
    },
    created() {
      this.reset();
    }
  }
};
</script>
<style lang="css">
.msgDetail {
  width: 45%;
  height: 222px;
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
