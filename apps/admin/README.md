# Description

使用`vite`搭建的`react`项目，支持`TypeScript`、以及`eslint`/`prettier`/`commitlint`工程化管理。

## Installation

```bash
$ yarn install
```

## 目录结构

```js
├── dist                                // 默认的 build 输出目录
├── public
└── src
    ├── apis                            // api接口地址
    ├── assets                          // 静态资源目录（如image、css、font等）
    ├── components                      // 组件目录
    ├── constants                       // 全局常量
    ├── hooks                           // 自定义hook
    ├── i18n                            // 国际化配置
    ├── layout                          // 布局
    ├── routes                          // 路由
    ├── store                           // 状态管理器
    ├── utils                           // 工具库
    ├── pages                           // 页面模块
        ├── Home                        // Home模块，组件统一大写开头
        ├── ...
    ├── index.css                       // 基础css样式
    ├── main.ts                         // 项目入口文件
    └── vite-env.d.ts
├── types                               // 全局类型定义
├── .eslintignore                       // eslint忽略
├── .eslintrc                           // eslint配置文件
├── .gitignore                          // git忽略
├── index.html                          // 项目入口文件
├── package.lock.json
├── package.json
├── README.md                           // README
├── tsconfig.json                       // typescript配置文件
├── tsconfig.node.json
├── vite.config.ts                      // vite配置文件
├── windi.config.ts                     // vite配置文件
└── yarn.lock
```

## 关于 windicss

### 选择 windicss 的原因

- 优点
  1. 不需要在写 css，也不需要再为 class 取个什么名字而苦恼
  2. shortcuts，alias 配置可以让我们将常用的样式分类，使用更加方便
  3. Windi CSS 可以说是 tailwindcss 的升级版，性能更高，对 vite 的支持更好
- 缺点
  1. 当需要实现一些复杂样式时，class 的类名会很长，不过现在可以通过属性化，shortcuts，alias 等配置优化
  2. 需要一定的学习成本，需要熟悉常用的类名
- 使用说明
  1. 开发前请简单阅读官网内容
  2. windicss 已经集成了很多常用的样式类，不需要我们在配置文件中再去添加，我们需要保证配置文件的精简
  3. windicss 无法识别字符串拼接的 class 名称，你必须使用工具类的全名才可以识别。如下示例：
     `<div class="text-${ active ? 'green' : 'orange' }-400"></div>`
     `<div class="${ active ? 'text-green-400' : 'text-orange-400' }"></div>`
     有时，你必须使用动态拼接，这时你需要将他们加入 safelist 白名单，项目中有示例可以参照。
     具体详情可以查看 https://windicss.org/guide/extractions.html
- 当前存在问题
  1. 当前已开启 windicss 的属性化模式，并可以在项目中使用。例如: `<div h="card">示例<div>`。但是在开发环境中修改对应 windi.config 配置时，对应的样式会丢失，正常写在 className 中是可以的，具体原因未知。
- 后续打算
  改库的开发者团队已发布停止维护声明，他们不会继续向 Windi CSS 添加新功能，但是仍会根据需要提供安全修复程序，或许在后续版本中本项目会切换到 UnoCSS 或 Tailwind CSS。

## 计划

- [ ]

## UnoCSS

## 版本

- v0.0.1
