<template>
  <div>
    <cjm-steps :active="active">
      <cjm-step title="选择气象类型"></cjm-step>
      <cjm-step title="新建气象站"></cjm-step>
      <cjm-step title="气象参数配置" v-if="stepNum"></cjm-step>
    </cjm-steps>
    <div>
      <div v-if="active == 0">
        <cjm-form ref="form" :model="form" :rules="rules">
          <cjm-form-item label="选择气象类型" prop="type" required class="cjm-form-item-long">
            <cjm-enum-select v-model="form.type" enum-name="气象类型" enum-namespace="trace" :clearable="false" @change="selectStation"></cjm-enum-select>
          </cjm-form-item>
          <cjm-form-item label="所属企业" prop="corpID" v-model="form.corpID" required class="cjm-form-item-long">
            <cjm-remote-select :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.WEATHER_CORP"
                               :label="form.corpName" v-model="form.corpID" @select="changeAreaOrPlots">
              <template slot-scope="scope">{{scope.item.name}}<span class="cjm-option-subtitle">({{scope.item.corpID}})</span></template>
            </cjm-remote-select>
          </cjm-form-item>
          <cjm-form-item label="关联企业" prop="orgIDList" v-model="form.orgIDList" required class="cjm-form-item-long">
            <cjm-transfer v-model="form.orgIDList" :data="transferData" :filterable="true" :titles="titles"></cjm-transfer>
          </cjm-form-item>
        </cjm-form>
      </div>
    </div>
    <div>
      <div v-if="active == 1">
      <cjm-form ref="form" :model="form" :rules="rules">
        <cjm-form-item label="设备名称" prop="stationName" required>
          <cjm-input v-model="form.stationName" :maxlength="50"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="设备编号" prop="stationCode" required v-if="stepNum">
          <cjm-input v-model="form.stationCode" :maxlength="50"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="监控区域" prop="areaID" v-show="stepNum">
          <cjm-select v-model="form.areaID">
            <cjm-option v-for="item in dataArea" :key="item.id" :label="item.name" :value="item.id"> </cjm-option>
          </cjm-select>
          </cjm-form-item>
          <cjm-form-item label="监控区块" prop="plotsID" v-show="stepNum">
            <cjm-select v-model="form.plotsID">
              <cjm-option v-for="item in dataPlots" :key="item.id" :label="item.name" :value="item.id"> </cjm-option>
            </cjm-select>
          </cjm-form-item>
          <cjm-form-item label="上传IP" prop="iP" v-show="stepNum">
            <cjm-input v-model="form.iP"></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="端口" prop="port" v-show="stepNum">
            <cjm-input v-model="form.port"></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="出厂时间" prop="manufactureDate" v-show="stepNum">
            <cjm-date-picker v-model="form.manufactureDate"></cjm-date-picker>
          </cjm-form-item>
          <cjm-form-item label="备注" prop="remark" class="cjm-form-item-long">
            <cjm-input type="textarea" :rows="3" v-model="form.remark">
            </cjm-input>
          </cjm-form-item>
          <cjm-form-item label="所在位置" prop="location" class="cjm-form-item-long" required>
            <cjm-input v-model="form.location">
              <cjm-button slot="append" icon="search" @click="searchCity"></cjm-button>
            </cjm-input>
            <input type="hidden" v-model="form.longitude"/>
            <input type="hidden" v-model="form.latitude"/>
            <div class="amap-wrapper">
              <el-amap vid="amapDemo" v-if="!!center" ref="map" :zoom="zoom" :center="center" :plugin="plugin" :events="events" :map-manager="amapManager">
                <el-amap-marker v-for="(marker, index) in markers" :position="marker.position"
                                :draggable="true" :events="marker.events" :key="index"></el-amap-marker>
              </el-amap>
              <el-amap vid="amapDemo" v-if="!center" ref="map" :zoom="zoom" :plugin="plugin" :events="events" :map-manager="amapManager">
                <el-amap-marker v-for="(marker, index) in markers" :position="marker.position"
                                :draggable="true" :events="marker.events" :key="index"></el-amap-marker>
              </el-amap>
            </div>
          </cjm-form-item>
        </cjm-form>
      </div>
      </div>
      <div>
        <div v-if="active == 2">
        <cjm-form ref="form" :model="form" :rules="rules">
          <cjm-form-item label="参数选择" prop="parameter" class="cjm-form-item-long">
            <cjm-checkbox-group v-model="form.parameter" @change="changeParameter">
              <cjm-checkbox :label="value" v-for="(value,key) in parameterSelect" :key="value">{{key}}</cjm-checkbox>
            </cjm-checkbox-group>
          </cjm-form-item>
          <cjm-form-item label="土壤温度层级" prop="soilTemperatureLayer" v-if="isSoilTemperatureLayer" required
                         class="cjm-form-item-long">
            <cjm-radio-group v-model="form.soilTemperatureLayer">
              <cjm-radio :label="value" v-for="(value,key) in level" :key="value">{{key}}</cjm-radio>
            </cjm-radio-group>
          </cjm-form-item>
          <cjm-form-item label="土壤湿度层级" prop="soilMoistureLayer" v-if="isSoilMoistureLayer" required
                         class="cjm-form-item-long">
            <cjm-radio-group v-model="form.soilMoistureLayer">
              <cjm-radio :label="value" v-for="(value,key) in level" :key="value">{{key}}</cjm-radio>
            </cjm-radio-group>
          </cjm-form-item>
        </cjm-form>
      </div>
      </div>
    </div>
  </template>

  <script>
import Vue from 'vue';
import VueAMap from 'vue-amap';
import cjmTransfer from 'framework/components/base/transfer';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '12fea8c7f7f0ec1a0a851b89feaf84ea',
  plugin: [
    'AMap.Autocomplete',
    'AMap.Scale',
    'AMap.ToolBar',
    'AMap.Geocoder',
    'AMap.PlaceSearch',
    'AMap.Geolocation'
  ]
});
let amapManager = new VueAMap.AMapManager();
export default {
  components: {
    cjmTransfer
  },
  data: function() {
    let markers = [];
    let self = this;
    return {
      form: {},
      location: '',
      zoom: 14,
      dataArea: [],
      dataPlots: [],
      center: undefined,
      plugin: [
        {
          pName: 'Scale'
        }
      ],
      active: 0,
      stepNum: true,
      isSoilTemperatureLayer: false,
      isSoilMoistureLayer: false,
      amapManager,
      markers: markers,
      events: {
        init(map) {
          self.addMarker(map);
        }
      },
      transferData: [],
      titles: ['企业列表', '已关联企业列表'],
      rules: {
        stationName: [this.$formRules.required, this.$formRules.maxLength(50)],
        corpID: [this.$formRules.required],
        stationCode: [this.$formRules.required, this.$formRules.maxLength(50)],
        iP: [this.$formRules.ip],
        port: [this.$formRules.number],
        location: [this.$formRules.required],
        orgIDList: [this.$formRules.required],
        longitude: [this.$formRules.required],
        latitude: [this.$formRules.required]
      }
    };
  },
  computed: {
    enabledOrDisabled() {
      return this.$globalData.get('base', 'enums')['启用禁用'];
    },
    parameterSelect() {
      return this.$globalData.get('trace', 'enums')['参数选择'];
    },
    level() {
      return this.$globalData.get('trace', 'enums')['层级'];
    }
  },
  methods: {
    selectStation(val) {
      if (val != '1') {
        this.stepNum = true;
      } else {
        this.form.manufactureDate = '';
        this.form.stationCode = '';
        this.form.iP = '';
        this.form.port = '';
        this.form.soilMoistureLayer = '1';
        this.form.parameter = [];
        this.form.soilTemperatureLayer = '1';
        this.stepNum = false;
      }
    },
    addMarker(map, longitude, latitude) {
      let lng2 = longitude;
      let lat2 = latitude;
      if (this.markers.length > 0) {
        return;
      }
      if (lng2 == undefined && lat2 == undefined && this.form.stationID == '') {
        lng2 = map.getCenter().lng;
        lat2 = map.getCenter().lat;
        this.form.longitude = lng2;
        this.form.latitude = lat2;
      }
      if (lng2 == undefined && lat2 == undefined && this.form.stationID != '') {
        return;
      }
      let marker = {
        position: [lng2, lat2],
        events: {
          dragend: e => {
            let { lng, lat } = e.lnglat;
            this.form.longitude = lng;
            this.form.latitude = lat;
            this.getAddress(lng, lat);
          }
        }
      };
      this.markers.push(marker);
    },
    //根据企业获取区域
    getArea() {
      this.dataArea = [];
      let self = this;
      if (this.form.corpID != '') {
        this.$ajax
          .get(this.$globalData.get('trace', 'apiUrl').autoComplete.AREA, {
            corpID: this.form.corpID
          })
          .then(r => {
            if (r.resultCode == 200) {
              r.data.map(function(x) {
                self.dataArea.push({
                  id: x.id,
                  name: x.name
                });
              });
            } else {
              this.$message.error(r.msg);
            }
          })
          .catch();
      }
    },
    //根据企业获取地块
    getPlots() {
      this.dataPlots = [];
      let self = this;
      if (this.form.corpID != '') {
        this.$ajax
          .get(this.$globalData.get('trace', 'apiUrl').autoComplete.PLOTS, {
            corpID: this.form.corpID
          })
          .then(r => {
            if (r.resultCode == 200) {
              r.data.map(function(x) {
                self.dataPlots.push({
                  id: x.id,
                  name: x.name
                });
              });
            } else {
              this.$message.error(r.msg);
            }
          })
          .catch();
      }
    },
    //根据所属企业修改地块以及区域
    changeAreaOrPlots() {
      this.form.areaID = '';
      this.form.plotsID = '';
      if (this.form.corpID != '') {
        this.getArea();
        this.getPlots();
        this.initTransferData();
      }
    },
    //获取关联企业
    initTransferData() {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').autoComplete.ORG, {
          corpID: this.form.corpID,
          pageSize: 1000000
        })
        .then(res => {
          if (res.resultCode === '200') {
            this.transferData = res.data.map((p, index) => {
              return {
                id: p.id,
                name: p.name + ' (' + p.orgCode + ')'
              };
            });
          }
        });
    },
    //坐标获取位置
    getAddress(lng, lat) {
      let self = this;
      // 这里通过高德 SDK 完成。
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      });
      geocoder.getAddress([lng, lat], function(status, result) {
        if (result.info === 'OK') {
          if (result && result.regeocode) {
            self.form.location = result.regeocode.formattedAddress;
            self.center = [lng, lat];
            self.$nextTick();
          }
        }
      });
    },
    //搜索城市
    searchCity() {
      this.$refs.map.$$getInstance().setCity(this.location);
    },
    //设置地点
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$ajax
              .post(
                this.$globalData.get('trace', 'apiUrl').weather.SAVE,
                this.form
              )
              .then(data => {
                if (data.resultCode == 200) {
                  resolve(true);
                } else {
                  reject(new Error(data.msg));
                }
              })
              .catch();
          } else {
            reject(new CjmError(''));
          }
        });
      });
    },
    reset() {
      this.form = {
        stationName: '',
        stationID: '',
        corpID: '',
        corpName: '',
        stationCode: '',
        areaID: '',
        type: '0',
        areaName: '',
        plotsID: '',
        plotsName: '',
        iP: '',
        port: '',
        manufactureDate: '',
        remark: '',
        status: '1',
        longitude: '',
        latitude: '',
        soilTemperatureLayer: '1',
        soilMoistureLayer: '1',
        location: '',
        parameter: [],
        orgIDList: []
      };
      this.transferData = [];
      this.active = 0;
      this.location = '';
      this.stepNum = true;
      this.isSoilTemperatureLayer = false;
      this.isSoilMoistureLayer = false;
      this.$nextTick(function() {
        this.$refs.form.resetFields();
      });
    },
    addForm() {
      this.reset();
      this.markers = [];
      this.center = undefined;
    },
    editForm(stationID) {
      this.reset();
      this.markers = [];
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').weather.GET_STATION, {
          stationID: stationID
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.form = r.data;
            this.addMarker('', r.data.longitude, r.data.latitude);
            this.getAddress(r.data.longitude, r.data.latitude);
            this.changeParameter(this.form.parameter);
            this.initTransferData();
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch();
    },
    contains(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return true;
        }
      }
      return false;
    },
    //土壤温度层级，土壤湿度层级
    changeParameter(val) {
      this.isSoilTemperatureLayer = this.contains(val, '5');
      this.isSoilMoistureLayer = this.contains(val, '6');
    }
  },
  created() {
    this.reset();
  },
  mounted() {}
};
</script>

  <style scoped>
.amap-wrapper {
  width: 530px;
  height: 300px;
  clear: both;
  padding-top: 20px;
}
</style>
