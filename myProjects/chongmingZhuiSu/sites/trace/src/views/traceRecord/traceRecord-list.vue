<template>
  <div>
    <div v-if="currentPage==='list'">
      <cjm-list ref="list" :request-url="requestUrl" :need-advanced-search="true" baseSearchPlaceholder="输入批次名称" @selection-change="handleSelectionChange">
        <div slot="operate">
          <cjm-button @click="delNodeRecord" :disabled="disableDel">
            <i class="cjm-icon-delete" title="删除"></i>删除
          </cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="批次名称" search-key="productBatchCode" v-model="search.productBatchCode">
            <cjm-input v-model="search.productBatchCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker type="daterange" v-model="search.createTime"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="所属机构" search-key="orgName" v-model="search.orgName">
            <cjm-input v-model="search.orgName"></cjm-input>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column type="selection" width="55"></cjm-table-column>
          <cjm-table-column label="批次名称" prop="productBatchCode" sortable="custom" min-width="160"></cjm-table-column>
          <cjm-table-column label="产品名称" sortable="custom" prop="productName" min-width="140"></cjm-table-column>
          <!--<cjm-table-column label="区块链验证" sortable="custom" min-width="100">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.blockChainStatus != -2 && scope.row.blockChainStatus != 1 && scope.row.blockChainStatus != 0 && scope.row.blockChainStatus != -1">区块链校验中<span class="cjm-check-loading"><i></i><i></i><i></i></span></span>-->
          <!--<span v-if="scope.row.blockChainStatus == -1">未上链</span>-->
          <!--<div v-if="scope.row.blockChainStatus == 0">-->
          <!--<i class="cjm-icon-warn icon-error"></i>-->
          <!--<cjm-tooltip class="item" effect="light" content="数据与区块链上信息不符，点击可查看" placement="right-start">-->
          <!--<cjm-button type="text" @click="blockChainView(scope.row)">验证未通过-->
          <!--</cjm-button>-->
          <!--</cjm-tooltip>-->
          <!--</div>-->
          <!--<div v-if="scope.row.blockChainStatus == 1">-->
          <!--<i class="cjm-icon-confirm icon-passed"></i>-->
          <!--<cjm-tooltip class="item" effect="light" content="数据与区块链上信息吻合，点击可查看" placement="right-start">-->
          <!--<cjm-button type="text" @click="blockChainView(scope.row)">验证通过</cjm-button>-->
          <!--</cjm-tooltip>-->
          <!--</div>-->
          <!--</template>-->
          <!--</cjm-table-column>-->
          <cjm-table-column label="批次创建" prop="createType" enum-namespace="trace" enum-name="批次创建方式" width="100"></cjm-table-column>
          <cjm-table-column label="关联机构" prop="orgName" sortable="custom" min-width="160"></cjm-table-column>
          <cjm-table-column label="创建人" prop="createByName" sortable="custom" width="160"></cjm-table-column>
          <cjm-table-column label="创建时间" prop="createTime" sortable="custom" width="160"></cjm-table-column>
          <cjm-table-column label="最后修改时间" prop="lastUpdateTime" sortable="custom" width="160"></cjm-table-column>
          <cjm-table-column label="溯源信息" prop="traceNodeCount" width="110" fixed="right"></cjm-table-column>
          <cjm-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text" @click="editNodeRecord(scope.row)">编辑</cjm-button>
              <cjm-button type="text" @click="delNodeRecord(scope.row)">删除</cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage==='recordList'">
      <trace-record-edit></trace-record-edit>
    </div>
    <div v-if="currentPage == 'traceBlockChain'">
      <trace-block-chain-view></trace-block-chain-view>
    </div>
  </div>
</template>
<script>
  import traceRecordEdit from './traceRecord-edit.vue';
  import pageSwitch from 'framework/mixins/pageSwitch';
  import traceBlockChainView from 'base/views/blockChain/trace-block-chain-view.vue';
  export default {
    mixins: [pageSwitch],
    components: {
      traceRecordEdit,
      traceBlockChainView
    },
    data() {
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        traceApiUrl: traceApiUrl,
        disableDel: true,
        requestUrl: traceApiUrl.traceRecord.GET_LIST,
        currentPage: 'list',
        search: {
          productBatchCode: '',
          createTime: '',
          orgName: ''
        },
        multipleSelection: [],
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
              this.asynchronousRequestItem(
                verifyChainBlockCount,
                list,
                data,
                index + 1,
                count,
                groupNumber
              );
            }
          })
          .catch(() => {
            //当异常时继续执行下一步的请求
            if (index < count && verifyChainBlockCount == this.verifyChainBlockCount) {
              this.asynchronousRequestItem(
                verifyChainBlockCount,
                list,
                data,
                index + 1,
                count,
                groupNumber
              );
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
          .post(this.$globalData.get('base', 'apiUrl').productBatch.TRACE_VERIFY, {
            productBatchIDs: params
          })
          .then(res => {
            if (res.resultCode == 200) {
              return res.data;
            } else {
              throw new Error(res.msg);
            }
          });
      },
      //查看区块链
      blockChainView(row) {
        this.pushPage('traceBlockChain', '溯源区块链', {productBatchID: row.productBatchID});
      },
      handleSelectionChange(val) {
        if (val.length > 0) {
          this.disableDel = false;
        } else {
          this.disableDel = true;
        }
        this.multipleSelection = val;
      },
      delNodeRecord(row) {
        this.$confirm('真的要删除该批次所有溯源记录吗？', '提示', {type: 'warning'})
          .then(() => {
            let param = {productBatchID: []};
            if (row.productBatchID) {
              param.productBatchID = [row.productBatchID];
            } else {
              let checkeds = this.multipleSelection;
              for (let i = 0; i < checkeds.length; i++) {
                param.productBatchID.push(checkeds[i].productBatchID);
              }
              console.log(param);
            }
            this.$ajax
              .post(this.traceApiUrl.traceRecord.DELETE_TRACE_RECORD, param)
              .then(res => {
                if (res.resultCode === '200') {
                  this.$message(res.msg);
                  this.$refs.list.refresh();
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch(error => {
                if (error) {
                  this.$message.error(error);
                }
              });
          })
          .catch(() => {
          });
      },
      editNodeRecord(row) {
        this.pushPage('recordList', '编辑溯源记录', {
          batchID: row.productBatchID,
          productID: row.productID,
          productName: row.productName,
          productBatchID: row.productBatchID,
          orderType: row.traceNodeOrderType || '1'
        });
      },
      pageSwitched(codes) {
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/css/config';

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
