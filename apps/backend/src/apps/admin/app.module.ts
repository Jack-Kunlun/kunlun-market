import { config } from "@config/ormConfig";
import { JwtAuthGuard } from "@guard/jwt-auth.guard";
import { RolesGuard } from "@guard/roles.guard";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, AuthModule],
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
