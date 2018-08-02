<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" :isNeedOkButton="!readonly" :data-readonly="readonly">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="分类">
        <nz-select v-model="form.ApplyType">
          <nz-option :label="item.name" :value="item.value" v-for="item of selectAry" :key="item.value"></nz-option>
        </nz-select>
      </nz-form-item>
      <div class="upload">

      </div>
      <nz-form-item label="上传图片" prop="ImageInfo">
        <nz-image-upload v-model="form.ImageInfo"></nz-image-upload>
        <span class="sps">图片推荐尺寸为380*285</span>
      </nz-form-item>
      <nz-form-item label="图片说明" prop="ImageName">
        <nz-input v-model="form.ImageName" placeholder="用于轮播图片的说明文字，最多20个字"></nz-input>
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
      selectAry: [{ name: '新闻动态', value: 2 }, { name: '通告通知', value: 3 }, { name: '工作交流', value: 4 }, { name: '政策法规', value: 5 }],
      formModel: {
        ImgID: '',
        ImageName: '',
        ApplyType: '',
        ImagePath: '',
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

      this.form.ImagePath = this.form.ImageInfo[0];
      // console.log(this.form);
      if (valid) {
        let apiVal = '';
        if (this.title == '图片编辑') {
          apiVal = this.$apiUrl.SYSIMAGE.UPDATE;
        } else {
          apiVal = this.$apiUrl.SYSIMAGE.ADD;
        }
        let { err, res } = await this.$ajax.post(apiVal, this.form);
        // console.log(err, res);
        if (err) {
          // console.log(err.Error);
          this.$message.showError(err);
        } else {
          if (res.ResultCode == 200) {
            this.$message.success('操作成功');
            this.$emit('save-success');
            this.$refs.dialog.hide();
          } else {
            this.$message.showError(res.Error);
          }
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
      this.form.ImgID = data.ImgID;
      this.form.ImageName = data.ImageName;
      this.form.ApplyType = data.ApplyType;
      this.form.ImagePath = data.ImagePath;
      this.form.ImageInfo = this.ImageInfoParse(data.ImagePath);

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