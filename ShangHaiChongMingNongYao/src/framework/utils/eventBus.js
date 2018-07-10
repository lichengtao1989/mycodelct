/**
 * 用于不同组件之间发送事件
 *
 * a.vue
 * methods:{
 *  onEventTrigger(args){
 *
 *  }
 * },
 * mounted(){
 *  //监听其它组件发来的事件
 *  this.$eventBus.$on('eventName',this.onEventTrigger);
 * },
 * beforeDestroy(){
 *  //组件销毁之前,关闭监听该事件
 *  this.$eventBus.$off('eventName',this.onEventTrigger);
 * }
 * //-------------------------------
 * b.vue
 * this.$eventBus.$emit('eventName',args);
 * */
import Vue from 'vue';
const eventBus = new Vue({
  data(){
    return {};
  }
});
export default {
  install(Vue){
    Vue.prototype.$eventBus = eventBus;
    Vue.eventBus = eventBus;
  }
};
