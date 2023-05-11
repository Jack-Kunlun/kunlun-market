import { Request, Response } from "express";
import { loggerError, loggerWarn, loggerInfo, loggerAccess } from "../../utils/log4js";

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码

  next();
  // 组装日志信息
  const logFormat = ` Request original url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  Status code: ${code}
  Params: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)} \n`;

  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    loggerError(logFormat);
  } else if (code >= 400) {
    loggerWarn(logFormat);
  } else {
    loggerAccess(logFormat);
    loggerInfo(logFormat);
  }
}
