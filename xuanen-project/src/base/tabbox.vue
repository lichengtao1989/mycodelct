<template>
  <div class="tabbox" v-bind:style="{ width: widthval+ 'px' , height: heightval + 'px' }">
 <div class="djgd" @click="jumpMore">更多<span>>></span></div>
 <div class="top" >
    <div @click="changeFn(index,item.listtype)" v-bind:style="{ width: tabwidth+ 'px' }" :class="{tabactive:index==myindex}" class="tabclick" :data-path="item.path" :data-listtype="item.listtype" v-for="(item,index) in textAry">{{item.text}}</div>

  </div>
  <div class="listshow">

    <div @click="jumpFn(item.ArticleID)" :data-id="item.ArticleID" v-bind:style="{ width: linewidth+ 'px' }" class="listitem" v-for="(item,index) in listInfoAry">
      <div class="boxtext"></div>
      <div class="info" v-bind:style="{ width: ovwidthval+ 'px' }">{{item.ArticleTitle}}</div>
      <div class="time" v-bind:style="{ right: rightval+ 'px' }">{{item.CreateTime}}</div>
    </div>

  </div>
 </div>

</template>

<script>
export default {
  props: {
    hoverinfo: {
      //上移是否显示文字
      type: String,
      default: ""
    },
    linewidth: {
      //一条新闻的宽度
      type: Number,
      default: ""
    },
    tabwidth: {
      type: Number,
      default: ""
    },
    showLength: {
      //默认最多显示的条数
      type: String,
      default: "6"
    },
    heightval: {
      //设置高度
      type: Number,
      default: ""
    },
    widthval: {
      //设置宽度的
      type: Number,
      default: ""
    },
    ovwidthval: {
      //溢出显示点点点的宽度
      type: Number,
      default: ""
    },
    padleftval: {
      //设置padding-left的
      type: Number,
      default: ""
    },
    rightval: {
      //设置padding-left的
      type: Number,
      default: ""
    },
    typeVal: {
      //是否特殊显示,显示红榜黑榜
      type: String,
      default: ""
    },
    listInfoAry: {
      //列表信息
      type: Array,
      default: function() {
        return [];
      }
    },
    textAry: {
      //tab点击显示文案
      type: Array,
      default: []
    }
  },
  data() {
    return {
      morePath: "",
      myindex: 0,
      listtypeVal: 1
    };
  },
  computed: {},
  components: {
  },
  methods: {
    jumpMore() {
      let pathVal = "";
      if (this.listtypeVal == 1) {
        pathVal = "newslist";
      } else {
        pathVal = "notice";
      }
      this.$router.push({
        path: pathVal
      });
    },
    changeFn(idx, listtype) {
      this.myindex = idx;
      this.listtypeVal = listtype;
      this.$emit("changeTabFn", listtype);
    },
    jumpFn(id) {
      this.$router.push({
        path: `/article/${id}/?listtype=${this.listtypeVal}`
      });
    }
  },
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.listshow {
  padding-left: 18px;
  @include fo(13px);
}
.listitem {
  padding-top: 19px;
  @include pr;
  cursor: pointer;
  .time {
    @include po;
    bottom: 0;
  }
}
.info {
  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}
.tabbox {
  @include ba(#fff);

  @include pr;
  @include ov;
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
    }
    .tabactive {
      @include ba(#128f40);
      @include co(#fff);
    }
  }
}
</style>
