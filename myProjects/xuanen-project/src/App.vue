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
  import myvideo from "@/base/myvideo";
  import top from "@/components/top/top";
  import foot from "@/components/foot/foot";
  import navtab from "@/components/navtab/navtab";
  import {mapMutations, mapGetters} from "vuex";
  export default {
    name: "App",
    components: {
      top,
      navtab,
      foot,
      myvideo
    },
    computed: {
      ...mapGetters(["videosrc", "videoflag"])
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

<style lang="scss" scoped="" type="text/scss" rel="stylesheet/scss">
  @import "static/style/_var.scss";

  $base: 14px;

  #app {
    font-family: "Microsoft YaHei UI", "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image: url("../static/images/bg.jpg");
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 1920px auto;
  }

  .minheght {
    min-height: 580px;
  }
</style>
