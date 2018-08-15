<template>
  <div>
    <div class="cjm-menu" :class="{'cjm-menu-rightMenuVisible':rightMenuVisible}">
      <div class="cjm-menu-left">
        <cjm-scrollbar>
          <div class="cjm-menu-item">
            <div class="cjm-menu-item-head" @click="indexMenuClick">
              <i class="cjm-menu-item-head-icon cjm-icon-home"></i>首页
            </div>
          </div>
          <leftMenu-item v-for="menuItem in menuData" :key="menuItem.name" :menuItem="menuItem"></leftMenu-item>
        </cjm-scrollbar>
      </div>
      <transition name="cjm-menu-right">
        <div class="cjm-menu-right" ref="menuRight" v-show="rightMenuVisible">
          <ul @click="menu3Click">
            <li v-for="menu3 in level3Menus" :class="{'active':activeMenu3===menu3}">
              <span :title="menu3.name" :data-menuname="menu3.name">{{menu3.name}}</span>
              <i class="cjm-icon-new-window" @click="openNewWindow($event, menu3)"></i>
            </li>
          </ul>
          <div class="cjm-menu-right-collapse-wrap" @click="menuCollapse">
            <div class="cjm-menu-right-collapse cjm-icon-chevron-down cjm-icon-rotate-90"></div>
          </div>
        </div>
      </transition>
    </div>
    <div class="cjm-menu-right-collapse-wrap cjm-menu-right-collapse-wrap2" v-show="menuCollapseVisible" @click="menuCollapse">
      <div class="cjm-menu-right-collapse cjm-icon-chevron-down cjm-icon-rotate-n90"></div>
    </div>
  </div>
</template>

<script>
import LeftMenuItem from './menu-item.vue';
export default {
  data: function() {
    return {
      menuData: this.$store.state.menu.menuData
    };
  },
  components: {
    LeftMenuItem
  },
  computed: {
    activeMenu1() {
      return this.$store.state.menu.activeMenu1;
    },
    activeMenu2() {
      return this.$store.state.menu.activeMenu2;
    },
    activeMenu3() {
      return this.$store.state.menu.activeMenu3;
    },
    level3Menus() {
      return this.activeMenu2 ? this.activeMenu2.childList : [];
    },
    rightMenuVisible() {
      return this.$store.state.menu.rightMenuVisible;
    },
    menuCollapseVisible() {
      return !this.rightMenuVisible && this.activeMenu2 && this.activeMenu2.menuType != this.$globalData.get('root', 'enums').menuType.FUNCTION;
    }
  },
  methods: {
    //首页点击
    indexMenuClick() {
      this.$store.commit('menu_setActiveMenu1', { menu: null });
      this.$store.commit('menu_setActiveMenu2', { menu: null });
      this.$store.commit('menu_setActiveMenu3', { menu: null });
      this.$router.push('/');
    },
    //三级菜单点击
    menu3Click(event) {
      const menuName = event.target.attributes['data-menuname'];
      if (menuName) {
        const menu3 = this.level3Menus.find(item => {
          return item.name === menuName.value;
        });
        this.$store.commit('menu_setActiveMenu3', { menu: menu3 });
      }
    },
    getMenu(menuName, level) {
      let data;
      if (level === 1) {
        data = this.menuData;
      } else if (level === 2) {
        data = this.activeMenu1.childList;
      } else if (level === 3) {
        data = this.activeMenu2.childList;
      }
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].nameSpell === menuName) {
          return data[i];
        }
      }
    },
    menuCollapse() {
      this.$store.commit('menu_setRightMenuVisible', !this.rightMenuVisible);
    },
    openNewWindow(event, menu) {
      event.stopPropagation();
      window.open('#' + menu.routePath);
    },
    //根据路由设置菜单
    setActiveMenuByRoute() {
      let routePath = this.$route.path;
      let pathItems = routePath.split('/').filter(item => {
        return item != '';
      });
      if (!pathItems[0]) {
        this.$store.commit('menu_setActiveMenu1', { menu: null, routeChange: false });
      } else {
        this.$store.commit('menu_setActiveMenu1', { menu: this.getMenu(pathItems[0], 1), routeChange: false });
      }
      if (!pathItems[1]) {
        this.$store.commit('menu_setActiveMenu2', { menu: null, routeChange: false });
      } else {
        this.$store.commit('menu_setActiveMenu2', { menu: this.getMenu(pathItems[1], 2), routeChange: false });
      }
      if (!pathItems[2]) {
        this.$store.commit('menu_setActiveMenu3', { menu: null, routeChange: false });
      } else {
        this.$store.commit('menu_setActiveMenu3', { menu: this.getMenu(pathItems[2], 3), routeChange: false });
      }
    }
  },
  watch: {
    $route: function() {
      this.setActiveMenuByRoute();
    }
  },
  created() {
    this.setActiveMenuByRoute();
  }
};
</script>

<style lang='less' rel='stylesheet/less'>
@import '../../assets/css/config';

@leftMenuWidth: 170px;
@rightMenuWidth: 160px;
@headerHeight: 50px;

.cjm-menu {
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  width: @leftMenuWidth;
  font-size: 14px;
  z-index: 2;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
}

.cjm-menu.cjm-menu-rightMenuVisible {
  width: @leftMenuWidth + @rightMenuWidth;
}

.cjm-menu-left {
  float: left;
  height: 100%;
  width: @leftMenuWidth;
  position: relative;
  overflow: hidden;
  z-index: 3;
}

.cjm-menu-right {
  float: left;
  height: 100%;
  width: @rightMenuWidth;
  position: relative;
  padding-top: 41px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2;

  li {
    position: relative;
    height: 35px;
    line-height: 35px;
    cursor: default;
    font-size: 13px;
    text-align: right;
    user-select: none;

    & > span {
      padding: 0 30px;
      border-radius: 3px 0 0 3px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      max-width: 152px;
      box-sizing: border-box;
    }

    & > .cjm-icon-new-window {
      display: none;
      color: #4d4d4d;
      position: absolute;
      right: 8px;
      top: 8px;
      font-size: 16px;
      cursor: pointer;
    }
  }

  li.active {
    & > span {
      background: #fff;
      box-shadow: 0 0 2px #ccc;
    }
  }

  li:hover {
    font-weight: bold;

    .cjm-icon-new-window {
      display: inline-block;
    }
  }
}

.cjm-menu-right-collapse-wrap {
  position: absolute;
  width: 0;
  height: 34px;
  left: @rightMenuWidth - 12px;
  top: 48%;
  border-bottom: 10px solid transparent;
  border-left: none;
  border-right: 12px solid #fff;
  border-top: 10px solid transparent;
  margin-top: -17px;
  cursor: pointer;

  .cjm-menu-right-collapse {
    position: absolute;
    width: 12px;
    line-height: 34px;
    right: -14px;
    top: 0;
    bottom: 0;
  }
  .cjm-icon-chevron-down {
    color: #666;
  }
}

.cjm-menu-right-collapse-wrap2 {
  left: @leftMenuWidth;
  margin-top: (@headerHeight - 34px)/2;
  z-index: 10;
  border-right: 0;
  border-left: 12px solid @ExtraLightSilver;

  .cjm-menu-right-collapse {
    right: 2px;
  }
  .cjm-icon-chevron-down {
    color: #666;
  }
}

.cjm-menu-right-enter,
.cjm-menu-right-leave {
  margin-left: -@rightMenuWidth;
}

.cjm-menu-right-enter-active,
.cjm-menu-right-leave-active {
  transition: margin-left 0.2s ease;
}
</style>
