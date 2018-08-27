<template>
  <div class="model company" v-show="showflag">
    <div class="boxinner">
      <div class="guanbi" @click="closeFn"></div>
      <div class="boxcontent">
        <div>
          <div class="topbt">企业资质</div>
          <img :src="item" alt="" v-for="item in Qualification" :key="item"/>
        </div>

        <div class="topbt">质量认证</div>
        <img :src="item.imgUrl" alt="" v-for="(item, index) in AuthenticationImg" :key="'质量认证'+index"/>
        <div class="topbt">企业荣誉</div>
        <img :src="item.imgUrl" alt="" v-for="(item, index) in Honor" :key="'企业荣誉'+index"/>

        <div>
          <div class="topbt">生产环境和设备</div>
          <div class="fielditem" v-if="proFacility" key="proFacility">
            <div>生产设备</div>
            <img :src="item.imgUrl" alt="" v-for="(item, index) in proFacility" :key="index">
          </div>
          <div class="fielditem" v-if="proMaterials" key="proMaterials">
            <div>生产用料</div>
            <img :src="item.imgUrl" alt="" v-for="(item, index) in proMaterials" :key="index"/>
          </div>
          <div class="fielditem" v-if="proMethod" key="proMethod">
            <div>生产方法</div>
            <img :src="item.imgUrl" alt="" v-for="(item, index) in proMethod" :key="index">
          </div>
          <div class="fielditem" v-if="proEnvironment" key="proEnvironment">
            <div>生产环境</div>
            <img :src="item.imgUrl || ''" alt="" v-for="(item, index) in proEnvironment" :key="index">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      flag: {
        type: Number,
        default: 1,
      }
    },
    computed: {
      showflag: function () {
        if (this.flag == 1) {
          return false;
        } else {
          return true;
        }
      },
      Qualification() {
        let Qualification = []
        if (this.$store.state.corpInfo.OrgInfo && this.$store.state.corpInfo.OrgInfo.Qualification) {
          Qualification = JSON.parse(this.$store.state.corpInfo.OrgInfo.Qualification);
        }
        return Qualification;
      },
      AuthenticationImg() {
        let AuthenticationImg = []
        if (this.$store.state.corpInfo.Comprehensive && this.$store.state.corpInfo.Comprehensive.Certification.CertificationStatus) {
          let img = this.$store.state.corpInfo.Comprehensive.Certification.CertificationStatus.AuthenticationImg;
          AuthenticationImg = this.dealImgs(img, 'AuthenticationImg');
        }
        return AuthenticationImg;
      },
      Honor() {
        let Honor = []
        if (this.$store.state.corpInfo.Comprehensive && this.$store.state.corpInfo.Comprehensive.Honor) {
          let img = this.$store.state.corpInfo.Comprehensive.Honor.OrgLicence;
          Honor = this.dealImgs(img, 'OrgLicence');
        }
        return Honor;
      },
      proEnvironment() {
        let proEnvironment = [];
        if (this.$store.state.corpInfo.Comprehensive && this.$store.state.corpInfo.Comprehensive.Production) {
          let img = this.$store.state.corpInfo.Comprehensive.Production.proEnvironment;
          proEnvironment = this.dealImgs(img, 'proEnvironment');
        }
        return proEnvironment;
      },
      proFacility() {
        let proFacility = [];
        if (this.$store.state.corpInfo.Comprehensive && this.$store.state.corpInfo.Comprehensive.Production) {
          let img = this.$store.state.corpInfo.Comprehensive.Production.proFacility;
          proFacility = this.dealImgs(img, 'proFacility');
        }
        return proFacility;
      },
      proMaterials() {
        let proMaterials = [];
        if (this.$store.state.corpInfo.Comprehensive && this.$store.state.corpInfo.Comprehensive.Production) {
          let img = this.$store.state.corpInfo.Comprehensive.Production.proMaterials;
          proMaterials = this.dealImgs(img, 'proMaterials');
        }
        return proMaterials;
      },
      proMethod() {
        let proMethod = [];
        if (this.$store.state.corpInfo.Comprehensive && this.$store.state.corpInfo.Comprehensive.Production) {
          let img = this.$store.state.corpInfo.Comprehensive.Production.proMethod;
          proMethod = this.dealImgs(img, 'proMethod');
        }
        return proMethod;
      },
    },
    methods: {
      closeFn() {
        this.$emit("close");
      },
      dealImgs(imgs, type){
        let data = [];
        if (imgs && imgs.constructor === Object) {
          data.push({imgUrl: imgs.imgUrl || imgs.url, imgDetail: imgs.imgDetail || imgs.detail})
        } else if (imgs && imgs.constructor === Array) {
          data = imgs.map((item) => {
            return {imgUrl: item[type].imgUrl || item[type].url, imgDetail: item[type].imgDetail || item[type].detail}
          })
        }
        return data;
      }
    },
    data: function () {
      return {};
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/style/_var.scss";
  @import "../assets/style/util.scss";

  $base: 75;
  .model {
    .boxinner {
      height: 1000rem / $base;
    }
    img {
      width: 100%;
      margin-top: 30rem / $base;
    }
    .topbt {
      @include wh(356rem / $base, 62rem / $base);
      margin: 20rem / $base auto 20rem / $base auto;
      @include li(62rem / $base);
      @include fo(40rem / $base);
      @include co(#323232);
      @include te;
    }
    .fielditem {
      width: 100%;
      padding-top: 15rem / $base;
      margin-bottom: 20rem / $base;
      color: #333;
      text-align: right;
      overflow: hidden;
      div:nth-child(1) {
        float: left;
        color: #aaa;
      }
      div:nth-child(2) {
        float: right;
      }
    }
  }
</style>
