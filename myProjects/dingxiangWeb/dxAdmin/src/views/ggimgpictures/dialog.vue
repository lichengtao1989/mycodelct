<template>

  <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
    <div class="upload">
      <nz-form-item label="上传图片" prop="ImageInfo">
        <nz-image-upload v-model="form.ImageInfo"></nz-image-upload>
        <span class="sps">图片推荐尺寸为380*285</span>
      </nz-form-item>
    </div>
    <nz-form-item label="图片说明" prop="Note">
      <nz-input v-model="form.Note" placeholder="用于轮播图片的说明文字，最多20个字"></nz-input>
    </nz-form-item>
  </nz-form>

</template>
<script>
export default {
  props: ['typeVal'],
  components: {},
  data() {
    return {
      selectAry: [{ name: '新闻动态', value: 2 }, { name: '通告通知', value: 3 }, { name: '工作交流', value: 4 }, { name: '政策法规', value: 5 }],
      formModel: {
        SlideID: '',
        Note: '',
        ApplyType: '',
        ImgPath: '',
        ImageInfo: []
      },
      form: {},
      rules: {}
    };
  },
  mounted() {},
  methods: {
    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);

      this.form.ImgPath = this.form.ImageInfo[0];
      console.log(this.form);
      if (valid) {
        let apiVal = '';
        if (this.title == '图片编辑') {
          apiVal = this.$apiUrl.SLIDE.UPDATE;
        } else {
          apiVal = this.$apiUrl.SLIDE.ADD;
        }
        let { err, res } = await this.$ajax.post(apiVal, this.form);
        console.log(err, res);
        if (err) {
          this.$message.showError('添加失败');
        } else {
          this.$message.success('操作成功');
          this.$emit('save-success');
          this.$refs.dialog.hide();
        }
      }

      callback(); //处理loading
    },
    init() {
      this.title = '添加文章';
      this.form = Object.jsonClone(this.formModel);
    },
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
    initEdit(data) {
      this.title = '图片编辑';
      this.form.SlideID = data.SlideID;
      this.form.Note = data.Note;
      this.form.ApplyType = data.ApplyType;
      this.form.ImgPath = data.ImgPath;
      this.form.ImageInfo = this.ImageInfoParse(data.ImgPath);

      // console.log(this.form);
    },
    show(data) {
      this.init();
      if (data) {
        this.initEdit(data);
      }
      this.$refs.dialog.show();
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.sps {
  margin-left: 20px;
}
</style>