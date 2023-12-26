/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-15 18:28:11
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-26 20:12:00
 * @FilePath: /experience-book/src/api/config/interceptors.js
 * @Description:
 */
import Axios from 'axios';

//创建axios实例
const axios = Axios.create({
  baseURL: '/api',
  timeout: 15000
});

//请求拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  response => {
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