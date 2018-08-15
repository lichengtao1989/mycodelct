<template>
  <div>
    <cjm-form :model="form" :rules="rules" ref="form">
      <cjm-form-item label="产品名称" prop="productID" class="cjm-form-item-long">
        <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.PRODUCT" :value="productCopyID" @input="productIDInputHandler">
          <template slot-scope="scope" class="selectName">{{scope.item.name}}
            <span class="cjm-option-subtitle">（编号：{{scope.item.productCode}}）</span>
          </template>
        </cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item label="产品批次" prop="productBatchID" class="cjm-form-item-long">
        <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.PRODUCT_BATCH" v-model="form.productBatchID" :params="{productid:this.form.productID}"></cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item label="收货机构" prop="stockInOrgID" required class="cjm-form-item-long">
        <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.ORG" v-model="form.stockInOrgID" :params="{scene:'stockIn'}"></cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item label="发货方式" prop="codeBindType" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.codeBindType">
          <cjm-radio class="radio" label="1">按号段</cjm-radio>
          <cjm-radio class="radio" label="3">单码</cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <div class="codeArea clear">
        <cjm-form-item key="beginLogisticsCode" label="起始码" prop="beginLogisticsCode" required v-if="form.codeBindType==1" class="cjm-form-item-long">
          <cjm-input v-model="form.beginLogisticsCode"></cjm-input>
        </cjm-form-item>
        <div style="clear: both"></div>
        <cjm-form-item key="endLogisticsCode" label="结束码" prop="endLogisticsCode" required v-if="form.codeBindType==1" class="cjm-form-item-long">
          <cjm-input v-model="form.endLogisticsCode"></cjm-input>
        </cjm-form-item>
        <cjm-form-item key="codes" label="物流码" prop="codes" required v-if="form.codeBindType==3" class="cjm-form-item-long">
          <cjm-input :rows="10" :value="codes" @input="codesInputHandler" placeholder="每行判定为一个物流码" type="textarea"></cjm-input>
        </cjm-form-item>
        <cjm-form-item class="cjm-form-item-long" label="共计">
          {{codeCount}}
        </cjm-form-item>
      </div>
      <div class="msgDetail">
        <ul>
          <li v-for="(msgDetail,index) in msgDetails" :key="index">{{msgDetail}}</li>
        </ul>
      </div>
      <cjm-form-item label="备注" prop="note" class="cjm-form-item-long">
        <cjm-input type="textarea" v-model="form.note"></cjm-input>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>
<script>
import bigInt from 'big-int';
export default {
  data() {
    let checkCodeCount = (rule, value, callback) => {
      callback();
    };
    let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
    return {
      logisticsApiUrl: logisticsApiUrl,
      form: {},
      productCopyID: '',
      msgDetails: [],
      rules: {
        stockInOrgID: [this.$formRules.required],
        beginLogisticsCode: [this.$formRules.required, this.$formRules.logisticsCode, { validator: checkCodeCount, trigger: 'blur' }],
        endLogisticsCode: [this.$formRules.required, this.$formRules.logisticsCode, { validator: checkCodeCount, trigger: 'blur' }],
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
      if (this.form.codeBindType == '3') {
        return this.form.codes.length;
      } else {
        if (!/^(\d{16}|\d{17}|\d{18}|\d{32})$/.test(this.form.beginLogisticsCode) || !/^(\d{16}|\d{17}|\d{18}|\d{32})$/.test(this.form.endLogisticsCode)) {
          return 0;
        }
        if (
          bigInt(this.form.endLogisticsCode)
            .lt(this.form.beginLogisticsCode)
            .val()
        ) {
          return 0;
        }
        return bigInt(this.form.endLogisticsCode)
          .sub(this.form.beginLogisticsCode)
          .add(1)
          .val();
      }
    }
  },
  methods: {
    //重置表单
    reset() {
      this.msgDetails = [];
      this.productCopyID = '';
      this.form = {
        productID: '',
        productBatchID: '',
        stockInHouseID: '',
        codeBindType: '3',
        beginLogisticsCode: '',
        endLogisticsCode: '',
        stockInOrgID: '',
        codes: [],
        note: ''
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
      if (this.form.beginLogisticsCode > this.form.endLogisticsCode) {
        this.$message.error('起始码不能大于结束码');
      }
      return this.$refs.form.validate().then(() => {
        this.form.productID = this.productCopyID;
        if (this.form.productID.indexOf(',') > 0) {
          this.form.productID = this.form.productID.split(',')[0];
        }
        return this.$ajax.post(this.logisticsApiUrl.storage.STOCK_OUT, this.form).then(r => {
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
    productIDInputHandler(val) {
      this.productCopyID = val;
      if (val.split(',').length == 2) {
        this.form.productID = val.split(',')[0];
        this.form.specID = val.split(',')[1];
      } else {
        this.form.productID = val;
        this.form.specID = '';
      }
      this.form.productBatchID = '';
    }
  },
  created() {
    this.reset();
  }
};
</script>
<style lang="css">
.codeArea {
  float: left;
  width: 50%;
  margin-bottom: 20px;
}

.msgDetail {
  width: 45%;
  height: 180px;
  float: right;
  padding-bottom: 20px;
  min-height: 37px;
  font-size: 14px;
  color: #ff0000;
  overflow-y: auto;
}

.msgDetail li {
  margin-bottom: 4px;
}
</style>
