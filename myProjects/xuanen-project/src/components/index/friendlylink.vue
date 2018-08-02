<template>
  <div class="friendlylink">
    <div class="yqljt">友情链接</div>
    <div class="linka" @click="jumpLink(item.LinkUrl,$event)" :data-path="item.LinkUrl" :class="'cindex'+index" v-for="(item,index) in dataAryLink">{{item.LinkName}}</div>
 
  </div>
</template>

<script>
export default {
  props:{
    dataAryLink:{
      type:Array,
      default:function(){
        return [];
      }
    }
  },
  data() {
    return {
      links: [
        {
          text: "中国人民政府",
          path: "http://www.gov.cn/"
        },
        {
          text: "绵阳市人民政府门户网站",
          path: "http://www.my.gov.cn/"
        },
        {
          text: "北川在线",
          path: "http://www.beichuan.ccoo.cn/"
        },
        {
          text: "北川羌族自治县人民政府",
          path: "http://www.beichuan.gov.cn/#"
        }
      ]
    };
  },
  components: {},
  methods: {
    jumpLink(url,ev){
      // let pathVal=ev.target.dataset.path;
      window.open(url);
    }
  },
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.friendlylink {
  // @include wh(1179px, 112px);
  width:1179px;
  // padding-bottom:10px;
  border: 1px solid #128f40;
  border-top: 3px solid #128f40;
  @include pr;
  @include mag;
  margin-top: 6px;
  padding-left: 19px;
  @include ov;
  div{margin-bottom:18px;}
  .yqljt {
    @include co(#128f40);
    @include fo(17px);
    padding-top: 9px;
   
  }
}
.linka {
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  min-width: 129px;
  @include ba(#b7e5c8);
  @include co(#128f40);
  @include li(45px);
  @include float;
  margin-right: 52px;
  @include te;
}
// .cindex2{margin-right: 56px;}
.cindex3 {
  margin-right: 25px;
}
// .cindex4{
//   margin-right: 0;
// }
</style>
