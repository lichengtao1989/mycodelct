<template>
  <div>
    <div v-if="currentPage == 'list'">
      <cjm-list ref="list" :request-url="apiUrl.codeGeneration.GET_LIST" :need-advanced-search="true" base-search-placeholder="输入组织ID、名称、批次号" @selection-change="handleSelectionChange">
        <div slot="operate">
          <cjm-button power-code="CodeGenerationAdd" @click="add" type="primary">
            <i class="cjm-icon-add"></i>新增
          </cjm-button>
          <cjm-button power-code="CodeGenerationSubmit" @click="batchCommit" :disabled="batchCommitDisabled">
            <i class="cjm-icon-confirm"></i>提交
          </cjm-button>
          <cjm-button power-code="CodeGenerationDelete" @click="batchDel" :disabled="batchDelDisabled">
            <i class="cjm-icon-delete"></i>删除
          </cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="组织" search-key="corpID" v-model="search.corpID">
            <cjm-remote-select v-model="search.corpID" :remote-url="apiUrl.autoComplete.CORP">
              <template slot-scope="scope">
                {{scope.item.name}}
                <span class="cjm-option-subtitle">（{{scope.item.id}}）</span>
              </template>
            </cjm-remote-select>
          </cjm-search-item>
          <cjm-search-item label="生码批次" search-key="batchID" v-model="search.batchID">
            <cjm-input v-model="search.batchID"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="文件名标注" search-key="fileNameLabel" v-model="search.fileNameLabel">
            <cjm-input v-model="search.fileNameLabel"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="生码状态" search-key="status" v-model="search.status">
            <cjm-enum-select v-model="search.status" enum-name="生码状态" enum-namespace="code" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="审核状态" search-key="isApprove" v-model="search.isApprove">
            <cjm-enum-select v-model="search.isApprove" enum-name="生码审核状态" enum-namespace="code" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="是否码上淘" search-key="isMST" v-model="search.isMST">
            <cjm-enum-select v-model="search.isMST" enum-name="是否" enum-namespace="code" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="是否含SV" search-key="isSV" v-model="search.isSV">
            <cjm-enum-select v-model="search.isSV" enum-name="是否" enum-namespace="code" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column type="selection" label="全选" width="55" fixed="left"></cjm-table-column>
          <cjm-table-column prop="corpID" label="组织ID" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="corpName" label="组织名称" min-width="150" sortable="custom"></cjm-table-column>
          <!--<cjm-table-column label="区块链验证" sortable="custom" min-width="100">-->
          <!--<template slot-scope="scope">-->
          <!--<span-->
          <!--v-if="scope.row.blockChainStatus != -2 && scope.row.blockChainStatus != 1 && scope.row.blockChainStatus != 0 && scope.row.blockChainStatus != -1">区块链校验中<span-->
          <!--class="cjm-check-loading"><i></i><i></i><i></i></span></span>-->
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
          <cjm-table-column prop="relatedProductName" label="产品" min-width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="batchID" label="批次号" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="fileNameLabel" label="文件名标注" width="150"></cjm-table-column>
          <cjm-table-column prop="batchNumber" label="生码量" width="100" sortable="custom" :formatter="formatterBatchNumber"></cjm-table-column>
          <cjm-table-column prop="status" label="状态" width="150" :formatter="formatterStatus"></cjm-table-column>
          <cjm-table-column prop="labelType" label="标签类型" min-width="160"></cjm-table-column>
          <cjm-table-column prop="logisticsCodeType" label="物流码类型" min-width="140"></cjm-table-column>
          <cjm-table-column prop="" label="对应比例" width="120" :formatter="formatterLayerNumber"></cjm-table-column>
          <cjm-table-column prop="" label="序列号" width="150" :formatter="formatterSerialNumber"></cjm-table-column>
          <cjm-table-column prop="factoryName" label="印刷工厂" min-width="120" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="createName" label="创建人" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="createTime" label="创建时间" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="generateName" label="提交人" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="generateTime" label="提交时间" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="approveName" label="审批人" width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="approveTime" label="审批时间" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="exportTime" label="导出时间" width="160" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="isSV" label="含SV" width="95" sortable="custom" enum-name="是否" enum-namespace="code"></cjm-table-column>
          <cjm-table-column prop="sVComposeStatus" label="SV状态" width="110" sortable="custom" enum-name="SV状态" enum-namespace="code"></cjm-table-column>
          <cjm-table-column prop="isMST" label="码上淘" width="105" sortable="custom" enum-name="是否" enum-namespace="code"></cjm-table-column>
          <cjm-table-column label="操作" width="280" fixed="right" :show-overflow-tooltip="false">
            <template slot-scope="scope">
              <cjm-button type="text" power-code="CodeGenerationView" v-if="showViewButton" @click="view(scope.row.id)">查看
              </cjm-button>
              <cjm-button type="text" power-code="CodeGenerationEdit" @click="edit(scope.row.id)">编辑
              </cjm-button>
              <cjm-button type="text" power-code="CodeGenerationCopy" @click="copy(scope.row.id)">复制
              </cjm-button>
              <cjm-button type="text" power-code="CodeGenerationSubmit" v-if="scope.row.status==enums.codeGenerationStatus.ENTERED" @click="commit(scope.row.id)">提交
              </cjm-button>
              <cjm-button type="text" power-code="CodeGenerationAudit" v-if="scope.row.status==enums.codeGenerationStatus.COMMITTED && scope.row.isApprove!=enums.codeApproveStatus.PASS" @click="approve(scope.row.id)">审核
              </cjm-button>
              <cjm-button type="text" power-code="CorpCodeGenerationApprove" v-if="scope.row.isAlterApproved==enums.codeAlterApproveStatus.NONE" @click="alterApprove(scope.row.id)">变更审核
              </cjm-button>
              <cjm-button type="text" power-code="CodeGenerationDelete" @click="del(scope.row.id)">删除
              </cjm-button>
              <cjm-button type="text" power-code="CodeGenerationExport" v-if="scope.row.canExport==1 && scope.row.status>=enums.codeGenerationStatus.GENERATED" @click="exportCodes(scope.row.id, false)">导出
              </cjm-button>
              <cjm-button type="text" power-code="CodeGenerationExportTestCode" v-if="scope.row.status>=enums.codeGenerationStatus.GENERATED" @click="exportCodes(scope.row.id, true)">导出测试码
              </cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>

      <edit ref="editDialog" :visible.sync="dialogVisible" @submitSuccess="$refs.list.refresh()" @approveSuccess="$refs.list.refresh()"></edit>

      <cjm-dialog ref="smsDialog" title="短信验证" :visible.sync="smsDialogVisible" :ok-handler="smsSubmit">
        <sms ref="smsPage"></sms>
      </cjm-dialog>

      <cjm-dialog ref="alterApproveDialog" title="变更审核" :visible.sync="alterApproveDialogVisible" :ok-handler="alterApproveSubmit">
        <alter-approve-edit ref="alterApprovePage"></alter-approve-edit>
      </cjm-dialog>

      <export-codes ref="exportCodesDialog" :visible.sync="exportCodesDialogVisible"></export-codes>
    </div>
    <div v-if="currentPage == 'antiFakeBlockChain'">
      <antifake-block-chain-view></antifake-block-chain-view>
    </div>
  </div>
</template>

<script>
import Edit from './edit.vue';
import Sms from './sms.vue';
import AlterApproveEdit from './alterApproveEdit.vue';
import ExportCodes from './exportCodes.vue';
import pageSwitch from 'framework/mixins/pageSwitch';
import antifakeBlockChainView from 'base/views/blockChain/antiFake-block-chain-view.vue';
import bigInt from 'big-int';
export default {
  mixins: [pageSwitch],
  components: {
    Edit,
    Sms,
    AlterApproveEdit,
    ExportCodes,
    antifakeBlockChainView
  },
  data() {
    return {
      enums: this.$globalData.get('code', 'enums'),
      apiUrl: this.$globalData.get('code', 'apiUrl'),
      //是否显示弹框
      dialogVisible: false,
      //短信框
      smsDialogVisible: false,
      //变更审核
      alterApproveDialogVisible: false,
      //导出文件弹框
      exportCodesDialogVisible: false,
      //选中的行
      selectedRows: [],
      //搜索项
      search: {
        corpID: '',
        batchID: '',
        fileNameLabel: '',
        status: '',
        isApprove: '',
        isMST: '',
        isSV: '',
        createTime: ''
      },
      activeStep: 0,
      stepNum: 2,
      //短信验证之后的回调函数
      smsCheckedCallback: null,
      currentPage: 'list',
      verifyChainBlockCount: 0 //计数
    };
  },
  computed: {
    //是否显示查看按钮
    showViewButton() {
      //如果用户有编辑权限，则不需要显示查看按钮
      const powerCodes = this.$globalData.get('powerCodes');
      if (powerCodes && powerCodes.includes('CodeGenerationEdit'.toLowerCase())) {
        return false;
      } else {
        return true;
      }
    },
    //批量提交是否禁用
    batchCommitDisabled() {
      if (this.selectedRows.length === 0) {
        return true;
      }
      for (let i = 0, len = this.selectedRows.length; i < len; i++) {
        if (this.selectedRows[i].status !== this.enums.codeGenerationStatus.ENTERED) {
          return true;
        }
      }
      return false;
    },
    //批量删除是否禁用
    batchDelDisabled() {
      if (this.selectedRows.length === 0) {
        return true;
      }
      return false;
    }
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
      this.loadAntiFakeVerifyResult(param)
        .then(antiFakeVerifyData => {
          let nowData = Object.deepClone(list.tableData);
          for (var i = 0; i < nowData.length; i++) {
            let blockChainStatus = antiFakeVerifyData[nowData[i].id];
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
    loadAntiFakeVerifyResult(data) {
      let params = [];
      for (var i = 0; i < data.length; i++) {
        params.push(data[i].id);
      }
      return new Promise(resolve => {
        this.$ajax.post(this.$globalData.get('code', 'apiUrl').codeGeneration.ANTI_FAKE_VERIFY, { codeGenerationIDs: params }).then(res => {
          if (res.resultCode == 200) {
            let antiFakeVerifyData = res.data;
            resolve(antiFakeVerifyData);
          }
        });
      });
    },
    //查看区块链
    blockChainView(row) {
      this.pushPage('antiFakeBlockChain', '防伪区块链', { codeGenerationID: row.id });
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    },
    //新增
    add() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editDialog.addForm();
      });
    },
    //编辑
    edit(id) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editDialog.editForm(id);
      });
    },
    //查看
    view(id) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editDialog.viewForm(id);
      });
    },
    //复制
    copy(id) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editDialog.copyForm(id);
      });
    },
    //审核
    approve(id) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editDialog.approveForm(id);
      });
    },
    //变更审核
    alterApprove(id) {
      this.alterApproveDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.alterApprovePage.initForm(id);
      });
    },
    //变更审核提交
    alterApproveSubmit(callback) {
      this.$refs.alterApprovePage
        .submit()
        .then(() => {
          this.alterApproveDialogVisible = false;
          this.$refs.list.refresh();
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    //提交
    commit(ids) {
      if (!ids) {
        throw new Error('commit参数格式不正确');
      }
      if (typeof ids === 'string') {
        ids = [ids];
      } else if (!Array.isArray(ids)) {
        throw new Error('commit参数格式不正确');
      }

      this.$ajax.post(this.apiUrl.codeGeneration.COMMIT, { ids: ids }).then(r => {
        if (r.resultCode == '200') {
          //正常流程
          this.$message.success('提交成功');
          this.$refs.list.refresh();
        } else if (r.resultCode == '601') {
          //601需要短信验证
          this.smsDialogVisible = true;
          this.smsCheckedCallback = () => {
            this.commit(ids);
          };
          this.$nextTick(() => {
            this.$refs.smsPage.initForm();
          });
        } else {
          this.$message.error(r.msg);
        }
      });
    },
    //批量提交
    batchCommit() {
      const ids = this.selectedRows.map(r => {
        return r.id;
      });
      this.commit(ids);
    },
    //删除
    del(ids) {
      if (!ids) {
        throw new Error('del参数格式不正确');
      }
      if (typeof ids === 'string') {
        ids = [ids];
      } else if (!Array.isArray(ids)) {
        throw new Error('del参数格式不正确');
      }
      this.$confirm('是否确认删除？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$ajax.post(this.apiUrl.codeGeneration.DELETE, { ids: ids }).then(r => {
            if (r.resultCode == '200') {
              //正常流程
              this.$message.success('删除成功');
              this.$refs.list.refresh();
            } else {
              this.$message.error(r.msg);
            }
          });
        })
        .catch(() => {});
    },
    //批量删除
    batchDel() {
      const ids = this.selectedRows.map(r => {
        return r.id;
      });
      this.del(ids);
    },
    //导出码
    exportCodes(id, isTest = true) {
      this.exportCodesDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.exportCodesDialog.initForm(id, isTest);
      });
    },
    //列表项选择
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    //短信框的确认按钮处理函数
    smsSubmit(callback) {
      this.$refs.smsPage
        .submit()
        .then(() => {
          this.smsDialogVisible = false;
          if (this.smsCheckedCallback) {
            this.smsCheckedCallback();
          }
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    //格式化状态列
    formatterStatus(row) {
      let result = '';
      for (let key in this.enums['生码状态']) {
        if (this.enums['生码状态'][key] == row.status) {
          result += key + '，';
        }
      }
      for (let key in this.enums['生码审核状态']) {
        if (this.enums['生码审核状态'][key] == row.isApprove) {
          result += key;
        }
      }
      return result;
    },
    //格式化生码量
    formatterBatchNumber(row, column, cellValue) {
      if (cellValue >= 10000) {
        let num1 = Math.floor(cellValue / 10000);
        let num2 = cellValue % 10000;
        return num1 + '万' + (num2 !== 0 ? num2 : '');
      }
      return cellValue;
    },
    //格式化对应关系
    formatterLayerNumber(row, column, cellValue) {
      if (row.layerNumber == this.enums.layerNumber.THREE) {
        return `1 : ${row.layer2Number} : ${row.layer3Number}`;
      } else if (row.layerNumber == this.enums.layerNumber.TWO) {
        return `${row.layer2Number} : ${row.layer3Number}`;
      } else {
        return '';
      }
    },
    //格式化序列号
    formatterSerialNumber(row, column, cellValue) {
      if (row.serialNumberIncreasing) {
        let endNum = bigInt(row.serialNumberIncreasing)
          .add(parseInt(row.batchNumber) - 1)
          .val();
        if (endNum.length < row.serialNumberIncreasing.length) {
          let len = row.serialNumberIncreasing.length - endNum.length;
          for (let i = 0; i < len; i++) {
            endNum = '0' + endNum;
          }
        }
        return row.serialNumberPrefix + row.serialNumberIncreasing + row.serialNumberSuffix + ' ~ ' + row.serialNumberPrefix + endNum + row.serialNumberSuffix;
      }
      return '';
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
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
