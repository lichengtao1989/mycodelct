<template>
  <div>
    <cjm-select  placeholder="气象站"  v-model="stationID" @change="search">
      <cjm-option v-for="item in stationItems" :key="item.stationID" :value="item.stationID" :label="item.stationName" v-if="item.status==1"></cjm-option>
    </cjm-select>
    <ul class="weather-banner clear" id="container">
      <li v-for="(item,key) in weatherItem" class="weather-li" :class="{'is-active':!item.isActive,'none':key>5}" :key="key" v-if="type != '1' && item.chartsType != 6">
        <div class="weather-icon" v-if="item.chartsType == 1" :class="weatherIcon[item.className]"></div>
        <div class="weather-icon" v-else :class="item.className"></div>
        <div class="weather-span">{{item.value}}</div>
        <div class="">{{item.itemName}}</div>
      </li>
      <li v-for="(item,key) in countryWeatherItem" class="weather-li country" :class="{'is-active':!item.isActive}" :key="key" v-if="type == '1'">
        <div class="weather-icon" v-if="item.chartsType == 101" :class="weatherIcon[item.className]"></div>
        <div class="weather-icon" v-else :class="item.className" ></div>
        <div class="weather-span">{{item.value}}</div>
        <div class="">{{item.itemName}}</div>
      </li>
      <div class="operation">
        <div class="open" @click="openOrUp" v-show="type != '1'"><i class="cjm-icon-chevron-down" :class="{'cjm-icon-rotate-180':!isShow,'is-show-arrow':isShow}"></i>&nbsp;{{showMoreTitle}}</div>
      </div>
    </ul>
    <div class="weather-content">
      <div class="tab-title">
        <div class="tab-title-span">气象监控实况</div>
        <cjm-button v-if="type != '1'" @click="exportData" class="export"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div class="tab-content">
        <div class="cjm-analysis-search-item" v-if="type != '1'">
          <label>历史查询</label>
          <cjm-date-picker  placeholder="请选择操作日期"  v-model="dateWeather"
                           style="width: 300px;"></cjm-date-picker>
        </div>
        <div class="cjm-analysis-search-item tabs-wrap">
          <cjm-radio-group v-model="chartsType" @change="selectType" v-if="type != '1'">
            <cjm-radio-button v-for="(item , key) in weatherItem" :label="item.chartsType" :key="item.chartsType" v-if="item.isActiveTab && item.chartsType != 9">{{item.itemName}}
            </cjm-radio-button>
          </cjm-radio-group>
          <cjm-radio-group v-model="chartsType" @change="selectType" v-if="type == '1'">
            <cjm-radio-button v-for="(item , key) in countryWeatherItem" :label="item.chartsType" :key="item.chartsType" v-if="item.chartsType != 102 && item.chartsType != 106">{{item.itemName}}
            </cjm-radio-button>
          </cjm-radio-group>
        </div>
        <div class="weather-num" v-if="chartsType != 36 && chartsType != 40 && chartsType != 108">
          <div class="weather-tab-title">
            <div class="max-num">{{detailsItem[chartsType].maxInfo}}{{maxNum}}{{detailsItem[chartsType].unit}}</div>
            <div class="min-num">{{detailsItem[chartsType].minInfo}}{{minNum}}{{detailsItem[chartsType].unit}}</div>
            <div class="average-num">{{detailsItem[chartsType].aveInfo}}{{aveNum}}{{detailsItem[chartsType].unit}}</div>
          </div>
        </div>
        <div ref="weatherCharts" class="cjm-analysis-chart" v-show="!isNoData" :class="{'tab-echart': chartsType == 36 || chartsType == 40 || chartsType == 108}"></div>
        <div class="cjm-analysis-chart-noData" style="background-size: contain;" v-show="isNoData"></div>
        <div class="weather-details">{{detailsItem[chartsType].detail}}</div>
      </div>
    </div>
    <div class="weather-content" v-if="type != 0">
      <div class="tab-title">
        <div class="tab-title-span">气象监控预报15天</div>
      </div>
      <div class="tab-content">
        <ul class="prediction">
          <li v-for="(item, key) in predictionItem" :key="key" v-if="key != 0">
            <div class="predict-date">{{getDate(item.predictDate)}}</div>
            <div class="condition-id-day"><i :class="weatherIcon[item.conditionIdDay]"></i></div>
            <div class="condition-day">{{item.conditionDay}}</div>
            <div class="temp-day"><span class="max-temperature">{{item.tempDay}}</span>/{{item.tempNight}}°C</div>
            <div class="wind-level-day"><i class="cjm-weather-icon-fengxiang arrow" :style="{transform:`rotate(${getRotate(item.windDirDay)}deg)`}"></i><i class="cjm-weather-icon-fengxiang arrow" :style="{transform:`rotate(${getRotate(item.windDirNight)}deg)`}"></i></div>
            <div class="wind-dir-day">{{item.windLevelDay}}级</div>
            <div class="AQI-details" v-if="key < 3 && AQIItem[item.predictDate]"><i class="AQI-color" :style="{'background-color':`${AQIItem[item.predictDate].color}`}"></i> {{AQIItem[item.predictDate].label}}</div>
          </li>
        </ul>
        <div class="cjm-analysis-chart-noData" v-show="isForecast"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  import '../../assets/css/icon.css';
  import { on, off } from 'framework/utils/dom';
  import urlImg from '../../assets/images/c-arr.png'

  var echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  export default{
    data(){
      let maxNum = 0;
      let minNum = 0;
      let aveNum = 0;
      let aveNum2 = 0;
      return {
        stationID: '',
        dateWeather: '',
        stationItems: [],
        predictionItem: [],
        showMoreTitle: '展开',
        type: '0',
        isShow: true,
        isNoData: false,
        isForecast: false,
        weatherAirCharts: null,
        chartsType: '1',
        executionseconds: 60 * 60 * 1000,
        maxNum: maxNum, //最高
        minNum: minNum, //最底
        aveNum: aveNum, //平均值
        aveNum2: aveNum2, //平均值2
        detailsItem: {
          '1': {
            'detail': '温度：表示大气冷热程度的物理量，气象上给出的温度是指离地面1.5米高度上百叶箱中的空气温度。',
            'color': '#f68227',
            'unit': '℃',
            'itemName': '大气温度',
            'axisLine': true,
            'maxInfo': '最高气温:',
            'minInfo': '最低气温:',
            'aveInfo': '平均气温:'
          },
          '2': {
            'detail': '相对湿度：空气中实际水气压与当时气温下的饱和水气压之比，以百分比（%）表示',
            'color': '#21d2fe',
            'unit': '%',
            'itemName': '相对湿度',
            'axisLine': true,
            'maxInfo': '最高相对湿度:',
            'minInfo': '最低相对湿度:',
            'aveInfo': '平均相对湿度:'
          },
          '4': {
            'detail': '风力风向：空气的水平运动，风力是风吹到物体上所表示出力量的大小，风向指风的来向',
            'color': '#358cd9',
            'unit': 'm/s',
            'itemName': '风力风向',
            'axisLine': true,
            'maxInfo': '最高风力:',
            'minInfo': '最低风力:',
            'aveInfo': '平均风力:',
            'aveInfo2': '平均风级:'
          },
          '5': {
            'detail': '降水量：某一时段内的未经蒸发、渗透、流失的降水，在水平面上积累的深度，以毫米（mm）为单位。',
            'color': '#20a1ff',
            'unit': 'mm',
            'itemName': '降水量',
            'axisLine': true,
            'maxInfo': '最高降水量:',
            'minInfo': '最低降水量:',
            'aveInfo': '平均降水量:'
          },
          '6': {
            'detail': '光照强度，即通常所说的勒克司度（lux），表示被摄主体表面单位面积上受到的光通量,是衡量拍摄环境的一个重要指标。',
            'color': '#f68227',
            'unit': 'lux',
            'itemName': '光照强度',
            'axisLine': true,
            'maxInfo': '最高光照强度:',
            'minInfo': '最低光照强度:',
            'aveInfo': '平均光照强度:'
          },
          '14': {
            'detail': '光辐射：以电磁波形式或粒子（光子）形式传播的能量，他们可以用光学元件反射、成像或色散，这种能量及其传播过程称为光辐射,单位µmol',
            'color': '#ffa320',
            'unit': 'µmol',
            'itemName': '光照辐射',
            'axisLine': true,
            'maxInfo': '最高光照辐射:',
            'minInfo': '最低光照辐射:',
            'aveInfo': '平均光照辐射:'
          },
          '10': {
            'detail': '酸碱度描述的是水溶液的酸碱性强弱程度，用pH值来表示。热力学标准状况时，pH=7的水溶液呈中性，pH<7者显酸性，pH>7者显碱性。',
            'color': '#c89347',
            'unit': '',
            'itemName': '土壤PH',
            'axisLine': true,
            'maxInfo': '最高PH值:',
            'minInfo': '最低PH值:',
            'aveInfo': '平均PH值:'
          },
          '11': {
            'detail': '土壤含盐量是土中所含盐分（主要是氯盐、硫酸盐、碳酸盐）的质量占干土质量的百分数。',
            'color': '#c89347',
            'unit': '%',
            'itemName': '土壤盐分',
            'axisLine': true,
            'maxInfo': '最高土壤盐含量:',
            'minInfo': '最低土壤盐含量:',
            'aveInfo': '平均土壤盐含量:'
          },
          '12': {
            'detail': '蒸发量：是指在一定时段内，水分经蒸发而散布到空中的量，通常用蒸发掉的水层厚度以毫米（mm）为单位。',
            'color': '#ffa320',
            'unit': 'mm',
            'itemName': '土壤温度',
            'axisLine': true,
            'maxInfo': '最高蒸发量:',
            'minInfo': '最低蒸发量:',
            'aveInfo': '平均蒸发量:'
          },
          '13': {
            'detail': '二氧化碳含量是指二氧化碳在空气中的百万分比（单位ppm），二氧化碳含量过高导致气温升高',
            'color': '#20d0ff',
            'unit': 'ppm',
            'itemName': '二氧化碳',
            'axisLine': true,
            'maxInfo': '最高二氧化碳含量:',
            'minInfo': '最低二氧化碳含量:',
            'aveInfo': '平均二氧化碳含量:'
          },
          '36': {
            'detail': '土壤温度是指地面以下土壤中的温度，单位℃,绿色线表示土壤一层温度（距地表0~0.2m)，蓝色线表示土壤二层温度（距地表0.2-0.4m）,棕色线表示土壤三层温度（距地表0.4-0.6m），橙色线表示土壤四层温度（距地表0.6-0.8m）。',
            'color': '#20d0ff',
            'unit': '℃',
            'itemName': '土壤温度',
            'axisLine': true,
            'maxInfo': '',
            'minInfo': '',
            'aveInfo': ''
          },
          '40': {
            'detail': '土壤湿度亦称土攘含水率，表示土壤干湿程度的物理量。绿色线表示土壤一层湿度（距地表0~0.2m)，蓝色线表示土壤二层湿度（距地表0.2-0.4m）,棕色线表示土壤三层湿度（距地表0.4-0.6m）,橙色线表示土壤四层湿度（距地表0.6-0.8m）。',
            'color': '#20d0ff',
            'unit': '%',
            'itemName': '土壤湿度',
            'axisLine': true,
            'maxInfo': '',
            'minInfo': '',
            'aveInfo': ''
          },
          '15': {
            'detail': '氨气：NH3，无色气体，有强烈的刺激气味。能灼伤皮肤、眼睛、呼吸器官的粘膜，人吸入过多，能引起肺肿胀，以至死亡。',
            'color': '#20d0ff',
            'unit': 'ppb',
            'itemName': '氨气',
            'axisLine': true,
            'maxInfo': '最高氨气含量:',
            'minInfo': '最低氨气含量:',
            'aveInfo': '平均二氨气含量:'
          },
          '16': {
            'detail': '硫化氢：标准状况下是一种易燃的酸性气体，无色，低浓度时有臭鸡蛋气味，有毒，为易燃危化品。',
            'color': '#20d0ff',
            'unit': 'ppb',
            'itemName': '硫化氢',
            'axisLine': true,
            'maxInfo': '最高硫化氢含量:',
            'minInfo': '最低硫化氢含量:',
            'aveInfo': '平均硫化氢含量:'
          },
          '17': {
            'detail': 'PM10：可吸入颗粒物，通常是指粒径在10微米以下的颗粒物;在环境空气中持续的时间很长，对人体健康和大气能见度的影响都很大。',
            'color': '#20d0ff',
            'unit': 'ug/m2',
            'itemName': 'PM10',
            'axisLine': true,
            'maxInfo': '最高PH10值:',
            'minInfo': '最低PM10值:',
            'aveInfo': '平均PM10值:'
          },
          '101': {
            'detail': '温度：表示大气冷热程度的物理量，气象上给出的温度是指离地面1.5米高度上百叶箱中的空气温度。',
            'color': '#f68227',
            'unit': '℃',
            'itemName': '大气温度',
            'axisLine': true,
            'maxInfo': '最高气温:',
            'minInfo': '最低气温:',
            'aveInfo': '平均气温:'
          },
          '107': {
            'detail': '相对湿度：空气中实际水气压与当时气温下的饱和水气压之比，以百分比（%）表示',
            'color': '#21d2fe',
            'unit': '%',
            'itemName': '相对湿度',
            'axisLine': true,
            'maxInfo': '最高相对湿度:',
            'minInfo': '最低相对湿度:',
            'aveInfo': '平均相对湿度:'
          },
          '104': {
            'detail': '风力风向：空气的水平运动，风力是风吹到物体上所表示出力量的大小，风向指风的来向',
            'color': '#358cd9',
            'unit': '级',
            'itemName': '风力风向',
            'axisLine': true,
            'maxInfo': '最高风力:',
            'minInfo': '最低风力:',
            'aveInfo': '平均风力:',
            'aveInfo2': '平均风级:'
          },
          '108': {
            'detail': '',
            'color': '#f68227',
            'unit': 'µmol',
            'itemName': '紫外线强度',
            'axisLine': true,
            'maxInfo': '',
            'minInfo': '',
            'aveInfo': ''
          }
        }, //文字描述
        weaHours: [],
        exportUrl: {
          '0': this.$globalData.get('trace', 'apiUrl').weather.EXPORT,
          '1': this.$globalData.get('trace', 'apiUrl').weather.COUNTRY_EXPORT,
          '2': this.$globalData.get('trace', 'apiUrl').weather.EXPORT
        },
        weatherIcon: {
          0: 'cjm-weather-icon-qing',
          1: 'cjm-weather-icon-duoyun',
          2: 'cjm-weather-icon-yin',
          3: 'cjm-weather-icon-zhenyu',
          13: 'cjm-weather-icon-zhenxue',
          18: 'cjm-weather-icon-wu',
          20: 'cjm-weather-icon-shachenbao',
          29: 'cjm-weather-icon-yangsha',
          45: 'cjm-weather-icon-mai',
          4: 'cjm-weather-icon-leizhenyu',
          5: 'cjm-weather-icon-bingbao',
          6: 'cjm-weather-icon-yujiaxue',
          7: 'cjm-weather-icon-xiaoyu',
          8: 'cjm-weather-icon-zhongyu',
          9: 'cjm-weather-icon-dayu',
          10: 'cjm-weather-icon-baoyu',
          14: 'cjm-weather-icon-xiaoxue',
          15: 'cjm-weather-icon-zhongxue',
          16: 'cjm-weather-icon-daxue',
          30: 'cjm-weather-icon-qing',
          31: 'cjm-weather-icon-duoyun',
          33: 'cjm-weather-icon-zhenyu',
          34: 'cjm-weather-icon-zhenxue',
          32: 'cjm-weather-icon-wu',
          36: 'cjm-weather-icon-shachenbao',
          35: 'cjm-weather-icon-yangsha',
          46: 'cjm-weather-icon-mai'

        },
        //一体机定义
        weatherItem: [],
        //国家气象
        countryWeatherItem: [],
        //质量AQI
        AQIItem: {}
      }
    },
    watch: {
      dateWeather: function () {
        this.selectType();
      }
    },
    methods: {
      openOrUp() {
        if (this.showMoreTitle == '收起') {
          this.showMoreTitle = '展开';
          this.isShow = true;
          for (let i = 5; i < 15; i++) {
            document.getElementById('container').getElementsByTagName('li')[i].style.display = 'none';
          }
        }else{
          this.showMoreTitle = '收起';
          this.isShow = false;
          for (let i = 5; i < 15; i++) {
            document.getElementById('container').getElementsByTagName('li')[i].style.display = 'block';
          }
        }
      },
      fetchData(){
        this.$ajax.post(this.$globalData.get('trace', 'apiUrl').weather.GET_LIST, {
          pageSize: 50,
          pageNum: 1,
          status: '1'
        }).then((r) => {
          let self = this;
          if (r.resultCode == 200) {
            if (r.data.total > 0) {
              r.data.rows.map(function (x) {
                if (x.status == '1') {
                  self.stationItems.push(x);
                }
              })
              if (r.data.rows[0].status == '1') {
                this.stationID = r.data.rows[0].stationID;
                this.type = r.data.rows[0].type;
                this.search();
                if (this.type != 0) {
                  this.getWeatherAQIMojiApi();
                  this.getWeatherForecastMoji();
                }
              }
              if (self.stationItems.length == 0) {
                this.resetValue();
                let self = this;
                let showArr = ['1', '2', '5', '4', '14'];
                showArr.map(function (x) {
                  self.weatherItem.map(function (o, index) {
                    let key = o.chartsType;
                    if (key == x) {
                      self.weatherItem[index].isActiveTab = true;
                    }
                  })
                })
              }
            }else{
              this.resetValue();
              let self = this;
              let showArr = ['1', '2', '5', '4', '14'];
              showArr.map(function (x) {
                self.weatherItem.map(function (o, index) {
                  let key = o.chartsType;
                  if (key == x) {
                    self.weatherItem[index].isActiveTab = true;
                  }
                })
              })
            }
          } else {
            this.$message.error(r.msg);
          }
        });
      },
      getRotate(val) { //风力的转向
        return val - 180;
      },
      getDate(predictDate){
        if (predictDate != undefined) {
          let predic = predictDate.split('-');
          return predic[1] + '月' + predic[2] + '日';
        }
      },
      contains(arr, obj) { // 是否包含这个参数值
        var i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      },
      search(val) {
        let self = this;
        this.stationItems.map(function (x) {
          if(x.stationID == self.stationID){
            self.type = x.type;
          }
        })
        if (self.type == 1) {
          this.chartsType = '101';
        }else {
          this.chartsType = '1';
        }
        if (self.type != 0) {
          this.getWeatherForecastMoji();
          this.getWeatherAQIMojiApi();
        }
        if(this.stationID != ''){
          this.$ajax.get(this.$globalData.get('trace', 'apiUrl').weather.GET_RECORD, {
            stationID: this.stationID
          }).then((r) => {
            this.reset();
            // Object.keys(this.weatherItem).map(function (x){
            //   if (x == '7' || x == '8' || x == '10' || x == '11' || x == '12' || x == '13') {
            //     self.$set(self.weatherItem[x], 'type', self.type);
            //   }
            // })
            let sunrise = '';
            let sunset = '';
            if (r.resultCode == '200') {
              let weatherData = r.data.weatherData;
              let param = r.data.param.split(',');
              if (self.type != 1) {
                param.map(function (x) {
                  self.weatherItem.map(function (o, index) {
                    let key = o.chartsType;
                    if (key == 36) {
                      key = 7;
                    }
                    if (key == 40) {
                      key = 8;
                    }
                    if (key == x) {
                      if (x == 7) {
                        param.push('36');
                      }
                      if (x == 8) {
                        param.push('40');
                      }
                      self.weatherItem[index].isActive = true;
                      self.weatherItem[index].isActiveTab = true;
                    }
                  })
                })
                this.weatherItem.map(function (x, index) {
                  let key = x.chartsType;
                  if (weatherData[key] != undefined) {
                    if (self.contains(param, key)) {
                      if (key == 4) {
                        self.weatherItem[index].value = self.windSpeedToLevel(weatherData[key].replace('m/s', '')) + '级' + self.windDirectionTran(weatherData[3]);
                      }else{
                        if (key == 36) {
                          self.weatherItem[index].value = weatherData[7];
                        } else if (key == 40) {
                          self.weatherItem[index].value = weatherData[8];
                        }else {
                          self.weatherItem[index].value = weatherData[key];
                        }
                      }
                    }
                  }
                  if (index == 0) {
                    self.weatherItem[0].className = weatherData['weather'];
                  }
                })
                if (this.type != undefined && this.type != '1') {
                  this.showMoreTitle = '收起';
                  this.isShow = false;
                  this.openOrUp();
                }
              }else {
                this.countryWeatherItem.map(function (x, index) {
                  let key = x.chartsType;
                  if (weatherData[key] != undefined) {
                    self.countryWeatherItem[index].value = weatherData[key];
                    self.countryWeatherItem[index].isActive = true;
                    if (key == '106') {
                      let dateArr = weatherData[105].split(' ')[1].split(':');
                      sunrise = dateArr[0] + ':' + dateArr[1];
                      let dateArr2 = weatherData[key].split(' ')[1].split(':');
                      sunset = dateArr2[0] + ':' + dateArr2[1];
                      self.countryWeatherItem[index].value = sunrise + '/' + sunset;
                    }
                    if (key == '104') {
                      self.countryWeatherItem[index].value = weatherData[key] + weatherData[103];
                    }
                  }
                  if (index == 0) {
                    self.countryWeatherItem[0].className = weatherData['weather'];
                  }
                })
              }
              this.selectType();
            } else {
              this.resetValue();
              let self = this;
              let showArr = ['1', '2', '5', '4', '14'];
              showArr.map(function (x) {
                self.weatherItem.map(function (o, index) {
                  let key = o.chartsType;
                  if (key == x) {
                    self.weatherItem[index].isActiveTab = true;
                  }
                })
              })
              this.$message.error(r.msg);
              if (this.type != undefined && this.type != '1') {
                this.showMoreTitle = '收起';
                this.isShow = false;
                this.openOrUp();
              }
            }
          });
        }
      },
      reset() {
        this.weatherItem = [
          {
            'className': 'cjm-weather-icon-dayu',
            'value': '--',
            'itemName': '空气温度',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '1'
          },
          {
            'className': 'cjm-weather-icon-kongqiqiya',
            'value': '--',
            'itemName': '空气气压',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '9'
          },
          {
            'className': 'cjm-weather-icon-fenglifengxiang',
            'value': '--',
            'itemName': '风力风向',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '4'
          },
          {
            'className': 'cjm-weather-icon-jiangshuiliang',
            'value': '--',
            'itemName': '降水量',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '5'
          },
          {
            'className': 'cjm-weather-icon-xiangduishidu',
            'value': '--',
            'itemName': '相对湿度',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '2'
          },
          {
            'className': 'cjm-weather-icon-guangzhaoqiangdu',
            'value': '--',
            'itemName': '光照强度',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '6'
          },
          {
            'className': 'cjm-weather-icon-guangzhaoqiangdu',
            'value': '--',
            'itemName': '光照辐射',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '14'
          },
          {
            'className': 'cjm-weather-icon-turangPHzhi',
            'value': '--',
            'itemName': '土壤PH值',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '10'
          },
          {
            'className': 'cjm-weather-icon-turangyanfen',
            'value': '--',
            'itemName': '土壤盐分',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '11'
          },
          {
            'className': 'cjm-weather-icon-turangwendu',
            'value': '--',
            'itemName': '土壤温度',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '36'
          },
          {
            'className': 'cjm-weather-icon-turangshidu',
            'value': '--',
            'itemName': '土壤湿度',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '40'
          },
          {
            'className': 'cjm-weather-icon-zhengfaliang',
            'value': '--',
            'itemName': '蒸发量',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '12'
          },
          {
            'className': 'cjm-weather-icon-eryanghuatan',
            'value': '--',
            'itemName': '二氧化碳',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '13'
          },
          {
            'className': 'cjm-weather-icon-anqi',
            'value': '--',
            'itemName': '氨气',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '15'
          },
          {
            'className': 'cjm-weather-icon-liuhuaqing',
            'value': '--',
            'itemName': '硫化氢',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '16'
          },
          {
            'className': 'cjm-weather-icon-PM',
            'value': '--',
            'itemName': 'PM10',
            'isActive': false,
            'isActiveTab': false,
            'chartsType': '17'
          }
        ];
        this.countryWeatherItem = [
          {
            'className': 'cjm-weather-icon-dayu',
            'value': '--',
            'itemName': '空气温度',
            'isActive': false,
            'chartsType': '101'
          }, {
            'className': 'cjm-weather-icon-kongqiqiya',
            'value': '--',
            'itemName': '空气气压',
            'isActive': false,
            'chartsType': '102'
          }, {
            'className': 'cjm-weather-icon-fenglifengxiang',
            'value': '--',
            'itemName': '风力风向',
            'isActive': false,
            'chartsType': '104'
          }, {
            'className': 'cjm-weather-icon-richurila',
            'value': '--',
            'itemName': '日出日落',
            'isActive': false,
            'chartsType': '106'
          }, {
            'className': 'cjm-weather-icon-xiangduishidu',
            'value': '--',
            'itemName': '相对湿度',
            'isActive': false,
            'chartsType': '107'
          }, {
            'className': 'cjm-weather-icon-guangzhaoqiangdu',
            'value': '--',
            'itemName': '紫外线强度',
            'isActive': false,
            'chartsType': '108'
          }
        ];
      },
      resetValue() {
        this.isNoData = true;
        this.maxNum = 0;
        this.minNum = 0;
        this.aveNum = 0;
        if (this.type != 1) {
          this.$set(this.weatherItem[0], 'className', '1');
        }else{
          this.$set(this.countryWeatherItem[0], 'className', '1');
        }
        if (this.weatherAirCharts != null) {
          this.weatherAirCharts.clear();
        }
      },
      //风速转换风级
      windSpeedToLevel(sp){
        var level = '--';
        if(sp < 0.2){
          level = 0;
        }else if(sp < 1.5){
          level = 1;
        }else if(sp < 3.3){
          level = 2;
        }else if(sp < 5.4){
          level = 3;
        }else if(sp < 7.9){
          level = 4;
        }else if(sp < 10.7){
          level = 5;
        }else if(sp < 13.8){
          level = 6;
        }else if(sp < 17.1){
          level = 7;
        }else if(sp < 20.7){
          level = 8;
        }else if(sp < 24.4){
          level = 9;
        }else if(sp < 28.4){
          level = 10;
        }else if(sp < 32.6){
          level = 11;
        }else if(sp < 36.9){
          level = 12;
        }
        return level;
      },
      windDirectionTran(value){
        var dir = '';
        //value=value+90;
        if(value == 0) {
          dir = '北风';
        }else if(value < 30) {
          dir = '东北偏北风';
        }else if(value < 60) {
          dir = '东北风';
        }else if(value < 90) {
          dir = '东北偏东风';
        }else if(value == 90) {
          dir = '东风';
        }else if(value < 120) {
          dir = '东南偏东风';
        }else if(value < 150) {
          dir = '东南风';
        }else if(value < 180) {
          dir = '东南偏南风';
        }else if(value == 180) {
          dir = '南风';
        }else if(value < 210) {
          dir = '西南偏南风';
        }else if(value < 240) {
          dir = '西南风';
        }else if(value < 270) {
          dir = '西南偏西风';
        }else if(value == 270) {
          dir = '西风';
        }else if(value < 300) {
          dir = '西北偏西风';
        }else if(value < 330) {
          dir = '西北风';
        }else if(value < 360) {
          dir = '西北偏北风';
        }else if(value == 360){
          dir = '北风';
        }
        return dir;
      },
      //m/s转风描述
      levelDirectionWind(value){
        let dir = '';
        if (value >= 0 && value <= 0.2) {
          dir = '静风';
        }else if (value >= 0.3 && value <= 1.5) {
          dir = '软风';
        }else if (value >= 1.6 && value <= 3.3) {
          dir = '轻风';
        }else if (value >= 3.4 && value <= 5.4) {
          dir = '微风';
        }else if (value >= 5.5 && value <= 7.9) {
          dir = '和风';
        }else if (value >= 8 && value <= 10.7) {
          dir = '清劲风';
        }else if (value >= 10.8 && value <= 13.8) {
          dir = '强风';
        }else if (value >= 13.9 && value <= 17.1) {
          dir = '疾风';
        }else if (value >= 17.2 && value <= 20.7) {
          dir = '大风';
        }else if (value >= 20.8 && value <= 24.4) {
          dir = '烈风';
        }else if (value >= 24.5 && value <= 28.4) {
          dir = '狂风';
        }else if (value >= 28.5 && value <= 32.6) {
          dir = '爆风';
        }else if (value >= 32.7 && value <= 36) {
          dir = '飓风';
        }
        return dir;
      },
      //风级转风描述
      levelDirectionWind2(value){
        let dir = '';
        if (value < 1) {
          dir = '静风';
        }else if (value >= 1 && value <= 3) {
          dir = '软风';
        }else if (value >= 4 && value <= 6) {
          dir = '轻风';
        }else if (value >= 7 && value <= 10) {
          dir = '微风';
        }else if (value >= 11 && value <= 16) {
          dir = '和风';
        }else if (value >= 17 && value <= 21) {
          dir = '清劲风';
        }else if (value >= 22 && value <= 27) {
          dir = '强风';
        }else if (value >= 28 && value <= 33) {
          dir = '疾风';
        }else if (value >= 34 && value <= 40) {
          dir = '大风';
        }else if (value >= 41 && value <= 47) {
          dir = '烈风';
        }else if (value >= 48 && value <= 55) {
          dir = '狂风';
        }else if (value >= 56 && value <= 63) {
          dir = '爆风';
        }else if (value >= 64 && value <= 71) {
          dir = '飓风';
        }
        return dir;
      },
      ultravioletDetails(value){
        var label = '';
        if(value < 3) {
          label = '很弱：属于一级强度紫外线辐射，不需要采取防护措施；<br>若长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。';
        }else if(value > 2 && value < 5) {
          label = '弱：属于二级强度紫外线辐射，可以适当采取一些防护措施，<br>涂擦SPF在12-15之间、PA+的防晒护肤品。';
        }else if(value > 4 && value < 7) {
          label = '中等：属三级强度紫外线辐射，外出时建议涂擦SPF高于15、PA+的防晒护肤品，<br>戴帽子、太阳镜。';
        }else if(value > 6 && value < 10) {
          label = '强：属于四级强度紫外线辐射，避免在10点至14点暴露于日光下.<br>外出时戴好遮阳帽、太阳镜和太阳伞等，<br>涂擦SPF20左右、PA++的防晒护肤品。';
        }else if(value > 9) {
          label = '很强：属于五级强度紫外线辐射，尽可能不在室外活动，必须外出时，<br>要采取各种有效的防护措施。';
        }
        return label;
      },
      //选择查询
      selectType(){
        let self = this;
        if (this.chartsType == 7) {
          this.chartsType = 36;
        }
        if (this.chartsType == 8) {
          this.chartsType = 40;
        }
        let dataInfo = {
          stationID: this.stationID,
          type: self.chartsType
        };
        if (this.dateWeather != '') {
          dataInfo.dateWeather = this.dateWeather;
        }
        this.$ajax.post(this.$globalData.get('trace', 'apiUrl').weather.GET_DAY_INFO, dataInfo).then((r) => {
          if (r.resultCode == '200') {
            let weaHours = [];
            let mathNum = [];
            let option = [];
            let dirArr = [];
            let option2 = [];
            let option3 = [];
            let option4 = [];
            this.maxNum = 0;
            this.minNum = 0;
            this.aveNum = 0;
            for (let i = 0; i < 24; i++) {
              weaHours.push(i);
            }
            if (r.data != null) {
              this.isNoData = false;
              r.data.map(function (o) {
                if (self.chartsType == 36 || self.chartsType == 40) {
                  if (o.value1 != undefined) {
                    if (o.value1 == '') {
                      o.value1 = '--';
                    }
                    option[o.collectTime] = o.value1;
                  }
                  if (o.value2 != undefined) {
                    if (o.value2 == '') {
                      o.value2 = '--';
                    }
                    option2[o.collectTime] = o.value2;
                  }
                  if (o.value3 != undefined) {
                    if (o.value3 == '') {
                      o.value3 = '--';
                    }
                    option3[o.collectTime] = o.value3;
                  }
                  if (o.value4 != undefined) {
                    if (o.value4 == '') {
                      o.value4 = '--';
                    }
                    option4[o.collectTime] = o.value4;
                  }
                }else {
                  option[o.collectTime] = o.value1;
                }
                if(self.chartsType == 4 || self.chartsType == 104){
                  option[o.collectTime] = {
                    value: o.value2,
                    symbolRotate: 180 - (parseFloat(o.value1))
                  };
                  dirArr[o.collectTime] = self.windDirectionTran(o.value1);
                  mathNum.push(parseFloat(o.value2));
                }else{
                  mathNum.push(parseFloat(o.value1));
                }
              })
              this.maxNum = Math.max.apply(null, mathNum.map(function (x) {
                return x;
              }))
              this.minNum = Math.min.apply(null, mathNum.map(function (x) {
                return x;
              }))
              let sum = 0
              mathNum.filter(function (item, index, array) {
                sum += item;
              });
              this.aveNum = ~~(sum.toFixed(2) / mathNum.length * 100) / 100;
              if (this.chartsType == '1' || this.chartsType == '2' || this.chartsType == '10' || this.chartsType == '11' || this.chartsType == '101' || this.chartsType == '107' || this.chartsType == '108' || this.chartsType == '15' || this.chartsType == '16' || this.chartsType == '17') {
                this.lineCharts(weaHours, {data: option});
              }else if(this.chartsType == '4' || this.chartsType == '104') {
                this.drawWeatherMixChart(weaHours, {data: option, dir: dirArr});
              }else if(self.chartsType == '36' || self.chartsType == '40') {
                this.lineChartsMultiple(weaHours, {data: option, data2: option2, data3: option3, data4: option4});
              }else {
                this.barCharts(weaHours, {data: option});
              }
            }else{
              this.resetValue();
            }
          } else {
            this.resetValue();
            this.$message.error(r.msg);
          }
        });
      },
      lineCharts(weaHours, option){
        let self = this;
        if (this.weatherAirCharts) {
          this.weatherAirCharts.dispose();
        }
        this.weatherAirCharts = echarts.init(this.$refs.weatherCharts);
        this.$nextTick(()=> {
          this.resize();
          this.weatherAirCharts.setOption({
            color: '#f38428',
            grid: {
              x: 40,
              y: 40,
              x2: 40,
              y2: 40,
              borderColor: '#eaeaea'
            },
            tooltip: {
              tiggter: 'axis',
              formatter: function(param) {
                let label = param.seriesName + ':' + param.value;
                if (self.chartsType == '108') {
                  label = self.ultravioletDetails(param.value);
                }
                return label;
              }
            },
            xAxis: [
              {
                type: 'category',
                name: '(h)',
                nameTextStyle: {
                  color: '#656565'
                },
                axisLine: {
                  lineStyle: {
                    color: '#d1d1d1',
                    shadowBlur: 0,
                    width: 0
                  }
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  textStyle: {
                    color: '#656565'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#f38428'
                  }
                },
                boundaryGap: false,
                data: weaHours
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: this.detailsItem[this.chartsType].unit,
                nameTextStyle: {
                  color: '#656565'
                },
                axisLine: {
                  show: this.detailsItem[this.chartsType].axisLine,
                  lineStyle: {
                    color: '#eaeaea',
                    shadowBlur: 0,
                    width: 1
                  }
                },
                axisLabel: {
                  show: this.detailsItem[this.chartsType].axisLine,
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
                type: 'line',
                symbol: 'circle',
                name: this.detailsItem[this.chartsType].itemName,
                itemStyle: {
                  normal: {
                    color: this.detailsItem[this.chartsType].color,
                    borderWidth: 5
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: this.detailsItem[this.chartsType].color
                    }
                  }
                },
                lineStyle: {
                  normal: {
                    color: this.detailsItem[this.chartsType].color,
                    width: 2,
                    type: 'solid'
                  }
                },
                data: option.data,
                animation: true,
                animationEasing: 'linear'
              }
            ]
          });
        });
      },
      lineChartsMultiple(weaHours, option){
        if (this.weatherAirCharts) {
          this.weatherAirCharts.dispose();
        }
        this.weatherAirCharts = echarts.init(this.$refs.weatherCharts);
        let soilItem = [];
        if (this.chartsType == '36') {
          if (option.data.length > 0) {
            soilItem.push('温度一层');
          }
          if (option.data2.length > 0) {
            soilItem.push('温度二层');
          }
          if (option.data3.length > 0) {
            soilItem.push('温度三层');
          }
          if (option.data4.length > 0) {
            soilItem.push('温度四层');
          }
        }else{
          if (option.data.length > 0) {
            soilItem.push('湿度一层');
          }
          if (option.data2.length > 0) {
            soilItem.push('湿度二层');
          }
          if (option.data3.length > 0) {
            soilItem.push('湿度三层');
          }
          if (option.data4.length > 0) {
            soilItem.push('湿度四层');
          }
        }
        this.$nextTick(()=> {
          this.resize();
          this.weatherAirCharts.setOption({
            color: '#f38428',
            title: {
              text: '堆叠区域图'
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
              data: soilItem
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '30',
              right: '30',
              bottom: '40',
              top: '40',
              containLabel: true,
              borderColor: '#eaeaea'
            },
            xAxis: [
              {
                type: 'category',
                name: '(h)',
                nameTextStyle: {
                  color: '#656565'
                },
                boundaryGap: false,
                data: weaHours,
                axisLine: {
                  show: this.detailsItem[this.chartsType].axisLine,
                  lineStyle: {
                    color: '#eaeaea',
                    shadowBlur: 0,
                    width: 1
                  }
                },
                axisLabel: {
                  show: this.detailsItem[this.chartsType].axisLine,
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
                name: this.detailsItem[this.chartsType].unit,
                nameTextStyle: {
                  color: '#656565'
                },
                axisLine: {
                  show: this.detailsItem[this.chartsType].axisLine,
                  lineStyle: {
                    color: '#eaeaea',
                    shadowBlur: 0,
                    width: 1
                  }
                },
                axisLabel: {
                  show: this.detailsItem[this.chartsType].axisLine,
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
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#93d470',
                    borderWidth: 5
                  }
                },
                lineStyle: {
                  normal: {
                    color: '#93d470',
                    width: 2,
                    type: 'solid'
                  }
                },
                data: option.data
              },
              {
                name: soilItem[1],
                type: 'line',
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#71cbff',
                    borderWidth: 5
                  }
                },
                lineStyle: {
                  normal: {
                    color: '#71cbff',
                    width: 2,
                    type: 'solid'
                  }
                },
                data: option.data2
              },
              {
                name: soilItem[2],
                type: 'line',
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#cb9349',
                    borderWidth: 5
                  }
                },
                lineStyle: {
                  normal: {
                    color: '#cb9349',
                    width: 2,
                    type: 'solid'
                  }
                },
                data: option.data3
              },
              {
                name: soilItem[3],
                type: 'line',
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#fec248',
                    borderWidth: 5
                  }
                },
                lineStyle: {
                  normal: {
                    color: '#fec248',
                    width: 2,
                    type: 'solid'
                  }
                },
                data: option.data4
              }
            ]
          });
        });
      },
      drawWeatherMixChart(weaHours, option){
        let self = this;
        this.weatherAirCharts.dispose();
        this.weatherAirCharts = echarts.init(this.$refs.weatherCharts);
        this.weatherAirCharts.clear();
        this.weatherAirCharts.setOption({
          color: '#368dda',
          grid: {
            x: 30,
            y: 30,
            x2: 40,
            y2: 40,
            borderColor: '#eaeaea'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function(param) {
              var val = param[0].value || '无数据';
              var label = param[0].seriesName + ':' + val, dir = '';
              val = val == '-' ? '无数据' : val;
              dir = option.dir[param[0].dataIndex] || '无数据';
              if (self.chartsType == 4) {
                label = '名称:' + self.levelDirectionWind(val);
              }else if (self.chartsType == 104) {
                label = '名称:' + self.levelDirectionWind2(val);
              }
              label += '<br/>风向:' + dir;
              if (self.chartsType == 4) {
                label += '<br/>风力:' + val + 'm/s<br/>风级:' + self.windSpeedToLevel(val) + '级';
              }else if (self.chartsType == 104) {
                label += '<br/>风级:' + val + '级';
              }
              return label;
            }
          },
          xAxis: [
            {
              type: 'category',
              name: '(h)',
              nameTextStyle: {
                color: '#656565'
              },
              axisLine: {
                lineStyle: {
                  color: '#d1d1d1',
                  shadowBlur: 0,
                  width: 1
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#656565'
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#656565'
                }
              },
              boundaryGap: false,
              data: weaHours
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: this.detailsItem[this.chartsType].unit,
              nameTextStyle: {
                color: '#656565'
              },
              axisLine: {
                lineStyle: {
                  color: '#d1d1d1',
                  shadowBlur: 0,
                  width: 1
                }
              },
              axisLabel: {
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
          noDataLoadingOption: {
            text: '未获取到天气数据'
          },
          series: [
            {
              name: this.detailsItem[this.chartsType].itemName,
              itemStyle: {
                normal: {
                  color: this.detailsItem[this.chartsType].color
                }
              },
              type: 'line',
              smooth: true,
              showAllSymbol: true,
              symbol: 'image://' + urlImg,
              symbolSize: 14,
              data: option.data
            }
          ]
        });
      },
      barCharts(weaHours, option){
        this.weatherAirCharts.dispose();
        this.weatherAirCharts = echarts.init(this.$refs.weatherCharts);
        this.weatherAirCharts.clear();
        this.weatherAirCharts.setOption({
          color: this.detailsItem[this.chartsType].color,
          grid: {
            x: 50,
            y: 30,
            x2: 40,
            y2: 40,
            borderColor: '#eaeaea'
          },
          tooltip: {
            tiggter: 'axis',
            show: true
          },
          xAxis: [
            {
              type: 'category',
              name: '(h)',
              nameTextStyle: {
                color: '#656565'
              },
              axisLine: {
                lineStyle: {
                  color: '#d1d1d1',
                  shadowBlur: 0,
                  width: 1
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#656565'
                }
              },
              splitLine: {
                lineStyle: {
                  color: this.detailsItem[this.chartsType].color
                }
              },
              boundaryGap: false,
              data: weaHours
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: this.detailsItem[this.chartsType].unit,
              nameTextStyle: {
                color: '#656565'
              },
              axisLine: {
                lineStyle: {
                  color: '#eaeaea',
                  shadowBlur: 0,
                  width: 1
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#646464'
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
              type: 'bar',
              barWidth: 9,
              itemStyle: {
                normal: {
                  color: this.detailsItem[this.chartsType].color,
                  barBorderRadius: [5, 5, 0, 0]
                }
              },
              name: this.detailsItem[this.chartsType].itemName,
              data: option.data
            }
          ]
        });
        this.$nextTick(()=> {
          this.resize();
        });
      },
      //导出历史查询
      exportData(){
        let dataInfo = {
          stationID: this.stationID
        };
        if (this.dateWeather != '') {
          dataInfo.dateWeather = this.dateWeather;
        }
        fileDownload(this.exportUrl[this.type], dataInfo);
      },
      resize(){
        if (this.weatherAirCharts) {
          this.weatherAirCharts.resize();
        }
      },
      getWeatherForecastMoji(){
        this.$ajax.post(this.$globalData.get('trace', 'apiUrl').weather.GET_MOJI_API, {stationID: this.stationID}).then((r) => {
          if (r.resultCode == '200') {
            this.isForecast = false;
            this.predictionItem = r.data;
          } else{
            this.$message.error(r.msg);
            this.isForecast = true;
          }
        })
      },
      getWeatherAQIMojiApi(){
        let self = this;
        this.$ajax.post(this.$globalData.get('trace', 'apiUrl').weather.GET_AQI_API, {stationID: this.stationID}).then((r) => {
          if (r.resultCode == '200') {
            r.data.map(function (x) {
              self.AQIItem[x.data] = {
                'color': self.getAQI(x.value).color,
                'label': self.getAQI(x.value).label
              };
            })
          } else{
            this.$message.error(r.msg);
          }
        })
      },
      getAQI(val){
        let labelArr = {};
        if (val > 0 && val < 50) {
          labelArr.label = '优';
          labelArr.color = '#a7cf8c';
        }else if (val > 49 && val < 100) {
          labelArr.label = '良';
          labelArr.color = '#f7da64';
        }else if (val > 99 && val < 150) {
          labelArr.label = '轻度';
          labelArr.color = '#f29e39';
        }else if (val > 149 && val < 200) {
          labelArr.label = '中度';
          labelArr.color = '#da555d';
        }else if (val > 199 && val < 300) {
          labelArr.label = '重度';
          labelArr.color = '#da555d';
        }else if (val > 299 && val < 500) {
          labelArr.label = '严重';
          labelArr.color = '#881326';
        }
        return labelArr;
      },
      integralPointExecute(){
        if (this.stationID != '') {
          this.search();
        }
      },
      nextIntegralPointAfterLogin(){
        this.integralPointExecute(); //在整点执行的函数，在每个整点都调用该函数
        setInterval(this.integralPointExecute, this.executionseconds); //一个小时执行一次，那么下一个整点，下下一个整点都会执行
      }
    },
    mounted () {
      this.reset();
      on(window, 'resize', this.resize);
      this.$nextTick(function () {
        this.fetchData();
        this.resize();
      });
      var date = new Date(); //现在时刻
      var dateIntegralPoint = new Date(); //用户登录时刻的下一个整点，也可以设置成某一个固定时刻
      dateIntegralPoint.setHours(date.getHours() + 1); //小时数增加1
      dateIntegralPoint.setMinutes(0);
      dateIntegralPoint.setSeconds(0);
      setTimeout(this.nextIntegralPointAfterLogin, dateIntegralPoint - date); //下一个整点执行。
    },
    destroyed () {
      off(window, 'resize', this.resize);
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>

  .weather-banner{
    background-image: url("../../assets/images/weather-bg.jpg");
    padding: 30px 1% 1% 10px;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    font-size:15px;
    .weather-li{
      margin-top: 20px;
      height: 150px;
      background-color: rgba(255, 255, 255, 0.2);
      width: 18%;
      margin: 20px 1% 0 1%;
      float: left;
      color: #fff;
      text-align: center;
    }
    .weather-li.country{
      width: 14.6666%;
    }
    .is-active{
      color: #fff;
      filter:alpha(Opacity=50);
      -moz-opacity:0.5;
      opacity: .5;
    }
  }
  .weather-icon{
    font-size: 50px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .operation{
    margin-top: 10px;
    height: 35px;
    line-height: 35px;
    float: left;
    width: 100%;
  }
  .open{
    width: 90px;
    height: 35px;
    line-height: 35px;
    background-color: rgba(13, 13, 13, 0.2);
    text-align: center;
    color: #fffeff;
    float: right;
    margin-right: 1%;
    font-size: 14px;
    cursor: pointer;
  }
  .weather-span{
    line-height: 30px;
  }
  .is-show-arrow{
    margin-top: 5px;
  }
  .weather-content{
    margin-top: 20px;
    border: 1px #eff2f7 solid;
    display: inline-block;
    width: 100%;
  }
  .tab-title{
    height: 50px;
    line-height: 50px;
    width: 100%;
    background-color: #eff2f7;
    color: #475669;
  }
  .tab-title-span{
    margin-left: 2%;
    float: left;
  }
  .export{
    background-color: #20a0ff;
    color: #ffffff;
    float: right;
    margin-right: 2%;
    margin-top: 6px;
  }
  .tab-content{
    font-size: 14px;
    margin-top: 30px;
    margin-left: 1%;
    color: #475669;
  }
  .tabs-wrap{
    margin-top: 28px;
  }
  .tab-echart{
    padding-top: 20px;
  }
  .collectTime{}
  .weather-num{
    margin-top: 30px;
    width: 100%;
  }
  .weather-tab-title{
    display: inline-block;
    margin: 0 auto;
    line-height: 26px;
    font-size: 14px;
    background-color: #c1c1c1;
    border-radius: 5px;
    color: #ffffff;
    padding-right: 14px;
    margin-left: 35%;
  }
  .max-num{
    float: left;
    margin-left: 14px;
  }
  .min-num{
    float: left;
    margin-left: 14px;
  }
  .average-num{
    float: left;
    margin-left: 14px;
  }
  .weather-details{
    text-align: center;
    margin-bottom: 10px;
  }
  .prediction{
    width: 100%;
    margin-top: 20px;
    &>li{
      width: 98px;
      height: 270px;
      background-color: #e8f4ff;
      box-sizing: border-box;
      text-align: center;
      border:2px #e8f4ff solid;
      float: left;
      margin-left: 2px;
      margin-bottom: 2px;
    }
    &>li:hover{
       background-color: #ffffff;
       border:2px #accfe9 solid;
       box-sizing: border-box;
    }
    .predict-date{
      padding-top: 14px;
      font-size: 14px;
    }
    .condition-id-day{
      padding-top: 10px;
      font-size: 40px;
      color: #5da2ff;
    }
    .condition-day{
      padding-top: 20px;
      font-size: 14px;
    }
    .temp-day{
      padding-top: 14px;
    }
    .wind-level-day{
      padding-top: 14px;
    }
    .wind-dir-day{
      padding-top: 14px;
      font-size: 14px;
    }
    .max-temperature{
      color: #ff3232;
    }
    .arrow{
      color: #6aa5cf;
      margin: 0 4px;
    }
    .AQI-details{
      margin-top: 5px;
    }
    .AQI-color{
      border-radius: 3px;
      background-color: #a7cf8c;
      width: 20px;
      HEIGHT: 10PX;
      display: inline-block;
    }
  }
  .lever-1{
    color: #93d470;
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }
  .none{
    display: none;
  }
</style>
