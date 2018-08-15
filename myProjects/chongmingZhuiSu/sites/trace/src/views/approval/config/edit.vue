<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="配置名称" prop="reviewConfigName" required>
      <cjm-input v-model="form.reviewConfigName" :maxlength="50" :disabled="disabled"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="审批模块" prop="reviewModule" required>
      <cjm-radio-group v-model="form.reviewModule">
        <cjm-radio :label="value" v-for="(value,key) in approvalModule" :key="value" :disabled="disabled">{{key}}</cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
    <cjm-form-item label="审批人员" prop="auditor" required class="cjm-form-item-long">
      <cjm-transfer v-model="form.auditor" :data="transferData" :disabled="disabled"></cjm-transfer>
    </cjm-form-item>
    <cjm-form-item label="备注" prop="note" class="cjm-form-item-long">
      <cjm-input type="textarea" :rows="3" v-model="form.note" :disabled="disabled">
      </cjm-input>
    </cjm-form-item>

  </cjm-form>
</template>

<script>
import cjmTransfer from 'framework/components/base/transfer';
export default {
  components: {
    cjmTransfer
  },
  data: function() {
    return {
      form: {},
      transferData: [],
      disabled: false,
      rules: {
        reviewConfigName: [this.$formRules.required, this.$formRules.maxLength(30)],
        auditor: [this.$formRules.required],
        note: [this.$formRules.maxLength(60)]
      }
    };
  },
  computed: {
    approvalModule() {
      return this.$globalData.get('trace', 'enums')['审批模块'];
    }
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        if (this.disabled) {
          return 'view';
        } else {
          return this.$ajax.post(this.$globalData.get('trace', 'apiUrl').approval.SAVE, this.form).then(data => {
            if (data.resultCode != 200) {
              throw new Error(data.msg);
            }
          });
        }
      });
    },
    reset() {
      this.form = {
        reviewConfigName: '',
        reviewConfigID: '',
        reviewConfigCode: '',
        reviewModule: '1',
        auditor: [],
        note: ''
      };
      this.$nextTick(function() {
        this.$refs.form.resetFields();
      });
    },
    addForm() {
      this.reset();
      this.initTransferData();
    },
    editForm(id, view) {
      if (view) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      this.reset();
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').approval.GET_DETAIl, {
          reviewConfigID: id
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.form = r.data;
            if (r.data.auditor != '') {
              this.form.auditor = JSON.parse(r.data.auditor);
            }
            this.form = r.data;
            this.initTransferData();
          }
        })
        .catch();
    },
    //获取审批人员
    initTransferData() {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').autoComplete.USER, {
          pageSize: 1000000
        })
        .then(res => {
          if (res.resultCode === '200') {
            this.transferData = res.data.map((p, index) => {
              return {
                id: p.id,
                name: p.name
              };
            });
          }
        });
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style scoped>

</style>
