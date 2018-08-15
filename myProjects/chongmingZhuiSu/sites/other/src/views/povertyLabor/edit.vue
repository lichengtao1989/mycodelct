<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="岗位编号" prop="postNo" required class="cjm-form-item-long">
      <cjm-input v-model="form.postNo"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="岗位名称" prop="postName" required class="cjm-form-item-long">
      <cjm-input v-model="form.postName"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="备注" prop="note" class="cjm-form-item-long">
      <cjm-input v-model="form.note" type="textarea" :rows="2"></cjm-input>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      enums: this.$globalData.get('other', 'enums'),
      apiUrl: this.$globalData.get('other', 'apiUrl'),
      form: {},
      rules: {
        postNo: [this.$formRules.required, this.$formRules.maxLength(10)],
        postName: [this.$formRules.required, this.$formRules.maxLength(20)],
        note: [this.$formRules.maxLength(100)]
      }
    };
  },
  computed: {
    // yesOrNo(){
    //   return this.enums['是否'];
    // }
  },
  methods: {
    addForm() {
      this.reset();
      this.$nextTick(() => {
        const currentUser = this.$globalData.get('currentUser');
        if (currentUser.orgType == this.enums.orgType.COMPANY) {
          this.form.orgID = currentUser.orgID;
          this.form.orgName = currentUser.orgName;
        }
      });
    },
    editForm(id) {
      this.reset();
      this.$ajax
        .get(this.apiUrl.povertyLabor.GET, { postID: id })
        .then(r => {
          if (r.resultCode == '200') {
            Object.transfer(r.data, this.form);
            this.form.postID = id;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    reset() {
      this.form = {
        postID: '',
        postNo: '',
        postName: '',
        note: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax
          .post(this.apiUrl.povertyLabor.SAVE, this.form)
          .then(r => {
            if (r.resultCode != '200') {
              throw new Error(r.msg);
            }
          })
          .catch(error => {
            throw new Error(error);
          });
      });
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
