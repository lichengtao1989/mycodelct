<template>
  <div class="distributionout">
    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
    <div class="listwrap">
      <nz-list :requestUrl="$apiUrl.MAINDISTRIBUTION.VIEW" ref="list" :needAdvancedSearch="false" baseSearchPlaceholder="请输入关键字">
        <div slot="operate">
          <nz-button type="primary" @click="addDialog" size="small">
            <i class="nz-icon-add"></i>新建
          </nz-button>
        </div>
        <div slot="search">
          <nz-search-item label="社会信用代码" search-key="CreditCode" v-model="search.CreditCode">
            <nz-input v-model="search.CreditCode"></nz-input>
          </nz-search-item>
          <nz-search-item label="总经销商名称" search-key="DistributionName" v-model="search.DistributionName">
            <nz-input v-model="search.DistributionName"></nz-input>
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
        </div>
        <template slot="tableColumns">
          <nz-table-column prop="CreditCode" min-width="170" label="统一社会信用代码" sortable="custom"></nz-table-column>
          <nz-table-column prop="DistributionName" min-width="150" label="总经销商名称" sortable="custom"></nz-table-column>
          <nz-table-column prop="ChargePerson" min-width="120" label="负责人" sortable="custom"></nz-table-column>
          <nz-table-column prop="PhoneNum" min-width="120" label="手机号" sortable="custom"></nz-table-column>
          <nz-table-column prop="IDCode" min-width="120" label="身份证号" sortable="custom"></nz-table-column>
          <nz-table-column prop="ManageAddress" min-width="120" label="经营地址" sortable="custom"></nz-table-column>
          <nz-table-column prop="Status" min-width="120" label="状态" sortable="custom">
            <template slot-scope="scope">
              <div class="ustatus" :class="'status'+scope.row.DistributionStatus">
                <span></span>{{statusFn(scope.row.DistributionStatus)}}</div>
            </template>
          </nz-table-column>
          <nz-table-column min-width="140" fixed="right" label="操作">
            <template slot-scope="scope">
              <nz-button type="text" @click="lookDialig(scope.row,0)">查看</nz-button>
              <nz-button type="text" @click="lookDialig(scope.row,1)">编辑</nz-button>
              <nz-button type="text" @click="disableFn(scope.row)" v-if="scope.row.DistributionStatus!=0?true:false">启用</nz-button>
              <nz-button type="text" @click="disableFn(scope.row)" v-if="scope.row.DistributionStatus==0?true:false">禁用</nz-button>
            </template>
          </nz-table-column>
        </template>
      </nz-list>
    </div>
  </div>
</template>
<script>
import addEditDialog from './dialog.vue';
export default {
  data() {
    return {
      dialogflag: false,
      search: { CreditCode: '', DistributionName: '', ChargePerson: '', PhoneNum: '', IDCode: '' },
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
    statusFn(st) {
      let str = '';
      switch (parseInt(st)) {
        case 0:
          str = '运行中';
          break;
        case 1:
          str = '关闭';
          break;
        case 2:
          str = '违规';
          break;
        default:
          break;
      }
      return str;
    },
    addDialog() {
      this.$refs.dialog.show();
    },
    async disableFn(data) {
      const result = await this.$message.confirm('确定要禁用吗?');
      if (result) {
        //确定按钮
        this.$ajax
          .post(this.$apiUrl.MAINDISTRIBUTION.UPDATESTATUS, { Id: data.Id, DistributionStatus: 1 - data.DistributionStatus })
          .then(r => {
            if (r.res.resultCode == 200) {
              // this.$emit('save-success');
              // this.$refs.dialog.hide();
              this.refresh();
            } else {
            }
          })
          .catch(() => {});
      }
    },
    async enableFn(data) {
      const result = await this.$message.confirm('确定要启用吗?');
      if (result) {
        this.refresh();
      }
    },
    editDialig(data) {
      this.$refs.dialog.show(data);
    },
    lookDialig(data, type) {
      this.$refs.dialog.show(data, type);
    },
    refresh() {
      this.$refs.list.refresh();
    },
    async delConfirm() {
      const result = await this.$message.confirm('真的要删除吗?');
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
.status1,
.status2 {
  color: #fe5500;
  span {
    background: #fe5500;
  }
}
</style>
