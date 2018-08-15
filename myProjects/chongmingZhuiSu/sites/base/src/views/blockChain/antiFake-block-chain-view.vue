<template>
  <div>
    <block-chain :processNode="processNode" :nodeCodeArray="nodeCodeArray"
                 :traceBlockType="traceBlockType"></block-chain>
  </div>
</template>
<script>
  import blockChain from './components/block-chain.vue'
  import pageSwitch from 'framework/mixins/pageSwitch'
  export default {
    mixins: [pageSwitch],
    components: {
      'block-chain': blockChain
    },
    data(){
      return {
        processNode: {},
        nodeCodeArray: [],
        traceBlockType: 'anti',
        index: 0,
        onlyRead: true,
        nodeCodeList: [
          {nodeCode: 3, nodeName: '下载', beforeNodeCode: [0, 1, 2, 4], modelName: 'OperationDownloadModel'},
          {nodeCode: 4, nodeName: '上传', beforeNodeCode: [0, 1, 2], modelName: 'OperationUploadModel'},
          {nodeCode: 2, nodeName: '生码', beforeNodeCode: [0, 1], modelName: 'OperationGenerateModel'},
          {nodeCode: 1, nodeName: '审核', beforeNodeCode: [0], modelName: 'OperationApproveModel'},
          {nodeCode: 0, nodeName: '码申请', beforeNodeCode: [0], modelName: 'OperationApplyModel'}
        ],
        params: ''
      }
    },
    computed: {
      nodeCodeObj(){
        var nodeCodeObj = {};
        for (var i = 0; i < this.nodeCodeList.length; i++) {
          nodeCodeObj[this.nodeCodeList[i].nodeCode] = this.nodeCodeList[i];
        }
        return nodeCodeObj;
      }
    },
    methods: {
      loadNode(){
        for (let i = 0; i < this.nodeCodeList.length; i++) {
          this.nodeCodeList[i].isExist = true;
        }
        this.nodeCodeArray = this.nodeCodeList;
      },
      //获取防伪区块链详情
      getAntiFakeDetail(){
        return new Promise((resolve) => {
          this.$ajax.get(this.$globalData.get('base', 'apiUrl').blockChain.BLOCK_CHAIN_ANTI_FAKE_DETAIL, {
            codeGenerationID: this.params.codeGenerationID,
            pageSize: 100,
            pageNum: 1
          }).then((res) => {
            if (res.resultCode === '200') {
              resolve(res.data);
            }
          });
        });
      },
      checkAntifakeVerify(){
        return new Promise((resolve, reject) => {
          let param = [];
          param.push(this.params.codeGenerationID);
          this.$ajax.get(this.$globalData.get('code', 'apiUrl').codeGeneration.ANTI_FAKE_VERIFY, {codeGenerationIDs: param}).then((res) => {
            if (res.resultCode === '200') {
              resolve(res.data);
            } else {
              reject(new Error(res.msg));
            }
          }).catch((err) => {
            reject(err);
          });
        });
      },
      //初始化
      init(nodeList){
        //数据处理
        let processNode = {};
        processNode['all'] = {
          nodeArray: [],
          chainNodeArray: []
        };
        for (let i = 0; i < nodeList.length; i++) {
          let nodeItem = nodeList[i];
          processNode[nodeItem.type] || (processNode[nodeItem.type] = {
            nodeArray: [],
            chainNodeArray: []
          });
          let chainNodeArrayItem = {
            blockNo: nodeItem.blockNo,
            transactionHash: nodeItem.transactionHash,
            status: nodeItem.status,
            dataJson: {
              '区块号': nodeItem.blockNo,
              '所在位置': nodeItem.blockHash,
              '交易Hash': nodeItem.transactionHash,
              '交易时间': this.getDateStr(nodeItem.transactionTime)
            }
          };
          let nodeArrayItem = {
            blockNo: nodeItem.blockNo,
            status: nodeItem.status,
            dataJson: this.getNodeData(nodeItem.dataJson),
            nodeJson: {},
            type: nodeItem.type
          };
          nodeArrayItem.nodeJson[this.nodeCodeObj[nodeItem.type].nodeName] = this.getNodeData(nodeItem.entiretyDataJson, this.nodeCodeObj[nodeItem.type].modelName);
          let beforeNodeCode = this.nodeCodeObj[nodeItem.type].beforeNodeCode;
          if (beforeNodeCode && i + 1 != nodeList.length) {
            let beforeNodeItem = nodeList[i + 1], beforeNodeData = {};
            for (let i = 0; i < beforeNodeCode.length; i++) {
              let nodeCodeObjItem = this.nodeCodeObj[beforeNodeCode[i]];
              beforeNodeData[nodeCodeObjItem.nodeName] = this.getNodeData(beforeNodeItem.entiretyDataJson, nodeCodeObjItem.modelName);
            }
            nodeArrayItem.beforeNode = {
              nodeJson: beforeNodeData,
              operateTime: beforeNodeItem.operateTime,
              isCreateOrDelete: beforeNodeItem.isCreateOrDelete,
              status: beforeNodeItem.status
            };
          }
          if (nodeItem.tamperedDataJson) {
            let tamperedNodeData = {};
            for (let i = 0; i < beforeNodeCode.length; i++) {
              let nodeCodeObjItem = this.nodeCodeObj[beforeNodeCode[i]];
              tamperedNodeData[nodeCodeObjItem.nodeName] = this.getNodeData(nodeItem.tamperedDataJson, nodeCodeObjItem.modelName);
            }
            nodeArrayItem.tamperedNode = {
              nodeJson: tamperedNodeData,
              status: -1
            };
          }
          processNode[nodeItem.type].chainNodeArray.push(chainNodeArrayItem);
          processNode['all'].chainNodeArray.push(chainNodeArrayItem);
          processNode[nodeItem.type].nodeArray.push(nodeArrayItem);
          processNode['all'].nodeArray.push(nodeArrayItem);
        }
        //开始渲染
        this.checkAntifakeVerify().then((data) => {
          if (data[this.params.codeGenerationID] == 0) {
            let nodeArray = processNode['all'].nodeArray[0];
            processNode['all'].nodeArray.unshift({
              status: -1,
              codeGenerationID: this.params.codeGenerationID,
              beforeNode: {
                nodeJson: nodeArray.beforeNode ? Object.insertAfter(nodeArray.beforeNode.nodeJson, nodeArray.nodeJson) : nodeArray.nodeJson,
                operateTime: nodeArray.operateTime,
                type: nodeArray.type,
                isCreateOrDelete: nodeArray.isCreateOrDelete,
                status: nodeArray.status
              }
            });
            processNode['all'].chainNodeArray.unshift({
              status: -1
            });
          }
          this.processNode = processNode;
        }).catch(() => {
          this.processNode = processNode;
        });
      },
      //时间
      getDateStr(timeStr) {
        var time = new Date(parseInt(timeStr.substring(0, 10)) * 1000).toString('yyyy-MM-dd HH:mm:ss');
        return time;
      },
      getNodeData(data, key) {
        let operationApplyParamList = {
          'corpId': '企业ID',
          'codeGenerationId': '生码批次号',
          'batchNumber': '生码量',
          'generateBy': '操作人',
          'generateTime': '操作时间',
          'approveBy': '审核人',
          'approveTime': '审核时间',
          'completeTime': '生码完成时间',
          'downloadBy': '下载人',
          'downloadTime': '下载时间',
          'fileName': '码文件名',
          'uploadFileName': '上传文件名',
          'uploadTime': '上传时间'
        };
        let dataJson = {}, dataJsonObj = JSON.parse(data);
        if (key) {
          dataJsonObj = dataJsonObj[key];
        }
        for (let k in dataJsonObj) {
          dataJson[operationApplyParamList[k]] = dataJsonObj[k];
        }
        return dataJson;
      }
    },
    created(){
      this.params = this.getPageParams('antiFakeBlockChain');
      this.loadNode();
      this.getAntiFakeDetail().then((nodeList) => {
        this.init(nodeList);//开始初始化
      });
    }
  }
</script>
<style>
</style>
