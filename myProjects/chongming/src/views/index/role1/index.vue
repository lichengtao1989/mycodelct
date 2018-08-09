<template>
  <div v-bg-color="'none'">
    <cards-row>
      <index-card>
        <number-box :icon="icon[0]" iconColor="#6ccac9" number="132" describe="农资店数量"></number-box>
      </index-card>

      <index-card>
        <number-box :icon="icon[1]" iconColor="#57c8f2" number="5363" describe="农户主体数量"></number-box>
      </index-card>

      <index-card>
        <number-box :icon="icon[2]" iconColor="#99d37a" number="98" describe="绿色农药数"></number-box>
      </index-card>

      <index-card>
        <number-box :icon="icon[3]" iconColor="#ff6c60" number="12,664,409.50" describe="补贴总金额"></number-box>
      </index-card>
    </cards-row>

    <cards-row>
      <index-card size="large" title="农户主体分布情况">
        <index-chart :options="chartOptions"></index-chart>
      </index-card>
    </cards-row>

    <cards-row>
      <index-card title="近30天病虫害防治排行榜">
        <index-list :config="leftConfig"></index-list>
      </index-card>

      <index-card size="medium" title="废弃物回收预警">
        <index-list :config="rightConfig"></index-list>
      </index-card>
    </cards-row>
  </div>
</template>
<script>
  import indexCard from '../components/card.vue';
  import numberBox from '../components/number-box.vue';
  import indexList from '../components/list.vue';
  import indexChart from '../components/chart.vue';
  import cardsRow from '../components/cards-row.vue';
  //
  import icon1 from '@/assets/images/index/1.png';
  import icon2 from '@/assets/images/index/2.png';
  import icon3 from '@/assets/images/index/3.png';
  import icon4 from '@/assets/images/index/4.png';
  //
  import leftData from './left.json';
  import rightData from './right.json';
  export default {
    components: {indexCard, numberBox, indexList, indexChart, cardsRow},
    data(){
      return {
        icon: [icon1, icon2, icon3, icon4]
      }
    },
    computed: {
      leftConfig(){
        return {
          columns: [
            {name: '排名', style: {textAlign: 'center'}, key: 'ranking'},
            {name: '作物类型', key: 'corpType'},
            {name: '病虫害', key: 'diseases'}
          ], data: leftData
        };
      },
      rightConfig(){
        return {
          columns: [
            {name: '序号', style: {textAlign: 'center'}, key: 'index'},
            {name: '预警类型', style: {color: '#fc9b1e'}, render: this.warnTypeRender, key: 'warnType'},
            {name: '来源', key: 'source'},
            {name: '回收点', key: 'recovery'},
            {name: '日期', key: 'date'},
            {name: '操作', style: {color: '#00a88a', cursor: 'pointer'}, key: 'operation'}
          ], data: rightData
        };
      },
      chartOptions(){
        return {
          color: ['#44ba84'],
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            containLabel: true,
            /*left: '10%',
            right: '10%',*/
            top: '10%',
            bottom: '10%'
          },
          xAxis: {
            type: 'category',
            axisLabel: {interval: 0, rotate: 40},
            axisTick: {
              alignWithLabel: true
            },
            data: ['长兴镇', '绿华镇', '横沙乡', '三星镇', '庙镇', '港沿镇', '竖新镇', '新河镇', '堡镇', '城桥镇', '陈家镇', '建设镇', '港西镇', '新村乡', '向化镇', '中兴镇', '东平镇', '前卫']
          },
          yAxis: {type: 'value'},
          series: [{
            name: '销量',
            type: 'bar',
            data: [2579, 1689, 304, 301, 149, 57, 52, 42, 41, 39, 30, 26, 22, 14, 10, 5, 2, 1]
          }]
        };
      }
    },
    methods: {
      warnTypeRender(col){
        return `<i class="nz-icon-insufficient" style="margin-right: 3px"></i>${col.warnType}`;
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .chart {
    height: 280px;
  }
</style>
