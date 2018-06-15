<template>
  <div class="loginout" v-show="showFlag">
<div class="loginwrap">
<div class="close" @click="closeFn"></div>
<div class="bt">系统登录</div>
<div class="framestyle" v-if="systemId">
  <iframe :src="iframeSrc" frameborder="0"></iframe>
</div>

</div>
 </div>

</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {},
  data() {
    return {
      writein: "",
      uname: "",
      pwd: "",
      showFlag:true,
      desc:"登录",
      iframeSrc:""
    };
  },
  computed: {
    ...mapGetters(["systemId"])
  },
  components: {},
  mounted(){
    let srcval=`http://login.app315.net/?AudsId=t&callback=http://cjm.app315.net/module/index/landing.html?systemId=${this.systemId}&btncolor=10cec6&iconcolor=10cec6`;
    // console.log(srcval)
    this.iframeSrc=srcval;
  },
  methods: {
    closeFn(){
   
      this.setLoginShow(false)
    },
    changeFn() {
    
    },
    loginFn() {
      console.log(this.uname,this.pwd)
      if(this.uname==""||this.pwd==""){
        this.desc="用户名或密码不能为空";

      }else{

      };
    },
     ...mapMutations({
      setLoginShow: "SET_LOGINSHOW"
    })
  }
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.framestyle{
  @include wh(424px,255px);
  @include mag;
}
iframe{
  @include block;
   @include wh(424px,255px);
}
.loginbtn {
  @include wh(361px, 41px);
  @include te;
  @include li(41px);
  @include co(#fff);
  @include ba(#128f40);
  @include mag;
  border-radius: 5px;
  cursor: pointer;
  @include fo(17px);
}
.jzyhm {
  cursor: pointer;
  margin-bottom: 25px;
}
.rein {
  @include inline-block;
  vertical-align: 2px;
  margin-left: 32px;
  margin-right: 6px;
  border: 1px solid #c9c9c9;
  outline: none;
}
.loginout {
  position: fixed;
  @include wh(100%, 100%);
  z-index: 5;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loginwrap {
  width: 540px;

  @include ba(#fff);
  border-radius: 8px;
  padding-top: 24px;
  padding-bottom: 50px;
  @include p_center;
  cursor: pointer;
}
.close {
  @include wh(36px, 36px);
  @include baimg("../../static/images/close.png");
  @include po;
  top: -18px;
  right: -18px;
  z-index: 6;
}
.bt {
  @include te;
  @include fo(24px);
  // @include co(#128f40);
  color: rgb(16, 206, 198);
  padding-bottom: 29px;
}
.pp {
  @include wh(361px, 48px);
  @include mag;
  @include pr;
  input {
    outline: none;
    @include block;
    padding-left: 56px;
    width: 304px;
    @include li(46px);
    border: 1px solid #c5c5c5;
    border-radius: 4px;
  }
  img {
    @include po;
    top: 12px;
    left: 15px;
  }
}
.part1 {
  margin-bottom: 20px;
}
.part2 {
  margin-bottom: 36px;
}
</style>
