import { AllExceptionsFilter } from "@filter/any-exception/any-exception.filter";
import { HttpExceptionFilter } from "@filter/http-exception/http-exception.filter";
import { TransformInterceptor } from "@interceptor/transform/transform.interceptor";
import { createLoggerMiddleware } from "@middleware/logger/logger.middleware";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as express from "express";
import { AppModule } from "./app.module";

export const initFrontendService = async () => {
  const app = await NestFactory.create(AppModule);

  // For parsing application/json
  app.use(express.json());
  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // 监听所有的请求路由，并打印日志
  app.use(createLoggerMiddleware("frontend"));

  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor("frontend"));

  app.useGlobalPipes(new ValidationPipe());

  // 注意：AllExceptionsFilter 要在 HttpExceptionFilter 的上面，否则 HttpExceptionFilter 就不生效了，全被 AllExceptionsFilter 捕获了。
  // 捕获处理所有异常
  app.useGlobalFilters(new AllExceptionsFilter("frontend"));
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter("frontend"));

  await app.listen(3100);
};
