<template>
  <div class="queryinfo" @click="collapse(collapseStatus)" v-if="blockChainInfo.TransactionHash">
    <div class="djsq">
      <div class="jts"></div>
    </div>
    <div class="topbt">超级码区块链技术</div>
    <div class="xxy">信息由<span class="xtb"></span><span class="co1">超级码区块链</span>技术认证</div>
    <div v-show="collapseStatus">
      <!--第一次查询时间只有防伪码才有，物流码隐藏-->
      <div class="queryitem" v-if="corpInfo.BatchData.Code.length > 18">
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
          {{corpInfo.BatchData.Code}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import urlQuery from '../common/jsonp/urlQuery';
  export default {
    props: {
      msg: String
    },
    data: function () {
      return {
        collapseStatus: true,
      };
    },
    created() {
      const {code} = urlQuery(location.href.toLocaleLowerCase());
      this.Code = code;
    },
    methods: {
      collapse (collapseStatus){
        this.collapseStatus = !collapseStatus;
      },
      getCorpInfo(Code) {
        let data = {function: 'TraceQuery', Code, type: 'ncp'};
        return this.$jsonp(data);
      },
    },
    computed: {
      blockChainInfo() {
        return this.$store.state.blockChainInfo;
      },
      corpInfo() {
        return this.$store.state.corpInfo;
      },
      antiFakeInfo() {
        return this.$store.state.antiFakeInfo;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/style/_var.scss";

  $base: 75;
  .queryinfo {
    margin-top: 20rem/$base;
    @include ba(#fff);
    @include pr;
    @include ov;
    @include fo(26rem/$base);
    @include co(#aaa);
    @include te;
    padding-bottom: 42rem/$base;
    border-bottom: 2rem/$base solid #c7c8c8;
    .xxy {
      @include fo(24rem/$base);
      padding-bottom: 29rem/$base;
    }
    .topbt {
      @include wh(386rem/$base, 62rem/$base);
      margin: 40rem/$base auto 35rem/$base auto;
      @include baimg('../assets/images/bgc.png');
      @include li(62rem/$base);
      @include fo(40rem/$base);
      @include co(#323232);
      @include te;
    }
    .xtb {
      @include inline-block;
      @include wh(22rem/$base, 24rem/$base);
      @include baimg('../assets/images/xtbl.png');
      vertical-align: -4rem/$base;
      margin-left: 4rem/$base;
      margin-right: 4rem/$base;
    }
    .co1 {
      @include co(#3ea6ff);
    }
    .queryitem {
      @include te;
      @include fo(26rem/$base);
    }
    .pmid {
      @include co(#323232);
      padding-top: 17rem/$base;
      padding-bottom: 17rem/$base;

    }
    .bdh {
      @include wh(400rem/$base, 1px);
      @include mag;
      margin-bottom: 17rem/$base;
      @include ba(#ddd);
    }
    .djsq {
      @include po;
      bottom: 0;
      left: 50%;
      margin-left: -30rem/$base;
      @include wh(60rem/$base, 18rem/$base);
      @include ba(#c7c8c8);
      border-top-left-radius: 8rem/$base;
      border-top-right-radius: 8rem/$base;
      z-index: 3;
      .jts {
        @include wh(20rem/$base, 8rem/$base);
        @include baimg('../assets/images/jts.png');
        @include po;
        top: 5rem/$base;
        left: 50%;
        margin-left: -10rem/$base;
        z-index: 3;
      }
    }
    .hash {
      width: 65%;
      margin: 0 auto;
      word-break: break-all;
    }
  }
</style>
