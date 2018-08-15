<template>
  <div class="commonbom">
    <div class="amap-wrapper">
      <el-amap vid="amapDemo" ref="map" :zoom="zoom" :center="center" :plugin="plugin" :events="events" :map-manager="amapManager">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :icon="marker.icon" :draggable="marker.draggable" :events="marker.events" :key="index"></el-amap-marker>
        <cjm-button @click="drawArea" class="delineation-area" v-if="currentPageInfo.pageType!= 'view' " :class="{ 'active': isDrawing}">
          <i class="cjm-icon-drawing"></i>划定基地区域</cjm-button>
        <div class="longitude">经度:E{{form.longitude}}</div>
        <div class="latitude">纬度:N{{form.latitude}}</div>
      </el-amap>
    </div>
    <cjm-dialog title="区域设置" :visible.sync="activationDialog" class="small">
      <regional-settings ref="regionalSettings" @setRegionalColor="setRegionalColor"></regional-settings>
      <div slot="footer">
        <cjm-button type="primary" @click="dialogConfirm">确定</cjm-button>
        <cjm-button @click="deleteBaseArea">删除</cjm-button>
      </div>
    </cjm-dialog>
  </div>
</template>
<script>
import Vue from 'vue';
import VueAMap from 'vue-amap';
import pageSwitch from 'framework/mixins/pageSwitch';
import regionalSettings from './regional-settings.vue';
import urlImg from '../../../../src/assets/images/Pen.png';
import markerIcon from '../../../../src/assets/images/markericon.png';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '12fea8c7f7f0ec1a0a851b89feaf84ea',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder', 'AMap.Geolocation', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MouseTool']
});
let amapManager = new VueAMap.AMapManager();

export default {
  mixins: [pageSwitch],
  components: {
    regionalSettings
  },
  data() {
    let markers = [];
    //let self = this;
    return {
      lineSegmentArr: [], //线段数组
      enums: this.$globalData.get('trace', 'enums'),
      apiUrl: this.$globalData.get('trace', 'apiUrl'),
      center: [117.000923, 36.675807],
      longitude: '',
      latitude: '',
      activationDialog: false,
      amapManager,
      plugin: [
        {
          pName: 'MapType',
          defaultType: 1,
          events: {
            init(o) {
              o.hide();
            }
          }
        }
      ],
      events: {
        init: o => {
          this.map = this.$refs.map.$$getInstance();
          const AMap = window.AMap;
          var mouseTool = new AMap.MouseTool(this.map);
          this.mouseTool = mouseTool;
          if (this.currentPageInfo.pageType != 'view') {
            this.map.on('click', this.drawingArea);
          }
        },
        complete: o => {
          var RoadNet = new AMap.TileLayer.RoadNet();
          this.map.add([RoadNet]);
          this.$nextTick(() => {
            if (this.form.jurisdictionalArea != null && this.form.jurisdictionalArea.length > 0) {
              for (var i = 0; i < this.form.jurisdictionalArea.length; i++) {
                var item = this.form.jurisdictionalArea[i];
                this.setPolygonDataToDraw(item);
              }
            }
          });
        }
      },
      location: '',
      zoom: 15,
      markers: markers,
      map: null,
      mouseTool: null,
      //正在绘制的点数据集合，给绘制多边形时使用
      drawingPointArr: [],
      //当前操作的多边形对象
      selectedPolygon: '', //当前操作的多边形对象
      isEditModle: false, //是否为编辑模式
      isDrawing: false, //判断是否正在绘画
      isDrawBlock: false, //判断是否进入绘制区块？？？
      isCheck: true, //基地是否选中
      existedPolygonData: [], //无效的点
      Difference: 1000000
    };
  },
  props: {
    form: {
      type: Object
    },
    rules: {
      type: Object
    },
    currentPageInfo: {
      type: Object
    }
  },
  computed: {
    insureStatus() {
      return this.$globalData.get('trace', 'enums')['审核结果'];
    }
  },
  mounted() {},
  methods: {
    drawArea() {
      this.resetPolygon();
      this.commonMouseTool();
      this.isDrawing = true;
    },
    //设置区域颜色
    setRegionalColor(hex, regionalOpacity) {
      var opts = this.selectedPolygon.getOptions();
      opts.fillColor = hex;
      opts.fillOpacity = regionalOpacity / 100;
      this.selectedPolygon.setOptions(opts);
      this.selectedPolygon.setMap(this.map);
    },
    //确定保存
    dialogConfirm() {
      this.activationDialog = false;
      this.isDrawing = false;
      var polygonObj = this.map.getAllOverlays('polygon');
      for (var i = 0; i < polygonObj.length; i++) {
        var mapInfo = {
          path: polygonObj[i].getOptions().path,
          fillOpacity: polygonObj[i].getOptions().fillOpacity,
          fillColor: polygonObj[i].getOptions().fillColor
        };
        this.form.jurisdictionalArea.push(mapInfo);
      }
      this.map.setDefaultCursor('');
    },
    //setRegional显示设置区域
    setRegional() {
      if (this.isDrawing) {
        this.activationDialog = true;
        this.$nextTick(function() {
          this.$refs.regionalSettings.retSet();
        });
      }
    },
    //判断首位两点是否可以相连
    isArrCoincide(pointArr) {
      var len = pointArr.length,
        offset = 10; //offset 首尾两点允许偏移量
      if (len > 2) {
        var f = this.map.lnglatToPixel(pointArr[0]),
          l = this.map.lnglatToPixel(pointArr[len - 1]);
        if (Math.sqrt(Math.pow(l.y - f.y, 2) + Math.pow(l.x - f.x, 2)) < offset) {
          return true;
        }
      }
      return false;
    },
    //重置绘画参数，为下次绘画做准备
    resetPolygon(isDeep) {
      this.drawingPointArr = [];
      this.isDrawing = false;
      //selectedPolygon = null;
      this.mouseTool.close(true);
      this.map.setDefaultCursor('');
      isDeep ? this.commonMouseTool() : null;
    },
    commonMouseTool() {
      this.map.setDefaultCursor('url(' + urlImg + '),auto');
      this.mouseTool.polyline({
        map: this.map,
        strokeColor: '#0094f5',
        strokeOpacity: 1,
        strokeWeight: 4,
        fillColor: '#20545f',
        fillOpacity: 0.55
      });
    },
    //删除当前基地区域
    deleteBaseArea() {
      if (this.selectedPolygon) {
        var extData = this.selectedPolygon.getExtData();
        if (!extData.id) {
          this.selectedPolygon.setMap();
        } else {
          this.fnDefaultStrokeColor('#0094f5');
        }
      }
      this.activationDialog = false;
      this.isDrawing = false;
      this.lineSegmentArr = [];
      var polygons = this.map.getAllOverlays('polygon');
      for (var i = 0; i < polygons.length; i++) {
        this.commonLineSegment(polygons[i].getOptions().path);
      }
    },
    //设置边框色
    fnDefaultStrokeColor(strokeColor) {
      var opts = this.selectedPolygon.getOptions();
      opts.strokeColor = strokeColor;
      this.selectedPolygon.setOptions(opts);
    },
    //绘制多边形并附上自定义参数
    drawPolygon(polygonData, polygonExtData) {
      if (polygonData.path.length < 3) {
        return false;
      }
      var polygon = new AMap.Polygon({
        zIndex: polygonData.zIndex || 10,
        path: polygonData.path, //设置多边形边界路径
        strokeColor: '#0094f5', //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线宽
        fillColor: polygonData.fillColor || '#20545f', //填充色
        fillOpacity: 0.55 //填充透明度
      });
      polygon.setMap(this.map);
      polygonExtData ? polygon.setExtData(polygonExtData) : null;
      this.isDrawing = true;
      if (this.currentPageInfo.pageType == 'add') {
        this.setRegional();
      }
      polygon.on('click', this.clickPolygon);
      this.commonLineSegment(polygonData.path);
      return polygon;
    },
    //点击区域
    clickPolygon(e) {
      if (!this.isDrawing) {
        this.activationDialog = true;
        if (!this.isCheck && this.isEditModle) {
          this.$message.error('请先保存信息');
          return false;
        }
        this.selectedPolygon = e.target;
        let fillColor = this.selectedPolygon.getOptions().fillColor;
        let fillOpacity = this.selectedPolygon.getOptions().fillOpacity;
        this.$nextTick(function() {
          this.$refs.regionalSettings.editForm(fillColor, fillOpacity);
        });
      }
    },
    //点击地图
    drawingArea(e) {
      this.pointsBeRemove = [];
      this.linePathPointBeRemove = []; //重置回退与重做
      if (this.isDrawing) {
        let newArr = [];
        let lng = e.lnglat.getLng();
        let lat = e.lnglat.getLat();
        // let notReadyToDrawBlock = false;
        let polygonZindex = 30;
        newArr.push(lng);
        newArr.push(lat);
        var polygons = this.map.getAllOverlays('polygon');
        for (var i = 0; i < polygons.length; i++) {
          if (polygons[i].contains(newArr)) {
            this.lockingRegion = polygons[i];
          }
        }
        this.drawingPointArr.push(newArr);
        if (this.drawingPointArr.length > 1) {
          var singlePolygonLineSegmentArr = [];
          for (let i = 0; i < this.drawingPointArr.length; i++) {
            var pixelArr = [];
            pixelArr.push(this.drawingPointArr[i][0] * this.Difference);
            pixelArr.push(this.drawingPointArr[i][1] * this.Difference);
            singlePolygonLineSegmentArr.push(pixelArr);
          }
          var lengths = singlePolygonLineSegmentArr.length;
          for (let k = 0; k < singlePolygonLineSegmentArr.length; k++) {
            var currentLineSegmentArr = [];
            currentLineSegmentArr.push([singlePolygonLineSegmentArr[lengths - 2], singlePolygonLineSegmentArr[lengths - 1]]);
          }
          //判断线段相交
          if (currentLineSegmentArr.length > 0 && this.lineSegmentArr.length > 0) {
            var p3, p4;
            p3 = { x: currentLineSegmentArr[0][0][0], y: currentLineSegmentArr[0][0][1] };
            p4 = { x: currentLineSegmentArr[0][1][0], y: currentLineSegmentArr[0][1][1] };
            for (i = 0; i < this.lineSegmentArr.length; i++) {
              var p1, p2;
              p1 = { x: this.lineSegmentArr[i][0][0], y: this.lineSegmentArr[i][0][1] };
              p2 = { x: this.lineSegmentArr[i][1][0], y: this.lineSegmentArr[i][1][1] };
              var checkCrossflag = this.segmentsIntr(p1, p2, p3, p4);
              if (checkCrossflag) {
                this.$message.error('线段已相交，请重新绘制');
                this.isDrawing = false;
                this.mouseTool.close(true);
                this.resetPolygon();
                this.lockingRegion = null;
                return;
              }
            }
          }
        }
        if (this.isArrCoincide(this.drawingPointArr)) {
          this.mouseTool.close(true);
          this.selectedPolygon = this.drawPolygon(
            {
              zIndex: polygonZindex,
              path: this.drawingPointArr
            },
            {}
          );
        }
      }
    },
    formatDegree(valInfo) {
      let val = Math.abs(valInfo);
      var v1 = Math.floor(val); //度
      var v2 = Math.floor((val - v1) * 60); //分
      var v3 = Math.round(((val - v1) * 3600) % 60); //秒
      return v1 + '°' + v2 + "'" + v3 + '"';
    },
    getLatitude(regionCodeName) {
      let self = this;
      self.markers = [];
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      });
      geocoder.getLocation(regionCodeName, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          self.form.longitude = result.geocodes[0].location.lng;
          self.form.latitude = result.geocodes[0].location.lat;
          self.center = [result.geocodes[0].location.lng, result.geocodes[0].location.lat];
          let marker = {
            position: [self.form.longitude, self.form.latitude],
            events: {
              dragend: e => {
                self.form.longitude = e.lnglat.lng;
                self.form.latitude = e.lnglat.lat;
              }
            },
            draggable: true,
            icon: markerIcon
          };
          self.markers.push(marker);
        } else {
          this.$message.error('获取经纬度失败');
        }
      });
    },
    //根据经纬度定义坐标
    getLngLat() {
      this.markers = [];
      this.center = [this.form.longitude, this.form.latitude];
      let marker = {
        position: [this.form.longitude, this.form.latitude],
        events: {
          dragend: e => {
            this.form.longitude = e.lnglat.lng;
            this.form.latitude = e.lnglat.lat;
          }
        },
        draggable: false,
        icon: markerIcon
      };
      if (this.currentPageInfo.pageType == 'view') {
        marker.draggable = false;
      } else {
        marker.draggable = true;
      }
      this.markers.push(marker);
    },
    //将数据转换并绘制多边形
    setPolygonDataToDraw(item) {
      //var pathArr = [];
      const path = item.path.map(pathItem => {
        return new AMap.LngLat(pathItem.lng, pathItem.lat);
      });
      var polygonData = {
        path: path,
        fillOpacity: item.fillOpacity,
        fillColor: item.fillColor
      };

      var polygon = new AMap.Polygon({
        zIndex: polygonData.zIndex || 10,
        path: polygonData.path, //设置多边形边界路径
        strokeColor: '#0094f5', //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线宽
        fillColor: polygonData.fillColor || '#20545f', //填充色
        fillOpacity: polygonData.fillOpacity //填充透明度
      });
      polygon.setMap(this.map);
    },
    segmentsIntr(a, b, c, d) {
      //线段ab的法线N1
      var nx1 = b.y - a.y,
        ny1 = a.x - b.x;
      //线段cd的法线N2
      var nx2 = d.y - c.y,
        ny2 = c.x - d.x;
      //两条法线做叉乘, 如果结果为0, 说明线段ab和线段cd平行或共线,不相交
      var denominator = nx1 * ny2 - ny1 * nx2;
      if (denominator == 0) {
        return false;
      }
      //在法线N2上的投影
      let distCN2 = nx2 * c.x + ny2 * c.y;
      let distAN2 = nx2 * a.x + ny2 * a.y - distCN2;
      let distBN2 = nx2 * b.x + ny2 * b.y - distCN2;
      // 点a投影和点b投影在点c投影同侧 (对点在线段上的情况,本例当作不相交处理);
      if (distAN2 * distBN2 >= 0) {
        return false;
      }
      //
      //判断点c点d 和线段ab的关系, 原理同上
      //
      //在法线N1上的投影
      let distAN1 = nx1 * a.x + ny1 * a.y;
      let distCN1 = nx1 * c.x + ny1 * c.y - distAN1;
      let distDN1 = nx1 * d.x + ny1 * d.y - distAN1;
      if (distCN1 * distDN1 >= 0) {
        return false;
      }
      return true;
    },
    //保存成功线段写入集合
    commonLineSegment(path) {
      var singlePolygonLineSegmentArr = [];
      for (var j = 0; j < path.length; j++) {
        var itemCoordinates = path[j];
        var pixelArr = [];
        pixelArr.push(itemCoordinates.lng * this.Difference);
        pixelArr.push(itemCoordinates.lat * this.Difference);
        singlePolygonLineSegmentArr.push(pixelArr);
      }

      for (var k = 0; k < singlePolygonLineSegmentArr.length; k++) {
        if (k == singlePolygonLineSegmentArr.length - 1) {
          this.lineSegmentArr.push([singlePolygonLineSegmentArr[0], singlePolygonLineSegmentArr[k]]);
        } else {
          this.lineSegmentArr.push([singlePolygonLineSegmentArr[k], singlePolygonLineSegmentArr[k + 1]]);
        }
      }
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.currentPageInfo.pageType != 'add') {
        this.getLngLat();
      }
    });
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.amap-wrapper {
  width: 100%;
  height: 500px;
  clear: both;
  position: relative;
}
.delineation-area {
  position: absolute;
  right: 40px;
  top: 20px;
}
.active {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.longitude {
  position: absolute;
  bottom: 50px;
  right: 40px;
  color: #fff;
  font-size: 18px;
}
.latitude {
  position: absolute;
  bottom: 20px;
  right: 40px;
  color: #fff;
  font-size: 18px;
}
</style>
