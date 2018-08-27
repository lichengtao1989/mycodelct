<template>
    <div class="banner-content">
        <div class="weather-status">
            <div class="weather-status-img"><img src="../assets/../assets/images/weather/1.png"></div>
            <div class="weather-status-temperature">
                <div class="temperature">{{defaultWeatherData[1] || defaultWeatherData[101] }}</div>
                <div class="status">多云</div>
            </div>
        </div>
        <div class="rel-wet" v-if="defaultWeatherData[105]">
            <div class="sunrise">日出 <span>{{defaultWeatherData[105]}}</span></div>
            <div class="sunset">日落 <span>{{defaultWeatherData[106]}}</span></div>
            <div class="pressure">气压 <span>{{defaultWeatherData[102]}}</span></div>
        </div>
        <ul class="weather-dimens" v-show="more">
            <li v-for="(item, index) in weatherArr" :key="index">
                <div class="item-icon"><img :src="item.icon"></div>
                <div class="item-info">
                    <div class="item-value">{{item.value}}</div>
                    <div class="item-name">{{item.name}}</div>
                </div>
            </li>
        </ul>
        <p class="see-more" @click="showmore(more)" v-show="Object.keys(defaultWeatherData).length > 0">
            <span>{{more ? '收起' : '点击查看更多'}}</span> <i :class="[more ? 'arrow_hide' : 'arrow_show']"></i>
        </p>
    </div>
</template>

<script>
const stationMachine = [{
  'icon': require('../assets/images/weather/humidity.png'),
  'name': '相对湿度',
  'unit': '%',
  'code': '2'
}, {
  'icon': require('../assets/images/weather/wind.png'),
  'name': '风向',
  'unit': '级',
  'code': '3'
}, {
  'icon': require('../assets/images/weather/wind.png'),
  'name': '风速',
  'unit': '级',
  'code': '4'
}, {
  'icon': require('../assets/images/weather/rain.png'),
  'name': '降水量',
  'unit': 'mm',
  'code': '5'
}, {
  'icon': require('../assets/images/weather/light.png'),
  'name': '环境照度',
  'unit': 'lux',
  'code': '6'
}, {
  'icon': require('../assets/images/weather/air.png'),
  'name': '气压',
  'unit': 'hpa',
  'code': '9'
}, {
  'icon': require('../assets/images/weather/ph.png'),
  'name': '土壤PH值',
  'unit': '',
  'code': '10'
}, {
  'icon': require('../assets/images/weather/salt.png'),
  'name': '土壤盐分',
  'unit': '',
  'code': '11'
}, {
  'icon': require('../assets/images/weather/eva.png'),
  'name': '蒸发量',
  'unit': 'mm',
  'code': '12'
}, {
  'icon': require('../assets/images/weather/co2.png'),
  'name': '二氧化碳',
  'unit': '%',
  'code': '13'
}, {
  'icon': require('../assets/images/weather/light.png'),
  'name': '光照辐射',
  'unit': 'umol',
  'code': '14'
}, {
  'icon': require('../assets/images/weather/nh.png'),
  'name': '氨气',
  'unit': 'ppb',
  'code': '15'
}, {
  'icon': require('../assets/images/weather/h25.png'),
  'name': '硫化氢',
  'unit': 'ppb',
  'code': '16'
}, {
  'icon': require('../assets/images/weather/PM10.png'),
  'name': 'PM10',
  'unit': 'ug/m2',
  'code': '17'
},  {
  'icon': require('../assets/images/weather/tem.png'),
  'name': '土壤温度',
  'unit': '',
  'code': '36'
}, {
  'icon': require('../assets/images/weather/soil.png'),
  'name': '土壤湿度',
  'unit': '',
  'code': '40'
}, {
    'icon': require('../assets/images/weather/wind.png'),
    'name': '风力风向',
    'unit': '级',
    'code': '104'
}, {
    'icon': require('../assets/images/weather/humidity.png'),
    'name': '相对湿度',
    'unit': '%',
    'code': '107'
}, {
    'icon': require('../assets/images/weather/uv.png'),
    'name': '紫外线强度',
    'unit': 'umol',
    'code': '108'
}, {
    'icon': require('../assets/images/weather/warn.png'),
    'name': '气象灾害预警',
    'unit': '',
    'code': 'alert'
}];
export default {
  props: {
    title: { type: String, default: "", },
    weatherdata: { type: Object, default: () => {} },
  },
  data: function() {
    return {
      more: false
    };
  },
  computed: {
    weatherArr() {
      let weatherArr = [];
      let data = this.weatherdata;
      stationMachine.map((_i) => {
        Object.keys(data).map((_j)=>{
          if (_i.code === _j){
            weatherArr.push({
              name: _i.name,
              value: data[_j],
              icon: _i.icon,
            })
          }
        })
      })
      return weatherArr;
    },
    defaultWeatherData() {
      return this.weatherdata;
    },
  },
  methods: {
    showmore(more) {
      this.more = !more;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/_var.scss";
$base: 75;
.banner-content{
    padding-top: .1rem;
}
.see-more{
    font-size: .4rem;
    color: #aaaaaa;
    text-align: center;
    margin: 0rem 0 .3rem 0;
    float: left;
    width: 100%;
    position: relative;
    top: -.5rem;
}
.weather-status{
    width: 100%;
    clear: both;
    height: 4rem;
    line-height: 4rem;
}
.weather-status-img{
    padding: .5rem 1rem;
    width: 2rem;
    float: left;
    height: 2.8rem;
}
.weather-status-img img{
    width: 100%;
}
.weather-status-temperature{
    float: left;
    color: #fb9c4f;
}
.temperature{
    font-size: 1rem;
    font-weight: bold;
    float: left;
}
.status{
    font-size: .8rem;
    float: left;
    width: 2rem;
    margin-left: .3rem;
}
.rel-wet{
    position: relative;
    font-size: .4rem;
    color: #666666;
    width: 100%;
    overflow: hidden;
    line-height: 40px;
    padding: .5rem;
}
.pressure{
    position: absolute;
    top: .5rem;
    right: 1.4rem;
    text-align: right;
}
.weather-dimens{
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.weather-dimens >li{
    width: 45%;
    border: 1px #e6e6e6 solid;
    margin: 0rem .2rem .2rem .2rem;
    height: 2.7rem;
}
.item-icon{
    margin: .55rem 0 0 .3rem;
    width: .9rem;
    height: .9rem;
    display: inline-block;
}
.item-icon img{
    width: 100%;
    vertical-align: top;
}
.item-info{
    font-size: .35rem;
    margin-right: .2rem;
    color: #5d5d5d;
    float: right;
}
.item-value{
    margin-top: .5rem;
    text-align: right;
    font-size: .35rem;
}
.item-name{
    text-align: right;
    margin-top: .3rem;
    font-size: .4rem;
}
.item-more{
    color: #3ac6d3;
    font-size: .35rem;
    float: left;
    width: 4.3rem;
    text-align: right;
    margin: .8rem .2rem .2rem 0rem;
    height: .35rem;
}
.arrow_show{
    left: 6rem;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-top: 2px solid #cdcdcd;
    border-right: 2px solid #cdcdcd;
    position: absolute;
    transform: rotate(-225deg);
}
.arrow_hide{
    left: 5.2rem;
    top: .1rem;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-top: 2px solid #cdcdcd;
    border-right: 2px solid #cdcdcd;
    position: absolute;
    transform: rotate(-45deg);
}
.ico{
  @include wh(20rem/$base,35rem/$base);
  @include l50;
  top:20rem/$base;
  @include baimg('../assets/../assets/images/qg.png');
}
.ico2{
  @include wh(25rem/$base,33rem/$base);
  @include l50;
  top:20rem/$base;
  @include baimg('../assets/../assets/images/sd.png');
}
.ico3{
  @include wh(42rem/$base,20rem/$base);
  @include l50;
  top:30rem/$base;
  @include baimg('../assets/../assets/images/co.png');
}
</style>
