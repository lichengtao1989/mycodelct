<template>
  <div class="distributionout">

    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
    <div class="listwrap">
      <nz-list :requestUrl="$apiUrl.USERMANAGE.LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="请输入关键字">
        <div slot="operate">
          <nz-button type="primary" @click="addDialog" size="small">
            <i class="nz-icon-add"></i>新建
          </nz-button>
        </div>
        <div slot="search">
          <nz-search-item label="登录账号" search-key="mobile" v-model="search.mobile">
            <nz-input v-model="search.mobile"></nz-input>
          </nz-search-item>
          <nz-search-item label="主体名称" search-key="accountName" v-model="search.accountName">
            <nz-input v-model="search.accountName"></nz-input>
          </nz-search-item>
          <nz-search-item label="联系人" search-key="contact" v-model="search.contact">
            <nz-input v-model="search.contact"></nz-input>
          </nz-search-item>
          <nz-search-item label="身份证号" search-key="iDNumber" v-model="search.iDNumber">
            <nz-input v-model="search.iDNumber"></nz-input>
          </nz-search-item>
          <nz-search-item label="用户类型" search-key="accountType" v-model="search.accountType">
            <nz-input v-model="search.accountType"></nz-input>
          </nz-search-item>
        </div>
        <template slot="tableColumns">
          <nz-table-column prop="mobile" min-width="120" label="登录账号" sortable="custom"></nz-table-column>
          <nz-table-column prop="accountName" min-width="120" label="主体名称" sortable="custom"></nz-table-column>
          <nz-table-column prop="contact" min-width="120" label="联系人" sortable="custom"></nz-table-column>
          <nz-table-column prop="iDNumber" min-width="120" label="身份证号" sortable="custom"></nz-table-column>
          <nz-table-column prop="accountType" min-width="120" label="用户类型" sortable="custom">
            <template slot-scope="scope">
              <div class="ustatussa">
                {{accountTypeFn(scope.row.accountType)}}</div>
            </template>
          </nz-table-column>
          <nz-table-column prop="status" min-width="120" label="状态" sortable="custom">
            <template slot-scope="scope">
              <div class="ustatus" :class="'status'+scope.row.status">
                <span></span>{{statusFn(scope.row.status)}}</div>
            </template>
          </nz-table-column>
          <nz-table-column min-width="120" label="操作">
            <template slot-scope="scope">
              <nz-button type="text" @click="editDialig(scope.row)">编辑</nz-button>
              <nz-button type="text" @click="confirmFn(scope.row)" v-if="scope.row.status==0?true:false">启用</nz-button>
              <nz-button type="text" @click="delFn(scope.row)">删除</nz-button>
              <nz-button type="text" @click="disableFn(scope.row)" v-if="scope.row.status==3?true:false">禁用</nz-button>
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
      search: { mobile: '', accountName: '', contact: '', iDNumber: '', accountType: '' },
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
    accountTypeFn(st) {
      let str = '';
      switch (parseInt(st)) {
        case 0:
          str = '农户';
          break;
        case 1:
          str = '区农委';
          break;
        case 2:
          str = '农户';
          break;
        case 3:
          str = '农资店';
          break;
        case 4:
          str = '总经销商';
          break;
        case 5:
          str = '总经销商';
          break;
        default:
          break;
      }
      return str;
    },
    statusFn(st) {
      let str = '';
      switch (parseInt(st)) {
        case 0:
          str = '禁用';
          break;
        case 1:
          str = '待审核';
          break;
        case 2:
          str = '审核不通过';
          break;
        case 3:
          str = '审核通过';
          break;
        default:
          break;
      }
      return str;
    },
    addDialog() {
      this.$refs.dialog.show();
    },
    editDialig(data) {
      this.$refs.dialog.show(data);
    },
    refresh() {
      this.$refs.list.refresh();
    },
    async delFn(msg) {
      const result = await this.$message.confirm('确定要删除吗?');
      if (result) {
        let { err, res } = await this.$ajax.post(this.$apiUrl.USERMANAGE.SETSTATUS, { userId: msg.userID, value: -1 });
        if (err) {
          this.$message.showError(err);
          return false;
        }
        if (res.resultCode == 200) {
          this.$message.success(res.msg);
        }
        this.refresh();
      }
    },
    async confirmFn(msg) {
      console.log(msg);
      const result = await this.$message.confirm('确定要启用吗?');
      if (result) {
        let { err, res } = await this.$ajax.post(this.$apiUrl.USERMANAGE.SETSTATUS, { userId: msg.userID, value: 3 });
        if (err) {
          this.$message.showError(err);
          return false;
        }
        if (res.resultCode == 200) {
          this.$message.success(res.msg);
        }
        this.refresh();
      }
    },
    async disableFn(msg) {
      console.log(msg);
      const result = await this.$message.confirm('确定要禁用吗?');
      if (result) {
        let { err, res } = await this.$ajax.post(this.$apiUrl.USERMANAGE.SETSTATUS, { userId: msg.userID, value: 0 });
        if (err) {
          this.$message.showError(err);
          return false;
        }
        if (res.resultCode == 200) {
          this.$message.success(res.msg);
        }
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
