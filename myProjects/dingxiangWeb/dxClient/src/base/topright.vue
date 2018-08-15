<template>
  <div class="topright">
    <div class="rightinnri">
      <div class="wrap">
        <div class="text">防伪溯源查询</div>
        <div class="inputpart">
          <input class="inputcx" placeholder="请输入标签上的防伪溯源码" v-model="numval" />
        </div>
        <div class="chaxunbtn" @click="queryNum">防伪溯源查询</div>
        <div class="shuzishuru">
          <div class="numlist">
            <div :class="{numactive:index==numindex?true:false}" :data-text="item.text" class="numitem" v-for="(item,index) in numlist" @click="numClick($event,index)" :key="index">{{item.text}}</div>
          </div>
          <div class="potuige" @click="deleteNum">退格</div>
          <div class="qingkong" @click="clearFn">清空</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import * as config from '@/api/config';

export default {
  data() {
    return {
      numval: '',
      numindex: '-1',
      numlist: [{ text: 1 }, { text: 2 }, { text: 3 }, { text: 4 }, { text: 5 }, { text: 6 }, { text: 7 }, { text: 8 }, { text: 9 }, { text: 0 }]
    };
  },
  components: {},
  methods: {
    numClick(ev, idx) {
      this.numindex = idx;
      let textval = ev.target.dataset.text.toString();
      let newval = this.numval + textval;
      this.numval = newval;
    },
    deleteNum() {
      let valNow = this.numval.toString().substr(0, this.numval.length - 1);
      this.numval = valNow;
    },
    queryNum() {
      let jumpStr = `${config.checkApiUrl}${this.numval}#/`;

      window.open(jumpStr);
    },
    clearFn() {
      this.numval = '';
    }
  },
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
$base: 192;
@import 'static/style/_var.scss';
.topright {
  height: 100%;
  @include ba(#fff);
  border: 1rem/$base solid #128f40;
  @include bs;
  padding-top: 10rem/$base;
  padding-left: 15rem/$base;
}
.rightinnri {
  .wrap {
    // padding-left: 16rem/$base;
    // padding-top: 8rem/$base;

    .text {
      @include fo(16rem/$base);
      @include co(#128f40);
    }
    .inputcx {
      @include block;
      @include wh(311rem/$base, 42rem/$base);
      padding-left: 9rem/$base;
      line-height: 42rem/$base;
      border: 1rem/$base solid #ccd0d5;
      @include fo(15rem/$base);
      outline: none;
    }
  }
  .inputpart {
    padding-top: 16rem/$base;
    padding-bottom: 7rem/$base;
  }
  .chaxunbtn {
    @include wh(322rem/$base, 42rem/$base);
    cursor: pointer;
    @include te;
    line-height: 42rem/$base;
    @include fo(18rem/$base);
    @include co(#fff);
    @include ba(#128f40);
  }
  .numitem {
    @include wh(38rem/$base, 38rem/$base);
    @include te;
    line-height: 38rem/$base;
    @include co(#4b4b4b);
    @include fo(24rem/$base);
    border: 1rem/$base solid #cacfd4;
    @include float;
    margin-right: 7rem/$base;
    margin-top: 9rem/$base;
    cursor: pointer;
  }
  .numactive {
    @include co(#128f40);
    border: 1rem/$base solid #128f40;
  }
  .shuzishuru {
    @include pr;
  }
  .potuige,
  .qingkong {
    @include po;
    @include wh(85rem/$base, 38rem/$base);
    @include li(38rem/$base);
    @include te;
    @include co(#128f40);
    border: 1rem/$base solid #cacfd4;
    left: 141rem/$base;
    top: 57rem/$base;
    z-index: 2;
    cursor: pointer;
  }
  .qingkong {
    left: 235rem/$base;
  }
}
</style>
