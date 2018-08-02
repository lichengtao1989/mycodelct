<template>
  <div class="newsindexout" id="SYSLINKlct">
    <nz-list :requestUrl="$apiUrl.SYSLINK.LIST" ref="list" :beforeSearch="beforeSearchFn" :needAdvancedSearch="false" :needBaseSearch="false">
      <div slot="operate">
        <nz-button type="primary" size="small" @click="addArticle">
          <i class="nz-icon-add"></i>新建
        </nz-button>

      </div>
      <template slot="tableColumns">
        <nz-table-column type="index" label="顺序" min-width="120" width="100"></nz-table-column>
        <nz-table-column prop="LinkType" min-width="120" label="链接类型">
          <template slot-scope="scope">
            {{typeFn(scope.row.LinkType)}}
          </template>
        </nz-table-column>
        <nz-table-column prop="LinkName" min-width="120" label="链接标题"></nz-table-column>
        <nz-table-column prop="LinkUrl" min-width="120" label="链接地址" style="position:relative;">
          <template slot-scope="scope">
            <div class="zdyzd co1 " @click="jumpUrl(scope.row.LinkUrl)">
              <span> {{scope.row.LinkUrl}}</span>

            </div>
          </template>
        </nz-table-column>

        <nz-table-column min-width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="eitDialog(scope.row)">编辑</nz-button>
            <nz-button type="text" @click="deleteFn(scope.row)">删除</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <dialog-add ref="dialog" @save-success="refresh"></dialog-add>

  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
import dialogAdd from './dialog.vue';

export default {
  data() {
    return { size: 150 };
  },
  components: {
    dialogAdd,
    QrcodeVue
  },
  methods: {
    typeFn(type) {
      let typestr = '';
      if (type == 1) {
        typestr = '友情链接';
      } else if (type == 2) {
        typestr = '其他链接';
      }
      return typestr;
    },
    jumpUrl(url) {
      window.open(url);
    },
    async deleteFn(row) {
      const result = await this.$message.confirm('真的要删除吗?');
      if (result) {
        const { err, res } = await this.$ajax.get(this.$apiUrl.SYSLINK.DELETE, { LinkID: row.LinkID });
        console.log(err, res);
        if (err) {
          this.$message.showError('删除失败');
        } else {
          this.$message.success('删除成功');
          this.refresh();
        }
      }
    },
    refresh() {
      this.$refs.list.refresh();
    },
    addArticle() {
      this.$refs.dialog.show();
    },
    addLink() {
      this.$refs.dialogUrl.show();
    },
    async eitDialog(row) {
      this.$refs.dialog.show(row);
    },
    beforeSearchFn() {
      return {};
    }
  },
  mounted() {
    // this.getList();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.tpsm {
  max-width: 100px;
  margin: 20px 0;
  display: block;
  max-height: 100px;
}
.co1 {
  color: #337ab7;
  cursor: pointer;
}

.poqr {
  display: none;
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 9999;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -o-transform: translateX(-50%);
}
.prqrcode:hover {
  .poqr {
    display: block;
  }
}
</style>
<style rel='stylesheet/less' lang='less' >
#SYSLINKlct {
  .el-table__body-wrapper,
  .el-table {
    overflow: visible;
  }
}
</style>
