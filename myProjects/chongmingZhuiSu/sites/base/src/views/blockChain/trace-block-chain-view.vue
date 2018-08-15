<template>
  <div>
    <block-chain :processNode="processNode" :nodeCodeArray="nodeCodeArray" :currentNodeCode="currentNodeCode" :nodeObject="nodeObject"></block-chain>
  </div>
</template>
<script>
import blockChain from './components/block-chain.vue';
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  mixins: [pageSwitch],
  components: {
    'block-chain': blockChain
  },
  data() {
    return {
      type: 'trace', //类型
      nodeObject: [],
      processNode: {}, //右边区块节点
      nodeCodeArray: [], //左边节点tab数据
      currentNodeCode: '', //当前选中的节点
      params: '', //页面参数
      nodeCodeList: [], //临时存储
      nodeCodeIDArray: [] //临时存储
    };
  },
  methods: {
    init(nodeList) {
      //数据处理
      let processNode = {};
      processNode['all'] = {
        nodeArray: [],
        chainNodeArray: []
      };
      for (let i = 0; i < nodeList.length; i++) {
        let nodeItem = nodeList[i];
        processNode[nodeItem.nodeId] ||
          (processNode[nodeItem.nodeId] = {
            nodeArray: [],
            chainNodeArray: []
          });
        let chainNodeArrayItem = {
          blockNo: nodeItem.blockNo,
          status: nodeItem.status,
          transactionHash: nodeItem.transactionHash,
          dataJson: {
            交易Hash: nodeItem.transactionHash,
            区块号: nodeItem.blockNo,
            所在位置: nodeItem.blockHash,
            交易时间: this.getDateStr(nodeItem.transactionTime)
          }
        };
        let nodeArrayItem = {
          blockNo: nodeItem.blockNo,
          status: nodeItem.status,
          nodeId: nodeItem.nodeId,
          nodeJson: nodeItem.nodeJson,
          operateTime: this.getDateStr(nodeItem.transactionTime),
          isCreateOrDelete: nodeItem.isCreateOrDelete,
          dataJson: {
            批次名称: nodeItem.productBatchName,
            节点名称: nodeItem.nodeName,
            操作时间: this.getDateStr(nodeItem.transactionTime)
          }
        };
        let nodeArrayLength = processNode[nodeItem.nodeId].nodeArray.length;
        nodeArrayLength > 0 &&
          (processNode[nodeItem.nodeId].nodeArray[nodeArrayLength - 1].beforeNode = {
            nodeJson: nodeArrayItem.nodeJson,
            operateTime: nodeArrayItem.operateTime,
            isCreateOrDelete: nodeArrayItem.isCreateOrDelete,
            status: nodeArrayItem.status
          });
        if (nodeItem.tamperedDataJson) {
          nodeArrayItem.tamperedNode = {
            nodeJson: nodeItem.tamperedDataJson,
            status: -1
          };
        }
        processNode[nodeItem.nodeId].chainNodeArray.push(chainNodeArrayItem);
        //          processNode['all'].chainNodeArray.push(chainNodeArrayItem);
        processNode[nodeItem.nodeId].nodeArray.push(nodeArrayItem);
        processNode['all'].nodeArray.push(nodeArrayItem);
      }
      //开始渲染
      if (this.nodeCodeList.length > 0) {
        this.addNodeErrorStatus(processNode);
      }
      this.processNode = processNode;
    },
    //添加异常节点
    addNodeErrorStatus(processNode) {
      for (let i = 0; i < this.nodeCodeList.length; i++) {
        let nodeCodeItem = this.nodeCodeList[i];
        if (nodeCodeItem.isError) {
          let nodeArray = processNode[nodeCodeItem.nodeCode].nodeArray[0];
          processNode[nodeCodeItem.nodeCode].nodeArray.unshift({
            status: -1,
            traceNodeID: nodeCodeItem.nodeCode,
            beforeNode: {
              nodeJson: nodeArray.nodeJson,
              operateTime: nodeArray.operateTime,
              isCreateOrDelete: nodeArray.isCreateOrDelete,
              status: nodeArray.status
            }
          });
          processNode[nodeCodeItem.nodeCode].chainNodeArray.unshift({
            status: -1
          });
        }
      }
    },
    //时间
    getDateStr(timeStr) {
      var time = new Date(parseInt(timeStr.substring(0, 10)) * 1000).toString(
        'yyyy-MM-dd HH:mm:ss'
      );
      return time;
    },
    //获取溯源区块链详情
    getTraceDetail() {
      return new Promise(resolve => {
        this.$ajax
          .get(this.$globalData.get('base', 'apiUrl').blockChain.BLOCK_CHAIN_TRACE_DETAIL, {
            productBatchID: this.params.productBatchID,
            pageSize: 500,
            pageNum: 1
          })
          .then(res => {
            if (res.resultCode === '200') {
              resolve(res.data.rows || []);
            }
          });
      });
    },
    //获取节点列表
    getNodeList() {
      return new Promise(resolve => {
        this.$ajax
          .get(this.$globalData.get('base', 'apiUrl').blockChain.GET_NODE_LIST, {
            batchID: this.params.productBatchID,
            includeDeleted: 1
          })
          .then(res => {
            if (res.resultCode === '200' && res.data.rows.length > 0) {
              this.nodeObject = res.data.rows;
              this.nodeCodeList = res.data.rows.map(item => {
                let isExist = item.status != -1;
                this.nodeCodeIDArray.push(item.traceNodeID);
                return {
                  nodeCode: item.traceNodeID,
                  nodeName: item.nodeName,
                  isExist: isExist,
                  nodeJson: item
                };
              });
              this.nodeCodeArray = Object.deepClone(this.nodeCodeList);
              resolve();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(error => {
            if (error) {
              this.$message.error(error);
            }
          });
      });
    },
    //验证节点
    getNodeVerify() {
      return new Promise(resolve => {
        let getNodeVerify = {
          traceNodeIDs: this.nodeCodeIDArray,
          productBatchID: this.params.productBatchID
        };
        this.$ajax
          .post(this.$globalData.get('base', 'apiUrl').blockChain.TRACE_NODE_VERIFY, getNodeVerify)
          .then(res => {
            if (res.resultCode === '200') {
              let result = res.data;
              for (var i = 0; i < this.nodeCodeIDArray.length; i++) {
                this.nodeCodeList[i].isError = result[this.nodeCodeList[i].nodeCode] == 0;
              }
              this.nodeCodeArray = Object.deepClone(this.nodeCodeList);
              let processNode = Object.deepClone(this.processNode);
              if (processNode && JSON.stringify(processNode) != '{}') {
                this.addNodeErrorStatus(processNode);
                this.processNode = processNode;
              }
              resolve();
            }
          })
          .catch(error => {
            if (error) {
              this.$message.error(error);
            }
          });
      });
    }
  },
  created() {
    this.params = this.getPageParams('traceBlockChain');
    this.currentNodeCode = this.params.traceNodeID;
    this.getNodeList().then(() => {
      this.getNodeVerify();
    });
    this.getTraceDetail().then(nodeList => {
      this.init(nodeList); //开始初始化
    });
  }
};
</script>
<style>

</style>
