<template>
  <div>
    <nz-list :requestUrl="$apiUrl.FARMERSFILING.GET_LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="输入生产主体、身份证号、手机号搜索">
      <div slot="operate" v-if="userInfo.role!=3">
        <nz-button type="primary" size="small">
          <i class="nz-icon-export"></i>
          <span>导入</span>
        </nz-button>
        <nz-button size="small">
          <i class="nz-icon-import"></i>
          <span>下载导入模版</span>
        </nz-button>
      </div>
      <div slot="search">
        <nz-search-item label="生产主体" search-key="ProductMainPart" v-model="search.ProductMainPart">
          <nz-input v-model="search.ProductMainPart"></nz-input>
        </nz-search-item>
        <nz-search-item label="身份证号" search-key="ChargePersonIDCode" v-model="search.ChargePersonIDCode">
          <nz-input v-model="search.ChargePersonIDCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="手机号" search-key="PhoneNum" v-model="search.PhoneNum">
          <nz-input v-model="search.PhoneNum"></nz-input>
        </nz-search-item>
        <nz-search-item label="联系人" search-key="RelationPerson" v-model="search.RelationPerson">
          <nz-input v-model="search.RelationPerson"></nz-input>
        </nz-search-item>
        <nz-search-item label="种植产品" search-key="Crop" v-model="search.Crop">
          <nz-input v-model="search.Crop"></nz-input>
        </nz-search-item>
        <nz-search-item label="认证情况" search-key="AuthStatus" v-model="search.AuthStatus">
          <nz-input v-model="search.AuthStatus"></nz-input>
        </nz-search-item>
        <nz-search-item label="乡镇" search-key="Town" v-model="search.Town">
          <nz-input v-model="search.Town"></nz-input>
        </nz-search-item>
        <nz-search-item label="村组" search-key="Village" v-model="search.Village">
          <nz-input v-model="search.Village"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column min-width="120" label="序号">
          <template slot-scope="scope">{{getScopeIndex(scope)}}</template>
        </nz-table-column>
        <nz-table-column prop="Town" min-width="120" label="乡镇" sortable="custom"></nz-table-column>
        <nz-table-column prop="Village" min-width="120" label="村组" sortable="custom"></nz-table-column>
        <nz-table-column prop="ProductMainPart" min-width="120" label="生产主体" sortable="custom"></nz-table-column>
        <nz-table-column prop="" min-width="120" label="农户类型" sortable="custom"></nz-table-column>
        <nz-table-column prop="ChargePersonIDCode" min-width="150" label="负责人身份证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="ChargePerson" min-width="120" label="负责人" sortable="custom"></nz-table-column>
        <nz-table-column prop="PhoneNum" min-width="120" label="手机号" sortable="custom"></nz-table-column>
        <nz-table-column prop="SubsidyMoney" min-width="120" label="补贴资金" sortable="custom"></nz-table-column>
        <nz-table-column prop="ContractArea" min-width="150" label="合同面积（亩）" sortable="custom"></nz-table-column>
        <nz-table-column prop="ActuralArea" min-width="150" label="实种面积（亩）" sortable="custom"></nz-table-column>
        <nz-table-column prop="Crop" min-width="120" label="种植产品" sortable="custom"></nz-table-column>
        <nz-table-column prop="AuthStatus" min-width="120" label="认证情况" sortable="custom"></nz-table-column>
        <nz-table-column prop="AuthCode" min-width="120" label="证书编号" sortable="custom"></nz-table-column>
        <nz-table-column prop="RelationPersonIDCode" min-width="150" label="联系人身份证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="RelationPerson" min-width="120" label="联系人" sortable="custom"></nz-table-column>
        <nz-table-column prop="RelationPersonPhoneNum" min-width="150" label="联系人手机号" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作" v-if="userInfo.role!=3">
          <template slot-scope="scope">
            <nz-button type="text" @click="disabledConfirm(scope.row)" v-if="scope.row.Status==0">禁用</nz-button>
            <nz-button type="text" @click="enable(scope.row)" v-if="scope.row.Status==1">启用</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      const userInfo = this.$storage.get('userInfo');
      return {
        userInfo,
        search: {ProductMainPart: '', ChargePersonIDCode: '', PhoneNum: '', RelationPerson: '', Crop: '', AuthStatus: '', Town: '', Village: ''}
      }
    },
    methods: {
      getScopeIndex(scope){
        return parseInt(scope.$index) + 1;
      },
      uploadExcel(){
      },
      refresh(){
        this.$refs.list.refresh();
      },
      async enable(row){
        const isSuccess = await this.$model('farmersFiling').setEnable(row.Id);
        if (isSuccess) {
          this.refresh();
        }
      },
      async disabledConfirm(row){
        const result = await this.$message.confirm('真的要禁用该农户吗?');
        if (result) {
          const isSuccess = await this.$model('farmersFiling').setDisabled(row.Id);
          if (isSuccess) {
            this.refresh();
          }
        }
      }
    }
  }
</script>
