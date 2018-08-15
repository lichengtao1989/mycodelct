<template>
  <div>
    <cjm-list :request-url="requestUrl"
              :need-advanced-search="true"
              base-search-placeholder="输入卡片标题搜索"
              ref="list">
      <div slot="operate">
        <cjm-button @click="add" type="primary"><i class="cjm-icon-add"></i>注册卡片</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="卡片标题" search-key="title" v-model="search.title">
          <cjm-input v-model="search.title"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="卡片分类" search-key="category" v-model="search.category">
          <cjm-enum-select v-model="search.category" enum-name="卡片分类" enum-namespace="base"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="二级分类" search-key="secondCategory" v-model="search.secondCategory" v-show="search.category==enums.cardCategory.GRAPH">
          <cjm-enum-select v-model="search.secondCategory" enum-name="图表卡片分类" enum-namespace="base"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="产品线" search-key="bu" v-model="search.bu">
          <cjm-enum-select v-model="search.bu" enum-name="产品线" enum-namespace="base"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="当前状态" v-model="search.status" search-key="status">
          <cjm-enum-select v-model="search.status" enum-name="启用禁用" enum-namespace="base"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="卡片尺寸" search-key="size" v-model="search.size">
          <cjm-enum-select v-model="search.size" enum-name="卡片尺寸" enum-namespace="base"
                           :clearable="true"></cjm-enum-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="title" min-width="180" label="卡片标题" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="category" width="120" label="卡片分类" enum-name="卡片分类"
                          enum-namespace="base" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="secondCategory" width="120" label="二级分类"
                          :formatter="secondCategoryFormatter" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="bu" width="100" label="产品线" enum-name="产品线" enum-namespace="base" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="status" width="120" label="当前状态" enum-name="启用禁用"
                          enum-namespace="base" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="size" width="120" label="卡片尺寸" enum-name="卡片尺寸"
                          enum-namespace="base" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="createTime" width="160" label="注册时间" sortable="custom"></cjm-table-column>
        <cjm-table-column label="操作" width="110" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.id)">编辑</cjm-button>
            <cjm-button type="text" v-if="scope.row.status==1" @click="disable([scope.row.id])">禁用</cjm-button>
            <cjm-button type="text" v-if="scope.row.status==0" @click="enable([scope.row.id])">启用</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog ref="cardEditDialog"
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                :okHandler="confirm">
      <card-edit ref="cardEdit"></card-edit>
      <div slot="footer">
        <cjm-button type="primary" @click="confirm(1)" :loading="btnLoading"><i class="cjm-icon-confirm"></i>完成并启用</cjm-button>
        <cjm-button @click="confirm(0)" :loading="btnLoading"><i class="cjm-icon-confirm"></i>完成并禁用</cjm-button>
        <cjm-button @click="dialogVisible=false" :loading="btnLoading"><i class="cjm-icon-close"></i>取消</cjm-button>
      </div>
    </cjm-dialog>
  </div>
</template>

<script>
  import CardEdit from './edit.vue';
  export default {
    components: {
      CardEdit
    },
    data() {
      return {
        enums: this.$globalData.get('base', 'enums'),
        apiUrl: this.$globalData.get('base', 'apiUrl'),
        search: {
          title: '',
          category: '',
          secondCategory: '',
          bu: '',
          status: '',
          size: ''
        },
        requestUrl: this.$globalData.get('base', 'apiUrl').card.GET_LIST,
        dialogTitle: '',
        dialogVisible: false,
        btnLoading: false
      };
    },
    methods: {
      //新增
      add() {
        this.dialogTitle = '注册卡片';
        this.dialogVisible = true;
        this.$nextTick(()=> {
          this.$refs.cardEdit.addForm();
        });
      },
      //编辑
      edit(id) {
        this.dialogTitle = '编辑卡片';
        this.dialogVisible = true;
        this.$nextTick(()=> {
          this.$refs.cardEdit.editForm(id);
        });
      },
      //禁用
      disable(ids) {
        this.$confirm('确认禁用该卡片？', '提示', {type: 'warning'}).then(()=> {
          this.setStatus(ids, 0);
        }).catch(()=> {
        });
      },
      //启用
      enable(ids) {
        this.setStatus(ids, 1);
      },
      //设置状态
      setStatus(ids, status){
        this.$ajax.post(this.apiUrl.card.SET_STATUS, {
          ids: ids,
          status: status
        }).then((r) => {
          if (r.resultCode == 200) {
            this.$refs.list.refresh();
          } else {
            this.$message.error(r.msg);
          }
        }).catch(error=> {
          this.$message.error(error.message);
        });
      },
      //提交保存
      confirm(status) {
        this.btnLoading = true;
        this.$refs.cardEdit.submit(status).then(() => {
          this.dialogVisible = false;
          this.$message.success('保存成功');
          this.$refs.list.refresh();
          this.btnLoading = false;
        }).catch((error) => {
          if (error) {
            this.$message.error(error.message);
          }
          this.btnLoading = false;
        });
      },
      //二级分类格式化
      secondCategoryFormatter(row){
        if (row.category == this.enums.cardCategory.GRAPH) {
          let graphCardCategorys = this.enums['图表卡片分类'];
          for (let key in graphCardCategorys) {
            if (graphCardCategorys[key] == row.secondCategory) {
              return key;
            }
          }
        }
        return '';
      }
    }
  };
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
