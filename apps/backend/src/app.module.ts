import { configuration } from "@config/configuration";
import { JwtAuthGuard } from "@guard/jwt-auth.guard";
import { RolesGuard } from "@guard/roles.guard";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CaptchaService } from "src/services/captcha.service";
import { AppController } from "./app.controller";
import { AdminUserController } from "./modules/admin/admin.controller";
import { AdminUserModule } from "./modules/admin/admin.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserController } from "./modules/user/user.controller";
import { UserModule } from "./modules/user/user.module";

const env = process.env.NODE_ENV || "dev";

/**
 * TODO: windows环境下使用动态拼接的文件名无法正确加载，后续再完善这部分
 */
const envFilePath = env === "dev" ? ".env" : ".env";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("database") as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    AdminUserModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, AdminUserController, UserController],
  providers: [
    CaptchaService,
    JwtService,
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
