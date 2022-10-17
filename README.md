# 项目介绍

使用`vite`搭建的`react`项目，支持`TypeScript`、以及`eslint`/`prettier`/`commitlint`工程化管理。

## 特性

- 支持`Typescript`
- 支持`React`、`JSX`语法
- 支持`ES6`语法
- 支持`Less module`
- 支持`Eslint`、`Prettier`、`Pre-commit hook`
- 支持`HMR`快速热更新
- 支持`Antd`按需引入与主题样式覆盖
- 支持`Proxy`代理、`alias`别名
- 支持`windcss`以及 windcss 的模块化配置
- 支持使用`storybook`来开发展示本地组件库

## 开发

- **运行**

```sh
# install
yarn

# dev serve
yarn dev
```

## 目录结构

```js
├── dist                                // 默认的 build 输出目录
├── config                              // 全局配置文件
├── public
└── src
    ├── apis                            // api接口地址
    ├── assets                          // 公共的文件（如image、css、font等）
    ├── components                      // 组件，组件命名方式为大驼峰
    ├── constants                       // 全局常量
    ├── hooks                           // 自定义hook
    ├── layout                          // 布局
    ├── routes                          // 路由
    ├── store                           // 状态管理器
    ├── utils                           // 工具库
    ├── pages                           // 页面模块
        ├── Home                        // Home模块，组件统一大写开头
        ├── ...
    ├── App.tsx                         // react顶层文件
    ├── main.ts                         // 项目入口文件
    ├── typing.d.ts                     // ts类型文件
├── .env                                // 环境变量
├── .commitlintrc                       // commitlint配置文件
├── .eslintignore                       // eslint忽略
├── .eslintrc                           // eslint配置文件
├── .gitignore                          // git忽略
├── .npmrc                              // npm配置文件
├── index.html                          // 项目入口文件
├── package.json
├── README.md                           // README
├── tsconfig.json                       // typescript配置文件
└── vite.config.ts                      // vite配置文件
```

## 计划

- [ ]

## 版本

- v0.0.1
