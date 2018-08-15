<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="功能名称" prop="name" required>
        <cjm-input v-model="form.name"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="功能类型" prop="type" required>
        <cjm-select v-model="form.type" placeholder="请选择">
          <cjm-option v-for="(value, key) in functionType" :key="value" :label="key" :value="value"> </cjm-option>
        </cjm-select>
      </cjm-form-item>
      <cjm-form-item label="加载方式" prop="loadingMode" v-if="form.type==7" required>
        <cjm-select v-model="form.loadingMode" placeholder="请选择">
          <cjm-option v-for="(value, key) in loadingModes" :key="value" :label="key" :value="value"> </cjm-option>
        </cjm-select>
      </cjm-form-item>
      <cjm-form-item label="父节点" prop="parentID" v-if="form.type==3" required>
        <cjm-select v-model="form.parentID" placeholder="请选择">
          <cjm-option v-for="item in parentItems" :key="item.id" :label="item.name" :value="item.id"> </cjm-option>
        </cjm-select>
      </cjm-form-item>
      <cjm-form-item label="权限码" prop="code">
        <cjm-input v-model="form.code"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="功能路径" prop="path" class="cjm-form-item-long">
        <cjm-input v-model="form.path"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="管理员权限" prop="isAdmin" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.isAdmin">
          <cjm-radio :label="value" v-for="(value,key) in yesOrNo" :key="value">{{key}}</cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="系统业务" prop="sysPower" class="cjm-form-item-long">
        <cjm-checkbox-group v-model="form.sysPower">
          <cjm-checkbox :label="value" v-for="(value,key) in systemBusiness" :key="value">{{key}}</cjm-checkbox>
        </cjm-checkbox-group>
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
        name: [this.$formRules.required, this.$formRules.maxLength(10)],
        parentID: [this.$formRules.required],
        loadingMode: [this.$formRules.required]
      }
    };
  },
  props: {
    powers: Array
  },
  computed: {
    yesOrNo() {
      return this.$globalData.get('base', 'enums')['是否'];
    },
    systemBusiness() {
      return this.$globalData.get('base', 'enums')['系统业务'];
    },
    functionType() {
      return this.$globalData.get('base', 'enums')['功能类型'];
    },
    loadingModes() {
      return this.$globalData.get('base', 'enums')['加载方式'];
    }
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        this.$ajax.post(this.$globalData.get('base', 'apiUrl').power.EDIT, this.form).then(data => {
          if (data.resultCode != '200') {
            throw new Error(data.msg);
          }
        });
      });
    },
    addForm(categoryID) {
      this.form = {
        name: '',
        categoryID: '',
        id: '',
        type: '7',
        parentID: '',
        path: '',
        code: '',
        isAdmin: '0',
        icon: 'icon',
        loadingMode: '2',
        sysPower: []
      };
      this.form.categoryID = categoryID;
      this.parentItems = this.powers;
    },
    editForm(id) {
      this.$refs.form.resetFields();
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').power.GET, {
          id: id
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.form = r.data;
            this.parentItems = this.powers.filter(function(element) {
              return element.id != r.data.id;
            });
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch();
    }
  }
};
</script>

<style scoped>
.add {
  float: left;
  cursor: pointer;
}
</style>
