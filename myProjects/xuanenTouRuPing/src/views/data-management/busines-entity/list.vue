<template>
  <div>
    <nz-list :request-url="requestUrl" :need-advanced-search="true" :formatData="formatData" :need-base-search="true" base-search-placeholder="经营主体名称、许可证号" ref="list">
      <div slot="search">
        <nz-search-item label="主体名称" search-key="storeName" v-model="search.storeName">
          <nz-input v-model="search.storeName"></nz-input>
        </nz-search-item>
        <nz-search-item label="手机号码" search-key="mobile" v-model="search.mobile">
          <nz-input v-model="search.mobile"></nz-input>
        </nz-search-item>
        <nz-search-item label="许可证号" search-key="licenseKey" v-model="search.licenseKey">
          <nz-input v-model="search.licenseKey"></nz-input>
        </nz-search-item>
        <nz-search-item label="社会信用代码" search-key="creditCode" v-model="search.creditCode">
          <nz-input v-model="search.creditCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="所属地区" search-key="regionCode" v-model="search.regionCode">
          <nz-region-select v-model="search.regionCode"></nz-region-select>
        </nz-search-item>
        <nz-search-item label="审核日期" search-key="createTime" v-model="search.createTime">
          <nz-datepicker v-model="search.createTime" type="daterange"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="creditCode" min-width="160" label="统一信用代码" sortable="custom"></nz-table-column>
        <nz-table-column prop="licenseKey" width="160" label="许可证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="storeName" width="180" label="经营主体名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="type" width="120" label="主体类型" enum-name="经营类型" sortable="custom"></nz-table-column>
        <nz-table-column prop="legal" width="120" label="负责人" sortable="custom"></nz-table-column>
        <nz-table-column prop="mobile" width="120" label="手机号" sortable="custom"></nz-table-column>
        <nz-table-column prop="regionName" width="250" label="地址">
        </nz-table-column>
        <nz-table-column prop="status" min-width="120" label="状态" enum-name="审核状态" sortable="custom"></nz-table-column>
        <nz-table-column prop="auditTime" width="180" label="审核时间" sortable="custom"></nz-table-column>
        <nz-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="editBnt(scope.row.storeID, 'edit')">编辑</nz-button>
            <!-- <nz-button type="text" @click="edit(scope.row.storeID, 'view')">查看
            </nz-button> -->
            <nz-button v-if="scope.row.status!='0'" type="text" @click="updateStatus(scope.row.storeID, '0')">禁用</nz-button>
            <nz-button v-if="scope.row.status=='0'" type="text" @click="updateStatus(scope.row.storeID, '1')" style="color:#4c4c4c;">启用</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
  </div>
</template>
<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.DATAMANAGEMENT;
    return {
      apiUrl: apiUrl,
      requestUrl: apiUrl.GET_LIST,
      search: {
        mobile: '',
        licenseKey: '',
        creditCode: '',
        storeName: '',
        regionCode: '',
        createTime: ''
      }
    };
  },
  watch: {},
  methods: {
    formatData(data) {
      data.forEach(item => {
        item.regionName = '';
        this.loadRegionName(item);
      });
      return data;
    },
    async loadRegionName(item) {
      let regionName = await this.$model('region').getRegionText(item.regionCode);
      if (item.address != null) {
        item.regionName = regionName.join('') + item.address;
      } else {
        item.regionName = regionName;
      }
    },
    async editBnt(storeID) {
      this.$router.push({ path: '/main/businessEntityManagement', query: { storeID: storeID, currentPage: 'governmentEdit' } });
    },
    async updateStatus(row, status) {
      let data = {
        storeId: row
      };
      if (status == 0) {
        let msg = await this.$message.confirm('确定要禁用吗');
        if (msg) {
          let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SET_STATUS, data);
          if (res.resultCode != 200) {
            this.$message.showError(err);
          }
        }
      } else {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SET_STATUS, data);
        if (res.resultCode != 200) {
          this.$message.showError(err);
        }
      }
      this.$refs.list.refresh();
    }
  }
};
</script>
