<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="产品名称" prop="productID" required class="cjm-form-item-long">
      <cjm-remote-select :value="form.productID"
                         :label="form.productName"
                         :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT"
                         @select="productSelect"></cjm-remote-select>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
  export default{
    data(){
      return {
        form: {},
        rules: {
          productID: [
            this.$formRules.required
          ]
        }
      }
    },
    methods: {
      editForm(obj){
        this.reset();
        this.$nextTick(()=> {
          this.form.productID = obj.productID;
          this.form.productName = obj.productName;
        });
      },
      productSelect(item){
        this.form.productID = item ? item.id : '';
        this.form.productName = item ? item.name : '';
      },
      submit(){
        return this.$refs.form.validate().then(()=>{
          return this.form;
        });
      },
      reset(){
        this.form = {
          productID: '',
          productName: ''
        };
        //必须调用此方法，否则上此验证的结果还会保留
        this.$nextTick(()=> {
          this.$refs.form.resetFields();
        });
      }
    },
    created(){
      this.reset();
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
