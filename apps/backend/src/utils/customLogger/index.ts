import { log4jsConfig } from "@config/log4jsConfig";
import * as log4js from "log4js";
import { customLoggerLayout } from "./customLoggerLayout";
import { useLog4js } from "./useLog4js";

log4js.addLayout("custom", customLoggerLayout);

log4js.configure(log4jsConfig);

/**
 * 用于记录主服务的日志
 * 日志写入位置：apps/backend/logs/app-out/*
 */
const logger = log4js.getLogger();
const accessLogger = log4js.getLogger("access");

/**
 * 自定义日志服务
 */
export const customLogger = useLog4js(logger, accessLogger);
