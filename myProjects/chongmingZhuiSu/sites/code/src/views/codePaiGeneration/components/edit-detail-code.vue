<template>
  <div id="codePaiGeneraation">
    <div class="edit-form-item">
      <span class="edit-form-item-label">位置:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <span class="label">X</span>
          <input-number :controls="false" size="small" class="form-item-small-input" v-model="editData.X"></input-number>
          px
        </div>
        <div class="form-item-small">
          <span class="label">Y</span>
          <input-number :controls="false" size="small" class="form-item-small-input" v-model="editData.Y"></input-number>
          px
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">换行:</span>
      <div class="edit-form-item-content">
        <div class="form-item-radio">
          <cjm-radio v-model="radio" label="1">是</cjm-radio>
          <cjm-radio v-model="radio" label="0">否</cjm-radio>
        </div>
      </div>
    </div>
    <!--<div class="edit-form-item" v-if="editData.type == 'interiorCode'">-->
    <!--<span class="edit-form-item-label">内容:</span>-->
    <!--<div class="edit-form-item-content">-->
    <!--<div class="form-item-radio">-->
    <!--<cjm-radio v-model="editData.contentSourceType " :label="0">物流码</cjm-radio>-->
    <!--<cjm-radio v-model="editData.contentSourceType " :label="1">防伪码</cjm-radio>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="edit-form-item" v-if="editData.type == 'interiorCode'">
      <span class="edit-form-item-label">内容:</span>
      <div class="edit-form-item-content">
        <div class="form-item-radio">
          <cjm-radio v-model="radio2" :label="0">物流码</cjm-radio>
          <cjm-radio v-model="radio2" :label="1">防伪码</cjm-radio>
        </div>
      </div>
    </div>
    <div class="edit-form-item" v-if="editData.type == 'interiorCode'">
      <span class="edit-form-item-label">截取:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small" style="width: 300px;">
          从
          <input-number :controls="false" :min="1" size="small" class="form-item-small-input" v-model="editData.contentStartPosition"></input-number>
          位，到
          <input-number :controls="false" :min="1" size="small" class="form-item-small-input" v-model="editData.contentEndPosition"></input-number>
          位
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">字体:</span>
      <div class="edit-form-item-content">
        <cjm-select size="small" v-model="editData.fontName" class="edit-form-item-select">
          <cjm-option v-for="item in selectOption" :key="item.value" :label="item.value" :value="item.value"></cjm-option>
        </cjm-select>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">字体大小:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <input-number :controls="false" size="small" class="form-item-small-input" v-model="editData.fontSize"></input-number>
          px
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">字体颜色:</span>
      <div class="edit-form-item-content">
        <div class="edit-form-item-color">
          <color-picker v-model="editData.fontColor" size="small"></color-picker>
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">左右间距:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <input-number :controls="false" size="small" class="form-item-small-input" v-model="editData.wordSpace"></input-number>
          px
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">上下行距:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <input-number :controls="false" size="small" class="form-item-small-input" v-model="editData.rowSpace"></input-number>
          px
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">旋转度数:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <input-number :controls="false" size="small" class="form-item-small-input" v-model="editData.rotate"></input-number>
          Deg
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">空格:</span>
      <div class="edit-form-item-content">
        <div v-for="(item, index) in editData.specialWordSpace" :key="index">
          <div class="form-item-small" style="width: 105px;">
            第
            <input-number :controls="false" size="small" class="form-item-small-input" v-model="item.position"></input-number>
            位
          </div>
          <div class="form-item-small" style="width: 145px;">
            <span class="label">空格距离</span>
            <input-number :controls="false" size="small" class="form-item-small-input" v-model="item.distance"></input-number>
            px
          </div>
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">大码字体:</span>
      <div class="edit-form-item-content">
        <div class="form-item-small">
          <input-number :controls="false" size="small" class="form-item-small-input" v-model="editData.bigNumberFontSize"></input-number>
          px
        </div>
      </div>
    </div>
    <div class="edit-form-item">
      <span class="edit-form-item-label">大小码:</span>
      <div class="edit-form-item-content">
        <cjm-checkbox-group v-model="editData.bigNumberIndex" class="checkbox-group">
          <cjm-checkbox :label="number-1" v-for="(number, index) in codes" :border="true" :key="index"></cjm-checkbox>
        </cjm-checkbox-group>
        <ul class="clear number-codes">
          <li :data-number="index-1" :class="{active: isActiveCode(editData.bigNumberIndex, index-1)}" v-for="(number, index) in codes" :key="index-1">
            {{number}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { ColorPicker, inputNumber } from 'element-ui';
export default {
  components: {
    'color-picker': ColorPicker,
    'input-number': inputNumber
  },
  data() {
    return {
      radio: '', //是否换行
      radio2: 0,
      codes: [] //大小码按钮
    };
  },
  computed: {
    selectOption() {
      return this.fontNames.map(p => {
        return {
          value: p
        };
      });
    }
  },
  props: ['fontNames', 'editData', 'type'],
  methods: {
    createNumber(data) {
      this.codes = [];
      for (let i = 1; i <= data.code.length; ++i) {
        this.codes.push(i);
      }
    },
    isActiveCode(arr, index) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] - 1 == index) {
          return true;
        }
      }
      return false;
    },
    //处理编辑数据
    editDataInit(data) {
      this.createNumber(data);
      if (data) {
        this.radio = data.newLineIndex.length > 0 ? '1' : '0'; //切换换行按钮
        this.radio2 = data.contentSourceType;
        while (data.specialWordSpace.length < 2) {
          data.specialWordSpace.push({
            position: '',
            distance: ''
          });
        }
        if (data.contentStartPosition && data.contentEndPosition) {
          this.$emit('createInteriorCode', {
            type: data.contentSourceType,
            startIndex: data.contentStartPosition,
            endIndex: data.contentEndPosition
          });
        }
        //          this.$emit('createSpaceArr', {data: this.editData.specialWordSpace, type: this.editData.type, code: this.editData.code});
      }
    }
  },
  mounted() {
    this.editDataInit(this.editData);
  },
  watch: {
    editData: {
      handler(val) {
        this.editDataInit(val);
      },
      deep: true
    },
    radio(val) {
      if (val === '1') {
        let length = this.editData.code.length;
        let newLineIndex = length % 2 == 0 ? length / 2 : (length + 1) / 2;
        this.editData.newLineIndex = [newLineIndex];
      } else {
        this.editData.newLineIndex = [];
      }
    },
    radio2(val) {
      this.editData.contentSourceType = val;
    },
    'editData.specialWordSpace': {
      handler(val) {
        this.$emit('createSpaceArr', {
          data: val,
          type: this.editData.type,
          code: this.editData.code
        });
      },
      deep: true
    },
    'editData.fontColor': {
      handler(val) {
        if (!val) {
          this.editData.fontColor = '#000000';
        }
      }
    },
    'editData.wordSpace': {
      handler(val) {
        this.$emit('createSpaceArr', {
          data: this.editData.specialWordSpace,
          type: this.editData.type,
          code: this.editData.code
        });
      }
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../assets/css/config';

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
    .edit-form-item-color {
      margin-top: 3px;
    }
    .number-codes {
      width: 290px;
      margin-top: 7px;
      li {
        float: left;
        width: 24px;
        height: 24px;
        background: #ffffff;
        border: 1px solid #d6dee7;
        font-size: 12px;
        text-align: center;
        line-height: 24px;
        margin-right: 8px;
        margin-bottom: 10px;
        cursor: pointer;
        &.active {
          color: #20a0ff;
          border-color: #20a0ff;
        }
        &:nth-of-type(8n) {
          margin-right: 0;
        }
      }
    }
    .checkbox-group {
      position: absolute;
      margin-top: 7px;
      opacity: 0;
      &:after {
        content: '';
        display: block;
        clear: both;
      }
      .el-checkbox {
        float: left;
        width: 26px;
        height: 26px;
        margin-right: 8px;
        margin-bottom: 10px;
        margin-left: 0;
      }
    }
  }
}
</style>
<style lang="less">
  #codePaiGeneraation .edit-form-item-content .el-checkbox--medium{
    padding: 7px 14px 7px 10px;
  }
</style>
