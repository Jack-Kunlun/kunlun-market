import { AllExceptionsFilter } from "@filter/any-exception/any-exception.filter";
import { HttpExceptionFilter } from "@filter/http-exception/http-exception.filter";
import { TransformInterceptor } from "@interceptor/transform/transform.interceptor";
import { createLoggerMiddleware } from "@middleware/logger/logger.middleware";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { ValidationPipe } from "@pipe/validation/validation.pipe";
import * as express from "express";
import { AppModule } from "./app.module";

export const initAdminService = async () => {
  const app = await NestFactory.create(AppModule);

  // 设置全局前缀为 'admin'
  app.setGlobalPrefix("admin");

  // For parsing application/json
  app.use(express.json());
  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  // 监听所有的请求路由，并打印日志
  app.use(createLoggerMiddleware("admin"));

  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor("admin"));

  app.useGlobalPipes(new ValidationPipe());

  // 注意：AllExceptionsFilter 要在 HttpExceptionFilter 的上面，否则 HttpExceptionFilter 就不生效了，全被 AllExceptionsFilter 捕获了。
  // 捕获处理所有异常
  app.useGlobalFilters(new AllExceptionsFilter("admin"));
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter("admin"));
  // class serializer interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
};
