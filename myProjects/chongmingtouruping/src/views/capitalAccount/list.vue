<template>
  <div class="distributionout">
    <add-edit-dialog ref="dialog" @save-success="refresh" :type="type"></add-edit-dialog>
    <div class="listwrap">
      <nz-list :requestUrl="$apiUrl.FUNDACCOUNT.LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="请输入关键字">
        <!-- <div slot="operate">
          <nz-button type="primary" @click="addDialog">
            <i class="nz-icon-add"></i>新建
          </nz-button>
        </div> -->
        <div slot="search">
          <nz-search-item label="资金账号" search-key="AccountNumber" v-model="search.AccountNumber">
            <nz-input v-model="search.AccountNumber"></nz-input>
          </nz-search-item>
          <nz-search-item label="主体名称" search-key="MainPartName" v-model="search.MainPartName">
            <nz-input v-model="search.MainPartName"></nz-input>
          </nz-search-item>
          <nz-search-item label="联系人" search-key="RelationPerson" v-model="search.RelationPerson">
            <nz-input v-model="search.RelationPerson"></nz-input>
          </nz-search-item>
          <nz-search-item label="联系方式1" search-key="RelationPersonPhoneNum" v-model="search.RelationPersonPhoneNum">
            <nz-input v-model="search.RelationPersonPhoneNum"></nz-input>
          </nz-search-item>
          <nz-search-item label="账户类型" search-key="AccountType" v-model="search.AccountType">
            <!-- <nz-input v-model="search.AccountType"></nz-input> -->
            <nz-select v-model="search.AccountType">
              <nz-option label="总经销" value="5"></nz-option>
              <nz-option label="农资店" value="3"></nz-option>
              <nz-option label="农户" value="2"></nz-option>
            </nz-select>
          </nz-search-item>

        </div>
        <template slot="tableColumns">
          <nz-table-column prop="AccountNumber" min-width="120" label="(补贴)资金账号" sortable="custom"></nz-table-column>
          <nz-table-column prop="Balance" min-width="120" label="当前余额" sortable="custom"></nz-table-column>
          <nz-table-column prop="MainPartName" min-width="120" label="主体名称" sortable="custom"></nz-table-column>
          <nz-table-column prop="RelationPerson" min-width="120" label="联系人" sortable="custom"></nz-table-column>
          <nz-table-column prop="RelationPersonPhoneNum" min-width="120" label="联系方式" sortable="custom"></nz-table-column>
          <nz-table-column prop="jydz" min-width="120" label="账户类型" sortable="custom">
            <template slot-scope="scope">
              <div class="ll">
                {{typeFn(scope.row.AccountType)}}</div>
            </template>
          </nz-table-column>
          <nz-table-column prop="status" min-width="120" label="状态" sortable="custom">
            <template slot-scope="scope">
              <div class="ustatus" :class="'status'+scope.row.Status">
                <span></span>{{statusFn(scope.row.Status)}}</div>
            </template>
          </nz-table-column>
          <nz-table-column min-width="120" label="操作">
            <template slot-scope="scope">
              <nz-button type="text" @click="showDialog(scope.row)">明细</nz-button>
              <nz-button type="text" @click="confirmFn(scope.row)" v-if="scope.row.Status==0?true:false">启用</nz-button>
              <nz-button type="text" @click="disableFn(scope.row)" v-if="scope.row.Status==1?true:false">禁用</nz-button>

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
      type: '',
      dialogflag: false,
      search: { AccountNumber: '', MainPartName: '', RelationPerson: '', RelationPersonPhoneNum: '', AccountType: '' },
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
    async confirmFn(msg) {
      console.log(msg);
      const result = await this.$message.confirm('确定要启用吗?');
      if (result) {
        let { err, res } = await this.$ajax.post(this.$apiUrl.FUNDACCOUNT.STATUS, { Id: msg.Id, status: 1 });
        console.log(err, res);
        if (err) {
          this.$message.showError(err);
          return false;
        }
        if (res.resultCode == 200) {
          this.$message.success('设置成功');
        }
        this.refresh();
      }
    },
    async disableFn(msg) {
      console.log(msg);
      const result = await this.$message.confirm('确定要禁用吗?');
      if (result) {
        let { err, res } = await this.$ajax.post(this.$apiUrl.FUNDACCOUNT.STATUS, { Id: msg.Id, status: 0 });
        if (err) {
          this.$message.showError(err);
          return false;
        }
        if (res.resultCode == 200) {
          this.$message.success('设置成功');
        }
        this.refresh();
      }
    },
    typeFn(st) {
      let str = '';
      switch (parseInt(st)) {
        case 5:
          str = '总经销';
          break;
        case 3:
          str = '农资店';
          break;
        case 2:
          str = '农户';
          break;
        default:
          break;
      }
      return str;
    },
    statusFn(st) {
      let str = '';
      switch (parseInt(st)) {
        case 1:
          str = '正常';
          break;
        case 0:
          str = '禁用';
          break;
        case 2:
          str = '违规';
          break;
        default:
          break;
      }
      return str;
    },
    showDialog(data) {
      this.type = '1';
      window.open(`${window.location.origin}/#/main/capitalAccount?id=${data.Id}`);
      // this.$refs.dialog.show(data);
    },
    addDialog() {
      this.type = '2';
      this.$refs.dialog.show();
    },
    editDialig(data) {
      this.type = '2';
      this.$refs.dialog.show(data);
    },
    detail(data) {},
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
.status0,
.status2 {
  color: #fe5500;
  span {
    background: #fe5500;
  }
}
</style>
