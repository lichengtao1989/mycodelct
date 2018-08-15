<template>

</template>
<script>
  export default{
    data(){
      return {
        activityProductArr: [], //临时寄存活动产品的数组
        transferData: [], //transfer的数据
        rules: {
          activityName: [
            this.$formRules.required,
            this.$formRules.maxLength(60)
          ],
          activityDate: [
            this.$formRules.required
          ]
        },
        dateOptions: {
          disabledDate(){
            return false;
          }
        },
        firstRender: true
      }
    },
    props: ['form'],
    methods: {
      changeRadio(val){ //切换派发条件清空input中的值
        if (!this.firstRender) {
          this.form.verificateValue = '';
          this.form.verificateValueTotal = '';
        } else {
          this.firstRender = false;
        }
      },
      getActivityProductList(){
        this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.verificateCode.GET_EDIT_PRODUCT_LIST).then((res) => {
          if (res.resultCode == '200') {
            this.transferData = res.data.map((p) => {
              return {
                id: p.productID,
                name: p.productName + '(' + p.productCode + ')'
              }
            });
          }
        })
      },
      rulesMethods(){
        return new Promise((resolve, reject) => {

        });
      },
      reset(){
        this.activityProductArr = [];
      }
    },
    mounted(){
      this.getActivityProductList();
    },
    watch: {
      activityProductArr(val){
        this.form.activityProduct = JSON.stringify(val);
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../assets/css/config";

  .cjm-form .el-form-item {
    clear: both;
  }

  .radio-group {
    margin-top: 12px;
    .el-radio {
      margin-bottom: 10px;
    }
    label {
      width: 100%;
    }
  }

  .radio-wrap {
    position: relative;
    span {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .item-explain {
    color: @Silver;
    font-size: 12px;
    margin-bottom: 20px;
    padding-left: 20px;
    line-height: 20px;
  }

  div.blank {
    display: inline-block;
    width: 60px;
    height: 17px;
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: -2px;
      width: 100%;
      background: #000;
      height: 1px;
    }
    input {
      width: 50px;
      border: 0;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .select-product {
    padding-left: 110px;
  }

  .base-item {
    width: 700px;
    margin: auto;
  }
</style>
