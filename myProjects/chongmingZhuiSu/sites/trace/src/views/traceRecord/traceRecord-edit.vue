<template>
  <div>
    <div v-if="currentPage==='recordList'" :style="{maxWidth: hasNoData?null:'800px'}">
      <div class="operates clear">
        <cjm-button class="operate-tool" type="primary" @click="addTraceNode()">
          <i class="cjm-icon-add"></i>添加信息
        </cjm-button>
        <cjm-button class="operate-tool" @click="foldConfig()">
          H5折叠配置
        </cjm-button>
        <cjm-button class="operate-tool" v-if="!hasNoData" @click="spreadNode(true)" :disabled="!isAllowShowAll">
          <i class="cjm-icon-caret-down"></i>全部展开
        </cjm-button>
        <cjm-button class="operate-tool" v-if="!hasNoData" @click="spreadNode(false)" :disabled="!isAllowHideAll">
          <i class="cjm-icon-caret-down cjm-icon-rotate-180" style="vertical-align: middle;"></i>全部折叠
        </cjm-button>
        <div v-if="!hasNoData" class="sort-select operate-tool">
          <cjm-enum-select v-model="sort" enum-namespace="trace" enum-name="溯源记录排序" @change="sortTraceNode"></cjm-enum-select>
        </div>
      </div>
      <div>
        <div class="no-data-msg" v-if="hasNoData">
          <p><img :src="noDataPng" alt=""></p>
          <p>还没有溯源信息，请点击添加信息按钮录溯源哦！</p>
        </div>
        <trace-record-list :remote-url="remoteUrl" @setShowHideAllowStatus="setShowHideAllowStatus" :params="params" @setNoData="setNoDataMsg" ref="detailList"></trace-record-list>
      </div>
    </div>
    <div v-if="currentPage==='recordAdd'">
      <trace-record-add></trace-record-add>
    </div>
    <div v-if="currentPage == 'traceBlockChain'">
      <trace-block-chain-view></trace-block-chain-view>
    </div>
    <cjm-dialog :visible.sync="dialogVisible" :title="dialogTitle" :height="350" :okHandler="confirm">
      <fold-config ref="foldConfig"></fold-config>
    </cjm-dialog>
  </div>
</template>

<script>
  import traceRecordAdd from './components/traceRecord-add.vue';
  import traceRecordList from './components/traceRecord-list.vue';
  import pageSwitch from 'framework/mixins/pageSwitch';
  import noDataPng from 'framework/assets/images/no-data.png';
  import traceBlockChainView from 'base/views/blockChain/trace-block-chain-view.vue';
  import foldConfig from './h5-fold-config.vue'
  export default {
    mixins: [pageSwitch],
    components: {
      traceRecordAdd,
      traceRecordList,
      traceBlockChainView,
      foldConfig
    },
    data() {
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        traceApiUrl: traceApiUrl,
        noDataPng: noDataPng,
        currentPage: 'edit',
        remoteUrl: traceApiUrl.traceRecord.GET_DETAIL_LIST,
        params: {},
        hasNoData: false,
        sort: '1',
        preventSortChange: true, //阻止修改排序,当读取了当前排序后,才允许修改
        isAllowShowAll: false,
        isAllowHideAll: true,
        dialogVisible: false,
        dialogTitle: 'H5折叠配置'
      };
    },
    mounted() {
      this.params = this.getPageParams('recordList');
      this.sort = this.params.orderType || '1';
      this.$nextTick(() => {
        this.preventSortChange = false;
      });
    },
    methods: {
      setShowHideAllowStatus([isAllowShowAll, isAllowHideAll]){
        this.isAllowShowAll = isAllowShowAll;
        this.isAllowHideAll = isAllowHideAll;
      },
      addTraceNode() {
        this.pushPage('recordAdd', '添加信息', this.params);
      },
      //设置H5折叠
      foldConfig() {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.foldConfig.getFold(this.params.productBatchID);
        })
      },
      confirm(callback) {
        this.$refs.foldConfig.setFold().then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          callback();
        }).catch((error) => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
      },
      setNoDataMsg(flag) {
        this.hasNoData = flag;
      },
      spreadNode(flag) {
        if (flag) {
          this.$refs.detailList.showAll();
        } else {
          this.$refs.detailList.hideAll();
        }
      },
      sortTraceNode() {
        if (this.preventSortChange) {
          return;
        }
        this.$ajax.post(this.traceApiUrl.traceRecord.SET_TEACE_NODE_ORDER_TYPE, {
          productBatchID: this.params.productBatchID,
          orderType: this.sort
        }).then(res => {
          if (res.resultCode === '200') {
            this.$message(res.msg);
            this.$refs.detailList.getDetailsList();
            this.setPageParams('recordList', {orderType: this.sort});
          } else {
            this.$message.error(res.msg);
          }
        }).catch(error => {
          if (error) {
            this.$message.error(error);
          }
        });
      },
      pageSwitched(codes) {
        this.currentPage = codes.length > 1 ? codes[1] : 'recordList';
      },
      blockChainView(params) {
        this.pushPage('traceBlockChain', '溯源区块链', params);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/css/config';

  .operates {
    width: 100%;
    min-width: 640px;
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

  .sort-select {
    float: right;
  }

  .operate-tool {
    margin-bottom: 5px;
  }
</style>
