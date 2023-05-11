import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "config/ormConfig";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";
import { RolesGuard } from "src/guard/roles.guard";
import { AdminController } from "./admin/admin.controller";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [TypeOrmModule.forRoot(config), AdminModule, AuthModule],
  controllers: [AppController, AdminController],
  providers: [
    AppService,
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
