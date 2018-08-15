<template>
  <div>
    <div>
      <cjm-list ref="list" :request-url="requestUrl" :need-advanced-search="true"
                :need-base-search="true">
        <div slot="operate">
          <cjm-button type="primary" @click="addTestItem" power-code="TestingTypeEdit"><i class="cjm-icon-add"></i>添加检测项
          </cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="检测项名称" search-key="testingTypeName" v-model="search.testingTypeName" >
            <cjm-input v-model="search.testingTypeName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="所属机构" search-key="orgName" v-model="search.orgName">
            <cjm-input v-model="search.orgName"></cjm-input>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="testingTypeName" label="检测项目名称" width=""></cjm-table-column>
          <cjm-table-column prop="orgName" label="所属机构" width=""></cjm-table-column>
          <cjm-table-column prop="userName" label="操作人" width=""></cjm-table-column>
          <cjm-table-column prop="createTime" label="操作时间" width=""></cjm-table-column>
          <cjm-table-column label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <cjm-tooltip content="编辑">
                <cjm-button type="text" @click="editTestItem(scope.row.testingTypeID)" power-code="TestingTypeEdit">编辑
                </cjm-button>
              </cjm-tooltip>
              <cjm-button type="text" v-if="scope.row.status==1"  @click="disabledTestItem(scope.row.testingTypeID)">禁用</cjm-button>
              <cjm-button type="text" v-if="scope.row.status==0" style="color:#4c4c4c;"
                          @click="enabledTestItem(scope.row.testingTypeID,'1')">启用
              </cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <cjm-dialog :title="dialogTitle"  :visible.sync="dialogVisible" :okHandler="confirm">
      <testItem-edit ref="testItemEdit"></testItem-edit>
    </cjm-dialog>
  </div>
</template>
<script>
import testItemEdit from './edit';
export default {
  components: {
    testItemEdit
  },
  data() {
    return {
      search: {
        testingTypeName: '',
        orgName: ''
      },
      dialogVisible: false,
      height: 500,
      dialogTitle: '添加检测项',
      requestUrl: this.$globalData.get('trace', 'apiUrl').productTesting.GET_TEST_TYPE_List
    };
  },
  methods: {
    addTestItem() {
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.testItemEdit.addForm();
      });
    },
    editTestItem(testingTypeID) {
      this.dialogTitle = '编辑检测项';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.testItemEdit.editForm(testingTypeID);
      });
    },
    //禁用检测项
    disabledTestItem(id) {
      this.$confirm('确认禁用？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.$globalData.get('trace', 'apiUrl').productTesting.SET_TEST_TYPE_Valid, {
              testingTypeID: id,
              status: 0
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$refs.list.refresh();
              } else {
                this.$message.error(r.msg);
              }
            })
            .catch(error => {
              this.$message.error(error.msg);
            });
        })
        .catch(() => {});
    },
    //启用检测项
    enabledTestItem(id) {
      this.$ajax
        .post(this.$globalData.get('trace', 'apiUrl').productTesting.SET_TEST_TYPE_Valid, {
          testingTypeID: id,
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
    //提交保存
    confirm(callback) {
      this.$refs.testItemEdit
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
  }
};
</script>
<style>

</style>
