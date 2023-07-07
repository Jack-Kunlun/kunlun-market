/**
 * User module.
 */
import { User } from "@entity/frontend/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaptchaService } from "src/services/captcha.service";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UserService, CaptchaService],
  exports: [UserService],
})
export class UserModule {}
