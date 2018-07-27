<template>

  <nz-form label-width="80px" ref="form" :model="form" :rules="rules">

    <div class="upload">
      <nz-form-item label="上传图片" prop="ImageInfo" v-if="imginfoFlag">
        <nz-image-upload v-model="ImageInfo" @successFile="successFile"></nz-image-upload>
        <span class="sps">图片推荐尺寸为建议尺寸1320*115</span>
      </nz-form-item>
    </div>

    <!-- <nz-form-item label="图片说明" prop="Note">
      <nz-input style="width:60%;" v-model="form.ImageName" placeholder="用于轮播图片的说明文字，最多20个字"></nz-input>
    </nz-form-item> -->
    <nz-button type="primary" @click="saveFn" class="marg">保存</nz-button>
  </nz-form>

</template>
<script>
export default {
  props: ['typeVal'],
  components: {},
  data() {
    return {
      imginfoFlag: true,
      isNew: 1,
      ImgID: '',
      ImageName: '',
      ImageInfo: '',
      rules: {},
      form: { ImageName: '', ImageInfo: [], ApplyType: 6 }
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    successFile(val) {
      this.ImageInfo = val.path;
    },
    async getInfo() {
      let { err, res } = await this.$ajax.get(this.$apiUrl.SYSIMAGE.GETLIST);
      if (err) {
      } else {
        if (res.Data.Total > 0) {
          this.form.ImageName = res.Data.List[0].ImageName;
          if (res.Data.List[0].ImagePath) {
            this.ImageInfo = res.Data.List[0].ImagePath;
            this.isNew = 2;
            this.ImgID = res.Data.List[0].ImgID;
          }
        } else {
        }

        // this.imginfoFlag = res.Data.List[0].CorpID;
      }
    },
    async saveFn() {
      let apiUrl = '';
      console.log(this.ImageInfo);
      if (this.isNew == 2) {
        apiUrl = this.$apiUrl.SYSIMAGE.UPDATE;
      } else {
        apiUrl = this.$apiUrl.SYSIMAGE.INSERT;
      }
      let { err, res } = await this.$ajax.post(apiUrl, { ApplyType: 6, ImagePath: this.ImageInfo, ImgID: this.ImgID });
      if (err) {
        this.$message.showError('操作失败');
      } else {
        if (res.ResultCode == 200) {
          this.$message.success('操作成功');
        }
      }
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.sps,
.marg {
  margin-left: 20px;
}
.upload {
  padding-top: 50px;
}
</style>