<template>
  <div class="qrcode qrcodewraplct" :class="mallurlclass" :data-murl="mallurl" :data-turl="traceurl">
    <div class="erweimalist" :class="malist">
      <div class="ma" v-if="traceurl">
        <!-- <img src="../../static/images/ma.png" class="maimg"> -->
        <qrcode-vue :value="traceurl" :size="size" level="H"></qrcode-vue>
        <div class="matext">微信扫一扫溯源</div>
      </div>
       <div class="ma" v-if="mallurl">
        <!-- <img src="../../static/images/ma.png" class="maimg"> -->
        <qrcode-vue :value="mallurl" :size="size" level="H"></qrcode-vue>
        <div class="matext">微信扫一扫购买</div>
      </div>
    </div>
    <div class="goumai"  v-if="pcurl"><div class="btngm"  :data-pcurl="pcurl" :data-turl="traceurl" @click="jumpFn">购买</div></div>
 </div>

</template>

<script>
// import carditem from './carditem'
import QrcodeVue from 'qrcode.vue';
export default {
  props: {
    idval:{ type:String,
      default:""},
    pcurl:{  type:String,
      default:""},
    mallurl: {
      type:String,
      default:""
    },
    traceurl:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      size:99
    };
  },
  computed: {
    listlength() {},
    malist() {},
    mallurlclass(){
     
      if(this.pcurl){
        var mallurlclassstr="canhover";
        return mallurlclassstr;
      }
    }
  },
  components: {
   QrcodeVue
  },
  methods: {
    jumpFn(pcurl,type,el){
       let urlstrp = `${location.protocol}//${
          location.host
        }/Click.aspx?ID=${this.idval}&type=1`;
  
       
      window.open(urlstrp)
    }
  },
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.qrcodewraplct{
  padding-top: 15px;
}
.qrcode {
  width: 100%;
  @include po;
  z-index: 2;
  height: 155px;
  .goumai {
    display: none;
    @include po;
    z-index:3;
    top:0;
    left:0;
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.57);
    .btngm {
      @include wh(158px, 43px);
      @include te;
      line-height: 43px;
      @include fo(20px);
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

 
  .erweimalist {
    padding-left: 21px;
    padding-right: 21px;
    @include te;
    @include fo(14px);
    @include co(#414141);
  }
  .ma {
    display: inline-block;
    .maimg {
      @include block;
      @include wh(99px, 98px);
      margin-top: 17px;
      margin-bottom: 12px;
    }
  }
  .ma:first-child {
    margin-right: 20px;
  }
}
 .canhover:hover{
   cursor: pointer;
    color: red;
    .goumai{ display:block;}
   
    
  }
</style>
