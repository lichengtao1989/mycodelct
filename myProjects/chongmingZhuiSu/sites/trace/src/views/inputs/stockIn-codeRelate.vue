<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="投入品名称" class="cjm-form-item-long">{{form.name}}</cjm-form-item>
    <cjm-form-item label="投入品批次" class="cjm-form-item-long">{{form.productionBatch}}</cjm-form-item>
    <cjm-form-item label="数量" class="cjm-form-item-long">
      {{form.quantity}}{{form.measurementUnit}}
    </cjm-form-item>
    <cjm-form-item label="入库方式" class="cjm-form-item-long">
      <cjm-radio-group v-model="form.relationCodeType">
        <cjm-radio label="1" key="1">按号段</cjm-radio>
        <cjm-radio label="2" key="2">单码</cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="起始码" v-if="form.relationCodeType==1" prop="relationCodeStart" key="relationCode-start">
      <cjm-input v-model="form.relationCodeStart"></cjm-input>
    </cjm-form-item>
    <div style="clear: both"></div>
    <cjm-form-item label="结束码" v-if="form.relationCodeType==1" prop="relationCodeEnd" key="relationCode-end">
      <cjm-input v-model="form.relationCodeEnd"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="追溯码" v-if="form.relationCodeType==2" prop="relationCode" key="relationCodes">
      <cjm-input type="textarea" placeholder="每行判定为一个追溯码" :rows="10" @input="relationCodeInput" :value="relateCodes">
      </cjm-input>
    </cjm-form-item>
    <cjm-form-item label="共计" class="cjm-form-item-long">
      {{codeCount}}
    </cjm-form-item>
  </cjm-form>
</template>

<script>
import bigInt from 'big-int';
export default {
  data() {
    return {
      form: {},
      rules: {
        relationCodeStart: [this.$formRules.logisticsCode],
        relationCodeEnd: [this.$formRules.logisticsCode],
        relationCode: [
          {
            validator: (rule, value, callback) => {
              if (value.length > 0 && value.length > this.form.quantity) {
                callback(new Error(`填写的追溯码数量不能大于入库数`));
                return;
              }
              for (let i = 0; i < value.length; i++) {
                if (!/^(\d{16}|\d{17}|\d{18})$/.test(value[i])) {
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
    relateCodes() {
      if (this.form.relationCode && this.form.relationCode.length > 0) {
        return this.form.relationCode.join('\n');
      }
      return '';
    },
    codeCount() {
      if (this.form.relationCodeType == '2') {
        return this.form.relationCode.length;
      } else {
        if (!/^(\d{16}|\d{17}|\d{18})$/.test(this.form.relationCodeStart) || !/^(\d{16}|\d{17}|\d{18})$/.test(this.form.relationCodeEnd)) {
          return 0;
        }
        if (
          bigInt(this.form.relationCodeEnd)
            .lt(this.form.relationCodeStart)
            .val()
        ) {
          return 0;
        }
        return bigInt(this.form.relationCodeEnd)
          .sub(this.form.relationCodeStart)
          .add(1)
          .val();
      }
    }
  },
  methods: {
    //追溯码修改事件
    relationCodeInput(val) {
      this.form.relationCode = val
        .trim()
        .split('\n')
        .filter(function(code) {
          return code != '';
        });
    },
    //编辑表单
    editForm(obj) {
      this.$refs.form.resetFields();
      this.form = Object.deepClone(obj);
    },
    //提交表单
    submit() {
      return this.$refs.form.validate().then(() => {
        if (this.form.relationCodeType == '1' && this.form.relationCodeStart) {
          if (
            bigInt(this.form.relationCodeEnd)
              .lt(this.form.relationCodeStart)
              .val()
          ) {
            throw new Error('起始码不能大于结束码');
          }
          if (this.codeCount > Number.parseInt(this.form.quantity)) {
            throw new Error('追溯码数量不能大于入库数');
          }
        }
        return this.form;
      });
    }
  }
};
</script>
