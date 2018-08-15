<template>
  <div>
    <cjm-form :model="form" ref="form" :rules="rules">
      <cjm-form-item label="确认发货时间" required prop="deliveryTime">
        <cjm-date-picker v-model="form.deliveryTime" :picker-options="options"></cjm-date-picker>
      </cjm-form-item>
      <cjm-form-item label="发货方式" required prop="deliveryType">
        <cjm-enum-select v-model="form.deliveryType" enum-name="生产订单-发放方式" enum-namespace="code"></cjm-enum-select>
      </cjm-form-item>
      <cjm-form-item label="样品" required prop="hasDemo">
        <cjm-enum-select v-model="form.hasDemo" enum-name="有无" enum-namespace="code"></cjm-enum-select>
      </cjm-form-item>
      <cjm-form-item label="备注1" class="cjm-form-item-long" prop="note1">
        <cjm-input type="textarea" v-model="form.note1" :rows="4"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="备注2" class="cjm-form-item-long" prop="note2">
        <cjm-input type="textarea" v-model="form.note2" :rows="4"></cjm-input>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        form: {},
        rules: {
          deliveryTime: [
            this.$formRules.required
          ],
          deliveryType: [
            this.$formRules.required
          ],
          hasDemo: [
            this.$formRules.required
          ],
          note1: [
            this.$formRules.maxLength(100)
          ],
          note2: [
            this.$formRules.maxLength(100)
          ]
        },
        options: {
          disabledDate(time){
            return false;
          }
        }
      }
    },
    methods: {
      submitData(){
        return new Promise((resolve, reject) => {
          this.$refs.form.validate((val) => {
            if (!val) {
              reject(new Error('请填写完整'));
              return false;
            }
            this.$ajax.post(this.$globalData.get('code', 'apiUrl').productionOrder.SAVE_DOCUMENTARY, this.form).then((res) => {
              if (res.resultCode === '200') {
                resolve(res);
              } else {
                reject(new Error(res.msg));
              }
            });
          });
        });
      },
      editForm(ids){
        this.reset(ids);
        this.$ajax.get(this.$globalData.get('code', 'apiUrl').productionOrder.GET_DOCUMENTARY, {codeGenerationID: ids.codeGenerationID}).then((res) => {
          if (res.resultCode === '200') {
            Object.transfer(res.data, this.form);
          } else {
            throw new Error(res.msg);
          }
        });
      },
      reset(ids){
        this.form = {
          codeGenerationId: ids !== undefined ? ids.codeGenerationID : '',
          documentaryID: ids !== undefined ? ids.documentaryID : '',
          deliveryTime: '',
          deliveryType: '',
          hasDemo: '',
          note1: '',
          note2: ''
        };
        this.$nextTick(() => {
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
  .cjm-form .el-form-item {
    float: none;
  }
</style>
