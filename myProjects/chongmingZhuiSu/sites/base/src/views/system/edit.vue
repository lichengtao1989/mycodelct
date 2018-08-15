<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="系统名称" prop="name" required>
        <cjm-input v-model="form.name"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="排序值" prop="sortNo" required>
        <cjm-input v-model="form.sortNo"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="显示系统名称" prop="isDisplayName" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.isDisplayName">
          <cjm-radio :label="value" v-for="(value,key) in yesOrNo" :key="value">{{key}}</cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="组织类型" prop="corpType" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.corpType">
          <cjm-radio :label="value" v-for="(value,key) in organType" :key="value">{{key}}</cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="个性系统logo" prop="systemLogoSetting" class="cjm-form-item-long">
        <ul class="logo-image">
          <li v-for="(logo,index) in logos" :class="{'active': logoSelect === logo}" :key="index" @click="setLogoImg(logo)">
            <i class="logo-icon" :class="logo"> </i>
            <div class="cjm-icon-selected" v-show=" logoSelect === logo "></div>
          </li>
        </ul>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>

<script>
import '../../assets/css/icon.css';
export default {
  data: function() {
    return {
      form: {
        name: '',
        id: '',
        isDisplayName: '1',
        corpType: '1',
        sortNo: '',
        logoImage: 'cjm-icon-system1',
        status: '1',
        coypID: ''
      },
      logos: [
        'cjm-icon-system1',
        'cjm-icon-system2',
        'cjm-icon-system3',
        'cjm-icon-system4',
        'cjm-icon-system5',
        'cjm-icon-system6',
        'cjm-icon-system7',
        'cjm-icon-system8',
        'cjm-icon-system9',
        'cjm-icon-system10',
        'cjm-icon-system11',
        'cjm-icon-system12'
      ],
      logoSelect: 'cjm-icon-system1',
      rules: {
        name: [this.$formRules.required, this.$formRules.maxLength(24)],
        sortNo: [this.$formRules.required, this.$formRules.number]
      }
    };
  },
  computed: {
    yesOrNo() {
      return this.$globalData.get('base', 'enums')['是否'];
    },
    organType() {
      return this.$globalData.get('base', 'enums')['组织类型'];
    }
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.$globalData.get('base', 'apiUrl').system.EDIT, this.form).then(data => {
          if (data.resultCode != 200) {
            throw new Error(data.msg);
          }
        });
      });
    },
    addForm() {
      this.$refs.form.resetFields();
    },
    editForm(id, copyID) {
      this.$refs.form.resetFields();
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').system.GET, {
          id: id
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.form = r.data;
            this.logoSelect = r.data.logoImage;
            this.form.code = '';
            if (copyID != '') {
              this.form.id = '';
              this.form.copyID = copyID;
            }
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch();
    },
    setLogoImg(logo) {
      this.form.logoImage = logo;
      this.logoSelect = logo;
    }
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
