<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <!--<cjm-form-item label="物流码位数" prop="logisticsCodeLength" required-->
                   <!--class="cjm-form-item-long"-->
                   <!--v-if="!form.codeType.includes(enums.codeType.MINGANMA) && !form.codeType.includes(this.enums.codeType.PESTICIDE)">-->
      <!--<cjm-radio-group v-model="form.logisticsCodeLength">-->
        <!--<cjm-radio :label="value" v-for="(value,key) in logisticsCodeLength" :key="value"-->
                   <!--:disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}-->
        <!--</cjm-radio>-->
      <!--</cjm-radio-group>-->
    <!--</cjm-form-item>-->
    <cjm-form-item label="物流码层数" prop="layerNumber" required class="cjm-form-item-long">
      <cjm-radio-group v-model="form.layerNumber">
        <cjm-radio :label="value" v-for="(value,key) in layerNumber" :key="value"
                   :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="对应比例" prop="layerNumberScale" required v-if="form.layerNumber!=1"
                   class="cjm-form-item-long layerNumber">
        <span v-show="form.layerNumber==3">
          <label>大标</label>
          <cjm-input value="1" :disabled="true"></cjm-input>
        </span>
      <span>
          <label>中标</label>
          <cjm-input v-model="form.layer2Number"
                     :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0) || form.layerNumber==2"></cjm-input>
        </span>
      <span>
          <label>小标</label>
          <cjm-input v-model="form.layer3Number"
                     :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
        </span>
    </cjm-form-item>
    <cjm-form-item :label="form.layerNumber==1 ? '物流码规则' : '小码规则'" prop="layer3CodeRule" required
                   class="cjm-form-item-long">
      <cjm-radio-group v-model="form.layer3CodeRule">
        <cjm-radio :label="value" v-for="(value,key) in codeRule" :key="value"
                   :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="中码规则" v-if="form.layerNumber!=1" prop="layer2CodeRule" required
                   class="cjm-form-item-long">
      <cjm-radio-group v-model="form.layer2CodeRule">
        <cjm-radio :label="value" v-for="(value,key) in codeRule" :key="value"
                   :disabled="form.layer3CodeRule===enums.codeRule.ORDINAL || operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">
          {{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="大码规则" v-if="form.layerNumber==3" prop="layer1CodeRule" required
                   class="cjm-form-item-long">
      <cjm-radio-group v-model="form.layer1CodeRule">
        <cjm-radio :label="value" v-for="(value,key) in codeRule" :key="value"
                   :disabled="true">{{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="物流溯源码" v-show="form.layerNumber!=1" prop="logisticsCodeLayer" required
                   class="cjm-form-item-long">
      <cjm-checkbox-group v-model="form.logisticsCodeLayer">
        <cjm-checkbox :label="value" v-for="(value,key) in codeLayer" :key="value"
                      :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
        </cjm-checkbox>
      </cjm-checkbox-group>
    </cjm-form-item>
    <cjm-form-item label="排版编辑" prop="layer1TextPosition" required class="cjm-form-item-long">
      <cjm-radio-group v-model="form.layer1TextPosition">
        <cjm-radio :label="value" v-for="(value,key) in bianPai" :key="value"
                   :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="文本内容" prop="layer1Text" required class="cjm-form-item-long codeUrl">
      <cjm-radio-group v-model="layer1TextRadio">
        <cjm-radio :label="value" v-for="(value,key) in logisticsCodeUrl" :key="value"
                   :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)">{{key}}
        </cjm-radio>
      </cjm-radio-group>
      <cjm-input v-model="form.layer1Text" v-show="layer1TextRadio==-1"
                 :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="物流固定编码" prop="fixCode" class="cjm-form-item-long">
      <cjm-input v-model="form.fixCode" placeholder="物流固定编号不超过4位，且固定在物流码末尾"
                 :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
  const layerNumberScaleRule = function (vue) {
    return {
      validator: (rule, value, callback) => {
        const reg = /^[1-9]\d*$/;
        if (vue.form.layerNumber == vue.enums.layerNumber.NONE) {
          return callback();
        }
        if (!vue.form.layer2Number || !vue.form.layer3Number || !reg.test(vue.form.layer2Number) || !reg.test(vue.form.layer3Number)) {
          return callback(new Error('对应比例填写有误'));
        }
        if (vue.form.layer3Number > 1000 || vue.form.layer2Number > 1000) {
          return callback(new Error('对应比例过大，不允许超过1000'));
        }

        if (vue.form.layerNumber == vue.enums.layerNumber.THREE) {
          if (vue.form.layer3Number % vue.form.layer2Number != 0) {
            return callback(new Error('小标必须为中标的整数倍'));
          }
        }

        return callback();
      }, trigger: 'blur'
    };
  };
  export default{
    props: {
      form: Object,
      status: Number,
      isApprove: Number,
      operation: String,
      corpLogisticsLayerNumber: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        enums: this.$globalData.get('code', 'enums'),
        apiUrl: this.$globalData.get('code', 'apiUrl'),
        rules: {
          layer1Number: [
            this.$formRules.intRange(1, 1000)
          ],
          layer2Number: [
            this.$formRules.intRange(1, 1000)
          ],
          layer3Number: [
            this.$formRules.intRange(1, 1000)
          ],
          layer1Text: [
            this.$formRules.maxLength(100)
          ],
          fixCode: [
            this.$formRules.maxLength(4)
          ],
          layerNumberScale: [
            layerNumberScaleRule(this)
          ]
        }
      }
    },
    computed: {
      yesOrNo(){
        return this.enums['是否'];
      },
      onOrOff(){
        return this.enums['启用禁用'];
      },
      bianPai(){
        return this.enums['码排版'];
      },
      antiFakeEnableTime(){
        return this.enums['防伪生效时间'];
      },
      logisticsCodeUrl(){
        return this.enums['物流码网址'];
      },
      logisticsCodeLength(){
        return this.enums['物流码位数'];
      },
      layerNumber(){
        //该企业的物流码层数
        if (this.corpLogisticsLayerNumber == this.enums.layerNumber.THREE) {
          return this.enums['物流码层数'];
        } else {
          const result = {};
          for (let key in this.enums['物流码层数']) {
            if (this.enums['物流码层数'][key] !== this.enums.layerNumber.THREE) {
              result[key] = this.enums['物流码层数'][key];
            }
          }
          return result;
        }
      },
      codeLayer(){
        if (this.form.layerNumber === this.enums.layerNumber.THREE) {
          return this.enums['物流码层级'];
        } else {
          const result = {};
          for (let key in this.enums['物流码层级']) {
            if (this.enums['物流码层级'][key] !== this.enums.codeLayer.ONE) {
              result[key] = this.enums['物流码层级'][key];
            }
          }
          return result;
        }
      },
      codeRule(){
        return this.enums['物流码规则'];
      },
      layer1TextRadio: {
        get: function () {
          for (let value in this.logisticsCodeUrl) {
            if (this.form.layer1Text === this.logisticsCodeUrl[value]) {
              return this.form.layer1Text;
            }
          }
          return '-1';
        },
        set: function (val) {
          if (val != '-1') {
            this.form.layer1Text = val;
          } else {
            this.form.layer1Text = '';
          }
        }
      }
    },
    watch: {
      //物流码层数更改
      'form.layerNumber': function (val) {
        if (val === this.enums.layerNumber.TWO) {
          this.form.layer2Number = 1;
        } else if (val === this.enums.layerNumber.NONE) {
          this.form.logisticsCodeLayer = [this.enums.codeLayer.THREE];
        }
      },
      //小码规则
      'form.layer3CodeRule': function (val) {
        this.form.layer1CodeRule = val;
        if (val == this.enums.codeRule.ORDINAL) {
          this.form.layer2CodeRule = val;
        }
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
  .codeUrl {
    .el-radio-group {
      width: 250px;
    }
    .el-radio {
      display: block;
      margin: 10px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-radio-group + .el-input {
      margin-top: 10px;
    }
  }

  .layerNumber {
    label {
      margin-right: 8px;
    }
    .el-input {
      width: 100px;
      margin-right: 20px;
    }
  }
</style>
