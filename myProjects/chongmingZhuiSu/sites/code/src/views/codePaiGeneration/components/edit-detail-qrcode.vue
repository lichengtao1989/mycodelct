<template>
  <div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">大小:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <span class="label">宽</span>
          <input-number :controls="false" :min="0" size="small" class="form-item-small-input"
                        v-model="editData.width"></input-number>
          px
        </div>
        <div class="form-item-small">
          <span class="label">高</span>
          <input-number :controls="false" :min="0" size="small" class="form-item-small-input"
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
    <div class="edit-form-item">
      <span class="edit-form-item-label">参数:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <span class="label">等级</span>
          <cjm-input size="small" class="form-item-small-input" v-model="editData.level"></cjm-input>
        </div>
        <div class="form-item-small">
          <span class="label">缩放</span>
          <cjm-input size="small" class="form-item-small-input" v-model="editData.scale"></cjm-input>
        </div>
        <div class="form-item-small">
          <span class="label">版本</span>
          <cjm-input size="small" class="form-item-small-input" v-model="editData.barEdition"></cjm-input>
        </div>
        <div class="form-item-small">
          <span class="label">掩模</span>
          <cjm-input size="small" class="form-item-small-input" v-model="editData.mask"></cjm-input>
        </div>
        <div class="form-item-small">
          <span class="label">边框</span>
          <cjm-input size="small" class="form-item-small-input" v-model="editData.edgLen"></cjm-input>
        </div>
        <div class="form-item-small">
          <span class="label">分辨率</span>
          <cjm-input size="small" class="form-item-small-input" v-model="editData.dPI"></cjm-input>
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">旋转度数:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <input-number :controls="false" size="small" class="form-item-small-input"
                        v-model="editData.rotate"></input-number>
          Deg
        </div>
      </div>
    </div>
    <!--<div class="edit-form-item">-->
    <!--<span class="edit-form-item-label">内嵌图标:</span>-->
    <!--<div class="edit-form-item-content">-->
    <!--<cjm-image-upload v-model="value" style="margin-top: 12px;"></cjm-image-upload>-->
    <!--</div>-->
    <!--</div>-->
    <div class="edit-form-item">
      <span class="edit-form-item-label">内容:</span>
      <div class="edit-form-item-content">
        <div class="form-item-radio">
          <cjm-radio v-model="isLogistics" :label="false">防伪码</cjm-radio>
          <cjm-radio v-model="isLogistics" :label="true">物流码</cjm-radio>
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">颜色:</span>
      <div class="edit-form-item-content">
        <div class="form-item-radio">
          <cjm-radio v-model="isColor" :label="false">黑白</cjm-radio>
          <cjm-radio v-model="isColor" :label="true">彩色</cjm-radio>
        </div>
      </div>
    </div>
    <div class="edit-form-item" v-if="isColor == '1'">
      <span class="edit-form-item-label">颜色设置:</span>
      <div class="edit-form-item-content">
        <transition name="el-zoom-in-top">
          <div v-show="showMenuList" class="transition-box" :style="boxStyle">
            <p @click="copyColor">复制</p>
            <p @click="pasteColor">粘贴</p>
          </div>
        </transition>
        <div class="form-item-colors-title">
          <ul class="clear">
            <li>尾号</li>
            <li>左上</li>
            <li>右上</li>
            <li>左下</li>
            <li>右下</li>
          </ul>
        </div>
        <div class="form-item-colors" v-for="(item, index) in editData.colors">
          <span class="form-item-number">{{index}}</span>
          <div class="form-item-number-colors">
            <color-picker v-model="item[0]" @contextmenu.native.prevent="showMenu($event, index, 0)"></color-picker>
            <color-picker v-model="item[1]" @contextmenu.native.prevent="showMenu($event, index, 1)"></color-picker>
            <color-picker v-model="item[2]" @contextmenu.native.prevent="showMenu($event, index, 2)"></color-picker>
            <color-picker v-model="item[3]" @contextmenu.native.prevent="showMenu($event, index, 3)"></color-picker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {inputNumber, ColorPicker} from 'element-ui'
  import util from '../util'
  export default{
    components: {
      'input-number': inputNumber,
      'color-picker': ColorPicker
    },
    data(){
      return {
        value: '',
        isLogistics: '',
        isColor: '',
        showMenuList: false,
        boxStyle: {
          left: '',
          top: ''
        },
        colorBox: {
          row: 0,
          col: 0
        },
        copyColorBox: ''
      }
    },
    props: ['editData'],
    methods: {
      editDataInit(data){
        let colorsType = this.editData.colors[0] ? this.editData.colors[0][0].substr(0, 1) : '';
        this.isLogistics = data.isLogistics;
        this.isColor = data.isColour;
        while (this.editData.colors.length < 10) {
          this.editData.colors.push(['', '', '', '']);
        }
        if (colorsType && colorsType !== '#') {
          this.editData.colors = util.colorTypeChange(this.editData.colors);
        }
      },
      showMenu(e, row, col){
        this.colorBox.row = row;
        this.colorBox.col = col;
        if (this.showMenuList) {
          this.showMenuList = false;
        }
        this.boxStyle.top = 0 + row * 45 + e.layerY + 'px';
        this.boxStyle.left = -40 + col * 70 + e.layerX + 'px';
        this.showMenuList = true;
      },
      copyColor(){
        if (this.editData.colors[this.colorBox.row][this.colorBox.col]) {
          this.copyColorBox = this.editData.colors[this.colorBox.row][this.colorBox.col];
        }
        this.showMenuList = false;
      },
      pasteColor(){
        if (this.copyColorBox) {
          this.editData.colors[this.colorBox.row][this.colorBox.col] = this.copyColorBox;
        }
        this.showMenuList = false;
      }
    },
    mounted(){
      this.editDataInit(this.editData);
      document.onclick = () => {
        this.showMenuList = false;
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
      },
      isLogistics(val){
        this.editData.isLogistics = val;
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .transition-box {
    position: absolute;
    top: 0;
    left: 0;
    margin-bottom: 10px;
    width: 100px;
    border-radius: 4px;
    background-color: #ffffff;
    text-align: center;
    color: #000;
    box-sizing: border-box;
    margin-right: 20px;
    overflow: hidden;
    border: 1px solid #bfcbd9;
    z-index: 2;
    p {
      padding: 8px 0;
      cursor: pointer;
      &:hover {
        background: #20A0FF;
        color: #fff;
      }
    }
  }

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
      .form-item-colors-title {
        margin-top: 11px;
        color: @Black;
        ul li {
          float: left;
          &:not(:first-child) {
            width: 56px;
            margin-right: 4px;
            text-align: center;
          }
        }
      }
      .form-item-colors {
        position: relative;
        margin-top: 9px;
        .el-color-picker {
          margin-right: 2px;
        }
        .form-item-number {
          font-size: 20px;
          position: absolute;
          left: 0;
          top: 6px;
        }
        .form-item-number-colors {
          margin-left: 25px;
        }
      }
    }
  }

</style>
