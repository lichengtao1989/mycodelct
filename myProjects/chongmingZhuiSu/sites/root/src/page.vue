<template>
  <div class="cjm-page-wrap" :class="theme">
    <div class="cjm-head">
      <div class="cjm-head-content">
        <div class="cjm-head-logo">
          <img v-if="logo.type==0" :src="logo.value">
          <div v-if="logo.type!=0">{{logo.value}}</div>
        </div>
      </div>
    </div>
    <div class="cjm-page-router-wrap">
      <div class="cjm-page-router">
        <cjm-tabs>
          <cjm-tab-pane :label="tabName"></cjm-tab-pane>
        </cjm-tabs>
        <router-view class="cjm-new-window-page"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      tabName(){
        return this.$route.meta.name;
      },
      theme(){
        return this.$store.state.userConfig.theme;
      },
      logo(){
        return this.$store.state.userConfig.logo;
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  body, html {
    height: 100%;
  }

  body {
    box-sizing: border-box;
  }

  .cjm-page-wrap {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;

    .cjm-head {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      color: #fff;
    }

    .cjm-head-content {
      margin: 0 auto;
      max-width: 1200px;
    }

    .cjm-head-logo {
      height: 45px;
      line-height: 45px;
      overflow: hidden;
      padding: 2px 0 0 0px;
      font-size: 28px;
      max-width: 350px;
      cursor: pointer;

      img {
        height: 100%;
      }
    }

    .el-tabs {
      margin: 0 20px;
    }

    .el-tabs__header {
      margin-bottom: 0;
    }
  }

  .cjm-page-router-wrap {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background: #eee;
  }

  .cjm-page-router {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 5px #ccc;

    .cjm-form {
      .el-form-item {
        margin-bottom: 28px;
      }
    }
  }
</style>
