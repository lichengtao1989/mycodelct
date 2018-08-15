<template>
  <div class="cjm-edit-page">
    <cjm-form class="form" ref="form" :model="form" :rules="rules">
      <cjm-form-item label="兑换券名称" class="cjm-form-item-long" prop="voucherName" required>
        <cjm-input v-model="form.voucherName" :maxlength="60" placeholder="请输入兑换券名称"
                   :disabled="id == 'read'"></cjm-input>
        <cjm-popover
          ref="popover1"
          placement="top-start"
          width="200"
          trigger="hover"
          content="创建好活动后，消费者扫码进入指定产品页，即可兑换。一码兑换后即失效">
        </cjm-popover>
        <i class="cjm-icon-question" v-popover:popover1></i>
      </cjm-form-item>
      <cjm-form-item label="券有效期" class="cjm-form-item-long" prop="dateRange" required>
        <cjm-date-picker v-model="form.dateRange" type="daterange" :picker-options="pickerOptions"
                         :disabled="id == 'read'"></cjm-date-picker>
      </cjm-form-item>
      <cjm-form-item label="兑换产品" class="cjm-form-item-long" prop="productID" required>
        <cjm-remote-select placeholder="请选择产品" :label="form.productName" v-model="form.productID"
                           :disabled="id == 'read'" @select="selectedProductHandler"
                           :remote-url="$globalData.get('marketing', 'apiUrl').activity.voucher.PRODUCT"></cjm-remote-select>
      </cjm-form-item>
      <!--<cjm-form-item label="产品批次" class=".0-form-item-long">-->
        <!--<cjm-remote-select placeholder="请选择产品批次" :disabled="form.productID == '' || id == 'read'"-->
                           <!--v-model="form.productBatchID"-->
                           <!--:remote-url="$globalData.get('marketing', 'apiUrl').autoComplete.PRODUCT_BATCH"-->
                           <!--:params="{productID: form.productID}" :label="form.productBatchCode"></cjm-remote-select>-->
      <!--</cjm-form-item>-->
      <cjm-form-item label="发放方式" class="cjm-form-item-long" prop="batchID" required>
        <cjm-remote-select placeholder="仅显示已关联该产品批次的生码批次" :disabled="form.productID == '' || id == 'read'"
                           @select="selectedHandler" v-model="form.batchID"
                           :remote-url="$globalData.get('marketing', 'apiUrl').activity.voucher.GET_BATCH_IDS"
                           :params="{productID: form.productID, productBatchID: form.productBatchID}"
                           label-key="id"></cjm-remote-select>
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
          voucherType: 'vou1',
          extendType: '1',
          voucherName: '',
          dateRange: '',
          productID: '',
          batchID: ''
        },
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
                  {
                    voucherName: value,
                    voucherType: this.form.voucherType
                  }
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
        this.form.dateRange =
          new Date(data.renderData.beginTime).toString('yyyy/MM/dd') +
          ' ~ ' +
          new Date(data.renderData.endTime).toString('yyyy/MM/dd');
      }
    },

    methods: {
      saveData() {
        this.$refs.form.validate().then(res => {
          if (!res) {
            return false;
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
        this.form.batchID = val.id + ''; //需要转成字符串的形式
      },
      selectedProductHandler(val){
        this.form.batchID = '';
        this.form.productBatchID = '';
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
      }
    }
  };
</script>
<style lang='less' scoped>
  .cjm-form .el-form-item {
    clear: both;
  }

  .cjm-icon-question {
    position: absolute;
    right: -25px;
    font-size: 16px;
    top: 6px;
    cursor: pointer;
  }

  .form {
    width: 500px;
    margin: auto;
  }
</style>
