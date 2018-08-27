<template>
    <div class="tracemap" v-show="showflag">
      <div class="boxinner">
        <div class="guanbi" @click="closeFn"></div>
          <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="gaodemap" >
            <el-amap-marker :position="center" vid="component-marker"></el-amap-marker>
          </el-amap>
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '12fea8c7f7f0ec1a0a851b89feaf84ea',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder', 'AMap.Geolocation', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MouseTool']
});
let amapManager = new VueAMap.AMapManager();
export default {
  props: {
    flag: {
      type: Number,
      default: 1,
    }
  },
  computed: {
    showflag: function() {
      if (this.flag == 1) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
  },
  methods: {
    closeFn() {
      this.$emit("close");
    },
    handler (){
      let center = [];
      if (this.$store.state.corpInfo.TraceNodes && this.$store.state.corpInfo.TraceNodes.length > 0 ){
        for (let i=0; i<this.$store.state.corpInfo.TraceNodes.length; i++) {
          let TraceNodeType = this.$store.state.corpInfo.TraceNodes[i].TraceNodeType;
          if(TraceNodeType === '2'){
            let content = JSON.parse(this.$store.state.corpInfo.TraceNodes[i].TraceNodeContent)
            center = [Number(content.Longitude), Number(content.Latitude)]
            this.center = center;
          }
        }
      }
      this.zoom = 15;
    }
  },
  data() {
    return {
      amapManager,
      center: [117.000923, 36.675807],
      zoom: 12,
      events: {
        complete: () => {
          this.handler();
        },
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init() {
          }
        }
      }]
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/_var.scss";
$base: 75;
.tracemap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 6;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  .boxinner {
    width: 688rem / $base;
    @include ba(#fff);
    @include border-radius(10rem / $base);
    @include p_center;
    z-index: 7;
    @include fo(28rem / $base);
    @include bs;
    padding-left: 30rem / $base;
    padding-right: 30rem / $base;
    padding-top: 59rem / $base;
    padding-bottom: 69rem / $base;
    .guanbi {
      @include wh(26rem / $base, 26rem / $base);
      @include po;
      top: 26rem / $base;
      right: 30rem / $base;
      z-index: 8;
      @include baimg("../assets/images/guanbi.png");
    }
    .gaodemap {
      @include wh(100%, 500rem / $base);
    }
  }
}
</style>
