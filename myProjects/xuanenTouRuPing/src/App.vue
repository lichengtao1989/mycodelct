<template>
  <div id="app">
    <router-view></router-view>
    <preview-image-dialog ref="previewDialog"></preview-image-dialog>
  </div>
</template>

<script>
  import previewImageDialog from './views/common/preview-image-dialog.vue';
  export default {
    components: {previewImageDialog},
    name: 'App',
    data() {
      return {};
    },
    watch: {},
    methods: {
      init() {
        this.bindLogout();
        this.bindPreviewImage();
      },
      bindLogout(){
        this.$eventBus.$on('logout', async () => {
          //this.$message.error('请重新登录');
          await this.$sleep(300);
          this.$router.push('/login');
        });
      },
      bindPreviewImage(){
        this.$eventBus.$on('preview-image', (src) => {
          this.$refs.previewDialog.show(src);
        });
      },
      onResize() {
        this.$eventBus.$emit('resize');
      },
      bindResize() {
        window.addEventListener('resize', this.onResize);
      },
      unBindResize() {
        window.removeEventListener('resize', this.onResize);
      }
    },
    created() {
      this.init();
    },
    async mounted() {
      this.bindResize();
    },
    beforeDestroy() {
      this.unBindResize();
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>
