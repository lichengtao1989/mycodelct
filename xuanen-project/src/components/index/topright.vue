<template>
  <div class="topright">
<div class="rightinnri">
  <div class="wrap">
    <div class="text">防伪溯源查询</div>
    <div class="inputpart">
<input class="inputcx" placeholder="请输入标签上的防伪溯源码" v-model="numval"/>
    </div>
    <div class="chaxunbtn" @click="queryNum">防伪溯源查询</div>
    <div class="shuzishuru">
      <div class="numlist">
        <div :class="{numactive:index==numindex?true:false}" :data-text="item.text" class="numitem" v-for="(item,index) in numlist" @click="numClick($event,index)">{{item.text}}</div>
      </div>
      <div class="potuige" @click="deleteNum">退格</div>
      <div class="qingkong" @click="clearFn">清空</div>
    </div>
  </div>
</div>
</div>
 
  </div>
</template>

<script>
 import * as config from "@/api/config";

export default {
  data() {
    return {
      numval:"",
      numindex: "-1",
      numlist: [
        { text: 1 },
        { text: 2 },
        { text: 3 },
        { text: 4 },
        { text: 5 },
        { text: 6 },
        { text: 7 },
        { text: 8 },
        { text: 9 },
        { text: 0 }
      ]
    };
  },
  components: {},
  methods: {
   
    numClick(ev,idx) {
      this.numindex=idx;
      let textval=(ev.target.dataset.text).toString();
      let newval=this.numval+textval;
      this.numval=newval;
   
    },
     deleteNum(){
       let valNow= (this.numval).toString().substr(0, this.numval.length - 1);
       this.numval=valNow;
      

     },
    queryNum(){
     
      let jumpStr=`${config.checkApiUrl}${this.numval}#/`;
      
       window.open(jumpStr);
    },
    clearFn(){
      this.numval="";
    }

  },
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.rightinnri {
  border-top: 3px solid #128f40;
  .wrap {
    padding-left: 16px;
    padding-top: 8px;
    .text {
      @include fo(16px);
      @include co(#128f40);
    }
    .inputcx {
      @include block;
      @include wh(311px, 42px);
      padding-left: 9px;
      line-height: 42px;
      border: 1px solid #ccd0d5;
      @include fo(15px);
      outline: none;
    }
  }
  .inputpart {
    padding-top: 16px;
    padding-bottom: 7px;
  }
  .chaxunbtn {
    @include wh(322px, 42px);
    cursor: pointer;
    @include te;
    line-height: 42px;
    @include fo(18px);
    @include co(#fff);
    @include ba(#128f40);
  }
  .numitem {
    @include wh(38px, 38px);
    @include te;
    line-height: 38px;
    @include co(#4b4b4b);
    @include fo(24px);
    border: 1px solid #cacfd4;
    @include float;
    margin-right: 7px;
    margin-top: 9px;
    cursor: pointer;
  }
  .numactive {
    @include co(#128f40);
    border: 1px solid #128f40;
  }
  .shuzishuru {
    @include pr;
  }
  .potuige,
  .qingkong {
    @include po;
    @include wh(85px, 38px);
    @include li(38px);
    @include te;
    @include co(#128f40);
    border: 1px solid #cacfd4;
    left: 141px;
    top: 57px;
    z-index: 2;
    cursor: pointer;
  }
  .qingkong {
    left: 235px;
  }
}
</style>
