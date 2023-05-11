import * as path from "path";

/**
 * 日志写入的目录
 * 在 turbo repo 架构中，Nest 应用程序的 __dirname 会指向 tsconfig.json 文件的输出目录，而 tsconfig.json 文件通常位于 packages/tsconfig 目录中。
 * 因此，当你在使用 Nest 应用程序时，如果你尝试使用 __dirname 获取当前文件所在的目录，你可能会发现它并不是你所期望的目录。
 * 所以Nest的tsconfig.json没有从packages/tsconfig中引入
 */
const baseLogPath = path.resolve(__dirname, "../../logs");

export const log4jsConfig = {
  appenders: {
    console: {
      // 会打印到控制台
      type: "console",
    },
    access: {
      // 会写入文件，并按照日期分类
      type: "dateFile",
      // 日志文件名，会命名为：access.20200320.log
      filename: `${baseLogPath}/access/access.log`,
      alwaysIncludePattern: true,
      pattern: "yyyyMMdd",
      daysToKeep: 60,
      numBackups: 3,
      category: "http",
      // 是否保留文件后缀
      keepFileExt: true,
    },
    app: {
      type: "dateFile",
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: "pattern",
        // eslint-disable-next-line quotes
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":"%m"}',
      },
      // 日志文件按日期（天）切割
      pattern: "yyyyMMdd",
      daysToKeep: 60,
      // maxLogSize: 10485760,
      numBackups: 3,
      keepFileExt: true,
    },
    errorFile: {
      type: "dateFile",
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: "pattern",
        // eslint-disable-next-line quotes
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":"%m"}',
      },
      // 日志文件按日期（天）切割
      pattern: "yyyyMMdd",
      daysToKeep: 60,
      // maxLogSize: 10485760,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "errorFile",
    },
  },
  categories: {
    default: {
      appenders: ["console", "app", "errors"],
      level: "DEBUG",
    },
    info: { appenders: ["console", "app", "errors"], level: "info" },
    access: { appenders: ["console", "app", "errors"], level: "info" },
    http: { appenders: ["access"], level: "DEBUG" },
  },
  // 使用 pm2 来管理项目时，打开
  pm2: true,
  // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
  pm2InstanceVar: "INSTANCE_ID",
};
