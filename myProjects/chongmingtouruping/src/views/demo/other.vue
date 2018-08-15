<template>
  <div style="padding: 30px;width:300px">
    <!---->
    <h3>按钮</h3>
    <nz-button>按钮</nz-button>
    <nz-button type="text">按钮</nz-button>
    <!---->
    <h3>输入框</h3>
    <nz-input placeholder="提示文字"></nz-input>
    <div style="margin-top: 20px">
      <nz-input type="textarea" rows="7" resize="none" placeholder="提示文字"></nz-input>
    </div>
    <!---->
    <h3>时间选择</h3>
    <nz-datepicker placeholder="日期选择" type="date"></nz-datepicker>
    <nz-datepicker placeholder="日期时间选择" type="datetime"></nz-datepicker>
    <nz-datepicker placeholder="日期段选择" type="daterange"></nz-datepicker>
    <nz-datepicker placeholder="日期时间段选择" type="datetimerange"></nz-datepicker>
  </div>
</template>
