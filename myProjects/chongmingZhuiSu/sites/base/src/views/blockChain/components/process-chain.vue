<template>
  <div class="block-chain" ref="blockChain">
    <h4>区块链信息</h4>
    <div class="svg-table" :style="'width:'+ wrapWidth +'px'">
      <div v-if="chainNodeList && chainNodeList.length > 0">
        <svg class="chain-svg" v-bind:height="svgHeight" v-bind:width="wrapWidth" id="chainSvg">
          <g v-for="(obj, index) in chainNodeList">
            <!--被异常修改节点-->
            <g class="error-node" v-if="chainNodeList.length - 1 - index != 0 && chainNodeList[chainNodeList.length - 2 - index].status == 0">
              <line :x1="chainNodePoint[chainNodeList.length - 1  - index][0]" :y1="chainNodePoint[chainNodeList.length - 1  - index][1]" :x2="(chainNodePoint[chainNodeList.length - 1  - index][0] - chainNodePoint[chainNodeList.length - 2  - index][0] < 0? -40 : 40)+chainNodePoint[chainNodeList.length - 1  - index][0]" :y2="chainNodePoint[chainNodeList.length - 1  - index][1] - 120" class="chain-item-line" stroke-dasharray="6 4"></line>
              <g class="chain-item" @mouseenter="errorNodeMouseEnter(chainNodeList.length - 1 - index)" @mouseleave="errorNodeMouseLeave()">
                <circle :cx="(chainNodePoint[chainNodeList.length - 1  - index][0] - chainNodePoint[chainNodeList.length - 2  - index][0] < 0 ? -40 : 40)+chainNodePoint[chainNodeList.length - 1  - index][0]" :cy="chainNodePoint[chainNodeList.length - 1 - index][1]-120" :r="(activeErrorNodeIndexInChain == chainNodeList.length - 1 - index)?activeErrorChainNodePointR:chainNodePointR" class="chain-item-circle"></circle>
                <image xlink:href="../../../assets/images/warn.svg" width="20" height="20" :x="(chainNodePoint[chainNodeList.length - 1  - index][0] - chainNodePoint[chainNodeList.length - 2  - index][0] < 0 ? -40 : 40)+chainNodePoint[chainNodeList.length - 1  - index][0] -10" :y="chainNodePoint[chainNodeList.length - 1 - index][1]-120-10"></image>
              </g>
            </g>
            <!--连接线-->
            <line v-if="chainNodeList.length - 1 - index != 0" :x1="chainNodePoint[chainNodeList.length - 1  - index][0]" :y1="chainNodePoint[chainNodeList.length - 1 - index][1]" :x2="chainNodePoint[chainNodeList.length - 2 - index][0]" :y2="chainNodePoint[chainNodeList.length - 2 - index][1]" class="chain-item-line"></line>
            <!--节点-->
            <g class="chain-item event-item" @mouseenter="chainNodeMouseEnter(chainNodeList.length - 1 - index)" @mouseleave="chainNodeMouseLeave()" :class="{active:activeChainNodeIndex==chainNodeList.length - 1 - index,'revise-node':chainNodeList[chainNodeList.length - 1 - index].status == 0,'exception-node':chainNodeList[chainNodeList.length - 1 - index].status == -1,'read-only':disabledEvent}">
              <circle :cx="chainNodePoint[chainNodeList.length - 1 - index][0]" :cy="chainNodePoint[chainNodeList.length - 1 - index][1]" :r="(activeChainNodeIndex==chainNodeList.length - 1 - index)?activeChainNodePointR:chainNodePointR" :class="{'chain-item-circle':true}"></circle>
              <text :x="chainNodePoint[chainNodeList.length - 1 - index][0]" :y="chainNodePoint[chainNodeList.length - 1 - index][1]" class="chain-item-text">
                {{index + 1}}
              </text>
              <!--<image xlink:href="../../../assets/images/warn.svg" width="20" height="20"-->
              <!--:x="chainNodePoint[chainNodeList.length - 1 - index][0] - 10"-->
              <!--:y="chainNodePoint[chainNodeList.length - 1 - index][1] - 10"-->
              <!--v-if="chainNodeList[chainNodeList.length - 1 - index].status == -1"></image>-->
            </g>
          </g>
        </svg>
        <div class="chain-node-dialog" :class="{'normal':!dialogIsDown,'down':dialogIsDown}" v-bind:style="'top:' + dialogTopPosition + 'px;left:' + dialogLeftPosition + 'px;display:' + (dialogDisplay?'block':'none')">
          <i class="dialog-arrow-out"></i>
          <i class="dialog-arrow-inner"></i>
          <div class="chain-node-dialog-inner">
            <p v-for="(value,key,index) in chainNodeList[activeChainNodeIndex].dataJson" class="clear">
              <span class="item-name">{{key}}:</span>
              <span class="item-content" :style="index== 0?'font-weight:bold;':''">{{value}}</span>
            </p>
          </div>
        </div>
        <div class="suspension-box" v-bind:style="'top:' + suspensionTopPosition + 'px;left:' + suspensionLeftPosition + 'px;display:' + (suspensionDisplay?'block':'none')">
          {{tooltipText}}
        </div>
      </div>
      <p class="no-selected-data" v-if="!chainNodeList || chainNodeList.length == 0">请选择节点</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chainNodeList: this.chainNodeArray,
      chainNodePointR: 12, //节点半径
      activeChainNodePointR: 34, //节点选中时半径
      activeErrorChainNodePointR: 24, //异常节点选中时半径
      wrapWidth: 400,
      verticalDistance: 260, //节点之间垂直距离
      dialogTopPosition: 0, //弹框的top
      dialogLeftPosition: 0, //弹框的left
      suspensionTopPosition: 0, //悬浮框top
      suspensionLeftPosition: 0, //悬浮框left
      suspensionDisplay: false, //悬浮框是否隐藏
      dialogDisplay: false, //弹框是否隐藏
      activeChainNodeIndex: this.currentChainNodeIndex, //当前选中的节点索引
      activeErrorNodeIndexInChain: '', //当前选中的节点索引
      disabledEvent: this.onlyRead, //是否禁止交互
      dialogIsDown: false,
      tooltipText: ''
    };
  },
  props: {
    chainNodeArray: {
      //节点数组
      type: Array,
      default: () => {
        return [];
      }
    },
    currentChainNodeIndex: {
      //当前选中的节点索引
      type: [Number, String],
      default: () => {
        return null;
      }
    },
    onlyRead: {
      //是否是只读状态
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  computed: {
    svgHeight() {
      return 100 + this.verticalDistance * (this.chainNodeList.length - 1);
    },
    chainNodePoint() {
      //自动算出区块节点的位置
      let pointArray = [];
      for (let i = 0; i < this.chainNodeList.length; i++) {
        let _x =
          i == 0
            ? 200
            : 70 +
              (this.wrapWidth - 125) * this.getPositionParam(this.chainNodeList[i].transactionHash);
        let _y = 50 + this.verticalDistance * i;
        pointArray[i] = [_x, _y];
      }
      return pointArray;
    }
  },
  methods: {
    chainNodeMouseEnter(index) {
      //鼠标移进事件
      if (!this.disabledEvent && this.activeChainNodeIndex != index) {
        this.activeChainNodeIndex = index;
        this.setChainNodeDialogPosition();
        this.setActiveNodeIndex();
      }
      this.nodeMouseEnterTooltip(
        index,
        this.chainNodeList[index].status == 1
          ? '正常数据'
          : this.chainNodeList[index].status == 0 ? '合规修正' : '疑似篡改',
        1
      );
    },
    chainNodeMouseLeave() {
      //鼠标移出事件
      //        if (!this.disabledEvent) {
      //          this.activeChainNodeIndex = null;
      //          this.setChainNodeDialogPosition();
      //          this.setActiveNodeIndex();
      //        }
      this.nodeMouseLeaveTooltip();
    },
    errorNodeMouseEnter(index) {
      this.activeErrorNodeIndexInChain = index;
      this.nodeMouseEnterTooltip(index, '疑似篡改', 2);
    },
    errorNodeMouseLeave() {
      this.activeErrorNodeIndexInChain = '';
      this.nodeMouseLeaveTooltip();
    },
    nodeMouseEnterTooltip(index, text, nodeType) {
      let x, y;
      if (nodeType == 1) {
        x = this.chainNodePoint[index][0] + 40;
        y = y || this.chainNodePoint[index][1] - 40;
      } else {
        x =
          (this.chainNodePoint[index][0] - this.chainNodePoint[index - 1][0] < 0 ? -40 : 40) +
          this.chainNodePoint[index][0] +
          30;
        y = this.chainNodePoint[index][1] - 120 - 30;
      }
      this.suspensionTopPosition = y;
      this.suspensionLeftPosition = x;
      this.tooltipText = text;
      this.suspensionDisplay = true;
    },
    nodeMouseLeaveTooltip() {
      this.suspensionTopPosition = 0;
      this.suspensionLeftPosition = 0;
      this.tooltipText = '';
      this.suspensionDisplay = false;
    },
    setChainNodeDialogPosition() {
      if (
        this.chainNodeList[this.activeChainNodeIndex] &&
        this.chainNodeList[this.activeChainNodeIndex].dataJson
      ) {
        let left =
            this.activeChainNodeIndex != null
              ? this.chainNodePoint[this.activeChainNodeIndex][0]
              : 0,
          top =
            this.activeChainNodeIndex != null
              ? this.chainNodePoint[this.activeChainNodeIndex][1]
              : 0,
          isShow = this.activeChainNodeIndex != null,
          parentWrap = this.$refs.blockChain ? this.$refs.blockChain.clientWidth : this.wrapWidth;
        this.dialogIsDown =
          this.chainNodeList.length > 1 &&
          this.activeChainNodeIndex == this.chainNodeList.length - 1;
        //获得弹框left定位
        this.dialogLeftPosition =
          left - (300 - 83) + 300 > (parentWrap - this.wrapWidth) / 2 + this.wrapWidth
            ? this.wrapWidth - 310
            : left - (300 - 83);
        //获得弹框top定位
        if (this.dialogIsDown) {
          this.dialogTopPosition = top - 50 - 250;
        } else {
          this.dialogTopPosition = 50 + top;
        }
        this.dialogDisplay = isShow;
      } else {
        this.dialogDisplay = false;
      }
    },
    setActiveNodeIndex() {
      this.$emit('changeIndex', this.activeChainNodeIndex);
    },
    getPositionParam(str) {
      let strArray = str.split('');
      let numCount = 0;
      for (let i = 0; i < strArray.length; i++) {
        numCount += str.charCodeAt(i);
      }
      numCount += '';
      return numCount.substring(numCount.length - 1) / 10;
    }
  },
  watch: {
    currentChainNodeIndex(val) {
      this.activeChainNodeIndex = val;
      this.setChainNodeDialogPosition();
    },
    chainNodeArray(val) {
      this.chainNodeList = val;
      if (this.onlyRead || this.activeChainNodeIndex != null) {
        this.$nextTick(() => {
          this.setChainNodeDialogPosition();
        });
      }
    },
    onlyRead(val) {
      this.disabledEvent = val;
    }
  },
  created() {
    this.setChainNodeDialogPosition();
  }
};
</script>
<style lang="less" scoped="scoped">
.svg-table {
  margin: 0 auto;
  position: relative;
  .event-item {
    cursor: pointer;
  }
  .chain-node-dialog {
    position: absolute;
    z-index: 3;
    .dialog-arrow-out {
      width: 0;
      height: 0;
      border-style: dashed;
      border-width: 8px;
      position: absolute;
      right: 75px;
    }
    .dialog-arrow-inner {
      border-style: dashed;
      border-color: transparent transparent #fff transparent;
      border-width: 8px;
      position: absolute;
      right: 75px;
    }
    &.normal {
      .dialog-arrow-out {
        border-color: transparent transparent #20a0ff transparent;
        top: -15px;
      }
      .dialog-arrow-inner {
        border-color: transparent transparent #fff transparent;
        top: -14px;
      }
    }
    &.down {
      .dialog-arrow-out {
        border-color: #20a0ff transparent transparent transparent;
        bottom: -15px;
      }
      .dialog-arrow-inner {
        border-color: #fff transparent transparent transparent;
        bottom: -14px;
      }
    }
    &-inner {
      width: 252px;
      padding: 20px 24px;
      border: 1px solid #20a0ff;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 6px 6px rgba(0, 0, 0, 0.11);
    }
    p {
      margin: 12px 0;
      color: #475669;
      font-size: 14px;
      .item-name {
        width: 78px;
        color: #8492a6;
        display: inline-block;
        float: left;
        font-weight: bold;
      }
      .item-content {
        display: block;
        margin-left: 78px;
        word-wrap: break-word;
        word-break: normal;
      }
    }
  }
}

.no-selected-data {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin: 100px 0;
}

.block-chain {
  background-color: #eff2f7;
  display: table-cell;
  margin-left: 40px;
  border-radius: 6px;
  vertical-align: top;
  background: url('../../../assets/images/blockChain_bg.png') #eff2f7 top center;
  background-position-y: 44px;
  background-repeat: repeat-y;
  background-size: 90%;
  /*background-attachment:fixed;*/
  h4 {
    font-size: 14px;
    color: #202d3e;
    font-style: normal;
    background-color: #d4dde6;
    padding-left: 24px;
    line-height: 44px;
    border-radius: 6px 6px 0 0;
  }
}

.chain-svg {
  margin: 0 auto;
  display: block;
  .chain-item {
    &-text {
      font-size: 16px;
      fill: #20a0ff;
      text-anchor: middle;
      dominant-baseline: central;
      alignment-baseline: central;
      display: none;
    }
    &-line {
      stroke: #87c9fb;
      stroke-width: 3;
    }
    &-circle {
      fill: #fff;
      stroke: #20a0ff;
      stroke-width: 5;
    }
    &.exception-node {
      .chain-item-circle {
        stroke: #ff4949;
      }
      .chain-item-text {
        fill: #ff4949;
      }
    }
    &.revise-node {
      .chain-item-circle {
        stroke: #85ca00;
      }
      .chain-item-text {
        fill: #85ca00;
      }
    }
    &.active {
      .chain-item-circle {
        stroke-width: 10;
      }
      .chain-item-text {
        display: block;
      }
      image {
        display: none;
      }
    }
    &.read-only {
      cursor: default;
    }
  }
  .error-node {
    image {
      display: none;
    }
    .chain-item:hover image {
      display: block;
    }
    .chain-item-circle {
      stroke: #ff4949;
    }
    .chain-item-text {
      fill: #ff4949;
    }
    .chain-item-line {
      stroke: #f2b0b1;
    }
  }
}

.suspension-box {
  position: absolute;
  z-index: 4;
  width: 124px;
  height: 34px;
  line-height: 34px;
  border-radius: 6px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 15px;
  color: #fff;
}
</style>
