import component from './src/list.vue';
export default {
  install(Vue){
    Vue.component(component.name, component);
  }
}
