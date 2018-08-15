<template>
  <div class="friendlylink">
    <div class="linkap" v-for="item in dataAryLink" :key="item.LinkID" v-if="item.LinkType==1" @click="jumpUrl(item.LinkUrl)">
      <img :src="item.ImagePath" class="imgss">
    </div>

  </div>
</template>

<script>
export default {
  props: {
    dataAryLink: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    jumpUrl(url) {
      window.open(url);
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
.friendlylink {
  width: 100%;
  @include ba(#fff);
  @include bs;
  padding: 14rem/$base 16rem/$base;
}
.linkap {
  margin-right: 60rem/$base;
  cursor: pointer;
}
.imgss,
.linkap {
  display: inline-block;
  @include wh(197rem/$base, 54rem/$base);
  margin-bottom:10rem/$base;
}
</style>
