<template>
  <div class="shoppingmall">
    <div class="wrap">
      <trace-map></trace-map>
      <rightgoods></rightgoods>
    </div>
    <div class="originsout">
      <div class="lxwm">点击购买</div>
      <div class="traceoutpart">
        <div class="cardlist">
          <productitem :listInfoAry="listInfoAry"></productitem>
        </div>
        <div class="zydp">
          <div class="dpp lxwm">企业自营店铺</div>
          <div class="dpp2" @click="clickFn">
            <div class="dp1 dp">
              <img src="../../../static/images/taobao.png" alt="">
              <div class="dpt">淘宝</div>
            </div>
            <div class="dp2 dp">
              <img src="../../../static/images/jd.png" alt="">
              <div class="dpt">京东</div>
            </div>
            <div class="dp3 dp">
              <img src="../../../static/images/weidian.jpg" alt="">
              <div class="dpt">微店</div>
            </div>
          </div>
        </div>
        <div class="page" v-if="total>0?true:false">
          <v-page :setting="pageSet" @page-change="pageChange"></v-page>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import apiList from '@/api/api';
import egoods from '@/api/egoods';
import traceMap from './trace-map.vue';
import rightgoods from './rightgoods';
import productitem from './productitem';
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      listInfoAry: [],
      total: '',

      pageSet: {}
    };
  },
  components: {
    productitem,
    traceMap,
    rightgoods
  },
  methods: {
    clickFn() {
      alert('暂无店铺');
    },
    pageChange(pInfo) {
      let queryObj = {
        pageSize: pInfo.pageSize,
        pageNum: pInfo.pageNumber,
        ProductType: 2
      };
      egoods(apiList.product, queryObj).then(res => {
        if (res.ResultCode == 200) {
          this.listInfoAry = res.Data.List;
        }
      });
    }
  },
  created() {},
  mounted() {
    let query = {
      pageSize: 8,
      pageNum: 1,
      ProductType: 2
    };
    egoods(apiList.product, query).then(res => {
      if (res.ResultCode == 200) {
        this.listInfoAry = res.Data.List;
        this.total = res.Data.Total;
        this.pageSet = {
          align: 'center',
          totalRow: res.Data.Total, //required option
          language: 'cn', //default: 'cn'
          pageSizeMenu: [8, 24, 36, 48, 60, 100] //default: [10, 20, 50, 100]
        };
      }
    });
  }
};
</script>

<style lang="scss" scoped="" type="text/css">
@import 'static/style/_var.scss';
.lxwm {
  @include fo(16px);
  @include co(#128f40);
  padding: 9px 0 9px 19px;
}
.wrap {
  @include pr;
  height: 773px;
  margin-top: 10px;
  border: 1px solid #128f40;
}
.originsout {
  border: 1px solid #128f40;
  padding-bottom: 30px;
}
.dpp2 {
  padding-left: 19px;
  margin-bottom: 20px;
}
.dp {
  @include te;
  margin-right: 9px;
  @include inline;
  cursor: pointer;
}
</style>
