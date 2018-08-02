import Vue from 'vue';
const globalDataVue = new Vue({
  data(){
    return {
      saveData: []
    };
  },
  methods: {
    get(key){
      const matchData = this.saveData.find(item => item.key === key);
      if (matchData) {
        return matchData.value;
      }
    },
    set(key, value){
      const item = this.saveData.find(item => item.key === key);
      if (item) {
        item.value = value;
      } else {
        this.saveData.push({key, value});
      }
    }
  }
});
export default {
  install(Vue){
    Vue.prototype.$globalData = globalDataVue;
    Vue.globalData = globalDataVue;
  }
};
