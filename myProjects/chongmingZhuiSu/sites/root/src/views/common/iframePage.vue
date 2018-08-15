<template>
  <iframe :src="frameSrc" :height="frameHeight" :class="{'tabIFrame':frameType==='tab'}"></iframe>
</template>

<script>
  const timers = {
    tab: null,
    card: null
  }; // 定时器

  function resizeIframe(vm) {
    if (vm.$el.contentWindow) {
      let html = vm.$el.contentWindow.document.getElementsByTagName('body')[0];
      if (html) {
        html.style.overflow = 'hidden';
        let htmlHeight = html.offsetHeight;
        vm.frameHeight = htmlHeight;
      }
    }
  }

  export default {
    data(){
      return {
        frameHeight: '1000px',
        frameType: 'tab' // 默认为tab页的iframe
      }
    },
    computed: {
      frameSrc(){
        let route = this.$route;
        if (this.frameType === 'card') {
          if (this.$route.meta.type === 'tab') {
            let path = this.$route.path;
            path = path.substr(0, path.lastIndexOf('/'));
            for (let item of this.$route.matched) {
              if (item.path === path) {
                route = item;
                break;
              }
            }
          }
          return route.meta.cardUrl.replace('../', '/Module/');
        } else {
          return route.meta.url.replace('../', '/Module/');
        }
      }
    },
    watch: {
      frameSrc(){
        this.frameHeight = '0px';
      }
    },
    mounted(){
      if (this.$el.attributes['data-type'] && this.$el.attributes['data-type'].value === 'card') {
        this.frameType = 'card';
      }

      resizeIframe(this);
      if (timers[this.frameType]) {
        clearInterval(timers[this.frameType]);
        timers[this.frameType] = null;
      }
      timers[this.frameType] = setInterval(()=> {
        resizeIframe(this);
      }, 200);
    },
    beforeDestroy(){
      clearInterval(timers[this.frameType]);
      timers[this.frameType] = null;
    }
  }
</script>

<style scoped>
  iframe {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    width: 100%;
  }
</style>
