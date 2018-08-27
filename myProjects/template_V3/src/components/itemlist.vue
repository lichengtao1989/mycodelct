<template>
  <div class="itemlist ">
    <div class="listwrap"> 
      <div class="itemi " @click="typechange(item.text,index)" :data-str="item.text" v-for="(item,index) in listname " :class="{activeitem:index==indexval?true:false}" :key="index">
        <div class="iconbg bg">
          <div class="iimg"></div>
        </div>
        <div class="wzt">{{item.text}}</div>
        <div class="bd"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  data: function() {
    return {
      indexval: 0,
      listname: [
        { text: "品质报告", id: "1" },
        { text: "生产追溯", id: "2" },
        { text: "智能监测", id: "3" },
        { text: "更多", id: "4" }
      ]
    };
  },
  methods:{
    typechange(text,idx){
      this.indexval=idx;
      this.$emit('showtypechange',text)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/_var.scss";
$base: 75;
.itemlist {
  margin-top: 20rem / $base;
  @include ba(#fff);
  padding-left: 20rem / $base;
  .listwrap {
    border-bottom: 1px solid #ddd;
    @include ov;
    .itemi {
      height: 189rem / $base;
      @include float;
      width: 25%;
      @include fo(28rem / $base);
      @include co(#aaa);
      @include te;
      @include pr;
    }
    .itemi:nth-of-type(1){
      .iimg{
        @include wh(50rem/$base,42rem/$base);
        @include baimg('../assets/images/in1.png');
        @include p_center;
        z-index:2;
      }
    }
     .itemi:nth-of-type(2){
      .iimg{
        @include wh(49rem/$base,50rem/$base);
        @include baimg('../assets/images/in2.png');
        @include p_center;
        z-index:2;
      }
    }
     .itemi:nth-of-type(3){
      .iimg{
        @include wh(46rem/$base,46rem/$base);
        @include baimg('../assets/images/in3.png');
        @include p_center;
        z-index:2;
      }
    }
     .itemi:nth-of-type(4){
      .iimg{
        @include wh(50rem/$base,50rem/$base);
        @include baimg('../assets/images/in4.png');
        @include p_center;
        z-index:2;
      }
    }
    .bd {
      @include wh(100%, 4rem / $base);
      @include ba(#a2ca43);
      @include po;
      left: 0;
      bottom: -2rem / $base;
      @include none;
    }
    .activeitem {
      .iconbg {
        @include ba(#a2ca43);
      }
      color: #a2ca43;
      .bd {
        @include block;
      }
    }

    .iconbg {
      @include wh(90rem / $base, 90rem / $base);
      @include border-radius(40rem / $base);
      @include ba(#c7c8c8);
      @include pr;
      margin-left: auto;
      margin-right: auto;
      margin-top: 31rem / $base;
      margin-bottom: 13rem / $base;
    }
  }
}
</style>
