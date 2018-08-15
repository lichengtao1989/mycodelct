<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="功能类别名称" prop="name" v-show="categoryShow" required class="cjm-form-item-long">
        <cjm-input v-model="form.name" placeholder="请输入一级类别名称" style="width:500px;"></cjm-input>
      </cjm-form-item>
      <cjm-form-item v-for="(child,index) in form.childList" :key="child.id" label="二级类别名称" class="cjm-form-item-long" style="clear: both;" required>
        <cjm-input v-model="child.name" placeholder="请输入二级类别名称" style="width:500px;"></cjm-input>
        <i class="cjm-icon-close icon-close" @click="delSecondCategory(index)" v-show="categoryShow"></i>
      </cjm-form-item>
      <cjm-button @click="addCategory" v-show="childShow" class="add-category">
        <i class="cjm-icon-add2 add-icon"></i>
        <span class="category-bnt">新增二级类别</span>
      </cjm-button>
    </cjm-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        name: '',
        id: '',
        childList: []
      },
      categoryShow: true,
      childShow: true,
      rules: {
        name: [this.$formRules.required, this.$formRules.maxLength(10)]
      }
    };
  },
  computed: {},
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        if (this.form.childList.length > 0) {
          for (let i = 0; i < this.form.childList.length; i++) {
            if (this.form.childList[i].name == '' || this.form.childList[i].name.length > 10) {
              throw new Error('请输入正确二级类别名称');
            }
          }
        }
        return this.$ajax.post(this.$globalData.get('base', 'apiUrl').powerCategory.EDIT, this.form).then(data => {
          if (data.resultCode != '200') {
            throw new Error(data.msg);
          }
        });
      });
    },
    addCategory() {
      this.form.childList.push({
        id: '',
        name: ''
      });
    },
    delSecondCategory(index) {
      this.form.childList.splice(index, 1);
    },
    reset() {
      this.form = {
        name: '',
        id: '',
        childList: []
      };
      this.childShow = true;
    },
    editForm(item, name, id) {
      this.reset();
      if (name != '' && id != '') {
        this.categoryShow = true;
        this.childShow = false;
        this.form.name = item.name;
        this.form.id = item.id;
        this.form.childList = [];
      } else {
        this.categoryShow = true;
        this.childShow = true;
        this.form.name = item.name;
        this.form.id = item.id;
        for (let i = 0; i < item.childList.length; i++) {
          this.form.childList.push({
            id: '',
            name: ''
          });
          this.form.childList[i].id = item.childList[i].id;
          this.form.childList[i].name = item.childList[i].name;
        }
      }
    }
  }
};
</script>

<style scoped>
.add {
  float: left;
  cursor: pointer;
}

.cjm-form-item-long {
  width: 550px;
  clear: both;
}

.add-category {
  text-align: center;
  color: #20a0ff;
  cursor: pointer;
  clear: both;
  float: left;
  margin-left: 250px;
  border: none;
}

.category-bnt {
  float: left;
  font-size: 14px;
  margin: 3px 0 0 10px;
}

.cjm-icon-add2 {
  float: left;
}

.icon-close {
  position: absolute;
  right: 20px;
  color: #d6dde6;
  cursor: pointer;
  top: 12px;
}

.add-icon {
  font-size: 18px;
}
</style>
