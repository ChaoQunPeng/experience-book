/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-15 18:44:49
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-11-15 21:57:14
 * @FilePath: /experience-book/src/api/user.js
 * @Description: 
 */

import axios from './config/interceptors';
import { BaseApi } from './config/base-api'

/**
 * 用户请求类
 * @return Promise
 */
class UserApi extends BaseApi {
    constructor(name) {
        super(name)
    }

    /**
     * @description: 获取列表
     * @param {*} params
     * @return {*}
     */
    getList(params) {
        return axios.post(`${this.name}`, params);
    }
}

export const user = new UserApi('user');