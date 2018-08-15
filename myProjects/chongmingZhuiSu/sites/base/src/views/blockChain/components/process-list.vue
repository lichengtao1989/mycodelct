<template>
  <div class="process-display-panel">
    <div class="process-display">
      <div v-for="(obj,index) in nodeList" class="process-item">
        <div :class="{'process-line':true,'no-process-line':nodeList.length == 1}">
          <div class="process-icon"><i class="process-icon-inner">{{nodeList.length - index}}</i></div>
        </div>
        <div
          :class="{'process-item-card':true,active:index == activeNodeIndex,'read-only':disabledEvent, 'revise-item':obj.status == 0, 'warn-item':obj.status == -1}"
          @mouseenter="nodeMouseEnter(index)">
          <div v-if="obj.status != -1">
            <label class="normal-icon label-icon" v-if="obj.status == 1">
              <i class="cjm-icon-confirm inner-icon"></i>
            </label>
            <label class="revise-icon label-icon" v-if="obj.status == 0">
              <i class="cjm-icon-revise inner-icon"></i>
            </label>
            <p v-for="(value,key) in nodeList[index].dataJson" class="clear">
              <span class="item-name">{{key}}:</span>
              <span class="item-content">{{value}}</span>
            </p>
            <div v-if="obj.status == 0" class="warn-item">
              <label class="exception-icon label-icon">
                <i class="cjm-icon-warn inner-icon"></i>
              </label>
              <p class="warn-text">疑似篡改</p>
            </div>
            <p class="btn-wrap" v-if="nodeList[index].nodeJson">
              <cjm-button type="text" @click.stop="showViewDetailDialog(index)">查看节点详情>></cjm-button>
            </p>
          </div>
          <div v-if="obj.status == -1">
            <label class="exception-icon label-icon">
              <i class="cjm-icon-warn inner-icon"></i>
            </label>
            <p class="warn-text">疑似篡改</p>
            <p class="btn-wrap" v-if="nodeList[index].traceNodeID || nodeList[index].codeGenerationID">
              <cjm-button type="text" @click.stop="showViewDetailDialog(index)">查看节点详情>></cjm-button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <cjm-dialog :title="traceBlockType == 'trace'?'溯源节点信息':'防伪节点信息'" :visible.sync="showViewDialog" :show-footer="false"
                class="show-node-dialog">
      <node-view-dialog ref="nodeViewDialog"></node-view-dialog>
    </cjm-dialog>
  </div>
</template>
<script>
  import nodeViewDialog from './node-view-dialog.vue';
  export default {
    components: {
      nodeViewDialog
    },
    data(){
      return {
        nodeList: this.nodeArray,
        activeNodeIndex: this.currentNodeIndex, //当前选中的节点索引
        disabledEvent: this.onlyRead, //是否禁止交互
        showViewDialog: false
      }
    },
    props: {
      nodeArray: {
        type: Array,
        default: () => {
          return [];
        }
      },
      currentNodeIndex: {
        type: [Number, String],
        default: () => {
          return null;
        }
      },
      onlyRead: { //是否是只读状态
        type: Boolean,
        default: () => {
          return false;
        }
      },
      traceBlockType: { //'trace'|'anti'
        type: String,
        default: () => {
          return 'trace';
        }
      }
    },
    methods: {
      nodeMouseEnter(index){ //鼠标移进事件
        if (!this.disabledEvent && this.activeChainNodeIndex != index) {
          this.activeNodeIndex = index;
          this.setActiveNodeIndex();
        }
      },
      nodeMouseLeave(){ //鼠标移出事件
        if (!this.disabledEvent) {
          this.activeNodeIndex = null;
          this.setActiveNodeIndex();
        }
      },
      setActiveNodeIndex(){
        this.$emit('changeIndex', this.activeNodeIndex);
      },
      showViewDetailDialog(index){
        this.showViewDialog = true;
        let currentData = {
          operateTime: this.nodeList[index].operateTime,
          nodeJson: this.nodeList[index].nodeJson,
          isCreateOrDelete: this.nodeList[index].isCreateOrDelete,
          status: this.nodeList[index].status,
          traceNodeID: this.nodeList[index].traceNodeID,
          codeGenerationID: this.nodeList[index].codeGenerationID
        };
        let beforeData = Object.deepClone(this.nodeList[index].beforeNode) || null;
        let tamperedData = Object.deepClone(this.nodeList[index].tamperedNode) || null;
        this.$nextTick(() => {
          this.$refs.nodeViewDialog.init(beforeData, tamperedData, currentData, this.traceBlockType);
        });
      }
    },
    watch: {
      currentNodeIndex(val){
        this.activeNodeIndex = val;
      },
      nodeArray(val){
        this.nodeList = val;
      },
      onlyRead(val){
        this.disabledEvent = val;
      }
    }
  }
</script>
<style lang="less" scoped="scoped">
  .process-display-panel {
    display: table-cell;
  }

  .process-display {
    margin-right: 8%;
  }

  .process-item {
    position: relative;
    padding-bottom: 20px;
    &:last-child {
      padding-bottom: 0;
    }
    &:first-child .process-line:before {
      height: 50%;
      top: 50%;
    }
    &:last-child .process-line:before {
      height: 50%;
    }
    &:last-child .no-process-line:before {
      display: none;
    }
  }

  .process-line {
    width: 14%;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    &:before {
      content: '';
      display: block;
      width: 1px;
      background-color: #20a0ff;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 0;
      z-index: 1;
    }
  }

  .process-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    margin-top: -45px;
    margin-left: -35px;
    background-color: #fff;
    .process-item:last-child & {
      margin-top: -35px;
    }
    &-inner {
      width: 36px;
      height: 36px;
      margin: 15px;
      line-height: 36px;
      display: inline-block;
      background-color: #20a0ff;
      border: 2px solid #5fbaff;
      border-radius: 50%;
      text-align: center;
      font-size: 18px;
      color: #fff;
      font-style: normal;
    }
  }

  .process-item-card {
    margin-left: 14%;
    border: 1px solid #20a0ff;
    background-color: #fff;
    border-radius: 6px;
    padding: 12px 0;
    min-height: 55px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 2;
    p {
      margin: 17px 28px;
      color: #475669;
      font-size: 14px;
      .item-name {
        width: 106px;
        color: #8492a6;
        display: inline-block;
        float: left;
      }
      .item-content {
        display: block;
        margin-left: 106px;
        word-wrap: break-word;
        word-break: normal;
      }
    }
    &.active {
      box-shadow: 0 6px 6px rgba(0, 0, 0, 0.11);
    }
    .btn-wrap {
      text-align: center;
    }
    &.warn-item, & .warn-item {
      border: 1px solid #ff4949;
      .warn-text {
        color: #ff4949;
        text-align: center;
      }
    }
    & .warn-item {
      position: relative;
      overflow: hidden;
      margin: 0 28px;
      border-radius: 6px;
    }
    &.revise-item {
      border: 1px solid #85ca00;
    }
    .label-icon {
      position: absolute;
      top: -6px;
      right: -20px;
      height: 30px;
      line-height: 30px;
      width: 58px;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 1px 1px #ccc;
      .inner-icon {
        position: relative;
        left: 2px;
        top: 6px;
        transform: rotate(-45deg);
        color: #fff;
        font-size: 16px;
      }
    }
    .exception-icon {
      background-color: #ff4949;
    }
    .normal-icon {
      background-color: #20a0ff;
    }
    .revise-icon {
      background-color: #85ca00;
    }
    &.read-only {
      cursor: default;
    }
  }
</style>
