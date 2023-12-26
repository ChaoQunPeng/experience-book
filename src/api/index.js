/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-15 19:03:15
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-26 19:24:52
 * @FilePath: /experience-book/src/api/index.js
 * @Description:
 */
import { user } from './user';
import { dailyComplete } from './daily-complete';

const Api = {
  /**
   * 用户接口类
   */
  user,
  dailyComplete
};

export { Api };
