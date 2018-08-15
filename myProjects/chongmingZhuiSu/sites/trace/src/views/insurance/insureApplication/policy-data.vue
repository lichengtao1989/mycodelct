<template>
  <div class="policy-data"> 
    <cjm-cards>
      <!--111-->
      <cjm-data-card :data-factory="getDataStatistics" size="small" :chart-option-factory="dataStatisticsOptionFormatter" :chart-data-formatter="dataStatisticsFormatter" :has-customize="true" chart-type="pie">       
      </cjm-data-card>  
      <ul class="data-statistics" :style="result">
        <li v-for="(value,key) in dataStatisticsArr" :key="key">
          <span class="data-info" :style="'color:'+ value.color">{{value.value1}}</span><br/>
          <span class="data-name">{{value.name}}</span>
        </li>
      </ul> 
    </cjm-cards>    
  </div>
</template>

<script>
import CjmCards from 'framework/components/base/cards';
import CjmDataCard from 'framework/components/base/data-card';
import { on, off } from 'framework/utils/dom';
export default {
  components: {
    CjmDataCard,
    CjmCards
  },
  data() {
    return {
      dataStatisticsArr: [],
      contentWidth: 0,
      result: ''
    };
  },
  watch: {},
  methods: {
    //数据图表
    getDataStatistics() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .get(this.$globalData.get('trace', 'apiUrl').insurance.insureApplication.GET_DATA_STATISTICS)
          .then(res => {
            if (res.resultCode === '200') {
              if (res.data == null) {
                resolve(null);
              } else {
                let colorArr = ['#65d9b2', '#04a1ff', '#f8cb4a'];
                res.data.values.forEach(function(x, index) {
                  x.value = x.value1;
                  x.color = colorArr[index];
                });
                resolve(res.data);
                this.dataStatisticsArr = res.data.values;
              }
            } else {
              reject(new Error(res.msg));
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    dataStatisticsOptionFormatter(chartData) {
      const dataName = chartData.values.map(x => {
        return x.name;
      });
      const series = [
        {
          type: 'pie',
          center: ['30%', '35%'],
          radius: ['65%', '35%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: chartData.values
        }
      ];
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a}{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '30',
          top: '50',
          data: dataName
        },
        color: ['#65d9b2', '#04a1ff', '#f8cb4a'],
        series: series
      };
      return Promise.resolve(option);
    },
    dataStatisticsFormatter(data) {
      return Promise.resolve(data);
    },
    resize() {
      if (this.contentWidth === this.$el.clientWidth) {
        return;
      }
      this.contentWidth = this.$el.clientWidth;
      if (this.contentWidth < 1020) {
        this.result = {
          width: `50%`
        };
      } else if (this.contentWidth < 1360) {
        this.result = {
          width: `66.6%`
        };
      } else if (this.contentWidth < 1700) {
        this.result = {
          width: `66.6%`
        };
      } else {
        this.result = {
          width: `75%`
        };
      }
    }
  },
  mounted() {
    on(window, 'resize', this.resize);
    this.$nextTick(() => {
      this.resize();
    });
  },
  destroyed() {
    off(window, 'resize', this.resize);
  }
};
</script>
<style scoped>
.data-statistics {
  box-sizing: border-box;
  background: #fff;
  height: 200px;
  margin: 0 0 0 0;
  float: left;
}
.data-statistics li {
  width: 30.3%;
  float: left;
  text-align: center;
  margin-top: 30px;
  background-color: #f9fafc;
  margin-right: 3%;
  height: 80px;
  padding-top: 20px;
}
.data-info {
  font-size: 32px;
  font-weight: bold;
}
.data-name {
  font-size: 13px;
  color: #4d4d4d;
}
.policy-data {
  height: 200px;
}

.policy-data .cjm-data-card-wrap {
  border-top: none;
  padding: 0px 0 20px 20px;
}
</style>
<style>
.policy-data .cjm-data-card {
  border: none;
  height: 175px;
  float: left;
}
.policy-data .cjm-data-card-content {
  height: 180px;
}
</style>
