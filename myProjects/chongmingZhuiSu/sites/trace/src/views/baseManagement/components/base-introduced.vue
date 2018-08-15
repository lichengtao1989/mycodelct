<template>
  <div class="clear commonbom" v-if="currentPageInfo.pageType!= 'view' ">
    <cjm-editor v-model="form.baseIntroduce" v-if="currentPageInfo.pageType!= 'view'" :height="300"></cjm-editor>
  </div>
  <div class="clear commonbom" v-else>
    <div class="base-introduction" v-html="form.baseIntroduce"></div>
  </div>
</template>
<script>
import CjmEditor from 'framework/components/base/editor';
export default {
  components: {
    CjmEditor
  },
  data() {
    return {
      enums: this.$globalData.get('trace', 'enums'),
      apiUrl: this.$globalData.get('trace', 'apiUrl')
    };
  },
  props: {
    form: {
      type: Object
    },
    rules: {
      type: Object
    },
    currentPageInfo: {
      type: Object
    }
  },

  watch: {},
  computed: {},
  methods: {},
  created() {}
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.commonbom {
  margin-bottom: 20px;
}
.view-common-css {
  margin-bottom: 0px;
}
.img-info {
  width: 255px;
  float: left;
}
.base-info {
  float: left;
  width: 450px;
}
.base-list {
  width: 255px;
  float: left;
}
.base-big {
  width: 255px;
}
.prev {
  float: left;
  font-size: 20px;
  line-height: 80px;
  color: #475669;
  cursor: pointer;
}
.next {
  float: right;
  font-size: 20px;
  line-height: 80px;
  color: #475669;
  cursor: pointer;
}
.base-small {
  width: 215px;
  overflow: hidden;
  height: 80px;
  white-space: nowrap;
  display: inline-block;
  li {
    width: 66px;
    height: 80px;
    margin-right: 6px;
    display: inline-block;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
.base-small-div {
  display: inline-block;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style  rel='stylesheet/less'  lang='less' >
.base-introduction {
  padding-left: 26px;
  color: #606266;
  word-break: break-all;
  display: inline-block;
  width: 100%;
  img {
    max-width: 100%;
  }
}
</style>
