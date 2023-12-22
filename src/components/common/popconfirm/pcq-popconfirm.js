import Vue from 'vue';
import PopconfirmComponent from './popconfirm.vue';

const PopconfirmConstructor = Vue.extend(PopconfirmComponent);

Vue.component('popconfirm', PopconfirmComponent);

const pcqPopconfirm = Vue.directive('pcq-popconfirm', {
  bind: function (el, binding, vnode) {

    let popconfirm;

    el.addEventListener('click', (event) => {
      el.style.position = 'relative';

      if (popconfirm && popconfirm.isTrigger) {
        popconfirm.isTrigger = false;
        popconfirm.$destroy();
        return;
      }

      const title = el.getAttribute('pcqPopconfirmTitle');
      popconfirm = getInstance(title);
      const $el = popconfirm.$el;
      el.appendChild($el);
      const btnVnode = popconfirm._vnode.children[1].children[1].children[1];

      btnVnode.elm.addEventListener('click', () => {
        el.dispatchEvent(new CustomEvent(`onConfirm`));
        popconfirm.$destroy();
      });

      $el.style.width = el.offsetWidth + 'px';
      $el.style.height = el.offsetHeight + 'px';
      $el.style.top = -((el.offsetHeight) + 20) + 'px';
      $el.style.marginLeft = -(Math.ceil(el.offsetWidth) / 2) + 'px';

    });
  }
})

function getInstance(params) {
  const instance = new PopconfirmConstructor({
    propsData: {
      content: params
    }
  }).$mount();

  return instance;
}

export {
  pcqPopconfirm
}