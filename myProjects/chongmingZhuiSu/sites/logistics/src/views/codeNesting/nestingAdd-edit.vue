<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="箱标" prop="parentCode" required class="cjm-form-item-long">
      <cjm-input v-model="form.parentCode"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="单标" prop="codes" required style="clear: both;">
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
      msgDetails: [],
      rules: {
        parentCode: [this.$formRules.required],
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
    this.createForm();
  },
  methods: {
    createForm() {
      this.msgDetails = [];
      this.form = {
        parentCode: '',
        codes: []
      };
    },
    addForm() {
      this.reset();
    },
    reset() {
      this.createForm();
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.logisticsApiUrl.codeNesting.ADD, this.form).then(r => {
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
    }
  },
  computed: {
    codesValue() {
      if (this.form.codes && this.form.codes.length > 0) {
        return this.form.codes.join('\n');
      }
      return '';
    },
    codeCount() {
      return this.form.codes.length;
    }
  }
};
</script>
<style scoped>
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
