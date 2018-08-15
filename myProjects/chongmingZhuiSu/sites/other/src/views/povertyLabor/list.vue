<template>
  <div>
    <cjm-list :request-url="apiUrl.povertyLabor.GET_LIST" :need-advanced-search="false"  base-search-placeholder="请输入岗位名称" ref="list">
      <div slot="operate">
        <cjm-button type="primary" @click="add" power-code="povertyLaborAdd">
          <i class="cjm-icon-add"></i>添加</cjm-button>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="postNo" min-width="180" label="岗位编号" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="postName" min-width="200" label="岗位名称	" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createByName" width="140" label="创建人" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" width="180" label="创建时间" sortable="custom"></cjm-table-column>
        <cjm-table-column width="200" label="操作" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.postID)" power-code="povertyLaborEdit">编辑</cjm-button>
            <cjm-button type="text" @click="del(scope.row.postID)" power-code="povertyLaborDelete">删除</cjm-button>
            <cjm-button type="text" v-if="scope.row.status==1" power-code="povertyLaborDisabled" @click="disabledPovertyLabor(scope.row.postID)">禁用</cjm-button>
            <cjm-button type="text" v-if="scope.row.status==0" power-code="povertyLaborEnable" style="color:#4c4c4c;" @click="enabledPovertyLabor(scope.row.postID,'1')">启用
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <!-- 编辑弹框 -->
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" :okHandler="confirm">
      <poverty-labor-edit ref="edit"></poverty-labor-edit>
    </cjm-dialog>
  </div>
</template>

<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import PovertyLaborEdit from './edit.vue';
export default {
  components: {
    PovertyLaborEdit
  },
  mixins: [pageSwitch],
  data() {
    return {
      enums: this.$globalData.get('other', 'enums'),
      apiUrl: this.$globalData.get('other', 'apiUrl'),
      search: {
        postName: ''
      },
      dialogTitle: '',
      dialogVisible: false
    };
  },
  computed: {},
  methods: {
    //新增
    add() {
      this.dialogTitle = '新增岗位';
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.edit.addForm();
      });
    },
    //编辑
    edit(id) {
      this.dialogTitle = '编辑岗位';
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.edit.editForm(id);
      });
    },
    //删除
    del(id) {
      this.$confirm('确认要删除吗？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.apiUrl.povertyLabor.UPDATESTATUS, {
              postID: id,
              status: -1
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$refs.list.refresh();
              } else {
                this.$message.error(r.msg);
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        })
        .catch(() => {});
    },
    //禁用劳务岗位
    disabledPovertyLabor(id) {
      this.$confirm('确认禁用？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.apiUrl.povertyLabor.UPDATESTATUS, {
              postID: id,
              status: 0
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$refs.list.refresh();
              } else {
                this.$message.error(r.msg);
              }
            });
        })
        .catch(() => {});
    },
    //启用劳务岗位
    enabledPovertyLabor(id) {
      this.$ajax
        .post(this.apiUrl.povertyLabor.UPDATESTATUS, {
          postID: id,
          status: 1
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.$refs.list.refresh();
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    confirm(callback) {
      this.$refs.edit
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    }
  },
  created() {}
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
