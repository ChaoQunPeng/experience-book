import Vue from 'vue';
import MessageComponent from './Message.vue'

const MessageConstructor = Vue.extend(MessageComponent);

let i = 0;
let hasMessageContainer = false;

export const Message = function (params, type) {

  createMessageContainer();
  const data = {};
  if (typeof params === 'string') {
    data.content = params;
  }
  data.type = type;
  data.index = i;
  const instance = new MessageConstructor({
    data: data
  }).$mount();

  document.getElementById('messageContainer').appendChild(instance.$el);
  i++;
  
  return instance;
}

/**
 * 创建放置message的容器
 */
function createMessageContainer() {
  if (!hasMessageContainer) {
    const div = document.createElement('div');
    div.id = 'messageContainer';
    div.classList.add('message-container');
    document.body.appendChild(div);
    hasMessageContainer = true;
  }
}

export default {
  install(Vue) {
    Vue.prototype.$message = Message;
    Vue.prototype.$message.info = (params) => Message(params, 'info');
    Vue.prototype.$message.success = (params) => Message(params, 'success');
    Vue.prototype.$message.error = (params) => Message(params, 'error');
    Vue.prototype.$message.warning = (params) => Message(params, 'warning');
  }
}