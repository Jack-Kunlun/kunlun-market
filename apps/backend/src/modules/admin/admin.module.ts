import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminUser } from "../../entity/admin/admin-user.entity";
import { AdminUserService } from "./admin.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  // controllers: [AdminController],
  providers: [AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
