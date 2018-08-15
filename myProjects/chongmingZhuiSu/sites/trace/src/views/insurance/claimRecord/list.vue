<template>
  <div>
    <div v-if="currentPage=='list'">
      <cjm-list ref="list" :request-url="requestUrl" :need-advanced-search="true"
                :need-base-search="false">
        <div slot="search">
          <cjm-search-item label="报案时间" search-key="lastUpdateTime" v-model="search.lastUpdateTime">
            <cjm-date-picker v-model="search.lastUpdateTime"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="报案人" search-key="policyHoldersName" v-model="search.policyHoldersName">
            <cjm-input v-model="search.policyHoldersName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="报案手机" search-key="policyHoldersMobile" v-model="search.policyHoldersMobile">
            <cjm-input v-model="search.policyHoldersMobile"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="审核状态"
                           search-key="insuranceCompensationStatus"
                           v-model="search.insuranceCompensationStatus">
            <cjm-enum-select v-model="search.insuranceCompensationStatus"
                             enum-name="保险审核状态"
                             enum-namespace="trace"
                             :clearable="true"></cjm-enum-select>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">          
          <cjm-table-column prop="insureCompany" label="保险公司" width="120"></cjm-table-column>
          <cjm-table-column prop="compensationContents" label="理赔项目" width="320"></cjm-table-column>
          <cjm-table-column prop="policyHoldersName" label="报案人" width="160"></cjm-table-column>
          <cjm-table-column prop="policyHoldersMobile" label="报案手机" width="200"></cjm-table-column>
          <cjm-table-column prop="code" label="产品码" width="180"></cjm-table-column>
          <cjm-table-column prop="insureTypeName" label="险种" width=""></cjm-table-column>
          <cjm-table-column prop="insuranceCompensationStatusName" label="审核状态" width="120"></cjm-table-column>
          <cjm-table-column prop="lastUpdateTime" label="报案时间" width="180"></cjm-table-column>
          <cjm-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <cjm-tooltip content="查看"
                           v-if="scope.row.insuranceCompensationStatus==1 || scope.row.insuranceCompensationStatus==5 || isCorp">
                <cjm-button type="text" @click="showClaimDetail(scope.row)">查看</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="审核"
                           v-if="scope.row.insuranceCompensationStatus!=1 && scope.row.insuranceCompensationStatus!=5 && !isCorp">
                <cjm-button type="text" @click="auditClaimDetail(scope.row)">审核</cjm-button>
              </cjm-tooltip>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage=='view'">
      <claim-detail ref="claimDetail"></claim-detail>
    </div>
  </div>
</template>

<script>
  import pageSwitch from 'framework/mixins/pageSwitch';
  import claimDetail from './edit';
  export default {
    components: {
      'claim-detail': claimDetail
    },
    mixins: [pageSwitch],
    data() {
      return {
        search: {
          lastUpdateTime: '',
          policyHoldersName: '',
          policyHoldersMobile: '',
          insuranceCompensationStatus: ''
        },
        requestUrl: this.$globalData.get('trace', 'apiUrl').insurance.claim.GET_LIST,
        isCorp: true,
        currentPage: 'list'
      }
    },
    methods: {
      showClaimDetail(row){
        this.pushPage('view', '查看', {id: row.insuranceCompensationID, type: 'view'});
      },
      auditClaimDetail(row){
        this.pushPage('view', '审核', {id: row.insuranceCompensationID, type: 'audit'});
      },
      pageSwitched(codes){
        this.currentPage = codes.length > 0 ? codes[0] : 'list';
      }
    },
    created(){
      this.$ajax.get(this.$globalData.get('trace', 'apiUrl').insurance.claim.CHECK_LOGIN).then((r) => {
        if (r.resultCode == 200) {
          this.isCorp = r.data == 0;
        }
      });
    }
  }
</script>
<style scoped>

</style>
