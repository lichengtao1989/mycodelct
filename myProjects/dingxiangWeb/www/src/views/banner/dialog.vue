<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" :isNeedOkButton="!readonly" :data-readonly="readonly">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <!-- <nz-form-item label="分类">
        <nz-select v-model="form.ArticleSubType">
          <nz-option :label="item.name" :value="item.value" v-for="item of selectAry" :key="item.value"></nz-option>
        </nz-select>
      </nz-form-item> -->
      <nz-form-item label="标题" prop="ArticleTitle">
        <nz-input :readonly="readonly" v-model="form.ArticleTitle" placeholder="请输入标题"></nz-input>
      </nz-form-item>
      <div class="upload">
        <nz-form-item label="上传图片" prop="ImageInfo">
          <nz-image-upload v-model="form.ImageInfo"></nz-image-upload>
          <span class="sps">图片推荐尺寸为380*285</span>
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
import ue from '@/components/ue.vue';
export default {
  props: ['typeVal'],
  components: { ue },

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
        ImageInfo: [],
        ImagePath: '',
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
        ArticleTitle: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      }
    };
  },
  mounted() {},
  methods: {
    ImageInfoParse(img) {
      let imgAry = [];
      if (img) {
        if (typeof img === 'string') {
          imgAry[0] = img;
        } else {
          imgAry = img;
        }
      } else {
      }
      return imgAry;
    },

    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);
      this.form.ArticleContent = this.$refs.mce.tinymceHtml;
      if (this.form.ArticleContent == '') {
        this.$message.showError('请输入内容');
      } else {
        if (valid) {
          this.form.ImagePath = this.form.ImageInfo[0];

          console.log(this.form);
          let apiUrlVal = '';
          if (this.title == '添加图片新闻轮播') {
            apiUrlVal = this.$apiUrl.COMMON.ADD;
          } else {
            apiUrlVal = this.$apiUrl.COMMON.UPDATE;
          }
          // let { err, res } = await this.$ajax.post(apiUrlVal, JSON.stringify(this.form));
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
      this.title = '添加图片新闻轮播';
      this.form = Object.jsonClone(this.formModel);
      console.log(this.form);
    },
    initEdit(data) {
      this.title = '编辑';
      this.form.ArticleTitle = data.ArticleTitle;
      this.form.ArticleType = data.ArticleType;
      this.form.ArticleSubType = data.ArticleSubType;
      this.form.ReadCount = data.ReadCount;
      this.form.Islink = data.Islink;
      this.form.ArticleID = data.ArticleID;
      this.form.ArticleContent = data.ArticleContent;
      this.form.ImageInfo = this.ImageInfoParse(data.ImagePath);
      this.valuehtml = data.ArticleContent;
      console.log(this.form);
    },
    show(data) {
      this.valuehtml = '';
      if (data) {
        this.initEdit(data);
      } else {
        this.init();
      }
      this.$refs.dialog.show();
    }
  }
};
</script>
