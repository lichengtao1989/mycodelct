<template>
  <div class="qrcode qrcodewraplct" :class="mallurlclass" :data-murl="mallurl" :data-turl="traceurl">
    <div class="erweimalist" :class="malist">
      <div class="ma" v-if="traceurl">
        <div class="pobg"></div>
        <div class="smsy">扫码溯源</div>
         <!-- <div class="goumai"  v-if="pcurl"><div class="btngm"  :data-pcurl="pcurl" :data-turl="traceurl" @click="jumpFn">点击PC购买></div></div> -->
        <div class="posys posyssy">
        <qrcode-vue :value="traceurl" :size="size" level="H"></qrcode-vue>
        <div class="matext">微信扫一扫溯源</div>
        </div>
      </div><div class="ma" v-if="mallurl">
          <div class="pobg"></div>
         <div class="smsy">扫码购买</div>
          <div class="goumai"  v-if="pcurl"><div class="btngm"  :data-pcurl="pcurl" :data-turl="traceurl" @click="jumpFn">点击PC购买></div></div>
     <div class="posys" :class="mcomp">
        <qrcode-vue :value="mallurl" :size="size" level="H"></qrcode-vue>
        <div class="matext">微信扫一扫购买</div>
        </div>
      </div>
      
    </div>
   
 </div>

</template>

<script>
// import carditem from './carditem'
import QrcodeVue from "qrcode.vue";
export default {
  props: {
    idval: {
      type: String,
      default: ""
    },
    pcurl: {
      type: String,
      default: ""
    },
    mallurl: {
      type: String,
      default: ""
    },
    traceurl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      size: 168
    };
  },
  computed: {
    mcomp() {
    
      if(this.pcurl){
        return 'haspcurl'
      }else{
          return 'nopcurl'
      }
    },
    malist() {
      if (this.mallurl && this.traceurl) {
        return "twoitem";
      }
    },
    mallurlclass() {
      if (this.pcurl) {
        var mallurlclassstr = "canhover";
        return mallurlclassstr;
      }
    }
  },
  components: {
    QrcodeVue
  },
  methods: {
    jumpFn(pcurl, type, el) {
      let urlstrp = `${location.protocol}//${location.host}/Click.aspx?ID=${
        this.idval
      }&type=1`;

      window.open(urlstrp);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
.bPageInfo[data-v-0b865a68] {
  display: none !important;
}
.vPaginationList[data-v-0b865a68] {
  display: none !important;
}
div.vPagination > ul > li.disabled > a[data-v-0b865a68] {
  color: #128f40 !important;
  cursor: default;
}
div.vPagination > ul > li.disabled > a[data-v-0b865a68] {
  color: #128f40 !important;
  cursor: default;
}
div.vPagination > ul > li > a[data-v-0b865a68] {
  color: #128f40 !important;
  cursor: pointer;
}
div.vPagination > ul > li.active > a[data-v-0b865a68],
div.vPagination > ul > li.active > span[data-v-0b865a68] {
  color: #fff !important;
  background: #128f40 !important;
}
</style>

<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.goumai {
  display: none;
  @include po;
  z-index: 10;
  top: 270px;
  left: 54px;
  @include wh(168px, 47px);
 
  // background: rgba(0, 0, 0, 0.57);
  .btngm {
    @include wh(158px, 43px);
    @include te;
    line-height: 43px;
    @include fo(16px);
    @include po;
    top: 50%;
    left: 50%;
    margin-left: -79px;
    margin-top: -21.5px;
    z-index: 4;
    @include co(#fff);
    @include ba(#128f40);
  }
}

.qrcode {
  width: 100%;
  // @include po;
  z-index: 2;
  // height: 155px;

  .erweimalist {
    @include fo(14px);
    @include co(#414141);
  }
  .ma {
    display: inline-block;
    @include te;
    width: 100%;

 
    .maimg {
      @include block;
      @include wh(99px, 98px);
      margin-top: 17px;
      margin-bottom: 12px;
    }
  }
}
// .canhover:hover {
//   cursor: pointer;
//   color: red;
//   .goumai {
//     display: block;
//   }
// }
.posys {
 @include none;
  @include po;
  top: 30px;
  left: 54px;
  z-index: 10;
}
.posyssy,.nopcurl{
  top: 70px;
}
.smsy {
  cursor: pointer;
  @include te;
  @include li(53px);
  color: #128f40;
  @include fo(16px);
}
.twoitem {
  .ma{ width: 50%;}

}
.ma:hover {

  @include ba(#818181);
  .posys,
  .goumai,.pobg {
    @include block;
  }
  .smsy{
    color: #fff;
    @include ba(#818181);
  }
}
.pobg {
  @include none;
  @include po;
  width: 100%;
  height: 350px;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index:9;
}
.matext{
  @include co(#fff);
  @include fo(16px);
  width:100%;
  @include te;
  padding-top:14px;
}
</style>
