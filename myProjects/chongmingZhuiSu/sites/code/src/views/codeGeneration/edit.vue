<template>
  <cjm-dialog ref="dialog" :visible.sync="dialogVisible" type="step" :height="850">
    <cjm-steps :active="activeStep">
      <cjm-step v-for="item in steps" :title="item.value" :key="item.key"></cjm-step>
    </cjm-steps>
    <edit-base ref="formBase" :form="form" :status="status" :isApprove="isApprove" :operation="operation" @corp-changed="corpChanged" v-show="steps[activeStep].value===allSteps.base"></edit-base>
    <edit-antifake ref="formAntifake" :form="form" :status="status" :isApprove="isApprove" :operation="operation" v-if="form.functionType.includes(enums.codeFunctionType.ANTIFAKE)" v-show="steps[activeStep].value===allSteps.antifake"></edit-antifake>
    <edit-logistics ref="formLogistics" :form="form" :status="status" :isApprove="isApprove" :operation="operation" :corp-logistics-layer-number="corpLogisticsLayerNumber" v-if="form.functionType.includes(enums.codeFunctionType.LOGISTICS)" v-show="steps[activeStep].value===allSteps.logistics"></edit-logistics>
    <edit-integral ref="formIntegral" :form="form" :status="status" :isApprove="isApprove" :operation="operation" v-if="form.functionType.includes(enums.codeFunctionType.INTEGRAL)" v-show="steps[activeStep].value===allSteps.integral"></edit-integral>
    <cjm-form ref="formApprove" v-if="operation==='approve'" v-show="steps[activeStep].value===allSteps.approve" :model="formForApprove" :rules="rulesForApprove">
      <cjm-form-item label="审核结果" prop="isApprove" required>
        <cjm-radio-group v-model="formForApprove.isApprove">
          <cjm-radio :label="value" v-for="(value,key) in codeApproveStatus" :key="value">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="审核备注" prop="note" class="cjm-form-item-long">
        <cjm-input type="textarea" v-model="formForApprove.note"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="分配工厂" prop="factoryID" required>
        <cjm-select v-model="formForApprove.factoryID">
          <cjm-option v-for="item in factorys" :key="item.factoryID" :label="item.factoryName" :value="item.factoryID"></cjm-option>
        </cjm-select>
      </cjm-form-item>
    </cjm-form>
    <div slot="footer">
      <cjm-button type="primary" @click="preStep" v-show="activeStep>0" :disabled="loading">
        <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>上一步
      </cjm-button>
      <cjm-button type="primary" @click="nextStep" v-show="activeStep+1<steps.length" :disabled="loading">
        下一步
        <i class="cjm-icon-chevron-down cjm-icon-rotate-n90" style="margin-right: 0; margin-left: 6px;"></i>
      </cjm-button>
      <cjm-button type="primary" @click="submit" v-if="operation!=='approve' && operation!=='view'" v-show="activeStep+1==steps.length" :loading="loading">
        <i class="cjm-icon-confirm"></i>确定
      </cjm-button>
      <cjm-button type="primary" @click="approveSubmit" v-if="operation==='approve'" v-show="activeStep+1==steps.length" :loading="loading">
        <i class="cjm-icon-confirm"></i>审核
      </cjm-button>
      <cjm-button @click="cancel" :disabled="loading">
        <i class="cjm-icon-close"></i>取消</cjm-button>
    </div>
  </cjm-dialog>
</template>

<script>
import EditBase from './components/edit-base';
import EditAntifake from './components/edit-antifake';
import EditLogistics from './components/edit-logistics';
import EditIntegral from './components/edit-integral';
const allSteps = {
  base: '基础信息',
  antifake: '防伪信息',
  logistics: '物流信息',
  integral: '积分信息',
  approve: '审核结果'
};

export default {
  components: {
    EditBase,
    EditAntifake,
    EditLogistics,
    EditIntegral
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      enums: this.$globalData.get('code', 'enums'),
      apiUrl: this.$globalData.get('code', 'apiUrl'),
      //当前的步骤，从0开始
      activeStep: 0,
      //当前这次生码一共的步骤
      steps: [{ key: Math.random(), value: allSteps.base }, { key: Math.random(), value: allSteps.antifake }],
      //完整的步骤
      allSteps: allSteps,
      //表单对象
      form: {},
      //审核表单对象
      formForApprove: {},
      rulesForApprove: {
        isApprove: [this.$formRules.required],
        note: [this.$formRules.maxLength(200)],
        factoryID: [this.$formRules.required]
      },
      //当前生码批次状态
      status: null,
      //审核状态
      isApprove: null,
      //当前表单的所处的操作，add、edit、approve、copy
      operation: '',
      //工厂
      factorys: [],
      loading: false,
      //组织的物流码层级
      corpLogisticsLayerNumber: 2
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.visible;
      },
      set: function(val) {
        this.$emit('update:visible', val);
      }
    },
    codeApproveStatus() {
      const result = {};
      for (let key in this.enums['生码审核状态']) {
        if (this.enums['生码审核状态'][key] !== this.enums.codeApproveStatus.NONE) {
          result[key] = this.enums['生码审核状态'][key];
        }
      }
      return result;
    }
  },
  watch: {
    //码功能更改
    'form.functionType': function(val, oldVal) {
      if (val.length === 0) {
        this.form.functionType = oldVal;
        return;
      }

      let temp = val.concat([]);
      temp.sort();
      this.steps = [{ key: Math.random(), value: allSteps.base }];
      for (let i = 0, len = temp.length; i < len; i++) {
        if (temp[i] === this.enums.codeFunctionType.ANTIFAKE) {
          this.steps.push({ key: Math.random(), value: allSteps.antifake });
        } else if (temp[i] === this.enums.codeFunctionType.LOGISTICS) {
          this.steps.push({ key: Math.random(), value: allSteps.logistics });
        } else if (temp[i] === this.enums.codeFunctionType.INTEGRAL) {
          this.steps.push({ key: Math.random(), value: allSteps.integral });
        }
      }
      //审核需要加上"审核结果"
      if (this.operation === 'approve') {
        this.steps.push({ key: Math.random(), value: allSteps.approve });
      }
    }
  },
  methods: {
    //组织更改
    corpChanged(corpID) {
      if (corpID) {
        this.$ajax
          .get(this.apiUrl.corp.GET, { corpID: corpID })
          .then(r => {
            if (r.resultCode == '200') {
              this.corpLogisticsLayerNumber = parseInt(r.data.logisticsLayerNumber);
            } else {
              this.$message.error(r.msg);
            }
          })
          .catch(error => {
            this.$message.error(error.message);
          });
      }
    },
    //新增
    addForm() {
      this.reset();
      this.operation = 'add';
    },
    //编辑
    editForm(id) {
      this.reset();
      this.operation = 'edit';
      this.codeGenerationID = id;
      this.$ajax
        .get(this.apiUrl.codeGeneration.GET, { id: id })
        .then(r => {
          if (r.resultCode == '200') {
            Object.transfer(r.data, this.form);
            this.form.maShangTuTemplate = this.form.maShangTuTemplate || this.enums.maShangTuTemplate.SHENG_XIAO;
            this.status = parseInt(r.data.status);
            this.isApprove = parseInt(r.data.isApprove);
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //查看
    viewForm(id) {
      this.reset();
      this.operation = 'view';

      this.$ajax
        .get(this.apiUrl.codeGeneration.GET, { id: id })
        .then(r => {
          if (r.resultCode == '200') {
            Object.transfer(r.data, this.form);
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //复制
    copyForm(id) {
      this.reset();
      this.operation = 'copy';

      this.$ajax
        .get(this.apiUrl.codeGeneration.GET, { id: id })
        .then(r => {
          if (r.resultCode == '200') {
            Object.transfer(r.data, this.form);
            this.form.maShangTuTemplate = this.form.maShangTuTemplate || this.enums.maShangTuTemplate.SHENG_XIAO;
            this.form.batchID = '';
            this.form.id = '';
            //把卡片的ID置空，否则会和原来的批次公用一个卡片
            if (this.form.cards && this.form.cards.length > 0) {
              this.form.cards.forEach(card => {
                card.cardID = '';
              });
            }

            this.$refs.formBase.getNextBatchID(r.data.corpID).then(batchID => {
              this.form.batchID = batchID;
            });
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //审核
    approveForm(id) {
      this.reset();
      this.operation = 'approve';

      this.$ajax
        .get(this.apiUrl.codeGeneration.GET, { id: id })
        .then(r => {
          if (r.resultCode == '200') {
            Object.transfer(r.data, this.form);
            this.formForApprove.id = r.data.id;
            this.formForApprove.factoryID = r.data.factoryID;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });

      this.$ajax
        .get(this.apiUrl.codeGeneration.GET_FACTORY_LIST, { pageSize: 1000 })
        .then(r => {
          if (r.resultCode == '200') {
            this.factorys = r.data.rows;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //表单验证
    validate() {
      let form = '';
      switch (this.steps[this.activeStep].value) {
        case allSteps.base:
          form = 'formBase';
          break;
        case allSteps.antifake:
          form = 'formAntifake';
          break;
        case allSteps.logistics:
          form = 'formLogistics';
          break;
        case allSteps.integral:
          form = 'formIntegral';
          break;
      }
      return new Promise((resolve, reject) => {
        this.$refs[form].validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject(new Error());
          }
        });
      });
    },
    //提交
    submit() {
      this.validate()
        .then(() => {
          this.loading = true;
          this.$ajax
            .post(this.apiUrl.codeGeneration.SAVE, this.form)
            .then(r => {
              if (r.resultCode == '200') {
                this.dialogVisible = false;
                this.$emit('submitSuccess', this.codeGenerationID);
              } else {
                this.$message.error(r.msg);
              }
              this.loading = false;
            })
            .catch(error => {
              this.$message.error(error.message);
              this.loading = false;
            });
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.message);
          } else {
            this.$message.warning('信息填写不全或者填写有误');
          }
        });
    },
    //审核提交
    approveSubmit() {
      this.$refs.formApprove.validate(val => {
        if (val) {
          this.loading = true;
          this.$ajax
            .post(this.apiUrl.codeGeneration.APPROVE, this.formForApprove)
            .then(r => {
              if (r.resultCode == '200') {
                this.dialogVisible = false;
                this.$emit('approveSuccess');
              } else {
                this.$message.error(r.msg);
              }
              this.loading = false;
            })
            .catch(error => {
              this.$message.error(error.message);
              this.loading = false;
            });
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
    },
    //重置表单
    reset() {
      const enums = this.$globalData.get('code', 'enums');
      this.activeStep = 0;
      this.form = {
        id: '',
        corpID: '',
        corpName: '',
        orderCode: '',
        batchNumber: '',
        batchID: '',
        functionType: [enums.codeFunctionType.ANTIFAKE],
        codeType: [],
        relatedProductName: '',
        productID: '',
        productNameOfPesticide: '',
        maShangTuTemplate: enums.maShangTuTemplate.SHENG_XIAO,
        systemCode: enums.systemCode.SUPERCODE,
        isAutoUpload: enums.yesOrNo.YES,
        fileNameLabel: '',
        serialNumberIncreasing: '',
        serialNumberRepeatCount: '',
        serialNumberPrefix: '',
        serialNumberSuffix: '',
        stickerID: '',
        stickerName: '',
        salesman: '',
        orderBatchNumber: '',
        orderImage: '',
        designImage: '',
        stickerImage: '',
        /************防伪信息***************/
        isActiveBySegment: enums.yesOrNo.NO,
        isMST: enums.yesOrNo.NO,
        mstBatchID: '',
        mstPassword: '',
        antiFakeTextPosition: enums.textPosition.BEFORE,
        antiFakeText: '',
        allowAntiFakeQuery: enums.yesOrNo.YES,
        allowAntiFakeQueryTimes: '0',
        techCharacteristics: ['1'],
        otherTechCharacteristics: '',
        internetQueryText: '尊敬的客户您好，您所查询的是XXX公司生产的XXX系列产品，是正牌产品的身份码，欢迎再次选购。',
        smsQueryText: '尊敬的客户您好，您所查询的是XXX公司生产的XXX系列产品，是正牌产品的身份码，欢迎再次选购。',
        notAllowAntiFakeQueryText: '',
        antiFakeCardName: '',
        tagImage: '',
        tagCardStyle: enums.tagCardStyle.HORIZONTAL,
        productImage: '',
        userCorpName: '',
        brandName: '',
        productName: '',
        productPrice: '',
        enabledServiceCardInfo: enums.yesOrNo.YES,
        customerServicePhone: '',
        enabledLikeCardInfo: enums.yesOrNo.NO,
        cards: [],
        /************物流信息***************/
        antiFakeEnableTime: enums.antiFakeEnableTime.BEFORE_DELIVER,
        allowLogisticsQuery: enums.yesOrNo.YES,
        logisticsCodeLength: '18',
        layerNumber: enums.layerNumber.NONE,
        layer2Number: '',
        layer3Number: '',
        layer1CodeRule: enums.codeRule.RANDOM,
        layer2CodeRule: enums.codeRule.RANDOM,
        layer3CodeRule: enums.codeRule.RANDOM,
        logisticsCodeLayer: [enums.codeLayer.THREE],
        layer1TextPosition: enums.textPosition.BEFORE,
        layer1Text: '',
        fixCode: '',
        enabledLogisticsCardInfo: enums.yesOrNo.NO,
        enabledOriginInfo: enums.yesOrNo.YES,
        /************积分信息***************/
        isIntegralDefineLater: enums.isIntegralDefineLater.YES,
        integralIndate: '',
        customerIntegral: '',
        orgCustomerIntegral: '',
        guideIntegral: '',
        shopIntegral: '',
        dealerIntegral: '',
        referrerIntegral1: '',
        referrerIntegral2: '',
        registerShopIntegral: ''
      };
      this.formForApprove = {
        id: '',
        isApprove: this.enums.codeApproveStatus.FAILED,
        note: '',
        factoryID: ''
      };
      this.status = null;
      this.$nextTick(() => {
        if (this.$refs.formBase) {
          this.$refs.formBase.resetFields();
        }
        if (this.$refs.formAntifake) {
          this.$refs.formAntifake.resetFields();
        }
        if (this.$refs.formLogistics) {
          this.$refs.formLogistics.resetFields();
        }
        if (this.$refs.formIntegral) {
          this.$refs.formIntegral.resetFields();
        }
      });
    },
    //上一步
    preStep() {
      this.activeStep--;
      this.$refs.dialog.scrollToTop();
    },
    //下一步
    nextStep() {
      this.validate()
        .then(() => {
          this.activeStep++;
          this.$refs.dialog.scrollToTop();
        })
        .catch(error => {
          if (error.message) {
            this.$message.warning(error.message);
          } else {
            this.$message.warning('信息填写不全或者填写有误');
          }
        });
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
