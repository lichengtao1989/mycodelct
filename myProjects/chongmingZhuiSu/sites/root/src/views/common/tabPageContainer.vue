<template>
  <div class="cjm-tab-container">
    <div class="cjm-tab-header">
      <div style="transition: all 0.4s ease-out;"
           :style="{transform: breadcrumbPages.length>1 ? 'translateY(-50%)' : 'translateY(0)'}">
        <!--tab标签-->
        <cjm-tabs @tab-click="changeTab" :active-name="activeName">
          <cjm-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.name" :name="tab.name"
                        :to="tab.path"></cjm-tab-pane>
        </cjm-tabs>
        <!--面包屑-->
        <div class="cjm-breadcrumb" :style="{visibility:breadcrumbPages.length>1 ? 'visible' : 'hidden'}">
          <span v-for="(page,index) in breadcrumbPages">
            <component :is="index===breadcrumbPages.length-1 ? 'span' : 'a'" @click="switchTo(index)">
              {{page.name}}
            </component>
            <span v-if="index!==breadcrumbPages.length-1">&nbsp;&gt;&nbsp;</span>
          </span>
        </div>
      </div>
    </div>
    <router-view class="cjm-tab-content clear"></router-view>
  </div>
</template>

<script>
import { switchTo, getPageCodeList } from 'framework/mixins/pageSwitch';
export default {
  name: 'tabPageContainer',
  methods: {
    changeTab(tab) {
      this.$router.push({ path: tab.$el.getAttribute('to') });
    },
    switchTo(pageIndex) {
      if (pageIndex === this.breadcrumbPages.length - 1) {
        return;
      }
      switchTo(this.$route, this.$router, pageIndex);
    }
  },
  computed: {
    tabs() {
      let route = this.$route;
      if (this.$route.meta.type === 'tab') {
        let path = this.$route.path;
        path = path.substr(0, path.lastIndexOf('/'));
        for (let item of this.$route.matched) {
          if (item.path === path) {
            route = item;
            break;
          }
        }
      }
      let pageTabs = route.meta.tabs || [];
      if (pageTabs.length === 0) {
        // tab页没有子项，其实就是tab页面项的子页面
        pageTabs.push({
          name: route.meta.name,
          path: route.path
        });
      }
      return pageTabs;
    },
    activeName() {
      let activeName;
      for (let tab of this.tabs) {
        if (this.$route.path === tab.path) {
          activeName = tab.name;
          break;
        }
      }
      if (!activeName) {
        activeName = this.tabs[0].name;
        this.$router.replace(this.tabs[0].path);
      }
      return activeName;
    },
    breadcrumbPages() {
      let codes = getPageCodeList(this.$route);
      let result = codes.map(code => {
        return {
          name: this.$route.query['_' + code + '_name']
        };
      });
      result.unshift({ name: this.activeName });
      return result;
    }
  },
  watch: {
    breadcrumbPages(val){
      //console.log(val)
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less'>
@import '../../assets/css/config';

.cjm-tab-container {
  position: relative;
  box-sizing: border-box;
  padding: 0 20px 20px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 2px #ccc;

  .cjm-tab-header {
    border-bottom: 1px solid #d1dbe5;
    height: 40px;
    overflow: hidden;
  }

  .el-tabs__header {
    margin: 0;
    border: 0;
  }
  .el-tabs__nav-wrap {
    margin-bottom: 0;

    &:after {
      display: none;
    }
  }

  .cjm-breadcrumb {
    color: #333;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    width: 100%;
    padding: 0 5px;
    box-sizing: border-box;

    a {
      cursor: pointer;
      color: @primaryColor;
    }

    span {
      cursor: default;
    }
  }

  .cjm-tab-content {
    margin-top: 20px;
    position: relative;
  }
}
</style>
