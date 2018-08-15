<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-advanced-search="true" ref="list">
      <div slot="operate">
        <cjm-button @click="add" type="primary"><i class="cjm-icon-add"></i>新增系统</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="系统编号" search-key="code" v-model="search.code">
          <cjm-input v-model="search.code"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="系统名称" search-key="name" v-model="search.name">
          <cjm-input v-model="search.name"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="排序值" search-key="sortNo" v-model="search.sortNo">
          <cjm-input v-model="search.sortNo"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="显示系统名称" v-model="search.isDisplayName" search-key="isDisplayName">
          <cjm-enum-select v-model="search.isDisplayName" enum-name="是否" enum-namespace="base" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="code" min-width="120" label="系统编号"></cjm-table-column>
        <cjm-table-column prop="name" min-width="120" label="系统名称"></cjm-table-column>
        <cjm-table-column prop="corpType" width="120" enum-name="组织类型" label="组织类型" enum-namespace="base" ></cjm-table-column>
        <cjm-table-column prop="sortNo" width="100" label="排序值" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="isDisplayName" width="120" label="显示系统名称" enum-name="是否" enum-namespace="base" ></cjm-table-column>
        <cjm-table-column prop="createBy" width="90" label="创建人"></cjm-table-column>
        <cjm-table-column prop="createTime" width="170" label="创建时间"></cjm-table-column>
        <cjm-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" v-if="scope.row.status==1" @click="edit(scope.row.id,'')">编辑</cjm-button>
            <cjm-button type="text" v-if="scope.row.status==1" @click="deployMenu(scope.row.directoryID)">配置菜单
            </cjm-button>
            <cjm-button type="text" v-if="scope.row.status==1" @click="copyMenu(scope.row.id,scope.row.id)">复制菜单
            </cjm-button>
            <cjm-button type="text" v-if="scope.row.status==1" @click="disabledMenu(scope.row.id)">禁用</cjm-button>
            <cjm-button type="text" v-if="scope.row.status==0" style="color:#4c4c4c;"
                        @click="enabledMenu(scope.row.id,'1')">启用
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" :okHandler="confirm">
      <system-edit ref="systemEdit"></system-edit>
    </cjm-dialog>
  </div>
</template>

<script>
  import systemEdit from './edit.vue';
  export default {
    components: {
      systemEdit
    },
    data() {
      return {
        search: {
          code: '',
          name: '',
          sortNo: '',
          isDisplayName: '',
          createTime: ''
        },
        requestUrl: this.$globalData.get('base', 'apiUrl').system.GET_LIST,
        dialogTitle: '',
        dialogVisible: false
      };
    },
    methods: {
      //新增
      add() {
        this.dialogTitle = '新增系统';
        this.dialogVisible = true;
        this.$nextTick(function () {
          this.$refs.systemEdit.addForm();
        });
      },
      //禁用系统
      disabledMenu(id) {
        this.$confirm('确认禁用？', '提示', {type: 'warning'}).then(() => {
          this.$ajax.post(this.$globalData.get('base', 'apiUrl').system.UPDATE_STATUS, {
            id: id,
            status: 0
          }).then((r) => {
            if (r.resultCode == 200) {
              this.$refs.list.refresh();
            } else {
              this.$message.error(r.msg);
            }
          });
        }).catch(() => {});
      },
      //启用系统
      enabledMenu(id) {
        this.$ajax.post(this.$globalData.get('base', 'apiUrl').system.UPDATE_STATUS, {
          id: id,
          status: 1
        }).then((r) => {
          if (r.resultCode == 200) {
            this.$refs.list.refresh();
          } else {
            this.$message.error(r.msg);
          }
        });
      },
      //赋值系统
      copyMenu(id, copyID) {
        this.dialogTitle = '复制系统';
        this.dialogVisible = true;
        this.$nextTick(function () {
          this.$refs.systemEdit.editForm(id, copyID);
        });
      },
      //提交保存
      confirm(callback) {
        this.$refs.systemEdit.submit().then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        }).catch((error) => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
      },
      edit(id, copyID) {
        this.dialogTitle = '编辑系统';
        this.dialogVisible = true;
        this.$nextTick(function () {
          this.$refs.systemEdit.editForm(id, copyID);
        });
      },
      deployMenu(id) {
        window.open(`page.html#/system/menuEdit?id=${id}`);
      }
    }
  };
</script>
<style scoped>

</style>
