<template>
  <nz-dialog ref="dialog" customClass="preview-image-dialog">
    <div style="text-align: center">
      <div class="img-wrap">
        <img :src="src"/>
      </div>
    </div>
  </nz-dialog>
</template>
<script>
  export default {
    data(){
      return {
        src: ''
      };
    },
    methods: {
      show(src){
        this.src = src;
        this.$refs.dialog.show();
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  .preview-image-dialog {
    width: 800px;
    .nz-dialog-footer {
      display: none;
    }
  }
</style>
<style rel="stylesheet/less" lang="less" scoped>
  .img-wrap {
    width: 760px;
    img {
      max-width: 760px;
    }
  }
</style>
