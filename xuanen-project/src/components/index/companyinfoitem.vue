<template>
  <div class="companyinfoinner" :data-id="linkid"  :class="classIndex" @click="clickFn($event,linkid,textval)">
<div class="topimg" >
  <!-- <img :src="computedClass" class="imgs"> -->
  <i class="icon zlSystemIcon " :class="computedClass"></i>
</div>
<div class="textshowval">{{textval}}</div>
</div>
 
  
</template>

<script>
// import tabbox from "@/base/tabbox";
import { mapMutations, mapGetters } from "vuex";

export default {
  props: {
    linkid: {
      type: String,
      default: ""
    },
    logoImage: {
      type: String,
      default: ""
    },
    textval: {
      type: String,
      default: ""
    },
    typeid: {
      type: Number,
      default: ""
    },
    idx: {
      type: Number,
      default: ""
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    classIndex() {
      return `classindex${this.idx}`;
    },
    computedClass() {
      return this.logoImage;
    }
  },
  methods: {
    clickFn(ev, linkid, textval) {
      if (textval == "农资进销存系统") {
        // window.open("http://trp.app315.net");
        window.open("http://xuanen.trp.app315.net ");
      } else {
        let id = ev.target.dataset.id;

        this.setSystemId(linkid);
        this.setLoginShow(true);
      }
    },
    numClick(e) {},
    ...mapMutations({
      setLoginShow: "SET_LOGINSHOW",
      setSystemId: "SET_SYSTEMID"
    })
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.companyinfoinner {
  width: 25%;
  @include te;
  @include inline-block;
  vertical-align: top;
  height: 199px;
  @include pr;
  @include ov;
  cursor: pointer;

  .imgs {
    @include block;
    @include mag;
    margin-top: 37px;
    margin-bottom: 26px;
  }
  border-right: 1px solid #d0e9d9;
  @include bs;
}
.cindex2{
  .companyinfoinner{
    width:50%;
  }
}
.cindex3{
  .companyinfoinner{
    width:33.3333%;
  }
}
.cindex4{
  .companyinfoinner{
    width:25%;
  }
}
.cindex5{
  .companyinfoinner{
    width:20%;
  }
}
.companyinfoinner:hover {
  @include baimg("../../../static/images/bgl.png");
  @include co(#fff);
  .zlSystemIcon {
    @include co(#fff);
  }
}
// .classindex0 {
//   @include baimg("../../../static/images/bgl.png");
// }
.classindex0,
.classindex1,
.classindex2,
.classindex3 {
  border-bottom: 1px solid #d0e9d9;
}
.topimg {
  margin-top: 37px;
  margin-bottom: 26px;
  .zlSystemIcon {
    @include fo(80px);
    @include co(#128f40);
  }
}
</style>
