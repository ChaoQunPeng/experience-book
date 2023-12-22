/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-15 21:02:37
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-22 22:24:53
 * @FilePath: /experience-book/src/main.js
 * @Description: 
 */
import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index';
// import CKEditor from '@ckeditor/ckeditor5-vue';
// import Viser from 'viser-vue';

// component
import './components/index';

// filters & directives & mixin
import './utils/filters/index';
import './utils/directives/index';
import './utils/mixin';

// style
import './assets/theme';
import './components/style';

//axios
import axios from './utils/interceptors.js';
Vue.prototype.$axios = axios;

// startup
import './startup';

// store
import { store } from './store/index';

// other plugins
// Vue.use(CKEditor);
// Vue.use(Viser);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
