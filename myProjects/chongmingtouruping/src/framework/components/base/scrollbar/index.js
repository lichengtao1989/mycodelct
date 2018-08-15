import component from './src/scrollbar';
export default {
  install(Vue){
    Vue.component(component.name, component);
  }
}
