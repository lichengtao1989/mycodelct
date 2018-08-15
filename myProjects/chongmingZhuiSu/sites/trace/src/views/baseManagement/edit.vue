<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules" style="margin-top: 30px;">
      <basic-information v-if="loadData" :form="form" :currentPageInfo="currentPageInfo" :rules="rules" @getLatitude="getLatitude" class="clear"></basic-information>
      <h1 class="cjm-h1">基地地图</h1>
      <base-map v-if="loadData" :form="form" :rules="rules" ref="map" :currentPageInfo="currentPageInfo" class="clear"></base-map>
      <h1 class="cjm-h1" style="margin-top: 20px;">基地介绍</h1>
      <base-introduced v-if="loadData" :form="form" :rules="rules" ref="baseIntroduced" :currentPageInfo="currentPageInfo" class="clear"></base-introduced>
      <h1 class="cjm-h1" :currentPageInfo="currentPageInfo" style="margin-top: 20px;">基地气候环境</h1>
      <climate v-if="loadData" :form="form" :rules="rules" :currentPageInfo="currentPageInfo" class="clear"></climate>
      <div class="cjm-page-bottom-bar" style="bottom:-38px;max-width:800px;">
        <cjm-button type="primary" @click="save()" v-if="currentPageInfo.pageType != 'view'" :loading="submitLoading">
          <i class="cjm-icon-save"></i>保存
        </cjm-button>
        <!-- <cjm-button type="primary" @click="editBasePage()" v-if="currentPageInfo.pageType== 'view'" :loading="submitLoading">
          <i class="cjm-icon-save"></i>编辑
        </cjm-button> -->
        <cjm-button @click="popPage">
          取消</cjm-button>
      </div>
    </cjm-form>
  </div>
</template>

<script>
import basicInformation from './components/basic-Information.vue';
import climate from './components/climate.vue';
import baseMap from './components/map.vue';
import baseIntroduced from './components/base-introduced.vue';
import pageSwitch from 'framework/mixins/pageSwitch';
import routerUtil from 'framework/utils/router';
export default {
  mixins: [pageSwitch],
  components: {
    basicInformation,
    climate,
    baseMap,
    baseIntroduced
  },
  props: {},
  data() {
    return {
      enums: this.$globalData.get('trace', 'enums'),
      apiUrl: this.$globalData.get('trace', 'apiUrl'),
      submitLoading: false,
      loadData: false,
      form: {},
      currentPageInfo: {
        pageType: ''
      },
      rules: {
        baseName: [this.$formRules.required, this.$formRules.maxLength(50)],
        managementOrgID: [this.$formRules.required],
        baseCode: [this.$formRules.maxLength(20)],
        regionCode: [this.$formRules.required],
        villages: [this.$formRules.maxLength(20)],
        address: [this.$formRules.maxLength(100)],
        manager: [this.$formRules.required, this.$formRules.maxLength(20)],
        managerPhone: [this.$formRules.phoneOrMobile],
        size: [this.$formRules.number],
        baseIntroduce: [this.$formRules.maxLength(2000)],
        dayAndNight: [this.$formRules.numberRange(0, 30)],
        frostFreePeriod: [this.$formRules.numberRange(0, 366)],
        averageRainfall: [this.$formRules.numberRange(0, 10000)],
        averageSunshineTime: [this.$formRules.numberRange(0, 3500)]
      }
    };
  },
  computed: {},
  methods: {
    //取消
    popPage() {
      routerUtil.push('baseList');
    },
    save() {
      this.submitLoading = true;
      this.$refs.form
        .validate()
        .then(() => {
          this.$ajax.post(this.apiUrl.baseManagement.SAVE, this.form).then(data => {
            if (data.resultCode != 200) {
              this.submitLoading = false;
              this.$message.error(data.msg);
            } else {
              this.popPage();
            }
          });
        })
        .catch(() => {
          this.submitLoading = false;
        });
    },
    //根据所在地获取经纬度
    getLatitude(regionCodeName) {
      this.$nextTick(() => {
        if (regionCodeName != undefined) {
          this.$refs.map.getLatitude(regionCodeName);
        }
      });
    },
    getDetailed(baseID) {
      this.$ajax
        .get(this.apiUrl.baseManagement.GET_DETAILED, { baseID: baseID })
        .then(r => {
          if (r.resultCode == '200') {
            this.form = r.data;
            if (r.data.jurisdictionalArea != '') {
              this.form.jurisdictionalArea = JSON.parse(r.data.jurisdictionalArea);
            }
            this.loadData = true;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    reset() {
      this.form = {
        baseID: '',
        baseName: '',
        baseCode: '',
        size: '',
        sizeUnit: '0',
        managementOrgID: '',
        orgName: '',
        manager: '',
        managerPhone: '',
        address: '',
        regionCode: '',
        img: [],
        baseIntroduce: '',
        areaClimate: '0',
        dayAndNight: '',
        frostFreePeriod: '',
        averageRainfall: '',
        averageSunshineTime: '',
        longitude: '',
        latitude: '',
        jurisdictionalArea: [],
        villages: '',
        contractBeginTime: '',
        contractEndTime: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    }
  },
  created() {
    this.reset();
    if (this.getPageParams('editBase') && this.getPageParams('editBase').pageType) {
      const pageParams = this.getPageParams('editBase');
      this.currentPageInfo.pageType = pageParams.pageType;
      if (pageParams.pageType != 'add') {
        this.form.baseID = pageParams.baseID;
        this.getDetailed(pageParams.baseID);
      } else {
        this.loadData = true;
      }
    }
  }
};
</script>

<style scoped>
.only-for-print {
  display: none;
}
</style>
