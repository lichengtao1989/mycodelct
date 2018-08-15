<template>
  <div class="cjm-edit-page">
    <cjm-form ref="form" :model="form" :rules="rules">
      <h1 class="cjm-h1">主Logo设置</h1>
      <cjm-form-item label="显示方式" prop="type" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.type">
          <cjm-radio :label="value" v-for="(value,key) in type" :key="value">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="图片" prop="image" required class="cjm-form-item-long"
                     v-if="form.type===enums.logoShowWay.IMAGE">
        <cjm-image-upload v-model="form.image"
                          :item-style="{width: '450px'}"
                          :beforeDelete="beforeDeleteImg"></cjm-image-upload>
      </cjm-form-item>
      <cjm-form-item label="文字" prop="text" required class="cjm-form-item-long"
                     v-if="form.type===enums.logoShowWay.TEXT">
        <cjm-input v-model="form.text" style="width:450px;"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="是否显示" prop="isDisplay" required class="cjm-form-item-long"
                     v-if="form.systemLogoList && form.systemLogoList.length>1">
        <cjm-radio-group v-model="form.isDisplay">
          <cjm-radio :label="value" v-for="(value,key) in yesOrNo" :key="value">{{key}}
          </cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <template v-if="form.systemLogoList && form.systemLogoList.length>1">
        <h1 class="cjm-h1">子系统logo设置</h1>
        <template v-for="item in form.systemLogoList">
          <cjm-form-item label="系统名称">
            <cjm-input :value="item.name" :disabled="true"></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="系统logo">
            <cjm-input v-model="item.title"></cjm-input>
          </cjm-form-item>
        </template>
      </template>
    </cjm-form>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button type="primary" @click="save"><i class="cjm-icon-confirm"></i>保存</cjm-button>
      <cjm-button @click="restore"><i class="cjm-icon-reset"></i>恢复默认</cjm-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const self = this;
    return {
      enums: this.$globalData.get('base', 'enums'),
      apiUrl: this.$globalData.get('base', 'apiUrl'),
      form: {},
      rules: {
        image: [this.$formRules.required],
        text: [
          this.$formRules.required,
          this.$formRules.minLength(3),
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback();
              }
              let length;
              if (!self.form.systemLogoList || self.form.systemLogoList.length === 0) {
                length = 24;
              } else {
                const titleNotEmptyItem = self.form.systemLogoList.find(item => {
                  return item.title != '';
                });
                if (titleNotEmptyItem) {
                  length = 12;
                } else {
                  length = 24;
                }
              }

              if (value.length > length) {
                return callback(new Error(`最多输入${length}个字符`));
              }
              return callback();
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    type() {
      return this.enums['logo显示方式'];
    },
    yesOrNo() {
      return this.enums['是否'];
    }
  },
  watch: {
    'form.image': function(val, oldVal) {
      if (oldVal && !val) {
        //如果图片删除了，设置为默认值
        this.$nextTick(() => {
          this.form.image = this.$globalData.get('base', 'appConfig').systemLogo;
        });
      }
    }
  },
  methods: {
    beforeDeleteImg() {
      return new Promise((resolve, reject) => {
        this.$confirm('确认要将图片恢复默认吗？', '提示', { type: 'warning' })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(new Error(error));
          });
      });
    },
    //保存
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //验证子系统logo
          if (this.form.systemLogoList && this.form.systemLogoList.length > 0) {
            for (let item of this.form.systemLogoList) {
              if (this.form.isDisplay == '1' && item.title.length > 13) {
                this.$message.warning(item.name + 'logo名称过长，最多13个字符');
                return;
              } else if (this.form.isDisplay == '0' && item.title.length > 24) {
                this.$message.warning(item.name + 'logo名称过长，最多24个字符');
                return;
              }
            }
          }
          let submitForm = Object.deepClone(this.form);
          if (submitForm.type == this.enums.logoShowWay.IMAGE) {
            submitForm.value = submitForm.image;
          } else {
            submitForm.value = submitForm.text;
          }
          delete submitForm.image;
          delete submitForm.text;
          this.$ajax
            .post(this.apiUrl.logo.SAVE, submitForm)
            .then(r => {
              if (r.resultCode == '200') {
                this.$message.success('保存成功');
                //设置本地缓存
                this.$store.commit('userConfig_setLogo', submitForm);
              } else {
                this.$message.error(r.msg);
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        }
      });
    },
    //还原
    restore() {
      this.$confirm('确认要恢复默认设置吗？', '提示', { type: 'warning' })
        .then(() => {
          const systemLogoList = this.form.systemLogoList.map(item => {
            return {
              id: item.id,
              name: item.name,
              title: item.name
            };
          });
          this.form = {
            type: this.enums.logoShowWay.IMAGE,
            image: this.$globalData.get('base', 'appConfig').systemLogo,
            text: '',
            isDisplay: '1',
            systemLogoList: systemLogoList
          };
          this.$nextTick(() => {
            this.save();
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.form = Object.deepClone(this.$globalData.get('userConfig').logo);
    if (this.form.type == this.enums.logoShowWay.IMAGE) {
      this.$set(this.form, 'image', this.form.value);
      this.$set(this.form, 'text', '');
    } else {
      this.$set(this.form, 'image', '');
      this.$set(this.form, 'text', this.form.value);
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
