<template>
  <div class="temp-datetime-content template clear">
    <div class="template-title clear">
      <div class="title-index">
        {{item.sortID + 1}}
      </div>
      <div class="opreate-btn">
        <i v-if="item.sortID != 0" @click="moveUp(item)"
           class="cjm-icon-chevron-down cjm-icon-rotate-180 move-up"></i>
        <i v-if="item.sortID != index - 1" @click="moveDown(item)" class="cjm-icon-chevron-down"></i>
        <i v-if="index != 1 && dataModel(item.fieldExt,'isSysDefine').itemValue == '0'" class="cjm-icon-close" @click="close"></i>
      </div>
    </div>
    <div class="template-content clear">
      <cjm-form-item label="时间名称" :class="{'cjm-form-item-long':isLongInput}">
        <cjm-input placeholder="最多不超过8个字符" :maxlength="8" v-model="item.fieldName"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="选/必填" v-if="dataModel(item.fieldExt,'isSysDefine').itemValue == '0'" :class="{'cjm-form-item-long':isLongInput}">
        <cjm-radio v-model="item.isRequired" :label="0">选填</cjm-radio>
        <cjm-radio v-model="item.isRequired" :label="1">必填</cjm-radio>
      </cjm-form-item>
      <cjm-form-item label="精确度" class="cjm-form-item-long">
        <cjm-radio v-model="dataModel(item.fieldExt,'dataFormat').itemValue"
                   label="yyyy,MM,dd">年-月-日
        </cjm-radio>
        <cjm-radio v-model="dataModel(item.fieldExt,'dataFormat').itemValue"
                   label="yyyy,MM,dd,HH,mm,ss">年-月-日 时-分-秒
        </cjm-radio>
      </cjm-form-item>
      <!--<cjm-form-item label="精确度" class="cjm-form-item-long">-->
      <!--<cjm-checkbox-group v-model="getDateFormat" @change="handleChecked">-->
      <!--<cjm-checkbox v-for="(checkItem,index) in dataFormat" :label="checkItem.value" :key="checkItem.value">-->
      <!--{{checkItem.checkedName}}-->
      <!--</cjm-checkbox>-->
      <!--</cjm-checkbox-group>-->
      <!--</cjm-form-item>-->
      <cjm-form-item label="h5下状态" class="cjm-form-item-long">
        <cjm-radio v-model="item.showHidden" :label="1">显示</cjm-radio>
        <cjm-radio v-model="item.showHidden" :label="0">隐藏</cjm-radio>
      </cjm-form-item>
      <cjm-form-item label="时间来源" v-if="dataModel(item.fieldExt,'isSysDefine').itemValue == '0'" class="cjm-form-item-long">
        <cjm-radio @input="dataModelInput(arguments[0],item.fieldExt,'dataSource')"
                   :value="dataModel(item.fieldExt,'dataSource').itemValue" label="1">录入时间
        </cjm-radio>
        <span class="prompt-word">(录入节点信息的时间)</span>
        <cjm-radio @input="dataModelInput(arguments[0],item.fieldExt,'dataSource')"
                   :value="dataModel(item.fieldExt,'dataSource').itemValue" label="2">手动设置
        </cjm-radio>

      </cjm-form-item>
      <cjm-form-item label="时间类型" class="cjm-form-item-long"
                     v-if="dataModel(item.fieldExt,'dataSource').itemValue == 2">
        <cjm-radio class="radio" @input="dataModelInput(arguments[0],item.fieldExt,'dataType')"
                   :value="dataModel(item.fieldExt,'dataType').itemValue" label="1">时间点
        </cjm-radio>
        <cjm-radio class="radio" @input="dataModelInput(arguments[0],item.fieldExt,'dataType')"
                   :value="dataModel(item.fieldExt,'dataType').itemValue" label="2">时间段
        </cjm-radio>
      </cjm-form-item>
    </div>
  </div>
</template>
<script>
  import util from '../util'
  export default{
    data(){
      return {
        test: '',
        lastDataFormat: util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue.split(','),
        dateModel: ['yyyy', 'MM', 'dd', 'HH', 'mm', 'ss'],
        dataFormat: [
          {
            checkedName: '年',
            value: 'yyyy'
          },
          {
            checkedName: '月',
            value: 'MM'
          },
          {
            checkedName: '日',
            value: 'dd'
          },
          {
            checkedName: '时',
            value: 'HH'
          },
          {
            checkedName: '分',
            value: 'mm'
          },
          {
            checkedName: '秒',
            value: 'ss'
          }
        ],
        getDateFormat: []
      }
    },
    props: ['item', 'index', 'isLongInput', 'isAddNodeList'],
    methods: {
      dataModel(fieldExt, type){
        return util.findItemValue(fieldExt, type);
      },
      dataModelInput(value, fieldExt, type){
        util.findItemValue(fieldExt, type).itemValue = value;
      },
      handleChecked(value){
        let nowArr = value;
        let lastArr = this.lastDataFormat;
        if (nowArr.length > lastArr.length) {
          nowArr.map((item, index) => {
            if (item !== lastArr[index]) {
              value.splice(0, value.length);
              for (let i = 0; i < this.dateModel.length; i++) {
                if (item === this.dateModel[i]) {
                  this.$set(value, i, this.dateModel[i]);
                  break;
                } else {
                  this.$set(value, i, this.dateModel[i]);
                }
              }
            }
          })
        } else {
          for (let j = 0; j < lastArr.length; j++) {
            if (lastArr[j] !== nowArr[j]) {
              value.splice(0, value.length);
              for (let i = 0; i < this.dateModel.length; i++) {
                if (lastArr[j] === this.dateModel[i]) {
                  break;
                } else {
                  this.$set(value, i, this.dateModel[i]);
                }
              }
              break;
            }
          }
        }
        if (nowArr.length === 0) {
          value.splice(0, value.length);
          this.$set(value, 0, 'yyyy');
        }
        this.lastDataFormat = nowArr;
        util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue = nowArr.join(',');
      },
      close(){
        this.$emit('deleteEvent', '子组件的数据');
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
    mounted(){
      //判断  精确度的值
      if (this.item) {
        let type = util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue;
        switch (type) {
          case 'yyyy':
            util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue = 'yyyy,MM,dd';
            break;
          case 'yyyy,MM':
            util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue = 'yyyy,MM,dd';
            break;
          case 'yyyy,MM,dd':
            util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue = 'yyyy,MM,dd';
            break;
          case 'yyyy,MM,dd,HH':
            util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue = 'yyyy,MM,dd,HH,mm,ss';
            break;
          case 'yyyy,MM,dd,HH,mm':
            util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue = 'yyyy,MM,dd,HH,mm,ss';
            break;
          case 'yyyy,MM,dd,HH,mm,ss':
            util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue = 'yyyy,MM,dd,HH,mm,ss';
            break;
        }
        this.getDateFormat = util.findItemValue(this.item.fieldExt, 'dataFormat').itemValue.split(',');
      }
    }
  }
</script>
<style lang="less">
  @import "../../../assets/css/config";

  .temp-datetime-content {
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

    .el-checkbox-group .el-checkbox:first-child {
      margin-left: 0;
    }

    &.template {
      background: #fff;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      border: 1px solid #ddd;
      margin: 15px 0;
      position: relative;
    }

    &.template:nth-of-type(1) {
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

    .prompt-word {
      color: @LightSilver;
      font-size: 12px;
    }
  }
</style>
