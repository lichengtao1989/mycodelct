<template>
  <div class="model" v-show="showflag">
    <div class="boxinner">
      <div class="guanbi" @click="closeFn"></div>
      <div class="boxwrap" v-for="item in poorInfo">
        <div class="topt">基本信息</div>
        <div class="nextwrap">
          <div class="iline">
            <div class="ileft">户主</div>
            <div class="iright">{{item.PoorList.Name}}</div>
          </div>
          <div class="iline">
            <div class="ileft">家庭人口</div>
            <div class="iright">{{item.PoorList.FamilyNumber}}</div>
          </div>
          <div class="iline">
            <div class="ileft">所在地</div>
            <div class="iright">{{item.PoorList.Address}}</div>
          </div>
          <div class="iline">
            <div class="ileft">贫困类型</div>
            <div class="iright">{{item.PoorList.PoorType}}</div>
          </div>
          <div class="iline">
            <div class="ileft">帮扶企业</div>
            <div class="iright">{{item.PoorList.OrgName}}</div>
          </div>
          <div class="iline">
            <div class="ileft">产品</div>
            <div class="iright">{{item.PoorList.ProductName}}</div>
          </div>
          <div class="iline">
            <div class="ileft">脱贫状态</div>
            <div class="iright">{{item.PoorList.PovertySituation}}</div>
          </div>
        </div>
        <!--<div class="tuopin">-->
          <!--脱贫进度-->
        <!--</div>-->
        <!--<div class="jdsm">-->
          <!--<div class="jdl">扶贫指标:<span class="fpzb">3750.0</span></div>-->
          <!--<div class="jdlr">缺口:<span class="fpzb">750.0</span></div>-->
        <!--</div>-->
        <!--<div class="jdt">-->
          <!--<div class="jdtinner"></div>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  const PoorType = {
    '1': '扶贫户',
    '2': '低保户',
    '3': '扶贫低保户',
    '4': '五保户',
    '5': '一般贫困户',
    '6': '建档立卡',
    '7': '一般农户'
  }
  const PovertySituation = {
    '0': '未脱贫',
    '1': '已脱贫',
    '2': '返贫'
  }
  export default {
    props: {
      flag: {
        type: [Number, String],
        default: ""
      }
    },
    computed: {
      showflag: function () {
        if (this.flag == 1) {
          return false;
        } else {
          return true;
        }
      },
      poorInfo() {
        let arr = [];
        if (this.$store.state.poorInfo && this.$store.state.poorInfo.PoorList.constructor === Object) {
            arr.push({'PoorList': this.$store.state.poorInfo});
          } else {
            arr = this.$store.state.poorInfo.PoorList
          }
          arr.map((item, index)=>{
            item.PoorList.PoorType = PoorType[item.PoorList.PoorType]
            item.PoorList.PovertySituation = PovertySituation[item.PoorList.PovertySituation]
          })
          return arr;
        }

    },
    methods: {
      closeFn() {
        this.$emit("closeFp");
      }
    },
    data: function () {
      return {};
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/style/_var.scss";
  @import "../assets/style/util.scss";
  $base: 75;
  .model {
    .boxinner {
      .topt {
        padding-bottom: 25rem / $base;
        border-bottom: 1px solid #ddd;
      }
      .nextwrap {
        padding-top: 24rem / $base;
        @include fo(26rem / $base);
        .iline {
          @include ov;
          padding-bottom: 19rem / $base;
          .ileft {
            @include float;
            @include co(#aaa);
          }
          .iright {
            float: right;
          }
        }
      }
      .tuopin {
        padding-top: 52rem / $base;
        padding-bottom: 25rem / $base;
        border-bottom: 1px solid #ddd;
        margin-bottom: 24rem / $base;
      }
      .jdsm {
        @include ov;

        @include co(#aaa);
        .jdl {
          @include float;
        }
        .jdlr {
          float: right;
        }
        .fpzb {
          @include co(#333);
        }
      }
      .jdt {
        height: 26rem / $base;
        @include ba(#e4e4e4);
        @include border-radius(14rem / $base);
        @include pr;
        margin-top: 34rem / $base;
        .jdtinner {
          @include po;
          top: 0;
          left: 0;
          height: 26rem / $base;
          width: 60%;
          @include ba(#a7d92c);
          z-index: 7;
          border-top-left-radius: 14rem / $base;
          border-bottom-left-radius: 14rem / $base;
        }
      }
      .guanbi {
        @include wh(26rem / $base, 26rem / $base);
        @include po;
        top: 26rem / $base;
        right: 30rem / $base;
        z-index: 8;
        @include baimg("../assets/images/guanbi.png");
      }
    }
  }
</style>
