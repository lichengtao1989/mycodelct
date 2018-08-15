<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-advanced-search="true" ref="list">
      <div slot="operate">
        <cjm-button @click="add" type="primary">
          <i class="cjm-icon-add"></i>新增</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="H5名称" search-key="h5Name" v-model="search.h5Name">
          <cjm-input v-model="search.h5Name"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="组织ID" search-key="corpID" v-model="search.corpID">
          <cjm-input v-model="search.corpID"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="关联方式" search-key="relateType" v-model="search.relateType">
          <cjm-enum-select v-model="search.relateType" enum-name="关联方式" enum-namespace="base" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="关联产品" search-key="productName" v-model="search.productName">
          <cjm-input v-model="search.productName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="关联批次" search-key="productBatchCode" v-model="search.productBatchCode">
          <cjm-input v-model="search.productBatchCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column type="index" width="60" label="序号"></cjm-table-column>
        <cjm-table-column prop="h5Name" min-width="80" label="h5名称"></cjm-table-column>
        <cjm-table-column min-width="60" label="是否个性化">
          <template slot-scope="scope">
            {{scope.row.isPersonalized == $globalData.get('base', 'enums')['是否个性化']['是']?'是':'否'}}
          </template>
        </cjm-table-column>
        <cjm-table-column prop="createTime" width="160" label="创建时间"></cjm-table-column>
        <cjm-table-column label="操作" width="350" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.listID,'')">编辑</cjm-button>
            <cjm-button type="text" @click="configH5(scope.row.listID)" v-if="$globalData.get('base', 'enums')['是否个性化']['否'] === scope.row.isPersonalized">配置H5
            </cjm-button>
            <cjm-button type="text" @click="copyH5(scope.row.listID)" v-if="$globalData.get('base', 'enums')['是否个性化']['否'] === scope.row.isPersonalized">复制H5
            </cjm-button>
            <cjm-button type="text" @click="previewH5(scope.row.isPersonalized, scope.row.listID,scope.row.urlAddress)">预览</cjm-button>
            <cjm-button type="text" @click="deleteH5(scope.row.listID)">删除
            </cjm-button>
            <cjm-button type="text" @click="settingdH5(scope.row.listID)">关联设置
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" :okHandler="confirm">
      <mobile-edit ref="mobileEdit"></mobile-edit>
    </cjm-dialog>
    <cjm-dialog :title="setTingDialogTitle" :visible.sync="setTingDialogVisible" :okHandler="confirm2">
      <setting-related ref="settingRelated"></setting-related>
    </cjm-dialog>
  </div>
</template>

<script>
import mobileEdit from './edit.vue';
import settingRelated from './setting-related.vue';
export default {
  components: {
    mobileEdit,
    settingRelated
  },
  data() {
    return {
      search: {
        h5Name: '',
        corpID: '',
        relateType: '',
        productName: '',
        productBatchCode: '',
        createTime: ''
      },
      requestUrl: this.$globalData.get('base', 'apiUrl').mobileWebsite.GET_LIST,
      dialogTitle: '',
      dialogVisible: false,
      setTingDialogTitle: '',
      setTingDialogVisible: false
    };
  },
  computed: {
    relateTypeItems() {
      return this.$globalData.get('base', 'enums')['关联方式'];
    }
  },
  methods: {
    //新增
    add() {
      this.dialogTitle = '新增H5';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.mobileEdit.addForm();
      });
    },
    copyH5(copyID){
      this.dialogTitle = '复制H5';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.mobileEdit.editForm(copyID, copyID);
      });
    },
    //提交保存
    confirm(callback) {
      this.$refs.mobileEdit
        .submit()
        .then((data) => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
          if(data.listID){
            this.configH5(data);
          }
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    //关联保存
    confirm2(callback) {
      this.$refs.settingRelated
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.setTingDialogVisible = false;
          this.$refs.list.refresh();
          callback();
        }, (error) => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },

    edit(id) {
      this.dialogTitle = '编辑H5';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.mobileEdit.editForm(id);
      });
    },
    configH5(data){
      const { listID, isPersonalized } = data
      this.$ajax.get(this.$globalData.get('base', 'apiUrl').monitorScreen.GET_MONITOR_TOKEN).then((r) => {
        if (r.resultCode === '200' && r.data) {
          // 判断是否为自定义H5 和 点击已存在列表数据 配置H5
          if(isPersonalized === '0' || !listID){
            window.open(this.$globalData.get('base', 'appConfig').h5ConfigPage + listID + '&token=' + r.data.token);
          }
        } else {
          this.$message.error(r.msg);
        }
      }).catch(() => {
        this.$message.error('查看失败,请重新尝试');
      });
    },
    previewH5(isPersonalized, id, urlAddress){
      this.$globalData.get('base', 'enums')['是否个性化']['否'] === isPersonalized && window.open(this.$globalData.get('base', 'appConfig').h5Page + id);
      this.$globalData.get('base', 'enums')['是否个性化']['是'] === isPersonalized && isPersonalized && window.open(urlAddress);
    },
    //删除H5
    deleteH5(id) {
      this.$confirm('确认要删除？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.$globalData.get('base', 'apiUrl').mobileWebsite.DEL, {
              listID: id
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
    settingdH5(id) {
      this.setTingDialogTitle = '关联方式设置';
      this.setTingDialogVisible = true;
      this.$nextTick(function() {
        this.$refs.settingRelated.addForm(id);
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
