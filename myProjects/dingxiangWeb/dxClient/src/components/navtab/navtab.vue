<template>
  <div class="navtabout" ref="navpart" :class="fixstyly" :style="{top:topval}">
    <div class="navlist" id="navtoppart">
      <div @click="navchange(index,$event)" class="navitem" :class="{activenav:isActive(item)}" :data-title="item.path" :data-path="item.path" v-for="(item,index) in navList" :key="index">{{item.meta.title}}</div>
    </div>
  </div>
</template>

<script>
import listAryInfo from '@/components/navtab/info.js';
import apiList from '@/api/api';
import navbar from '@/api/navbar';

export default {
  data() {
    return {
      fixstyly: '',
      indexVal: 0,
      navList: listAryInfo,
      topval: '',
      initTop: ''
    };
  },
  computed: {
    indexValGet() {
      var initPath = this.$route.path;
      var indexPath = '';
      listAryInfo.forEach((item, index) => {
        if (initPath == item.path) {
          indexPath = index;
        }
      });
      return indexPath;
    }
  },
  components: {
    // top
  },
  methods: {
    isActive(item) {
      const { path: routePath } = this.$route;
      const { path } = item;
      if (path == routePath) {
        return true;
      }
      //
      if (routePath.indexOf('/article') == 0) {
        const { listtype } = this.$route.query;
        return this.isArticleActive(listtype, path);
      }
      if (routePath.indexOf('/productdetail') == 0) {
        const { listtype } = this.$route.query;
        return this.isArticleActive(listtype, path);
      }
      return false;
    },
    isArticleActive(listtype, path) {
      if (listtype == 1 && path == '/newslist') {
        return true;
      } else if (listtype == 2 && path == '/notice') {
        return true;
      } else if (listtype == 3 && path == '/exchange') {
        return true;
      } else if (listtype == 4 && path == '/regulations') {
        return true;
      } else if (listtype == 5 && path == '/quality') {
        return true;
      } else if (listtype == 6 && path == '/hotfocus') {
        return true;
      } else if (listtype == 7 && path == '/law') {
        return true;
      } else if (listtype == 8 && path == '/certification') {
        return true;
      } else if (listtype == 9 && path == '/warning') {
        return true;
      } else if (listtype == 10 && path == '/charm') {
        return true;
      } else if (listtype == 11 && path == '/standard') {
        return true;
      } else if (listtype == 12 && path == '/shoppingmall') {
        return true;
      }
      return false;
    },

    navchange(index, el) {
      this.indexVal = index;
      var pathVal = el.target.dataset.path;
      this.$emit('navChange', pathVal);
    },
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop - this.initTop > 10) {
        //临界值
        this.fixstyly = 'fixed';
      } else {
        this.fixstyly = '';
      }
    }
  },
  created() {},
  mounted() {
    document.body.scrollTop = 0;

    this.initTop = this.$refs.navpart.getBoundingClientRect().top;

    // window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll); // 离开页面 关闭监听 不然会报错
  }
};
</script>

<style lang="scss" scoped="" type="text/css">
$base: 192;
@import 'static/style/_var.scss';

.navtabout {
  width: 100%;
  height: 60rem / $base;
  @include ba(#56bc4a);
}
.fixed {
  position: fixed;
  // position: absolute;

  top: 0;
  left: 0;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -ms-transform: translateZ(0);
  -moz-transform: translateZ(0);

  z-index: 13;
}
.navlist {
  width: 1320rem / $base;
  @include ov;
  @include mag;
  .navitem {
    padding-left: 19rem / $base;
    padding-right: 19rem / $base;
    @include float;
    @include li(60rem / $base);
    @include te;
    @include co(#fff);
    @include fo(18rem / $base);
    cursor: pointer;
  }
  .activenav {
    @include ba(#45963b);
  }
}
@media (max-width: 1200px) {
  .navlist {
    .navitem {
      padding-left: 15rem / $base;
      padding-right: 15rem / $base;
    }
  }
}
@media (max-width: 1100px) {
  .navlist {
    .navitem {
      padding-left: 12rem / $base;
      padding-right: 12rem / $base;
    }
  }
}
@media (max-width: 1000px) {
  .navlist {
    .navitem {
      padding-left: 5rem / $base;
      padding-right: 5rem / $base;
    }
  }
}
</style>
