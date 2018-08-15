const handlers = {};

/**
 * 用于不同浏览器窗口之间的消息通信
 */
export default {
  /**
   * 初始化
   */
  init(){
    window.addEventListener('message', function (event) {
      if (event.origin !== window.location.origin) {
        return;
      }
      let message = event.data;
      if (handlers[message.name] && typeof handlers[message.name] === 'function') {
        handlers[message.name](message.data);
      }
    })
  },
  /**
   * 发送消息
   * @param target 发送的目标window对象
   * @param name 消息名称
   * @param data 消息需要携带的数据
   */
  send(target, name, data) {
    if (!target || !name) {
      throw new Error('发送消息失败，缺少必要参数，target或name');
    }

    target.postMessage({
      name: name,
      data: data
    }, window.location.origin);
  },
  /**
   * 添加消息处理事件
   * @param name 消息名称
   * @param handler 消息处理程序
   */
  addHandler(name, handler) {
    if (!name || !handler || typeof handler !== 'function') {
      return;
    }
    handlers[name] = handler;
  },
  /**
   * 移除消息处理程序
   * @param name 消息名称
   */
  removeHandler(name){
    if(!handlers[name]){
      handlers[name] = null;
    }
  }
}
