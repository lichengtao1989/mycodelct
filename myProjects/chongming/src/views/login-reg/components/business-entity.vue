<template>
  <div>
    <nz-form-item prop="mobile" label="手机号码" required>
      <nz-input placeholder="请输入常用手机号" v-model="form.mobile" autocomplete.native="off" :disabled="disabled || currentPageDisabled"></nz-input>
    </nz-form-item>
    <nz-form-item prop="code" label="验证码" v-if="currentPage=='register'" required>
      <nz-input placeholder="请输入手机验证码" v-model="form.code">
        <!-- <nz-button slot="append" class="get-verification-code" :class="{'get-verification-code-disabled': disabledCode}" :disabled="disabledCode" @click="sendSms">{{getVerificationCode}}</nz-button> -->
        <nz-button slot="append" :disabled="disabledCode" @click="sendSms">{{getVerificationCode}}</nz-button>
      </nz-input>
    </nz-form-item>
    <nz-form-item prop="password" label="密码" v-if="currentPage=='register'" required>
      <nz-input placeholder="请设置密码" type="password" v-model="form.password"></nz-input>
    </nz-form-item>
    <nz-form-item prop="confirmPassword" label="确认密码" v-if="currentPage=='register'" required>
      <nz-input placeholder="请再次输入密码" type="password" v-model="form.confirmPassword"></nz-input>
    </nz-form-item>
    <nz-form-item prop="storeName" label="经营主体名称" required>
      <nz-input placeholder="请输入公司名称或店铺名称" v-model="form.storeName" :disabled="disabled && currentPageDisabled"></nz-input>
    </nz-form-item>
    <nz-form-item prop="legal" label="法人代表" required>
      <nz-input placeholder="请输入法人代表" v-model="form.legal" :disabled="disabled && currentPageDisabled"></nz-input>
    </nz-form-item>
    <nz-form-item prop="creditCode" label="统一社会信用代码" required>
      <nz-input placeholder="请输入统一社会信用代码" v-model="form.creditCode" :disabled="disabled && currentPageDisabled"></nz-input>
    </nz-form-item>
    <nz-form-item prop="licenseKey" label="许可证号" required>
      <nz-input placeholder="请输入经营许可证号" v-model="form.licenseKey"></nz-input>
    </nz-form-item>
    <nz-form-item prop="licenseImg" label="营业执照照片" required>
      <nz-image-upload v-model="form.licenseImg"></nz-image-upload>
    </nz-form-item>
    <nz-form-item prop="type" label="经营类型" required>
      <nz-enum-select v-model="form.type" is-radio :options="$enum('经营类型').values"></nz-enum-select>
    </nz-form-item>
    <nz-form-item prop="scope" label="经营范围" v-if="currentPage!='register'" required>
      <nz-input placeholder="请输入经营范围" v-model="form.scope"></nz-input>
    </nz-form-item>
    <nz-form-item prop="isSaleRestrictivePesticides" label="经营限制性农药" required>
      <nz-enum-select v-model="form.isSaleRestrictivePesticides" is-radio :options="$enum('是否').values"></nz-enum-select>
    </nz-form-item>
    <nz-form-item prop="regionCode" label="经营地址" required>
      <nz-region-select v-model="form.regionCode" style="width:100%;" placeholder="请选择省市区"></nz-region-select>
    </nz-form-item>
    <nz-form-item prop="address">
      <nz-input placeholder="请输入详细地址" v-model="form.address"></nz-input>
    </nz-form-item>
    <div class="amap-wrapper">
      <el-amap vid="amapDemo" ref="map" :zoom="zoom" :center="center" :plugin="plugin" :events="events" :map-manager="amapManager">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :icon="marker.icon" :draggable="marker.draggable" :events="marker.events" :key="index"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import VueAMap from 'vue-amap';
import markerIcon from '../../../../static/img/markericon.png';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '12fea8c7f7f0ec1a0a851b89feaf84ea',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder', 'AMap.Geolocation', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MouseTool']
});
let amapManager = new VueAMap.AMapManager();
export default {
  data() {
    let markers = [];
    return {
      center: [117.000923, 36.675807],
      longitude: '',
      latitude: '',
      activationDialog: false,
      amapManager,
      plugin: [
        {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {}
          }
        }
      ],
      events: {
        init: o => {
          this.map = this.$refs.map.$$getInstance();
        },
        complete: o => {}
      },
      location: '',
      zoom: 13,
      markers: markers,
      map: null,
      getVerificationCode: '获取验证码',
      getVerificationCode2: '',
      disabledCode: false,
      countdown: 0,
      countDownTimeOut: null,
      disabled: false,
      currentPageDisabled: false
    };
  },
  watch: {
    async 'form.regionCode'() {
      let regionCode = this.form.regionCode;
      let regionCodeName = await this.$model('region').getRegionText(regionCode);
      this.getLatitude(regionCodeName.join(''));
    }
  },
  props: {
    form: {
      type: Object
    },
    rules: {
      type: Object
    },
    currentPage: {
      type: String
    }
  },
  computed: {},
  mounted() {},
  methods: {
    async startCountdown() {
      // var t = this;
      // this.$storage.set('countDownEndTime', Date.now() + 1e3 * this.countdown),
      //   clearTimeout(this.countDownTimeOut),
      //   this.countdown > 0 &&
      //     (this.countDownTimeOut = setTimeout(function() {
      //       (t.countdown = t.countdown - 1), t.startCountdown();
      //     }, 1e3));
    },
    async sendSms() {
      let data = {
        mobile: this.form.mobile
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.USER.IS_EXIST, data);
      if (err) {
        this.$message.showError(err);
        return false;
      }
      if (res.resultCode == 200) {
        if (res.data == 'false') {
          this.isSendSms();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    isSendSms() {
      let reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!reg.test(this.form.mobile)) {
        this.$message.error('请输入正确的手机号');
        return false;
      }
      this.$ajax
        .get(this.$apiUrl.COMMON.SEND_SMS, { mobile: this.form.mobile })
        .then(r => {
          if (r.res.resultCode == 200) {
            this.disabledCode = true;
            this.intervalSeconds();
          } else {
            this.$message.error(r.err.msg);
          }
        })
        .catch(() => {});
    },
    intervalSeconds() {
      let seconds = 60;
      let self = this;
      var countDownTime = setInterval(function() {
        self.getVerificationCode = `已发送${seconds}`;
        --seconds;
        if (seconds == 0) {
          clearInterval(countDownTime);
          self.getVerificationCode = `获取验证码`;
          self.disabledCode = false;
        }
      }, 1000);
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
    setMarkers() {
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
        draggable: true,
        icon: markerIcon
      };
      this.markers.push(marker);
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.currentPage == 'edit') {
        this.disabled = true;
        this.currentPageDisabled = true;
        this.setMarkers();
      }
      if (this.currentPage == 'governmentEdit') {
        this.currentPageDisabled = true;
        this.setMarkers();
      }
    });
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.amap-wrapper {
  height: 250px;
  margin-left: 200px;
  display: inline-block;
  width: 450px;
}
</style>
<style rel='stylesheet/less' lang='less'>
.el-input-group__append button.el-button.get-verification-code {
  background-color: #00a88a;
  color: #ffffff;
  border-left: 0;
}
.el-input-group__append button.el-button.get-verification-code-disabled {
  background-color: #cbcbcb;
}
</style>