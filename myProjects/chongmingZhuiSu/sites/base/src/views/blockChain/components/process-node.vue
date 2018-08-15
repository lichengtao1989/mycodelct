<template>
  <ul class="process-node-list">
    <li v-for="(obj,index) in nodeTabList"
        :class="{'node-item':true,'active':obj.nodeCode == activeNodeCode,'deleted': !obj.isExist, 'warn': obj.isError}"
        @click="changeActiveNodeCode(obj.nodeCode)">
      <div class="node-name">{{obj.nodeName || "没有节点名称"}}<i class="cjm-icon-warn" v-if="obj.isError"></i></div>
    </li>
    <!--<li class="node-item warn">节点4</li>-->
  </ul>
</template>
<script>
  export default {
    data(){
      return {
        nodeTabList: this.nodeCodeArray,
        activeNodeCode: this.nodeCode
      }
    },
    props: {
      nodeCodeArray: {
        type: Array,
        default: () => {
          return [];
        }
      },
      nodeCode: {
        type: [String, Number]
      }
    },
    watch: {
      nodeCodeArray(val){
        this.nodeTabList = this.nodeCodeArray;
      },
      nodeCode(){
        this.activeNodeCode = this.nodeCode;
      }
    },
    methods: {
      changeActiveNodeCode(nodeCode) {
        if (nodeCode == this.activeNodeCode) {
          this.activeNodeCode = 'all';
        } else {
          this.activeNodeCode = nodeCode;
        }
        this.$emit('changeNodeCode', this.activeNodeCode);
      }
    }
  }
</script>
<style lang="less" scoped="scoped">
  .process-node-list {
    .node-item {
      width: 80%;
      max-width: 170px;
      height: 58px;
      text-align: center;
      border-radius: 6px;
      font-size: 16px;
      color: #1f2d3d;
      background-color: #fff;
      border: 1px solid #d4dde6;
      margin: 0 auto 120px;
      cursor: pointer;
      .node-name {
        height: 58px;
        line-height: 58px;
      }
      &.active {
        border: 1px solid #20a1ff;
        background-color: #20a1ff;
        color: #fff;
      }
      &.deleted {
        border: 1px solid #d4dde6;
        background-color: #d4dde6;
      }
      &.deleted.active{
        background:#c8dff7;
        color: #1f2d3d;
      }
      &.warn {
        border: 1px solid #ff4949;
        color: #ff4949;
        background-color: #fff;
      }
      &.warn.active {
        border: 1px solid #f99794;
        background-color: #f99794;
        color: #fff;
      }
      &:after {
        content: '';
        display: block;
        width: 1px;
        height: 114px;
        background-color: #20a1ff;
        margin: 3px auto 0;
      }
      &:last-child{
        margin-bottom:0;
      }
      &:last-child:after {
        display: none;
      }
    }
  }

</style>
