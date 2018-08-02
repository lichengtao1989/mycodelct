import ELEMENT from 'element-ui';
import Vue from 'vue';
const setting = new Vue({
  data() {
    return {ELEMENT};
  },
  methods: {
    async getRegion(parentRegionCode) {
      const data = await this.$model('region').getRegion(parentRegionCode);
      return data;
    }
  }
});
export default setting
