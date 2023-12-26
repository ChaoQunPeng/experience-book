/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-15 18:44:49
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-26 19:48:58
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
}

export const dailyComplete = new DailyCompleteApi('daily-complete');
