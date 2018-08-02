<template>
  <nz-dialog customClass="width-800" ref="dialog" title="扫描农药码" :okHandler="submit">
    <nz-form label-width="100px" ref="form" :model="form" :rules="rules">
      <nz-form-item class="normal-item" label="农药登记证号"><span>{{ form.PesticideCode }}</span></nz-form-item>
      <nz-form-item class="normal-item" label="农药名称"><span>{{ form.PesticideName }}</span></nz-form-item>
      <nz-form-item class="normal-item" label="注册商标"><span>{{ form.TraderMark }}</span></nz-form-item>
      <nz-form-item class="normal-item" label="规格"><span>{{ spec(form) }}</span></nz-form-item>
      <!--<nz-form-item class="normal-item" label="生产批次"><span>{{ form.xxx }}</span></nz-form-item>-->
      <nz-form-item class="normal-item" label="应扫描数量"><span>{{ form.Count }}</span></nz-form-item>
      <nz-form-item class="normal-item" label="单位"><span>{{ form.Unit }}</span></nz-form-item>
      <nz-form-item label="农药码">
        <nz-input autofocus ref="codeInput" v-model="form.BarCode" type="textarea" style="width: 260px" placeholder="请扫码或手动输入" resize="none" rows="7"></nz-input>
      </nz-form-item>
      <nz-form-item class="normal-item" label="已扫">{{ count }}</nz-form-item>
    </nz-form>
  </nz-dialog>
</template>
<script>
  export default {
    data(){
      return {
        title: '',
        formModel: {ID: '', PesticideCode: '', PesticideName: '', Count: '', BarCode: '', Unit: '', TraderMark: '', SpecQuantity: '', SpecUnit: '', SpecType: ''},
        form: {},
        rules: {
          key1: [this.$formRules.required],
          key2: [this.$formRules.required, this.$formRules.intRange(5, 10)],
          key3: [this.$formRules.required, this.$formRules.minLength(10), this.$formRules.maxLength(20)]
        }
      }
    },
    computed: {
      count(){
        const {BarCode = ''} = this.form;
        const lines = BarCode.split('\n');
        const realLines = lines.filter(line => line.trim() !== '');
        return realLines.length;
      }
    },
    methods: {
      spec(row){
        const {SpecQuantity, SpecUnit, SpecType} = row;
        if (SpecQuantity && SpecUnit && SpecType) {
          return `${SpecQuantity}${SpecUnit}/${SpecType}`;
        }
        return '';
      },
      async submit(callback){
        const valid = await this.$validForm(this.$refs.form);
        if (valid) {
          /**
           * 执行表单提交
           * const isSaveSuccess = this.$model('demo').save(this.form);
           * */
          const formData = Object.jsonClone(this.form);
          this.$emit('save-trigger', formData);
          const isSaveSuccess = true;
          if (isSaveSuccess) {
            this.$emit('save-success');
            this.$refs.dialog.hide();
          }
        }
        callback();
      },
      init(){
        this.form = Object.jsonClone(this.formModel);
      },
      async initEdit(data){
        const info = await this.$model('purchase').getProductPesticideInfo(data.PesticideID);
        this.form.ID = data.ID || '';
        this.form.PesticideName = data.PesticideName || '';
        this.form.Count = data.Count || '';
        this.form.Unit = data.Unit || '';
        this.form.PesticideRegisteCode = data.PesticideRegisteCode || '';
        this.form.PesticideCode = data.PesticideCode || '';
        this.form.TraderMark = info.TraderMark || '';
        this.form.SpecQuantity = info.SpecQuantity || '';
        this.form.SpecUnit = info.SpecUnit || '';
        this.form.SpecType = info.SpecType || '';
        this.form.BarCode = data.BarCode || '';
      },
      async inputFocus(){
        await this.$sleep(500);
        this.$refs.codeInput.focus();
      },
      async show(data){
        this.init();
        await this.initEdit(data);
        this.$refs.dialog.show();
        this.inputFocus();
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .normal-item {
    margin-bottom: 0;
  }
</style>
