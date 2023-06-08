import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { loggerWithPublic } from "../../utils";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly serviceType: ServiceType) {}

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
      loggerWithPublic(this.serviceType, "error", logFormat);
    } else if (code >= 400) {
      loggerWithPublic(this.serviceType, "warn", logFormat);
    } else {
      loggerWithPublic(this.serviceType, "access", logFormat);
      loggerWithPublic(this.serviceType, "info", logFormat);
    }

    next();
  }
}

export function createLoggerMiddleware(serviceType: "admin" | "frontend") {
  return new LoggerMiddleware(serviceType).use.bind(new LoggerMiddleware(serviceType));
}
