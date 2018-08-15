<template>
  <div class="cjm-edit-page">
    <div v-if="currentPage == 'add'">
      <cjm-form ref="form" :model="form" :rules="rules">
        <cjm-form-item label="组织名称" prop="corpID" required>
          <cjm-remote-select v-model="form.corpID" :label="form.corpName" :disabled="operate == 'copy'"
                             :remote-url="$globalData.get('code', 'apiUrl').autoComplete.CORP"></cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="业务员" prop="operator" required>
          <cjm-input v-model="form.operator"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="订单编号" prop="orderCode" required>
          <cjm-input v-model="form.orderCode" @input="orderCodeInput"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="客户类型" prop="customerType" required>
          <cjm-enum-select v-model="form.customerType" enum-name="生产订单客户类型" enum-namespace="code"></cjm-enum-select>
        </cjm-form-item>
      </cjm-form>
      <div class="cjm-page-bottom-holder"></div>
      <div class="cjm-page-bottom-bar">
        <cjm-button type="primary" @click="submitData">确定</cjm-button>
        <cjm-button type="default" @click="cancel">取消</cjm-button>
      </div>
    </div>
    <div v-if="currentPage == 'edit'">
      <product-edit></product-edit>
    </div>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch'
  import productEdit from './product-edit.vue'
  export default{
    mixins: [pageSwitch],
    components: {
      productEdit
    },
    data(){
      return {
        operate: '',
        form: {
          productionOrderID: '', //订单ID
          corpID: '', //组织ID
          operator: '', //业务员
          orderCode: '', //订单编号
          customerType: '1',
          corpName: ''
        },
        currentPage: '',
        rules: {
          corpID: [
            this.$formRules.required
          ],
          operator: [
            this.$formRules.required,
            this.$formRules.maxLength(20)
          ],
          orderCode: [
            this.$formRules.required,
            this.$formRules.maxLength(60)
          ],
          customerType: [
            this.$formRules.required
          ]
        },
        editData: null
      }
    },
    methods: {
      cancel(){
        this.popPage();
      },
      orderCodeInput(val){
        this.$nextTick(() => {
          this.form.orderCode = val.replace(/[~!@#$%^&*()_+'\?\.,￥]/g, '');
        });
      },
      submitData(){
        this.$refs.form.validate((val) => {
          let url = '';
          if (!val) {
            return false;
          }
          if (this.operate === 'copy') {
            url = this.$globalData.get('code', 'apiUrl').productionOrder.COPY_ORDER;
          } else {
            url = this.$globalData.get('code', 'apiUrl').productionOrder.SAVE_DATA;
          }
          this.$ajax.post(url, this.form).then((res) => {
            if (res.resultCode === '200') {
              let params = {
                id: 'orderEdit',
                data: this.form,
                productionOrderID: res.data
              };
              if (this.operate === 'editOrderDetail') {
                params.productionOrderID = this.editData.productionOrderID;
              }
              this.$message.success('保存成功');
              //this.$emit('openEditPage', params);
              //this.pushPage('edit', '编辑订单标识', params);
              this.replacePage('edit', '编辑订单标识', params);
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      },
      pageSwitched(codes) {
        this.currentPage = codes.length > 1 ? codes[1] : 'add';
      }
    },
    created(){
      this.operate = this.getPageParams('add').id;
      if (this.getPageParams('add').data) {
        this.editData = this.getPageParams('add').data;
        if (this.operate === 'copy') {
          this.editData.orderCode = '';
        }
        Object.transfer(this.editData, this.form);
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  .cjm-form .el-form-item {
    float: none;
    margin: 20px auto;
  }
</style>
