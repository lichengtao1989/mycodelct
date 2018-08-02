<template>
  <div class="newsindexout" id="productlct">
    <nz-list :requestUrl="$apiUrl.PRODUCT.LIST" ref="list" :beforeSearch="beforeSearchFn" :needAdvancedSearch="false" :needBaseSearch="false">
      <div slot="operate">
        <nz-button type="primary" size="small" @click="addArticle">
          <i class="nz-icon-add"></i>新建
        </nz-button>

      </div>
      <template slot="tableColumns">
        <nz-table-column type="index" label="顺序" min-width="120" width="100"></nz-table-column>
        <nz-table-column prop="ProductName" min-width="120" label="名称"></nz-table-column>
        <nz-table-column prop="ProductBrand" min-width="120" label="品牌"></nz-table-column>
        <nz-table-column prop="ContactInfo" label="联系方式" min-width="120"></nz-table-column>
        <nz-table-column prop="SortId" min-width="120" label="排序值"></nz-table-column>
        <nz-table-column prop="Producer" min-width="120" label="生产企业"></nz-table-column>
        <nz-table-column prop="ShelfLife" min-width="120" label="保质日期"></nz-table-column>
        <nz-table-column prop="TraceUrl" min-width="120" label="溯源链接" style="position:relative;">
          <template slot-scope="scope">
            <div class="zdyzd co1 prqrcode">
              <span> {{scope.row.TraceUrl}}</span>
              <div v-if="scope.row.TraceUrl" class="poqr">
                <qrcode-vue :value="scope.row.TraceUrl" :size="size" level="H"></qrcode-vue>
              </div>
            </div>
          </template>
        </nz-table-column>
        <nz-table-column prop="MallUrl" min-width="120" label="跳转电商">
          <template slot-scope="scope">
            <div class="zdyzd co1" @click="jumpUrl(scope.row.MallUrl)">
              {{scope.row.MallUrl}}
            </div>
          </template>
        </nz-table-column>
        <nz-table-column prop="MallUrl" min-width="120" label="自定义字段">
          <template slot-scope="scope">
            <div class="zdyzd co1">
              共{{scope.row.ProductExt.length}}个字段
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
    jumpUrl(url) {
      window.open(url);
    },
    async deleteFn(row) {
      const result = await this.$message.confirm('真的要删除吗?');
      if (result) {
        const { err, res } = await this.$ajax.get(this.$apiUrl.PRODUCT.DELETE, { ProductID: row.ProductID });
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
#productlct {
  .el-table__body-wrapper,
  .el-table {
    overflow: visible;
  }
}
</style>
