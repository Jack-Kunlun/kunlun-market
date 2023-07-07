import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaptchaService } from "src/services/captcha.service";
import { AdminUser } from "../../entity/admin/admin-user.entity";
import { AdminUserService } from "./admin.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [],
  providers: [AdminUserService, CaptchaService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
