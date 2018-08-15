<template>
  <div>
    <cjm-alert class="sumAmount"
               :title="title"
               type="info"
               :closable="false"
               show-icon>
    </cjm-alert>
    <cjm-list :request-url="requestUrl"
              :need-base-search="true"
              :need-advanced-search="true"
              base-search-placeholder="产品名称、账号、机构名称、防伪码"
              @data-change="listDataChange"
              ref="list">
      <div slot="operate">
        <cjm-button power-code="" @click="exportData"><i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="获得时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="领取时间" search-key="receiveTime" v-model="search.receiveTime">
          <cjm-date-picker v-model="search.receiveTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="机构" search-key="orgID" v-model="search.orgID">
          <cjm-remote-select
            v-model="search.orgID"
            :remote-url="$globalData.get('marketing', 'apiUrl').autoComplete.ORG">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="账号" search-key="userID" v-model="search.userID">
          <cjm-remote-select
            v-model="search.userID"
            value-key="id"
            label-key="loginName"
            :remote-url="$globalData.get('marketing', 'apiUrl').autoComplete.USER">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="产品" search-key="productID" v-model="search.productID">
          <cjm-remote-select v-model="search.productID"
                             :remote-url="$globalData.get('marketing', 'apiUrl').autoComplete.PRODUCT">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="状态" search-key="status" v-model="search.status">
          <cjm-enum-select v-model="search.status" enum-name="领取记录状态" enum-namespace="marketing"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="分类" search-key="classifyID" v-model="search.classifyID">
          <cjm-remote-select v-model="search.classifyID"
                             value-key="classifyID"
                             label-key="classifyName"
                             :remote-url="$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_PRODUCT_CLASSIFY"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="码" search-key="antiFakeCode" v-model="search.antiFakeCode">
          <cjm-input v-model="search.antiFakeCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="会员手机" search-key="integralMobile" v-model="search.integralMobile">
          <cjm-input v-model="search.integralMobile"></cjm-input>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="orgName" sortable="custom" label="机构" min-width="100"></cjm-table-column>
        <cjm-table-column prop="loginName" sortable="custom" label="账号" width="180"></cjm-table-column>
        <cjm-table-column prop="productName" sortable="custom" label="产品" min-width="120"></cjm-table-column>
        <cjm-table-column prop="classifyName" sortable="custom" label="分类" width="150"></cjm-table-column>
        <cjm-table-column prop="antiFakeCode" sortable="custom" label="码" width="200"></cjm-table-column>
        <cjm-table-column prop="integralMobile" sortable="custom" label="会员手机" width="150"></cjm-table-column>
        <cjm-table-column prop="changeValue" sortable="custom" label="积分值" width="100"></cjm-table-column>
        <cjm-table-column prop="amount" sortable="custom" label="红包金额" width="150"></cjm-table-column>
        <cjm-table-column prop="createTime" sortable="custom" label="获得时间" width="150"></cjm-table-column>
        <cjm-table-column prop="receiveTime" sortable="custom" label="领取时间" width="150"></cjm-table-column>
        <cjm-table-column prop="statusName" sortable="custom" label="状态"></cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data(){
      return {
        requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_RECEIVE_RECORD_LIST,
        search: {
          createTime: '',
          receiveTime: '',
          orgID: '',
          userID: '',
          productID: '',
          status: '',
          classifyID: '',
          antiFakeCode: '',
          integralMobile: ''
        },
        title: ''
      }
    },
    methods: {
      exportData(){
        fileDownload(this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.EXPORT_RECEIVE_RECORD_LIST, this.$refs.list.getConditions());
      },
      listDataChange(data){
        if (data) {
          this.title = '累计领取金额:' + data.sumAmount + '元';
        } else {
          this.title = '累计领取金额:0元';
        }
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .sumAmount {
    margin-bottom: 20px;
  }
</style>
