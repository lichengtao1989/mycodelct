<template>
  <div class="toptitle">
    <div class="lefty">
      <div class="icon" :class="computc"></div>
    </div>
    <div class="leftw">
      <div class="bt1">{{title}}</div>
      <div class="bt2">{{setitle}}</div>
    </div>
    <div class="polevel">
      {{leveltext}}
    </div>
    <div class="poxl">
      <div class="xltb"></div>
    </div>
    <div class="bd"></div>
  </div>
</template>

<script>
  export default {
    props: {
      zhibiaotype: {type: String, default: ""},
      title: {type: String, default: ""},
      setitle: {type: String, default: ""},
      icontype: {type: String, default: ""},
      level: {type: String, default: ""}
    },
    computed: {
      computc() {
        return `icontype${this.icontype}`;
      },
      leveltext() {
        if (parseInt(this.level) == 1) {
          return "正常";
        }
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

  $base: 75;
  .toptitle {
    @include bs;
    padding-left: 30rem / $base;
    padding-top: 41rem / $base;
    padding-bottom: 25rem / $base;
    @include ov;
    @include pr;
    @include fo(24rem / $base);
    @include co(#aaa);
    .lefty {
      @include wh(80rem / $base, 80rem / $base);
      @include ba(#a2ca43);
      @include float;
      @include border-radius(50%);
      @include pr;
    }
    .leftw {
      @include float;
      padding-left: 20rem / $base;
    }
    .bt1 {
      padding-top: 9rem / $base;
      padding-bottom: 13rem / $base;
      @include fo(32rem / $base);
      @include co(#323232);
    }

    .icontype1 {
      @include wh(51rem / $base, 40rem / $base);
      @include p_center;
      @include baimg("../assets/images/type1.png");
    }
    .icontype2 {
      @include wh(30rem / $base, 40rem / $base);
      @include p_center;
      @include baimg("../assets/images/shuizhi.png");
    }
    .icontype3 {
      @include wh(51rem / $base, 40rem / $base);
      @include p_center;
      @include baimg("../assets/images/kongqi.png");
    }
    .poxl {
      @include wh(36rem / $base, 36rem / $base);
      @include border-radius(50%);
      @include po;
      border: 2rem / $base solid #ddd;
      top: 61rem / $base;
      right: 21rem / $base;
      .xltb {
        @include wh(20rem / $base, 11rem / $base);
        @include p_center;
        @include baimg("../assets/images/xlh.png");
      }
    }
    .polevel {
      @include fo(36rem / $base);
      @include co(#a2ca43);
      @include po;
      top: 64rem / $base;
      right: 72rem / $base;
    }

    .bd {
      @include wh(710rem / $base, 2rem / $base);
      @include ba(#ededed);
      @include po;
      @include l50;
      bottom: 0;
    }
  }
</style>
