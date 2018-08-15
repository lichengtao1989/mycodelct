<template>
  <div class="view-table clear">
    <div class="view-item" :class="{'view-cell':nodeList.length > 1,'deleted-node':item.isCreateOrDelete==2,'created-node':item.isCreateOrDelete==1,'normal-status':item.status == 1,'error-status':item.status == -1,'revise-status':item.status == 0}" :style="'height:' + scrollWrapHeight + 'px;width:' + (nodeList.length > 1?(100/nodeList.length-2):100) +'%'" v-for="(item,key) in nodeList">
      <h5>
        <label class="label-icon normal-icon" v-if="item.status == 1">
          <i class="cjm-icon-confirm inner-icon"></i>
        </label>
        <label class="label-icon exception-icon" v-if="item.status == -1">
          <i class="cjm-icon-warn inner-icon"></i>
        </label>
        <label class="label-icon revise-icon" v-if="item.status == 0">
          <i class="cjm-icon-revise inner-icon"></i>
        </label>
        <span v-if="item.dataType=='current'">当前操作信息</span>
        <span v-if="item.dataType=='error'">修正信息</span>
        <span v-if="item.dataType=='last'">上一次操作信息</span>
      </h5>
      <cjm-scrollbar>
        <div class="scroll-wrap">
          <div v-for="(obj, key) in item.nodeJson" class="content-item clear" v-if="type=='trace'">
            <p class="label-name">{{obj.fieldName}}</p>
            <ul class="img-list content" v-if="obj.fieldType == 2 && obj.fieldValue.length>0">
              <li class="img-item" v-for="(imgObj, index) in obj.fieldValue">
                <img :src="imgObj.url">
                <span v-if="imgObj.title">{{imgObj.title}}</span>
              </li>
            </ul>
            <p v-if="obj.fieldType != 2" class="content">
              {{obj.fieldType == 3 ? (obj.fieldText == '' ? obj.fieldValue : obj.fieldText) : obj.fieldValue}}</p>
          </div>
          <div v-for="(value, key) in item.nodeJson" v-if="type=='anti'">
            <div class="model-title">{{key}}</div>
            <div v-for="(itemValue, itemKey) in value" class="content-item clear">
              <p class="label-name">{{itemKey}}</p>
              <p class="content">{{itemValue}}</p>
            </div>
          </div>
        </div>
      </cjm-scrollbar>
    </div>
    <div v-if="loading" class="loading">
      <img src="static/images/root-loading.gif"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nodeList: [],
      type: '',
      scrollWrapHeight: window.innerHeight - 300,
      loading: false,
      nodeCodeList: [
        {
          nodeCode: 3,
          nodeName: '下载',
          beforeNodeCode: [0, 1, 2, 4],
          modelName: 'OperationDownloadModel'
        },
        {
          nodeCode: 4,
          nodeName: '上传',
          beforeNodeCode: [0, 1, 2],
          modelName: 'OperationUploadModel'
        },
        {
          nodeCode: 2,
          nodeName: '生码',
          beforeNodeCode: [0, 1],
          modelName: 'OperationGenerateModel'
        },
        { nodeCode: 1, nodeName: '审核', beforeNodeCode: [0], modelName: 'OperationApproveModel' },
        { nodeCode: 0, nodeName: '码申请', beforeNodeCode: [0], modelName: 'OperationApplyModel' }
      ]
    };
  },
  computed: {
    nodeCodeObj() {
      var nodeCodeObj = {};
      for (var i = 0; i < this.nodeCodeList.length; i++) {
        nodeCodeObj[this.nodeCodeList[i].nodeCode] = this.nodeCodeList[i];
      }
      return nodeCodeObj;
    }
  },
  methods: {
    showImg(images) {
      return images.map(obj => {
        return obj.url;
      });
    },
    init(beforeData, tamperedData, currentData, type) {
      console.log(beforeData);
      this.nodeList = [];
      this.type = type;
      this.loading = false;
      if (this.type == 'trace' && currentData.status == -1 && currentData.traceNodeID != '') {
        //获取当前修改的溯源节点
        this.loading = true;
        this.$ajax
          .get(this.$globalData.get('base', 'apiUrl').blockChain.GET_CURRENT_TRACE_NODE_INFO, {
            traceNodeID: currentData.traceNodeID
          })
          .then(res => {
            if (res.resultCode === '200') {
              currentData.nodeJson = res.data;
              this.initData(beforeData, tamperedData, currentData);
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else if (
        this.type == 'anti' &&
        currentData.status == -1 &&
        currentData.codeGenerationID != ''
      ) {
        //获取当前的防伪信息
        this.loading = true;
        this.$ajax
          .get(this.$globalData.get('base', 'apiUrl').blockChain.GET_CURRENT_ANTIFAKE_INFO, {
            codeGenerationID: currentData.codeGenerationID
          })
          .then(res => {
            if (res.resultCode === '200') {
              currentData.nodeJson = {};
              let beforeNodeCode = this.nodeCodeObj[beforeData.type].beforeNodeCode;
              if (beforeNodeCode) {
                for (let i = 0; i < beforeNodeCode.length; i++) {
                  let nodeCodeObjItem = this.nodeCodeObj[beforeNodeCode[i]];
                  currentData.nodeJson[nodeCodeObjItem.nodeName] = this.getNodeData(
                    res.data,
                    nodeCodeObjItem.modelName
                  );
                }
              }
              currentData.nodeJson[this.nodeCodeObj[beforeData.type].nodeName] = this.getNodeData(
                res.data,
                this.nodeCodeObj[beforeData.type].modelName
              );
              this.initData(beforeData, tamperedData, currentData);
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.initData(beforeData, tamperedData, currentData);
      }
    },
    initData(beforeData, tamperedData, currentData) {
      let displayNodeList = [];
      beforeData && ((beforeData.dataType = 'last'), displayNodeList.push(beforeData));
      tamperedData && ((tamperedData.dataType = 'error'), displayNodeList.push(tamperedData));
      currentData && ((currentData.dataType = 'current'), displayNodeList.push(currentData));
      if (this.type == 'anti') {
        this.nodeList = displayNodeList;
      }
      if (this.type == 'trace') {
        for (var i = 0; i < displayNodeList.length; i++) {
          let nodeItemData;
          if ((typeof displayNodeList[i].nodeJson).toLowerCase() == 'string') {
            nodeItemData = JSON.parse(displayNodeList[i].nodeJson);
          } else {
            nodeItemData = displayNodeList[i].nodeJson;
          }
          displayNodeList[i].nodeJson = nodeItemData.map(obj => {
            if (obj.fieldType == 2) {
              obj.fieldValue = JSON.parse(obj.fieldValue);
            }
            return obj;
          });
          this.nodeList.push(displayNodeList[i]);
        }
      }
      this.resetWrapHeight();
    },
    getNodeData(data, key) {
      let operationApplyParamList = {
        corpId: '企业ID',
        codeGenerationId: '生码批次号',
        batchNumber: '生码量',
        generateBy: '操作人',
        generateTime: '操作时间',
        approveBy: '审核人',
        approveTime: '审核时间',
        completeTime: '生码完成时间',
        downloadBy: '下载人',
        downloadTime: '下载时间',
        fileName: '码文件名',
        uploadFileName: '上传文件名',
        uploadTime: '上传时间'
      };
      let dataJson = {},
        dataJsonObj = data;
      if (key) {
        dataJsonObj = dataJsonObj[key];
      }
      for (let k in dataJsonObj) {
        dataJson[operationApplyParamList[k]] = dataJsonObj[k];
      }
      return dataJson;
    },
    resetWrapHeight() {
      this.scrollWrapHeight = window.innerHeight - 300;
    }
  }
};
</script>
<style lang="less" scoped="scoped">
.view-table {
  width: 100%;
  position: relative;
  h5 {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background-color: #f4f4f4;
    position: relative;
  }
  .model-title {
    margin: 10px 0;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    background-color: #eae6e6;
  }
  .view-item {
    overflow: hidden;
    position: relative;
    .scroll-wrap {
      padding: 20px 10px 40px;
      position: relative;
      .content-item {
        width: 100%;
        font-size: 14px;
        color: #666666;
        margin-bottom: 10px;
      }
      .label-name {
        font-weight: 600;
        margin: 5px 0;
        float: left;
        width: 110px;
      }
      .content {
        margin: 5px 0;
        float: left;
        word-wrap: break-word;
      }
    }
    .scroll-wrap:after {
      width: 96px;
      height: 37px;
      display: inline-block;
      position: absolute;
      top: 15px;
      right: 12px;
      z-index: 2;
      content: '';
    }
    &.normal-status {
      border: 1px solid #3399ff;
      .scroll-wrap:after {
        background: url('../../../assets/images/chainBlockNodeStatus.png') 0 0 no-repeat;
      }
    }
    &.error-status {
      border: 1px solid #ff3333;
      .scroll-wrap:after {
        background: url('../../../assets/images/chainBlockNodeStatus.png') 0 -37px no-repeat;
      }
    }
    &.revise-status {
      border: 1px solid #99cc00;
      .scroll-wrap:after {
        background: url('../../../assets/images/chainBlockNodeStatus.png') 0 -74px no-repeat;
      }
    }
    &:after {
      width: 60px;
      height: 26px;
      display: inline-block;
      position: absolute;
      bottom: 15px;
      right: 12px;
      z-index: 2;
      content: '';
    }
    &.deleted-node:after {
      background: url('../../../assets/images/chainBlockNodeType.png') 0 -26px no-repeat;
    }
    &.created-node:after {
      background: url('../../../assets/images/chainBlockNodeType.png') 0 0 no-repeat;
    }
  }
  .view-cell {
    float: left;
    margin: 0 0.8%;
    .content {
      width: 184px;
    }
  }
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
  background: #85ca00;
}

.img-list {
  .img-item {
    width: 84px;
    height: 84px;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    span {
      width: 100%;
      height: 25px;
      line-height: 25px;
      text-align: center;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: absolute;
      left: 0;
      bottom: 0;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
