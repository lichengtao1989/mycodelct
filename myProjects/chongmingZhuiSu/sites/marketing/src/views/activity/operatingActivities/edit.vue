<template>
  <div>
    <div class="cjm-edit-page">
      <cjm-form ref="form" :model="form" :rules="rules">
        <h1 class="cjm-h1">基本设置</h1>
        <base-item :form="form" :rules="rules" class="clear"></base-item>
        <h1 class="cjm-h1">奖项设置</h1>
        <prize-item :form="form" :rules="rules" class="clear"></prize-item>
        <h1 class="cjm-h1">参与的个性化H5组织</h1>
        <cjm-transfer v-model="transferValue" :data="transferData" :filterable="true"></cjm-transfer>
        <!--<shuttle-box-item :activityCorps.sync="form.activityCorps"></shuttle-box-item>-->
      </cjm-form>
      <div class="cjm-page-bottom-holder"></div>
      <div class="cjm-page-bottom-bar">
        <cjm-button @click="saveData" type="primary" class="cjm-icon-save">&nbsp;保存</cjm-button>
        <cjm-button @click="previewPage" type="primary" class="cjm-icon-preview">&nbsp;预览</cjm-button>
        <cjm-button @click="cancelEdit" type="default" class="cjm-icon-close">&nbsp;取消</cjm-button>
      </div>
    </div>
  </div>
</template>
<script>
  import baseItem from './components/base-item.vue'
  import prizeItem from './components/prize-item.vue'
  import pageSwitch from 'framework/mixins/pageSwitch'
  export default{
    components: {
      baseItem,
      prizeItem
    },
    mixins: [pageSwitch],
    data(){
      return {
        form: {
          activityEntry: '0', //活动入口
          activityType: '0', //活动类型
          activityName: '', //活动标题
          activityTimes: '1', //活动次数
          beginTime: '', //活动起始时间
          endTime: '', //活动结束时间
          guideSwitch: '1', //活动引导页
          guideImage: '', //引导页图片
          activityImage: '', //活动页面图片
          activityRules: '', //活动规则
          activityStyle: '0', //抽奖样式
          activityAwards: [{
            awardID: '', //奖品ID
            corpID: this.$globalData.get('currentUser').corpID, //企业ID
            activityID: '', //活动ID
            awardType: '0', //抽奖类型
            winningRate: '', //中奖概率
            awardName: '', //奖品名称
            awardDesc: '', //奖品描述
            awardNum: '', //奖品数量
            awardLink: '', //奖品链接
            awardImg: '', //奖品图片
            redPacketValue: '',
            sortedValue: '',
            status: '' //活动状态
          }, {
            awardID: '', //奖品ID
            corpID: this.$globalData.get('currentUser').corpID, //企业ID
            activityID: '', //活动ID
            awardType: '0', //抽奖类型
            winningRate: '', //中奖概率
            awardName: '', //奖品名称
            awardDesc: '', //奖品描述
            awardNum: '', //奖品数量
            awardLink: '', //奖品链接
            awardImg: '', //奖品图片
            redPacketValue: '',
            sortedValue: '',
            status: '' //活动状态
          }],
          activityCorps: []
        },
        rules: {
          activityEntry: [
            this.$formRules.required
          ],
          activityType: [
            this.$formRules.required
          ],
          activityName: [
            this.$formRules.required,
            this.$formRules.maxLength(40)
          ],
          activityRules: [
            this.$formRules.maxLength(10)
          ],
          guideImage: [
            this.$formRules.required
          ]
        },
        previewType: '',
        transferValue: [],
        transferData: []
      }
    },
    methods: {
      saveData(){
        if (this.verificationRules() === false) {
          return false;
        }
        this.$ajax.post(this.$globalData.get('marketing', 'apiUrl').activity.operatingActivities.ADD_ACTIVITY, this.form).then((res) => {
          if (res.resultCode === '200') {
            this.popPage();
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message(res.msg);
          }
        })
      },
      previewPage(){
        switch (this.form.activityStyle) {
          case '0':
            this.previewType = 'turnTable';
            break;
          case '1':
            this.previewType = 'flop';
            break;
          case '2':
            this.previewType = 'turnPlate';
            break;
          case '3':
            this.previewType = 'scratchCard'
        }
        let newPage = window.open('http://www.kf315.net/newwap/Operator/Common/luckyDrawModel/preview-page.html?styleType=' + this.previewType);
        setTimeout(() => {
          newPage.postMessage(this.form, '*');
        }, 1000)
      },
      verificationRules(){
        if (!this.form.activityName) {
          this.$message('活动标题不能为空！');
          return false;
        }
        if (!this.form.guideImage && this.form.guideSwitch === '1') {
          this.$message('引导页面图片不能为空');
          return false;
        }
        let rate = 0;
        for (let i = 0; i < this.form.activityAwards.length; i++) {
          if (!this.form.activityAwards[i].awardName) {
            this.$message('奖品名称不能为空！');
            return false;
          }
          if (!this.form.activityAwards[i].winningRate) {
            this.$message('中奖概率不能为空！');
            return false;
          }
          if (isNaN(this.form.activityAwards[i].winningRate)) {
            this.$message('奖项' + (i + 1) + '的中奖概率必须大于等于0小于等于100！');
            return false;
          }
          if (!this.form.activityAwards[i].awardImg) {
            this.form.activityAwards[i].awardImg = '';
          }
          rate += parseInt(this.form.activityAwards[i].winningRate);
        }
        if (rate > 100) {
          this.$message('中奖概率总和不得超过100%');
          return false;
        }
        if (this.form.activityCorps.length === 0) {
          this.$message('参与个性化H5组织不能为空！');
          return false;
        }
      },
      cancelEdit(){
        this.popPage();
      },
      initTransferData(){
        this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.operatingActivities.GET_CORP_LIST).then((res) => {
          if (res.resultCode === '200') {
            this.transferData = res.data.map((p, index) => {
              return {
                id: p.corpID,
                name: p.corpName + ' (' + p.corpID + ')'
              }
            })
          }
        })
      }
    },
    mounted(){
      let type = this.getPageParams('edit').id;
      if (type === 'edit') {
        this.form = Object.assign(this.form, this.getPageParams('edit').data);
        this.transferValue = this.form.activityCorps.map((p, index) => {
          return p.individualityCorp;
        })
      }
      this.initTransferData()
    },
    watch: {
      transferValue(val){
        if (val) {
          this.form.activityCorps = val.map((p) => {
            return {
              individualityCorp: p
            }
          });
        } else {
          this.form.activityCorps = [];
        }
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .activity-date-time {
    width: 40% !important;
  }

  .edit-handle-btn {
    margin-top: 20px;
    float: right;
  }

  .cjm-page-bottom-holder {
    height: 77px;
  }

  .cjm-h1:not(:first-child) {
    margin-top: 40px;
  }
</style>
