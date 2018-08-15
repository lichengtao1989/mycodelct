<template>
  <div class="clear commonbom" v-if="currentPageInfo.pageType != 'view'">
    <cjm-form-item label="区域气候" prop="areaClimate" class="cjm-form-item-long">
      <cjm-select v-model="form.areaClimate" placeholder="请选择气候">
        <cjm-option v-for="(value,key) in areaClimate" :label="key" :value="value" :key="value"></cjm-option>
      </cjm-select>
    </cjm-form-item>
    <cjm-form-item label="平均昼夜温差" prop="dayAndNight">
      <cjm-input v-model="form.dayAndNight" placeholder="请输入平均昼夜温差">
        <i slot="suffix">℃</i>
      </cjm-input>
    </cjm-form-item>
    <cjm-form-item label="无霜期" prop="frostFreePeriod">
      <cjm-input v-model="form.frostFreePeriod" placeholder="请输入无霜期">
        <i slot="suffix">天</i>
      </cjm-input>
    </cjm-form-item>
    <cjm-form-item label="年平均降雨量" prop="averageRainfall">
      <cjm-input v-model="form.averageRainfall" placeholder="请输入年平均降雨量">
        <i slot="suffix">mm</i>
      </cjm-input>
    </cjm-form-item>
    <cjm-form-item label="年平均日照时间" prop="averageSunshineTime">
      <cjm-input v-model="form.averageSunshineTime" placeholder="请输入年平均日照时间">
        <i slot="suffix">小时</i>
      </cjm-input>
    </cjm-form-item>
  </div>
  <div class="clear commonbom" v-else>
    <cjm-form-item label="区域气候" prop="areaClimate" style="padding: 0 36px 0 0;margin-left: -27px;" class="cjm-form-item-long">
      <div style="font-weight: bold;">{{areaClimateName}}</div>
    </cjm-form-item>
    <ul class="view-climate">
      <li>
        <div class="word-description">
          <i class="cjm-icon-temperature common-icons"></i>平均昼夜温差</div>
        <div class="progress-info">
          <div class="progress">
            <cjm-progress :percentage="dayAndNightPercentage" :text-inside="true" :stroke-width="18" color="#20a0ff"></cjm-progress>
          </div>
          <div class="unit">{{this.form.dayAndNight}}℃</div>
        </div>
      </li>
      <li>
        <div class="word-description">
          <i class="cjm-icon-frost common-icons"></i> 无霜期</div>
        <div class="progress-info">
          <div class="progress">
            <cjm-progress :percentage="frostFreePeriodPercentage" :text-inside="true" :stroke-width="18" color="#20a0ff"></cjm-progress>
          </div>
          <div class="unit">{{this.form.frostFreePeriod}}天</div>
        </div>
      </li>
      <li>
        <div class="word-description">
          <i class="cjm-icon-rainfall common-icons"></i>年平均降雨量</div>
        <div class="progress-info">
          <div class="progress">
            <cjm-progress :percentage="averageRainfallPercentage" :text-inside="true" :stroke-width="18" color="#20a0ff"></cjm-progress>
          </div>
          <div class="unit">{{this.form.averageRainfall}}mm</div>
        </div>
      </li>
      <li>
        <div class="word-description">
          <i class="cjm-icon-sunshine common-icons"></i>年平均日照时间</div>
        <div class="progress-info">
          <div class="progress">
            <cjm-progress :percentage="averageSunshineTimePercentage" :text-inside="true" :stroke-width="18" color="#20a0ff"></cjm-progress>
          </div>
          <div class="unit">{{this.form.averageSunshineTime}}小时</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dayAndNightPercentage: 0,
      frostFreePeriodPercentage: 0,
      averageRainfallPercentage: 0,
      averageSunshineTimePercentage: 0,
      areaClimateName: ''
    };
  },
  props: {
    form: {
      type: Object
    },
    rules: {
      type: Object
    },
    currentPageInfo: {
      type: Object
    }
  },
  computed: {
    areaClimate() {
      return this.$globalData.get('trace', 'enums')['区域气候'];
    }
  },
  mounted() {},
  methods: {},
  created() {
    this.$nextTick(() => {
      if (this.currentPageInfo.pageType == 'view') {
        this.areaClimateName = Object.keys(this.areaClimate).find(key => this.areaClimate[key] == this.form.areaClimate);
        this.dayAndNightPercentage = parseInt(this.form.dayAndNight / 30 * 100);
        this.frostFreePeriodPercentage = parseInt(this.form.frostFreePeriod / 366 * 100);
        this.averageRainfallPercentage = parseInt(this.form.averageRainfall / 10000 * 100);
        this.averageSunshineTimePercentage = parseInt(this.form.averageSunshineTime / 3500 * 100);
      }
    });
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.detail {
  color: rgb(27, 140, 206);
}
.commonbom {
  margin-bottom: 20px;
}
.common-icons {
  font-size: 20px;
}
.view-climate {
  width: 100%;
  float: left;
  li {
    width: 50%;
    float: left;
    height: 80px;
    font-size: 14px;
    color: #606266;
    .word-description {
      width: 100%;
      line-height: 40px;
      margin-left: 3%;
    }
    .progress-info {
      width: 100%;
      line-height: 40px;
      float: left;
      .progress {
        line-height: 30px;
        width: 77%;
        float: left;
        margin-left: 3%;
      }
      .unit {
        line-height: 20px;
        width: 20%;
        float: right;
        right: 10%;
      }
    }
  }
}
.el-progress__text {
  display: none;
}
</style>
