<template>
  <div class="model" v-show="showflag">
    <div class="boxinner">
      <div class="guanbi" @click="closeFn"></div>
      <div class="queryinfo ">
        <div class="topbt">科技见证品质</div>
        <div class="xxy">信息由<span class="xtb"></span><span class="co1">超级码区块链</span>技术认证</div>
        <div class="queryitem" v-if="Code.length > 18">
          <div class="itp">
            第一次查询时间
          </div>
          <div class="cxsj pmid">
            {{antiFakeInfo.FirstQueryTime}}
          </div>
          <div class="bdh"></div>
        </div>

        <div class="queryitem">
          <div class="itp">
            区域编号
          </div>
          <div class="cxsj pmid">
            {{blockChainInfo.BlockNo}}
          </div>
          <div class="bdh"></div>
        </div>
        <div class="queryitem">
          <div class="itp">
            区块链Hash
          </div>
          <div class="cxsj pmid hash">
            {{blockChainInfo.TransactionHash}}
          </div>
          <div class="bdh"></div>
        </div>
        <div class="queryitem">
          <div class="itp">
            上证时间
          </div>
          <div class="cxsj pmid">
            {{blockChainInfo.TransactionTime}}
          </div>
          <div class="bdh"></div>
        </div>
        <div class="queryitem queryitemll">
          <div class="itp">
            追溯编码
          </div>
          <div class="cxsj pmid">
            {{Code}}
          </div>
        </div>
      </div>
      <div class="sml">[所查询的商品由{{corpInfo.ProductOrgName}}生产]</div>
    </div>
  </div>
</template>

<script>
  import urlQuery from '../common/jsonp/urlQuery';
  export default {
    props: {
      flag: {
        type: Number,
        default: 1
      }
    },
    created() {
      const {code = ''} = urlQuery(location.href.toLocaleLowerCase());
      this.Code = code;
    },
    computed: {
      showflag() {
        if (this.flag == 1) {
          return false;
        } else {
          return true;
        }
      },
      blockChainInfo(){
        return this.$store.state.blockChainInfo;
      },
      corpInfo() {
        return this.$store.state.corpInfo;
      },
      antiFakeInfo() {
        return this.$store.state.antiFakeInfo;
      }
    },
    methods: {
      closeFn() {
        this.$emit("close");
      },
    },
    data: function () {
      return {
        Code: '',
      };
    },
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
    }
    .queryinfo {
      @include ba(#fff);
      @include pr;
      @include ov;
      @include fo(26rem / $base);
      @include co(#aaa);
      @include te;

      .xxy {
        @include fo(24rem / $base);
        padding-bottom: 29rem / $base;
      }
      .topbt {
        @include wh(356rem / $base, 62rem / $base);
        margin: 40rem / $base auto 35rem / $base auto;
        @include baimg("../assets/images/bgc.png");
        @include li(62rem / $base);
        @include fo(40rem / $base);
        @include co(#323232);
        @include te;
      }
      .xtb {
        @include inline-block;
        @include wh(22rem / $base, 24rem / $base);
        @include baimg("../assets/images/xtbl.png");
        vertical-align: -4rem / $base;
        margin-left: 4rem / $base;
        margin-right: 4rem / $base;
      }
      .co1 {
        @include co(#3ea6ff);
      }
      .queryitem {
        @include te;
        @include fo(26rem / $base);
      }
      .pmid {
        @include co(#323232);
        padding-top: 17rem / $base;
        padding-bottom: 17rem / $base;
      }
      .bdh {
        @include wh(400rem / $base, 1px);
        @include mag;
        margin-bottom: 17rem / $base;
        @include ba(#ddd);
      }

    }
    .sml {
      @include te;
      @include fo(24rem / $base);
      @include co(#aaa);
      padding-top: 10rem/$base;
    }
    .hash {
      width: 80%;
      margin: 0 auto;
      word-break: break-all;
    }
  }
</style>
