<template>
  <div>
    <nz-list :requestUrl="$apiUrl.AGRICULTURALSTORE.GET_LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="农资店名称、手机号">
      <div slot="operate">
        <nz-button type="primary" size="small" @click="addDialog">
          <i class="nz-icon-add"></i>添加
        </nz-button>
      </div>
      <div slot="search">
        <nz-search-item label="农资店名称" search-key="StoreName" v-model="search.StoreName">
          <nz-remote-select :remoteUrl="$apiUrl.COMMON.DROP_DOWN.AGRICULTURALMATERIALS" v-model="search.StoreName"></nz-remote-select>
        </nz-search-item>
        <nz-search-item label="负责人" search-key="ChargePerson" v-model="search.ChargePerson">
          <nz-input v-model="search.ChargePerson"></nz-input>
        </nz-search-item>
        <nz-search-item label="手机号" search-key="PhoneNum" v-model="search.PhoneNum">
          <nz-input v-model="search.PhoneNum"></nz-input>
        </nz-search-item>
        <nz-search-item label="身份证号" search-key="IDCode" v-model="search.IDCode">
          <nz-input v-model="search.IDCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="乡镇" search-key="ManageAddress" v-model="search.ManageAddress">
          <nz-input v-model="search.ManageAddress"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="CreditCode" min-width="160" label="统一社会信用代码" sortable="custom"></nz-table-column>
        <nz-table-column prop="StoreName" min-width="120" label="农资店名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="ChargePerson" min-width="120" label="负责人" sortable="custom"></nz-table-column>
        <nz-table-column prop="PhoneNum" min-width="120" label="手机号" sortable="custom"></nz-table-column>
        <nz-table-column v-if="role!=2" prop="IDCode" min-width="120" label="身份证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="ManageAddress" min-width="120" label="经营地址" sortable="custom"></nz-table-column>
        <nz-table-column prop="StoreStatus" enumName="农资店状态" min-width="120" label="状态" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.StoreStatus==1"><i class="is-close"></i>关闭</div>
            <div v-if="scope.row.StoreStatus==0"><i class="is-running"></i>运行中</div>
          </template>
        </nz-table-column>
        <nz-table-column v-if="role!=2" min-width="140" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDialog(scope.row)">查看</nz-button>
            <nz-button type="text" @click="editDialig(scope.row)">编辑</nz-button>
            <nz-button type="text" @click="storeEnable(scope.row)" v-if="scope.row.StoreStatus==1">启用</nz-button>
            <nz-button type="text" @click="storeDisableConfirm(scope.row)" v-if="scope.row.StoreStatus==0">禁用</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
  </div>
</template>
<script>
  import addEditDialog from './dialog.vue';
  export default {
    components: {addEditDialog},
    data(){
      return {
        search: {StoreName: '', ChargePerson: '', PhoneNum: '', IDCode: '', ManageAddress: ''}
      }
    },
    computed: {
      role(){
        const userInfo = this.$storage.get('userInfo');
        return userInfo.role;
      }
    },
    methods: {
      async storeEnable(row){
        const {Id} = row;
        const status = 0;
        const isSuccess = await this.$model('agriculturalStore').setStatus(Id, status);
        if (isSuccess) {
          this.refresh();
        }
      },
      async storeDisableConfirm(row){
        const result = await this.$message.confirm('真的要禁用该农资店吗?');
        if (result) {
          const {Id} = row;
          const status = 1;
          const isSuccess = await this.$model('agriculturalStore').setStatus(Id, status);
          if (isSuccess) {
            this.refresh();
          }
        }
      },
      viewDialog(data){
        this.$refs.dialog.showView(data);
      },
      addDialog(){
        this.$refs.dialog.showAdd();
      },
      editDialig(data){
        this.$refs.dialog.showEdit(data);
      },
      refresh(){
        this.$refs.list.refresh();
      },
      async delConfirm(){
        const result = await this.$message.confirm('真的要删除吗?');
        if (result) {
          this.refresh();
        }
      }
    }
  }
</script>
