/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-15 18:28:11
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-29 21:45:17
 * @FilePath: /experience-book/src/api/config/interceptors.js
 * @Description:
 */
import Axios from 'axios';
import tools from './tools';

//创建axios实例
const axios = Axios.create({
  baseURL: '/api',
  timeout: 15000
});

//请求拦截器
axios.interceptors.request.use(
  request => {
    if (request.params) {
      request.data = JSON.parse(JSON.stringify(request.params));
      tools.jsonToUnderline(temdata);
      request.params = temdata;
    }

    if (request.data) {
      const tempData = JSON.parse(JSON.stringify(request.data)); // 做下深拷贝，防止应用类型，改变原来的值
      tools.jsonToUnderline(tempData);
      request.data = tempData;
    }

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  response => {
    tools.jsonToHump(response.data);
    const res = response.data;

    if (res.code == 0) {
      return Promise.reject(new Error(res.msg || '请求错误！'));
    }

    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

//将实例暴露出去使用
export default axios;
