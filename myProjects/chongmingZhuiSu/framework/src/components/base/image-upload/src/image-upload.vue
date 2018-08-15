<template>
  <div>
    <cjm-image-upload-item v-for="(img,index) in imgs"
                           :key="index"
                           :value="img"
                           :disabled="disabled"
                           :item-style="itemStyle"
                           @uploadSuccess="handleUploadSuccess(arguments[0],index)"
                           @delete="handleDelete(index)"></cjm-image-upload-item>
    <p class="cjm-image-upload-tips" v-if="tips">({{tips}})</p>
  </div>
</template>

<script>
  import CjmImageUploadItem from './image-upload-item'
  /**
   * 图片上传组件
   */
  export default{
    name: 'cjm-image-upload',
    data(){
      return {
        imgs: ['']
      }
    },
    components: {
      CjmImageUploadItem
    },
    props: {
      /**
       * 是否支持多图上传，默认：flase
       */
      multiple: Boolean,
      /**
       * 支持3种方式传入 1、url字符串 2、用逗号隔开的url字符串 3、url字符串数组
       */
      value: [Array, String],
      /**
       * 最多上传的图片数量
       */
      maxNumber: Number,
      /**
       * 提示语
       */
      tips: String,
      /**
       * 是否禁用
       */
      disabled: Boolean,
      /**
       * 自定义样式
       */
      itemStyle: Object,
      /**
       * 删除之前调用的钩子，返回Promise
       */
      beforeDelete: Function
    },
    watch: {
      value(){
        this.formatValue();
      }
    },
    methods: {
      handleUploadSuccess(img, index){
        if (!this.imgs[index] && this.multiple) {
          this.imgs.push('');
        }
        this.imgs[index] = img;
        this.emitInput();
      },
      handleDelete(index){
        if(this.beforeDelete && typeof this.beforeDelete === 'function'){
          this.beforeDelete().then(()=> {
            this.imgs.splice(index, 1);
            this.emitInput();
          }).catch(()=> {});
        } else {
          this.imgs.splice(index, 1);
          this.emitInput();
        }
      },
      emitInput(){
        if (this.multiple) {
          this.$emit('input', this.imgs.filter((d)=> {
            return d != ''
          }));
        } else {
          this.$emit('input', this.imgs[0]);
        }
      },
      formatValue(){
        this.imgs = [''];
        if (this.value) {
          if (!this.multiple) {
            if (typeof this.value === 'string') {
              this.imgs[0] = this.value;
            } else if (this.value.length > 0) {
              this.imgs[0] = this.value[0];
            }
          } else {
            if (typeof this.value === 'string') {
              this.imgs = [];
              let items = this.value.split(',');
              for (let i = 0; i < items.length; i++) {
                if (items[i]) {
                  this.imgs.push(items[i]);
                }
              }
              if (!this.disabled) {
                this.imgs.push('');
              }
            } else if (this.value.length > 0) {
              this.imgs = this.value.slice(0);
              if (!this.disabled) {
                this.imgs.push('');
              }
            }
            if (this.maxNumber > 0 && this.imgs.length > this.maxNumber) {
              this.imgs = this.imgs.slice(0, this.maxNumber);
            }
          }
        }
      }
    },
    created(){
      this.formatValue();
    }
  }
</script>

<style>
  .cjm-image-upload-tips {
    clear: both;
    font-size: 12px;
    color: #bbb;
  }
</style>
