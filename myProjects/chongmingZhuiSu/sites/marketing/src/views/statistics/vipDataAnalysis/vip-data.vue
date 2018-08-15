<template>
  <div>
    <div class="statistics-title">
      <ul class="clear">
        <li @click="changeActiveVipData(1, '活跃会员')">
          <div class="statistics-block">
            <cjm-popover ref="popover1" placement="left" width="200" title="活跃会员" trigger="hover"
                         content="注册与积分动作完成持续时间3个月（90天）"></cjm-popover>
            <span class="cjm-icon-question" v-popover:popover1 @click.stop></span>
            <div class="title">活跃会员</div>
            <div class="count">{{currentData.active}}</div>
            <div class="compare">
              <p class="up">较昨天:{{Math.abs(linkedindexData.activeIncrement)}}
                <span v-if="linkedindexData.activeIncrement != 0" class="cjm-icon-drop"
                      :class="[linkedindexData.activeIncrement > 0 ? 'up' : 'down']"></span>
              </p><br>
              <p class="up">较昨天:{{Math.abs(linkedindexData.activeLinkedindex)}}%
                <span v-if="linkedindexData.activeLinkedindex != 0" class="cjm-icon-drop"
                      :class="[linkedindexData.activeLinkedindex > 0 ? 'up' : 'down']"></span>
              </p>
            </div>
          </div>
        </li>
        <li @click="changeActiveVipData(2, '沉睡会员')">
          <div class="statistics-block">
            <cjm-popover ref="popover2" placement="left" width="200" title="沉睡会员" trigger="hover"
                         content="仅注册动作或活跃会员3个月（90天）以上12个月（360天）以内"></cjm-popover>
            <span class="cjm-icon-question" v-popover:popover2 @click.stop></span>
            <div class="title">沉睡会员</div>
            <div class="count">{{currentData.sleep}}</div>
            <div class="compare">
              <p class="down">较昨天: {{Math.abs(linkedindexData.sleepIncrement)}}
                <span v-if="linkedindexData.sleepIncrement != 0" class="cjm-icon-drop"
                      :class="[linkedindexData.sleepIncrement > 0 ? 'up' : 'down']"></span>
              </p><br>
              <p class="down">较昨天: {{Math.abs(linkedindexData.sleepLinkedindex)}}%
                <span v-if="linkedindexData.sleepLinkedindex != 0" class="cjm-icon-drop"
                      :class="[linkedindexData.sleepLinkedindex > 0 ? 'up' : 'down']"></span>
              </p>
            </div>
          </div>
        </li>
        <li @click="changeActiveVipData(3, '流失会员')">
          <div class="statistics-block">
            <cjm-popover ref="popover3" placement="left" width="200" title="流失会员" trigger="hover"
                         content="超过12个月（360天）未积分"></cjm-popover>
            <span class="cjm-icon-question" v-popover:popover3 @click.stop></span>
            <div class="title">流失会员</div>
            <div class="count">{{currentData.lose}}</div>
            <div class="compare">
              <p>较昨天:{{Math.abs(linkedindexData.loseIncrement)}}
                <span v-if="linkedindexData.loseIncrement != 0" class="cjm-icon-drop"
                      :class="[linkedindexData.loseIncrement > 0 ? 'up' : 'down']"></span>
              </p><br>
              <p>较昨天:{{Math.abs(linkedindexData.loseLinkedindex)}}%
                <span v-if="linkedindexData.loseLinkedindex != 0" class="cjm-icon-drop"
                      :class="[linkedindexData.loseLinkedindex > 0 ? 'up' : 'down']"></span>
              </p>
            </div>
          </div>
        </li>
        <li @click="changeActiveVipData(4, '全部会员')">
          <div class="statistics-block">
            <cjm-popover ref="popover4" placement="left" width="200" title="全部会员" trigger="hover"
                         content=""></cjm-popover>
            <span class="cjm-icon-question" v-popover:popover4 @click.stop></span>
            <div class="title">全部会员</div>
            <div class="count">{{currentData.total}}</div>
            <div class="compare">
              <p>较昨天:{{Math.abs(linkedindexData.totalIncrement)}}
                <span v-if="linkedindexData.totalIncrement != 0" class="cjm-icon-drop"
                      :class="[linkedindexData.totalIncrement > 0 ? 'up' : 'down']"></span>
              </p><br>
              <p>较昨天:{{Math.abs(linkedindexData.totalLinkedindex)}}%
                <span v-if="linkedindexData.totalLinkedindex != 0" class="cjm-icon-drop"
                      :class="[linkedindexData.totalLinkedindex > 0 ? 'up' : 'down']"></span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <cjm-cards>
      <cjm-data-card ref="activeVip" :title="activeVipTitle" chart-type="line" size="middle"
                     :data-factory="getActiveVipData" :chart-option-factory="activeVipOption"></cjm-data-card>
      <cjm-data-card title="性别" chart-type="pie" size="small"
                     :data-factory="getAnalysisData($globalData.get('marketing', 'apiUrl').statistics.GET_SEVEN_SEX_STATE_DATA)"
                     :chart-option-factory="pieOption"
                     @chartReady="chartReady(arguments[0], 0, 'sex')"
                     @resize="resizeChart(arguments[0], 0, 'sex')"
                     ref="sexChart"></cjm-data-card>
      <cjm-data-card title="新老用户流量" chart-type="pie" size="small"
                     :data-factory="getAnalysisData($globalData.get('marketing', 'apiUrl').statistics.GET_SEVEN_NEW_OLD_DATA)"
                     :chart-option-factory="pieOption"
                     @chartReady="chartReady(arguments[0], 0, 'newOld')"
                     @resize="resizeChart(arguments[0], 0, 'newOld')"></cjm-data-card>
      <cjm-data-card title="年龄区间" chart-type="bar" size="small"
                     :data-factory="getAnalysisData($globalData.get('marketing', 'apiUrl').statistics.GET_SEVEN_AGE_DATA)"
                     :chart-option-factory="ageOption"></cjm-data-card>
      <cjm-data-card title="活跃比例" chart-type="pie" size="small"
                     :data-factory="getAnalysisData($globalData.get('marketing', 'apiUrl').statistics.GET_SEVEN_ACTIVE_PROPORTION_DATA)"
                     :chart-option-factory="pieOption"
                     @chartReady="chartReady(arguments[0], 0, 'active')"
                     @resize="resizeChart(arguments[0], 0, 'active')"></cjm-data-card>
      <cjm-data-card title="品类排行" chart-type="bar" size="small"
                     :data-factory="getAnalysisData($globalData.get('marketing', 'apiUrl').statistics.GET_SEVEN_RANK_DATA)"
                     :chart-option-factory="rankOption"></cjm-data-card>
      <cjm-data-card title="价格区间" chart-type="pie" size="small"
                     :data-factory="getAnalysisData($globalData.get('marketing', 'apiUrl').statistics.GET_SEVEN_PRICE_DATA)"
                     :chart-option-factory="pieOption"
                     @chartReady="chartReady(arguments[0], 2, 'price')"
                     @resize="resizeChart(arguments[0], 2, 'price')"></cjm-data-card>
    </cjm-cards>
  </div>
</template>
<script>
  import CjmDataCard from 'framework/components/base/data-card/src/data-card'
  import CjmCards from 'framework/components/base/cards/'
  import echarts from 'echarts/lib/echarts'
  //  import util from './util'
  export default{
    components: {
      CjmDataCard,
      CjmCards
    },
    data(){
      return {
        echartsData: null,
        echartsColors: ['#04a1ff', '#f8cb4a', '#b5e253', '#65d9b2', '#e55861', '#ff8146', '#b09df3', '#59b9ff', '#007dd2', '#81d781', '#8e7bd1', '#bda29a', '#d0c9be', '#ebd700', '#6e7074'],
        currentData: {},
        linkedindexData: {
          activeIncrement: 0,
          activeLinkedindex: 0,
          sleepIncrement: 0,
          sleepLinkedindex: 0,
          loseIncrement: 0,
          loseLinkedindex: 0,
          totalIncrement: 0,
          totalLinkedindex: 0
        },
        activeVipType: 1,
        activeVipTitle: '活跃会员',
        sexEcharts: null,
        defalutData: {
          sex: '',
          newOld: '',
          active: '',
          price: ''
        }
      }
    },
    methods: {
      //获取数据分析数据
      getAnalysisData(url){
        return () => {
          return new Promise((resolve, reject) => {
            this.$ajax.get(url).then((res) => {
              if (res.resultCode === '200') {
                resolve(res.data);
                switch (res.data.option.name) {
                  case '性别':
                    this.defalutData.sex = res.data.values;
                    break;
                  case '新老用户流量':
                    this.defalutData.newOld = res.data.values;
                    break;
                  case '活跃度比例':
                    this.defalutData.active = res.data.values;
                    break;
                  case '价格区间':
                    this.defalutData.price = res.data.values;
                    break;
                }
              } else {
                reject(res.msg);
              }
            }).catch((e) => {
              this.$message.error(e);
            });
          });
        }
      },
      //获取单个条件下会员数据
      getSingleData(data, type){
        let renderData = Object.deepClone(data);
        renderData.values.sort((a, b) => {
          return new Date(a.name).getTime() - new Date(b.name).getTime();
        });
        renderData.values = renderData.values.map((p) => {
          return {
            name: new Date(p.name).getDate() + '日',
            value: p['value' + type]
          }
        });
        return renderData;
      },
      //获取会员数据title
      getTitleData(){
        this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').statistics.GET_TOTAL_STATE_DATA).then((res) => {
          if (res.resultCode === '200') {
            this.currentData = res.data.currentData;
            this.linkedindexData = res.data.linkedindexData;
          }
        })
      },
      //切换会员数据
      changeActiveVipData(type, title){
        this.activeVipType = type;
        this.activeVipTitle = title;
        this.$refs.activeVip.refresh();
      },
      //获取会员数据
      getActiveVipData(){
        return new Promise((resolve, reject) => {
          if (this.echartsData) {
            resolve(this.getSingleData(this.echartsData, this.activeVipType));
          } else {
            this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').statistics.GET_SEVEN_ACTIVE_STATE_DATA).then((res) => {
              if (res.resultCode === '200') {
                this.echartsData = res.data;
                resolve(this.getSingleData(this.echartsData, this.activeVipType));
              } else {
                reject(res.msg);
              }
            });
          }
        });
      },
      //活跃会员数据配置项
      activeVipOption(data){
        return new Promise((resolve) => {
          resolve({
            yAxis: {
              name: '(个)'
            },
            grid: {
              top: '15%',
              left: '1%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            series: [
              {
                name: data.option.name,
                type: 'line',
                data: data.values.map((item) => {
                  return item.value;
                }),
                itemStyle: {
                  normal: {
                    color: '#04a1ff'
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#04a1ff'
                    }, {
                      offset: 1,
                      color: '#b7e4ff'
                    }]),
                    opacity: 0.2
                  }
                }
              }
            ]
          });
        });
      },
      //品类排行数据配置项
      rankOption(data){
        return new Promise((resolve) => {
          resolve({
            grid: {
              top: '15%',
              left: '1%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              show: false,
              max: function (value) {
                return value.max * 1.2
              }
            },
            yAxis: {
              type: 'category',
              data: data.values.map((item) => {
                return item.name;
              }),
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            series: [
              {
                type: 'bar',
                data: data.values.map((item) => {
                  return item.value;
                }),
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    fontFamily: '微软雅黑',
                    color: '#000'
                  }
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                      offset: 0,
                      color: '#65d9b2'
                    }, {
                      offset: 1,
                      color: '#a3ffe0'
                    }])
                  }
                }
              }
            ]
          });
        })
      },
      //pie数据配置项
      pieOption(data){
        return new Promise((resolve) => {
          resolve({
            color: this.echartsColors,
            legend: {
              data: data.values.map((p) => {
                return p.name;
              })
            },
            series: [{
              type: 'pie',
              name: data.option.name,
              avoidLabelOverlap: false,
              radius: ['50%', '70%'],
              center: ['35%', '50%'],
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data.values.map((p) => {
                if (p.value == 0) {
                  p.value = '';
                }
                return p;
              })
            }]
          });
        })
      },
      //年龄区间
      ageOption(data){
        return new Promise((resolve) => {
          resolve({
            xAxis: {
              type: 'category',
              data: data.values.map((item, index) => {
                if (index == data.values.length - 1) {
                  item.name = item.name + ' (岁)'
                }
                return item.name;
              })
            },
            yAxis: {
              name: '(个)',
              type: 'value'
            },
            series: [{
              type: 'bar',
              data: data.values.map((item) => {
                return item.value;
              }),
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#c4e9ff'
                  }, {
                    offset: 1,
                    color: '#04a1ff'
                  }])
                }
              }
            }]
          });
        })
      },
      chartReady(data, index, type){
        let len = this.defalutData[type].length;
        setTimeout(() => {
          this.resizeChart(data, index);
        }, 500);
        data.chart.on('mouseout', () => {
          data.chart.dispatchAction({
            type: 'highlight',
            dataIndex: index
          });
        });
        data.chart.on('mouseover', (params) => {
          let dataIndex = params.dataIndex;
          for (let i = 0; i < len; i++) {
            if (i == dataIndex) {
              data.chart.dispatchAction({
                type: 'highlight',
                dataIndex: dataIndex
              });
            } else {
              data.chart.dispatchAction({
                type: 'downplay',
                dataIndex: i
              });
            }
          }
        });
      },
      resizeChart(data, index){
        this.$nextTick(() => {
          if (data.chart != null) {
            data.chart.dispatchAction({
              type: 'downplay',
              dataIndex: index
            });
            data.chart.dispatchAction({
              type: 'highlight',
              dataIndex: index
            });
          }
        });
      }
    },
    created(){
      this.getTitleData();
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .cjm-icon-drop {
    &.up {
      color: #d90024;
      transform: rotate(180deg);
    }
    &.down {
      color: #1ad900;
    }
  }

  .statistics-title {
    background: @DarkWhite;
    border: 1px solid @LightGray;
    ul li {
      width: 25%;
      float: left;
      cursor: pointer;
      .statistics-block {
        padding: 20px;
        border-right: 1px solid @LightGray;
        color: @Black;
        position: relative;
        .cjm-icon-question {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 20px;
          color: #c1cdda;
        }
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
