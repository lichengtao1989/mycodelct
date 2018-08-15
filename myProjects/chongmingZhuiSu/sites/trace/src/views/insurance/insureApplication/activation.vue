<template>
  <div>
    <p>确认要激活？确定后，投保立即生效。<br/><a @click="activate()" class="activate">激活并一键‘跳转关联保险’</a>页面将保险关联至产品码下。</p>
  </div>
</template>
<script>
import routerUtil from 'framework/utils/router';
export default {
  data() {
    return {
      id: ''
    };
  },
  methods: {
    activate() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post(this.$globalData.get('trace', 'apiUrl').insurance.insureApplication.ACTIVATE, {
            insureID: this.id
          })
          .then(data => {
            if (data.resultCode == 200) {
              routerUtil.push('insuranceRelateList');
            } else {
              reject(new Error(data.msg));
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    submit() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post(this.$globalData.get('trace', 'apiUrl').insurance.insureApplication.ACTIVATE, {
            insureID: this.id
          })
          .then(data => {
            if (data.resultCode == 200) {
              resolve(true);
            } else {
              reject(new Error(data.msg));
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    init(id) {
      this.id = id;
    }
  }
};
</script>
<style scoped>
.activate {
  color: #20a0ff;
  cursor: pointer;
  text-decoration: underline;
}
p {
  font-size: 14px;
  line-height: 24px;
}
</style>
