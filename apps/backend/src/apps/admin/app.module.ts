import { configuration } from "@config/configuration";
import { JwtAuthGuard } from "@guard/jwt-auth.guard";
import { RolesGuard } from "@guard/roles.guard";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.admin.env.${process.env.NODE_ENV || "dev"}`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("database") as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
