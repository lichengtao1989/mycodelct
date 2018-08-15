<template>
  <ul class="tracenode-list-content">
    <li v-for="(node, index) in nodeList" @click.stop="editNode(node)" :title="node.nodeName"
        :class="{'current-node': node.nodeID===selectedNodeID}">
      <span class="node-index">{{index + 1}}</span>
      <span class="node-name"><span v-if="!isLongInput">节点名称:</span> {{node.nodeName}}</span>
      <span class="node-operates">
          <template v-if="!node.unSaved">
            <i class="cjm-icon-chevron-down cjm-icon-rotate-180" title="上移" v-if="sortable&&index!=0"
               @click.stop="goUp(node,index)"></i>
            <i class="cjm-icon-chevron-down" title="下移" v-if="sortable&&index!=nodeList.length-1"
               @click.stop="goDown(node,index)"></i>
            <!-- <i class="cjm-icon-edit" title="编辑" v-if="editable==true" @click="editNode"></i> -->
            <i class="cjm-icon-copy" title="复制" v-if="copyable" @click.stop="copyNode(node)"></i>
            <i class="cjm-icon-delete" title="删除" v-if="deleteable" @click.stop="delNode(node,index)"></i>
            <i class="cjm-icon-record" title="该节点已采集信息" v-if="isInputCount" v-show="node.isInputCount"></i>
          </template>
      </span>
    </li>
  </ul>
</template>

<script>
  import util from '../util'
  export default{
    name: 'trace-node-list',
    props: {
      /**
       *远程请求地址
       *可在组件上绑定v-on:setNoData 方法，获取是否无数据
       */
      remoteUrl: {
        type: String
      },
      /**
       *远程请求参数
       */
      params: Object,
      /**
       *列表数据参数，不用远程
       */
      nodeListData: Array,
      /**
       *是否可排序
       */
      sortable: Boolean,
      /**
       *是否可编辑
       */
      editable: Boolean,
      /**
       *是否可复制
       */
      copyable: Boolean,
      /**
       *是否可删除
       */
      deleteable: Boolean,
      /*
       * 适配小屏幕 是否显示节点名称
       * */
      isLongInput: Boolean,
      /*
       * 判断是否编辑过内容
       * */
      isModify: Boolean,
      /*
       * 判断是否该节点已采集信息(节点内容有值)
       * */
      isInputCount: Boolean,
      /*
       * 判断是否是添加节点
       * */
      isAddNodeList: Boolean,
      /**
       *编辑节点事件
       */
      editNode: {
        type: Function,
        default: function (node) {
          if (!this.editable) {
            return;
          }
          this.setSelectedStatus(node);
        }
      },
      /*
       * 复制节点事件
       * */
      copyNode: {
        type: Function,
        default: function (node) {
          if ((this.nodeData && !this.isModify) || this.isAddNodeList) {
            this.$message('请先保存当前编辑的节点信息！');
            return false;
          }
          let obj;
          this.$ajax.get(this.traceApiUrl.traceNode.GET_CONFIG_SINGLE, {NodeID: node.nodeID}).then((res) => {
            obj = res.data[0];
            obj.templateType = obj.templateType ? obj.templateType : 0;
            obj.nodeID = '';
            obj.nodeName = '';
            obj.sortID = util.createMaxID(this.nodeList, 'sortID') ? parseInt(util.createMaxID(this.nodeList, 'sortID').sortID) + 1 : 0;
            this.$emit('copyObject', obj);
          });
        }
      },
      /*
       * 用于判断当前是否正在编辑
       * */
      nodeData: {}
    },
    data() {
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        traceApiUrl: traceApiUrl,
        nodeList: [],
        selectedNodeID: ''
      }
    },
    watch: {
      params() {
        this.getData();
      }
    },
    mounted() {
      //this.getData();
    },
    methods: {
      setSelectedStatus(node) {
        this.selectedNodeID = node.nodeID;
        /*for (let i = 0; i < this.nodeList.length; i++) {
         this.$set(this.nodeList[i], 'isSelected', false);
         }
         if (node) {
         this.$set(node, 'isSelected', true);
         }*/
      },
      nodeSort(node, index, sort) {
        if ((this.nodeData && !this.isModify) || this.isAddNodeList) {
          this.$message('请先保存当前编辑的节点信息！');
          return false;
        }
        let param;
        let relateNode = this.nodeList[index + sort];
        if (sort > 0 && index === this.nodeList.length) {
          return;
        }
        if (sort < 0 && index === 0) {
          return;
        }
        //提交请求
        param = [{
          nodeID: node.nodeID,
          sortID: relateNode.sortID
        }, {
          nodeID: relateNode.nodeID,
          sortID: node.sortID
        }];
        this.saveNodeSort(param);
      },
      getData() {
        if (this.nodeListData) {
          this.nodeList = this.nodeListData;
          return;
        }
        this.$ajax.get(this.remoteUrl, this.params).then((r) => {
          if (r.resultCode === '200') {
            this.nodeList = r.data.rows || [];
            if (!this.nodeList.length) {
              this.$emit('setNoData', true);
            }
            for(let i = 0; i < this.nodeList.length; i++){
              let isInputCountFlag = false;
              if (this.nodeList[i].inputCount > 0) {
                isInputCountFlag = true;
              }
              this.$set(this.nodeList[i], 'isInputCount', isInputCountFlag);
            }
          } else {
            this.$message.error(r.msg);
          }
        }).catch((error) => {
          this.$message.error(error);
        });
      },
      goDown(currentNode, i) {
        this.nodeSort(currentNode, i, 1);
      },
      goUp(currentNode, i) {
        this.nodeSort(currentNode, i, -1);
      },
      delNode(currentNode, i) {
        if ((this.nodeData && !this.isModify) || this.isAddNodeList) {
          this.$message('请先保存当前编辑的节点信息！');
          return false;
        }
        if (currentNode.nodeID === '') {
          this.$confirm('确定要取消编辑复制的节点吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('cancelCopy');
          }).catch(() => {
          })
        } else if (!currentNode.nodeID) {
          this.$confirm('确定要取消编辑添加的节点吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('cancelCopy');
          }).catch(() => {
          })
        } else {
          this.$confirm('确定要删除该溯源节点吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = {nodeID: currentNode.nodeID};
            this.$ajax.get(this.traceApiUrl.traceNode.DELETE_TRACE_NODE, param).then((res) => {
              if (res.resultCode == '200') {
                this.nodeList.splice(i, 1);
                this.$emit('cancelCopy');
                this.$message(res.msg);
              } else {
                this.$message.error(res.msg);
              }
            }).catch((error) => {
              this.$message.error(error);
            })
          }).catch(() => {
          });
        }
      },
      saveNodeSort(params) {
        this.$ajax.post(this.traceApiUrl.traceNode.SAVE_NODE_SORT, {data: JSON.stringify(params)}).then((res) => {
          this.$message(res.msg);
          this.$emit('getEditNodeList');
        }).catch((error) => {
          if (error) {
            this.$message.error(error);
          }
        });
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .tracenode-list-content {
    li {
      font-size: 14px;
      border: 1px @ExtraLightSilver solid;
      border-radius: 3px;
      height: 34px;
      color: @ExtraLightBlack;
      margin-bottom: 12px;
      background: #fff;
      cursor: pointer;
      position: relative;

      &:hover, &.current-node {
        background: @ExtraLightGray;
      }

      .node-index {
        position: absolute;
        left: 0;
        top: 8px;
        border-right: 1px @ExtraLightSilver solid;
        width: 35px;
        text-align: center;
      }

      .node-name {
        width: 100%;
        height: 34px;
        line-height: 34px;
        padding: 0 90px 0 47px;
        box-sizing: border-box;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .node-operates {
        position: absolute;
        right: 5px;
        top: 8px;
        i.cjm-icon-rotate-180 {
          vertical-align: middle;
        }
        i {
          font-size: 16px;
          cursor: pointer;
          margin-right: 2px;
        }
      }
    }
  }
</style>
