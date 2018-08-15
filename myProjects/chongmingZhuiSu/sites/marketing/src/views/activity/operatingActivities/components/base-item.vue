<template>
  <div>
    <cjm-form-item label="活动入口" required prop="activityEntry">
      <cjm-radio-group v-model="form.activityEntry" @change="radioChange">
        <cjm-radio label="0">扫码页</cjm-radio>
        <cjm-radio label="1">防伪页</cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>

    <cjm-form-item label="活动类型" required prop="activityType" class="clear-item">
      <cjm-select v-model="form.activityType">
        <cjm-option v-for="(item,index) in selectOption" :key="index" :label="item.label"
                    :value="item.value"></cjm-option>
      </cjm-select>
    </cjm-form-item>

    <cjm-form-item label="活动标题" required prop="activityName" class="clear-item">
      <cjm-input v-model="form.activityName" placeholder="请输入活动标题" :maxlength="40"></cjm-input>
    </cjm-form-item>

    <cjm-form-item label="活动次数" required prop="activityTimes" class="clear-item">
      <cjm-radio-group v-model="form.activityTimes">
        <cjm-radio label="1">一码一抽</cjm-radio>
        <cjm-radio label="999">无限制</cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>

    <cjm-form-item label="活动时间" class="clear-item cjm-form-item-long">
      <date-picker-range :beginTime.sync="form.beginTime" :endTime.sync="form.endTime"></date-picker-range>
    </cjm-form-item>

    <cjm-form-item label="活动引导页" class="cjm-form-item-long" v-if="form.activityEntry == 0">
      <cjm-switch v-model="form.guideSwitch" @change="switchChange" active-value="1" inactive-value="0"></cjm-switch>
    </cjm-form-item>

    <cjm-form-item label="引导页图片" class="clear-item" v-if="form.guideSwitch == '1'" required>
      <cjm-image-upload v-model="form.guideImage"></cjm-image-upload>
      <div class="image-notes" v-if="form.activityEntry == 0">建议上传图片尺寸(650*800)</div>
      <div class="image-notes" v-if="form.activityEntry == 1">建议上传图片尺寸(150*300)</div>
    </cjm-form-item>

    <cjm-form-item label="活动页图片" class="clear-item">
      <cjm-image-upload v-model="form.activityImage"></cjm-image-upload>
    </cjm-form-item>

    <cjm-form-item label="活动规则" class="clear-item">
      <cjm-input type="textarea" v-model="form.activityRules" prop="activityRules" :maxlength="1000" :rows="5" placeholder="活动规则不超过1000字"></cjm-input>
    </cjm-form-item>
  </div>
</template>
<script>
  import datePickerRange from './date-picker-range.vue'
  export default{
    components: {
      datePickerRange
    },
    data(){
      return {
        selectOption: [{
          value: '0',
          label: '抽奖'
        }]
      }
    },
    props: {
      form: {
        type: Object
      },
      rules: {
        type: Object
      }
    },
    methods: {
      switchChange(val){
        if(val == 0){
          this.form.guideImage = ''
        }
      },
      radioChange(val){
        if(val == 1){
          this.form.guideSwitch = '1';
        }
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../assets/css/config";
  .clear-item {
    clear: both;
  }
  .image-notes {
    position: absolute;
    left: 90px;
    bottom: 0;
    color: @ExtraLightBlack;
  }
</style>
