<template>
  <div class="cjm-data-card-wrap cjm-card-wrap" :class="[size]">
    <div class="cjm-data-card">
      <div class="cjm-data-card-head clear">
        <!--标题-->
        <span class="cjm-data-card-title">{{title}}</span>
        <!--右上角工具栏1-->
        <div v-if="!!$slots.toolbar" class="cjm-data-card-toolbar">
          <slot name="toolbar"></slot>
        </div>
      </div>
      <!--工具栏2  toolbarSupply-->
      <div v-if="!!$slots.toolbarSupply" class="cjm-data-card-toolbar-supply">
        <slot name="toolbarSupply"></slot>
      </div>
      <div class="cjm-data-card-content" :class="{'charts-content':hasCharts,'table-content':hasTable}">
        <!--echarts图表-->
        <div v-show="hasCharts" class="cjm-data-card-chart-wrap">
          <div ref="chartElem" class="cjm-data-card-chart"></div>
        </div>
        <!--表格-->
        <div v-show="hasTable" class="cjm-data-card-table-wrap">
          <cjm-table height="300" :data="tableData" class="cjm-data-card-table">
            <slot name="tableColumns"></slot>
          </cjm-table>
        </div>
        <div v-show="status==='loading'" v-loading="status==='loading'" element-loading-text="数据加载中..." class="cjm-data-card-cover cjm-data-card-loading">
          <div class="cover-inner" v-show="false">loading...</div>
        </div>
        <div v-show="status==='empty'" class="cjm-data-card-cover cjm-data-card-no-data cjm-img-nodata"></div>
        <div v-show="status==='error'" class="cjm-data-card-cover cjm-data-card-error cjm-img-error">
          <div v-show="false" class="cover-inner">{{ err ? err.toString() : 'error' }}</div>
        </div>
        <div v-show="!!$slots.default" class="cjm-data-card-default">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echartsUtil from 'framework/utils/echarts';
  export default {
    name: 'cjm-data-card',
    componentName: 'cjm-card',
    data(){
      return {
        status: 'loading', //卡片状态 可以是 error empty loading ready
        err: null,
        chart: null,
        tableData: []
      };
    },
    props: {
      size: {type: String, default: 'small'}, //卡片尺寸
      title: {type: String, default: ''}, //卡片标题
      hasCharts: {type: Boolean, default: true}, //是否包含图表
      hasTable: {type: Boolean, default: false}, //是否包含表格
      dataFactory: {type: Function, default: () => Promise.resolve(null)}, //data
      chartOptionFactory: {type: Function, default: (data) => Promise.resolve({})}, //图表option
      chartDataFormatter: {type: Function, default: (data) => Promise.resolve(data)}, //图表data转换函数
      chartType: {type: String, default: 'custom'}, //图表类型
      tableDataFormatter: {
        type: Function,
        default: (data) => Promise.resolve(data.constructor === Array ? data : [data])
      } //表格data转换函数
    },
    methods: {
      chartDestroy(){
        if (this.chart) {
          this.chart.dispose();
          this.chart = null;
        }
      },
      renderChart(data){
        return new Promise((resolve, reject) => {
          if (this.hasCharts) {
            const dataPromise = this.chartDataFormatter(data);
            const optionPromise = this.chartOptionFactory(data);
            Promise.all([dataPromise, optionPromise]).then((args) => {
              const chartData = args[0];
              const chartOption = args[1];
              this.chartDestroy();
              echartsUtil.init(this.$refs.chartElem, this.chartType, chartData, chartOption).then((chartIns) => {
                this.chart = chartIns;
                this.$emit('chartReady', {chart: this.chart});
                resolve();
              }).catch(reject);
            }).catch(reject)
          } else {
            resolve();
          }
        })
      },
      renderTable(data){
        return new Promise((resolve, reject) => {
          if (this.hasTable) {
            this.tableDataFormatter(data).then((tableData) => {
              this.tableData = tableData;
              resolve();
            }).catch(reject);
          } else {
            resolve();
          }
        });
      },
      refresh(){
        this.setStatus('loading');
        this.dataFactory().then((newData) => {
          if (newData === null || newData === undefined || newData.length === 0) {
            this.setStatus('empty');
          } else {
            Promise.all([this.renderChart(newData), this.renderTable(newData)]).then(() => {
              this.setStatus('ready');
            }).catch((err) => {
              this.err = err;
              this.setStatus('error');
              throw err;
            });
          }
        }).catch((err) => {
          this.err = err;
          this.setStatus('error');
          throw err;
        });
      },
      setStatus(newStatus){
        if (this.status !== newStatus) {
          this.status = newStatus;
          this.$emit('statusChanged', newStatus);
        }
      }
    },
    mounted(){
      this.refresh();
      this.$on('cardResize', () => {
        this.$nextTick(() => {
          this.chart && this.chart.resize();
          this.$emit('resize', {width: this.$el.clientWidth - 20, chart: this.chart});
        })
      });
    },
    destroyed(){
      this.chartDestroy();
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../../../assets/css/config";

  .cjm-data-card-wrap {
    box-sizing: border-box;
    padding: 30px 0 20px 20px;
    float: left;
    height: auto;
    border-top: 1px solid @LightGray;
  }

  .cjm-data-card-toolbar {
    float: right;
    margin-right: 20px;
  }

  .cjm-data-card {
    width: 100%;
    height: 100%;
    background: #fff;
    border-top: 0;
    border-radius: 0;
    box-shadow: none;
    border-right: 1px solid @LightGray;
  }

  .cjm-data-card-head {
    font-size: 18px;
    color: #1f2d3d;
    font-weight: bold;
    border-bottom: none;
    padding-left: 0;
  }

  .cjm-data-card-content {
    position: relative;
    margin-top: 5px;
    height: 300px;
  }

  .cjm-data-card-chart-wrap, .cjm-data-card-table-wrap, .cjm-data-card-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%
  }

  .cjm-data-card-content {
    &.charts-content.table-content {
      .cjm-data-card-chart-wrap {
        width: 43%;
      }
      .cjm-data-card-table-wrap {
        width: 56%;
        left: 44%;
      }
    }
  }

  .cjm-data-card-chart {
    height: 100%;
  }

  .cjm-data-card-cover {
    text-align: center;
    background-color: #fff;
    color: #000;
    z-index: 2;
    line-height: 300px;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center center;
  }

  .cjm-data-card-loading {
    cursor: wait;
    line-height: normal;
  }
</style>
