<template>
  <div class="content clear">
    <div class="content-left"></div>
    <div class="content-right">
      <div class="content-right-top">
        <p style="font-size: 24px;">您使用的IE浏览器版本过低！</p>
        <p>为了保证您的用户体验，建议您按以下提示进行操作</p>
      </div>
      <div class="content-right-center">
        <p>1、如果您正在使用360浏览器、QQ浏览器、猎豹浏览器、搜狗浏览器等多核浏览器，您可以切换到”极速模式“</p>
        <img class="content-right-center-img" src="./assets/images/browser-example.png" alt="极速模式切换提示">
        <p>2、如果您正在使用IE浏览器，建议您使用Chrome浏览器打开本页面。还未安装？您可以去这里下载 <a target="_blank" href="http://dl.pconline.com.cn/download/51614.html">点击下载</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
.clear:after {
  content: '';
  display: block;
  clear: both;
}
.content {
  background: #fff;
  width: 1000px;
  height: 600px;
  margin-top: -300px;
  margin-left: -500px;
  padding: 50px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 6px;
  box-shadow: 5px 5px 15px #ddd;
}
.content-left {
  background: url(./assets/images/browser-left.png) no-repeat;
  background-size: 100%;
  background-position: center;
  width: 300px;
  height: 100%;
  float: left;
}
.content-right{
  float: left;
  width: 500px;
  height: 100%;
  margin-left: 100px;
  padding-top: 20px;
}
.content-right-top{
  background: url(./assets/images/browser-warn.png) no-repeat;
  background-size: 33px;
  background-position-y: 15px; 
  margin-bottom: 30px;

  p{
    margin-left: 50px;
    margin-bottom: 10px;
    color: #666;
  }
}
.content-right-center{
  p{
    font-size: 14px;
    color: #999;
    line-height: 30px;
  }
  a{
    text-decoration: underline;
  }
}
.content-right-center-img{
  margin-bottom: 20px;
}
</style>
