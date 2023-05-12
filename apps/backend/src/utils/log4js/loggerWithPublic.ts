import { loggerWithAdmin } from "./loggerWithAdmin";
import { loggerWithFrontend } from "./loggerWithFrontend";

type LoggerLevel = keyof typeof loggerWithAdmin;

/**
 * 通用日志服务
 *
 * @param serviceType 需要打印日志的app
 * @param level 日志等级
 * @param content 日志内容
 */
export const loggerWithPublic = (serviceType: ServiceType, level: LoggerLevel, content: string) => {
  if (serviceType === "admin") {
    loggerWithAdmin[level](content);
  } else {
    loggerWithFrontend[level](content);
  }
};
