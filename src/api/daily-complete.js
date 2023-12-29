/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-15 18:44:49
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-28 22:06:26
 * @FilePath: /experience-book/src/api/daily-complete.js
 * @Description:
 */

import axios from './config/interceptors';
import { BaseApi } from './config/base-api';

/**
 * 打卡
 * @return Promise
 */
class DailyCompleteApi extends BaseApi {
  constructor(name) {
    super(name);
  }

  /**
   * @description: 获取列表
   * @param {*} params
   * @return {*}
   */
  getList(params) {
    return axios.get(`${this.name}`, params);
  }

  /**
   * @description: 新增
   * @param {*} params
   * @return {*}
   */
  add(body) {
    return axios.post(`${this.name}`, body);
  }

  /**
   * @description: 编辑
   * @param {*} params
   * @return {*}
   */
  edit(id, params) {
    return axios.put(`${this.name}/${id}`, params);
  }

  /**
   * @description: 删除
   * @param {*} params
   * @return {*}
   */
  delete(id) {
    return axios.delete(`${this.name}/${id}`);
  }

  /**
   * @description: 修改打卡状态
   * @param {*} params
   * @return {*}
   */
  changeStatus(id, body) {
    return axios.put(`${this.name}/status/${id}`, body);
  }
}

export const dailyComplete = new DailyCompleteApi('daily-complete');
