<template>
  <div class="swiperproductwrap">
     <div class="play" v-if="videoFlag" :data-src="srcstr" @click.stop.prevent='playFn(srcstr)'></div>
     <div class="videopart" v-if="videoFlag" ></div>

 <img :src="srcstr" class="imgs" v-if="!videoFlag"> 
 </div>

</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props:{
    srcstr:{//信息
      type:String,
      default: ""
    }
  },
  data() {
    return {
     num:1000
    };
  },
  computed: {
   videoFlag(){
     var flag=flag;
     if(this.srcstr.indexOf('.mp4')>-1){
       flag=true;
     };
     return flag

   }
  },
  components: {
    // top
  },
  methods: {
  playFn(src){
console.log(src);


this.setVideoFlag(true);
  this.setSrc(src);

  },
    ...mapMutations({
      setVideoFlag: "SET_VIDEOFLAG",
      setSrc: "SET_VIDEOSRC"
    })
  },
  created() {},
  mounted() {

  }
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.swiperproductwrap{
  @include wh(100%,100%);
}
.play{
  @include wh(50px,50px);
  @include po;
  top:50%;
  left:50%;
  margin-left:-25px;
  margin-top:-25px;
  @include baimg('../../static/images/play.png');
  z-index:5;
cursor: pointer;
}
.videopart{
  @include wh(100%,212px);
  @include ba(#000);
}
.imgs{
 @include block;
 @include wh(273px,271px);

}

</style>
