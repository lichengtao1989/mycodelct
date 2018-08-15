<template>
  <div class="cjm-edit-page">
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="查询页名称" prop="queryPageName" class="cjm-form-item-long" required>
        <cjm-input placeholder="超级码SAAS云平台（最多输入20个字）" v-model="form.queryPageName"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="关联组织" class="cjm-form-item-long">
        <cjm-remote-select :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.CORP" :label="form.corpName" v-model="form.corpID">
          <template slot-scope="scope">{{scope.item.name}}({{scope.item.corpID}})</template>
        </cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item label="LOGO类型" prop="logoType" class="cjm-form-item-long" required>
        <cjm-radio-group v-model="form.logoType">
          <cjm-radio label="0" key="0">图片</cjm-radio>
          <cjm-radio label="1" key="1">文字</cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="图片" class="cjm-form-item-long" v-if="form.logoType == 0">
        <cjm-image-upload v-model="form.queryPageLogo" :item-style="{width: '450px'}" :beforeDelete="beforeDeleteLogoImg" tips="推荐尺寸450-1200*68"></cjm-image-upload>
      </cjm-form-item>
      <cjm-form-item label="文字" prop="queryPageTitle" class="cjm-form-item-long" v-show="form.logoType == 1">
        <cjm-input v-model="form.queryPageTitle" placeholder="最多输入20个字"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="背景图片" class="cjm-form-item-long">
        <cjm-image-upload v-model="form.queryPageBackground" :item-style="{width: '450px'}" :beforeDelete="beforeDeleteBackgroundImg" tips="推荐尺寸1920*1080"></cjm-image-upload>
      </cjm-form-item>
      <cjm-form-item label="查询页署名行一" prop="queryPageSign1" class="cjm-form-item-long">
        <cjm-input v-model="form.queryPageSign1" placeholder="最多输入30个字"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="查询页署名行二" prop="queryPageSign2" class="cjm-form-item-long">
        <cjm-input v-model="form.queryPageSign2" placeholder="最多输入30个字"></cjm-input>
      </cjm-form-item>
    </cjm-form>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button type="primary" @click="confirm()">
        <i class="cjm-icon-confirm"></i>确定</cjm-button>
      <cjm-button type="default" @click="cancel()">
        <i class="cjm-icon-close"></i>取消</cjm-button>
    </div>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  mixins: [pageSwitch],
  data() {
    return {
      form: {
        queryPageName: '',
        logoType: '',
        corpID: '',
        queryPageLogo: '',
        queryPageTitle: '',
        queryPageBackground: '',
        queryPageSign1: '',
        queryPageSign2: ''
      },
      defaultForm: {},
      rules: {
        queryPageName: [this.$formRules.required, this.$formRules.maxLength(20)],
        logoType: [this.$formRules.required],
        queryPageTitle: [this.$formRules.maxLength(20)],
        queryPageSign1: [this.$formRules.maxLength(30)],
        queryPageSign2: [this.$formRules.maxLength(30)]
      }
    };
  },
  watch: {
    'form.queryPageLogo'(val, oldVal) {
      if (oldVal && !val) {
        //如果图片删除了，设置为默认值
        this.$nextTick(() => {
          this.form.queryPageLogo = this.defaultForm.queryPageLogo;
        });
      }
    },
    'form.queryPageBackground'(val, oldVal) {
      if (oldVal && !val) {
        //如果图片删除了，设置为默认值
        this.$nextTick(() => {
          this.form.queryPageBackground = this.defaultForm.queryPageBackground;
        });
      }
    },
    'form.logoType'(val, oldVal) {
      if (oldVal) {
        if (val == 0) {
          this.form.queryPageTitle = '';
        } else {
          this.form.queryPageLogo = '';
          this.form.queryPageTitle = this.defaultForm.queryPageTitle;
        }
      }
    }
  },
  methods: {
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$ajax
            .post(this.$globalData.get('trace', 'apiUrl').queryPageConfiguration.SAVE, this.form)
            .then(r => {
              if (r.resultCode == '200' && r.data) {
                this.popPage();
              } else {
                this.$message.error('提交失败');
              }
            });
        } else {
          this.$message.warning('请正确填写信息');
        }
      });
    },
    cancel() {
      this.$confirm('确认取消操作吗？', '提示', { type: 'warning' })
        .then(() => {
          this.popPage();
        })
        .catch(() => {});
    },
    beforeDeleteLogoImg() {
      return this.$confirm('确认要将logo图片恢复默认吗？', '提示', { type: 'warning' });
    },
    beforeDeleteBackgroundImg() {
      return this.$confirm('确认要将背景图片恢复默认吗？', '提示', { type: 'warning' });
    },
    //加载默认数据
    loadDefaultData() {
      return new Promise((resolve, reject) => {
        if (!this.$storage.get('QueryPageConfigurationDefaultData')) {
          this.$ajax
            .get(this.$globalData.get('trace', 'apiUrl').queryPageConfiguration.GET_DETAIl, {
              id: ''
            })
            .then(r => {
              if (r.resultCode == '200' && r.data) {
                r.data.corpID = '';
                this.$storage.set('QueryPageConfigurationDefaultData', r.data);
                this.defaultForm = this.$storage.get('QueryPageConfigurationDefaultData');
                resolve();
              }
            })
            .catch(err => {
              reject(err);
            });
        } else {
          this.defaultForm = this.$storage.get('QueryPageConfigurationDefaultData');
          resolve();
        }
      });
    }
  },
  created() {
    let type = this.getPageParams('edit').type;
    if (type == 'edit') {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').queryPageConfiguration.GET_DETAIl, {
          id: this.getPageParams('edit').id
        })
        .then(r => {
          if (r.resultCode == '200' && r.data) {
            this.form = r.data;
          }
        });
    }
    this.loadDefaultData().then(() => {
      if (type == 'add') {
        this.form = Object.deepClone(this.defaultForm);
      }
    });
  }
};
</script>
<style>

</style>
