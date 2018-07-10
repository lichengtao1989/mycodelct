<template>
  <nz-dialog customClass="width-800" ref="dialog" :isNeedOkButton="!readonly" :title="title" :okHandler="submit">
    <nz-form label-width="140px" ref="form" :model="form" :rules="rules">
      <div class="left-group">
        <nz-form-item label="农资店名称" prop="StoreName" required>
          <nz-input :readonly="readonly" v-model="form.StoreName"></nz-input>
        </nz-form-item>
        <nz-form-item label="负责人" prop="ChargePerson" required>
          <nz-input :readonly="readonly" v-model="form.ChargePerson"></nz-input>
        </nz-form-item>
        <nz-form-item label="身份证号" prop="IDCode" required>
          <nz-input :readonly="readonly" v-model="form.IDCode"></nz-input>
        </nz-form-item>
      </div>
      <div class="right-group">
        <nz-form-item label="统一社会信用代码" prop="CreditCode" required>
          <nz-input :readonly="readonly" v-model="form.CreditCode"></nz-input>
        </nz-form-item>
        <nz-form-item label="手机号" prop="PhoneNum" required>
          <nz-input :readonly="readonly" v-model="form.PhoneNum"></nz-input>
        </nz-form-item>
        <nz-form-item label="经营范围" prop="ManageScope" required>
          <nz-input :readonly="readonly" v-model="form.ManageScope"></nz-input>
        </nz-form-item>
      </div>
      <nz-form-item label="经营地址" prop="Town" required>
        <nz-valid-reject>
          <nz-enum-select :disabled="readonly" :options="$enum('农资店乡镇').values" v-model="form.Town"></nz-enum-select>
        </nz-valid-reject>
      </nz-form-item>
      <nz-form-item>
        <nz-input :readonly="readonly" v-model="form.ManageAddress"></nz-input>
      </nz-form-item>
    </nz-form>
  </nz-dialog>
</template>
<script>
  export default {
    data(){
      return {
        formModel: {Id: '', StoreName: '', ChargePerson: '', IDCode: '', CreditCode: '', PhoneNum: '', ManageScope: '', Town: '', ManageAddress: ''},
        pageType: '',
        form: {},
        rules: {
          StoreName: [this.$formRules.required],
          CreditCode: [this.$formRules.required],
          ChargePerson: [this.$formRules.required],
          IDCode: [this.$formRules.required],
          PhoneNum: [this.$formRules.required],
          ManageScope: [this.$formRules.required],
          Town: [this.$formRules.required]
        }
      }
    },
    computed: {
      title(){
        return ({view: '查看', edit: '编辑', add: '添加'})[this.pageType];
      },
      readonly(){
        return this.pageType === 'view';
      }
    },
    methods: {
      async submit(callback){
        const valid = await this.$validForm(this.$refs.form);
        if (valid) {
          let isSaveSuccess = false;
          if (this.pageType === 'add') {
            isSaveSuccess = await this.$model('agriculturalStore').add(this.form);
          } else if (this.pageType === 'edit') {
            isSaveSuccess = await this.$model('agriculturalStore').update(this.form);
          }
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
      async loadFormData(data){
        const result = await this.$model('agriculturalStore').getData(data.Id);
        this.form.Id = result.Id || '';
        this.form.StoreName = result.StoreName || '';
        this.form.ChargePerson = result.ChargePerson || '';
        this.form.IDCode = result.IDCode || '';
        this.form.CreditCode = result.CreditCode || '';
        this.form.PhoneNum = result.PhoneNum || '';
        this.form.ManageScope = result.ManageScope || '';
        this.form.Town = result.Town || '';
        this.form.ManageAddress = result.ManageAddress || '';
      },
      async showView(data){
        this.init();
        await this.loadFormData(data);
        this.$refs.dialog.show();
        this.pageType = 'view';
      },
      async showEdit(data){
        this.init();
        await this.loadFormData(data);
        this.$refs.dialog.show();
        this.pageType = 'edit';
      },
      showAdd(){
        this.init();
        this.$refs.dialog.show();
        this.pageType = 'add';
      }
    }
  }
</script>
