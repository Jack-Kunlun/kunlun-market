/**
 * admin app中使用的日志函数
 */
import { getLog4jsConfig } from "@config/log4js";
import { useLog4js } from "./logger";

const logger = useLog4js("admin", getLog4jsConfig("admin"));

export const loggerWithAdmin = { ...logger };
