<template>
  <div>
    <div class="cjm-head-switchSystem" @mouseover="mouseOverHandler" @mouseout="mouseOutHandler">
      <p>
        <i class="cjm-icon-switch"></i>
      </p>
      <ul v-show="popVisible">
        <li v-for="system in systems"
            @click="switchSystem(system)"
            :class="{'current-system':system.id==currentSystemId}">
          <i class="cjm-icon-computer" v-if="system.id!=currentSystemId"></i>
          <i class="cjm-icon-confirm" v-if="system.id==currentSystemId"></i>
          {{system.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import menu from '../../../utils/dataManage/menu'
  export default{
    data(){
      return {
        popVisible: false,
        timer: null,
        systems: []
      }
    },
    computed: {
      currentSystemId(){
        return this.$storage.get('systemId');
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
      //切换系统
      switchSystem(system){
        this.$storage.set('systemId', system.id); //设置本地缓存的systemId
        menu.clear(); //清除menu数据
        location.href = 'index.html';
      }
    },
    created(){
      this.systems = this.$globalData.get('systemList') || [];
      this.$emit('initFinished', this.systems);
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .cjm-head-switchSystem {
    position: relative;
    display: inline-block;
    color: #666;

    & > p > i.cjm-icon-switch {
      position: relative;
      top: 2px;
      font-size: 20px;
      color: #fff;
      margin: 0 5px;
    }

    & > ul {
      position: absolute;
      right: -67px;
      top: 52px;
      width: 200px;
      z-index: 1000;
      border: 1px solid #ccc;
      padding: 10px 0;
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
        left: 110px;
      }

      li {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;

        i {
          font-size: 18px;
          margin-right: 8px;
        }
      }

      li.current-system {
        i {
          margin-right: 4px;
        }
      }

      li:hover {
        background: #eee;
      }
    }
  }
</style>
