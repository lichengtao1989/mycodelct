<template>
  <div>
    <cjm-date-range-quick-picker v-model="searchTime"></cjm-date-range-quick-picker>
    <ul class="cjm-analysis-overview" v-model="analysisData" :class="{government: isGovernment}">
      <li>
        <div class="cjm-analysis-overview-title">企业生码总量</div>
        <div class="cjm-analysis-overview-value">{{analysisData.codeCount}}</div>
      </li>
      <li>
        <div class="cjm-analysis-overview-title">码关联总量</div>
        <div class="cjm-analysis-overview-value">{{analysisData.codeRelationCount}}</div>
      </li>
      <li>
        <div class="cjm-analysis-overview-title">码使用率</div>
        <div class="cjm-analysis-overview-value"> {{analysisData.codeScanRate}}</div>
      </li>
      <li v-if="isGovernment">
        <div class="cjm-analysis-overview-title">码关联企业总量</div>
        <div class="cjm-analysis-overview-value">{{analysisData.codeRelationCorpCount}}</div>
      </li>
      <li>
        <div class="cjm-analysis-overview-title">码关联产品总量</div>
        <div class="cjm-analysis-overview-value">{{analysisData.codeRelationProductCount}}</div>
      </li>
    </ul>
    <cjm-cards>
      <!--111-->
      <cjm-data-card :data-factory="loadOrgData" :chart-option-factory="orgChartOptionFormatter" :chart-data-formatter="orgChartDataFormatter" :table-data-formatter="orgTableDataFormatter" v-if="isGovernment" ref="org" title="码关联企业统计图" size="large" :has-table="true" chart-type="bar">
        <div slot="toolbar">
          <cjm-button @click="codeRelationExport" type="primary" class="exportData">
            <i class="cjm-icon-export"></i>导出
          </cjm-button>
        </div>
        <div slot="tableColumns">
          <cjm-table-column prop="no" label="排名" align="center"></cjm-table-column>
          <cjm-table-column prop="orgName" label="企业" align="center"></cjm-table-column>
          <cjm-table-column prop="count" label="数量" align="center"></cjm-table-column>
        </div>
      </cjm-data-card>
      <!--222-->
      <cjm-data-card :data-factory="loadRateData" :chart-option-factory="rateChartOptionFormatter" :chart-data-formatter="rateChartDataFormatter" :table-data-formatter="rateTableDataFormatter" v-if="isGovernment" ref="rate" title="码使用率统计图" size="large" :has-table="true" chart-type="bar">
        <div slot="toolbar">
          <cjm-button @click="codeScanRateExport" type="primary" class="exportData">
            <i class="cjm-icon-export"></i>导出
          </cjm-button>
        </div>
        <div slot="tableColumns">
          <cjm-table-column prop="no" label="排名" align="center"></cjm-table-column>
          <cjm-table-column prop="orgName" label="企业" align="center"></cjm-table-column>
          <cjm-table-column prop="rate" label="码使用率" align="center"></cjm-table-column>
        </div>
      </cjm-data-card>
      <!--333-->
      <cjm-data-card :data-factory="loadProductData" :chart-option-factory="productChartOptionFormatter" :chart-data-formatter="productChartDataFormatter" :table-data-formatter="productTableDataFormatter" title="码关联产品统计图" ref="product" size="large" :has-table="true" chart-type="bar">
        <div slot="toolbar">
          <cjm-button @click="codeRelationProductExport" type="primary" class="exportData">
            <i class="cjm-icon-export"></i>导出
          </cjm-button>
        </div>
        <div slot="tableColumns">
          <cjm-table-column prop="no" label="排名" align="center"></cjm-table-column>
          <cjm-table-column prop="orgName" v-if="isGovernment" label="所属企业" align="center"></cjm-table-column>
          <cjm-table-column prop="productName" label="产品" align="center"></cjm-table-column>
          <cjm-table-column prop="count" label="数量" align="center"></cjm-table-column>
        </div>
      </cjm-data-card>
    </cjm-cards>
  </div>
</template>
<script>
  import CjmDateRangeQuickPicker from 'framework/components/base/date-range-quick-picker';
  import CjmCards from 'framework/components/base/cards';
  import CjmDataCard from 'framework/components/base/data-card';
  import fileDownload from 'framework/utils/fileDownload';
  export default {
    components: {
      CjmDataCard,
      CjmCards,
      CjmDateRangeQuickPicker
    },
    data(){
      const now = new Date();
      const dayMilliseconds = 24 * 60 * 60 * 1000; //一天的毫秒数
      const day30 = (new Date(now - 30 * dayMilliseconds)).toString('yyyy/MM/dd');
      const dayNow = now.toString('yyyy/MM/dd');
      let searchTime = `${day30} ~ ${dayNow}`;
      const codeUrls = this.$globalData.get('code', 'apiUrl').codeRelationStatistics;
      return {
        codeUrls,
        searchTime,
        analysisData: {}
      };
    },
    watch: {
      searchTime: function () {
        this.loadDatas();
      }
    },
    computed: {
      isGovernment(){
        return this.$globalData.get('currentUser').corpType == this.$globalData.get('code', 'enums').corpType.GOVERNMENT;
      }
    },
    methods: {
      loadDatas(){
        this.loadAnalysisData();
        this.dataCardsRefresh();
      },
      //加载头部数据
      loadAnalysisData(){
        this.$ajax.get(this.codeUrls.GET_CODE_STATISTICS_GENERAL, {'searchTime': this.searchTime}).then((r) => {
          this.analysisData = r.data;
        });
      },
      //刷新卡片
      dataCardsRefresh(){
        if (this.isGovernment) {
          this.$refs.org.refresh();
          this.$refs.rate.refresh();
        }
        this.$refs.product.refresh();
      },
      formatName(name){
        if (name.length > 3) {
          return name.substring(0, 3) + '...'
        } else {
          return name
        }
      },
      dataFormater(chartData){
        const newChartData = {option: chartData.option, values: []};
        chartData.values.forEach((item, index) => {
          if (index < 9) {
            newChartData.values.push(item);
          } else if (index === 9) {
            newChartData.values.push({name: '其它', value: item.value});
          } else {
            newChartData.values[9].value = (newChartData.values[9].value * 1 + item.value * 1).toFixed(2) * 1;
          }
        });
        return newChartData;
      },
      optionsFormatter(chartData){
        const names = chartData.values.map(item => item.name);
        const values = chartData.values.map(item => item.value);
        return {
          tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
          legend: {top: '5%', right: '5%', itemWidth: 13, itemHeight: 13},
          grid: {left: '3%', right: '4%', bottom: '8%', containLabel: true},
          xAxis: [{type: 'category', axisLabel: {rotate: 45, formatter: name => this.formatName(name)}, data: names}],
          yAxis: [{type: 'value'}],
          series: [{
            name: '码关联', type: 'bar', barWidth: 19, data: values,
            itemStyle: {
              normal: {
                color: (params) => {
                  var colorList = this.$globalData.get('appConfig').chartColors;
                  return colorList[params.dataIndex]
                }
              }
            },
            markLine: {lineStyle: {normal: {type: 'dashed'}}, data: [[{type: 'min'}, {type: 'max'}]]}
          }]
        }
      },
      //111
      loadOrgData(){
        return new Promise((resolve, reject) => {
          this.$ajax.get(this.codeUrls.GET_CODE_RELATION_CORP_LIST_CHART, {'searchTime': this.searchTime}).then((res) => {
            if (res.resultCode === '200') {
              if (res.data.values.length === 0) {
                resolve(null);
              } else {
                res.data = this.dataFormater(res.data);
                resolve(res.data);
              }
            } else {
              reject(new CjmError(res.msg));
            }
          }).catch((err) => {
            reject(err);
          });
        });
      },
      orgChartDataFormatter(orgData){
        return Promise.resolve(orgData);
      },
      orgChartOptionFormatter(orgData){
        return new Promise(resolve => {
          resolve(this.optionsFormatter(orgData));
        });
      },
      orgTableDataFormatter(orgData){
        return new Promise((resolve, reject) => {
          this.$ajax.get(this.codeUrls.GET_CODE_RELATION_CORP_LIST, {'searchTime': this.searchTime}).then((res) => {
            if (res.resultCode === '200') {
              resolve(res.data.rows);
            } else {
              reject(new CjmError(res.msg));
            }
          }).catch((err) => {
            reject(err);
          });
        });
      },
      //222
      loadRateData(){
        return new Promise((resolve, reject) => {
          this.$ajax.get(this.codeUrls.GET_CODE_SCAN_RATE_LIST_CHART, {'searchTime': this.searchTime}).then((res) => {
            if (res.resultCode === '200') {
              if (res.data.values.length === 0) {
                resolve(null);
              } else {
                res.data = this.dataFormater(res.data);
                resolve(res.data);
              }
            } else {
              reject(new CjmError(res.msg));
            }
          }).catch((err) => {
            reject(err);
          });
        });
      },
      rateChartDataFormatter(rateData){
        return Promise.resolve(rateData);
      },
      rateChartOptionFormatter(rateData){
        return new Promise(resolve => {
          resolve(this.optionsFormatter(rateData));
        });
      },
      rateTableDataFormatter(rateData){
        return new Promise((resolve, reject) => {
          this.$ajax.get(this.codeUrls.GET_CODE_SCAN_RATE_LIST, {'searchTime': this.searchTime}).then((res) => {
            if (res.resultCode === '200') {
              resolve(res.data.rows);
            } else {
              reject(new CjmError(res.msg));
            }
          }).catch((err) => {
            reject(err);
          });
        });
      },
      //333
      loadProductData(){
        return new Promise((resolve, reject) => {
          this.$ajax.get(this.codeUrls.GET_CODE_RELATION_PRODUCT_LIST_CHART, {'searchTime': this.searchTime}).then((res) => {
            if (res.resultCode === '200') {
              if (res.data.values.length === 0) {
                resolve(null);
              } else {
                res.data = this.dataFormater(res.data);
                resolve(res.data);
              }
            } else {
              reject(new CjmError(res.msg));
            }
          }).catch((err) => {
            reject(err);
          });
        });
      },
      productChartDataFormatter(productData){
        return Promise.resolve(productData);
      },
      productChartOptionFormatter(productData){
        return new Promise(resolve => {
          resolve(this.optionsFormatter(productData));
        });
      },
      productTableDataFormatter(productData){
        return new Promise((resolve, reject) => {
          this.$ajax.get(this.codeUrls.GET_CODE_RELATION_PRODUCT_LIST, {'searchTime': this.searchTime}).then((res) => {
            if (res.resultCode === '200') {
              resolve(res.data.rows);
            } else {
              reject(new CjmError(res.msg));
            }
          }).catch((err) => {
            reject(err);
          });
        });
      },
      //
      codeRelationExport(){
        fileDownload(this.$globalData.get('code', 'apiUrl').codeRelationStatistics.EXPORT_CODE_RELATION_CORP, {'searchTime': this.searchTime});
      },
      codeScanRateExport(){
        fileDownload(this.$globalData.get('code', 'apiUrl').codeRelationStatistics.EXPORT_CODE_SCAN_RATE, {'searchTime': this.searchTime});
      },
      codeRelationProductExport(){
        fileDownload(this.$globalData.get('code', 'apiUrl').codeRelationStatistics.EXPORT_CODE_RELATION_PRODUCT, {'searchTime': this.searchTime});
      }
    },
    mounted(){
      this.loadAnalysisData();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .cjm-analysis-overview {
    margin-top: 10px;
  }
</style>
