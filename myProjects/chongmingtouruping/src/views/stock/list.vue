<template>
  <div class="distributionout">
    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
    <div class="listwrap">
      <nz-list :requestUrl="$apiUrl.STOCK.STOCKLIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="请输入关键字">
        <div slot="search">
          <nz-search-item label="农药名称" search-key="pesticideName" v-model="search.pesticideName">
            <nz-input v-model="search.pesticideName"></nz-input>
          </nz-search-item>
          <nz-search-item label="农药登记号" search-key="pesticideCode" v-model="search.pesticideCode">
            <nz-input v-model="search.pesticideCode"></nz-input>
          </nz-search-item>
          <nz-search-item label="库存状态" search-key="key3" v-model="search.key3">
            <nz-select v-model="search.key3" placeholder="库存状态" @change="changeFn">
              <nz-option label="库存充足" value="2"></nz-option>
              <nz-option label="库存不足" value="3"></nz-option>
            </nz-select>
          </nz-search-item>
        </div>
        <template slot="tableColumns">
          <nz-table-column prop="pesticideCode" min-width="120" label="登记证号" sortable="custom"></nz-table-column>
          <nz-table-column prop="pesticideName" min-width="120" label="农药名称" sortable="custom"></nz-table-column>
          <nz-table-column prop="registeredTrademark" min-width="120" label="注册商标" sortable="custom"></nz-table-column>
          <nz-table-column prop="specification" min-width="120" label="规格" sortable="custom">
               <template slot-scope="scope">
              <div >{{scope.row.specQuantity}}{{scope.row.specUnit}}/{{scope.row.specType}}</div>
            </template>
          </nz-table-column>
          <nz-table-column prop="manufacturer" min-width="120" label="生产厂家" sortable="custom"></nz-table-column>
          <nz-table-column prop="stockCount" min-width="120" label="库存数量" sortable="custom"></nz-table-column>
          <nz-table-column prop="unit" min-width="120" label="单位" sortable="custom"></nz-table-column>
          <nz-table-column prop="status" min-width="120" label="库存状态" sortable="custom">
            <template slot-scope="scope">
              <div class="ustatus" :class="statusFn(scope.row.warnCount,scope.row.stockCount).cls">
                <span></span>{{statusFn(scope.row.warnCount,scope.row.stockCount).text}}</div>
            </template>
          </nz-table-column>
          <nz-table-column min-width="120" label="操作" fixed="right">
            <template slot-scope="scope">
              <nz-button type="text" @click="addDialog(scope.row)">库存预警</nz-button>
              <!-- <nz-button type="text" v-show="false" @click="lookmore(scope.row)">详情</nz-button> -->
            </template>
          </nz-table-column>
        </template>
      </nz-list>
    </div>
  </div>
</template>
<script>
import addEditDialog from './dialog';
export default {
  data() {
    return {
      dialogflag: false,
      search: { pesticideName: '', pesticideCode: '', key3: '', key4: '', key5: '', key6: '' },
      contentHeight: 500
    };
  },
  components: { addEditDialog },
  computed: {
    contentLeft() {
      // return 170 + 'px';
    }
  },
  methods: {
    statusFn(warnCount, stockCount) {
      let str = {};
      if (parseInt(warnCount) >= parseInt(stockCount)) {
        str.text = '库存不足';
        str.cls = 'status0';
      } else {
        str.text = '库存充足';
        str.cls = 'status1';
      }
      return str;
    },
    addDialog(data) {
      this.$refs.dialog.show(data);
    },
    lookmore(data) {
      console.log(data)
      // this.$refs.dialog.show(data);
      window.open(`${window.location.origin}/#/main/stock?id=${data.stockId}`);
    },
    refresh() {
      this.$refs.list.refresh();
    },
    async confirmFn(msg) {
      console.log(msg);
      const result = await this.$message.confirm('确定要启用吗?');
      if (result) {
        this.refresh();
      }
    },
    async disableFn(msg) {
      console.log(msg);
      const result = await this.$message.confirm('确定要禁用吗?');
      if (result) {
        this.refresh();
      }
    },
    resize() {
      // this.contentHeight = window.innerHeight - 50;
    }
  },
  mounted() {
    // this.resize();
    // window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.resize);
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.distributionout {
  position: relative;
}
.p20 {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 4;
}
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
}
.status0,
.status2 {
  color: #fe5500;
  span {
    background: #fe5500;
  }
}
</style>
