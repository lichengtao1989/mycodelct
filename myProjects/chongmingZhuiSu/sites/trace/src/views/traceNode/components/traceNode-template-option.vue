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
      <cjm-form-item label="选项名称" :class="{'cjm-form-item-long':isLongInput}">
        <cjm-input v-model="item.fieldName" :maxlength="8" placeholder="最多不超过8个字符"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="选/必填" :class="{'cjm-form-item-long':isLongInput}">
        <cjm-radio class="radio" v-model="item.isRequired" :label="0">选填</cjm-radio>
        <cjm-radio class="radio" v-model="item.isRequired" :label="1">必填</cjm-radio>
      </cjm-form-item>
      <cjm-form-item label="h5下状态" :class="{'cjm-form-item-long':isLongInput}">
        <cjm-radio class="radio" v-model="item.showHidden" :label="1">显示</cjm-radio>
        <cjm-radio class="radio" v-model="item.showHidden" :label="0">隐藏</cjm-radio>
      </cjm-form-item>
      <cjm-form-item label="选项内容" class="cjm-form-item-long">
        <div class="cjm-short-input">
          <div>
            <cjm-radio class="radio" v-model="optionContent" label="1">从已有数据中选择</cjm-radio>
            <cjm-enum-select enum-namespace="trace" @input="dataModelInput(arguments[0],item.fieldExt,'dataType')"
                             :value="dataModel(item.fieldExt, 'dataType').itemValue" enum-name="溯源节点选项内容"
                             v-if="optionContent == 1"></cjm-enum-select>
          </div>
          <div>
            <cjm-radio v-model="optionContent" label="2">手动设置</cjm-radio>
          </div>
          <div class="cjm-setting-hand clear" v-if="optionContent == 2">
            <span class="explain">每项用回车隔开</span>
            <cjm-input type="textarea"
                       :row="4"
                       placeholder="每个单选项使用回车键隔开"
                       @input="codes(arguments[0],dataModel(item.fieldExt,'dataValue'))"
                       :value="dataModel(item.fieldExt, 'dataValue').itemValue">
            </cjm-input>
          </div>
        </div>
      </cjm-form-item>
    </div>
  </div>
</template>
<script>
  import util from '../util'
  export default{
    data(){
      return {
        optionContent: '1'
      }
    },
    props: ['item', 'index', 'isLongInput'],
    methods: {
      close(){
        this.$emit('deleteEvent', '子组件的数据');
      },
      codes(val, item){
        //console.log(val)
        val = val.trim().split('\n').filter(function (code) {
          return code != '';
        }).join('\n');
        for (let i = 0; i < val.length; i++) {
          if (val[i].length > 15) {
            this.$message('每个单选最多只能输入15个字');
            break;
          }
        }
        item.itemValue = val;
      },
      dataModel(fieldExt, type){
        if(type == 'dataValue'){
          util.findItemValue(fieldExt, type).itemValue = util.findItemValue(fieldExt, type).itemValue.split(',').join('\n');
        }
        return util.findItemValue(fieldExt, type);
      },
      dataModelInput(value, fieldExt, type){
        util.findItemValue(fieldExt, type).itemValue = value;
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
      optionContent(newVal, oldVal){
        if (newVal == 2) {
          this.dataModel(this.item.fieldExt, 'dataType').itemValue = '0';
        } else {
          this.dataModel(this.item.fieldExt, 'dataType').itemValue = '';
          this.dataModel(this.item.fieldExt, 'dataValue').itemValue = '';
        }
      }
    },
    mounted(){
      if (util.findItemValue(this.item.fieldExt, 'dataType').itemValue != '0') {
        this.optionContent = '1';
        this.dataModel(this.item.fieldExt, 'dataValue').itemValue = '';
      } else {
        this.optionContent = '2';
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

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

  .explain {
    font-size: 12px;
    color: @LightSilver;
  }
</style>
