<template>
  <div class="employee-info" v-if="info">
    <!--<div class="employee-info-item" v-if="info.employeeName">
      <div class="employee-key">员工姓名</div>
      <div class="employee-value">{{info.employeeName}}</div>
    </div>-->
    <div class="employee-info-item" v-if="info.orgName">
      <div class="employee-key">所属机构</div>
      <div class="employee-value">{{info.orgName}}</div>
    </div>
    <div class="employee-info-item" v-if="sexText">
      <div class="employee-key">性别</div>
      <div class="employee-value">{{sexText}}</div>
    </div>
    <div class="employee-info-item" v-if="info.employeeNumber">
      <div class="employee-key">员工编号</div>
      <div class="employee-value">{{info.employeeNumber}}</div>
    </div>
    <div class="employee-info-item" v-if="info.position">
      <div class="employee-key">岗位</div>
      <div class="employee-value">{{info.position}}</div>
    </div>
    <div class="employee-info-item" v-if="employeePic.length>0">
      <div class="employee-key">照片信息</div>
      <div class="employee-value employee-pic">
        <div v-for="(pic,index) in employeePic" :key="index">
          <a :href="pic" target="_blank"><img :src="pic"/></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['employeeID'],
    data(){
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        info: null,
        traceApiUrl
      };
    },
    watch: {
      employeeID(){
        this.loadEmployeeInfo();
      }
    },
    computed: {
      sexText(){
        const sexEnum = this.$globalData.get('trace', 'enums')['性别'];
        const sexText = Object.keys(sexEnum).find(key => sexEnum[key] == this.info.sex) || '';
        return sexText;
      },
      employeePic(){
        return this.info.employeePic ? this.info.employeePic.split(',') : [];
      }
    },
    methods: {
      async loadEmployeeInfo(){
        let info = null;
        const {employeeID} = this;
        if (employeeID) {
          const {err, res} = await this.$ajaxSync.get(this.traceApiUrl.traceRecord.GET_EMPLOYEE_INFO, {employeeID});
          if (err) {
            console.error(err);
          } else {
            info = res.data;
          }
        }
        this.info = info;
      }
    },
    mounted(){
      this.loadEmployeeInfo();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .employee-info {
    font-size: 0;
    .employee-info-item {
      white-space: nowrap;
      margin: 20px 0;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .employee-key {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      line-height: 36px;
      margin-right: 15px;
      margin-left: -135px;
      width: 120px;
      text-align: right;
      color: #606266;
    }
    .employee-value {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      line-height: 36px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      &.employee-pic {
        white-space: normal;
        & > div {
          width: 110px;
          height: 110px;
          border: 1px solid #c2c2c2;
          box-sizing: border-box;
          font-size: 0;
          text-align: center;
          line-height: 110px;
          display: inline-block;
          vertical-align: top;
          margin-right: 5px;
          margin-bottom: 5px;
          & > a > img {
            display: inline-block;
            vertical-align: middle;
            max-width: 100px;
            max-height: 100px;
          }
        }
      }
    }
  }
</style>
