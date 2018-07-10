import Vue from 'vue';
const storageVue = new Vue({
  data(){
    return {};
  },
  methods: {
    get(key){
      const saveData = this.getSaveData();
      const matchData = saveData.find(item => item.key === key);
      if (matchData) {
        return matchData.value;
      }
    },
    set(key, value){
      const saveData = this.getSaveData();
      const item = saveData.find(item => item.key === key);
      if (item) {
        item.value = value;
      } else {
        saveData.push({key, value});
      }
      this.setSaveData(saveData);
    },
    del(key){
      let saveData = this.getSaveData();
      saveData = saveData.filter(item => item.key !== key);
      this.setSaveData(saveData);
    },
    clear(){
      this.setSaveData([]);
    },
    getSaveData(){
      return JSON.parse(localStorage.saveData || '[]');
    },
    setSaveData(data){
      localStorage.saveData = JSON.stringify(data);
    }
  }
});
export default {
  install(Vue){
    Vue.prototype.$storage = storageVue;
    Vue.storage = storageVue;
  }
};
