<template>
  <div v-bg-color="'none'">
    <cards-row>
      <index-card size="medium" style="width: 68.7%">
        <div :style="'height: '+leftHeight+'px'">
          <link-group>
            <link-item target="salesBill" :icon="nineIcons.xskd" text="销售开单"></link-item>
            <link-item target="purchaseApplication" :icon="nineIcons.thsq" text="进货申请"></link-item>
            <link-item target="stock" :icon="nineIcons.kc" text="库存"></link-item>
            <link-item target="cancBill" :icon="nineIcons.thdj" text="退货登记"></link-item>
            <link-item target="agriculturalStoreInfo" :icon="nineIcons.nzdxx" text="农资店信息"></link-item>
            <link-item target="farmersFiling" :icon="nineIcons.nhbacx" text="农户备案查询"></link-item>
            <link-item target="greenPesticide" :icon="nineIcons.lsnyml" text="绿色农药目录"></link-item>
            <link-item target="capitalAccount" :icon="nineIcons.zjzh" text="资金账户"></link-item>
            <link-item target="abandonedRecovery" :icon="nineIcons.fqwhs" text="废弃物回收"></link-item>
          </link-group>
        </div>
      </index-card>
      <div class="right-cards-group" ref="rightCardsGroup">
        <cards-row>
          <index-card size="large">
            <number-box :icon="userIcon" iconColor="#57c8f2" number="12" describe="今日客户数"></number-box>
          </index-card>
        </cards-row>

        <cards-row>
          <index-card size="large">
            <number-box :icon="moneyIcon" iconColor="#ff6c60" number="6832" describe="今日销售金额"></number-box>
          </index-card>
        </cards-row>

        <cards-row style="margin-bottom: 0">
          <index-card title="本月订货排行榜" size="large">
            <index-list :config="orderRankingConfig"></index-list>
          </index-card>
        </cards-row>
      </div>
    </cards-row>
  </div>
</template>
<script>
  import indexCard from '../components/card.vue';
  import cardsRow from '../components/cards-row.vue';
  import numberBox from '../components/number-box.vue';
  import indexList from '../components/list.vue';
  import linkGroup from './link-group.vue';
  import linkItem from './link.vue';
  //
  import userIcon from '@/assets/images/index/2.png';
  import moneyIcon from '@/assets/images/index/4.png';
  //
  import orderRankingData from './order-ranking.json';
  //9个图片
  import xskd from '../../../assets/images/index/xskd.png';
  import thsq from '../../../assets/images/index/thsq.png';
  import kc from '../../../assets/images/index/kc.png';
  import thdj from '../../../assets/images/index/thdj.png';
  import nzdxx from '../../../assets/images/index/nzdxx.png';
  import nhbacx from '../../../assets/images/index/nhbacx.png';
  import lsnyml from '../../../assets/images/index/lsnyml.png';
  import zjzh from '../../../assets/images/index/zjzh.png';
  import fqwhs from '../../../assets/images/index/fqwhs.png';
  //
  import resize from '@/mixins/resize';
  export default {
    components: {indexCard, cardsRow, numberBox, indexList, linkGroup, linkItem},
    data(){
      return {
        leftHeight: 0,
        userIcon, moneyIcon,
        nineIcons: {xskd, thsq, kc, thdj, nzdxx, nhbacx, lsnyml, zjzh, fqwhs}
      };
    },
    mixins: [resize()],
    computed: {
      orderRankingConfig(){
        return {
          tableStyle: {'table-layout': 'fixed'},
          columns: [
            {name: '排名', style: {width: '10%'}, key: 'index'},
            {name: '农药名称', style: {width: '35%'}, key: 'name'},
            {name: '登记证号', style: {width: '30%'}, key: 'number'},
            {name: '订货量（个）', key: 'count'}
          ],
          data: orderRankingData
        };
      }
    },
    methods: {
      onResize(){
        if (this.$refs.rightCardsGroup) {
          this.leftHeight = this.$refs.rightCardsGroup.offsetHeight;
        }
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .right-cards-group {
    width: 30%;
    display: inline-block;
    vertical-align: top;
    white-space: normal;
  }
</style>
