<template>
  <div id="tablevideo" :style="contentStyle">
  </div>
</template>
<script>
import { on, off } from 'framework/utils/dom';

require('../../../utils/video/swfobject');
window.devid = null;
window.self2 = null;
window.screenNum = '4';
window.setClickCallback2 = function(index) {
  for (let i = 0; i < parseInt(window.screenNum); i++) {
    document.getElementById('WebAPI3').setWindowSelected(false, i);
  }
  document.getElementById('WebAPI3').setWindowSelected(true, index);
  window.devid = document.getElementById('WebAPI3').getSelectedDevId();
  if (window.devid > 0) {
    window.self2.sendCommand(1000);
  } else {
    window.self2.$emit('setPTZ', false);
  }
};
window.self1 = null;
export default {
  name: 'video-list',
  data() {
    window.self2 = this;
    return {
      screenNum: '4',
      completeInit: false,
      palyerVideo: document.getElementById('WebAPI3'),
      contentStyle: {
        height: '100%',
        width: '100%'
      },
      nodeList: []
    };
  },
  watch: {},
  mounted() {
    this.onload();
    on(window, 'resize', this.resize);
    this.$nextTick(() => {
      this.resize();
      //this.init();
    });
  },
  destroyed() {
    off(window, 'resize', this.resize);
  },
  methods: {
    resize() {
      const height = document.documentElement.clientHeight - 158;
      const width = document.documentElement.clientWidth - 340 - 470;
      this.contentStyle = {
        height: `${height}px`,
        width: `${width}px`
      };
    },
    //屏幕分布
    setWindowNum(num) {
      if (num == 0) {
        document.getElementById('WebAPI3').toggleScreenMode();
        document
          .getElementById('WebAPI3')
          .setClickCallback('setClickCallback2', 0, 0);
      } else {
        window.screenNum = num;
        document.getElementById('WebAPI3').setWindowNum(num);
        for (var i = 0; i < num; i++) {
          document
            .getElementById('WebAPI3')
            .setClickCallback('setClickCallback2', i, i);
        }
      }
    },
    //打开视频
    playVideo(deviceCode, deviceName) {
      document
        .getElementById('WebAPI3')
        .playVideo('rtmp://dev.svideo.com.cn/myapp', deviceCode, deviceName);
    },
    //关闭视频
    stopVideo(deviceCode) {
      document.getElementById('WebAPI3').stopVideo(deviceCode);
      this.$emit('setPTZ', false);
    },
    rvalue() {
      var pageHost =
        document.location.protocol == 'https:' ? 'https://' : 'http://';
      var imgv = `<img src='${pageHost}www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' />`;
      return `<a href='http://www.adobe.com/go/getflashplayer'>${imgv}</a>`;
    },
    //设置PTZ
    sendCommand(num) {
      let self = this;
      if (window.devid != null) {
        var urlxx =
          '/SaiShangAPI/api_control/controlptz/?did=' +
          window.devid +
          '&op=' +
          num +
          '&speed=3';
        this.$ajax
          .get(urlxx)
          .then(r => {
            if (num == 1000) {
              if (r.indexOf('ok') >= 0 && r.indexOf('hasptz') >= 0) {
                self.$emit('setPTZ', true);
              }else{
                self.$emit('setPTZ', false);
              }
            } else {
              if (r.indexOf('ok') >= 0) {
                console.log('成功');
              } else {
                console.log('失败');
              }
            }
          })
          .catch();
      }
    },
    //初始化flas
    onload() {
      window.self1 = this;
      var isFlashInstalled =
        (navigator.plugins && navigator.plugins['Shockwave Flash']) ||
        (window.ActiveXObject &&
          !!new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
      //alert(isFlashInstalled);
      var vhtml = document.getElementById('tablevideo');
      //var ip = '../../../../../static/extentions/video';
      var ip = this.$globalData.get('trace', 'appConfig').videoPluginUrl;
      if (isFlashInstalled) {
        vhtml.innerHTML =
          "<div id='flashContent'>" +
          '<p>' +
          'To view this page ensure that Adobe Flash Player version ' +
          '11.1.0 or greater is installed. ' +
          '</p>' +
          this.rvalue() +
          '</div>' +
          '<noscript>' +
          "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='100%' height='100%' id='WebAPI3'>" +
          "<param name='movie' value='" +
          ip +
          "/WebAPI3.swf' />" +
          "<param name='quality' value='high' />" +
          "<param name='bgcolor' value='#ffffff' />" +
          "<param name='allowScriptAccess' value='always' />" +
          "<param name='allowFullScreen' value='true' />" +
          "<param name='allowNetworking' value='all'>" +
          '<!--[if !IE]>-->' +
          "<object type='application/x-shockwave-flash' data='" +
          ip +
          "/WebAPI3.swf' width='100%' height='100%'>" +
          "<param name='quality' value='high' />" +
          "<param name='bgcolor' value='#ffffff' />" +
          "<param name='allowScriptAccess' value='always' />" +
          "<param name='allowFullScreen' value='true' />" +
          "<param name='allowNetworking' value='all'>" +
          '<!--<![endif]-->' +
          '<!--[if gte IE 6]>-->' +
          '<p> ' +
          'Either scripts and active content are not permitted to run or Adobe Flash Player version' +
          '11.1.0 or greater is not installed.' +
          '</p>' +
          '<!--<![endif]-->' +
          "<a href='http://www.adobe.com/go/getflashplayer'>" +
          "<img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash Player' />" +
          '</a>' +
          '<!--[if !IE]>-->' +
          '</object>' +
          '<!--<![endif]-->' +
          '</object>' +
          '</noscript>';
        // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection.
        var swfVersionStr = '11.1.0';
        // To use express install, set to playerProductInstall.swf, otherwise the empty string.
        var xiSwfUrlStr = ip + '/playerProductInstall.swf';
        var flashvars = {};
        flashvars.initcompletecb = function() {
          setTimeout(() => {
            window.self1.init();
          }, 5);
        };
        flashvars.screenNum = this.screenNum;
        var params = {};
        params.quality = 'high';
        params.bgcolor = '#ffffff';
        params.allowscriptaccess = 'always';
        params.allowfullscreen = 'true';
        var attributes = {};
        attributes.id = 'WebAPI3';
        attributes.name = 'WebAPI3';
        attributes.align = 'middle';
        window.swfobject.embedSWF(
          ip + '/WebAPI3.swf',
          'flashContent',
          '100%',
          '100%',
          swfVersionStr,
          xiSwfUrlStr,
          flashvars,
          params,
          attributes
        );
        // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
        window.swfobject.createCSS(
          '#flashContent',
          'display:block;text-align:left;'
        );
      }
    },
    init() {
      for (var i = 0; i < 4; i++) {
        document
          .getElementById('WebAPI3')
          .setClickCallback('setClickCallback2', i, i);
      }
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
