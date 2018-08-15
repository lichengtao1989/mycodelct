<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="标识名称" class="cjm-form-item-long" prop="tagName" required>
      <cjm-input v-model="form.tagName" @input="tagNameInput"
                 :disabled="operation==='approve' || operation==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="订单数量" class="single-item" prop="orderBatchNumber" required>
      <cjm-input v-model="formattedOrderNumber" v-if="isFormatOrderNumber"
                 :disabled="operation==='approve' || operation==='view'">
        <template slot="append">万</template>
      </cjm-input>
      <cjm-input v-model="form.orderBatchNumber" v-else
                 :disabled="operation==='approve' || operation==='view'"></cjm-input>
      <cjm-button type="text" @click="isFormatOrderNumber = !isFormatOrderNumber">格式转换</cjm-button>
    </cjm-form-item>
    <cjm-form-item label="生码数量" class="single-item" prop="batchNumber" required>
      <cjm-input v-model="formattedBatchNumber" v-if="isFormatBatchNumber"
                 :disabled="operation==='approve' || operation==='view'">
        <template slot="append">万</template>
      </cjm-input>
      <cjm-input v-model="form.batchNumber" v-else :disabled="operation==='approve' || operation==='view'"></cjm-input>
      <cjm-button type="text" @click="isFormatBatchNumber = !isFormatBatchNumber">格式转换</cjm-button>
    </cjm-form-item>
    <cjm-form-item label="标识规格" class="single-item" prop="tagSpecifications">
      <cjm-input v-model="form.tagSpecifications" :disabled="operation==='approve' || operation==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="印刷工厂" class="single-item" prop="factoryID" required>
      <cjm-remote-select v-model="form.factoryID" :label="form.factoryName"
                         :disabled="operation==='approve' || operation==='view'"
                         :remote-url="$globalData.get('code', 'apiUrl').productionOrder.GET_FACTORY_LIST"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="紧急程度">
      <cjm-enum-select v-model="form.emergencyDegree" :disabled="operation==='approve' || operation==='view'"
                       enum-name="生产订单紧急程度"
                       enum-namespace="code"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="补单">
      <cjm-enum-select v-model="form.isSupplement" :disabled="operation==='approve' || operation==='view'"
                       enum-name="是否"
                       enum-namespace="code"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="纸张要求" required prop="paperRequirements">
      <cjm-input v-model="form.paperRequirements" :disabled="operation==='approve' || operation==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="要求发货时间">
      <cjm-date-picker v-model="form.reqDeliveryTime" :picker-options="pickerOptions"
                       :disabled="operation==='approve' || operation==='view'"></cjm-date-picker>
    </cjm-form-item>
    <cjm-form-item label="应用系统" class="cjm-form-item-long" prop="systemCode" required>
      <cjm-radio-group v-model="form.systemCode" :disabled="operation==='approve' || operation==='view'">
        <cjm-radio label="SuperCode">超级码</cjm-radio>
        <cjm-radio label="Agriculture">农产品系统</cjm-radio>
        <!--<cjm-radio label="Independent">独立系统</cjm-radio>-->
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="码功能" class="cjm-form-item-long" required>
      <cjm-checkbox-group v-model="form.functionType" :disabled="operation==='approve' || operation==='view'">
        <cjm-checkbox label="1">防伪</cjm-checkbox>
        <cjm-checkbox label="2">物流</cjm-checkbox>
        <cjm-checkbox label="3">积分</cjm-checkbox>
      </cjm-checkbox-group>
    </cjm-form-item>
    <cjm-form-item label="码类型" class="cjm-form-item-long" required prop="codeType">
      <cjm-checkbox-group v-model="form.codeType" :disabled="operation==='approve' || operation==='view'">
        <cjm-checkbox label="6">18+20</cjm-checkbox>
        <cjm-checkbox label="1">17+4</cjm-checkbox>
        <cjm-checkbox label="7">16+20</cjm-checkbox>
        <cjm-checkbox label="2">π技术</cjm-checkbox>
        <cjm-checkbox label="3">码上图</cjm-checkbox>
        <cjm-checkbox label="4">SV</cjm-checkbox>
        <cjm-checkbox label="5">农药码</cjm-checkbox>
      </cjm-checkbox-group>
    </cjm-form-item>
    <cjm-form-item label="码上图模板" v-if="isChooseCodeModel" class="cjm-form-item-long" required>
      <cjm-radio-group v-model="form.maShangTuTemplate" :disabled="operation==='approve' || operation==='view'">
        <cjm-radio label="1">生肖</cjm-radio>
        <cjm-radio label="2">星座</cjm-radio>
        <cjm-radio label="3">多边形</cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="查询方式" class="cjm-form-item-long" prop="queryType" required>
      <cjm-checkbox-group v-model="form.queryType" :disabled="operation==='approve' || operation==='view'">
        <cjm-checkbox label="1">拍照查询</cjm-checkbox>
        <cjm-checkbox label="2">电话查询</cjm-checkbox>
        <cjm-checkbox label="3">网站查询</cjm-checkbox>
        <cjm-checkbox label="4">短信查询</cjm-checkbox>
      </cjm-checkbox-group>
    </cjm-form-item>
    <cjm-form-item label="序号起始值" prop="serialNumberIncreasing">
      <cjm-input v-model="form.serialNumberIncreasing"
                 :disabled="operation==='approve' || operation==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="序号重复次数" prop="serialNumberRepeatCount">
      <cjm-input v-model="form.serialNumberRepeatCount"
                 :disabled="operation==='approve' || operation==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="序号前缀" prop="serialNumberPrefix">
      <cjm-input v-model="form.serialNumberPrefix" :disabled="operation==='approve' || operation==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="序号后缀" prop="serialNumberSuffix">
      <cjm-input v-model="form.serialNumberSuffix"
                 :disabled="operation==='approve' || operation==='view' || (status>=1 && isApprove!=0)"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="生码备注" class="cjm-form-item-long" prop="generatingNote">
      <cjm-input type="textarea" v-model="form.generatingNote" :rows="4"
                 :disabled="operation==='approve' || operation==='view'"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="印刷备注" class="cjm-form-item-long" prop="printingNote">
      <cjm-input type="textarea" v-model="form.printingNote" :rows="4"
                 :disabled="operation==='approve' || operation==='view'"></cjm-input>
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
        return callback(new Error('请输入大于0的正整数'));
      }
      if (value > 10000000) {
        return callback(new Error(`数量过大，一批最多支持1000万`));
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
        queryType: [],
        enums: this.$globalData.get('code', 'enums'),
        apiUrl: this.$globalData.get('code', 'apiUrl'),
        isFormatBatchNumber: true, //生码数量格式转换
        isFormatOrderNumber: true, //订单数量格式转换
        isChooseCodeModel: false, //是否显示码上图模板
        rules: {
          tagName: [this.$formRules.required, this.$formRules.maxLength(40)],
          orderBatchNumber: [this.$formRules.required, batchNumberRule, this.$formRules.number],
          orderCode: [this.$formRules.required, this.$formRules.maxLength(64)],
          batchNumber: [this.$formRules.required, batchNumberRule, this.$formRules.number],
          functionType: [this.$formRules.required],
          factoryID: [this.$formRules.required],
          productID: [
            {
              validator: (rule, value, callback) => {
                if (value === '' && this.form.codeType.includes(this.enums.codeType.PESTICIDE)) {
                  callback(new Error(`请选择产品`));
                } else {
                  callback();
                }
              },
              trigger: 'change'
            }
          ],
          paperRequirements: [this.$formRules.required, this.$formRules.maxLength(20)],
          systemCode: [this.$formRules.required],
          isAutoUpload: [this.$formRules.required],
          fileNameLabel: [this.$formRules.maxLength(50)],
          serialNumberIncreasing: [this.$formRules.longRange(0), this.$formRules.maxLength(20)],
          serialNumberRepeatCount: [this.$formRules.intRange(1)],
          serialNumberPrefix: [this.$formRules.maxLength(50)],
          serialNumberSuffix: [this.$formRules.maxLength(50)],
          tagSpecifications: [this.$formRules.maxLength(40)],
          queryType: [this.$formRules.required],
          generatingNote: [this.$formRules.maxLength(200)],
          printingNote: [this.$formRules.maxLength(200)],
          codeType: [this.$formRules.required]
        },
        //生码数量是否格式化为"XX万"
        batchNumberFormat: true,
        orderBatchNumberFormat: true,
        pickerOptions: {
          disabledDate(){
            return false;
          }
        }
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
        get: function () {
          return this.form.batchNumber || this.form.batchNumber === 0 ? this.form.batchNumber / 10000 : '';
        },
        set: function (val) {
          this.form.batchNumber = val * 10000;
        }
      },
      formattedOrderNumber: {
        get: function () {
          return this.form.orderBatchNumber || this.form.orderBatchNumber === 0 ? this.form.orderBatchNumber / 10000 : '';
        },
        set: function (val) {
          this.form.orderBatchNumber = val * 10000;
        }
      }
    },
    watch: {
      //码类型更改
      'form.codeType': function (val, oldVal) {
        let operate = null;
        if (val.length > 0 && val.length > oldVal.length) {
          operate = val[val.length - 1];
        }
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
        let target1 = val.concat([]).find((n) => n === '1'); //选择 17+4
        let target2 = val.concat([]).find((n) => n === '2'); //选择 π技术
        let target3 = val.concat([]).find((n) => n === '3'); //选择 码上图
        //let target4 = val.concat([]).find((n) => n === '4'); //选择 SV码
        let target5 = val.concat([]).find((n) => n === '5'); //选择 农药码
        let target6 = val.concat([]).find((n) => n === '6'); //选择 18+20
        let target7 = val.concat([]).find((n) => n === '7'); //选择 16+20
        /*选中17+4*/
        if (target1 !== undefined && operate && operate === '1') {
          this.form.logisticsCodeLength = '16'; //生码那边的物流码位数
          if (target6 !== undefined) {
            this.form.codeType.remove('6');
            this.$message.warning('17+4和18+20不能同时选');
          } else if (target7 !== undefined) {
            this.form.codeType.remove('7');
            this.$message.warning('17+4和16+20不能同时选');
          } else if (target5 !== undefined) {
            this.form.codeType.remove('5');
            this.$message.warning('17+4和农药码不能同时选');
          }
        }
        /*选中18+20*/
        if (target6 !== undefined && operate && operate === '6') {
          this.form.logisticsCodeLength = '18'; //生码那边的物流码位数
          if (target1 !== undefined) {
            this.form.codeType.remove('1');
            this.$message.warning('18+20和17+4不能同时选');
          } else if (target7 !== undefined) {
            this.form.codeType.remove('7');
            this.$message.warning('18+20和16+20不能同时选');
          } else if (target5 !== undefined) {
            this.form.codeType.remove('5');
            this.$message.warning('18+20和农药码不能同时选');
          }
        }
        /*选中16+20*/
        if (target7 !== undefined && operate && operate === '7') {
          this.form.logisticsCodeLength = '16'; //生码那边的物流码位数
          if (target1 !== undefined) {
            this.form.codeType.remove('1');
            this.$message.warning('16+20和17+4不能同时选');
          } else if (target6 !== undefined) {
            this.form.codeType.remove('6');
            this.$message.warning('16+20和18+20不能同时选');
          } else if (target5 !== undefined) {
            this.form.codeType.remove('5');
            this.$message.warning('16+20和农药码不能同时选');
          }
        }
        /*选中π技术*/
        if (target2 !== undefined && operate && operate === '2') {
          if (target1 === undefined && target6 === undefined && target7 === undefined) {
            if (this.form.codeType.length === 1) {
              this.form.codeType.pop();
            } else {
              this.form.codeType = oldVal;
            }
            this.$message.warning('π技术不能单独选择，需要选17+4、18+20、16+20中的一个');
          }
        }
        /*选中码上图*/
        if (target3 !== undefined) {
          this.isChooseCodeModel = true;
        } else {
          this.isChooseCodeModel = false;
        }
        /*选中农药码*/
        if (target5 !== undefined && operate && operate === '5') {
          if (target1 || target2 || target3 || target6 || target7) {
            this.$message.warning('农药码只能和SV码同时选择！');
            this.form.codeType = ['5'];
          }
        }
      },
      //标签样式更改
      'form.stickerID': function (val) {
        if (!val) {
          this.form.salesman = '';
          this.form.designImage = '';
          this.form.stickerImage = '';
        }
      },
      //组织ID更改
      'form.corpID': function (val) {
        this.$emit('corp-changed', val);
      }
    },
    methods: {
      //获取企业下个生码批次
      getNextBatchID(corpID) {
        return new Promise((resolve, reject) => {
          this.$ajax
            .get(this.apiUrl.codeGeneration.GET_NEXT_BATCH_ID, {corpID: corpID})
            .then(r => {
              if (r.resultCode === '200') {
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
            if (r.resultCode === '200') {
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
      tagNameInput(val){
        this.$nextTick(() => {
          this.form.tagName = val.replace(/[']/g, '');
        });
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

  .single-item {
    float: none !important;
    clear: both;
    button[type=button] {
      position: absolute;
      right: -65px;
      top: 0px;
    }
  }
</style>
