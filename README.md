# Description

- 使用`turbo repo`架构搭建的项目，使用`TypeScript`开发，以及`eslint`/`prettier`/`commitlint`工程化管理。

## 目录结构

```js
├── .husky                       // husky 钩子配置目录
└── apps                         // 主应用目录
    ├── admin                    // 管理平台，使用react18.x搭建，全面使用ts+hooks
    ├── backend                  // 后端，使用nest.js搭建，全面使用ts
    └── frontend                 // 应用前端，使用vue3.x搭建，全面使用ts+composition api
└── packages                     // 系统通用包
    ├── eslint-config-common     // 公共 eslint rules 配置
    ├── eslint-config-custom     // 基础项目 eslint 配置，如yhooks，utils等
    ├── eslint-config-react      // react 项目 eslint 配置
    ├── public-utils             // 公共方法库
    ├── tsconfig                 // tsconfig 配置
    ├── ui                       // 组件库
    ├── uno-config               // 公共 unocss 配置
    ├── vite-config              // 公共 vite 配置
    └── yhooks                   // 公共 hooks
├── .commitlintrc                // commitlint配置文件
├── .eslintignore
├── .eslintrc
├── .gitignore
├── package.json
├── README.md
├── turbo.json                   // turbo repo 配置文件
└── yarn.lock
```

## Installation

```bash
$ yarn
```

## Running the app

```bash
# 运行全部项目
$ yarn dev

# 运行某个项目
$ yarn dev:admin

# production mode
$ yarn
```

## 计划

- [ ]

## 问题

- ~~由于 windicss 配置是引入进去的，导致无法实时热更新，需要修改一下项目中的配置文件才能触发热更新，或者重启一下项目~~，已经使用 unocss 替换 windicss。
- ~~vite 配置抽离后再引入，项目无法运行，所以目前前端项目中的 vite 配置都是单独的，vitest 配置也是一样~~，已完成 vite 配置抽离。

## 版本

- v0.0.1
