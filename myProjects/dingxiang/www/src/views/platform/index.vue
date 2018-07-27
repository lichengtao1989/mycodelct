<template>
  <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
    <div class="wraplct">
      <div class="tpartlct">
        <div class="leftpart inline50">
          <nz-form-item label="网站名称">
            <nz-input v-model="form.WebsiteName" placeholder="请输入网站名称"></nz-input>
          </nz-form-item>
          <nz-form-item label="联系单位">
            <nz-input v-model="form.ContactUnit" placeholder="请输入联系单位"></nz-input>
          </nz-form-item>
          <nz-form-item label="电话">
            <nz-input v-model="form.Telphone" placeholder="请输入电话"></nz-input>
          </nz-form-item>
          <nz-form-item label="介绍">

            <nz-input v-model="form.Remark" type="textarea" rows="3" resize="none" placeholder="请输入介绍"></nz-input>
          </nz-form-item>
        </div>
        <div class="rightpartlct inline50">
          <nz-form-item label="主办单位">
            <nz-input v-model="form.Organizer" placeholder="请输入主办单位"></nz-input>
          </nz-form-item>
          <nz-form-item label="邮编">
            <nz-input v-model="form.Postcode" placeholder="请输入邮编"></nz-input>
          </nz-form-item>
          <nz-form-item label="地址">
            <nz-input v-model="form.Address" placeholder="请按省市区详细地址来填写，以便正确进行地图定位" class="inputlastlct"></nz-input>
            <nz-button type="primary" @click="search">地图定位</nz-button>
          </nz-form-item>
        </div>
      </div>
      <div class="uploadlct">
        <div class="imgload" v-if="form.CorpID">
          <nz-form-item label="logo">
            <nz-image-upload v-model="form.Logo"></nz-image-upload>
            <!-- <span class="sps">图片推荐尺寸为380*285</span> -->
            <!-- <img :src="form.Logo" alt="" class="logo"> -->
          </nz-form-item>
        </div>

      </div>
      <div class="ditu" id="mapView"></div>
      <nz-button type="primary" @click="saveFn" class="savebtn">
        保存
      </nz-button>
    </div>
  </nz-form>

</template>
<script>
import BMap from 'BMap';
export default {
  props: ['typeVal'],
  components: {},
  data() {
    return {
      myindex: 0,
      cropInfo: {},
      ImageInfo: [],
      formModel: {
        LinkID: '',
        LinkName: '',
        LinkType: 1,
        LinkUrl: ''
      },
      form: {},
      rules: {}
    };
  },
  created() {},
  mounted() {
    this.getCorpInfo();
  },
  methods: {
    async saveFn() {
      let { err, res } = await this.$ajax.post(this.$apiUrl.COMMON.SETCORPINFO, this.form);
      if (err) {
      } else {
        if (res.ResultCode == 200) {
          this.$message.success('保存成功');
        }
      }
    },
    mapInit() {
      const map = new BMap.Map('mapView');
      const { cropInfo } = this;
      const point = new BMap.Point(cropInfo.Longitude * 1, cropInfo.Latitude * 1);
      const marker = new BMap.Marker(point);
      map.addOverlay(marker);
      map.panTo(point, { noAnimation: true });
      map.centerAndZoom(point, 14);
      map.enableScrollWheelZoom();
    },
    search() {
      let _this = this;
      const map = new BMap.Map('mapView');
      const local = new BMap.LocalSearch(map, {
        renderOptions: { map: map },
        onSearchComplete: function(results) {
          _this.form.Longitude = results.Br[0].point.lng;
          _this.form.Latitude = results.Br[0].point.lat;
          // console.log(_this.form);
        }
      });
      local.search(this.form.Address);
    },
    async getCorpInfo() {
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.SYSCORP);
      if (err) {
      } else {
        this.cropInfo = res.Data.List[0];
        this.form = Object.jsonClone(res.Data.List[0]);
        this.mapInit();
      }
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
#mapView {
  width: 90%;
  height: 450px;
  margin-left: 40px;
  margin-right: 20px;
}
.savebtn{
    margin-left: 40px;
    margin-top:10px;
    margin-bottom:40px;
}
.tpartlct {
  padding-top: 50px;
}
.inputlastlct {
  width: 75.5%;
}
.inline50 {
  display: inline-block;
  width: 49%;
  vertical-align: top;
}
.sps {
  margin-left: 20px;
}
.activelct {
  background: #00a88a;
  color: #fff;
}
.logo {
  height: 60px;
  vertical-align: middle;
}
</style>