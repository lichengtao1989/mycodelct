<template>
  <div class="wraplctout">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="地址">
        <nz-input v-model="Address" placeholder="请输入地域名称搜索" class="inputlastlct"></nz-input>
        <nz-button type="primary" @click="search" class="dingwei">地图定位</nz-button>
      </nz-form-item>
      <div class="ditu" id="mapView"></div>
      <div class="wraplct">
        <div class="tpartlct">
          <div class="leftpart inline50">
            <nz-form-item label="经度">
              <nz-input v-model="form.Longitude" placeholder="当前地区经度" readonly="true"></nz-input>
            </nz-form-item>
            <nz-form-item label="层级">
              <nz-input v-model="form.MapZoom" placeholder="当前定位层级" readonly="true"></nz-input>
            </nz-form-item>
          </div>
          <div class="rightpartlct inline50">
            <nz-form-item label="纬度">
              <nz-input v-model="form.Latitude" placeholder="当前地区纬度" readonly="true"></nz-input>
            </nz-form-item>
            <nz-form-item label="是否可见" :data-radio="form.ShowMap">
              <nz-radio v-model="form.ShowMap" :label="label1">显示</nz-radio>
              <nz-radio v-model="form.ShowMap" :label="label0">隐藏</nz-radio>
            </nz-form-item>
          </div>
        </div>
      </div>
      <div class="sxyc">

      </div>
      <nz-button type="primary" @click="saveFn" class="savebtn">
        保存
      </nz-button>

    </nz-form>

  </div>

</template>
<script>
import BMap from 'BMap';
export default {
  props: ['typeVal'],
  components: {},
  data() {
    return {
      radio: 1,
      label1: 1,
      label0: 0,
      myindex: 0,
      textAry: [{ text: '友情链接', id: 1 }, { text: '其他链接', id: 2 }],
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
  mounted() {
    this.getCorpInfo();
  },
  methods: {
    async saveFn() {
      let { err, res } = await this.$ajax.post(this.$apiUrl.COMMON.MAP, this.form);
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
      local.search(this.Address);
    },
    async getCorpInfo() {
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.SYSCORP);
      if (err) {
      } else {
        this.cropInfo = res.Data.List[0];
        this.form = Object.jsonClone(res.Data.List[0]);
        this.mapInit();
        console.log(this.form);
      }
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.sps {
  margin-left: 20px;
}
.wraplctout {
  padding-top: 50px;
}
.inputlastlctout {
  width: 74.5%;
}
.dingwei {
  margin-left: 1%;
}
#mapView {
  width: 90%;
  height: 450px;
  margin-left: 40px;
  margin-right: 20px;
}
.savebtn {
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 40px;
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
</style>