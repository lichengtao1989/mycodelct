<template>
  <div class="trace-node-history">
    <trace-menu v-if="transfer" :trace-node-list="traceNodeList" :transfer="transfer"></trace-menu>
  </div>
</template>
<script>
  import {addClass, removeClass} from 'framework/utils/dom.js';
  import traceMenu from './components/menu.vue';
  import Vue from 'vue';
  export default {
    components: {traceMenu},
    data(){
      return {
        transfer: null,
        traceNodeList: [],
        pageCode: 'traceNodeHistory'
      };
    },
    computed: {
      transferOptions(){
        return {
          methods: {
            getPageCode: this.getPageCode
          }
        }
      }
    },
    methods: {
      init(){
        const vueTransfer = new Vue(this.transferOptions);
        this.transfer = vueTransfer;
        vueTransfer.$on('onMenuClick', this.onMenuClick);
        this.loadTraceNodeList();
      },
      onMenuClick(menu){
        console.log(menu);
      },
      getPageCode(){
        return this.pageCode
      },
      async loadTraceNodeList(){
      }
    },
    beforeCreate(){
      addClass(document.body, 'trace-node-history-page');
    },
    created(){
      this.init();
    },
    beforeDestroy(){
      removeClass(document.body, 'trace-node-history-page');
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  .trace-node-history-page {
    .cjm-tab-container {
      background-color: #eee;
      box-shadow: none;
      padding: 0;
      .cjm-tab-content {
        margin-top: 0;
      }
    }
    .cjm-content {
      padding: 0;
    }
    .cjm-tab-header {
      display: none;
    }
  }
</style>
<style rel="stylesheet/less" lang="less" scoped>
  .trace-node-history {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>
