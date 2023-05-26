/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger, QueryRunner } from "typeorm";

export class CustomDatabaseLogger implements Logger {
  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): void {
    // Custom log implementation
    // console.log(level, message, queryRunner, "log");
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    // Custom log query implementation
    // console.log(query, parameters, queryRunner, "logQuery");
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    // Custom log query error implementation
    // console.log(error, query, parameters, queryRunner, "logQueryError");
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    // Custom log slow query implementation
    // console.log(time, query, parameters, queryRunner, "logQuerySlow");
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): void {
    // Custom log schema build implementation
    // console.log(message, queryRunner, "logSchemaBuild");
  }

  logMigration(message: string, queryRunner?: QueryRunner): void {
    // Custom log migration implementation
    // console.log(message, queryRunner, "logMigration");
  }
}
