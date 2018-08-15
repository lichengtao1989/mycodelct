<template>
  <cjm-form :model="form" :rules="rules" ref="form">
    <cjm-form-item class="cjm-form-item-long" label="产品名称" prop="productID">
      <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.PRODUCT" :value="productCopyID" @input="productIDInputHandler">
        <template slot-scope="scope" class="selectName">{{scope.item.name}}
          <span class="cjm-option-subtitle">（编号：{{scope.item.productCode}}）</span>
        </template>
      </cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item class="cjm-form-item-long" label="产品批次" prop="productBatchID">
      <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.PRODUCT_BATCH" v-model="form.productBatchID" :params="{productid:this.form.productID}"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item class="cjm-form-item-long" label="入库科目" prop="stockInSubjectID" required>
      <cjm-enum-select enum-namespace="logistics" enum-name="入库科目" :clearable="true" v-model="form.stockInSubjectID"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item class="cjm-form-item-long" label="入库机构" prop="stockInOrgID" required>
      <cjm-remote-select :remote-url="logisticsApiUrl.autoComplete.ORG" v-model="form.stockInOrgID" :params="{scene:'otherStockOut'}"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item key="codes" label="物流码" prop="codes" required>
      <cjm-input :rows="10" :value="codes" @input="codesInputHandler" placeholder="每行判定为一个物流码" type="textarea"></cjm-input>
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
        productID: '',
        productBatchID: '',
        stockInSubjectID: '',
        stockInOrgID: '',
        codes: []
      },
      productCopyID: '',
      rules: {
        stockInOrgID: [this.$formRules.required],
        stockInSubjectID: [this.$formRules.required],
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
      this.productCopyID = '';
      this.form = {
        productID: '',
        productBatchID: '',
        stockInSubjectID: '',
        stockInOrgID: '',
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
        return this.$ajax.post(this.logisticsApiUrl.storage.STOCK_IN_OTHER, this.form).then(r => {
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
