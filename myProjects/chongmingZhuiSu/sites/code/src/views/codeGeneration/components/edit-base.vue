<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="生码组织" prop="corpID" required class="cjm-form-item-long">
      <cjm-remote-select v-model="form.corpID" :label="form.corpName" :remote-url="apiUrl.autoComplete.CORP" :disabled="operation!=='add'" @select="corpSelectHandler">
        <template slot-scope="scope">
          {{scope.item.name}}
          <span class="cjm-option-subtitle">（{{scope.item.id}}）</span>
        </template>
      </cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="订单号" prop="orderCode" required class="cjm-form-item-long">
      <cjm-input v-model="form.orderCode" :disabled="operation==='approve' || operation==='view'"></cjm-input>
    </cjm-form-item>
    <div style="clear:both"></div>
    <cjm-form-item label="生码数量" prop="batchNumber" required>
      <cjm-input v-model="formattedBatchNumber" v-if="batchNumberFormat" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">
        <template slot="append">万</template>
      </cjm-input>
      <cjm-input v-model="form.batchNumber" v-else :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">
      </cjm-input>
      <cjm-button type="text" class="batchNumber-switch" @click="batchNumberFormat=!batchNumberFormat">格式转换
      </cjm-button>
    </cjm-form-item>
    <div style="clear:both;"></div>
    <cjm-form-item label="生码批次" prop="batchID" required>
      <cjm-input v-model="form.batchID" :disabled="true"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="码功能" prop="functionType" required class="cjm-form-item-long">
      <cjm-checkbox-group v-model="form.functionType">
        <cjm-checkbox v-for="(value,key) in functionType" :label="value" :key="value" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
        </cjm-checkbox>
      </cjm-checkbox-group>
    </cjm-form-item>
    <cjm-form-item label="码类型" prop="codeType" class="cjm-form-item-long">
      <cjm-checkbox-group v-model="form.codeType">
        <cjm-checkbox v-for="(value,key) in codeType" :label="value" :key="value" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)" @change="changeCodeType(value)">{{key}}
        </cjm-checkbox>
      </cjm-checkbox-group>
    </cjm-form-item>
    <cjm-form-item label="产品" prop="productID" required class="cjm-form-item-long" v-show="form.codeType.includes(enums.codeType.PESTICIDE)">
      <cjm-remote-select v-model="form.productID" :fetchData="fetchDataOfProduct" value-key="productID" label-key="productName" :label="form.relatedProductName" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)" ref="pesticideProductSelect">
        <template slot-scope="scope">{{scope.item.productName}}({{scope.item.pesticideProductCode}})</template>
      </cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="码上图模板" prop="maShangTuTemplate" required class="cjm-form-item-long" v-if="form.codeType.includes(enums.codeType.MASHANGTU)">
      <cjm-radio-group v-model="form.maShangTuTemplate">
        <cjm-radio :label="value" v-for="(value,key) in maShangTuTemplate" :key="value" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="应用系统" prop="systemCode" required class="cjm-form-item-long">
      <cjm-radio-group v-model="form.systemCode">
        <cjm-radio :label="value" v-for="(value,key) in systemCode" :key="value" :disabled="operation==='approve' || operation==='view'">{{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="加密自动上传" prop="isAutoUpload" required class="cjm-form-item-long">
      <cjm-radio-group v-model="form.isAutoUpload">
        <cjm-radio :label="value" v-for="(value,key) in yesOrNo" :key="value" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="文件名标注" prop="fileNameLabel">
      <cjm-input v-model="form.fileNameLabel" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
    </cjm-form-item>
    <div style="clear:both;"></div>
    <cjm-form-item label="序号起始值" prop="serialNumberIncreasing">
      <cjm-input v-model="form.serialNumberIncreasing" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="序号重复次数" prop="serialNumberRepeatCount">
      <cjm-input v-model="form.serialNumberRepeatCount" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="序号前缀" prop="serialNumberPrefix">
      <cjm-input v-model="form.serialNumberPrefix" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="序号后缀" prop="serialNumberSuffix">
      <cjm-input v-model="form.serialNumberSuffix" :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="标签样式" prop="stickerID" class="cjm-form-item-long">
      <cjm-remote-select v-model="form.stickerID" :label="form.stickerName" :remote-url="apiUrl.autoComplete.STICKER" :params="{corpID: form.corpID}" :disabled="operation==='approve' || operation==='view'" @select="stickerSelectHandler"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="业务员" prop="salesman">
      <cjm-input v-model="form.salesman" :disabled="operation==='approve' || operation==='view'"></cjm-input>
    </cjm-form-item>
    <div style="clear:both"></div>
    <cjm-form-item label="下单量" prop="orderBatchNumber">
      <cjm-input v-model="formattedOrderBatchNumber" v-if="orderBatchNumberFormat" :disabled="operation==='approve' || operation==='view'">
        <template slot="append">万</template>
      </cjm-input>
      <cjm-input v-model="form.orderBatchNumber" v-else :disabled="operation==='approve' || operation==='view'">
      </cjm-input>
      <cjm-button type="text" class="batchNumber-switch" @click="orderBatchNumberFormat=!orderBatchNumberFormat">
        格式转换
      </cjm-button>
    </cjm-form-item>
    <div style="clear:both"></div>
    <cjm-form-item label="生码单" prop="orderImage" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.orderImage" :disabled="operation==='approve' || operation==='view'"></cjm-image-upload>
    </cjm-form-item>
    <cjm-form-item label="设计稿" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.designImage" :disabled="true"></cjm-image-upload>
    </cjm-form-item>
    <cjm-form-item label="标签图" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.stickerImage" :disabled="true"></cjm-image-upload>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
const batchNumberRule = {
  validator: (rule, value, callback) => {
    if (value === '' || value === null || value === undefined) {
      return callback();
    }
    const reg = /^[1-9]\d*$/;
    if (!reg.test(value)) {
      return callback(new Error('数量填写有误'));
    }
    if (value > 10000000) {
      return callback(new Error(`生码数量过大，一批最多支持1000万`));
    }
    return callback();
  },
  trigger: 'blur'
};
export default {
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
        corpID: [this.$formRules.required],
        orderCode: [this.$formRules.required, this.$formRules.maxLength(64)],
        batchNumber: [this.$formRules.required, batchNumberRule],
        functionType: [this.$formRules.required],
        productID: [
          {
            validator: (rule, value, callback) => {
              if (value == '' && this.form.codeType.includes(this.enums.codeType.PESTICIDE)) {
                callback(new Error(`请选择产品`));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ],
        systemCode: [this.$formRules.required],
        isAutoUpload: [this.$formRules.required],
        fileNameLabel: [this.$formRules.maxLength(50)],
        serialNumberIncreasing: [this.$formRules.longRange(0), this.$formRules.maxLength(20)],
        serialNumberRepeatCount: [this.$formRules.intRange(1)],
        serialNumberPrefix: [this.$formRules.maxLength(50)],
        serialNumberSuffix: [this.$formRules.maxLength(50)],
        orderBatchNumber: [batchNumberRule]
      },
      //生码数量是否格式化为"XX万"
      batchNumberFormat: true,
      orderBatchNumberFormat: true
    };
  },
  computed: {
    functionType() {
      return this.enums['码功能'];
    },
    codeType() {
      return this.enums['码类型'];
    },
    maShangTuTemplate() {
      return this.enums['码上图模板'];
    },
    systemCode() {
      return this.enums['系统'];
    },
    yesOrNo() {
      return this.enums['是否'];
    },
    formattedBatchNumber: {
      get: function() {
        return this.form.batchNumber || this.form.batchNumber === 0 ? this.form.batchNumber / 10000 : '';
      },
      set: function(val) {
        this.form.batchNumber = val * 10000;
      }
    },
    formattedOrderBatchNumber: {
      get: function() {
        return this.form.orderBatchNumber || this.form.orderBatchNumber === 0 ? this.form.orderBatchNumber / 10000 : '';
      },
      set: function(val) {
        this.form.orderBatchNumber = val * 10000;
      }
    }
  },
  watch: {
    //码类型更改
    'form.codeType': function(val) {
      if (val.includes(this.enums.codeType.MINGANMA)) {
        this.form.logisticsCodeLength = '17';
      } else {
        if (this.form.logisticsCodeLength == '17') {
          this.form.logisticsCodeLength = '18';
        }
      }
      if (!val.includes(this.enums.codeType.PESTICIDE)) {
        this.form.productID = '';
      } else {
        this.form.logisticsCodeLength = '32';
      }
    },
    //标签样式更改
    'form.stickerID': function(val) {
      if (!val) {
        this.form.salesman = '';
        this.form.designImage = '';
        this.form.stickerImage = '';
      }
    },
    //组织ID更改
    'form.corpID': function(val) {
      this.$emit('corp-changed', val);
    }
  },
  methods: {
    //获取企业下个生码批次
    getNextBatchID(corpID) {
      return new Promise((resolve, reject) => {
        this.$ajax
          .get(this.apiUrl.codeGeneration.GET_NEXT_BATCH_ID, { corpID: corpID })
          .then(r => {
            if (r.resultCode == '200') {
              resolve(r.data);
            } else {
              reject(r.msg);
            }
          })
          .catch(error => {
            reject(error.message);
          });
      });
    },
    //组织更改事件
    corpSelectHandler(val) {
      this.form.productID = '';
      //清楚农药码关联的产品列表
      this.$refs.pesticideProductSelect.clear();
      this.form.stickerID = '';
      this.form.stickerName = '';
      this.form.salesman = '';
      this.form.designImage = '';
      this.form.stickerImage = '';
      if (val) {
        this.getNextBatchID(val.id).then(batchID => {
          this.form.batchID = batchID;
        });
      }
    },
    //码类型更改事件
    changeCodeType(val) {
      if (
        (val == this.enums.codeType.PESTICIDE &&
          this.form.codeType.includes(this.enums.codeType.MINGANMA)) ||
        (val == this.enums.codeType.MINGANMA &&
          this.form.codeType.includes(this.enums.codeType.PESTICIDE))
      ) {
        this.$message.warning('17+4和农药码不能同时选');
        this.form.codeType.splice(this.form.codeType.length - 1, 1);
      }
    },
    //农药码产品获取
    fetchDataOfProduct(query, callback) {
      this.$ajax
        .post(this.apiUrl.codeGeneration.GET_PRODUCT, {
          isPesticide: 1,
          pageSize: 50,
          keyWord: query,
          corpID: this.form.corpID
        })
        .then(r => {
          if (r.resultCode == '200') {
            callback(r.data.rows);
          }
        });
    },
    //标签样式更改事件
    stickerSelectHandler(val) {
      this.form.salesman = val.salesman;
      this.form.designImage = val.designImage;
      this.form.stickerImage = val.stickerImage;
      this.form.tagImage = val.stickerImage;
    },
    validate(callback) {
      this.$refs.form.validate(callback);
    },
    resetFields() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
.batchNumber-switch {
  position: absolute;
  top: 0;
  right: -65px;
}
</style>
