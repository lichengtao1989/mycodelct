<template>
  <div class="cjm-head">
    <div class="cjm-head-logo clear" @click="logoClick">
      <img v-if="logoImg" :src="logoImg">
      <span v-if="logoText" class="cjm-head-logo-main">{{logoText}}</span>
      <span v-if="subLogoText" class="cjm-head-logo-sub">—{{subLogoText}}</span>
    </div>
    <ul class="cjm-head-items">
      <li class="head-items-functionSearch">
        <cjm-head-functionSearch></cjm-head-functionSearch>
      </li>
      <li>
        <cjm-head-theme></cjm-head-theme>
      </li>
      <li v-show="showSwitchSystem">
        <cjm-head-switch-system @initFinished="switchSystemInitFinished"></cjm-head-switch-system>
      </li>
      <li>
        <cjm-head-user></cjm-head-user>
      </li>
    </ul>
  </div>
</template>

<script>
  import CjmHeadFunctionSearch from './head-functionSearch'
  import CjmHeadTheme from './head-theme'
  import CjmHeadUser from './head-user'
  import CjmHeadSwitchSystem from './head-switchSystem'
  export default {
    components: {
      CjmHeadFunctionSearch,
      CjmHeadTheme,
      CjmHeadUser,
      CjmHeadSwitchSystem
    },
    data(){
      return {
        //是否显示系统切换按钮
        showSwitchSystem: false
      }
    },
    props: {
      //是否显示功能搜索框
      showFunctionSearch: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      logoObj(){
        return this.$store.state.userConfig.logo;
      },
      logoImg(){
        if (this.logoObj.type == this.$globalData.get('root', 'enums').logoShowWay.IMAGE &&
          this.logoObj.isDisplay == '1') {
          return this.logoObj.value;
        }
        return '';
      },
      logoText(){
        if (this.logoObj.type == this.$globalData.get('root', 'enums').logoShowWay.TEXT &&
          this.logoObj.isDisplay == '1') {
          return this.logoObj.value;
        } else if (this.logoObj.isDisplay != '1') {
          let systemId = this.$storage.get('systemId');
          if (systemId) {
            let system = this.logoObj.systemLogoList.find(item=> {
              return item.id == systemId;
            });
            if (system) {
              return system.title;
            }
          }
          return '';
        } else {
          return '';
        }
      },
      subLogoText(){
        if (this.logoObj.isDisplay != '1') {
          //如果主logo隐藏，则副logo会显示在logo位置，副logo为空
          return '';
        } else if (!this.logoObj.systemLogoList || this.logoObj.systemLogoList.length < 2) {
          //如果只有一个系统，不显示副logo
          return '';
        } else {
          let systemId = this.$storage.get('systemId');
          if (systemId) {
            let system = this.logoObj.systemLogoList.find(item=> {
              return item.id == systemId;
            });
            if (system) {
              return system.title;
            }
          }
          return '';
        }
      }
    },
    methods: {
      logoClick(){
        this.$store.commit('menu_setActiveMenu1', null);
        this.$store.commit('menu_setActiveMenu2', null);
        this.$store.commit('menu_setActiveMenu3', null);
        this.$router.push('/');
      },
      switchSystemInitFinished(systems){
        if (systems && systems.length > 0) {
          this.showSwitchSystem = true;
        }
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .cjm-head {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    color: #fff;
    min-width: 1020px;

    &:after {
      content: '';
      clear: both;
    }
  }

  .cjm-head-logo {
    float: left;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    padding: 2px 0 0 30px;
    font-size: 28px;
    cursor: pointer;

    & > img {
      float: left;
      height: 100%;
    }

    .cjm-head-logo-main {
      float: left;
      font-size: 21px;
    }

    .cjm-head-logo-sub {
      float: left;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      margin-top: 9px;
      margin-left: 5px;
    }
  }

  .cjm-head-items {
    position: absolute;
    top: 0;
    right: 0;

    &:after {
      display: block;
      clear: both;
      content: '';
    }

    & > li {
      float: left;
      padding: 0 10px;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      cursor: default;
    }

    & > li:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    .head-items-functionSearch:hover {
      background: none;
    }
  }
</style>
