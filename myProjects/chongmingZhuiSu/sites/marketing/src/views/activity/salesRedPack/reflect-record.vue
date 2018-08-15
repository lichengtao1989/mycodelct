<template>
  <div class="reflect-record">
    <cjm-alert class="sumAmount" :title="title" type="info" :closable="false" show-icon>
    </cjm-alert>
    <cjm-list :request-url="requestUrl" :need-base-search="true" :need-advanced-search="true" @data-change="listDataChange" @selection-change="selectionChange" base-search-placeholder="账号、机构名称" ref="list">
      <div slot="operate">
        <cjm-button power-code="salesRedPackReflectExport" @click="exportData">
          <i class="cjm-icon-export"></i>导出</cjm-button>
        <cjm-button power-code="salesRedPackReflectOutput" @click="outPut" type="primary" :disabled="!outPutBtnDisabled">批量发放</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="申请时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="审核时间" search-key="auditTime" v-model="search.auditTime">
          <cjm-date-picker v-model="search.auditTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="机构" search-key="orgID" v-model="search.orgID">
          <cjm-remote-select v-model="search.orgID" :remote-url="$globalData.get('marketing', 'apiUrl').autoComplete.ORG">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="账号" search-key="userID" v-model="search.userID">
          <cjm-remote-select v-model="search.userID" value-key="id" label-key="loginName" :remote-url="$globalData.get('marketing', 'apiUrl').autoComplete.USER">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="状态" search-key="status" v-model="search.status">
          <cjm-enum-select v-model="search.status" enum-name="提现记录状态" enum-namespace="marketing" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column type="selection" width="55" :selectable="isDisabledSelect"></cjm-table-column>
        <cjm-table-column prop="orgName" sortable="custom" label="机构" min-width="150"></cjm-table-column>
        <cjm-table-column prop="loginName" sortable="custom" label="账号" width="180"></cjm-table-column>
        <cjm-table-column prop="amount" sortable="custom" label="提现金额" width="120"></cjm-table-column>
        <cjm-table-column prop="createTime" sortable="custom" label="申请时间" width="180"></cjm-table-column>
        <cjm-table-column prop="auditStatus" sortable="custom" enum-name="提现审核" enum-namespace="marketing" label="提现审核" width="120"></cjm-table-column>
        <cjm-table-column prop="auditTime" sortable="custom" label="审核时间" width="180"></cjm-table-column>
        <cjm-table-column prop="status" sortable="custom" label="状态" enum-name="提现记录状态" enum-namespace="marketing"></cjm-table-column>
        <cjm-table-column prop="redPackStatus" sortable="custom" label="红包状态" :width="150" enum-name="红包状态" enum-namespace="marketing">
          <template slot-scope="scope">
            <p v-if="scope.row.redPackStatus == 3" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 150px;">
              {{scope.row.redPackStatusName}}<br> {{scope.row.sendMessage}}
            </p>
            <p v-if="scope.row.redPackStatus == 4">
              {{scope.row.redPackStatusName}}
            </p>
          </template>
        </cjm-table-column>
        <cjm-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <cjm-button type="text" power-code="salesRedPackReflectPut" @click="handleRedBag(scope.row,2)" v-if="scope.row.status === '1'">发放</cjm-button>
            <cjm-button type="text" power-code="salesRedPackReflectPut" @click="handleRedBag(scope.row,3)" v-if="scope.row.status === '1'">没收</cjm-button>
            <cjm-button type="text" power-code="salesRedPackReflectPutDetail" @click="seeDetail(scope.row)" v-if="scope.row.status === '2' && scope.row.existDetails === '1'">发放明细
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog title="发放明细" :visible.sync="dialogVisible" :height="600">
      <cjm-table :data="tableData">
        <cjm-table-column prop="amount" label="红包发放金额"></cjm-table-column>
        <cjm-table-column prop="statusName" label="发放状态"></cjm-table-column>
        <cjm-table-column prop="sendTime" label="发放时间"></cjm-table-column>
        <cjm-table-column prop="note" label="错误信息"></cjm-table-column>
      </cjm-table>
    </cjm-dialog>
  </div>
</template>
<script>
import fileDownload from 'framework/utils/fileDownload';
export default {
  data() {
    return {
      requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack
        .GET_REFLECT_RECORD_LIST,
      search: {
        auditTime: '',
        createTime: '',
        orgID: '',
        userID: '',
        status: '',
        antiFakeCode: '',
        integralMobile: ''
      },
      dialogVisible: false,
      tableData: [],
      amount: '',
      title: '',
      ids: [],
      outPutBtnDisabled: false
    };
  },
  methods: {
    //导出
    exportData() {
      fileDownload(
        this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack
          .EXPORT_REFLECT_RECORD_LIST,
        this.$refs.list.getConditions()
      );
    },
    handleRedBag(row, status) {
      let params = {
        cashID: row.cashID,
        status: status,
        auditby: this.$globalData.get('currentUser').userID
      };
      this.$ajax
        .get(
          this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.CHANGE_CASH_STATUS,
          params
        )
        .then(res => {
          if (res.resultCode === '200') {
            this.$refs.list.refresh();
          } else {
            this.$message(res.msg);
          }
        });
    },
    seeDetail(row) {
      this.dialogVisible = true;
      let params = {
        adhibitionerID: row.cashID
      };
      this.$ajax
        .get(
          this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_RED_PACK_DETAIL,
          params
        )
        .then(res => {
          if (res.resultCode === '200') {
            this.tableData = res.data.rows;
          }
        });
    },
    listDataChange(data) {
      if (data) {
        this.title = '累计提现金额:' + data.sumAmount + '元';
      } else {
        this.title = '累计提现金额:0元';
      }
    },
    isDisabledSelect(row, index) {
      if (row.status == 1) {
        return true;
      } else {
        return false;
      }
    },
    outPut() {
      this.$confirm('是否发放？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          cashID: this.ids,
          status: 2,
          auditby: this.$globalData.get('currentUser').userID
        };
        this.$ajax
          .get(
            this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack
              .GET_BATCH_GUIDE_RED_RECORD_STATUS,
            params
          )
          .then(res => {
            if (res.resultCode === '200') {
              this.$message('发放成功');
              this.$refs.list.refresh();
            } else {
              this.$message(res.msg);
            }
          });
      });
    },
    selectionChange(val) {
      if (val.length > 0) {
        let idsArr = val.map(p => {
          return p.cashID;
        });
        this.ids = idsArr.join(',');
      } else {
        this.ids = [];
      }
    }
  },
  watch: {
    ids(val) {
      if (val && val.length !== 0) {
        this.outPutBtnDisabled = true;
      } else {
        this.outPutBtnDisabled = false;
      }
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../assets/css/config';

.sumAmount {
  margin-bottom: 20px;
}
</style>
