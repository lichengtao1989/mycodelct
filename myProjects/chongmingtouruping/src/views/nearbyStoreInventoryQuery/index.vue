<template>
  <div>
    <nz-list :requestUrl="$apiUrl.STOCK.GET_NEARSTOCKLIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="输入农药登记号或名称进行搜索">
      <div slot="search">
        <nz-search-item label="农药名称" search-key="productName" v-model="search.productName">
          <nz-input v-model="search.productName"></nz-input>
        </nz-search-item>
        <nz-search-item label="农药登记号" search-key="RegisteCode" v-model="search.RegisteCode">
          <nz-input v-model="search.RegisteCode"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="pesticideCode" min-width="120" label="登记证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="pesticideName" min-width="120" label="农药名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="registeredTrademark" min-width="120" label="注册商标" sortable="custom"></nz-table-column>
        <nz-table-column prop="specification" min-width="120" label="规格" sortable="custom">
          <!--<template slot-scope="scope"><span>{{spec(scope.row)}}</span></template>-->
        </nz-table-column>
        <nz-table-column prop="manufacturer" min-width="120" label="生产厂家" sortable="custom"></nz-table-column>
        <nz-table-column prop="storeName" min-width="120" label="农资店" sortable="custom"></nz-table-column>
        <nz-table-column prop="StockStatus" min-width="120" label="库存状态" sortable="custom">
          <template slot-scope="scope">
            <div class="ustatus" :class="statusInfo(scope.row).cls">
              <span></span>{{statusInfo(scope.row).text}}
            </div>
          </template>
        </nz-table-column>
        <nz-table-column prop="manageAddress" min-width="120" label="经营地址" sortable="custom"></nz-table-column>
      </template>
    </nz-list>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        search: {productName: '', RegisteCode: ''}
      }
    },
    methods: {
      spec(row){
        const {SpecQuantity, SpecUnit, SpecType} = row;
        if (SpecQuantity && SpecUnit && SpecType) {
          return `${SpecQuantity}${SpecUnit}/${SpecType}`;
        }
        return '';
      },
      statusInfo(row) {
        let info = {};
        if (parseInt(row.warnCount) >= parseInt(row.stockCount)) {
          info.text = '库存不足';
          info.cls = 'status0';
        } else {
          info.text = '库存充足';
          info.cls = 'status1';
        }
        return info;
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .ustatus {
    color: #128f40;
    span {
      margin-right: 5px;
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      vertical-align: middle;
      background: #128f40;
    }
    &.status0,
    &.status2 {
      color: #fe5500;
      span {
        background: #fe5500;
      }
    }
  }
</style>
