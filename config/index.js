'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': { // SAAS后端主接口
          target: 'http://cs-sass.saotianxia.vip/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
      },
      '/record': { // SAAS后端数据接口
        target: 'http://cs-data.saotianxia.com.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/record': ''
        }
      },
      '/lsh': { // SAAS后端零售户接口
        target: 'http://cs-seller.saotianxia.vip/',
        changeOrigin: true,
        pathRewrite: {
          '^/lsh': ''
        }
      },
      '/sc': { // SAAS后端积分商城接口
        target: 'http://cs-jfs.saotianxia.vip/',
        changeOrigin: true,
        pathRewrite: {
          '^/sc': ''
        }
      }
    },
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer Report after build finishes:
    // `npm run build --Report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
