<template>
  <div class="listitem" :data-id="iteminfo.ArticleID" @click="jumpDetail">
    <div class="leftk"></div>
    <div class="midt">{{iteminfo.ArticleTitle||iteminfo.Title}}</div>
    <div class="downloadflag" v-if="downloadFlag" @click="downloadFn(iteminfo.Path,iteminfo.FileName)"></div>
    <div class="righttime">{{iteminfo.CreateTime}}</div>
  </div>

</template>

<script>
export default {
  props: {
    iteminfo: {
      //信息
      type: Object,
      default: function() {
        return [];
      }
    },
    listtype: {
      type: Number,
      default: ''
    }
  },
  data() {
    return {
      downloadFlag: false,
      num: 1000
    };
  },
  computed: {},
  components: {
    // top
  },
  methods: {
    downloadFn(url, flie) {
      // window.open(url);
      // let aTag = document.createElement('a');

      // let blob = new Blob([url]); // 这个content是下载的文件内容，自己修改
      // console.log(blob);
      // aTag.download = flie; // 下载的文件名
      // aTag.href = URL.createObjectURL(blob);
      // aTag.click();
      // URL.revokeObjectURL(blob);
      // let { err, res } = this.$ajax.get('/File/Download', { url: url, FileName: flie });
      // console.log(err, res);
      window.location.href = `/File/Download?url=${url}&FileName=${flie}`;
    },
    jumpDetail() {
      if (this.$route.path == '/download') {
      } else {
        if (!this.iteminfo.Islink) {
          let id = '';
          if (this.iteminfo.NewID) {
            id = this.iteminfo.NewID;
          } else {
            id = this.iteminfo.ArticleID;
          }
          this.$router.push({
            path: `/article/${id}/?listtype=${this.listtype}`
          });
        } else {
          window.open(this.iteminfo.ArticleContent);
        }
      }
    }
  },
  created() {},
  mounted() {
    if (this.$route.path == '/download') {
      this.downloadFlag = true;
    }
  }
};
</script>


<style lang="scss" scoped="" type="text/css">
$base: 192;
@import 'static/style/_var.scss';
.downloadflag {
  @include baimg('../../static/images/xz.png');
  @include po;
  top: 6rem/$base;
  right: 14%;
  z-index: 2;
  @include wh(30rem/$base, 30rem/$base);
}
.midt {
  width: 85%;
  @include ovt;
}
.listitem {
  cursor: pointer;
  width: 100%;
  @include bs;
  @include li(44rem/$base);
  @include pr;
  @include ov;
  padding-left: 28rem/$base;
  border-bottom: 1rem/$base dashed #e3e3e3;
  .leftk {
    @include wh(8rem/$base, 8rem/$base);
    @include po;
    @include ba(#128f40);
    left: 0;
    bottom: 18rem/$base;
    z-index: 2;
  }
  .righttime {
    @include po;
    right: 26rem/$base;
    bottom: 0rem/$base;
  }
}
</style>
<style>
.bPageInfo[data-v-0b865a68] {
  display: none !important;
}
.vPaginationList[data-v-0b865a68] {
  display: none !important;
}
div.vPagination > ul > li.disabled > a[data-v-0b865a68] {
  color: #128f40 !important;
  cursor: default;
}
div.vPagination > ul > li.disabled > a[data-v-0b865a68] {
  color: #128f40 !important;
  cursor: default;
}
div.vPagination > ul > li > a[data-v-0b865a68] {
  color: #128f40 !important;
  cursor: pointer;
}
div.vPagination > ul > li.active > a[data-v-0b865a68],
div.vPagination > ul > li.active > span[data-v-0b865a68] {
  color: #fff !important;
  background: #128f40 !important;
}
</style>
