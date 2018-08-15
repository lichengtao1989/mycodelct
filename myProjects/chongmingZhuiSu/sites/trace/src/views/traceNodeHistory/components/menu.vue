<template>
  <div class="cjm-menu">
    <transition name="cjm-menu-right">
      <div class="cjm-menu-right" ref="menuRight" v-show="isShowMenu&&!menuCollapsed">
        <ul>
          <li :class="activeMenu==menu?'active':''" v-for="(menu,index) in menuList" @click="onMenuClick(menu)" :key="index">
            <span>{{menu.name}}</span>
            <i class="cjm-icon-new-window"></i>
          </li>
        </ul>
        <div class="cjm-menu-right-collapse-wrap" @click="menuCollapsed=!menuCollapsed">
          <div class="cjm-menu-right-collapse cjm-icon-chevron-down cjm-icon-rotate-90"></div>
        </div>
      </div>
    </transition>
    <div class="cjm-menu-right-collapse-wrap cjm-menu-right-collapse-wrap2" @click="menuCollapsed=!menuCollapsed" v-show="isShowMenu&&menuCollapsed">
      <div class="cjm-menu-right-collapse cjm-icon-chevron-down cjm-icon-rotate-n90"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['transfer', 'traceNodeList'],
    data(){
      return {
        menuCollapsed: false,
        pageCode: this.transfer.getPageCode(),
        activeMenu: null,
        menuList: []
      };
    },
    computed: {
      menuInfo(){
        return this.$store.state.menu;
      },
      menu2Code(){
        if (this.menuInfo && this.menuInfo.activeMenu2 && this.menuInfo.activeMenu2.code) {
          return this.menuInfo.activeMenu2.code;
        }
        return '';
      },
      isShowMenu(){
        return this.menu2Code === this.pageCode;
      }
    },
    methods: {
      onMenuClick(menu){
        this.activeMenu = menu;
        this.transfer.$emit('onMenuClick', menu);
      },
      sleepAwait(time){
        return new Promise(resolve => {
          setTimeout(resolve, time);
        });
      },
      async menuDataFormat(){
        await this.sleepAwait(5000);
        this.menuList = [
          {name: '节点1'}, {name: '节点2'}, {name: '节点3'}, {name: '节点4'}, {name: '节点5'}
        ];
        this.activeFirstMenu();
      },
      activeFirstMenu(){
        if (this.menuList.length > 0) {
          this.onMenuClick(this.menuList[0]);
        }
      }
    },
    created(){
      this.menuDataFormat();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .cjm-menu {
    top: 0;
    .cjm-menu-right-collapse-wrap2 {
      left: 0;
      margin-top: -19px;
    }
  }
</style>
