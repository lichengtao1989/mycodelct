<template>
  <div>
    <cjm-table :data="tableData" ref="fileListTable" @selection-change="changeSelection">
      <cjm-table-column type="selection" width="55"></cjm-table-column>
      <cjm-table-column prop="name" label="文件名" width="220"></cjm-table-column>
      <cjm-table-column prop="type" label="文件类型"></cjm-table-column>
      <cjm-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <cjm-tooltip content="下载">
            <cjm-button type="text" @click="downLoadFile(scope.row)">下载</cjm-button>
          </cjm-tooltip>
        </template>
      </cjm-table-column>
    </cjm-table>
    <div class="footer-util">
      <cjm-checkbox v-model="isAllChecked" @change="toggleAllRowSelection">全选</cjm-checkbox>
      <cjm-button class="r-btn" type="primary" :disabled="!isAllChecked" @click="downLoadFiles"><i
        class="cjm-icon-download"></i>下载所有文件
      </cjm-button>
    </div>
  </div>
</template>
<script>
  import fileDownLoad from 'framework/utils/fileDownload';
  export default {
    data() {
      return {
        tableData: null,
        isAllChecked: false
      }
    },
    methods: {
      //初始化
      init(id){
        this.$ajax.get(this.$globalData.get('trace', 'apiUrl').productTesting.GET_TEST_DOWNLOAD_LIST, {id: id}).then((r) => {
          if (r.resultCode == '200' && r.data) {
            this.tableData = r.data.imgs.concat(r.data.pdfs).map((d) => {
              d['type'] = /\.(jpg|gif|bmp|png|jpeg)/g.test(d.url.toLowerCase()) ? '图片' : (/\.(pdf)/g.test(d.url.toLowerCase()) ? 'pdf' : '');
              return d;
            });
          }
        });
      },
      //全选事件
      toggleAllRowSelection(){
        if (this.isAllChecked) {
          this.tableData.forEach(row => {
            this.$refs.fileListTable.toggleRowSelection(row, true);
          });
        } else {
          this.$refs.fileListTable.clearSelection();
        }
      },
      //全选事件
      changeSelection(selection){
        if (this.tableData.length == selection.length) {
          this.isAllChecked = true;
        } else {
          this.isAllChecked = false;
        }
      },
      //下载单个文件
      downLoadFile(row){
        fileDownLoad(row.url, null, row.name);
      },
      //下载多个文件
      downLoadFiles(){
        fileDownLoad(this.tableData.map(d => {
          return d.url;
        }), null, this.tableData.map(d => {
          return d.name;
        }));
      }
    }
  }
</script>
<style scoped>
  .footer-util {
    margin: 20px 0;
    padding-left: 14px;
  }

  .footer-util .r-btn {
    float: right;
  }
</style>
