<template>
  <div class="traceability">
    <div v-show="productTraceNodeInfo.length > 0">
        <div class="sczs">信息由<span class="xtbl"></span><span class="co1">超级码区块链</span>技术认证</div>
        <div class="bgcsm" >
            <div class="gcitem" v-for="(item, index) in productTraceNodeInfo" :key="index">
                <div @click="showBox(item.FieldList)">
                    <div class="sline"></div>
                    <div class="zquan"></div>
                    <div class="xline"></div>
                    <div class="smbf"><span class="bz">{{item.NodeName}}</span><span class="sjsm">{{item.OperateTime}}</span></div>
                    <div class="xmsm"><span class="xtbl"></span><span class="co1">超级码区块链查证</span></div>
                    <div v-for="(item, index) in item.FieldList" class="fielditem" :key="index">
                        <img :src="JSON.parse(item.FieldValue).length > 0 ? JSON.parse(item.FieldValue)[0].url : ''" v-if="item.FieldType === '2'" alt="" class="rimg">
                    </div>
                </div>
            </div>
        </div>
        <div v-show="show" class="model">
            <div class="boxinner">
                <div class="guanbi" @click="closeFn"></div>
                <div class="boxcontent">
                    <div v-for="(item, index) in FieldList" class="fielditem" :key="index">
                        <div>{{item.FieldName}}</div>
                        <div v-if="item.FieldType !== '2'">{{item.FieldType === '4' ? item.FieldValue.replace(',', '~') : item.FieldValue}}</div>
                        <div v-if="item.FieldType === '2'">
                            <img :src="item.url" alt="" v-for="(item, index) in JSON.parse(item.FieldValue)" :key="index" v-if="item.url">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      <div class="nodata" v-show="productTraceNodeInfo.length === 0">
          <img src="../assets/images/nodata.png" alt="">
      </div>
  </div>
</template>

<script>

export default {
  props: {
    msg: String
  },
  
  data(){
    return {
      show: false,
      FieldList: [],
    }
  },
  methods: {
    showBox (FieldList){
      this.show = true;
      this.FieldList = FieldList
    },
    closeFn (){
      this.show = false;
    }
  },
  computed: {
    productTraceNodeInfo (){
      return this.$store.state.productTraceNodeInfo || [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/_var.scss";
@import "../assets/style/util.scss";
$base: 75;
.traceability {
  .sczs {
      @include fo(24rem / $base);
      @include co(#aaa);
      @include te;
      padding-top: 55rem / $base;
      padding-bottom: 42rem / $base;
    }
    .xtbl {
      @include wh(22rem / $base, 24rem / $base);
      @include inline-block;
      @include baimg("../assets/images/xtbl.png");
      vertical-align: -6rem / $base;
      margin-left: 6rem / $base;
      margin-right: 6rem / $base;
    }
    .co1 {
      @include co(#3ea6ff);
      margin-right: 4rem / $base;
    }
    .bgcsm {
      width: 734rem / $base;
      @include baimg("../assets/images/bgc02.png");
      @include mag;
      @include fo(28rem / $base);
      padding-top: 37rem / $base;
    }
    .gcitem {
      padding-left: 83rem / $base;
      @include pr;
      width: 100%;
      @include bs;

      .xmsm {
        padding-bottom: 33rem / $base;
        padding-top: 18rem / $base;
      }
      .smbf {
        padding-top: 37rem / $base;
      }
      .rimg {
        @include block;
        @include wh(130rem / $base, 100rem / $base);
        @include po;
        top: 19rem / $base;
        right: 30rem / $base;
        z-index: 2;
      }
      .bz {
        @include fo(28rem / $base);
        @include co(#646464);
      }
      .sjsm {
        @include fo(28rem / $base);
        @include co(#aaa);
        margin-left: 17rem / $base;
      }
      .zquan {
        @include wh(16rem / $base, 16rem / $base);
        border: 2rem / $base solid #a2ca43;
        @include border-radius(50%);
        @include po;
        top: 43rem / $base;
        left: 32rem / $base;
        z-index: 4;
      }
      .xline {
        @include wh(2rem / $base, 80rem / $base);
        @include ba(#a2ca43);
        @include po;
        bottom: 0em / $base;
        left: 40rem / $base;
        z-index: 2;
      }
      .sline {
        @include wh(2rem / $base, 44rem / $base);
        @include ba(#a2ca43);
        @include po;
        top: 0em / $base;
        left: 40rem / $base;
        z-index: 2;
      }
    }
    .gcitem:nth-child(2n) {
      @include ba(#f9f9f9);
    }
    .gcitem:first-child {
      .sline {
        @include none;
      }
    }
    .gcitem:last-child {
      .xline {
        @include none;
      }
    }
    .model {
        .boxinner {
            height: 700rem / $base;
        }
        .fielditem {
          width: 100%;
          padding-top: 15rem / $base;
          margin-bottom: 20rem / $base;
          color: #333;
          text-align: right;
          overflow: hidden;
          div:nth-child(1) {
            float: left;
            color: #aaa;
          }
          div:nth-child(2) {
            float: right;
            width: 60%;
            line-height: 30rem / $base;
            word-break: break-all;
          }
          img {
            width: 324rem / $base;
            height: 236rem / $base;
          }
        }
    }
}
</style>
