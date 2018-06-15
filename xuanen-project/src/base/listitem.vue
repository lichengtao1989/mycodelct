<template>
  <div class="listitem" :data-id="iteminfo.ArticleID" @click="jumpDetail(iteminfo.ArticleID)">
    <div class="leftk"></div>
    <div class="midt">{{iteminfo.ArticleTitle}}</div>
    <div class="righttime">{{iteminfo.CreateTime}}</div>
 </div>

</template>

<script>


export default {
  props:{
    iteminfo:{//信息
      type:Object,
      default: function () {
        return []
    }
    },
    listtype:{
      type:Number,
      default:""
    }
  },
  data() {
    return {
     num:1000
    };
  },
  computed: {

  },
  components: {
    // top
  },
  methods: {
  jumpDetail(id){
    // console.log(id);
    this.$router.push({
        path: `/article/${id}/?listtype=${this.listtype}`
      });
  }
  },
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.listitem{
  cursor: pointer;
  width:1132px;
  @include li(44px);
  @include pr;
  @include ov;
  padding-left:28px;
  border-bottom:1px dashed #e3e3e3;
  .leftk{
    @include wh(8px,8px);
    @include po;
    @include ba(#128f40);
    left:0;
    bottom:18px;
    z-index:2;

  }
  .righttime{
    @include po;
    right:26px;
    bottom:0px;

  }
}

</style>
