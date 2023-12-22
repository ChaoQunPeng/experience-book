/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-12-21 23:43:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-22 22:31:03
 * @FilePath: /experience-book/vue.config.js
 * @Description:
 */
const path = require('path');

module.exports = {
  // 关闭eslint
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        // assets: '@assets',
        '@components': path.join(__dirname, 'src/components'),
        '@utils': path.join(__dirname, 'src/utils')
      }
    }
  }
};
