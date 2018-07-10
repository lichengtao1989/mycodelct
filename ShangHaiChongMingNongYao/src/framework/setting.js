let settingVue = null;
export default {
  get(){
    return settingVue;
  },
  set(settings){
    settingVue = settings;
  }
}
