import { NestFactory } from "@nestjs/core";
import * as express from "express";
import { AppModule } from "./app.module";

export const initFrontendService = async () => {
  const app = await NestFactory.create(AppModule);

  // 设置全局前缀为 'admin'
  // app.setGlobalPrefix("admin");

  // For parsing application/json
  app.use(express.json());
  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  await app.listen(3100);
};
