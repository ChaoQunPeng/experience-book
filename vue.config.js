/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-12-21 23:43:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-26 23:02:31
 * @FilePath: /experience-book/vue.config.js
 * @Description:
 */
const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        //这里最好有一个 /
        target: 'http://localhost:3000/', // 后台接口域名
        changeOrigin: false, //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 关闭eslint
  lintOnSave: false,
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        // assets: '@assets',
        '@components': path.join(__dirname, 'src/components'),
        '@api': path.join(__dirname, 'src/api'),
        '@utils': path.join(__dirname, 'src/utils')
      }
    }
  }
};
