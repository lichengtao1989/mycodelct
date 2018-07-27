<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" :isNeedOkButton="!readonly" :data-readonly="readonly">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">

      <nz-form-item label="标题" prop="ArticleTitle">
        <nz-input :readonly="readonly" v-model="form.ArticleTitle" placeholder="请输入标题"></nz-input>
      </nz-form-item>
      <nz-form-item label="链接" prop="ArticleContent" >
        <nz-input :readonly="readonly" v-model="form.ArticleContent" placeholder="必须以http://或https://开始"></nz-input>
      </nz-form-item>

    </nz-form>
  </nz-dialog>
</template>
<script>
export default {
  props: ['typeVal'],
  components: {},
  data() {
    return {
      readonly: false,
      addflag: '',
      updateId: '',
      inputAdress: '',
      ManageAddress: '',
      submitType: '',
      title: '',
      contentinput: '1',
      selectAry: [
        { name: '信息发布', value: 1 },
        { name: '三品一标', value: 2 },
        { name: '监管动态', value: 3 },
        { name: '诚信档案', value: 4 },
        { name: '专项整治', value: 5 },
        { name: '农业要闻', value: 6 },
        { name: '处站动态', value: 7 },
        { name: '省内新闻', value: 8 },
        { name: '全国新闻', value: 9 }
      ],
      formModel: {
        ArticleTitle: '',
        ArticleType: this.typeVal,
        ArticleSubType: '',
        ReadCount: 0,
        ArticleContent: '',
        Islink: 1,
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
    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);
      if (this.form.ArticleContent == '') {
        // this.$message.showError('请输入内容');
      } else {
        if (valid) {
          let apiUrlVal = '';
          if (this.title == '添加文章链接') {
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
      this.title = '添加文章链接';
      this.form = Object.jsonClone(this.formModel);
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
      console.log(this.form);
    },
    show(data) {
      this.form = {};
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
