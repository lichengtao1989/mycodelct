<template>
  <div class="companycard">
    <imagesview v-if="viewflag" :imagessrc="imagessrc" @closeFn="closeFn"></imagesview>
    <div class="ccard" v-for="(item,index) in listInfoAry" v-if="type==1">
      <scrollbar>
        <div style="padding-top: 28px">
          <div class="qumc m21" v-if="item.OrgName">
            <div class="ll">企业名称</div>
            <div class="rr ">{{item.OrgName}}</div>
          </div>
          <div class="fzr m21" v-if="item.Manager">
            <div class="ll">负责人</div>
            <div class="rr">{{item.Manager}}</div>
          </div>
          <div class="lxfs m21" v-if="item.ManagerPhone">
            <div class="ll">联系方式</div>
            <div class="rr">{{item.ManagerPhone}}</div>
          </div>
          <div class="zycp m21" v-if="item.ProductName[0]">
            <div class="ll">主要产品</div>
            <div class="rr">
              <div class="cplist ovt" v-for="(item,index) in item.ProductName" :key="item">{{item}}</div>
            </div>
          </div>
        </div>
      </scrollbar>
    </div>
    <div class="ccard" v-for="(item,index) in listInfoAry" v-if="type==2">
      <scrollbar>
        <div style="padding-top: 28px">
          <div class="qumc m21" v-if="item.corpName">
            <div class="ll">企业名称</div>
            <div class="rr ">{{item.corpName}}</div>
          </div>
          <div class="fzr m21" v-if="item.principal">
            <div class="ll">负责人</div>
            <div class="rr">{{item.principal}}</div>
          </div>
          <div class="lxfs m21" v-if="item.phone">
            <div class="ll">联系方式</div>
            <div class="rr">{{item.phone}}</div>
          </div>
          <div class="zycp m21" v-if="item.productName.length>0">
            <div class="ll">主要产品</div>
            <div class="rr">
              <div class="cplist ovt" v-for="(item,index) in item.productName" :key="item">{{item}}</div>
            </div>
          </div>
        </div>
      </scrollbar>
    </div>
    <div class="ccard cardhhb" v-for="(item,index) in listInfoAry" v-if="type==3">
      <scrollbar>
        <div style="padding-top: 28px">
          <div class="qumc m21" v-if="item.Name">
            <div class="ll">名称</div>
            <div class="rr ">{{item.Name}}</div>
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
            <div class="rr " v-html="item.Content"></div>
          </div>
          <div class="lxfs m21" v-if="item.ExpiryDate">
            <div class="ll">整改完成时间</div>
            <div class="rr">{{item.ExpiryDate}}</div>
          </div>
          <div class="zycp m21" v-if="item.Img[0]">
            <div class="ll">图片佐证资料</div>
            <div class="rr">
              <img @click="viewimg(item)" :src="imgFn(item)" class="imghh" v-for="(item,index) in item.Img">
            </div>
          </div>
        </div>
      </scrollbar>
    </div>
  </div>

</template>

<script>
import imagesview from "./imagesview";
import scrollbar from "./scrollbar.vue";
export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    listInfoAry: {
      //信息
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      // viewflag: false,
      viewflag: false,
      imagessrc: "",
      morePath: "",
      myindex: 0
    };
  },
  computed: {},
  components: { imagesview, scrollbar },
  methods: {
    imgFn(img) {
      // console.log(img.replace(/\"/g, ""))
      return img.replace(/\"/g, "");
    },
    viewimg(img) {
      this.viewflag = true;
      this.imagessrc = img;
      console.log(img);
    },
    closeFn() {
      this.viewflag = false;
    }
  },
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped="" rel="stylesheet/scss">
@import "static/style/_var.scss";
.companycard {
  @include pr;
  @include ov;
}
.rr {
  width: 140px;
  word-wrap:break-word; word-break:break-all;
}

.bangbie1 {
  color: red;
}

.ccard {
  @include wh(275px, 250px);
  /*padding-top: 28px;*/
  border-top: 4px solid #88c79f;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  // overflow-x: hidden;
  // overflow-y: scroll;
  @include ov;
  @include ba(#eef7f1);
  margin-right: 19px;
  margin-bottom: 26px;
  @include float;
  @include fo(13px);
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
  // .pp30 {
  //   padding-right: 30px;
  // width:135px;
  // height: auto;
  // }
  .ll {
    width: 84px;
    text-align: right;
    @include fo(13px);
    @include co(#666);
    margin-right: 22px;
  }
}

.honghei {
  .ccard {
    //  scrollbar-arrow-color: rgba(29, 168, 91, 0.4); /**//*三角箭头的颜色*/
    //   scrollbar-face-color:rgba(29, 168, 91, 0.4); /**//*立体滚动条的颜色*/
    //   scrollbar-3dlight-color: rgba(29, 168, 91, 0.4); /**//*立体滚动条亮边的颜色*/
    //   scrollbar-highlight-color: rgba(29, 168, 91, 0.4); /**//*滚动条空白部分的颜色*/
    //   scrollbar-shadow-color: rgba(29, 168, 91, 0.4); /**//*立体滚动条阴影的颜色*/
    //   scrollbar-darkshadow-color: rgba(29, 168, 91, 0.4); /**//*立体滚动条强阴影的颜色*/
    // scrollbar-track-color:rgba(29, 168, 91, 0.4); /**//*立体滚动条背景颜色*/
    // scrollbar-base-color:rgba(29, 168, 91, 0.4); /**//*滚动条的基本颜色*/
    height: 280px;
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
      width: 110px;
      margin-right: 13px;
    }
  }
  .imghh {
    cursor: pointer;
  }
}

.cplist {
  padding-bottom: 10px;
  @include bs;
  padding-right: 20px;
}

.imghh {
  @include inline-block;
  @include wh(30px, 30px);
  margin-right: 5px;
  margin-bottom: 5px;
}

.cardhhb {
  @include bs;
}
</style>
