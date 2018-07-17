<template>
  <div ref="chart" class="chart"></div>
</template>
<script>
  import echarts from 'echarts';
  import resize from '@/mixins/resize';
  export default {
    mixins: [resize()],
    props: {
      options: Object
    },
    data(){
      return {
        chart: null
      };
    },
    methods: {
      render(){
        this.chart = echarts.init(this.$refs.chart);
        this.chart.setOption(this.options);
      },
      dispose(){
        if (this.chart) {
          this.chart.dispose();
          this.chart = null;
        }
      },
      onResize(){
        if (this.chart) {
          this.chart.resize();
        }
      }
    },
    mounted(){
      this.render();
    },
    beforeDestroy(){
      this.dispose();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .chart {
    height: 290px;
  }
</style>
