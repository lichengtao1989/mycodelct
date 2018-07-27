<template>
  <div class="linkusout">
    <div class="lxwm">联系我们</div>
    <div class="ditu" id="mapView"></div>
    <div class="sm" v-if="widthShow">
      <div class="sml" ref="leftBlock">
        <div class="tt1" v-if="cropInfo.Organizer">{{ cropInfo.Organizer }}</div>
        <div class="tt" v-if="cropInfo.Postcode">邮编：{{ cropInfo.Postcode }}</div>
      </div>
      <div class="sml2" ref="rightBlock">
        <div class="tt1" v-if="cropInfo.Address">地址：{{ cropInfo.Address }}</div>
        <div class="tt" v-if="cropInfo.Telphone">电话：{{ cropInfo.Telphone }}</div>
      </div>
    </div>
    <ul class="sm" v-if="!widthShow" >
      <li v-if="cropInfo.Organizer">{{ cropInfo.Organizer }}</li>
      <li v-if="cropInfo.Address">地址：{{ cropInfo.Address }}</li>
      <li v-if="cropInfo.Postcode">邮编：{{ cropInfo.Postcode }}</li>
      <li v-if="cropInfo.Telphone">电话：{{ cropInfo.Telphone }}</li>
    </ul>
  </div>
</template>

<script>
  import apiList from "@/api/api";
  import companyInfoFn from "@/api/companyinfo";
  const BMap = window.BMap;
  export default {
    data() {
      return {
        widthShow: true, //是否横向排列
        cropInfo: {}
      };
    },
    components: {},
    methods: {
      mapInit(){
        const map = new BMap.Map('mapView');
        const {cropInfo} = this;
        const point = new BMap.Point(cropInfo.Longitude * 1, cropInfo.Latitude * 1);
        const marker = new BMap.Marker(point);
        map.addOverlay(marker);
        map.panTo(point, {noAnimation: true});
        map.centerAndZoom(point, 14);
        map.enableScrollWheelZoom();
      },
      async getCropInfo(){
        const {ResultCode, Data} = await companyInfoFn(apiList.GetCorpInfo);
        if (ResultCode == 200) {
          let dataInfo = Data.List[0];
          this.cropInfo = dataInfo;
          this.mapInit();
          await this.$nextTick();
          this.resetStyle();
        }
      },
      resetStyle(){
        if (this.widthShow && this.$refs.leftBlock && this.$refs.rightBlock) {
          const leftTop = this.$refs.leftBlock.offsetTop;
          const rightTop = this.$refs.rightBlock.offsetTop;
          if (leftTop != rightTop) {
            this.widthShow = false;
          }
        }
      }
    },
    created() {
      this.getCropInfo();
    },
    mounted() {
      this.resetStyle();
    }
  };
</script>
<style lang="scss" scoped="" rel="stylesheet/scss">
  @import "static/style/_var.scss";

  .linkusout {
    @include wh(1198px, 787px);
    border: 1px solid #128f40;
    border-top: 4px solid #128f40;
    @include mag;
    @include ba(#fff);
    margin-top: 7px;
    .lxwm {
      @include fo(16px);
      @include co(#128f40);
      padding: 9px 0 60px 19px;
    }
  }

  .ditu, .sm {
    @include wh(520px, 447px);
    @include ov;
    @include mag;
  }

  .sm {
    padding-top: 43px;
    li {
      padding-bottom: 16px;
    }
  }

  .sml {
    @include float;
    @include fo(16px);
    @include co(#333);
  }

  .sml2 {
    float: right;
  }

  .tt1 {
    padding-bottom: 16px;
  }
</style>

