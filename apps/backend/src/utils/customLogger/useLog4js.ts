import type { Logger } from "log4js";
import { getStackTrace } from "./getStackTrace";

export const useLog4js = (logger: Logger, accessLogger: Logger) => {
  /**
   * TODO: 目前只支持message为string，后期可以考虑支持数组
   */
  const trace = (message: string | any[], deep = 2) => {
    logger.trace(getStackTrace(deep), message);
  };

  const debug = (message: string, deep = 2) => {
    logger.debug(getStackTrace(deep), message);
  };

  const info = (message: string, deep = 2) => {
    logger.info(getStackTrace(deep), message);
  };

  const warn = (message: string, deep = 2) => {
    logger.warn(getStackTrace(deep), message);
  };

  const error = (message: string, deep = 2) => {
    logger.error(getStackTrace(deep), message);
  };

  const fatal = (message: string, deep = 2) => {
    logger.fatal(getStackTrace(deep), message);
  };

  const access = (message: string, deep = 2) => {
    accessLogger.info(getStackTrace(deep), message);
  };

  return { access, trace, debug, info, warn, error, fatal };
};
