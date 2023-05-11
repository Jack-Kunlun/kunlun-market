import * as Path from "path";
import * as Util from "util";
import { log4jsConfig } from "@config/log4js";
import Chalk from "chalk";
import * as Log4js from "log4js";
import Moment from "moment";
import * as StackTrace from "stacktrace-js";
import { LoggerLevel } from "./types";

class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number
  ) {}
}

Log4js.addLayout("backend", (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = "";
    let position = "";

    // 日志组装
    const messageList: string[] = [];

    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;

        // 显示触发日志的坐标（行，列）
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`;
        }

        return;
      }

      if (typeof value !== "string") {
        value = Util.inspect(value, false, 3, true);
      }

      messageList.push(value);
    });

    // 日志组成部分
    const messageOutput: string = messageList.join(" ");
    const positionOutput: string = position ? ` [${position}]` : "";
    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
    const dateOutput = `${Moment(logEvent.startTime).format("YYYY-MM-DD HH:mm:ss")}`;
    const moduleOutput: string = moduleName ? `[${moduleName}] ` : "[LoggerService] ";
    let levelOutput = `[${logEvent.level}] ${messageOutput}`;

    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput);
        break;
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput);
        break;
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput);
        break;
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput);
        break;
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex("#DD4C35")(levelOutput);
        break;
      default:
        levelOutput = Chalk.grey(levelOutput);
        break;
    }

    return `${Chalk.green(typeOutput)}${dateOutput}  ${Chalk.yellow(moduleOutput)}${levelOutput}${positionOutput}`;
  };
});

// 注入配置
Log4js.configure(log4jsConfig);

// 实例化
const logger = Log4js.getLogger();

logger.level = LoggerLevel.TRACE;

const getStackTrace = (deep = 2) => {
  const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
  const stackInfo: StackTrace.StackFrame = stackList[deep];

  const lineNumber = stackInfo.lineNumber;
  const columnNumber = stackInfo.columnNumber;
  const fileName = stackInfo.fileName;
  const basename = fileName ? Path.basename(fileName) : "";

  return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
};

export const loggerTrace = (...args: any) => {
  logger.trace(getStackTrace(), ...args);
};

export const loggerDebug = (...args: any[]) => {
  logger.debug(getStackTrace(), ...args);
};

export const loggerInfo = (...args: any[]) => {
  logger.info(getStackTrace(), ...args);
};

export const loggerWarn = (...args: any[]) => {
  logger.warn(getStackTrace(), ...args);
};

export const loggerError = (...args: any[]) => {
  logger.error(getStackTrace(), ...args);
};

export const loggerFatal = (...args: any[]) => {
  logger.fatal(getStackTrace(), ...args);
};

export const loggerAccess = (...args: any[]) => {
  const loggerCustom = Log4js.getLogger("http");

  loggerCustom.info(getStackTrace(), ...args);
};
