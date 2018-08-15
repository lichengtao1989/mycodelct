<template>
  <div>
    <trace-image-upload-item ref="imgItems" v-for="(img,index) in imgs" :key="index" :value="img" :disabled="disabled" :set-title="setTitle" @uploadSuccess="handleUploadSuccess(arguments[0],index)" @delete="handleDelete(index)"></trace-image-upload-item>
    <p class="cjm-image-upload-tips" v-if="tips">({{tips}})</p>
  </div>
</template>

<script>
  import TraceImageUploadItem from './image-upload-item';
  import CjmImageUpload from 'framework/components/base/image-upload';
  /**
   * 图片上传组件
   */
  export default{
    name: 'trace-image-upload',
    mixins: [CjmImageUpload],
    components: {
      TraceImageUploadItem
    },
    props: {
      urlTitleGroups: Array,
      /**
       * 是否支持设置每张图片的标题
       * */
      setTitle: Boolean
    },
    watch: {
      urlTitleGroups(){
        this.$nextTick(() => {
          if (this.urlTitleGroups) {
            this.urlTitleGroups.forEach((item) => {
              this.setTitleByImgUrl(item.url, item.title);
            });
          }
        });
      }
    },
    methods: {
      getTitleByImgUrl(imgUrl){
        let title = '';
        let imgItemFilter = this.$refs.imgItems.filter((imgItem) => {
          return imgItem.imgUrl === imgUrl;
        })[0];
        if (imgItemFilter) {
          title = imgItemFilter.titleText;
        }
        return title;
      },
      setTitleByImgUrl(imgUrl, title){
        let imgItemFilter = this.$refs.imgItems.filter((imgItem) => {
          return imgItem.imgUrl === imgUrl;
        })[0];
        if (imgItemFilter) {
          imgItemFilter.titleText = title;
        }
      }
    }
  }
</script>
