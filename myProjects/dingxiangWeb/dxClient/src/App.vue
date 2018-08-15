<template>
  <div id="app">
    <myvideo v-if="videoflag"></myvideo>
    <top></top>
    <navtab @navChange="navJump"></navtab>
    <div class="minheght">
      <router-view/>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import myvideo from '@/base/myvideo';
import top from '@/components/top/top';
import foot from '@/components/foot/foot';
import navtab from '@/components/navtab/navtab';
import { mapMutations, mapGetters } from 'vuex';
export default {
  name: 'App',
  components: {
    top,
    navtab,
    foot,
    myvideo
  },
  computed: {
    ...mapGetters(['videosrc', 'videoflag'])
  },
  methods: {
    navJump(msg) {
      this.$router.push({
        path: `${msg}`
      });
    }
  }
};
</script>

<style lang="scss" scoped="" type="text/css">
$base: 192;
@import 'static/style/_var.scss';

#app {
  font-family: 'Microsoft YaHei UI', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url('../static/images/bg.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 1920rem/$base auto;
  background-color: #f8f8f8;
}
.minheght {
  min-height: 580rem/$base;
  width: 1320rem/$base;
  // font-size:14rem/$base;
  @include mag;
}
</style>
<style lang="scss"  type="text/scss" rel="stylesheet/scss">
.vPaginationList,
.bPageInfo {
  display: none !important;
}
.bPageControlButton a,
.vPagination li a {
  color: #128f40 !important;
  cursor: pointer;
}
.vPagination .active a{
  color: #fff !important;
  background: #128f40 !important;
}
.vPagination .disabled a{
  color:#ccc !important;
}
</style>
