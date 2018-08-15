<template>
  <div class="cjm-edit-page">
    <cjm-form :model="form" label-width="150px" :rules="rules" ref="form" class="clear">
      <h1 class="cjm-h1">基础信息</h1>
      <cjm-form-item label="活动标题" required prop="activityName" class="cjm-form-item-long">
        <cjm-input v-model="form.activityName" :maxlength="60" class="self-input-size" placeholder="请输入活动标题"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="活动时间" class="cjm-form-item-long" style="text-align: center" id="saleRedPack">
        <cjm-date-picker v-model="form.beginTime" type="date" placeholder="请输入起始时间" :picker-options="beginTimeOption" style="float: left"></cjm-date-picker>
        -
        <cjm-date-picker v-model="form.endTime" type="date" placeholder="请输入截止时间" :picker-options="endingTimeOption" style="float: right"></cjm-date-picker>
      </cjm-form-item>
      <h1 class="cjm-h1">红包设置</h1>
      <cjm-form-item label="获得红包条件" required prop="conditions" class="cjm-form-item-long">
        <div class="scaning-get-redpack">
          <cjm-radio label="1" v-model="form.conditions">充值积分</cjm-radio>
          <span>（条件说明：消费者充值积分，同时输入导购账号，导购可根据设置的金额和概率随机获得一红包）</span>
        </div>
        <div class="scaning-get-redpack">
          <cjm-radio label="2" v-model="form.conditions">扫码既得</cjm-radio>
          <span>（条件说明：扫参与了活动的码，导购可根据设置的金额和概率随机获得一红包）</span>
        </div>
        <div class="scaning-get-redpack">
          <cjm-radio label="3" v-model="form.conditions">扫码激活</cjm-radio>
          <span>（条件说明：协助消费者激活抽奖页面，若该码正好参与了活动，导购可根据设置的金额和概率随机获得一红包）</span>
        </div>
      </cjm-form-item>
      <div class="item-percent cjm-form-item-long">
        <item-percent :form="form"></item-percent>
      </div>
      <cjm-form-item label="红包获得每日上限" class="cjm-form-item-long">
        <cjm-input :value="form.userDailyLimit" @input="limitedRedPackCount" placeholder="每人每日红包上限,超过则获得失败" class="self-input-size"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="获得红包限制" required>
        <cjm-radio v-model="form.getRedPackLimit" label="1">导购仅可扫所属门店/经销商</cjm-radio>
        <cjm-radio v-model="form.getRedPackLimit" label="2">活动机构之间均可互扫</cjm-radio>
      </cjm-form-item>
      <h1 class="cjm-h1">参与活动产品</h1>
      <cjm-form-item label="选择产品批次" required class="cjm-form-item-long">
        <item-choose-block :searchUrl="productSearchUrl" :hasSecondClass="true" @activityProduct="activityProduct" :activityID="form.activityID" :editData="getPageParams('edit').data?getPageParams('edit').data.activityProduct:[]" :formData="form"></item-choose-block>
      </cjm-form-item>
      <h1 class="cjm-h1">参与活动机构</h1>
      <cjm-form-item label="选择机构" required class="cjm-form-item-long">
        <item-choose-block :searchUrl="orgSearchUrl" :hasSecondClass="false" @activityOrg="activityOrg" :activityID="form.activityID" :editData="getPageParams('edit').data?getPageParams('edit').data.activityOrg:[]" :formData="form"></item-choose-block>
      </cjm-form-item>
    </cjm-form>
    <div class="save-btn">
      <cjm-button type="primary" @click="saveData">保存</cjm-button>
    </div>
  </div>
</template>
<script>
import itemPercent from './components/item-percent.vue';
import itemChooseBlock from './components/item-choose-block.vue';
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  components: {
    itemPercent,
    itemChooseBlock
  },
  mixins: [pageSwitch],
  data() {
    let form = {
      activityID: '', //活动ID
      activityName: '', //活动名称
      amtPercent: [
        {
          prizeID: '',
          status: '',
          amount: '',
          percents: ''
        }
      ], //单个红包金额/获得概率
      userDailyLimit: '', //用户每日上限红包个数
      conditions: '1', //获得红包条件
      beginTime: '', //活动开始时间
      endTime: '', //活动结束时间
      activityProduct: [], //选择参加活动的产品
      activityOrg: [], //选择参加活动的机构
      getRedPackLimit: '1' //获得红包限制
    };
    return {
      form: form,
      rules: {
        activityName: [this.$formRules.required, this.$formRules.maxLength(60)],
        conditions: [this.$formRules.required]
      },
      productSearchUrl: this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack
        .GET_PRODUCT_LIST,
      orgSearchUrl: this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_ORG_LIST,
      beginTimeOption: {
        disabledDate(time) {
          if (form.endTime !== '') {
            return time.getTime() > new Date(form.endTime).getTime();
          }
        }
      },
      endingTimeOption: {
        disabledDate(time) {
          if (form.beginTime !== '') {
            return time.getTime() < new Date(form.beginTime).getTime();
          }
        }
      },
      attendOrgList: []
    };
  },
  methods: {
    saveData() {
      this.$refs.form.validate(val => {
        if (!this.form.activityName) {
          this.$message('活动标题不能为空！');
          return false;
        }
        if (this.form.activityName.length > 60) {
          this.$message('活动标题不能超过60个字！');
          return false;
        }
        let redPackPersent = 0;
        for (let i = 0; i < this.form.amtPercent.length; i++) {
          if (this.form.amtPercent[i].amount === '') {
            this.$message('红包金额为必填！');
            return false;
          }
          if (parseInt(this.form.amtPercent[i].amount) < 1) {
            this.$message('红包金额不能小于1！');
            return false;
          }
          if (this.form.amtPercent[i].percents === '') {
            this.$message('红包概率为必填！');
            return false;
          }

          if (parseInt(this.form.amtPercent[i].percents) <= 0) {
            this.$message('红包概率必须大于0！');
            return false;
          }
          redPackPersent += parseFloat(this.form.amtPercent[i].percents);
        }
        if (redPackPersent > 100) {
          this.$message('红包概率总和不得超过100%!');
          return false;
        }
        if (this.form.activityProduct.length === 0) {
          this.$message('请选择参加活动的产品!');
          return false;
        }
        if (this.form.activityOrg.length === 0) {
          this.$message('请选择参加活动的机构!');
          return false;
        }
        this.$ajax
          .post(
            this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.ADD_ACTIVITY,
            this.form
          )
          .then(res => {
            if (res.resultCode === '200') {
              this.popPage();
              this.$message.success('保存成功!');
            }
          });
      });
    },
    activityProduct(val) {
      this.form.activityProduct = val;
    },
    activityOrg(val) {
      this.form.activityOrg = val;
    },
    limitedRedPackCount(val) {
      if (val < 0) {
        this.form.userDailyLimit = 0;
        this.$message('红包个数不能小于0');
      }
      this.form.userDailyLimit = val;
    }
  },
  mounted() {
    if (this.getPageParams('edit').data) {
      let renderData = this.getPageParams('edit').data;
      if (this.getPageParams('edit').id === 'copy') {
        //复制进来的 activityID 为空
        this.form.activityID = '';
      } else {
        // 编辑 或者 新建
        this.form.activityID = renderData.activityID ? renderData.activityID : '';
      }
      this.form.activityName = renderData.activityName;
      this.form.userDailyLimit = renderData.userDailyLimit === '0' ? '' : renderData.userDailyLimit;
      this.form.conditions = renderData.conditions;
      this.form.beginTime = renderData.beginTime;
      this.form.endTime = renderData.endTime;
      this.form.getRedPackLimit = renderData.getRedPackLimit;
      this.form.activityProduct = renderData.activityProduct.map((val, index) => {
        return {
          productID: val.productID,
          productBatchID: val.productBatchID
        };
      });
      this.form.activityOrg = renderData.activityOrg.map((val, index) => {
        return val.orgID;
      });
      if (renderData.amtPercent.length > 0) {
        this.form.amtPercent = renderData.amtPercent.map((val, index) => {
          let percent = {};
          if (this.getPageParams('edit').id === 'copy') {
            percent = {
              prizeID: '',
              status: '',
              amount: val.amount,
              percents: val.percents
            };
          } else {
            percent = {
              prizeID: val.prizeID,
              status: val.status,
              amount: val.amount,
              percents: val.percents
            };
          }
          return percent;
        });
      } else {
        this.form.amtPercent = [
          {
            prizeID: '',
            status: '',
            amount: '',
            percents: ''
          }
        ];
      }
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../assets/css/config';
.cjm-form {
    .el-form-item {
      clear: both;
    }
    .el-date-editor.el-input {
      width: 48%;
    }
    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
    .self-input-size {
      width: 48% !important;
    }
  }
.form-item-title {
  float: left;
  color: @Black;
  display: block;
  width: 100%;
  margin: 10px 0 20px;
  font-weight: bold;
}

.item-percent {
  float: left;
}

.save-btn {
  text-align: center;
}

.scaning-get-redpack {
  span {
    color: @ExtraLightSilver;
  }
}
</style>
<style rel='stylesheet/less' lang='less'>
#saleRedPack {
  .el-form-item {
      clear: both;
    }
    .el-date-editor.el-input {
      width: 48%;
    }
    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
    .self-input-size {
      width: 48% !important;
    }
}
</style>
