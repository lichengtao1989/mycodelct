<template>
  <div class="cjm-date-range-quick-picker clear">
    <div class="cjm-date-range-quick-picker-radio">
      <cjm-radio-group v-model="radioIndex">
        <cjm-radio-button v-for="(radio,index) in radioOptions" :label="index" :key="radio.label">{{radio.label}}</cjm-radio-button>
      </cjm-radio-group>
    </div>
    <div class="cjm-date-range-quick-picker-date">
      <cjm-date-picker :type="datePickerType" v-model="currentValue" :format="format" :range-separator="rangeSeparator" :picker-options="pickerOptions" :placeholder="placeholder"></cjm-date-picker>
    </div>
  </div>
</template>
<script>
  function getIndex(value, options) {
    let resIndex = -1;
    options.find((item, index) => {
      if (item.value === value) {
        resIndex = index;
        return true;
      }
    });
    return resIndex;
  }
  export default {
    name: 'cjm-date-range-quick-picker',
    componentName: 'cjm-date-range-quick-picker',
    data(){
      return {
        radioIndex: getIndex(this.value, this.radioOptions),
        currentValue: this.value
      };
    },
    props: {
      placeholder: {type: String, default: '请选择日期'},
      datePickerType: {type: String, default: 'daterange'},
      pickerOptions: {type: Object, default: () => ({})},
      format: {type: String, default: 'yyyy/MM/dd'}, //日期格式化
      rangeSeparator: {type: String, default: ' ~ '}, //开始时间 结束时间 间隔符号
      radioOptions: { //单选按钮数组
        type: Array,
        default: function () {
          const now = new Date();
          const dayMilliseconds = 24 * 60 * 60 * 1000; //一天的毫秒数
          const day7 = (new Date(now - 7 * dayMilliseconds)).toString(this.format);
          const day15 = (new Date(now - 15 * dayMilliseconds)).toString(this.format);
          const day30 = (new Date(now - 30 * dayMilliseconds)).toString(this.format);
          const dayNow = now.toString(this.format);
          return [
            {label: '最近7天', value: `${day7}${this.rangeSeparator}${dayNow}`},
            {label: '最近15天', value: `${day15}${this.rangeSeparator}${dayNow}`},
            {label: '最近30天', value: `${day30}${this.rangeSeparator}${dayNow}`}
          ];
        }
      }, //单选按钮列表
      value: {type: String, required: true} //value
    },
    watch: {
      value: {
        handler: function () {
          this.currentValue = this.value;
          this.radioIndex = getIndex(this.value, this.radioOptions);
        }
      },
      currentValue: {
        handler: function () {
          this.$emit('input', this.currentValue);
        }
      },
      radioIndex: {
        handler: function () {
          const option = this.radioOptions[this.radioIndex];
          if (option) {
            this.currentValue = option.value;
          }
        }
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  .cjm-date-range-quick-picker {
    .cjm-date-range-quick-picker-radio {
      float: left;
      .el-radio-button:last-child .el-radio-button__inner {
        border-radius: 0;
      }
    }
    .cjm-date-range-quick-picker-date {
      overflow: hidden;
      min-width: 220px;
      max-width: 376px;
      .el-input__inner {
        border-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
</style>
