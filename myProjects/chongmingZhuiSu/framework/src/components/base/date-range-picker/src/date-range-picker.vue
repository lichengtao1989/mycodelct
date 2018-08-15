<template>
  <div class="cjm-date-range-picker clear">
    <div class="cjm-date-range-picker-item">
      <cjm-date-picker placeholder="请选择起始时间"
                       :picker-options="beginTimeOption"
                       :type="type"
                       :format="format"
                       :disabled="disabled"
                       v-model="dateBeginTime"></cjm-date-picker>
    </div>
    <div class="cjm-date-range-picker-separator">--</div>
    <div class="cjm-date-range-picker-item">
      <cjm-date-picker placeholder="请选择结束时间"
                       :picker-options="endingTimeOption"
                       :type="type"
                       :format="format"
                       :disabled="disabled"
                       v-model="dateEndTime"></cjm-date-picker>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'cjm-date-range-picker',
    props: {
      /**
       * 时间段 示例:2017/1/1~2017/2/1
       */
      value: String,
      /**
       * 分隔符
       */
      separator: {
        type: String,
        default: '~'
      },
      /**
       * 禁用，默认否
       */
      disabled: Boolean,
      /**
       * 开始时间
       */
      beginTime: String,
      /**
       * 结束时间
       */
      endTime: String,
      /**
       * 类型
       */
      type: {
        type: String,
        default: 'date'
      },
      /**
       * 时间格式 默认：yyyy/MM/dd 可选值参考element-ui
       */
      format: {
        type: String
      }
    },
    data(){
      let self = this;
      return {
        beginTimeOption: {
          disabledDate(time){
            if (self.dateEndTime !== '') {
              return time.getTime() > new Date(self.dateEndTime).getTime();
            }
          }
        },
        endingTimeOption: {
          disabledDate(time){
            if (self.dateBeginTime !== '') {
              return time.getTime() < new Date(self.dateBeginTime).getTime();
            }
          }
        }
      }
    },
    computed: {
      dateBeginTime: {
        get(){
          if (this.value) {
            let times = this.value.split(this.separator);
            return times.length === 2 ? times[0] : '';
          } else {
            return this.beginTime || '';
          }
        },
        set(val){
          if (val || this.dateEndTime) {
            this.$emit('input', val + this.separator + this.dateEndTime);
          } else {
            this.$emit('input', '');
          }
          this.$emit('update:beginTime', val);
        }
      },
      dateEndTime: {
        get(){
          if (this.value) {
            let times = this.value.split(this.separator);
            return times.length === 2 ? times[1] : '';
          }
          return this.endTime || '';
        },
        set(val){
          if (val || this.dateBeginTime) {
            this.$emit('input', this.dateBeginTime + this.separator + val);
          } else {
            this.$emit('input', '');
          }
          this.$emit('update:endTime', val);
        }
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  @import "../../../../assets/css/config";

  .cjm-date-range-picker {
    position: relative;

    .cjm-date-range-picker-item {
      width: 50%;
      float: left;
      box-sizing: border-box;

      &:first-child {
        padding-right: 15px;
      }

      &:last-child {
        padding-left: 15px;
      }
    }

    .cjm-date-range-picker-separator {
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -6px;
      color: @LightSilver;
    }
  }
</style>
