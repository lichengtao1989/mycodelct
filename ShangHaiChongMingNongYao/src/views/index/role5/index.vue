<template>
  <div v-bg-color="'none'">
    <cards-row>
      <index-card size="large">
        <div class="left-number-wrap">
          <number-box :icon="icon" iconColor="#6ccac9" number="124435.00" describe="今日收入（元）"></number-box>
        </div>
        <ul class="right-number-wrap">
          <li>
            <number-content number="162" describe="今日订单数"></number-content>
          </li>
          <li>
            <number-content number="860" describe="今日发货商品数（个）"></number-content>
          </li>
          <li>
            <number-content number="1200" describe="全区农资店数"></number-content>
          </li>
          <li>
            <number-content number="1630" describe="备案农药数（SKU）"></number-content>
          </li>
          <li>
            <number-content number="6800000" describe="库存价值金额（元）"></number-content>
          </li>
        </ul>
      </index-card>
    </cards-row>

    <cards-row>
      <index-card size="large" title="待发货订单" status="warn">
        <index-list :config="orderConfig"></index-list>
      </index-card>
    </cards-row>

    <cards-row>
      <index-card size="normal" title="库存预警">
        <index-list :config="stockConfig"></index-list>
      </index-card>

      <index-card title="本月订货排行榜">
        <index-list :config="orderRankingConfig"></index-list>
      </index-card>

      <index-card title="近30天病虫害防治排行榜">
        <index-list :config="diseasesRankingConfig"></index-list>
      </index-card>
    </cards-row>
  </div>
</template>
<script>
  import indexCard from '../components/card.vue';
  import cardsRow from '../components/cards-row.vue';
  import indexList from '../components/list.vue';
  import numberBox from '../components/number-box.vue';
  import numberContent from '../components/number-content.vue';
  //
  import orderOperation from './order-operation.vue';
  import stockOperation from './stock-operation.vue'
  //
  import orderData from './order.json';
  import stockData from './stock.json';
  import orderRankingData from './order-ranking.json';
  import diseasesRankingData from './diseases-ranking.json';
  //
  import icon from '@/assets/images/index/1.png';
  export default {
    components: {indexCard, cardsRow, indexList, numberBox, numberContent},
    data(){
      return {
        icon
      };
    },
    computed: {
      //待发货订单
      orderConfig(){
        return {
          columns: [
            {name: '订单号', key: 'number'},
            {name: '乡镇', key: 'Town'},
            {name: '农资店', key: 'StoreName'},
            {name: '负责人', key: 'ChargePerson'},
            {name: '联系电话', key: 'PhoneNum'},
            {name: '下单时间', key: 'CreateTime'},
            {name: '订单状态', render: this.orderStatusRender, key: 'status'},
            {name: '操作', component: orderOperation, key: 'operation'}
          ],
          data: orderData
        };
      },
      //库存预警
      stockConfig(){
        return {
          columns: [
            {name: '序号', key: 'index'},
            {name: '预警类型', style: {color: '#fc9b1e'}, render: this.warnTypeRender, key: 'type'},
            {name: '农药名称', key: 'name'},
            {name: '预警来源', key: 'source'},
            {name: '提醒时间', key: 'createTime'},
            {name: '操作', component: stockOperation, key: 'operation'}
          ],
          data: stockData
        };
      },
      //本月订货排行榜
      orderRankingConfig(){
        return {
          columns: [
            {name: '排名', key: 'index'},
            {name: '农药名称', key: 'name'},
            {name: '登记证号', key: 'number'},
            {name: '订货量（个）', key: 'count'}
          ],
          data: orderRankingData
        };
      },
      //近30天病虫害防治排行榜
      diseasesRankingConfig(){
        return {
          columns: [
            {name: '排名', key: 'index'},
            {name: '作物类型', key: 'type'},
            {name: '病虫害', key: 'name'}
          ],
          data: diseasesRankingData
        };
      }
    },
    methods: {
      warnTypeRender(col){
        return `<i class="nz-icon-insufficient" style="margin-right: 3px"></i>${col.type}`;
      },
      orderStatusRender(col){
        return '<i class="warn-dot"></i>待发货';
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .left-number-wrap {
    width: 24%;
    height: 100%;
  }

  .right-number-wrap {
    position: absolute;
    width: 76%;
    height: 100%;
    right: 0;
    top: 0;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    font-size: 0;
    li {
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: top;
      width: 20%;
      height: 100%;
      border-left: 1px solid #ededed;
    }
  }
</style>
