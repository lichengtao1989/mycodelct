<template>
  <div class="clear commonbom" v-if="currentPageInfo.pageType!= 'view' ">
    <cjm-form-item label="基地名称" prop="baseName" required class="cjm-form-item-long ">
      <cjm-input v-model="form.baseName" placeholder="请输入基地名称"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="基地负责人" prop="manager" required>
      <cjm-input v-model="form.manager" placeholder="请输入基地负责人"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="联系电话" prop="managerPhone">
      <cjm-input v-model="form.managerPhone" placeholder="请输入联系电话"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="管理机构" prop="managementOrgID" class="cjm-form-item-long" required>
      <cjm-remote-select v-model="form.managementOrgID" placeholder="请输入或选择管理机构" :label="form.orgName" :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.ORG"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="基地编码" prop="baseCode">
      <cjm-input v-model="form.baseCode" placeholder="请输入基地编码"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="基地面积" prop="size">
      <cjm-input v-model="form.size" placeholder="请输入基地面积">
        <cjm-select slot="suffix" v-model="form.sizeUnit" style="width:120px; margin-right: -5px;">
          <cjm-option v-for="(value,key) in baseUnit" :label="key" :value="value" :key="value"></cjm-option>
        </cjm-select>
      </cjm-input>
    </cjm-form-item>
    <cjm-form-item label="承包时间" class="cjm-form-item-long">
      <cjm-date-range-picker :begin-time.sync="form.contractBeginTime" :end-time.sync="form.contractEndTime" type="date"></cjm-date-range-picker>
    </cjm-form-item>

    <cjm-form-item label="所在地" prop="regionCode" required>
      <cjm-region-select v-model="form.regionCode"></cjm-region-select>
      <div>
      </div>
    </cjm-form-item>
    <cjm-form-item label="乡镇" prop="villages">
      <cjm-input v-model="form.villages" placeholder="请输入乡镇"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="详细地址" prop="address" class="cjm-form-item-long">
      <cjm-input v-model="form.address" placeholder="请输入详细地址"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="基地图片" class="cjm-form-item-long">
      <cjm-image-upload v-model="form.img" acceptType="image" :maxNumber="5" :multiple="true" tips="建议上传尺寸:800*600px,最多上传5张 "></cjm-image-upload>
    </cjm-form-item>
  </div>
  <div class="clear commonbom" v-else>
    <div class="img-info" v-if="form.img.length > 0">
      <Carousel ref="carousel" indicator-position="none" :height="height" style="margin-bottom: 20px;" :autoplay="false">
        <CarouselItem v-for="iteminfo in form.img" :key="iteminfo" class="base-list">
          <img class="base-big" :src="iteminfo" />
        </CarouselItem>
      </Carousel>
      <div class="prev" :class="{'prevClass':prevClass}" v-if="form.img.length > 3">
        <i class="cjm-icon-chevron-down cjm-icon-rotate-90" @click="prev"></i>
      </div>
      <ul class="base-small">
        <li v-for="(iteminfo,key) in form.img" :key="iteminfo" :style=" key==0 ? `margin-left:${marginLeft}px`:''" @click="setActiveItem(key)">
          <img :src="iteminfo" />
        </li>
      </ul>
      <div class="next" :class="{'nextClass':nextClass}" v-if="form.img.length > 3">
        <i class="cjm-icon-chevron-down cjm-icon-rotate-n90" @click="next"></i>
      </div>
    </div>
    <div class="img-info" v-else>
      <div class="nodata">
        <img src="static/images/nodata.png" />
      </div>
    </div>
    <div class="base-info">
      <div style="width:100%;padding: 0px 0px 4px 28px;font-size: 20px;">{{form.baseName}}</div>
      <cjm-form-item label="基地负责人" class="cjm-form-item-long view-common-css">
        {{form.manager}}
      </cjm-form-item>
      <cjm-form-item label="联系电话" class="cjm-form-item-long view-common-css">
        {{form.managerPhone}}
      </cjm-form-item>
      <cjm-form-item label="管理机构" class="cjm-form-item-long view-common-css">
        {{form.orgName}}
      </cjm-form-item>
      <cjm-form-item label="基地编码" class="cjm-form-item-long view-common-css">
        {{form.baseCode}}
      </cjm-form-item>
      <cjm-form-item label="基地面积" class="cjm-form-item-long view-common-css">
        {{form.size}}{{sizeUnitName}}{{muAndHectares}}
      </cjm-form-item>
      <cjm-form-item label="承包时间" class="cjm-form-item-long view-common-css">
        {{form.contractBeginTime}}至{{form.contractEndTime}}
      </cjm-form-item>
      <cjm-form-item label="基地地址" class="cjm-form-item-long view-common-css">
        {{regionCodeName}}{{form.villages}}{{form.address}}
      </cjm-form-item>
    </div>
  </div>
</template>
<script>
import { Carousel, CarouselItem } from 'element-ui';
import { storage } from 'framework/utils/storage';
import { ajax } from 'framework/utils/ajax';
import apiUrl2 from 'framework/config/apiUrl';
export default {
  components: {
    Carousel: Carousel,
    CarouselItem: CarouselItem
  },
  data() {
    return {
      enums: this.$globalData.get('trace', 'enums'),
      apiUrl: this.$globalData.get('trace', 'apiUrl'),
      height: '250px',
      marginLeft: '0',
      imgIndex: 0,
      regionData: [],
      regionCodeName: '',
      sizeUnitName: '',
      nextClass: false,
      prevClass: true,
      muAndHectares: ''
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
  watch: {
    'form.regionCode': function() {
      this.regionCodeName = this.getRegionCodeName(this.form.regionCode);
      this.$nextTick(() => {
        this.$emit('getLatitude', this.regionCodeName);
      });
    }
  },
  computed: {
    baseUnit() {
      return this.$globalData.get('trace', 'enums')['基地单位'];
    }
  },
  methods: {
    //上一张图片
    prev() {
      this.nextClass = false;
      this.prevClass = false;
      if (this.imgIndex == 1) {
        this.prevClass = true;
      }
      if (this.imgIndex == 0) {
        this.prevClass = true;
        return false;
      }
      if (this.form.img.length > 3) {
        if (this.imgIndex - 1 < this.form.img.length - 3) {
          this.marginLeft = (this.imgIndex - 1) * -78;
        }
      }
      this.$refs.carousel.prev();
      this.imgIndex = this.imgIndex - 1;
    },
    //下一张图片
    next() {
      if (this.imgIndex + 2 == this.form.img.length) {
        this.nextClass = true;
      }
      if (this.imgIndex + 1 == this.form.img.length) {
        return false;
      }
      if (this.form.img.length > 3) {
        if (this.imgIndex < this.form.img.length - 3) {
          this.marginLeft = (this.imgIndex + 1) * -78;
        }
      }
      this.$refs.carousel.next();
      this.prevClass = false;
      this.imgIndex = this.imgIndex + 1;
    },
    setActiveItem(val) {
      this.imgIndex = val;
      if (this.imgIndex > 0) {
        this.prevClass = false;
      }
      if (this.imgIndex + 1 == this.form.img.length) {
        this.nextClass = true;
      }
      this.$refs.carousel.setActiveItem(val);
      if (this.form.img.length > 3) {
        if (val == 0) {
          return;
        }
        if (val > this.form.img.length - 2) {
          return;
        }
        this.marginLeft = (val - 1) * -78;
      }
    },
    getRegionData() {
      storage.remove('regionData');
      return new Promise(resolve => {
        let regionData = storage.get('regionData2');
        if (!regionData) {
          ajax.get(apiUrl2.REGION).then(r => {
            storage.set('regionData2', r);
            resolve(r);
          });
        } else {
          resolve(regionData);
        }
      });
    },
    getRegionCodeName(regionCode) {
      if (regionCode != '') {
        let result = [];
        let provinceCityDistrict = '';
        if (!regionCode || regionCode.length !== 6) {
          return result;
        }
        result.push(regionCode.substr(0, 2) + '0000');
        if (regionCode.substr(2, 4) !== '0000') {
          result.push(this.form.regionCode.substr(0, 4) + '00');
        }
        if (regionCode.substr(4, 2) !== '00') {
          result.push(regionCode);
        }
        for (let j = 0; j < this.regionData.length; j++) {
          let provinceCode = this.regionData[j];
          if (provinceCode.RegionCode == result[0]) {
            provinceCityDistrict = provinceCode.RegionName;
            for (let i = 0; i < provinceCode.SubItems.length; i++) {
              var cityCode = provinceCode.SubItems[i];
              if (cityCode.RegionCode == result[1]) {
                provinceCityDistrict += cityCode.RegionName;
                for (let k = 0; k < cityCode.SubItems.length; k++) {
                  var districtCode = cityCode.SubItems[k];
                  if (districtCode.RegionCode == result[2]) {
                    provinceCityDistrict += districtCode.RegionName;
                    break;
                  }
                }
              }
            }
          }
        }
        this.regionCodeName = provinceCityDistrict;
        return provinceCityDistrict;
      }
    },
    //亩公顷转换平方米
    MuAndHectaresConvert(lastUnit) {
      var fRate = {
        //换算率
        公顷: { 亩: 15, 平方米: 10000 },
        亩: { 平方米: 10000 / 15, 公顷: 1 / 15 },
        平方米: { 亩: 15 / 10000, 公顷: 1 / 10000 }
      };
      var rst = (this.form.size * fRate[lastUnit]['平方米']).toFixed(2); //保留2位小数
      this.muAndHectares = `(${rst}平方米)`;
    }
  },
  created() {
    this.getRegionData().then(data => {
      this.regionData = data;
    });
    this.$nextTick(() => {
      if (this.currentPageInfo.pageType == 'view') {
        if (this.form.regionCode != null) {
          this.regionCodeName = this.getRegionCodeName(this.form.regionCode);
        }
        this.sizeUnitName = Object.keys(this.baseUnit).find(key => this.baseUnit[key] == this.form.sizeUnit);
        if (this.form.sizeUnit > 0) {
          this.MuAndHectaresConvert(this.sizeUnitName);
        }
      }
    });
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.commonbom {
  margin-bottom: 20px;
}
.view-common-css {
  margin-bottom: 0px;
}
.img-info {
  width: 255px;
  float: left;
}
.base-info {
  float: left;
  width: 450px;
}
.base-list {
  width: 255px;
  float: left;
}
.base-big {
  width: 100%;
}
.prev {
  float: left;
  font-size: 20px;
  line-height: 80px;
  color: #475669;
  cursor: pointer;
}
.next {
  float: right;
  font-size: 20px;
  line-height: 80px;
  color: #475669;
  cursor: pointer;
}
.base-small {
  width: 210px;
  overflow: hidden;
  height: 80px;
  white-space: nowrap;
  display: inline-block;
  li {
    width: 66px;
    height: 80px;
    margin-right: 6px;
    display: inline-block;
    cursor: pointer;
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
}
.base-small-div {
  display: inline-block;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.nextClass {
  color: #d3dce6;
}
.prevClass {
  color: #d3dce6;
}
.nodata {
  width: 215px;
  height: 200px;
}
</style>
