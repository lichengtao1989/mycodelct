<template>
  <div class="date-range">
    <cjm-date-picker class="activity-date-time"
                     type="date"
                     placeholder="请输入起始时间"
                     :picker-options="beginTimeOption"
                     v-model="dateBeginTime"></cjm-date-picker>
    -
    <cjm-date-picker class="activity-date-time"
                     type="date"
                     placeholder="请输入截至时间"
                     :picker-options="endingTimeOption"
                     v-model="dateEndTime"></cjm-date-picker>
  </div>
</template>
<script>
  export default{
    data(){
      let self = this;
      return {
        beginTimeOption: {
          disabledDate(time){
            if (self.endTime !== '') {
              return time.getTime() > new Date(self.endTime).getTime();
            }
          }
        },
        endingTimeOption: {
          disabledDate(time){
            if (self.beginTime !== '') {
              return time.getTime() < new Date(self.beginTime).getTime();
            }
          }
        }
      }
    },
    computed: {
      dateBeginTime: {
        get(){
          return this.beginTime;
        },
        set(val){
          this.$emit('update:beginTime', val);
        }
      },
      dateEndTime: {
        get(){
          return this.endTime;
        },
        set(val){
          this.$emit('update:endTime', val);
        }
      }
    },
    props: {
      beginTime: {
        type: String
      },
      endTime: {
        type: String
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../assets/css/config";

  .date-range {
    text-align: center;
    .activity-date-time {
      width: 48% !important;
      &:last-child {
        float: right;
      }
      &:first-child {
        float: left;
      }
    }
  }
</style>
