<template>
  <div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">大小:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <span class="label">宽</span>
          <input-number :controls="false" size="small" class="form-item-small-input" v-model="editData.width"
                        @keyup.up.native="upEvent()"></input-number>
          px
        </div>
        <div class="form-item-small">
          <span class="label">高</span>
          <input-number :controls="false" size="small" class="form-item-small-input"
                        v-model="editData.height"></input-number>
          px
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">位置:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <span class="label">x</span>
          <input-number :controls="false" size="small" class="form-item-small-input"
                        v-model="editData.X"></input-number>
          px
        </div>
        <div class="form-item-small">
          <span class="label">y</span>
          <input-number :controls="false" size="small" class="form-item-small-input"
                        v-model="editData.Y"></input-number>
          px
        </div>
      </div>
    </div>
    <!--<div class="edit-form-item">-->
    <!--<span class="edit-form-item-label">旋转度数:</span>-->
    <!--<div class="edit-form-item-content">-->
    <!--<div class="form-item-small">-->
    <!--<input-number :controls="false" size="small" class="form-item-small-input" v-model="editData.rotate"></input-number>-->
    <!--Deg-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="edit-form-item" v-if="type == 'randomImage'">
      <span class="edit-form-item-label">颜色:</span>
      <div class="edit-form-item-content">
        <div class="form-item-radio">
          <cjm-radio v-model="isColor" :label="true">彩图</cjm-radio>
          <cjm-radio v-model="isColor" :label="false">黑白</cjm-radio>
        </div>
      </div>
    </div>
    <div class="edit-form-item" v-if="type == 'randomImage'">
      <span class="edit-form-item-label">图库:</span>
      <div class="edit-form-item-content">
        <cjm-select size="small" v-model="editData.imageLibraryName" class="edit-form-item-select">
          <cjm-option v-for="item in selectOption" :key="item.value" :label="item.value"
                      :value="item.value"></cjm-option>
        </cjm-select>
      </div>
    </div>
    <div class="edit-form-item" v-if="type == 'logo'">
      <span class="edit-form-item-label">内嵌图标:</span>
      <div class="edit-form-item-content">
        <cjm-image-upload v-model="editData.url"></cjm-image-upload>
      </div>
    </div>
  </div>
</template>
<script>
  import util from '../util'
  import {inputNumber} from 'element-ui'
  export default{
    components: {
      'input-number': inputNumber
    },
    data(){
      return {
        isColor: true
      }
    },
    props: ['editData', 'type', 'randomImageLibraries'],
    computed: {
      selectOption(){
        return this.randomImageLibraries.map((p, i) => {
          return {
            value: p
          }
        });
      }
    },
    methods: {
      upEvent(){
        util.upEvent();
      },
      editDataInit(data){
        this.isColor = data.isColour;
      }
    },
    watch: {
      editData: {
        handler(val){
          this.editDataInit(val);
        },
        deep: true
      },
      isColor(val){
        this.editData.isColour = val;
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .cjm-page-router .cjm-form .el-form-item {
    margin: 5px 0;
  }

  .edit-form-item {
    position: relative;
    font-size: 13px;
    &:after {
      content: '';
      clear: both;
      display: block;
    }
    .edit-form-item-label {
      width: 74px;
      float: left;
      text-align: left;
      padding: 11px 0px 11px 20px;
    }
    .edit-form-item-content {
      position: relative;
      float: left;
      width: 273px;
      &:after {
        content: '';
        clear: both;
        display: block;
      }
      .form-item-small {
        float: left;
        width: 125px;
        margin: 6px 10px 6px 0;
        .form-item-small-input {
          width: 60px;
          margin-right: 5px;
        }
        .label {
          margin-right: 5px;
          min-width: 26px;
          display: inline-block;
        }
      }
      .form-item-radio {
        margin-top: 9px;
        .el-radio {
          min-width: 80px;
        }
      }
      .edit-form-item-select {
        margin-top: 6px;
        width: 125px;
      }
    }
  }

</style>
