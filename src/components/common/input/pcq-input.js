import Vue from 'vue';

const pcqInput = Vue.directive('pcq-input', {
  bind: function (el, binding, vnode) {
    el.classList.add('pcq-input');
  }
})

export {
  pcqInput
}