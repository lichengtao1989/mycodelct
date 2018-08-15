<template>
  <div :class="theme" class="no-print">
    <cjm-head></cjm-head>
    <cjm-menu></cjm-menu>
    <cjm-scrollbar ref="scrollbar" class="cjm-content-wrap" view-class="cjm-content" :style="{left:contentLeft}">
      <router-view name="cardView" data-type="card"></router-view>
      <router-view :style="{minHeight:contentHeight+'px'}"></router-view>
    </cjm-scrollbar>
  </div>
</template>

<script>
  import CjmMenu from './views/common/menu.vue'
  import CjmHead from './views/common/head/head.vue'
  import CjmFooter from './views/common/footer.vue'

  export default {
    componentName: 'app',
    data(){
      return {
        contentHeight: 500
      }
    },
    components: {
      CjmMenu,
      CjmHead,
      CjmFooter
    },
    computed: {
      contentLeft(){
        if (this.$store.state.menu.rightMenuVisible) {
          return 170 + 150 + 'px';
        } else {
          return 170 + 'px';
        }
      },
      theme(){
        return this.$store.state.userConfig.theme;
      }
    },
    methods: {
      setContentHeight(){
        this.contentHeight = window.innerHeight - 50 - 20;
      }
    },
    mounted(){
      this.setContentHeight();
      window.addEventListener('resize', () => {
        this.setContentHeight();
      });
      this.$on('scrollTo', (dest) => {
        this.$refs.scrollbar.scrollTo(dest.x, dest.y, dest.duration);
      });
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .cjm-scrollbar.cjm-content-wrap {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 170px;
    right: 0;
    background: #eee;
    min-width: 690px;
    z-index: 1;
    transition: left 0.2s linear;
    height: auto;
  }

  .cjm-content {
    padding: 10px 10px 10px 10px;
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
  }
</style>
