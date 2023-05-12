import * as Log4js from "log4js";
import { addLayout, getStackTrace } from "./tools";
import { LoggerLevel } from "./types";

export const useLog4js = (name: string, config: Log4js.Configuration) => {
  Log4js.addLayout(name, addLayout);

  // 注入配置
  Log4js.configure(config);

  // 实例化
  const logger = Log4js.getLogger();

  logger.level = LoggerLevel.TRACE;

  const trace = (...args: any) => {
    logger.trace(getStackTrace(), ...args);
  };

  const debug = (...args: any[]) => {
    logger.debug(getStackTrace(), ...args);
  };

  const info = (...args: any[]) => {
    logger.info(getStackTrace(), ...args);
  };

  const warn = (...args: any[]) => {
    logger.warn(getStackTrace(), ...args);
  };

  const error = (...args: any[]) => {
    logger.error(getStackTrace(), ...args);
  };

  const fatal = (...args: any[]) => {
    logger.fatal(getStackTrace(), ...args);
  };

  const access = (...args: any[]) => {
    const loggerCustom = Log4js.getLogger("http");

    loggerCustom.info(getStackTrace(), ...args);
  };

  return { trace, debug, info, warn, error, fatal, access };
};
