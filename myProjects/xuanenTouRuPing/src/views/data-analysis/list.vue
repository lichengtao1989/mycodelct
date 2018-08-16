<template>
  <div v-bg-color="'none'">
    <div class="cards-row">
      <div class="list-div">
        <index-card v-for="(item,key) in dataList" :key="key">
          <number-box :icon="item.icon" :iconColor="item.iconColor" :number="item.number" :describe="item.describe"></number-box>
        </index-card>
      </div>
      <div class="list-div">
        <index-card v-for="(item,key) in dataSalesList" :key="key">
          <number-box :icon="item.icon" :iconColor="item.iconColor" :number="item.number" :describe="item.describe"></number-box>
        </index-card>
      </div>
      <div class="list-div">
        <index-card v-for="(item,key) in dataCustomerList" :key="key">
          <number-box :icon="item.icon" :iconColor="item.iconColor" :number="item.number" :describe="item.describe"></number-box>
        </index-card>
      </div>
    </div>
    <div class="cards-row">
      <index-card size="medium" style="margin-right: 1.2%;" title="经营概况">
        <index-chart :options="chartOptions" @getSalesLineChart="getSalesLineChart" :salesTotalChart="salesTotalChart" :salesDate="salesDate"></index-chart>
      </index-card>
      <index-card title="商品销售排行榜">
        <index-list :config="rightConfig" :categorys="categorys" @getProductRanking="getProductRanking"></index-list>
      </index-card>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts';
import indexCard from './card.vue';
import numberBox from './number-box.vue';
import indexList from './index-list.vue';
import indexChart from './chart.vue';
export default {
  components: {
    indexCard,
    numberBox,
    indexList,
    indexChart
  },
  data() {
    return {
      rightData: [],
      categorys: {
        category: '1'
      },
      dataOptions: [],
      salesDate: {
        date1: '1',
        date2: ''
      },
      dataList: [
        {
          icon: 'nz-icon-total-products',
          iconColor: '#6ccac9',
          number: '0',
          describe: '商品总数(个)'
        },
        {
          icon: 'nz-icon-pesticide',
          iconColor: '#99d37a',
          number: '0',
          describe: '农药商品(个)'
        },
        {
          icon: 'nz-icon-fertilizer',
          iconColor: '#6ccac9',
          number: '0',
          describe: '肥料商品(个)'
        },
        {
          icon: 'nz-icon-seed',
          iconColor: '#99d37a',
          number: '0',
          describe: '种子商品(个)'
        }
      ],
      dataSalesList: [
        {
          icon: 'nz-icon-today-sales',
          iconColor: '#ff6c60',
          number: '0',
          describe: '今日销售额'
        },
        {
          icon: 'nz-icon-yesterday-sales',
          iconColor: '#ff6c60',
          number: 0,
          describe: '昨日销售额'
        },
        {
          icon: 'nz-icon-total-sales',
          iconColor: '#ff6c60',
          number: 0,
          describe: '销售总额'
        },
        {
          icon: 'nz-icon-total-purchase',
          iconColor: '#6ccac9',
          number: 0,
          describe: '进货总成本'
        }
      ],
      dataCustomerList: [
        {
          icon: 'nz-icon-today-customer',
          iconColor: '#57c8f2',
          number: 0,
          describe: '今日客单数'
        },
        {
          icon: 'nz-icon-yesterday-customer',
          iconColor: '#57c8f2',
          number: 0,
          describe: '昨日客单数'
        },
        {
          icon: 'nz-icon-total-customers',
          iconColor: '#57c8f2',
          number: 0,
          describe: '客单总数'
        },
        {
          icon: 'nz-icon-total-profit',
          iconColor: '#ffaa3c',
          number: 0,
          describe: '总利润'
        }
      ],
      salesTotalChart: [
        {
          number: '￥0',
          describe: '销售金额'
        },
        {
          number: 0,
          describe: '客单数'
        },
        {
          number: '￥0',
          describe: '利润额'
        }
      ],
      isRole: false,
      editable: false
    };
  },
  watch: {
    'salesDate.date1': function() {
      let startTime = '';
      let endTime = '';
      if (this.salesDate.date1 == '1') {
        startTime = this.getDateStr(-7);
        endTime = this.getDateStr(-1);
      } else if (this.salesDate.date1 == '2') {
        startTime = this.firstDay();
        endTime = this.getDateStr(0);
      }
      this.salesDate.date2 = startTime + ' ~ ' + endTime;
    },
    'categorys.category': function() {
      this.getProductRanking();
    }
  },
  computed: {
    chartOptions() {
      let dataOption = {
        date: [],
        name: [],
        totalOrderNumer: [],
        totalProfitsPrice: [],
        totalSalePrice: []
      };
      if (this.dataOptions) {
        if (this.dataOptions.value != undefined) {
          this.dataOptions.value.forEach((v, index) => {
            for (const item in v) {
              if (item == 'date') {
                dataOption.date.push(v[item]);
              }
              if (item == 'name') {
                dataOption.name.push(v[item]);
              }
              if (item == 'totalOrderNumer') {
                dataOption.totalOrderNumer.push(v[item]);
              }
              if (item == 'totalProfitsPrice') {
                dataOption.totalProfitsPrice.push(v[item]);
              }
              if (item == 'totalSalePrice') {
                dataOption.totalSalePrice.push(v[item]);
              }
            }
          });
        }
      }
      let soilItem = ['销售金额', '客单数', '利润额'];
      return {
        color: '#f38428',
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: soilItem,
          bottom: '5px'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '30',
          right: '70',
          bottom: '40',
          top: '40',
          containLabel: true,
          borderColor: '#eaeaea'
        },
        xAxis: [
          {
            type: 'category',
            name: '',
            nameTextStyle: {
              color: '#656565'
            },
            boundaryGap: false,
            data: dataOption.date,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#eaeaea',
                shadowBlur: 0,
                width: 0
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#656565'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#eaeaea'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            nameTextStyle: {
              color: '#656565'
            },
            axisLine: {
              show: true,
              axisLine: { onZero: false }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#656565'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#eaeaea'
              }
            }
          }
        ],
        series: [
          {
            name: soilItem[0],
            type: 'line',
            itemStyle: {
              normal: {
                color: '#57c8f2'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#57c8f2'
                  },
                  {
                    offset: 1,
                    color: '#b7e4ff'
                  }
                ]),
                opacity: 0.2
              }
            },
            lineStyle: {
              normal: {
                color: '#57c8f2',
                width: 2,
                type: 'solid'
              }
            },
            data: dataOption.totalSalePrice
          },
          {
            name: soilItem[1],
            type: 'line',
            itemStyle: {
              normal: {
                color: '#ffaa3c'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#ffaa3c'
                  },
                  {
                    offset: 1,
                    color: '#b7e4ff'
                  }
                ]),
                opacity: 0.2
              }
            },
            lineStyle: {
              normal: {
                color: '#ffaa3c',
                width: 2,
                type: 'solid'
              }
            },
            data: dataOption.totalOrderNumer
          },
          {
            name: soilItem[2],
            type: 'line',
            itemStyle: {
              normal: {
                color: '#ff6c60'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#ff6c60'
                  },
                  {
                    offset: 1,
                    color: '#b7e4ff'
                  }
                ]),
                opacity: 0.2
              }
            },
            lineStyle: {
              normal: {
                color: '#ff6c60',
                width: 2,
                type: 'solid'
              }
            },
            data: dataOption.totalProfitsPrice
          }
        ]
      };
    },
    rightConfig() {
      return {
        columns: [{ name: '排名', style: { textAlign: 'center', minWidth: '50px' } }, { name: '商品名', key: 'name', style: { minWidth: '150px' } }, { name: '数量', key: 'value', style: { minWidth: '50px' } }],
        data: this.rightData
      };
    }
  },
  methods: {
    async getTotalProduct() {
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.DATAANALYSIS.GET_TOTAL_PRODUCT);
      if (res.resultCode == 200) {
        res.data.values.forEach((v, index) => {
          if (this.dataList[index]) {
            this.dataList[index].number = v.value;
          }
        });
      } else {
        this.$message.showError(err);
      }
    },
    async getTotalData() {
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.DATAANALYSIS.GET_TOTAL_DATA);
      if (res.resultCode == 200) {
        res.data.values.forEach((v, index) => {
          if (index == 0) {
            this.dataSalesList[3].number = v.value;
          }
          if (index == 1) {
            this.dataSalesList[2].number = v.value;
          }
          if (index == 2) {
            this.dataCustomerList[2].number = v.value;
          }
          if (index == 3) {
            this.dataCustomerList[3].number = v.value;
          }
        });
      } else {
        this.$message.showError(err);
      }
    },
    async getTotalSales(startTime, endTime) {
      let data = {
        startTime: startTime != '' ? startTime : '',
        endTime: endTime != '' ? endTime : ''
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.DATAANALYSIS.GET_TOTAL_SALES, data);
      if (res.resultCode == 200) {
        res.data.values.forEach((v, index) => {
          if (startTime == undefined && endTime == undefined) {
            if (index == 0) {
              this.dataSalesList[0].number = v.value;
            }
            if (index == 1) {
              this.dataCustomerList[0].number = v.value;
            }
          } else {
            if (index == 0) {
              this.dataSalesList[1].number = v.value;
            }
            if (index == 1) {
              this.dataCustomerList[1].number = v.value;
            }
          }
        });
      } else {
        this.$message.showError(err);
      }
    },
    getDateStr(addDayCount) {
      let dd = new Date();
      dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期
      let y = dd.getFullYear();
      let m = dd.getMonth() + 1; //获取当前月份的日期
      let d = dd.getDate();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      return y + m + d;
    },
    firstDay() {
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = 1;
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      return y + m + d;
    },
    async getProductRanking() {
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.DATAANALYSIS.GET_PRODUCT_RANKING, {
        topNumber: 5,
        category: this.categorys.category
      });
      if (res.resultCode == 200) {
        this.rightData = res.data.values;
      } else {
        this.$message.showError(err);
      }
    },
    async getSalesLineChart(startTime, endTime) {
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.DATAANALYSIS.GET_SALES_LINE_CHART, {
        type: 1,
        startTime: startTime != '' ? startTime : '',
        endTime: endTime != '' ? endTime : ''
      });
      if (res.resultCode == 200) {
        res.data.values.forEach((v, index) => {
          if (index == 0 || index == 2) {
            this.salesTotalChart[index].number = `￥${v.value}`;
          } else if (index == 1) {
            this.salesTotalChart[index].number = v.value;
          } else {
            this.dataOptions = v;
          }
        });
      } else {
        this.$message.showError(err);
      }
    }
  },
  async created() {
    this.getProductRanking();
    this.getTotalProduct();
    this.getTotalData();
    this.getTotalSales();
    this.getTotalSales(this.getDateStr(-1), this.getDateStr(-1));
    this.getSalesLineChart(this.getDateStr(-7), this.getDateStr(-1));
    this.salesDate.date2 = this.getDateStr(-7) + ' ~ ' + this.getDateStr(-1);
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.cards-row {
  margin-bottom: 18px;
  font-size: 0;
  white-space: nowrap;
}

.chart {
  height: 280px;
}
.list-div {
  margin-bottom: 20px;
}
</style>