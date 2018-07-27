<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" :isNeedOkButton="!readonly" :data-readonly="readonly">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="标题" prop="Title" required>
        <nz-input v-model="form.Title" placeholder="请输入文件标题" style="width:50%;"></nz-input>
        <span>{{showText}}</span>
      </nz-form-item>
      <nz-form-item label="文件名" v-if="flagshow">
        <nz-input v-model="form.FileName" placeholder="" style="width:50%;" readonly="true"></nz-input>
        <span>{{showText}}</span>
      </nz-form-item>
      <nz-form-item label="上传文件" prop="LinkName">
        <nz-file-upload v-model="fileVal" @successFile="successFile" @fileInfo="fileInfo"></nz-file-upload>
        <span>支持格式*.doc,*.pdf</span>
      </nz-form-item>
    </nz-form>
  </nz-dialog>
</template>
<script>
export default {
  methods: {
    fileInfo(val) {
      console.log(val);
      if (val.name.indexOf('doc') > -1 || val.name.indexOf('pdf') > -1) {
        this.form.FileName = val.name;
        this.flagshow = true;
      } else {
        this.$message.showError('上传文件格式不对，请重新上传');
      }
    },
    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let apiVal = '';
        if (this.title == '编辑') {
          apiVal = this.$apiUrl.MATERIAL.UPDATE;
        } else {
          apiVal = this.$apiUrl.MATERIAL.ADD;
        }
        if (this.flagshow) {
          let { err, res } = await this.$ajax.post(apiVal, this.form);
          console.log(err, res);
          if (err) {
            this.$message.showError('添加失败');
          } else {
            this.$message.success('操作成功');
            this.$emit('save-success');
            this.$refs.dialog.hide();
          }
        } else {
          this.$message.showError('请上传文件');
        }
      }

      callback(); //处理loading
    },
    successFile(val) {
      // console.log(val);
      this.form.Path = val.path;
    },
    initEdit(data) {
      this.title = '编辑';
      this.form.Title = data.Title;
      this.form.MaterialID = data.MaterialID;
      this.form.Path = data.Path;
      this.form.FileName = data.FileName;
      if (data.FileName) {
        this.flagshow = true;
      }
    },
    init() {
      this.readonly = false;
      this.title = '添加';
      // this.form = Object.jsonClone(this.formModel);
    },
    show(data) {
      this.form = {};
      this.flagshow = false;
      if (data) {
        this.initEdit(data);
      } else {
        this.init();
      }
      this.$refs.dialog.show();
    }
  },
  watch: {
    fileVal: function(oval, nval) {
      console.log(oval, nval);
    }
  },
  data() {
    return {
      flagshow: false,
      showText: '',
      fileVal: '',
      form: {
        Title: '',
        Path: '',
        MaterialID: '',
        FileName: ''
      }
    };
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