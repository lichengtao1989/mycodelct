import component from './src/dialog';
export default {
  install(Vue){
    Vue.component(component.name, component);
  }
}
