<template>
  <div class="cjm-edit-page">
    <h1 class="cjm-h1">产品售出趋势</h1>
    <div class="search clear">
      <div class="date-search">
        <cjm-date-picker v-model="search.dateTime" type="daterange" :picker-options="timeOpiton"
                         @input="changeDateValue"></cjm-date-picker>
        <!--<cjm-button type="primary" @click="searchTimeHandler">查看</cjm-button>-->
      </div>
      <div class="detal-search clear">
        <div class="guide-search">
          <span>导购</span>
          <cjm-remote-select placeholder="搜索导购" v-model="search.guide"
                             :remote-url="$globalData.get('marketing','apiUrl').autoComplete.USER"
                             @select="searchGuideHandler"></cjm-remote-select>
        </div>
        <div class="product-search">
          <span>产品</span>
          <cjm-remote-select placeholder="搜索产品" v-model="search.product"
                             :remote-url="$globalData.get('marketing','apiUrl').autoComplete.PRODUCT"
                             @select="searchProductHandler"></cjm-remote-select>
        </div>
      </div>
    </div>
    <div class="month-search">
      <cjm-radio-group v-model="search.month" @change="changeMonths">
        <cjm-radio-button label="本月"></cjm-radio-button>
        <cjm-radio-button label="上月"></cjm-radio-button>
        <cjm-radio-button label="当季"></cjm-radio-button>
        <cjm-radio-button label="半年"></cjm-radio-button>
      </cjm-radio-group>
    </div>
    <div class="show-block">
      <div id="main" style="width: 100%;height: 400px;"></div>
      <img src="../../../assets/images/table-noData.png" alt="" class="no-date-img" v-if="hasData">
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts/lib/echarts'
  require('echarts/lib/chart/line');
  export default{
    data(){
      let search = {
        guide: '',
        product: '',
        month: '本月',
        beginTime: '',
        endingTime: '',
        dateTime: '2017/09/04 ~ 2017/09/07'
      };
      return {
        lineChart: null,
        search: search,
        xCoordinateData: [], //x坐标
        renderData: [], //渲染页面数据
        standardDays: 15,
        timeOpiton: {
          onPick(val){
            if (val.maxDate) {
              search.beginTime = search.dateTime.split(' ~ ')[0];
              search.endingTime = search.dateTime.split(' ~ ')[1];
              search.month = '';
            }
          },
          disabledDate(time){
            return false;
          }
        },
        hasData: false
      }
    },
    methods: {
      initCharts(){
        let option = {
          visualMap: {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          },
          grid: {
            left: '3%'
          },
          title: {
            text: '产品售出趋势'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            name: '日期',
            data: this.xCoordinateData
          },
          yAxis: {
            name: '产品(数量)'
          },
          series: [{
            name: '销量',
            type: 'line',
            data: this.renderData
          }]
        };
        echarts.init(document.getElementById('main')).setOption(option);
      },
      changeMonths(val){
        switch (val) {
          case '本月':
            this.getCurrentMonth();
            this.search.month = '本月';
            break;
          case '上月':
            this.getPrevMonth();
            this.search.month = '上月';
            break;
          case '当季':
            this.getCurrentQuarter();
            this.search.month = '当季';
            break;
          case '半年':
            this.getHalfYear();
            this.search.month = '半年';
            break;
        }
      },
      getCurrentMonth(){
        let currentMonth = new Date().getMonth() + 1; //本月
        let nextMonth = currentMonth == 12 ? 1 : currentMonth + 1; //下月
        let currentMonthFirstDay = new Date(new Date().setDate(1)); //本月第一天
        let nextMonthFirstDay = new Date(new Date().getFullYear(), nextMonth - 1, 1);
        let currentMonthLastDay = new Date(nextMonthFirstDay.getTime() - 86400000); //下月第一天
        let fYear = currentMonthFirstDay.getFullYear();
        let fMonth = currentMonthFirstDay.getMonth() == 12 ? 1 : currentMonthFirstDay.getMonth() + 1;
        let fDay = currentMonthFirstDay.getDate();
        let lYear = currentMonthLastDay.getFullYear();
        let lMonth = currentMonthLastDay.getMonth() + 1;
        let lDay = currentMonthLastDay.getDate();
        this.search.beginTime = fYear + '/' + fMonth + '/' + fDay;
        this.search.endingTime = lYear + '/' + lMonth + '/' + lDay;
        this.search.dateTime = this.search.beginTime + ' ~ ' + this.search.endingTime;
        this.getData();
      },
      getPrevMonth(){
        let currentMonth = new Date().getMonth() + 1; //本月
        let prevMonth = currentMonth == 1 ? 12 : currentMonth - 1; //上月
        let currentMonthFirstDay = new Date(new Date(new Date().setDate(1)).getTime() - 86400000); //本月第一天
        let prevMonthFirstDay = new Date(new Date().getFullYear(), prevMonth - 1, 1); //上月第一天
        this.search.beginTime = prevMonthFirstDay.getFullYear() + '/' + (prevMonthFirstDay.getMonth() + 1) + '/' + prevMonthFirstDay.getDate();
        this.search.endingTime = currentMonthFirstDay.getFullYear() + '/' + (currentMonthFirstDay.getMonth() + 1) + '/' + currentMonthFirstDay.getDate();
        this.search.dateTime = this.search.beginTime + ' ~ ' + this.search.endingTime;
        this.getData();
      },
      getCurrentQuarter(){
        let currentMonth = new Date().getMonth() + 1; //本月
        switch (currentMonth) {
          case 1:
          case 2:
          case 3:
            this.search.beginTime = new Date().getFullYear() + '/' + '01/01';
            this.search.endingTime = new Date().getFullYear() + '/' + '03/31';
            break;
          case 4:
          case 5:
          case 6:
            this.search.beginTime = new Date().getFullYear() + '/' + '04/01';
            this.search.endingTime = new Date().getFullYear() + '/' + '06/30';
            break;
          case 7:
          case 8:
          case 9:
            this.search.beginTime = new Date().getFullYear() + '/' + '07/01';
            this.search.endingTime = new Date().getFullYear() + '/' + '9/30';
            break;
          case 10:
          case 11:
          case 12:
            this.search.beginTime = new Date().getFullYear() + '/' + '10/01';
            this.search.endingTime = new Date().getFullYear() + '/' + '12/31';
            break;
        }
        this.search.dateTime = this.search.beginTime + ' ~ ' + this.search.endingTime;
        this.getData();
      },
      getHalfYear(){
        let currentMonth = new Date().getMonth() + 1; //本月
        if (currentMonth < 7) {
          this.search.beginTime = new Date().getFullYear() + '/' + '01/01';
          this.search.endingTime = new Date().getFullYear() + '/' + '06/30';
        } else {
          this.search.beginTime = new Date().getFullYear() + '/' + '07/01';
          this.search.endingTime = new Date().getFullYear() + '/' + '12/31';
        }
        this.search.dateTime = this.search.beginTime + ' ~ ' + this.search.endingTime;
        this.getData();
      },
      searchGuideHandler(val){
        if (val) {
          this.getData({
            userID: val.id
          })
        } else {
          this.getData()
        }
      },
      searchProductHandler(val){
        if (val) {
          this.getData({
            productID: val.id
          })
        } else {
          this.getData();
        }
      },
      getData(obj){
        let params = {
          userID: obj && obj.userID ? obj.userID : '',
          beginTime: obj && obj.beginTime ? obj.beginTime : this.search.beginTime,
          endTime: obj && obj.endTime ? obj.endTime : this.search.endingTime,
          productID: obj && obj.productID ? obj.productID : ''
        };
        this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_REDPACK_STATIC, params).then((res) => {
          if (res.resultCode === '200' && res.data.rows && res.data.rows.length > 0) {
            this.xCoordinateData = this.computedXCoordinateData(res.data.rows).map((p) => {
              return p.dateTime
            });
            this.renderData = this.computedXCoordinateData(res.data.rows).map((p) => {
              return p.cnt ? p.cnt : 0;
            });
            this.hasData = false;
          } else {
            this.xCoordinateData = [];
            this.renderData = [];
            this.hasData = true;
          }
          this.initCharts()
        })
      },
      computedXCoordinateData(data){
        let date = Date.getRange(new Date(this.search.beginTime), new Date(this.search.endingTime))
        let arr = [];
        arr = date.map((p, index) => {
          let year = p.getFullYear();
          let month = String(p.getMonth() + 1).length == 1 ? '0' + (p.getMonth() + 1) : (p.getMonth() + 1);
          let day = String(p.getDate()).length == 1 ? '0' + p.getDate() : p.getDate();
          let dateTime = year + '-' + month + '-' + day;
          return {
            dateTime: dateTime
          };
        });
        arr = arr.map((p) => {
          for (let i = 0; i < data.length; i++) {
            if (p.dateTime === data[i].createTime) {
              p.cnt = data[i].cnt;
            }
          }
          return p;
        })
        return arr;
      },
      changeDateValue(val){
        this.getData({
          beginTime: val.split(' ~ ')[0],
          endTime: val.split(' ~ ')[1]
        });
        this.search.beginTime = val.split(' ~ ')[0];
        this.search.endingTime = val.split(' ~ ')[1];
      }
    },
    mounted(){
      this.getCurrentMonth();
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .show-block {
    position: relative;
    .no-date-img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 999;
    }
  }

  .search {
    .date-search {
      float: left;
      margin-bottom: 20px;
      margin-right: 20px;
    }
    .detal-search {
      float: left;
      margin-bottom: 20px;
      .guide-search {
        float: left;
        margin-right: 20px;
      }
      .product-search {
        float: left;
      }
    }
  }
</style>
