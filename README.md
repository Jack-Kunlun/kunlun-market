# Vite + React + Typescript + Antd

一个使用`vite`搭建的`react`项目，支持`TypeScript`、`Antd`，以及`eslint`/`prettier`/`stylelint`/`commitlint`等工程化管理~

## 开发

- **克隆到本地**

```sh
# clone
git clone git@github.com:GDZ528/vite-blog.git

# install
yarn install

# dev serve
yarn dev
```

## 特性

- 支持`Typescript`
- 支持`React`、`JSX`语法
- 支持`ES6`语法
- 支持`Less module`
- 支持`Eslint`、`Prettier`、`Pre-commit hook`
- 支持`HMR`快速热更新
- 支持`Antd`按需引入与主题样式覆盖
- 支持`Proxy`代理、`alias`别名
- 兼容传统浏览器
- 开发启动速度要够快，以秒计算
- 支持懒加载和`chunk`分割

## 目录结构

```js
├── dist                                // 默认的 build 输出目录
├── config                              // 全局配置文件
└── src                                 // 源码目录
    ├── assets                          // 公共的文件（如image、css、font等）
    ├── components                      // 项目组件
    ├── constants                       // 常量/接口地址等
    ├── layout                          // 全局布局
    ├── routes                          // 路由
    ├── store                           // 状态管理器
    ├── utils                           // 工具库
    ├── pages                           // 页面模块
        ├── Home                        // Home模块，建议组件统一大写开头
        ├── ...
    ├── App.tsx                         // react顶层文件
    ├── main.ts                         // 项目入口文件
    ├── typing.d.ts                     // ts类型文件
├── .editorconfig                       // IDE格式规范
├── .env                                // 环境变量
├── .eslintignore                       // eslint忽略
├── .eslintrc                           // eslint配置文件
├── .gitignore                          // git忽略
├── .npmrc                              // npm配置文件
├── .prettierignore                     // prettierc忽略
├── .prettierrc                         // prettierc配置文件
├── .stylelintignore                    // stylelint忽略
├── .stylelintrc                        // stylelint配置文件
├── index.html                          // 项目入口文件
├── LICENSE.md                          // LICENSE
├── package.json                        // package
├── pnpm-lock.yaml                      // pnpm-lock
├── postcss.config.js                   // postcss
├── README.md                           // README
├── tsconfig.json                       // typescript配置文件
└── vite.config.ts                      // vite
```

## 计划

- [ ]

## 版本

- v0.0.1
