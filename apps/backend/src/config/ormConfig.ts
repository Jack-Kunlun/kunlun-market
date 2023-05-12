// orm config.ts
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: "****",
  port: 5432,
  username: "****",
  password: "****",
  database: "****",
  entities: [`${__dirname}/../entity/**/*.entity{.ts,.js}`],
  // 警告：设置 synchronize: true 不能被用于生产环境，否则您可能会丢失生产环境数据
  synchronize: false,
  // 让entity中的属性，在映射到数据库的时候，默认转下划线
  namingStrategy: new SnakeNamingStrategy(),
};
