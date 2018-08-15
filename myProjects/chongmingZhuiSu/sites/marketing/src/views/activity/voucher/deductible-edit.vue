<template>
  <div class="cjm-edit-page">
    <cjm-form class="form" ref="form" :model="form" :rules="rules">
      <cjm-form-item label="折扣券名称" class="cjm-form-item-long" prop="voucherName" required>
        <cjm-input v-model="form.voucherName" :maxlength="60" placeholder="请输入兑换券名称"
                   :disabled="id == 'read'"></cjm-input>
        <cjm-popover
          ref="popover1"
          placement="top-start"
          width="200"
          trigger="hover"
          content="消费者扫码进入指定产品，即可抵扣部分金额，剩余在线支付；一码抵扣后即失效">
        </cjm-popover>
        <i class="cjm-icon-question" v-popover:popover1></i>
      </cjm-form-item>
      <cjm-form-item label="券有效期" class="cjm-form-item-long" prop="dateRange" required>
        <cjm-date-picker style="width:100%;" v-model="form.dateRange" type="daterange" :picker-options="pickerOptions"
                         :disabled="id == 'read'"></cjm-date-picker>
      </cjm-form-item>
      <cjm-form-item label="选择产品" class="cjm-form-item-long" prop="productID" required>
        <cjm-remote-select placeholder="请选择产品" @select="selectedProductHandler" :label="form.productName"
                           v-model="form.productID" :disabled="id == 'read'"
                           :remote-url="$globalData.get('marketing', 'apiUrl').activity.voucher.PRODUCT"></cjm-remote-select>
      </cjm-form-item>
      <!--<cjm-form-item label="选择批次" class="cjm-form-item-long">-->
        <!--<cjm-remote-select :disabled="form.productID == '' || id == 'read'" :label="form.productBatchCode"-->
                           <!--placeholder="请选择产品批次" :params="{productID: form.productID}" v-model="form.productBatchID"-->
                           <!--:remote-url="$globalData.get('marketing', 'apiUrl').autoComplete.PRODUCT_BATCH"></cjm-remote-select>-->
      <!--</cjm-form-item>-->
      <cjm-form-item label="抵扣金额" class="cjm-form-item-long" required>
        <div>
          <cjm-radio label="1" v-model="form.exchangeType" :disabled="id == 'read'">指定折扣</cjm-radio>
          <cjm-radio label="2" v-model="form.exchangeType" :disabled="id == 'read'">指定金额</cjm-radio>
          <cjm-radio label="3" v-model="form.exchangeType" :disabled="id == 'read'">随机金额</cjm-radio>
        </div>
        <div class="amount-item" v-if="form.exchangeType == '1'">
          <cjm-input placeholder="输入指定折扣" :disabled="id == 'read'" v-model="form.discount"
                     @input="discountInput"></cjm-input>
          <span class="discount">折</span>
        </div>
        <div class="amount-item" v-if="form.exchangeType == '2'">
          <cjm-input placeholder="输入指定金额" :disabled="id == 'read'" v-model="form.amount"
                     @input="amountInput"></cjm-input>
        </div>
        <div class="amount-item" v-if="form.exchangeType == '3'">
          <cjm-input v-model="form.beginRandomAmount" :disabled="id == 'read'" @input="beginRandomAmountInput"
                     @blur="randomAmountBlur" class="begin-amount" placeholder="起始金额"></cjm-input>
          <span class="sign"> - </span>
          <cjm-input v-model="form.endRandomAmount" :disabled="id == 'read'" @input="endRandomInput"
                     @blur="randomAmountBlur" class="end-amount" placeholder="结束金额"></cjm-input>
        </div>
      </cjm-form-item>
      <cjm-form-item label="发放方式" class="cjm-form-item-long" prop="batchID" required>
        <cjm-remote-select placeholder="仅显示已关联该产品批次的生码批次" :disabled="form.productID == '' || id == 'read'"
                           label-key="id" @select="selectedHandler" v-model="form.batchID"
                           :remote-url="$globalData.get('marketing', 'apiUrl').activity.voucher.GET_BATCH_IDS"
                           :params="{productID: form.productID, productBatchID: form.productBatchID}"></cjm-remote-select>
      </cjm-form-item>
    </cjm-form>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button @click="returnBack">取消</cjm-button>
      <cjm-button type="primary" @click="saveData" v-if="id == 'add'">保存</cjm-button>
    </div>
  </div>
</template>

<script>
  import pageSwitch from 'framework/mixins/pageSwitch';
  export default {
    mixins: [pageSwitch],
    data() {
      return {
        form: {
          voucherType: 'vou2',
          extendType: '1',
          voucherName: '',
          dateRange: '',
          productID: '',
          batchID: '',
          exchangeType: '1',
          discount: '',
          amount: '',
          beginRandomAmount: '', //抵扣金额-随机金额-起始金额
          endRandomAmount: '' //抵扣金额-随机金额-结束金额
        },
        productPrice: '',
        rules: {
          dateRange: [this.$formRules.required, this.$formRules.maxLength(60)],
          productID: [this.$formRules.required],
          batchID: [this.$formRules.required],
          voucherName: [
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  return callback(new Error('该项为必填项'));
                }
                this.$ajax.post(
                  this.$globalData.get('marketing', 'apiUrl').activity.voucher.CHECK_NAME_IS_EXIST,
                  {voucherName: value, voucherType: this.form.voucherType}
                ).then(res => {
                  if (res.resultCode === '200') {
                    callback();
                  } else {
                    callback(new Error(res.msg));
                  }
                });
              },
              trigger: 'blur'
            },
            this.$formRules.required
          ]
        },
        pickerOptions: {
          disabledDate(time) {
            return false;
          }
        },
        id: ''
      };
    },
    mounted() {
      let data = this.getPageParams('edit');
      this.id = data.id;
      if (data.renderData) {
        this.form = data.renderData;
        this.form.dateRange = new Date(data.renderData.beginTime).toString('yyyy/MM/dd') + ' ~ ' + new Date(data.renderData.endTime).toString('yyyy/MM/dd');
      }
    },

    methods: {
      discountInput(val) {
        if (!val) {
          this.$message.error('该字段为必填!');
          return false;
        }
        if (!/^[0-9]+(\.[0-9]{0,2})?$/.test(val)) {
          this.$message.error('该字段只能输入数字!');
          this.$nextTick(() => {
            this.form.discount = val.substring(0, val.length - 1);
            /* 快速输入仍然存在bug需要优化 */
          });
          return false;
        }
        if (parseFloat(this.form.discount) > 10) {
          this.$message.error('折扣字段不得超过10!');
          this.$nextTick(() => {
            this.form.discount = 10;
          });
          return false;
        }
      },
      amountInput(val) {
        if (!val) {
          this.$message.error('该字段为必填!');
          return false;
        }
        if (!/^[0-9]+(\.[0-9]{0,2})?$/.test(val)) {
          this.$message.error('该字段只能输入数字!');
          this.$nextTick(() => {
            this.form.amount = val.substring(0, val.length - 1);
            /* 快速输入仍然存在bug需要优化 */
          });
          return false;
        }
      },
      beginRandomAmountInput(val) {
        if (!val) {
          this.$message.error('该字段为必填!');
          return false;
        }
        if (!/^[0-9]+(\.[0-9]{0,2})?$/.test(val)) {
          this.$message.error('该字段只能输入数字!');
          this.$nextTick(() => {
            this.form.beginRandomAmount = val.substring(0, val.length - 1);
            /* 快速输入仍然存在bug需要优化 */
          });
          return false;
        }
      },
      randomAmountBlur(val) {
        if (parseFloat(this.form.beginRandomAmount) && parseFloat(this.form.endRandomAmount)) {
          if (parseFloat(this.form.beginRandomAmount) > parseFloat(this.form.endRandomAmount)) {
            this.$message.error('起始金额不可以大于结束金额!');
            this.$nextTick(() => {
              this.form.beginRandomAmount = this.form.endRandomAmount;
            });
          }
        }
      },
      endRandomInput(val) {
        if (!val) {
          this.$message.error('该字段为必填!');
          return false;
        }
        if (!/^[0-9]+(\.[0-9]{0,2})?$/.test(val)) {
          this.$message.error('该字段只能输入数字!');
          this.$nextTick(() => {
            this.form.endRandomAmount = val.substring(
              0,
              val.length - 1
            );
            /* 快速输入仍然存在bug需要优化 */
          });
          return false;
        }
      },
      saveData() {
        this.$refs.form.validate(res => {
          if (!res) {
            return false;
          }
          if (this.form.endRandomAmount && (parseFloat(this.form.endRandomAmount) > this.productPrice)) {
            this.$message.error('抵扣随机金额大于产品价格!');
            return false;
          }
          if (this.form.amount && (parseFloat(this.form.amount) > this.productPrice)) {
            this.$message.error('抵扣金额大于产品价格!');
            return false;
          }
          if(this.form.exchangeType == 3){
            if(!this.form.beginRandomAmount){
              this.$message.error('抵扣金额起始金额不能为空');
              return false;
            }
            if(!this.form.endRandomAmount){
              this.$message.error('抵扣金额结束金额不能为空');
              return false;
            }
          }
          this.$confirm('保存后会直接提交工厂，无法重新编辑，确定保存么?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = this.form;
            params['beginTime'] = this.form.dateRange.split(' ~ ')[0];
            params['endTime'] = this.form.dateRange.split(' ~ ')[1];
            this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.voucher.EXCHANGE_ADD, params).then(res => {
              if (res.resultCode === '200') {
                this.$message.success('保存成功');
                this.popPage();
              }
            }).catch(err => {
              this.$message.error(err.msg);
            });
          });
        });
      },
      selectedHandler(val) {
        this.form.batchID = val.id + '';
      },
      selectedProductHandler(val) {
        this.form.batchID = '';
        this.form.productBatchID = '';
        this.productPrice = parseFloat(val.priceOriginal);
      },
      returnBack() {
        this.popPage();
      }
    },
    watch: {
      'form.productID'(val) {
        if (this.id != 'read') {
          this.form.batchID = '';
        }
      },
      'form.exchangeType'(val) {
        if (this.id != 'read') {
          this.form.discount = '';
          this.form.amount = '';
          this.form.beginRandomAmount = '';
          this.form.endRandomAmount = '';
        }
      }
    }
  };
</script>
<style lang='less' scoped>
  .cjm-form .el-form-item {
    clear: both;
  }

  .form {
    width: 500px;
    margin: auto;
  }

  .amount-item {
    position: relative;
    span.discount {
      position: absolute;
      right: -20px;
      top: 0px;
    }
    .begin-amount,
    .end-amount {
      width: 188px;
    }
    span.sign {
      width: 6px;
      text-align: center;
      display: inline-block;
    }
  }

  .cjm-icon-question {
    position: absolute;
    right: -25px;
    font-size: 16px;
    top: 6px;
    cursor: pointer;
  }
</style>
