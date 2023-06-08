import * as path from "path";
import * as log4js from "log4js";

/**
 * 日志文件存放路径
 */
const logPath = path.resolve(__dirname, "../../logs/");

/**
 * log4js的配置文件
 */
export const log4jsConfig: log4js.Configuration = {
  appenders: {
    /**
     * 控制台输出，开发环境使用
     * 如果不想要控制台输出可以将其注释掉并删除categories中的console
     */
    console: {
      type: "console",
      /**
       * 日志输出格式
       * 默认为%[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c - %m%n
       * 如果有自定义的layout，可以在这里引用,type属性的值填自定义layout的名字
       */
      layout: { type: "custom" },
    },
    out: {
      /**
       * 日志类型
       * 会写入文件，并按照日期分类
       */
      type: "dateFile",
      /**
       * 日志输出位置以及文件名、文件后缀
       * 命名规则：[项目根目录]/logs/[模块]/access.[日期].log，如：access.20200320.log
       * 后期考虑按照日期目录来分割日志，变成这样：[项目根目录]/logs/[模块]/[日期]/access.log
       */
      filename: `${logPath}/app-out/app.log`,
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
    adminAppOut: {
      /**
       * 日志类型
       * 会写入文件，并按照日期分类
       */
      type: "dateFile",
      /**
       * 日志输出位置以及文件名、文件后缀
       * 命名规则：[项目根目录]/logs/[模块]/access.[日期].log，如：access.20200320.log
       * 后期考虑按照日期目录来分割日志，变成这样：[项目根目录]/logs/[模块]/[日期]/access.log
       */
      filename: `${logPath}/admin/app-out/app.log`,
      alwaysIncludePattern: true,
      // 日志文件按日期（天）切割
      pattern: "yyyyMMdd",
      daysToKeep: 60,
      // maxLogSize: 10485760,
      numBackups: 3,
      // 是否保留文件后缀
      keepFileExt: true,
      layout: {
        type: "pattern",
        // eslint-disable-next-line quotes
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":"%m"}',
      },
    },
    frontendAppOut: {
      type: "dateFile",
      filename: `${logPath}/frontend/app-out/app.log`,
      alwaysIncludePattern: true,
      pattern: "yyyyMMdd",
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
      layout: {
        type: "pattern",
        // eslint-disable-next-line quotes
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":"%m"}',
      },
    },
    adminAccess: {
      type: "dateFile",
      filename: `${logPath}/admin/access/access.log`,
      alwaysIncludePattern: true,
      pattern: "yyyyMMdd",
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
      // layout: { type: "pattern" },
    },
    frontendAccess: {
      type: "dateFile",
      filename: `${logPath}/frontend/access/access.log`,
      alwaysIncludePattern: true,
      pattern: "yyyyMMdd",
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
      // layout: { type: "pattern" },
    },
    adminErrorFile: {
      type: "dateFile",
      filename: `${logPath}/admin/error/error.log`,
      alwaysIncludePattern: true,
      pattern: "yyyyMMdd",
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
      layout: {
        type: "pattern",
        // eslint-disable-next-line quotes
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":"%m"}',
      },
    },
    frontendErrorFile: {
      type: "dateFile",
      filename: `${logPath}/frontend/error/error.log`,
      alwaysIncludePattern: true,
      pattern: "yyyyMMdd",
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
      layout: {
        type: "pattern",
        // eslint-disable-next-line quotes
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":"%m"}',
      },
    },
    adminError: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "adminErrorFile",
    },
    frontendError: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "frontendErrorFile",
    },
  },
  categories: {
    default: {
      /**
       * 日志输出器
       * appenders中配置的名称
       */
      appenders: ["out", "console"],
      // 日志等级
      level: "DEBUG",
    },
    adminAppOut: { appenders: ["adminAppOut", "console", "adminError"], level: "info" },
    frontendAppOut: { appenders: ["frontendAppOut", "console", "frontendError"], level: "info" },
    adminAccess: { appenders: ["adminAccess", "console", "adminError"], level: "info" },
    frontendAccess: { appenders: ["frontendAccess", "console", "frontendError"], level: "info" },
    adminHttp: { appenders: ["adminAccess"], level: "DEBUG" },
    frontendHttp: { appenders: ["frontendAccess"], level: "DEBUG" },
  },
  // 使用 pm2 来管理项目时，打开
  pm2: true,
  // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
  pm2InstanceVar: "INSTANCE_ID",
};
