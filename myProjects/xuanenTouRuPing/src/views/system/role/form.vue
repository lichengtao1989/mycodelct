<template>
  <nz-scrollbar ref="scrollbar" style="height:450px;">
    <nz-form style="padding-right: 10px" label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="角色名称" required prop="roleName">
        <nz-input :disabled="isView" v-model="form.roleName" placeholder="请输入角色名称"></nz-input>
      </nz-form-item>
      <nz-form-item label="角色类型" required prop="roleType">
        <nz-enum-select :disabled="isView" v-model="form.roleType" :options="roleTypeItem" is-radio-btn></nz-enum-select>
      </nz-form-item>
      <nz-form-item label="角色管理" required prop="powerList">
        <menu-choose @heightChange="scrollbarUpdate" :disabled="isView" v-model="form.powerList" :menuData="menuData"></menu-choose>
      </nz-form-item>
    </nz-form>
  </nz-scrollbar>
</template>
<script>
import menuChoose from './menu-choose.vue';
export default {
  components: { menuChoose },
  props: {
    rowData: Object,
    isView: Boolean
  },
  data() {
    return {
      formModel: { roleName: '', roleType: '', powerList: [] },
      form: {},
      menuData: [],
      isInit: false,
      rules: {
        roleName: [this.$formRules.required, this.$formRules.maxLength(10), this.$formRules.chinese],
        roleType: [this.$formRules.required],
        powerList: [this.$formRules.required]
        // powerList: [{ validator: this.$formRules.required.validator, trigger: 'none' }]
      }
    };
  },
  computed: {
    roleTypeItem() {
      if (this.$storage.get('userInfo').role == 3) {
        return this.$enum('角色类型').values;
      } else if (this.$storage.get('userInfo').role == 1) {
        return this.$enum('政府可新建角色类型').values;
      } else {
        return this.$enum('经营主体可新建角色类型').values;
      }
    }
    // menuData() {
    //   let data = Object.jsonClone(this.$globalData.get('menuData') || []);
    //   if (this.isView) {
    //     data = this.setMenuDisabled(data);
    //   }
    //   return data;
    // }
  },
  watch: {
    'form.roleType': async function(val) {
      const userInfo = this.$storage.get('userInfo');
      if (this.isInit) {
        let menuData;
        if (userInfo && userInfo.role < 3) {
          menuData = await this.$model('system').role.loadData2(val);
        } else {
          menuData = await this.$model('system').menu.getPowerList(val);
        }
        this.menuData = menuData;
      }
    }
  },
  methods: {
    scrollbarUpdate() {
      this.$refs.scrollbar.update();
    },
    async validForm() {
      const valid = await this.$validForm(this.$refs.form);
      return valid;
    },
    getForm() {
      return this.form;
    },
    setMenuDisabled(data) {
      data.forEach(item => {
        item.disabled = true;
        if (item.children) {
          item.children.forEach(item => {
            item.disabled = true;
          });
        }
      });
      return data;
    },
    async formInit() {
      if (this.$storage.get('userInfo').role == 2) {
        this.formModel.roleType = 2;
      } else if (this.$storage.get('userInfo').role == 1) {
        this.formModel.roleType = 1;
      }
      this.form = Object.jsonClone(this.formModel);
      if (this.rowData) {
        const roleData = await this.$model('system').role.loadData(this.rowData.roleID);
        await this.$nextTick();
        this.form.roleName = roleData.roleName;
        this.form.roleType = roleData.roleType;
        this.form.powerList = roleData.powerList;
      }
      this.isInit = true;
    }
  },
  created() {
    this.formInit();
  }
};
</script>
