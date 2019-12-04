module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production'
      ? '/production-sub-path/'
      : '/',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production'
      ? 'dist'
      : 'devdist',
    //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    lintOnSave: true,
  
    /**
     * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     **/
    chainWebpack: (config) => {
    },
    configureWebpack: (config) => {
      // config.resolve = { // 配置解析别名
      //   extensions: ['.js', '.json', '.vue'],
      //   alias: {
      //     '@': path.resolve(__dirname, './src'),
      //     'public': path.resolve(__dirname, './public'),
      //     'components': path.resolve(__dirname, './src/components'),
      //     'common': path.resolve(__dirname, './src/common'),
      //     'api': path.resolve(__dirname, './src/api'),
      //     'views': path.resolve(__dirname, './src/views'),
      //     'data': path.resolve(__dirname, './src/data')
      //   }
      // }
    },
    //配置css
    css: {
      //去掉文件名中的 .module
      requireModuleExtension: false,
      loaderOptions: {
        // 给 sass-loader 传递选项
        // sass: {
        //   // @/ 是 src/ 的别名
        //   // 所以这里假设你有 `src/variables.sass` 这个文件
        //   // 注意：在 sass-loader v7 中，这个选项名是 "data"
        //   prependData: `@import "~@/variables.sass"`
        // },
        // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
        // 因为 `scss` 语法在内部也是由 sass-loader 处理的
        // 但是在配置 `data` 选项的时候
        // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
        // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
        scss: {
          prependData: `@import "./src/styles/main.scss";`
        },
        // 给 less-loader 传递 Less.js 相关选项
        less: {
          // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
          // `primary` is global variables fields name
          globalVars: {
            primary: '#fff'
          }
        }
      },
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    /**
     *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
     */
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
      open: false, // 编译完成是否打开网页
      host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
      port: 8080, // 访问端口
      https: false, // 编译失败时刷新页面
      hot: true, // 开启热加载
      hotOnly: false,
      proxy: null, // 设置代理
      overlay: { // 全屏模式下是否显示脚本错误
        warnings: true,
        errors: true
      },
      before: app => {
      }
    },
    /**
     * 第三方插件配置
     */
    pluginOptions: {}
  }
  