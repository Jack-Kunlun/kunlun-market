# 项目介绍

- 使用`turbo repo`架构搭建的项目，支持`TypeScript`、以及`eslint`/`prettier`/`commitlint`工程化管理。

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
└── yarn.lock                    // typescript 配置文件
```

## 计划

- [ ]

## 版本

- v0.0.1
