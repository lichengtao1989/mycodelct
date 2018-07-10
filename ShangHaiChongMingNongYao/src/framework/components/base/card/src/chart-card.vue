<template>
  <transition name="nz-normal-card-wrap">
    <!--卡片包裹容器-->
    <div class="nz-normal-card-wrap nz-chart-card-wrap nz-card-wrap"
         :class="[size]" v-if="editable || visible">
      <nz-card-inside :title="title"
                       :sub-title="subTitle"
                       :editable="editable"
                       :status="status"
                       :visible="visible"
                       :head-operates="headOperates"
                       @visibleChange="visibleChange">
        <slot>
          <div ref="chart" style="height: 100%;"></div>
        </slot>
        <template slot="bottomRightOperate">
          <slot name="operate"></slot>
        </template>
      </nz-card-inside>
    </div>
  </transition>
</template>

<script>
  import Card from './card.vue'
  import echartsUtil from 'framework/utils/echarts'
  export default {
    name: 'nz-chart-card',
    componentName: 'nz-card',
    mixins: [Card],
    props: {
      /**
       * 图表类型，可选项pie、bar、line、map、custom
       */
      chartType: {
        type: String,
        required: true
      },
      /**
       * 数据
       */
      data: {
        required: true
      },
      /**
       * 自定义图表选项
       */
      option: Object
    },
    data(){
      return {
        chart: null
      }
    },
    watch: {
      data: function (val) {
        this.$nextTick(()=> {
          this.chartInit();
        });
      }
    },
    methods: {
      //图表初始化
      chartInit(){
        this.chartDestroy();
        if(!this.data){
          return;
        }
        echartsUtil.init(this.$refs.chart, this.chartType, this.data, this.option).then(chart=> {
          this.chart = chart;
        }).catch((error)=> {
          if(error.code == 603){
            this.$emit('update:status', 'empty');
          } else {
            this.$emit('update:status', 'error');
          }
        });
      },
      chartDestroy(){
        if (this.chart) {
          this.chart.dispose();
          this.chart = null;
        }
      }
    },
    mounted(){
      this.chartInit();
    },
    created () {
      let timer;
      this.$on('cardResize', () => {
        if(timer){
          clearTimeout(timer);
        }
        timer = setTimeout(()=> {
          if (this.chart) {
            this.chart.resize({width: this.getContentWidth()});
          }
        }, 150);
      });
    },
    destroyed(){
      this.chartDestroy();
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  @import "../../../../assets/css/config";

  @cardColor:#5fbaff;

  .nz-chart-card-wrap .nz-card {
    border-top-color: @cardColor;

    .nz-card-head-title-main:before {
      background: @cardColor;
    }
  }
</style>
