import { inspect } from "util";
import * as Chalk from "chalk";
import * as dayjs from "dayjs";
import { LoggingEvent } from "log4js";
import { LoggerLevel } from "./types";

export const customLoggerLayout = () => {
  return (logEvent: LoggingEvent) => {
    // 日志组装
    const messageList: string[] = [];

    logEvent.data.forEach((value: any) => {
      if (typeof value !== "string") {
        value = inspect(value, false, 3, true);
      }

      messageList.push(value);
    });

    // const categoryName = logEvent.categoryName;
    // const loggerPid = logEvent.pid.toString();

    const startTime = logEvent.startTime;
    const loggerTime = dayjs(startTime).format("YYYY-MM-DD HH:mm:ss");
    const loggerInfo = `[${loggerTime}]`;
    const messageOutput = messageList.join(" ");
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

    return `${Chalk.green(loggerInfo)} ${levelOutput}`;
  };
};
