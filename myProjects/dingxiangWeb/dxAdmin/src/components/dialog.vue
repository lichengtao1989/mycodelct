<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" :isNeedOkButton="!readonly" :data-readonly="readonly">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="分类" v-if="isShow">
        <nz-select v-model="form.ArticleSubType" @change="selectFn">
          <nz-option :label="item.name" :value="item.value" v-for="item of selectAry" :key="item.value"></nz-option>
        </nz-select>
      </nz-form-item>
      <nz-form-item label="标题" prop="ArticleTitle" required>
        <nz-input :readonly="readonly" v-model="form.ArticleTitle" placeholder="请输入标题"></nz-input>
      </nz-form-item>
      <nz-form-item label="内容" required>
        <nz-input :readonly="readonly" placeholder="请输入标题" style="display:none;"></nz-input>
        <!-- <iframe class="editor-frame" src="/static/editor/index.html" ref="editorFrame" width="100%" height="300px"></iframe> -->
        <div class="mcepart">
          <ue ref="mce" :value="valuehtml"></ue>
        </div>
      </nz-form-item>
    </nz-form>
  </nz-dialog>
</template>
<script>
import ue from './ue.vue';
export default {
  props: ['typeVal'],
  components: { ue },
  computed: {
    isShow: function() {
      let bol = true;
      if (this.typeVal == 5) {
        bol = false;
      }
      return bol;
    },
    selectAry() {
      let returnAry = [];
      if (this.typeVal == 1) {
        returnAry = [
          { name: '信息发布', value: 1 },
          { name: '三品一标', value: 2 },
          { name: '监管动态', value: 3 },
          { name: '诚信档案', value: 4 },
          { name: '专项整治', value: 5 },
          { name: '农业要闻', value: 6 },
          { name: '处站动态', value: 7 },
          { name: '省内新闻', value: 8 },
          { name: '全国新闻', value: 9 }
        ];
      } else if (this.typeVal == 2) {
        returnAry = [
          { name: '发布性通知', value: 1 },
          { name: '批转性通知', value: 2 },
          { name: '转发性通知', value: 3 },
          { name: '指示性通知', value: 4 },
          { name: '事务性通知', value: 5 },
          { name: '重要事项公告', value: 6 },
          { name: '法定事项公告', value: 7 },
          { name: '专业性公告', value: 8 }
        ];
      } else if (this.typeVal == 3) {
        returnAry = [{ name: '日常周期性工作', value: 1 }, { name: '日常触发性工作', value: 2 }, { name: '任务性工作', value: 3 }, { name: '突发性工作', value: 4 }];
      } else if (this.typeVal == 4) {
        returnAry = [{ name: '政策', value: 1 }, { name: '法规', value: 2 }];
      } else if (this.typeVal == 5) {
      }
      return returnAry;
    }
  },
  data() {
    return {
      valuehtml: '',
      readonly: false,
      addflag: '',
      updateId: '',
      inputAdress: '',
      ManageAddress: '',
      submitType: '',
      title: '',
      contentinput: '1',
      formModel: {
        ArticleTitle: '',
        ArticleType: this.typeVal,
        ArticleSubType: '',
        ReadCount: 0,
        ArticleContent: '',
        Islink: null,
        ArticleID: ''
      },
      form: {},
      rules: {
        ArticleTitle: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        ArticleContent: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    };
  },
  mounted() {},
  methods: {
    selectFn(val) {
      // console.log(val);
      // console.log(this.form.ArticleSubType);
    },
    setContent(str) {
      const editor = this.$refs.editorFrame;
      const contentHtml = str || '';
      if (editor.contentWindow.init) {
        editor.contentWindow.init(contentHtml);
      } else {
        editor.onload = () => {
          editor.contentWindow.init(contentHtml);
        };
      }
    },
    getContent() {
      const editor = this.$refs.editorFrame;
      const content = editor.contentWindow.getContent();
      // this.form.ArticleContent = encodeURIComponent(content);
      this.form.ArticleContent = content;
    },
    async submit(callback) {
      // this.getContent();
      const valid = await this.$validForm(this.$refs.form);
      this.form.ArticleContent = this.$refs.mce.tinymceHtml;
      if (this.form.ArticleContent == '') {
        this.$message.showError('请输入内容');
      } else {
        if (valid) {
          let apiUrlVal = '';
          if (this.title == '添加文章') {
            apiUrlVal = this.$apiUrl.COMMON.ADD;
          } else {
            apiUrlVal = this.$apiUrl.COMMON.UPDATE;
          }
          // let { err, res } = await this.$ajax.post(apiUrlVal, JSON.stringify(this.form));
          if (this.form.ArticleSubType == '') {
            this.form.ArticleSubType = 1;
          }
          let { err, res } = await this.$ajax.post(apiUrlVal, this.form);
          console.log(err, res);
          if (err) {
            this.$message.showError('添加失败');
          } else {
            this.$message.success('操作成功');
            this.$emit('save-success');
            this.$refs.dialog.hide();
          }
        }
      }

      callback(); //处理loading
    },
    init() {
      this.readonly = false;
      this.title = '添加文章';
      this.form = Object.jsonClone(this.formModel);
    },
    initEdit(data) {
      this.title = '编辑';
      this.form = Object.jsonClone(data);
      // this.form.ArticleTitle = data.ArticleTitle;
      // this.form.ArticleType = data.ArticleType;
      // this.form.ArticleSubType = data.ArticleSubType;
      // this.form.ReadCount = data.ReadCount;
      // this.form.Islink = data.Islink;
      // this.form.ArticleID = data.ArticleID;
      // this.form.ArticleContent = data.ArticleContent;
      this.valuehtml = data.ArticleContent;
      // console.log(this.form);
    },
    show(data) {
      this.valuehtml = '';
      this.form = {};
      if (data) {
        this.initEdit(data);
      } else {
        this.init();
      }
      this.$refs.dialog.show();
      this.$nextTick(() => {
        // if (data) {
        //   // console.log(data);
        //   // this.setContent(decodeURIComponent(data.ArticleShortContent));
        //   this.setContent(data.ArticleContent);
        // } else {
        //   this.setContent();
        // }
      });
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.mcepart {
  position: relative;
}
</style>