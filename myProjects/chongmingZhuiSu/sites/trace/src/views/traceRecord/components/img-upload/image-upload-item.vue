<template>
  <div>
    <div :class="itemClass" @click="handleClick" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <i v-show="showTips" class='cjm-imgUpload-item-tips el-icon-plus'></i>
      <img v-show="showImg" class='cjm-imgUpload-item-img' :src="imgUrl"/>
      <input class="cjm-imgUpload-item-file" type="file" ref="input" @change="handleChange">
      <div v-show="showProgress" class="cjm-imgUpload-item-progressWrap">
        <cjm-progress type="circle" :width="60" :status="progressStatus" :percentage="uploadProgress"></cjm-progress>
      </div>
      <div v-show="showMasker">
        <div class="cjm-imgUpload-item-masker">
          <i class="cjm-icon-preview" @click.stop="handlePreview"></i>
          <i class="cjm-icon-upload" @click.stop="handleUpload" v-if="!disabled"></i>
          <i class="cjm-icon-delete" @click.stop="handleDelete" v-if="!disabled"></i>
        </div>
      </div>
      <div class="img-title-set" v-if="setTitle&&imgUrl">
        <cjm-input class="title-input" type="text" v-model="titleText" placeholder="说明"></cjm-input>
      </div>
    </div>
    <cjm-dialog :visible.sync="dialogVisible" :showFooter="false" ref="previewDialog">
      <img :src="imgUrl" style="width:100%;"/>
    </cjm-dialog>
  </div>
</template>

<script>
  import CjmImageUploadItem from 'framework/components/base/image-upload/src/image-upload-item.vue';
  export default{
    name: 'trace-image-upload-item',
    mixins: [CjmImageUploadItem],
    data(){
      return {
        titleText: ''
      }
    },
    computed: {
      itemClass(){
        const classList = ['cjm-imgUpload-item'];
        if (!this.imgUrl) {
          classList.push('no-img-item');
        }
        if (this.setTitle && this.imgUrl) {
          classList.push('has-title-item');
        }
        return classList.join(' ');
      }
    },
    props: {
      setTitle: Boolean
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .cjm-imgUpload-item {
    &.has-title-item {
      float: none;
    }
    margin-bottom: 15px;
    &.no-img-item {
      margin-bottom: 0;
    }
  }

  .img-title-set {
    position: absolute;
    line-height: 20px;
    left: 110%;
    top: 50%;
    margin-top: -18px;
    .title-input {
      width: 336px;
    }
  }
</style>
