<template>
  <div class="helpout">
<div class="lxwm">使用帮助</div>
<div class="nextinfo">
  <div class="linet1"></div>
  <div class="linet2"></div>
  <div class="left">
    <div class="p1 pp">
      
      <img src="../../../static/images/dn.png" alt="">
      <div class="tt">电脑查询</div>
    </div>
     <div class="p2 pp">
      <img src="../../../static/images/sm.png" alt="">
      <div class="tt">扫描查询</div>
    </div>
     <div class="p3 pp">
      <img src="../../../static/images/ytj.png" alt="">
      <div class="tt">一体机查询</div>
    </div>
  </div>
  <div class="right">
    <div class="smsm">溯源查询使用方法</div>
    <div class="rp1">
      <div class="ppp1">
        <div class="jt1 jt"></div>
        <img src="../../../static/images/sy1.png" alt="">
        <div class="mms">第1步：进入溯源云平台</div>
      </div>
      <div class="ppp2">
        <div class="jt2 jt"></div>
        <img src="../../../static/images/sy2.png" alt="">
        <div class="mms">第2步：输入标签上的防伪溯源码</div>
      </div>
      <div class="ppp3">
        <img src="../../../static/images/sy3.png" alt="">
        <div class="mms">第3步：查看溯源信息</div>
      </div>
    </div>
    <div class="rp2">
       <div class="ppp1">
         <div class="jt3 jt"></div>
        <img src="../../../static/images/sy4.png" alt="">
        <div class="mms">第1步：打开手机扫码软件</div>
      </div>
      <div class="ppp2">
        <div class="jt4 jt"></div>
        <img src="../../../static/images/sy5.png" alt="">
        <div class="mms">第2步：扫描标签上的二维码</div>
      </div>
      <div class="ppp3">
        <img src="../../../static/images/sy6.png" alt="">
        <div class="mms">第3步：查看溯源信息</div>
      </div>
    </div>
     <div class="rp3">
       <div class="ppp1">
          <div class="jt5 jt"></div>

        <img src="../../../static/images/sy7.png" alt="">
        <div class="mms">第1步：点击“点击溯源”按钮</div>
      </div>
      <div class="ppp2">
          <div class="jt6 jt"></div>
        <img src="../../../static/images/sy8.png" alt="">
        <div class="mms">第2步：将标签对准读码器进行扫码</div>
      </div>
      <div class="ppp3">
        <img src="../../../static/images/sy9.png" alt="">
        <div class="mms">第3步：查看溯源信息</div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.helpout {
  @include wh(1198px, 971px);
  border: 1px solid #128f40;
  border-top: 4px solid #128f40;
  @include mag;
  @include ba(#fff);
  margin-top: 7px;
  @include pr;
  .lxwm {
    @include fo(16px);
    @include co(#128f40);
    padding: 9px 0 13px 22px;
  }
  .nextinfo {
    margin-left: 22px;
    @include ov;
    .left {
      @include float;
      @include wh(153px, 880px);
      @include ov;
    }
    .right {
      @include ov;
      @include float;
      @include wh(1004px, 878px);
      border: 1px solid #d6d9dd;
      border-left: none;
    }
  }
  .pp {
    @include wh(100%, 293px);
    @include ba(#ecad62);
    @include co(#fff);
    @include te;
    @include fo(19px);
  }
  .p1 {
    img {
      margin-top: 140px;
      margin-bottom: 9px;
    }
  }
  .p2 {
    img {
      margin-top: 104px;
      margin-bottom: 9px;
    }
    @include ba(#9ccc71);
  }
  .p3 {
    @include ba(#56b6f1);
    img {
      margin-top: 104px;
      margin-bottom: 9px;
    }
  }
}
.smsm {
  @include te;
  width: 100%;
  padding-top: 26px;
  padding-bottom: 46px;
  @include fo(19px);
  @include co(#232323);
}
.linet1,.linet2{
  @include wh(1156px,1px);
  @include ba(#d6d9dd);
  @include po;
  left:21px;
  z-index:2;
}
.jt{
  @include wh(53px,15px);
  @include baimg('../../../static/images/jtl.png');
  @include po;
  z-index:3;

}
.jt1{left:254px;top: 61px;}
.jt2{left:248px;top: 61px;}
.jt3{left:316px;top: 141px;}
.jt4{left:277px;top: 141px;}
.jt5{left:316px;top: 74px;}
.jt6{left:248px;top: 74px;}
.linet1{bottom:637px;}
.linet2{bottom:344px;}

.ppp1,
.ppp2,
.ppp3 {
  @include pr;
  @include te;
  @include float;
  @include fo(15px);
  @include co(#128f40);
}
.rp1 {
  @include ov;
  .ppp1 {
    margin-left: 62px;
    margin-right: 108px;
  }
  .ppp2 {
    margin-right: 95px;
  }
  .mms {
    padding-top: 27px;
    padding-bottom: 29px;
  }
}
.rp2 {
  @include ov;
  .ppp2 {
    margin-left: 53px;
    margin-right: 72px;
  }
  .mms {
    padding-bottom: 90px;
  }
}
.rp3 {
  @include ov;
   .mms {
      padding-top: 24px;
    }
  .ppp1 {
    text-align: left;
    margin-right: 130px;
    img {
      margin-left: 100px;
    }
    .mms {
      padding-left: 58px;
    }
  }
  .ppp2 {
    text-align: left;
    margin-right: 130px;
    img {
      margin-left: 35px;
    }
    
  }
}
</style>
