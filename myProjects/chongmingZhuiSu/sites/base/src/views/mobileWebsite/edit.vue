<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="是否个性化" prop="isPersonalized" required  class="cjm-form-item-long"  v-if="!isCopyMode">
        <cjm-radio-group v-model="form.isPersonalized">
          <cjm-radio v-for="(val, key) in $globalData.get('base', 'enums')['是否个性化']" :key="key" :label="val">{{key}}</cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="h5名称" prop="h5Name" required  class="cjm-form-item-long">
        <cjm-input v-model="form.h5Name"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="url地址" prop="urlAddress" class="cjm-form-item-long"  v-if="form.isPersonalized == this.$globalData.get('base', 'enums')['是否个性化']['是']">
        <cjm-input v-model="form.urlAddress"></cjm-input>
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
        h5Name: '',
        listID: '',
        coypID: '',
        isPersonalized: '0',
        urlAddress: ''
      },
      rules: {
        h5Name: [this.$formRules.required, this.$formRules.maxLength(40)],
        isPersonalized: [this.$formRules.required],
        urlAddress: [{
          validator: (rule, value, callback) => {
            //选择个性化的时候
            if (this.form.isPersonalized == this.$globalData.get('base', 'enums')['是否个性化']['是'] && (value === '' || value === null || value === undefined)){
              return callback(new Error('必须输入地址'));
            }
            return callback();
          },
          trigger: 'blur'
        }, this.$formRules.url]
      },
      isCopyMode: false
    };
  },
  computed: {},
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.$globalData.get('base', 'apiUrl').mobileWebsite.SAVE, this.form).then(data => {
          if (data.resultCode != 200) {
            throw new Error(data.msg);
          } else {
            return data.data
              ? {
                listID: data.data.listID,
                isPersonalized: this.form.isPersonalized
              } : '';
          }
        });
      });
    },
    addForm() {
      this.$refs.form.resetFields();
    },
    editForm(id, copyID) {
      this.isCopyMode = !!copyID;
      this.$refs.form.resetFields();
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').mobileWebsite.GET_DETAIL, {
          listID: id
        })
        .then(r => {
          if (r.resultCode == 200) {
            if(this.isCopyMode){
              var form = {};
              form.copyID = r.data.listID;
              form.h5Name = '';
              form.h5Content = r.data.h5Content;
              form.isPersonalized = r.data.isPersonalized;
              form.urlAddress = r.data.urlAddress;
              this.form = form;
            } else  {
              this.form = r.data;
            }
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
