var webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      // config.set('externals', {
      //   vue: 'Vue',
      //   'vue-router': 'VueRouter',
      //   axios: 'axios',
      //   'vue-quill-editor': 'VueQuillEditor',
      //   nprogress: 'NProgress'
      //   // jsqr: 'jsQR',
      //   // qrcodejs2: 'QRCode'
      // })
    })

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  },
  publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  devServer: {
    // port: 8080,
    proxy: {
      '/aa': {
        target: 'http://47.101.59.24:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/aa': ''
        }
      }
    }
  }
}
