<template>
  <div>
    <iframe id="previewPage" class="preview-page" name="previewPage"
            :src="url"
            width="400" height="600" frameborder="0"></iframe>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        url: ''
      }
    },
    methods: {
      reset(){
        this.url = this.iframeUrl;
      },
      addForm(){
        this.reset();
        let data = Object.deepClone(this.form);
        setTimeout(() => {
          document.getElementById('previewPage').contentWindow.postMessage(data, 'http://www.kf315.net');
        }, 1000)
      }
    },
    props: ['iframeUrl', 'form'],
    mounted(){
      this.reset();
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../assets/css/config";

  iframe {
    display: block;
    margin: auto;
  }
</style>
