<template>
  <div class="cjm-menu-item">
    <div class="cjm-menu-item-head"
         :class="{'active':isActive,'functionMenu':isFunctionMenu}"
         @click="itemActive()">
      <i class="cjm-icon-caret-down cjm-menu-item-head-icon"
         :class="{'cjm-icon-rotate-n90':!isActive}"></i>{{menuItem.name}}
      <i class="cjm-menu-item-active-icon"></i>
    </div>
    <el-collapse-transition>
      <ul class="cjm-menu-item-body"
          v-if="!isFunctionMenu"
          v-show="isActive"
          @click="subItemActive">
        <li v-for="subItem in menuItem.childList"
            :data-menuname="subItem.name"
            :class="{'active':isActiveSubItem(subItem),'functionMenu':isFunctionSubItem(subItem)}"
            :title="subItem.name">
          {{subItem.name}}
          <i class="cjm-icon-new-window" @click="openNewWindow($event, subItem)"></i>
          <i class="cjm-menu-item-active-icon"></i>
        </li>
      </ul>
    </el-collapse-transition>
  </div>
</template>

<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

  export default{
    components: {
      'el-collapse-transition': CollapseTransition
    },
    props: {
      menuItem: {
        type: Object,
        required: true
      }
    },
    computed: {
      isActive(){
        return this.$store.state.menu.activeMenu1 === this.menuItem;
      },
      isFunctionMenu(){
        return this.menuItem.menuType == this.$globalData.get('root', 'enums').menuType.FUNCTION;
      }
    },
    methods: {
      //一级菜单点击
      itemActive(){
        if (this.$store.state.menu.activeMenu1 === this.menuItem && this.menuItem.menuType != this.$globalData.get('root', 'enums').menuType.FUNCTION) {
          this.$store.commit('menu_setActiveMenu1', {menu: null});
        } else {
          this.$store.commit('menu_setActiveMenu1', {menu: this.menuItem});
        }
      },
      //二级菜单点击
      subItemActive(event){
        const menuName = event.target.attributes['data-menuname'];
        if (menuName) {
          const subItem = this.menuItem.childList.find(item => {
            return item.name === menuName.value;
          });
          this.$store.commit('menu_setActiveMenu2', {menu: subItem});
        }
      },
      //二级菜单是否是功能菜单
      isFunctionSubItem(subItem){
        return subItem.menuType == this.$globalData.get('root', 'enums').menuType.FUNCTION;
      },
      //二级菜单是否选中
      isActiveSubItem(subItem){
        return this.$store.state.menu.activeMenu2 === subItem;
      },
      openNewWindow(event, menu){
        event.stopPropagation();
        window.open('#' + menu.routePath);
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .cjm-menu-item-head {
    position: relative;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    cursor: default;
    user-select: none;

    & > .cjm-menu-item-head-icon {
      margin-right: 6px;
      transition: all 0.3s ease;
      font-size: 12px;
    }

    & > .cjm-menu-item-active-icon {
      position: absolute;
      right: 0;
      top: 8px;
      height: 0;
      width: 0;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      border-right: 12px solid #eee;
      display: none;
    }
  }

  .cjm-menu-item-head.functionMenu.active {
    .cjm-menu-item-active-icon {
      display: block;
    }
  }

  .cjm-menu-item-head.functionMenu {
    & > .cjm-menu-item-head-icon {
      visibility: hidden;
    }
  }

  .cjm-menu-item-head:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  .cjm-menu-item-body {
    list-style: none;
    overflow: hidden;
    transition: height 0.3s ease;

    & > li {
      position: relative;
      padding: 0 35px 0 40px;
      height: 35px;
      line-height: 35px;
      cursor: default;
      color: #fff;
      user-select: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      .cjm-icon-new-window {
        display: none;
        position: absolute;
        right: 15px;
        top: 8px;
        font-size: 16px;
        cursor: pointer;
      }
    }

    & > li:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    & > li > .cjm-menu-item-active-icon {
      position: absolute;
      right: 0;
      top: 8px;
      height: 0;
      width: 0;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      border-right: 12px solid #eee;
      display: none;
    }

    & > li.active > .cjm-menu-item-active-icon {
      display: block;
    }

    & > li.functionMenu:hover {
      .cjm-icon-new-window {
        display: inline-block;
      }
    }
  }
</style>
