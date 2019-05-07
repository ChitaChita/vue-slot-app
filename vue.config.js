module.exports = {
  outputDir: 'docs',
  assetsDir: './src/',
  publicPath: './',
    configureWebpack: {
      devServer: {
        watchOptions: {
          ignored: ['node_modules'],
          aggregateTimeout: 300,
          poll: 1500
        },
        public: '192.168.33.10:8080', // vagrant machine address
        host: '0.0.0.0',
        port: '8080'
      }
    }
  }