<template>
  <div class="cjm-edit-page">
    <cjm-form :rules="rules" ref="form" :model="form">
      <cjm-form-item label="活动标题" required prop="activityName">
        <cjm-input v-model="form.activityName"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="活动时间" required prop="activityTime">
        <cjm-date-picker type="daterange" v-model="form.activityTime" :chooseFuture="true"></cjm-date-picker>
      </cjm-form-item>
      <cjm-form-item label="活动产品" required class="cjm-form-item-long" prop="productID">
        <cjm-transfer v-model="form.productIdList" @change="afterSelected" :data="transferData"></cjm-transfer>
      </cjm-form-item>
    </cjm-form>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button type="primary" @click="add" v-if="operate === 'add'">保存并设置内容</cjm-button>
      <cjm-button type="primary" @click="add" v-if="operate === 'edit'">保存基础信息</cjm-button>
    </div>
  </div>
</template>
<script>
  import CjmDatePicker from '../../../../../../framework/src/components/base/date-picker/src/date-picker'
  import pageSwitch from 'framework/mixins/pageSwitch'
  export default{
    components: {CjmDatePicker},
    mixins: [pageSwitch],
    data(){
      return {
        form: {
          activityID: '',
          activityName: '',
          productID: '',
          productIdList: [],
          activityTime: ''
        },
        rules: {
          activityName: [
            this.$formRules.required,
            this.$formRules.maxLength(30)
          ],
          activityTime: [
            this.$formRules.required
          ]
        },
        submitLock: true,
        transferData: [],
        operate: 'add'
      }
    },
    methods: {
      initTransferData(){
        this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.camelCode.GET_PRODUCT_LIST, {}).then(res => {
          this.transferData = res.data.rows.map((item, i) => {
            return {
              id: item.productID,
              name: item.productName,
              disabled: this.form.productIdList.length > 0 && this.form.productIdList.containTarget(item.productID)
            }
          });
        });
      },
      add(){
        this.$refs.form.validate((val) => {
          if (!val && !this.submitLock) {
            return false;
          }
          this.submitLock = false;
          if (!this.form.productID) {
            this.$message.warning('请选择参加活动的产品!');
            return false;
          }
          let params = {
            activityID: this.form.activityID,
            activityName: this.form.activityName,
            beginTime: this.form.activityTime.split(' ~ ')[0],
            endTime: this.form.activityTime.split(' ~ ')[1],
            addCodeType: 'ProductID',
            productID: this.form.productID
          };
          this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.camelCode.ADD, params).then((res) => {
            if (res.resultCode === '200') {
              this.$message.success('保存成功！');
              if (this.operate === 'add') {
                this.linkCamelCode();
              } else {
                this.popPage();
              }
            } else {
              this.$message.error(res.msg);
              this.submitLock = true;
            }
          });
        });
      },
      linkCamelCode(){
        this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.camelCode.GET_SET_ACTIVITY_CONTENT_URL).then(res => {
          if (res.resultCode === '200') {
            location.href = res.data;
          }
        });
      },
      afterSelected(val){
        this.form.productID = val.join(',');
      }
    },
    created(){
      Object.assign(this.form, this.getPageParams('edit').data);
      this.operate = this.getPageParams('edit').id ? this.getPageParams('edit').id : 'add';
      this.$nextTick(() => {
        this.form.productIdList = this.form.productID ? this.form.productID.split(',').map(item => {
          return item.toLowerCase();
        }) : [];
      });
    },
    mounted(){
      this.initTransferData();
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  .cjm-form .el-form-item {
    float: none;
  }
</style>
