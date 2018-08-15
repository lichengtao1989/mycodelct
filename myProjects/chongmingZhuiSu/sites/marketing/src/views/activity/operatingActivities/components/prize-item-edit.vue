<template>
  <div>
    <div v-for="(item,index) in activityAwards" class="clear prize-options">
      <h2 class="cjm-h2">奖项{{index + 1}}</h2>
      <cjm-form-item label="奖项类型" class="clear-item cjm-form-item-long" required>
        <cjm-radio-group v-model="item.awardType">
          <cjm-radio label="0">券</cjm-radio>
          <cjm-radio label="1">实物</cjm-radio>
          <!--<cjm-radio label="2">微信红包</cjm-radio>-->
        </cjm-radio-group>
      </cjm-form-item>

      <cjm-form-item label="中奖概率(%)" class="clear-item" required>
        <cjm-input :value="item.winningRate" placeholder="请输入中奖概率" @input="limitInput(arguments[0],item)"></cjm-input>
      </cjm-form-item>

      <cjm-form-item label="奖品名称" class="clear-item" required>
        <cjm-input v-model="item.awardName" placeholder="请输入奖项名称" :maxlength="32"></cjm-input>
      </cjm-form-item>

      <cjm-form-item label="奖项描述" class="clear-item">
        <cjm-input type="textarea" :rows="2" v-model="item.awardDesc" placeholder="奖项描述不超过50字"></cjm-input>
      </cjm-form-item>

      <cjm-form-item label="奖项数量" class="clear-item">
        <cjm-input v-model="item.awardNum" @input="limitOnlyInt(arguments[0], index)"
                   placeholder="请输入奖项数量"></cjm-input>
      </cjm-form-item>

      <cjm-form-item label="单个金额" class="clear-item" v-if="item.awardType == 2">
        <cjm-input v-model="item.redPacketValue" placeholder="1-200"></cjm-input>
      </cjm-form-item>

      <cjm-form-item label="领取链接" class="clear-item" v-if="item.awardType == 0">
        <cjm-input v-model="item.awardLink" placeholder="请输入领取链接"></cjm-input>
      </cjm-form-item>

      <cjm-form-item label="奖项图片" class="clear-item">
        <cjm-image-upload v-model="item.awardImg"></cjm-image-upload>
        <div class="image-notes" v-if="activityStyle == 1">建议上传图片尺寸(230*334)</div>
        <div class="image-notes" v-if="activityStyle == 0">建议上传图片尺寸(264*200)</div>
        <div class="image-notes" v-if="activityStyle == 2">建议上传图片尺寸(400*400)</div>
        <div class="image-notes" v-if="activityStyle == 3">建议上传图片尺寸(572*286)</div>
      </cjm-form-item>
      <div class="btn-item">
        <cjm-button type="primary" @click="addPrizeItem"
                    v-if="activityAwards.length-1 == index && activityAwards.length < 8" class="cjm-icon-add">
          &nbsp;新增奖项
        </cjm-button>
        <cjm-button @click="deletePrizeItem(index)" v-if="activityAwards.length > 2" class="cjm-icon-close">&nbsp;删除奖项
        </cjm-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        prizeItemData: {
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
        }
      }
    },
    methods: {
      addPrizeItem(){
        let item = Object.deepClone(this.prizeItemData)
        this.activityAwards.push(item);
      },
      deletePrizeItem(index){
        this.activityAwards.splice(index, 1);
      },
      limitInput(val, item){
        if (val < 0) {
          item.winningRate = '';
        } else {
          item.winningRate = val;
        }
      },
      limitOnlyInt(val, index){ //限制只能输入正整数
        val = val.replace(/\D/g, '');
        this.$nextTick(() => {
          this.activityAwards[index].awardNum = val;
        })
      }
    },
    props: {
      activityAwards: {
        type: Array
      },
      activityStyle: {
        type: String
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../assets/css/config";

  .clear-item {
    clear: both;
  }

  .prize-options {
    margin-bottom: 20px;
  }

  .btn-item {
    float: left;
    width: 100%;
    margin-left: 110px;
    margin-bottom: 20px;
  }

  .image-notes {
    position: absolute;
    left: 90px;
    bottom: 0;
    color: @ExtraLightBlack;
  }
  .cjm-h2{
    margin-bottom: 30px;
  }
</style>
