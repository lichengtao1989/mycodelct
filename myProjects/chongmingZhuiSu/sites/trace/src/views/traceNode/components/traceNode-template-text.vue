<template>
  <div class="template clear">
    <div class="template-title clear">
      <div class="title-index">
        {{item.sortID + 1}}
      </div>
      <div class="opreate-btn">
        <i v-if="item.sortID != 0" @click="moveUp(item)" class="cjm-icon-chevron-down cjm-icon-rotate-180 move-up"></i>
        <i v-if="item.sortID != index - 1" @click="moveDown(item)" class="cjm-icon-chevron-down"></i>
        <i v-if="index != 1" class="cjm-icon-close" @click="close"></i>
      </div>
    </div>
    <div class="template-content clear">
      <cjm-form-item label="字段名称" :class="{'cjm-form-item-long':isLongInput}">
        <cjm-input v-model="item.fieldName" :maxlength="8" placeholder="最多不超过8个字符"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="默认值" :class="{'cjm-form-item-long':isLongInput}">
        <cjm-input @input="dataModelInput(arguments[0], item.fieldExt, 'defaultValue')"
                   :value="dataModel(this.item.fieldExt, 'defaultValue').itemValue" :maxlength="50"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="单位" :class="{'cjm-form-item-long':isLongInput}">
        <cjm-enum-select enum-namespace="trace" @input="dataModelInput(arguments[0], item.fieldExt, 'unitValue')"
                         :value="dataModel(this.item.fieldExt, 'unitValue').itemValue"
                         enum-name="溯源文字节点单位"></cjm-enum-select>
      </cjm-form-item>
      <cjm-form-item label="h5下状态" class="cjm-form-item-long">
        <cjm-radio v-model="item.showHidden" :label="1">显示</cjm-radio>
        <cjm-radio v-model="item.showHidden" :label="0">隐藏</cjm-radio>
      </cjm-form-item>
      <cjm-form-item label="选/必填" class="cjm-form-item-long">
        <cjm-radio v-model="item.isRequired" :label="0">选填</cjm-radio>
        <cjm-radio v-model="item.isRequired" :label="1">必填</cjm-radio>
      </cjm-form-item>
      <cjm-form-item label="位数限制" :class="{'cjm-form-item-long':isLongInput}">
        <div>
          <cjm-radio v-model="unlimited" label="1">无限制</cjm-radio>
        </div>
        <div class="cjm-short-input" style="margin-left: -15px;">
          <cjm-checkbox v-model="minValue">不少于</cjm-checkbox>
          <cjm-input @input="dataModelInput(arguments[0], item.fieldExt, 'minSize')"
                     :value="dataModel(item.fieldExt, 'minSize').itemValue"></cjm-input>
          <span class="cjm-more-wei">位</span>
        </div>
        <div class="cjm-short-input" style="margin-left: -15px;">
          <cjm-checkbox v-model="maxValue">不多于</cjm-checkbox>
          <cjm-input @input="dataModelInput(arguments[0], item.fieldExt, 'maxSize')"
                     :value="dataModel(item.fieldExt, 'maxSize').itemValue"></cjm-input>
          <span class="cjm-more-wei">位</span>
        </div>
      </cjm-form-item>
      <cjm-form-item label="文字限制" class="cjm-form-item-long">
        <cjm-checkbox-group v-model="wordValiateFormat">
          <cjm-checkbox label="chinese">中文</cjm-checkbox>
          <cjm-checkbox label="letter">英文</cjm-checkbox>
          <cjm-checkbox label="number">数字</cjm-checkbox>
          <cjm-checkbox label="symbol">特殊符号</cjm-checkbox>
        </cjm-checkbox-group>
      </cjm-form-item>
    </div>
  </div>
</template>
<script>
  import util from '../util'
  export default{
    data(){
      return {
        unlimited: '2',
        minValue: true,
        maxValue: true,
        wordValiateFormat: []
      }
    },
    props: ['item', 'index', 'isLongInput'],
    methods: {
      close(){
        this.$emit('deleteEvent', '子组件的数据');
      },
      dataModel(fieldExt, type){
        return util.findItemValue(fieldExt, type);
      },
      dataModelInput(value, fieldExt, type){
        util.findItemValue(fieldExt, type).itemValue = value;
        if (type === 'minSize' || type === 'maxSize') {
          if (value > 100) {
            value = 100;
          }
          if (type === 'minSize') {
            if (value == '') {
              this.minValue = false;
            } else {
              this.minValue = true;
            }
          } else if (type === 'maxSize') {
            if (value == '') {
              this.maxValue = false;
            } else {
              this.maxValue = true;
            }
          }
          this.$nextTick(() => {
            if (typeof value == 'string') {
              value = value.replace(/\D/g, '');
            }
            util.findItemValue(fieldExt, type).itemValue = value;
          })
        }
      },
      moveDown(item){
        item.sortID++;
        this.$emit('sortList', item.sortID);
      },
      moveUp(item){
        item.sortID--;
        this.$emit('sortList', item.sortID);
      }
    },
    watch: {
      minValue(newVal, oldVal){
        if (newVal === true || this.maxValue === true) {
          this.unlimited = '2';
        } else {
          this.unlimited = '1';
        }
        if (newVal === false) {
          this.item.fieldExt[4].itemValue = '';
        }
      },
      maxValue(newVal, oldVal){
        if (newVal === true || this.minValue === true) {
          this.unlimited = '2';
        } else {
          this.unlimited = '1';
        }
        if (newVal === false) {
          util.findItemValue(this.item.fieldExt, 'maxSize').itemValue = '';
        }
      },
      unlimited(newVal, oldVal){
        if (newVal === '1') {
          this.minValue = false;
          this.maxValue = false;
          util.findItemValue(this.item.fieldExt, 'minSize').itemValue = '';
          util.findItemValue(this.item.fieldExt, 'maxSize').itemValue = '';
        }
      },
      wordValiateFormat(newVal){
        util.findItemValue(this.item.fieldExt, 'valiateFormat').itemValue = newVal.join(',');
      }
    },
    mounted(){
      if (!util.findItemValue(this.item.fieldExt, 'minSize').itemValue) {
        this.minValue = false;
      }
      if (!util.findItemValue(this.item.fieldExt, 'maxSize').itemValue) {
        this.maxValue = false;
      }
      if (util.findItemValue(this.item.fieldExt, 'minSize').itemValue || util.findItemValue(this.item.fieldExt, 'maxSize').itemValue) {
        this.unlimited = false;
      }
      this.wordValiateFormat = util.findItemValue(this.item.fieldExt, 'valiateFormat').itemValue.split(',');
    }
  }
</script>
<style lang="less" scoped>
  .cjm-form .el-checkbox {
    margin-left: 15px;
  }

  .el-select, .el-input {
    width: 80%;
  }

  .cjm-short-input {
    margin-bottom: 10px;
  }

  .cjm-short-input .el-input, .cjm-short-input .el-select {
    width: 20%;
  }

  .cjm-short-input .cjm-more-wei {
    margin-left: 10px;
  }

  .cjm-setting-hand span {
    float: left;
    margin-right: 15px;
    margin-left: 24px;
    color: #ADA9A9;
  }

  .cjm-setting-hand .el-textarea {
    float: left;
    width: 60%;
  }

  .template {
    background: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin: 15px 0;
    position: relative;
  }

  .template:nth-of-type(1) {
    margin: 0 0 15px;
  }

  .template-title {
    width: 100%;
    border-bottom: 1px solid #dddddd;
    height: 36px;
  }

  .template-content {
    padding: 1% 2%;
  }

  .template-title i {
    display: inline-block;
    vertical-align: top;
  }

  .opreate-btn {
    float: right;
    margin-right: 10px;
    height: 100%;
  }

  .opreate-btn i {
    margin-right: 5px;
    cursor: pointer;
    line-height: 34px;
  }

  .opreate-btn i.move-up {
    margin-top: 2px;
  }

  .title-index {
    float: left;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    height: 100%;
    line-height: 36px;
  }
</style>
