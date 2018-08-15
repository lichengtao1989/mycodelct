<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-advanced-search="true" :base-search-placeholder="placeholder" ref="list" @selection-change="handleSelectionChange">
      <div slot="operate">
        <cjm-button @click="addoredit()" type="primary">
          <i class="cjm-icon-add"></i>新增</cjm-button>
        <cjm-button @click="batchDelete">
          <i class="cjm-icon-delete"></i>删除</cjm-button>
        <cjm-button @click="exportData">
          <i class="cjm-icon-export"></i>导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="产品名称" search-key="productName" v-model="search.productName">
          <cjm-input v-model="search.productName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="产品代码" search-key="productCode" v-model="search.productCode">
          <cjm-input v-model="search.productCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="产品分类" search-key="classifyID" v-model="search.classifyID">
          <cjm-remote-select :remote-url="$globalData.get('trace', 'apiUrl').certificate.PRODUCT_CALSSIFY" value-key="classifyID" label-key="classifyName" v-model="search.classifyID">
          </cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="保障方式" search-key="certificateType" v-model="search.certificateType">
          <cjm-select v-model="search.certificateType">
            <cjm-option v-for="(value,key) in certificateType" :label="key" :value="value" :key="value"></cjm-option>
          </cjm-select>
        </cjm-search-item>
        <cjm-search-item label="生产时间" search-key="dateManufacture" v-model="search.dateManufacture">
          <cjm-date-picker v-model="search.dateManufacture" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="所属机构" search-key="orgName" v-model="search.orgName">
          <cjm-input v-model="search.orgName"></cjm-input>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column type="selection" width="55"></cjm-table-column>
        <cjm-table-column prop="thumbnail1" label="产品图" width="120">
          <template slot-scope="scope">
            <img class="thumbnail1" :src="scope.row.thumbnail1">
          </template>
        </cjm-table-column>
        <cjm-table-column prop="productCode" label="产品代码" width="130"></cjm-table-column>
        <cjm-table-column prop="productName" label="产品名称" sortable="custom" width="130"></cjm-table-column>
        <cjm-table-column prop="classifyName" label="产品分类" width="130"></cjm-table-column>
        <cjm-table-column prop="orgName" label="所属机构" width="130"></cjm-table-column>
        <cjm-table-column prop="number" label="合格证发行量" width="180"></cjm-table-column>
        <cjm-table-column prop="certificateTypes" enum-name="安全保障方式" enum-namespace="trace" width="130" label="保障方式"></cjm-table-column>
        <cjm-table-column prop="dateManufacture" label="生产时间" width="150"></cjm-table-column>
        <cjm-table-column prop="createTime" label="创建时间" width="150" sortable="custom"></cjm-table-column>
        <cjm-table-column label="操作" width="340" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" v-if="scope.row.status==0" @click="edit(scope.row.id)">关联打印</cjm-button>
            <cjm-button type="text" @click="vieworedit(scope.row.id,scope.row.orgID)">查看</cjm-button>
            <cjm-button type="text" @click="addoredit(scope.row.id)">编辑</cjm-button>
            <cjm-button type="text" @click="copy(scope.row.id)">复制</cjm-button>
            <cjm-button type="text" @click="deleteCertificate(scope.row.id)">删除</cjm-button>
            <cjm-button type="text" v-if="scope.row.status==0" @click="setValid(scope.row.id,'1')">禁用</cjm-button>
            <cjm-button type="text" v-if="scope.row.status==1" style="color:#4c4c4c;" @click="setValid(scope.row.id,'0')">启用
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <certificate-edit ref="certificateEdit"></certificate-edit>
      <div slot="footer">
        <cjm-button type="primary" @click="printView">打印测试</cjm-button>
        <cjm-button type="primary" @click="print">打印</cjm-button>
        <cjm-button @click="cancel">取消</cjm-button>
      </div>
      <object id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width="0" height="0">
        <embed id="LODOP_EM" type="application/x-print-lodop" width="0" height="0"></embed>
      </object>
    </cjm-dialog>
  </div>
</template>

<script>
import lodopFuncs from '../../utils/print/lodopFuncs';
import certificateEdit from './edit.vue';
import fileDownload from 'framework/utils/fileDownload';
export default {
  components: {
    certificateEdit
  },
  data() {
    return {
      search: {
        productName: '',
        productCode: '',
        classifyID: '',
        certificateType: '',
        dateManufacture: '',
        createTime: '',
        orgName: ''
      },
      requestUrl: this.$globalData.get('trace', 'apiUrl').certificate.GET_LIST,
      dialogTitle: '',
      dialogVisible: false,
      multipleSelection: '',
      placeholder: '请输入编号、名称、分类',
      LODOP: ''
    };
  },
  computed: {
    certificateType() {
      return this.$globalData.get('trace', 'enums')['安全保障方式'];
    }
  },
  methods: {
    //提交保存
    confirm() {
      this.$refs.certificateEdit
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    edit(id) {
      this.dialogTitle = '关联打印';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.certificateEdit.editForm(id);
      });
    },
    cancel() {
      this.dialogVisible = false;
    },
    //查看合格证
    vieworedit(id, orgid) {
      var title = '查看产品电子合格证';
      var url = '../../Module/Sys/ElectronicCertficateView.aspx?ID=' + id + '&orgID=' + orgid;
      var dialogObj = window.$('<div><iframe style="width: 100%;height: 96%;" src="' + url + '" frameborder="no" border="0" id="ElectronicCertficateViewBox"></iframe></div>');
      var data = {
        title: title,
        height: 640,
        width: 820,
        buttons: [
          {
            text: '关 闭',
            handler: function() {
              var text = window.$('.panel.window .panel-title').text();
              if (text == '产品生产者信息') {
                if (!window.frames['ElectronicCertficateViewBox'].location) {
                  window.$(window.frames['ElectronicCertficateViewBox']).attr('src', '../../Module/Sys/ElectronicCertficateView.aspx?ID=' + id + '&OrgID=' + orgid);
                } else {
                  window.frames['ElectronicCertficateViewBox'].location.href = '../../Module/Sys/ElectronicCertficateView.aspx?ID=' + id + '&OrgID=' + orgid;
                }
                window.$('.dialog-button .l-btn-text').text('关 闭');
                window.$('.panel.window .panel-title').text('查看产品电子合格证');
              } else {
                dialogObj.dialog('destroy');
              }
            }
          }
        ]
      };
      dialogObj.dialog(data);
    },
    //添加编辑合格证
    addoredit(id) {
      var gridobj = window.$('.easyuigrid');
      var dialogObj = window.$('<div/>');
      var title = id ? '编辑合格证' : '新建合格证';
      id = id || '';
      var url = '../../Module/Sys/ElectronicCertficateEdit.aspx?ID=' + id;
      var height = 600;
      var self = this.$refs;
      window.showFormDialog(
        dialogObj,
        title,
        url,
        function() {
          window.submitform(url + '&response=json&function=save', window.$('.editform'), function(r) {
            dialogObj.dialog('close');
            gridobj.datagrid('reload');
            window.messager(r.msg);
            self.list.refresh();
          });
        },
        height
      );
    },
    //禁用
    setValid(id, status) {
      var self = this.$refs;
      if (status == '1') {
        window.$.messager.confirm('提示', '是否禁用?', function(result) {
          if (result) {
            window.$.post(
              '../../Module/Sys/ElectronicCertificateList.aspx?response=json&function=SetValid&ID=' + id + '&Status=' + status,
              {},
              function(r) {
                if (r && r.success) {
                  self.list.refresh();
                }
                window.messager(r.msg);
              },
              'json'
            );
          }
        });
      } else {
        window.$.post(
          '../../Module/Sys/ElectronicCertificateList.aspx?response=json&function=SetValid&ID=' + id + '&Status=' + status,
          {},
          function(r) {
            if (r && r.success) {
              self.list.refresh();
            }
            window.messager(r.msg);
          },
          'json'
        );
      }
    },
    lodopPrint(html2) {
      let backgroundWidth = parseInt(html2.backgroundWidth * 10);
      let backgroundHeight = parseInt(html2.backgroundHeight * 10);
      this.LODOP = lodopFuncs.getLodop();
      this.LODOP.PRINT_INIT('');
      var lodop = this;
      for (let i = 0; i < html2.rows.length; i++) {
        let obj = html2.rows[i];
        this.$refs.certificateEdit.form.certificateTypes.map(function(t) {
          if (obj.size != '' && obj.x != '' && obj.y != '') {
            if ('CertificateType' + t == obj.id) {
              lodop.LODOP.SET_PRINT_STYLE('FontSize', obj.size);
              lodop.LODOP.SET_PRINT_STYLE('Font-weight', 'bold');
              lodop.LODOP.ADD_PRINT_TEXT(obj.y + 'mm', obj.x + 'mm', '500mm', '50mm', '√');
            }
          }
        });
        var printName = obj.id
          .split(/\s+/)
          .map(function(item) {
            return item.slice(0, 1).toLowerCase() + item.slice(1);
          })
          .join('');
        if (obj.size != '' && obj.x != '' && obj.y != '') {
          if (this.$refs.certificateEdit.form[printName] != undefined) {
            this.LODOP.SET_PRINT_STYLE('FontSize', obj.size);
            this.LODOP.ADD_PRINT_TEXT(obj.y + 'mm', obj.x + 'mm', '500mm', '50mm', this.$refs.certificateEdit.form[printName]);
          }
        }
      }
      this.LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true);
      this.LODOP.SET_PRINT_PAGESIZE(1, backgroundWidth, backgroundHeight, '');
      //this.LODOP.PREVIEW();
      this.LODOP.PRINT();
    },
    //打印
    print() {
      var lodop = this;
      this.$refs.certificateEdit
        .submit()
        .then(() => {
          this.$message.success('打印成功');
          this.dialogVisible = false;
          for (let i = 0; i < this.$refs.certificateEdit.form.printNumber; i++) {
            this.$refs.certificateEdit
              .printView()
              .then(html2 => {
                lodop.lodopPrint(html2);
              })
              .catch(error => {
                this.$message.error(error);
              });
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //打印测试
    printView() {
      var lodop = this;
      for (let i = 0; i < 3; i++) {
        this.$refs.certificateEdit
          .printView()
          .then(html2 => {
            lodop.lodopPrint(html2);
          })
          .catch(() => {
            this.$message.error('请安装打印控件');
          });
      }
    },
    //导出列表
    exportData() {
      fileDownload(this.$globalData.get('trace', 'apiUrl').certificate.EXPORT_LIST, this.$refs.list.getConditions());
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
        .map(function(x) {
          return x.id;
        })
        .join();
    },
    delete(id) {
      this.$ajax
        .post(this.$globalData.get('trace', 'apiUrl').certificate.REMOVE, {
          ids: id
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.$refs.list.refresh();
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    //删除
    deleteCertificate(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.delete(id);
        })
        .catch();
    },
    //批量删除
    batchDelete() {
      if (this.multipleSelection != '') {
        this.$confirm('确认删除？')
          .then(_ => {
            this.delete(this.multipleSelection);
          })
          .catch();
      } else {
        this.$message.error('请选择要删除的数据');
      }
    },
    //复制
    copy(id) {
      var dialogObj = window.$('<div/>');
      var title = '复制合格证';
      id = id || '';
      var url = '../../Module/Sys/ElectronicCertficateEdit.aspx?ID=' + id + '&IsCopy=true';
      var height = 600;
      var self = this.$refs;
      var gridobj = window.$('.easyuigrid');
      window.showFormDialog(
        dialogObj,
        title,
        url,
        function() {
          window.submitform(url + '&response=json&function=copy', window.$('.editform'), function(r) {
            dialogObj.dialog('close');
            gridobj.datagrid('reload');
            window.messager(r.msg);
            self.list.refresh();
          });
        },
        height
      );
    },
    submitSearch() {
      console.log('1');
      this.$emit('search');
    }
  }
};
</script>
<style scoped>
.thumbnail1 {
  width: 30px;
  height: 30px;
  margin-top: 5px;
}
</style>
