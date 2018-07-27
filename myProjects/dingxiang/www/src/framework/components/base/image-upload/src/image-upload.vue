<template>
  <div class="nz-image-upload">
    <template v-if="isShowItems">
      <image-upload-item v-for="(path,index) in val" :key="path+'-'+index" :uploadUrl="uploadUrl" :value="path" @uploadSuccess="editPath(index,$event)" @del-image="delImage(index)"></image-upload-item>
      <image-upload-item v-if="val.length < maxNumber" :uploadUrl="uploadUrl" key="novalue" @uploadSuccess="addPath"></image-upload-item>
      <div class="nz-image-upload-tips" v-if="tips">({{tips}})</div>
    </template>
  </div>
</template>
<script>
import imageUploadItem from './image-upload-item.vue';
export default {
  name: 'nz-image-upload',
  components: { imageUploadItem },
  props: {
    //
    value: { type: [String, Array], required: true },
    //最大上传文件个数 默认1
    maxNumber: { type: Number, default: 1 },
    //
    uploadUrl: { type: String, default: '' },
    /**
     * 提示语
     */
    tips: String
  },
  data() {
    return {
      isShowItems: true,
      val: [],
      valueType: null
    };
  },
  watch: {
    val: {
      handler: function() {
        this.val2value();
      },
      deep: true
    },
    value: {
      handler: function() {
        this.init();
      },
      deep: true
    }
  },
  methods: {
    async reviewItems() {
      this.isShowItems = false;
      await this.$nextTick();
      this.isShowItems = true;
    },
    delImage(index) {
      this.val.splice(index, 1);
      this.reviewItems();
    },
    editPath(index, path) {
      this.$emit('successFile', { index, path });
      console.log(index, path);
      this.val[index] = path;
      this.reviewItems();
    },
    addPath(path) {
      this.val.push(path);
      this.reviewItems();
    },
    init() {
      this.valueType = typeof this.value;
      if (this.valueType === 'string' && this.maxNumber > 1) {
        console.error('当maxNumber大于1时,value必须是数组');
      }
      this.value2val();
    },
    value2val() {
      if (this.valueType === 'string') {
        //value是string
        this.val = [this.value];
      } else {
        //value是Array
        this.val = this.value;
      }
    },
    val2value() {
      if (this.valueType === 'string') {
        this.$emit('input', this.val.length > 0 ? this.val[0] : '');
      }
    }
  },
  created() {
    this.init();
  }
};
</script>
<style rel="stylesheet/less" lang="less">
.nz-image-upload {
  display: inline-block;
  &.readonly {
    .nz-icon-close,
    .nz-icon-upload {
      display: none !important;
    }
  }
}
.nz-image-upload-tips {
  clear: both;
  font-size: 12px;
  color: #bbb;
}
</style>
