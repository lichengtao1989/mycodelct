<template>
  <div>
    <div style="margin-left: 20px;">
      <nz-enum-select style="margin-top: -4px;" v-model="salesDate.date1" isRadioBtn :options="$enum('分析日期').values"></nz-enum-select>
      <nz-datepicker v-model="salesDate.date2" type="daterange" @change="changeDate" style="margin-left: -7px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;"></nz-datepicker>
    </div>
    <ul class="sales-total">
      <li v-for="(item,key) in salesTotalChart" :key="key">
        <div class="number" :style="'font-size:'+numberFontSize+'px;top:'+numberTop+'px'">{{ item.number }}</div>
        <div class="describe" :style="'font-size:'+describeFontSize+'px;top:'+describeTop+'px'">{{ item.describe }}</div>
      </li>
    </ul>
    <div ref="chart" class="chart"></div>
  </div>
</template>
<script>
import echarts from 'echarts';
export default {
  props: {
    options: Object,
    salesTotalChart: Object,
    salesDate: Object
  },
  data() {
    return {
      chart: null,
      boxWidth: 0
    };
  },
  watch: {
    options: function() {
      this.dispose();
      this.render();
    }
  },
  computed: {
    //数字字体大小
    numberFontSize() {
      let fz = 12;
      fz = fz * (this.boxWidth / 400);
      fz = parseInt(fz);
      return fz;
    },
    //描述文字字体大小
    describeFontSize() {
      let fz = this.numberFontSize / 2;
      fz = parseInt(fz);
      return fz;
    },
    //数字top
    numberTop() {
      let top = (this.boxWidth * 0.23 - (this.numberFontSize + 10 + this.describeFontSize)) / 2;
      top = parseInt(top);
      return top;
    },
    //描述文字top
    describeTop() {
      let top = this.numberTop + this.numberFontSize + 10;
      return top;
    },
    changeDate() {
      let startTime = this.salesDate.date2.split(' ~ ')[0].replace(/\//g, '');
      let endTime = this.salesDate.date2.split(' ~ ')[1].replace(/\//g, '');
      this.$emit('getSalesLineChart', startTime, endTime);
    }
  },
  methods: {
    render() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.options);
    },
    dispose() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    },
    resize() {
      if (this.chart) {
        this.chart.resize();
      }
      if (this.$el) {
        this.boxWidth = this.$el.offsetWidth;
      }
    },
    bindResize() {
      window.addEventListener('resize', this.resize);
    },
    unBindResize() {
      window.removeEventListener('resize', this.resize);
    }
  },
  mounted() {
    this.render();
    this.bindResize();
    this.resize();
  },
  beforeDestroy() {
    this.unBindResize();
  },
  created() {
    this.dispose();
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.chart {
  height: 290px;
}
.sales-total {
  width: 100%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  margin: 20px 0 0 0;
  li {
    list-style-type: none;
    width: 33.33%;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
  }
}
.number,
.describe {
  text-align: center;
}

.number {
  top: 0;
  color: #333333;
  font-size: 32px;
  font-weight: bolder;
}

.describe {
  top: 0;
  color: #808080;
  font-size: 16px;
}
</style>
