<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <div class="clear">
      <cjm-form-item label="监控屏选择" class="cjm-form-item-long">
        <cjm-checkbox-group v-model="form.monitorScreenType">
          <cjm-checkbox :key="value" :label="value" v-for="(value,key) in  monitorScreenTypeList">
            {{key}}
          </cjm-checkbox>
        </cjm-checkbox-group>
      </cjm-form-item>
      <cjm-form-item label="轮播间隔">
        <cjm-select v-model="form.carouselTime" placeholder="请选择" style="width:100px;">
          <cjm-option v-for="(value, key) in carouselTimeOptions" :key="value" :label="key" :value="value">
          </cjm-option>
        </cjm-select>
      </cjm-form-item>
    </div>
    <hr class="parting-line" />
    <div class="part-item clear" v-if="form.monitorScreenType.indexOf('1')!=-1">
      <div class="part-item-title">可追溯商品数据中心</div>
      <div class="part-item-content">
        <div class="part-item-left"><img src="../../assets/images/monitorScreen01.jpg"></div>
        <div class="part-item-right">
          <div class="part-item-right-inner">
            <cjm-form-item label="显示名称" class="cjm-form-item-long">
              <cjm-input v-model="form.commodityRetrospectivName" placeholder="可追溯商品数据中心（最多可输入14个字）" :maxlength="14"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="显示扫码模块" class="cjm-form-item-long">
              <cjm-radio-group v-model="form.showScanHistory">
                <cjm-radio class="radio" :label="value" :key="value" v-for="(value, key) in showScanHistoryOptions">{{key}}</cjm-radio>
              </cjm-radio-group>
              <p class="instruction">扫码量低于1000次不显示历史扫码量与防伪溯源查询模块，反之显示</p>
            </cjm-form-item>
            <cjm-form-item label="显示保险理赔" class="cjm-form-item-long">
              <cjm-radio-group v-model="form.isInsurance" :disabled="isNeedsInsurance == '0'">
                <cjm-radio class="radio" :label="value" :key="value" v-for="(value, key) in isInsuranceOptions">{{key}}
                </cjm-radio>
              </cjm-radio-group>
              <p class="instruction">未开通保险理赔，开通后支持修改显示</p>
            </cjm-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="part-item clear" v-if="form.monitorScreenType.indexOf('2')!=-1">
      <div class="part-item-title">溯源企业卫星地图</div>
      <div class="part-item-content">
        <div class="part-item-left"><img src="../../assets/images/monitorScreen02.jpg"></div>
        <div class="part-item-right">
          <div class="part-item-right-inner">
            <cjm-form-item label="显示名称" class="cjm-form-item-long">
              <cjm-input v-model="form.satelliteMapName" placeholder="溯源企业卫星地图（最多可输入14个字）" :maxlength="14"></cjm-input>
            </cjm-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="part-item clear" v-if="form.monitorScreenType.indexOf('3')!=-1">
      <div class="part-item-title">溯源地区热度图</div>
      <div class="part-item-content">
        <div class="part-item-left"><img src="../../assets/images/monitorScreen03.jpg"></div>
        <div class="part-item-right">
          <div class="part-item-right-inner">
            <cjm-form-item label="显示名称" class="cjm-form-item-long">
              <cjm-input v-model="form.traceabilityMapName" placeholder="溯源地区热区图（最多可输入14个字）" :maxlength="14"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="热度图选择" class="cjm-form-item-long">
              <cjm-radio-group v-model="form.areaType">
                <cjm-radio class="radio" :label="value" :key="value" v-for="(value,name) in areaTypes">{{name}}</cjm-radio>
              </cjm-radio-group>
            </cjm-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="part-item clear" v-if="form.monitorScreenType.indexOf('4')!=-1">
      <div class="part-item-title">气象环境监测中心</div>
      <div class="part-item-content">
        <div class="part-item-left"><img src="../../assets/images/monitorScreen04.jpg"></div>
        <div class="part-item-right">
          <div class="part-item-right-inner">
            <cjm-form-item label="显示名称" class="cjm-form-item-long">
              <cjm-input v-model="form.weatherMonitoringName" placeholder="气象环境监测中心（最多可输入14个字）" :maxlength="14"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="显示方式" class="cjm-form-item-long" v-if="isWeatherStationConfig == '1' || monitorPointList.length > 0">
              <cjm-radio-group v-model="form.displayMode">
                <cjm-radio class="radio" :label="value" :key="value" v-for="(value, key) in displayModeList" v-if="((isWeatherStationConfig == '1' && value == '1') || (monitorPointList.length > 0 && value == '2') || (isWeatherStationConfig == '1' && monitorPointList.length > 0 && value == '3'))">
                  {{key}}
                </cjm-radio>
              </cjm-radio-group>
            </cjm-form-item>
            <cjm-form-item label="气象站" class="cjm-form-item-long" v-if="isWeatherStationConfig == '1'">
              <cjm-select v-model="form.stationID" @change="changeStationConfig">
                <cjm-option v-for="item in stationItems" :key="item.stationID" :value="item.stationID" :label="item.stationName"></cjm-option>
              </cjm-select>
            </cjm-form-item>
            <cjm-form-item label="气象指标" class="cjm-form-item-long" v-if="isWeatherStationConfig == '1'" prop="indicator">
              <cjm-radio-group v-model="form.meteorologicalDisplayType">
                <cjm-radio class="radio" :label="value" :key="value" v-for="value in weatherIndicatorMaxSelectedArray" v-if="value-weatherIndicatorArrayLength<=1">{{value}}种
                </cjm-radio>
              </cjm-radio-group>
              <cjm-checkbox-group v-model="weatherIndicator" class="indicator-group" @change="changeWeatherIndicator">
                <cjm-checkbox :key="key" :label="key" v-for="(value, key) in weatherIndicatorArray">{{value}}
                </cjm-checkbox>
              </cjm-checkbox-group>
              <p class="instruction">最多选择{{form.meteorologicalDisplayType}}种</p>
            </cjm-form-item>
            <cjm-form-item label="监控显示" class="cjm-form-item-long" v-if="monitorPointList.length > 0" prop="monitorPoint">
              <div class="display-left">
                <div class="monitor-display">
                  <ul :class="'monitor-display-inner screen' + form.displayType">
                    <li class="screen-item" v-for="index in parseInt(form.displayType)" :key="index">
                      <img src="../../assets/images/monitor-img-holder.jpg" v-if="index <= form.monitorPoint.length">
                      <div class="monitor-point-name" v-if="index <= form.monitorPoint.length">
                        {{monitorPointListObj[form.monitorPoint[index - 1]]}}
                      </div>
                    </li>
                  </ul>
                </div>
                <ul class="screen-row">
                  <li v-for="val in displayTypeList" :class="{'active': form.displayType == val}" @click="changeMonitorScreen(val)" :key="val">
                    <i :class="'cjm-icon-screen-' + val"></i>
                  </li>
                </ul>
              </div>
              <div class="display-right">
                <div class="monitor-list">
                  <h1 class="monitor-title">监控点</h1>
                  <cjm-checkbox-group v-model="form.monitorPoint" class="monitor-group">
                    <div v-for="row in page.pageNum" :class="'page'+ (page.pageIndex == row?' block':'')" :key="row">
                      <cjm-checkbox :key="obj.id" :label="obj.id" v-for="(obj, index) in  monitorPointList" :title="obj.deviceName" v-if="index >= (row-1)*page.pageSize && index < row*page.pageSize">
                        {{obj.deviceName}}
                      </cjm-checkbox>
                    </div>
                  </cjm-checkbox-group>
                  <div class="pagination">
                    <cjm-button :disabled="page.pageIndex==1" type="text" @click="pageGoPrev()">
                      <i class="el-icon el-icon-arrow-left"></i>
                    </cjm-button>
                    <span class="pageIndex">{{page.pageIndex}}</span>
                    <cjm-button :disabled="page.pageIndex==page.pageNum" type="text" @click="pageGoNext()">
                      <i class="el-icon el-icon-arrow-right"></i>
                    </cjm-button>
                  </div>
                </div>
              </div>
            </cjm-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="part-item clear" v-if="form.monitorScreenType.indexOf('5')!=-1">
      <div class="part-item-title">扶贫数据中心</div>
      <div class="part-item-content">
        <div class="part-item-left"><img src="../../assets/images/monitorScreen05.jpg"></div>
        <div class="part-item-right">
          <div class="part-item-right-inner">
            <cjm-form-item label="显示名称" class="cjm-form-item-long">
              <cjm-input v-model="form.povertyName" placeholder="扶贫数据中心（最多可输入14个字）" :maxlength="14"></cjm-input>
            </cjm-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="part-item clear" v-if="form.monitorScreenType.indexOf('8')!=-1">
      <div class="part-item-title">企业监控中心</div>
      <div class="part-item-content">
        <div class="part-item-left"><img src="../../assets/images/monitorScreen06.jpg"></div>
        <div class="part-item-right">
          <div class="part-item-right-inner">
            <cjm-form-item label="监控显示" class="cjm-form-item-long" v-if="monitorPointList.length > 0" prop="monitorPoint">
              <div class="display-left">
                <div class="monitor-display">
                  <ul :class="'monitor-display-inner screen' + form.displayType">
                    <li class="screen-item" v-for="index in parseInt(form.displayType)" :key="index">
                      <img src="../../assets/images/monitor-img-holder.jpg" v-if="index <= form.monitorPoint.length">
                      <div class="monitor-point-name" v-if="index <= form.monitorPoint.length">
                        {{monitorPointListObj[form.monitorPoint[index - 1]]}}
                      </div>
                    </li>
                  </ul>
                </div>
                <ul class="screen-row">
                  <li v-for="val in displayTypeList" :class="{'active': form.displayType == val}" @click="changeMonitorScreen(val)" :key="val">
                    <i :class="'cjm-icon-screen-' + val"></i>
                  </li>
                </ul>
              </div>
              <div class="display-right">
                <div class="monitor-list">
                  <h1 class="monitor-title">监控点</h1>
                  <cjm-checkbox-group v-model="form.monitorPoint" class="monitor-group">
                    <div v-for="row in page.pageNum" :class="'page'+ (page.pageIndex == row?' block':'')" :key="row">
                      <cjm-checkbox :key="obj.id" :label="obj.id" v-for="(obj, index) in  monitorPointList" :title="obj.deviceName" v-if="index >= (row-1)*page.pageSize && index < row*page.pageSize">
                        {{obj.deviceName}}
                      </cjm-checkbox>
                    </div>
                  </cjm-checkbox-group>
                  <div class="pagination">
                    <cjm-button :disabled="page.pageIndex==1" type="text" @click="pageGoPrev()">
                      <i class="el-icon el-icon-arrow-left"></i>
                    </cjm-button>
                    <span class="pageIndex">{{page.pageIndex}}</span>
                    <cjm-button :disabled="page.pageIndex==page.pageNum" type="text" @click="pageGoNext()">
                      <i class="el-icon el-icon-arrow-right"></i>
                    </cjm-button>
                  </div>
                </div>
              </div>
            </cjm-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="part-item clear" v-if="form.monitorScreenType.indexOf('9')!=-1">
      <div class="part-item-title">企业气象环境监测中心</div>
      <div class="part-item-content">
        <div class="part-item-left"><img src="../../assets/images/monitorScreen07.png"></div>
        <div class="part-item-right">
          <div class="part-item-right-inner">
            <cjm-form-item label="气象站" class="cjm-form-item-long">
              <cjm-select v-model="form.stationID" @change="changeStationConfig">
                <cjm-option v-for="item in stationItems" :key="item.stationID" :value="item.stationID" :label="item.stationName"></cjm-option>
              </cjm-select>
            </cjm-form-item>
          </div>
        </div>
      </div>
    </div>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button type="primary" @click="submit(form)" :loading="uploadLocked">
        <i class="cjm-icon-confirm" v-if="!uploadLocked"></i>保存
      </cjm-button>
      <cjm-button type="default" @click="resetConfig" :disabled="uploadLocked">
        <i class="cjm-icon-close"></i>还原
      </cjm-button>
    </div>
  </cjm-form>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  mixins: [pageSwitch],
  data() {
    return {
      form: {
        monitorScreenType: ['1', '2', '3'],
        carouselTime: 15000,
        commodityRetrospectivName: '',
        showScanHistory: '2',
        isInsurance: '0',
        satelliteMapName: '',
        traceabilityMapName: '',
        weatherMonitoringName: '',
        povertyName: '',
        displayMode: '',
        indicator: [],
        displayType: '16',
        monitorPoint: [],
        deviceType: '',
        stationID: '',
        meteorologicalDisplayType: ''
      },
      rules: {
        indicator: [
          {
            validator: (rule, value, callback) => {
              let weatherIndicator = [];
              for (let i = 0; i < value.length; i++) {
                if (value[i] == 7) {
                  weatherIndicator.push('7,8');
                } else if (value[i] == 36) {
                  weatherIndicator.push('36,37,38,39');
                } else if (value[i] == 40) {
                  weatherIndicator.push('40,41,42,43');
                } else if (value[i] != 8 && value[i] != 37 && value[i] != 38 && value[i] != 39 && value[i] != 41 && value[i] != 42 && value[i] != 43) {
                  weatherIndicator.push(value[i]);
                }
              }
              if (this.form.meteorologicalDisplayType == 4 && weatherIndicator.length != 4) {
                callback(new Error(`必须选择` + this.form.meteorologicalDisplayType + `种`));
              } else if (this.form.meteorologicalDisplayType != 4 && (weatherIndicator.length != this.form.meteorologicalDisplayType && this.form.meteorologicalDisplayType - weatherIndicator.length != 1)) {
                callback(new Error(`必须选择` + this.form.meteorologicalDisplayType + `或者` + (this.form.meteorologicalDisplayType - 1) + `种`));
              } else {
                callback();
              }
            },
            trigger: 'click'
          }
        ],
        monitorPoint: [
          {
            validator: (rule, value, callback) => {
              if (value.length == 0) {
                callback(new Error(`必须选择一个播放`));
              } else {
                callback();
              }
            },
            trigger: 'click'
          }
        ]
      },
      corpID: '',
      page: {
        pageIndex: 1,
        pageNum: 1,
        pageSize: 9
      },
      stationItems: [],
      isNeedsInsurance: '1',
      isWeatherStationConfig: '1',
      weatherIndicator: [],
      weatherIndicatorMaxSelectedLength: 4,
      weatherIndicatorArray: {},
      weatherIndicatorArrayLength: 0,
      weatherIndicatorMaxSelectedArray: ['4', '6', '8', '10', '12'],
      displayTypeList: [1, 4, 9, 16],
      defaultIndicator: ['9', '1', '4', '2'],
      weatherIndicatorCodeArray: [],
      monitorPointList: [],
      changeDisplayType: false, //是否是切换显示屏幕数量操作
      uploadLocked: false, //提交锁
      pageFromList: false //页面是否来源于列表
    };
  },
  computed: {
    monitorPointListObj() {
      let monitorPointListObj = {};
      this.monitorPointList.forEach(function(d) {
        monitorPointListObj[d.id] = d.deviceName;
      });
      return monitorPointListObj;
    },
    monitorScreenTypeList() {
      return this.$globalData.get('base', 'enums')['监控屏选择'];
    },
    carouselTimeOptions() {
      return this.$globalData.get('base', 'enums')['轮播间隔'];
    },
    showScanHistoryOptions() {
      return this.$globalData.get('base', 'enums')['是否显示'];
    },
    isInsuranceOptions() {
      return this.$globalData.get('base', 'enums')['是否显示'];
    },
    displayModeList() {
      return this.$globalData.get('base', 'enums')['显示方式'];
    },
    areaTypes(){
      return this.$globalData.get('base', 'enums')['区域类型'];
    }
  },
  watch: {
    'form.displayType'() {
      if (this.changeDisplayType) {
        let len = Math.min(parseInt(this.form.displayType), this.monitorPointList.length);
        this.form.monitorPoint = [];
        for (let i = 0; i < len; i++) {
          this.form.monitorPoint.push(this.monitorPointList[i].id);
        }
        this.changeDisplayType = false;
      }
    },
    weatherIndicator() {
      this.form.indicator = this.weatherIndicator.join(',').split(',');
    }
  },
  methods: {
    changeStationConfig() {
      this.getWeatherMeteorologicalIndicators().then(() => {
        this.form.indicator = [];
        this.resetIndicator();
      });
    },
    resetIndicator() {
      let self = this;
      //这个后台貌似改了联动，修改了气象和监控屏相关的，数据重置
      if (this.weatherIndicatorArrayLength < this.form.meteorologicalDisplayType) {
        this.form.meteorologicalDisplayType = (this.weatherIndicatorArrayLength % 2) * 2 + Math.floor(this.weatherIndicatorArrayLength / 2) * 2 + '';
      }
      this.form.indicator = this.form.indicator.length > 0 ? this.form.indicator : this.defaultIndicator;
      let indicator = [];
      for (let i = 0, len = this.form.indicator.length; i < len; i++) {
        if (this.weatherIndicatorCodeArray.indexOf(this.form.indicator[i]) != -1) {
          indicator.push(this.form.indicator[i]);
        }
      }
      this.form.indicator = indicator;
      this.weatherIndicator = [];
      this.form.indicator.forEach(function(d) {
        if (d == 7) {
          self.weatherIndicator.push('7,8');
        } else if (d == 36) {
          self.weatherIndicator.push('36,37,38,39');
        } else if (d == 40) {
          self.weatherIndicator.push('40,41,42,43');
        } else if (d != 8 && d != 37 && d != 38 && d != 39 && d != 41 && d != 42 && d != 43) {
          self.weatherIndicator.push(d);
        }
      });
    },
    changeMonitorScreen(screen) {
      this.changeDisplayType = true;
      this.form.displayType = screen;
    },
    changeWeatherIndicator() {
      if (this.weatherIndicator.length > this.form.meteorologicalDisplayType) {
        this.weatherIndicator.splice(this.weatherIndicator.length - 1, 1);
        this.$message.warning('气象指标最多选择' + this.form.meteorologicalDisplayType + '种');
      }
    },
    pageGoPrev() {
      this.page.pageIndex--;
    },
    pageGoNext() {
      this.page.pageIndex++;
    },
    getWeatherMeteorologicalIndicators() {
      return new Promise(resolve => {
        this.$ajax
          .get(this.$globalData.get('base', 'apiUrl').monitorScreen.GET_METEOROLOGICAL_INDICATORS, {
            corpID: this.corpID,
            stationID: this.form.stationID
          })
          .then(res => {
            if (res.resultCode == '200') {
              this.weatherIndicatorCodeArray = res.data;
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i] == '7' || res.data[i] == '8') {
                  res.data.push('7,8');
                } else if (res.data[i] == '36' || res.data[i] == '37' || res.data[i] == '38' || res.data[i] == '39') {
                  res.data.push('36,37,38,39');
                } else if (res.data[i] == '40' || res.data[i] == '41' || res.data[i] == '42' || res.data[i] == '43') {
                  res.data.push('40,41,42,43');
                }
              }
              let weatherIndicator = this.$globalData.get('base', 'enums')['气象指标'],
                weatherIndicatorArray = {};
              this.weatherIndicatorArrayLength = 0;
              for (var o in weatherIndicator) {
                if (res.data.indexOf(weatherIndicator[o]) != -1) {
                  weatherIndicatorArray[weatherIndicator[o]] = o;
                  this.weatherIndicatorArrayLength++;
                }
              }
              this.weatherIndicatorArray = weatherIndicatorArray;
              resolve(weatherIndicatorArray);
            }
          });
      });
    },
    init() {
      //初始化页面
      if (this.form.displayMode == '') {
        if (this.isWeatherStationConfig == '1' && this.monitorPointList.length == 0) {
          this.form.displayMode = '1';
        } else if (this.isWeatherStationConfig != '1' && this.monitorPointList.length > 0) {
          this.form.displayMode = '2';
        } else if (this.isWeatherStationConfig == '1' && this.monitorPointList.length > 0) {
          this.form.displayMode = '3';
        }
      }
      if (this.form.stationID == '') {
        this.form.stationID = this.stationItems.length > 0 ? this.stationItems[0].stationID : '';
      }
      if (this.form.monitorPoint.length == 0 && this.monitorPointList.length > 0) {
        this.form.monitorPoint = this.monitorPointList
          .map(function(d) {
            return d.id;
          })
          .filter((d, index) => {
            return index <= this.monitorPointList.length;
          });
      }
      this.form.meteorologicalDisplayType = this.form.meteorologicalDisplayType || '4';
      this.page.pageNum = Math.ceil(this.monitorPointList.length / this.page.pageSize);
      this.getWeatherMeteorologicalIndicators().then(() => {
        this.resetIndicator();
      });
    },
    submit(data) {
      this.$refs.form.validate(val => {
        if (!val) {
          return;
        }
        this.uploadLocked = true;
        this.$ajax
          .post(this.$globalData.get('base', 'apiUrl').monitorScreen.CONFIG_SAVE, data)
          .then(r => {
            if (r.resultCode == '200') {
              this.$message.success(r.msg);
              this.returnList();
            } else {
              this.$message.error(r.msg);
            }
            this.uploadLocked = false;
          })
          .catch(() => {
            this.uploadLocked = false;
          });
      });
    },
    //返回列表
    returnList() {
      this.popPage();
    },
    resetConfig() {
      this.$confirm('是否取消配置?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let corpID = this.form.corpID;
          let configID = this.form.configID;
          let resetData = {
            configID: configID,
            corpID: corpID,
            monitorScreenType: ['1', '2', '3'],
            carouselTime: 15000,
            commodityRetrospectivName: '',
            showScanHistory: '2',
            isInsurance: '2',
            satelliteMapName: '',
            traceabilityMapName: '',
            weatherMonitoringName: '',
            displayMode: '',
            indicator: this.defaultIndicator,
            displayType: '16',
            monitorPoint: [],
            stationID: ''
          };
          this.form = resetData;
          this.init();
          this.$nextTick(() => {
            this.submit(resetData);
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.$ajax
      .post(this.$globalData.get('trace', 'apiUrl').weather.GET_LIST, {
        pageSize: 50,
        pageNum: 1,
        type: 1
      })
      .then(r => {
        let self = this;
        if (r.resultCode == 200) {
          if (r.data.total > 0) {
            r.data.rows.map(function(x) {
              if (x.status == '1') {
                self.stationItems.push(x);
              }
            });
          }
        } else {
          this.$message.error(r.msg);
        }
      });
  },
  created() {
    let self = this;
    this.pageFromList = !!this.getPageParams('edit').type;
    this.corpID = this.pageFromList ? this.getPageParams('edit').id : this.$globalData.get('currentUser').corpID;
    let getMonitorScreenConfig = () => {
      return new Promise(function(resolve, reject) {
        self.$ajax
          .get(self.$globalData.get('base', 'apiUrl').monitorScreen.GET_CONFIG_INFO, { corpID: self.corpID })
          .then(r => {
            if (r.resultCode == '200' && r.data) {
              self.form = r.data;
              self.isNeedsInsurance = r.data.isNeedsInsurance;
              self.isWeatherStationConfig = r.data.isWeatherStationConfig;
              resolve(true);
            } else {
              reject(new Error(r.msg));
            }
          })
          .catch(() => {
            reject(new Error());
          });
      });
    };
    let getMonitorPointList = () => {
      return new Promise(function(resolve, reject) {
        self.$ajax
          .get(self.$globalData.get('base', 'apiUrl').monitorScreen.GET_MONITOR_LIST, { corpID: self.corpID })
          .then(r => {
            if (r.resultCode == 200) {
              self.monitorPointList = r.data.rows;
              resolve(true);
            } else {
              reject(new Error(r.msg));
            }
          })
          .catch(() => {
            reject(new Error());
          });
      });
    };
    getMonitorPointList().then(() => {
      //加载监控列表
      getMonitorScreenConfig()
        .then(() => {
          //加载监控屏配置
          self.init(); //初始化页面
        })
        .catch(() => {});
    });
  }
};
</script>
<style scoped="scoped" lang="less">
.parting-line {
  border: 0;
  border-bottom: 1px solid #e5e9f2;
}

.cjm-form .el-form-item {
  margin-bottom: 20px;
}

.part-item {
  .indicator-group .el-checkbox {
    width: 125px;
    margin: 0;
  }
  .instruction {
    color: #99a9bf;
    font-size: 12px;
  }
  &-title {
    font-size: 18px;
    color: #1f2d3d;
    margin: 30px 0 23px;
  }
  &-content {
    width: 100%;
    position: relative;
  }
  &-left {
    width: 40%;
    max-width: 680px;
    min-width: 480px;
    position: relative;
    &:before {
      display: block;
      content: '';
      padding-top: 56.5%;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &-right {
    max-width: 940px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 40%;
    right: 0;
    bottom: 0;
    margin-left: 20px;
    border: 1px solid #e5e9f2;
    overflow-y: auto;
    &-inner {
      padding: 20px 20px 20px 0;
    }
  }
  .display-left {
    width: 50%;
    float: left;
    position: relative;
  }
  .display-right {
    border: 1px solid #e5e9f2;
    margin-left: 50%;
    position: relative;
    &:before {
      display: block;
      content: '';
      padding-top: 80%;
    }
  }
  .monitor-display {
    background-color: #000;
    width: 80%;
    position: relative;
    &:before {
      display: block;
      content: '';
      padding-top: 100%;
    }
    &-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .screen-item {
        background-color: #343434;
        float: left;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .monitor-point-name {
          width: 90%;
          font-size: 10px;
          color: #fff;
          text-align: right;
          line-height: 14px;
          position: absolute;
          bottom: 5px;
          right: 5px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      &.screen1 {
        .screen-item {
          width: 99%;
          height: 99%;
          margin: 0.5%;
        }
      }
      &.screen4 {
        .screen-item {
          width: 49%;
          height: 49%;
          margin: 0.5%;
        }
      }
      &.screen9 {
        .screen-item {
          width: 32.3%;
          height: 32.3%;
          margin: 0.5%;
        }
      }
      &.screen16 {
        .screen-item {
          width: 24%;
          height: 24%;
          margin: 0.5%;
        }
      }
    }
  }
  .monitor-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .monitor-title {
      color: #1f2d3d;
      font-size: 14px;
      text-align: center;
      margin: 3.8% 0;
      font-weight: normal;
    }
  }
  .monitor-group {
    margin: 0 20px;
    .el-checkbox {
      width: 33.3%;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    position: relative;
    .page {
      width: 100%;
      display: none;
    }
    .block {
      display: block;
    }
  }
  .pagination {
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 3%;
    left: 0;
    .el-icon {
      margin: 0;
    }
    .el-button {
      color: #1f2d3d;
      border-color: #1f2d3d;
    }
    .el-button.is-disabled,
    .el-button.is-disabled:focus,
    .el-button.is-disabled:hover {
      color: #bfcbd9;
      cursor: not-allowed;
      background-image: none;
    }
  }
}

.screen-row {
  margin: 0 10px;
  position: absolute;
  top: 0;
  left: 80%;
  margin-left: 10px;
  & > li {
    text-align: center;
    font-size: 22px;
    color: #bcbcbc;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 35px;
    height: 35px;
    line-height: 35px;
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
</style>
