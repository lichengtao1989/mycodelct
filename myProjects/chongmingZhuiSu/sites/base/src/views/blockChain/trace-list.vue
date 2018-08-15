<template>
  <div>
    <div v-if="currentPage == 'list'">
      <cjm-list :requestUrl="requestUrl" :need-base-search="true" :format-data="formatListData" ref="list">
        <template slot="tableColumns">
          <cjm-table-column prop="productBatchCode" sortable="custom" label="批次名称" min-width="100"></cjm-table-column>
          <cjm-table-column prop="productName" sortable="custom" label="产品名称" min-width="100"></cjm-table-column>
          <cjm-table-column label="区块链验证" sortable="custom" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.blockChainStatus != -2 && scope.row.blockChainStatus != 1 && scope.row.blockChainStatus != 0 && scope.row.blockChainStatus != -1">区块链校验中
                <span class="cjm-check-loading">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
              </span>
              <span v-if="scope.row.blockChainStatus == -1">未上链</span>
              <div v-if="scope.row.blockChainStatus == 0">
                <i class="cjm-icon-warn icon-error"></i>
                <cjm-tooltip class="item" effect="light" content="数据与区块链上信息不符，点击可查看" placement="right-start">
                  <cjm-button type="text" @click="blockChainView(scope.row)">验证未通过
                  </cjm-button>
                </cjm-tooltip>
              </div>
              <div v-if="scope.row.blockChainStatus == 1">
                <i class="cjm-icon-confirm icon-passed"></i>
                <cjm-tooltip class="item" effect="light" content="数据与区块链上信息吻合，点击可查看" placement="right-start">
                  <cjm-button type="text" @click="blockChainView(scope.row)">验证通过</cjm-button>
                </cjm-tooltip>
              </div>
            </template>
          </cjm-table-column>
          <cjm-table-column prop="orgName" sortable="custom" label="关联机构" min-width="100"></cjm-table-column>
          <cjm-table-column prop="lastUpdateTime" sortable="custom" label="最后修改时间" min-width="120"></cjm-table-column>
          <cjm-table-column prop="traceNodeCount" label="溯源信息" min-width="120"></cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage == 'traceBlockChain'">
      <trace-block-chain-view></trace-block-chain-view>
    </div>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import traceBlockChainView from 'base/views/blockChain/trace-block-chain-view.vue';
export default {
  mixins: [pageSwitch],
  components: {
    traceBlockChainView
  },
  data() {
    return {
      requestUrl: this.$globalData.get('base', 'apiUrl').productBatch.GET_PRODUCT_LIST,
      currentPage: 'list',
      verifyChainBlockCount: 0 //验证区块请求计数
    };
  },
  methods: {
    //格式化列表数据
    formatListData(data) {
      let list = this.$refs.list;
      this.verifyChainBlockCount += 1;
      this.asynchronousRequest(list, data);
      return Object.deepClone(data);
    },
    //区块链验证开始异步请求
    asynchronousRequest(list, data) {
      let groupNumber = 5,
        count = Math.ceil(data.length / groupNumber);
      this.asynchronousRequestItem(this.verifyChainBlockCount, list, data, 1, count, groupNumber);
    },
    //区块链异步的单个请求
    asynchronousRequestItem(verifyChainBlockCount, list, data, index, count, groupNumber) {
      let param = data.slice((index - 1) * groupNumber, index * groupNumber);
      this.loadVerfiyResult(param)
        .then(traceVerifyData => {
          let nowData = Object.deepClone(list.tableData);
          for (var i = 0; i < nowData.length; i++) {
            let blockChainStatus = traceVerifyData[nowData[i].productBatchID];
            if (blockChainStatus) {
              nowData[i].blockChainStatus = blockChainStatus;
            }
          }
          this.$nextTick(() => {
            list.tableData = nowData;
          });
          if (index < count && verifyChainBlockCount == this.verifyChainBlockCount) {
            this.asynchronousRequestItem(verifyChainBlockCount, list, data, index + 1, count, groupNumber);
          }
        })
        .catch(() => {
          //当异常时继续执行下一步的请求
          if (index < count && verifyChainBlockCount == this.verifyChainBlockCount) {
            this.asynchronousRequestItem(verifyChainBlockCount, list, data, index + 1, count, groupNumber);
          }
        });
    },
    //加载区块链验证结果
    loadVerfiyResult(data) {
      let params = [];
      for (var i = 0; i < data.length; i++) {
        params.push(data[i].productBatchID);
      }
      return this.$ajax
        .post(this.$globalData.get('base', 'apiUrl').productBatch.TRACE_VERIFY, { productBatchIDs: params })
        .then(res => {
          if (res.resultCode == 200) {
            let traceVerifyData = res.data;
            return traceVerifyData;
          } else {
            throw new Error();
          }
        });
    },
    //查看区块链
    blockChainView(row) {
      this.pushPage('traceBlockChain', '溯源区块链', { productBatchID: row.productBatchID });
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    }
  },
  mounted() {}
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.pointer:hover {
  text-decoration: underline;
  cursor: pointer;
}

.el-button i {
  margin-right: 0;
}

.traceType .el-button + .el-button {
  margin-left: 0;
}

.icon-passed {
  color: #057748;
}

.icon-error {
  color: #f44336;
}

.cjm-check-loading {
  i {
    display: inline-block;
    width: 4px;
    height: 4px;
    margin: 0 2px;
    border-radius: 50%;
    opacity: 0;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    &:nth-child(1) {
      background-color: #88ceff;
      animation-name: cjmCheckLoading1;
    }
    &:nth-child(2) {
      background-color: #4bb5ff;
      animation-name: cjmCheckLoading2;
    }
    &:nth-child(3) {
      background-color: #009cff;
      animation-name: cjmCheckLoading3;
    }
  }
  @keyframes cjmCheckLoading1 {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
  }

  @keyframes cjmCheckLoading2 {
    33% {
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
  }

  @keyframes cjmCheckLoading3 {
    63% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
