import Vue from 'vue';

const prefix = `pcq-btn`;

const pcqButton = Vue.directive('pcq-button', {
  
  bind: function (el, binding, vnode) {
    const { btnType, btnSize } = el.attributes;
    el.classList.add(prefix);
    if (btnType) el.classList.add(`${prefix}-${btnType.value}`);
    if (btnSize) el.classList.add(`${prefix}-${btnSize.value}`);
  }

});

export {
  pcqButton
}