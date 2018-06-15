<template>
  <div class="top">
    <div v-wechat-title="titleval"></div>
<div class="logoshow"><img :src="logoimg" class="logoimg"></div>
<div class="textshow"></div>
 <div class="righttime">{{timeStr}}</div>
  </div>
</template>

<script>
import apiList from "@/api/api";
import companyInfoFn from "@/api/companyinfo";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      endflag: false,
      timeStr: "",
      logoimg: "",
      titleval: ""
    };
  },
  components: {},
  methods: {
    ...mapMutations({
      setCompany: "SET_COMPANY"
    })
  },
  created() {
    companyInfoFn(apiList.GetCorpInfo).then(res => {
      if (res.ResultCode == 200) {
        let dataInfo = res.Data.List[0] ? res.Data.List[0] : [];

        this.logoimg = dataInfo.Logo;

        this.titleval = dataInfo.WebsiteName;

        this.setCompany(dataInfo);
      }
    });
  },
  mounted() {
    var that = this;
    function add0(num) {
      if (num < 10) {
        return "0" + num;
      }
      return num;
    }
    function setCurrentTime(dateTime) {
      var currentDate = new Date(dateTime),
        year = currentDate.getFullYear(),
        month = currentDate.getMonth() + 1,
        monDate = currentDate.getDate(),
        weekDay = currentDate.getDay(),
        hour = currentDate.getHours(),
        min = currentDate.getMinutes(),
        sec = currentDate.getSeconds(),
        weekDayArr = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ];
      that.timeStr =
        year +
        "年" +
        month +
        "月" +
        monDate +
        "日" +
        "      " +
        weekDayArr[weekDay] +
        "        " +
        add0(hour) +
        ":" +
        add0(min) +
        ":" +
        add0(sec);
    }
    function initLoginInfo() {
      var date = new Date(),
        dateTime = date.getTime();

      setCurrentTime(dateTime);

      setInterval(function() {
        dateTime += 1000;
        setCurrentTime(dateTime);
      }, 1000);
    }
    initLoginInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.top {
  width: 1200px;
  @include mag;
  height: 116px;
  @include pr;
  .logoimg {
    @include po;
    @include block;
    height: 64px;
    top: 25px;
    left: 0;
    z-index: 2;
  }
  .righttime {
    @include po;
    z-index: 2;
    @include co(#000);
    @include fo(14px);
    bottom: 45px;
    right: 0;
  }
  .textshow {
    line-height: 116px;
    font-size: 42px;
    font-weight: bolder;
    color: #11512d;
    padding-left: 101px;
  }
}
</style>
