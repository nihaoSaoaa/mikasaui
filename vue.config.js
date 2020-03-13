
module.exports = {
  configureWebpack: {
    resolve: {
      //配置别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
            use: [{
                loader: 'style-resources-loader',
                options: {
                    patterns: [
                        './src/assets/css/variables/*.scss',
                        './src/assets/css/mixins/*.scss',
                    ]
                }
            }]
        }
      ]
    }
  }
}
