const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  //关闭eslint
  lintOnSave: false,
  // 配置代理跨域
  devServer: {
    proxy: {
      '/': {
        // target: 'http://120.77.62.88:3000',
        target: 'http://localhost:3000',
      },
    }
  },
  publicPath: '/',
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: 'hls.js'
  }
}