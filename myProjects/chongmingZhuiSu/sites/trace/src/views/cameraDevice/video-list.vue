<template>
  <div>
    <ready-video style="float:left;" @setPTZ="setPTZ" ref="readyVideo"></ready-video>
    <ul class="screen-row" :style="contentHeight">
      <li v-for="screen in screenArr" :class="{'active': screen.isActive}" :key="screen.className">
        <i :class="screen.className" @click="setScreenNum(screen.screenNum)" :title="screen.content"></i>
      </li>
      <div class="ptz" v-show="isPTZ"><img src="../../assets/images/ptz.png" alt="" hidefocus="true" border="0" usemap="#Map">
        <map name="Map" id="Map">
          <area shape="poly" coords="10,13,24,28,55,25,61,12,38,1" @click="PTZControl(18);" title="上">
          <area shape="poly" coords="10,14,3,45,15,63,24,51,22,29" @click="PTZControl(20);" title="左">
          <area shape="poly" coords="26,56,15,62,42,71,62,68,51,52" @click="PTZControl(19);" title="下">
          <area shape="poly" coords="55,24,69,14,74,48,65,63,54,49" @click="PTZControl(21);" title="右">
        </map>
      </div>
      <li v-for="item in ptzArr" v-show="isPTZ" :class="{'active': item.isActive}" :key="item.className">
        <i :class="item.className" @click="PTZControl(item.screenNum)" :title="item.content"></i>
      </li>
    </ul>
    <div class="camera-list" :style="contentHeight">
      <cjm-scrollbar>
        <div class="monitoring-points">
          监控列表
        </div>
        <div class="search">
          <i class="cjm-search-button el-icon-search search-icon" @click="search"></i>
          <div class="search1">
            <cjm-remote-select class="search-select" placeholder="请输入内容搜索" v-model="searchDevice" value-key="deviceCode" label-key="deviceName" :fetch-data="fetchData" @select="search" @keydown.native="keydowndSearch">
              <template slot-scope="scope">{{scope.item.deviceName}}
                <span class="cjm-option-subtitle">({{scope.item.deviceCode}})</span>
              </template>
            </cjm-remote-select>
          </div>
        </div>
        <div class="group-list">
          <cjm-checkbox v-for="camera in cameraInfo" class="device-name-check" :key="camera.deviceName" v-model="camera.checked" :label="camera.deviceCode" :class="{'seletced':camera.checked}" @change="cameraPlay(camera)">
            <i class="cjm-icon-video video" :class="{'cjm-icon-video-disabled':camera.status==0 }"></i>
            <span :title="camera.deviceName">{{camera.deviceName}}</span>
          </cjm-checkbox>
        </div>
      </cjm-scrollbar>
    </div>
  </div>
</template>

<script>
import readyVideo from './components/ready-video.vue';

export default {
  components: {
    readyVideo
  },
  data() {
    return {
      contentHeight: {
        height: '100%'
      },
      searchDevice: '',
      isPTZ: false,
      screenArr: [
        {
          className: 'cjm-icon-screen-1',
          isActive: false,
          screenNum: 1,
          content: '单屏显示'
        },
        {
          className: 'cjm-icon-screen-4',
          isActive: true,
          screenNum: 4,
          content: '四屏显示'
        },
        {
          className: 'cjm-icon-screen-9',
          isActive: false,
          screenNum: 9,
          content: '九屏显示'
        }
      ],
      ptzArr: [
        {
          className: 'cjm-icon-focus-far',
          isActive: false,
          screenNum: 2,
          content: '远景'
        },
        {
          className: 'cjm-icon-focus-near',
          isActive: false,
          screenNum: 1,
          content: '近景'
        }
        // {
        //   className: 'cjm-icon-aperture-out',
        //   isActive: false,
        //   screenNum: 9,
        //   content: '光圈放大'
        // },
        // {
        //   className: 'cjm-icon-aperture-in',
        //   isActive: false,
        //   screenNum: 10,
        //   content: '光圈缩小'
        // }
      ],
      deviceArr: [],
      cameraInfo: [],
      cameraArr: []
    };
  },
  watch: {
    searchDevice: function() {
      this.cameraInfo = this.cameraArr;
    }
  },
  methods: {
    setScreenNum(num) {
      for (let i = 0; i < this.screenArr.length; i++) {
        let obj = this.screenArr[i];
        this.$set(obj, 'isActive', false);
        if (num == obj.screenNum) {
          this.$set(obj, 'isActive', true);
        }
      }
      this.$refs.readyVideo.setWindowNum(num);
    },
    fetchData(query, search) {
      search(
        this.cameraInfo.filter(o => {
          return o.deviceName.indexOf(query) >= 0;
        })
      );
    },
    getDeviceList() {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').cameraDevice.GET_LIST)
        .then(r => {
          if (r.resultCode == 200) {
            this.cameraInfo = r.data.rows;
            this.cameraArr = r.data.rows;
            for (let i = 0; i < this.cameraInfo.length; i++) {
              this.$set(this.cameraInfo[i], 'checked', false);
              this.$set(this.cameraArr[i], 'checked', false);
            }
          } else {
            this.$message.error(r.data.msg);
          }
        })
        .catch();
    },
    search() {
      if (this.searchDevice != '') {
        this.cameraInfo = this.cameraArr.filter(o => {
          return o.deviceCode == this.searchDevice;
        });
      }
    },
    setPTZ(val) {
      this.isPTZ = val;
    },
    setCamera(deviceName) {
      return deviceName.length > 12 ? deviceName.substring(0, 11) + '...' : deviceName;
    },
    cameraPlay(camera) {
      if (camera.status == 1) {
        if (camera.checked) {
          this.$refs.readyVideo.playVideo(camera.deviceCode, this.setCamera(camera.deviceName));
        } else {
          this.$refs.readyVideo.stopVideo(camera.deviceCode);
        }
      } else {
        this.$message.error('设备已禁用');
        this.$set(camera, 'checked', false);
      }
    },
    keydowndSearch() {
      this.cameraInfo = this.cameraArr;
    },
    PTZControl(num) {
      this.$refs.readyVideo.sendCommand(num);
    }
  },
  mounted() {
    this.getDeviceList();
    this.$nextTick(() => {
      const height = this.$refs.readyVideo.contentStyle.height;
      this.contentHeight = {
        height: height
      };
    });
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';

.screen-row {
  width: 60px;
  height: 100%;
  float: left;
  margin: 0 15px;
  & > li {
    text-align: center;
    font-size: 38px;
    color: #bcbcbc;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin: 0 auto 10px;
  }
  & > li:hover {
    color: #ffffff;
    border: 1px solid #358dd7;
    background-color: #358dd7;
    cursor: pointer;
  }
  .active {
    color: #ffffff;
    border: 1px solid #358dd7;
    background-color: #358dd7;
    cursor: pointer;
  }
}
.camera-list {
  float: left;
  width: 320px;
  height: 100%;
  border: 1px solid #ededed;
}
.monitoring-points {
  background-color: #eff2f7;
  color: #323232;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  width: 300px;
  padding-left: 20px;
}
.search-select {
  padding: 15px 0px 15px 15px;
  width: 241px;
}
.cjm-search-input {
  float: left;
  width: 162px;
  height: 22px;
  line-height: 22px;
  padding: 5px 12px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  border: 1px solid #ccc;
}

.cjm-search-button {
  float: left;
  width: 48px;
  height: 36px;
  line-height: 36px;
  color: #fff;
  text-align: center;
  border: none;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #3493e6;
  cursor: pointer;
}
.search-icon {
  float: right;
  height: 36px;
  margin-top: 15px;
  margin-right: 18px;
  position: absolute;
  right: 0;
}
.device-name-check {
  margin-left: 0px;
  padding-left: 15px;
  width: 305px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}
.seletced {
  background-color: #eff2f7;
}
.video {
  border: 1px #c0ccda solid;
  color: #c0ccda;
  border-radius: 2px;
  font-size: 20px;
  line-height: 28px;
  height: 28px;
  width: 28px;
  margin: 5px 5px 5px 15px;
  text-align: center;
}
.ptz {
  margin-left: -8px;
}
#map area {
  outline: none;
}
</style>
