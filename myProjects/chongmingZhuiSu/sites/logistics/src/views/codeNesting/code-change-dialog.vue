<template>
  <div>
    <cjm-dialog title="标识替换" :visible.sync="dialogVisible" :ok-handler="submit">
      <cjm-form v-if="dialogVisible" ref="form" :model="form" :rules="rules">
        <cjm-form-item label="（原）物流码" prop="oldCode" required class="cjm-form-item-long">
          <cjm-input v-model="form.oldCode"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="（新）物流码" prop="newCode" required class="cjm-form-item-long">
          <cjm-input v-model="form.newCode"></cjm-input>
        </cjm-form-item>
      </cjm-form>
    </cjm-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        dialogVisible: false,
        formModel: {
          oldCode: '',
          newCode: ''
        },
        form: {},
        rules: {
          oldCode: [this.$formRules.required],
          newCode: [this.$formRules.required]
        }
      };
    },
    methods: {
      async submit(callback){
        try {
          const valid = await this.$refs.form.validate();
          if (valid) {
            await this.doReplace();
          }
        } catch (e) {
        }
        callback();
      },
      async doReplace(){
        try {
          let logisticsApiUrl = this.$globalData.get('logistics', 'apiUrl');
          const {oldCode, newCode} = this.form;
          const param = {oldCode, newCode};
          const res = await this.$ajax.post(logisticsApiUrl.codeNesting.CODE_CHANGE, param);
          if (res.resultCode == 200) {
            this.$emit('replace-success');
          } else if (res.msg) {
            throw new Error(res.msg);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      },
      init(){
        this.form = Object.deepClone(this.formModel);
        this.$refs.form && this.$refs.form.clearValidate();
      },
      show(){
        this.init();
        this.dialogVisible = true;
      },
      hide(){
        this.dialogVisible = false;
      }
    }
  }
</script>
