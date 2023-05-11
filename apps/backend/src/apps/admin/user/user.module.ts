import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminUser } from "../../../entity/admin/admin.entity";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  // controllers: [AdminController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
