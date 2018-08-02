<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" :isNeedOkButton="!readonly" :data-readonly="readonly">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">

      <nz-form-item label="标题" prop="LinkName" required>
        <nz-input v-model="form.LinkName" placeholder=""></nz-input>
      </nz-form-item>
      <div class="tpartlct">
        <nz-form-item label="链接" prop="LinkUrl" required>
          <nz-input v-model="form.LinkUrl" placeholder="必须以http://或https://开始"></nz-input>
        </nz-form-item>
      </div>
      <nz-form-item label="类型" required>
        <nz-button size="small" :class="{activelct:index==myindex}" @click="clickTab(index)" v-for="(item,index) of textAry" :key="item.id">
          {{item.text}}
        </nz-button>
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
      myindex: 0,
      textAry: [{ text: '友情链接', id: 1 }, { text: '其他链接', id: 2 }],
      formModel: {
        LinkID: '',
        LinkName: '',
        LinkType: 1,
        LinkUrl: ''
      },
      form: {},
      rules: {}
    };
  },
  mounted() {},
  methods: {
    clickTab(idx) {
      this.myindex = idx;
      this.form.LinkType = idx + 1;
      console.log(this.form);
    },
    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);

      // this.form.ImgPath = this.form.ImageInfo[0];
      console.log(this.form);
      if (valid) {
        let apiVal = '';
        if (this.title == '链接编辑') {
          apiVal = this.$apiUrl.SYSLINK.UPDATE;
        } else {
          apiVal = this.$apiUrl.SYSLINK.ADD;
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
      this.title = '添加链接';
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
      this.title = '链接编辑';
      this.form.LinkID = data.LinkID;
      this.form.LinkName = data.LinkName;
      this.form.LinkUrl = data.LinkUrl;
      this.form.LinkType = data.LinkType;
      this.myindex = data.LinkType - 1;

      this.form.ImgPath = data.ImgPath;

      // this.form.ImageInfo = this.ImageInfoParse(data.ImgPath);

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
.activelct {
  background: #00a88a;
  color: #fff;
}
</style>