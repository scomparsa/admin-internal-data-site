# admin-internal-data-site
> 国内数据后台前端项目

## NPM 命令
- `npm start` 本地开发
- `npm run build:local` 构建编译（本地）
- `npm run build:dev` 构建编译（测试）
- `npm run build:prod` 构建编译（线上）
- `npm run serve:local` 构建编译并启动 HTTP 服务器（本地）
- `npm run serve:dev` 构建编译并启动 HTTP 服务器（测试）
- `npm run serve:prod` 构建编译并启动 HTTP 服务器（线上）

## 目录结构
```shell
.
├── .babelrc             // Babel 配置
├── .editorconfig         // IDE 配置
├── .eslintrc.js         // ESLint 配置
├── .gitignore           // Git 忽略配置
├── .gitlab-ci.yml       // GitLab CI 配置
├── .npmrc               // NPM 配置
├── .prettierrc.js       // Prettier 配置
├── CHANGELOG.md         // 更新日志
├── LICENSE              // 版权说明
├── README.md            // 说明文档
├── commitlint.config.js  // CommitLint 配置
├── jsconfig.json         // VS Code JS 配置
├── package-lock.json    // NPM 依赖版本锁定
├── package.json         // NPM 配置
├── public               // 生产构建目录
├── src
    ├── apollo           // Apollo bootstrap
    ├── layouts          // 整体布局
    ├── pages            // Page views
    ├── styles           // 通用样式
    └── utils            // 工具函数
└── stylelint.config.js   // StyleLint 配置
```

## 样式开发规范

遵循 [BEM](http://getbem.com/naming/) 规定，类名使用连字符 `-` 拼接

## Git 分支名称规范

[开发者姓名]-[[提交类型](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type)]-xxx

如：lq-chore-support-prettier

> 单词之间请使用连字符 `-`

## 文件、目录命名规范

> 均采用连字符 `-` 命名。

## 约定式提交规范

> 遵循 [Angular 提交准则](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) ，在提交说明的基础上，引入标准化的轻量约定。这个约定和 [SemVer](http://semver.org/) 相吻合，要求在提交信息中描述新特性、bug 修复和破坏性更新。

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

[阅读更多](https://www.conventionalcommits.org/zh/v1.0.0-beta.2/)

## 路径别名

- `@` - ./src/*

## 开发约定

`/pages` 目录下：

- 非路由级别的文件目录，使用 `_` 开头
- 通用文件存放至 `_common` 目录
- `.js` 文件必须使用默认导出 `export default`

## 路由设置
> 修改 `config/index.js` 中的 `menuLinks`

```js
menuLinks: [
  __menuLinkPlaceholder,
  {
    name: '菜单',
    path: '/menu',
    icon: 'menu',
    alias: 'MENU##MENU'
  },
  {
    name: '一级菜单',
    path: '/one',
    icon: 'one',
    routes: [
      {
        name: '二级菜单',
        path: '/one/two/',
        alias: 'MENU##SUBMENU_TWO'
      }
    ]
  }
]
```

*二级菜单，需要在 `src/pages` 下添加相应的嵌套目录*
