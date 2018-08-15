<!-- -->
<template>
  <div>
    <cjm-alert class="sumAmount" :title="title" type="info" :closable="false" show-icon>
    </cjm-alert>
    <cjm-list ref="list" :request-url="requestUrl" @data-change="listDataChange" :need-base-search="true"
              :need-advanced-search="true">
      <div slot="operate">
        <cjm-button type="primary" class="cjm-icon-export" @click="exportData">导出</cjm-button>
        <cjm-upload class="upload-file" name="fileData" :on-success="uploadSuccess" :show-file-list="false"
                    :action="$globalData.get('marketing', 'apiUrl').activity.voucher.IMPORT_DEDUCTIBLE_ORDER_CODE">
          <cjm-button class="cjm-icon-import">导入</cjm-button>
        </cjm-upload>
      </div>
      <div slot="search">
        <cjm-search-item label="订单时间" v-model="search.createTime" search-key="createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange" :picker-options="options"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="券名称" v-model="search.voucherName" search-key="voucherName">
          <cjm-input v-model="search.voucherName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="产品名称" v-model="search.productID" search-key="productID">
          <cjm-remote-select :remote-url="$globalData.get('marketing', 'apiUrl').autoComplete.PRODUCT"
                             v-model="search.productID"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="收货人" v-model="search.receiverName" search-key="receiverName">
          <cjm-input v-model="search.receiverName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="状态" v-model="search.smsStatus" search-key="smsStatus">
          <cjm-enum-select enum-name="兑换券短信状态" enum-namespace="marketing" v-model="search.smsStatus"></cjm-enum-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column sortable="custom" prop="orderCode" label="交易号" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="voucherName" label="券名称" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="voucherCode" label="折扣码" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="voucherNumber" label="数量" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="productCode" label="产品编号" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="productName" label="产品名称" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="productPrice" label="销售单价" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="discountAmount" label="折扣金额" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="paymentAmount" label="支付金额" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="paymentCode" label="支付流水号" width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="receiverName" label="收货人" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="receiverPhone" label="收货人手机" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="receiverAddress" label="收货地址" min-width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="province" label="省" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="city" label="市" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="district" label="区" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="paymentTime" label="支付时间" width="180"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="expressCode" label="快递单号" width="150"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="expressCorp" label="快递公司" min-width="120"></cjm-table-column>
        <cjm-table-column sortable="custom" prop="smsStatusName" label="订单状态" width="120"></cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>

<script>
  import fileDownload from 'framework/utils/fileDownload';
  export default {
    data() {
      return {
        requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.voucher.DEDUCTIBLE_ORDER_LIST,
        search: {
          createTime: '',
          voucherName: '',
          productID: '',
          receiverName: '',
          orderStatus: '',
          smsStatus: ''
        },
        title: '',
        options: {
          disabledDate(time){
            return false;
          }
        }
      };
    },

    components: {},

    computed: {},

    methods: {
      exportData() {
        fileDownload(
          this.$globalData.get('marketing', 'apiUrl').activity.voucher.DEDUCTIBLE_EXPORT_LIST,
          this.$refs.list.getConditions()
        );
      },
      uploadSuccess(res){
        if (res.resultCode === '200') {
          this.$message.success(res.msg);
          this.$refs.list.refresh();
        } else {
          this.$message.error(res.msg);
        }
      },
      listDataChange(data){
        if (data && data.sumAmount) {
          this.title = '支付金额累计:' + data.sumAmount + '元';
        } else {
          this.title = '支付金额累计:0元';
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .upload-file {
    display: inline-block;
  }

  .sumAmount {
    margin-bottom: 10px;
  }
</style>
