<template>
  <div class="cjm-head-theme" @mouseover="mouseOverHandler" @mouseout="mouseOutHandler">
    <p>
      <i class="cjm-icon-theme"></i>换肤
    </p>
    <ul v-show="popVisible">
      <li v-for="item in items" class="cjm-head-theme-item" :class="item.key" @click="themeChange(item)">
        <i v-show="item.key===$store.state.userConfig.theme"></i>
        <label>{{item.name}}</label>
      </li>
    </ul>
  </div>
</template>

<script>
  import themes from '../../../config/theme'
  export default{
    data(){
      return {
        popVisible: false,
        items: themes,
        timer: null
      }
    },
    methods: {
      mouseOverHandler(){
        this.popVisible = true;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
      mouseOutHandler(){
        this.timer = setTimeout(()=> {
          this.popVisible = false;
        }, 100);
      },
      themeChange(theme){
        this.$store.commit('userConfig_setTheme', theme.key);
        this.$ajax.post(this.$globalData.get('root', 'apiUrl').CHANGE_THEME, {theme: theme.key});
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .cjm-head-theme {
    position: relative;
    display: inline-block;
    width: 54px;

    & > p {
      color: #fff;
      font-size: 14px;

      & > i {
        position: relative;
        top: 2px;
        font-size: 21px;
        color: #fff;
        margin-right: 4px;
      }
    }

    & > ul {
      position: absolute;
      right: -75px;
      top: 52px;
      width: 220px;
      padding: 5px;
      z-index: 1000;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 3px 0px #DEDDDD;
      background: #fff;
      border-radius: 5px;

      &:before {
        display: block;
        content: ' ';
        width: 0;
        height: 0;
        border-bottom: 10px solid #fff;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        top: -10px;
        position: absolute;
        left: 120px;
      }

      & > li {
        width: 67px;
        height: 67px;
        margin: 3px;
        float: left;
        position: relative;

        & > label {
          position: absolute;
          bottom: 0;
          left: 5px;
          font-size: 13px;
          line-height: 20px;
          color: #fff;
        }

        & > i {
          position: absolute;
          top: -10px;
          right: -5px;
          display: inline-block;
          background: url(../../../assets/images/icon-redcheck.png) no-repeat;
          background-size: 100%;
          width: 22px;
          height: 22px;
        }
      }
    }
  }
</style>
