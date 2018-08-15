<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="产品名称" prop="productID" required class="cjm-form-item-long">
      <cjm-remote-select :value="form.productID"
                         :label="form.productName"
                         :disabled="!productEditable"
                         :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT"
                         @select="productSelect"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="产品批次" prop="productBatchID" required class="cjm-form-item-long">
      <cjm-remote-select :value="form.productBatchID"
                         :label="form.productBatchName"
                         :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT_BATCH"
                         :params="{productID: form.productID}"
                         @select="productBatchSelect"></cjm-remote-select>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
  export default{
    data(){
      return {
        form: {
          productID: '',
          productName: '',
          productBatchID: '',
          productBatchName: ''
        },
        rules: {
          productID: [
            this.$formRules.required
          ],
          productBatchID: [
            this.$formRules.required
          ]
        },
        //产品是否可编辑
        productEditable: false
      }
    },
    methods: {
      editForm(obj, productEditable){
        this.productEditable = productEditable;
        this.$refs.form.resetFields();
        this.form.productID = obj.productID;
        this.form.productName = obj.productName;
        this.form.productBatchID = obj.productBatchID;
        this.form.productBatchName = obj.productBatchName;
      },
      submit(){
        return this.$refs.form.validate().then(()=>{
          return this.form;
        });
      },
      productSelect(item){
        this.form.productID = item ? item.id : '';
        this.form.productName = item ? item.name : '';
        this.form.productBatchID = '';
        this.form.productBatchName = '';
      },
      productBatchSelect(item){
        this.form.productBatchID = item ? item.id : '';
        this.form.productBatchName = item ? item.name : '';
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
