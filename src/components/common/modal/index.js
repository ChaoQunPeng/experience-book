import Vue from 'vue';
import ModalComponent from './modal.vue';

Vue.component('modal', ModalComponent);

const ModalConstructor = Vue.extend(ModalComponent);

export const Modal = function (params) {
  const instance = new ModalConstructor({
    data: {
      isPluginCall: true
    },
    propsData: {
      visible: true,
      ...params
    }
  });
  instance.$mount(); // 仔细研究下$mount()
  // $set方法学习一下
  instance.$set(instance.$data, 'el', instance.$el);
  // 使用此方法调用时传入$el，不然在执行close方法的时候this.$el的node类型会是'#comment'这种类型
  document.body.appendChild(instance.$el);

  return instance;
}

export default {
  install(Vue) {
    Vue.prototype.$modal = Modal;
  }
}