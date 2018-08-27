<template>
  <div class="quota">
    <div class="ttval">{{title}}</div>
    <div class="jdy">
      <div class="canv">
        <svg-bar :value="value" :options="options"></svg-bar>
      </div>
      <div class="quotaval">{{quotaval}}</div>
      <div class="unitval">{{unitval}}</div>
      <div class="timeval">{{timeval}}天前发布</div>
    </div>
  </div>
</template>

<script>
  import svgBar from "svg-progress-bar";
  export default {
    props: {
      title: {type: String, default: ""},
      quotaval: {type: String, default: ""},
      unitval: {type: String, default: ""},
      timeval: {type: String, default: ""}
    },
    data: function () {
      return {
        value: 15
      };
    },
    components: {
      svgBar
    },
    computed: {
      options() {
        return {
          circleWidth: 4,
          radius: 55,
          pathColors: ['#eee', '#a2ca43'],
          text: function () {
            return "";
          },
          textColor: "rgb(33, 150, 243)"
        };
      }
    }
  };
  //小圆圈用一个div+span 通过旋转角度实现 宽高要对应好
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/style/_var.scss";

  $base: 75;
  .quota {
    width: 210rem / $base;
    @include te;
    height: 277rem / $base;
    @include pr;
    margin-bottom: 45rem / $base;
    @include float;
    .ttval {
      @include fo(24rem / $base);
      @include co(#323232);
      padding-bottom: 21rem / $base;
    }
    .jdy {
      @include pr;
      @include mag;
      @include co(#a2ca43);
      .quotaval,
      .unitval,
      .timeval {
        @include l50;
      }
      .quotaval {
        @include fo(50rem / $base);
        top: 50rem / $base;
      }
      .unitval {
        @include fo(24rem / $base);
        top: 98rem / $base;
      }
      .timeval {
        @include fo(20rem / $base);
        top: 139rem / $base;
        @include co(#aaa);
        width: 100%;

      }
    }
  }

  .quota:nth-child(odd) {
    margin-right: 130rem / $base;
  }
</style>
<style>
  .circles-integer {
    display: none !important;
  }
</style>

