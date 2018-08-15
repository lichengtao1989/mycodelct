<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="装箱级别" prop="codeLayer" required class="cjm-form-item-long">
      <cjm-radio class="radio" v-model="form.codeLayer" label="3">箱标与单标</cjm-radio>
      <cjm-radio v-if="layerNumber==3" class="radio" v-model="form.codeLayer" label="2">垛标与箱标</cjm-radio>
    </cjm-form-item>
    <cjm-form-item label="产品名称" class="cjm-form-item-long">
      <!--缺少产品列表-->
      <cjm-remote-select :value="productCopyID" @input="productIDInputHandler" :remote-url="logisticsApiUrl.autoComplete.PRODUCT">
        <template slot-scope="scope" class="selectName">{{scope.item.name}}
          <span class="cjm-option-subtitle">（编号：{{scope.item.productCode}}）</span>
        </template>
      </cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="产品批次" class="cjm-form-item-long">
      <!--缺少产品批次列表-->
      <cjm-remote-select v-model="form.productBatchID" :remote-url="logisticsApiUrl.autoComplete.PRODUCT_BATCH" :params="{productid:this.form.productID}"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item :label="parentCodeLabel" prop="parentCode" required class="cjm-form-item-long">
      <cjm-input v-model="form.parentCode"></cjm-input>
    </cjm-form-item>
    <cjm-form-item :label="codesLabel" prop="codes" required style="clear: both">
      <cjm-input type="textarea" :rows="8" @input="codes" :value="codesValue"></cjm-input>
    </cjm-form-item>
    <div class="msgDetail">
      <ul>
        <li v-for="(msgDetail,index) in msgDetails" :key="index">{{msgDetail}}</li>
      </ul>
    </div>
    <cjm-form-item prop="codeCount" class="cjm-form-item-long" label="共计">
      {{codeCount}}
    </cjm-form-item>
  </cjm-form>
</template>

<script>
export default {
  data() {
    let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
    return {
      logisticsApiUrl: logisticsApiUrl,
      form: {},
      productCopyID: '',
      msgDetails: [],
      rules: {
        codeLayer: [this.$formRules.required],
        parentCode: [this.$formRules.required, this.$formRules.logisticsCode],
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
  created() {
    this.reset();
  },
  methods: {
    addForm() {
      this.reset();
    },
    reset() {
      this.msgDetails = [];
      this.productCopyID = '';
      this.form = {
        codeLayer: '3',
        productID: '',
        productBatchID: '',
        specID: '',
        parentCode: '',
        codes: []
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.logisticsApiUrl.codeNesting.NEST, this.form).then(r => {
          if (r.resultCode != '200') {
            this.msgDetails = r.msgDetails.msgs;
            throw new Error(r.msg);
          }
        });
      });
    },
    codes(val) {
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
  computed: {
    codesValue() {
      if (this.form.codes && this.form.codes.length > 0) {
        return this.form.codes.join('\n');
      }
      return '';
    },
    parentCodeLabel() {
      return this.form.codeLayer == 3 ? '箱标' : '垛标';
    },
    codesLabel() {
      return this.form.codeLayer == 2 ? '箱标' : '单标';
    },
    codeCount() {
      return this.form.codes.length;
    },
    layerNumber() {
      return this.$globalData.get('userConfig').layerNumber;
    }
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
