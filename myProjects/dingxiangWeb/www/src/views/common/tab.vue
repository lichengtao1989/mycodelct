<template>
  <h1 class="nz-h1" v-show="title.length>0">{{title}}</h1>
</template>
<script>
  import getMenu from '@/data/menu/index';
  export default {
    data() {
      return {
        menuData: getMenu()
      };
    },
    computed: {
      title(){
        const absoluteTabTitle = this.$globalData.get('absoluteTabTitle');
        const routerTabTitle = this.$globalData.get('routerTabTitle');
        return absoluteTabTitle || routerTabTitle || '';
      }
    },
    watch: {
      menuData: function () {
        this.setTitleByRouter();
      },
      $route: function () {
        this.setTitleByRouter();
      }
    },
    methods: {
      setTitleByRouter(){
        const routerPath = this.$route.path;
        const {menuData = []} = this;
        menuData.forEach(item => {
          if (`/main/${item.powerCode}` === routerPath) {
            this.setRouterTabTitle(item.powerName);
          } else if (item.children && item.children.length > 0) {
            item.children.forEach(subItem => {
              if (`/main/${subItem.powerCode}` === routerPath) {
                this.setRouterTabTitle(subItem.powerName);
              }
            });
          }
        });
      },
      setRouterTabTitle(title){
        this.$globalData.set('routerTabTitle', title);
      }
    },
    mounted(){
      this.setTitleByRouter();
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .nz-h1 {
    height: 21px;
    line-height: 21px;
    margin-bottom: 20px;
    margin-left: 10px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
    clear: both;
  }

  .nz-h1:before,
  .nz-h2:before {
    float: left;
    content: '';
    width: 5px;
    height: 21px;
    background: #00a88a;
    margin-right: 12px;
  }

  .nz-h1:after,
  .nz-h2:after {
    display: block;
    content: '';
    clear: both;
  }
</style>
