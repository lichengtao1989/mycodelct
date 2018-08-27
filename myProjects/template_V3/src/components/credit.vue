<template>
  <div class="model" v-show="showflag">
    <!--  -->
    <div class="boxinner">
      <div class="guanbi" @click="closeFn"></div>
      <div class="biaos">
        <div class="biao">
          <ve-radar :data="chartData" width="280px" height="280px"></ve-radar>
        </div>
        <div class="po1">
          <div class="fsval">9.2</div>
          <div class="ms">舆情得分</div>
        </div>
        <div class="po2">
          <div class="fsval">9.2</div>
          <div class="ms">基础档案得分</div>
        </div>
        <div class="po3">
          <div class="fsval">9.2</div>
          <div class="ms">质量控制得分</div>
        </div>
      </div>
      <div class="zhdf">
        <div class="zhval">9.2</div>
        <div class="msv">农安信用综合得分</div>
      </div>
    </div>
  </div>
</template>

<script>
import veRadar from 'v-charts/lib/radar.common.js';
export default {
  props: {
    flag: {
      type: Number,
      default: null
    }
  },
  components: {
    veRadar
  },
  computed: {
    showflag: function() {
      if (this.flag == 1) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    closeFn() {
      this.$emit('close');
    }
  },
  data() {
    return {
      chartData: {
        label: {
          positon: 'top'
        },
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [{ 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 }, { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 }, { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 }]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/style/_var.scss';
@import "../assets/style/util.scss";
$base: 75;
.model {
    .biao {
      @include p_center;
    }
    .biaos {
      height: 520rem / $base;
      @include pr;
      .po1,
      .po2,
      .po3 {
        @include po;
        @include te;
        @include none;
      }
      .ms {
        @include fo(26rem / $base);
        @include co(#aaa);
        padding-top: 16rem / $base;
      }
      .po1 {
        top: 0;
        @include l50;
        .fsval {
          @include fo(28rem / $base);
          @include co(#1fa0fb);
        }
      }
      .po2 {
        bottom: 26rem / $base;
        left: 30rem / $base;
        .fsval {
          @include fo(28rem / $base);
          @include co(#f04c67);
        }
      }
      .po3 {
        bottom: 26rem / $base;
        right: 30rem / $base;
        .fsval {
          @include fo(28rem / $base);
          @include co(#75c959);
        }
      }
    }
    .zhdf {
      @include te;
      @include fo(28rem / $base);
      @include co(#aaa);
      .zhval {
        @include co(#75c959);
        @include fo(34rem / $base);
        font-weight: bold;
        padding-bottom: 18rem / $base;
      }
    }
  }
</style>
