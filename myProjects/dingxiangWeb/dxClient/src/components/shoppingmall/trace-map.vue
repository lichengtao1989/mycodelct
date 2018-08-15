<template>
  <div class="trace-map" :id="mapID"></div>
</template>
<script>
  const BMap = window.BMap;
  import getCropList from '@/api/getCropList';
  import getRegionList from '@/api/getRegionList';
  import apiList from "@/api/api";
  import companyInfoFn from "@/api/companyinfo";
  import hideMarkerIcon from '../../../static/images/hide-marker.png';
  import redMarkerIcon from '../../../static/images/red-marker.png';
  const styleJson = [
    {featureType: 'background', elementType: 'all', stylers: {color: '#faf9f7', lightness: 1, visibility: 'on'}},
    {featureType: 'road', elementType: 'labels', stylers: {color: '#f0c178', lightness: 1, visibility: 'off'}}
  ];
  export default {
    data(){
      return {
        mapID: 'map_' + Date.now(),
        cropList: [],
        map: null,
        center: {lng: 0, lat: 0, zoom: 0},
        hideInfoWindowTimeout: null,
        boundarDrawed: [],
        cropMarkerData: []
      };
    },
    methods: {
      async mapInit(){
        await this.loadCenterLogLatZoom();
        const {lng, lat, zoom} = this.center;
        const map = new BMap.Map(this.mapID);
        const point = new BMap.Point(lng, lat);
        map.centerAndZoom(point, zoom);
        map.enableScrollWheelZoom(); //禁用滚轮放大缩小
        map.disableKeyboard(); //禁用键盘操作
        map.disablePinchToZoom(); //禁用双指操作缩放
        map.setMapStyle({styleJson});
        this.map = map;
        this.createMarkers();
        this.drawBoundaryLine();
      },
      isBoundarDrawed(boundar){
        let res = false;
        this.boundarDrawed.forEach(item => {
          if (JSON.stringify(item) === JSON.stringify(boundar)) {
            res = true;
          }
        });
        return res;
      },
      drawBoundaryLine(){
        const bdary = new BMap.Boundary();
        this.cropList.forEach(crop => {
          const {province = '', city = '', district = ''} = crop;
          if (province || city || district) {
            bdary.get(province + city + district, rs => {
              const boundaries = rs.boundaries;
              if (boundaries && boundaries.length > 0) {
                boundaries.forEach(boundar => {
                  if (!this.isBoundarDrawed(boundar)) {
                    this.boundarDrawed.push(boundar);
                    const ply = new BMap.Polygon(boundar, {
                      strokeWeight: 2,
                      strokeColor: '#ffffff',
                      fillColor: '#88e7c5',
                      strokeStyle: 'bold',
                      fillOpacity: 0.3
                    });
                    this.map.addOverlay(ply);
                  }
                });
              }
            });
          }
        });
      },
      createMarkers(){
        this.cropList.forEach(crop => {
          const lng = crop.longitude * 1;
          const lat = crop.latitude * 1;
          const point = new BMap.Point(lng, lat);
          const marker = new BMap.Marker(point, {
            icon: new BMap.Icon(crop.isRegion ? hideMarkerIcon : redMarkerIcon, new BMap.Size(20, 20))
          });
          marker.addEventListener('mouseover', () => this.openInfo(crop));
          marker.addEventListener('click', () => this.openInfo(crop));
          this.map.addOverlay(marker);
          this.cropMarkerData.push({crop, marker});
        });
      },
      openInfo(crop) {
        this.stopHideInfoWindow();
        const opts = {width: 300, height: 80, title: '', enableMessage: false};
        const lng = crop.longitude * 1;
        const lat = crop.latitude * 1;
        const point = new BMap.Point(lng, lat);
        window.hideInfoWindow = this.hideInfoWindow;
        window.stopHideInfoWindow = this.stopHideInfoWindow;
        let items = '';
        const space = '&nbsp;&nbsp;';
        if (crop.isRegion) {
          const {RegionName, Supervisor, Phone, Position} = crop;
          opts.height = 100;
          RegionName && (items += `<p><span class="label-block">行政区域名称${space}</span>${RegionName}</p>`);
          Supervisor && (items += `<p><span class="label-block">监管员${space}</span>${Supervisor}</p>`);
          Phone && (items += `<p><span class="label-block">联系方式${space}</span>${Phone}</p>`);
          Position && (items += `<p><span class="label-block">职务${space}</span>${Position || ''}</p>`);
        } else {
          const {markerName, address, phone} = crop;
          items += `<p>${markerName}</p>`;
          address && (items += `<p>地址${space}${address}</p>`);
          phone && (items += `<p>电话${space}${phone}</p>`);
        }
        let content = `<div class="infoWindow zoom" onmouseenter="stopHideInfoWindow()" onmouseleave="hideInfoWindow()"><div class="fl infowWindowTxt">${items}</div></div>`;
        const infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        this.map.openInfoWindow(infoWindow, point); //开启信息窗口
      },
      stopHideInfoWindow(){
        clearTimeout(this.hideInfoWindowTimeout);
      },
      hideInfoWindow(){
        this.hideInfoWindowTimeout = setTimeout(() => {
          this.map.closeInfoWindow();
        }, 500);
      },
      async loadCenterLogLatZoom(){
        const {ResultCode, Data} = await companyInfoFn(apiList.GetCorpInfo);
        if (ResultCode == 200) {
          let dataInfo = Data.List[0];
          this.center.lng = dataInfo.Longitude * 1;
          this.center.lat = dataInfo.Latitude * 1;
          this.center.zoom = (dataInfo.MapZoom * 1) || 10;
        }
      },
      async loadCropData(){
        const res = await getCropList();
        if (res && res.Data) {
          this.cropList = this.cropList.concat(res.Data);
        }
      },
      async loadRegionData(){
        const res = await getRegionList();
        if (res && res.Data && res.Data.List) {
          const data = res.Data.List.map(item => {
            const {Longitude: longitude, Latitude: latitude} = item;
            return {isRegion: true, longitude, latitude, ...item}
          });
          this.cropList = this.cropList.concat(data);
        }
      }
    },
    async mounted(){
      await this.loadCropData();
      await this.loadRegionData();
      await this.mapInit();
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .trace-map {
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss" scoped="" type="text/css">
$base: 192;
  .infoWindow {
    margin-top: 12rem/$base;
  }

  .infowWindowTxt {
    width: 280rem/$base;
    font-size: 14rem/$base;
    line-height: 1.6em;
    color: #424242;
    p {
      padding: 0;
      margin: 0;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .label-block {
        width: 120rem/$base;
        text-align: right;
        display: inline-block;
      }
    }
  }
</style>
