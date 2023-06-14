import { AllExceptionsFilter } from "@filter/any-exception/any-exception.filter";
import { HttpExceptionFilter } from "@filter/http-exception/http-exception.filter";
import { ResponseFormatInterceptor } from "@interceptor/format/response-format.interceptor";
import { TransformInterceptor } from "@interceptor/transform/transform.interceptor";
import { createLoggerMiddleware } from "@middleware/logger/logger.middleware";
import { ValidationPipe, ClassSerializerInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { ParseNumberPipe } from "@pipe/parseNumber/parseNumber.pipe";
import * as express from "express";
import { AppModule } from "./modules/app.module";
import { customLogger } from "./utils";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("port");
  const globalPrefix = configService.get<string>("globalPrefix");

  // 设置全局前缀为
  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix);
  }

  // For parsing application/json
  app.use(express.json());
  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  // 监听所有的请求路由，并打印日志
  app.use(createLoggerMiddleware());

  // 全局验证管道
  app.useGlobalPipes(new ParseNumberPipe(), new ValidationPipe());

  app.useGlobalInterceptors(
    // class serializer interceptor
    // 忽略Entity实体中设置了@Exclude的属性
    new ClassSerializerInterceptor(app.get(Reflector)),
    // 使用全局拦截器打印出参
    new TransformInterceptor(),
    // 使用全局拦截器格式化出参
    new ResponseFormatInterceptor()
  );

  // 注意：AllExceptionsFilter 要在 HttpExceptionFilter 的上面，否则 HttpExceptionFilter 就不生效了，全被 AllExceptionsFilter 捕获了。
  // 捕获所有异常并打印日志
  app.useGlobalFilters(new AllExceptionsFilter());
  // 捕获HttpException异常并打印日志
  app.useGlobalFilters(new HttpExceptionFilter());

  customLogger.access(`service is running on: http://localhost:${port}/${globalPrefix}`);

  await app.listen(port || 3000);
}

bootstrap();
