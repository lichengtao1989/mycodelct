<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="检测项名称" required prop="testingTypeName">
        <cjm-input v-model="form.testingTypeName"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="所属机构" required prop="orgID">
        <cjm-remote-select :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.ORG" :label="form.orgName" v-model="form.orgID">
        </cjm-remote-select>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {},
      rules: {
        testingTypeName: [this.$formRules.required],
        orgID: [this.$formRules.required]
      }
    };
  },
  computed: {},
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax
          .post(this.$globalData.get('trace', 'apiUrl').productTesting.SAVE_TEST_TYPE, this.form)
          .then(data => {
            if (data.resultCode != 200) {
              throw new Error(data.msg);
            }
          });
      });
    },
    reset() {
      this.form = {
        testingTypeName: '',
        testingTypeID: '',
        orgID: '',
        orgName: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    addForm() {
      this.reset();
    },
    editForm(id) {
      this.reset();
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').productTesting.EDIT_TEST_TYPE, {
          testingTypeId: id
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.form = r.data;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    setLogoImg(logo) {
      this.form.logoImage = logo;
      this.logoSelect = logo;
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style scoped>
.add {
  float: left;
  cursor: pointer;
}
.logo-image {
}
.logo-image > li {
  width: 100px;
  float: left;
  border: 1px #bfcbd9 solid;
  margin: 10px 32px 10px 0px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  height: 100px;
  line-height: 100px;
}
.logo-icon {
  font-size: 68px;
  color: #48576a;
  height: 100px;
  line-height: 100px;
  width: 100px;
  text-align: center;
  margin: 0 auto;
}
.logo-description {
  text-align: center;
  background-color: #bfcbd9;
  height: 20px;
  line-height: 20px;
}
.logo-image > li.active {
  border: 1px #20a0ff solid;
}
.cjm-icon-selected {
  position: absolute;
  right: -12px;
  color: #20a0ff;
  font-size: 24px;
  top: 84px;
}
.cjm-icon-add2.active {
  display: block;
}
</style>
