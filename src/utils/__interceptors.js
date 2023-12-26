/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-12-21 23:28:24
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-26 19:49:32
 * @FilePath: /experience-book/src/utils/interceptors.js
 * @Description:
 */
import message from '../components/common/message';
import axios from 'axios'; //引入 axios

let div = null;
let requestCollection = [];

axios.defaults.baseURL = '/api';

// 根据环境修改axios的默认地址
// if (ENV == 'dev') {
//   axios.defaults.baseURL = 'http://localhost:3100/api/';
// } else {
//   axios.defaults.baseURL = 'http://localhost:3200/api/';
// }

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // if (!config.noLoading) {
    //   config.id = `${config.method}_${new Date().getTime()}`;
    //   requestCollection.push(config);
    // }

    // createLoading();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    closeLoading(response.config);
    return response;
  },
  function (err) {
    const errorInfo = JSON.parse(JSON.stringify(err));
    message(`发生错误：${errorInfo.message}`);
    requestCollection = requestCollection.filter(e => e.id != errorInfo.config.id);
    closeLoading(errorInfo.config);
    return Promise.resolve(err);
  }
);

function createLoading() {
  if (div) {
    div.style.display = 'block';
    return;
  }

  div = document.createElement('div');
  div.classList.add('loading');
  div.innerHTML = `
    <div class="loading-icon">loading...</div>
  `;
  document.body.appendChild(div);
}

function closeLoading(resConfig) {
  if (resConfig.noLoading) return;

  if (requestCollection.length > 0) {
    requestCollection = requestCollection.filter(e => e.id != resConfig.id);

    if (requestCollection.length == 0) {
      div.style.display = 'none';
    }
  }
  // 如果这个页面上的请求全部出错，在上面的response错误处理中就会把requestCollection清空，length为0
  else {
    div.style.display = 'none';
  }
}

export default axios;
