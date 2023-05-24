import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const configuration = () => {
  return {
    port: parseInt(process.env.SERVICE_PORT || "3000", 10),
    globalPrefix: process.env.SERVICE_GLOBAL_PREFIX,
    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [`${__dirname}/../entity/**/*.entity{.ts,.js}`],
      // 警告：设置 synchronize: true 不能被用于生产环境，否则您可能会丢失生产环境数据
      synchronize: false,
      // 让entity中的属性，在映射到数据库的时候，默认转下划线
      namingStrategy: new SnakeNamingStrategy(),
      logging: ["query", "error"],
      timezone: "+08:00",
      cache: {
        duration: 60000,
      },
      extra: {
        poolMax: 32,
        poolMin: 16,
        queueTimeout: 60000,
        pollPingInterval: 60,
        pollTimeout: 60,
      },
    },
  };
};
