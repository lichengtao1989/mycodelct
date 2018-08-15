<template>
  <div class="cjm-edit-page">
    <div class="step">
      <cjm-steps :active="stepActive">
        <cjm-step v-for="item in steps" :title="item.title" :key="item.key"></cjm-step>
      </cjm-steps>
    </div>
    <div class="step-view" v-show="steps[stepActive].title == allSteps.base">
      <!--<base-item ref="baseItem" :form="form"></base-item>-->
      <cjm-form :model="form" :rules="rules" ref="form">
        <cjm-form-item label="活动标题" required prop="activityName">
          <cjm-input v-model="form.activityName"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="活动时间" required prop="activityDate">
          <cjm-date-picker v-model="form.activityDate" type="daterange" :picker-options="dateOptions"></cjm-date-picker>
        </cjm-form-item>
        <cjm-form-item label="派发条件" required class="cjm-form-item-long">
          <cjm-radio-group v-model="form.verificateType" class="radio-group" @change="changeRadio">
            <div class="radio-wrap">
              <span class="shuo">说明</span>
              <cjm-radio label="1">新客户</cjm-radio>
              <p class="item-explain">(条件说明：若您设置了新客户；那么从未购买过产品的消费者，若在活动期间购买，并充值入积分，将会收到该门店的抵扣码)</p>
            </div>
            <div class="radio-wrap">
              <cjm-radio label="2">消费者一次性充值积分达到
                <div class="blank"><input type="text" class="blank" v-show="form.verificateType == 2"
                                          v-model="form.verificateValue"></div>
              </cjm-radio>
              <span>说明</span>
              <p class="item-explain">(条件说明：活动期间，当消费者达到您设置的一次性充值的积分值时，将会收到该门店的抵扣码)</p>
            </div>
            <div class="radio-wrap">
              <cjm-radio label="3">消费者累计充值积分达到
                <div class="blank"><input type="text" class="blank" v-show="form.verificateType == 3"
                                          v-model="form.verificateValueTotal"></div>
              </cjm-radio>
              <span>说明</span>
              <p class="item-explain">(条件说明：当消费者达到您设置的累计充值积分值时，会收到该门店的抵扣码)</p>
            </div>
            <div class="radio-wrap">
              <cjm-radio label="4">派发抵用码的产品</cjm-radio>
              <span>说明</span>
              <p class="item-explain">(条件说明：当消费者购买了您派发抵用码的产品时，并充值积分，将会收到该门店的抵扣码)</p>
            </div>
          </cjm-radio-group>
        </cjm-form-item>
      </cjm-form>
      <div class="select-product" v-if="form.verificateType == 4">
        <cjm-transfer v-model="activityProductArr" :data="transferProductData"></cjm-transfer>
      </div>
    </div>
    <div class="step-view" v-show="steps[stepActive].title == allSteps.activityOrg">
      <cjm-transfer v-model="activityOrgArr" :data="transferOrgData"></cjm-transfer>
    </div>
    <div class="step-view" v-show="steps[stepActive].title == allSteps.activityProduct">
      <cjm-transfer v-model="activityProductArr" :data="transferProductData"></cjm-transfer>
    </div>
    <div class="step-view" v-show="steps[stepActive].title == allSteps.message">
      <div>
        <h1 class="cjm-h1">短信自动发送模板设置 <span>（请于下划线输入内容，其余系统自动匹配）</span></h1>
        <div class="message-content">
          <span>感谢您购买</span>
          <div class="blank product">
            <input type="text" class="blank" maxlength="32" v-model="messageProduct">
          </div>
          <span>产品，恭喜您获得该门店</span>
          <div class="blank">
            <input type="text" class="blank" maxlength="10" v-model="messageAmount">
          </div>
          <span>元抵用券一张，可在该门店购买任一产品时出示抵用码####进行抵用，活动期间###-###有效。详情咨询该门店。</span>
        </div>
      </div>
    </div>
    <div class="step-view" v-show="steps[stepActive].title == allSteps.finished">
      <div class="finished clear">
        <div class="finished-logo"></div>
        <div class="finished-control">
          <div class="finished-title">
            恭喜您，<span v-if="form.activityID == ''">新增</span><span v-if="form.activityID != ''">编辑</span>活动成功！
          </div>
          <div class="finished-btn" v-if="form.activityID == ''">
            <cjm-button type="primary" @click="reset">继续添加</cjm-button>
            <cjm-button type="primary" @click="returnList">活动列表</cjm-button>
          </div>
        </div>
      </div>
    </div>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button type="primary" @click="prevStep()"
                  v-if="steps[stepActive].title != allSteps.base && steps[stepActive].title != allSteps.finished">上一步
      </cjm-button>
      <cjm-button type="primary" @click="nextStep()" v-if="steps[stepActive].title != allSteps.finished">下一步
      </cjm-button>
    </div>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch'
  let allSteps = {
    base: '基本设置',
    activityOrg: '活动机构',
    activityProduct: '活动产品',
    message: '短信设置',
    finished: '完成'
  };
  export default{
    mixins: [pageSwitch],
    data(){
      return {
        stepActive: 0,
        activityStepShow: true,
        activityOrgArr: [],
        activityProductArr: [],
        transferOrgData: [],
        transferProductData: [],
        messageProduct: '', //编辑短信产品名称
        messageAmount: '', //编辑短信金额
        interfaceLock: true,
        form: {
          activityID: '', //活动ID 为空时为新增
          activityName: '', //活动标题
          activityDate: '', //活动时间
          verificateType: '1', //1-新客户 2-消费者一次性 3-消费累计充值积分 4-派发地用码的产品
          verificateValue: '', //一次性充值积分
          verificateValueTotal: '', //累计充值积分
          activityProduct: '', //活动产品(数据结构为数组最为方便，但是后端要求string)
          activityOrg: '', //活动机构(数据结构是数组更为方便)
          sMSType: '', //短信模板设置()
          sMSFillValues: ''
        },
        steps: [
          {title: allSteps.base, key: Math.random()},
          {title: allSteps.activityOrg, key: Math.random()},
          {title: allSteps.activityProduct, key: Math.random()},
          {title: allSteps.message, key: Math.random()},
          {title: allSteps.finished, key: Math.random()}
        ],
        allSteps: allSteps,
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
    methods: {
      activityOrgInit(){
        this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.verificateCode.GET_ORG_LIST).then((res) => {
          if (res.resultCode == '200') {
            this.transferOrgData = res.data.map((p, index) => {
              return {
                id: p.orgID,
                name: p.orgName + '(' + p.orgCode + ')'
              }
            })
          }
        })
      },
      activityProductInit(){
        this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.verificateCode.GET_EDIT_PRODUCT_LIST).then((res) => {
          if (res.resultCode == '200') {
            this.transferProductData = res.data.map((p, index) => {
              return {
                id: p.productID,
                name: p.productName + '(' + p.productCode + ')'
              }
            })
          }
        })
      },
      prevStep(){ //上一步
        this.stepActive--;
      },
      nextStep(){ //下一步
        switch (this.steps[this.stepActive].title) {
          case '基本设置':
            this.$refs.form.validate((val) => {
              if (!val) {
                this.$message('请完整填写信息');
              } else {
                if (this.form.verificateType == 1) {
                  this.stepActive++;
                }
                if (this.form.verificateType == 2) {
                  if (this.form.verificateValue) {
                    this.stepActive++;
                  } else {
                    this.$message.error('消费者一次性充值积分为必填');
                  }
                }
                if (this.form.verificateType == 3) {
                  if (this.form.verificateValueTotal) {
                    this.stepActive++;
                  } else {
                    this.$message.error('消费者累计充值积分为必填');
                  }
                }
                if (this.form.verificateType == 4) {
                  console.log(this.form.activityProduct);
                  if (this.form.activityProduct) {
                    this.stepActive++;
                  } else {
                    this.$message.error('请选择派发抵用码的产品');
                  }
                }
              }
            });
            break;
          case '活动机构':
            if (this.form.activityOrg && this.form.activityOrg.length > 0) {
              this.stepActive++;
            } else {
              this.$message('请选择活动机构');
            }
            break;
          case '活动产品':
            if (this.form.activityProduct && this.form.activityProduct.length > 0) {
              this.stepActive++;
            } else {
              this.$message('请选择活动产品');
            }
            break;
          case '短信设置':
            if (!this.messageProduct) {
              this.$message('请填写产品名称');
              return false;
            }
            if (!this.messageAmount) {
              this.$message('请填写金额');
              return false;
            }
            if (isNaN(this.messageAmount)) {
              this.$message('请填写正确的金额');
              return false;
            }
            if (this.messageProduct && this.messageAmount) {
              this.form.sMSFillValues = this.messageProduct + '|' + this.messageAmount;
              if (this.interfaceLock) {
                this.interfaceLock = false;
                this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.verificateCode.ADD_ACTIVITY, this.form).then((res) => {
                  if (res.resultCode === '200') {
                    this.stepActive++;
                    if (this.form.activityID) {
                      setTimeout(() => {
                        this.returnList();
                      }, 3000);
                    }
                  } else {
                    this.$message(res.msg);
                  }
                  this.interfaceLock = true;
                })
              }
            }
            break;
        }
      },
      reset(){
        this.form = {
          activityID: '', //活动ID 为空时为新增
          activityName: '', //活动标题
          activityDate: '', //活动时间
          verificateType: '1', //1-新客户 2-消费者一次性 3-消费累计充值积分 4-派发地用码的产品
          verificateValue: '', //一次性充值积分
          verificateValueTotal: '', //累计充值积分
          activityProduct: '', //活动产品(数据结构为数组最为方便，但是后端要求string)
          activityOrg: '', //活动机构(数据结构是数组更为方便)
          sMSType: '', //短信模板设置()
          sMSFillValues: ''
        };
        this.activityOrgArr = [];
        this.activityProductArr = [];
        this.messageProduct = '';
        this.messageAmount = '';
        this.stepActive = 0;
        this.$refs.form.resetFields();
      },
      changeRadio(val){ //切换派发条件清空input中的值
        if (!this.firstRender) {
          this.form.verificateValue = '';
          this.form.verificateValueTotal = '';
        } else {
          this.firstRender = false;
        }
      },
      returnList(){
        this.popPage();
      },
      editInit(data){
        //获取编辑信息
        this.form = data;
        //数据库没有activityDate栏位
        this.form.activityDate = data.beginTime.split(' ')[0] + ' ~ ' + data.endTime.split(' ')[0];
        //transfer org 数据拼接
        this.activityOrgArr = data.activityOrg.map((p) => {
          return p.orgID;
        });
        this.activityProductArr = data.activityProduct.map((p) => {
          return p.productID;
        });
        //短信设置中的数据格式
        this.messageProduct = data.fillValues.split('|')[0];
        this.messageAmount = data.fillValues.split('|')[1];
        //
        this.form.activityOrg = JSON.stringify(this.activityOrgArr);
      }
    },
    mounted(){
      this.activityOrgInit();
      this.activityProductInit();
      if (this.getPageParams('edit').editData) {
        this.editInit(this.getPageParams('edit').editData);
      }
    },
    watch: {
      'form.verificateType': function (val) {
        if (val == '4') {
          this.steps = [
            {title: allSteps.base, key: Math.random()},
            {title: allSteps.activityOrg, key: Math.random()},
            {title: allSteps.message, key: Math.random()},
            {title: allSteps.finished, key: Math.random()}
          ]
        } else {
          this.steps = [
            {title: allSteps.base, key: Math.random()},
            {title: allSteps.activityOrg, key: Math.random()},
            {title: allSteps.activityProduct, key: Math.random()},
            {title: allSteps.message, key: Math.random()},
            {title: allSteps.finished, key: Math.random()}
          ];
        }
      },
      'form.verificateValue'(val) {
        this.form.verificateValue = val.replace(/[^\d+]/g, '');
      },
      'form.verificateValueTotal'(val) {
        this.form.verificateValueTotal = val.replace(/[^\d+]/g, '');
      },
      activityOrgArr(val){
        if (val.length > 0) {
          this.form.activityOrg = JSON.stringify(val);
        } else {
          this.form.activityOrg = '';
        }
      },
      activityProductArr(val){
        if (val.length > 0) {
          this.form.activityProduct = JSON.stringify(val);
        } else {
          this.form.activityProduct = '';
        }
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .finished {
    width: 600px;
    margin: 100px auto 0;
    .finished-logo {
      float: left;
      width: 234px;
      height: 195px;
      background: url('../../../assets/images/submit-success.png') no-repeat;
      background-size: 100% 100%;
      margin-right: 40px;
    }
    .finished-control {
      float: left;
      width: 250px;
      margin-top: 60px;
      .finished-title {
        font-size: 20px;
        margin-bottom: 30px;
      }
    }
  }

  .step-view {
    width: 800px;
    margin: 40px auto;
  }

  .cjm-h1 span {
    color: @Silver;
    font-size: 14px;
  }

  .message-content {
    padding-left: 30px;
    line-height: 30px;
    color: @Black;
  }

  .blank {
    display: inline-block;
    width: 60px;
    height: 17px;
    position: relative;
    &.product {
      width: 120px;
    }
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
      display: inline-block;
      width: 100%;
      border: 0;
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
    }
  }

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
      width: 100%;
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
