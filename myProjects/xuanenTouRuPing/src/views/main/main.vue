<template>
  <div class="no-print">
    <nz-header></nz-header>
    <div class="content-wrap" :style="{height:contentHeight+'px'}">
      <div class="menu">
        <nz-scrollbar>
          <nz-menu class="menu"></nz-menu>
        </nz-scrollbar>
      </div>
      <div class="content">
        <nz-scrollbar>
          <div class="tab-header">
            <nz-tab></nz-tab>
          </div>
          <div class="tab-conent">
            <router-view></router-view>
          </div>
        </nz-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import NzMenu from '../common/menu.vue';
import NzHeader from '../common/header.vue';
import NzTab from '../common/tab.vue';
export default {
  data() {
    return {
      contentHeight: 500,
      val: '',
      enumValue: '',
      remoteVal: '',
      regionval: '',
      images: []
    };
  },
  components: {
    NzMenu,
    NzHeader,
    NzTab
  },
  computed: {
    contentLeft() {
      return 170 + 'px';
    }
  },
  methods: {
    resize() {
      this.contentHeight = window.innerHeight - 50;
    }
  },
  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize);
    // this.$on('scrollTo', dest => {
    //   this.$refs.scrollbar.scrollTo(dest.x, dest.y, dest.duration);
    // });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.content-wrap {
  background-color: #f0f0f0;
}

.menu {
  width: 200px;
  float: left;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}

.content {
  height: 100%;
  overflow: hidden;
}

.tab-header {
  margin: 20px 20px 0px 20px;
}

.tab-conent {
  padding: 0px 20px 10px 20px;
}
</style>
