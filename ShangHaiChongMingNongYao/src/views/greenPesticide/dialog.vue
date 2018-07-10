<template>
  <nz-dialog customClass="width-850" ref="dialog" :title="title" :okHandler="submit">
    <nz-scrollbar style="height:400px">
      <div style="padding-right: 15px">
        <nz-form label-width="130px" ref="form" :model="form" :rules="rules">
          <div class="left-group">
            <nz-form-item label="产品名称" prop="ProductName" required>
              <nz-input v-model="form.ProductName"></nz-input>
            </nz-form-item>
            <nz-form-item label="登记证号" prop="RegisteCode">
              <nz-input v-model="form.RegisteCode"></nz-input>
            </nz-form-item>
            <nz-form-item label="生产企业" prop="ProductionEnterprise">
              <nz-input v-model="form.ProductionEnterprise"></nz-input>
            </nz-form-item>
            <nz-form-item label="规格" prop="SpecQuantity">
              <nz-input class="input-select-group" v-model="form.SpecQuantity">
                <div class="select-wrap clear" slot="suffix">
                  <nz-valid-reject>
                    <div class="select-item">
                      <nz-select placeholder="包装单位" v-model="form.SpecUnit"></nz-select>
                    </div>
                    <div class="select-item">
                      <nz-select placeholder="包装类型" v-model="form.ReagentType"></nz-select>
                    </div>
                  </nz-valid-reject>
                </div>
              </nz-input>
            </nz-form-item>
            <nz-form-item label="剂型" prop="Dosage">
              <nz-input v-model="form.Dosage"></nz-input>
            </nz-form-item>
            <nz-form-item label="商品码" prop="GoodsCode">
              <nz-input v-model="form.GoodsCode"></nz-input>
            </nz-form-item>
            <nz-form-item label="防治对象" prop="ControlTarget">
              <nz-input v-model="form.ControlTarget"></nz-input>
            </nz-form-item>
            <nz-form-item label="有效期" prop="ExpiryDate">
              <nz-input v-model="form.ExpiryDate">
                <div class="input-unit" slot="suffix">月</div>
              </nz-input>
            </nz-form-item>
            <nz-form-item label="图片" prop="ImageInfo">
              <nz-image-upload v-model="form.ImageInfo"></nz-image-upload>
            </nz-form-item>
          </div>
          <div class="right-group">
            <nz-form-item label="注册商标" prop="TraderMark">
              <nz-input v-model="form.TraderMark"></nz-input>
            </nz-form-item>
            <nz-form-item label="毒性级别" prop="ToxicLevel">
              <nz-input v-model="form.ToxicLevel"></nz-input>
            </nz-form-item>
            <nz-form-item label="有效成分及含量" prop="Ingredient">
              <nz-input v-model="form.Ingredient"></nz-input>
            </nz-form-item>
            <nz-form-item label="登记作物" prop="RegisteCrop">
              <nz-input v-model="form.RegisteCrop"></nz-input>
            </nz-form-item>
            <nz-form-item label="产品执行标准编号" prop="ExcuteStandardCode">
              <nz-input v-model="form.ExcuteStandardCode"></nz-input>
            </nz-form-item>
            <nz-form-item label="用药量（亩）" prop="key3">
              <nz-input v-model="form.key3"></nz-input>
            </nz-form-item>
            <nz-form-item label="施用方法" prop="UsageWay">
              <nz-input v-model="form.UsageWay"></nz-input>
            </nz-form-item>
            <nz-form-item label="销售单价" prop="SaleUnitPrice">
              <nz-input v-model="form.SaleUnitPrice">
                <div class="input-unit" slot="suffix">元</div>
              </nz-input>
            </nz-form-item>
          </div>
        </nz-form>
      </div>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
  export default {
    data(){
      return {
        title: '农药产品详情',
        formModel: {
          ProductName: '',
          TraderMark: '',
          RegisteCode: '',
          ToxicLevel: '',
          ProductionEnterprise: '',
          Ingredient: '',
          SpecQuantity: '',
          SpecUnit: '',
          ReagentType: '',
          RegisteCrop: '',
          Dosage: '',
          ExcuteStandardCode: '',
          GoodsCode: '',
          ControlTarget: '',
          UsageWay: '',
          ExpiryDate: '',
          SaleUnitPrice: '',
          ImageInfo: []
        },
        form: {},
        rules: {
          ProductName: [this.$formRules.required]
        }
      }
    },
    methods: {
      async submit(callback){
        const valid = await this.$validForm(this.$refs.form);
        if (valid) {
          /**
           * 执行表单提交
           * const isSaveSuccess = this.$model('demo').save(this.form);
           * */
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
      async initEdit(rowData){
        const data = await this.$model('greenPesticide').getInfo(rowData.Id);
        if (data) {
          this.form.ProductName = data.ProductName || '';
          this.form.TraderMark = data.TraderMark || '';
          this.form.RegisteCode = data.RegisteCode || '';
          this.form.ToxicLevel = data.ToxicLevel || '';
          this.form.ProductionEnterprise = data.ProductionEnterprise || '';
          this.form.Ingredient = data.Ingredient || '';
          this.form.SpecQuantity = data.SpecQuantity || '';
          this.form.SpecUnit = data.SpecUnit || '';
          this.form.ReagentType = data.ReagentType || '';
          this.form.RegisteCrop = data.RegisteCrop || '';
          this.form.Dosage = data.Dosage || '';
          this.form.ExcuteStandardCode = data.ExcuteStandardCode || '';
          this.form.GoodsCode = data.GoodsCode || '';
          this.form.ControlTarget = data.ControlTarget || '';
          this.form.UsageWay = data.UsageWay || '';
          this.form.ExpiryDate = data.ExpiryDate || '';
          this.form.SaleUnitPrice = data.SaleUnitPrice || '';
          this.form.ImageInfo = data.ImageInfo || [];
          return true;
        }
        return false;
      },
      async show(data){
        let initSuccess = true;
        this.init();
        if (data) {
          initSuccess = await this.initEdit(data);
        }
        if (initSuccess) {
          this.$refs.dialog.show();
        }
        //
      }
    }
  }
</script>
