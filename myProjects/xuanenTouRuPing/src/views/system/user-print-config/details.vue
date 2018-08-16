<template>
  <div style="min-height: 700px;background-color: #fff;">
    <h1 class="nz-h1 installation-steps">安装步骤</h1>
    <ul class="traceNavUl">
      <li>
        <div class="lihidden">
          <div class="circle" style=" margin-top: 18px;">1</div>
          <p>双击
            <img src="/static/img/idcard/1.jpg">打开“自动安装身份证云客户端.exe”，过程中点“下一步”完成安装即可。（若安装有360安全卫士，安装过程中360安全卫士如果有任何提示，请务必勾选“不再提示”，且选择“允许程序的所有操作”。安装完后可将“C:\BLAND”在360安全卫士“信任区”中“添加信任目录”。）安装完后重启计算机，桌面会生成<img src="/static/img/idcard/2.jpg"></p>
        </div>
      </li>
      <li class="">
        <div class="lihidden">
          <div class="circle" style=" margin-top: 58px;">2</div>
          <p>双击<img src="/static/img/idcard/2.jpg">打开“步联科技云接口”，任务栏中会出现<img src="/static/img/idcard/3.jpg">鼠标双击<img src="/static/img/idcard/3.jpg"> (如安装有360安全卫士，此过程中360安全卫士如果有任何提示，请务必勾选“不再提示”。且选择“允许程序的所有操作”），会显示如下界面状态：<img src="/static/img/idcard/4.jpg"></p>
        </div>
      </li>
      <li class="">
        <div class="lihidden">
          <div class="circle" style=" margin-top: 18px;">3</div>
          <p>连接好USB数据线，数据线的一端插在身份证阅读器上，另一端插在计算机主机主板上的USB接口，身份证阅读器指示灯的红灯会长亮，说明设备通电了。如果身份证阅读器指示灯的蓝灯会一直闪烁，就说明身份证阅读器已正常通讯，此时界面会提示“系统正常”，成如下状态：<img src="/static/img/idcard/5.jpg"></p>
        </div>
      </li>
      <li class="">
        <div class="lihidden">
          <div class="circle" style=" margin-top: 126px;">4</div>
          <p>如果驱动程序没装好，找到开始菜单程序里的“身份证云接口”，选择展开<img src="/static/img/idcard/6.jpg">，选择“安装USB-SDT驱动”，或者双击桌面上的图标<img src="/static/img/idcard/7.jpg">，进行自动安装身份证阅读器驱动。</p>
        </div>
      </li>
      <li class="">
        <div class="lihidden">
          <div class="circle" style=" margin-top: 28px;">5</div>
          <p>如果完成以上操作，且驱动程序安装好了，设备管理器里出现“密码设备”“SDT USB设备” `<img src="/static/img/idcard/8.jpg">，则身份证阅读器已经可以正常工作，只要配合相应的身份证阅读应用程序，即可实现相应的功能。</p>
        </div>
      </li>
      <li class="">
        <div class="lihidden">
          <div class="circle" style=" margin-top: 78px;">6</div>
          <p>做进一步设置，在任务栏中<img src="/static/img/idcard/3.jpg">鼠标右击<img src="/static/img/idcard/3.jpg">出现<img src="/static/img/idcard/9.jpg"> ，勾选“开机启动”。或者在任务栏中<img src="/static/img/idcard/3.jpg">，鼠标双击<img src="/static/img/idcard/3.jpg">，在“NetTerm”界面中点击一下齿轮，勾选“设置开机启动”（若安装有360安全卫士，安装过程中360安全卫士如果有任何提示，请务必勾选“不再提示”，且选择“允许程序的所有操作”）。设置完成之后就可以关闭窗口了，已经可以正常使用。如下图：<img src="/static/img/idcard/10.jpg"></p>
        </div>
      </li>
      <li class="">
        <div class="lihidden">
          <div class="circle" style=" margin-top: 18px;">7</div>
          <p>双击文件夹<img src="/static/img/idcard/11.jpg">，打开“ZKIDROnline.exe”，完成安装即可</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  watch: {},
  methods: {},
  created() {}
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.installation-steps {
  padding: 50px 0 10px 0;
  display: inline-block;
}
.circle {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  border: 2px solid #00a88a;
  color: #00a88a;
  line-height: 30px;
  font-size: 20px;
  text-align: center;
  float: left;
  margin-right: 15px;
}
.traceNavUl {
  width: 100%;
  margin-right: 10%;
  float: left;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  margin-bottom: 50px;
}
.traceNavUl li {
  list-style-type: none;
  float: left;
  width: 100%;
  img {
    vertical-align: bottom;
  }
  p {
    margin-left: 40px;
  }
}
.tabs {
  float: left;
}
.lihidden {
  line-height: 40px;
  float: left;
  margin-left: 60px;
  width: 90%;
}
</style>
