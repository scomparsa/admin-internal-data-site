import path from 'path'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import reactRefresh from '@vitejs/plugin-react-refresh'
import createImportPlugin from 'vite-plugin-import'
import styleImport from 'vite-plugin-style-import'
import { viteExternalsPlugin } from 'vite-plugin-externals'

export default defineConfig(({ command }) => {
  const plugins = [
    // 基于文件目录的约定式路由
    Pages({
      react: true,
      pagesDir: './src/views',
      // 排除不想被识别为路由文件的目录或文件
      exclude: ['**/components/*', '**/components/**', 'assets/regionfile.js']
    }),
    reactRefresh(),
    viteExternalsPlugin({
      react: 'React',
      'react-dom': 'ReactDOM',
      '@reach/router': 'ReachRouter',
      antd: 'antd',
      'memoize-one': 'memoizeOne',
      moment: 'moment',
      'moment/locale/zh-cn': 'moment/locale/zh-cn',
      'raven-js': 'Raven'
    })
  ]

  const define = {}

  if (command === 'build') {
    plugins.push(
      createImportPlugin([
        {
          libraryName: 'antd',
          style: true,
          customName: name => {
            // Fix：Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
            // https://github.com/facebook/react/issues/13445
            if (name === 'checkbox') {
              return 'antd/es/checkbox'
            }

            return `antd/lib/${name}`
          }
        }
      ]),
      styleImport({
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: name => `antd/es/${name}/style/index`
          }
        ]
      })
    )
  } else {
    // Fix：部分包里会使用诸如 global.xxx 的全局变量，Vite 的运行时不支持，需要手动声明
    define.global = {}
  }

  return {
    base: command === 'build' ? '/internal-data/' : '',
    server: {
      port: 8000
    },
    plugins,
    define,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            // 有些自定义样式依赖 antd less 里的 variables，需要全局引入
            hack: `
              true;
              @import '${path.resolve(__dirname, './node_modules/antd/lib/style/themes/default.less')}'
            `
          }
        }
      },
      // 移除 vite build 压缩 css 时的警告
      // "@charset must be first rule in the file ..."
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    },
    resolve: {
      alias: [
        { find: '~', replacement: path.resolve(__dirname, './') },
        { find: '@', replacement: path.resolve(__dirname, 'src') }
      ]
    },
    optimizeDeps: {
      include: [
        '@ant-design/compatible',
        '@ant-design/icons',
        'antd/lib/locale/zh_CN',
        'apollo-boost',
        'apollo-link-error',
        'buffer',
        'lodash.isequal',
        'path-to-regexp-es',
        'prop-types',
        'qiniu-js',
        'react-apollo',
        'react-helmet',
        'use-query-params',
        'xlsx'
      ]
    },
    build: {
      chunkSizeWarningLimit: 1500,
      commonjsOptions: {
        // 禁止生成 sourcemap，提升构建速度
        sourceMap: false
      },
      // 关闭压缩后的 gzip 大小统计，提升构建速度
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          manualChunks: {
            'react-deps': ['classnames', 'prop-types', 'react-helmet'],
            'apollo-deps': ['apollo-boost', 'apollo-client', 'apollo-link-batch-http', 'react-apollo', 'graphql'],
            'antd-deps': ['@ant-design/compatible', '@ant-design/icons'],
            lodash: ['lodash.isequal'],
            utils: ['export-to-xlsx', 'path-to-regexp-es', 'query-string', 'use-query-params', 'xlsx']
          }
        }
      }
    }
  }
})
