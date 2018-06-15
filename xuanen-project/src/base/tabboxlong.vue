<template>
  <div class="tabbox" >
    <div class="djgd" @click="jumpMore">更多<span>>></span></div>
    <div class="top">
      <div :class="{tabactive:index==myindex}" @click="changeFn(index,item.id)" class="tabclick" :data-path="item.path" :data-listtype="item.id" v-for="(item,index) in textAry">{{item.text}}</div>

    </div>
    <div class="listshow">

      <div class="listitem" v-for="(item,index) in listInfoAry" v-if="typeid==1&&listInfoAry.length>0" :data-tid="typeid">
        <!-- //可追溯企业 -->
        <div class="boxtext" :class="['bbpo'+index,isShowBottom(item)?'show-bottom':'']">
          <div class="qumc m21" v-if="item.OrgName">
            <div class="ll">企业名称</div>
            <div class="rr">{{item.OrgName}}</div>
          </div>
          <div class="fzr m21" v-if="item.Manager">
            <div class="ll">负责人</div>
            <div class="rr">{{item.Manager}}</div>
          </div>
          <div class="lxfs m21" v-if="item.ManagerPhone">
            <div class="ll">联系方式</div>
            <div class="rr">{{item.ManagerPhone}}</div>
          </div>
          <div class="zycp m21" v-if="item.ProductName && item.ProductName[0]">
            <div class="ll">主要产品</div>
            <div class="rr">
              <div class="cplist" v-for="(item,index) in item.ProductName" :key="index">{{item}}</div>

            </div>
          </div>
        </div>
        <div class="info" @click="jumpMore">{{item.OrgName}}</div>
        <div class="time">{{operateFn(item.CreateTime)}}</div>
      </div>
      <div class="listitem" v-for="(item,index) in listInfoAry" v-if="typeid==2" :data-tid="typeid">
        <!-- //不可追溯企业 -->
        <div class="boxtext" :class="['bbpo'+index,isShowBottom(item)?'show-bottom':'']">
          <div class="qumc m21" v-if="item.corpName">
            <div class="ll">企业名称</div>
            <div class="rr">{{item.corpName}}</div>
          </div>
          <div class="fzr m21" v-if="item.principal">
            <div class="ll">负责人</div>
            <div class="rr">{{item.principal}}</div>
          </div>
          <div class="lxfs m21" v-if="item.phone">
            <div class="ll">联系方式</div>
            <div class="rr">{{item.phone}}</div>
          </div>
          <div class="zycp m21" v-if="item.ProductName">
            <div class="ll">主要产品</div>
            <div class="rr">
              <div class="cplist" v-for="(item,index) in item.productName" :key="item">{{item}}</div>
            </div>
          </div>
        </div>
        <div class="info" @click="jumpMore">{{item.corpName}}</div>
        <div class="time">{{operateFn(item.createTime)}}</div>
      </div>
      <div class="listitem listitemhhb" v-for="(item,index) in listInfoAry" v-if="typeid==3" :data-tid="typeid">
        <!-- //红黑榜 -->
        <div class="ccard cardhhb " :class="['cardhhb'+index,isHHBShowBottom(item)?'show-bottom':'']">
          <div class="qumc m21" v-if="item.Name">
            <div class="ll">名称</div>
            <div class="rr ovt">{{item.Name}}</div>
          </div>
          <div class="qumc m21" :class="'bangbie'+item.Type" v-if="item.Type">
            <div class="ll">榜别</div>
            <div class="rr">{{item.Type == 1 ? "红榜" : "黑榜"}}</div>
          </div>
          <div class="fzr m21" v-if="item.ContractBy">
            <div class="ll">责任人</div>
            <div class="rr">{{item.ContractBy}}</div>
          </div>
          <div class="lxfs m21" v-if="item.CreateTime">
            <div class="ll">上榜时间</div>
            <div class="rr">{{item.CreateTime}}</div>
          </div>
          <div class="lxfs m21" v-if="item.Content">
            <div class="ll">上榜原因</div>
            <div class="rr ovt" v-html="item.Content"></div>
          </div>
          <div class="lxfs m21" v-if="item.ExpiryDate">
            <div class="ll">整改完成时间</div>
            <div class="rr">{{item.ExpiryDate}}</div>
          </div>
          <div class="zycp m21" v-if="imgFn(item.Img)">
            <div class="ll">图片佐证资料</div>
            <div class="rr rrhhh">

              <img @click="viewimg(item)" :src="imageSrcClear(item)" class="imghh" v-for="(item,index) in item.Img">


            </div>
          </div>
        </div>
        <div class="bangbie" :class="'bangbie'+item.Type">{{item.Type == 1 ? "红榜" : "黑榜"}}</div>
        <div class="info" @click="jumpMore">{{item.Name ? item.Name : "超级码"}}</div>
        <div class="time">{{operateFn(item.CreateTime)}}</div>
      </div>
      <div class="listitem" v-for="(item,index) in listInfoAry" v-if="typeid==4" :data-tid="typeid">
        <!-- //工作交流 -->
        <div class="info" @click="jumpMore">{{item.ArticleTitle}}</div>
        <div class="time">{{operateFn(item.CreateTime)}}</div>
      </div>
      <div class="listitem" v-for="(item,index) in listInfoAry" v-if="typeid==5" :data-tid="typeid">
        <!-- //政策法规 -->
        <div class="info" @click="jumpMore">{{item.ArticleTitle}}</div>
        <div class="time">{{operateFn(item.CreateTime)}}</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      typeid: {
        type: Number,
        default: ""
      },
      listInfoAry: {
        //列表信息
        type: Array,
        default: function () {
          return [];
        }
      },
      textAry: {
        //tab点击显示文案
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data() {
      return {
        morePath: "",
        myindex: 0,
        listtypeVal: 1,
        offsetTop: 0,
        scrollTop: 0
      };
    },
    computed: {},
    components: {},
    methods: {
      imageSrcClear(src){
        return src.replace(/^\"/,'').replace(/\"$/,'');
      },
      imgFn(img = []) {
        if (img.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      isShowBottom(item) {
        const index = this.listInfoAry.indexOf(item);
        const lineIndex = Math.ceil((index + 1) / 2);
        if (this.offsetTop + lineIndex * 32 - this.scrollTop < 165) {
          return true;
        }
        return false;
      },
      isHHBShowBottom(item){
        const index = this.listInfoAry.indexOf(item);
        const lineIndex = Math.ceil((index + 1) / 2);
        if (this.offsetTop + lineIndex * 32 - this.scrollTop < 285) {
          return true;
        }
        return false;
      },
      onScrollResize() {
        let offsetTop = 0;
        let dom = this.$el;
        // console.log(dom);
        const body = document.body;
        while (dom !== body) {
          offsetTop += dom.offsetTop;
          dom = dom.offsetParent;
        }
        this.offsetTop = offsetTop;
        this.scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
      },
      bindScrollResize() {
        window.addEventListener("scroll", this.onScrollResize);
        window.addEventListener("resize", this.onScrollResize);
        this.onScrollResize();
      },
      unBindScrollResize() {
        window.removeEventListener("scroll", this.onScrollResize);
        window.removeEventListener("resize", this.onScrollResize);
      },
      operateFn(str) {
        let strval = str;
        if (str) {
          if (typeof str == "string") {
            strval = str.split(" ")[0];
            strval = strval.replace(/\//g, "-");
          }
        }
        return strval;
      },
      jumpMore() {
        let pathVal = "";
        console.log(this.listtypeVal);
        if (this.listtypeVal == 1) {
          pathVal = "traceability";
        } else if (this.listtypeVal == 2) {
          pathVal = "untraceability";
        } else if (this.listtypeVal == 3) {
          pathVal = "redandblack";
        } else if (this.listtypeVal == 4) {
          pathVal = "exchange";
        } else if (this.listtypeVal == 5) {
          pathVal = "regulations";
        }
        this.$router.push({
          path: pathVal
        });
      },
      changeFn(idx, listtype) {
        this.myindex = idx;
        this.listtypeVal = listtype; //id

        this.$emit("changeTabFn", listtype);
      },
      jumpFn(id) {
        this.$router.push({
          path: `/newsdetail/${id}/?listtype=${this.listtypeVal}`
        });
      }
    },
    created() {
    },
    mounted() {
      this.bindScrollResize();
    },
    beforeDestroy() {
      this.unBindScrollResize();
    }
  };
</script>


<style lang="scss" scoped="" rel="stylesheet/scss">
  @import "static/style/_var.scss";

  .bangbie {
    @include po;
    bottom: 0;
    right: 35%;
  }

  .bangbie1 {
    .ll {
      @include co(#fff);
    }
    color: red;
  }

  .listitem {
    padding-top: 16.5px;
    padding-left: 18px;
    width: 578px;
    @include inline-block;
    @include pr;
    cursor: pointer;
    @include fo(13px);
    .time {
      @include po;
      bottom: 0;
      right: 20px;
    }
  }

  .info {
    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
  }

  .tabbox {
    @include ba(#fff);
    height: 255px;
    // border-bottom: 1px solid #128f40;
    @include pr;
    // @include ov;
    .djgd {
      cursor: pointer;
      @include po;
      @include fo(13px);
      @include co(#128f40);
      right: 13px;
      top: 13px;
      font-weight: bold;
      span {
        vertical-align: 1px;
        margin-left: 1px;
      }
    }
    .top {
      border-top: 2px solid #128f40;
      border-bottom: 1px solid #128f40;
      @include fo(16px);
      @include co(#128f40);
      @include ov;
      .tabclick {
        cursor: pointer;
        @include float;
        @include li(39px);
        @include te;
        padding-left: 15px;
        padding-right: 15px;
      }
      .tabactive {
        @include ba(#128f40);
        @include co(#fff);
      }
    }
  }

  .listitemhhb:hover {
    .ccard {
      display: block;
    }
  }

  .ccard {
    @include none;
    // @include wh(275px, 330px);
    width: 275px;
    min-width: 300px;
    padding-top: 28px;

    border-radius: 5px;
    -webkit-border-radius: 5px;

    @include ov;
    color: #fff;
    @include baimg("../../static/images/box01.png");
    margin-right: 19px;
    margin-bottom: 26px;

    @include fo(14px);
    .m21 {
      margin-bottom: 21px;
      @include ov;
    }
    .ll,
    .rr {
      @include float;
    }
    .reason,
    .ovt {
      height: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ll {
      width: 84px;
      text-align: right;
      @include fo(14px);

      margin-right: 22px;
    }
    .rr {
      width: 165px;
      height: 16px;
    }
      .rrhhh{height: auto;}
  }

  .honghei {
    .ccard {
      height: 280px;
      overflow-y: auto;
      overflow-x: hidden;
      .m21 {
        @include pr;
        .rr {
          width: 135px;
          // @include po;
          // top: 0;
          // left: 115px;
        }
      }
      .ll {
        width: 90px;
        margin-right: 13px;
      }
    }
    .imghh {
      cursor: pointer;
    }
  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(29, 168, 91, 0.4);
  }

  .cplist {
    padding-bottom: 10px;
  }

  .imghh {
    @include inline-block;
    @include wh(22px, 22px);
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .boxtext {
    @include none;
    @include po;
    left: -291px;
    top: -163px;
    @include co(#fff);

    @include baimg("../../static/images/box01.png");
    // @include wh(311px,183px);
    width: 311px;
    padding-top: 19px;
    @include bs;
    height: 183px;
    @include ov;
    z-index: 4;
    @include fo(14px);
    .m21 {
      margin-bottom: 15px;
      .ll,
      .rr {
        display: inline-block;
      }
      .ll {
        width: 93px;
        text-align: right;
        padding-right: 23px;
      }
      .rr {
        height: 14px;
        width: 170px;
        white-space: nowrap;

        overflow: hidden;

        text-overflow: ellipsis;
      }
    
      .zycp {
        .rr {
          height: 50px;
          .cplist {
            padding-bottom: 5px;
            height: 14px;
            width: 170px;
            white-space: nowrap;

            overflow: hidden;

            text-overflow: ellipsis;
          }
        }
      }
    }
    //
    &.show-bottom {
      top: 30px;
      @include baimg("../../static/images/box01-180.png");
    }
  }


  .listitemhhb {
    .cardhhb {
      @include po;
      bottom: 0;
      left: -273px;
      z-index: 4;
      @include bs;
      padding-bottom:15px;
      &.show-bottom {
        top: 30px;
        bottom: auto;
        @include baimg("../../static/images/box01-180.png");
      }
      .ll{
           width: 113px;
        text-align: right;
        padding-right: 13px;
      }
      .rr{
        width:115px;
      }
    }
    .info {
      width: 320px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .info {
    // height: 16px;
    width: 440px;
  }

  @media screen and (max-width: 1785px) {
    .listitem:nth-of-type(2n + 1) {
      .boxtext {
        left: 0;
        @include baimg("../../static/images/box02.png");
        &.show-bottom {
          top: 30px;
          @include baimg("../../static/images/box02-180.png");
        }
      }
      .cardhhb {
        left: 0;
        @include baimg("../../static/images/box02.png");
        &.show-bottom {
          top: 30px;
          bottom: auto;
          @include baimg("../../static/images/box02-180.png");
        }
      }
    }
  }

  .listitem:hover {
    .boxtext {
      @include block;
    }
  }
</style>
