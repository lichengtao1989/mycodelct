<template>
  <div style="padding-top:1px;">
    <div class="illustration clear">
      图例:
      <p><span class="exception"><i class="cjm-icon-warn"></i></span>疑似篡改</p>
      <p><span class="normal"><i class="cjm-icon-confirm"></i></span>正常数据</p>
      <p><span class="revise"><i class="cjm-icon-revise"></i></span>合规修正</p>
    </div>
    <cjm-scrollbar ref='scrollLeftBar' :style="'height:'+ (blockChainHeight-120) +'px'" class="leftWrap">
      <process-node :nodeCodeArray="nodeCodeArray" :nodeCode="nodeCode"
                    @changeNodeCode="setNodeCode"></process-node>
    </cjm-scrollbar>
    <cjm-scrollbar ref='scrollRightBar' viewStyle="height:100%;" wrapStyle="height:100%;"
                   :style="'height:'+blockChainHeight +'px'" class="rightWrap">
      <div style="width:100%;display: table;height:100%;">
        <process-list style="width:50%" :nodeArray="nodeArray"
                      :currentNodeIndex="currentNodeIndex"
                      :onlyRead="onlyRead" @changeIndex="setCurrentNodeIndex" v-if="nodeArray.length!=0"
                      :traceBlockType="traceBlockType"></process-list>
        <process-chain style="width:50%" :chainNodeArray="chainNodeArray"
                       :currentChainNodeIndex="currentChainNodeIndex"
                       :onlyRead="onlyRead" @changeIndex="setCurrentChainNodeIndex"
                       v-if="nodeArray.length != 0"></process-chain>
        <div v-if="JSON.stringify(this.processNode) == '{}'&&nodeArray.length==0&&chainNodeArray.length==0"
             class="loading">
          <img src="static/images/root-loading.gif"></div>
        <div v-if="JSON.stringify(this.processNode) != '{}'&&nodeArray.length==0&&chainNodeArray.length==0"
             class="no-data">
          <div class="cjm-img-nodata"></div>
          <p class="no-data-text">暂无内容</p>
        </div>
      </div>
    </cjm-scrollbar>
  </div>
</template>
<script>
  import processList from './process-list.vue';
  import processChain from './process-chain.vue';
  import processNode from './process-node.vue';
  export default {
    components: {
      'process-list': processList,
      'process-chain': processChain,
      'process-node': processNode
    },
    data(){
      return {
        nodeCode: this.currentNodeCode || 'all', //选中的节点
        currentNodeIndex: 0, //hover的区块链节点
        currentChainNodeIndex: 0, //hover的区块链节点
        nodeArray: [], //卡片区块链数据
        chainNodeArray: [], //链式区块链数据
        chainNodeBlockNoArray: [], //链区块号数组
        nodeBlockNoArray: [], //卡片区块号数组
        blockChainHeight: 500,
        onlyRead: false
      }
    },
    props: {
      processNode: {
        type: Object,
        default: () => {
          return {};
        }
      },
      nodeCodeArray: {
        type: Array,
        default: () => {
          return [];
        }
      },
      currentNodeCode: {
        type: String,
        default: () => {
          return 'all';
        }
      },
      traceBlockType: { //'trace'|'anti'
        type: String,
        default: () => {
          return 'trace';
        }
      }
    },
    watch: {
      nodeCode(){
        this.resetData();
      },
      processNode(){
        this.resetData();
        this.resetBlockChainHeight();
      },
      nodeCodeArray(val){
        this.nodeCodeArray = val;
        this.resetBlockChainHeight();
      }
    },
    methods: {
      setCurrentNodeIndex(index){
        this.currentNodeIndex = index;
        this.currentChainNodeIndex = (index == null || (index != null && this.chainNodeBlockNoArray.indexOf(this.nodeBlockNoArray[index]) == -1)) ? null : this.chainNodeBlockNoArray.indexOf(this.nodeBlockNoArray[index]);
      },
      setCurrentChainNodeIndex(index){
        this.currentChainNodeIndex = index;
        this.currentNodeIndex = index == null ? null : this.nodeBlockNoArray.indexOf(this.chainNodeBlockNoArray[index]);
      },
      setNodeCode(nodeCode){
        this.nodeCode = nodeCode;
      },
      resetData(){
        let processNode = this.processNode[this.nodeCode];
        if (JSON.stringify(this.processNode) != '{}') {
          if (processNode) {
            this.nodeBlockNoArray = processNode.nodeArray.map((d) => {
              return d.blockNo;
            });
            this.chainNodeBlockNoArray = processNode.chainNodeArray.map((d) => {
              return d.blockNo;
            });
            this.nodeArray = processNode.nodeArray;
            this.chainNodeArray = processNode.chainNodeArray;
            this.currentNodeIndex = 0;
            this.currentChainNodeIndex = 0;
            if (this.nodeArray.length > 1) {
              this.onlyRead = false;
            } else {
              this.onlyRead = true;
            }
          } else {
            this.nodeBlockNoArray = [];
            this.chainNodeBlockNoArray = [];
            this.nodeArray = [];
            this.chainNodeArray = [];
          }
          this.$refs.scrollRightBar.update();
        }
      },
      resetBlockChainHeight(){
        let baseHeight = window.innerHeight - 200;
        this.blockChainHeight = baseHeight;
        this.$nextTick(() => {
          this.$refs.scrollLeftBar.update();
          this.$refs.scrollRightBar.update();
        });
      }
    },
    mounted(){
      window.onresize = () => {
        this.resetBlockChainHeight();
      };
    },
    destroyed(){
      window.onresize = '';
    },
    created(){
      this.resetData();
    }
  }
</script>
<style lang="less" scoped="scoped">
  .leftWrap {
    width: 15%;
    float: left;
    margin-right: 4%;
    margin-top: 60px;
  }

  .rightWrap {
    margin-left: 19%;
    margin-top:40px;
  }

  .loading, .no-data {
    text-align: center;
    margin-top: 100px;
    .cjm-img-nodata {
      background-repeat: no-repeat;
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }
  }

  .no-data-text {
    margin: 10px 0;
    font-weight: bold;
  }

  .illustration {
    font-size: 14px;
    color: #333333;
    position: absolute;
    right: 0;
    z-index: 4;
    border: 1px solid #d1dbe5;
    background-color: #fff;
    width: 280px;
    padding: 5px;
    p {
      margin-right: 2%;
      display: inline-block;
      span {
        display: inline-block;
      }
    }
    .exception {
      color: #ff4949;
    }
    .normal {
      color: #20a0ff;
    }
    .revise {
      color: #85ca00;
    }
  }
</style>
