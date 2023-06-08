## Description

- 使用 nest.js 搭建的后端服务，使用`TypeScript`开发。
- 官网: [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 目录结构

```js
├── sql                                  // sql目录
└── src
  ├── config                             // 通用配置
  ├── const                              // 常量
  ├── decorator                          // 自定义装饰器
  ├── dto                                // dto目录
  ├── entity                             // 实体目录
  ├── filter                             // 通用自定义过滤器
  ├── guard                              // 通用全局守卫
  ├── interceptor                        // 通用自定义拦截器
  ├── middleware                         // 通用中间价
  └── modules                            // 模块目录
      ├── auth                           // 认证模块
          ├── auth.modules.ts            // 模块具体内容
          ├── ...
      ├── ...                            // 等等其他模块
          ├── ...
  ├── pipe                               // 通用管道
  ├── util                               // 公共方法
  └── main.ts                            // 应用入口文件
├── test                                 // 测试文件目录
├── .*.env.*                             // 环境变量配置文件，如：.admin.env.dev
├── .commitlintrc                        // commitlint配置文件
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierrc                          // prettierrc配置文件
├── jest.config.js                       // jest配置文件
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
├── type.d.ts                            // 全局类型定义
└── yarn.lock
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
