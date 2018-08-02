<template>
  <div class="posys posyssy">
    <div class="bgqr">
      <qrcode-vue :value="traceurl" :size="size" level="H"></qrcode-vue>
    </div>
    <div class="matext">微信扫一扫溯源</div>
  </div>

</template>

<script>
// import carditem from './carditem'
import QrcodeVue from 'qrcode.vue';
export default {
  props: {
    traceurl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      size: 260
    };
  },
  computed: {
    mcomp() {
      if (this.pcurl) {
        return 'haspcurl';
      } else {
        return 'nopcurl';
      }
    },
    malist() {
      if (this.mallurl && this.traceurl) {
        return 'twoitem';
      }
    },
    mallurlclass() {
      if (this.pcurl) {
        var mallurlclassstr = 'canhover';
        return mallurlclassstr;
      }
    }
  },
  components: {
    QrcodeVue
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped="" type="text/css">
@import 'static/style/_var.scss';
.matext{@include li(40px);@include te;width:100%;}
</style>
