<template>
  <div>
    <!--上面5个卡片-->
    <div>
      <ul class="cjm-analysis-overview">
        <!--生产装箱总赋码数 allCount 暂时不显示-->
        <li v-for="(item,index) in cardsData" v-show="item.key!=='allCount'" :key="index" :title="item.title">
          <div class="cjm-analysis-overview-title" :title="item.title">{{item.title}}</div>
          <div class="cjm-analysis-overview-value" :title="item.realNumber">{{item.realNumber}}</div>
        </li>
      </ul>
    </div>

    <br/>

    <!--下面4个图表卡片-->

    <cjm-cards class="nes-charts">

      <!--1111111-->
      <cjm-data-card class="nes-chart-box" @statusChanged="productDataStatusChange" ref="productData" :data-factory="productDataLoadData" :chart-option-factory="productDataGetOption" chart-type="bar" size="middle" :title="productDataTitle">

        <div slot="toolbar">
          <cjm-select v-model="dateCheckProductDataActive">
            <cjm-option v-for="(item,index) in dateCheckProductData" :key="index" :value="index" :label="item"></cjm-option>
          </cjm-select>
          <cjm-button type="primary" @click="exportData('productData')" :disabled="!isAllowProductDataExport"><i class="cjm-icon-export"></i>导出</cjm-button>
        </div>

      </cjm-data-card>

      <!--222222222222-->
      <cjm-data-card class="nes-chart-box" ref="setCodeData" :data-factory="setCodeDataLoadData" :chart-option-factory="setCodeDataGetOption" size="middle" chart-type="pie" :title="setCodeDataTitle">

        <div slot="toolbar">
          <cjm-select v-model="dateCheckSetCodeDataActive">
            <cjm-option v-for="(item,index) in dateCheckSetCodeData" :key="index" :value="index" :label="item"></cjm-option>
          </cjm-select>
        </div>
        <div class="set-code-data-chart-inner" v-html="setCodeDataChartInner"></div>

      </cjm-data-card>

      <!--33333333333-->
      <cjm-data-card class="nes-chart-box" @statusChanged="setCodeSituationStatusChange" ref="setCodeSituation" :data-factory="setCodeSituationLoadData" :chart-option-factory="setCodeSituationGetOption" size="middle" chart-type="line" :title="setCodeSituationTitle">

        <div slot="toolbar">
          <cjm-select v-model="dateCheckSetCodeSituationActive">
            <cjm-option v-for="(item,index) in dateCheckSetCodeSituation" :key="index" :value="index" :label="item"></cjm-option>
          </cjm-select>
          <cjm-button type="primary" @click="exportData('setCodeSituation')" :disabled="!isAllowSetCodeSituationExport"><i class="cjm-icon-export"></i>导出</cjm-button>
        </div>

      </cjm-data-card>

      <!--44444444444-->
      <cjm-data-card class="nes-chart-box" @statusChanged="yearSetCodeSituationStatusChange" ref="yearSetCodeSituation" :data-factory="yearSetCodeSituationLoadData" :chart-option-factory="yearSetCodeSituationGetOption" size="middle" chart-type="line" title="年度生产赋码情况">

        <div slot="toolbar">
          <cjm-button type="primary" @click="exportData('yearSetCodeSituation')" :disabled="!isAllowYearSetCodeSituationExport"><i class="cjm-icon-export"></i>导出</cjm-button>
        </div>

      </cjm-data-card>

    </cjm-cards>

  </div>
</template>
<script>
  import CjmCards from 'framework/components/base/cards';
  import CjmCard from 'framework/components/base/card';
  import CjmDataCard from 'framework/components/base/data-card'
  import fileDownload from 'framework/utils/fileDownload';

  export default {
    components: {CjmCards, CjmCard, CjmDataCard},
    data(){
      const codeNestingUrl = this.$globalData.get('logistics', 'apiUrl').codeNesting;
      return {
        cardsData: [],
        codeNestingUrl,
        dateCheckProductData: ['今日', '昨日', '本月', '上个月', '今年'], //生产数据
        dateCheckSetCodeData: ['今日', '昨日'], //赋码数据
        dateCheckSetCodeSituation: ['本周', '本月'], //赋码情况
        dateCheckProductDataActive: 0,
        dateCheckSetCodeDataActive: 0,
        dateCheckSetCodeSituationActive: 0,
        isAllowProductDataExport: false,
        isAllowSetCodeSituationExport: false,
        isAllowYearSetCodeSituationExport: false,
        setCodeDataRes: {data: null}
      }
    },
    watch: {
      dateCheckProductDataActive: function () {
        this.$refs.productData.refresh();
      },
      dateCheckSetCodeDataActive: function () {
        this.$refs.setCodeData.refresh();
      },
      dateCheckSetCodeSituationActive: function () {
        this.$refs.setCodeSituation.refresh();
      }
    },
    computed: {
      productDataTitle(){
        const dtTxt = this.dateCheckProductData[this.dateCheckProductDataActive];
        return `TOP  ${dtTxt}产品生产数据`;
      },
      setCodeDataTitle(){
        const dtTxt = this.dateCheckSetCodeData[this.dateCheckSetCodeDataActive];
        return `${dtTxt}生产赋码数`;
      },
      setCodeSituationTitle(){
        const dtTxt = this.dateCheckSetCodeSituation[this.dateCheckSetCodeSituationActive];
        return `${dtTxt}生产赋码情况`;
      },
      setCodeDataChartInner(){
        const data = Object.deepClone(this.setCodeDataRes.data);
        if (data) {
          const todayData = data.values.find(item => item.option.name === 'today').values;
          const yesterdayData = data.values.find(item => item.option.name === 'yesterday').values;
          //当天总数
          let nowNumber = todayData.find(item => item.name === '单标数').value * 1 || 0;
          nowNumber += todayData.find(item => item.name === '箱码数').value * 1 || 0;
          //前一天总数
          let lastNumber = yesterdayData.find(item => item.name === '单标数').value * 1 || 0;
          lastNumber += yesterdayData.find(item => item.name === '箱码数').value * 1 || 0;
          //
          const abs = Math.abs(lastNumber - nowNumber); //对比2天相差的数量 绝对值
          let pecent = lastNumber === 0 ? '' : (((abs / lastNumber) * 100).toFixed(2) || 0).toString(); //当天相对前一天变化的百分比,如果前一天是0,则百分比为空
          let isMore = nowNumber >= lastNumber;
          const upIco = '<i class="cjm-icon-drop cjm-icon-rotate-180" style="color:#e74c3c"></i>';
          const downIco = '<i class="cjm-icon-drop" style="color: #3cd66d"></i>';
          const top = pecent ? '40' : '70';
          const dtTxt = this.dateCheckSetCodeData[this.dateCheckSetCodeDataActive];
          let html = `<div style="margin-top: ${top}px">${dtTxt}生产赋码数</div>`;
          html += (`<h2 style="font-size: 32px;margin-top: 5px" title="${nowNumber}">${nowNumber}</h2>`);
          pecent && (html += ('<div style="font-size: 13px;color: #8492a6;margin-top: 20px">同比前一日：' + pecent + '%' + (isMore ? upIco : downIco) + '</div>'));
          return html;
        } else {
          return '';
        }
      }
    },
    methods: {
      //数字转换 100000->10万 100000000->1亿
      numberFormater(num){
        let newNum = num.toString();
        const wan = 10000;
        const yi = 100000000;
        if (num >= wan && num < yi) {
          newNum = ((num / wan).toFixed(2) * 1) + '万';
        } else if (num >= yi) {
          newNum = ((num / yi).toFixed(2) * 1) + '亿';
        }
        return newNum;
      },
      getTopData(){
        const textMap = {
          todayProductCount: '今日赋码产品数',
          todayLayer3Count: '今日赋码单标数',
          historyProductCount: '历史赋码产品数',
          historyBatchCount: '历史赋码应用批次总数',
          allCount: '生产装箱总赋码数'
        };
        this.cardsData = Object.keys(textMap).map(item => ({key: item, title: textMap[item], number: '0', realNumber: '0'}));
        this.$ajax.get(this.$globalData.get('logistics', 'apiUrl').codeNesting.GET_PRODUCTION_DATA_OVERVIEW).then((res) => {
          if (res.resultCode === '200') {
            this.cardsData = [];
            Object.keys(res.data).forEach(item => {
              const title = textMap[item] || '';
              const realNumber = res.data[item];
              const number = this.numberFormater(realNumber);
              this.cardsData.push({key: item, title, number, realNumber});
            });
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          error && this.$message.error(error);
        });
      },

      //-------  TOP xx产品生产数据
      isProductDataEmpty(data){
        return data.values[0].values.length === 0 && data.values[1].values.length === 0;
      },
      productDataLoadData(){
        return new Promise((resolve, reject) => {
          const typeMap = ['today', 'yesterday', 'month', 'lastMonth', 'year'];
          const type = typeMap[this.dateCheckProductDataActive];
          this.$ajax.get(this.codeNestingUrl.GET_TODAY_PRODUCT_DATA_LIST, {type, top: 10}).then((res) => {
            //res = JSON.parse('{"data":{"values":[{"option":{"name":"父级"},"values":[{"name":"虾条","value":6},{"name":"风衣","value":2},{"name":"鞋子333","value":2},{"name":"衬衣","value":1},{"name":"清洁球(活动产品)","value":3},{"name":"装箱规格","value":1},{"name":"123","value":1},{"name":"项链","value":1},{"name":"大袖子","value":1},{"name":"陕北白绒","value":1}]},{"option":{"name":"子级"},"values":[{"name":"虾条","value":37},{"name":"风衣","value":12},{"name":"鞋子333","value":11},{"name":"衬衣","value":6},{"name":"清洁球(活动产品)","value":3},{"name":"装箱规格","value":2},{"name":"123","value":2},{"name":"项链","value":2},{"name":"大袖子","value":1},{"name":"陕北白绒","value":1}]}],"option":{"name":"本月产品生产数据"}},"msgDetails":{"msgs":null},"resultCode":"200","msg":""}');
            if (res.resultCode === '200') {
              if (this.isProductDataEmpty(res.data)) {
                resolve(null);
              } else {
                resolve(res.data);
              }
            } else {
              reject(res.msg);
            }
          }).catch(reject);
        })
      },
      productDataGetOption(chartData){
        return new Promise((resolve) => {
          let data = Object.deepClone(chartData);
          const values = [];
          const parentData = data.values.find(item => item.option.name === '父级');
          const childData = data.values.find(item => item.option.name === '子级');
          parentData.values.forEach((item, index) => {
            values.push({option: {name: item.name}, values: [{name: 'parentCount', value: parentData.values[index].value}, {name: 'sonCount', value: childData.values[index].value}]});
          });
          data.values = values;
          //从小到大排序
          data.values.sort((item1, item2) => {
            const sonCount1 = item1.values.find(citem => citem.name === 'sonCount').value * 1 || 0;
            const parentCount1 = item1.values.find(citem => citem.name === 'parentCount').value * 1 || 0;
            const sonCount2 = item2.values.find(citem => citem.name === 'sonCount').value * 1 || 0;
            const parentCount2 = item2.values.find(citem => citem.name === 'parentCount').value * 1 || 0;
            if (sonCount1 + parentCount1 > sonCount2 + parentCount2) {
              return -1;
            }
            return 1;
          });
          //去掉0的数据
          data.values = data.values.filter(item => {
            const sonCount = item.values.find(citem => citem.name === 'sonCount').value * 1 || 0;
            const parentCount = item.values.find(citem => citem.name === 'parentCount').value * 1 || 0;
            return sonCount + parentCount > 0
          });
          //从大到小排序
          data.values.reverse();
          const productNames = data.values.map(item => {
            item.option.name = item.option.name + '';
            const nameLength = chartData.option.nameLength;
            return item.option.name.length > nameLength ? (item.option.name.substr(0, nameLength) + '...') : (item.option.name);
          });
          const parentCounts = data.values.map(item => (item.values.find(citem => citem.name === 'parentCount').value));
          const sonCounts = data.values.map(item => (item.values.find(citem => citem.name === 'sonCount').value));
          const series = [
            {name: '父级', stack: '总量', barWidth: 20, type: 'bar', data: parentCounts},
            {name: '子级', stack: '总量', barWidth: 20, type: 'bar', data: sonCounts}
          ];
          const tooltipFormatter = (params) => {
            const productName = data.values[params[0].dataIndex].option.name;
            const content = params.map(item => `${item.seriesName}/${item.value}`).join('&nbsp;&nbsp;&nbsp;');
            return `产品：<span class="col-21a0ff">${productName}</span><br/>数量：<span class="col-21a0ff">${content}</span>`;
          }
          const option = {
            tooltip: {trigger: 'axis', formatter: tooltipFormatter},
            legend: {data: [{name: '父级'}, {name: '子级'}]},
            grid: {left: '20', right: '80', top: '30', bottom: '10', containLabel: true},
            xAxis: {type: 'value', minInterval: 1},
            yAxis: {type: 'category', data: productNames},
            series: series
          };
          resolve(option);
        });
      },
      productDataStatusChange(newStatus){
        if (newStatus === 'ready') {
          this.isAllowProductDataExport = true;
        } else {
          this.isAllowProductDataExport = false;
        }
      },
      //----------- xx生产赋码数
      isSetCodeDataEmpty(data){
        let todayCount = 0;
        data.values.find(item => item.option.name === 'today').values.forEach(item => {
          todayCount += item.value;
        });
        return todayCount === 0;
      },
      setCodeDataLoadData(){
        return new Promise((resolve, reject) => {
          const typeMap = ['today', 'yesterday'];
          const type = typeMap[this.dateCheckSetCodeDataActive];
          this.setCodeDataRes.data = null;
          this.$ajax.get(this.codeNestingUrl.GET_TODAY_PRODUCTION_DATA, {type}).then((res) => {
            if (res.resultCode === '200') {
              //res.data = JSON.parse('{"values":[{"option":{"name":"today"},"values":[{"name":"单标数","value":1},{"name":"箱码数","value":2}]},{"option":{"name":"yesterday"},"values":[{"name":"单标数","value":3},{"name":"箱码数","value":4}]}],"option":{}}');
              const data = res.data;
              if (this.isSetCodeDataEmpty(data)) {
                resolve(null);
              } else {
                this.setCodeDataRes = {data};
                resolve(data.values.find(item => item.option.name === 'today'));
              }
            } else {
              reject(res.msg);
            }
          }).catch(reject)
        });
      },
      setCodeDataGetOption(chartData){
        return new Promise((resolve) => {
          let data = Object.deepClone(chartData);
          const todayLayer1 = data.values.find(item => item.name === '箱码数').value * 1 || 0;
          const todayLayer2 = data.values.find(item => item.name === '单标数').value * 1 || 0;
          const seriesData = [
            {value: todayLayer1, name: '箱码数'},
            {value: todayLayer2, name: '单标数'}
          ];
          const legendData = [{name: '箱码数'}, {name: '单标数'}];
          const tooltipFormatter = (params) => {
            return `${params.name}：<span class="col-21a0ff">${params.value}</span><br/>占比：<span class="col-21a0ff">${params.percent}%</span><br/>`;
          }
          const option = {
            tooltip: {formatter: tooltipFormatter},
            legend: {orient: 'vertical', left: 'right', top: 'bottom', align: 'left', data: legendData},
            series: [
              {type: 'pie', radius: ['70%', '90%'], data: seriesData}
            ]
          };
          resolve(option);
        });
      },
      //------------- 本周(本月)生产赋码情况
      isSetCodeSituationEmpty(chartData){
        const data = Object.deepClone(chartData.values);
        let totalCount = 0;
        data.forEach(item => item.values.forEach(citem => (totalCount += citem.value)));
        return totalCount === 0;
      },
      setCodeSituationLoadData(){
        return new Promise((resolve, reject) => {
          let pm;
          if (this.dateCheckSetCodeSituationActive === 0) { //本周
            pm = this.$ajax.get(this.codeNestingUrl.GET_WEEK_PRODUCTION_DATA_LIST);
          } else if (this.dateCheckSetCodeSituationActive === 1) { //本月
            pm = this.$ajax.get(this.codeNestingUrl.GET_MONTH_PRODUCTION_DATA_LIST);
          }
          pm.then((res) => {
            if (res.resultCode === '200') {
              if (this.isSetCodeSituationEmpty(res.data)) {
                resolve(null);
              } else {
                resolve(res.data);
              }
            } else {
              reject(res.msg);
            }
          }).catch(reject);
        });
      },
      setCodeSituationGetOption(chartData){
        return Promise.resolve({});
      },
      setCodeSituationStatusChange(newStatus){
        if (newStatus === 'ready') {
          this.isAllowSetCodeSituationExport = true;
        } else {
          this.isAllowSetCodeSituationExport = false;
        }
      },
      //------------- 年度生产赋码情况
      yearSetCodeSituationLoadData(){
        return new Promise((resolve, reject) => {
          this.$ajax.get(this.codeNestingUrl.GET_YEAR_PRODUCTION_DATA_LIST).then((res) => {
            if (res.resultCode === '200') {
              if (this.isSetCodeSituationEmpty(res.data)) {
                resolve(null);
              } else {
                resolve(res.data);
              }
            } else {
              reject(res.msg);
            }
          }).catch(reject);
        });
      },
      yearSetCodeSituationGetOption(chartData){
        return Promise.resolve({});
      },
      yearSetCodeSituationStatusChange(newStatus){
        if (newStatus === 'ready') {
          this.isAllowYearSetCodeSituationExport = true;
        } else {
          this.isAllowYearSetCodeSituationExport = false;
        }
      },
      //-------------------
      getWeeks(dtstr){ //获取传入日期的同个星期的日期 1234560
        const weeks = [];
        let dt = new Date(dtstr);
        while (dt.getDay() > 0) {
          dt = new Date(dt * 1 - 24 * 60 * 60 * 1000);
        }
        dt = new Date(dt * 1 + 24 * 60 * 60 * 1000);
        while (dt.getDay() > 0) {
          weeks.push(dt.toString('yyyy-MM-dd'));
          dt = new Date(dt * 1 + 24 * 60 * 60 * 1000);
        }
        weeks.push(dt.toString('yyyy-MM-dd'));
        return weeks;
      },
      getMonths(dtstr){ //获取传入日期的同个月份的日期
        const months = [];
        let dt = new Date(dtstr);
        const month = dt.getMonth();
        while (dt.getMonth() === month) {
          dt = new Date(dt * 1 - 24 * 60 * 60 * 1000);
        }
        dt = new Date(dt * 1 + 24 * 60 * 60 * 1000);
        while (dt.getMonth() === month) {
          months.push(dt.toString('yyyy-MM-dd'));
          dt = new Date(dt * 1 + 24 * 60 * 60 * 1000);
        }
        return months;
      },
      exportData(ref){
        let exportUrl = '';
        let param = {};
        if (ref === 'productData') {
          exportUrl = this.codeNestingUrl.PRODUCTION_DATA_EXPORT;
          const typeMap = ['today', 'yesterday', 'month', 'lastMonth', 'year'];
          param.type = typeMap[this.dateCheckProductDataActive];
        } else if (ref === 'setCodeSituation') {
          if (this.dateCheckSetCodeSituationActive === 0) { //本周
            exportUrl = this.codeNestingUrl.PRODUCTION_DATA_WEEK_LIST_EXPORT;
          } else if (this.dateCheckSetCodeSituationActive === 1) { //本月
            exportUrl = this.codeNestingUrl.PRODUCTION_DATA_MONTH_LIST_EXPORT;
          }
        } else if (ref === 'yearSetCodeSituation') {
          exportUrl = this.codeNestingUrl.PRODUCTION_DATA_YEAR_LIST_EXPORT;
        }
        exportUrl && fileDownload(exportUrl, param);
      }
    },
    mounted(){
      this.getTopData();
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .cjm-analysis-overview li {
    width: 25%;
  }

  .cjm-analysis-overview-title, .cjm-analysis-overview-value {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 20px;
  }
</style>

<style rel="stylesheet/less" lang="less">
  .nes-charts {
    font-size: 0;
    .nes-chart-box {
      float: none;
      display: inline-block;
      vertical-align: top;
    }
    .set-code-data-chart-inner {
      position: absolute;
      width: 200px;
      height: 200px;
      top: 50%;
      left: 50%;
      margin-top: -100px;
      margin-left: -100px;
      border-radius: 50%;
      overflow: hidden;
      text-align: center;
      font-size: 16px;
      color: #1f2d3d;
      z-index: 1;
    }
  }
</style>
