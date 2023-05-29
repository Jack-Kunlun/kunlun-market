# 项目介绍

- 使用`turbo repo`架构搭建的项目，使用`TypeScript`开发，以及`eslint`/`prettier`/`commitlint`工程化管理。

## 目录结构

```js
├── .husky                       // husky 钩子配置目录
└── apps                         // 主应用目录
    ├── admin                    // 管理平台
    ├── backend                  // 后端
    └── frontend                 // 应用前端
└── packages                     // 系统通用包
    ├── eslint-config-backend    // 后端 eslint 配置
    ├── eslint-config-custom     // 前端 eslint 配置
    ├── public-utils             // 公共方法库
    ├── tsconfig                 // tsconfig 配置
    ├── ui                       // 组件库
    ├── windi-config             // 公共 windiCss 配置
    └── yhooks                   // 公共 hooks
├── .env                         // 环境变量
├── .commitlintrc                // commitlint配置文件
├── .eslintignore
├── .eslintrc
├── .gitignore
├── package.json
├── README.md
├── turbo.json                   // turbo repo 配置文件
└── yarn.lock
```

## 计划

- [ ]

## 问题

- 由于 windicss 配置是引入进去的，导致无法实时热更新，需要修改一下项目中的配置文件才能触发热更新，或者重启一下项目
- vite 配置抽离后再引入，项目无法运行，所以目前前端项目中的 vite 配置都是单独的，vitest 配置也是一样

## 版本

- v0.0.1
