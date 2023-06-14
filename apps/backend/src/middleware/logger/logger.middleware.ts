import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { customLogger } from "../../utils";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const code = res.statusCode; // 响应状态码

    // 组装日志信息
    const logFormat = `Request original url: ${req.originalUrl}
  Host: ${req.hostname}
  Method: ${req.method}
  IP: ${req.ip}
  Status code: ${code}
  Params: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)}`;

    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      customLogger.error(logFormat);
    } else if (code >= 400) {
      customLogger.warn(logFormat);
    } else {
      customLogger.access(logFormat);
      customLogger.info(logFormat);
    }

    next();
  }
}

export function createLoggerMiddleware() {
  return new LoggerMiddleware().use.bind(new LoggerMiddleware());
}
