<template>
  <div class="exchange-data">
    <cjm-search-container theme="theme2">
      <cjm-search-item style="width: 800px;" label="快速查询" search-key="dateCount" v-model="search.dateCount">
        <!--<cjm-date-range-quick-picker ref="datePiker"-->
        <!--v-model="search.dateStatistics"-->
        <!--:radioOptions="radioOption">-->
        <!--</cjm-date-range-quick-picker>-->
        <cjm-radio-group v-model="search.dateCount" @change="dateCountChange">
          <cjm-radio-button label="1">昨天</cjm-radio-button>
          <cjm-radio-button label="7">近7日</cjm-radio-button>
          <cjm-radio-button label="15">近15日</cjm-radio-button>
          <cjm-radio-button label="30">近30日</cjm-radio-button>
          <cjm-radio-button label="90">近3个月</cjm-radio-button>
          <cjm-radio-button label="180">近6个月</cjm-radio-button>
          <cjm-select v-model="search.years" class="select-years" @change="changeYears">
            <cjm-option label="2016" value="2016"></cjm-option>
            <cjm-option label="2017" value="2017"></cjm-option>
            <cjm-option label="2018" value="2018"></cjm-option>
          </cjm-select>
        </cjm-radio-group>
      </cjm-search-item>
    </cjm-search-container>
    <div class="statistics-title">
      <ul class="clear">
        <li @click="changeExchangeData(1, '交易次数')">
          <div class="statistics-block">
            <cjm-popover ref="popover1" placement="left" width="200" title="交易次数" trigger="hover" content="用户已通过各个渠道购买到的产品，在超级码系统的中的积分次数"></cjm-popover>
            <span class="cjm-icon-question" v-popover:popover1 @click.stop></span>
            <div class="title">交易次数</div>
            <div class="count">{{linkedindexData.tradeCount}}</div>
            <div class="compare">
              <p>较上个时段:{{Math.abs(linkedindexData.tradeCountIncrement)}}
                <span v-if="linkedindexData.tradeCountIncrement != 0" class="cjm-icon-drop" :class="[linkedindexData.tradeCountIncrement > 0 ? 'up' : 'down']"></span>
              </p><br>
              <p>较上个时段:{{Math.abs(linkedindexData.tradeCountLinkedindex)}}%
                <span v-if="linkedindexData.tradeCountLinkedindex != 0" class="cjm-icon-drop" :class="[linkedindexData.tradeCountLinkedindex > 0 ? 'up' : 'down']"></span>
              </p>
            </div>
          </div>
        </li>
        <li @click="changeExchangeData(2, '交易总额')">
          <div class="statistics-block">
            <cjm-popover ref="popover1" placement="left" width="200" title="交易总额" trigger="hover" content="用户已通过各个渠道购买到的产品，在超级码系统的中的积分所对应产品的价格总和"></cjm-popover>
            <span class="cjm-icon-question" v-popover:popover1 @click.stop></span>
            <div class="title">交易总额</div>
            <div class="count">{{linkedindexData.tradeSum}}</div>
            <div class="compare">
              <p>较上个时段: {{Math.abs(linkedindexData.tradeSumIncrement)}}
                <span v-if="linkedindexData.tradeSumIncrement != 0" class="cjm-icon-drop" :class="[linkedindexData.tradeSumIncrement > 0 ? 'up' : 'down']"></span>
              </p><br>
              <p>较上个时段: {{Math.abs(linkedindexData.tradeSumLinkedindex)}}%
                <span v-if="linkedindexData.tradeSumLinkedindex != 0" class="cjm-icon-drop" :class="[linkedindexData.tradeSumLinkedindex > 0 ? 'up' : 'down']"></span>
              </p>
            </div>
          </div>
        </li>
        <li @click="changeExchangeData(3, '平均交易额(元)')">
          <div class="statistics-block">
            <cjm-popover ref="popover1" placement="left" width="200" title="平均交易额(元)" trigger="hover" content="交易总额÷交易次数"></cjm-popover>
            <span class="cjm-icon-question" v-popover:popover1 @click.stop></span>
            <div class="title">平均交易额(元)</div>
            <div class="count">{{linkedindexData.averTrade}}</div>
            <div class="compare">
              <p>较上个时段:{{Math.abs(linkedindexData.averTradeIncrement)}}
                <span v-if="linkedindexData.averTradeIncrement != 0" class="cjm-icon-drop" :class="[linkedindexData.averTradeIncrement > 0 ? 'up' : 'down']"></span>
              </p><br>
              <p>较上个时段:{{Math.abs(linkedindexData.averTradeLinkedindex)}}%
                <span v-if="linkedindexData.averTradeLinkedindex != 0" class="cjm-icon-drop" :class="[linkedindexData.averTradeLinkedindex > 0 ? 'up' : 'down']"></span>
              </p>
            </div>
          </div>
        </li>
        <li @click="changeExchangeData(4, '独立交易人')">
          <div class="statistics-block">
            <cjm-popover ref="popover1" placement="left" width="200" title="独立交易人" trigger="hover" content="发生交易的会员人数"></cjm-popover>
            <span class="cjm-icon-question" v-popover:popover1 @click.stop></span>
            <div class="title">独立交易人</div>
            <div class="count">{{linkedindexData.tradeCustomerCount}}</div>
            <div class="compare">
              <p>较上个时段:{{Math.abs(linkedindexData.tradeCustomerCountIncrement)}}
                <span v-if="linkedindexData.tradeCustomerCountIncrement != 0" class="cjm-icon-drop" :class="[linkedindexData.tradeCustomerCountIncrement > 0 ? 'up' : 'down']"></span>
              </p><br>
              <p>较上个时段:{{Math.abs(linkedindexData.tradeCustomerCountLinkedindex)}}%
                <span v-if="linkedindexData.tradeCustomerCountLinkedindex != 0" class="cjm-icon-drop" :class="[linkedindexData.tradeCustomerCountLinkedindex > 0 ? 'up' : 'down']"></span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="exchange-times">
      <cjm-cards>
        <cjm-data-card ref="exchangeCard" :title="exchangeTitle" chart-type="line" size="large" :data-factory="getAnalysisData($globalData.get('marketing', 'apiUrl').statistics.GET_TRADES_INFO)" :chart-option-factory="lineOption"></cjm-data-card>
      </cjm-cards>
    </div>
  </div>
</template>
<script>
import CjmDataCard from 'framework/components/base/data-card/src/data-card';
import CjmCards from 'framework/components/base/cards/';
import CjmDateRangeQuickPicker from 'framework/components/base/date-range-quick-picker';
import echarts from 'echarts/lib/echarts';
require('echarts/lib/component/toolbox');
export default {
  components: {
    CjmDateRangeQuickPicker,
    CjmDataCard,
    CjmCards
  },
  data() {
    return {
      search: {
        dateCount: '1',
        beginTime: '',
        years: new Date().getFullYear()
      },
      linkedindexData: {
        tradeCount: 0,
        tradeCountIncrement: 0,
        tradeCountLinkedindex: 0,
        averTrade: 0,
        averTradeIncrement: 0,
        averTradeLinkedindex: 0,
        tradeCustomerCount: 0,
        tradeCustomerCountIncrement: 0,
        tradeCustomerCountLinkedindex: 0,
        tradeSum: 0,
        tradeSumIncrement: 0,
        tradeSumLinkedindex: 0
      },
      echartsData: null,
      exchangeType: 1,
      exchangeTitle: '交易次数',
      dateCount: '1',
      years: new Date().getFullYear()
    };
  },
  methods: {
    //获取会员数据title
    getTitleData(year, dateCount) {
      year = year || this.search.years;
      dateCount = dateCount || this.search.dateCount;
      let params = {
        dateCount: dateCount,
        years: year
      };
      this.$ajax
        .get(this.$globalData.get('marketing', 'apiUrl').statistics.GET_TRADES_INFO_DIFF, params)
        .then(res => {
          if (res.resultCode === '200') {
            this.linkedindexData = res.data;
          }
        });
    },
    //获取信息
    getAnalysisData(url) {
      return () => {
        return new Promise((resolve, reject) => {
          let params = {
            dateCount: this.dateCount,
            years: this.years
          };
          this.$ajax
            .get(url, params)
            .then(res => {
              this.echartsData = res.data;
              if (res.resultCode === '200') {
                if (res.data) {
                  resolve(this.getSingleData(res.data, this.exchangeType));
                } else {
                  resolve(null);
                }
              } else {
                reject(res.msg);
              }
            })
            .catch(e => {
              this.$message.error(e);
            });
        });
      };
    },
    getSingleData(data, type) {
      return {
        option: [],
        values: data['values' + type]
      };
    },
    //切换交易次数数据
    changeExchangeData(type, title) {
      this.exchangeType = type;
      this.exchangeTitle = title;
      this.$refs.exchangeCard.refresh();
    },
    //交易次数折线图配置项
    lineOption(data) {
      return new Promise(resolve => {
        resolve({
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {
                show: true
              }
            },
            right: '30'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'line'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: data.values[0].values.map(item => {
                return item.name;
              }),
              axisTick: {
                show: true
              },
              axisLabel: {
                show: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#04a1ff'
                }
              }
            },
            {
              data: data.values[1].values.map(item => {
                return item.name;
              }),
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                show: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#f8cb4a'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'line',
              name: data.values[0].option.name,
              data: data.values[0].values.map(item => {
                return item.value;
              }),
              lineStyle: {
                normal: {
                  color: '#04a1ff'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#04a1ff'
                    },
                    {
                      offset: 1,
                      color: '#b7e4ff'
                    }
                  ]),
                  opacity: 0.2
                }
              }
            },
            {
              type: 'line',
              name: data.values[1].option.name,
              xAxisIndex: 1,
              data: data.values[1].values.map(item => {
                return item.value;
              }),
              lineStyle: {
                normal: {
                  color: '#f8cb4a'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#f8cb4a'
                    },
                    {
                      offset: 1,
                      color: '#fff4d6'
                    }
                  ]),
                  opacity: 0.2
                }
              }
            }
          ]
        });
      });
    },
    //切换年份
    changeYears(val) {
      this.years = val;
      if (this.years != new Date().getFullYear()) {
        this.dateCount = '0';
        this.search.dateCount = '0';
        this.getTitleData(val, '0');
        this.$refs.exchangeCard.refresh();
      } else {
        this.getTitleData(val, this.search.dateCount);
        this.$refs.exchangeCard.refresh();
      }
    },
    //切换按钮
    dateCountChange(val) {
      if (val != 0) {
        this.dateCount = val;
        this.years = new Date().getFullYear();
        this.search.years = new Date().getFullYear();
        this.getTitleData(this.years, val);
        this.$refs.exchangeCard.refresh();
      }
    }
  },
  mounted() {
    this.getTitleData();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../assets/css/config';

.statistics-block {
  position: relative;
  .cjm-icon-question {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    color: #c1cdda;
  }
}

.cjm-icon-drop {
  &.up {
    color: #d90024;
    transform: rotate(180deg);
  }
  &.down {
    color: #1ad900;
  }
}

.cjm-search-item {
  width: 800px;
}

.exchange-times {
  position: relative;
  .save-echarts {
    position: absolute;
    right: 10px;
    top: 30px;
    cursor: pointer;
  }
}

.statistics-title {
  background: @DarkWhite;
  border: 1px solid @LightGray;
  margin-top: 25px;
  ul li {
    width: 25%;
    float: left;
    cursor: pointer;
    .statistics-block {
      padding: 20px;
      border-right: 1px solid @LightGray;
      color: @Black;
      .count {
        font-size: 32px;
        margin: 10px 0;
      }
      .compare {
        font-size: 13px;
        color: @Silver;
        p {
          position: relative;
          display: inline-block;
          &:after {
            content: '';
            position: absolute;
            display: block;
            width: 6px;
            height: 10px;
            right: -7px;
            top: 4px;
          }
          &.up:after {
            background-position-y: 0;
          }
          &.down:after {
            background-position-y: -10px;
          }
        }
      }
    }
  }
}
</style>
<style rel='stylesheet/less' lang='less'>
.exchange-data {
  .select-years {
    display: inline-block;
    vertical-align: middle;
    width: 130px !important;
    .el-input__inner {
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
