<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import getMenu from '@/data/menu/index';
  export default {
    name: 'App',
    data() {
      return {};
    },
    watch: {
      '$route': function () {
        this.checkRouterPower();
      }
    },
    methods: {
      init() {
        this.$eventBus.$on('logout', async () => {
          //this.$message.error('请重新登录');
          await this.$sleep(300);
          this.$router.push('/login');
        });
      },
      checkRouterPower(){ //判断是否有权限访问该路由
        const menuData = getMenu();
        const {path} = this.$route;
        let hasPower = false;
        if (path.indexOf('/main') === 0) {
          menuData.forEach(item => {
            if (`/main/${item.powerCode}` === path) {
              hasPower = true;
            } else if (item.children && item.children.length > 0) {
              item.children.forEach(subItem => {
                if (`/main/${subItem.powerCode}` === path) {
                  hasPower = true;
                }
              });
            }
          });
          if (!hasPower) {
            console.error(`无权限访问该页面：${path}`);
            const userInfo = this.$storage.get('userInfo');
            if (userInfo) {
              this.$router.replace('/main/index');
            } else {
              this.$router.replace('/login');
            }
          }
        }
      },
      onResize() {
        this.$eventBus.$emit('resize');
      },
      bindResize() {
        window.addEventListener('resize', this.onResize);
      },
      unBindResize() {
        window.removeEventListener('resize', this.onResize);
      }
    },
    created() {
      this.init();
    },
    async mounted() {
      this.bindResize();
    },
    beforeDestroy() {
      this.unBindResize();
    }
  };
</script>

<style rel="stylesheet/less" lang="less" >
html,body,#app{
  width:100%;
  height: 100%;
}
</style>
