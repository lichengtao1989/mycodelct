<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" :isNeedOkButton="!readonly" :data-readonly="readonly">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="标题" prop="Title">
        <nz-input :readonly="readonly" v-model="form.Title" placeholder="请输入标题"></nz-input>
      </nz-form-item>
      <div class="upload" v-if="typeVal==6">
        <nz-form-item label="上传图片">
          <nz-image-upload v-model="ImagePathVal"></nz-image-upload>
        </nz-form-item>
      </div>
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
      ImagePathVal: [],
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
        Title: '',
        type: this.typeVal,
        ArticleSubType: '',
        ReadCount: 0,
        content: '',
        Islink: null,
        Imgs: [],
        ArticleID: ''
      },
      form: {},
      rules: {
        Title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        ArticleContent: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    };
  },
  mounted() {},
  methods: {
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
      // this.form.content = encodeURIComponent(content);
      this.form.content = content;
    },
    async submit(callback) {
      // this.getContent();
      const valid = await this.$validForm(this.$refs.form);
      if (this.title == '添加文章') {
        this.form.content = this.$refs.mce.tinymceHtml;
      } else {
        this.form.Content = this.$refs.mce.tinymceHtml;
      }

      if (this.$refs.mce.tinymceHtml == '') {
        this.$message.showError('请输入内容');
      } else {
        if (valid) {
          let apiUrlVal = '';
          if (this.title == '添加文章') {
            apiUrlVal = this.$apiUrl.NEWS.ADD;
          } else {
            apiUrlVal = this.$apiUrl.NEWS.UPDATE;
          }
          // let { err, res } = await this.$ajax.post(apiUrlVal, JSON.stringify(this.form));
          if (this.typeVal == 6) {
            if (this.ImagePathVal.length < 1) {
              this.$message.showError('请上传图片');
              callback();
              return false;
            } else {
              this.form.Imgs = this.ImagePathVal;
            }
          } else {
            this.form.Imgs = [];
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
      this.form.content = data.Content;
      this.valuehtml = data.Content;
      this.ImagePathVal = data.ImgList;
    },
    show(data) {
      this.valuehtml = '';
      this.ImagePathVal = [];
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
        //   this.setContent(data.content);
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