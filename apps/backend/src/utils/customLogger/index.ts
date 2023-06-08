import { log4jsConfig } from "@config/log4jsConfig";
import * as log4js from "log4js";
import { customLoggerLayout } from "./customLoggerLayout";
import { useLog4js } from "./useLog4js";

log4js.addLayout("custom", customLoggerLayout);

log4js.configure(log4jsConfig);

const adminLogger = log4js.getLogger("adminAppOut");
const frontendLogger = log4js.getLogger("frontendAppOut");
const adminAccessLogger = log4js.getLogger("adminAccess");
const frontendAccessLogger = log4js.getLogger("frontendAccess");

/**
 * 用于记录主服务的日志
 * 日志写入位置：apps/backend/logs/app-out/*
 */
export const logger = log4js.getLogger();

/**
 * 用于记录后台系统的日志
 * 日志写入位置：apps/backend/logs/admin/*
 */
export const loggerWithAdmin = useLog4js(adminLogger, adminAccessLogger);

/**
 * 用于记录前台系统的日志
 * 日志写入位置：apps/backend/logs/frontend/*
 */
export const loggerWithFrontend = useLog4js(frontendLogger, frontendAccessLogger);

type LoggerLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal" | "access";

/**
 * 用于记录公共的日志
 * @param serviceType 服务类型
 * @param level 日志级别
 * @param content 日志内容
 */
export const loggerWithPublic = (serviceType: ServiceType, level: LoggerLevel, message: string) => {
  if (serviceType === "admin") {
    loggerWithAdmin[level](message, 3);
  } else {
    loggerWithFrontend[level](message, 3);
  }
};
