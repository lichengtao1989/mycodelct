<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-advanced-search="true" :base-search-placeholder="placeholder" ref="list">
      <div slot="operate">
        <cjm-button @click="add" type="primary">
          <i class="cjm-icon-add"></i>新增模板</cjm-button>
        <cjm-button @click="downloadPrint" v-show="download">
          <i class="cjm-icon-import"></i>下载打印控件</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="模板名" search-key="templetName" v-model="search.templetName">
          <cjm-input v-model="search.templetName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="更新者" search-key="lastUpdateUserName" v-model="search.lastUpdateUserName">
          <cjm-input v-model="search.lastUpdateUserName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="更新时间" search-key="lastUpdateTime" v-model="search.lastUpdateTime">
          <cjm-date-picker v-model="search.lastUpdateTime" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="templetName" label="模板名"></cjm-table-column>
        <cjm-table-column prop="lastUpdateUserName" label="更新者"></cjm-table-column>
        <cjm-table-column prop="lastUpdateTime" label="更新时间" sortable="custom"></cjm-table-column>
        <cjm-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.templetID)">编辑</cjm-button>
            <cjm-button type="text" v-if="scope.row.isSystem == 0" @click="deleteTemplet(scope.row.templetID)">删除
            </cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" :beforeClose="close">
      <templet-edit ref="templetEdit"></templet-edit>
      <div slot="footer">
        <cjm-button type="primary" @click="printView">打印预览</cjm-button>
        <cjm-button type="primary" @click="confirm">确认</cjm-button>
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
import fileDownload from 'framework/utils/fileDownload';
import templetEdit from './templet-edit.vue';

export default {
  components: {
    templetEdit
  },
  data() {
    return {
      search: {
        templetName: '',
        lastUpdateUserName: '',
        lastUpdateTime: ''
      },
      requestUrl: this.$globalData.get('trace', 'apiUrl').certificate.GET_TEMPLTE_LIST,
      dialogTitle: '',
      dialogVisible: false,
      download: true,
      placeholder: '请输入模板名、更新者',
      LODOP: ''
    };
  },
  methods: {
    //获取组织类型名称
    getCorpTypeName(corpType) {
      let types = this.$store.state.enumData['组织类型'];
      for (let type in types) {
        if (types[type] == corpType) {
          return type;
        }
      }
    },
    //新增
    add() {
      this.dialogTitle = '新增打印模板';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.templetEdit.addForm();
      });
    },
    //删除模板
    deleteTemplet(templetID) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.$ajax
            .post(this.$globalData.get('trace', 'apiUrl').certificate.REMOVE_TEMPLTE, {
              templetID: templetID
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$refs.list.refresh();
              } else {
                this.$message.error(r.msg);
              }
            });
        })
        .catch(_ => {});
    },
    //提交保存
    confirm() {
      this.$refs.templetEdit
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
        })
        .catch(error => {
          var newTemplet = [];
          for (let i = 0; i < this.$refs.templetEdit.form.datas.length; i++) {
            var x = this.$refs.templetEdit.form.datas[i];
            if (x.id != 'CertificateType0' && x.id != 'CertificateType1' && x.id != 'CertificateType2' && x.id != 'CertificateType3') {
              newTemplet.push(x);
            }
          }
          this.$refs.templetEdit.form.datas = newTemplet;
          if (error != '') {
            this.$message.error(error.message);
          }
        });
    },
    edit(id) {
      this.dialogTitle = '编辑打印模板';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.templetEdit.editForm(id);
      });
    },
    isObjectValueEqual(a, b) {
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (Array.isArray(a[propName])) {
          for (var j = 0; j < a[propName].length; j++) {
            if (a[propName][j].x != b[propName][j].x || a[propName][j].y != b[propName][j].y || a[propName][j].size != b[propName][j].size) {
              return false;
            }
          }
        } else {
          if (typeof a[propName] != 'object') {
            if (a[propName] !== b[propName]) {
              return false;
            }
          }
        }
      }
      return true;
    },
    isObjectValueEqual2(a, b) {
      var aProps = a;
      var bProps = b;
      if (aProps.length != bProps.length) {
        return false;
      }
      for (var i = 0; i < aProps.length; i++) {
        if (aProps[i].x != bProps[i].x || aProps[i].y != bProps[i].y || aProps[i].size != bProps[i].size) {
          return false;
        }
      }
      return true;
    },
    cancel() {
      var newForm = this.$refs.templetEdit.form;
      var oldForm = this.$refs.templetEdit.oldForm;
      var certificateTypes = this.$refs.templetEdit.certificateTypes;
      var oldCertificateTypes = this.$refs.templetEdit.oldCertificateTypes;
      if (this.isObjectValueEqual2(certificateTypes, oldCertificateTypes) && this.isObjectValueEqual(newForm, oldForm)) {
        this.dialogVisible = false;
      } else {
        this.$confirm('您尚未保存，确定关闭？')
          .then(_ => {
            this.dialogVisible = false;
          })
          .catch(_ => {});
      }
    },
    //下载打印控件
    downloadPrint() {
      fileDownload(this.$globalData.get('trace', 'appConfig').printLodopUrl);
    },
    //关闭按钮
    close() {
      var newForm = this.$refs.templetEdit.form;
      var oldForm = this.$refs.templetEdit.oldForm;
      var certificateTypes = this.$refs.templetEdit.certificateTypes;
      var oldCertificateTypes = this.$refs.templetEdit.oldCertificateTypes;
      if (this.isObjectValueEqual2(certificateTypes, oldCertificateTypes) && this.isObjectValueEqual(newForm, oldForm)) {
        this.dialogVisible = false;
      } else {
        this.$confirm('您尚未保存，确定关闭？')
          .then(_ => {
            this.dialogVisible = false;
          })
          .catch(_ => {});
      }
    },
    printView() {
      let backgroundHeight = this.$refs.templetEdit.form.backgroundHeight * 2 + 'mm';
      let backgroundWidth = this.$refs.templetEdit.form.backgroundWidth * 2 + 'mm';
      this.LODOP = lodopFuncs.getLodop();
      this.LODOP.PRINT_INIT('');
      let printContent = this.$refs.templetEdit.printView();
      for (let i = 0; i < printContent.length; i++) {
        let obj = printContent[i];
        if (obj.x != '' && obj.y != '' && obj.size != '') {
          this.LODOP.SET_PRINT_STYLE('FontSize', parseInt(obj.size) * 2);
          if (obj.name == '自检合格' || obj.name == '质量控制合格' || obj.name == '自我承诺合格' || obj.name == '委托检测合格') {
            this.LODOP.SET_PRINT_STYLE('FontWeight', 'bold');
            this.LODOP.ADD_PRINT_TEXT(parseInt(obj.y) * 2 + 'mm', parseInt(obj.x) * 2 + 'mm', '500mm', '50mm', '√');
          } else {
            this.LODOP.ADD_PRINT_TEXT(parseInt(obj.y) * 2 + 'mm', parseInt(obj.x) * 2 + 'mm', '500mm', '50mm', obj.name);
          }
        }
      }
      this.LODOP.ADD_PRINT_SETUP_BKIMG('<img border="0" style="width:' + backgroundWidth + ';height:' + backgroundHeight + ';" src="' + this.$refs.templetEdit.form.backgroundUrl + '"/>');
      this.LODOP.SET_SHOW_MODE('BKIMG_PRINT', 1);
      this.LODOP.SET_PRINT_PAGESIZE(1, backgroundWidth, backgroundHeight, '');
      this.LODOP.PREVIEW();
    }
  },
  mounted() {
    setTimeout(function() {
      this.LODOP = lodopFuncs.getLodop();
      if (this.LODOP == null || typeof this.LODOP.VERSION == 'undefined') {
        this.download = false;
      }
    }, 1000);
  }
};
</script>
<style scoped>

</style>
