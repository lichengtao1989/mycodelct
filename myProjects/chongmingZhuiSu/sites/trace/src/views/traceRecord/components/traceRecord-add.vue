<template>
  <div>
    <div v-show="hasNoData&&currentPage!='edit'">
      <div class="operates">
        <cjm-button type="primary" @click="configTraceNode()">配置节点</cjm-button>
      </div>
      <div>
        <div class="no-data-msg">
          <p><img :src="noDataPng" alt=""></p>
          <p>本产品尚未配置溯源节点</p>
        </div>
      </div>
    </div>
    <div v-show="!hasNoData" class="clearfix cjm-edit-page" v-if="currentPage==='recordAdd'">
      <div class="nodes-list fl" :style="{height: fullHeight+'px'}">
        <cjm-scrollbar style="height: 100%">
          <h3>溯源节点</h3>
          <p class="product-name">{{productInfo.productName}}</p>
          <trace-node-list :remote-url="nodeListConfig" :params="productInfo" :isInputCount="true" @setNoData="setNoDataMsg" :edit-node='getNodeInfoTemplate' ref="listForDetail"></trace-node-list>
        </cjm-scrollbar>
      </div>
      <div class="node-details fl" :style="{height: fullHeight+'px'}">
        <cjm-scrollbar style="height: 100%">
          <trace-record-edit v-show="showConfigArea" :remote-url="configUrl" :params="paramsForConfig" ref="infoAdd"></trace-record-edit>
          <div class="operate-btns" v-show="showEditBtn">
            <cjm-button type="primary" @click="addNodeConfig" :disabled="isDisabledSubmit"><i class="cjm-icon-save"></i>保存</cjm-button>
            <cjm-button @click="cancleNodeConfig"><i class="cjm-icon-close"></i>取消</cjm-button>
          </div>
        </cjm-scrollbar>
      </div>
    </div>
    <!--编辑溯源节点页面-->
    <div v-if="currentPage==='edit'" class="cjm-edit-page">
      <trace-node-edit-add :edit-type="0" :template-type="0"></trace-node-edit-add>
    </div>
  </div>
</template>

<script>
  import pageSwitch from 'framework/mixins/pageSwitch'
  import TraceNodeList from '../../traceNode/components/traceNode-list.vue'
  import traceNodeEditAdd from '../../traceNode/traceNode-edit-add.vue'
  import TraceRecordEdit from './traceRecord-edit.vue'
  import noDataPng from 'framework/assets/images/no-data.png'

  export default {
    mixins: [pageSwitch],
    components: {
      TraceNodeList,
      TraceRecordEdit,
      traceNodeEditAdd
    },
    name: 'trace-record-add',
    props: {
      /**
       *远程请求地址
       */
      remoteUrl: String,
      /**
       *远程请求参数
       */
      params: Object
    },
    data() {
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        traceApiUrl: traceApiUrl,
        noDataPng: noDataPng,
        configUrl: traceApiUrl.traceRecord.GET_NODE_CONFIG_SIGLE,
        nodeListConfig: traceApiUrl.traceRecord.GET_NODE_CONFIG,
        showEditBtn: false,
        showConfigArea: false,
        fullHeight: 300,
        currentPage: 'nodeConfig',
        productInfoForConfig: {},
        productInfo: {},
        hasNoData: false,
        isDisabledSubmit: false,
        paramsForConfig: {
          nodeID: '',
          nodeName: '',
          batchID: ''
        }
      }
    },
    mounted() {
      this.setBoxHeight();
      this.productInfo = this.getPageParams('recordAdd');
      this.productInfoForConfig = {id: this.productInfo.productID};
    },
    methods: {
      getNodeInfoTemplate(node) {
        this.$refs.listForDetail.setSelectedStatus(node);
        this.showEditBtn = true;
        this.showConfigArea = true;
        this.paramsForConfig.nodeID = node.nodeID;
        this.paramsForConfig.nodeName = node.nodeName;
        this.paramsForConfig.batchID = this.productInfo.batchID;
      },
      setBoxHeight() {
        //高度计算
        this.fullHeight = document.getElementsByClassName('cjm-tab-container')[0].style.minHeight.replace('px', '') - 42 - 15 - 30;
        window.addEventListener('resize', () => {
          let height = document.getElementsByClassName('cjm-tab-container')[0].style.minHeight;
          this.fullHeight = height.replace('px', '') - 42 - 15 - 30;
        });
      },
      setNoDataMsg(flag) {
        this.hasNoData = flag;
      },
      configTraceNode() {
        this.pushPage('edit', '溯源节点配置', this.productInfoForConfig);
      },
      addNodeConfig() {
        this.isDisabledSubmit = true;
        this.$refs.infoAdd.submit().then((res) => {
          this.popPage();
          this.isDisabledSubmit = false;
        }).catch((err) => {
          console.log(err);
          this.isDisabledSubmit = false;
        });
        //console.log()
        /*this.$nextTick(()=> {
         this.$refs.infoAdd.submit().then((res)=> {
         if(res.resultCode == '200'){
         this.$message(res.msg);
         this.popPage();
         }else{
         this.$message.error(res.msg);
         }
         }).catch(()=>{
         this.$message.error('保存失败');
         });
         });*/
      },
      cancleNodeConfig() {
        //取消节点选中状态
        this.$refs.listForDetail.setSelectedStatus({nodeID: ''});
        //隐藏配置页面
        this.showConfigArea = false;
        this.showEditBtn = false;
      },
      pageSwitched(codes){
        this.currentPage = codes.length > 2 ? codes[2] : 'recordAdd';
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../assets/css/config";

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clearfix:after {
    display: block;
    content: '.';
    clear: both;
    height: 0;
    visibility: hidden;
  }

  .nodes-list {
    position: relative;
    width: 40%;
    max-width: 450px;
    overflow-y: hidden;
    background: @DarkWhite;
    border: 1px @ExtraLightGray solid;
    h3 {
      font-size: 16px;
      text-align: center;
      color: @primaryColor;
      margin: 20px 0 5px 0;
    }
    .product-name {
      text-align: center;
      font-size: 14px;
    }
    .tracenode-list-content {
      margin: 15px 30px;
    }
  }

  .node-details {
    overflow-y: hidden;
    border: 1px @ExtraLightGray solid;
    width: 50%;
    max-width: 735px;
    margin-left: 15px;
  }

  .no-tracenode {
    text-align: center;
    margin-top: 40px;
    .el-button--primary {
      margin-top: 10px;
    }
  }

  .operate-btns {
    text-align: center;
    margin-bottom: 20px;
    /* position: absolute;
    bottom: 20px;
    left: 275px; */
  }

  .operates {
    width: 925px;
    padding-bottom: 10px;
    border-bottom: 1px @DarkWhite solid;
  }

  .no-data-msg {
    p {
      width: 100%;
      text-align: center;
      margin: 30px 0 0;
    }
  }
</style>
